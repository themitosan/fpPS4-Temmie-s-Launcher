/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		language.js

		This file is responible for all functions related to language and contains 
		the database with all labels and strings for English and all different 
		languages.

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
			var getLangFile,
				cLang = APP.settings.data.appLanguage,
				fileLocation = APP.settings.nwPath + 'App/Lang/' + cLang + '.json';

			// Check if lang file exists and if lang isn't english
			if (cLang !== 'english' && APP.fs.existsSync(fileLocation) === !0){

				// Get selected lang
				getLangFile = APP.fs.readFileSync(fileLocation, 'utf8');
				this.selected = JSON.parse(getLangFile);

			} else {

				// Set english as default lang
				this.selected = APP.lang.english;			
			
			}

			// Update GUI
			APP.design.updateLang();

		} catch (err) {
			throw new Error(err);
		}	

	},

	// Get variable string
	getVariable: function(name, list){

		// Fix settings
		if (Object.keys(this.selected).length === 0){
			this.selected = this.english;
		}

		// Variables
		var lPatch = [],
			res = this.selected.variables[name],
			cIconStyle = APP.settings.data.input_iconStyle;

		// If variable is not found or is a empty string, try get on english
		if (res === void 0 || res === ''){
			res = this.english.variables[name];
		}

		// Check if variable exists on default location 
		if (res !== void 0){

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
			
		} else {

			// Show error
			const msg = 'ERROR - Unable to load string from lang databse! (\"' + name + '\")';
			console.error(msg);
			window.alert(msg);

		}


	},

	// Get message
	getMsgSys: function(name, list, options){

		// Fix settings
		if (Object.keys(this.selected).length === 0){
			this.selected = this.english;
		}

		// Get current msg list
		const cFile = APP.design.msgsys.msgCurrentMsg;

		if (cFile !== ''){

			// Variables
			var lPatch = [],
				tempString = '',
				res = this.selected.msgsys[name],
				cIconStyle = APP.settings.data.input_iconStyle;

			// If variable is not found or an empty string, get from english instead
			if (res === void 0 || res === ''){
				res = this.english.msgsys[name];
			}

			// Check if message exists
			if (res !== void 0){

				// If list is undefined, set patch list as a empty array
				if (list !== void 0){
					lPatch = list;
				}

				// Get message from temp
				tempString = res.message.toString();

				// Apply variables
				lPatch.forEach(function(fix, entry){
					tempString = tempString.replace('%VARIABLE_' + entry + '%', fix);
				});

				// Apply options
				if (options !== void 0){

					// Create temp location for options
					var tempOptions = '',
						appIsLoading = APP.settings.appIsLoading;

					// If app is loading and no class were defined, set custom class
					if (appIsLoading === !0 && options.class === void 0 || appIsLoading === !0 && options.class === ''){
						options.class = 'BTN_GUI_POPUP BTN_GUI_SAFE_MODE';
					}

					// Check if class is present
					if (appIsLoading === !1 && options.class === void 0 || appIsLoading === !1 && options.class === ''){
						options.class = 'BTN_GUI_POPUP';
					}

					// Process options list
					options.list.forEach(function(cOption, cIndex){

						// Check if action was defined
						if (cOption.action === void 0 || cOption.action === ''){
							cOption.action = 'return 0;';
						}

						// Append option
						tempOptions = tempOptions + '<input type="button" id="APP_MSGSYS_OPTION_' + cIndex + '" value="' + cOption.label + '" class="' + options.class + '" onclick="' + cOption.action + '">';

					});

					// Apply options
					tempString = tempString.replace('%OPTIONS%', tempOptions);

				}

				// Apply icons
				Object.keys(APP.input.commandActions).forEach(function(cId){
					tempString = tempString.replace(RegExp('%' + cId + '%', 'gi'), '<img src="img/input/' + cIconStyle + '/INPUT_' + cId + '.png" alt="IMG_MSG_CONTROLLER_BUTTON" class="IMG_MSG_CONTROLLER_BUTTON"/>');
				});

				// Return object
				return {title: res.title, message: tempString};

			} else {

				// Display error message
				const err = 'Unable to load selected msgsys data from lang database!\nmsgName: ' + name;
				APP.log.add({mode: 'error', data: 'ERROR - (lang) ' + err});
				window.alert('ERROR: (lang) ' + err);

			}

		}

	},

	/*
		Lang default database

		<label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4
		<a href=\"\" target=\"_blank\">
	*/

	// English (Default)
	english: {

		/*
			langId - Replace this with "_" + lang number matching value on PARAM.SFO TITLE key
			[Example: "_08" for Russian]
		*/
		"langId": '',
		"lang": "English",
		"author": "TemmieHeartz",
		"revision": "TemmieHeartz",

		/*
			Variables
		*/
		"variables": {

			/*
				GUI
			*/
			"APP_TOP_BAR_releaseToFullscreen": "Release mouse to enter fullscreen",

			/*
				Game list
			*/
			"gameList_entryStatus_ok": "Fine",
			"gameList_entryStatus_hb": "Homebrew",
			"gameList_entryStatus_mf": "Missing files",
			"gameList_entryDumpStatus": "Dump Status",
			"gameList_entryVersion": "Version: %VARIABLE_0%",
			"gameList_entryVersion_title_ok": "(Dump status: Fine)\nAll required files on sce_sys are present",
			"gameList_entryVersion_title_hb": "(Dump status: Homebrew)\nThis entry executable is a executable (.elf) file.",
			"gameList_entryVersion_title_mf": "(Dump status: Missing files)\nSome required files are missing on sce_sys.\n\nMissing files:\n%VARIABLE_0%",
			"gameList_errorCurrentPathEmpty": "WARN - No items were detected on %VARIABLE_0%!",
			"gameList_errorExecutable404": "Unable to locate main executable (eboot.bin) or any .elf file",
			"gameList_errorCantAddEntry": "WARN - Unable to add %VARIABLE_0%!\nPath: %VARIABLE_1%\n\n%VARIABLE_2%",
			"gameList_errorEntryAlreadyExists": "An entry with same title id already exists on game list! (%VARIABLE_0%)",
			"gameList_errorEntryListEmpty": "<div class=\"LABEL_TITLE APP_GAMELIST_EMPTY\">No Apps / Games were detected on current locations!</div>",

			/*
				Game settings
			*/
			"gameSettings_enable": "Enable",
			"gameSettings_hackDesc": "This hack",

			/*
				Launcher settings
			*/

			// Messages
			"infoSettingsUpdated": "INFO - Settings file was updated successfully!",
			"settingsLoadError": "ERROR - Unable to load settings file!\n%VARIABLE_0%",
			"settingsSaveError": "ERROR - Unable to save settings file!\n%VARIABLE_0%",

			/*
				Launcher Settings Labels
			*/

			// Menu names
			"launcherSettings_gui": "Interface",
			"launcherSettings_paths": "Paths",
			"launcherSettings_graphics": "Video Options",
			"launcherSettings_emuOptions": "<label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 Options",
			"launcherSettings_input": "Input",
			"launcherSettings_updater": "Updater",
			"launcherSettings_accessibility": "Accessibility",
			"launcherSettings_misc": "Misc.",

			// GUI
			"launcherSettings_gui_changeLanguage": "Select current language [WIP]",
			"launcherSettings_gui_changeLanguage_desc": "Language: %VARIABLE_0% (Created by %VARIABLE_1%, revisions by %VARIABLE_2%)",
			"launcherSettings_gui_gameListMode": "Game list mode",
			"launcherSettings_gui_gameListMode_desc": "Select how apps / games will be displayed on game list.",
			"launcherSettings_gui_gameListMode_list": "All apps / games will be displayed on a simple vertical list.",
			"launcherSettings_gui_gameListMode_compact": "All apps and games will be displayed on a vertical list - but taking less space on screen.",
			"launcherSettings_gui_gameListMode_orbis": "All apps / games will be shown in a horizontal list - similar to how it is shown on a real console.",
			"launcherSettings_gui_guiDisplayClock": "Display clock on game list [WIP]",
			"launcherSettings_gui_guiDisplayClock_desc": "Set this option active to display clock at top-right corner on game list menu",
			"launcherSettings_gui_changeSchemeColors": "Change scheme colors [WIP]",
			"launcherSettings_gui_changeSchemeColors_desc": "Select one of the pre-saved themes or your own (Settings/custom_theme.json)",
			"launcherSettings_gui_gameListSearchMode": "Game list search mode [WIP]",
			"launcherSettings_gui_gameListSearchMode_desc": "Select how game list search works (Title name or Title ID)",
			"launcherSettings_gui_gameListSearchMode_Title ID": "Search Apps / Games using TITLE_ID from PARAM.SFO (when available)",
			"launcherSettings_gui_gameListSearchMode_Title Name": "Search Apps / Games using APP_NAME from PARAM.SFO (when available)",

			// Graphics
			"launcherSettings_graphics_changeScreenRes": "Change launcher internal resolution",
			"launcherSettings_graphics_changeScreenRes_desc": "Current internal res. is %VARIABLE_0%x%VARIABLE_1%.",
			"launcherSettings_graphics_changeScreenRes_df": "Default resolution",
			"launcherSettings_graphics_changeScreenRes_uw": "Ideal for ultra-wide monitors",
			"launcherSettings_graphics_changeScreenRes_720p": "720p",
			"launcherSettings_graphics_changeScreenRes_900p": "900p",
			"launcherSettings_graphics_changeScreenRes_1080p": "1080p",
			"launcherSettings_graphics_changeScreenRes_1440p": "1440p",
			"launcherSettings_graphics_changeScreenRes_4kRes": "4K Res.",
			"launcherSettings_graphics_startLauncherFullscreen": "Start launcher on fullscreen mode",
			"launcherSettings_graphics_startLauncherFullscreen_desc": "Set this option active to start <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 Temmie\'s launcher on fullscreen mode.",
			"launcherSettings_graphics_toggleFullscreenMode": "Toggle fullscreen mode",
			"launcherSettings_graphics_toggleFullscreenMode_desc": "Select this option to toggle between window mode or fullscreen mode.",
			"launcherSettings_graphics_changeLauncherScaleMode": "Change launcher screen scaling mode",
			"launcherSettings_graphics_changeLauncherScaleMode_desc": "Current scaling mode is \"%VARIABLE_0%\".",
			"launcherSettings_graphics_changeLauncherScaleMode_transform": "Elements render faster, but the image may be blurry if the window size doesn\'t match the internal resolution.",
			"launcherSettings_graphics_changeLauncherScaleMode_zoom": "Elements may take a little time to adjust to the size of the window, but without being blurry.",
			"launcherSettings_graphics_cacheImgaesOnBoot": "Cache all images on boot",
			"launcherSettings_graphics_cacheImgaesOnBoot_desc": "Set this option active to cache all images on boot process. Leave it off to speed up boot process.",

			// Paths
			"launcherSettings_paths_emuPath": "<label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 Path",
			"launcherSettings_paths_emuPath_desc": "%VARIABLE_0%",
			"launcherSettings_paths_addGamePath": "<img src=\"img/svg/plus.svg\" alt=\"ICON_ADD_PATH\" class=\"IMG_GUI_PLUS\"> Add game path",
			"launcherSettings_paths_addGamePath_desc": "",
			"launcherSettings_paths_defaultGamesPath": "Default Games / Apps Path",
			"launcherSettings_paths_defaultGamesPath_desc": "Path: Launcher Root/Games (This can\'t be changed)",
			"launcherSettings_paths_gamePathTemplate": "Path: %VARIABLE_0%",

			// fpPS4 Options (emuOptions)
			"launcherSettings_emuOptions_startEmuFullscreen": "Start <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 in fullscreen mode",
			"launcherSettings_emuOptions_startEmuFullscreen_desc": "When this option is active, <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 will enter on fullscreen mode instead of showing it\'s main window.",

			// Input
			"launcherSettings_input_iconStyle": "Change icon style",
			"launcherSettings_input_iconStyle_desc": "Select icon style <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 Temmie\'s launcher should display",
			"launcherSettings_input_iconStyle_DS": "Sony PlayStation® DualSense",
			"launcherSettings_input_iconStyle_DS4": "Sony PlayStation® DualShock 4",
			"launcherSettings_input_iconStyle_X360": "Xbox 360",
			"launcherSettings_input_enableLauncherGamepadRumble": "Enable gamepad rumble on launcher [WIP]",
			"launcherSettings_input_enableLauncherGamepadRumble_desc": "Set this option on to enable rumble support while using launcher.",

			// Updater
			"launcherSettings_updater_enableEmuUpdates": "Enable <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 updates [WIP]",
			"launcherSettings_updater_enableEmuUpdates_desc": "Set this option active to allow launcher searching for <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 updates on GitHub.",
			"launcherSettings_updater_enableLauncherUpdates": "Enable launcher updates [WIP]",
			"launcherSettings_updater_enableLauncherUpdates_desc": "Set this option active to allow launcher searching for <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 Temmie\'s launcher updates on GitHub",
			"launcherSettings_updater_checkUpdatesLauncher": "Check for launcher updates [WIP]",
			"launcherSettings_updater_checkUpdatesLauncher_desc": "Check if there's any update for <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 Temmie\'s Launcher",
			"launcherSettings_updater_checkUpdatesEmu": "Check for <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 updates [WIP]",
			"launcherSettings_updater_checkUpdatesEmu_desc": "Check if there's any update for <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4.",
			"launcherSettings_updater_forceUpdateEmu": "Force update <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 [WIP]",
			"launcherSettings_updater_forceUpdateEmu_desc": "Force launcher to download latest <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 version from GitHub based on your current settings",
			"launcherSettings_updater_forceUpdateLauncher": "Force update launcher [WIP]",
			"launcherSettings_updater_forceUpdateLauncher_desc": "This will download and update <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 Temmie\'s launcher to latest version available on GitHub.",
			"launcherSettings_updater_selectEmuBranch": "Select <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 GitHub branch",
			"launcherSettings_updater_selectEmuBranch_desc": "Current selected branch is \"%VARIABLE_0%\".",
			"launcherSettings_updater_displayCurrentVersionInfo": "Display current <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 version info [WIP]",
			"launcherSettings_updater_displayCurrentVersionInfo_desc": "This will display all info about <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 current version based on it\'s Commit SHA. (%VARIABLE_0%)",
			"launcherSettings_updater_browseLatestActions": "Browse GitHub actions list [WIP]",
			"launcherSettings_updater_browseLatestActions_desc": "Browse GitHub actions list and select a specific <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 build to download.",
			"launcherSettings_updater_useNightlyLink": "Use nightly.link service [WIP]",
			"launcherSettings_updater_useNightlyLink_desc": "Set this option active if you are experiencing issues while downloading updates from GitHub.",

			// Accessibility
			"launcherSettings_accessibility_guiZoomScale": "Adjust interface size",
			"launcherSettings_accessibility_guiZoomScale_desc": "Render all screen elements larger (Up to 1.5x - only available on 1600x900 res. or higher.)",

			// Misc.
			"launcherSettings_misc_resetLauncherSettings": "Reset launcher settings [WIP]",
			"launcherSettings_misc_resetLauncherSettings_desc": "Caution: This action will reset all launcher settings and then restart.",
			"launcherSettings_misc_resetGameSettings": "Reset game settings [WIP]",
			"launcherSettings_misc_resetGameSettings_desc": "This will reset / erase all settings from all games (This also will restart launcher)",
			"launcherSettings_misc_reloadLauncher": "Reload launcher",
			"launcherSettings_misc_reloadLauncher_desc": "Use this option if you need to reload <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 Temmie\'s Launcher without closing it.",

			/*
				Run fpPS4 Error
			*/
			"runEmuError_emuRunning": "<label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 is already running.",
			"runEmuError_settingsLoad": "Unable to load entry settings!\n\n%VARIABLE_0%",
			"runEmuError_entry404": "Entry executable (%VARIABLE_0%) was not found (404)",
			"runEmuError_emu404": "<label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 main executable (%VARIABLE_0%) was not found! (404)",

			/*
				fpPS4 Running Options Menu
			*/
			"fpPS4_running_closeEmu": "Close <label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4",
			"fpPS4_running_middleTextRunning": "<label class=\"LABEL_FPPS4_COLOR\">fp</label>PS4 is running",

			/*
				Boot process
			*/
			"bootWarnInfo": "This software does not allow users to download / obtain PlayStation® 4 apps or games.",

			/*
				Message System Labels (msgsys)
			*/
			"MSGSYS_LABEL_run": "Run",
			"MSGSYS_LABEL_next": "Next",
			"MSGSYS_LABEL_menu": "Menu",
			"MSGSYS_LABEL_back": "Back",
			"MSGSYS_LABEL_exit": "Exit",
			"MSGSYS_LABEL_retry": "Retry",
			"MSGSYS_LABEL_close": "Close",
			"MSGSYS_LABEL_enter": "Enter",
			"MSGSYS_LABEL_cancel": "Cancel",
			"MSGSYS_LABEL_select": "Select",
			"MSGSYS_LABEL_update": "Update",
			"MSGSYS_LABEL_confirm": "Confirm",
			"MSGSYS_LABEL_options": "Options",
			"MSGSYS_LABEL_continue": "Continue",
			"MSGSYS_LABEL_hackList": "Hack List",
			"MSGSYS_LABEL_toggleHack": "Toggle Hack",
			"MSGSYS_LABEL_removePath": "Remove Path",
			"MSGSYS_LABEL_viewDetails": "View details",

			/*
				About screen
			*/
			"aboutScreen_createdBy": "Created by",
			"aboutScreen_version": "Version",
			"aboutScreen_plugins": "Plugins",
			"aboutScreen_pluginCreatedBy": "Created by",
			"aboutScreen_legacyTranslations_revisors": "Revisions by ",
			"aboutScreen_legacyTranslations": "Original Translations (First release to 1.2.1)",
			"aboutScreen_legacyTranslations_en-us": "English (Default)",
			"aboutScreen_legacyTranslations_pt-br": "Brazilian Portuguese",
			"aboutScreen_legacyTranslations_fr-fr": "French",
			"aboutScreen_legacyTranslations_it-it": "Italian",
			"aboutScreen_legacyTranslations_ja-ja": "Japenese",
			"aboutScreen_legacyTranslations_nl-nl": "Dutch",
			"aboutScreen_legacyTranslations_ru-ru": "Russian",
			"aboutScreen_legacyTranslations_uk-ua": "Ukrainian",
			"aboutScreen_legacyTranslations_zh-s": "Chinese (Simplified)",
			"aboutScreen_articlesUsedAsReference": "Articles used as reference",
			"aboutScreen_externalIconsUsed": "External icons used on this project",
			"aboutScreen_specialThanksTo": "Special Thanks To",
			"aboutScreen_specialThanksTo_disc": "and everyone from fpPS4 discord server!",
			"aboutScreen_specialThanksTo_closing": "Without all of you, I would not be able to keep this project on!",
			"aboutScreen_important": "IMPORTANT",

			/*
				Updater
			*/

			// Fetch data error
			"updater_fetch_invalidUrl": "Invalid / missin url",
			"updater_fetch_userOffline": "You must be online before running this process.",
			"updater_fetch_respNotOk": "Fetch result is not ok!<br>Response status: %VARIABLE_0%"

		},

		/*
			innerHTML
		*/
		"innerHTML": {},

		/*
			Message system (msgsys)
		*/
		"msgsys": {

			// Building new game list
			"general_loadingGameList": {
				"title": "Please wait",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">Loading App / Game list - Please wait...</div>"
			},

			// About screen
			"general_showAbout": {
				"title": "About fpPS4 Temmie\'s Launcher",
				"message": "<div class=\"APP_POPUP_MESSAGE position-absolute list-fade text-align-left\"><div class=\"text-align-center\">%VARIABLE_0%</div></div>"
			},

			// Settings: Settings file corrupted
			"msgSettingsFileCorrupted": {
				"title": "Load Error",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">fpPS4 Temmie\'s Launcher was unable to load settings file since it seems to be corrupted!<br>Press %ACTION_0% to generate a new file or %ACTION_1% to exit.</div>"
			},

			// Settings: General error
			"msgSettingsLoadError": {
				"title": "Load Error",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">fpPS4 Temmie\'s Launcher was unable to load settings!<br><br>%VARIABLE_0%<br><br>Check internal log (F12) to know more.</div>"
			},

			// Settings: Request fpPS4 update
			"msgSettingsRequestEmuUpdate": {
				"title": "fpPS4 Updater",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">[WIP]</div>"
			},

			// Settings: Unable to load fpPS4 hack list (default)
			"msgSettingsErrorHackList": {
				"title": "Load Error",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">fpPS4 Temmie\'s Launcher failed to load hack list because fpPS4 process exited with code %VARIABLE_0%.<br><br>Error code: %VARIABLE_1%<br><br>%VARIABLE_2%<br><br>" +
						   "It may be possible solving this issue by running fpPS4 updater process.<br>Press %ACTION_0% to run fpPS4 updater or press %ACTION_1% to retry.</div>"
			},

			// Settings: Unable to load fpPS4 hack list (Missing DLL)
			"msgSettingsErrorHackListDLL": {
				"title": "Load Error",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">fpPS4 Temmie\'s Launcher failed to load hack list because fpPS4 process exited with error due missing DLL files.<br><br>There\'s a possibility of being missing DirectX Modules " +
						   "(Like xinput1_3.dll).<br>Run DirectX Web Setup and try again.<br><br>Press %ACTION_1% to try again.</div>"
			},

			// Run fpPS4 error screen
			"runEmuError_default": {
				"title": "Error",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">An error occurred while trying to run fpPS4.<br>Reason: %VARIABLE_0%</div>"			
			},

			// Test screen res
			"launcherSettings_testScreenRes": {
				"title": "Screen Test",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">fpPS4 Temmie\'s Launcher is now being rendered using %VARIABLE_0% resolution.<br>You can save this changes by pressing %ACTION_0% or cancel by pressing %ACTION_1%.<br><br>(The current screen resolution will be reverted in 10 seconds)</div>"
			},

			// Updater - loading updates
			"updater_loadingPleaseWait": {
				"title": "",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\">Downloading data - Please wait...</div>"
			},

			// Updater - (fpPS4) Update available
			"updater_emuUpdateAvailable": {
				"title": "fpPS4 Updater",
				"message": "<div class=\"APP_POPUP_MESSAGE_CONFIRM list-fade\">A new update is available.<br><br>%VARIABLE_0%<br>Commit SHA: %VARIABLE_1%.</div><div class=\"APP_POPUP_MESSAGE_CONFIRM_ACTIONS\">%OPTIONS%</div>"
			},

			// Updater - (fpPS4) Update details
			"updater_emuUpdateDetails": {
				"title": "Update info",
				"message": "<div class=\"APP_POPUP_MESSAGE list-fade\"></div>"
			},

			// Updater - (fpPS4) ERROR: Unable to load selected workflow
			"updater_emuErrorWorflow404": {
				"title": "Error",
				"message": "<div class=\"APP_POPUP_MESSAGE_CONFIRM list-fade\">It seems that selected workflow list does not exists on fpPS4 GitHub. You can selected where it should load from this list below:</div><div class=\"APP_POPUP_MESSAGE_CONFIRM_ACTIONS\">%LIST%</div>"
			},

			"updater_TEST": {
				"title": "Quick info",
				"Message": "<div class=\"APP_POPUP_MESSAGE_CONFIRM list-fade\">Yep, I know - it's sad. But this is not the end. I will keep providing updates on main project when needed and if everything goes as my plans says, I will be back bringing good news about 2.0.</div>"
			}

		}

	}

}