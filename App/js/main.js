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

			var textarea = document.getElementById('APP_LOG'),
				previousLog = textarea.value,
				newLog = previousLog + '\n' + text;

			// Fix log with white line
			if (previousLog == ''){
				newLog = text;
			}
			if (previousLog.slice(previousLog.length - 1, previousLog.length) === '\n'){
				newLog = previousLog + text;
			}

			// If Emu is running and catch an "nop" log, update GUI
			if (text.slice(0, 4) === 'nop ' && APP.emuManager.emuRunning === !0){

				// If seek missing modules is active, push current error to list
				if (APP.settings.data.seekMissingModules === !0){
					APP.emuManager.emuErrorList.push(text);
				}

				// Update GUI
				document.getElementById('LABEL_GAME_DETAILS_STATUS').innerHTML = 'Error ( <label class="user-can-select">' + text + '</label>)';
				TMS.css('APP_LOG', {
					'color': '#f00',
					'background-image': 'linear-gradient(180deg, #000000db, #1b0909)'
				});
			}

			// Append log
			textarea.value = newLog;
			APP.logData = newLog;

			// Scroll log
			textarea.scrollTop = textarea.scrollHeight;
		
		}

	},

	// Reset launcher
	resetLauncher: function(skipSave){
		
		if (APP.emuManager.emuCountdown > 2){

			// (Fix) Avoid log not being saved if launcher doesn't have any game selected
			var cName = '';
			if (APP.gameList.selectedGame !== ''){
				cName = '_' + APP.gameList.list[APP.gameList.selectedGame].name.replace(RegExp(' ', 'gi'), '_');
			}
			
			// Get current date
			var d = new Date(),
				saveInfo = '',
				cTime = '_' + d.toDateString().replace(RegExp(' ', 'gi'), '_') + '_' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds(),
				logName = 'Log' + cName + cTime + '.log';

			// Skip saving log
			if (skipSave !== !0){

				// Update log data
				saveInfo = ' You can see all previous data on \"Logs/' + logName + '\"';

				// Write log file
				APP.fs.writeFileSync(APP.settings.data.nwPath + '/Logs/' + logName, APP.logData, 'utf-8');

			}

			// Append log info if APP.settings.data.saveLogOnEmuClose is true
			if (APP.settings.data.saveLogOnEmuClose === !0){
				saveInfo = saveInfo + '\n\nIMPORTANT - All previous log was cleared because \"Save log file everytime main emu closes\" is active.\nTo Prevent this, you can disable it on settings menu.';
			}

			// Reset log
			APP.logData = APP.appVersion;
			document.getElementById('APP_LOG').value = APP.appVersion;
			APP.log('INFO - Previous log was cleared!' + saveInfo);

			// Reset countdown
			APP.emuManager.emuCountdown = 0;

			/*
				Reload launcher
				
				I'm looking after some bugs related for fpPS4 Temmie's launcher not catching some logs...
				I will keep the line below disabled... for now!

				PS: A simple fix for now is enabling "Log fpPS4 output on external window" on settings menu!
			*/
			// chrome.runtime.reload();

		}
	
	},

	// Clear Log
	clearLog: function(skipSave){

		APP.emuManager.emuCountdown = 3;
		this.resetLauncher(skipSave);

	},

	// Run external software
	execEmuPID: 0,
	execProcess: void 0,
	runExec: function(exe, args){

		if (exe !== void 0 && exe !== ''){

			/*
				Change context path to current emu folder
				This will allow fpPS4 create all required folders (savedata, shader_dump, tmp) on it's current location.
			*/
			process.chdir(APP.path.parse(exe).dir);

			// Check if external log window option is enabled
			if (APP.settings.data.logOnExternalWindow === !1){
				
				APP.execProcess = APP.childProcess.spawn(exe, args);
				APP.execEmuPID = APP.execProcess.pid;

			} else {

				// Transform args into string
				var gPath = '"' + args[args.indexOf('-e') + 1] + '"',
					parseArgs = args.toString().replace(RegExp(',', 'gi'), ' ').replace(args[args.indexOf('-e') + 1], gPath),
					execLine = 'start "Running fpPS4 - ' + APP.gameList.selectedGame + '" /MAX "' + exe + '" ' + parseArgs;

				// Warn about fpPS4 logs
				APP.log('IMPORTANT - Since fpPS4 logs are being displayed on a external window, Temmie\'s launcher aren\'t capable of saving it any information with exception of it\'s ' +
						'exit code. If you want to keep all data, you can do it by disabling \"Log fpPS4 output on external window\" on Settings menu.\n ');

				// Run
				APP.execProcess = APP.childProcess.exec(execLine);

			}

			// Log on stdout and stderr
			APP.execProcess.stdout.on('data', function(data){
				APP.log(data.toString());
			});
			APP.execProcess.stderr.on('data', function(data){
				APP.log(data.toString());
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

				// Run Check missing modules
				if (APP.settings.data.seekMissingModules === !0){
					APP.emuManager.seekMissingModules();
				}

				// Check if need to reset launcher
				APP.resetLauncher();

				// Scroll game list to last selected game
				if (APP.gameList.selectedGame !== ''){
					TMS.css('GAME_ENTRY_' + APP.gameList.selectedGame, {'animation': '0.8s gameFocus'});
					
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

			if (pList[pName].szExeFile === processName){
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

		// Set focus on search Bar
		TMS.focus('INPUT_gameListSearch', 100);

	} catch (err) {

		// Log it
		console.error(err);
		window.confirm('ERROR - Unable to start main application!\n\nReason:\n' + err + '\n\nTo know more, hit F12 and go to console tab to see more details.');
		
	}

}