/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	paramSfoDatabase.js

	This is a simple database used to identify extracted content from PARAM.SFO
	files.

	Article used as reference:
	https://www.psdevwiki.com/ps4/Param.sfo
	******************************************************************************
*/

temp_PARAMSFO_DATABASE = {

	DB_APP_TYPE: {
		0: 'Not specified',
		1: 'Paid Standalone Full App',
		2: 'Upgradable App',
		3: 'Demo App',
		4: 'Freemium App'
	},

	DB_CATEGORY: {
		'ac': 	'Additional Content',
		'bd': 	'Blu-ray Disc?',
		'gc': 	'Game Content',
		'gd': 	'Game Digital Application',
		'gda': 	'System Application',
		'gdb': 	'Unknown',
		'gdc': 	'Non-Game Big Application',
		'gdd': 	'BG Application',
		'gde': 	'Non-Game Mini App / Video Service Native App',
		'gdk': 	'Video Service Web App',
		'gdl': 	'PS Cloud Beta App',
		'gdO': 	'PS2 Classic',
		'gp': 	'Game Application Patch',
		'gpc': 	'Non-Game Big App Patch',
		'gpd': 	'BG Application patch',
		'gpe': 	'Non-Game Mini App Patch / Video Service Native App Patch',
		'gpk': 	'Video Service Web App Patch',
		'gpl': 	'PS Cloud Beta App Patch',
		'sd': 	'Save Data',
		'la': 	'License Area',
		'wda': 	'Unknown'
	}

}