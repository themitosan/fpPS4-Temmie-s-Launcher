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

		// Paths
		nwPath: '',
		emuPath: '',
		libPath: '',
		gamePath: '',
		
		// GUI Settings
		gui: {

			// Game search mode (appName or titleId)
			gameSearchMode: 'appName',

			// Background Opacity
			bgEmuOpacity: 0.6,
			bgListOpacity: 0.7,

			// Background Blur
			bgEmuBlur: 6,
			bgListBlur: 2,

			// (Grid) Icon size
			gridIconSize: 116,

			showBgOnEntry: !0,
			showPathEntry: !0,
			showPathRunning: !0,
			gameListMode: 'normal'

		},

		// Disable PARAM.SFO support
		enableParamSfo: !0,

		// Seek missing lib files (.prx or .sprx)
		selectedLibFolder: '',
		seekMissingModules: !1,

		// Log Options
		saveLogOnEmuClose: !1,
		clearLogOnEmuLoad: !1,
		logOnExternalWindow: !1
	
	},

	// Load settings
	load: function() {

		// Create save
		if (localStorage.getItem('settings') === null){
			APP.settings.save();
		}

		// Load settings from localStorage
		const settings = localStorage.getItem('settings');
		this.data = JSON.parse(settings);

	},

	// Save settings
	save: function() {
		localStorage.setItem('settings', JSON.stringify(this.data));
	},

	// Check paths
	checkPaths: function() {

		// Fix path
		this.data.nwPath = nw.__dirname.replace(RegExp('\\\\', 'gi'), '/');

		const mainPath = this.data.nwPath,
			pathList = [
				'/Emu',
				'/Lib',
				'/Logs',
				'/Games'
			];

		// Try create required paths
		pathList.forEach(function(cPath){

			if (APP.fs.existsSync(mainPath + cPath) !== !0){

				try {
					APP.fs.mkdirSync(mainPath + cPath);
				} catch (err) {
					APP.log('Unable to create path!\n(' + mainPath + cPath + ')\n' + err);
				}
				
			}

		});

		// Set Games / Emu paths and check if both exists
		if (this.data.gamePath === '' && APP.fs.existsSync(this.data.gamePath) === !1){
			APP.settings.data.gamePath = mainPath + '/Games';
		}

		// Lib path
		if (this.data.libPath === '' && APP.fs.existsSync(this.data.libPath) === !1){
			APP.settings.data.libPath = mainPath + '/Lib';
		}

		// fpPS4 path
		if (this.data.emuPath === '' || APP.fs.existsSync(this.data.emuPath) === !1){
			APP.settings.data.emuPath = mainPath + '/Emu/fpPS4.exe';
		}
		if (APP.fs.existsSync(this.data.emuPath) === !0){

			APP.log('INFO - Main fpPS4 was found!\nPath: ' + APP.settings.data.emuPath);

		} else {

			const errMsg = 'ERROR - Unable to locate main fpPS4 executable!\nMake sure to select it on settings or insert it on \"Emu\" folder and click on ok.';
			window.alert(errMsg);
			APP.log(errMsg);

		}

	},

	// Select path
	selectPath: function(data) {

		APP.fileManager.selectPath(function(newGamePath){
			document.getElementById(data.label).innerHTML = newGamePath;
			APP.settings.data[data.settings] = newGamePath;
			APP.settings.save();
			APP.gameList.load();
		});

	},

	// Select file
	selectFile: function(data) {

		APP.fileManager.selectFile(data.extension, function(newEmuPath){
			document.getElementById(data.label).innerHTML = newEmuPath;
			APP.settings.data[data.settings] = newEmuPath;
			APP.settings.save();
			APP.gameList.load();
		});

	},

	// Reset all game settings
	resetAllGameSettings: function() {

		// Confirm action
		const conf = window.confirm('WARN: This option will remove ALL saved settings from your game list.\nDo you want to continue?');
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
							cMessage = 'INFO - ( ' + APP.gameList.list[cGame].name + ' ) Settings file was removed sucessfully!';

						} catch (err) {

							cMessage = 'ERROR - ( ' + APP.gameList.list[cGame].name + ' ) Unable to delete settings file!\nReason: ' + err;
							console.error(err);

						}

					} else {

						// Unable to find settings file
						cMessage = 'WARN - ( ' + APP.gameList.list[cGame].name + ' ) Unable to find settings for this App / Game!'

					}

					// Log status
					APP.log(cMessage);

				});

				// Process complete
				window.alert('INFO - Process Complete!\nCheck log for more details.');
				APP.log('INFO - Reset Game Settings: Process Complete!');

			}			

		}

	}

}