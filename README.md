# PPv3

Electron application to create and use soundboards for prank calling.

Sound output device is configurable through the menu.

* [🇷🇺 описание](https://github.com/sowcow/prank-player/wiki/%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5)
* [:open_file_folder: download](https://github.com/sowcow/prank-player/releases)

## Status: ready for real-world testing

## Usage

1. After first run it should create a directory named `soundboards` near it's executable file;
1. You can put your directories with content (mp3/images) there (non-nested);
1. Choose a sound board (directory name) in the menu;
1. Drag phrase files from the tray below into the main area;
1. Editing mode is when the tray below is visible - you can position content in it;
1. Select/multi-select, drag/resize/rotate items in main area (ctrl/alt/shift modify these actions);
1. Player mode is when the tray is invisible - you can play stuff with left/right mouse buttons;
1. Shortcuts: space - change mode (editor/player), tab - menu (arrows do not work though);
1. Use the right click to play the audio item in the main area or in the tray.
   The left click does same but it also can pauses/resume item that is already playing;
1. Drag into the lower right corner to remove items from the main area;
1. In the menu change output device of sound (getUserMedia - takes access to all audio devices);
1. Changes are saved on switching mode (editor/player), when you switch to another soudboard and at exit so unless powers goes down changes should be preserved
   (changes are saved in a file in the directory with mp3s: `soundboard.json`);

## Bugs

Create an issue if you encounter unexpected behavior.

## Running the Code

- code has never seen a refactoring so look into it at your own risk :warning:
- have installed: nodejs, yarn
- $ cd electron-app
- $ yarn        # install dependencies first
- $ yarn start  # then run the developement version of the app
- $ yarn build  # or make release version executable at ./dist (options: -l/-w/-m - linux/windows/macos)

Linux version may need to be executed with `--no-sandbox` parameter.

:construction: Windows version has not been tested.

## Directory Structure

- electron-app - everything is here

# Future ideas

## optional stuff

- [ ] to use redux instead of that experimental stuff
      it is quick to add state in the current system
      but there are small things that react-redux should be able to handle
      also event bus can be useful here and there
- [ ] there are other old experiments artifacts
- [ ] handle audio in the main electron process and not in html audio
      if it changes anything

## very optional stuff

- [ ] react dnd is outdated, there was a couple of breaking updates
- [ ] look into nested sub-boards
- [ ] look into attaching audio to images
- [ ] look into old ideas, select/organize them somewhere
- [ ] handle z-indexes ordering for content
