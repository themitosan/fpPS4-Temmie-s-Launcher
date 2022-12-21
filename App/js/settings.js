/*
	settings.js
*/

temp_SETTINGS = {
	
	// Settings list
	data: {

		// Paths
		nwPath: '',
		emuPath: '',
		gamePath: '',
		
		// GUI Settings
		gui: {

			// Background Opacity
			bgEmuOpacity: 0.6,
			bgListOpacity: 0.7,

			// Background Blur
			bgEmuBlur: 6,
			bgListBlur: 2,

			showBgOnEntry: !0,
			showPathEntry: !0,
			showPathRunning: !0,
			gameListMode: 'normal'

		},

		/*
			Log Options
			
			Quick note: If in the future this launcher manages to load .pkg or .sfo files,
			these options will display TITLE_ID insead of folder name.
		*/
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

	// Select game path
	selectGamePath: function() {

		APP.fileManager.selectPath(function(newGamePath){
			document.getElementById('LBL_SETTINGS_gamePath').innerHTML = newGamePath;
			APP.settings.data.gamePath = newGamePath;
			APP.settings.save();
			APP.gameList.load();
		});

	},

	// Select fpPS4 path
	selectEmuPath: function() {

		APP.fileManager.selectFile('.exe', function(newEmuPath){
			document.getElementById('LBL_SETTINGS_emuPath').innerHTML = newEmuPath;
			APP.settings.data.emuPath = newEmuPath;
			APP.settings.save();
			APP.gameList.load();
		});

	}	

}