/*
	***********************************************************************************

		fpPS4 Temmie's launcher
		main.js

		This file contains all modules and required functions to initialize 
		launcher

	***********************************************************************************
*/

// Main const
const APP = {

	// Version
	appTitle: '',
	appVersion: '',

	// App modules
	input: temp_INPUT,
	tools: temp_TOOLS,
	lang: temp_LANGUAGE,
	design: temp_DESIGN,
	gameList: temp_GAMELIST,
	paramSfo: temp_PARAMSFO,
	settings: temp_SETTINGS,

	/*
		Main functions
	*/

	// Load nwjs / node.js modules
	loadModules: function(){

		try {

			APP['fs'] = require('fs');
			APP['win'] = nw.Window.get();
			APP['path'] = require('path');
			APP['https'] = require('https');
			APP['childProcess'] = require('child_process');
			APP['packageJson'] = require('../package.json');
			APP['memoryjs'] = require('App/node_modules/memoryjs');
			APP['streamZip'] = require('App/node_modules/node-stream-zip');

		} catch (err) {

			// Alert error
			window.alert('ERROR - Unable to load modules!\n' + err);
			console.error(err);

		}

	},

	// Log [WIP]
	log: function(msg){
		console.log('(LOG) ' + msg);
	},

	// Close app
	exit: function(){
		
		// If there's no loading error
		if (APP.settings.settingsLoadError === ''){
	
			// Save before closing
			this.settings.save(function(){
				nw.App.quit();
			});
	
		} else {

			// If got errors, exit without saving
			nw.App.quit();
		
		}

	}

}

// Delete modules
delete temp_INPUT;
delete temp_TOOLS;
delete temp_DESIGN;
delete temp_GAMELIST;
delete temp_LANGUAGE;
delete temp_PARAMSFO;
delete temp_SETTINGS;

// Init
window.onload = function(){

	try {

		// Load nodejs modules
		APP.loadModules();

		// Set app title
		APP.appVersion = APP.packageJson.version;
		APP.appTitle = '<label class="LABEL_FPPS4_COLOR font-italic">fp</label>PS4 Temmie\'s Launcher - Ver. ' + APP.appVersion + ' [' + process.versions['nw-flavor'].toUpperCase() + ']';
		document.getElementById('DIV_TOP_WINDOW_DOCUMENT_TITLE').innerHTML = APP.appTitle;
		document.title = APP.tools.removeHTML(APP.appTitle);

		// Load Settings
		APP.settings.load();

		// Load selected language
		APP.lang.load();

		// Load msg files
		APP.design.msgSys.loadMsgs();

		// Init gamepad input
		APP.input.initGamepad();

		// Enable window drag
		APP.design.enableDragWindow();

		// Start boot sequence
		setTimeout(function(){
			APP.settings.checkPaths();
		}, 200);

	} catch (err) {
		console.error(err);
	}

}