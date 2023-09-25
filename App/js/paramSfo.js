/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		paramSfo.js

		This file is responsible for holding all funcions / database for reading
		PARAM.SFO files!

		Many thanks to Control eXecute (@notzecoxao) for this sassy-challenge!

		Article used as reference:
		https://www.psdevwiki.com/ps4/Param.sfo

	***********************************************************************************
*/

temp_PARAMSFO = {

	// PARAM.SFO Database
	database: {

		DB_APP_TYPE: {
			0: 'Not specified',
			1: 'Paid Standalone Full App',
			2: 'Upgradable App',
			3: 'Demo App',
			4: 'Freemium App'
		},

		DB_CATEGORY: {
			'ac': 	'Additional Content',
			'bd': 	'Blu-ray Disc?',
			'gc': 	'Game Content',
			'gd': 	'Game Digital Application',
			'gda': 	'System Application',
			'gdb': 	'Unknown',
			'gdc': 	'Non-Game Big Application',
			'gdd': 	'BG Application',
			'gde': 	'Non-Game Mini App / Video Service Native App',
			'gdk': 	'Video Service Web App',
			'gdl': 	'PS Cloud Beta App',
			'gdO': 	'PS2 Classic',
			'gp': 	'Game Application Patch',
			'gpc': 	'Non-Game Big App Patch',
			'gpd': 	'BG Application patch',
			'gpe': 	'Non-Game Mini App Patch / Video Service Native App Patch',
			'gpk': 	'Video Service Web App Patch',
			'gpl': 	'PS Cloud Beta App Patch',
			'sd': 	'Save Data',
			'la': 	'License Area',
			'wda': 	'Unknown'
		}

	},

	/*
		Read PARAM.SFO files!
		This function returns all data as object.

		Info: Since all hex data is being read as String, here is a simple explanation:
		To read 0x04 bytes, Slice current string from starting point (0x00) to selection length (0x04) using it's hex value converted to int * 2

					   parseInt
		(Start)  0x00 ---------> 0
		(Length) 0x04 ---------> (4 * 2) = 8;

		JS: sfoHex.slice(0, 8); ---> 00 50 53 46 (" PSF")
	*/
	parse: function(fLocation){

		// Read file as hex (String)
		const sfoHex = APP.fs.readFileSync(fLocation, 'hex');

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
		var listAttrRaw = sfoHex.slice((parseInt(sfoHeader.keyTableStart, 16) * 2), (parseInt(sfoHeader.dataTableStart, 16) * 2)),
			listAttrArray = APP.tools.convertHexToUft8(listAttrRaw).split('\x00');

		// Remove blank entries [I'm not feeling 100% secure about this method but... Here we go!]
		while (listAttrArray.indexOf('') !== -1){
			listAttrArray.splice(listAttrArray.indexOf(''), 1);
		}

		/*
			Get reading mode for current entry [Key table offset, param_fmt...]
		*/

		// Set variables
		var readMode = {},
			readerLocation = 0,
			hexStartLocation = sfoHex.slice(40);

		// Get key table data info
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

		// Set location to data table start create first slice
		var pointerLocation = 0,
			dataTableSlice = sfoHex.slice(parseInt(sfoHeader.dataTableStart, 16) * 2);

		// Process list
		listAttrArray.forEach(function(cAttr, cIndex){

			// Get hex file starting from current location
			var keyData = '',
				convertUft8 = !1,
				cSlice = dataTableSlice.slice(pointerLocation),
				stopLocation = parseInt(pointerLocation + 8); // Default: int32

			/*
				Check param length

				If not 32 bits unsigned (0x0404), use paramMaxLength converted to int minus 1 multiplied by 2
				...and (of course) convert it to utf-8!

				JS: length = ((parseInt(paramMaxLength, 16) - 1) * 2)
			*/
			if (readMode[cAttr].param_fmt !== '0404'){
				convertUft8 = !0;
				stopLocation = (pointerLocation + ((parseInt(APP.tools.parseEndian(readMode[cAttr].paramLength), 16) - 1)) * 2);
			}

			// Get attr data
			keyData = dataTableSlice.slice(pointerLocation, stopLocation);

			// Set key value to attr
			if (convertUft8 === !0){
				sfoMetadata[cAttr] = APP.tools.convertHexToUft8(keyData);	
			} else {
				sfoMetadata[cAttr] = APP.tools.parseEndian(keyData);
			}

			// Update reader location
			if (listAttrArray[(cIndex + 1)] !== void 0){
				pointerLocation = (parseInt(APP.tools.parseEndian(readMode[listAttrArray[(cIndex + 1)]].dataOffset), 16) * 2);
			}

		});

		// End
		return sfoMetadata;

	}

}