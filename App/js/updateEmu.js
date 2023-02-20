/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	updateEmu.js

	This file is responsible for feching latest data from red-prig fpPS4 actions
	and update.
	******************************************************************************
*/

temp_EMU_UPDATE = {

	// GitHub actions link
	commitsLink: 'https://api.github.com/repos/red-prig/fpPS4/branches/',
	artifactsLink: 'https://api.github.com/repos/red-prig/fpPS4/actions/artifacts',

	// Skip main loading call
	skipLoadingCheck: !1,

	/*
		Fetch latest github actions

		options: Object
			jsonData: 		[Object] GitHub actions list (json)
			forceUpdate: 	[Boolean] Skip checks and download latest version available
			silent: 		[Boolean] Don't show message if user already have latest version
	*/
	check: function(options){
		
		// Process options
		if (options === void 0){
			options = {	forceUpdate: !1, silent: !1 };
		}
		var links = { artifacts: this.artifactsLink, commit: this.commitsLink + APP.settings.data.fpps4BranchName },
			optionsList = ['forceUpdate', 'silent'].forEach(function(optId){
				if (options[optId] === void 0){
					options[optId] = !1;
				}
			});

		// If Emu updates is available, has internet and fpPS4 isn't running
		if (APP.settings.data.enableEmuUpdates === !0 && navigator.onLine === !0 && APP.emuManager.emuRunning === !1){

			// Disable check for updates emu
			document.getElementById('BTN_UPDATE_FPPS4').disabled = 'disabled';

			// Get error message
			const errMsg = APP.lang.getVariable('updateEmuFetchActionsError');

			// Fetch data
			fetch(links.artifacts).then(function(resp){

				// Check if fetch status is ok
				if (resp.ok === !0){

					resp.json().then(function(jsonData){
						options['latestActions'] = jsonData;
						getLatestCommit();
					});

				} else {

					// If launcher can't get data, log error and reset button
					document.getElementById('BTN_UPDATE_FPPS4').disabled = '';
					console.error(errMsg);
					APP.log(errMsg);

				}

			});

			// Get latest commit
			const getLatestCommit = function(){

				// Fetch data
				fetch(links.commit).then(function(resp){
	
					// Check if fetch status is ok
					if (resp.ok === !0){
	
						resp.json().then(function(jsonData){
							options['latestCommit'] = jsonData;
							APP.emuManager.update.processActions(options);
						});
	
					} else {
	
						// If launcher can't get data, log error and reset button
						document.getElementById('BTN_UPDATE_FPPS4').disabled = '';
						console.error(errMsg);
						APP.log(errMsg);
	
					}
	
				});

			}

		}

	},

	// Process github actions data
	processActions: function(options){

		// Check if data was provided
		if (options !== void 0){

			// Variables
			var winConf,
				msgData = '',
				artifactData,
				canPrompt = !0,
				canUpdate = !1,
				msgMode = 'confirm',
				settingsData = APP.settings.data,
				latestCommit = options.latestCommit.commit.sha;

			// Check if current version is latest commit (or force update is on)
			if (settingsData.latestCommitSha !== latestCommit || options.forceUpdate === !0){

				// Seek for latest commit
				for (var i = 0; i < options.latestActions.artifacts.length; i++){
					
					// Get sha from current workflow run
					const cSha = options.latestActions.artifacts[i].workflow_run.head_sha;

					// Check if is same commit sha
					if (cSha === latestCommit){
						artifactData = options.latestActions.artifacts[i];
						break;
					}

				}

				// Check if found matching artifact
				if (artifactData !== void 0){
				
					// Set update flag on
					canUpdate = !0;

					// Set default update message
					msgData = APP.lang.getVariable('updateEmuShaAvailable', [settingsData.latestCommitSha.slice(0, 7), artifactData.workflow_run.head_sha.slice(0, 7)]);

					// If user didn't updated yet using launcher or executable was not found
					if (settingsData.latestCommitSha === '' || APP.fs.existsSync(settingsData.emuPath) === !1){
						msgData = APP.lang.getVariable('updateEmuShaUnavailable');
					}
				
				}

			} else {

				// User already have latest version
				if (settingsData.latestCommitSha === latestCommit && APP.fs.existsSync(settingsData.emuPath) === !0){
					
					// Set message mode to alert and get message for latest version
					msgMode = 'alert';
					msgData = APP.lang.getVariable('updateEmuIsLatestVersion', [settingsData.latestCommitSha.slice(0, 7)]);

					// If silent is active
					if (options.silent === !0){
						canPrompt = !1;
					}

				}

			}

			// Check if can update
			if (canUpdate === !0 && canPrompt === !0){
				winConf = window[msgMode](msgData);
			}

			// If can update and user confirms action or can update and force update is on
			if (msgMode === 'confirm' && winConf === !0 || canUpdate === !0 && options.forceUpdate === !0){
				this.getZipFile(artifactData);
			}

		}

		// Enable updater button again
		document.getElementById('BTN_UPDATE_FPPS4').disabled = '';

	},

	/*
		Get zip from specific github action run

		Since GitHub requires a token to be able to download artifacts, nightly.links service will be used instead.
		https://nightly.link
	*/
	getZipFile: function(actionsData){

		// If (by some reason) fpPS4 is running - close it!
		APP.emuManager.killEmu();

		// Display GUI
		APP.design.toggleEmuUpdateGUI('show');
		APP.design.updateProgressbarStatus(25, APP.lang.getVariable('updateEmu-1-4', [actionsData.workflow_run.head_sha.slice(0, 7)]));

		// Start download
		fetch('https://nightly.link/red-prig/fpPS4/actions/runs/' + actionsData.workflow_run.id + '/fpPS4.zip').then(function(resp){

			if (resp.ok === !0){

				APP.https.get(resp.url, function(data){

					const fPath = APP.settings.data.nwPath + '/Emu/fpPS4.zip',
						writeStream = APP.fs.createWriteStream(fPath);

					data.pipe(writeStream);
					writeStream.on('finish', function(){

						// Close writestream
						writeStream.close();

						// Extract emu executable
						APP.emuManager.update.extractZip({
							actions: actionsData,
							path: fPath
						});

					});

				});

			} else {

				console.error(resp);
				APP.log(APP.lang.getVariable('updateEmuDownloadFailed', [resp.status, resp.ok]));

			}

		});

	},

	// Extract zip
	extractZip: function(data){

		// Update status
		APP.design.updateProgressbarStatus(50, APP.lang.getVariable('updateEmu-2-4'));

		// Open and extract zip file
		const updateFile = new APP.streamZip.async({ file: data.path });
		updateFile.extract(null, APP.path.parse(data.path).dir + '/', function(err){
			if (err){
				console.error(err);
			}
		}).then(function(){

			// Close zip
			updateFile.close();

			// Finish process
			APP.emuManager.update.finish(data);

		});

	},

	// Finish process
	finish: function(data){

		// Update status
		APP.design.updateProgressbarStatus(75, APP.lang.getVariable('updateEmu-3-4'));

		// Remove download file
		APP.fs.unlinkSync(data.path);

		// Update settings
		APP.settings.data.latestCommitSha = data.actions.workflow_run.head_sha;
		APP.settings.data.emuPath = APP.path.parse(data.path).dir + '/fpPS4.exe';

		// Save settings
		APP.settings.save();

		// Display success message
		const processCompleteMsg = APP.lang.getVariable('updateEmuProcessComplete', [data.actions.workflow_run.head_sha.slice(0, 7)]);
		APP.design.updateProgressbarStatus(100, APP.lang.getVariable('updateEmu-4-4'));

		// Timing out just to update GUI
		setTimeout(function(){

			APP.log(processCompleteMsg);
			window.alert(processCompleteMsg);

			// Hide update gui
			APP.design.toggleEmuUpdateGUI('hide');

		}, 410);

	}

}