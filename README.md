# Prank Player v3

Rewrite of my old app using more modern technology.
It can be used to create soundboards for phone pranking.

## Main usage scenario

- user uploads a directory with mp3 files
- user sees buttons that play sounds on click
- user edits positions of buttons
- user saves changes as a file into the same directory
- after page reload: user loads that directory and positions
- buttons for newly added files are highlighted and in front of others

## Stuff to check first

- [ ] some stuff is being rewritten
- [x] directory uploader works
- [x] can play uploaded files
- [x] single playing stream (no howlerjs)
- [x] title reflects directory name
- [x] no top bar
- [x] code: prettier + standard
- [x] redux + some automation:
- [x] redux-actions
- [ ] combineReducers
- [ ] directory structure
- [ ] code: flow (faster than typescript)
- [ ] manual placing from tray vs (virtual) button with icon -> button...
      it is movable but always visible, is not saved to file
- [ ] editing: move - left button, play - right one, resize - marker?
      resize in tray - resize all in tray
      resize one in multiselect - apply delta to all, collapse gaps?
- [x] manually place each button instead of automatic grid
- [ ] editing: create grouping buttons - modal-like containers

## Features

- [x] javascript
- [x] redux/create-react-app
- [x] material ui
- [x] 100% offline app (should be explicit)
- [x] uploading
- [ ] new buttons tray at the top
- [x] playing using left click - play/pause/stopping previous sound
- [ ] editing
- [ ] saving
- [ ] saved file name = directory name + '.json'
      can be a source of mess but generic file name can lead to
      rewriting a file at wrong location
      (unless you use some plugin to write to the right location)
- [ ] new buttons highlighting
- [ ] renaming buttons
- [ ] move groups of buttons
- [ ] options - audio output, persist
- [ ] check https for git pages, use service worker in production

## Other ideas

- [ ] images / svg uploading?
- [ ] is there an option for nice vector editor?
- [ ] maybe to use storybook
- [ ] ogg could be used but whatever
- [ ] to investigate a good end-to-end testing option?
- [ ] can have undo without using redux?
- [ ] use local-storage at all?
- [ ] playing progress bar?
- [ ] animations?
- [ ] spinner
- [ ] static typing? (typescript was slow when I tried it)
- [ ] buttons styles options?
- [ ] skins?
- [ ] unlikely but I may want to look into making an electron app,
      or there may be interesting alternatives to electron
