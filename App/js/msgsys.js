/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		msgsys.js

		This file is responsible for handling message system functions and it's
		database.

	***********************************************************************************
*/

temp_MSGSYS = {

	// MSG Database
	MSG_DB: {},

	/*
		Variables
	*/
	msgSysRunning: !1,	 // If msg is being displayed
	animTransTime: 200,	 // Transition time from containers
	msgCurrentHolder: 0, // Current msg holder
	msgCurrentMsg: '',	 // Current message

	/*
		Functions
	*/

	// Load msg files
	loadMsgs: function(){

		try {

			// Set msg path
			const msgPath = APP.settings.appPath + '/msg/';

			// Process msg files
			APP.fs.readdirSync(msgPath).forEach(function(cMsgFile){

				// Log and load msg file
				APP.log.add({data: 'INFO - (msgsys) Loading ' + cMsgFile});
				const msgJson = JSON.parse(APP.fs.readFileSync(msgPath + cMsgFile, 'utf8'));

				// Process msgs
				Object.keys(msgJson).forEach(function(cMsg){
					APP.design.msgsys.MSG_DB[cMsg] = msgJson[cMsg];
				});

			});

		} catch (err) {
			throw new Error(err);
		}

	},

	/*
		Call (display) Message GUI

		msgData: {Object}
			showBgIcon: Boolean  - Show background icon (Default: "4" logo)
			msgName: 	String   - Name of the message to be displayed (Check language.js for more details)
			callback: 	Function - Function to be executed after displaying main GUI
	*/
	displayMsg: function(data){

		// Fix showBgIcon if not available
		if (data.showBgIcon === void 0){
			data['showBgIcon'] = !1;
		}

		// Set internal variables
		this.msgSysRunning = !0;
		this.msgCurrentHolder = 0;
		this.msgCurrentMsg = data.msgName;

		// Set variables
		var replaceList = [],
			transTime = this.animTransTime,
			msgMetadata = this.MSG_DB[data.msgName],
			cScene = APP.design.sceneManager.currentScene;

		// Check if metadata exists
		if (msgMetadata === void 0){
			const err = 'Unable to load current msg metadata!\nmsgName: ' + data.msgName;
			APP.log.add({mode: 'error', data: 'ERROR - (msgsys) ' + err});
			window.alert('ERROR: (msgsys) ' + err);
		}

		// Create replace list
		msgMetadata.replaceList.forEach(function(repData){

			// Get variable data
			var strData = APP.tools.getVariable(repData);

			// Check if variable exists
			if (strData !== void 0){
				replaceList.push(strData);
			} else {
				throw new Error('ERROR - (msgsys) Unable to find selected variable from current message!\nVariable: ' + repData + '\nMessage name: ' + data.msgName);
			}

		});
		
		// Get message strings
		const cMessage = APP.lang.getMsgSys(data.msgName, replaceList);

		// Reset input selected list
		APP.design.input.currentList = '';

		/*
			Set GUI before showing
		*/

		// Append popup form
		APP.design.appendForm('msgsys');

		// Hide background icon
		TMS.css('APP_CANVAS_BG_ICON', {'transition-duration': '0s', 'opacity': '0'});

		// Update icon style
		APP.design.input.updateInputIcons();

		// Set title and message content
		document.getElementById('APP_POPUP_TITLE').innerHTML = cMessage.title;
		document.getElementById('APP_POPUP_CONTENT_' + this.msgCurrentHolder).innerHTML = cMessage.message;

		// If some scene is loaded, hide it
		if (cScene !== ''){
			TMS.css(cScene, {'display': 'none'});
		}

		// Reset button labels and button actions
		APP.design.input.updateButtonLabels({
			resetInput: !0,
			target: 'POPUP',
			buttonLabels: msgMetadata.buttonLabels,
			displayButtons: msgMetadata.displayButtons
		});

		// Set actions
		Object.keys(msgMetadata.actions).forEach(function(actionButton){
			APP.input.setActionFn(actionButton, function(){
				APP.design.msgsys.callNextPrev(msgMetadata.actions[actionButton]);
			});
		});

		// Reset content positions
		TMS.css('APP_POPUP_CONTENT_0', {'transition-duration': '0s', 'z-index': '1', 'left': '14.2%'});
		TMS.css('APP_POPUP_CONTENT_1', {'transition-duration': '0s', 'z-index': '0', 'left': '100%'});

		// Prepare GUI before showing
		TMS.css('APP_MSGSYS', {'display': 'block', 'opacity': '0'});

		// Reset transition time
		TMS.css('APP_POPUP_CONTENT_0', {'transition-duration': parseFloat(transTime / 1000) + 's'});
		TMS.css('APP_POPUP_CONTENT_1', {'transition-duration': parseFloat(transTime / 1000) + 's'});

		/*
			End - Show GUI and release input
		*/
		setTimeout(function(){

			// Update opacity
			TMS.css('APP_MSGSYS', {'opacity': '1'});

			// Show bg icon if enabled 
			if (data.showBgIcon === !0){
				TMS.css('APP_CANVAS_BG_ICON', {'transition-duration': parseFloat(transTime / 1000) + 's', 'opacity': '1'});
			}

			// Execute callback after animation and release input 
			setTimeout(function(){

				// Check for callback
				if (typeof data.callback === 'function'){
					data.callback();
				}

				// Release input
				APP.input.releaseInput();

			}, (transTime + 10));

		}, 100);

	},

	/*
		Call next / previous message

			msgData: 			 Object
				↓
				replaceList: 	 Array  - List of elements to be replaced with variables
				action: 		 String - Next action to be taken (callMessage / endMessage / execFn)
				data: 			 Object
					↓
					msgName: 	 String - Name of next message to be shown
					animation: 	 String - Animation to be executed from one message to another (next, prev or fade)
					callback:    Function - Callback to be executed after closing msgsys
	*/
	callNextPrev: function(msgData){

		// Check if msgsys is running
		if (this.msgSysRunning === !0){

			// Log next message
			APP.log.add({data: msgData});

			// Lock input
			APP.input.lockInput();

			// Action type
			switch (msgData.action){

				/*
					Call next message
				*/
				case 'callMessage':

					// Set variables
					var prevContentId = 0,
						nextContentId = 1,
						prevContentStyle = {},
						nextContentStyle = {},
						nextContentBefore = {},
						transTime = this.animTransTime,
						focusIndex = msgData.data.focusIndex,
						animationType = msgData.data.animation,
						cMsgMetadata = this.MSG_DB[msgData.data.msgName],
						cMsgData = APP.lang.getMsgSys(msgData.data.msgName, msgData.replaceList, cMsgMetadata.options);

					// Check focus index
					if (focusIndex === void 0){
						focusIndex = 0;
					}

					// Set previous / next content id
					if (this.msgCurrentHolder === 1){
						prevContentId = 1;
						nextContentId = 0;
					}
					this.msgCurrentHolder = nextContentId;

					// Update icon style
					APP.design.input.updateInputIcons();

					// Set next message content
					document.getElementById('APP_POPUP_TITLE').innerHTML = cMsgData.title;
					document.getElementById('APP_POPUP_CONTENT_' + nextContentId).innerHTML = cMsgData.message;

					// Reset button labels and button actions
					APP.design.input.updateButtonLabels({
						resetInput: !0,
						target: 'POPUP',
						buttonLabels: cMsgMetadata.buttonLabels,
						displayButtons: cMsgMetadata.displayButtons
					});

					// Set actions
					Object.keys(cMsgMetadata.actions).forEach(function(actionButton){
						APP.input.setActionFn(actionButton, function(){
							APP.design.msgsys.callNextPrev(cMsgMetadata.actions[actionButton]);
						});
					});

					/*
						Animation type
					*/
					switch (animationType){

						// Right to left ( <-- )
						case 'next':
							prevContentStyle = {'left': '0%'};
							nextContentStyle = {'left': '14.2%'};
							nextContentBefore = {'left': '28.4%'};
							break;

						// Left to right ( --> )
						case 'prev':
							prevContentStyle = {'left': '28.4%'};
							nextContentStyle = {'left': '14.2%'};
							nextContentBefore = {'left': '0%'};
							break;

						// Fade
						case 'fade':
							prevContentStyle = {'left': '14.2%'};
							nextContentStyle = {'left': '14.2%'};
							nextContentBefore = {'left': '14.2%'};
							break;

					}

					/*
						Prepare elements before animation
					*/

					// Update next content css before animation
					nextContentBefore['transition-duration'] = '0s';
					nextContentBefore['filter'] = 'blur(20px)';
					nextContentBefore['opacity'] = '0';
					nextContentBefore['z-index'] = '1';

					// Update next content css after animation
					nextContentStyle['transition-duration'] = parseFloat(transTime / 1000) + 's';
					nextContentStyle['filter'] = 'blur(0px)';
					nextContentStyle['opacity'] = '1';

					// Update previous content css after animation
					prevContentStyle['filter'] = 'blur(20px)';
					prevContentStyle['opacity'] = '0';
					prevContentStyle['z-index'] = '0';

					// Set next content css before animation
					TMS.css('APP_POPUP_CONTENT_' + nextContentId, nextContentBefore);

					/*
						Execute animation
					*/

					// Set previous content animation
					TMS.css('APP_POPUP_CONTENT_' + prevContentId, prevContentStyle);

					// Set timeout to actually animate
					setTimeout(function(){

						// Set next content animation
						TMS.css('APP_POPUP_CONTENT_' + nextContentId, nextContentStyle);

						setTimeout(function(){

							// Set new cursor position
							APP.design.input.currentIndex = focusIndex;
							APP.design.input.focus();

							// Release input after animation ends
							APP.input.releaseInput();

						}, parseInt(transTime) + 10);

					}, 10);
					break;

				/*
					End message
				*/
				case 'endMessage':
					APP.design.msgsys.endMessage(msgData.data.callback);
					break;

				/*
					Execute function
				*/
				case 'execFn':
					(Function('"use strict";APP.' + msgData.data.fnExec)());
					break;

				/*
					Call script
				*/
				case 'callScript':
					APP.scriptInterpreter.run(msgData.data.listName);
					break;

			}

		}

	},

	// Close MSG GUI
	endMessage: function(callback){

		// Variable
		var transTime = this.animTransTime,
			cScene = APP.design.sceneManager.currentScene;

		// Lock input
		APP.input.lockInput();

		// Reset vars
		this.msgCurrentMsg = '';
		this.msgSysRunning = !1;
		this.animTransTime = 200;
		this.msgCurrentHolder = 0;

		// Fade out popup and bg icon (if displayed)
		TMS.css('APP_MSGSYS', {'opacity': '0'});
		TMS.css('APP_CANVAS_BG_ICON', {'opacity': '0'});

		/*
			End
		*/
		setTimeout(function(){

			// Hide popup
			TMS.removeDOM('APP_MSGSYS');

			// If some scene is loaded, hide it
			if (cScene !== ''){
				TMS.css(cScene, {'display': 'block'});
			}

			// If has callback, execute it
			switch (typeof callback){

				// String (used on msg json files)
				case 'string':
					(Function('"use strict";return ' + callback)());
					break;

				// Inline function
				case 'function':
					callback();
					break;

			}

			// Release input
			APP.input.releaseInput();

		}, parseInt(transTime + 10));

	}

}