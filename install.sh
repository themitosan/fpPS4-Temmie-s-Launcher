#########################
### === Variables === ###
#########################

# Text formatting
color_red=$(tput setaf 1)
color_green=$(tput setaf 2)
color_orange=$(tput setaf 3)
color_blue=$(tput setaf 4)
color_cyan=$(tput setaf 6)
color_yellow=$(tput setaf 11)
text_reset=$(tput sgr0)
text_bold=$(tput bold)

# NW.js Version
NWJS_VER="0.117.0"

# SDL Version
SDL_VER="2.30.7"

# Files / dirs to be removed
REM_FILES_DIR_LIST=(
	"sdl2"
	"sdl2.zip"
	"nwjs.tar.gz"
	"nwjs-sdk-v$NWJS_VER-linux-x64"
)

#########################
### === Functions === ###
#########################

# Remove files and dirs
function removeFilesDirs(){

	for entry in "${REM_FILES_DIR_LIST[@]}"
	do

		printf "===> Removing $entry"
		if [ -f $entry ]; then
			rm "$entry"
		fi
		if [ -d $entry ]; then
			rm -rf "$entry"
		fi

	done

}

# Finish setup process
function finishInstallProcess(){
	
	printf "\n${text_green}==== ${text_bold}Process Complete!${text_reset}${text_green} ====${text_reset}\n\n"
	printf "===> In order to start Launcher, run \"./launcher.sh\""
	printf "===> To update, run \"./update.sh\"\n"
	printf "TIP: You can add "launcher.sh" as a non-steam game on your Steam!\n\n"
	printf "Also - You will need wine to run fpPS4 on non-windows systems!\nThe installation process may change depending of which distro you are running.\n\n"
	read -p "Press [${text_green}${text_bold}ENTER${text_reset}] to exit"
	clear
	exit 0

}

# Display main logo
function displayMainLogo(){

	clear
	printf "  #=============================================================#\n\n"
	printf "     fpPS4 Temmie's Launcher - Install Script\n"
	printf "     Written by @themitosan\n\n"
	printf "     IMPORTANT: This script requires internet connection and\n"
	printf "     curl, tar and unzip packages installed to work!\n\n"
	printf "  #=============================================================#\n"

}

# Print current status
function updateStatus(){
	printf "\n===> $1"
}

# Print process complete message
function printProcessCompleteMsg(){
	printf "\n[${text_green}${text_bold}INFO${text_reset}] Process Complete!\n"
}

###########################
### === Main Script === ###
###########################

displayMainLogo

updateStatus "Removing possible leftover files / folders"
removeFilesDirs
printProcessCompleteMsg

updateStatus "Downloading NW.js (Ver. $NWJS_VER)"
curl https://dl.node-webkit.org/v$NWJS_VER/nwjs-sdk-v$NWJS_VER-linux-x64.tar.gz -o nwjs.tar.gz
printProcessCompleteMsg

updateStatus "Downloading SDL2 (Ver. $SDL_VER)"
curl -L https://github.com/libsdl-org/SDL/releases/download/release-$SDL_VER/SDL2-$SDL_VER-win32-x64.zip -o sdl2.zip
printProcessCompleteMsg

updateStatus "Extracting NW.js"
tar -xvzf nwjs.tar.gz
printProcessCompleteMsg

updateStatus "Extracting SDL2"
unzip -d sdl2 sdl2.zip
printProcessCompleteMsg

updateStatus "Prepare NW.js folder"
cd Nwjs
rm -rf *
touch .gitkeep
cd ..
printProcessCompleteMsg

updateStatus "Checking if Emu folder exists"
if ! [ -d Emu ]; then
	printf "Creating Emu dir..."
	mkdir Emu
fi
printProcessCompleteMsg

updateStatus "Moving files"
mv -f nwjs-sdk-v$NWJS_VER-linux-x64/* Nwjs/
mv -f sdl2/SDL2.dll Emu/
printProcessCompleteMsg

updateStatus "Removing leftover files / folders"
removeFilesDirs
printProcessCompleteMsg

updateStatus "Updating permissions for running / updating launcher (chmod)"
chmod +x launcher.sh
chmod +x update.sh
chmod +x Nwjs/nw
printProcessCompleteMsg

finishInstallProcess