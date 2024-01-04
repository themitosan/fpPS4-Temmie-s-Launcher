/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	filemanager.js

	This file contains all functions for loading files and paths
	******************************************************************************
*/

temp_FILEMANAGER = {

	// Select path
	selectPath: function(postAction){

		if (postAction !== void 0){

			document.getElementById('APP_FOLDER_LOADER').onchange = function(){

				const cFile = document.getElementById('APP_FOLDER_LOADER').files[0];

				if (cFile.path !== null && cFile.path !== void 0 && cFile.path !== ''){
					document.getElementById('APP_FOLDER_LOADER').accept = '';
					document.getElementById('APP_FOLDER_LOADER').value = '';
					postAction(APP.tools.fixPath(cFile.path));
				}

			}

			TMS.triggerClick('APP_FOLDER_LOADER');

		}

	},

	// Select file
	selectFile: function(ext, postAction){

		if (ext !== void 0 && postAction !== void 0){

			if (ext === ''){
				ext = '*.*';
			}

			document.getElementById('APP_FILE_LOADER').value = '';
			document.getElementById('APP_FILE_LOADER').files = null;
			document.getElementById('APP_FILE_LOADER').accept = ext;
			TMS.triggerClick('APP_FILE_LOADER');

			// Start read
			document.getElementById('APP_FILE_LOADER').onchange = function(){
				postAction(APP.tools.fixPath(document.getElementById('APP_FILE_LOADER').files[0].path));
			}

		}

	},

	// Save file
	saveFile: function(fileName, ext, mode, content, postAction){

		// Fix extension
		if (ext === '' || typeof ext !== 'string'){
			ext = '*.*';
		}

		// Set file info
		document.getElementById('APP_FILE_SAVE').accept = ext;
		document.getElementById('APP_FILE_SAVE').nwsaveas = fileName;
		document.getElementById('APP_FILE_SAVE').onchange = function(){

			var location = document.getElementById('APP_FILE_SAVE').value;
			if (location.replace(fileName, '') !== ''){

				// Try writing file
				try {

					APP.fs.writeFileSync(location, content, mode);
					if (postAction !== void 0){
						postAction(APP.tools.fixPath(location));
					}

				} catch (err) {
					console.error(err);
					APP.log(APP.lang.getVariable('errorSaveFile', [err]));
				}

			}

			// Reset DOM
			document.getElementById('APP_FILE_SAVE').value = '';
			document.getElementById('APP_FILE_SAVE').accept = '';

		}

		TMS.triggerClick('APP_FILE_SAVE');

	},

	// Open game folder
	openDir: function(path){

		// Spawn explorer
		APP.childProcess.exec(`start "" "${path}"`);

	}

}