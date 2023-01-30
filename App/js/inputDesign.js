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
				index: 				 int - Index of cursor
				length: 			 int - List length
				list: 				 String - Name of selected list
				enableOutOfBoundsFn: boolean - Enables or disables custom behavior (onStart or onEnd)

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

			/*
				End
				Blur all buttons and then set focus to selected index
			*/

			TMS.focus(this.currentList + '_' + this.currentIndex);

		}

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

			console.info('Cursor Pos: ' + nextPos);

			// End
			if (onFnReturn.skipProcess === !1){
				APP.design.input.currentIndex = nextPos;
				TMS.focus(cList + '_' + nextPos);
			}

		}

	},

	// Trigger action from selected item
	selectMainAction: function(){
		TMS.triggerClick(this.currentList + '_' + this.currentIndex);
	},

	// Update input design
	updateInputIcons: function(){

		// Variables
		var iconStyle = APP.design.iconStyle,
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
					document.getElementById('APP_' + cWindow + '_BUTTON_ICON_' + cId).src = 'img/svg/INPUT_' + iconStyle + '_' + cId + '.svg';
				}

			});

		});

	}

}