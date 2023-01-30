/*
	******************************************************************************
	
		fpPS4 Temmie's Launcher
		settings.js

		This file is contains all functions / variables related to launcher
		settings.
	
	******************************************************************************
*/

temp_SETTINGS = {

	/*
		Settings variables
	*/

	// Load error
	settingsLoadError: [],

	// Settings list
	data: {
		
		/*
			GUI
		*/

		// Background linear-gradient colors
		backgroundColor_top: '0042cb',
		backgroundColor_bottom: '191d47',

		// Game list display mode [list, compact or orbis]
		gameListMode: 'list',

		/*
			Messages
		*/
		MSG_upgrdeFromPreviousVersion: !1,

		/*
			General
		*/
		launcherVersion: '',
		appLanguage: 'english',

		/*
			Paths
		*/
		nwPath: '',
		fpPS4Path: '',
		gamePaths: [],

		/*
			Gamepad Input
			By default - it's configured for Sony Dualsense (Without DS4Windows)
		*/
		gPadInput_ACTION_0: 0, 	 // Confirm (Cross)
		gPadInput_ACTION_1: 1, 	 // Cancel (Circle)
		gPadInput_ACTION_2: 2, 	 // Square
		gPadInput_ACTION_3: 3, 	 // Triangle

		gPadInput_ACTION_4: 9, 	 // Options
		gPadInput_ACTION_5: 8, 	 // Share

		gPadInput_ACTION_6: 4, 	 // L1
		gPadInput_ACTION_7: 6, 	 // L2
		gPadInput_ACTION_8: 5, 	 // R1
		gPadInput_ACTION_9: 7, 	 // R2
		gPadInput_ACTION_10: 10, // L3
		gPadInput_ACTION_11: 11, // R3

		gPadInput_ACTION_12: 16, // Home / PS Button

		gPadInput_ARROW_UP: 12,
		gPadInput_ARROW_DOWN: 13,
		gPadInput_ARROW_LEFT: 14,
		gPadInput_ARROW_RIGHT: 15

	},

	/*
		Settings functions
	*/

	// Load settings
	load: function(){

		// Fix path
		this.data.nwPath = APP.tools.fixPath(nw.__dirname);

		// Get launcher main dir before settings load
		var updateSettings = !1,
			nwPath = this.data.nwPath,
			settingsPath = nwPath + '/Settings.json';

		// Create save
		if (APP.fs.existsSync(settingsPath) === !1){
			APP.settings.save();
		}

		try {

			// Read settings file
			var loadSettings = JSON.parse(APP.fs.readFileSync(settingsPath, 'utf8'));
			
			// Check for obsolete settings
			Object.keys(loadSettings).forEach(function(cSettings){

				if (APP.settings.data[cSettings] === void 0){
					delete loadSettings[cSettings];
					updateSettings = !0;
				}

			});

			// Fix new settings data
			Object.keys(this.data).forEach(function(cSettings){

				if (loadSettings[cSettings] === void 0){
					loadSettings[cSettings] = APP.settings.data[cSettings];
					updateSettings = !0;
				}

			});

			// Load settings
			this.data = loadSettings;

			// Check if need to update settings file
			if (updateSettings === !0){
				APP.log(APP.lang.getVariable('infoSettingsUpdated'));
				APP.settings.save();
			}

		} catch (err) {

			console.error(APP.lang.getVariable('settingsLoadError', [err]));
			this.settingsLoadError = err;

		}

	},

	// Save settings
	save: function(callback){

		// Get launcher main dir before settings load
		const nwPath = APP.tools.fixPath(nw.__dirname);

		// Include current launcher version on settings
		this.data.launcherVersion = APP.packageJson.version;

		try {
			
			// Write file
			APP.fs.writeFileSync(nwPath + '/Settings.json', JSON.stringify(this.data), 'utf8');

			if (callback !== void 0){
				callback();
			}

		} catch (err) {
			console.error(APP.lang.getVariable('settingsSaveError', [err]));
		}

	},

	// Check paths
	checkPaths: function(){

		// Variables
		var	pathList = ['Games', 'fpPS4'],
			pathBase = this.data.nwPath;

		try {

			// Process path list
			pathList.forEach(function(cPath){

				// If current path does not exists, try creating it
				if (APP.fs.existsSync(cPath) === !1){
					APP.fs.mkdirSync(pathBase + '/' + cPath);
				}

			});

		} catch (err) {

			// On error, push to settings error list
			APP.settings.settingsLoadError.push(err);

		}

		// Execute boot check
		this.bootCheck();

	},

	// Check variables on boot
	bootCheck: function(){

		// Variables
		var finalMsg = {},
			errorReason = APP.tools.convertArrayToString(this.settingsLoadError);

		// If there's no errors on boot
		if (errorReason === ''){

			// Check if needds to display message of upgrade from previous version - if so, display message
			if (this.data.launcherVersion !== APP.appVersion){
				finalMsg = {msgList: 'launcherBoot', msgName: 'msgUpgradeSettingsVersion'};
				this.save();
			}

		} else {

			// Set default error screen
			finalMsg = {msgList: 'launcherBoot', msgName: 'msgSettingsLoadError'};

			// If JSON is corrupted
			if (errorReason.indexOf('SyntaxError: ') !== -1){
				finalMsg = {msgList: 'launcherBoot', msgName: 'msgSettingsFileCorrupted'};
			}

		}

		/*
			End
		*/
		APP.design.bootMessageData = finalMsg;
		APP.design.bootCheck();

	}

}