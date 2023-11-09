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

			APP.fs.writeFileSync(data.path, JSON.stringify(gameSettings), 'utf8');
			logMessage = APP.lang.getVariable('createdSettingsFile', [data.name]);
		
		} catch (err) {

			console.error(err);
			logMessage = APP.lang.getVariable('errorCreateSettingsFile', [data.name, data.path, err]);

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

				APP.fs.writeFileSync(fPath, JSON.stringify(tempData), 'utf8');
				logMessage = APP.lang.getVariable('updateGameSettings', [APP.gameList.selectedGame]);

			} catch (err) {

				console.error(err);
				logMessage = APP.lang.getVariable('updateGameSettingsError', [APP.gameList.selectedGame, fPath, err]);

			}

		} else {

			// Skip updating settings
			logMessage = APP.lang.getVariable('skipUpdateGameSettings', [APP.gameList.selectedGame]);			

		}

		// Log message
		if (bypassCheck !== !0){
			APP.log(logMessage);
		}

	},

	// Toggle enable / disable game patch
	toggleGamePatch: function(){

		// Get current game id
		const cGame = this.selectedGame,
			listTop = document.getElementById('DIV_LIST_INTERNAL').scrollTop;

		// Update GUI
		APP.tools.processCheckbox('CHECKBOX_optionsEnablePatch');
		this.saveGameSettings(!0);
		APP.design.update();
		this.load();

		// Select current game
		APP.design.selectGame(cGame);

		// Update scroll
		document.getElementById('DIV_LIST_INTERNAL').scrollTop = listTop;

	},

    // Check for SDL2.dll in emu folder
    checkSdl2: function() {
        // check if the checkbox is checked (so people can disable it normally)
        if (document.getElementById("CHECKBOX_optionsEnableSDL2").checked) {

            // Get path for sdl2.dll
            const sdl2Path = APP.tools.fixPath(nw.__dirname) + "/Emu/SDL2.dll";

            // Check if sdl2.dll exists and give an alert when its not found
            if (!APP.fs.existsSync(sdl2Path)) {
                window.alert(APP.lang.getVariable("Sdl2NotFound"));
            }
        }
    },

    // Toggle enable / disable SDL2
	toggleSdl2: function(){

		// Get current game id
		const cGame = this.selectedGame,
			listTop = document.getElementById('DIV_LIST_INTERNAL').scrollTop;

		// Update GUI
		APP.tools.processCheckbox('CHECKBOX_optionsEnableSDL2');
		this.saveGameSettings(!0);
		APP.design.update();
		this.load();

		// Select current game
		APP.design.selectGame(cGame);

		// Update scroll
		document.getElementById('DIV_LIST_INTERNAL').scrollTop = listTop;

	},

	// Load game patch
	loadGamePatch: function(){

		if (this.selectedGame !== ''){

			var logMessage = '',
				cGame = this.selectedGame;
			
			// Read path
			APP.fileManager.selectPath(function(pLocation){

				// Check if exists PARAM.SFO
				if (APP.fs.existsSync(pLocation + '/sce_sys/param.sfo') === !0){

					// Read PARAM.SFO
					const getParamSfo = APP.paramSfo.parse(pLocation + '/sce_sys/param.sfo');

					// Check if TITLE_ID matches current game
					if (getParamSfo.TITLE_ID === cGame && getParamSfo.CATEGORY !== 'ac'){

						// Set variables
						APP.gameList.cGameSettings.patchLocation = pLocation;
						APP.gameList.saveGameSettings(!0);
						APP.gameList.load();
						APP.design.selectGame(cGame);

						// Set log message
						logMessage = APP.lang.getVariable('patchLoadedSucessfully', [getParamSfo.TITLE, APP.paramSfo.database.DB_CATEGORY[getParamSfo.CATEGORY]]);

					} else {

						// Version does not match current app / game
						logMessage = APP.lang.getVariable('patchLoadErrorMismatch', [getParamSfo.TITLE_ID, cGame]);

					}

				} else {

					// Unable to find PARAM.SFO
					logMessage = APP.lang.getVariable('patchLoadErrorParamSfo404');

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
						settingsFile = {},
						iconList = ['sce_sys/icon0.png', 'sce_sys/icon1.png'],
						backgroundList = ['sce_sys/pic1.png', 'sce_sys/pic0.png'],
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
						APP.log(APP.lang.getVariable('gameListLoadWarnPlayGo', [appName]));
					}

					// Warn if PARAM.SFO isn't available
					if (isHomebrew === !1 && paramSfoAvailable !== !0){
						APP.log(APP.lang.getVariable('gameListLoadWarnParamSfo', [appName]));
					}

					// If PARAM.SFO is present (and enabled), get metadata
					if (APP.settings.data.enableParamSfo === !0 && paramSfoAvailable === !0){
						
						// Set PARAM.SFO variables
						paramSfo = APP.paramSfo.parse(paramSfoPath);

						// Set game entry
						appName = paramSfo.TITLE;
						appId = paramSfo.TITLE_ID;

					}

					// Check if settings file exists for current game
					if (APP.fs.existsSync(pathBase + '/launcherSettings.json') === !0){
						settingsFile = JSON.parse(APP.fs.readFileSync(pathBase + '/launcherSettings.json'));
					}

					// If executable exists, set data
					if (addGame === !0){

						const metadata = {
							bg: appBg,
							name: appName,
							icon: appIcon,
							folderName: gPath,
							paramSfo: paramSfo,
							exe: executableName,
							isHomebrew: isHomebrew,
							settingsFile: settingsFile
						};

						// Add game to list
						if (APP.gameList.list[appId] === void 0){
							APP.gameList.list[appId] = metadata;
						} else {
							APP.log(APP.lang.getVariable('gameListDoubleIdError', [appName, APP.gameList.list[appId].name]));
						}

					}
		
				});

			} else {

				// No games / homebrew found
				APP.log(APP.lang.getVariable('gameListNoGameFound', [APP.settings.data.gamePath]))

			}

			// Render game list
			APP.design.renderGameList();

		} else {

			// Unable to find selected game path
			APP.log(APP.lang.getVariable('gamelistGamePath404', [APP.settings.data.gamePath]));

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
				document.getElementById('DIV_LIST_INTERNAL').innerHTML = '<div class="DIV_noGameFound">' + APP.lang.getVariable('gameListSearch404') + ' \"' + searchQuery + '\"</div>';
			}

		} else {

			// Render normal game list
			APP.gameList.load();
		
		}

	},

	// Check dump status
	checkDumpStatus: function(){

		var cGameStatus = 'OK',
			cGame = this.list[this.selectedGame],
			fileList = [
				'param.sfo'
			],
			cGameStatusList = ['DIV_ICON_STATUS_OK', 'DIV_ICON_STATUS_WARN', 'DIV_ICON_STATUS_HB'],
			gPath = APP.settings.data.gamePath + '/' + cGame.folderName;

		// Process check for single files (like param.sfo)
		fileList.forEach(function(cFile){
			if (APP.fs.existsSync(gPath + '/sce_sys/' + cFile) !== !0){
				cGameStatus = 'WARN';
			}
		});

		// Check if playgo-chunk.dat exists
		if (APP.fs.existsSync(gPath + '/sce_sys/playgo-chunk.dat') !== !0){
			cGameStatus = 'WARN';
			
			// Check if playgo-chunk.dat is inside app folder
			if (APP.fs.existsSync(gPath + '/sce_sys/app/playgo-chunk.dat') === !0){
				APP.fs.copyFileSync(gPath + '/sce_sys/app/playgo-chunk.dat', gPath + '/sce_sys/playgo-chunk.dat');
				APP.log(APP.lang.getVariable('checkDumpPlayGoOnApp', [this.list[this.selectedGame].name]));
			}
		
		}

		// Check if is homebrew (.elf)
		if (cGame.isHomebrew === !0){
			cGameStatus = 'HB';
		}

		// Set app / game dump status
		cGameStatusList.forEach(function(cList){
			TMS.removeClass('DIV_selectedGameStatus', cList);
		});
		TMS.addClass('DIV_selectedGameStatus', 'DIV_ICON_STATUS_' + cGameStatus);
		document.getElementById('DIV_selectedGameStatus').innerHTML = APP.lang.getVariable('dumpStatus_' + cGameStatus);

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

			APP.fileManager.saveFile(this.selectedGame + '_metadata', '.json', 'utf8', JSON.stringify(this.list[this.selectedGame].paramSfo), function(cPath){
				window.alert(APP.lang.getVariable('saveSucessfullPath', [cPath]));
				APP.log(APP.lang.getVariable('saveSucessfullPath', [cPath]));
			});

		}

	},

	// Reset current game settings
	resetGameSettings: function(){

		const cGame = this.selectedGame,
			fName = APP.settings.data.gamePath + '/' + this.list[cGame].folderName + '/launcherSettings.json',
			conf = window.confirm(APP.lang.getVariable('settingsConfirmRemoveGameSettings', [this.list[cGame].name]));

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
				APP.log(APP.lang.getVariable('settingsRemoveGameSettingsError', [cGame, err]));

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

				// Log
				APP.log(APP.lang.getVariable('removedLibModules'));

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
					cMessage = APP.lang.getVariable('removeLibModule', [gName, mName]);

				} catch (err) {
					
					console.error(err);
					cMessage = APP.lang.getVariable('removeModuleError', [err]);
					
				}

				// Log status
				APP.log(cMessage);

			});

			// Update settings file
			this.saveGameSettings(!0);

		}

	}

}