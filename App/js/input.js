/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		input.js
	
		This file is resposible for handling input reading and it's registers.

	***********************************************************************************
*/

temp_INPUT = {

	/*
		Command variables
	*/

	// Lock command actions
	lockCommandAction: !0,

	// Input actions
	commandActions: {
		
		// General actions
		ACTION_0: function(){return;},
		ACTION_1: function(){return;},
		ACTION_2: function(){return;},
		ACTION_3: function(){return;},
		ACTION_4: function(){return;},
		ACTION_5: function(){return;},
		ACTION_6: function(){return;},
		ACTION_7: function(){return;},
		ACTION_8: function(){return;},
		ACTION_9: function(){return;},
		ACTION_10: function(){return;},
		ACTION_11: function(){return;},
		ACTION_12: function(){return;},

		// Arrow directions
		ARROW_UP: function(){return;},
		ARROW_DOWN: function(){return;},
		ARROW_LEFT: function(){return;},
		ARROW_RIGHT: function(){return;},

		// Mouse wheel
		MOUSE_WHEEL_UP: function(){return;},
		MOUSE_WHEEL_DOWN: function(){return;}
	
	},

	// Input history (up to 20 entries)
	inputHistory: [],

	/*
		Command functions
	*/

	/*
		Process input history
		Get last x entres: APP.input.inputHistory.slice(-9);
	*/
	pInputHistory: function(cInput){

		// Check if input exists
		if (this.commandActions[cInput] !== void 0){

			// Check history length
			if (APP.input.inputHistory.length > 19){
				APP.input.inputHistory.splice(0, 1);
			}

			// Push input to list
			APP.input.inputHistory.push(cInput);

		}

	},

	// Lock input
	lockInput: function(){
		this.lockCommandAction = !0;
	},

	// Release input
	releaseInput: function(){
		this.lockCommandAction = !1;
	},

	// Bind function to action
	setActionFn: function(actionId, callback){

		// Variables
		var reason = [], 
			canBind = !0;

		// Check if action was provided
		if (actionId === void 0 || actionId === ''){
			canBind = !1;
			reason.push('Invalid action id! (' + actionId + ')');
		}

		// Check if provided callback is a valid function
		if (typeof callback !== 'function'){
			canBind = !1;
			reason.push('The provided data to execute isn\'t a function! (' + typeof callback + ')');
		}

		// Check if provided action id exists on database
		if (this.commandActions[actionId] === void 0){
			canBind = !1;
			reason.push('Unable to find provided action on command list! (' + actionId + ')');
		}

		// Check if can bind action
		if (canBind === !0){

			// Set action function
			this.commandActions[actionId] = function(){

				// Log action
				APP.log.add({data: 'Executing ' + actionId});
				APP.log.add({data: callback});

				// Check if can execute action
				if (APP.input.lockCommandAction === !1){

					// Push input to history and execute action
					APP.input.pInputHistory(actionId);
					callback();

					// End
					return 0;

				} else {
					APP.log.add({mode: 'warn', data:'WARN - Input is locked!'});
				}

			}
			
		} else {

			// Log error
			console.error('ERROR - Unable to bind action!\n' + APP.tools.convertArrayToString(reason));

		}

		// End
		return 0;

	},

	// Clear all binded actions
	clearActions: function(){

		// Process action list
		Object.keys(this.commandActions).forEach(function(cAction){
			APP.input.commandActions[cAction] = function(){return;};
		});

		// End
		return 0;

	},

	/*
		Gamepad variables
	*/

	// Gamepad timestamp
	gamepadTimestamp: 0,

	// Gamepad ID
	gamepadId: 0,

	// Gamepad name
	gamepadName: '',

	// Gamepad buttons
	gamepadAxes: {},
	gamepadButtons: {},

	// Gamepad vibration (rumble) data
	gamepadVibrationActuator: {},

	/*
		Gamepad functions
	*/

	// Initialize gamepad
	initGamepad: function(){

		// Connect controller
		window.addEventListener('gamepadconnected', function(gPad){

			// Shortcut
			const gamepadData = gPad.gamepad;

			console.info('Controller ON');
			console.info(gPad);
			console.info(gamepadData);

			// Update controller data
			APP.input.gamepadName = gamepadData.id;
			APP.input.gamepadId = gamepadData.index;
			APP.input.gamepadAxes = gamepadData.axes;
			APP.input.gamepadVibrationActuator = gamepadData.vibrationActuator;

			// Process buttons
			Object.keys(gamepadData.buttons).forEach(function(cButton){
				APP.input.gamepadButtons[cButton] = {cache: [], action: '', pressed: !1, touched: !1, hold: !1};
			});

			// Set buttons actions
			Object.keys(APP.input.commandActions).forEach(function(cInput){

				const getButtonIndex = APP.settings.data['gPadInput_' + cInput];
				if (APP.input.gamepadButtons[getButtonIndex] !== void 0){
					APP.input.gamepadButtons[getButtonIndex].action = cInput;
				}

			});

			// Start update process
			window.requestAnimationFrame(APP.input.processGamepad);

		});

		// Disconnect controller
		window.addEventListener('gamepaddisconnected', function(gPad){

			console.info('Controller OFF');
			console.info(gPad);

			// Reset variables
			APP.input.gamepadButtons = {};

			window.cancelAnimationFrame(APP.input.processGamepad);
	
		});

	},

	// Update gamepad button status
	updateGamepadButton: function(data){

		if (data !== void 0 && Object.keys(this.gamepadButtons).length !== 0){

			// Update button action
			if (data.action !== void 0){
				this.gamepadButtons[data.id].action = data.action;
			}
			
			// Update button hold
			if (data.hold !== void 0){
				this.gamepadButtons[data.id].hold = data.hold;
			}

		}

	},

	// Process gamepad data
	processGamepad: function(){

		// Get current state from gamepad
		var bPressed,
			gPad = navigator.getGamepads()[APP.input.gamepadId];

		// If selected gamepad exists
		if (gPad !== null){

			/*
				Process buttons
			*/
			Object.keys(gPad.buttons).forEach(function(cButton){

				// Get button data
				const bData = APP.input.gamepadButtons[cButton];

				// Update status
				bData.pressed = gPad.buttons[cButton].pressed;
				bData.touched = gPad.buttons[cButton].touched;

				// Update button cache
				if (bData.cache.indexOf(gPad.buttons[cButton].pressed) === -1){
					bData.cache.push(gPad.buttons[cButton].pressed);
				}

				// Set pressed button
				if (bData.pressed === !0){
					bPressed = cButton;
					// console.info(cButton); 
				}

				// If action is defined
				if (bData.action !== ''){

					/*
						If button is pressed and cache is full (true, then false) or hold is true and button is pressed
						Execute action and then clear it's cache
					*/
					if (bData.cache.length === 2 && bData.pressed === !1 || bData.hold === !0 && bData.pressed === !0){

						// Execute action
						APP.input.commandActions[bData.action]();

						// Clear button cache
						bData.cache = [];

					}

				}

			});

		}

		// End
		window.requestAnimationFrame(APP.input.processGamepad);
		return bPressed;

	},

	/*
		Keyboard functions
	*/

	// Initialize keyboard and mouse
	initKbMouse: function(){

		/*
			Mouse
		*/

		// Mouse scroll
		document.addEventListener('mousewheel', function(evt){

			// Prevent default if lock input is active
			if (APP.input.lockCommandAction === !0){
				evt.preventDefault();
			}

			// Variables
			var mWheelDirection = 'MOUSE_WHEEL_DOWN';

			// Check for mouse directions
			if (evt.deltaY === -100){
				mWheelDirection = 'MOUSE_WHEEL_UP';
			}

			// Execute action
			APP.input.commandActions[mWheelDirection]();

			// Debug log
			APP.log.add({data: evt});

		}, { passive: !1 });

		/*
			Keyboard
		*/

		// Window onkeypress
		window.onkeypress = function(evt){
			if (APP.input.lockCommandAction === !1){
				evt.preventDefault();
			}
		}

		// Window onkeyup event
		window.onkeyup = function(kp){

			// Debug: log kp
			APP.log.add({data: kp});

			// Debug: reload app with F5
			if (APP.settings.debug === !0 && kp.code === 'F5'){
				location.reload(!0);
			}

			// F11 - Toggle fullscreen
			if (kp.code === 'F11'){
				APP.design.toggleFullscreen();
			}

			// Variables
			var keyCode = kp.code,
				actionList = Object.keys(APP.input.commandActions);

			// Process action list
			for (var i = 0; i < actionList.length; i++){
				
				// Check if current key have a function binded
				if (APP.settings.data['kbInput_' + actionList[i]] === keyCode){
					APP.input.commandActions[actionList[i]]();
					break;
				}

			}

			// End
			return keyCode;

		}

	}

}