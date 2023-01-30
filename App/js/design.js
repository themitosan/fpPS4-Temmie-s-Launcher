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
		Variables
	*/

	// Icon design ( Default: PS )
	iconStyle: 'PS',

	/*
		Import design modules
	*/
	msgSys: temp_MSGSYSTEM, 		 // Message system
	input: temp_INPUT_DESIGN, 		 // Input handling
	sceneManager: temp_SCENEMANAGER, // Scene Manager

	/*
		Window Functions
	*/

	// Drag app window (Original API: R3V3 and W3Schools - https://www.w3schools.com/howto/howto_js_draggable.asp)
	enableDragWindow: function() {

		// Variables
		var pos1 = pos2 = pos3 = pos4 = 0,
			elmnt = document.getElementById('APP_TOP_BAR');

		// Process drag event
		function dragElement(evt) {

			var domId = elmnt.id,
				msg = APP.appTitle;

			evt = evt || window.event;
			evt.preventDefault();
			pos1 = (pos3 - evt.clientX);
			pos2 = (pos4 - evt.clientY);
			finalX = (window.screenX - pos1);
			finalY = (window.screenY - pos2);

			// Prevent out of bounds
			if (finalX < 0){
				finalX = 0;
			}
			if (finalY < 0){
				finalY = 0;
			}

			// Update release message
			if (finalY === 0 && APP.win.cWindow.state !== 'maximized'){
				msg = APP.lang.getVariable('APP_TOP_BAR_releaseToMax');
			}
			document.getElementById('DIV_TOP_WINDOW_DOCUMENT_TITLE').innerHTML = msg;

			// End
			if (APP.win.cWindow.state !== 'maximized'){
				APP.win.moveTo(finalX, finalY);
			}

		}

		// Stop drag event
		function stopDrag(){

			// Maximize window if dragged at top
			if (window.screenY === 0){
				APP.win.maximize();
			}

			// Remove bindings and update app title
			document.onmouseup = null;
			document.onmousemove = null;
			document.getElementById('DIV_TOP_WINDOW_DOCUMENT_TITLE').innerHTML = APP.appTitle;

		}

		// On mouse down
		function dragMouseDown(evt){
			evt = evt || window.event;
			evt.preventDefault();
			pos3 = evt.clientX;
			pos4 = evt.clientY;
			document.onmousemove = dragElement;
			document.onmouseup = stopDrag;
		}

		// Enable drag
		document.getElementById('APP_TOP_BAR').onmousedown = dragMouseDown;

	},

	// Toggle maximize
	toggleMaximize: function(){

		// Get window state
		var winState = APP.win.cWindow.state;

		// Switch between modes
		switch (winState){

			case 'maximized':
				APP.win.restore();
				break;

			case 'normal':
				APP.win.maximize();
				break;

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

	// Check if needs to show some message before boot
	bootCheck: function(){
		
		if (Object.keys(this.bootMessageData).length !== 0){

			TMS.css('APP_CANVAS_BG_ICON', {'opacity': '1'});
			APP.design.msgSys.displayMsg(this.bootMessageData);

		} else {

			// Display intro message
			this.displayIntroMessage();
		}

	},

	// Display into message
	displayIntroMessage: function(){

		// Set current scene
		this.sceneManager.currentScene = 'APP_MAIN';

		// Update input buttons GUI
		this.input.updateInputIcons();

		/*
			Display intro
		*/

		// Get background color from settings
		var bgColorA = APP.settings.data.backgroundColor_top,
			bgColorB = APP.settings.data.backgroundColor_bottom;

		// Set background color
		TMS.css('APP_CANVAS_BG_COLOR', {'background-image': 'linear-gradient(140deg, #' + bgColorA + ', #' + bgColorB + ')'});

		// Append boot message
		document.getElementById('APP_LABEL_BOOT_INFO').innerHTML = APP.lang.getVariable('bootWarnInfo');

		// Display boot info and background color (partially)
		TMS.css('APP_LABEL_BOOT_INFO', {'opacity': '1'});
		TMS.css('APP_CANVAS_BG_COLOR', {'opacity': '0.4'});

		// End
		setTimeout(function(){
	
			// Render game list
			APP.gameList.make(function(){
				APP.design.renderGameList(function(){
					APP.design.finishBoot();
				});
			});
	
		}, 4400);

	},

	// Show main GUI after boot process
	finishBoot: function(){

		// Fade out message and fade in background color
		TMS.css('APP_MAIN', {'display': 'block'});
		TMS.css('APP_CANVAS_BG_COLOR', {'transition-duration': '0.6s', 'opacity': '1'});
		TMS.css('APP_LABEL_BOOT_INFO', {'opacity': '0', 'transition-duration': '0.4s', 'filter': 'blur(4px)'});

		// After animation, hide message and enable drag window
		setTimeout(function(){

			TMS.css('APP_LABEL_BOOT_INFO', {'display': 'none', 'filter': 'none', 'transition-duration': '0s'});
			TMS.css('APP_TOP_BAR', {'display': 'flex'});

			// Display main GUI and change body bg color
			TMS.css('APP_MAIN', {'opacity': '1'});
			TMS.css('APP_CANVAS_BG', {'opacity': '0.62'});
			TMS.css('body', {'background-color': '#' + APP.settings.data.backgroundColor_bottom});

			// Focus first game entry
			TMS.focus('APP_GAMELIST_ENTRY_0');

			// Enable input
			APP.input.lockCommandAction = !1;

		}, 610);

	},

	/*
		Lang functions
	*/

	// Update GUI language
	updateLang: function(){
		
		// Seleced lang database
		const cLang = APP.lang.selected;

		// Update titles
		Object.keys(cLang.title).forEach(function(domId){
			if (document.getElementById(domId) !== null && cLang.title[domId] !== ''){
				document.getElementById(domId).title = cLang.title[domId];
			}
		});

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
		Gamelist functions
	*/

	// Render list
	renderGameList: function(callback){

		// Variables
		var nextBtn = '', 
			prevBtn = '',
			tempHtml = '',
			entryClass = '',
			metadataTemplate = '',
			displayMode = APP.settings.data.gameListMode;

		// Reset top actions background color
		TMS.css('APP_MAIN_TOP_BG', {'top': '-40px', 'background-color': '#0000'});

		// Switch from display mode
		switch (displayMode){

			// List
			case 'list':

				// Set entry mode
				entryClass = 'GAMELIST_ENTRY_LIST';

				// Set list
				APP.design.input.setList({
					index: 0,
					enableOutOfBoundsFn: !0,
					list: 'APP_GAMELIST_ENTRY',
					length: (Object.keys(APP.gameList.list).length - 1),

					// If user press up, focus top actions menu
					onStart: function(){ 
						return APP.design.bakedFunctions.GAMELIST_gotoTop();
					},

					// If user press down, return to first item on list
					onEnd: function(){
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
			var res = '';
			switch (mode){

				case 'list':
					res = '<div class="APP_GAMELIST_ENTRY_METADATA METADATA_LIST">' +
						  '<label class="LABEL_ENTRY_APP_NAME_LIST">' + data.name + '</label><br>' +
						  '<label class="LABEL_ENTRY_METADATA">' + data.info + '</label></div>';

			}

			return res;

		}

		// Process list
		Object.keys(APP.gameList.list).forEach(function(cEntry, cIndex){

			// Variables
			var metadataHtml = '',
				entryName = cEntry,
				langId = APP.lang.selected.titleId,
				entryMetadata = APP.gameList.list[cEntry];

			// Get entry name from PARAM.SFO and set metadata html
			if (Object.keys(entryMetadata.paramSfo).length !== 0){
				entryName = entryMetadata.paramSfo['TITLE' + langId];
				metadataHtml = getMetadataInfo(displayMode, {name: entryName, info: entryMetadata.paramSfo.TITLE_ID + ' - ' + APP.lang.getVariable('gameList_entryVersion', [entryMetadata.paramSfo.VERSION])});
			} else {
				metadataHtml = getMetadataInfo(displayMode, {name: entryName, info: APP.lang.getVariable('gameList_entryHomebrew')});
			}

			tempHtml = tempHtml + '<button class="APP_GAMELIST_ENTRY ' + entryClass + '" id="APP_GAMELIST_ENTRY_' + cIndex + '" onclick="APP.design.input.currentIndex = ' + cIndex + ';' + 
								  'APP.design.displaySelectedGame();"><img class="IMG_GAME_ICON" src="' + entryMetadata.img_icon + '">' + metadataHtml + '</button>';

		});

		// Append HTML
		document.getElementById('APP_MAIN_GAMELIST').innerHTML = tempHtml;

		// Update button labels
		this.msgSys.updateButtonLabels({
			resetInput: !0,
			target: 'MAIN_GAME_LIST',
			displayButtons: ["ACTION_0", "ACTION_2", "ACTION_3"],
			buttonLabels: {"ACTION_0": 'run', "ACTION_2": 'toggleHack', "ACTION_3": 'options'},

			// Bind input actions
			callback: function(){

				// Actions
				APP.input.setActionFn('ACTION_0', function(){
					APP.design.input.selectMainAction();
				});

				// Home: Goto top
				APP.input.setActionFn('ACTION_12', function(){
					APP.design.bakedFunctions.GAMELIST_gotoTop();
				});

				// Next / Prev buttons
				APP.input.setActionFn(prevBtn, function(){
					APP.design.input.moveCursor('prev');
					APP.design.displaySelectedGame();
				});
				APP.input.setActionFn(nextBtn, function(){
					APP.design.input.moveCursor('next');
					APP.design.displaySelectedGame();
				});
			}

		});

		/*
			End
		*/

		// Set focus to first index
		TMS.focus('APP_GAMELIST_ENTRY_0');
		this.displaySelectedGame();

		// Execute callback
		if (callback !== void 0 && typeof callback === 'function'){
			callback();
		}

	},

	// Scroll selected entry to center and display it's background
	displaySelectedGame: function(){
		
		// Variables
		var cIndex = APP.design.input.currentIndex,
			entryMetadata = APP.gameList.list[Object.keys(APP.gameList.list)[cIndex]];

		// Scroll entry to center
		if (APP.settings.data.gameListMode !== 'orbis'){
			TMS.scrollCenter('APP_GAMELIST_ENTRY_' + APP.design.input.currentIndex);
		}

		// Set background image
		if (APP.design.input.currentList === 'APP_GAMELIST_ENTRY'){
			TMS.css('APP_CANVAS_BG', {'background-image': 'url(\"' + entryMetadata.img_background + '\")'});
		}

	},

	/*
		Baked GUI functions 
	*/
	bakedFunctions: {

		// Game list (list mode) - Go to top actions if user press up while first entry is selected
		GAMELIST_gotoTop: function(){

			// Lock input
			APP.input.lockCommandAction = !0;

			// Dim top actions menu bg
			TMS.css('APP_MAIN_TOP_BG', {'top': '-20px', 'background-color': '#000a'});

			// Set new list
			APP.design.input.setList({
				index: 1,
				length: 3,
				list: 'INPUT_GUI_TOP',
				enableOutOfBoundsFn: !0
			});

			// Update button labels
			APP.design.msgSys.updateButtonLabels({
				resetInput: !0,
				target: 'MAIN_GAME_LIST',
				displayButtons: ["ACTION_0"],
				buttonLabels: {"ACTION_0": 'enter'},

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
					APP.input.setActionFn('ARROW_DOWN', function(){
						APP.design.renderGameList();
					});

					// Release input
					APP.input.lockCommandAction = !1;

				}

			});

			// Return
			return {position: 0, skipProcess: !0};
		}

	}

}

// Delete imported modules
delete temp_MSGSYSTEM;
delete temp_SCENEMANAGER;
delete temp_INPUT_DESIGN;