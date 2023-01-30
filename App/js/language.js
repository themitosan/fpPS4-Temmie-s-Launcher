/*
	***********************************************************************************
	
		fpPS4 Temmie's Launcher
		language.js

		This file is a database with all labels and strings for different languages

	***********************************************************************************
*/

temp_LANGUAGE = {

	/*
		Lang variables
	*/

	// Selected lang
	selected: {},

	/*
		Lang functions
	*/

	// Load selected language
	load: function(){

		try {

			// Get lang data
			var cLang = APP.settings.data.appLanguage,
				fileLocation = APP.settings.data.nwPath + 'App/Lang/' + cLang + '.json';

			// Check if lang file exists and if lang isn't english
			if (cLang !== 'english' && APP.fs.existsSync(fileLocation) === !0){

				// Get selected lang
				var getLangFile = APP.fs.readFileSync(fileLocation, 'utf8');
				this.selected = JSON.parse(getLangFile);

			} else {

				// Set english as default lang
				this.selected = APP.lang.english;			
			
			}

			// Update GUI
			APP.design.updateLang();

		} catch (err) {

			console.error(err);

		}	

	},

	// Get variable string
	getVariable: function(name, list){

		// Fix settings
		if (Object.keys(this.selected).length === 0){
			this.selected = this.english;
		}

		var lPatch = [],
			cIconStyle = APP.design.iconStyle,
			res = this.selected.variables[name];

		// If variable is not found or an empty string, get English instead
		if (res === void 0 || res === ''){
			res = this.english.variables[name];
		}

		// If list is undefined, set patch list as a empty array
		if (list !== void 0){
			lPatch = list;
		}

		// Apply variables
		lPatch.forEach(function(fix, entry){
			res = res.replace('%VARIABLE_' + entry + '%', fix);
		});

		// Apply icons
		Object.keys(APP.input.commandActions).forEach(function(cId){
			res = res.replace(RegExp('%' + cId + '%', 'gi'), '<embed src="img/svg/INPUT_' + cIconStyle + '_' + cId + '.svg" class="IMG_MSG_CONTROLLER_BUTTON"/>');
		});

		// Return string
		return res;

	},

	// Get message
	getMsgSys: function(name, list){

		// Fix settings
		if (Object.keys(this.selected).length === 0){
			this.selected = this.english;
		}

		// Get current msg list
		const cFile = APP.design.msgSys.msgCurrentList;

		if (cFile !== ''){

			var lPatch = [],
				tempString = '',
				cIconStyle = APP.design.iconStyle,
				res = this.selected.msgSys[cFile][name];
	
			// If variable is not found or an empty string, get from English instead
			if (res === void 0 || res === ''){
				res = this.english.msgSys[cFile][name];
			}
	
			// If list is undefined, set patch list as a empty array
			if (list !== void 0){
				lPatch = list;
			}
	
			// Get message from temp
			tempString = res.message;
	
			// Apply variables
			lPatch.forEach(function(fix, entry){
				tempString = tempString.replace('%VARIABLE_' + entry + '%', fix);
			});

			// Apply icons
			Object.keys(APP.input.commandActions).forEach(function(cId){
				tempString = tempString.replace(RegExp('%' + cId + '%', 'gi'), '<embed src="img/svg/INPUT_' + cIconStyle + '_' + cId + '.svg" class="IMG_MSG_CONTROLLER_BUTTON"/>');
			});

			// Update message string
			res.message = tempString;
	
			// Return object
			return res;

		}

	},

	/*
		Lang default database
	*/

	// English (Default)
	english: {

		"titleId": '', // Replace this to matching value on PARAM.SFO TITLE key
		"lang": "English (Default)",
		"author": "TemmieHeartz",
		"revision": "TemmieHeartz",

		
		/*
			Variables
		*/
		"variables": {

			/*
				GUI
			*/
			"APP_TOP_BAR_releaseToMax": "Release mouse to maximize",

			/*
				Game list
			*/
			"gameList_entryHomebrew": "Homebrew",
			"gameList_entryVersion": "Version: %VARIABLE_0%",
			"gameList_errorCurrentPathEmpty": "WARN - No items were detected on %VARIABLE_0%!",
			"gameList_errorExecutable404": "Unable to locate main executable (eboot.bin) or any .elf file",
			"gameList_errorCantAddEntry": "WARN - Unable to add %VARIABLE_0%!\nPath: %VARIABLE_1%\n\n%VARIABLE_2%",
			"gameList_errorEntryAlreadyExists": "An entry with same title id already exists on game list! (%VARIABLE_0%)",

			/*
				Settings
			*/
			"infoSettingsUpdated": "INFO - Settings file was updated successfully!",
			"settingsLoadError": "ERROR - Unable to load settings file!\n%VARIABLE_0%",
			"settingsSaveError": "ERROR - Unable to save settings file!\n%VARIABLE_0%",

			/*
				Boot process
			*/
			"bootWarnInfo": "This software does not allow users to download / obtain PlayStation® 4 apps or games.",

			/*
				Message System Labels (msgsys)
			*/
			"MSGSYS_LABEL_togglePatch": "Toggle Patch",
			"MSGSYS_LABEL_toggleHack": "Toggle Hacks",
			"MSGSYS_LABEL_toggleDLC": "Toggle DLC",
			"MSGSYS_LABEL_options": "Options",
			"MSGSYS_LABEL_confirm": "Confirm",
			"MSGSYS_LABEL_close": "Close",
			"MSGSYS_LABEL_enter": "Enter",
			"MSGSYS_LABEL_next": "Next",
			"MSGSYS_LABEL_back": "Back",
			"MSGSYS_LABEL_exit": "Exit",
			"MSGSYS_LABEL_run": "Run"

		},

		/*
			innerHTML
		*/
		"innerHTML": {

		},

		/*
			HTML DOM Titles
		*/
		"title": {

		},

		/*
			Message System (msgsys)
		*/
		"msgSys": {
			
			"launcherBoot": {
				
				"msgUpgradeSettingsVersion": {
					"title": "Important",
					"message": "<div class=\"APP_POPUP_MESSAGE\">Your settings file has been upgraded as an old version has been detected.</div>"
				},

				"msgSettingsFileCorrupted": {
					"title": "Load Error",
					"message": "<div class=\"APP_POPUP_MESSAGE\">fpPS4 Temmie's Launcher was unable to load settings file since it seems to be corrupted!<br>Press %ACTION_0% to generate a new file or %ACTION_1% to exit.</div>"
				},

				"msgSettingsLoadError": {
					"title": "Load Error",
					"message": "<div class=\"APP_POPUP_MESSAGE\">fpPS4 Temmie's Launcher was unable to load settings!<br><br>%VARIABLE_0%<br><br>Check internal log (F12) to know more.</div>"
				}

			}
		
		}

	}

}