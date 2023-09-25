/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		settingsList.js

		This file contains all items to be rendered on settings menu

	***********************************************************************************
*/

temp_SETTINGS_LIST = {

	// Interface
	gui: {

		// Select launcher language
		'changeLanguage': {
			type: 'options',
			labelReplace: ['lang.selected.lang', 'lang.selected.author', 'lang.selected.revision'],
			action: function(){
				APP.design.addErrorClass();
			}
		},

		// Game list modes
		'gameListMode': {
			type: 'options',
			action: function(){
				APP.design.settingsMenu.callQuickSettings({
					menu: 'gui',
					getInfo: !0,
					menuWidth: 34,
					labelName: 'gameListMode',
					settingsName: 'gameListMode',
					options: ['list', 'compact', 'orbis'],
					addBtnClass: 'LABEL_LAUNCHER_SETTINGS_SCALE_MODE'
				});
			}
		},

		// Display clock at top-right corner
		'guiDisplayClock': {
			type: 'checkbox',
			target: 'settings.data.guiDisplayClock'
		},

		// Change scheme colors
		'changeSchemeColors': {
			type: 'options',
			action: function(){
				APP.design.addErrorClass();
			}
		},

		// Game list search mode
		'gameListSearchMode': {
			type: 'options',
			action: function(){
				APP.design.settingsMenu.callQuickSettings({
					menu: 'gui',
					getInfo: !0,
					menuWidth: 26,
					labelName: 'gameListSearchMode',
					settingsName: 'gameListSearchMode',  
					options: ['Title ID', 'Title Name'], 
					addBtnClass: 'LABEL_LAUNCHER_SETTINGS_SCALE_MODE'
				});
			}
		}

	},

	// Video options
	graphics: {

		// Change launcher screen res.
		'changeScreenRes': {
			type: 'options',
			labelReplace: ['settings.data.screenWidth', 'settings.data.screenHeight'],
			action: function(){
				APP.design.settingsMenu.graphics.changeScreenRes();
			}
		},

		// Start launcher on fullscreen mode
		'startLauncherFullscreen': {
			type: 'checkbox',
			target: 'settings.data.bootFullscreen'
		},

		// Toggle fullscreen mode
		'toggleFullscreenMode': {
			type: 'options',
			action: function(){
				APP.design.toggleFullscreen();
			}
		},

		// Change launcher screen scaling mode
		'changeLauncherScaleMode': {
			type: 'options',
			labelReplace: ['settings.data.screenScaleMode'],
			action: function(){
				APP.design.settingsMenu.callQuickSettings({
					getInfo: !0,
					menu: 'graphics',
					options: ['transform', 'zoom'],
					settingsName: 'screenScaleMode',
					labelName: 'changeLauncherScaleMode',
					addBtnClass: 'LABEL_LAUNCHER_SETTINGS_SCALE_MODE'
				});
			}
		},

		// Cache all images on boot process
		'cacheImgaesOnBoot': {
			type: 'checkbox',
			target: 'settings.data.cacheImgaesOnBoot'
		}

	},

	// Paths
	paths: {

		// fpPS4 Path
		'emuPath': {
			type: 'options',
			labelReplace: ['settings.data.fpPS4_Path'],
			action: function(){
				APP.design.settingsMenu.paths.selectEmuPath();
			},
			onFocus: function(){
				APP.design.settingsMenu.rightSetInputDefault();
			}
		},

		// Default games path
		'defaultGamesPath': {
			type: 'options',
			action: function(){
				APP.design.addErrorClass();
			},
			onFocus: function(){
				APP.design.settingsMenu.rightSetInputDefault();
			}
		},

		// Add game path
		'addGamePath': {
			type: 'options',
			addMainLabelClass: 'display-flex-center',
			action: function(){
				APP.design.settingsMenu.paths.addPath();
			},
			onFocus: function(){
				APP.design.settingsMenu.rightSetInputDefault();
			}
		}

	},

	// fpPS4 Options (emuOptions)
	emuOptions: {

		// Start fpPS4 on fullscreen mode
		'startEmuFullscreen': {
			type: 'checkbox',
			target: 'settings.data.fpPS4_enableFullScreen'
		}

	},

	// Input
	input: {

		// Change icon style
		'iconStyle': {
			type: 'options',
			action: function(){
				APP.design.settingsMenu.callQuickSettings({
					getInfo: !0, 
					menu: 'input', 
					menuWidth: 22,
					labelName: 'iconStyle',
					settingsName: 'input_iconStyle', 
					options: APP.settings.availableInputIcons
				});
			}
		},

		// Enable GamePad rumble 
		'enableLauncherGamepadRumble': {
			type: 'checkbox',
			target: 'settings.data.input_enableRumbleLauncher'
		}

	},

	// Updater
	updater: {

		// Enable fpPS4 Updates
		'enableEmuUpdates': {
			type: 'checkbox',
			target: 'settings.data.enableEmuUpdates'
		},

		// Enable launcher updates
		'enableLauncherUpdates': {
			type: 'checkbox',
			target: 'settings.data.enableLauncherUpdates'
		},

		// Use nightly.link
		'useNightlyLink': {
			type: 'checkbox',
			target: 'updaterEnableNightlyLink'
		},

		// Force update fpPS4
		'forceUpdateEmu': {
			type: 'options',
			action: function(){
				APP.design.addErrorClass();
			}
		},

		// Force update Launcher
		'forceUpdateLauncher': {
			type: 'options',
			action: function(){
				APP.design.addErrorClass();
			}
		},

		// Check for launcher updates
		'checkUpdatesLauncher': {
			type: 'options',
			action: function(){
				APP.design.addErrorClass();
			}
		},

		// Check for fpPS4 updates
		'checkUpdatesEmu': {
			type: 'options',
			action: function(){
				APP.scriptInterpreter.run('updater_checkForUpdates');
			}
		},

		// Select fpPS4 Branch
		'selectEmuBranch': {
			type: 'options',
			labelReplace: ['settings.data.fpPS4_branch'],
			action: function(){
				APP.design.settingsMenu.updater.changeBranch();
			}
		},

		// Browse latest actions
		'browseLatestActions': {
			type: 'options',
			action: function(){
				APP.design.addErrorClass();
			}
		},

		// Display current version info
		'displayCurrentVersionInfo': {
			type: 'options',
			labelReplace: ['settings.emuCommitShaSmall'],
			action: function(){
				APP.design.addErrorClass();
			}
		}

	},

	// Accessibility
	accessibility: {

		// Increment interface size
		'guiZoomScale': {
			type: 'options',
			action: function(){
				APP.design.settingsMenu.accessibility.callGuiZoomScale();
			}
		}

	},

	// Misc.
	misc: {

		// Reset launcher settings
		'resetLauncherSettings': {
			type: 'options',
			action: function() {
				APP.design.addErrorClass();
			}
		},

		// Reset game settings
		'resetGameSettings': {
			type: 'options',
			action: function(){
				APP.design.addErrorClass();
			}
		},

		// Reload launcher
		'reloadLauncher': {
			type: 'options',
			action: function(){
				APP.design.settingsMenu.misc.reloadLauncher();
			}
		}

	}

}