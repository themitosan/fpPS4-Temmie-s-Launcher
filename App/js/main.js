/*
	main.js
*/

var APP = {

	// App version
	version: '1.0.0',

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
	log: function(text, skipLog){

		if (text !== '' && text !== void 0){

			var textarea = document.getElementById('APP_LOG'),
				previousLog = textarea.value,
				newLog = previousLog + '\n' + text;

			if (previousLog == ''){
				newLog = text;
			}

			if (previousLog.slice(previousLog.length - 1, previousLog.length) === '\n'){
				newLog = previousLog + text;
			}

			textarea.value = newLog;
			APP.logData = newLog;

			// If true, skip internal log
			if (skipLog !== !0){
				console.log(text);
			}

			// Scroll log
			textarea.scrollTop = textarea.scrollHeight;
		
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
				APP.log(data.toString(), !0);
			});
			APP.execProcess.stderr.on('data', function(data){
				APP.log(data.toString(), !0);
			});

			// Log on close
			APP.execProcess.on('close', function(code){
				process.chdir(APP.settings.data.nwPath);
				APP.emuManager.emuRunning = !1;
				APP.log('INFO - ' + APP.path.parse(exe).base + ' was closed returning code ' + code);
				APP.design.updateRunButtons();
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
	APP.log('fpPS4 Temmie\'s Launcher - Version: ' + APP.version + '\nRunning on nw.js (node-webkit) version ' + process.versions.nw);
	
	// Load settings
	APP.settings.load();
	APP.settings.checkPaths();

	// Load game list
	APP.gameList.load();

	// Rener hack list
	APP.design.renderHacklist();

}