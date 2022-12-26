/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	emumanager.js

	This file contains all functions / variables about running main project 
	executable and game module checks.
	******************************************************************************
*/

temp_EMUMANAGER = {

	// Emulator is running
	emuRunning: !1,

	// Emu boot counter
	emuCountdown: 0,
	emuRunCounter: 0,

	// Error List
	emuErrorList: [],
	
	// Run emu
	runGame: function(){

		// Get selected game details
		const mainGameData = APP.gameList.list[APP.gameList.selectedGame];

		// If user selected a game
		if (mainGameData !== void 0){

			// Reset Error List
			APP.emuManager.emuErrorList = [];

			// Options: Clear log on emu starts
			if (APP.settings.data.clearLogOnEmuLoad === !0 && APP.emuManager.emuRunCounter !== 0){
				APP.clearLog(!0);
			}

			// Increase emu counters
			APP.emuManager.emuCountdown++;
			APP.emuManager.emuRunCounter++;

			// Set main variables
			var ebootPath = APP.gameList.list[APP.gameList.selectedGame].exe,
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
				appPath: mainGameData.exe,
				appIcon: mainGameData.icon,
				appName: mainGameData.name,
				paramSfo: mainGameData.paramSfo
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

		// Reset log
		APP.resetLauncher();

	},

	// Seek missing modules
	seekMissingModules: function(){

		// Check if module list existsa and if launcher captured any error
		if (this.emuErrorList.length !== 0 && APP.fs.existsSync(APP.settings.data.libPath) === !0){

			// Set variables
			var cMessage = '',
				importModuleList = [],
				libPath = APP.settings.data.libPath + '/' + APP.settings.data.selectedLibFolder,
				cGameModuleDir = APP.path.parse(APP.gameList.list[APP.gameList.selectedGame].exe).dir + '/sce_module',
				availableModuleList = APP.fs.readdirSync(libPath);

			// Check if current app / game contains module folder (sce_modules)
			if (APP.fs.existsSync(cGameModuleDir) === !0){

				// Start process
				APP.log('INFO - Seek Missing Modules: Running...');

				// Generate import list
				APP.emuManager.emuErrorList.forEach(function(cError){

					// Get Lib name
					var tempModNameStart = cError.slice(cError.indexOf(':') + 1),
						moduleName = tempModNameStart.slice(0, tempModNameStart.indexOf(':'));
					
					// Check if current module exists on list
					if (availableModuleList.indexOf(moduleName + '.prx') !== -1){
						importModuleList.push(moduleName + '.prx');
					}
					if (availableModuleList.indexOf(moduleName + '.sprx') !== -1){
						importModuleList.push(moduleName + '.sprx');
					}

				});

				/*
					Check if current modules already exists on current game module folder
					If so, skip it!
				*/
				importModuleList.forEach(function(cModule){
					if (APP.fs.existsSync(cGameModuleDir + '/' + cModule) === !0){
						importModuleList.splice(cModule, 1);
					}
				});

				// Check if still have modules to import
				if (importModuleList.length !== 0){

					// Confirm action
					const conf = window.confirm('[EXPERIMENTAL] - fpPS4 Temmie\'s Launcher detected that \"nop\" errors were presented during emulation and we noticed that ' +
												'modules present in errors do not exist in current game modules folder - they are:\n\n' + importModuleList.toString().replace(RegExp(',', 'gi'), '\n') +
												'\n\nDo you want to import them from your selected Lib folder?\n\n(If you don\'t want to see this prompt anymore, you can disable \"If fpPS4 returns any nop error, ' +
												'seek for missing modules\" option on Settings menu.)');
					if (conf === !0){

						// Get original module list
						var cMessage = '',
							cGameName = APP.gameList.list[APP.gameList.selectedGame].name;

						// Process import
						importModuleList.forEach(function(cModule){

							// Add module to imported list
							if (APP.gameList.cGameSettings.importedModules.indexOf(cModule) === -1){
								APP.gameList.cGameSettings.importedModules.push(cModule);
							}

							// Import module
							try {

								APP.fs.copyFileSync(libPath + '/' + cModule, cGameModuleDir + '/' + cModule);
								cMessage = 'INFO - (' + cGameName + ') Importing module: ' + cModule;

							} catch (err) {

								console.error(err);
								cMessage = 'ERROR - (' + cGameName + ') Unable to import ' + cModule + '!\nReason: ' + err;

							}

							// Log Message
							APP.log(cMessage);

						});

						// Update game settings
						APP.gameList.saveGameSettings(!0);

						// End
						window.alert('INFO - Process complete!\nTry running ' + cGameName + ' again and see if it works!\n\nYou can check log to see more details.');

					}

					// Add process complete + info
					APP.log('INFO - Seek Missing Modules: Process Complete!\nIMPORTANT - If you don\'t want to see these prompts anymore, you can do it by disabling \"If fpPS4 returns any nop error, seek for missing modules\" option on Settings.\n ');

				} else {

					// If no modules were found or files already exists on destination
					APP.log('INFO - Seek Missing Modules: No matching modules were found or required modules already exists on destination folder!');

				}

			}

		}

	}

}