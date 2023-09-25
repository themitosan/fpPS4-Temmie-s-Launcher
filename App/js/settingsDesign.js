/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		settingsDesign.js

		This file contains all functions and variables related to launcher settings
		interface

	***********************************************************************************
*/

temp_SETTINGSGUI = {

	/*
		Settings variables
	*/

	// Current selected menu
	selectedMenu: 0,

	// Current selected menu name
	selectedMenuName: '',

	// Menu list
	menuList: [],

	// Variable for storing temp data (like screen res and etc).
	tempData: {},

	// Settings list
	list: temp_SETTINGS_LIST,

	/*
		Settings functions
	*/

	// Create settings array and append available options on settings menu
	make: function(){

		try {

			// Variables
			var htmlTemp = '',
				sMenu = APP.design.settingsMenu;

			// Make menu array
			APP.design.settingsMenu.menuList = Object.keys(sMenu.list);

			// Generate menu html
			sMenu.menuList.forEach(function(cMenu, cIndex){

				// First entry
				var firstEntry = '';
				if (cIndex === 0){
					firstEntry = 'BTN_GUI_OPTIONS_FIRST_ITEM';
				}

				// Create button
				htmlTemp = htmlTemp + '<button id="BTN_APP_SETTINGS_' + cIndex + '" class="BTN_GUI_OPTIONS ' + firstEntry + '" onclick="APP.design.settingsMenu.renderMenu(\'' +
						   cMenu + '\');">' + APP.lang.getVariable('launcherSettings_' + cMenu) + '</button>';

			});

			// Append menu
			document.getElementById('APP_LAUNCHER_SETTINGS_LIST').innerHTML = htmlTemp;

			// End
			return 0;

		} catch (err) {

			// Log error
			APP.log.add({mode: 'error', data: err});
			throw new Error(err);

		}

	},

	// Open settings menu
	open: function(callback){

		// Check if fpPS4 is running
		if (APP.emumanager.emuRunning === !1){

			// Lock input
			APP.input.lockInput();

			// Variables
			const menuList = this.menuList;

			// Reset previous selected settings menu
			this.selectedMenu = 0;

			// Reset temp data
			this.tempData = {};

			// Dim background image opacity
			TMS.css('APP_CANVAS_BG', {'opacity': '0.2'});

			// Clear fade from top menu
			TMS.css('APP_MAIN_TOP', {'background-color': '#0000'});

			// Load settings menu
			APP.design.sceneManager.loadScene({
				duration: 100,
				releaseInput: !1,
				nextScene: 'APP_LAUNCHER_SETTINGS',
				callback: function(){

					// Render left menu and it's first entry
					APP.design.settingsMenu.renderLeft();
					APP.design.settingsMenu.renderRight(menuList[APP.design.input.currentIndex]);

				}
			});

			// Execute callback
			if (typeof callback === 'function'){
				callback();
			}

		}

		// End
		return 0;

	},

	// Set focus to left menu
	renderLeft: function(callback){

		// Variables
		const cIndex = this.selectedMenu;

		// Reset tempData
		this.tempData = {};

		// Remove (left) selected menu focus class
		TMS.removeClass('BTN_APP_SETTINGS_' + cIndex, 'BTN_GUI_OPTIONS_HOVER');

		// Reset error button class
		APP.design.removeErrorClass();

		// Update button labels
		APP.design.input.updateButtonLabels({
			resetInput: !0,
			target: 'LAUNCHER_SETTINGS',
			displayButtons: ['ACTION_0', 'ACTION_1'],
			buttonLabels: {'ACTION_0': 'select', 'ACTION_1': 'back'},

			// Bind input actions
			callback: function(){

				// Get menu list
				const menuList = APP.design.settingsMenu.menuList;

				// Default actions
				APP.input.setActionFn('ACTION_0', function(){
					APP.design.input.selectMainAction();
				});
				APP.input.setActionFn('ARROW_RIGHT', function(){
					APP.design.input.selectMainAction();
				});

				// Go back
				APP.input.setActionFn('ACTION_1', function(){
					APP.design.settingsMenu.close();
				});

				// Next / Prev buttons
				APP.input.setActionFn('ARROW_UP', function(){
					APP.design.input.moveCursor('prev');
					APP.design.settingsMenu.renderRight(menuList[APP.design.input.currentIndex]);
				});
				APP.input.setActionFn('ARROW_DOWN', function(){
					APP.design.input.moveCursor('next');
					APP.design.settingsMenu.renderRight(menuList[APP.design.input.currentIndex]);
				});

			}

		});
		
		// Set input target
		APP.design.input.setList({
			index: cIndex,
			enableOutOfBoundsFn: !1,
			list: 'BTN_APP_SETTINGS',
			length: (TMS.getChildCount('APP_LAUNCHER_SETTINGS_LIST') - 1)
		});

		/*
			End
		*/

		// Release input
		APP.input.releaseInput();

		// Execute callback
		if (typeof callback === 'function'){
			callback();
		}

	},

	// Render right menu
	renderRight: function(menuName){

		// Get form data
		var totalItems = 0,
			optionArray = [],
			cIndex = this.selectedMenu,
			optionList = this.list[menuName];

		// Check if menu exists on general form list
		if (menuName !== void 0 && optionList !== void 0){

			// Set option array
			optionArray = Object.keys(optionList);
			totalItems = optionArray.length;

			// Log selected menu
			APP.log.add({data: 'INFO - (Settings Menu) Rendering menu: \"' + menuName + '\"'});

			// Reset error button class
			APP.design.removeErrorClass();

			// Save selected menu index
			APP.design.settingsMenu.selectedMenu = APP.design.input.currentIndex; 

			// Variables
			var htmlTemp = '',
				addFocus = [],
				addFunction = [];

			// Hide right menu
			TMS.css('APP_LAUNCHER_SETTINGS_CANVAS', {'display': 'none'});

			// Process options list
			optionArray.forEach(function(cSettings, cIndex){

				// Get current settings data
				var cFirstIndex = '',
					cSettingsHtml = '',
					cSettingsData = optionList[cSettings];

				// If is first item from settings list, add class (BTN_GUI_OPTIONS_FIRST_ITEM)
				if (cIndex === 0){
					cFirstIndex = ' BTN_GUI_OPTIONS_FIRST_ITEM';
				}

				// Process settings data
				switch (cSettingsData.type){

					// Checkbox
					case 'checkbox':

						// Get variable target state
						var cState = 'off',
							getVarState = APP.tools.getVariable(cSettingsData.target);

						// Check target state
						if (getVarState === !0){
							cState = 'on';
						}

						// Set HTML
						cSettingsHtml = '<!-- ' + cSettings + ' -->\n<button id="BTN_SETTINGS_OPTION_' + cIndex + '" class="BTN_GUI_OPTIONS BTN_LAUNCHER_SETTINGS' + cFirstIndex + '" onclick="APP.design.input.currentIndex=' +
										cIndex + ';APP.design.toggleCheckbox({saveSettings: !0, target:\'' + cSettingsData.target + '\', domId: \'SETTINGS_CHECKBOX_' + cSettings + '\', toggleClass: \'IMG_GUI_SETTINGS_CHECKBOX\'});">' +
										'<img src="img/svg/checkbox-' + cState + '.svg" id="SETTINGS_CHECKBOX_' + cSettings + '" class="IMG_GUI_SETTINGS_CHECKBOX IMG_GUI_SETTINGS_CHECKBOX_' + cState + '"/>' +
										'<div class="DIV_SETTINGS_MENU_LABEL"><label class="cursor-pointer">' + APP.lang.getVariable('launcherSettings_' + menuName + '_' + cSettings) + '</label><br>' +
										'<label class="text-small cursor-pointer">' + APP.lang.getVariable('launcherSettings_' + menuName + '_' + cSettings + '_desc') + '</label></div></button>';
						break;

					// Option
					case 'options':

						// Push settings name to add function later
						addFunction.push(cSettings);

						// Variables
						var rList = [],
							textDescHtml = '',
							mainLabelClass = '';

						// Check if has label list to replace
						if (cSettingsData.labelReplace !== void 0){
							cSettingsData.labelReplace.forEach(function(cVar){
								rList.push(APP.tools.getVariable(cVar));
							});
						}

						// Check if must add special class to button
						if (cSettingsData.addMainLabelClass !== void 0){
							mainLabelClass = ' ' + cSettingsData.addMainLabelClass;
						}

						// Get option desc
						const textDesc = APP.lang.getVariable('launcherSettings_' + menuName + '_' + cSettings + '_desc', rList);

						// Check if text desc is empty
						if (textDesc !== ''){
							textDescHtml = '<label class="text-small cursor-pointer">' + textDesc + '</label>';
						}

						// Check if on focus event is active
						if (cSettingsData.onFocus !== void 0){
							addFocus.push(cSettings);
						}

						// Set HTML
						cSettingsHtml = '<!-- ' + cSettings + ' -->\n<button id="BTN_SETTINGS_OPTION_' + cIndex + '" class="BTN_GUI_OPTIONS BTN_LAUNCHER_SETTINGS' + cFirstIndex +
										mainLabelClass + '"><div class="DIV_SETTINGS_MENU_LABEL"><label class="cursor-pointer">' + APP.lang.getVariable('launcherSettings_' +
										menuName + '_' + cSettings) + '</label><br>' + textDescHtml + '</div></button>';
						break;

				}

				// Append settings to html list
				htmlTemp = htmlTemp + cSettingsHtml;

			});

			// Check if is path menu. If so, get game list 
			if (menuName === 'paths'){

				// Generate game paths list
				const pathData = APP.design.settingsMenu.paths.makeGamePath(totalItems);

				// Append items
				htmlTemp = htmlTemp + pathData.html;

				// Update length
				totalItems = pathData.totalItems;

			}

			// Append HTML
			document.getElementById('APP_LAUNCHER_SETTINGS_CANVAS').innerHTML = htmlTemp;

			/*
				Set function to button on focus
				WARN: Do not use any window prompt function (like alert, confirm or prompt), since it may create an inifnite loop!
			*/
			addFocus.forEach(function(cItem){

				// Get index
				const cIndex = optionArray.indexOf(cItem);

				// Set on focus event
				document.getElementById('BTN_SETTINGS_OPTION_' + cIndex).onfocus = function(){
					optionList[cItem].onFocus();
				}

			});

			// Set function to button on click
			addFunction.forEach(function(cItem){

				// Get index
				const cIndex = optionArray.indexOf(cItem);

				// Set function
				document.getElementById('BTN_SETTINGS_OPTION_' + cIndex).onclick = function(){

					// Set current cursor index
					APP.design.input.currentIndex = cIndex;

					// Remove error class from buttons
					APP.design.removeErrorClass();

					// Execute designed action
					optionList[cItem].action();

				}

			});

			// Show right menu
			TMS.css('APP_LAUNCHER_SETTINGS_CANVAS', {'display': 'block'});

			// Return number of options
			return totalItems;

		}

	},

	// Render selected menu
	renderMenu: function(menuName, callback, cPos){

		// Check if selected menu exists
		if (this.list[menuName] !== void 0){

			// Lock input
			APP.input.lockInput();

			// Render right menu and get items array
			var cursorIndex = 0,
				optionsLength = APP.design.settingsMenu.renderRight(menuName),
				menuIndex = APP.design.settingsMenu.menuList.indexOf(menuName);

			// Remove focus from all other settings buttons
			APP.design.settingsMenu.menuList.forEach(function(a, b){
				TMS.removeClass('BTN_APP_SETTINGS_' + b, 'BTN_GUI_OPTIONS_HOVER');	
			});

			// Set (left) selected menu focus class
			TMS.addClass('BTN_APP_SETTINGS_' + menuIndex, 'BTN_GUI_OPTIONS_HOVER');

			// Update button labels
			this.rightSetInputDefault();

			// Update cursor position
			if (cPos !== void 0){
				cursorIndex = parseInt(cPos);
			}

			// Set menu name
			this.selectedMenuName = menuName;
			this.selectedMenu = this.menuList.indexOf(menuName);

			// Set input target
			APP.design.input.setList({
				index: cursorIndex,
				enableOutOfBoundsFn: !1,
				list: 'BTN_SETTINGS_OPTION',
				length: parseInt(optionsLength - 1)
			});

			/*
				End
			*/

			// Execute callback
			if (typeof callback === 'function'){
				callback();
			}

			// Focus first button
			APP.design.input.focus();

			// Release input
			APP.input.releaseInput();

		}

		// End
		return 0;

	},

	// Close settings menu
	close: function(){

		// Lock input
		APP.input.lockInput();

		// Save settings
		APP.settings.save();

		// Reset selected menu
		this.selectedMenu = 0;
		this.selectedMenuName = '';

		// Reset temp data
		this.tempData = {};

		// Restore background image opacity
		TMS.css('APP_CANVAS_BG', {'opacity': '0.72'});

		// Return to game list
		APP.design.sceneManager.loadScene({
			duration: 100,
			releaseInput: !1,
			nextScene: 'APP_MAIN',
			callback: function(){

				// Remove all elements from last settings menu
				document.getElementById('APP_LAUNCHER_SETTINGS_CANVAS').innerHTML = '';

				// Set previous selected index
				APP.design.input.currentIndex = APP.design.input.gListIndexPos;

				// Render game list
				APP.design.renderGameList(function(){
					APP.design.displaySelectedGame();
					APP.input.releaseInput();
				});

			}
		});

	},

	/*
		Settings right menu functions
	*/

	// Set default button actions
	rightSetInputDefault: function(){
		APP.design.input.updateButtonLabels({
			resetInput: !0,
			target: 'LAUNCHER_SETTINGS',
			displayButtons: ['ACTION_0', 'ACTION_1'],
			buttonLabels: {'ACTION_0': 'select', 'ACTION_1': 'back'},

			// Bind input actions
			callback: function(){

				// Default actions
				APP.input.setActionFn('ACTION_0', function(){
					APP.design.input.selectMainAction();
				});

				// Go back
				APP.input.setActionFn('ACTION_1', function(){
					APP.design.settingsMenu.renderLeft();
				});
				APP.input.setActionFn('ARROW_LEFT', function(){
					APP.design.settingsMenu.renderLeft();
				});

				// Next / Prev buttons
				APP.input.setActionFn('ARROW_UP', function(){

					// Move cursor
					APP.design.input.moveCursor('prev');

					// Reset error button class
					APP.design.removeErrorClass();

				});
				APP.input.setActionFn('ARROW_DOWN', function(){

					// Move cursor
					APP.design.input.moveCursor('next');

					// Reset error button class
					APP.design.removeErrorClass();

				});

			}

		});
	},

	// Default input action for quicksettings
	qSettingsInputDefault: function(index, length){

		// Check if index and length are present
		if (index !== void 0 && length !== void 0){

			// Update button labels
			APP.design.input.updateButtonLabels({
				resetInput: !0,
				target: 'LAUNCHER_SETTINGS',
				displayButtons: ['ACTION_0', 'ACTION_1'],
				buttonLabels: {'ACTION_0': 'confirm', 'ACTION_1': 'back'},

				// Bind input actions
				callback: function(){

					// Select res.
					APP.input.setActionFn('ACTION_0', function(){
						APP.design.input.selectMainAction();
					});

					// Go back
					APP.input.setActionFn('ACTION_1', function(){
						APP.design.quickSettings.close();
					});
					APP.input.setActionFn('ARROW_LEFT', function(){
						APP.design.quickSettings.close();
					});

					// Next / Prev buttons
					APP.input.setActionFn('ARROW_UP', function(){
						APP.design.input.moveCursor('prev');
					});
					APP.input.setActionFn('ARROW_DOWN', function(){
						APP.design.input.moveCursor('next');
					});

				}

			});

			// Set input target
			APP.design.input.setList({
				index: index,
				length: length,
				enableOutOfBoundsFn: !1,
				list: 'MAIN_QUICK_SETTINGS'
			});

		}

	},

	/*
		Call quicksettings menu

			data: Object
				menuWidth: 	     Number   - Size (in percentage) of right quicksettings menu
				options: 	     Array    - Array with all options available for current settings
				menu: 	 	     String   - Name of current menu ('gui', 'accessibility'...)
				labelName: 	     String   - Name of current settings entry on lang menu
				modifierName:    String   - Name of modifier that can be insertet after settings name (Like 1'x')
				settingsName:    String   - Name of config entry on settings database (APP.settings.data)
				isNumber: 	     Boolean  - Set this option on if current setting is a number
				disableCapitals: Boolean  - Set this on to make setting option all lowercase
				getInfo: 	     Boolean  - If true, it will try getting a description for current settings on lang database
				onCloseQs: 	     Function - Execute an extra action after closing quicksettings menu

		Example:

		APP.design.settingsMenu.callQuickSettings({
			menu: 'gui',
			getInfo: !0,
			menuWidth: 32,
			options: ['transform', 'zoom'],
			settingsName: 'screenScaleMode', 
			labelName: 'changeLauncherScaleMode',
			addBtnClass: 'LABEL_LAUNCHER_SETTINGS_SCALE_MODE',
			onCloseQs: function(){ console.table(APP.settings.data); }
		});

	*/
	callQuickSettings: function(data){

		if (data !== void 0){

			// Const
			const prevIndex = APP.design.input.currentIndex;

			// Vanriables
			var htmlTemp = '',
				modeInfo = '',
				selectedIndex = 0,
				optionList = data.options,
				addBtnClass = data.addBtnClass,
				modifierName = data.modifierName;

			// Check for missing args
			if (addBtnClass === void 0){
				addBtnClass = '';
			}
			if (modifierName === void 0){
				modifierName = '';
			}
			if (data.menuWidth === void 0){
				data['menuWidth'] = 32;
			}
			if (data.getInfo === void 0){
				data['getInfo'] = !1;
			}
			if (data.isNumber === void 0){
				data['isNumber'] = !1;
			}
			if (data.disableCapitals === void 0){
				data['disableCapitals'] = !1;
			}

			// Generate html
			optionList.forEach(function(cMode, cIndex){

				// Variables
				var newSetting,
					selectedFlag = '',
					selectedClass = '',
					modeName = cMode.toString().slice(0, 1).toUpperCase() + cMode.toString().slice(1);

				// Check for disable capitals
				if (data.disableCapitals === !0){
					modeName = modeName.toLowerCase();
				}

				// Check if is selected option
				if (APP.settings.data[data.settingsName] === cMode){
					selectedIndex = cIndex;
					selectedClass = '_SELECTED';
					selectedFlag = '<img src="img/svg/selected.svg" class="IMG_GUI_CHECKBOX">';
				}

				// Check if current setting is a number
				if (data.isNumber === !0){
					newSetting = parseFloat(cMode);
				} else {
					newSetting = '\'' + cMode + '\'';
				}

				// Get info
				if (data.getInfo === !0){
					modeInfo = '<br><label class="text-small cursor-pointer">' + APP.lang.getVariable('launcherSettings_' + data.menu + '_' + data.labelName + '_' + cMode) + '</label>';
				}

				// Default action on select
				var defaultAction = 'APP.settings.apply({\'' + data.settingsName + '\': ' + newSetting + '});APP.design.quickSettings.close();';

				// Update html
				htmlTemp = htmlTemp + '<button class="BTN_GUI_OPTIONS ' + addBtnClass + '" id="MAIN_QUICK_SETTINGS_' + cIndex + '" onclick="APP.design.input.currentIndex=' + cIndex +
						   ';APP.settings.apply({\'' + data.settingsName + '\': ' + newSetting + '});APP.design.quickSettings.close();">' + selectedFlag + '<div class="BTN_QUICKSETTINGS_CHECKBOX_LABEL' + selectedClass + '">' +
						   modeName + modeInfo + modifierName + '</div></button>';

			});

			// Call quicksettings menu
			APP.design.quickSettings.show({
				showTitle: !1,
				content: htmlTemp,
				width: data.menuWidth,

				// Execute action after closing quicksettings
				onClose: function(){

					// Reset cursor index
					APP.design.input.currentIndex = APP.design.settingsMenu.selectedMenu;

					// Return to previous location
					APP.design.settingsMenu.renderMenu(data.menu, function(){
						APP.design.input.currentIndex = prevIndex;
					});

					// Callback after closing quicksettings
					if (typeof data.onCloseQs === 'function'){
						data.onCloseQs();
					}

				}

			});

			// Set default actions for quicksettings
			APP.design.settingsMenu.qSettingsInputDefault(selectedIndex, parseInt(optionList.length - 1));

			// Release input
			APP.input.releaseInput();

		}

	},

	// Interface
	gui: {

		// Select language
		selectLanguage: function(){
			// WIP
		}

	},

	// Video options
	graphics: {

		// Change screen resolution
		changeScreenRes: function(){
			
			// Lock input
			APP.input.lockInput();

			// Variables
			var htmlTemp = '',
				selectedIndex = 0,
				screenResList = APP.settings.screenResList,
				currentMenu = APP.design.settingsMenu.selectedMenuName;

			// Process res. list
			screenResList.forEach(function(cEntry, cIndex){

				// Variables
				var cW = cEntry.w,
					cH = cEntry.h,
					cL = cEntry.flag,
					selectedFlag = '',
					selectedLabel = '',
					selectedClass = '';

				// Check if there's labels for current res.
				if (cL !== void 0 && cL !== ''){
					selectedLabel = '<br><label class="text-small cursor-pointer">' + APP.lang.getVariable('launcherSettings_' + currentMenu + '_changeScreenRes_' + cL) + '</label>';
				}

				// Check if current entry is selected res.
				if (cW === APP.settings.data.screenWidth && cH === APP.settings.data.screenHeight){
					selectedIndex = cIndex;
					selectedClass = '_SELECTED';
					selectedFlag = '<img src="img/svg/selected.svg" class="IMG_GUI_CHECKBOX">';
				}

				// Update html temp
				htmlTemp = htmlTemp + '<button class="BTN_GUI_OPTIONS" id="MAIN_QUICK_SETTINGS_' + cIndex + '" onclick="APP.design.input.currentIndex=' + cIndex + ';' +
						   'APP.design.settingsMenu.graphics.testScreenRes(' + cIndex + ');">' + selectedFlag + '<div class="BTN_QUICKSETTINGS_CHECKBOX_LABEL' + selectedClass +
						   '">' + cW + 'x' + cH + selectedLabel + '</div></button>';

			});

			// Call quicksettings menu
			APP.design.quickSettings.show({
				width: 26,
				showTitle: !1,
				content: htmlTemp,
				onClose: function(){
					APP.design.settingsMenu.graphics.returnScreenResTest();
				}
			});

			// Set default actions for quicksettings
			APP.design.settingsMenu.qSettingsInputDefault(selectedIndex, screenResList.length - 1);

			// Release input
			APP.input.releaseInput();

		},

		// Test screen res
		testScreenRes: function(newRes){

			// Variables
			var settingsData = APP.settings.data,
				newResData = APP.settings.screenResList[newRes];

			// Check if current screen res. changed
			if (settingsData.cScreenRes !== newRes){

				// Lock input
				APP.input.lockInput();

				// Reset quicksettings onclose action and close it
				APP.design.quickSettings.onClose = null;
				APP.design.quickSettings.close();

				// Set current screen res. on temp data
				APP.design.settingsMenu.tempData['resId'] = newRes;
				APP.design.settingsMenu.tempData['resW'] = newResData.w;
				APP.design.settingsMenu.tempData['resH'] = newResData.h;
				APP.design.settingsMenu.tempData['prevZoom'] = settingsData.guiZoomScale;
				APP.design.settingsMenu.tempData['newRes'] = newResData.w + 'x' + newResData.h;

				// Reset interface scale if res is lower than 1600x900
				if (newResData.w < 1600 && newResData.h < 900){
					APP.settings.data.guiZoomScale = 1;
				}

				// Update screen res for testing
				APP.design.updateCanvasRes(newResData.w, newResData.h);

				// Call msgsys preview message
				APP.design.msgsys.displayMsg({
					showAboutIcon: !0,
					msgName: 'launcherSettings_testScreenRes'
				});

				// Set timeout to revert screen res.
				APP.design.settingsMenu.tempData['screenTimeout'] = setTimeout(function(){
					APP.input.commandActions.ACTION_1();
				}, 10000);

			} else {

				// Close quicksettings menu
				APP.design.quickSettings.close();

			}

		},

		// Return from screen res. test
		returnScreenResTest: function(saveSettings){

			// Lock input
			APP.input.lockInput();

			// Clear timeout
			clearTimeout(APP.design.settingsMenu.tempData.screenTimeout);

			// Get temp data
			const tData = APP.design.settingsMenu.tempData;

			// Check if need to update settings
			if (saveSettings === !0){

				// Update res. id
				APP.settings.data.cScreenRes = tData.resId;

				// Update screen res.
				APP.settings.data.screenWidth = tData.resW;
				APP.settings.data.screenHeight = tData.resH;

				// Save settings
				APP.settings.save();

			} else {

				// Get previous screen res.
				const prevRes = APP.settings.screenResList[APP.settings.data.cScreenRes];

				// Reset zoom scale
				APP.settings.data.guiZoomScale = tData.prevZoom;

				// Reset screen res.
				APP.design.updateCanvasRes(prevRes.w, prevRes.h);

			}

			// Reset cursor index
			APP.design.input.currentIndex = 1;

			// Return to previous location
			APP.design.settingsMenu.renderMenu('graphics', function(){
				APP.design.input.currentIndex = 0;
			});

			// Reset temp data
			APP.design.settingsMenu.tempData = {};

		}

	},

	// Paths
	paths: {

		// Select fpPS4 path [WIP]
		selectEmuPath: function(){

			// Open file select path
			APP.fileManager.selectFile('.exe', function(newPath){

				// Set new path location on temp
				APP.temp.newPath = newPath;

				// Execute script
				APP.scriptInterpreter.run('path_selectEmuPath');

			});

		},

		// Add App / Games path
		addPath: function(){

			// Open select path prompt
			APP.fileManager.selectPath(function(newPath){

				// Append new game folder
				APP.settings.data.gamePaths.push(newPath);

				// Execute addGamePath script
				APP.scriptInterpreter.run('paths_addGamePath');

			});

		},

		// Remove selected index
		removeEntry: function(){
			APP.scriptInterpreter.run('path_removeGamePath');
		},

		// Update input label and set selected index on templist
		updateInputPath: function(cIndex, pathIndex){

			// Set selected index on tempData
			APP.temp['cursorIndex'] = cIndex;
			APP.temp['selectedPath'] = pathIndex;

			// Reset error button class
			APP.design.removeErrorClass();

			// Update inpput label
			APP.design.input.updateButtonLabels({
				resetInput: !0,
				target: 'LAUNCHER_SETTINGS',
				displayButtons: ['ACTION_3', 'ACTION_1'],
				buttonLabels: {'ACTION_3': 'removePath', 'ACTION_1': 'back'},

				// Bind input actions
				callback: function(){

					// Delete entry
					APP.input.setActionFn('ACTION_3', function(){
						APP.design.settingsMenu.paths.removeEntry();
					});

					// Go back
					APP.input.setActionFn('ACTION_1', function(){
						APP.design.settingsMenu.renderLeft();
					});
					APP.input.setActionFn('ARROW_LEFT', function(){
						APP.design.settingsMenu.renderLeft();
					});

					// Next / Prev buttons
					APP.input.setActionFn('ARROW_UP', function(){

						// Move cursor
						APP.design.input.moveCursor('prev');

						// Reset error button class
						APP.design.removeErrorClass();

					});
					APP.input.setActionFn('ARROW_DOWN', function(){

						// Move cursor
						APP.design.input.moveCursor('next');

						// Reset error button class
						APP.design.removeErrorClass();

					});

				}

			});

		},

		// Generate game path list
		makeGamePath: function(indexBase){

			// Variables
			var settingsData = APP.settings.data,
				res = {html: '', totalItems: parseInt(indexBase + settingsData.gamePaths.length)};

			// Check if there's more paths on game list
			if (settingsData.gamePaths.length !== 0){

				// Process game paths
				settingsData.gamePaths.forEach(function(cPath, cIndex){

					// Variables
					var pathName = APP.path.parse(cPath).base;

					// Set HTML
					res.html = res.html + '<!-- Game / App path ' + indexBase + ' --><button id="BTN_SETTINGS_OPTION_' + indexBase + '" class="BTN_GUI_OPTIONS BTN_LAUNCHER_SETTINGS" onclick="APP.design.input.currentIndex=' + indexBase +
							   ';" onfocus="APP.design.settingsMenu.paths.updateInputPath(' + indexBase + ', ' + cIndex + ');"><div class="DIV_SETTINGS_MENU_LABEL"><label class="cursor-pointer">' + pathName + '</label><br><label class="text-small cursor-pointer">' +
							   APP.lang.getVariable('launcherSettings_paths_gamePathTemplate', [cPath]) + '</label></div></button>';

					// Increment index
					indexBase++;

				});

			}

			// End
			return res;

		}

	},

	// Updater
	updater: {

		// Check if branches is available
		changeBranch: function(){

			// Check array state
			if (APP.settings.emuGitHub_availableBranches.length === 0){

				// Add btn error class
				APP.design.addErrorClass();

			} else {

				// Call quicksettings menu
				APP.design.settingsMenu.callQuickSettings({
					menuWidth: 26,
					menu: 'updater',
					disableCapitals: !0,
					settingsName: 'fpPS4_branch', 
					options: APP.settings.emuGitHub_availableBranches
				});

			}

		}

	},

	// Accessibility
	accessibility: {

		// Call zoom scale quick settings
		callGuiZoomScale: function(){

			// Zoom options
			var settingsData = APP.settings.data,
				cIndex = APP.design.input.currentIndex,
				zoomOptions = [1, 1.1, 1.2, 1.3, 1.4, 1.5];

			// Check screen res is 1600x900 or higher
			if (settingsData.screenWidth > 1599 && settingsData.screenHeight > 899){

				// Call quicksettings
				APP.design.settingsMenu.callQuickSettings({
					isNumber: !0,
					menuWidth: 20,
					modifierName: 'x',
					options: zoomOptions,
					menu: 'accessibility',
					settingsName: 'guiZoomScale',
					onCloseQs: function(){
						APP.design.updateCanvasRes();
					}
				});

			} else {

				// Add error class to current button
				APP.design.addErrorClass();

			}

		}

	},

	// Misc.
	misc: {

		// Reload launcher without closing
		reloadLauncher: function(){

			// Lock input
			APP.input.lockInput();

			// Fade out canvas
			TMS.fadeOut('APP_CANVAS', 500);

			// Reload launcher
			setTimeout(function(){
				location.reload(!0);
			}, 510);

		}

	}

}

// Remove module
delete temp_SETTINGS_LIST;