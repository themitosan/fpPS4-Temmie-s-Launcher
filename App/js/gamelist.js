/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	gamelist.js

	This file contains all functions / variables related to creating and managing 
	gamelist
	******************************************************************************
*/

temp_GAMELIST = {
	
	// Game List
	list: {},

	// Selected game
	selectedGame: '',

	// Selected game settings
	cGameSettings: {},

	// Make game settings
	createGameSettings: function(data){

		// Temp JSON
		var logMessage = '',
			gameSettings = {
				name: data.name,
				hacks: data.hacks,
				usePatch: data.usePatch,
				isHomebrew: data.isHomebrew,
				patchLocation: data.patchLocation,
				importedModules: data.importedModules
			}

		// Write file
		try {

			APP.fs.writeFileSync(data.path, JSON.stringify(gameSettings), 'utf-8');
			logMessage = 'INFO - Settings file was created successfully for ' + data.name;
		
		} catch (err) {

			console.error(err);
			logMessage = 'ERROR - Unable to create settings file for ' + data.name + ' at ' + data.path + '!\nReason: ' + err;

		}

		// Log result
		APP.log(logMessage);

	},

	// Save game settings
	saveGameSettings: function(bypassCheck){

		// Variables
		var cHacks = {},
			logMessage = '',
			tempData = APP.gameList.cGameSettings,
			prevSettings = JSON.stringify(APP.gameList.cGameSettings),
			fPath = APP.path.parse(this.list[this.selectedGame].exe).dir + '/launcherSettings.json';

		/*
			Update settings
		*/

		// Update hack data
		APP.design.hackList.forEach(function(hName){
			cHacks[hName] = JSON.parse(document.getElementById('CHECK_' + hName).checked);
		});
		tempData.hacks = cHacks;

		// Update patch data
		tempData.usePatch = JSON.parse(document.getElementById('CHECKBOX_optionsEnablePatch').checked);

		/*
			Check if needs to update settings file
		*/
		if (JSON.stringify(tempData) !== prevSettings || bypassCheck === !0){

			// Write file
			try {

				APP.fs.writeFileSync(fPath, JSON.stringify(tempData), 'utf-8');
				logMessage = 'INFO - (' + APP.gameList.selectedGame + ') Settings file was updated successfully!';

			} catch (err) {

				console.error(err);
				logMessage = 'ERROR - Unable to update settings file for ' + APP.gameList.selectedGame + ' at ' + fPath + '!\nReason: ' + err;

			}

		} else {

			// Skip updating settings
			logMessage = 'INFO - (' + APP.gameList.selectedGame + ') Skip updating settings file since it has no changes!';			

		}

		// Log message
		if (bypassCheck !== !0){
			APP.log(logMessage);
		}

	},

	// Load game patch
	loadGamePatch: function(){

		if (this.selectedGame !== ''){

			// Get current game name
			const cGame = this.selectedGame;
			
			// Read path
			APP.fileManager.selectPath(function(pLocation){

				var logMessage = '';

				// Check if exists PARAM.SFO
				if (APP.fs.existsSync(pLocation + '/sce_sys/param.sfo') === !0){

					// Read PARAM.SFO
					const getParamSfo = APP.paramSfo.parse(pLocation + '/sce_sys/param.sfo');

					// Check if TITLE_ID matches current game
					if (getParamSfo.TITLE_ID === cGame){

						// Set variables
						APP.gameList.cGameSettings.patchLocation = pLocation;
						APP.gameList.saveGameSettings(!0);
						APP.design.selectGame(cGame);

						// Set log message
						logMessage = 'INFO - Patch loaded sucessfully!\nName: ' + getParamSfo.TITLE + '\nType: ' + APP.paramSfo.database.DB_CATEGORY[getParamSfo.CATEGORY];

					} else {

						// Version does not match current app / game
						logMessage = 'ERROR - This patch does not match for this app / game!\nPatch ID: ' + getParamSfo.TITLE_ID + '\nSelected app / game: ' + cGame;

					}

				} else {

					// Unable to find PARAM.SFO
					logMessage = 'ERROR - Unable to find PARAM.SFO for this patch!';

				}

				// Log message
				APP.log(logMessage);

			});

		}

	},

	// Load list
	load: function(){

		// Check if path exists
		if (APP.fs.existsSync(APP.settings.data.gamePath) === !0){

			// Reset selected game
			this.selectedGame = '';

			// Reset search box
			document.getElementById('INPUT_gameListSearch').value = '';

			// Reset game list
			APP.gameList.list = {};
			
			// Get game list
			const gList = APP.fs.readdirSync(APP.settings.data.gamePath);

			if (gList.length > 0){

				// Process game list
				gList.forEach(function(gPath){
		
					var appBg,
						appIcon,
						addGame = !0,
						paramSfo = {},
						appId = gPath,
						appName = gPath,
						isHomebrew = !1,
						iconList = [
							'sce_sys/icon0.png',
							'sce_sys/icon1.png'
						],
						backgroundList = [
							'sce_sys/pic1.png',
							'sce_sys/pic0.png'
						],
						pathBase = APP.settings.data.gamePath + '/' + gPath + '/',
						executableName = pathBase + 'eboot.bin',
						paramSfoPath = pathBase + 'sce_sys/param.sfo',
						playGoPath = pathBase + 'sce_sys/playgo-chunk.dat',
						playGoAvailable = APP.fs.existsSync(playGoPath),
						paramSfoAvailable = APP.fs.existsSync(paramSfoPath);
		
					// If eboot.bin doesn't exists, look for any .elf file
					if (APP.fs.existsSync(executableName) !== !0){

						// Seek .elf files on root dir
						var fList = APP.fs.readdirSync(pathBase),
							execName = fList.filter(function(fName){
								if (fName.toLowerCase().indexOf('.elf') !== -1){
									isHomebrew = !0;
									return fName;
								}
							})[0];

						// Set executable name - if not found (undefined), skip entry!
						executableName = pathBase + execName;
						if (execName === void 0){
							addGame = !1;
						}

					}

					// Seek App Icon
					for (var i = 0; i < iconList.length; i++){
						if (APP.fs.existsSync(pathBase + iconList[i]) === !0){
							appIcon = pathBase + iconList[i];
							break;
						}
					}
					
					// Seek App Background
					for (var i = 0; i < backgroundList.length; i++){
						if (APP.fs.existsSync(pathBase + backgroundList[i]) === !0){
							appBg = pathBase + backgroundList[i];
							break;
						}
					}

					// Check if Icon and Background exists - if not, use 404
					if (APP.fs.existsSync(appIcon) === !1){
						appIcon = APP.settings.data.nwPath + '/app/img/404.png'; 
					}
					if (APP.fs.existsSync(appBg) === !1){
						appBg = APP.settings.data.nwPath + '/app/img/404_BG.png';
					}

					// Warn if playgo-chunk.dat isn't available
					if (isHomebrew === !1 && playGoAvailable !== !0){
						APP.log('WARN - Unable to locate playgo-chunk.dat for ' + appName + '!\nIf this isn\'t a homebrew, check if this App / Game was dumped properly.');
					}

					// Warn if PARAM.SFO isn't available
					if (isHomebrew === !1 && paramSfoAvailable !== !0){
						APP.log('WARN - Unable to locate PARAM.SFO for ' + appName + '!\nIf this isn\'t a homebrew, check if this App / Game was dumped properly.');
					}

					// If PARAM.SFO is present (and enabled), get metadata
					if (APP.settings.data.enableParamSfo === !0 && paramSfoAvailable === !0){
						
						// Set PARAM.SFO variables
						paramSfo = APP.paramSfo.parse(paramSfoPath);

						// Set game entry
						appName = paramSfo.TITLE;
						appId = paramSfo.TITLE_ID;

					}

					// If executable exists, set data
					if (addGame === !0){

						// Add game to list
						APP.gameList.list[appId] = {
							bg: appBg,
							name: appName,
							icon: appIcon,
							folderName: gPath,
							paramSfo: paramSfo,
							exe: executableName,
							isHomebrew: isHomebrew
						}

					}
		
				});

			} else {

				// No games / homebrew found
				APP.log('INFO - No apps / games were detected on current path (' + APP.settings.data.gamePath + ')');

			}

			// Render game list
			APP.design.renderGameList();

		}

	},

	// Process Search List
	search: function(){

		var gameListArray = Object.keys(APP.gameList.list),
			searchQuery = document.getElementById('INPUT_gameListSearch').value;

		// If search query isn't empty and user has more than one game, process search
		if (searchQuery !== '' && gameListArray.length > 1){

			if (APP.gameList.selectedGame !== ''){
				APP.gameList.selectedGame = '';
				APP.design.update();
			}

			// Process search query
			var tempList, listRender = {};
			
			// Case game search mode is TITLE_ID
			if (APP.settings.data.gameSearchMode === 'titleId'){

				tempList = gameListArray.filter(function(cItem){ 
					if(cItem.indexOf(searchQuery) !== -1){
						return cItem;
					}
				});

			}

			// If game search mode is APP_NAME
			if (APP.settings.data.gameSearchMode === 'appName'){

				tempList = [];

				gameListArray.forEach(function(cTitle){

					var titleName = APP.gameList.list[cTitle].name;

					if (APP.settings.data.searchCaseSensitive === !1){
						titleName = APP.gameList.list[cTitle].name.toLowerCase();
						searchQuery = searchQuery.toLowerCase();
					}

					if (titleName.indexOf(searchQuery) !== -1){
						tempList.push(cTitle);
					}

				});

			}

			// Generate a new list
			tempList.forEach(function(cItem){
				listRender[cItem] = APP.gameList.list[cItem];
			});

			// Render new list
			if (Object.keys(listRender).length !== 0){
				APP.design.renderGameList({customList: listRender, displayLog: !1});
			} else {
				document.getElementById('DIV_LIST_INTERNAL').innerHTML = '<div class="DIV_noGameFound">Unable to find \"' + searchQuery + '\" </div>';
			}

		} else {

			// Render normal game list
			APP.gameList.load();
		
		}

	},

	// Check dump status
	checkDumpStatus: function(){

		var cGameStatus = 'DIV_ICON_STATUS_OK',
			cGame = this.list[this.selectedGame],
			fileList = [
				'param.sfo'
			],
			cGameStatusList = ['DIV_ICON_STATUS_OK', 'DIV_ICON_STATUS_WARN', 'DIV_ICON_STATUS_HB'],
			gPath = APP.settings.data.gamePath + '/' + cGame.folderName;

		// Process check for single files (like param.sfo)
		fileList.forEach(function(cFile){
			if (APP.fs.existsSync(gPath + '/sce_sys/' + cFile) !== !0){
				cGameStatus = 'DIV_ICON_STATUS_WARN';
			}
		});

		// Check if playgo-chunk.dat exists
		if (APP.fs.existsSync(gPath + '/sce_sys/playgo-chunk.dat') !== !0){
			cGameStatus = 'DIV_ICON_STATUS_WARN';
			
			// Check if playgo-chunk.dat is inside app folder
			if (APP.fs.existsSync(gPath + '/sce_sys/app/playgo-chunk.dat') === !0){
				APP.fs.copyFileSync(gPath + '/sce_sys/app/playgo-chunk.dat', gPath + '/sce_sys/playgo-chunk.dat');
				APP.log('INFO - (' + this.list[this.selectedGame].name + ') playgo-chunk.dat was found inside sce_sys/app - a new copy was created on sce_sys.');
			}
		
		}

		// Check if is homebrew (.elf)
		if (cGame.isHomebrew === !0){
			cGameStatus = 'DIV_ICON_STATUS_HB';
		}

		// Set app / game dump status
		cGameStatusList.forEach(function(cList){
			TMS.removeClass('DIV_selectedGameStatus', cList)
		});
		TMS.addClass('DIV_selectedGameStatus', cGameStatus);

	},

	// Open selected game location
	openGameLocation: function(){

		if (this.selectedGame !== ''){
			APP.fileManager.openDir(APP.settings.data.gamePath + '/' + this.list[this.selectedGame].folderName);
		}

	},

	// Export game metadata
	exportGameMetadata: function(){

		if (this.selectedGame !== '' && Object.keys(this.list[this.selectedGame].paramSfo).length !== 0){

			APP.fileManager.saveFile(this.selectedGame + '_metadata', '.json', 'utf-8', JSON.stringify(this.list[this.selectedGame].paramSfo), function(cPath){
				window.alert('INFO - Save successfull!\nPath: ' + cPath);
				APP.log('INFO - Save successfull!\nPath: ' + cPath);
			});

		}

	},

	// Reset current game settings
	resetGameSettings: function(){

		const cGame = this.selectedGame,
			fName = APP.settings.data.gamePath + '/' + this.list[cGame].folderName + '/launcherSettings.json',
			conf = window.confirm('WARN - This will delete all saved settings for \n' + this.list[cGame].name + '\n\nDo you want to continue?');

		if (this.selectedGame !== '' && APP.fs.existsSync(fName) === !0 && conf === !0){

			// Remove file
			try {

				// Remove settings file
				APP.fs.unlinkSync(fName);

				// Reload data
				setTimeout(function(){
					APP.gameList.selectedGame = '';
					APP.gameList.load();
					APP.design.selectGame(cGame);
					TMS.scrollCenter('GAME_ENTRY_' + cGame);
				}, 50);

			} catch (err) {

				console.error(err);
				APP.log('ERROR - Unable to remove settings file!\nReason: ' + err);

			}

		}

	},

	// Process remove modules
	removeAllModules: function(){

		// Check if this process already happened
		if (APP.settings.data.removedLibModules === !1){

			try {

				const gList = Object.keys(APP.gameList.list);
				gList.forEach(function(gName){

					APP.design.selectGame(gName);
					APP.gameList.removeImportedModules();

				}); 

				// Update settings
				APP.settings.data.removedLibModules = !0;
				APP.settings.save();

				APP.log('INFO - All previous imported modules using this launcher was removed since it could be harmful to your game dumps.');

			} catch (err) {
				console.error(err);
			}

		}

	},

	// Removed Imported modules
	removeImportedModules: function(){

		if (this.selectedGame !== '' && this.cGameSettings.importedModules.length > 0){

			var cMessage = '',
				gName = this.selectedGame,
				mList = this.cGameSettings.importedModules,
				mDir = APP.settings.data.gamePath + '/' + APP.gameList.list[gName].folderName + '/sce_module/';

			// Try removing modules
			mList.forEach(function(mName){

				try {

					APP.fs.unlinkSync(mDir + mName);
					mList.splice(mList.indexOf(mName), 1);
					cMessage = 'INFO - (' + gName + ') Removing module: ' + mName;

				} catch (err) {
					
					console.error(err);
					cMessage = 'ERROR - Unable to remove modules!\nReason: ' + err;
					
				}

				// Log status
				APP.log(cMessage);

			});

			// Update settings file
			this.saveGameSettings(!0);

		}

	}

}
