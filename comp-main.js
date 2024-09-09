/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		comp-main.js

		This file is responsible for compiling fpPS4 Temmie's Launcher rewrite for 
		main releases.

		IMPORTANT: This file is suposed to run on node - not on nwjs or any browser.

	***********************************************************************************
*/

// Get compiler
var COMPILER = require('./compile.js');

// Set values and start process
COMPILER.nwFlavor = 'normal';
COMPILER.nwVersion = '0.91.0';
COMPILER.projectVersion = '2.0.0';
COMPILER.run();