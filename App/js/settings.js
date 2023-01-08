/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	settings.js

	This file is contains all functions / variables related to settings menu
	and Launcher's look, behavior and more.
	******************************************************************************
*/

temp_SETTINGS = {
	
	// Settings list
	data: {

		/*
			General
		*/

		// Language
		appLanguage: 'english',

		// Remove Project.gp4 on game list load
		removeProjectGp4: !1,

		// Remove previous imported modules
		removedLibModules: !1,

		// Paths
		nwPath: '',
		emuPath: '',
		gamePath: '',

		// Enable / Disable PARAM.SFO support
		enableParamSfo: !0,

		// Log External window
		logExternalWindowPrompt: !0,
		logExternalWindowStartMode: 'normal',

		/*
			GUI
		*/

		// Game search mode (appName or titleId)
		gameSearchMode: 'appName',
		searchCaseSensitive: !1,

		// Background Opacity
		bgEmuOpacity: 0.6,
		bgListOpacity: 0.7,

		// Background Blur
		bgEmuBlur: 6,
		bgListBlur: 2,

		// (Grid)
		gridIconSize: 116,
		gridBorderRadius: 8,

		showBgOnEntry: !0,
		showPathEntry: !0,
		showPathRunning: !0,
		gameListMode: 'normal'
	
	},

	// Load settings
	load: function(){

		// Get launcher main dir before settings load
		var updateSettings = !1,
			nwPath = APP.tools.fixPath(nw.__dirname);

		// Create save
		if (APP.fs.existsSync(nwPath + '/Settings.json') === !1){
			APP.settings.save();
		}

		try {

			// Read settings file
			var loadSettings = JSON.parse(APP.fs.readFileSync(nwPath + '/Settings.json', 'utf8'));
			
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

			// Fix path
			this.data.nwPath = APP.tools.fixPath(nw.__dirname);

		} catch (err) {

			console.error(APP.lang.getVariable('settingsLoadError', [err]));

		}

	},

	// Save settings
	save: function(){
		
		// Get launcher main dir before settings load
		const nwPath = APP.tools.fixPath(nw.__dirname);

		try {
			APP.fs.writeFileSync(nwPath + '/Settings.json', JSON.stringify(this.data), 'utf8');
		} catch (err) {
			console.error(APP.lang.getVariable('settingsSaveError', [err]));
		}

	},

	// Load selected language
	loadLang: function(){

		try {

			const cLang = this.data.appLanguage,
				fileLocation = APP.settings.data.nwPath + '/Lang/' + cLang + '.json';

			// Check if lang file exists and if lang isn't english
			if (cLang !== 'english' && APP.fs.existsSync(fileLocation) === !0){

				// Get selected lang
				var getLangFile = APP.fs.readFileSync(fileLocation, 'utf8');
				APP.lang.selected = JSON.parse(getLangFile);

				// Update GUI
				APP.design.updateLang();

			} else {

				// Set english as default lang
				APP.lang.selected = APP.lang.english;				
			
			}

		} catch (err) {

			console.error(err);

		}	

	},

	// Check paths
	checkPaths: function(){

		var logMessage = '',
			mainPath = this.data.nwPath,
			pathList = ['/Emu', '/Games', '/Lang'];

		// Try create required paths
		pathList.forEach(function(cPath){

			if (APP.fs.existsSync(mainPath + cPath) !== !0){

				try {
					APP.fs.mkdirSync(mainPath + cPath);
				} catch (err) {
					APP.log(APP.lang.getVariable(settingsErrorCreatePath, [mainPath + cPath, err]));
				}
				
			}

		});

		// Set Games / Emu paths and check if both exists
		if (this.data.gamePath === '' && APP.fs.existsSync(this.data.gamePath) === !1){
			APP.settings.data.gamePath = mainPath + '/Games';
		}

		// fpPS4 path
		if (this.data.emuPath === '' || APP.fs.existsSync(this.data.emuPath) === !1){
			APP.settings.data.emuPath = mainPath + '/Emu/fpPS4.exe';
		}
		if (APP.fs.existsSync(this.data.emuPath) !== !0){

			logMessage = APP.lang.getVariable('settingsErrorfpPS4NotFound');
			window.alert(logMessage);

		}

		// Log message
		APP.log(logMessage);

	},	

	// Select path
	selectPath: function(data){

		APP.fileManager.selectPath(function(newGamePath){
			document.getElementById(data.label).innerHTML = newGamePath;
			APP.settings.data[data.settings] = newGamePath;
			APP.settings.save();
			APP.gameList.load();
		});

	},

	// Select file
	selectFile: function(data){

		APP.fileManager.selectFile(data.extension, function(newEmuPath){
			document.getElementById(data.label).innerHTML = newEmuPath;
			APP.settings.data[data.settings] = newEmuPath;
			APP.settings.save();
			APP.gameList.load();
		});

	},

	// Reset all game settings
	resetAllGameSettings: function(){

		// Confirm action
		const conf = window.confirm(APP.lang.getVariable('settingsConfirmRemoveAllGameSettings'));
		if (conf === !0){

			// Reset search form
			document.getElementById('INPUT_gameListSearch').value = '';

			// Get game list
			var cMessage = '',
				gList = Object.keys(APP.gameList.list);

			// Check if user has games and apps
			if (gList.length !== 0){

				// Process game list
				gList.forEach(function(cGame){

					// Check if settings file exists
					if (APP.fs.existsSync(APP.path.parse(APP.gameList.list[cGame].exe).dir + '/launcherSettings.json') === !0){

						try {

							APP.fs.unlinkSync(APP.path.parse(APP.gameList.list[cGame].exe).dir + '/launcherSettings.json');
							cMessage = APP.lang.getVariable('settingsRemovedGameSettings', [APP.gameList.list[cGame].name]);

						} catch (err) {

							cMessage = APP.lang.getVariable('settingsRemoveGameSettingsError', [APP.gameList.list[cGame].name, err]);
							console.error(err);

						}

					} else {

						// Unable to find settings file
						cMessage = APP.lang.getVariable('settingsRemoveGameSettings404', [APP.gameList.list[cGame].name]);

					}

					// Log status
					APP.log(cMessage);

				});

				// Process complete
				window.alert(APP.lang.getVariable('infoProcessComplete'));

			}

		}

	}

}