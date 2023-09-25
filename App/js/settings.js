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
		Settings menu templates
	*/

	// Screen res. list
	screenResList: [
		{w: 1280, h: 720,  flag: 'df'},
		{w: 1360, h: 768,  flag: '720p'},
		{w: 1366, h: 768,  flag: '720p'},
		{w: 1600, h: 900,  flag: '900p'},
		{w: 1920, h: 1080, flag: '1080p'},
		{w: 2560, h: 1080, flag: 'uw'},
		{w: 2560, h: 1440, flag: '1440p'},
		{w: 3840, h: 2160, flag: '4kRes'}
	],

	// Available input icons (App/img/input)
	availableInputIcons: [],

	/*
		Settings variables
	*/

	// Load error
	sLoadError: [],

	// Is app loading
	appIsLoading: !0,

	// Online status
	isOnline: !1,

	// Check online status interval
	onlineCheckInterval: void 0,

	// fpPS4 Commit SHA trimmed
	emuCommitShaSmall: '',

	// fpPS4 GitHub available branches
	emuGitHub_availableBranches: [],

	// fpPS4 GitHub available workflows
	emuGitHub_availableWorkflows: [],

	/*
		Debug flag:
		Set this variable on and you will see hell rise in shape of console.info / log / warn / error / table and more...

		It will set on if nw detects "--dev" flag
	*/
	debug: !1,

	// Settings list
	data: {

		/*
			GUI
		*/

		// Boot launcher in fullscreen mode
		bootFullscreen: !1,

		// Screen res.
		cScreenRes: 0,
		screenWidth: 1280,
		screenHeight: 720,

		// Scale mode ('zoom' or 'transform')
		screenScaleMode: 'transform',

		// Cache images on boot process
		cacheImgaesOnBoot: !0,

		// Display clock [WIP]
		guiDisplayClock: !1,

		/*
			Accessibility
		*/

		// Zoom factor
		guiZoomScale: 1,

		// Log window
		logWindowMode: 'normal',
		logExecExternalWindow: !1,
		logPauseOnExitProcess: !0,

		/*
			Background linear-gradient colors
			[TODO] Easter - ["#58c8f280","#eda4b280","#fff8","#eda4b280","#58c8f280"]
		*/
		backgroundGradient: ['#0042cb', '#191d47'],

		// Game list display mode ('list', 'compact' or 'orbis')
		gameListMode: 'list',

		/*
			Messages
		*/
		MSG_upgrdeFromPreviousVersion: !1,

		/*
			General
		*/
		launcherVersion: '',

		/*
			Language
		*/
		langId: '',
		appLanguage: 'english',

		/*
			Paths
		*/
		nwPath: '',
		appPath: '',
		gamePaths: [],
		fpPS4_Path: '',
		externalFontPath: '',

		/*
			Updater
		*/
		updaterEnableNightlyLink: !1,

		// Launcher updater variables
		launcher_commitSha: '',
		launcher_commitData: '',
		enableLauncherUpdates: !0,

		// fpPS4 Updater variables
		fpPS4_commitSha: '',
		fpPS4_commitData: '', // info about update
		enableEmuUpdates: !0,
		fpPS4_branch: 'trunk',
		fpPS4_selectedCI: 'Main CI',

		/*
			Run fpPS4
		*/
		fpPS4_enableFullScreen: !1,

		/*
			Gamepad Input
		*/

		/*
			Icon style (Default: DualSense 'DS')

			List:
				DS:   DualSense
				DS4:  DualShock 4
				NSW:  Nintendo Switch [TODO]
				X360: Xbox 360 
		*/
		input_iconStyle: 'DS',

		// Enable rumble on Launcher
		input_enableRumbleLauncher: !0,

		// Toggle checkbox input - ACTION_0 (Cross) or ACTION_2 (Square)
		input_toggleCheckBox: 'ACTION_0',

		/*
			Controller bingings
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
		gPadInput_ARROW_RIGHT: 15,

		/*
			Keyboard Input
		*/
		kbInput_ACTION_0: 'Numpad5',	   // Confirm (Cross)
		kbInput_ACTION_1: 'Numpad6',	   // Cancel (Circle)
		kbInput_ACTION_2: 'Numpad4',	   // Square
		kbInput_ACTION_3: 'Numpad8',	   // Triangle

		kbInput_ACTION_4: 'NumpadDecimal', // Options
		kbInput_ACTION_5: 'Numpad0',	   // Share

		kbInput_ACTION_6: 'KeyQ',	   	   // L1
		kbInput_ACTION_7: 'KeyE',	   	   // L2
		kbInput_ACTION_8: 'Numpad7',	   // R1
		kbInput_ACTION_9: 'Numpad9',	   // R2
		kbInput_ACTION_10: 'Numpad1',	   // L3
		kbInput_ACTION_11: 'Numpad3',	   // R3

		kbInput_ACTION_12: 'Numpad2',	   // Home / PS Button

		kbInput_ARROW_UP: 'KeyW',
		kbInput_ARROW_DOWN: 'KeyS',
		kbInput_ARROW_LEFT: 'KeyA',
		kbInput_ARROW_RIGHT: 'KeyD'

	},

	/*
		Settings functions
	*/

	/*
		Load settings
		[TODO] - Create condition of loading settings from localstorage if local file does not exists! 
	*/
	load: function(){

		// Set paths
		this.appPath = APP.tools.fixPath(process.cwd());
		this.nwPath = APP.path.parse(APP.tools.fixPath(process.execPath)).dir;

		// Check for --dev flag
		if (nw.App.argv.indexOf('--dev') !== -1){
			APP.settings.nwPath = APP.tools.fixPath(process.cwd());
			APP.settings.appPath = APP.tools.fixPath(process.cwd() + '/App');
		}

		// Check if are running on editor
		if (APP.urlParams.get('dev') === 'true'){
			APP.settings.nwPath = APP.tools.fixPath(atob(APP.urlParams.get('nwPath')));
			APP.settings.appPath = APP.tools.fixPath(atob(APP.urlParams.get('nwPath')) + 'App');
		}

		// Set and load external font
		this.data.externalFontPath = this.nwPath + '/Assets/font.ttf';

		// Get launcher main dir before settings load
		var updateSettings = !1,
			nwPath = this.nwPath,
			settingsPath = nwPath + '/Settings/Settings.json';

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
				APP.log.add({data: APP.lang.getVariable('infoSettingsUpdated')});
				APP.settings.save();
			}

			// Post loading actions
			APP.settings.postLoading();
			

		} catch (err) {

			// Log error
			console.error(APP.lang.getVariable('settingsLoadError', [err]));
			APP.settings.sLoadError.push(err);

		}

		// Debug log
		APP.log.add({mode: 'info', data: 'INFO - (Settings) - Settings list:'});
		APP.log.add({mode: 'table', data: this.data});

	},

	// Save settings
	save: function(callback){

		// Include current launcher version on settings
		this.data.launcherVersion = APP.manifest.version;

		try {

			// Check if settings folder exists - if not, try creating it!
			if (APP.fs.existsSync(APP.settings.nwPath + '/Settings') === !1){
				APP.fs.mkdirSync(APP.settings.nwPath + '/Settings');
			}

			// Write file
			APP.fs.writeFileSync(APP.settings.nwPath + '/Settings/Settings.json', JSON.stringify(this.data), 'utf8');
			localStorage.setItem('BACKUP_SETTINGS', JSON.stringify(this.data));

			// Execute callback
			if (typeof callback === 'function'){
				callback();
			}

		} catch (err) {
			throw new Error(APP.lang.getVariable('settingsSaveError', [err]));
		}

	},

	// Process Post-loading data
	postLoading: function(){

		// Load external font
		APP.design.loadExternalFont();

		// Load license
		APP.license = APP.fs.readFileSync(APP.settings.appPath + '/licenseFormat', 'utf8');

		// Set fpPS4 sha trimmed
		this.emuCommitShaSmall = this.data.fpPS4_commitSha.slice(0, 7);

	},

	/*
		Settings menu functions
	*/

	// Apply settings
	apply: function(data){

		// Check if data is provided
		if (data !== void 0 && Object.keys(data).length !== 0){

			// Update data
			Object.keys(data).forEach(function(cSettings){
				APP.settings.data[cSettings] = data[cSettings];
			});

			// Save settings
			APP.settings.save();

		}

		// Debug - Clear log and console.table settings
		APP.log.add({cls: !0, mode: 'table', data: this.data});

	},

	/*
		Boot functions
	*/

	// Set check online status
	startOnlineCheck: function(){

		// Set interval
		this.onlineCheckInterval = setInterval(async function(){
			APP.settings.isOnline = await APP.tools.checkOnlineStatus();
		}, 5000);

	},

	// Check paths
	checkPaths: function(){

		// Variables
		var	pathBase = this.nwPath,
			nextAction = 'loadInputIconList',
			pathList = [
				'Logs',
				'Games',
				'fpPS4',
				'Assets',
				'Logs/fpPS4',
				'Logs/Launcher',
				'Settings/Game Settings'
			];

		try {

			// Process path list
			pathList.forEach(function(fName){

				// Path name
				const cPath = pathBase + '/' + fName;

				// If current path does not exists, try creating it
				if (APP.fs.existsSync(cPath) === !1){
					APP.fs.mkdirSync(cPath);
				}

			});

		} catch (err) {

			// On error, push to settings error list
			console.error(err);
			APP.settings.sLoadError.push(err);
			nextAction = 'bootCheck';

		}

		// Execute next action
		this[nextAction]();

	},

	// Load input icon list
	loadInputIconList: function(){

		// Variables
		var pathBase = this.appPath,
			nextAction = 'checkEmuStatus';

		try {

			// Read input icon path
			APP.settings.availableInputIcons = APP.fs.readdirSync(pathBase + '/img/input');
			APP.settings.availableInputIcons.splice(APP.settings.availableInputIcons.indexOf('KBM'), 1);

		} catch (err) {
			console.error(err);
			APP.settings.sLoadError.push(err);
			nextAction = 'bootCheck';
		}

		// End
		this[nextAction]();

	},

	// Check fpPS4 status
	checkEmuStatus: function(){

		// Variables
		var nextAction = 'loadHackList',
			emuPath = this.data.fpPS4_Path;

		// Check if fpPS4 exists on selected path
		if (APP.fs.existsSync(emuPath) === !1){

			// Set default path
			emuPath = APP.settings.nwPath + '/fpPS4/fpPS4.exe';

			// Check if emu is found
			if (APP.fs.existsSync(emuPath) === !1){

				// Push error
				APP.settings.sLoadError.push('emuIsMissing');
				nextAction = 'bootCheck';

			} else {

				// Set emu path and save
				APP.settings.data.fpPS4_Path = emuPath;
				APP.settings.save();

			}

		}

		// Load next action
		this[nextAction](emuPath);

	},

	// Load hack list
	loadHackList: function(emuPath, cb){

		// Variables
		var isBootProcess = this.appIsLoading,
			res, nextAction = 'fetchGitHubData',
			enableHackString = '  -h <name>  //enable hack\r';

		// Create promise
		return new Promise(function(resolve){

			// Get fpPS4 main output
			APP.exec.run({exe: emuPath, useLogWindow: !1, printLog: !1, callback: function(exitCode){

				// If exit code is ok
			    if (exitCode === 0){

	    			// Reset hack list
					APP.emumanager.hackList = {};

			    	// Generate list
			    	var outData = APP.exec.outputData.split('\n'),
			    		hList = outData.splice((outData.indexOf(enableHackString) + 1));

			    	// Check if is a valid fpPS4 file
			    	if (outData.indexOf(enableHackString) !== -1){

						// Process list
			    		hList.forEach(function(cHack){

			    			// Check if string is empty
			    			if (cHack !== ''){

			    				// Get hack data
			    				var hackName = cHack.slice(0, cHack.indexOf('//')).replace(RegExp(' ', 'gi'), ''),
			    					hackDesc = cHack.slice((cHack.indexOf('//') + 2), cHack.indexOf('\r'));

			    				// Set hack data
			    				APP.emumanager.hackList[hackName] = hackDesc;

			    				// Log data
			    				APP.log.add({data: 'INFO - (Setitngs) Updating hack list database (Loading ' + hackName + ')'});

			    			}

			    		});

			    	} else {
			    		throw new Error('This is not a valid fpPS4 executable!');
			    	}

			    } else {

			    	// Set default error type
			    	var errorType = 'errorLoadHackList';

			    	// Switch error types
			    	switch (exitCode){

			    		// Missing DLL
			    		case 3221225781:
			    			errorType = 'errorLoadHackListDLL';
			    			break;

			    	}

			    	// Check if is on app is on boot process
			    	if (isBootProcess === !0){

			    		// Push error list
			    		APP.settings.sLoadError.push(errorType);
				    	nextAction = 'bootCheck';

			    	}

			    }

		    	// Load next action
			    if (isBootProcess === !0){
				    res = APP.settings[nextAction](!0);
			    } else {

			    	// Check if callback exists
			    	if (typeof cb === 'function'){
			    		res = cb(exitCode);
			    	}

			    }

			    // End
			    resolve(res);

			}});

		});

	},

	// Fetch GitHub data
	fetchGitHubData: function(callback){

		// Variables
		var nextAction = 'loadForms',
			isBootProcess = this.appIsLoading,
			nAction = function(){
				if (typeof callback === 'function'){
					callback();
				}
				if (isBootProcess === !0){
					APP.settings[nextAction]();
				}
			};

		if (this.isOnline === !0){

			// Get fpPS4 GitHub data
			APP.updater.emu_getCI(function(){
				nAction();
			});

		} else {

			// Push error
			APP.settings.sLoadError.push('launcherOffline');
			nAction();
		}

	},

	// Load design forms
	loadForms: function(){

		// Variables
		var pathBase = this.appPath,
			isBootProcess = this.appIsLoading;

		try {

			// Get form list
			const formList = APP.fs.readdirSync(pathBase + '/forms');
			formList.forEach(function(cForm){

				// Get form path
				var fName = APP.path.parse(cForm).name,
					fPath = pathBase + '/forms/' + cForm;

				// Check if current file is a form 
				if (APP.path.parse(fPath).ext.toLowerCase() === '.htm'){

					// Load form
					APP.design.formList[fName] = APP.fs.readFileSync(fPath, 'utf8');

				}

			});

		} catch (err) {

			// On error, push to settings error list
			if (isBootProcess === !0){
				APP.settings.sLoadError.push(err);
			}

			// Output error
			throw new Error(err);

		}

		// If launcher is on boot process, run boot check
		if (isBootProcess === !0){
			APP.settings.bootCheck();
		}

	},

	// Check variables on boot
	bootCheck: function(){

		// Variables
		var mList = '',
			mName = '',
			errorReason = APP.tools.convertArrayToString(this.sLoadError);

		// If there's no errors on boot
		if (errorReason === ''){

			/*
				TODO
				Check if needds to display message of upgrade from previous version - if so, display message
			*/

		} else {

			// If JSON is corrupted
			if (errorReason.indexOf('SyntaxError: ') !== -1){
				mList = 'launcherBoot';
				mName = 'msgSettingsFileCorrupted';
			}

			// Switch error types
			switch (errorReason){

				// Case fpPS4 was not found.
				case 'emuIsMissing':
					mList = 'launcherBoot';
					mName = 'msgSettingsRequestEmuUpdate';
					break;

				// Unable to get hack list (Default)
				case 'errorLoadHackList':
					mList = 'launcherBoot';
					mName = 'msgSettingsErrorHackList';
					break;

				// Unable to get hack list (Missing DLL)
				case 'errorLoadHackListDLL':
					mList = 'launcherBoot';
					mName = 'msgSettingsErrorHackListDLL';
					break;

			}

		}

		// End
		APP.design.bootMessageData = {showBgIcon: !0, msgList: mList, msgName: mName};
		APP.design.bootCheck();

	}

}