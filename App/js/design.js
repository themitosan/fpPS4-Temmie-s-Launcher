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

	// Hack List
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
					   '\');">Enable ' + hackName + '</label><br>';
		});

		document.getElementById('DIV_HACK_LIST').innerHTML = htmlTemp;

		// Render GUI
		this.update();

	},

	// Render game list
	renderGameList: function(customList){

		var tempHtml = '',
			gList = customList;
		
		if (customList === void 0){
			gList = APP.gameList.list;
		}

		// Process game list
		Object.keys(gList).forEach(function(cGame){

			var appTitle = '',
				gameBgAndIcon,
				gameEntryStyle = '',
				classDisplayEntryMode = '',
				appNameClass = 'LABEL_gameTitle',
				classGameDetailsMode = 'GAME_DETAILS',
				gameMetadata = '<br>Path: ' + gList[cGame].exe,
				gridIconSize = APP.settings.data.gridIconSize,
				bgPath = 'url(\'' + gList[cGame].bg.replace(RegExp('\'', 'gi'), '\\\'') + '\')';

			// Disable background image
			if (APP.settings.data.showBgOnEntry !== !0){
				bgPath = 'none';
			}

			// Background and Icon
			gameBgAndIcon = '<div class="GAME_ENTRY_BG" style="background-image: ' + bgPath + ';"></div><img class="IMG_GAME_ICON" src="' + gList[cGame].icon + '">';

			// If PARAM.SFO metadata exists, show serial and game version instead
			if (Object.keys(gList[cGame].paramSfo).length !== 0){
				gameMetadata = '<br>' + gList[cGame].paramSfo.TITLE_ID + ' - Version ' + gList[cGame].paramSfo.APP_VER;
			}

			// Settings: Show App / Game version (or executable path) for every title in game list
			if (APP.settings.data.showPathEntry !== !0){
				gameMetadata = '';
			}

			// Display mode: Compact
			if (APP.settings.data.gameListMode === 'compact'){
				gameMetadata = '';
				gameBgAndIcon = '';
				appNameClass = 'LABEL_gameTitleCompact';
				classDisplayEntryMode = ' GAME_ENTRY_COMPACT';
			}

			// Display mode: Grid
			if (APP.settings.data.gameListMode === 'grid'){
				appTitle = gList[cGame].name;
				classGameDetailsMode = 'none';
				classDisplayEntryMode = ' GAME_ENTRY_GRID';
				gameEntryStyle = 'border-radius: ' + APP.settings.data.gridBorderRadius + 'px;'
				gameBgAndIcon = '<div class="none" style="background-image: ' + bgPath + '";></div><img class="IMG_GAME_ICON IMG_GRID" style="width: ' + gridIconSize + 'px;" src="' + gList[cGame].icon + '">';
			}

			/*
				Add entry
			*/
			tempHtml = tempHtml + '<div class="GAME_ENTRY' + classDisplayEntryMode + '" title="' + appTitle + '" style="' + gameEntryStyle + '" onclick="APP.design.selectGame(\'' + cGame + '\');" id="GAME_ENTRY_' + cGame + '">' +
								   gameBgAndIcon + '<div class="' + classGameDetailsMode + '"><label class="' + appNameClass + '">' + gList[cGame].name + '</label>' + gameMetadata + '</div></div>';
		});

		// Insert HTML
		document.getElementById('DIV_LIST_INTERNAL').innerHTML = tempHtml;

		// Clear BG image
		TMS.css('DIV_GAMELIST_BG', {'background-image': 'none'});

		// Update GUI
		this.update();

	},

	// Select game
	selectGame: function(gameName){

		// Settings file
		var exportButtonStatus = 'disabled',
			folderName = APP.gameList.list[gameName].folderName, 
			settingsFile = APP.settings.data.gamePath + '/' + folderName + '/launcherSettings.json';

		if (APP.gameList.list[gameName] !== void 0){

			// Select game and update GUI
			APP.gameList.selectedGame = gameName;
			APP.design.update();

			// Check if game config exists
			if (APP.fs.existsSync(settingsFile) === !1){

				// Get hack list
				var hList = {};
				APP.design.hackList.forEach(function(cHack){
					hList[cHack] = !1;
				});

				// Create settings file
				APP.gameList.createGameSettings({
					hacks: hList,
					path: settingsFile,
					importedModules: [],
					name: APP.gameList.list[gameName].name,
					paramSfo: APP.gameList.list[gameName].paramSfo
				});

			}

			// Load settings file
			const gSettings = JSON.parse(APP.fs.readFileSync(settingsFile, 'utf-8'));
			APP.gameList.cGameSettings = gSettings;

			// Set hacks
			Object.keys(gSettings.hacks).forEach(function(hackName){
				document.getElementById('CHECK_' + hackName).checked = JSON.parse(gSettings.hacks[hackName]);
			});

			// If PARAM.SFO exists, enable export button
			if (APP.gameList.list[gameName].paramSfoAvailable === !0){
				exportButtonStatus = '';
			}

			document.getElementById('BTN_launcherOptionsExportMetadata').disabled = exportButtonStatus;

		}

	},

	// Update GUI
	update: function(){

		// Update background image
		const sGame = APP.gameList.list[APP.gameList.selectedGame];
		if (sGame !== '' && sGame !== void 0){
			TMS.css('DIV_GAMELIST_BG', {
				'background-image': 'url("' + sGame.bg + '")'
			});
		}

		// Check if emu is present before allowing to run
		if (APP.fs.existsSync(APP.settings.data.emuPath) === !0 && APP.gameList.selectedGame !== ''){

			var btnRun = '',
				btnLog = '',
				btnRefresh = '',
				btnSettings = '',
				btnKill = 'disabled',
				logDisplay = 'block',
				emuRunPath = 'block',
				bgBlur = APP.settings.data.bgListBlur,
				bgOpacity = APP.settings.data.bgListOpacity,
				optionsCss = {'height': 'calc(100% - 214px)', 'display': 'block'},
				listCss = {'width': 'calc(100% - 280px)', 'height': 'calc(100% - 202px)'};

			// If emu is running
			if (APP.emuManager.emuRunning === !0){
	
				btnKill = '';
				btnLog = 'disabled';
				btnRun = 'disabled';
				logDisplay = 'none';
				btnRefresh = 'disabled';
				btnSettings = 'disabled';
				bgBlur = APP.settings.data.bgEmuBlur;
				bgOpacity = APP.settings.data.bgEmuOpacity;
				optionsCss = {'height': '350px', 'display': 'none'};
				listCss = {'width': '100%', 'height': 'calc(100% - 38px)'};
	
			}

			// Show / Hide path on game run
			if (APP.settings.data.showPathRunning === !1){
				emuRunPath = 'none';
			}

			// Update GUI
			TMS.css('DIV_LIST', listCss);
			TMS.css('DIV_OPTIONS', optionsCss);
			TMS.css('DIV_LOG', {'display': logDisplay});
			TMS.css('DIV_GAME_DETAILS_currentExec', {'display': emuRunPath});
			TMS.css('DIV_GAMELIST_BG', {'filter': 'blur(' + bgBlur + 'px) opacity(' + bgOpacity + ')'});
	
			// Update Buttons
			document.getElementById('BTN_RUN').disabled = btnRun;
			document.getElementById('BTN_KILL').disabled = btnKill;
			document.getElementById('BTN_CLEAR_LOG').disabled = btnLog;
			document.getElementById('BTN_REFRESH').disabled = btnRefresh;
			document.getElementById('BTN_SETTINGS').disabled = btnSettings;
			document.getElementById('INPUT_gameListSearch').disabled = btnRun;

		} else {

			TMS.css('DIV_LIST', {'width': '100%'});
			TMS.css('DIV_OPTIONS', {'display': 'none'});

		}

		// Selected game name
		var cGameName = 'No game selected';

		// If no game is selected, disable run button
		if (APP.gameList.selectedGame === ''){
			document.getElementById('BTN_RUN').disabled = 'disabled';
		}

		// Fix for grid mode
		if (APP.settings.data.gameListMode === 'grid'){
			TMS.addClass('DIV_LIST_INTERNAL', 'DIV_LIST_GRID');
		} else {
			TMS.removeClass('DIV_LIST_INTERNAL', 'DIV_LIST_GRID');
		}

		// If selected game exists, get it's name
		if (APP.gameList.list[APP.gameList.selectedGame] !== void 0){
			cGameName = APP.gameList.list[APP.gameList.selectedGame].name;
		}
		
		// Render current game name
		document.getElementById('DIV_labelSelectedGame').innerHTML = cGameName;

		// Render Settings
		this.renderSettings();

	},

	// Change game list to display mode
	toggleDisplayMode: function(gameData){

		if (gameData !== void 0){
			
			var gameDetails = {'display': 'flex'},
				gameMetadata = 'Path: <label class="user-can-select">' + gameData.appPath + '</label>',
				listInternal = {'transition': '0.4s', 'filter': 'blur(' + APP.settings.data.bgEmuBlur +'px) opacity(' + APP.settings.data.bgEmuOpacity + ')'};
	
			// If emu isn't running
			if (APP.emuManager.emuRunning === !1){

				gameDetails = {'display': 'none'};
				listInternal = {'transition': 'none', 'filter': 'blur(' + APP.settings.data.bgListBlur +'px) opacity(' + APP.settings.data.bgListOpacity + ')'};
				APP.design.renderGameList();

				// Reset log color
				TMS.css('APP_LOG', {
					'color': '#0f0',
					'background-image': 'linear-gradient(180deg, #000000db, #090f1b)'
				});
	
			} else {

				// Clear search input
				document.getElementById('INPUT_gameListSearch').value = '';

				// If PARAM.SFO metadata exists, display serial and game version instead
				if (Object.keys(gameData.paramSfo).length !== 0){
					gameMetadata = gameData.paramSfo.TITLE_ID + ' - Version ' + gameData.paramSfo.APP_VER;
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

		hideList.forEach(function(cElement){
			TMS.css(cElement, {'display': 'none'});
		});

		showList.forEach(function(cElement){
			TMS.css(cElement, {'display': 'block'});
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
	
		// Labels
		document.getElementById('LBL_SETTINGS_emuPath').innerHTML = cSettings.emuPath
		document.getElementById('LBL_SETTINGS_gamePath').innerHTML = cSettings.gamePath;
		document.getElementById('LABEL_settingsGameListBgBlur').innerHTML = APP.tools.parsePercentage(cSettings.bgListBlur, 6);
		document.getElementById('LABEL_settingsEmuRunningBgBlur').innerHTML = APP.tools.parsePercentage(cSettings.bgEmuBlur, 6);
		document.getElementById('LABEL_settingsGridIconSize').innerHTML = APP.tools.parsePercentage(cSettings.gridIconSize, 512);
		document.getElementById('LABEL_settingsGameListBgOpacity').innerHTML = APP.tools.parsePercentage(cSettings.bgListOpacity, 1);
		document.getElementById('LABEL_settingsEmuRunningBgOpacity').innerHTML = APP.tools.parsePercentage(cSettings.bgEmuOpacity, 1);
		document.getElementById('LABEL_settingsGridBorderRadius').innerHTML = APP.tools.parsePercentage(cSettings.gridBorderRadius, 26);

		// Select
		document.getElementById('SELECT_settingsDisplayMode').value = cSettings.gameListMode;
		document.getElementById('SELECT_settingsSearchMode').value = cSettings.gameSearchMode;
		document.getElementById('SELECT_settingsStartExternalWindow').value = cSettings.logExternalWindowStartMode;

		// Checkbox
		document.getElementById('CHECKBOX_settingsShowExecList').checked = JSON.parse(cSettings.showPathEntry);
		document.getElementById('CHECKBOX_settingsEnableParamSfo').checked = JSON.parse(cSettings.enableParamSfo);
		document.getElementById('CHECKBOX_settingsShowExecRunning').checked = JSON.parse(cSettings.showPathRunning);
		document.getElementById('CHECKBOX_settingsShowBgOnGameEntry').checked = JSON.parse(cSettings.showBgOnEntry);
		document.getElementById('CHECKBOX_settingsGameSearchCaseSensitive').checked = JSON.parse(cSettings.searchCaseSensitive);
		document.getElementById('CHECKBOX_settingsExternalWindowPrompt').checked = JSON.parse(cSettings.logExternalWindowPrompt);

		// Range
		document.getElementById('RANGE_settingsGridIconSize').value = cSettings.gridIconSize;
		document.getElementById('RANGE_settingsGameListBgBlur').value = cSettings.bgListBlur;
		document.getElementById('RANGE_settingsEmuRunningBgBlur').value = cSettings.bgEmuBlur;
		document.getElementById('RANGE_settingsGameListBgOpacity').value = cSettings.bgListOpacity;
		document.getElementById('RANGE_settingsEmuRunningBgOpacity').value = cSettings.bgEmuOpacity;
		document.getElementById('RANGE_settingsGridIconBorderRadius').value = cSettings.gridBorderRadius;

		// Update settings GUI
		this.updateLauncherSettingsGUI();

	},

	// Update settings GUI without loading / save data
	updateLauncherSettingsGUI: function(){

		// Grid options
		var cDisplayMode = document.getElementById('SELECT_settingsDisplayMode').value;
		switch (cDisplayMode) {

			case 'normal':
				TMS.css('DIV_settingsGridOptions', {'display': 'none'});
				TMS.css('DIV_settingsShowBgOnGameEntry', {'display': 'flex'});
				break;

			case 'grid':
				TMS.css('DIV_settingsGridOptions', {'display': 'block'});
				TMS.css('DIV_settingsShowBgOnGameEntry', {'display': 'none'});
				break;

		}

	},

	// Save user settings
	saveSettings: function(skipCloseSettings){

		// Select
		APP.settings.data.gameListMode = document.getElementById('SELECT_settingsDisplayMode').value;
		APP.settings.data.gameSearchMode = document.getElementById('SELECT_settingsSearchMode').value;
		APP.settings.data.logExternalWindowStartMode = document.getElementById('SELECT_settingsStartExternalWindow').value;

		// Checkbox
		APP.settings.data.showPathEntry = JSON.parse(document.getElementById('CHECKBOX_settingsShowExecList').checked);
		APP.settings.data.enableParamSfo = JSON.parse(document.getElementById('CHECKBOX_settingsEnableParamSfo').checked);
		APP.settings.data.showBgOnEntry = JSON.parse(document.getElementById('CHECKBOX_settingsShowBgOnGameEntry').checked);
		APP.settings.data.showPathRunning = JSON.parse(document.getElementById('CHECKBOX_settingsShowExecRunning').checked);
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