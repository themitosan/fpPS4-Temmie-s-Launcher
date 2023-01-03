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
	path: require('path'),
	childProcess: require('child_process'),
	packageJson: require('../package.json'),
	memoryjs: require('App/node_modules/memoryjs'),

	// App version
	version: '',
	appVersion: void 0,

	// Import app modules
	tools: temp_TOOLS,
	design: temp_DESIGN,
	gameList: temp_GAMELIST,
	settings: temp_SETTINGS,
	emuManager: temp_EMUMANAGER,
	fileManager: temp_FILEMANAGER,
	paramSfo: temp_PARAMSFO_PARSER,

	// Log function and variables
	logData: '',
	log: function(text){

		if (text !== '' && text !== void 0){

			var previousLog = APP.logData,
				newLog = previousLog + '\n' + text;

			// Fix log with white line
			if (previousLog == ''){
				newLog = text;
			}
			if (previousLog.slice(previousLog.length - 1, previousLog.length) === '\n'){
				newLog = previousLog + text;
			}

			// Append log
			document.getElementById('APP_LOG').value = newLog;
			APP.logData = newLog;

			// Scroll log
			document.getElementById('APP_LOG').scrollTop = document.getElementById('APP_LOG').scrollHeight;
		
		}

	},

	// Clear Log
	clearLog: function(){

		// Get current date
		var saveInfo = '',
			d = new Date(),
			logName = 'Log_' + d.toDateString().replace(RegExp(' ', 'gi'), '_') + '_' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds() + '.log';

		// Reset log
		APP.logData = APP.appVersion;
		document.getElementById('APP_LOG').value = APP.appVersion;
		APP.log('INFO - Previous log was cleared!' + saveInfo);

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
				execLine = 'start "Running fpPS4 - ' + APP.gameList.selectedGame + '" ' + winMode + ' cmd /C ' + APP.path.parse(APP.settings.data.emuPath).base + ' ' + parseArgs + ' ' + pressAnyKey;

			// Run
			APP.execProcess = APP.childProcess.exec(execLine);

			// Log on stdout and stderr
			APP.execProcess.stdout.on('data', function(data){
				APP.processStdOutput(data);
			});
			APP.execProcess.stderr.on('data', function(data){
				APP.processStdOutput(data);
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
				APP.log('INFO - ' + APP.path.parse(exe).base + ' was closed returning code ' + code);

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
		window.alert('fpPS4 Temmie\'s Launcher - Version: ' + this.version + '\nCreated by TemmieHeartz\n(https://twitter.com/themitosan)\n\n' +
					 'fpPS4 main emulator is created by red-prig\n(https://github.com/red-prig/fpPS4)\n\n' +
					 'Plugin memoryjs is created by Rob--\n(https://github.com/rob--/memoryjs)');
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
delete temp_EMUMANAGER;
delete temp_FILEMANAGER;
delete temp_PARAMSFO_PARSER;

// Start
window.onload = function(){

	try {

		// Main log
		APP.version = APP.packageJson.version;
		document.title = APP.packageJson.name + ' - Ver. ' + APP.version + ' [' + process.versions['nw-flavor'].toUpperCase() + ']';
		APP.appVersion = 'fpPS4 Temmie\'s Launcher - Version: ' + APP.version + '\nRunning on nw.js (node-webkit) version ' + process.versions.nw + ' [' + process.versions['nw-flavor'].toUpperCase() + ']';
		APP.log(APP.appVersion);
		
		// Load settings
		APP.settings.load();
		APP.settings.checkPaths();
		APP.design.renderSettings();

		// Load game list
		APP.gameList.load();

		// Rener hack list
		APP.design.renderHacklist();

		// Kill fpPS4 process if is active
		APP.emuManager.killEmu(!0);

		// Set focus on search Bar
		TMS.focus('INPUT_gameListSearch', 100);

		// Remove all previous imported modules
		APP.gameList.removeAllModules();

	} catch (err) {

		// Log it
		console.error(err);
		window.confirm('ERROR - Unable to start main application!\n\nReason:\n' + err + '\n\nTo know more, hit F12 and go to console tab to see more details.');
		
	}

}