/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	language.js

	This file is a database with all labels and strings for different 
	languages 
	******************************************************************************
*/

temp_LANGUAGE = {

	// Get variable string
	getVariable: function(name, list){

		// Fix settings
		if (Object.keys(this.selected).length === 0){
			this.selected = this.english;
		}

		var lPatch = [],
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
			res = res.replace(`%VARIABLE_${entry}%`, fix);
		});

		return res;

	},

	/*
		Database
	*/

	// English (Default)
	english: {

		"lang": "English (Default)",

		"variables": {

			"labelEnableHack": "Enable",
			"emuStatusRunning": "Running",
			"logWindowTitle": "Running fpPS4",
			"killEmuStatus": "Main process closed - close fpPS4 log window to go back",
			"logCleared": "INFO - Previous log was cleared!",
			"about": "fpPS4 Temmie\'s Launcher - Version: %VARIABLE_0%\n\nCreated by TheMitoSan [Previously known as TemmieHeartz]\n(https://twitter.com/themitosan)\n\nfpPS4 is created by red-prig\n(https://github.com/red-prig/fpPS4)\n\nPlugin memoryjs is created by Rob--\n(https://github.com/rob--/memoryjs)\n\nPlugin node-stream-zip is created by antelle\n(https://github.com/antelle/node-stream-zip)\n\nSVG icons were obtained from https://www.svgrepo.com/",
			"mainLog": 'fpPS4 Temmie\'s Launcher - Version: %VARIABLE_0%\nRunning on nw.js version %VARIABLE_1% [%VARIABLE_2%]',
			"settingsErrorCreatePath": "ERROR - Unable to create path!\n(%VARIABLE_0%)\n%VARIABLE_1%",
			"settingsErrorfpPS4NotFound": "ERROR - Unable to locate main fpPS4 executable!\nMake sure to select it in Settings or insert it in \"Emu\" folder and click OK.",
			"settingsConfirmRemoveAllGameSettings": "WARNING - This option will remove all saved settings from your game list.\nDo you want to continue?",
			"settingsRemovedGameSettings": "INFO - ( %VARIABLE_0% ) Settings file was removed successfully!",
			"settingsConfirmRemoveGameSettings": "WARNING - This action will delete all saved settings for %VARIABLE_0%\n\nDo you want to continue?",
			"settingsRemoveGameSettingsError": 'ERROR - ( %VARIABLE_0% ) Unable to delete settings file!\nReason: %VARIABLE_1%',
			"settingsRemoveGameSettings404": 'WARNING - ( %VARIABLE_0% ) Unable to find settings file for this app / game!',
			"infoProcessComplete": "INFO - Process complete!\nCheck the log for more details",
			"infoSettingsUpdated": "INFO - Settings file was updated successfully!",
			"settingsLoadError": "ERROR - Unable to load settings file!\n %VARIABLE_0%",
			"settingsSaveError": "ERROR - Unable to save settings file!\n %VARIABLE_0%",
			"runEmuArgs": "\nINFO - Running fpPS4 with args: %VARIABLE_0%\nEmu location: %VARIABLE_1%",
			"closeEmuStatus": "INFO - %VARIABLE_0% was closed, returning code %VARIABLE_1%",
			"removedLibModules": "INFO - All previous imported modules using this launcher were removed since it can be harmful to your game dumps.",
			"removeLibModule": "INFO - ( %VARIABLE_0% ) Removing module: %VARIABLE_1%",
			"removeModuleError": "ERROR - Unable to remove modules!\nReason: %VARIABLE_0%",
			"updateGameSettings": "INFO - ( %VARIABLE_0% ) Settings file was updated successfully!",
			"updateGameSettingsError": "ERROR - Unable to update settings file for %VARIABLE_0% at %VARIABLE_1%!\nReason: %VARIABLE_2%",
			"skipUpdateGameSettings": "INFO - ( %VARIABLE_0% ) Skip updating settings file since it has no changes!",
			"errorSaveFile": "ERROR - Unable to save file!\nReason: %VARIABLE_0%",
			"saveSucessfullPath": "INFO - Save successful!\nPath: %VARIABLE_0%",
			"createdSettingsFile": "INFO - Settings file was created successfully for %VARIABLE_0%",
			"errorCreateSettingsFile": "ERROR - Unable to create settings file for %VARIABLE_0% at %VARIABLE_1%!\nReason: %VARIABLE_2%",
			"patchLoadedSucessfully": "INFO - Patch loaded successfully!\nName: %VARIABLE_0%\nType: %VARIABLE_1%",
			"patchLoadErrorMismatch": "ERROR - This isn\'t a patch or it does not match for this app / game!\nPatch ID: %VARIABLE_0%\nSelected app / game: %VARIABLE_1%",
			"patchLoadErrorParamSfo404": "ERROR - Unable to find PARAM.SFO for this patch!",
			"gameListLoadWarnPlayGo": "WARNING - Unable to locate playgo-chunk.dat for %VARIABLE_0%!\nIf this isn\'t a homebrew, check if this app / game was dumped properly.",
			"gameListLoadWarnParamSfo": "WARNING - Unable to locate PARAM.SFO for %VARIABLE_0%!\nIf this isn\'t a homebrew, check if this app / game was dumped properly.",
			"gameListDoubleIdError": "WARNING - Unable to add %VARIABLE_0% to game list because another app / game with the same title ID exists! ( %VARIABLE_1% )",
			"gameListNoGameFound": "INFO - No apps / games were detected on current path ( %VARIABLE_0% )",
			"gameListSearch404": "Unable to find",
			"checkDumpPlayGoOnApp": "INFO - ( %VARIABLE_0% ) playgo-chunk.dat was found inside sce_sys/app - a new copy was created in sce_sys.",
			"gameListLoadSuccessful": "INFO - Game list was loaded successfully! ( %VARIABLE_0% entries found )",
			"gameListVersion": "Version",
			"selectGameLoadPatchErrorParamSfo": "ERROR - Unable to read PARAM.SFO from this patch!\n%VARIABLE_0%",
			"path": "Path",
			"gamelistGamePath404": "ERROR - Unable to find selected app / game path!\n%VARIABLE_0%",
			"updateEmuFetchActionsError": "ERROR - Unable to fetch GitHub actions data!",
			"updateEmuIsLatestVersion": "INFO - You are using the latest fpPS4 version available!\nCommit ID (SHA): %VARIABLE_0%",
			"updateEmuShaAvailable": "INFO - A new update is available!\n\nLocal version: %VARIABLE_0%\nNew version: %VARIABLE_1%\n\nDo you want to update?",
			"updateEmuShaUnavailable": "INFO - This Launcher detected that you didn\'t updated fpPS4 yet (or fpPS4 executable was not found!)\n\nYou can fix this by running fpPS4 updater process.\nDo you want to proceed?",
			"updateEmuDownloadFailed": "ERROR - Unable to download fpPS4 update!\nResponse status: %VARIABLE_0% - OK: %VARIABLE_1%",
			"updateEmuProcessComplete": "INFO - Update complete! - New fpPS4 version (Commit ID / SHA): %VARIABLE_0%",
			"updateEmu-1-4": "Downloading fpPS4 update (<label class=\"LABEL_monospace\">%VARIABLE_0%</label>)",
			"updateEmu-2-4": "Extracting update",
			"updateEmu-3-4": "Removing leftover files",
			"updateEmu-4-4": "Update complete!",
			"settingsLogEmuSha": "INFO - fpPS4 version: %VARIABLE_0%",
			"dumpStatus_OK": "Fine",
			"dumpStatus_WARN": "Missing files",
			"dumpStatus_HB": "Homebrew",
			"updateEmuWorkflow404": "ERROR - (Updater) Unable to load workflow list from fpPS4 GitHub!",
			"updater_noWorkflowListAvailable": "No workflow list available",
            "Sdl2NotFound": "SDL2.dll is not found in the Emu folder, please install it to use SDL2.",
            "errorListUnableLocateGamePath": "ERROR - Unable to locate \"%VARIABLE_0%\" settings path! In order to prevent issues, game list will be reloaded.\nPath: %VARIABLE_1%",
            "updateEmuSettingsWorkflow404": "ERROR - (Updater) Unable to find (%VARIABLE_0%) on fpPS4 worflow list! %VARIABLE_1% will be used as fallback.",
			"nonWindowsOsWarn": "WARN - You are running fpPS4 Temmie's Launcher on a non-windows operating system!\n\nIn order to run fpPS4, you will need Wine installed on your OS.\n\nBe aware that running main compatibility layer through tools like Wine can result in more glitches, degraded performance / experience.",
			"cGameCompatStatus_BOOTS": "Boots",
			"cGameCompatStatus_MENUS": "Menus",
			"cGameCompatStatus_INGAME": "In-Game",
			"cGameCompatStatus_UNKNOWN": "Unknown",
			"cGameCompatStatus_NOTHING": "Nothing",
			"cGameCompatStatus_PLAYABLE": "Playable",
			"warnUnableFindGameCompatDb": "WARN - Unable to find game compatibility status for %VARIABLE_0% (%VARIABLE_1%) on fpPS4 game database!",
			"warnUserOffline": "WARN - You are offline! Some features (like game compatibility status and fpPS4 updater) will not be available until you connect to the internet again."
		},

		"title": {
			"DIV_selectedGameStatus_dump": "Green: All files are present\nYellow: Some files are missing - check log for more details\nCyan: Executable is a .elf file",
			"DIV_selectedGameStatus_compat": "Playable: You can play this title from start to end.\nIn-game: You can play parts / segments of this title, but can't finish.\nMenus: This title boots into main menu, but can't start main game.\nBoots: This title start loading main game contents, but fails at some point.\nNothing: This title doesn't display nothing on window.\nUnknown: There is no data about this title on fpPS4 database."
		}

	},

	// Selected lang
	selected: {}

}