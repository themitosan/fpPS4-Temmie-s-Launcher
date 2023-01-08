/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	language.js

	This file contains a database with all labels and strings for different 
	languages 
	******************************************************************************
*/

temp_LANGUAGE = {

	// Selected lang
	selected: {},

	// Get variable string
	getVariable: function(name, list){

		var lPatch = [],
			res = this.selected.variables[name];

		// If variable not found, get english instead
		if (res === void 0){
			res = this.english.variables[name];
		}

		// If list is undefined, set patch list as empty array
		if (list !== void 0){
			lPatch = list;
		}

		lPatch.forEach(function(fix, entry){
			res = res.replace('%VARIABLE_' + entry + '%', fix);
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
			"logCleared": "INFO - Previous log was cleared!\n ",
			"about": "fpPS4 Temmie\'s Launcher - Version: %VARIABLE_0%\nCreated by TemmieHeartz\n(https://twitter.com/themitosan)\n\nfpPS4 main emulator is created by red-prig\n(https://github.com/red-prig/fpPS4)\n\nPlugin memoryjs is created by Rob--\n(https://github.com/rob--/memoryjs)",
			"mainLog": 'fpPS4 Temmie\'s Launcher - Version: %VARIABLE_0%\nRunning on nw.js (node-webkit) version %VARIABLE_1% [%VARIABLE_2%]',
			"settingsErrorCreatePath": "ERROR - Unable to create path!\n(%VARIABLE_0%)\n%VARIABLE_1%",
			"settingsErrorfpPS4NotFound": "ERROR - Unable to locate main fpPS4 executable!\nMake sure to select it on settings or insert it on \"Emu\" folder and click on ok.",
			"settingsConfirmRemoveAllGameSettings": "WARN - This option will remove ALL saved settings from your game list.\nDo you want to continue?",
			"settingsRemovedGameSettings": "INFO - ( %VARIABLE_0% ) Settings file was removed successfully!",
			"settingsConfirmRemoveGameSettings": "WARN - This action will delete all saved settings for %VARIABLE_0%\n\nDo you want to continue?",
			"settingsRemoveGameSettingsError": 'ERROR - ( %VARIABLE_0% ) Unable to delete settings file!\nReason: %VARIABLE_1%',
			"settingsRemoveGameSettings404": 'WARN - ( %VARIABLE_0% ) Unable to find settings for this App / Game!',
			"infoProcessComplete": "INFO - Process Complete!\nCheck log for more details",
			"infoSettingsUpdated": "INFO - Settings file was updated successfully!",
			"settingsLoadError": "ERROR - Unable to load settings!\n %VARIABLE_0%",
			"settingsSaveError": "ERROR - Unable to save settings!\n %VARIABLE_0%",
			"runEmuArgs": "\nINFO - Running fpPS4 with args: %VARIABLE_0%\nEmu location: %VARIABLE_1%",
			"closeEmuStatus": "INFO - %VARIABLE_0% was closed returning code %VARIABLE_1%",
			"removedLibModules": "INFO - All previous imported modules using this launcher was removed since it could be harmful to your game dumps.",
			"removeLibModule": "INFO - ( %VARIABLE_0% ) Removing module: %VARIABLE_1%",
			"removeModuleError": "ERROR - Unable to remove modules!\nReason: %VARIABLE_0%",
			"updateGameSettings": "INFO - ( %VARIABLE_0% ) Settings file was updated successfully!",
			"updateGameSettingsError": "ERROR - Unable to update settings file for %VARIABLE_0% at %VARIABLE_1%!\nReason: %VARIABLE_2%",
			"skipUpdateGameSettings": "INFO - ( %VARIABLE_0% ) Skip updating settings file since it has no changes!",
			"errorSaveFile": "ERROR - Unable to save file!\nReason: %VARIABLE_0%",
			"saveSucessfullPath": "INFO - Save successfull!\nPath: %VARIABLE_0%",
			"createdSettingsFile": "INFO - Settings file was created successfully for %VARIABLE_0%",
			"errorCreateSettingsFile": "ERROR - Unable to create settings file for %VARIABLE_0% at %VARIABLE_1%!\nReason: %VARIABLE_2%",
			"patchLoadedSucessfully": "INFO - Patch loaded successfully!\nName: %VARIABLE_0%\nType: %VARIABLE_1%",
			"patchLoadErrorMismatch": "ERROR - This patch does not match for this app / game!\nPatch ID: %VARIABLE_0%\nSelected app / game: %VARIABLE_1%",
			"patchLoadErrorParamSfo404": "ERROR - Unable to find PARAM.SFO for this patch!",
			"gameListLoadWarnPlayGo": "WARN - Unable to locate playgo-chunk.dat for %VARIABLE_0%!\nIf this isn\'t a homebrew, check if this App / Game was dumped properly.",
			"gameListLoadWarnParamSfo": "WARN - Unable to locate PARAM.SFO for %VARIABLE_0%!\nIf this isn\'t a homebrew, check if this App / Game was dumped properly.",
			"gameListRemoveProjectGp4": "INFO - ( %VARIABLE_0% ) Removing Project.gp4 since is was generated in PkgEditor and he is not necessary anymore.",
			"gameListDoubleIdError": "WARN - Unable to add %VARIABLE_0% to game list because another app / game with same title id exists! ( %VARIABLE_1% )",
			"gameListNoGameFound": "INFO - No apps / games were detected on current path ( %VARIABLE_0% )",
			"gameListSearch404": "Unable to find",
			"checkDumpPlayGoOnApp": "INFO - ( %VARIABLE_0% ) playgo-chunk.dat was found inside sce_sys/app - a new copy was created on sce_sys.",
			"gameListLoadSuccessful": "INFO - Game list was loaded successfully! ( %VARIABLE_0% entries found )",
			"gameListVersion": "Version",
			"selectGameLoadPatchErrorParamSfo": "ERROR - Unable to read PARAM.SFO from this patch!\n%VARIABLE_0%",
			"path": "Path"

		},

		"title": {
			"DIV_selectedGameStatus": "Green: All files are present\nYellow: Some files are missing - check log for more details\nCyan: Executable is a .elf file"
		}

	}

}