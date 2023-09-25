/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		quicksettings.js

		This file contains all functions related to quick settings (right) menu

	***********************************************************************************
*/

temp_QUICKSETTINGS = {

	/*
		Quick settings variables
	*/

	// Action to be taken when close function ends (and before callback - if provided)
	onClose: null,

	/*
		Quick settings functions
	*/

	/*
		Show quick settings menu

		data: [Object]
			title: 	   [String] - Title of settings menu
			showTitle: [Boolean] - Show title string at top
			content:   [String] - HTML content to be inserted on menu
			width: 	   [Number] - Percentage of menu width
			callback:  [Function] - Function to execute as callback
			onClose:   [Function] - Function to be executed after closing quicksettings
	*/
	show: function(data){

		if (data !== void 0){

			// Lock input
			APP.input.lockInput();

			// Variables
			var cTitle = data.title,
				cWidth = data.width,
				onClose = data.onClose,
				cContent = data.content,
				showTitle = data.showTitle,
				cList = APP.design.input.currentList,
				cIndex = APP.design.input.currentIndex;

			/*
				Check for missing data
			*/
			if (data.showTitle === void 0 || data.showTitle === ''){
				showTitle = !0;
			}
			if (data.title === void 0 || data.title === ''){
				cTitle = 'UNKNOWN_TITLE';
			}
			if (data.content === void 0 || data.content === ''){
				cContent = 'UNKNOWN_CONTENT';
			}
			if (data.width === void 0 || data.width === ''){
				cWidth = 40;
			}
			if (data.onClose === void 0 || typeof data.onClose !== 'function'){
				onClose = null;
			}

			// Save current cursor index
			if (cList === 'APP_GAMELIST_ENTRY'){
				APP.design.input.gListIndexPos = cIndex;
			}

			// Update onClose function
			APP.design.quickSettings.onClose = onClose;

			/*
				Prepare GUI before showing
			*/

			// Blur previous selected entry
			TMS.blur(cList + '_' + cIndex);

			// Append form
			APP.design.appendForm('quicksettings', void 0, 'APP_CANVAS_INNER');

			// Check if can show title
			if (showTitle === !0){
				document.getElementById('APP_QUICK_SETTINGS_TITLE').innerHTML = cTitle;
			} else {
				TMS.removeDOM('APP_QUICK_SETTINGS_TITLE');
				TMS.removeDOM('DIV_QUICKSETTINGS_SEPARATOR');
			}

			// Append form data
			document.getElementById('APP_QUICK_SETTINGS_CONTENT').innerHTML = cContent;

			// Timeout to execute animation
			setTimeout(function(){

				// Start animation
				TMS.css('APP_QUICK_SETTINGS_HOLDER_TOP', {'width': 'calc(' + cWidth + '% + 20px)'});
				TMS.css('APP_QUICK_SETTINGS_FADE', {'width': 'calc(' + cWidth + '% + 68px)', 'opacity': '1'});
				TMS.css('APP_QUICK_SETTINGS_BACKDROP', {'width': 'calc(' + cWidth + '% + 68px)', 'opacity': '1'});

				// End
				setTimeout(function(){

					// Fade in
					TMS.css('APP_QUICK_SETTINGS_HOLDER_TOP', {'opacity': '1'});

					// Release input
					APP.input.releaseInput();

					// If have callback, execute it
					if (data.callback !== void 0 && typeof data.callback === 'function'){
						data.callback();
					}

				}, 148);

			}, 40);

		}

	},

	// Close quick settings
	close: function(callback){

		// Get onClose data
		const onClose = this.onClose;

		// Lock input
		APP.input.lockInput();

		// Reset positions
		TMS.css('APP_QUICK_SETTINGS_FADE', {'opacity': '0', 'width': '0px'});
		TMS.css('APP_QUICK_SETTINGS_BACKDROP', {'opacity': '0', 'width': '0px'});
		TMS.css('APP_QUICK_SETTINGS_HOLDER_TOP', {'transition-duration': '0s', 'opacity': '0', 'width': '0px'});

		// End
		setTimeout(function(){

			// Remove form
			TMS.removeDOM('APP_QUICK_SETTINGS');

			// Release input
			APP.input.releaseInput();

			// If onClose is defined, execute it
			if (typeof onClose === 'function'){
				onClose();
			}

			// Reset onClose
			APP.design.quickSettings.onClose = null;

			// Execute callback
			if (typeof callback === 'function'){
				callback();
			}

		}, 50);

	}

}