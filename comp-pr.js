/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		comp-pr.js

		This file is responsible for compiling fpPS4 Temmie's Launcher rewrite for
		Pull Requests (PR).

		IMPORTANT: This file is suposed to run on node - not on nwjs or any browser.

	***********************************************************************************
*/

// Get compiler
var COMPILER = require('./compile.js');

// Set values
COMPILER.nwFlavor = 'sdk';
COMPILER.nwVersion = '0.72.0';
COMPILER.projectVersion = '2.0.0';

// Start process
COMPILER.run();