/*
	main.js
*/

var APP = {

	// App version
	version: '1.0.0',
	appVersion: void 0,

	// Import nw modules
	fs: require('fs'),
	path: require('path'),
	childProcess: require('child_process'),

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
				document.getElementById('LABEL_GAME_DETAILS_STATUS').innerHTML = 'Error (<label class="user-can-select">' + text + '</label>)';
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
	resetLauncher: function(){
		
		if (APP.emuManager.emuCountdown > 1){

			// Get current date
			const d = new Date(),
				cTime = d.toDateString().replace(RegExp(' ', 'gi'), '_') + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds();

			// Write log file
			APP.fs.writeFileSync(APP.settings.data.nwPath + '/Logs/Log_' + cTime + '.log', APP.logData, 'utf-8');

			// Reset log
			APP.logData = APP.appVersion;
			document.getElementById('APP_LOG').value = APP.appVersion;
			APP.log('INFO - Current log was cleared! You can see all previous data on \"Logs/Log_' + cTime + '.log\"');

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
				process.chdir(APP.settings.data.nwPath);
				APP.emuManager.emuRunning = !1;

				// Update GUI
				APP.design.update();
				APP.design.toggleDisplayMode({
					appStatus: 'idle'
				});
				
				// Log exit code
				APP.log('INFO - ' + APP.path.parse(exe).base + ' was closed returning code ' + code);

				// Check if need to reset launcher
				APP.resetLauncher();

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

	// Main log
	APP.appVersion = 'fpPS4 Temmie\'s Launcher - Version: ' + APP.version + '\nRunning on nw.js (node-webkit) version ' + process.versions.nw;
	APP.log(APP.appVersion);
	
	// Load settings
	APP.settings.load();
	APP.settings.checkPaths();

	// Load game list
	APP.gameList.load();

	// Rener hack list
	APP.design.renderHacklist();

}