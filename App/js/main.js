/*
	******************************************************************************
	fpPS4 Temmie's launcher
	main.js

	This file contains all modules and required functions to initialize 
	launcher 
	******************************************************************************
*/

var APP = {

	// Import nw modules
	fs: require('fs'),
	win: nw.Window.get(),
	path: require('path'),
	childProcess: require('child_process'),
	packageJson: require('../package.json'),
	memoryjs: require('App/node_modules/memoryjs'),

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

			var canLog = !0,
				previousLog = APP.logData,
				newLog = previousLog + '\n' + text;

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

				// Set current line
				APP.logLine = text;

				// Append log
				document.getElementById('APP_LOG').value = newLog;
				APP.logData = newLog;

				// Scroll log
				document.getElementById('APP_LOG').scrollTop = document.getElementById('APP_LOG').scrollHeight;

			}
		
		}

	},

	// Clear Log
	clearLog: function(){

		// Get current date
		var d = new Date(),
			logName = 'Log_' + d.toDateString().replace(RegExp(' ', 'gi'), '_') + '_' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds() + '.log';

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
				var winMode;
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
				var pressAnyKey = '';
				if (APP.settings.data.logExternalWindowPrompt === !0){
					pressAnyKey = '^& pause';
				}
	
				// Transform args into string
				var gPath = '"' + args[args.indexOf('-e') + 1] + '"',
					parseArgs = args.toString().replace(RegExp(',', 'gi'), ' ').replace(args[args.indexOf('-e') + 1], gPath),
					execLine = 'start "' + APP.lang.getVariable('logWindowTitle') + ' - ' + APP.gameList.selectedGame + '" ' + winMode + ' cmd /C ' + APP.path.parse(APP.settings.data.emuPath).base + ' ' + parseArgs + ' ' + pressAnyKey;
				
				APP.execProcess = APP.childProcess.exec(execLine);
				
			} else {

				/*
					Debug
				*/
				console.clear();
				APP.execProcess = APP.childProcess.spawn(exe, args, { detached: !0 });

			}

			// Set emu running
			APP.emuManager.emuRunning = !0;
			
			// Set stream as string (UTF-8)
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

				// Log exit code
				APP.log(APP.lang.getVariable('closeEmuStatus', [APP.path.parse(exe).base, code]));

				// Save log if APP.settings.data.saveLogOnEmuClose is true
				if (APP.settings.data.saveLogOnEmuClose === !0){
					APP.clearLog();
				}

				// Scroll game list to last selected game
				if (APP.gameList.selectedGame !== ''){
					TMS.css('GAME_ENTRY_' + APP.gameList.selectedGame, {'animation': '0.8s hintGameFocus'});
					TMS.focus('INPUT_gameListSearch', 100);

					setTimeout(function(){
						APP.design.selectGame(APP.gameList.selectedGame);
						TMS.scrollCenter('GAME_ENTRY_' + APP.gameList.selectedGame);
					}, 100);

				}

				// Return exit code
				return code;

			});

		}

	},

	// MemoryJS - Get Process Info
	getProcessInfo: function(processName, postAction){

		// Get process list
		var res, pList = this.memoryjs.getProcesses();

		// Seek process
		Object.keys(pList).forEach(function(pName){

			if (pList[pName].szExeFile.toLowerCase() === processName.toLowerCase()){
				res = pList[pName];
			}

		});

		// If found and post-action function is present, execute it!
		if (postAction !== void 0 && res !== void 0){
			postAction(res);
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
delete temp_FILEMANAGER;
delete temp_PARAMSFO_PARSER;

// Start
window.onload = function(){

	try {

		// Load settings ( 1 / 2 )
		APP.settings.load();
		APP.settings.loadLang();

		// App title
		APP.version = APP.packageJson.version;
		APP.title = APP.packageJson.name + ' - Ver. ' + APP.version + ' [' + process.versions['nw-flavor'].toUpperCase() + ']';
		document.title = APP.title;

		// App Log
		APP.appVersion = APP.lang.getVariable('mainLog', [APP.version, process.versions.nw, process.versions['nw-flavor'].toUpperCase()]);
		APP.log(APP.appVersion);
		
		// Load settings ( 2 / 2 )
		APP.settings.checkPaths();
		APP.design.renderSettings();

		// Kill fpPS4 process if is active
		APP.emuManager.killEmu(!0);

		// Load game list
		APP.gameList.load();

		// Rener hack list
		APP.design.renderHacklist();

		// Focus search field
		TMS.focus('INPUT_gameListSearch');

		// Remove all previous imported modules
		APP.gameList.removeAllModules();

	} catch (err) {

		// Log error
		console.error(err);
		window.alert('ERROR - Unable to start main application!\n\nReason:\n' + err + '\n\nTo know more, hit F12 and go to console tab to see more details.');
		
	}

}