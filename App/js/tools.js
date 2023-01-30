/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		tools.js

		This file contains most tools for converting hex data and more

	***********************************************************************************
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

	// Convert Hex values to UTF-8 string
	convertHexToUft8: function(hex){

		var textValue = '';
		if (hex !== void 0 && hex !== ''){
			textValue = decodeURIComponent('%' + hex.match(/.{2,2}/g).join('%'));
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

	},

	// Fix paths
	fixPath: function(path){

		if (path !== void 0 && path !== ''){
			return path.replace(RegExp('\\\\', 'gi'), '/');
		}

	},

	/*
		Remove HTML from string
		Original regex: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
	*/
	removeHTML: function(str){

		if (str !== void 0 && str !== ''){
			return str.replace(/(<([^>]+)>)/gi, '');
		}

	},

	// Get string from main object (APP - main.js)
	getStringFromApp: function(str){
		if (str !== void 0 && str !== ''){

			var res = APP;
				temp = str.split('.').forEach(function(objPath){
					res = res[objPath];
				});

			return res;

		}
	},

	// Convert array to string breaking lines
	convertArrayToString: function(str){
		var res = '';

		if (str !== void 0 && str.length !== 0){
			res = str.toString().replace(RegExp(',', 'gi'), '\n');
		}

		return res;
	}

}