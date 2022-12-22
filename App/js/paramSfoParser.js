/*
	paramSfoParser.js
	PARAM.SFO reader written by TemmieHeartz
	@themitosan

	Many thanks to @notzecoxao for this sassy-challenge!

	Projects / Articles used as reference:
	https://www.psdevwiki.com/ps4/Param.sfo
*/

temp_PARAMSFO_PARSER = {
	
	/*
		Variables / Database
	*/

	/*
		Functions
	*/

	// [TEMP] Load SFO using file load API
	selectFile: function(){

		APP.fileManager.selectFile('.sfo', function(pFile){
			APP.paramSfo.parse(pFile);
		});

	},

	/*
		Read PARAM.SFO files [WIP]
		By TemmieHeartz

		Info: Since all hex data is being read as String, here is a simple explanation:
		To read 0x04 bytes, Slice current string from starting point (0x00) to selection length (0x04) using it's hex value converted to int * 2

					   parseInt
		(Start)  0x00 ---------> 0
		(Length) 0x04 ---------> (4 * 2) = 8;

		JS: sfoHex.slice(0, 8); ---> 00 50 53 46 (" PSF")
	*/
	temp: '',
	parse: function(fLocation){

		// Read file as hex (String)
		const sfoHex = APP.fs.readFileSync(fLocation, 'hex');
		this.temp = sfoHex;
		
		var sfoMetadata = {},

			// SFO Header
			sfoHeader = {

				magic: 	 	   	   APP.tools.parseEndian(sfoHex.slice(0, 8)),	// (0x04) " PSF" Magic
				version: 	   	   APP.tools.parseEndian(sfoHex.slice(8, 16)),	// (0x04) File Version (01 01)
				keyTableStart: 	   APP.tools.parseEndian(sfoHex.slice(16, 24)), // (0x04) Key table start offset
				dataTableStart:    APP.tools.parseEndian(sfoHex.slice(24, 32)), // (0x04) Data table start offset
				totalIndexEntries: APP.tools.parseEndian(sfoHex.slice(32, 40))  // (0x04) Total entries in index table
			
			}

		/*
			Create key list [APP_TYPE, TITLE_ID...]
		*/
		var listAttrArray,
			listAttrString = '',
			listAttrRaw = sfoHex.slice((parseInt(sfoHeader.keyTableStart, 16) * 2), (parseInt(sfoHeader.dataTableStart, 16) * 2));
		
		// Convert hex to string
		listAttrRaw.match(/.{2,2}/g).forEach(function(cChar){
			listAttrString = listAttrString + String.fromCharCode(parseInt(cChar, 16));
		});

		// Set key list
		listAttrArray = listAttrString.split('\x00');
		listAttrArray.splice(listAttrArray.indexOf(''), 1);

		/*
			Get reading mode for current entry [Key table offset, param_fmt...]
		*/

		// Set variables
		var readMode = {},
			readerLocation = 0,
			hexStartLocation = sfoHex.slice(40);

		listAttrArray.forEach(function(cAttr){

			// Slice Current Data
			const cReadingMode = hexStartLocation.slice(readerLocation, parseInt(readerLocation + 32));

			readMode[cAttr] = {
				keyTableOffset: cReadingMode.slice(0, 4),   // Key table offset
				param_fmt: 		cReadingMode.slice(4, 8),   // param_fmt (type of data)
				paramLength: 	cReadingMode.slice(8, 16),  // Parameter length
				paramMaxLength: cReadingMode.slice(16, 24), // Parameter Max Length
				dataOffset: 	cReadingMode.slice(24, 32)  // Data Offset
			}

			// Update position for next location
			readerLocation = parseInt(readerLocation + 32);

		});

		/*
			Set Metadata Info
		*/
		readerLocation = 0;
		listAttrArray.forEach(function(cAttr){
			sfoMetadata[cAttr] = '';
		});

		console.table(listAttrArray);
		console.table(readMode);

		// End
		return sfoMetadata;

	}

}