/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	tools.js

	This file contains most tools for converting hex data
	******************************************************************************
*/

temp_TOOLS = {

	// Solve Hex
	solveHex: function(hex){
		
		if (hex !== void 0){
			return hex.toLowerCase().replace(RegExp(' ', 'gi'), '');
		}

	},

	// Unsolve Hex
	unsolveHex: function(hex){

		if (hex !== void 0){
			return hex.toUpperCase().match(/.{2,2}/g).toString().replace(RegExp(',', 'gi'), ' ')
		}

	},

	// Parse endian values
	parseEndian: function(hex){

		if (hex !== void 0){
			return hex.match(/.{2,2}/g).reverse().toString().replace(RegExp(',', 'gi'), '');
		}

	},

	// Convert Hex values to UTF-8
	convertHexToUft8: function(hex){

		var textValue = '';
		
		if (hex !== void 0 && hex !== ''){

			hex.match(/.{2,2}/g).forEach(function(cChar){
				textValue = textValue + String.fromCharCode(parseInt(cChar, 16));
			});

		}

		return textValue;

	}

}