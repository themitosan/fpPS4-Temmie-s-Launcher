/*
	***********************************************************************************

		fpPS4 Temmie's launcher
		exec.js

		This file contains all functions related to spawning processes or running
		external software

		Many thanks to red_prig for sharing Microsoft NTSTATUS Values database

	***********************************************************************************
*/

temp_EXEC = {

	/*
		Exec variables
	*/

	// Microsoft NTSTATUS Values database
	exitCodeList: temp_NTSTATUS,

	// Executable output
	outputData: '',

	// Exit code
	lastExitCode: 0,

	// Exit code data
	exitStatus: {id: '', desc: ''},

	/*
		Exec functions
	*/

	// Kill process
	killProcess: function(processName){

		if (processName !== void 0 && processName !== ''){

			// Check if fpPS4 process is active
			var processExeName = APP.path.parse(processName).base,
				getEmuProcessData = APP.getProcessInfo(processExeName);

			// If found fpPS4 process, try killing it
			if (getEmuProcessData !== void 0){

				try {
					process.kill(getEmuProcessData.th32ProcessID);
				} catch (err) {
					throw new Error('ERROR - (emumanager) Unable to close ' + processExeName + ' process!\n' + err);
				}

			}

		}

	},

	// Process executable output data
	processStdOutput: function(args){

		// Variables
		var data = args.data, 
			mode = args.mode, 
			brFix = args.brFix, 
			printLog = args.printLog,
			pData = data.toString().split('\n');

		// Check if can print log
		if (printLog === !0){

			// Fix lines
			if (brFix === !0){
				pData.forEach(function(line){

					// Check each line
					if (line !== '' && line !== '\n' && '\r' && line.replace(RegExp(' ', 'gi'), '') !== ''){

						// Log line
						console[mode](line);

						// If fpPS4 is running, check each line
						if (APP.emumanager.emuRunning === !0){
							APP.exec.processEmuOutput(line);
						}

					}

				});
			} else {
				console[mode](data);
			}

		}

		// End
		return data;

	},

	// Process fpPS4 output
	processEmuOutput: function(str){

		// Check if current line is a nop function
		if (str.slice(0, 8) === 'nop nid:'){

			// Update emu options fade color
			TMS.css('APP_EMU_OPTIONS_FADE', {'background-color': '#400b'});

			// Push error to list
			APP.emumanager.emuErrorList.push(str.replace('\r', ''));

		}

	},

	/*
		Run external process

			data: [Object]
				exe: 		  String   - Path (or name of executable)
				args: 		  Array    - List of arguments to include to main exec
				isEmu: 		  Boolean  - Declare if is fpPS4 running a game
				printLog: 	  Boolean  - Print log on console if window mode is disabled
				useLogWindow: Boolean  - If true, output data from process will be rendered on a external window
				callback: 	  Function - Function to be executed after process is closed 
	*/
	run: function(data){

		// Check if executable is present
		if (data.exe !== void 0 && data.exe !== ''){

			// Check for missing data
			if (data['isEmu'] === void 0){
				data['isEmu'] = !1;
			}
			if (data['args'] === void 0){
				data['args'] = [];
			}
			if (data['useLogWindow'] === void 0){
				data['useLogWindow'] = !0;
			}
			if (data['printLog'] === void 0){
				data['printLog'] = !0;
			}

			// Reset sdt data
			APP.exec.execOutputData = '';

			// Change context path to current emu folder
			process.chdir(APP.path.parse(data.exe).dir);

			// If is fpPS4
			if (data.isEmu === !0){
				data['exe'] = APP.path.parse(APP.settings.data.fpPS4_Path).base;
			}

			// Run external window
			if (data.useLogWindow === !0){

				// Window state
				var winMode, pressAnyKey = '';
				switch (APP.settings.data.logWindowMode){

					// Normal
					case 'normal':
						winMode = '';
						break;

					// Maximized
					case 'max':
						winMode = '/MAX ';
						break;

					// Minimized
					case 'min':
						winMode = '/MIN ';
						break;

				}

				// Ask user to press any key
				if (APP.settings.data.logPauseOnExitProcess === !0){
					pressAnyKey = ' ^& pause';
				}

				// Transform args into string
				var gPath = '\"' + data.args[data.args.indexOf('-e') + 1] + '\"',
					parseArgs = data.args.toString().replace(RegExp(',', 'gi'), ' ').replace(data.args[data.args.indexOf('-e') + 1], gPath),
					execLine = 'start ' + winMode + 'cmd /C ' + data.exe + ' ' + parseArgs + pressAnyKey;

				// Exec process
				APP.exec['processData'] = APP.childProcess.exec(execLine);

			} else {

				// Log on window console
				APP.exec['processData'] = APP.childProcess.spawn(APP.tools.fixPath(data.exe), data.args, {detached: !0});

				// Set stream as string (UTF-8)
				APP.exec.processData.stdout.setEncoding('utf8');
				APP.exec.processData.stderr.setEncoding('utf8');

				// Log on stdout and stderr
				APP.exec.processData.stdout.on('data', function(stData){
					APP.exec.outputData = APP.exec.outputData + APP.exec.processStdOutput({ data: stData, mode: 'info', brFix: data.isEmu, printLog: data.printLog });
				});
				APP.exec.processData.stderr.on('data', function(stData){
					APP.exec.outputData = APP.exec.outputData + APP.exec.processStdOutput({ data: stData, mode: 'error', brFix: data.isEmu, printLog: data.printLog });
				});

			}

			// Log on close
			APP.exec.processData.on('close', function(code){

				// Reset chdir
				process.chdir(APP.settings.nwPath);

				// Log exit code
				APP.log.add({data: 'INFO - (exec) ' + APP.path.parse(data.exe).name + ' was closed with exit code ' + code});

				// Get exit code data
				const errData = APP.exec.exitCodeList[code];

				// Return error code
				if (code !== 0 && errData !== void 0){
					console.error('ERROR - ' + errData.id + ' (' + code + ')\n' + errData.desc);
				}

				// Remove module
				delete APP.exec['processData'];

				// Set exec exit code
				APP.exec.lastExitCode = code;

				// Set exit status
				if (errData !== void 0){
					APP.exec.exitStatus.id = errData.id;
					APP.exec.exitStatus.desc = errData.desc;
				}

				// If was fpPS4 running a title, close emu options
				if (data.isEmu === !0){
					APP.emumanager.stop();
				}

				// Execute callback
				if (data.callback !== void 0 && typeof data.callback === 'function'){
					data.callback(code);
				}

				// Reset fpPS4 error list
				APP.emumanager.emuErrorList = [];

				// Return exit code
				return code;

			});

		}

	}

}

// Delete
delete temp_NTSTATUS;