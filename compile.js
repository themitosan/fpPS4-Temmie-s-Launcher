/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		compile.js

		This file is responsible for compiling fpPS4 Temmie's Launcher rewrite.
		
		IMPORTANT: This file is suposed to run on nodejs - not on nwjs or any
		browser.

	***********************************************************************************
*/

module.exports = {

	// Get JSON files
	packageJson: require('./package.json'),

	// Compiler data
	nwFlavor: void 0,
	nwVersion: void 0,
	projectVersion: void 0,

	// Require modules
	fs: require('fs'),
	nwBuilder: require('nw-builder'),

	// Start compiler
	run: function(){

		// Get main data
		var date = new Date,
			packageJson = this.packageJson,
			buildHash = this.fs.readFileSync('hash.inc', 'utf-8'),
			nwPackageJson = JSON.parse(this.fs.readFileSync('App/package.json', 'utf-8')),

			// Get run data
			nwFlavor = this.nwFlavor;
			nwVersion = this.nwVersion;
			projectVersion = this.projectVersion;

		// Update nw package.json data
		nwPackageJson.hash = buildHash;
		nwPackageJson.name = packageJson.name;
		nwPackageJson.version = this.projectVersion;

		// Write new package.json file
		this.fs.writeFileSync('App/package.json', JSON.stringify(nwPackageJson), 'utf-8');
		this.fs.unlinkSync('hash.inc');

		// Log data
		console.info('INFO - Running compiler\n\nVersion: ' + this.nwVersion + '\nFlavor: ' + this.nwFlavor + '\n\npackage.json: ');
		console.info(nwPackageJson);

		// Setup nw-builder
		const compileData = new this.nwBuilder({

			// Main metadata
			appName: packageJson.name,
			appVersion: packageJson.version,

			// Running mode
			zip: !0,
			arch: 'x64',
			mode: 'build',
			srcDir: './App/',
			ourDir: './Build/',
			files: './App/**/**',
			platforms: ['win64'],

			// Set flavor and version
			flavor: nwFlavor,
			version: nwVersion,

			// Windows settings
			winIco: './App/img/icon.ico',
			winVersionString: {
				'ProductName': packageJson.name,
				'CompanyName': packageJson.author,
				'ProductShortName': packageJson.name,
				'CompanyShortName': packageJson.author,
				'FileDescription': packageJson.description,
				'LegalCopyright': '2022, ' + date.getFullYear() + ' - TheMitoSan',
				'FileVersion': 'Ver. ' + packageJson.version + ', nwjs: ' + nwVersion
			}

		});

		try {

			// Run nw-builder, create hash file and log success
			compileData.build();
			this.fs.writeFileSync('hash.inc', '', 'utf8');
			console.info('\n--- PROCESS COMPLETE ---\n');

		} catch (err) {

			// Display error
			throw new Error(err);

		}

	}

}