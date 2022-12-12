/*
	gamelist.js
*/

temp_GAMELIST = {
	
	// Game List
	list: {},

	// Selected game
	selectedGame: '',

	// Select game path
	selectPath: function(){

		APP.fileManager.selectPath(function(newGamePath){
			APP.settings.data.gamePath = newGamePath;
			APP.settings.save();
			APP.gameList.load();
		});

	},

	// Load list
	load: function(){

		// Check if path exists
		if (APP.fs.existsSync(APP.settings.data.gamePath) === !0){

			// Reset game list
			APP.gameList.list = {};
			
			// Get game list
			const gList = APP.fs.readdirSync(APP.settings.data.gamePath);

			if (gList.length > 0){

				// Process game list
				gList.forEach(function(gPath){
		
					var addGame = !0,
						elfName = '',
						ebootName = '',
						pathBase = APP.settings.data.gamePath + '/' + gPath,

						appBg0 = pathBase + '/pic0.png',
						appBg1 = pathBase + '/pic1.png',
						appIcon = pathBase + '/icon.png',

						finalBg = appBg0,
						finalIcon = appIcon,

						ebootFile = pathBase + '/eboot.bin';
		
					if (APP.fs.existsSync(ebootFile) === !0){
						ebootName = 'eboot.bin';
					}

					// If eboot.bin doesn't exists, look for any .elf file
					if (APP.fs.existsSync(ebootFile) !== !0){

						var fList = APP.fs.readdirSync(pathBase),
							execName = fList.filter(function(fName){
								if (fName.toLowerCase().indexOf('.elf') !== -1){
									return fName;
								}
							})[0];

						ebootName = execName;

						// If not found (undefined), skip
						if (execName === void 0){
							addGame = !1;
						}

					}
		
					// Set icon
					if (APP.fs.existsSync(appIcon) === !1){
						finalIcon = APP.settings.data.nwPath + '/app/img/404.png'; 
					}

					// Set BG image
					if (APP.fs.existsSync(appBg0) === !1){
						finalBg = appBg1;
						if (APP.fs.existsSync(appBg1) === !1){
							finalBg = APP.settings.data.nwPath + '/app/img/404_BG.png';
						}
					}
		
					// If executable exists, set data
					if (addGame === !0){
						APP.gameList.list[gPath] = {
							bg: finalBg,
							name: gPath,
							icon: finalIcon,					
							eboot: APP.settings.data.gamePath + '/' + gPath + '/' + ebootName
						}
					}
		
				});

			} else {

				// No games / homebrew found
				APP.log('INFO - No games / homebrew were detected on current path (' + APP.settings.data.gamePath + ')');

			}

			// Render game list
			APP.design.renderGameList();

		}

	},

	// Open game folder
	openFolder: function(){

		// Spawn explorer
		APP.childProcess.exec('start "" "' + APP.settings.data.gamePath + '"');

	}

}