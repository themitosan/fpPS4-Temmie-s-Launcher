/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		inputDesign.js

		This file contains tools, functions and variables related for rendering and
		updating main GUI

	***********************************************************************************
*/

temp_INPUT_DESIGN = {

	/*
		Variables
	*/

	// Selected list
	currentList: '',

	// Length of selected list
	currentListLength: 0,

	// Current index
	currentIndex: 0,

	// Enable custom function if cursor reaches beyond list length or with negative position
	enableOutOfBoundsFn: !1,

	// GAME LIST ONLY: Saved index pos.
	gListIndexPos: 0,

	/*
		Functions
	*/

	// Functions to be executed if cursor is out of bounds
	onCursorEnd: function(){},
	onCursorStart: function(){},

	/*
		Set list
		This functions defines the selected list to browse and it's behavior

			data: {Object}
				onStart: 			 function - Custom behavior to be executed if current index is negative
				onEnd: 				 function - Custom behavior to be executed if current index is beyond list length
				index: 				 int 	  - Index of cursor
				length: 			 int 	  - List length
				list: 				 String   - Name of selected list
				enableOutOfBoundsFn: boolean  - Enables or disables custom behavior (onStart or onEnd)

	*/
	setList: function(data){

		if (data !== void 0){

			// Variables
			var cIndex = 0,
				cLength = 0,
				onEnd = null,
				enableFn = !1,
				onStart = null,
				focusDom = this.currentList + '_' + this.currentIndex;

			// Blur previous selected index
			if (this.currentList !== '' && document.getElementById(focusDom) !== null){
				document.getElementById(focusDom).blur();
			}

			// Set cursor out of bounds functions
			if (data.onStart !== void 0 && typeof data.onStart === 'function'){
				onStart = data.onStart;
			}
			if (data.onEnd !== void 0 && typeof data.onEnd === 'function'){
				onEnd = data.onEnd;
			}
			this.onCursorEnd = onEnd;
			this.onCursorStart = onStart;

			// Check selected index and it's length 
			if (data.index !== void 0 && parseInt(data.index) !== NaN){
				cIndex = data.index;
			}
			if (data.length !== void 0 && parseInt(data.length) !== NaN){
				cLength = data.length;
			}
			if (cIndex > cLength){
				cIndex = cLength;
			}
			if (cIndex < 0){
				cIndex = 0;
			}

			// Enable or disable out of bounds fn
			if (data.enableOutOfBoundsFn !== void 0){
				enableFn = data.enableOutOfBoundsFn;
			}

			// Set remaining data
			this.currentIndex = cIndex;
			this.currentList = data.list;
			this.currentListLength = cLength;
			this.enableOutOfBoundsFn = enableFn;

			// Log cursor pos
			APP.log.add({data: 'INFO - (Input design) Cursor Pos: ' + cIndex});

			/*
				End
			*/
			TMS.focus(this.currentList + '_' + this.currentIndex);

		}

		// End
		return 0;

	},

	// Move cursor
	moveCursor: function(direction){

		// Variables
		var onFnReturn = {
				position: 0,
				skipProcess: !1
			},
			cList = this.currentList,
			onEnd = this.onCursorEnd,
			onStart = this.onCursorStart,
			enableFn = this.enableOutOfBoundsFn,
			listLength = this.currentListLength,
			nextPos = parseInt(this.currentIndex);

		// If direction is provided
		if (direction !== void 0 && direction !== ''){

			switch (direction){

				// Next position
				case 'next':
					nextPos++;
					break;

				// Previous position
				case 'prev':
					nextPos--;
					break;

			}

			// Checks for index position
			if (nextPos > listLength){
				nextPos = listLength;
				if (enableFn === !0 && onEnd !== null){
					onFnReturn = onEnd();
					nextPos = onFnReturn.position;
				}
			}
			if (nextPos < 0){
				nextPos = 0;
				if (enableFn === !0 && onStart !== null){
					onFnReturn = onStart();
					nextPos = onFnReturn.position;
				}
			}

			// Debug: log cursor pos.
			APP.log.add({data: 'Cursor Pos: ' + nextPos});

			// End
			if (onFnReturn.skipProcess === !1){

				// Update index
				APP.design.input.currentIndex = nextPos;

				// Focus current index and center on screen
				TMS.focus(cList + '_' + nextPos);

				// If current menu is game list, render game data
				if (cList === 'APP_GAMELIST_ENTRY'){
					APP.design.displaySelectedGame();
				} else {
					TMS.scrollCenter(cList + '_' + nextPos);
				}

			}

		}

	},

	// Focus current index
	focus: function(){
		TMS.focus(this.currentList + '_' + this.currentIndex);
	},

	// Blur current index
	blur: function(){
		TMS.blur(this.currentList + '_' + this.currentIndex);
	},

	// Trigger action from selected item
	selectMainAction: function(){
		TMS.triggerClick(this.currentList + '_' + this.currentIndex);
	},

	// Update input design
	updateInputIcons: function(){

		// Variables
		var iconStyle = APP.settings.data.input_iconStyle,
			windowList = [
				'POPUP',
				'MAIN_GAME_LIST',
				'MAIN_GAME_SETTINGS'
			];

		// Update window list
		windowList.forEach(function(cWindow){

			// Update action icons
			Object.keys(APP.input.commandActions).forEach(function(cId){

				// Check if DOM exists
				if (document.getElementById('APP_' + cWindow + '_BUTTON_ICON_' + cId) !== null){
					document.getElementById('APP_' + cWindow + '_BUTTON_ICON_' + cId).src = 'img/input/' + iconStyle + '/INPUT_' + cId + '.png';
				}

			});

		});

		// End
		return 0;

	},

	/*
		Update button labels

		data: {Object}
			resetInput: 	Boolean - Reset all actions assigned to input
			displayButtons: Array - List of actions to be updated ['ACTION_0', 'ACTION_1'...]
			buttonLabels: 	Object - Contains labels for every button {0: "confirm", 1: "cancel"}
			target: 	 	String - Defines the target of label to be updated
			callback: 		function - Function to be executed after main process is completed
	*/
	updateButtonLabels: function(data){

		if (data !== void 0){

			// Fix default
			if (data['resetInput'] === void 0){
				data['resetInput'] = !1;
			}

			// Reset button labels and button actions
			Object.keys(APP.input.commandActions).forEach(function(cAction, cIndex){

				// Reset icon label
				if (data.displayButtons.indexOf(cAction) === -1 && document.getElementById('APP_' + data.target + '_BUTTON_LABEL_ACTION_' + cIndex) !== null){
					TMS.removeDOM('APP_' + data.target + '_BUTTON_LABEL_ACTION_' + cIndex);
				}

				// Reset provided action (Set as a empty function)
				if (data.resetInput === !0){
					APP.input.setActionFn(cAction, function(){ return; });
				}

			});

			// Update / display selected button labels
			data.displayButtons.forEach(function(cButtonLabel){

				// Variables
				var iconStyle = APP.settings.data.input_iconStyle,
					imgDomId = 'APP_' + data.target + '_BTN_' + cButtonLabel,
					domId = 'APP_' + data.target + '_BUTTON_LABEL_' + cButtonLabel,
					newIcon = 'img/input/' + iconStyle + '/INPUT_' + cButtonLabel + '.png';

				// Check if label exists
				if (document.getElementById(domId) === null){

					// Generate label
					const labelHtml = '<div class="APP_POPUP_BUTTON_LABEL" id="APP_' + data.target + '_BUTTON_LABEL_' + cButtonLabel + '"><img id="' + imgDomId + '" src="img/input/' +
									  iconStyle + '/INPUT_' + cButtonLabel + '.png" class="IMG_CONTROLLER_BUTTON" alt="APP_POPUP_BUTTON_LABEL"/><label id="' + domId + '_TEXT">' +
									  APP.lang.getVariable('MSGSYS_LABEL_' + data.buttonLabels[cButtonLabel]) + '</label></div>';

					// Append label
					TMS.append('APP_' + data.target + '_BUTTON_LABEL_HOLDER', labelHtml);

				} else {

					// Update icon
					var getSrc = document.getElementById(imgDomId).src;
					if (getSrc !== newIcon){
						document.getElementById(imgDomId).src = newIcon;
					}

					// Update label
					document.getElementById(domId + '_TEXT').innerHTML = APP.lang.getVariable('MSGSYS_LABEL_' + data.buttonLabels[cButtonLabel]);

				}

			});

			/*
				Reorganize all icons before executing callback (if provided)
			*/

			// Variables
			var tempHtml = '',
				actionList = Array.from(document.getElementById('APP_' + data.target + '_BUTTON_LABEL_HOLDER').children);

			// Erase all data from current target
			document.getElementById('APP_' + data.target + '_BUTTON_LABEL_HOLDER').innerHTML = '';

			// Process display button list
			data.displayButtons.forEach(function(cButton){

				// Seek for declared buttons
				actionList.forEach(function(cLabel){

					// Check if button is present on display button list
					if (cLabel.outerHTML.indexOf('APP_' + data.target + '_BUTTON_LABEL_' + cButton) !== -1){
						tempHtml = tempHtml + cLabel.outerHTML;
						actionList.splice(actionList.indexOf(cLabel), 1);
					}

				});

			});

			// Process remaining buttons
			actionList.forEach(function(cLabel){
				tempHtml = tempHtml + cLabel.outerHTML;
			});

			// Append label list
			document.getElementById('APP_' + data.target + '_BUTTON_LABEL_HOLDER').innerHTML = tempHtml;

			// Execute callback
			if (data.callback !== void 0 && typeof data.callback === 'function'){
				data.callback();
			}

		}

	}

}