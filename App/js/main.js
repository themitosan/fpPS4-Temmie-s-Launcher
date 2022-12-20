/*
	main.js
*/

var APP = {

	// Import nw modules
	fs: require('fs'),
	path: require('path'),
	childProcess: require('child_process'),
	packageJson: require('../package.json'),

	// App version
	version: '',
	appVersion: void 0,

	// Import app modules
	design: temp_DESIGN,
	gameList: temp_GAMELIST,
	settings: temp_SETTINGS,
	emuManager: temp_EMUMANAGER,
	fileManager: temp_FILEMANAGER,

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

			// Get current date
			var d = new Date(),
				saveInfo = '',
				cName = '_' + APP.gameList.selectedGame.replace(RegExp(' ', 'gi'), '_'),
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
	execProcess: void 0,
	runExec: function(exe, args){

		if (exe !== void 0 && exe !== ''){

			/*
				Spawn process
				It will change running dir to current exe location
			*/
			process.chdir(APP.path.parse(exe).dir);
			APP.execProcess = APP.childProcess.spawn(exe, args);

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

				// Check if need to reset launcher
				APP.resetLauncher();

				// Scroll game list to last selected game
				if (APP.gameList.selectedGame !== ''){
					TMS.scrollCenter('GAME_ENTRY_' + APP.gameList.selectedGame);
					APP.design.selectGame(APP.gameList.selectedGame);
				}

				return code;

			});

		}

	},

	// About screen
	about: function(){
		window.alert('fpPS4 Temmie\'s Launcher - Version: ' + this.version + '\nCreated by TemmieHeartz\n(https://twitter.com/themitosan)\n\nfpPS4 main emulator is created by red-prig\n(https://github.com/red-prig/fpPS4)');
	},

	// Reload app
	reload: function(){
		location.reload();
	}

}

// Delete modules
delete temp_DESIGN;
delete temp_SETTINGS;
delete temp_GAMELIST;
delete temp_EMUMANAGER;
delete temp_FILEMANAGER;

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

	} catch (err) {

		// Asks if user wants to reset launcher settings
		const conf = window.confirm('ERROR - Unable to start main application!\n\nReason:\n' + err + '\n\nThis probably happened due new settings being added on internal database. Clearing all previous settings may solve this issue.\n\nDo you want to try?');
		if (conf === !0){
			
			// Clear internal storages
			localStorage.clear();
			sessionStorage.clear();

			// Restart app
			chrome.runtime.reload();
		
		}

	}

}