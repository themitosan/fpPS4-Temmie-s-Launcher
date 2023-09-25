/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		animations.js

		This file contains almost all animations related to main GUI
		(Like game boot animations and etc).

		[TODO: Redux some of those animations to lists]

	***********************************************************************************
*/

temp_ANIMATIONS = {

	/*
		Animation list
	*/

	// Show fpPS4 options
	ANIMATION_showEmuRunningOptions: function(){

		// Check if fpPS4 is running
		if (APP.emumanager.emuRunning === !0){

			// Lock input
			APP.input.lockInput();

			// Reset home button
			APP.input.setActionFn('ACTION_12', function(){return;});

			// Show background image
			TMS.css('APP_CANVAS_BG', {'opacity': '0.72'});

			// Add ambient shadow to main canvas again
			TMS.css('APP_CANVAS', {'box-shadow': '0px 0px 120px #' + APP.settings.data.backgroundColor_bottom + '80'});

			// Show emu options
			TMS.css('APP_EMU_OPTIONS', {'opacity': '1'});
			TMS.css('APP_EMU_OPTIONS_FADE', {'bottom': '-8%'});
			TMS.css('APP_EMU_OPTIONS', {'transition-duration': '0.6s', 'opacity': '1'});

			// Focus button
			APP.design.input.focus();

			// Set actions
			APP.input.setActionFn('ACTION_0', function(){
				APP.design.input.selectMainAction();
			});

			// Release input
			APP.input.releaseInput();

		}

	},

	// Hide fpPS4 options
	ANIMATION_hideEmuRunningOptions: function(){

		// Check if fpPS4 is running
		if (APP.emumanager.emuRunning === !0){

			// Lock input
			APP.input.lockInput();

			// Show background image
			TMS.css('APP_CANVAS_BG', {'opacity': '0'});

			// Hide emu options
			TMS.css('APP_EMU_OPTIONS', {'opacity': '0'});
			TMS.css('APP_EMU_OPTIONS_FADE', {'bottom': '-26%'});
			TMS.css('APP_EMU_OPTIONS', {'transition-duration': '0.01s', 'opacity': '0'});

			// Hide ambient shadow to main canvas again
			TMS.css('APP_CANVAS', {'box-shadow': '0px 0px 0px #000'});

			// Blur button
			APP.design.input.blur();

			// Set actions
			APP.input.setActionFn('ACTION_0', function(){return;});

			// Release input
			APP.input.releaseInput();

		}

	},

	// Start fpPS4 (List mode)
	ANIMATION_startEmu_list: function(){

		// Lock input
		APP.input.lockInput();

		// Variables
		var cLangId = APP.settings.data.langId,
			entryName = APP.gameList.selectedGame,
			iconStyle = APP.settings.data.input_iconStyle,
			cData = APP.gameList.list[APP.gameList.selectedGame];

		// Check if PARAM.SFO exists
		if (cData.status === 'ok'){
			entryName = cData.paramSfo['TITLE' + cLangId];
		}

		// Append fpPS4 options menu
		APP.design.appendForm('emu_options', void 0, 'APP_CANVAS_INNER');

		// Update button on fpPS4 options menu
		document.getElementById('IMG_APP_EMU_OPTIONS_ACTION_0').src = 'img/input/' + iconStyle + '/INPUT_ACTION_0.png';
		document.getElementById('LABEL_APP_MENU_OPTIONS_CLOSE_FPPS4').innerHTML = APP.lang.getVariable('fpPS4_running_closeEmu');

		// Update middle text
		document.getElementById('LABEL_APP_MENU_OPTIONS_MIDDLE').innerHTML = entryName + '<br><label class="text-small">' + APP.lang.getVariable('fpPS4_running_middleTextRunning') + '</label>';

		// Fade out list and background color
		TMS.css('APP_MAIN', {'opacity': '0'});
		TMS.css('APP_CANVAS_BG_COLOR', {'opacity': '0'});

		// Fade in background image
		TMS.css('APP_CANVAS_BG', {'opacity': '1'});

		// Load scene and then run fpPS4
		setTimeout(function(){

			// Set input
			APP.design.input.setList({
				index: 0,
				length: 0,
				list: 'APP_EMU_OPTIONS',
				enableOutOfBoundsFn: !1
			});

			// Update labels
			APP.design.input.updateButtonLabels({
				resetInput: !0,
				target: 'MAIN_GAME_LIST',
				displayButtons: ['ACTION_0'],
				buttonLabels: {'ACTION_0': 'close'},

				// Bind input actions and load menu
				callback: function(){

					// Load Emu running options
					APP.design.sceneManager.loadScene({
						duration: 10,
						nextOpacity: '0',
						releaseInput: !1,
						displayMode: 'flex',
						nextScene: 'APP_EMU_OPTIONS',
						callback: function(){

							// Hide ambient shadow from main canvas
							TMS.css('APP_CANVAS', {'box-shadow': '0px 0px 0px #000'});

							// Fade out canvas
							TMS.css('APP_CANVAS_BG', {'opacity': '0'});

							// Run fpPS4
							APP.emumanager.run();

							// Show GUI + Lock input
							setTimeout(function(){

								// If fpPS4 is still running, execute post timeout function
								if (APP.emumanager.emuRunning === !0){
									APP.input.lockInput();
									APP.design.animations.ANIMATION_showEmuRunningOptions();
								}

							}, 1000);

						}
					});
				}

			});

		}, 2000);

	},

	// Close fpPS4
	ANIMATION_closeEmu: function(callback){

		// Lock input
		APP.input.lockInput();

		// Remove fpPS4 Options
		TMS.removeDOM('APP_EMU_OPTIONS');

		// Reset window onBlur and onFocus events
		APP.design.winOnBlurAction = function(){return;}
		APP.design.winOnFocusAction = function(){
			APP.design.input.focus();
		}

		// Focus window
		APP.design.focusMainWindow();

		// Set current scene
		APP.design.sceneManager.currentScene = 'APP_MAIN';

		// Reset background color and image opacity
		TMS.css('APP_CANVAS_BG', {'opacity': '0.72'});
		TMS.css('APP_CANVAS_BG_COLOR', {'opacity': '1'});

		// Add ambient shadow to main canvas again
		TMS.css('APP_CANVAS', {'box-shadow': '0px 0px 120px #' + APP.settings.data.backgroundColor_bottom + '80'});

		// Display game list
		TMS.css('APP_MAIN', {'opacity': '1', 'display': 'block'});

		// Callback
		if (typeof callback === 'function'){
			callback();
		}

	}

}