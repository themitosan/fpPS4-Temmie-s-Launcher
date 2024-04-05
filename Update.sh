stty -echo
clear
echo 
echo "Updating fpPS4 Temmie's Launcher - Please Wait..."
echo "IMPORTANT: Make sure to have git installed on your OS / Distro!"
echo 
git reset --hard
git pull
stty echo
exit
