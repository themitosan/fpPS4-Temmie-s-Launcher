/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		filemanager.js

		This file is responsible for handling all files / folders loading functions

	***********************************************************************************
*/

temp_FILEMANAGER = {

	// Select path
	selectPath: function(callback){

		// Check if callback was provided
		if (typeof callback === 'function'){

			// Set onchange event
			document.getElementById('APP_FOLDER_LOADER').onchange = function(){

				// Get current path
				const cFile = document.getElementById('APP_FOLDER_LOADER').files[0];

				// Check file path
				if (cFile.path !== null && cFile.path !== void 0 && cFile.path !== ''){

					// Reset path loader
					document.getElementById('APP_FOLDER_LOADER').value = '';
					document.getElementById('APP_FOLDER_LOADER').accept = '';

					// Execute callback
					callback(APP.tools.fixPath(cFile.path));

				}

			}

			// Call popup window
			TMS.triggerClick('APP_FOLDER_LOADER');

		}

	},

	// Select file
	selectFile: function(ext, callback){

		// Check if data was provided
		if (ext !== void 0 && typeof callback === 'function'){

			// Check for extension
			if (ext === ''){
				ext = '*.*';
			}

			// Reset file loader
			document.getElementById('APP_FILE_LOADER').value = '';
			document.getElementById('APP_FILE_LOADER').files = null;
			document.getElementById('APP_FILE_LOADER').accept = ext;

			// Call load file popup
			TMS.triggerClick('APP_FILE_LOADER');

			// Start read
			document.getElementById('APP_FILE_LOADER').onchange = function(){
				callback(APP.tools.fixPath(document.getElementById('APP_FILE_LOADER').files[0].path));
			}

		}

	},

	// Save file
	saveFile: function(data){

		// Variables
		var location,
			ext = data.ext,
			mode = data.mode,
			content = data.content,
			fileName = data.fileName,
			callback = data.callback;

		// Fix extension
		if (ext === '' || typeof ext !== 'string'){
			ext = '*.*';
		}

		// Set file info
		document.getElementById('APP_FILE_SAVE').accept = ext;
		document.getElementById('APP_FILE_SAVE').nwsaveas = fileName;

		// Set onchange event
		document.getElementById('APP_FILE_SAVE').onchange = function(){

			// Get file location
			location = document.getElementById('APP_FILE_SAVE').value;

			// Check path
			if (location.replace(fileName, '') !== ''){

				// Try writing file
				try {

					// Write file
					APP.fs.writeFileSync(location, content, mode);

					// Execute callback
					if (typeof callback === 'function'){
						callback(APP.tools.fixPath(location));
					}

				} catch (err) {
					throw new Error(err);
				}

			}

			// Reset DOM
			document.getElementById('APP_FILE_SAVE').value = '';
			document.getElementById('APP_FILE_SAVE').accept = '';

		}

		// Call save popup
		TMS.triggerClick('APP_FILE_SAVE');

	}

}