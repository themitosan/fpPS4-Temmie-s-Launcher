/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		sceneManager.js
	
		This file contains all scene (window, current menu) functions and variables.

	***********************************************************************************
*/

temp_SCENEMANAGER = {

	/*
		Scene Manager Variables
	*/

	// Current scene
	currentScene: '',

	/*
		Scene Manager Functions
	*/

	/*

		Load scene

			data: {Object}
				transTime: Number (int) - Transition duration
				nextScene: String - Name (DOM ID) of next scene
				callback: function - function to be execute after next scene loads

	*/
	loadScene: function(data){

		if (data !== void 0 && data.nextScene !== this.currentScene){

			// Variables
			var transTime = 400,
				prevScene = this.currentScene;

			// Disable input
			APP.input.lockCommandAction = !0;

			// Check transition time
			if (data.duration !== void 0 && parseInt(data.duration) !== NaN){
				transTime = data.duration;
			}

			/*
				Start animation
			*/

			// Set transition time
			TMS.css(prevScene, {'transition-duration': parseFloat(transTime / 1000) + 's'});
			TMS.css(data.nextScene, {'transition-duration': parseFloat(transTime / 1000) + 's'});

			// Fade out current scene and enable next
			TMS.css(data.nextScene, {'display': 'block'});
			TMS.css(prevScene, {'opacity': '0'});

			// Hide current scene and display next
			setTimeout(function(){

				TMS.css(prevScene, {'display': 'none'});
				TMS.css(data.nextScene, {'opacity': '1'});

			}, parseInt(transTime + 10));

			/*
				Finish transition
			*/
			setTimeout(function(){

				// Enable input
				APP.input.lockCommandAction = !1;
				APP.design.sceneManager.currentScene = data.nextScene;

				// If callback exists, execute it
				if (data.callback !== void 0){
					data.callback();
				}

			}, parseInt((transTime * 2) + 10));


		}

	}

}