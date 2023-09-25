/*
	***********************************************************************************

		fpPS4 Temmie's launcher
		main.js

		This file contains all modules and required functions to initialize
		launcher

	***********************************************************************************
*/

// Main object
window['APP'] = {

	/*
		Main variables
	*/

	// Project license
	license: '',

	// Version
	appTitle: '',
	appVersion: '',

	// URL Parameters
	urlParams: new URLSearchParams(window.location.search),

	// App modules
	log: temp_LOG,
	exec: temp_EXEC,
	input: temp_INPUT,
	tools: temp_TOOLS,
	lang: temp_LANGUAGE,
	design: temp_DESIGN,
	updater: temp_UPDATER,
	gameList: temp_GAMELIST,
	paramSfo: temp_PARAMSFO,
	settings: temp_SETTINGS,
	emumanager: temp_EMUMANAGER,
	fileManager: temp_FILEMANAGER,
	scriptInterpreter: temp_INTERPRETER,

	// Temp variable
	temp: {},

	/*
		Main functions
	*/

	// Start loading process
	init: async function(){

		// Execute online check before loading
		this.settings.isOnline = await APP.tools.checkOnlineStatus();

		try {

			// Check if App is running on debug mode
			APP.checkDebug();

			// Load nodejs modules
			APP.loadModules();

			// Set app title
			APP.getAppTitle();

			// Load Settings
			APP.settings.load();

			// Start window behavior functions
			APP.design.initWindowFn();

			// Update canvas res
			APP.design.updateCanvasRes();

			// Load interpreter scripts
			APP.scriptInterpreter.init();

			// Load selected language
			APP.lang.load();

			// Load msg files
			APP.design.msgsys.loadMsgs();

			// Init keyboard input
			APP.input.initKbMouse();

			// Init gamepad input
			APP.input.initGamepad();

			// Start online check
			APP.settings.startOnlineCheck();

			// Start boot sequence
			APP.settings.checkPaths();

		} catch (err) {
			throw new Error(err);
		}

	},

	// Check if app is running on debug mode
	checkDebug: function(){

		// Check if is running with dev flag from browser
		if (this.urlParams.get('dev') === 'true' || nw.App.argv.indexOf('--dev') !== -1){
			this.settings.debug = !0;
		}

	},

	// Get App title
	getAppTitle: function(){

		// Get debug state
		this.appVersion = APP.manifest.version;

		// Check if is app is running on editor
		if (this.urlParams.get('dev') === 'true'){
			this.appTitle = 'fpPS4 Temmie\'s Launcher';
		} else {
			this.appTitle = 'fpPS4 Temmie\'s Launcher - Ver. ' + APP.appVersion + ' [' + process.versions['nw-flavor'].toUpperCase() + '] (' + APP.manifest.hash.slice(0, 7) + ')';
		}

		// Set window title
		document.title = APP.tools.removeHTML(APP.appTitle);

	},

	// Load NWJS / NodeJS modules
	loadModules: function(){

		try {

			// Check if are running on editor
			if (APP.urlParams.get('dev') === 'true'){
				require = window.top.require;
				process = window.top.process;
				nw = window.top.nw;
			}

			// Variables
			var external = {
				//'memoryjs': 'memoryjs',
				'streamZip': 'node-stream-zip'
			}

			// Check if --dev arg is present
			if (APP.settings.debug === !0 && APP.urlParams.get('dev') !== 'true'){

				// Load external modules from App/node_modules instead
				Object.keys(external).forEach(function(cModule){
					external[cModule] = 'App/node_modules/' + external[cModule];
				});

			}

			// Load modules
			APP['fs'] = require('fs');
			APP['win'] = nw.Window.get();
			APP['path'] = require('path');
			APP['https'] = require('https');
			APP['manifest'] = nw.App.manifest;
			APP['childProcess'] = require('child_process');

			// Load external modules
			Object.keys(external).forEach(function(cModule){
				APP[cModule] = require(external[cModule]);
			});

		} catch (err) {

			// Alert error
			console.error(err);
			document.title = 'ERROR';
			window.alert('ERROR - Unable to load modules!\n' + err);

			// Check if is a navigator
			if (typeof require === 'undefined'){
				document.title = 'Wait...';
				window.alert('Wait...\nAre you trying to load fpPS4 Temmie\'s launcher on a common browser?');
				setTimeout(function(){
					location.href = 'https://github.com/themitosan/fpps4-temmie-s-launcher';
				}, 110);
			}

		}

	},

	// MemoryJS - Get Process Info
	getProcessInfo: function(processName){

		// Check input
		if (this.memoryjs !== void 0 && processName !== void 0 && processName !== ''){

			// Get process list
			var res, pList = this.memoryjs.getProcesses();

			// Seek process
			Object.keys(pList).forEach(function(pName){
				if (pList[pName].szExeFile.toLowerCase() === processName.toLowerCase()){
					res = pList[pName];
				}
			});

			// Return result
			return res;

		}

	},

	// Close app
	exit: function(){

		// Seek if fpPS4 process is active
		this.exec.killProcess(APP.settings.data.fpPS4_Path);

		// Export log
		return this.log.export(!1).then(function(){

			// If there's no loading error
			if (APP.settings.settingsLoadError === ''){

				// Save before closing
				APP.settings.save(function(){
					nw.App.quit();
				});

			} else {

				// If got errors, exit without saving
				nw.App.quit();

			}

		});

	},

	// Reload app
	reload: function(){

		// Seek if fpPS4 process is active
		this.exec.killProcess(APP.settings.data.fpPS4_Path);

		// Export log
		this.log.export(!1).then(function(){

			// If there's no loading error
			if (this.settings.settingsLoadError === ''){

				// Save before closing
				this.settings.save(function(){
					chrome.runtime.reload();
				});

			} else {

				// If got errors, reload without saving
				chrome.runtime.reload();

			}

		});

	}

}

// Delete temp modules
delete temp_LOG;
delete temp_EXEC;
delete temp_INPUT;
delete temp_TOOLS;
delete temp_DESIGN;
delete temp_UPDATER;
delete temp_GAMELIST;
delete temp_LANGUAGE;
delete temp_PARAMSFO;
delete temp_SETTINGS;
delete temp_EMUMANAGER;
delete temp_FILEMANAGER;
delete temp_INTERPRETER;