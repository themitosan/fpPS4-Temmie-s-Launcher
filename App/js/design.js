/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	design.js

	This file contains tools, functions and variables related for rendering and
	updating main GUI

	Quick note: This is probably the largest file on this project!
	******************************************************************************
*/

temp_DESIGN = {

	// Game patch loaded
	gamePatchLoaded: !1,

	/*
		Hack List
		If red-prig implements a new one, just add it on this list!
	*/
	hackList: [
		'DEPTH_DISABLE_HACK',
		'COMPUTE_DISABLE_HACK',
		'MEMORY_BOUND_HACK',
		'IMAGE_TEST_HACK',
		'IMAGE_LOAD_HACK',
		'DISABLE_SRGB_HACK'
	],
	
	// Render hack list
	renderHacklist: function(){

		var htmlTemp = '';
		this.hackList.forEach(function(hackName){
			htmlTemp = htmlTemp + '<input type="checkbox" id="CHECK_' + hackName + '"><label class="LABEL_checkbox" onclick="APP.tools.processCheckbox(\'CHECK_' + hackName +
					   '\');">' + APP.lang.getVariable('labelEnableHack') + ' ' + hackName + '</label><br>';
		});

		// Append html
		document.getElementById('DIV_HACK_LIST').innerHTML = htmlTemp;

		// Render GUI
		this.update();

	},

	// Update GUI lang
	updateLang: function(){

		// Update titles
		Object.keys(APP.lang.selected.title).forEach(function(domId){
			if (document.getElementById(domId) !== null){
				document.getElementById(domId).title = APP.lang.selected.title[domId];
			}
		});

		// If current lang isn't english, update remaining GUI
		if (APP.settings.data.appLanguage !== 'english'){

			// Update input text
			Object.keys(APP.lang.selected.input_text).forEach(function(domId){
				if (document.getElementById(domId) !== null){
					document.getElementById(domId).value = APP.lang.selected.input_text[domId].value;
					document.getElementById(domId).placeholder = APP.lang.selected.input_text[domId].placeholder;
				}
			});	

			// Update select
			Object.keys(APP.lang.selected.select).forEach(function(domId){
				if (document.getElementById(domId) !== null){

					var optionsHtml = '';
					Object.keys(APP.lang.selected.select[domId]).forEach(function(option){
						optionsHtml = optionsHtml + '<option value="' + option + '">' + APP.lang.selected.select[domId][option] + '</option>';
					});

					// Append HTML
					document.getElementById(domId).innerHTML = optionsHtml;
	
				}
			});

			// Update innerHTML
			Object.keys(APP.lang.selected.innerHTML).forEach(function(domId){
				if (document.getElementById(domId) !== null){
					document.getElementById(domId).innerHTML = APP.lang.selected.innerHTML[domId];
				}
			});

			// Update value
			Object.keys(APP.lang.selected.value).forEach(function(domId){
				if (document.getElementById(domId) !== null){
					document.getElementById(domId).value = APP.lang.selected.value[domId];
				}
			});

		}
		
	},

	// Render game list
	renderGameList: function(data){

		var tempHtml = '',
			gList = APP.gameList.list,
			sQuery = document.getElementById('INPUT_gameListSearch').value;
		
		if (data === void 0){
			data = {};
		}

		if (data.customList !== void 0){
			gList = data.customList;
		}

		// Process game list
		Object.keys(gList).forEach(function(cGame){

			// Settings for display mode: Normal
			var appTitle = '',
				gameName = '',
				gameBgAndIcon,
				appVersion = '',
				patchParamSfo = {},
				gameEntryStyle = '',
				classDisplayEntryMode = '',
				appNameClass = 'LABEL_gameTitle',
				classGameDetailsMode = 'GAME_DETAILS',
				settingsFile = gList[cGame].settingsFile,
				gridIconSize = APP.settings.data.gridIconSize,
				gameMetadata = '<br>' + APP.lang.getVariable('path') + ': ' + gList[cGame].exe,
				bgPath = 'url(\'' + gList[cGame].bg.replace(RegExp('\'', 'gi'), '\\\'') + '\')';

			// Disable background image
			if (APP.settings.data.showBgOnEntry !== !0){
				bgPath = 'none';
			}

			// Background and Icon
			gameBgAndIcon = '<div class="GAME_ENTRY_BG" style="background-image: ' + bgPath + ';"></div><img class="IMG_GAME_ICON" src="' + gList[cGame].icon + '">';

			// Check if patch is available and active
			if (Object.keys(settingsFile).length !== 0 && settingsFile.usePatch === !0 && APP.fs.existsSync(settingsFile.patchLocation + '/sce_sys/param.sfo') === !0){
				patchParamSfo = APP.paramSfo.parse(settingsFile.patchLocation + '/sce_sys/param.sfo');

				// Check if PARAM.SFO from patch is loaded and isn't an DLC
				if (Object.keys(patchParamSfo).keys !== 0 && patchParamSfo.CATEGORY !== 'ac'){
					appVersion = '<label class="LABEL_emuColor">' + patchParamSfo.APP_VER + '</label>';
				}

			}

			// If PARAM.SFO metadata exists, show serial and game version instead
			if (Object.keys(gList[cGame].paramSfo).length !== 0){
				
				// If patch isn't enabled or patch location does not exists but is enabled
				if (settingsFile.usePatch !== !0 || settingsFile.usePatch === !0 && APP.fs.existsSync(settingsFile.patchLocation + '/sce_sys/param.sfo') !== !0){
					appVersion = gList[cGame].paramSfo.APP_VER;
				}

				// Set game data
				gameMetadata = '<br>' + gList[cGame].paramSfo.TITLE_ID + ' - ' + APP.lang.getVariable('gameListVersion') + ' ' + appVersion;
			}

			// Settings: Show App / Game version (or executable path) for every title in game list
			if (APP.settings.data.showPathEntry !== !0){
				gameMetadata = '';
			}

			// Display modes
			switch (APP.settings.data.gameListMode){

				// Display mode: Compact
				case 'compact':
					gameMetadata = '';
					gameBgAndIcon = '';
					appNameClass = 'LABEL_gameTitleCompact';
					classDisplayEntryMode = ' GAME_ENTRY_COMPACT';
					classGameDetailsMode = 'GAME_DETAILS GAME_DETAILS_COMPACT';

					// Check if PARAM.SFO is available
					if (Object.keys(gList[cGame].paramSfo).length !== 0){
						gameMetadata = '<div class="float-right">' + gList[cGame].paramSfo.TITLE_ID + ' - ' + APP.lang.getVariable('gameListVersion') + ' ' + appVersion + '</div>';
					}

					// Check if is Homebrew
					if (gList[cGame].isHomebrew === !0){
						gameMetadata = '<div class="float-right">Homebrew</div>';
					}
					break;

				// Display mode: Grid
				case 'grid':

					// Check if is Homebrew
					if (gList[cGame].isHomebrew === !0){
						appVersion = 'HB';
					}

					classGameDetailsMode = '';
					appTitle = gList[cGame].name;
					classDisplayEntryMode = ' GAME_ENTRY_GRID';
					gameMetadata = '<div class="GAME_DETAILS_GRID">' + appVersion + '</div>';
					gameEntryStyle = 'border-radius: ' + APP.settings.data.gridBorderRadius + 'px;';
					gameBgAndIcon = '<div class="none" style="background-image: ' + bgPath + '";></div><img class="IMG_GAME_ICON IMG_GRID" style="width: ' + gridIconSize + 'px;" src="' + gList[cGame].icon + '">';
					break;

			}

			// Fix for non-grid mode
			if (APP.settings.data.gameListMode !== 'grid'){
				gameName = '<label class="' + appNameClass + '">' + gList[cGame].name + '</label>';
			}

			/*
				Add entry
			*/
			tempHtml = tempHtml + '<div class="GAME_ENTRY' + classDisplayEntryMode + '" title="' + appTitle + '" style="' + gameEntryStyle + '" onclick="APP.design.selectGame(\'' + cGame + '\');" id="GAME_ENTRY_' + cGame + '">' +
								   gameBgAndIcon + '<div class="' + classGameDetailsMode + '">' + gameName + gameMetadata + '</div></div>';
		});

		// Insert HTML
		document.getElementById('DIV_LIST_INTERNAL').innerHTML = tempHtml;

		// Log status
		if (data.displayLog !== !1){
			APP.log(APP.lang.getVariable('gameListLoadSuccessful', [Object.keys(gList).length]));
		}

		// Clear BG image
		TMS.css('DIV_GAMELIST_BG', {'background-image': 'none'});

		// Focus search field
		TMS.focus('INPUT_gameListSearch');

		// Update GUI
		this.update();

	},

	// Select game
	selectGame: function(gameName){

		// Set game patch loaded to false
		this.gamePatchLoaded = !1;

		var hList = {},
			gData = APP.gameList.list[gameName],
			folderName = gData.folderName, 
			exportButtonStatus = 'disabled',
			settingsFile = APP.settings.data.gamePath + '/' + folderName + '/launcherSettings.json';

		if (gData !== void 0){

			// Select game and update GUI
			APP.gameList.selectedGame = gameName;
			APP.gameList.checkDumpStatus();

			// Check if game config exists
			if (APP.fs.existsSync(settingsFile) === !1){

				// Get hack list
				hList = {};
				APP.design.hackList.forEach(function(cHack){
					hList[cHack] = !1;
				});

				// Create settings file
				APP.gameList.createGameSettings({
					hacks: hList, 
					usePatch: !1,
					name: gData.name,
					patchLocation: '',
					path: settingsFile,
					importedModules: [],
					isHomebrew: gData.isHomebrew
				});

			}

			// Load settings file
			const gSettings = JSON.parse(APP.fs.readFileSync(settingsFile, 'utf8'));
			APP.gameList.cGameSettings = gSettings;

			// Set hacks
			Object.keys(gSettings.hacks).forEach(function(hackName){
				document.getElementById('CHECK_' + hackName).checked = JSON.parse(gSettings.hacks[hackName]);
			});

			// Load patch data
			document.getElementById('CHECKBOX_optionsEnablePatch').checked = gSettings.usePatch;
			if (APP.fs.existsSync(gSettings.patchLocation) === !0){

				// Try reading PARAM.SFO
				try {

					// Get PARAM.SFO data
					var paramSfoMetadata = APP.paramSfo.parse(gSettings.patchLocation + '/sce_sys/param.sfo'),
						patchVersion = paramSfoMetadata.VERSION;

					// If App version is available, show it instead
					if (paramSfoMetadata.APP_VER !== void 0){
						patchVersion = paramSfoMetadata.APP_VER;
					}

					// Update GUI
					document.getElementById('LABEL_launcherOptionsPatchVersion').innerHTML = patchVersion;
					document.getElementById('LABEL_launcherOptionsPatchType').innerHTML = APP.paramSfo.database.DB_CATEGORY[paramSfoMetadata.CATEGORY];

					// Set patch loaded flag
					APP.design.gamePatchLoaded = !0;

				} catch (err) {

					console.error(err);
					APP.log(APP.lang.getVariable('selectGameLoadPatchErrorParamSfo', [err]));

				}

			}

			// Update GUI
			APP.design.update();

		}

	},

	// Update GUI
	update: function(){

		// Update background image
		const sGame = APP.gameList.list[APP.gameList.selectedGame];
		if (sGame !== '' && sGame !== void 0){
			TMS.css('DIV_GAMELIST_BG', {'background-image': 'url("' + sGame.bg + '")'});
		}

		// Check if emu is present before allowing to run
		if (APP.fs.existsSync(APP.settings.data.emuPath) === !0 && APP.gameList.selectedGame !== ''){

			var btnRun = '',
				btnLog = '',
				btnRefresh = '',
				btnSettings = '',
				btnKill = 'disabled',
				emuRunPath = 'block',
				disableGridIconSize = '',
				bgBlur = APP.settings.data.bgListBlur,
				bgOpacity = APP.settings.data.bgListOpacity,
				logCss = {'display' :'block', 'width': 'calc(100% - 280px)'},
				optionsCss = {'height': 'calc(100% - 50px)', 'display': 'block'},
				listCss = {'width': 'calc(100% - 280px)', 'height': 'calc(100% - 202px)'};

			// If emu is running
			if (APP.emuManager.emuRunning === !0){
	
				btnKill = '';
				btnLog = 'disabled';
				btnRun = 'disabled';
				btnRefresh = 'disabled';
				btnSettings = 'disabled';
				disableGridIconSize = 'disabled';
				bgBlur = APP.settings.data.bgEmuBlur;
				bgOpacity = APP.settings.data.bgEmuOpacity;
				logCss = {'display' :'none', 'width': '100%'};
				optionsCss = {'height': '350px', 'display': 'none'};
				listCss = {'width': '100%', 'height': 'calc(100% - 38px)'};
	
			}

			// Show / Hide path on game run
			if (APP.settings.data.showPathRunning === !1){
				emuRunPath = 'none';
			}

			// Update GUI
			TMS.css('DIV_LOG', logCss);
			TMS.css('DIV_LIST', listCss);
			TMS.css('DIV_OPTIONS', optionsCss);
			TMS.css('DIV_GAME_DETAILS_currentExec', {'display': emuRunPath});
			TMS.css('DIV_GAMELIST_BG', {'filter': 'blur(' + bgBlur + 'px) opacity(' + bgOpacity + ')'});
	
			// Update Buttons
			document.getElementById('BTN_RUN').disabled = btnRun;
			document.getElementById('BTN_KILL').disabled = btnKill;
			document.getElementById('BTN_CLEAR_LOG').disabled = btnLog;
			document.getElementById('BTN_REFRESH').disabled = btnRefresh;
			document.getElementById('BTN_SETTINGS').disabled = btnSettings;
			document.getElementById('INPUT_gameListSearch').disabled = btnRun;
			document.getElementById('RANGE_settingsGridIconSize').disabled = disableGridIconSize;

		} else {

			TMS.css('DIV_LOG', {'width': '100%'});
			TMS.css('DIV_LIST', {'width': '100%'});
			TMS.css('DIV_OPTIONS', {'display': 'none'});

		}

		// Fix for grid mode
		if (APP.settings.data.gameListMode === 'grid'){
			TMS.addClass('DIV_LIST_INTERNAL', 'DIV_LIST_GRID');
		} else {
			TMS.removeClass('DIV_LIST_INTERNAL', 'DIV_LIST_GRID');
		}

		// Get selected game
		var cGame = APP.gameList.list[APP.gameList.selectedGame],
			exportButtonStatus = 'disabled',
			displayPatchContainer = 'none',
			displayGameVersion = 'none',
			gName = 'No game selected',
			displayPatchData = 'none',
			cGameVersion = '';

		// If no game is selected, disable run button
		if (APP.gameList.selectedGame === ''){
			document.getElementById('BTN_RUN').disabled = 'disabled';
		}

		// If selected game exists
		if (cGame !== void 0){

			// Set game name
			gName = '<div class="LABEL_gameTitleOptions">' + cGame.name + '</div>';

			// If PARAM.SFO exists for selected game
			if (Object.keys(cGame.paramSfo).length !== 0){
				
				// Enable GUI
				exportButtonStatus = '';
				displayGameVersion = 'block';

				// Set data
				cGameVersion = cGame.paramSfo.APP_VER;
				gName = '<div class="LABEL_gameTitleOptions">' + cGame.name + '</div><br><label class="user-can-select">' + cGame.paramSfo.TITLE_ID + '</label>';
			
			}

			// If app / game patch is enabled, show metadata
			if (APP.gameList.cGameSettings.usePatch === !0){
				displayPatchContainer = 'block';
			}

		}
		
		// Enable / disable export metadata 
		document.getElementById('BTN_launcherOptionsExportMetadata').disabled = exportButtonStatus;
		
		// Show / hide patch
		TMS.css('DIV_launcherOptionsPatchVersion', {'display': displayPatchContainer});

		// Show / hide patch details
		if (this.gamePatchLoaded === !0){
			displayPatchData = 'block';
		}
		TMS.css('DIV_launcherOptionsPatchVersionMetadata', {'display': displayPatchData});

		// Render current game name
		document.getElementById('DIV_labelSelectedGame').innerHTML = gName;

		// Render current game version
		document.getElementById('LABEL_FPPS4_OPTIONS_APP_VER').innerHTML = cGameVersion;
		TMS.css('DIV_FPPS4_OPTIONS_APP_VERSION', {'display': displayGameVersion});

		// Render Settings
		this.renderSettings();

	},

	// Change game list to display mode
	toggleDisplayMode: function(gameData){

		if (gameData !== void 0){
			
			var gameVersion = '',
				patchParamSfo = {},
				gameDetails = {'display': 'flex'},
				usePatch = APP.gameList.cGameSettings.usePatch,
				patchLocation = APP.gameList.cGameSettings.patchLocation,
				gameMetadata = APP.lang.getVariable('path') + ': <label class="user-can-select">' + gameData.appPath + '</label>',
				listInternal = {'transition': '0.4s', 'filter': 'blur(' + APP.settings.data.bgEmuBlur +'px) opacity(' + APP.settings.data.bgEmuOpacity + ')'};
	
			// If emu isn't running
			if (APP.emuManager.emuRunning === !1){

				gameDetails = {'display': 'none'};
				listInternal = {'transition': 'none', 'filter': 'blur(' + APP.settings.data.bgListBlur +'px) opacity(' + APP.settings.data.bgListOpacity + ')'};
				APP.design.renderGameList();
	
			} else {

				// Clear search input
				document.getElementById('INPUT_gameListSearch').value = '';

				// Check if PARAM.SFO patch exists
				if (APP.fs.existsSync(patchLocation) === !0){
					patchParamSfo = APP.paramSfo.parse(patchLocation + '/sce_sys/param.sfo');
				}
				if (Object.keys(patchParamSfo).length !== 0 && usePatch === !0){
					gameVersion = '<label class="LABEL_emuColor">' + patchParamSfo.APP_VER + '</label>';
				}

				// If PARAM.SFO metadata exists, display serial and game version instead
				if (Object.keys(gameData.paramSfo).length !== 0){

					// Check if patch is enabled
					if (usePatch !== !0){
						gameVersion = gameData.paramSfo.APP_VER;
					}

					// Set new game data
					gameMetadata = gameData.paramSfo.TITLE_ID + ' - ' + APP.lang.getVariable('gameListVersion') + ' ' + gameVersion;
				}
				
				// Clear game list
				document.getElementById('DIV_LIST_INTERNAL').innerHTML = '';
	
			}

			// Fix undefined path
			if (gameData.appIcon === void 0){
				gameData.appIcon = APP.settings.data.nwPath + '/App/img/404.png';
			}

			// Set game metadata
			document.getElementById('IMG_APP_ICON').src = gameData.appIcon;
			document.getElementById('DIV_GAME_DETAILS_currentExec').innerHTML = gameMetadata;
			document.getElementById('LABEL_GAME_DETAILS_STATUS').innerHTML = gameData.appStatus;
			document.getElementById('LABEL_GAME_DETAILS_APP_NAME').innerHTML = gameData.appName;
	
			// Set CSS
			TMS.css('DIV_GAMELIST_BG', listInternal);
			TMS.css('DIV_GAME_DETAILS', gameDetails);

		}

	},

	// Display / Hide Settings
	toggleSettings: function(hide){

		var showList = ['DIV_SETTINGS'],
			hideList = [
				'DIV_ACTIONS',
				'DIV_OPTIONS',
				'DIV_LIST',
				'DIV_LOG'
			];

		// Close settings
		if (hide === !0){

			hideList = ['DIV_SETTINGS'];
			showList = [
				'DIV_ACTIONS',
				'DIV_OPTIONS',
				'DIV_LIST',
				'DIV_LOG'
			];

			// Render game list
			APP.design.renderGameList();

			// Update GUI
			APP.design.update();

		}

		// Hide elements
		hideList.forEach(function(cElement){
			TMS.css(cElement, {'display': 'none'});
		});

		// Show elements
		showList.forEach(function(cElement){
			if (cElement === 'DIV_ACTIONS'){
				TMS.css(cElement, {'display': 'flex'});
			} else {
				TMS.css(cElement, {'display': 'block'});
			}
		});

		// Render Settings
		this.renderSettings();

	},

	// Render settings list
	renderSettings: function(requestSave){

		// If need to save
		if (requestSave === !0){
			APP.design.saveSettings(requestSave);
		}

		// Shortcut
		const cSettings = APP.settings.data;

		// Get lang files
		var langSelectHtml = '<option value="english">English (Default)</option>',
			langList = APP.fs.readdirSync(APP.settings.data.nwPath + '/Lang');

		langList.forEach(function(cEntry){

			if (APP.path.parse(cEntry).ext.toLowerCase() === '.json'){
			
				const getLangInfo = JSON.parse(APP.fs.readFileSync(APP.settings.data.nwPath + '/Lang/' + cEntry, 'utf8'));
				langSelectHtml = langSelectHtml + '<option value="' + APP.path.parse(cEntry).name + '">' + getLangInfo.lang + '</option>';
			
			}

		});

		// Append Language list
		document.getElementById('SELECT_settingsLanguage').innerHTML = langSelectHtml;

		// Labels
		document.getElementById('LBL_SETTINGS_emuPath').innerHTML = cSettings.emuPath
		document.getElementById('LBL_SETTINGS_gamePath').innerHTML = cSettings.gamePath;
		document.getElementById('LABEL_settingsGameListBgBlur').innerHTML = APP.tools.parsePercentage(cSettings.bgListBlur, 6);
		document.getElementById('LABEL_settingsEmuRunningBgBlur').innerHTML = APP.tools.parsePercentage(cSettings.bgEmuBlur, 6);
		document.getElementById('LABEL_settingsGameListBgOpacity').innerHTML = APP.tools.parsePercentage(cSettings.bgListOpacity, 1);
		document.getElementById('LABEL_settingsEmuRunningBgOpacity').innerHTML = APP.tools.parsePercentage(cSettings.bgEmuOpacity, 1);
		document.getElementById('LABEL_settingsGridBorderRadius').innerHTML = APP.tools.parsePercentage(cSettings.gridBorderRadius, 15);

		// Select
		document.getElementById('SELECT_settingsLanguage').value = cSettings.appLanguage;
		document.getElementById('SELECT_settingsSearchMode').value = cSettings.gameSearchMode;
		document.getElementById('SELECT_settingsStartExternalWindow').value = cSettings.logExternalWindowStartMode;

		// Checkbox
		document.getElementById('CHECKBOX_settingsShowExecList').checked = JSON.parse(cSettings.showPathEntry);
		document.getElementById('CHECKBOX_settingsEnableParamSfo').checked = JSON.parse(cSettings.enableParamSfo);
		document.getElementById('CHECKBOX_settingsShowExecRunning').checked = JSON.parse(cSettings.showPathRunning);
		document.getElementById('CHECKBOX_settingsShowBgOnGameEntry').checked = JSON.parse(cSettings.showBgOnEntry);
		document.getElementById('CHECKBOX_settingsRemoveProjectGp4').checked = JSON.parse(cSettings.removeProjectGp4);
		document.getElementById('CHECKBOX_settingsGameSearchCaseSensitive').checked = JSON.parse(cSettings.searchCaseSensitive);
		document.getElementById('CHECKBOX_settingsExternalWindowPrompt').checked = JSON.parse(cSettings.logExternalWindowPrompt);

		// Range
		document.getElementById('RANGE_settingsGridIconSize').value = cSettings.gridIconSize;
		document.getElementById('RANGE_settingsGameListBgBlur').value = cSettings.bgListBlur;
		document.getElementById('RANGE_settingsEmuRunningBgBlur').value = cSettings.bgEmuBlur;
		document.getElementById('RANGE_settingsGameListBgOpacity').value = cSettings.bgListOpacity;
		document.getElementById('RANGE_settingsEmuRunningBgOpacity').value = cSettings.bgEmuOpacity;
		document.getElementById('RANGE_settingsGridIconBorderRadius').value = cSettings.gridBorderRadius;

		// Fix for grid size / border-radius
		if (cSettings.gridIconSize > 512){
			cSettings.gridIconSize = 512;
		}
		if (cSettings.gridBorderRadius > 15){
			cSettings.gridBorderRadius = 15;
		}

		// Update settings GUI
		this.updateLauncherSettingsGUI();

	},

	// Update settings GUI without loading / save data
	updateLauncherSettingsGUI: function(){

		var displayModes = ['normal', 'compact', 'grid'],
			cDisplayMode = APP.settings.data.gameListMode;
		
		// Grid options
		switch (cDisplayMode) {

			case 'normal':
				document.getElementById('RANGE_settingsGridIconSize').disabled = 'disabled';
				TMS.css('DIV_settingsShowBgOnGameEntry', {'display': 'flex'});
				break;

			case 'compact':
				document.getElementById('RANGE_settingsGridIconSize').disabled = 'disabled';
				break;

			case 'grid':
				TMS.css('DIV_settingsShowBgOnGameEntry', {'display': 'none'});
				document.getElementById('RANGE_settingsGridIconSize').disabled = '';
				break;

		}

		// Reset display modes
		displayModes.forEach(function(cMode){
			document.getElementById('BTN_displayMode_' + cMode).disabled = '';
		});
		document.getElementById('BTN_displayMode_' + cDisplayMode).disabled = 'disabled';

	},

	// Save user settings
	saveSettings: function(skipCloseSettings){

		// Select
		APP.settings.data.appLanguage = document.getElementById('SELECT_settingsLanguage').value;
		APP.settings.data.gameSearchMode = document.getElementById('SELECT_settingsSearchMode').value;
		APP.settings.data.logExternalWindowStartMode = document.getElementById('SELECT_settingsStartExternalWindow').value;

		// Checkbox
		APP.settings.data.showPathEntry = JSON.parse(document.getElementById('CHECKBOX_settingsShowExecList').checked);
		APP.settings.data.enableParamSfo = JSON.parse(document.getElementById('CHECKBOX_settingsEnableParamSfo').checked);
		APP.settings.data.showBgOnEntry = JSON.parse(document.getElementById('CHECKBOX_settingsShowBgOnGameEntry').checked);
		APP.settings.data.showPathRunning = JSON.parse(document.getElementById('CHECKBOX_settingsShowExecRunning').checked);
		APP.settings.data.removeProjectGp4 = JSON.parse(document.getElementById('CHECKBOX_settingsRemoveProjectGp4').checked);
		APP.settings.data.searchCaseSensitive = JSON.parse(document.getElementById('CHECKBOX_settingsGameSearchCaseSensitive').checked);
		APP.settings.data.logExternalWindowPrompt = JSON.parse(document.getElementById('CHECKBOX_settingsExternalWindowPrompt').checked);

		// Range
		APP.settings.data.bgListBlur = parseFloat(document.getElementById('RANGE_settingsGameListBgBlur').value);
		APP.settings.data.gridIconSize = parseFloat(document.getElementById('RANGE_settingsGridIconSize').value);
		APP.settings.data.bgEmuBlur = parseFloat(document.getElementById('RANGE_settingsEmuRunningBgBlur').value);
		APP.settings.data.bgListOpacity = parseFloat(document.getElementById('RANGE_settingsGameListBgOpacity').value);
		APP.settings.data.bgEmuOpacity = parseFloat(document.getElementById('RANGE_settingsEmuRunningBgOpacity').value);
		APP.settings.data.gridBorderRadius = parseFloat(document.getElementById('RANGE_settingsGridIconBorderRadius').value);

		/*
			End
		*/

		// Save settings
		APP.settings.save();

		// GUI: Close settings
		if (skipCloseSettings !== !0){
			APP.design.toggleSettings(!0);
		}

	}

}