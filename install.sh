clear
echo 
echo "#===========================================================#"
echo 
echo "   fpPS4 Temmie's Launcher - Install Script"
echo "   Written by @themitosan"
echo 
echo "   IMPORTANT: This script requires curl and tar to work!"
echo 
echo "#===========================================================#"

echo 
echo "=== Removing previous files"
rm nwjs.tar.gz
rm -rf nwjs-sdk-v0.86.0-linux-x64
echo Done!

echo 
echo "=== Downloading nwjs"
curl https://dl.nwjs.io/v0.86.0/nwjs-sdk-v0.86.0-linux-x64.tar.gz -o nwjs.tar.gz
echo Done!

echo 
echo "=== Extracting nwjs"
tar -xvzf nwjs.tar.gz
echo Done!

echo 
echo "=== Prepare nwjs folder"
cd Nwjs
rm -rf *
echo "" >> .gitkeep
cd ..
echo Done!

echo 
echo "=== Moving files"
mv -f nwjs-sdk-v0.86.0-linux-x64/* Nwjs/
echo Done!

echo 
echo "=== Removing leftover files"
rm nwjs.tar.gz
rm -rf nwjs-sdk-v0.86.0-linux-x64
echo Done!

echo 
echo "=== Updating permissions for running / updating launcher (chmod)"
chmod +x launcher.sh
chmod +x update.sh
echo Done!

echo 
echo "==== Process Complete! ===="
echo '---> In order to start fpPS4 Temmie's Launcher, run "./launcher.sh" (without quotes)'
echo '---> To update, run "./update.sh" (without quotes)'
echo 
echo 'TIP: You can add "launcher.sh" as a non-steam game on your Steam!'
echo 
echo Also - You will need wine to run fpPS4 on non-windows systems!
echo The installation process may change depending of which distro you are running.
echo 
read -p "Press [ENTER] to exit"