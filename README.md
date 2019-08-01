# PPv3

[🇷🇺 описание](https://github.com/sowcow/prank-player/wiki/%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5)

## status: almost ready

## usage

1. after first run it should create a directory named `soundboards` near it's executable file
2. TODO: generate fake sound board there with a couple of hard-coded mp3s
2. you can put your directories with content (mp3/image files) there
4. choose a sound board (directory name) in the menu
5. drag phrase files from the tray below into the main area
6. right click to play the audio item in the main area or left click in the tray
   NOTE: this behavior should change
7. select/multi-select, drag/resize/rotate items in main area (ctrl/alt/shift modify these actions)
8. drag into the lower right corner to remove items from the main area
9. in the menu `Save` changes - it creates a file in the directory with mp3s (`soundboard.json`)
   NOTE: should be removed
10. in the menu change output device of sound (getUserMedia - takes access to all audio devices)

## playing buttons logic (not sure if it is preserved from the old version)

- TODO

## july stuff

- [x] simplify: cancel all testing and refactornig ideas
- [x] electron part of the app
- [x] intergate the electron part with the previous stuff
- [x] editing mode
- [x] hot keys: space, tab

## optional stuff

- [ ] auto-saving
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

## running the code

- code has never seen a refactoring so look into it at your own risk :warning:
- have installed: nodejs, yarn
- $ cd electron-app
- $ yarn        # install dependencies first
- $ yarn start  # then run the developement version of the app
- $ yarn build  # or make release version executable at ./dist (options: -l/-w/-m - linux/windows/macos)

linux version may need to be executed with `--no-sandbox` parameter

## directory structure

- electron-app - everything is here
