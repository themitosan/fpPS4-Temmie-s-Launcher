/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		gameList.js
	
		This file contains all functions related to game list

	***********************************************************************************
*/

temp_GAMELIST = {

	/*
		Game list variables
	*/

	// Game list
	list: {},

	// Selected game
	selectedGame: '',

	/*
		Game list functions
	*/

	// Generate game list
	make: function(callback){

		// Variables
		var pathList = [APP.settings.data.nwPath + '/Games'];

		// Reset current game list
		this.list = {};

		// Check if there game paths to import 
		if (APP.settings.data.gamePaths.length !== 0){

			// Import paths
			APP.settings.data.gamePaths.forEach(function(cPath){

				// Check if current path already exists on list
				if (pathList.indexOf(cPath) === -1){
					pathList.push(cPath);
				}

			});

		}

		// Process path list
		pathList.forEach(function(cPath){
			APP.gameList.processPath(cPath);
		});

		// If callback exists, execute
		if (callback !== void 0 && typeof callback === 'function'){
			callback();
		}

	},

	// Parse Selected location
	processPath: function(path){

		console.info('Processing ' + path);

		try {

			// Read selected path
			const pathData = APP.fs.readdirSync(path);
			
			// If path contains items inside
			if (pathData.length !== 0){

				// Process path
				pathData.forEach(function(cEntry){

					// Variables
					var canAddEntry = !0,
						errorReason = [],
						pathBase = path + '/' + cEntry + '/',
						fileList = APP.fs.readdirSync(pathBase),
						
						// Final metadata
						finalMetadata = {
							execFile: '',
							paramSfo: {},
							path: pathBase,
							isHomebrew: !1,
							entryName: cEntry,
							img_icon: 'img/404.webp',
							img_background: 'img/404_BG.webp'
						};

					/*
						Start checks
					*/

					// If main eboot.bin exists
					if (fileList.indexOf('eboot.bin') !== -1){
						finalMetadata.execFile = 'eboot.bin';
					}

					// If main eboot.bin does not exists, seek any .elf file
					if (finalMetadata.execFile === ''){

						// Set executable as first entry of elf file present
						finalMetadata.execFile = fileList.filter(function(elf){
							if(elf.indexOf('.elf') !== -1){
								return elf;
							} 
						})[0];

						// If found .elf file, set current entry as homebrew
						if (finalMetadata.execFile !== void 0){
							finalMetadata.isHomebrew = !0;
						} else {
	
							// If didn't found any executable / .elf file
							canAddEntry = !1;
							errorReason.push(APP.lang.getVariable('gameList_errorExecutable404'));
	
						}

					}

					// Check if can continue reading entry data
					if (canAddEntry === !0){

						// Variables
						var bgList = ['pic1.png', 'pic0.png'],
							iconList = ['icon1.png', 'icon0.png'],
							paramSfoPath = pathBase + '/sce_sys/param.sfo';

						// If PARAM.SFO exists, import entry metadata and set entry name as TITLE_ID
						if (APP.fs.existsSync(paramSfoPath) === !0){

							finalMetadata.paramSfo = APP.paramSfo.parse(paramSfoPath);
							finalMetadata.entryName = finalMetadata.paramSfo.TITLE_ID;

							// Check if already exists a entry with same name (or TITLE_ID)
							if (APP.gameList.list[finalMetadata.entryName] !== void 0){
								canAddEntry = !1;
								errorReason.push(APP.lang.getVariable('gameList_errorEntryAlreadyExists', [finalMetadata.entryName]));
							}

						}

						// Seek entry icon
						for (var i = 0; i < iconList.length; i++){
							if (APP.fs.existsSync(pathBase + 'sce_sys/' + iconList[i]) === !0){
								finalMetadata.img_icon = pathBase + 'sce_sys/' + iconList[i];
								break;
							}
						}

						// Seek entry background image
						for (var i = 0; i < bgList.length; i++){
							if (APP.fs.existsSync(pathBase + 'sce_sys/' + bgList[i]) === !0){
								finalMetadata.img_background = pathBase + 'sce_sys/' + bgList[i];
								break;
							}
						}

					}

					/*
						End
						Check if can add entry to list
					*/
					if (canAddEntry === !0){

						// Add current entry to game list
						APP.gameList.list[finalMetadata.entryName] = finalMetadata;

					} else {

						// Unable to add file
						console.warn(APP.lang.getVariable('gameList_errorCantAddEntry', [finalMetadata.entryName, pathBase, APP.tools.convertArrayToString(errorReason)]));

					}

				});

			} else {

				// If no items were detected on provided path
				console.warn(APP.lang.getVariable('gameList_errorCurrentPathEmpty', [path]));

			}

		} catch (err) {

			// Return error
			console.error(err);

		}

	}

}