/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		sceneManager.js
	
		This file contains all scene (window, current menu) functions and variables.

	***********************************************************************************
*/

temp_SCENEMANAGER = {

	/*
		Scene Manager variables
	*/

	// Current scene
	currentScene: '',

	/*
		Scene Manager functions
	*/

	/*
		Load scene

			data: {Object}
				releaseInput: Boolean - Release input after execution
				duration: 	  Number - Transition duration (default: 400ms)
				nextScene: 	  String - Name (DOM ID) of next scene
				nextOpacity:  String - Opacity of next scene (Default: "1")
				displayMode:  String - Display mode of next scene (Default: block)
				callback: 	  Function - Function to be execute after next scene loads
	*/
	loadScene: function(data){

		// Check if data is provided and selected scene is different from current
		if (data !== void 0 && data.nextScene !== this.currentScene){

			// Lock input
			APP.input.lockInput();

			// Log next scene
			APP.log.add({data: 'INFO - (sceneManager) Loading scene: ' + data.nextScene});

			// Variables
			var transTime = 400,
				prevScene = this.currentScene;

			// Check transition time
			if (data.duration !== void 0 && parseInt(data.duration) !== NaN){
				transTime = data.duration;
			}

			// Check for release input
			if (data.releaseInput === void 0){
				data.releaseInput = !0;
			}

			// Display mode
			if (data.displayMode === void 0 || data.displayMode === ''){
				data.displayMode = 'block';
			}

			// Next opacity
			if (data.nextOpacity === void 0 || data.nextOpacity === ''){
				data.nextOpacity = '1';
			}

			/*
				Start animation
			*/

			// Reset error button class
			APP.design.removeErrorClass();

			// Set transition time
			TMS.css(prevScene, {'transition-duration': parseFloat(transTime / 1000) + 's'});
			TMS.css(data.nextScene, {'transition-duration': parseFloat(transTime / 1000) + 's'});

			// Fade out current scene and enable next
			TMS.css(prevScene, {'opacity': '0'});
			TMS.css(data.nextScene, {'display': data.displayMode});

			// Hide current scene and display next
			setTimeout(function(){
				TMS.css(prevScene, {'display': 'none'});
				TMS.css(data.nextScene, {'opacity': data.nextOpacity});
			}, parseInt(transTime + 10));

			/*
				Finish transition
			*/
			setTimeout(function(){

				// Enable input
				if (data.releaseInput === !0){
					APP.input.releaseInput();
				}

				// Set current scene
				APP.design.sceneManager.currentScene = data.nextScene;

				// If callback exists, execute it
				if (typeof data.callback === 'function'){
					data.callback();
				}

			}, parseInt((transTime * 2) + 10));

		} else {

			// Log warn
			APP.log.add({mode: 'warn', data: 'WARN - Unable to run sceneManager! If callback was provided, it will be executed.'});

			// Execute callback if
			if (typeof data.callback === 'function'){
				data.callback();
			}

		}

		// End
		return 0;

	}

}