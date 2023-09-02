/*
	******************************************************************************
	fpPS4 Temmie's Launcher
	settings.js

	This file is contains all functions / variables related to settings menu
	and Launcher's look, behavior and more.
	******************************************************************************
*/

temp_SETTINGS = {
	
	// Settings list
	data: {

		/*
			General
		*/

		// App Version
		launcherVersion: '',

		// Language
		appLanguage: 'english',

		// Remove previous imported modules
		removedLibModules: !1,

		// Paths
		nwPath: '',
		emuPath: '',
		gamePath: '',

		// Run fpPS4 on fullscreen
		enableEmuFullscreen: !1,

		// Enable / Disable PARAM.SFO support
		enableParamSfo: !0,

		// Log External window
		logExternalWindowPrompt: !0,
		logExternalWindowStartMode: 'normal',

		/*
			GUI
		*/

		// Zoom scale
		guiZoomScale: 1,

		// Game list
		showBgOnEntry: !0,
		showPathEntry: !0,
		gameListMode: 'compact',

		// Emu running
		showPathRunning: !0,
		showGuiMetadata: !0,

		// Game search mode (appName or titleId)
		gameSearchMode: 'appName',
		searchCaseSensitive: !1,

		// Background Opacity
		bgEmuOpacity: 0.6,
		bgListOpacity: 0.7,

		// Background Blur
		bgEmuBlur: 6,
		bgListBlur: 2,

		// (Grid)
		gridIconSize: 116,
		gridBorderRadius: 8,

		/*
			fpPS4 Update
		*/
		latestCommitSha: '',
		enableEmuUpdates: !0,
		fpps4selectedCI: 'CI',
		fpps4BranchName: 'trunk',

		/*
			Debug
		*/
		debugTestLog: !1

	},

	magic: `LkRJVl9MSVNULC5ESVZfTE9He3RyYW5zaXRpb246LjJzO3Bvc2l0aW9uOmFic29sdXRlfS5ESVZfTElTVF9JTlRFUk5BTCwuRElWX09QVElPTlN7dHJhbnNpdGlvbjouMXM7cG9zaXRpb246YWJzb2x1dGV9Ym9keSxodG1se2NvbG9yOiNmZmY7b3ZlcmZsb3c6aGlkZGVuO3VzZXItc2VsZWN0Om5vbmU7Zm9udC1mYW1pbHk6bW9ub3NwYWNlO3Njcm9sbC1iZWhhdmlvcjpzbW9vdGg7YmFja2dyb3VuZC1jb2xvcjojMGYxZTNlO3RleHQtc2hhZG93OjJweCAycHggNHB4ICMwMDB9Y29kZXtwYWRkaW5nOjZweDtjb2xvcjojNmJkNWY1O2ZvbnQtc3R5bGU6bm9ybWFsO2JvcmRlci1yYWRpdXM6NnB4O2JhY2tncm91bmQtY29sb3I6IzAwMH1pbnB1dFt0eXBlPWJ1dHRvbl0saW5wdXRbdHlwZT1jaGVja2JveF0sc2VsZWN0e291dGxpbmU6MDtjdXJzb3I6cG9pbnRlcn1pbnB1dFt0eXBlPXJhbmdlXXtvdXRsaW5lOjA7bWFyZ2luLWxlZnQ6NnB4O2N1cnNvcjpjb2wtcmVzaXplfWlucHV0W2Rpc2FibGVkPWRpc2FibGVkXSxpbnB1dFtkaXNhYmxlZF17Y3Vyc29yOm5vLWRyb3B9aW5wdXRbdHlwZT1jaGVja2JveF17bWFyZ2luLXJpZ2h0OjhweDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9aW1ney13ZWJraXQtdXNlci1kcmFnOm5vbmV9Ojotd2Via2l0LXNjcm9sbGJhcnt3aWR0aDo4cHg7aGVpZ2h0OjhweDtib3JkZXItcmFkaXVzOjRweH06Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNre2JvcmRlci1yYWRpdXM6NHB4O21hcmdpbjo2cHggMH0uRElWX1RJVExFLC5TRVBBUkFUT1JfMDB7bWFyZ2luLXRvcDoxMHB4O21hcmdpbi1ib3R0b206MTBweH06Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JvcmRlci1yYWRpdXM6NHB4O2JhY2tncm91bmQ6I2U3ZTdlN30uQlROX2Rpc3BsYXlNb2RlLC5ESVZfTE9HLC5ESVZfU0VUVElOR1NfQkd7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXJ9LkFQUF9MT0csLkJUTl9kaXNwbGF5TW9kZSwuRElWX0xPRywuRElWX1NFVFRJTkdTX0JHe2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdH06Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVye2JvcmRlci1yYWRpdXM6NHB4O2JhY2tncm91bmQ6I2YwZjBmMH06Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmFjdGl2ZXtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyLXJhZGl1czo0cHh9LlNFUEFSQVRPUl8wMHtoZWlnaHQ6MnB4O3BhZGRpbmctbGVmdDoycHg7cGFkZGluZy1yaWdodDoycHg7Ym9yZGVyLXJhZGl1czo2cHg7d2lkdGg6Y2FsYygxMDAlIC0gNHB4KTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDAwO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNmZmYsIzY2NjEsIzAwMDApfS5ESVZfQUNUSU9OUywuRElWX0xJU1QsLkRJVl9MT0d7d2lkdGg6MTAwJTtsZWZ0OjB9LkRJVl9MSVNUe3RvcDozOHB4O3otaW5kZXg6MjA7b3ZlcmZsb3c6aGlkZGVuO2JhY2tncm91bmQtY29sb3I6IzE2MmE1MDtoZWlnaHQ6Y2FsYygxMDAlIC0gMjAycHgpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDE0NmRlZywjMDkwZjFiLCMxNjJhNTApfS5ESVZfTE9He2JvdHRvbTowO2hlaWdodDoxNjRweDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7YmFja2dyb3VuZC1zaXplOmF1dG8gNTAlO2JhY2tncm91bmQtaW1hZ2U6dXJsKCdpbWcvbG9nby5wbmcnKX0uRElWX0dBTUVMSVNUX0JHLC5HQU1FX0VOVFJZX0JHe2JhY2tncm91bmQtc2l6ZTpjb3Zlcjtwb3NpdGlvbjphYnNvbHV0ZTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXR9LkRJVl9BQ1RJT05Te3RvcDowO2hlaWdodDoyMnB4O3BhZGRpbmc6OHB4O2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6bm93cmFwO3Bvc2l0aW9uOmFic29sdXRlO2FsaWduLWl0ZW1zOmNlbnRlcjthbGlnbi1jb250ZW50OmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCMyODQ2N2YsIzFjMzI1Zil9LkRJVl9PUFRJT05Te3RvcDozOHB4O3JpZ2h0OjA7cGFkZGluZzo2cHg7d2lkdGg6MjY4cHg7ZGlzcGxheTpub25lO2hlaWdodDpjYWxjKDEwMCUgLSAxNTBweCk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMGRlZywjMTYyYTUwLCMyYTRhODYpfS5ESVZfR0FNRV9PUFRJT05Te3dpZHRoOjI2OHB4O2JvdHRvbTo2OHB4O2ZvbnQtc2l6ZToxNHB4O292ZXJmbG93OmF1dG87cG9zaXRpb246YWJzb2x1dGU7dGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OmNhbGMoMTAwJSAtIDEyOHB4KX0uRElWX0hBQ0tfTElTVHt0ZXh0LWFsaWduOmxlZnQ7bWFyZ2luLWJvdHRvbToxMHB4fS5ESVZfTElTVF9HUklELC5ESVZfVElUTEV7ei1pbmRleDoxMDt0ZXh0LWFsaWduOmNlbnRlcn0uRElWX1RJVExFe2ZvbnQtc2l6ZToyOHB4O2ZvbnQtd2VpZ2h0OjcwMH0uRElWX0xJU1RfSU5URVJOQUx7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7ei1pbmRleDoxMDtoZWlnaHQ6MTAwJTtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6IzAwMDB9LkRJVl9MSVNUX0dSSUR7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2FsaWduLWl0ZW1zOmNlbnRlcjtmbGV4LWRpcmVjdGlvbjpyb3c7YWxpZ24tY29udGVudDpzdHJldGNoO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LkdBTUVfRU5UUlksLkdBTUVfRU5UUllfQ09NUEFDVHtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOm5vd3JhcDthbGlnbi1jb250ZW50OmNlbnRlcn0uRElWX0dBTUVMSVNUX0JHe3RvcDotNnB4O2xlZnQ6LTZweDt6LWluZGV4OjE7YmFja2dyb3VuZC1jb2xvcjojMDAwNjt3aWR0aDpjYWxjKDEwMCUgKyAxMnB4KTtoZWlnaHQ6Y2FsYygxMDAlICsgMTJweCk7YmFja2dyb3VuZC1ibGVuZC1tb2RlOnNjcmVlbjtmaWx0ZXI6Ymx1cigycHgpIG9wYWNpdHkoLjcpfS5HQU1FX0VOVFJZe21hcmdpbjo2cHg7aGVpZ2h0Ojc4cHg7Y3Vyc29yOnBvaW50ZXI7b3ZlcmZsb3c6aGlkZGVuO21heC1oZWlnaHQ6NzhweDtwYWRkaW5nLWxlZnQ6MDtib3JkZXItcmFkaXVzOjZweDthbGlnbi1pdGVtczpjZW50ZXI7d2lkdGg6Y2FsYygxMDAlIC0gMTJweCk7Ym94LXNoYWRvdzowIDAgNHB4ICMwMDA7YmFja2Ryb3AtZmlsdGVyOmJsdXIoNHB4KSBpbnZlcnQoMC4xKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg5MGRlZywjM2E0YjZiODIsIzAwMDApfS5HQU1FX0VOVFJZOmhvdmVye2JveC1zaGFkb3c6MCAwIDEwcHggIzAwMDY7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcsIzNhNGI2YiwjM2E0YjZiODIpfS5HQU1FX0VOVFJZOmFjdGl2ZXtiYWNrZHJvcC1maWx0ZXI6c2VwaWEoMC41KSBibHVyKDZweCk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCM5N2E3ZmY4NSwjNjQ2NGE1NzgpfS5HQU1FX0VOVFJZX0NPTVBBQ1R7YWxpZ24taXRlbXM6Y2VudGVyO2ZsZXgtZGlyZWN0aW9uOnJvdzttYXgtaGVpZ2h0OjI0cHghaW1wb3J0YW50O3BhZGRpbmctbGVmdDoxMHB4IWltcG9ydGFudDt3aWR0aDpjYWxjKDEwMCUgLSAyMnB4KSFpbXBvcnRhbnR9LkdBTUVfRU5UUllfR1JJRHt6LWluZGV4OjEyO3BhZGRpbmc6MDtkaXNwbGF5OnRhYmxlO2JveC1zaGFkb3c6bm9uZTtib3JkZXItcmFkaXVzOjhweDttaW4td2lkdGg6OTIuOTNweDttaW4taGVpZ2h0OjkyLjkzcHg7aGVpZ2h0Om1heC1jb250ZW50O21heC13aWR0aDptYXgtY29udGVudDttYXgtaGVpZ2h0Om1heC1jb250ZW50O2JhY2tncm91bmQtY29sb3I6IzAwMDA7dGV4dC1hbGlnbjotd2Via2l0LXJpZ2h0fS5ESVZfUlVOX0JUTiwuRElWX1NFVFRJTkdTe3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOmFic29sdXRlfS5HQU1FX0VOVFJZX0dSSUQ6aG92ZXJ7YW5pbWF0aW9uLWR1cmF0aW9uOjRzO2FuaW1hdGlvbi1uYW1lOmdyaWRHYW1lRm9jdXM7YW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDppbmZpbml0ZX0uR0FNRV9FTlRSWV9CR3t0b3A6MDtsZWZ0OjA7ei1pbmRleDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ZmlsdGVyOmJsdXIoNHB4KTstd2Via2l0LW1hc2staW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCMwMDA2LCMwMDAwLCMwMDAwKX0uR0FNRV9FTlRSWTpmb2N1cyAuR0FNRV9FTlRSWV9CRywuR0FNRV9FTlRSWTpob3ZlciAuR0FNRV9FTlRSWV9CR3tmaWx0ZXI6Ymx1cigzcHgpOy13ZWJraXQtbWFzay1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcsIzAwMGMsIzAwMDIsIzAwMDApfS5HQU1FX0VOVFJZOmFjdGl2ZSAuR0FNRV9FTlRSWV9CR3std2Via2l0LW1hc2staW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCMwMDAsIzAwMDYsIzAwMDApfS5HQU1FX0RFVEFJTFN7ei1pbmRleDoxO2N1cnNvcjpwb2ludGVyO3dpZHRoOmNhbGMoMTAwJSAtIDg4cHgpfS5HQU1FX0RFVEFJTFNfQ09NUEFDVHt3aWR0aDpjYWxjKDEwMCUgLSAxMHB4KX0uR0FNRV9ERVRBSUxTX0dSSUR7cmlnaHQ6MDtib3R0b206MDtwb3NpdGlvbjphYnNvbHV0ZTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDBhO3BhZGRpbmc6MnB4IDZweDtiYWNrZHJvcC1maWx0ZXI6Ymx1cig0cHgpO3RleHQtc2hhZG93OjAgMCA0cHggIzAwMDtib3JkZXItcmFkaXVzOjZweCAwIDB9LkRJVl9SVU5fQlROe2JvdHRvbTo4cHg7d2lkdGg6Y2FsYygxMDAlIC0gMTJweCl9LkRJVl9HQU1FX0RFVEFJTFN7ei1pbmRleDoxMDA7aGVpZ2h0OjI1NnB4O3BhZGRpbmc6MTJweDtkaXNwbGF5Om5vbmU7dHJhbnNpdGlvbjoxcztvdmVyZmxvdzpoaWRkZW47ZmxleC13cmFwOm5vd3JhcDtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItcmFkaXVzOjZweDthbGlnbi1pdGVtczpjZW50ZXI7dG9wOmNhbGMoNTAlIC0gMTQwcHgpO2xlZnQ6Y2FsYygxMCUgLSAyNHB4KTt3aWR0aDpjYWxjKDgwJSAtIDI0cHgpO2p1c3RpZnktY29udGVudDpjZW50ZXI7bWF4LXdpZHRoOmNhbGMoODAlIC0gMjRweCl9LkRJVl9HQU1FX0RFVEFJTFNfTEFCRUxTe21hcmdpbi1sZWZ0OjI0cHh9LkRJVl9TRVRUSU5HU3t0b3A6MTAlO2xlZnQ6NSU7d2lkdGg6OTAlO3otaW5kZXg6MTA7aGVpZ2h0OjgwJTtkaXNwbGF5OmJsb2NrO292ZXJmbG93OmhpZGRlbjtib3JkZXItcmFkaXVzOjEwcHg7Ym94LXNoYWRvdzowIDAgMzBweCAjMDAwYTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgxODBkZWcsIzJmNDA1ZiwjMTMxZjM4KX0uRElWX1NFVFRJTkdTX0JHLC5ESVZfU0VUVElOR1NfSE9MREVSe3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlfS5ESVZfU0VUVElOR1NfQkd7ei1pbmRleDowO2JhY2tncm91bmQtc2l6ZTphdXRvIDUwJTtib3gtc2hhZG93OjAgMCAxMHB4ICMwMDAyIGluc2V0O2JhY2tncm91bmQtaW1hZ2U6dXJsKCdpbWcvbG9nby5wbmcnKX0uRElWX1NFVFRJTkdTX0hPTERFUnt6LWluZGV4OjEwMDtkaXNwbGF5Om5vbmU7YmFja2dyb3VuZC1jb2xvcjojMDAwNDtiYWNrZHJvcC1maWx0ZXI6Ymx1cig0cHgpIGdyYXlzY2FsZSgwLjQpfS5ESVZfU0VUVElOR1NfTElTVHt6LWluZGV4OjEwO3BhZGRpbmc6OHB4O292ZXJmbG93OmF1dG87Zm9udC1zaXplOjE0cHg7dGV4dC1hbGlnbjpsZWZ0O21hcmdpbi1sZWZ0OjhweDttYXJnaW4tYm90dG9tOjhweDtib3JkZXItcmFkaXVzOjRweDtmb250LWZhbWlseTpzYW5zLXNlcmlmO2JhY2tncm91bmQtY29sb3I6IzExMWQ7d2lkdGg6Y2FsYygxMDAlIC0gMzJweCk7aGVpZ2h0OmNhbGMoMTAwJSAtIDE0NnB4KTtiYWNrZHJvcC1maWx0ZXI6Ymx1cig0cHgpO2JveC1zaGFkb3c6MCAwIDEwcHggIzAwMDY7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCMwMDBlMmNhYiwjMDAwMCl9LkRJVl9zZXR0aW5nc0VudHJ5e3BhZGRpbmc6MnB4O292ZXJmbG93OmhpZGRlbjtmb250LXN0eWxlOml0YWxpY30uRElWX3NldHRpbmdzRW50cnlGbGV4e2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWNvbnRlbnQ6Y2VudGVyfS5ESVZfc2V0dGluZ3NIMntmb250LXNpemU6MjBweDtmb250LXdlaWdodDo2MDA7Zm9udC1mYW1pbHk6c3lzdGVtLXVpO21hcmdpbjowIDAgOHB4IDJweH0uRElWX3NldHRpbmdzU2F2ZXt3aWR0aDoxMDAlO3otaW5kZXg6MTA7cG9zaXRpb246YWJzb2x1dGU7dGV4dC1hbGlnbjpjZW50ZXJ9LkRJVl9sYWJlbFNlbGVjdGVkR2FtZXtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7dGV4dC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206NHB4O2FsaWduLWNvbnRlbnQ6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LkRJVl9zZWxlY3RlZEdhbWVTdGF0dXN7d2lkdGg6MTE0cHg7Y3Vyc29yOmhlbHA7ZGlzcGxheTpmbGV4O292ZXJmbG93OmhpZGRlbjttYXgtd2lkdGg6MTE0cHg7bWF4LWhlaWdodDo0MnB4O21hcmdpbi1sZWZ0OjRweDtmb250LXNpemU6c21hbGw7ZmxleC13cmFwOm5vd3JhcDthbGlnbi1pdGVtczpjZW50ZXI7ZmxleC1kaXJlY3Rpb246cm93O2JvcmRlci1yYWRpdXM6MTBweDthbGlnbi1jb250ZW50OmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7anVzdGlmeS1jb250ZW50OmNlbnRlcjtwYWRkaW5nOjRweCAwO3RleHQtc2hhZG93OjFweCAxcHggMnB4ICMwMDB9LkRJVl9GUFBTNF9VUERBVEVSLC5ESVZfbm9HYW1lRm91bmR7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTthbGlnbi1jb250ZW50OmNlbnRlcjt0b3A6MDtsZWZ0OjA7cG9zaXRpb246YWJzb2x1dGV9LkRJVl9JQ09OX1NUQVRVU19PS3tiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgxODBkZWcsIzBmMCwjMGIwKX0uRElWX0lDT05fU1RBVFVTX1dBUk57Ym9yZGVyLXJhZGl1czoycHg7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCNmYmU4MDAsIzlmOGQwYyl9LkRJVl9JQ09OX1NUQVRVU19IQntib3JkZXItcmFkaXVzOjNweCA4cHg7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCM2M2ZkZjYsIzI4YjFhYil9LkRJVl9ub0dhbWVGb3VuZHtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7Zm9udC1zaXplOngtbGFyZ2U7Zm9udC1zdHlsZTppdGFsaWM7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7dGV4dC1zaGFkb3c6MCAwIDEwcHggcmVkO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNmMDAyLCMwMDAwKX0uRElWX2xhdW5jaGVyT3B0aW9uc3ttYXJnaW46OHB4IDB9LkRJVl9sYXVuY2hlck9wdGlvbnNQYXRjaFZlcnNpb25NZXRhZGF0YXt0ZXh0LWFsaWduOmxlZnQ7cGFkZGluZzowIDZweH0uRElWX2xhdW5jaGVyT3B0aW9uc1RpdGxle2ZvbnQtc2l6ZToxNnB4O3RleHQtYWxpZ246Y2VudGVyO21hcmdpbi1ib3R0b206MnB4O2ZvbnQtZmFtaWx5OnN5c3RlbS11aX0uRElWX0ZQUFM0X1VQREFURVJ7ei1pbmRleDoxMTA7Y3Vyc29yOndhaXQ7ZGlzcGxheTpub25lO3RyYW5zaXRpb246LjRzO2ZsZXgtd3JhcDpub3dyYXA7YWxpZ24taXRlbXM6Y2VudGVyO2ZsZXgtZGlyZWN0aW9uOnJvdztmb250LWZhbWlseTpzeXN0ZW0tdWk7anVzdGlmeS1jb250ZW50OmNlbnRlcjtiYWNrZHJvcC1maWx0ZXI6Ymx1cig0cHgpO2JhY2tncm91bmQtY29sb3I6IzAzMDMzMTQ0fS5ESVZfUFJPR1JFU1NCQVJ7d2lkdGg6NzIlO2hlaWdodDoxMHB4O2N1cnNvcjp3YWl0O292ZXJmbG93OmhpZGRlbjttYXJnaW4tdG9wOjQ0cHg7Ym9yZGVyLXdpZHRoOjFweDtwb3NpdGlvbjphYnNvbHV0ZTtib3JkZXItc3R5bGU6c29saWQ7YmFja2dyb3VuZC1jb2xvcjojYzVjNWM1YWR9LkRJVl9QUk9HUkVTU0JBUl9JTlRFUk5BTHt0b3A6MDtsZWZ0OjA7d2lkdGg6MCU7aGVpZ2h0OjEwMCU7dHJhbnNpdGlvbjouNHM7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoOTBkZWcsI2NjYywjZmZmKX0uRElWX0RFU0lHTl9MSU5FU3tsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MXB4O3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6I2ZmZmJ9LkxJTkVfVE9Qe3RvcDoxMiV9LkxJTkVfQk9UVE9Ne2JvdHRvbToxMiV9LklNR19HQU1FX0lDT057ei1pbmRleDoxO3dpZHRoOjY2cHg7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLXJhZGl1czo2cHg7bWFyZ2luOjZweCAxMHB4IDZweCA2cHg7Ym94LXNoYWRvdzowIDAgMTBweCAjMDAwNn0uSU1HX0FQUF9JQ09Oe3dpZHRoOjI1NnB4O2JvcmRlci1yYWRpdXM6NnB4O2JveC1zaGFkb3c6MCAwIDEwcHggIzAwMH0uSU1HX0dSSUR7d2lkdGg6MTE2cHg7aGVpZ2h0OmF1dG87cGFkZGluZzowO21heC13aWR0aDo1MTJweDttaW4td2lkdGg6OTIuOTNweDtib3JkZXItcmFkaXVzOjA7bWFyZ2luOjAgMCAtM3B4fS5CVE5fbGF1bmNoZXJPcHRpb25ze3dpZHRoOjk2JTtwYWRkaW5nLXRvcDo0cHg7cGFkZGluZy1ib3R0b206NHB4O21hcmdpbjoycHggMH0uQlROX2FjdGlvbnMsLkJUTl9kaXNwbGF5TW9kZXttYXJnaW4tbGVmdDoycHg7bWFyZ2luLXJpZ2h0OjJweH0uQlROX2FjdGlvbnN7aGVpZ2h0OjI4cHg7bWF4LWhlaWdodDoyOHB4fS5CVE5fZGlzcGxheU1vZGV7d2lkdGg6MzJweDtoZWlnaHQ6MzJweDttaW4td2lkdGg6MzJweDtib3JkZXI6aW5pdGlhbDttaW4taGVpZ2h0OjMycHg7Ym9yZGVyLXJhZGl1czo0cHg7YmFja2dyb3VuZC1zaXplOjY1JX0uQlROX2Rpc3BsYXlNb2RlX25vcm1hbHttYXJnaW4tbGVmdDo4cHg7YmFja2dyb3VuZC1pbWFnZTp1cmwoJ2ltZy9zdmcvbGlzdC1maWxsZWQtc3ZncmVwby1jb20uc3ZnJyl9LkJUTl9kaXNwbGF5TW9kZV9jb21wYWN0e2JhY2tncm91bmQtaW1hZ2U6dXJsKCdpbWcvc3ZnL3ZpZXctbGlzdC1zdmdyZXBvLWNvbS5zdmcnKX0uQlROX2Rpc3BsYXlNb2RlX2dyaWR7bWFyZ2luLXJpZ2h0OjhweDtiYWNrZ3JvdW5kLWltYWdlOnVybCgnaW1nL3N2Zy9hcHAtbWVudS1zdmdyZXBvLWNvbS5zdmcnKX0uSU5QVVRfZ2FtZUxpc3RTZWFyY2h7d2lkdGg6MTk1cHg7bWFyZ2luOjAgMTZweDtib3JkZXI6bm9uZTtvdXRsaW5lOjA7Y29sb3I6I2ZmZmI4ZTt0ZXh0LWFsaWduOmNlbnRlcjtmb250LWZhbWlseTptb25vc3BhY2U7YmFja2dyb3VuZC1pbWFnZTpub25lO2JhY2tncm91bmQtY29sb3I6IzAwMDA7cGFkZGluZzoxMnB4IDAgMTJweCA2cHh9LklOUFVUX2dhbWVMaXN0U2VhcmNoOmZvY3Vze2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDkwZGVnLCMwMDAwLCMzNjE4NWViMCwjMDAwMCl9LkFQUF9MT0d7Y29sb3I6IzBmMDtyZXNpemU6bm9uZTtib3JkZXI6bm9uZTtjdXJzb3I6dGV4dDtvdXRsaW5lOjA7cGFkZGluZzo2cHg7d2lkdGg6Y2FsYygxMDAlIC0gMTJweCk7aGVpZ2h0OmNhbGMoMTAwJSAtIDEycHgpO2JhY2tkcm9wLWZpbHRlcjpibHVyKDEuNHB4KTt0ZXh0LXNoYWRvdzoycHggMnB4IDJweCAjMDAwO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDE4MGRlZywjMDUwNTBlZTgsIzAxMDExNGM3KX0uQlROX1JVTiwuQlROX1NBVkV7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCNmZmYsI2NjYyk7Zm9udC1zaXplOjE4cHh9LkJUTl9SVU57aGVpZ2h0OjUwcHg7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czo2cHg7d2lkdGg6Y2FsYygxMDAlIC0gNnB4KX0uQlROX1JVTjphY3RpdmUsLkJUTl9TQVZFOmFjdGl2ZXtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgwZGVnLCNmZmYsI2NjYyl9LkJUTl9TVE9Qe21hcmdpbjowIDRweDtwYWRkaW5nOjVweCAzMHB4fS5CVE5fU0FWRXtib3JkZXI6bm9uZTttaW4td2lkdGg6MzAwcHg7bWluLWhlaWdodDo2MHB4O2JvcmRlci1yYWRpdXM6NnB4fS5CVE5fc2VsZWN0UGF0aCwuU0VMRUNUX3NldHRpbmdze2JvcmRlci1yYWRpdXM6NHB4O2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDE4MGRlZywjZmZmLCNiYmIpO2ZvbnQtc3R5bGU6aXRhbGljfS5CVE5fc2VsZWN0UGF0aHtmbG9hdDpyaWdodDttaW4td2lkdGg6MTIwcHg7cGFkZGluZzo0cHggMTRweH0uQlROX3NlbGVjdFBhdGg6YWN0aXZle2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDBkZWcsI2ZmZiwjYmJiKX0uU0VMRUNUX3NldHRpbmdze21hcmdpbi1sZWZ0OjRweDttYXJnaW4tYm90dG9tOjRweDtwYWRkaW5nOjRweCAxMHB4fS5TRVRUSU5HU19URVhUe2NvbG9yOiMwZjA7Ym9yZGVyOm5vbmU7b3V0bGluZTowO21pbi13aWR0aDoxNjBweDttYXJnaW4tbGVmdDo0cHg7Ym9yZGVyLXJhZGl1czo0cHg7YmFja2dyb3VuZC1jb2xvcjojMDAwO2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTtwYWRkaW5nOjZweCAwIDZweCA2cHh9LkxBQkVMX2dhbWVUaXRsZU9wdGlvbnN7d2lkdGg6MTAwJTtmb250LXNpemU6MThweDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LWZhbWlseTpzeXN0ZW0tdWl9LkxBQkVMX21vbm9zcGFjZSwuTEFCRUxfc2V0dGluZ3NQYXRoe2ZvbnQtZmFtaWx5Om1vbm9zcGFjZX0uTEFCRUxfZGV0YWlsc0dhbWVOYW1le2ZvbnQtc2l6ZToyOHB4O21hcmdpbi10b3A6MTBweDtmb250LXdlaWdodDo3MDA7bWFyZ2luLWJvdHRvbToxMHB4fS5MQUJFTF9jaGVja2JveHtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MTRweDtmb250LXN0eWxlOml0YWxpY30uTEFCRUxfZW11Q29sb3J7Y29sb3I6I2ZmZmI4ZX0uTEFCRUxfZ2FtZVRpdGxle2ZvbnQtc2l6ZToyMHB4O2N1cnNvcjpwb2ludGVyfS5MQUJFTF9nYW1lVGl0bGVDb21wYWN0e2ZvbnQtc2l6ZToxNnB4O2N1cnNvcjpwb2ludGVyfS5MQUJFTF9zZXR0aW5nc1BhdGh7Y3Vyc29yOnRleHQ7cG9zaXRpb246c3RpY2t5O2ZvbnQtc3R5bGU6aW5pdGlhbDt1c2VyLXNlbGVjdDphbGwhaW1wb3J0YW50fS5MQUJFTF9zZXR0aW5nc0V4cGVyaW1lbnRhbHtwYWRkaW5nOjZweDtjdXJzb3I6cG9pbnRlcjtmb250LWZhbWlseTptb25vc3BhY2U7YmFja2dyb3VuZC1jb2xvcjojMDAwO3RleHQtc2hhZG93OjAgMCAxMHB4IHJlZH0uTEFCRUxfRkxFWF9NQVJHSU57bWFyZ2luOjRweH1Aa2V5ZnJhbWVzIGhpbnRHYW1lRm9jdXN7MCUsMTAwJSw1MCV7Ym94LXNoYWRvdzowIDAgMCAjMDAwMH0yNSV7Ym94LXNoYWRvdzowIDAgMTBweCAjZmZmNn03NSV7Ym94LXNoYWRvdzowIDAgMTRweCAjZmZmYX19QGtleWZyYW1lcyBncmlkR2FtZUZvY3VzezAlLDEwMCV7Ym94LXNoYWRvdzowIDAgNnB4ICM2Y2E3ZmZkMX0yNSV7Ym94LXNoYWRvdzowIDAgMTBweCAjYjZjMGU1YWF9NTAle2JveC1zaGFkb3c6MCAwIDEwcHggIzZjYTdmZmQxfTc1JXtib3gtc2hhZG93OjAgMCAxNHB4ICNiNmMwZTVhYX19LmZsb2F0LXJpZ2h0e2Zsb2F0OnJpZ2h0fS5hbGlnbi1jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9LnVzZXItY2FuLXNlbGVjdHtjdXJzb3I6dGV4dDt1c2VyLXNlbGVjdDphbGwhaW1wb3J0YW50fS5ub25le2Rpc3BsYXk6bm9uZX0=`,

	// Load settings
	load: function(){

		// Get launcher main dir before settings load
		var updateSettings = !1,
			nwPath = APP.tools.fixPath(nw.__dirname),
			settingsPath = nwPath + '/Settings.json';

		// Create save
		if (APP.fs.existsSync(settingsPath) === !1){
			APP.settings.save();
		}

		try {

			// Read settings file
			var loadSettings = JSON.parse(APP.fs.readFileSync(settingsPath, 'utf8'));
			
			// Check for obsolete settings
			Object.keys(loadSettings).forEach(function(cSettings){

				if (APP.settings.data[cSettings] === void 0){
					delete loadSettings[cSettings];
					updateSettings = !0;
				}

			});

			// Fix new settings data
			Object.keys(this.data).forEach(function(cSettings){

				if (loadSettings[cSettings] === void 0){
					loadSettings[cSettings] = APP.settings.data[cSettings];
					updateSettings = !0;
				}

			});

			// Load settings
			this.data = loadSettings;

			// Check if need to update settings file
			if (updateSettings === !0){
				APP.log(APP.lang.getVariable('infoSettingsUpdated'));
				APP.settings.save();
			}

			// Fix path
			this.data.nwPath = APP.tools.fixPath(nw.__dirname);

		} catch (err) {

			console.error(APP.lang.getVariable('settingsLoadError', [err]));

		}

	},

	// Save settings
	save: function(){
		
		// Get launcher main dir before settings load
		const nwPath = APP.tools.fixPath(nw.__dirname);

		// Include current launcher version on settings
		this.data.launcherVersion = APP.packageJson.version;

		try {
			APP.fs.writeFileSync(nwPath + '/Settings.json', JSON.stringify(this.data), 'utf8');
		} catch (err) {
			console.error(APP.lang.getVariable('settingsSaveError', [err]));
		}

	},

	// Load selected language
	loadLang: function(){

		try {

			// Get lang data
			var cLang = this.data.appLanguage,
				fileLocation = APP.settings.data.nwPath + '/Lang/' + cLang + '.json';

			// Check if lang file exists and if lang isn't english
			if (cLang !== 'english' && APP.fs.existsSync(fileLocation) === !0){

				// Get selected lang
				var getLangFile = APP.fs.readFileSync(fileLocation, 'utf8');
				APP.lang.selected = JSON.parse(getLangFile);

			} else {

				// Set english as default lang
				APP.lang.selected = APP.lang.english;			
			
			}

			// Update GUI
			APP.design.updateLang();

		} catch (err) {

			console.error(err);

		}	

	},

	// Check paths
	checkPaths: function(){

		var logMessage = '',
			mainPath = this.data.nwPath,
			pathList = ['/Emu', '/Games', '/Lang'];

		// Try create required paths
		pathList.forEach(function(cPath){

			if (APP.fs.existsSync(mainPath + cPath) !== !0){

				try {
					APP.fs.mkdirSync(mainPath + cPath);
				} catch (err) {
					APP.log(APP.lang.getVariable(settingsErrorCreatePath, [mainPath + cPath, err]));
				}
				
			}

		});

		// Set Games / Emu paths and check if both exists
		if (this.data.gamePath === '' && APP.fs.existsSync(this.data.gamePath) === !1){
			APP.settings.data.gamePath = mainPath + '/Games';
		}

		// fpPS4 path
		if (this.data.emuPath === '' || APP.fs.existsSync(this.data.emuPath) === !1){
			APP.settings.data.emuPath = mainPath + '/Emu/fpPS4.exe';
		}

		// If fpPS4 is not found, reset latest commit sha and request update 
		if (APP.fs.existsSync(this.data.emuPath) !== !0){

			// Set flag to skip update check on window.onload
			APP.emuManager.update.skipLoadingCheck = !0;
			
			this.data.latestCommitSha = '';
			APP.emuManager.update.check();
			
		}

		// If latestCommitSha isn't empty, log it
		if (this.data.latestCommitSha !== ''){
			APP.log(APP.lang.getVariable('settingsLogEmuSha', [APP.settings.data.latestCommitSha.slice(0, 7)]));
		}

		// Log message
		APP.log(logMessage);

	},	

	// Select path
	selectPath: function(data){

		APP.fileManager.selectPath(function(newGamePath){
			document.getElementById(data.label).innerHTML = newGamePath;
			APP.settings.data[data.settings] = newGamePath;
			APP.settings.save();
			APP.gameList.load();
		});

	},

	// Select file
	selectFile: function(data){

		APP.fileManager.selectFile(data.extension, function(newEmuPath){
			document.getElementById(data.label).innerHTML = newEmuPath;
			APP.settings.data[data.settings] = newEmuPath;
			APP.settings.save();
			APP.gameList.load();
		});

	},

	// Set display mode from buttons
	setDisplayMode: function(cMode){
		
		if (cMode !== void 0){
			
			// Update display mode
			this.data.gameListMode = cMode;
			
			// Clear previous search
			document.getElementById('INPUT_gameListSearch').value = '';

			// Render GUI
			APP.design.renderSettings(!0);
			APP.design.renderGameList({displayLog: !1});

		}

	},

	// Reset all game settings
	resetAllGameSettings: function(){

		// Confirm action
		const conf = window.confirm(APP.lang.getVariable('settingsConfirmRemoveAllGameSettings'));
		if (conf === !0){

			// Reset search form
			document.getElementById('INPUT_gameListSearch').value = '';

			// Get game list
			var cMessage = '',
				gList = Object.keys(APP.gameList.list);

			// Check if user has games and apps
			if (gList.length !== 0){

				// Process game list
				gList.forEach(function(cGame){

					// Check if settings file exists
					if (APP.fs.existsSync(APP.path.parse(APP.gameList.list[cGame].exe).dir + '/launcherSettings.json') === !0){

						try {

							APP.fs.unlinkSync(APP.path.parse(APP.gameList.list[cGame].exe).dir + '/launcherSettings.json');
							cMessage = APP.lang.getVariable('settingsRemovedGameSettings', [APP.gameList.list[cGame].name]);

						} catch (err) {

							cMessage = APP.lang.getVariable('settingsRemoveGameSettingsError', [APP.gameList.list[cGame].name, err]);
							console.error(err);

						}

					} else {

						// Unable to find settings file
						cMessage = APP.lang.getVariable('settingsRemoveGameSettings404', [APP.gameList.list[cGame].name]);

					}

					// Log status
					APP.log(cMessage);

				});

				// Process complete
				window.alert(APP.lang.getVariable('infoProcessComplete'));

			}

		}

	}

}