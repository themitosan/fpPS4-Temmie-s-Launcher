/*
	***********************************************************************************

		fpPS4 Temmie's Launcher
		aboutScreen.js

		This file contains all data / functions required to assemble about screen 

	***********************************************************************************
*/

temp_ABOUTSCREEN = {

	/*
		Functions
	*/

	// Process link list
	makeLinkList: function(arr){

		// Final HTML
		var res = '';

		// Process article list
		arr.forEach(function(cItem, cIndex){

			// Check if need to break line
			var breakLine = '<br>';
			if (cIndex === (arr.length - 1)){
				breakLine = '';
			}

			// Create entry
			res = res + '<a href="' + arr[cIndex].url + '" title="' + arr[cIndex].name + '" target="_blank">' +
						arr[cIndex].name + '</a>' + breakLine;

		});

		// End
		return res;

	},

	// Generate about screen
	make: function(){

		try {

			// Variables
			var appPath = APP.settings.appPath,

				// Plugin list
				pluginList = [
					{author: 'Rob--', name: 'memoryjs', urlAuthor: 'https://github.com/rob--', urlPlugin: 'https://github.com/rob--/memoryjs'},
					{author: 'Antelle', name: 'node-stream-zip', urlAuthor: 'https://github.com/antelle/', urlPlugin: 'https://github.com/antelle/node-stream-zip'},
					{author: 'TemmieHeartz <sup>(Hi!)</sup>', name: 'TMS.js', urlAuthor: 'https://github.com/temmieheartz/', urlPlugin: 'https://github.com/temmieheartz/TMS.js'}
				],

				// Plugin icon list
				pluginIconList = [
					{name: 'TMS.js', imgSrc: 'tmsjs.webp', url: 'https://github.com/temmieheartz/TMS.js'},
					{name: 'memoryjs', imgSrc: 'memoryjs.webp', url: 'https://github.com/rob--/memoryjs'}
				],

				// Original translation (up to 1.2.1)
				legacyTranslationsDb = {
					'en-us': {author: 'TemmieHeartz',	 url: 'https://github.com/temmieheartz/', revisors: {'ArbestRi': 'https://github.com/ArbestRi'}},
					'pt-br': {author: 'TemmieHeartz',	 url: 'https://github.com/temmieheartz/', revisors: null},
					'fr-fr': {author: 'Mizmalik',		 url: 'https://github.com/Mizmalik', revisors: null},
					'zh-s':  {author: 'nini2P',			 url: 'https://github.com/nini22P', revisors: null},
					'it-it': {author: 'B8nee',			 url: 'https://github.com/B8nee', revisors: null},
					'ja-ja': {author: 'mktm235',		 url: 'https://github.com/mktm235', revisors: null},
					'nl-nl': {author: 'MrSn0wy', 		 url: 'https://github.com/MrSn0wy)', revisors: null},
					'ru-ru': {author: 'ThatSameGuy', 	 url: null, revisors: {'gandalfthewhite': 'https://github.com/gandalfthewhite19890404', 'ArtemVideoGames': 'https://github.com/ArtemVideoGames'}},
					'uk-ua': {author: 'ArtemVideoGames', url: 'https://github.com/ArtemVideoGames', revisors: {'ThatSameGuy': null}},
				},

				// Articles used as refence
				articlesList = [
					{name: 'You Might Not Need jQuery', url: 'http://youmightnotneedjquery.com/'},
					{name: 'Param.sfo - PS4 Developer wiki', url: 'https://www.psdevwiki.com/ps4/Param.sfo'},
					{name: 'TemmieHeartz - R3ditor V2 (R3V2) API', url: 'https://github.com/temmieheartz/R3ditor-V2'},
					{name: 'CSS-Tricks - Strip HTML Tags in JavaScript', url: 'https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/'},
					{name: 'Microsoft - [MS-ERREF]: NTSTATUS Values', url: 'https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-erref/596a1078-e883-4972-9bbc-49e60bebca55'},
					{name: 'W3schools - How To Create a Draggable HTML Element', url: 'https://www.w3schools.com/howto/howto_js_draggable.asp'}
				],

				// Icons used on this project
				iconsUsedList = [
					{name: 'SVG Repo - Free SVG Vectors and Icons', url: 'https://www.svgrepo.com/'},
					{name: 'Explore HD Transparent PNGs & Cliparts, Free Unlimited Download - PngFind', url: 'https://www.pngfind.com/'},
					{name: 'ClipartMax - PNG Clipart Free Download, Largest Transparent Clip Art Images Collection', url: 'https://www.clipartmax.com/'},
					{name: 'Free controllers and Keyboard Prompts by Nicolae (Xelu) Berbece (Those Awesome Guys)', url: 'https://thoseawesomeguys.com/prompts/'}
				],

				// Top HTML
				topHtml = '<img class="IMG_ABOUT_ICON" src="img/icon.webp" alt="appLogo"/><br><label class="LABEL_TITLE"><label class="LABEL_FPPS4_COLOR">' +
						  'fp</label>PS4 Temmie\'s Launcher</label><br><div class="text-small">' + APP.lang.getVariable('aboutScreen_createdBy') +
						  ' <label id="LABEL_showMeTheTruth">TemmieHeartz</label><br>' + APP.lang.getVariable('aboutScreen_version') + ': ' + APP.appVersion +
						  '</div></div>';

			/*
				Plugins
			*/

			// HTML Base
			var pluginsHtml = '<br>' + APP.lang.getVariable('aboutScreen_plugins') + '<br><div class="text-small">';

			// Process plugin list
			pluginList.forEach(function(cPlugin, cIndex){

				// Check if need to insert break line
				var breakLine = '<br>';
				if (cIndex === (pluginList.length - 1)){
					breakLine = '';
				}

				// Create entry
				pluginsHtml = pluginsHtml + '<a href="' + pluginList[cIndex].urlPlugin + '" target="_blank">' + pluginList[cIndex].name + '</a> - ' + APP.lang.getVariable('aboutScreen_pluginCreatedBy') +
							  ' <a href="' + pluginList[cIndex].urlAuthor + '" target="_blank">' + pluginList[cIndex].author + '</a>' + breakLine;

			});

			// Close div and prepare to generate plugin icon list
			pluginsHtml = pluginsHtml + '</div><br><div class="text-align-center">';

			// Process plugin icon list
			pluginIconList.forEach(function(cPlugin, cIndex){

				// Create icon
				pluginsHtml = pluginsHtml + '<a href="' + pluginIconList[cIndex].url + '" title="' + pluginIconList[cIndex].name + '" target="_blank"><img src="img/' + pluginIconList[cIndex].imgSrc + '"' +
							  ' alt="ABOUT_PLUGIN_ICON_' + pluginIconList[cIndex].name + '" class="ABOUT_PLUGIN_ICON" /></a>';

			});

			// Close div
			pluginsHtml = pluginsHtml + '</div>';

			/*
				Original translation
			*/

			// HTML Base
			var legacyTranslationsArray = Object.keys(legacyTranslationsDb),
				legacyTranslationsHtml = '<br>' + APP.lang.getVariable('aboutScreen_legacyTranslations') + '<br><div class="text-small">';

			// Process legacy translations list
			legacyTranslationsArray.forEach(function(cLanguage, cIndex){

				// Variables
				var revisors = '',
					breakLine = '<br>',
					langData = legacyTranslationsDb[cLanguage],
					authorUrl = '<a href="' + langData.url + '" target="_blank">' + langData.author + '</a>';

				// Check if is latest entry
				if (cIndex === (legacyTranslationsArray.length - 1)){
					breakLine = '';
				}

				// Check if author has url
				if (langData.url === null){
					authorUrl = langData.author;
				}

				// Check if had revisors
				if (langData.revisors !== null){

					// Set initial label
					revisors = ' (' + APP.lang.getVariable('aboutScreen_legacyTranslations_revisors');

					// Process revisions
					Object.keys(langData.revisors).forEach(function(cRevisor, revIndex){

						// Check if isn't latest revision
						var comma = ', ';
						if (revIndex === (Object.keys(langData.revisors).length - 1)){
							comma = '';
						}

						// Append revision
						if (langData.revisors[cRevisor] !== null){
							revisors = revisors + '<a href="' + langData.revisors[cRevisor] + '" target="_blank">' + cRevisor + '</a>' + comma;
						} else {
							revisors = revisors + cRevisor + comma;
						}

					});

					// Append closing parenthesis
					revisors = revisors + ')';

				}

				// Create entry
				legacyTranslationsHtml = legacyTranslationsHtml + APP.lang.getVariable('aboutScreen_legacyTranslations_' + cLanguage) + ': ' + authorUrl +
										 revisors + breakLine;

			});

			// Close div
			legacyTranslationsHtml = legacyTranslationsHtml + '</div>';

			/*
				2.0.0 Translations - [WIP]
			*/

			/*
				Articles used as reference
			*/
			var articlesHtml = '<br>' + APP.lang.getVariable('aboutScreen_articlesUsedAsReference') + '<br><div class="text-small text-align-left">' +
							  APP.design.about.makeLinkList(articlesList) + '</div>',
			/*
				External icons used on this project
			*/
				externalIconsHtml = '<br>' + APP.lang.getVariable('aboutScreen_externalIconsUsed') + '<br><div class="text-small text-align-left">' +
									APP.design.about.makeLinkList(iconsUsedList) + '</div>',

			/*
				Special Thanks
			*/
				specialThanksHtml = '<br><div class="text-align-center text-small"><i>' + APP.lang.getVariable('aboutScreen_specialThanksTo') + ': ' +
									'ShoMatsuiEx, RedKween, Sherry Winters, red_prig, Kimieggie, B8ne, elon, addy,<br>sceGnmMapComputeQueueEnjoyer, gandalfthewhite, ' +
									'<label class="text-underline">My secret fan<!-- Hi sweetite ;) --></label> ' + APP.lang.getVariable('aboutScreen_specialThanksTo_disc') +
									'</i><br><br>' + APP.lang.getVariable('aboutScreen_specialThanksTo_closing') + '</div><br>',

			/*
				Closing
			*/
				closingInfo = '<div class="text-align-center text-small"><b>' + APP.lang.getVariable('aboutScreen_important') + '</b>: ' + APP.lang.getVariable('bootWarnInfo') +
							  '</div>';

			/*
				End
			*/

			// Make final HTML
			const finalHtml = topHtml + pluginsHtml + legacyTranslationsHtml + articlesHtml + externalIconsHtml + specialThanksHtml + closingInfo;

			// Set HTML on design formList
			APP.design.formList['about'] = finalHtml;

			// End
			return 0;

		} catch (err) {

			// Log error
			throw new Error(err);

		}

	}

}