/*
	***********************************************************************************

		fpPS4 Temmie's launcher
		launcherLog.js

		This file contains all variables and functions related to internal log
		system

	***********************************************************************************
*/

temp_LOG = {

	/*
		Variables
	*/

	// Log history
	history: '',

	/*
		Functions
	*/

	// Export internal data
	export: function(useSaveForm){

		// Variables
		var date = new Date,
			data = this.history.slice(0, (this.history.length - 1)),
			fileName = 'Launcher-log-' + APP.tools.cleanString(date.toJSON().replace(RegExp(':', 'gi'), '-'), ['T', 'Z']);

		// Return promise
		return new Promise(function(resolve, reject){

			try {

				// Check if need to ask save location
				if (useSaveForm === !0){

					// Display save dialog
					APP.fileManager.saveFile({
						ext: '.log',
						mode: 'utf8',
						content: data,
						fileName: fileName,
						callback: function(d){
							resolve(function(){return d});
						}
					});

				} else {
					APP.fs.writeFileSync(APP.settings.nwPath + '/Logs/Launcher/' + fileName + '.log', data, 'utf8');
					resolve(function(){	return 0; });
				}

			} catch (err) {
				console.error(err);
				reject(err);
			}

		});

	},

	/*
		Log function

			data: Object
				data: String  - Output data
				mode: String  - How console should display it (log, warn, error, debug, table...)
				cls:  Boolean - Set true to clear console before commiting data
	*/
	add: function(data){

		// Check if data exists
		if (data === void 0){
			data = {};
		}

		// Variables
		var cls = data.cls,
			str = data.data,
			mode = data.mode;

		// Check if variables were provided
		if (mode === void 0){
			mode = 'info';
		}
		if (cls === void 0){
			cls = !1;
		}

		// Check if need to clear log
		if (cls === !0){
			console.clear();
		}

		// Check if can log
		if (APP.settings.debug === !0){
			console[mode](str);
		}

		// Check if current data can be added to log history
		if (str !== '' && str !== '\n'){

			// Check if is data need to be converted
			if (mode === 'table' || typeof str === 'object'){
				str = JSON.stringify(str);
			}

			// Check if is mode is error
			if (mode === 'error'){
				str = '\n\n' + str + '\n\n';
			}

			// Append data
			this.history = this.history + str + '\n';

		}

	}

}