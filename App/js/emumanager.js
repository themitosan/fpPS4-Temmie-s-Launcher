/*
	emumanager.js
*/

temp_EMUMANAGER = {

	// Emulator is running
	emuRunning: !1,

	// Emu boot counter
	emuCountdown: 0,
	emuRunCounter: 0,
	
	// Run emu
	runGame: function(){

		// Get selected game details
		const mainGameData = APP.gameList.list[APP.gameList.selectedGame];

		// If user selected a game
		if (mainGameData !== void 0){

			// Options: Clear log on emu starts
			if (APP.settings.data.clearLogOnEmuLoad === !0 && APP.emuManager.emuRunCounter !== 0){
				APP.clearLog(!0);
			}

			// Increase emu countdown
			APP.emuManager.emuRunCounter++;
			APP.emuManager.emuCountdown++;

			// Set main variables
			var ebootPath = APP.gameList.list[APP.gameList.selectedGame].eboot,
				emuArgs = ['-e', ebootPath],
				hList = APP.design.hackList;
			
			// Get enabled hacks
			hList.forEach(function(hackName){
				if (document.getElementById('CHECK_' + hackName).checked === !0){
					emuArgs.push('-h');
					emuArgs.push(hackName);
				}
			});

			// Log emu location and args
			APP.log('\nINFO - Running fpPS4 with args: ' + emuArgs.toString().replace(RegExp(',', 'gi'), ' ') + '\nEmu location: ' + APP.settings.data.emuPath + '\n\n');

			// Run fpPS4
			APP.runExec(APP.settings.data.emuPath, emuArgs);
			this.emuRunning = !0;

			// Update main GUI
			APP.design.update();
			APP.design.toggleDisplayMode({
				appStatus: 'Running',
				appIcon: mainGameData.icon,
				appName: mainGameData.name,
				appPath: mainGameData.eboot
			});

			// Save game settings
			APP.gameList.saveGameSettings();
		
		}

	},

	// Stop fpPS4
	killEmu: function(){
		
		// Kill process and set emu running var to false
		APP.getProcessInfo('fpPS4.exe', function(pData){
			process.kill(pData.th32ProcessID);
			this.emuRunning = !1;
		});
		
		// Reset log color
		TMS.css('APP_LOG', {
			'color': '#0f0',
			'background-image': 'linear-gradient(180deg, #000000db, #090f1b)'
		});

		// Reset log
		APP.resetLauncher();

	}

}