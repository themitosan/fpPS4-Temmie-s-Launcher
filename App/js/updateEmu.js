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
	githubLink: 'https://api.github.com/repos/red-prig/fpPS4/actions/artifacts',

	/*
		Fetch latest github actions

		options: Object
			jsonData: 		[Object] GitHub actions list (json)
			forceUpdate: 	[Boolean] Skip checks and download latest version available
			silent: 		[Boolean] Don't show message if user already have latest version
	*/
	check: function(options){

		if (options === void 0){
			options = {
				forceUpdate: !1,
				silent: !1
			};
		}

		// If Emu updates is available, has internet and fpPS4 isn't running
		if (APP.settings.data.enableEmuUpdates === !0 && navigator.onLine === !0 && APP.emuManager.emuRunning === !1){

			// Disable check for updates emu
			document.getElementById('BTN_UPDATE_FPPS4').disabled = 'disabled';

			// Get error message
			const errMsg = APP.lang.getVariable('updateEmuFetchActionsError');

			// Fetch data
			fetch(this.githubLink).then(function(resp){

				// Check if fetch status is ok
				if (resp.ok === !0){

					resp.json().then(function(jsonData){
						options['jsonData'] = jsonData;
						APP.emuManager.update.processActions(options);
					});

				} else {


					// If launcher can't get data, log error and reset button
					APP.log(errMsg);
					console.error(errMsg);
					document.getElementById('BTN_UPDATE_FPPS4').disabled = '';

				}

			});

		}

	},

	// Process github actions data
	processActions: function(options){

		const data = options.jsonData;

		if (data !== void 0){

			var conf, updateData, updateId,
				latestSha = APP.settings.data.latestCommitSha,
				accpetableBranch = APP.settings.data.fpps4BranchName;

			// Read latest actions
			for (var i = 0; i < Object.keys(data.artifacts).length; i++){
			
				// Shortcut
				const workflow = data.artifacts[i].workflow_run;

				// If user already updated and have latest changes
				if (workflow.head_sha === latestSha){
					updateId = i;
					break;
				}

				// Check if branch is the same selected on settings, repo is from red-prig and if lash head_sha is different
				if (workflow.head_branch === accpetableBranch && workflow.head_sha !== latestSha){
					updateId = i;
					break;
				}

			}

			// Enable fpPS4 updates button again
			document.getElementById('BTN_UPDATE_FPPS4').disabled = '';

			// Check if there's matching updates
			if (updateId !== void 0){

				// Set latest valid commit as new update
				updateData = data.artifacts[updateId];

				// Set user message
				var canPrompt = !0,
					msgMode = 'confirm',
					msgData = APP.lang.getVariable('updateEmuShaAvailable', [latestSha.slice(0, 7), updateData.workflow_run.head_sha.slice(0, 7)]);

				// If user didn't updated yet using launcher
				if (latestSha === ''){
					msgData = APP.lang.getVariable('updateEmuShaUnavailable');
				}

				// If local version is the latest
				if (latestSha === updateData.workflow_run.head_sha){

					// Update prompt
					msgMode = 'alert';
					msgData = APP.lang.getVariable('updateEmuIsLatestVersion', [latestSha.slice(0, 7)]);

					// If silent is active
					if (options.silent === !0){
						canPrompt = !1;
					}
				
				}

				// Call popup
				if (canPrompt === !0 && options.forceUpdate === !1){
					conf = window[msgMode](msgData);
				}

				// If anren't latest version and user confirms
				if (msgMode === 'confirm' && conf === !0 || options.forceUpdate === !0){
					this.getZipFile(updateData);
				}

			}

		}

	},

	/*
		Get zip from specific github action run

		Since fpPS4 actions require being logged to download, nightly.links service will be used instead.
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
							newExecName: 'fpPS4_' + actionsData.workflow_run.head_sha.slice(0, 7) + '.exe',
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
		updateFile.extract('fpPS4.exe', APP.path.parse(data.path).dir + '/' + data.newExecName, function(err){
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
		APP.settings.data.emuPath = APP.path.parse(data.path).dir + '/' + data.newExecName;

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