/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		interpreter.js

		This file is responsible for holding the internal script interpreter.

	***********************************************************************************
*/

temp_INTERPRETER = {

	/*
		Variables
	*/

	// Script list
	scripts: {},

	// Display active scripts
	activeScripts: {},

	/*
		Functions
	*/

	// load scripts list
	init: function(){

		try {

			// Get script list
			var sPath = APP.settings.appPath + '/scripts/',
				fList = APP.fs.readdirSync(sPath);
			
			// Filter file list
			const scriptList = fList.filter(function(cFile){

				// Filter JSON files
				if (APP.path.parse(cFile).ext.toLowerCase() === '.json'){
					return cFile;
				}

			});

			// Process script list
			scriptList.forEach(function(cScript){

				// Log current script if app is loading
				APP.log.add({data: 'INFO - (scriptInterpreter) Importing script: ' + cScript});

				// Read current script
				const cScriptData = JSON.parse(APP.fs.readFileSync(sPath + cScript, 'utf8'));

				// Set script data 
				Object.keys(cScriptData).forEach(function(script){
					APP.scriptInterpreter.scripts[script] = cScriptData[script];
				});

			});

		} catch (err) {
			throw new Error(err);
		}

	},

	// Run script
	run: function(scriptName, callback){

		// Check if script is provided and if it's not running
		if (this.scripts[scriptName] !== void 0 && this.activeScripts[scriptName] === void 0){

			// Get script steps
			const cScriptSteps = this.scripts[scriptName];

			// Set script data
			this.activeScripts[scriptName] = {
				running: !1,
				semaphore: !0,
				currentStep: 0,
				interval: void 0,
				killExecution: !1,
				steps: cScriptSteps,
				start: function(){
					APP.scriptInterpreter.processor(scriptName, callback);
				}
			}

			// Start script execution
			this.activeScripts[scriptName].start();

		} else {

			// Error string
			var errorReason = '';

			// If script is already running
			if (this.activeScripts[scriptName] !== void 0){
				errorReason = 'This script is already running!';
			}

			// If script doesn't exists
			if (this.scripts[scriptName] === void 0){
				errorReason = 'This script doesn\'t exist on database! (' + scriptName + ')';
			}

			// If launcher is on boot process
			if (APP.settings.appIsLoading === !0){
				window.alert('ERROR - Unable to start interpreter!\nReason: ' + errorReason);
			}

			// Throw new error
			throw new Error('ERROR - Unable to start interpreter!\nReason: ' + errorReason);


		}

	},

	// Release semaphore for specific list
	releaseSemaphore: function(scriptName){

		// Check if selected script exists
		if (this.activeScripts[scriptName] !== void 0){

			// Log data
			APP.log.add({data: 'INFO - (scriptInterpreter) Releasing semaphore manually for ' + scriptName});

			// Release semaphore
			this.activeScripts[scriptName].semaphore = !0;

		}

	},

	// Kill all active scripts
	killAllScripts: function(){

		// Get script lists
		const aScripts = Object.keys(this.activeScripts);

		// Check if there's scripts running
		if (aScripts.length > 0){

			// Process script list
			aScripts.forEach(function(cScript){

				// Set flag to kill execution and release it's semaphore
				APP.scriptInterpreter.activeScripts[cScript].killExecution = !0;
				APP.scriptInterpreter.releaseSemaphore(cScript);

			});

		}

	},

	// Script processor
	processor: function(scriptName, callback){

		// Get script data
		var processFunction = this.processFunction,
			scriptData = this.activeScripts[scriptName];

		// Check if script 
		if (scriptData !== void 0 && scriptData.running === !1){

			// Debug - log start
			APP.log.add({data: 'INFO - (scriptInterpreter) Running script \"' + scriptName + '\"\nSteps:'});
			APP.log.add({mode: 'table', data: scriptData.steps});

			// Set script running flag as true
			scriptData.running = !0;

			// Set interval
			scriptData.interval = setInterval(function(){

				// Check if semaphore is on
				if (scriptData.semaphore === !0){

					// Check if current step exists 
					if (scriptData.steps[scriptData.currentStep] !== void 0){

						// Execute current step
						processFunction(scriptName, scriptData.steps[scriptData.currentStep]);

						// Advance step
						scriptData.currentStep++;

					} else {

						// End processor
						APP.log.add({data: 'INFO - (scriptInterpreter) Process complete! - Script: \"' + scriptName + '\"'});

						// Execute callback
						if (typeof callback === 'function'){
							callback();
						}

						// Delete module
						delete APP.scriptInterpreter.activeScripts[scriptName];

						// Clear processor interval
						clearInterval(scriptData.interval);

					}

				} else {

					// Check if needs to kill execution
					if (scriptData.killExecution === !0){

						// Set step position out of bounds and release semaphore
						scriptData.currentStep = (scriptData.steps.length + 1);
						scriptData.semaphore = !0;

					} else {
						
						// Log waiting
						APP.log.add({data: 'INFO - (scriptInterpreter) Script: ' + scriptName + ', Function: ' + scriptData.steps[(scriptData.currentStep - 1)].opcode + ' - Waiting semaphore'});

					}

				}

			}, 50);

		}

	},

	// Process function
	processFunction: function(scriptName, data){

		// Check if data was provided
		if (data !== void 0){

			// Variables
			var cData = data.data,
				cOpcode = data.opcode,
				cIdentifier = data.id,
				activeScripts = APP.scriptInterpreter.activeScripts;

			// Lock semaphore
			activeScripts[scriptName].semaphore = !1;

			// log current opcode
			APP.log.add({data: 'INFO - (scriptInterpreter) Executing step ' + activeScripts[scriptName].currentStep + ' - Opcode: ' + cOpcode});
			
			// Check if there's args
			if (cData !== void 0){
				APP.log.add({mode: 'table', data: cData});
			} else {
				APP.log.add({data: 'No args detected for this function'});
			}

			/*
				Declare some functions to make things more easier
			*/

			// Release semaphore 
			const releaseSemaphore = function(){
					activeScripts[scriptName].semaphore = !0;
				},

				// Set current step as out of bounds
				killExecution = function(){
					activeScripts[scriptName].currentStep = parseInt(activeScripts[scriptName].steps.length + 1);
				},

				// Get function matching opcode and id
				getMatchingFnId = function(opcode, id){

					// Get current list
					const cList = activeScripts[scriptName].steps;

					// Filter list
					return cList.filter(function(cFunction){
						if (cFunction.opcode === opcode && cFunction.id === id){
							return cFunction;
						}
					});

				},

				/*
					Get function matching opcode data value

						data: Object
							opcode: String - Opcode name
							key:    String - Name of data key to seek
							value:  String - Value that must be inside of selected key
				*/
				getMatchingFnData = function(data){

					// Get current list
					const cList = activeScripts[scriptName].steps;

					// Filter list
					return cList.filter(function(cFunction){
						if (cFunction.opcode === data.opcode && cFunction.data[data.key] === data.value){
							return cFunction;
						}
					});

				},

				// Seek next end if opcode [WIP]
				seekEndIf = function(fName, fnId){

					// Variables
					var endLocation,
						stepList = activeScripts[scriptName].steps,
						elseLocation = getMatchingFnId('ELSE', fnId),
						endIfLocation = getMatchingFnId('END_IF', fnId);

					// If is CHECK_IF
					if (fName === 'CHECK_IF'){
						endLocation = stepList.indexOf(elseLocation[0]);
					}

					// If res stills undefined, seek for END_IF 
					if (endLocation === -1){
						endLocation = stepList.indexOf(endIfLocation[0]);
					}

					// Check if (by some reason) it fails finding END_LIST. If so, return out of bounds
					if (endLocation === -1){
						endLocation = parseInt(activeScripts[scriptName].steps.length + 1);
					}

					console.debug('(' + fName + ') Jump to function: ' + (endLocation + 1));
					console.debug(activeScripts[scriptName].steps);

					// End
					return endLocation;

				},

				// Get label location
				getLabelPos = function(targetLabel){

					// Set default res as current position
					var res = activeScripts[scriptName].currentStep,
						seekPosition = getMatchingFnData({
							key: 'labelName',
							value: targetLabel,
							opcode: 'SET_LABEL'
						});

					// Check if got result
					if (seekPosition[0] !== void 0){
						res = (activeScripts[scriptName].steps.indexOf(seekPosition[0]) - 1);
					}

					// End
					return res;

				},

				// Parse function string
				parseFunctionString = function(fnString){

					// Variables
					var fnData = fnString;

					// Check string status
					if (fnString === void 0 || fnString === ''){
						fnData = 'return 0;';
					}

					// End
					return (Function('"use strict";' + fnData));

				};

			/*
				Process current opcode
			*/
			switch (cOpcode){

				// Add comment on function list
				case 'SET_COMMENT':
					releaseSemaphore();
					break;

				// Wait
				case 'WAIT':

					// Check if time was provided
					if (cData.time === void 0 || parseInt(cData.time) === NaN){
						cData['time'] = 0;
					}

					// Process timeout
					setTimeout(function(){
						releaseSemaphore();
					}, parseFloat(cData.time + 1));
					break;

				// End list
				case 'END_LIST':
					killExecution();
					releaseSemaphore();
					break;

				// Window alert
				case 'WINDOW_ALERT':
					window.alert(cData.message);
					releaseSemaphore();
					break;

				// Set CSS
				case 'SET_CSS':
					TMS.css(cData.target, cData.css);
					releaseSemaphore();
					break;

				// Remove DOM
				case 'REMOVE_DOM':
					TMS.removeDOM(cData.target);
					releaseSemaphore();
					break;

				// Lock input
				case 'LOCK_INPUT':
					APP.input.lockInput();
					releaseSemaphore();
					break;

				// Release input
				case 'RELEASE_INPUT':
					APP.input.releaseInput();
					releaseSemaphore();
					break;

				// Set variable
				case 'SET_VAR':

					// Check if data is a variable from main APP object
					var setData = cData.value;

					// Is value to be stored is from main APP object
					if (cData.isFromMainObject === !0){
						setData = APP.tools.getVariable(setData.toString());
					}

					// Set data on target
					APP.tools.setVariable(cData.target, setData);

					// Release semaphore 
					releaseSemaphore();
					break;

				// Append form
				case 'APPEND_FORM':

					// Variables
					var innerData = cData.innerData;

					// Check if there's lang string to get
					if (cData.getLangVar === !0){
						innerData = APP.lang.getVariable(cData.langVar);
					}

					// Append form
					APP.design.appendForm(cData.formId, innerData, cData.location);
					releaseSemaphore();
					break;

				// Execute promise
				case 'EXECUTE_PROMISE':

					// Delcare promise
					return new Promise(function(resolve, reject){

						try {

							// Execute function and resolve
							const fnData = (Function('"use strict";return ' + cData.execFn)());
							if (fnData === 0){
								resolve(0);
							}

						} catch (err) {

							// Log error and reject
							APP.log.add({mode: 'error', data: err});
							window.alert('ERROR: Interpreter rejected current list function!\nDetails: ' + err);
							reject(err);

						}

					}).then(function(){
						releaseSemaphore();
					});

					break;

				// Focus selected option
				case 'FOCUS_CURSOR':
					APP.design.input.focus();
					releaseSemaphore();
					break;

				// Save settings
				case 'SAVE_SETTINGS':
					APP.settings.save(function(){
						releaseSemaphore();
					});
					break;

				// Call msgsys window
				case 'CALL_MSGSYS':
					APP.design.msgsys.displayMsg({
						msgName: cData.msgName,
						showBgIcon: cData.showBgIcon, 
						callback: function(){
							releaseSemaphore();
						}
					});
					break;

				// Call MSGSYS message
				case 'MSGSYS_DISPLAY_MSG':

					// Variables
					var msgsysReplaceList = [],
						animationTime = cData.duration;

					// Fix duration
					if (animationTime === void 0 || parseInt(animationTime) === NaN){
						animationTime = 200;
					} else {
						animationTime = parseInt(cData.duration);
					}
					if (animationTime < 0){
						animationTime = 0;
					}
					if (animationTime > 10000){
						animationTime = 10000;
					}

					// If replace list is empty / undefined, convert all items on original list as main object variables
					if (cData.replaceList === void 0){

						// Get all items as object
						APP.design.msgsys.MSG_DB[cData.msgName].replaceList.forEach(function(cReplace){
							msgsysReplaceList.push(APP.tools.getVariable(cReplace));
						});

					} else {

						// Split all items per comma
						msgsysReplaceList = cData.replaceList.split(',');
					}

					// Update animation time
					APP.design.msgsys.animTransTime = animationTime;

					// Call msgsys callNextPrev
					APP.design.msgsys.callNextPrev({
						action: 'callMessage',
						replaceList: msgsysReplaceList,
						data: {
							msgName: cData.msgName,
							animation: cData.animation
						}
					});

					// Timeout function before releasing semaphore
					setTimeout(function(){
						releaseSemaphore();
					}, (animationTime + 10));
					break;

				// Close msgsys window
				case 'END_MSGSYS':
					APP.design.msgsys.endMessage(function(){
						releaseSemaphore();
					});
					break;

				// Clear temp variable
				case 'CLEAR_TEMP':
					APP.temp = {};
					releaseSemaphore();
					break;

				// Call list
				case 'CALL_LIST':

					// Execute provided script
					APP.scriptInterpreter.run(cData.listName);

					// Timeout execution
					setTimeout(function(){

						// Check if needs to kill current script
						if (cData.killParent === !0){
							killExecution();
						}

						// Release semaphore
						releaseSemaphore();

					}, 50);
					break;

				// Check if
				case 'CHECK_IF':

					// Variables
					var res,
						evalType = cData.evalType,
						fCondition = APP.tools.getVariable(cData.firstCondition),
						sCondition = cData.secondCondition;

					// Check if needs to get variable for second condition
					if (cData.sGetVar === !0){
						sCondition = APP.tools.getVariable(cData.secondCondition);
					} else {

						// Switch second condition
						switch (cData.secondCondition){

							// If true / false
							case 'true':
								sCondition = !0;
								break;
							case '!0':
								sCondition = !0;
								break;
							case 'false':
								sCondition = !1;
								break;
							case '!1':
								sCondition = !1;
								break;

						}

					}

					// Switch eval type
					switch (evalType){

						// Is equal
						case '==':
							res = fCondition === sCondition;
							break;

						// Not equal
						case '!==':
							res = fCondition !== sCondition;
							break;

						// Is higher than
						case '>':
							res = fCondition > sCondition;
							break;

						// Is lower than
						case '<':
							res = fCondition < sCondition;
							break;

					}

					// Jump to next ELSE / END_IF / END_LIST 
					if (res !== !0){
						activeScripts[scriptName].currentStep = seekEndIf(cOpcode, cIdentifier);
					}

					// Release semaphore
					releaseSemaphore();
					break;

				// Else
				case 'ELSE':

					// Set next step to next end if location
					activeScripts[scriptName].currentStep = seekEndIf(cOpcode, cIdentifier);

					// Release semaphore
					releaseSemaphore();
					break;

				// End if
				case 'END_IF':
					releaseSemaphore();
					break;

				// DEBUG
				case 'DEBUG':
					console.clear();
					console.debug('DEBUG!');
					console.debug(APP);
					console.debug(APP.temp);
					console.debug('Current step: ' + activeScripts[scriptName].currentStep);
					console.debug(activeScripts[scriptName].steps);
					window.alert('DEBUG!\nList name: ' + scriptName);
					break;

				// Jump to
				case 'JUMP_TO':

					// Set current step as label location
					activeScripts[scriptName].currentStep = getLabelPos(cData.labelName);

					// Release semaphore
					releaseSemaphore();
					break;

				// Set label
				case 'SET_LABEL':
					releaseSemaphore();
					break;

				// Set input action
				case 'SET_INPUT_ACTION':

					// Set function
					APP.input.setActionFn(cData.key, function(){
						parseFunctionString(cData.callback)();
					});

					// Release semaphore
					releaseSemaphore();
					break;

				// Set input list
				case 'SET_INPUT_LIST':

					// Check if list length is from main object
					if (cData.listLengthIsFromApp === !0){
						cData.length = APP.tools.getVariable(cData.length);
					}

					// Set input list
					APP.design.input.setList({
						list: cData.list,
						index: cData.index,
						length: cData.length,
						enableOutOfBoundsFn: cData.enableOutOfBoundsFn,

						// Set on start / on end
						onStart: function(){ 
							return parseFunctionString(cData.onStart)();;
						},
						onEnd: function(){
							return parseFunctionString(cData.onEnd)();
						}
					});

					// Release semaphore
					releaseSemaphore();
					break;

				// (sceneManager) Load scene
				case 'SCENEMANAGER_LOAD':

					// Check display mode
					if (cData.displayMode === void 0){
						cData.displayMode = 'block';
					}

					// Check duration
					if (cData.duration === void 0 || cData.duration < 400){
						cData.duration = 400;
					}

					// Check if needs to get next scene from a variable
					if (cData.getNextSceneVar === !0){
						cData.nextScene = APP.tools.getVariable(cData.nextScene);
					}

					// Check next scene
					if (cData.nextScene === void 0){
						cData.nextScene = 'APP_MAIN';
						APP.log.add({mode: 'warn', data: 'WARN - No scene were provided on SCENEMANAGER_LOAD! Loading game list as default!'});
					}

					// Call next scene
					APP.design.sceneManager.loadScene({
						duration: cData.duration,
						nextScene: cData.nextScene,
						nextOpacity: cData.nextOpacity,
						displayMode: cData.displayMode,
						releaseInput: cData.releaseInput,
						callback: function(){
							releaseSemaphore();
						}

					});
					break;

				// Clear all binded actions
				case 'INPUT_CLEAR_ALL':
					APP.input.clearActions();
					releaseSemaphore();
					break;

			}

		}

	}

}