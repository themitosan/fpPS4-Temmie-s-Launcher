/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		updater.js

		This file contains all functions related to fpPS4 / Launcher updater.

		Quick info: I still suck at everything related to online functionality!

	***********************************************************************************
*/

temp_UPDATER = {

	// Variables
	links: {

		// CI
		fpPS4_CI: 'https://api.github.com/repos/red-prig/fpPS4/actions/workflows',
		launcher_CI: 'https://api.github.com/repos/temmieheartz/fpPS4-Temmie-s-Launcher/actions/workflows',

		// Branches
		fpPS4_BRANCHES: 'https://api.github.com/repos/red-prig/fpPS4/branches'

	},

	/*
		Functions
	*/

	/*
		Fetch data

			data: Object
				mode: String - fetch mode (like json)
				url:  String - URL to be fetched
	*/
	fetch: async function(data){

		return new Promise(function(resolve, reject){

			// Variables
			var url = data.url,
				mode = data.mode,
				metadata = data.metadata;

			// Start fetch process
			fetch(url, metadata).then(

				// Resolve
				function(resp){

					// Check response
					if (resp.ok === !0){

						// Process result
						resp[mode]().then(function(data){
							resolve(data);
						});

					} else {

						// Log error on console
						APP.log.add({data: 'ERROR - (Updater - Fetch) Response is not ok!'});
						APP.log.add({mode: 'table', data: resp});
						reject(data);

					}

				},

				// Reject
				function(rejData){

					// Log error on console
					APP.log.add({mode: 'error', data: 'ERROR - (Fetch) Unable to fetch data!'});
					APP.log.add({mode: 'error', data: rejData});
					reject(rejData);

				}
	
			);

		});

	},

	// Get emu CI
	emu_getCI: function(cb){

		// Fetch fpPS4 CI list
		this.fetch({
		    mode: 'json',
		    url: APP.updater.links.fpPS4_CI
		})

		// Proceed
		.then(

			// Resolve
			function(data){

				// Reset workflow list
				APP.settings.emuGitHub_availableWorkflows = [];

				// Process workflow list				
				data.workflows.forEach(function(cWorkflow, cIndex){
					APP.settings.emuGitHub_availableWorkflows.push(data.workflows[cIndex].name);
				});

				// Check if is on boot mode. If so, get fpPS4 available branches
				if (APP.settings.appIsLoading === !0){
					APP.updater.emu_getBranch();
				}

				// Execute callback
				if (typeof cb === 'function'){
					cb();
				}

			},

			// Reject
			function(err){
				APP.log.add({mode: 'warn', data: 'WARN - Unable to fetch fpPS4 GitHub CI list!\nReason: ' + err});
			}

		);

	},

	// Get emu branches
	emu_getBranch: function(){

		// Fetch fpPS4 available branches
		return this.fetch({
		    mode: 'json',
			url: APP.updater.links.fpPS4_BRANCHES
		})

		// Proceed
		.then(

			// Resolve
			function(data){

				// Reset branch list
				APP.settings.emuGitHub_availableBranches = [];

				// Process branch list
				Object.keys(data).forEach(function(cIndex){
					APP.settings.emuGitHub_availableBranches.push(data[cIndex].name);
				});

			},

			// Reject
			function(err){
				APP.log.add({mode: 'warn', data: 'WARN - Unable to fetch fpPS4 GitHub branches!\nReason: ' + err});
			}

		);

	},

	// Fetch fpPS4 selected workflow runs
	emu_getRuns: function(){

		// Remove fetch status
		delete APP.temp.fetchSucess;

		// Variables
		var wList = [],
			workflowList = APP.temp.ciResult.workflows,
			selectedCI = APP.settings.data.fpPS4_selectedCI;

		// Create new array with workflow names
		workflowList.forEach(function(cItem){
			wList.push(workflowList[cItem].name);
		});

		// Check if has items on workflow lists
		if (workflowList.length !== 0){

			// Check if selected ci exists on workflow list
			if (wList.indexOf(selectedCI) === -1){
				APP.temp.runUrl = workflowList[0].url + '/runs';
			} else {
				APP.temp.runUrl = workflowList[wList.indexOf(selectedCI)].url + '/runs';
			}

			// Set got list as true
			APP.temp.gotRunList = !0;

		} else {

			// Fail
			APP.temp.gotRunList = !1;
			APP.temp.errorCode = 'updater_emuErrorWorflow404';

		}

		// End
		return 0;

	},

	// Browse available runs
	emu_browseAvailableRuns: function(){

		// Get run list
		const runList = APP.temp.runData.workflow_runs;

		// Clear some variables
		delete APP.temp.runUrl;
		delete APP.temp.ciResult;
		delete APP.temp.gotRunList;
		delete APP.temp.fetchRunList;

		// Variables
		var res,
			cBranch = APP.settings.data.fpPS4_branch,
			cVersionSHA = APP.settings.data.fpPS4_commitSha;

		// Process run list
		for (var i = 0; i < runList.length; i++){
			
			// Get selected run
			var cRun = runList[i];

			// Check if is a elegible run
			if (cRun.conclusion === 'success' && cRun.head_branch === cBranch){

				// If user didn't updated yet
				if (cVersionSHA === ''){

					// Skip user prompt
					res = 'skipUserPrompt';
					APP.temp.selectedRun = runList[i];
					break;

				} else {

					// Check if matches with local version
					if (cVersionSHA === runList[i].head_sha){
						res = 'upToDate';
					} else {
						res = 'updateAvailable';
						APP.temp.selectedRun = runList[i];
						APP.temp.title = cRun.display_title;
						APP.temp.commitSha = cRun.head_sha.slice(0, 7);
					}
					break;

				}

			}

		}

		// Set browse result and remove run list
		APP.temp.browseResult = res;
		delete APP.temp.runData;

		// End
		return 0;

	}

}