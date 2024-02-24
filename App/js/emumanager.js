/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	emumanager.js

	This file contains all functions / variables about running main project 
	executable, game module checks and updating fpPS4 executable.
	******************************************************************************
*/

temp_EMUMANAGER = {

	// Emulator is running
	emuRunning: !1,
	
	// Update functions
	update: temp_EMU_UPDATE,

	// Run emu
	runGame: function(){

		// Get selected game details and check if user selected a game
		const mainGameData = APP.gameList.list[APP.gameList.selectedGame];
		if (mainGameData !== void 0){

			// Reset Error List and clear log on emu running (if needed)
			APP.emuManager.emuErrorList = [];
			if (APP.settings.data.clearLogOnEmuLoad === !0 && APP.emuManager.emuRunCounter !== 0){
				APP.clearLog(!0);
			}

			// If (by some reason) main emu still running, close it and set main variables
			this.killEmu(!0);
			var ebootPath = APP.gameList.list[APP.gameList.selectedGame].exe,
				emuArgs = ['-e', ebootPath],
				hList = APP.design.hackList;
			
			// Check if patches are available
			if (APP.gameList.cGameSettings.usePatch === !0 && APP.design.gamePatchLoaded === !0){
				emuArgs.push('-p');
				emuArgs.push(`\"${APP.gameList.cGameSettings.patchLocation}\"`);
			}

			// Get enabled hacks
			hList.forEach(function(hackName){
				if (document.getElementById(`CHECK_${hackName}`).checked === !0){
					emuArgs.push('-h');
					emuArgs.push(hackName);
				}
			});

			// Push gamepad mode
			const padMode = document.getElementById('FPPS4_OPTIONS_SELECT_GAMEPAD_MODE').value;
			if (padMode === 'sdl2' && APP.gameList.checkSdl2() === !1){
				emuArgs.push('-pad "keyboard"');
			} else {
				emuArgs.push(`-pad "${padMode}"`);
			}

			// Add fullscreen flag if it's enabled
			if (APP.settings.data.enableEmuFullscreen === !0){
				emuArgs.push('-w');
			}

			// Log emu location and args and run fpPS4
			APP.log(APP.lang.getVariable('runEmuArgs', [emuArgs.toString().replace(RegExp(',', 'gi'), ' '), APP.settings.data.emuPath]));
			APP.runfpPS4(APP.settings.data.emuPath, emuArgs);

			// Update main GUI
			APP.design.update();
			APP.design.toggleDisplayMode({
				appPath: mainGameData.exe,
				appIcon: mainGameData.icon,
				appName: mainGameData.name,
				paramSfo: mainGameData.paramSfo,
				appStatus: APP.lang.getVariable('emuStatusRunning')
			});

			// Save game settings
			APP.gameList.saveGameSettings();

		}

	},

	// Stop fpPS4
	killEmu: function(){
		
		// Update status
		if (this.emuRunning === !0){
			document.getElementById('LABEL_GAME_DETAILS_STATUS').innerHTML = APP.lang.getVariable('killEmuStatus');
			TMS.css('DIV_GAME_DETAILS', {'display': 'flex'});
		}

		// Kill process and set emu running var to false
		APP.getProcessInfo(APP.path.parse(APP.settings.data.emuPath).base, function(pData){
			process.kill(pData.th32ProcessID);
			this.emuRunning = !1;
		});

	}

}
