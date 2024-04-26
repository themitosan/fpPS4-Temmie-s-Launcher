#########################################################################

### === Variables ===
### In order to update this file with more ease, just update those 
### variables below

### nw.js version
NWJS_VER="0.87.0"

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
echo "=== Removing previous files"
rm nwjs.tar.gz
rm sdl2.zip
rm -rf "nwjs-sdk-v$NWJS_VER-linux-x64"
rm -rf sdl2
echo Done!

echo 
echo "=== Downloading nwjs"
curl https://dl.nwjs.io/v$NWJS_VER/nwjs-sdk-v$NWJS_VER-linux-x64.tar.gz -o nwjs.tar.gz
echo Done!

echo 
echo "=== Downloading SDL2"
curl -L https://github.com/libsdl-org/SDL/releases/download/release-2.30.2/SDL2-2.30.2-win32-x64.zip -o sdl2.zip
echo Done!

echo 
echo "=== Extracting nwjs"
tar -xvzf nwjs.tar.gz
echo Done!

echo 
echo "=== Extracting SDL2"
unzip -d sdl2 sdl2.zip
echo Done!

echo 
echo "=== Prepare nwjs folder"
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
rm nwjs.tar.gz
rm sdl2.zip
rm -rf nwjs-sdk-v$NWJS_VER-linux-x64
rm -rf sdl2
echo Done!

echo 
echo "=== Updating permissions for running / updating launcher (chmod)"
chmod +x launcher.sh
chmod +x update.sh
chmod +x Nwjs/nw
echo Done!

echo 
echo "==== Process Complete! ===="
echo '---> In order to start Launcher, run "./launcher.sh"'
echo '---> To update, run "./update.sh"'
echo 
echo 'TIP: You can add "launcher.sh" as a non-steam game on your Steam!'
echo 
echo Also - You will need wine to run fpPS4 on non-windows systems!
echo The installation process may change depending of which distro you are running.
echo 
read -p "Press [ENTER] to exit"