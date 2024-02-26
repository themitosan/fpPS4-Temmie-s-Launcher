/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	gamelist.js

	This file contains all functions / variables related to gamelist
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
				gamepadMode: data.gamepadMode,
				patchLocation: data.patchLocation
			};

		// Check if title location exists
		if (APP.fs.existsSync(APP.path.parse(data.path).dir) === !0){

			// Write file
			try {
				APP.fs.writeFileSync(data.path, JSON.stringify(gameSettings), 'utf-8');
				logMessage = APP.lang.getVariable('createdSettingsFile', [data.name]);
			} catch (err) {
				console.error(err);
				logMessage = APP.lang.getVariable('errorCreateSettingsFile', [data.name, data.path, err]);
			}

		} else {
			logMessage = APP.lang.getVariable('errorListUnableLocateGamePath', [data.name, data.path]);
			APP.gameList.load();
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
			fPath = `${APP.path.parse(this.list[this.selectedGame].exe).dir}/launcherSettings.json`;

		/*
			Update settings
		*/

		// Update hack data
		APP.design.hackList.forEach(function(hName){
			cHacks[hName] = JSON.parse(document.getElementById(`CHECK_${hName}`).checked);
		});
		tempData.hacks = cHacks;

		// Update patch data and gamepad mode
		tempData.gamepadMode = document.getElementById('FPPS4_OPTIONS_SELECT_GAMEPAD_MODE').value;
		tempData.usePatch = JSON.parse(document.getElementById('CHECKBOX_optionsEnablePatch').checked);

		/*
			Check if needs to update settings file
		*/
		if (JSON.stringify(tempData) !== prevSettings || bypassCheck === !0){

			// Write file
			try {

				APP.fs.writeFileSync(fPath, JSON.stringify(tempData), 'utf-8');
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
		const
			cGame = this.selectedGame,
			listTop = document.getElementById('DIV_LIST_INTERNAL').scrollTop;

		// Update GUI
		APP.tools.processCheckbox('CHECKBOX_optionsEnablePatch');
		this.saveGameSettings(!0);
		APP.design.update();
		this.load();

		// Select current game and update scroll
		APP.design.selectGame(cGame);
		document.getElementById('DIV_LIST_INTERNAL').scrollTop = listTop;

	},

    // Check for SDL2.dll in emu folder
    checkSdl2: function(){

        // Check if gamepad mode is sdl2
        if (document.getElementById('FPPS4_OPTIONS_SELECT_GAMEPAD_MODE').value === 'sdl2'){

            // Get path for sdl2.dll and check if exists. If not, give an alert when its not found.
            const
            	sdl2Path = `${APP.tools.fixPath(nw.__dirname)}/Emu/SDL2.dll`,
            	dllExists = APP.fs.existsSync(sdl2Path);
            if (!dllExists){
                window.alert(APP.lang.getVariable("Sdl2NotFound"));
            }

            return dllExists;

        }

    },

	// Load game patch
	loadGamePatch: function(){

		if (this.selectedGame !== ''){

			// Create main vars
			var logMessage = '',
				cGame = this.selectedGame;
			
			// Read path
			APP.fileManager.selectPath(function(pLocation){

				// Check if exists PARAM.SFO
				if (APP.fs.existsSync(`${pLocation}/sce_sys/param.sfo`) === !0){

					// Read PARAM.SFO and check if TITLE_ID matches current game
					const getParamSfo = APP.paramSfo.parse(`${pLocation}/sce_sys/param.sfo`);
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

			// Reset selected game, reset search box, reset game list and read game list path
			APP.gameList.list = {};
			this.selectedGame = '';
			document.getElementById('INPUT_gameListSearch').value = '';
			const gList = APP.fs.readdirSync(APP.settings.data.gamePath);

			// Check if game list isn't empty
			if (gList.length > 0){

				// Process game list
				gList.forEach(function(gPath){

					// Create main vars
					var appBg,
						appIcon,
						addGame = !0,
						paramSfo = {},
						appId = gPath,
						appName = gPath,
						isHomebrew = !1,
						settingsFile = {},
						pathBase = `${APP.settings.data.gamePath}/${gPath}/`,
						executableName = `${pathBase}eboot.bin`,
						paramSfoPath = `${pathBase}sce_sys/param.sfo`,
						playGoPath = `${pathBase}sce_sys/playgo-chunk.dat`,
						playGoAvailable = APP.fs.existsSync(playGoPath),
						paramSfoAvailable = APP.fs.existsSync(paramSfoPath),
						iconList = ['sce_sys/icon0.png', 'sce_sys/icon1.png'],
						backgroundList = ['sce_sys/pic1.png', 'sce_sys/pic0.png'];

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
						appIcon = `${APP.settings.data.nwPath}/App/img/404.png`; 
					}
					if (APP.fs.existsSync(appBg) === !1){
						appBg = `${APP.settings.data.nwPath}/App/img/404_BG.png`;
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
						
						// Set PARAM.SFO variables and game entry
						paramSfo = APP.paramSfo.parse(paramSfoPath);
						appId = paramSfo.TITLE_ID;
						appName = paramSfo.TITLE;

					}

					// Check if settings file exists for current game
					if (APP.fs.existsSync(`${pathBase}/launcherSettings.json`) === !0){
						settingsFile = JSON.parse(APP.fs.readFileSync(`${pathBase}/launcherSettings.json`));
					}

					// If executable exists, set data
					if (addGame === !0){

						// Create metadata
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

	// Process search list
	search: function(){

		// Create main search vars
		var gameListArray = Object.keys(APP.gameList.list),
			searchQuery = document.getElementById('INPUT_gameListSearch').value;

		// If search query isn't empty and user has more than one game, process search
		if (searchQuery !== '' && gameListArray.length > 1){

			if (APP.gameList.selectedGame !== ''){
				APP.gameList.selectedGame = '';
				APP.design.update();
			}

			// Create vars and process search query if current search mode is title id
			var tempList, listRender = {};
			if (APP.settings.data.gameSearchMode === 'titleId'){

				tempList = gameListArray.filter(function(cItem){ 
					if(cItem.indexOf(searchQuery) !== -1){
						return cItem;
					}
				});

			}

			// If game search mode is APP_NAME
			if (APP.settings.data.gameSearchMode === 'appName'){

				// Reset temp list and process game list
				tempList = [];
				gameListArray.forEach(function(cTitle){

					// Get title name and check if current search is case-sensitive
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
				document.getElementById('DIV_LIST_INTERNAL').innerHTML = `<div class="DIV_noGameFound">${APP.lang.getVariable('gameListSearch404')} \"${searchQuery}\"</div>`;
			}

		} else {

			// Render normal game list
			APP.gameList.load();

		}

	},

	// Check dump status
	checkDumpStatus: function(){

		// Declare main vars
		var cGameStatus = 'OK',
			fileList = [ 'param.sfo' ],
			cGameComapStatus = 'UNKNOWN',
			cGame = this.list[this.selectedGame],
			displayGameCompatHolderCss = { 'display': 'none' },
			gPath = `${APP.settings.data.gamePath}/${cGame.folderName}`,
			cDumpStatusList = [ 'DIV_ICON_STATUS_OK', 'DIV_ICON_STATUS_WARN', 'DIV_ICON_STATUS_HB' ],
			cGameComapStatusList = [ 'BOOTS', 'MENUS', 'INGAME', 'UNKNOWN', 'NOTHING', 'PLAYABLE', 'HOMEBREW' ];

		// Process check for single files (like param.sfo)
		fileList.forEach(function(cFile){
			if (APP.fs.existsSync(`${gPath}/sce_sys/${cFile}`) !== !0){
				cGameStatus = 'WARN';
			}
		});

		// Check if playgo-chunk.dat exists
		if (APP.fs.existsSync(`${gPath}/sce_sys/playgo-chunk.dat`) !== !0){

			// Set current game status to warn and check if playgo-chunk.dat is inside app folder
			cGameStatus = 'WARN';
			if (APP.fs.existsSync(`${gPath}/sce_sys/app/playgo-chunk.dat`) === !0){
				APP.fs.copyFileSync(`${gPath}/sce_sys/app/playgo-chunk.dat`, `${gPath}/sce_sys/playgo-chunk.dat`);
				APP.log(APP.lang.getVariable('checkDumpPlayGoOnApp', [cGame.name]));
			}

		}

		// Set current compat css / status
		const updateCompat = function(){

			// Remove all other conditions and set current one
			TMS.css('DIV_FPPS4_GAME_STATUS', displayGameCompatHolderCss);
			cGameComapStatusList.forEach(function(cStatus){
				TMS.removeClass('DIV_selectedGameStatus_compat', `DIV_COMPAT_STATUS_${cStatus}`);
			});
			TMS.addClass('DIV_selectedGameStatus_compat', `DIV_COMPAT_STATUS_${cGameComapStatus}`);
			document.getElementById('DIV_selectedGameStatus_compat').innerHTML = APP.lang.getVariable(`cGameCompatStatus_${cGameComapStatus}`);

		}

		// Check if can display game compat status
		if (APP.webConnection === !0){
			
			// Update display css and if game isn't a homebrew, get compat data from fpps4.net
			displayGameCompatHolderCss = { 'display': 'flex' };
			if (cGame.isHomebrew !== !0){

				// Get current game conde and try getting data
				const cGameCode = structuredClone(APP.gameList.selectedGame);
				fetch(`https://fpps4.net/_scripts/search.php?q=${cGameCode}`)
				.then(function(resp){
					return resp.json();
				}).then(function(gData){

					// Check if data is defined
					if (gData !== void 0){

						// Process game list
						var gFound = !1;
						for (let i = 0; i < gData.games.length; i++){

							// Check if current game code matches
							if (gData.games[i].code === cGameCode){
								cGameComapStatus = gData.games[i].tag.toUpperCase();
								gFound = !0;
								break;
							}

						}

						// Log warn if failed to find game compat status
						if (gFound === !1){
							APP.log(APP.lang.getVariable('warnUnableFindGameCompatDb', [APP.gameList.list[cGameCode].name, cGameCode]));
						}
						updateCompat();

					}

				});

			} else {
				updateCompat();
			}

		} else {
			updateCompat();
		}

		// Check if is homebrew (.elf)
		if (cGame.isHomebrew === !0){
			cGameStatus = 'HB';
			cGameComapStatus = 'UNKNOWN';
		}

		// Set app / game dump status
		cDumpStatusList.forEach(function(cList){
			TMS.removeClass('DIV_selectedGameStatus_dump', cList);
		});
		TMS.addClass('DIV_selectedGameStatus_dump', `DIV_ICON_STATUS_${cGameStatus}`);
		document.getElementById('DIV_selectedGameStatus_dump').innerHTML = APP.lang.getVariable(`dumpStatus_${cGameStatus}`);

	},

	// Open selected game location
	openGameLocation: function(){

		// Check if there's game selected
		if (this.selectedGame !== ''){
			APP.fileManager.openDir(`${APP.settings.data.gamePath}/${this.list[this.selectedGame].folderName}`);
		}

	},

	// Export game metadata
	exportGameMetadata: function(){

		if (this.selectedGame !== '' && Object.keys(this.list[this.selectedGame].paramSfo).length !== 0){

			APP.fileManager.saveFile(`${this.selectedGame}_metadata`, '.json', 'utf8', JSON.stringify(this.list[this.selectedGame].paramSfo), function(cPath){
				window.alert(APP.lang.getVariable('saveSucessfullPath', [cPath]));
				APP.log(APP.lang.getVariable('saveSucessfullPath', [cPath]));
			});

		}

	},

	// Reset current game settings
	resetGameSettings: function(){

		// Create main vars
		const
			cGame = this.selectedGame,
			fName = `${APP.settings.data.gamePath}/${this.list[cGame].folderName}/launcherSettings.json`,
			conf = window.confirm(APP.lang.getVariable('settingsConfirmRemoveGameSettings', [this.list[cGame].name]));

		if (this.selectedGame !== '' && APP.fs.existsSync(fName) === !0 && conf === !0){

			// Remove file
			try {

				// Remove settings file and reload data
				APP.fs.unlinkSync(fName);
				setTimeout(function(){
					APP.gameList.selectedGame = '';
					APP.gameList.load();
					APP.design.selectGame(cGame);
					TMS.scrollCenter(`GAME_ENTRY_${cGame}`);
				}, 50);

			} catch (err) {

				APP.log(APP.lang.getVariable('settingsRemoveGameSettingsError', [cGame, err]));
				console.error(err);

			}

		}

	}

}