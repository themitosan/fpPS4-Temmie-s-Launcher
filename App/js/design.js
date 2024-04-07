/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		design.js

		This file contains tools, functions and variables related for rendering and
		updating main GUI

		Quick note: This is probably the largest file on this project... again!

	***********************************************************************************
*/

temp_DESIGN = {

	/*
		Import design modules
	*/
	msgsys: temp_MSGSYS,	 		   // Message system
	about: temp_ABOUTSCREEN, 		   // About screen
	input: temp_INPUT_DESIGN, 		   // Input handling
	animations: temp_ANIMATIONS,	   // Animarions
	settingsMenu: temp_SETTINGSGUI,    // Settings GUI
	sceneManager: temp_SCENEMANAGER,   // Scene Manager
	quickSettings: temp_QUICKSETTINGS, // Quick settings (Right)

	/*
		General / Misc. variables
	*/

	// Dom elements with error class
	btnWithErrorClass: [],

	/*
		General / Misc. functions
	*/

	// Add btn error class to DOM
	addErrorClass: function(){

		// Get current dom name
		const domId = this.input.currentList + '_' + this.input.currentIndex;

		// Check if dom id is defined and if it already exists on list
		if (domId !== void 0 && this.btnWithErrorClass.indexOf(domId) === -1){

			// Push current element to list
			this.addClass(domId, 'BTN_GUI_OPTIONS_ERROR');
			this.btnWithErrorClass.push(domId);

		}

	},

	// Remove error class on dom
	removeErrorClass: function(){

		// Check if lists has entries
		if (this.btnWithErrorClass.length !== 0){

			// Remove class from elements
			this.btnWithErrorClass.forEach(function(cDom){
				TMS.removeClass(cDom, 'BTN_GUI_OPTIONS_ERROR');
			});

			// Reset list
			this.btnWithErrorClass = [];

		}

		// End
		return 0;

	},

	// Add class to dom
	addClass: function(domId, className){

		// Check if data was provided
		if (domId !== void 0 && className !== void 0){

			// Remove previous affected buttons
			this.removeErrorClass();

			// Remove class
			TMS.removeClass(domId, className);

			// Add class
			TMS.addClass(domId, className);

		}

	},

	/*
		Window functions
	*/

	// [Window] On focus action
	winOnFocusAction: function(){
		this.input.focus();
	},

	// [Window] On blur action
	winOnBlurAction: function(){return;},

	// Focus main window
	focusMainWindow: function(){

		// Show window
		APP.win.show();
		APP.win.focus();

		// Update scaling
		setTimeout(function(){
			APP.design.updateCanvasScale();
		}, 100);

	},

	// Initialize window functions
	initWindowFn: function(){

		// Update canvas scaling
		APP.win.on('resize', function(){
			APP.design.updateCanvasScale();
		});
		APP.win.on('maximize', function(){
			APP.design.toggleFullscreen();
		});
		APP.win.on('restore', function(){
			APP.design.updateCanvasScale();
		});

		// On focus
		APP.win.on('focus', function(){
			APP.design.winOnFocusAction();
		});

		// On blur
		APP.win.on('blur', function(){
			APP.design.winOnBlurAction();
		});

		// On close
		APP.win.on('close', function(){
			APP.exit();
		});

		// Start canvas check
		window.requestAnimationFrame(APP.design.updateCanvas);

	},

	// Update canvas size
	updateCanvas: function(){

		// Check canvas scale
		APP.design.updateCanvasScale();

		// End
		window.requestAnimationFrame(APP.design.updateCanvas);

	},

	// Scale canvas
	updateCanvasScale: function(){

		// Variables
		var scaleMode = APP.settings.data.screenScaleMode,
			width = TMS.getCssData('APP_CANVAS', 'offsetWidth'),
			height = TMS.getCssData('APP_CANVAS', 'offsetHeight'),
			windowWidth = parseFloat(TMS.getCssData('APP_LOCKINPUT', 'width').replace('px', '')), // window.outerWidth,
			windowHeight = parseFloat(TMS.getCssData('APP_LOCKINPUT', 'height').replace('px', '')), // window.outerHeight,
			finalScale = Math.min((windowWidth / width), (windowHeight / height));

		// Scale mode
		switch (scaleMode){

			// Zoom
			case 'zoom':
				TMS.css('APP_CANVAS', {'transform': 'none', 'zoom': finalScale});
				break;

			// Transform (Image it's more blurry)
			case 'transform':
				TMS.css('APP_CANVAS', {'zoom': '1', 'transform': 'scale(' + finalScale +')'});
				break;

		}

		// Update position
		TMS.css('APP_CANVAS', {
			'top': 'calc(50% - ' + parseFloat(height / 2) + 'px)',
			'left': 'calc(50% - ' + parseFloat(width / 2) + 'px)'
		});

	},

	// Update screen res
	updateCanvasRes: function(width, height){

		// Variables
		var w = APP.settings.data.screenWidth,
			h = APP.settings.data.screenHeight;

		// Check provided res
		if (width !== void 0 && parseInt(width) !== NaN){
			w = parseInt(width);
		}
		if (height !== void 0 && parseInt(height) !== NaN){
			h = parseInt(height);
		}
		if (w < 1000){
			w = 1000;
		}
		if (h < 720){
			h = 720;
		}

		// Perform update
		TMS.css('APP_CANVAS', {'width': w + 'px', 'height': h + 'px'});

		// Update inner canvas zoom
		TMS.css('APP_CANVAS_INNER', {'zoom': APP.settings.data.guiZoomScale});

	},

	// Toggle maximize
	toggleMaximize: function(){

		// Get window state
		var winState = APP.win.cWindow.state;

		// Switch between modes
		switch (winState){

			// Default window
			case 'normal':
				this.toggleFullscreen();
				break;

			// If maximized
			case 'maximized':
				APP.win.restore();
				break;

		}

		// Update canvas scale
		setTimeout(function(){
			APP.design.updateCanvasScale();
		}, 50);

	},

	// Toggle fullscreen
	toggleFullscreen: function(){

		// Check if isn't running on editor
		if (APP.urlParams.get('dev') !== 'true'){
			APP.win.toggleFullscreen();
		}

	},

	/*
		Forms variables
	*/

	// Forms list
	formList: {
		'iconBoot': '<div class="APP_CANVAS_BG_ICON_BOOT" id="APP_CANVAS_BG_ICON_BOOT"></div>',
		'labelBootInfo': '<div class="APP_LABEL_BOOT_INFO" id="APP_LABEL_BOOT_INFO">%_DATA_%</div>',
		'msgsys': '<div class="APP_MSGSYS" id="APP_MSGSYS"><div class="APP_POPUP_TITLE" id="APP_POPUP_TITLE"></div><div class="APP_POPUP_LINE APP_POPUP_LINE_TOP"></div><div class="APP_POPUP_LINE APP_POPUP_LINE_BOTTOM"></div><div class="APP_POPUP_CONTENT_HOLDER" id="APP_POPUP_CONTENT_0"></div><div class="APP_POPUP_CONTENT_HOLDER" id="APP_POPUP_CONTENT_1" style="opacity: 0;"></div><div class="APP_POPUP_BUTTON_LABEL_HOLDER" id="APP_POPUP_BUTTON_LABEL_HOLDER"></div></div>'
	},

	/*
		Form functions
	*/

	// Append form into HTML
	appendForm: function(formId, innerData, location){

		// Check if form exists
		if (formId !== void 0 && this.formList[formId] !== void 0){

			// Variables
			var sLocation = location,
				replaceData = innerData;

			// Check if innerData is available
			if (innerData === void 0){
				replaceData = '';
			}

			// Set default location
			if (location === void 0){
				sLocation = 'APP_CANVAS_INNER';
			}

			// Get form data
			const formHtml = this.formList[formId].replace('%_DATA_%', replaceData);

			// End
			TMS.append(sLocation, formHtml);

		}

	},

	/*
		Boot sequence variables
	*/

	// Message to show on boot
	bootMessageData: {},

	/*
		Boot sequence functions
	*/

	// Load font before loading settings
	loadExternalFont: function(){

		// Variables
		var fontPath = APP.settings.data.externalFontPath,
			fontDom = document.getElementById('SETTINGS_CUSTOM_FONT');

		// Check if external font file exists
		if (APP.fs.existsSync(fontPath) === !0){

			// Check if DOM exists
			if (fontDom !== null){
				document.getElementById('SETTINGS_CUSTOM_FONT').innerHTML = '@font-face { font-family: customFont; src: url(\"' + fontPath + '\");';
			} else {
				TMS.append('ASSETS_LIST', '<style id="SETTINGS_CUSTOM_FONT">@font-face { font-family: customFont; src: url(\"' + fontPath + '\");</style>');
			}

		}

	},

	// Check if needs to show some message before boot
	bootCheck: function(){

		// Focus launcher window
		APP.win.focus();

		// Check if msg variable have metadata (messages) 
		if (this.bootMessageData.msgName !== ''){

			// Log error code
			APP.log.add({data: this.bootMessageData});

			// Display message
			APP.design.msgsys.displayMsg(this.bootMessageData);

		} else {

			// (Interpreter) Display intro message
			if (APP.urlParams.get('skipBootList') !== 'true'){
				APP.scriptInterpreter.run('boot_defaultBootProcess');
			} else {
				console.clear();
				window.top.MAIN.log('INFO - INIT OK');
			}

		}

	},

	// Update background theme
	updateBackgroundTheme: function(){

		// Get settings
		const settingsData = APP.settings.data;

		// Update CSS
		TMS.css('APP_CANVAS_BG_COLOR', {'background-image': `linear-gradient(140deg, ${settingsData.backgroundGradient.toString()})`});
		TMS.css('APP_CANVAS', {'box-shadow': `0px 0px 120px ${settingsData.backgroundGradient[0]}90`});

		// End
		return 0;

	},

	// Check if needs to go on fullscreen on boot
	bootCheckFullscreen: function(){

		// Get settings
		const settingsData = APP.settings.data;

		// Check if fullscreen is on boot is enabled
		if (settingsData.appIsLoading === !0 && settingsData.bootFullscreen === !0 && APP.win.isFullscreen === !1){
			this.toggleFullscreen();
			this.updateCanvasRes();
		}

		// End
		return 0;

	},

	// Cache all images on img dir
	cacheImagesBoot: function(){

		// Create vars and process img path
		var htmlTemp = '<div class="none" id="IMG_CACHE_DIV">';
		APP.tools.getDirFiles(`${APP.settings.appPath}/img`).forEach(function(cImg){

		    // Fix path and check if current entry is a file
		    const cDir = APP.tools.fixPath(cImg);
		    if (APP.path.parse(cDir).ext !== '') {
		        APP.log.add({ data: `INFO - (Design) Caching image: ${cDir}` });
		        htmlTemp = htmlTemp + `<img src="file://${cDir}">`;
		    }

		});

		// Append HTML
		TMS.append('ASSETS_LIST', `${htmlTemp}</div>`);
		return 0;

	},

	/*
		Lang functions
	*/

	// Update GUI language
	updateLang: function(){

		// Seleced lang database
		const cLang = APP.lang.selected;

		// If lang isn't English, update GUI
		if (APP.settings.data.appLanguage !== 'english'){

			// Update innerHTML
			Object.keys(cLang.innerHTML).forEach(function(domId){
				if (document.getElementById(domId) !== null && cLang.innerHTML[domId] !== ''){
					document.getElementById(domId).innerHTML = cLang.innerHTML[domId];
				}
			});

		}

	},

	/*
		Gamelist variables
	*/

	// Current game list html
	currentGameList: '',

	/*
		Gamelist functions
	*/

	// Render list
	renderGameList: function(callback){

		// Variables
		var nextBtn = '', 
			prevBtn = '',
			entryClass = '',
			gList = Object.keys(APP.gameList.list),
			displayMode = APP.settings.data.gameListMode,
			tempHtml = APP.lang.getVariable('gameList_errorEntryListEmpty');

		// Reset top actions background color
		TMS.css('APP_MAIN_TOP', {'background-color': '#0000'});

		// Switch from display mode
		switch (displayMode){

			// List
			case 'list':

				// Set entry mode
				entryClass = 'GAMELIST_ENTRY_LIST';

				// Set list
				APP.design.input.setList({
					enableOutOfBoundsFn: !0,
					list: 'APP_GAMELIST_ENTRY',
					index: APP.design.input.gListIndexPos,
					length: (Object.keys(APP.gameList.list).length - 1),

					// If user press up, focus top actions menu
					onStart: function(){ 
						return APP.design.bakedFunctions.GAMELIST_gotoTop();
					},

					// If user press down, return to first item on list
					onEnd: function(){
						TMS.css('APP_MAIN_GAMELIST', {'scroll-behavior': 'auto'});
						return {position: 0, skipProcess: !1};
					}

				});

				// Assign buttons
				prevBtn = 'ARROW_UP';
				nextBtn = 'ARROW_DOWN';
				break;

		}

		// Get metadata
		const getMetadataInfo = function(mode, data){

			// Variables
			var res = '',
				gMetadata = '<label class="LABEL_ENTRY_METADATA">' + data.info + '</label><br>';

			// Empty game metadata if is homebrew
			if (data.status === 'hb'){
				gMetadata = '';
			}

			switch (mode){

				// List mode
				case 'list':
					res = '<div class="APP_GAMELIST_ENTRY_METADATA METADATA_LIST"><label class="LABEL_ENTRY_APP_NAME_LIST">' + data.name + '</label><br>' + gMetadata + '<div class="APP_GAME_LIST_STATUS APP_GAME_LIST_STATUS_' +
						  data.status + '" title="' + APP.lang.getVariable('gameList_entryVersion_title_' + data.status, [data.missingFiles]) +'">' + APP.lang.getVariable('gameList_entryStatus_' + data.status) + '</div></div>';

			}

			return res;

		}

		// Check if there's items on entry list
		if (gList.length !== 0){

			// Reset list
			tempHtml = '';

			/*
				[WIP] - Process entry list
			*/
			gList.forEach(function(cEntry, cIndex){

				// Variables
				var metadataHtml = '',
					entryName = cEntry,
					langId = APP.lang.selected.langId,
					entryMetadata = APP.gameList.list[cEntry];

				// Get entry name from PARAM.SFO and set metadata html
				if (Object.keys(entryMetadata.paramSfo).length !== 0){
					entryName = entryMetadata.paramSfo['TITLE' + langId];
					metadataHtml = getMetadataInfo(displayMode, {name: entryName, status: entryMetadata.status, missingFiles: APP.tools.convertArrayToString(entryMetadata.missingFiles),
								   info: entryMetadata.paramSfo.TITLE_ID + ' - ' + APP.lang.getVariable('gameList_entryVersion', [entryMetadata.paramSfo.VERSION])});

				} else {
					metadataHtml = getMetadataInfo(displayMode, {name: entryName, status: entryMetadata.status, info: APP.lang.getVariable('gameList_entryStatus_hb')});
				}

				// Add entry
				tempHtml = tempHtml + '<button class="APP_GAMELIST_ENTRY ' + entryClass + '" id="APP_GAMELIST_ENTRY_' + cIndex + '" onclick="APP.design.bakedFunctions.GAMELIST_defaultOnclickAction(' + cIndex +
						   ');"><img class="IMG_GAME_ICON" src="' + entryMetadata.img_icon + '" alt="IMG_GAME_ENTRY_' + cIndex + '">' + metadataHtml + '</button>';

			});

			// Update button labels
			this.input.updateButtonLabels({
				resetInput: !0,
				target: 'MAIN_GAME_LIST',
				displayButtons: ['ACTION_0', 'ACTION_2', 'ACTION_12'],
				buttonLabels: {'ACTION_0': 'run', 'ACTION_2': 'hackList', 'ACTION_12': 'menu'},

				// Bind input actions
				callback: function(){

					/*
						Actions
					*/

					// Run entry
					APP.input.setActionFn('ACTION_0', function(){
						APP.design.input.selectMainAction();
						APP.design.input.gListIndexPos = APP.design.input.currentIndex;
						APP.design.animations['ANIMATION_startEmu_' + displayMode]();
					});

					// Open hack list
					APP.input.setActionFn('ACTION_2', function(){
						APP.design.bakedFunctions.GAMELIST_gotoHackList();
					});

					// Home: Goto top
					APP.input.setActionFn('ACTION_12', function(){
						APP.design.bakedFunctions.GAMELIST_gotoTop();
					});

					// Next / Prev buttons
					APP.input.setActionFn(prevBtn, function(){
						APP.design.input.moveCursor('prev');
					});
					APP.input.setActionFn(nextBtn, function(){
						APP.design.input.moveCursor('next');
					});

				}

			});

			// Render selected game
			this.displaySelectedGame();

		} else {

			// If there's no entries, goto top
			this.bakedFunctions.GAMELIST_gotoTop();

		}

		// Check if need to update html
		if (tempHtml !== this.currentGameList){

			// Append HTML and update currentGameList
			document.getElementById('APP_MAIN_GAMELIST').innerHTML = tempHtml;
			this.currentGameList = tempHtml;

		}

		/*
			End
		*/

		// Set window blur action
		APP.design.winOnBlurAction = function(){return;}

		// Execute callback
		if (typeof callback === 'function'){
			callback();
		}

		// End
		return 0;

	},

	// Update GUI on selecing a game
	displaySelectedGame: function(){

		// Variables
		var cIndex = APP.design.input.currentIndex,
			entryMetadata = APP.gameList.list[Object.keys(APP.gameList.list)[cIndex]],
			res = entryMetadata;

		// Check if current list is game list
		if (APP.design.input.currentList === 'APP_GAMELIST_ENTRY' && entryMetadata !== void 0){

			// Set selected game
			APP.gameList.selectedGame = entryMetadata.entryName;

			// Set scroll behavior to smooth
			TMS.css('APP_MAIN_GAMELIST', {'scroll-behavior': 'smooth'});

			// Hide top bg
			TMS.css('APP_MAIN_TOP', {'background-color': '#0000'});

			// Give focus
			TMS.focus('APP_GAMELIST_ENTRY_' + cIndex);

			// Scroll entry to center
			if (APP.settings.data.gameListMode !== 'orbis'){
				TMS.scrollCenter('APP_GAMELIST_ENTRY_' + cIndex);
			}

			// Set background image
			TMS.css('APP_CANVAS_BG', {'background-image': `url(\"${entryMetadata.img_background}\")`});

			// Check if app is loading
			if (APP.settings.appIsLoading === !0){
				res = 0;
			}

		} else {

			// Focus current index
			TMS.focus(APP.design.input.currentList + '_' + cIndex);
			res = 0;

		}

		/*
			End
			Return entry metadata
		*/
		return res;

	},

	/*
		Utility functions
	*/

	// Get checkbox state
	getCheckboxState: function(target){
		if (target !== void 0 && target !== ''){

			// Variables
			var res = 'on',
				status = JSON.parse(APP.tools.getVariable(target));

			// Get state
			if (status === !1){
				res = 'off';
			}

			return res;

		}
	},

	/*
		Toggle checkbox [WIP]

			data: {Object}
				target: 	  String - Name of affected variable
				domId: 		  String - DOM ID of checkbox
				saveSettings: Boolean - If true, will save settings after process
				callback: 	  Function - function to be execute after process is complete
				toggleClass:  String - Name of css class to be used on toggle (_on or _off)
	*/
	toggleCheckbox: function(data){

		// Check if data is provided
		if (data !== void 0 && Object.keys(data).length !== 0){

			// Reset add button class
			APP.design.removeErrorClass();

			// Get data
			var svgState = 'on',
				removeClass = 'off',
				toggleClass = 'IMG_GUI_CHECKBOX',
				checkboxState = APP.tools.getVariable(data.target);

			// Check if toggle class is defined
			if (data.toggleClass !== void 0 && data.toggleClass !== ''){
				toggleClass = data.toggleClass;
			}

			// Process state
			if (checkboxState === !0){
				svgState = 'off';
				removeClass = 'on';
				checkboxState = !1;
			} else {
				checkboxState = !0;
			}

			// Update data
			(Function('"use strict";return APP.' + data.target + '=' + checkboxState + ';')());

			// Update class
			TMS.addClass(data.domId, toggleClass + '_' + svgState);
			TMS.removeClass(data.domId, toggleClass + '_' + removeClass);

			// Update icon
			if (document.getElementById(data.domId) !== null){
				document.getElementById(data.domId).src = 'img/svg/checkbox-' + svgState + '.svg';
			}

			// Save settings
			if (data.saveSettings === !0){
				APP.settings.save();
			}

			// Callback
			if (typeof data.callback === 'function'){
				data.callback();
			}

		}

	},

	/*
		Baked GUI functions 
	*/
	bakedFunctions: {

		// Game list - Default onclick action
		GAMELIST_defaultOnclickAction: function(index){
			APP.design.renderGameList();
			APP.design.input.currentIndex = index;
			APP.design.displaySelectedGame();
		},

		// Game list - Show about screen
		GAMELIST_showAbout: function(){

			// Save current cursor index
			if (APP.design.input.currentList === 'APP_GAMELIST_ENTRY'){
				APP.design.input.gListIndexPos = APP.design.input.currentIndex;
			}

			// Fade out bg and fade in "4" icon
			TMS.css('APP_CANVAS_BG', {'opacity': '0'});

			// Call about screen
			APP.design.msgsys.displayMsg({showBgIcon: !0, msgName: 'general_showAbout'});

			// Fix scroll
			document.getElementById('APP_LOCKINPUT').onmousewheel = function(data){
				document.getElementById('fpPS4_TL_ABOUT_DATA').scrollBy({top: data.deltaY, left: 0});
			};

		},

		// About: Close and return to game list
		GAMELIST_closeAbout: function(){

			// Reset mousewheel
			document.getElementById('APP_LOCKINPUT').onmousewheel = null;

			// Fade out "4" and fade in bg
			TMS.css('APP_CANVAS_BG', {'opacity': '0.62'});
			TMS.css('APP_CANVAS_BG_ICON', {'opacity': '0'});

			// Render game list
			APP.design.renderGameList(function(){
				APP.design.displaySelectedGame();
				APP.input.releaseInput();
			});

		},

		// Game list - Go to top actions if user press up while first entry is selected
		GAMELIST_gotoTop: function(){

			// Lock input
			APP.input.lockInput();

			// Show top actions menu bg
			TMS.css('APP_MAIN_TOP', {'background-color': '#000a'});

			// Save current cursor index
			APP.design.input.gListIndexPos = APP.design.input.currentIndex;

			// Set new list
			APP.design.input.setList({
				index: 1,
				length: 3,
				list: 'INPUT_GUI_TOP',
				enableOutOfBoundsFn: !0
			});

			// Update button labels
			APP.design.input.updateButtonLabels({
				resetInput: !0,
				target: 'MAIN_GAME_LIST',
				displayButtons: ['ACTION_0', 'ACTION_1'],
				buttonLabels: {'ACTION_0': 'select', 'ACTION_1': 'back'},

				// Bind input actions
				callback: function(){

					// Bind buttons
					APP.input.setActionFn('ACTION_0', function(){
						APP.design.input.selectMainAction();
					});
					APP.input.setActionFn('ARROW_LEFT', function(){
						APP.design.input.moveCursor('prev');
					});
					APP.input.setActionFn('ARROW_RIGHT', function(){
						APP.design.input.moveCursor('next');
					});

					// Home, Down Arrow and Back: Return to list
					APP.input.setActionFn('ARROW_DOWN', function(){
						APP.design.renderGameList(function(){ APP.design.displaySelectedGame(); });
					});
					APP.input.setActionFn('ACTION_1', function(){
						APP.design.renderGameList(function(){ APP.design.displaySelectedGame(); });
					});
					APP.input.setActionFn('ACTION_12', function(){
						APP.design.renderGameList(function(){ APP.design.displaySelectedGame(); });
					});

					// Release input
					APP.input.releaseInput();

				}

			});

			// Return
			return {position: 0, skipProcess: !0};
		},

		// Game list - Open Hack list
		GAMELIST_gotoHackList: function(){

			// Lock input
			APP.input.lockInput();

			// Variables
			var htmlTemp = '',
				cGame = APP.gameList.selectedGame,
				hList = Object.keys(APP.emumanager.hackList),
				checkboxInput = APP.settings.data.input_toggleCheckBox,
				bLabels = '{"ACTION_1": "back", "' + checkboxInput + '": "toggleHack"}',
				jsonPath = APP.settings.nwPath + '/Settings/Game Settings/' + cGame + '.json',
				cGameSettings = JSON.parse(APP.fs.readFileSync(jsonPath, 'utf8'));

			// Set current game settings
			APP.emumanager.cGameSettings = cGameSettings;
			APP.emumanager.tempSettings = JSON.stringify(cGameSettings);

			/*
				Process hack list
			*/
			hList.forEach(function(cHack, cIndex){

				// Get hack description
				var hackDesc = APP.emumanager.hackList[cHack],
					cTarget = 'emumanager.cGameSettings.hackList.' + cHack,
					hStatus = APP.design.getCheckboxState(cTarget);

				// Update html
				htmlTemp = htmlTemp + '<button class="BTN_GUI_OPTIONS BTN_GUI_OPTIONS_QUICK" id="MAIN_QUICK_SETTINGS_' + cIndex + '" onclick="APP.design.input.currentIndex=' + cIndex + ';APP.design.toggleCheckbox({target:\'' + cTarget +
						  '\', domId: \'APP_QUICK_SETTINGS_CHECKBOX_' + cIndex + '\'});"><img src="img/svg/checkbox-' + hStatus + '.svg" alt="IMG_CHECKBOX" id="APP_QUICK_SETTINGS_CHECKBOX_' + cIndex + '" class="IMG_GUI_CHECKBOX_' + hStatus +'"/>' +
						  '<div class="BTN_QUICKSETTINGS_CHECKBOX_LABEL_SELECTED">' + APP.lang.getVariable('gameSettings_enable') + ' ' + cHack + '<br><div class="text-small cursor-pointer">' + APP.lang.getVariable('gameSettings_hackDesc') +
						  ' ' + hackDesc.slice(0, 1).toLowerCase() + hackDesc.slice(1) + '</div></div></button>';

			});

			// Update button labels
			APP.design.input.updateButtonLabels({
				resetInput: !0,
				target: 'MAIN_GAME_LIST',
				buttonLabels: JSON.parse(bLabels),
				displayButtons: [checkboxInput, 'ACTION_1'],
				callback: function(){

					// Render quick settings
					APP.design.quickSettings.show({
						width: 44,
						showTitle: !1,
						content: htmlTemp,

						// Execute action after closing quicksettings
						onClose: function(){

							// Update game settings
							try {

								// Stringify settings
								const newSettings = JSON.stringify(APP.emumanager.cGameSettings);

								// Check if need to update file
								if (newSettings !== APP.emumanager.tempSettings){

									// Update file
									APP.log.add({data: 'INFO - (Hack list) Updating settings for ' + cGame});
									APP.fs.writeFileSync(jsonPath, newSettings, 'utf8');

								}

								// Update emumanager variables
								APP.emumanager.tempSettings = '';
								APP.emumanager.cGameSettings = {};

								// Render game list
								APP.design.renderGameList(function(){ APP.design.displaySelectedGame(); });

							} catch (err) {
								throw new Error(err);
							}

						},

						// Callback
						callback: function(){

							// Set input list
							APP.design.input.setList({
								index: 0,
								enableOutOfBoundsFn: !1,
								list: 'MAIN_QUICK_SETTINGS',
								length: parseInt(hList.length - 1)
							});

							// Bind actions
							APP.input.setActionFn(checkboxInput, function(){
								APP.design.input.selectMainAction();
							});
							APP.input.setActionFn('ARROW_UP', function(){
								APP.design.input.moveCursor('prev');
							});
							APP.input.setActionFn('ARROW_DOWN', function(){
								APP.design.input.moveCursor('next');
							});

							// Close quick settings
							APP.input.setActionFn('ACTION_1', function(){
								APP.design.quickSettings.close();
							});
							APP.input.setActionFn('ARROW_LEFT', function(){
								APP.design.quickSettings.close();
							});

						}

					});

				}

			});

		}

	}

}

// Delete imported modules
delete temp_MSGSYS;
delete temp_ANIMATIONS;
delete temp_ABOUTSCREEN;
delete temp_SETTINGSGUI;
delete temp_SCENEMANAGER;
delete temp_INPUT_DESIGN;
delete temp_QUICKSETTINGS;