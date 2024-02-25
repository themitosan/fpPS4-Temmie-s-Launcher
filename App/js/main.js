/*
	******************************************************************************
	fpPS4 Temmie's launcher
	main.js

	This file contains all modules and required functions to initialize 
	launcher.
	******************************************************************************
*/

const APP = {

	// Load nwjs / node.js modules
	loadModules: function(){

		try{

			// Require global modules
			APP.fs = require('fs');
			APP.os = require('os');
			APP.win = nw.Window.get();
			APP.path = require('path');
			APP.https = require('https');
			APP.childProcess = require('child_process');
			APP.packageJson = require('../package.json');
			APP.streamZip = require('App/node_modules/node-stream-zip');

			// If current OS is windows, load memoryjs
			if (APP.os.platform() === 'win32'){
				APP.memoryjs = require('App/node_modules/memoryjs');
			}
		
		} catch(e) {
			console.error(e);
			window.alert(`ERROR - Unable to load node modules!\n${e}`);
		}

	},

	// App version
	title: '',
	version: '',
	appVersion: void 0,

	// Import app modules
	tools: temp_TOOLS,
	lang: temp_LANGUAGE,
	design: temp_DESIGN,
	gameList: temp_GAMELIST,
	settings: temp_SETTINGS,
	emuManager: temp_EMUMANAGER,
	fileManager: temp_FILEMANAGER,
	paramSfo: temp_PARAMSFO_PARSER,

	// Log function and variables
	logData: '',
	logLine: '',
	log: function(text){

		if (text !== '' && text !== void 0){

			// Delclare main vars
			var canLog = !0,
				previousLog = APP.logData,
				newLog = `${previousLog}\n${text}`;

			// Fix log with white line
			if (previousLog == ''){
				newLog = text;
			}
			if (previousLog.slice(previousLog.length - 1, previousLog.length) === '\n'){
				newLog = previousLog + text;
			}

			// Fix duplicate lines
			if (APP.logLine === text){
				canLog = !1;
			}

			// Check if can append log
			if (canLog === !0){

				// Set current line, append log and scroll log view
				APP.logLine = text;
				document.getElementById('APP_LOG').value = newLog;
				APP.logData = newLog;
				document.getElementById('APP_LOG').scrollTop = document.getElementById('APP_LOG').scrollHeight;

			}
		
		}

	},

	// Clear Log
	clearLog: function(){

		// Reset log
		APP.logData = APP.appVersion;
		document.getElementById('APP_LOG').value = APP.appVersion;
		APP.log(APP.lang.getVariable('logCleared'));

	},

	// DEBUG: Process fpPS4 output data
	processStdOutput: function(data, type){

		const logSplit = data.split('\n');
		logSplit.forEach(function(logLine){

			if (logLine !== '' && logLine !== '\r'){
				console[type](logLine);
			}

		});

	},

	// Run fpPS4
	execProcess: void 0,
	runfpPS4: function(exe, args){

		if (exe !== void 0 && exe !== ''){

			/*
				Change context path to current emu folder
				This will allow fpPS4 create all required folders (savedata, shader_dump, tmp) on it's current location.
			*/
			process.chdir(APP.path.parse(exe).dir);

			// Run external window
			if (APP.settings.data.debugTestLog === !1){

				// Window state
				var winMode,
					wineCommand = '',
					pressAnyKey = '',
					emuExecPath = APP.path.parse(APP.settings.data.emuPath).base,
					cmdWinTitle = `"${APP.lang.getVariable('logWindowTitle')} - ${APP.gameList.selectedGame}"`;

				// Switch cmd window mode
				switch (APP.settings.data.logExternalWindowStartMode){

					case 'normal':
						winMode = '';
						break;

					case 'max':
						winMode = '/MAX';
						break;

					case 'min':
						winMode = '/MIN';
						break;

				}

				// Ask user to press any key
				if (APP.settings.data.logExternalWindowPrompt === !0){
					pressAnyKey = '^& pause';
				}

				// Check if needs to append wine command
				if (APP.os.platform() !== 'win32'){
					cmdWinTitle = '',
					pressAnyKey = '';
					wineCommand = 'wine ';
					emuExecPath = `Z:${APP.settings.data.emuPath.replace(RegExp('\\\\', 'gi'), '/')}`;
				}

				// Transform args into string
				var gPath = `"${args[args.indexOf('-e') + 1]}"`,
					parseArgs = args.toString().replace(RegExp(',', 'gi'), ' ').replace(args[args.indexOf('-e') + 1], gPath),
					execLine = `${wineCommand}start ${cmdWinTitle} ${winMode} cmd /C ${emuExecPath} ${parseArgs} ${pressAnyKey}`;

				APP.execProcess = APP.childProcess.exec(execLine);

			} else {

				/*
					Debug
				*/
				console.clear();
				APP.execProcess = APP.childProcess.spawn(exe, args, { detached: !0 });

			}
			
			// Set emu running and stream as string (UTF-8)
			APP.emuManager.emuRunning = !0;
			APP.execProcess.stdout.setEncoding('utf8');
			APP.execProcess.stderr.setEncoding('utf8');

			// Log on stdout and stderr
			APP.execProcess.stdout.on('data', function(data){
				APP.processStdOutput(data, 'info');
			});
			APP.execProcess.stderr.on('data', function(data){
				APP.processStdOutput(data, 'error');
			});

			// Log on close
			APP.execProcess.on('close', function(code){

				// Reset chdir
				process.chdir(APP.settings.data.nwPath);
				APP.emuManager.emuRunning = !1;

				// Update GUI
				APP.design.update();
				APP.design.toggleDisplayMode({
					appStatus: 'idle'
				});

				// Log exit code and save log if APP.settings.data.saveLogOnEmuClose is true
				APP.log(APP.lang.getVariable('closeEmuStatus', [APP.path.parse(exe).base, code]));
				if (APP.settings.data.saveLogOnEmuClose === !0){
					APP.clearLog();
				}

				// Scroll game list to last selected game
				if (APP.gameList.selectedGame !== ''){
					TMS.css(`GAME_ENTRY_${APP.gameList.selectedGame}`, {'animation': '0.8s hintGameFocus'});
					TMS.focus('INPUT_gameListSearch', 100);

					setTimeout(function(){
						APP.design.selectGame(APP.gameList.selectedGame);
						TMS.scrollCenter(`GAME_ENTRY_${APP.gameList.selectedGame}`);
					}, 100);

				}

				// Return exit code
				return code;

			});

		}

	},

	// MemoryJS - Get Process Info
	getProcessInfo: function(processName, postAction){

		// Check if current os is windows
		if (APP.os.platform() === 'win32'){

			// Get process list and start seek
			var res, pList = this.memoryjs.getProcesses();
			Object.keys(pList).forEach(function(pName){

				if (pList[pName].szExeFile.toLowerCase() === processName.toLowerCase()){
					res = pList[pName];
				}

			});

			// If found and post-action function is present, execute it!
			if (postAction !== void 0 && res !== void 0){
				postAction(res);
			}

		}

	},

	// Check current operating system
	checkCurrentOs: function(){

		// Check if needs to display warn
		if (APP.os.platform() !== 'win32' && APP.settings.data.nonWindowsOsWarn === !1){
			window.alert(APP.lang.getVariable('nonWindowsOsWarn'));
			APP.log(APP.lang.getVariable('nonWindowsOsWarn'));
			APP.settings.data.nonWindowsOsWarn = !0;
			APP.settings.save();
		}

	},

	// About screen
	about: function(){
		window.alert(this.lang.getVariable('about', [this.version]));
	},

	// Reload app
	reload: function(){
		location.reload();
	}

}

// Delete modules
delete temp_TOOLS;
delete temp_DESIGN;
delete temp_SETTINGS;
delete temp_GAMELIST;
delete temp_LANGUAGE;
delete temp_EMUMANAGER;
delete temp_EMU_UPDATE;
delete temp_FILEMANAGER;
delete temp_PARAMSFO_PARSER;

// Start
window.onload = function(){

	try {

		// Load nwjs / node.js modules and start loding settings ( 1 / 2 )
		APP.loadModules();
		APP.settings.load();
		APP.settings.loadLang();

		// App title
		APP.version = APP.packageJson.version;
		APP.title = `${APP.packageJson.name} - Ver. ${APP.version} [${process.versions['nw-flavor'].toUpperCase()}]`;
		document.title = APP.title;

		// App Log
		APP.appVersion = APP.lang.getVariable('mainLog', [APP.version, process.versions.nw, process.versions['nw-flavor'].toUpperCase()]);
		APP.log(APP.appVersion);

		// Load remaining settings, kill fpPS4 process if is active and check currert OS
		APP.settings.checkPaths();
		APP.design.renderSettings();
		APP.emuManager.killEmu(!0);
		APP.checkCurrentOs();

		// Rener hack list, gamepad modes and focus input search field
		APP.design.renderHacklist();
		TMS.focus('INPUT_gameListSearch');

		// Load game list and remove all previous modules
		APP.gameList.load();
		APP.gameList.removeAllModules();

		// Updater: Get all available workflows and check if fpPS4 have any update (silently)
		APP.emuManager.update.getWorkflows();
		if (APP.emuManager.update.skipLoadingCheck === !1){
			APP.emuManager.update.check({ silent: !0 });
		}

	} catch (err) {

		// Log error
		console.error(err);
		window.alert(`ERROR - Unable to start main application!\n\nReason:\n${err}\n\nTo know more, hit F12 and go to console tab to see more details.`);
		
	}

}