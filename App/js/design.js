/*
	design.js
*/

temp_DESIGN = {

	/*
		Hack List
	*/
	hackList: [
		'DEPTH_DISABLE_HACK',
		'COMPUTE_DISABLE_HACK',
		'MEMORY_BOUND_HACK',
		'IMAGE_TEST_HACK',
		'IMAGE_LOAD_HACK',
		'DISABLE_SRGB_HACK'
	],

	// Process checkbox status
	processCheckbox: function(domName){

		var res = !1,
		    domId = document.getElementById(domName).checked;

		if (domId === !1){
			res = !0;
		}

		document.getElementById(domName).checked = res;

	},
	
	// Render hack list
	renderHacklist: function(){

		var htmlTemp = '';

		this.hackList.forEach(function(hackName){
			htmlTemp = htmlTemp + '<input type="checkbox" id="CHECK_' + hackName + '"><label class="LABEL_checkbox" onclick="APP.design.processCheckbox(\'CHECK_' + hackName +
					   '\');">Enable ' + hackName + '</label><br>';
		});

		document.getElementById('DIV_HACK_LIST').innerHTML = htmlTemp;

	},

	// Render game list
	renderGameList: function(){

		var gList = APP.gameList.list,
			tempHtml = '';

		Object.keys(gList).forEach(function(cGame){
			tempHtml = tempHtml + '<div class="GAME_ENTRY" onclick="APP.design.selectGame(\'' + cGame + '\');"><img class="IMG_GAME_ICON" src="' + 
								   gList[cGame].icon + '"><div class="GAME_DETAILS"><label class="LABEL_gameTitle">' + gList[cGame].name + 
								   '</label><br>' + 'Path: ' + gList[cGame].eboot + '</div></div>';
		});

		// Insert HTML
		document.getElementById('DIV_LIST_INTERNAL').innerHTML = tempHtml;

		// Clear BG image
		TMS.css('DIV_LIST_INTERNAL', {'background-image': 'none'});

	},

	// Select game
	selectGame: function(gameName){

		if (APP.gameList.list[gameName] !== void 0){

			APP.gameList.selectedGame = gameName;
			APP.design.update();

		}

	},

	// Update GUI
	update: function(){

		// Update background image
		if (APP.gameList.list[APP.gameList.selectedGame] !== ''){
			TMS.css('DIV_LIST_INTERNAL', {
				'background-image': 'url("' + APP.gameList.list[APP.gameList.selectedGame].bg + '")'
			});
		}

		// Check if emu is present before allowing to run
		if (APP.fs.existsSync(APP.settings.data.emuPath) === !0 && APP.gameList.selectedGame !== ''){

			var btnRun = '',
				logHeight = '248px',
				btnKill = 'disabled',
				hackDisplay = 'inline',
				listHeight = 'calc(100% - 286px)',
				optionsHeight = 'calc(100% - 298px)';
	
			// If emu is running
			if (APP.emuManager.emuRunning === !0){
	
				btnKill = '';
				btnRun = 'disabled';
				listHeight = '362px';
				hackDisplay = 'none';
				optionsHeight = '350px';
				logHeight = 'calc(100% - 400px)';
	
			}
	
			// Update GUI
			TMS.css('DIV_LOG', {'height': logHeight});
			TMS.css('DIV_LIST', {'height': listHeight});
			TMS.css('DIV_OPTIONS', {'height': optionsHeight});
			TMS.css('DIV_HACK_LIST', {'display': hackDisplay});
	
			// Update Buttons
			document.getElementById('BTN_RUN').disabled = btnRun;
			document.getElementById('BTN_KILL').disabled = btnKill;

		}

		// Scroll log
		var tx = document.getElementById('APP_LOG');
		tx.scrollTop = tx.scrollHeight;

	},

	// Change game list to display mode
	toggleDisplayMode: function(gameData){

		if (gameData !== void 0){
			
			var appIcon = '',
				gameDetails = {'display': 'flex'},
				listInternal = {'filter': 'blur(6px)', '-webkit-mask-image': 'linear-gradient(0deg, #0006, #0006)'};
	
			// If emu isn't running
			if (APP.emuManager.emuRunning === !1){
	
				gameDetails = {'display': 'none'};
				listInternal = {'filter': 'none', '-webkit-mask-image': 'none'};
				APP.design.renderGameList();
	
			} else {
	
				document.getElementById('DIV_LIST_INTERNAL').innerHTML = '';
	
			}
	
			// Fix undefined path
			if (gameData.appIcon === void 0){
				gameData.appIcon = APP.settings.data.nwPath + '/app/img/404.png';
			}

			// Set game metadata
			document.getElementById('IMG_APP_ICON').src = gameData.appIcon;
			document.getElementById('LABEL_GAME_DETAILS_PATH').innerHTML = gameData.appPath;
			document.getElementById('LABEL_GAME_DETAILS_STATUS').innerHTML = gameData.appStatus;
			document.getElementById('LABEL_GAME_DETAILS_APP_NAME').innerHTML = gameData.appName;
	
			// Set CSS
			TMS.css('DIV_GAME_DETAILS', gameDetails);
			TMS.css('DIV_LIST_INTERNAL', listInternal);

		}

	}

}