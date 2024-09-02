#########################################################################
### === Variables ===
#########################################################################

# NW.js Version
NWJS_VER="0.91.0"

# SDL Version
SDL_VER="2.30.7"

# Files / dirs to be removed
REM_FILES_DIR_LIST=(
	"sdl2"
	"sdl2.zip"
	"nwjs.tar.gz"
	"nwjs-sdk-v$NWJS_VER-linux-x64"
)


#########################################################################
### === Functions ===
#########################################################################

# Remove files and dirs
removeFilesDirs(){

	# Process remove list
	for entry in "${REM_FILES_DIR_LIST[@]}"
	do

		# Check if file / dir exists. If so, remove it.
		if [ -f $entry ]; then
			echo -e "Removing $entry"
			rm "$entry"
		fi
		if [ -d $entry ]; then
			echo -e "Removing $entry"
			rm -rf "$entry"
		fi

	done

}

#########################################################################
### === Main Script ===
#########################################################################

clear
echo 
echo "  #=============================================================#"
echo 
echo "     fpPS4 Temmie's Launcher - Install Script"
echo "     Written by @themitosan"
echo 
echo "     IMPORTANT: This script requires internet connection and"
echo "     curl, tar and unzip packages installed to work!"
echo 
echo "  #=============================================================#"

echo 
echo "=== Removing possible leftover files / folders"
removeFilesDirs
echo Done!

echo 
echo "=== Downloading nw.js (Ver. $NWJS_VER)"
curl https://dl.nwjs.io/v$NWJS_VER/nwjs-sdk-v$NWJS_VER-linux-x64.tar.gz -o nwjs.tar.gz
echo Done!

echo 
echo "=== Downloading SDL2 (Ver. $SDL_VER)"
curl -L https://github.com/libsdl-org/SDL/releases/download/release-$SDL_VER/SDL2-$SDL_VER-win32-x64.zip -o sdl2.zip
echo Done!

echo 
echo "=== Extracting nw.js"
tar -xvzf nwjs.tar.gz
echo Done!

echo 
echo "=== Extracting SDL2"
unzip -d sdl2 sdl2.zip
echo Done!

echo 
echo "=== Prepare nw.js folder"
cd Nwjs
rm -rf *
echo "" > .gitkeep
cd ..
echo Done!

echo 
echo "=== Checking if Emu folder exists"
if ! [ -d Emu ]; then
	echo "Creating Emu dir..."
	mkdir Emu
fi
echo Done!

echo 
echo "=== Moving files"
mv -f nwjs-sdk-v$NWJS_VER-linux-x64/* Nwjs/
mv -f sdl2/SDL2.dll Emu/
echo Done!

echo 
echo "=== Removing leftover files / folders"
removeFilesDirs
echo Done!

echo 
echo "=== Updating permissions for running / updating launcher (chmod)"
chmod +x launcher.sh
chmod +x update.sh
chmod +x Nwjs/nw
echo Done!

echo 
echo -e "\033[1;32m==== Process Complete! ====\033[0m"
echo '---> In order to start Launcher, run "./launcher.sh"'
echo '---> To update, run "./update.sh"'
echo 
echo 'TIP: You can add "launcher.sh" as a non-steam game on your Steam!'
echo 
echo Also - You will need wine to run fpPS4 on non-windows systems!
echo The installation process may change depending of which distro you are running.
echo 
read -p "Press [ENTER] to exit"
clear