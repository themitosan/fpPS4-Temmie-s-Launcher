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

	}

}