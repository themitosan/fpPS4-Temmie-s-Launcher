/*
	filemanager.js
*/

temp_FILEMANAGER = {

	// Select path
	selectPath: function(postAction){

		if (postAction !== void 0){

			document.getElementById('APP_FOLDER_LOADER').onchange = function(){

				const cFile = document.getElementById('APP_FOLDER_LOADER').files[0];

				if (cFile.path !== null && cFile.path !== void 0 && cFile.path !== ''){
					postAction(cFile.path.replace(RegExp('\\\\', 'gi'), '/'));
					document.getElementById('APP_FOLDER_LOADER').value = '';
					document.getElementById('APP_FOLDER_LOADER').accept = '';
				}

			}

			document.getElementById('APP_FOLDER_LOADER').click();

		}

	},

	// Select file
	selectFile: function(extention, postAction){

		if (extention !== void 0 && postAction !== void 0){

			if (extention === ''){
				extention = '*.*';
			}

			document.getElementById('APP_FILE_LOADER').value = '';
			document.getElementById('APP_FILE_LOADER').files = null;
			document.getElementById('APP_FILE_LOADER').accept = extention;
			TMS.triggerClick('APP_FILE_LOADER');

			// Start read
			document.getElementById('APP_FILE_LOADER').onchange = function(){
				postAction(document.getElementById('APP_FILE_LOADER').files[0].path.replace(RegExp('\\\\', 'gi'), '/'));
			}

		}

	}

}