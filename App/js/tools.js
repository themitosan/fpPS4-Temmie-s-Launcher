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

	// Parse positive
	parsePositive: function(value){

		var res = 0;

		if (value !== void 0 && parseInt(value) !== NaN){
			const n = parseInt(value);
			res = ((n - n) - n);
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

	// Get data from main object (APP - main.js)
	getVariable: function(str){
		if (str !== void 0 && str !== ''){

			var res = APP,
				temp = str.split('.').forEach(function(objPath){
					res = res[objPath];
				});

			return res;

		}
	},

	// Set data on main object (APP - main.js)
	setVariable: function(target, data, callback){

		try {

			if (target !== void 0 && target !== ''){

				var i,
					temp = APP,
					path = target.split('.');

				for (i = 0; i < (path.length - 1); i++){
					temp = temp[path[i]];
				}

				temp[path[i]] = data;

			}

		} catch (err) {
			throw new Error(err);
		}
	},

	// Convert array to string breaking lines
	convertArrayToString: function(str){
		var res = '';

		if (str !== void 0 && str.length !== 0){
			res = str.toString().replace(RegExp(',', 'gi'), '\n');
		}

		return res;
	},

	// Remove values from string
	cleanString: function(str, arr){

		var res = '';

		if (str !== void 0 && arr !== void 0){

			res = str;
			arr.forEach(function(rep){
				res = res.replace(RegExp(rep, 'gi'), '');
			});

			return res;

		}

	},

	/*
		Fix vars
		This function was obtained from R3V2 API

		https://github.com/temmieheartz/r3ditor-v2
	*/
	fixVars: function(inp, v){

		var c = 0,
			size = parseInt(v),
			input = inp.toString();

		if (inp === void 0 || inp === ''){
			input = '00';
		}
		if (v === void 0 || v === ''){
			size = 2;
		}

		if (input.length < size){

			while (input.length !== size){
				input = '0' + input;
			}

		} else {

			if (input.length !== size && input.toString().length > size){
				input = input.slice(0, v);
			}

		}

		return input;

	},

	// Fix JSON quotes
	fixJson: function(data){

		var res = '';

		if (data !== void 0){
			res = data.replace(RegExp("'", 'gi'), '"');
		}

		return res;

	},

	// Clean function
	cleanFn: function(fnStr){

		var res = '';

		if (fnStr !== void 0){
			res = fnStr.replace(RegExp('\n', 'gi'), ' ').replace(RegExp('	', 'gi'), '');
		}

		return res;

	},

	// Prompt - a simple way to handle window.prompt call
	prompt: function(msg){

		return new Promise(function(resolve, reject){

			var res,
				canStart = !0,
				errorReason = '';

			if (msg === '' || msg === void 0){
				canStart = !1;
				errorReason = 'Provided message is empty';
			} else {
				res = window.prompt(msg);
			}

			if (res === null){
				canStart = !1;
				errorReason = 'User canceled action';
			}

			if (res === ''){
				canStart = !1;
				errorReason = 'User didn\'t provided any data on textbox';
			}

			if (canStart === !0){
				resolve(res);
			} else {
				reject(errorReason);
			}

		});

	},

	// Confirm - a simple way to handle window.confirm call
	confirm: function(msg){

		return new Promise(function(resolve, reject){

			var res,
				canStart = !0,
				errorReason = '';

			if (msg === '' || msg === void 0){
				canStart = !1;
				errorReason = 'Provided message is empty';
			} else {
				res = window.confirm(msg);
			}

			if (res === !1){
				canStart = !1;
				errorReason = 'User canceled action';
			}

			if (canStart === !0){
				resolve(res);
			} else {
				reject(errorReason);
			}

		});

	},

	// Get all files from dir / subdir (require node.js) 
	getDirFiles: function(dir){

		// Variables
	    var res = [],
	    	fixPath = this.fixPath;

	    // Main process
	    const gFileProcess = function(path){

	    	/*
	    		Require modules individually.
	    		They will not be linked to main object due compat with other softwares (like fpPS4TL Script Editor)
	    	*/
	    	var module_fs = require('fs'),
	    		module_path = require('path');

	    	// Read dir
	    	module_fs.readdirSync(fixPath(path)).forEach(function(cFile){

			    var ret,
			    	abs = module_path.join(path, cFile);

			    if (module_fs.statSync(abs).isDirectory()){
			        ret = gFileProcess(abs);
			    } else {
			        ret = res.push(fixPath(abs));
			    }

				return ret;

			});

	    }

	    // Run process
	    gFileProcess(dir);

	    // End
	    return res;

	},

	// Check online status
	checkOnlineStatus: async function(){

		try {

			const fetchTest = await fetch('https://google.com');
			return parseInt(fetchTest.status) > 199 && parseInt(fetchTest.status) < 300;

		} catch (err){
			return !1;
		}

	}

}