/*
	settings.js
*/

temp_SETTINGS = {
	
	// Settings list
	data: {
		nwPath: '',
		emuPath: '',
		gamePath: ''
	},

	// Load settings
	load: function() {

		// Create save
		if (localStorage.getItem('settings') === null){
			APP.settings.save();
		}

		const settings = localStorage.getItem('settings');
		this.data = JSON.parse(settings);

	},

	// Save settings
	save: function() {
		localStorage.setItem('settings', JSON.stringify(this.data));
	},

	// Check paths
	checkPaths: function(){

		// Fix path
		this.data.nwPath = nw.__dirname.replace(RegExp('\\\\', 'gi'), '/');

		const mainPath = this.data.nwPath,
			pathList = [
				'/Emu',
				'/Logs',
				'/Games'
			];

		// Try create required paths
		pathList.forEach(function(cPath){

			if (APP.fs.existsSync(mainPath + cPath) !== !0){

				try {
					APP.fs.mkdirSync(mainPath + cPath);
				} catch (err) {
					APP.log('Unable to create path!\n(' + mainPath + cPath + ')\n' + err);
				}
				
			}

		});

		// Set Games / Emu paths and check if fpPS4 exe is present
		if (this.data.gamePath === ''){
			APP.settings.data.gamePath = mainPath + '/Games';
		}

		// fpPS4 path
		this.data.emuPath = mainPath + '/Emu/fpPS4.exe';

		if (APP.fs.existsSync(this.data.emuPath) === !0){

			APP.log('INFO - Main fpPS4 was found!');

		} else {

			const errMsg = 'ERROR - Unable to locate main fpPS4 executable!\nMake sure to insert it on \"Emu\" folder and click on ok.';
			window.alert(errMsg);
			APP.log(errMsg);

		}

	}

}