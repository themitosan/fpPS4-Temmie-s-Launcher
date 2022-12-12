/*
	emumanager.js
*/

temp_EMUMANAGER = {

	// Emulator is running
	emuRunning: !1,
	
	// Run emu
	runGame: function(){

		// If user selected a game
		if (APP.gameList.list[APP.gameList.selectedGame] !== void 0){
			
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

			// Log emu args
			APP.log('\nINFO - Running fpPS4 with args: ' + emuArgs.toString().replace(RegExp(',', 'gi'), ' ') + '\n\n');

			// Run fpPS4
			APP.runExec(APP.settings.data.emuPath, emuArgs);
			this.emuRunning = !0;

			// Update GUI
			APP.design.updateRunButtons();
		
		}

	},

	// Kill emu process
	killEmu: function(){
		
		process.kill(APP.execProcess.pid);
		this.emuRunning = !1;

	}

}