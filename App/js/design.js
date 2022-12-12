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
			tempHtml = tempHtml + '<div class="GAME_ENTRY" onclick="APP.design.selectGame(\'' + cGame + '\');"><img class="GAME_ICON" src="' + 
								   gList[cGame].icon + '"><div class="GAME_DETAILS"><label class="LABEL_gameTtitle">' + gList[cGame].name + 
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

			const cGame = APP.gameList.list[gameName];
			TMS.css('DIV_LIST_INTERNAL', {
				'background-image': 'url("' + cGame.bg + '")'
			});

			APP.gameList.selectedGame = gameName;
			APP.design.update();

		}

	},

	// Update GUI
	update: function(){

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
				listHeight = '172px';
				hackDisplay = 'none';
				optionsHeight = '160px';
				logHeight = 'calc(100% - 210px)';
	
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

	}

}