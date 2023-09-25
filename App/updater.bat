::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
::***********************************************************************************::
::																					 ::
::	fpPS4 Temmie's Launcher															 ::
::	updater.bat																		 ::
::																					 ::
::	This little script is responsible for finishing up launcher updater process.	 ::
::																					 ::
::***********************************************************************************::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

@echo off
color a
title Updating file names - Please wait...
echo Updating file names - Please wait...
timeout /t 2 /nobreak
cd ..
del "fpPS4 Temmie's Launcher.exe"
ren "temp.exe" "fpPS4 Temmie's Launcher.exe"
start "" "fpPS4 Temmie's Launcher.exe"
@echo on
exit