/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		msg_system.js

		This file is responsible for handling message system functions and it's
		database.

	***********************************************************************************
*/

temp_MSGSYSTEM = {

	// MSG Database
	MSG_DB: {},

	/*
		Variables
	*/
	msgSysRunning: !1,	 // If msg is being displayed
	animTransTime: 200,	 // Transition time from containers
	msgCurrentHolder: 0, // Current msg holder
	msgCurrentMsg: '',	 // Current message
	msgCurrentList: '',	 // Current message list

	/*
		Functions
	*/

	// Load msg files
	loadMsgs: function(){

		try {

			// Set msg path
			const msgPath = APP.settings.data.nwPath + '/App/msg/';

			APP.fs.readdirSync(msgPath).forEach(function(cMsgFile){
				
				console.info('INFO - Loading ' + cMsgFile);
				const msgJson = JSON.parse(APP.fs.readFileSync(msgPath + cMsgFile, 'utf8'));

				Object.keys(msgJson).forEach(function(cMsg){
					APP.design.msgSys.MSG_DB[APP.path.parse(cMsg).name] = msgJson[cMsg];
				});

			});

		} catch (err) {
			console.error(err);
		}

	},

	/*
		Call (display) Message GUI

		msgData: {Object}
			msgList: 		[String] - Name of message message list to be loaded
			msgName: 		[String] - Name of the message to be displayed (Check language.js for more details)

	*/
	displayMsg: function(data){

		// Set internal variables
		this.msgSysRunning = !0;
		this.msgCurrentHolder = 0;
		this.msgCurrentList = data.msgList;

		// Set variables
		var replaceList = [],
			transTime 	= this.animTransTime,
			msgList 	= this.MSG_DB[data.msgList],
			msgMetadata = msgList[data.msgName],
			cScene = APP.design.sceneManager.currentScene;
		
		// Create replace list
		msgMetadata.replaceList.forEach(function(repData){
			replaceList.push(APP.tools.getStringFromApp(repData));
		});

		// Get message strings
		const cMessage = APP.lang.getMsgSys(data.msgName, replaceList);

		/*
			Set GUI before showing
		*/

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
		this.updateButtonLabels({
			resetInput: !0,
			target: 'POPUP',
			buttonLabels: msgMetadata.buttonLabels,
			displayButtons: msgMetadata.displayButtons
		});

		// Set actions
		Object.keys(msgMetadata.actions).forEach(function(actionButton){
			APP.input.setActionFn(actionButton, function(){
				APP.design.msgSys.callNextPrev(msgMetadata.actions[actionButton]);
			});
		});

		// Reset content positions
		TMS.css('APP_POPUP_CONTENT_0', {'transition-duration': '0s', 'z-index': 1, 'left': '14.2%'});
		TMS.css('APP_POPUP_CONTENT_1', {'transition-duration': '0s', 'z-index': 0, 'left': '100%'});

		// Prepare GUI before showing
		TMS.css('APP_POPUP', {'display': 'block', 'opacity': '0'});

		// Reset transition time
		TMS.css('APP_POPUP_CONTENT_0', {'transition-duration': parseFloat(transTime / 1000) + 's'});
		TMS.css('APP_POPUP_CONTENT_1', {'transition-duration': parseFloat(transTime / 1000) + 's'});

		/*
			End - Show GUI and release input
		*/
		setTimeout(function(){
			
			// Update opacity
			TMS.css('APP_POPUP', {'opacity': '1'});
			
			// Release input after animation ends
			setTimeout(function(){
				APP.input.lockCommandAction = !1;
			}, (transTime + 10));

		}, 50);

	},

	// Call next / previous message
	callNextPrev: function(msgData){
		if (this.msgSysRunning === !0){

			console.info(msgData);

			// Lock input
			APP.input.lockCommandAction = !0;

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
						animationType = msgData.data.animation,
						cMsgMetadata = this.MSG_DB[this.msgCurrentList][msgData.data.msgName],
						cMsgData = APP.lang.getMsgSys(msgData.data.msgName, msgData.replaceList);

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
					this.updateButtonLabels({
						resetInput: !0,
						target: 'POPUP',
						buttonLabels: cMsgMetadata.buttonLabels,
						displayButtons: cMsgMetadata.displayButtons
					});

					// Set actions
					Object.keys(cMsgMetadata.actions).forEach(function(actionButton){
						APP.input.setActionFn(actionButton, function(){
							APP.design.msgSys.callNextPrev(cMsgMetadata.actions[actionButton]);
						});
					});

					/*
						Animation type
					*/
					switch (animationType){

						case 'next':
							prevContentStyle = {'left': '0%'};
							nextContentStyle = {'left': '14.2%'};
							nextContentBefore = {'left': '28.4%'};
							break;

						case 'prev':
							prevContentStyle = {'left': '28.4%'};
							nextContentStyle = {'left': '14.2%'};
							nextContentBefore = {'left': '0%'};
							break;

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

						// Release input after animation ends
						setTimeout(function(){
							APP.input.lockCommandAction = !1;
						}, parseInt(transTime) + 10);

					}, 10);
					break;

				/*
					End message
				*/
				case 'endMessage':
					APP.design.msgSys.endMessage(msgData.data.callback);
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
		APP.input.lockCommandAction = !0;

		// Reset vars
		this.msgSysRunning = !1;
		this.msgCurrentHolder = 0;

		// Fade out popup and bg icon (if displayed)
		TMS.css('APP_POPUP', {'opacity': '0'});
		TMS.css('APP_CANVAS_BG_ICON', {'opacity': '0'});

		/*
			End
		*/
		setTimeout(function(){

			// Hide popup
			TMS.css('APP_POPUP', {'display': 'none'});

			// If some scene is loaded, hide it
			if (cScene !== ''){
				TMS.css(cScene, {'display': 'block'});
			}

			// If has callback, execute it
			if (callback !== void 0){
				(Function('"use strict";return ' + callback)());
			}

		}, parseInt(transTime + 10));

	},

	/*
		Update button labels

		data: {Object}
			resetInput: 	Boolean - Reset all actions assigned to input
			displayButtons: Array - List of actions to be updated ["ACTION_0", "ACTION_1"...]
			buttonLabels: 	Object - Contains labels for every button {0: "confirm", 1: "cancel"}
			target: 	 	String - Defines the target of label to be updated
			callback: 		function - Function to be executed after main process is completed
	*/
	updateButtonLabels: function(data){

		if (data !== void 0){

			// Fix default
			if (data.resetInput === void 0){
				data.resetInput = !1;
			}

			// Reset button labels and button actions
			Object.keys(APP.input.commandActions).forEach(function(cAction, cIndex){
	
				// Reset icon label
				if (data.displayButtons.indexOf(cAction) === -1 && document.getElementById('APP_' + data.target + '_BUTTON_LABEL_ACTION_' + cIndex) !== null){
					TMS.css('APP_' + data.target + '_BUTTON_LABEL_ACTION_' + cIndex, {'display': 'none'});
				}
	
				// Set current button as a empty function
				if (data.resetInput === !0){
					APP.input.setActionFn(cAction, function(){ return; });
				}

			});

			// Update / display selected button labels
			data.displayButtons.forEach(function(cButtonLabel){
				const domId = 'APP_' + data.target + '_BUTTON_LABEL_' + cButtonLabel;
				if (document.getElementById(domId) !== null){
					document.getElementById(domId +'_TEXT').innerHTML = APP.lang.getVariable('MSGSYS_LABEL_' + data.buttonLabels[cButtonLabel]);
					TMS.css(domId, {'display': 'flex'});
				}
			});

			// Execute callback
			if (data.callback !== void 0 && typeof data.callback === 'function'){
				data.callback();
			}

		}

	}

}