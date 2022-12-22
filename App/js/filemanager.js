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

	},

	/*
		Read PARAM.SFO files [WIP]

		Many thanks to @notzecoxao and PS4 Developer Wiki
		https://www.psdevwiki.com/ps4/Param.sfo
	*/
	
	rawSFO: '',
	readParamSfo: function(){

		this.selectFile('.sfo', function(fLocation){

			const sfoHex = APP.fs.readFileSync(fLocation, 'hex');
			this.rawSFO = sfoHex;
			
			var sfoHeader = {
					magic: 	 	   	   APP.tools.unsolveHex(sfoHex.slice(0, 8)),	// (0x04) " PSF" Magic
					version: 	   	   APP.tools.unsolveHex(sfoHex.slice(8, 16)),	// (0x04) Version
					keyTableStart: 	   APP.tools.unsolveHex(sfoHex.slice(16, 24)),	// (0x04) Key table start offset
					dataTableStart:    APP.tools.unsolveHex(sfoHex.slice(24, 32)),	// (0x04) Data table start offset
					totalIndexEntries: APP.tools.unsolveHex(sfoHex.slice(32, 40)) 	// (0x04) Total entries in index table
				}, 
				sfoIndexTable = {

					keyTableOffset:  APP.tools.unsolveHex(sfoHex.slice(40, 44)),	// (0x02) Key table offset
					param_fmt: 		 APP.tools.unsolveHex(sfoHex.slice(44, 48)), 	// (0x02) param_fmt (type of data)
					paramLength: 	 APP.tools.unsolveHex(sfoHex.slice(48, 56)),	// (0x04) Parameter length
					paramMaxLength:  APP.tools.unsolveHex(sfoHex.slice(56, 64)), 	// (0x04) Parameter max length
					dataTableOffset: APP.tools.unsolveHex(sfoHex.slice(64, 72)) 	// (0x04) Data table offset

				}


			console.table(sfoHeader);
			console.table(sfoIndexTable);

		});

	}

}