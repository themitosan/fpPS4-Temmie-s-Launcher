/*
	tools.js
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

	}

}