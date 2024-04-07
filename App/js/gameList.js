/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		gamelist.js
	
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

	// Create settings for provided entry name
	makeSettings: function(entryName){

		// Variables
		var hList = {};

		// Get hack list
		Object.keys(APP.emumanager.hackList).forEach(function(hName){
			hList[hName] = !1;
		});

		// Final metadata
		const metadata = {

			// Hack list
			hackList: hList,

			// app0
			app0: {
				enabled: !1,
				location: ''
			},

			// Patch (app1)
			patch: {
				enabled: !1,
				location: ''
			}

		};

		// Try saving file
		try {

			APP.log.add({data: 'INFO - (Game List) Creating settings for ' + entryName});
			APP.fs.writeFileSync(APP.settings.nwPath + '/Settings/Game Settings/' + entryName + '.json', JSON.stringify(metadata), 'utf8');

		} catch (err) {
			throw new Error(err);
		}

	},

	// Generate game list
	make: function(callback){

		// Variables
		var pathList = [APP.settings.nwPath + '/Games'],
			getPrevBG = TMS.getCssData('APP_CANVAS_BG', 'background-image');

		// Reset current game list
		this.list = {};

		// Hide background image
		TMS.css('APP_CANVAS_BG', {'opacity': '0', 'transition-duration': '0s'});

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

		// Restore background image
		TMS.css('APP_CANVAS_BG', {'transition-duration': '0.2s', 'background-image': getPrevBG});

		// Execute callback
		if (typeof callback === 'function'){
			callback();
		}

		// End
		return 0;

	},

	// Parse Selected location
	processPath: function(path){

		// Log current path
		APP.log.add({data: 'INFO - (Game List) Processing ' + path});

		try {

			// Variables
			var pathData = APP.fs.readdirSync(path),
				tempHtml = '<div class="none" id="APP_TEMP_CACHE_IMG">',
				entrySettingsPath = APP.settings.nwPath + '/Settings/Game Settings';

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
							/*
								Status list:
								"ok": All files are present
								"mf": Missing files
								"hb": Homebrew
							*/
							status: 'ok',
							execFile: '',
							paramSfo: {},
							path: pathBase,
							isHomebrew: !1,
							missingFiles: [],
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

						// If found .elf file, set current entry metadata as homebrew
						if (finalMetadata.execFile !== void 0){

							finalMetadata.status = 'hb';
							finalMetadata.img_icon = 'img/HB.webp';
							finalMetadata.img_background = 'img/HB_BG.webp';

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
							sceSysPath = pathBase + 'sce_sys/',
							iconList = ['icon0.png', 'icon1.png'],
							paramSfoPath = sceSysPath + 'param.sfo',
							seekFileList = [
								// 'trophy/trophy01.trp',
								'playgo-chunk.dat'
							];

						// Check if entry isn't homebrew
						if (finalMetadata.status !== 'hb'){

							// If PARAM.SFO exists, import entry metadata and set entry name as TITLE_ID
							if (APP.fs.existsSync(paramSfoPath) === !0){

								finalMetadata.paramSfo = APP.paramSfo.parse(paramSfoPath);
								finalMetadata.entryName = finalMetadata.paramSfo.TITLE_ID;

							} else {

								// Push param.sfo to missing file list
								finalMetadata.status = 'mf';
								finalMetadata.missingFiles.push('sce_sys/param.sfo');

							}

							// Check for missing files
							seekFileList.forEach(function(cFile){
								if (APP.fs.existsSync(sceSysPath + cFile) === !1){
									finalMetadata.status = 'mf';
									finalMetadata.missingFiles.push('sce_sys/' + cFile);
								}
							});

							// Seek entry icon
							for (var i = 0; i < iconList.length; i++){
								if (APP.fs.existsSync(sceSysPath + iconList[i]) === !0){
									finalMetadata.img_icon = `file://${sceSysPath}${iconList[i]}`;
									break;
								}
							}

							// Seek entry background image
							for (var i = 0; i < bgList.length; i++){
								if (APP.fs.existsSync(sceSysPath + bgList[i]) === !0){
									finalMetadata.img_background = `file://${sceSysPath}${bgList[i]}`;
									break;
								}
							}

						}

					}

					// Check if already exists a entry with same name (or TITLE_ID)
					if (APP.gameList.list[finalMetadata.entryName] !== void 0){
						canAddEntry = !1;
						errorReason.push(APP.lang.getVariable('gameList_errorEntryAlreadyExists', [finalMetadata.entryName]));
					}

					/*
						End
						Check if can add entry to list
					*/
					if (canAddEntry === !0){

						// Check if exist game settings for current entry
						if (APP.fs.existsSync(entrySettingsPath + '/' + finalMetadata.entryName + '.json') === !1){
							APP.gameList.makeSettings(finalMetadata.entryName);
						}

						// Add image to be cached
						var newImg = `<img src="${finalMetadata.img_background}">`;
						if (tempHtml.indexOf(newImg) === -1){
							tempHtml = tempHtml + newImg;
						}

						// Add current entry to game list
						APP.gameList.list[finalMetadata.entryName] = finalMetadata;

					} else {

						// Unable to add file
						APP.log.add({mode: 'warn', data: APP.lang.getVariable('gameList_errorCantAddEntry', [finalMetadata.entryName, pathBase, APP.tools.convertArrayToString(errorReason)])});

					}

				});

				// Cache all images and then remove container with all images
				TMS.append('ASSETS_LIST', tempHtml + '</div>');
				TMS.removeDOM('APP_TEMP_CACHE_IMG');

			} else {

				// If no items were detected on provided path
				APP.log.add({mode: 'warn', data: APP.lang.getVariable('gameList_errorCurrentPathEmpty', [path])});

			}

		} catch (err) {
			throw new Error(err);
		}

	}

}