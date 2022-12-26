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

	},

	// Parse percentage
	parsePercentage: function(current, maximum){

		var res = 0;
		if (current !== void 0 && maximum !== void 0){
			res = Math.floor((current / maximum) * 100);
		}
		
		return res;

	},

	// Process checkbox status
	processCheckbox: function(domName){

		var res = !1,
		    domId = document.getElementById(domName).checked;

		if (domId === !1){
			res = !0;
		}

		document.getElementById(domName).checked = res;

	}

}