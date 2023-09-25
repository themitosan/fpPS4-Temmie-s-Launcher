/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		emumanager.js

		This file contains contains all modules related to fpPS4 and it's 
		functionality.

	***********************************************************************************
*/

temp_EMUMANAGER = {

	/*
		Variables 
	*/

	// fpPS4 is running
	emuRunning: !1,

	// Load error reason
	loadErrorReason: '',

	// Hack list
	hackList: {},

	// Selected game metadata
	tempSettings: '',
	cGameSettings: {},

	// Error list
	emuErrorList: [],

	/*
		Functions
	*/

	// Run fpPS4
	run: function(){

		// Reset load error
		this.loadErrorReason = '';

		// Variables
		var canRun = !0,
			entrySettings = {},
			settingsList = APP.settings.data,
			emuPath = settingsList.fpPS4_Path,
			msgError = {showBgIcon: !0, msgName: 'runEmuError_default'},
			entryMetadata = APP.gameList.list[APP.gameList.selectedGame],
			executablePath = entryMetadata.path + entryMetadata.execFile;

		// Check if executable exists
		if (APP.fs.existsSync(emuPath) !== !0){
			canRun = !1;
			this.loadErrorReason = APP.lang.getVariable('runEmuError_emu404', [APP.path.parse(emuPath).base]);
		}

		// Check if entry executable exists
		if (APP.fs.existsSync(executablePath) !== !0){
			canRun = !1;
			this.loadErrorReason = APP.lang.getVariable('runEmuError_entry404', [entryMetadata.entryName]);
		}

		// Check if fpPS4 is already running
		if (this.emuRunning === !0){
			canRun = !1;
			this.loadErrorReason = APP.lang.getVariable('runEmuError_emuRunning');
		}

		// Try loading settings
		try {
			entrySettings = JSON.parse(APP.fs.readFileSync(APP.settings.nwPath + '/Settings/Game Settings/' + entryMetadata.entryName + '.json', 'utf8'));
		} catch (err) {
			canRun = !1;
			this.loadErrorReason = APP.lang.getVariable('runEmuError_settingsLoad', [err]);
		}

		/*
			End
		*/

		// Check if can run emu
		if (canRun === !0){

			// Set window onFocus action
			APP.design.winOnFocusAction = function(){
				APP.design.animations.ANIMATION_showEmuRunningOptions();
			};

			// Set window onBlur action
			APP.design.winOnBlurAction = function(){
				APP.design.animations.ANIMATION_hideEmuRunningOptions();
			};

			// Variables
			var argList = ['-e', executablePath];

			// Start fpPS4 in fullscreen mode
			if (settingsList.fpPS4_enableFullScreen === !0){
				argList.push('-w');
			}

			// Get enabled hacks
			Object.keys(entrySettings.hackList).forEach(function(cHack){

				// If hack is enabled
				if (entrySettings.hackList[cHack] === !0){
					argList.push('-h');
					argList.push(cHack);
				}

			});

			/*
				Run fpPS4
			*/

			// Set emuRunning
			APP.emumanager.emuRunning = !0;

			// Clear console and log data
			APP.log.add({cls: !0, data: 'INFO - Running fpPS4\nArgs: ' + argList.toString().replace(RegExp(',', 'gi'), ' ') + '\nPath: ' + emuPath});

			// Release input
			APP.input.releaseInput();

			// Run fpPS4
			APP.exec.run({
				isEmu: !0,
				exe: emuPath,
				printLog: !0,
				args: argList,
				useLogWindow: settingsList.logExecExternalWindow
			});

		} else {

			// Display error
			console.error('ERROR - (emumanager) Unable to run fpPS4\n' + msgError.msgName);
			APP.design.msgsys.displayMsg(msgError);

		}

	},

	// Stop fpPS4
	stop: function(){

		// Seek if fpPS4 is still runnning. If so, kill it!
		APP.exec.killProcess(APP.settings.data.fpPS4_Path);

		// Execute animation
		APP.design.animations.ANIMATION_closeEmu(function(){

			// Set emu running false
			APP.emumanager.emuRunning = !1;

			// Render game list
			APP.design.renderGameList(function(){

				// Render selected game
				APP.design.displaySelectedGame();

				// Release input
				APP.input.releaseInput();

			});

		});

	}

}