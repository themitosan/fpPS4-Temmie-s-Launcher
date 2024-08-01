<h1 align="center">
	<img src="App/img/logo.png" width="140" alt="fpPS4_TL_Logo"><br>
	fpPS4 Temmie's Launcher
</h1>

Created by [TheMitoSan](https://github.com/themitosan) <sup>_(Previously known as **Temmie**Heartz)_</sup>, This is a simple launcher created for [fpPS4](https://github.com/red-prig/fpPS4) compatibility layer.

<p align="center">
	<img src="App/img/banner.jpg" width="750">
</p><br>

## How to install

### Windows

#### Stable Version

- Download latest release _(you can get it [here](https://github.com/themitosan/fpPS4-Temmie-s-Launcher/releases))_
- Extract all files on your desired location
- Run `launcher.exe`

#### Latest Features (recommended)

- [Download / Clone this repo](https://github.com/themitosan/fpPS4-Temmie-s-Launcher/archive/refs/heads/main.zip)
- Download [nw.js](https://dl.nwjs.io/v0.70.1/nwjs-sdk-v0.70.1-win-x64.zip) version `0.70.1`
- Extract all files from `nw` on `Nwjs` folder
- Run `launcher.bat`

### Linux
> [!WARNING]\
> Running fpPS4 / Launcher on a Non-Windows OS <u>**isn't the best way / recommended to test / use this software!**</u> The main compatibility layer is being developed to <u>**run only on Windows**</u>. In order to run fpPS4, you will need [Wine](https://www.winehq.org) installed - <ins>but be aware that it may result in **less performance with bugs / glitches**</ins>.

[Click here to know how to install Wine](https://wiki.winehq.org/Download)

#### Release Version

- Download latest release _(you can get it [here](https://github.com/themitosan/fpPS4-Temmie-s-Launcher/releases))_
- Extract all files on your desired location
- Run `chmod +x launcher.sh && ./launcher.sh`

#### Installer Method (recomended)

> [!IMPORTANT]\
> Make sure to have `curl`, `tar` and `unzip` packages installed on your system!
- [Download / Clone this repo](https://github.com/themitosan/fpPS4-Temmie-s-Launcher/archive/refs/heads/main.zip)
- To run installer script, run `chmod +x install.sh && ./install.sh` 

### Manual Installation

- [Download / Clone this repo](https://github.com/themitosan/fpPS4-Temmie-s-Launcher/archive/refs/heads/main.zip)
- Download latest [nw.js](https://nwjs.io/) version
- Extract all files from `nw` on `Nwjs` folder
- Open terminal on main project path and run `chmod +x ./launcher.sh`

In order to start, run `./launcher.sh`

## General Tips

- You can add `launcher.sh` as a *non-steam game* in your **Steam**!
- You can hide a specific title to show on list by appending `!` before folder name _(Example: `!Apollo Save Tool`)_
- If you want to update launcher and have `git` installed, run these commands below:

```
git reset --hard
git pull origin main
```

### How to import your dumps
You can see all required procedures on main [fpPS4 discord server](https://discord.gg/up9qatpX7M).

## External plugins used on this project
- [memoryjs](https://github.com/rob--/memoryjs) - created by [Rob--](https://github.com/rob--)
- [node-stream-zip](https://github.com/antelle/node-stream-zip) - created by [antelle](https://github.com/antelle)
- [TMS.js](https://github.com/themitosan/TMS.js) by [TheMitoSan](https://github.com/themitosan) <sup>*(Hi!)*</sup>

_**IMPORTANT**: This software does not allow you to obtain free PS4 Games / Apps._
