# Prank Player v3

Rewrite of my old app "Prank Player" using more modern technology.
It can be used to create sound boards for phone pranks.

## Main usage scenario

- user uploads a directory with mp3 files
- user sees buttons that play sounds on click
- user edits positions of buttons
- user saves changes as a file into the same directory
- after page reload: user loads that directory and positions
- buttons for newly added files are highlighted and in front of others

## Stuff to check

- [ ] directory uploader works
- [ ] can play uploaded files

## Features

- [x] javascript
- [x] react.js with create-react-app
- [ ] 100% offline app (should be explicit)
- [ ] uploading
- [ ] playing using left click - play/pause/stopping previous sound
- [ ] editing
- [ ] saving
- [ ] saved file name = directory name + '.json'
      can be a source of mess but generic file name can lead to
      rewriting a file at wrong location
      (unless you use some plugin to write to the right location)
- [ ] new buttons highlighting
- [ ] renaming buttons
- [ ] move groups of buttons

- [ ] to investigate a good end-to-end testing option?
- [ ] can have undo without using redux?
- [ ] use local-storage at all?
- [ ] playing progress bar?
- [ ] animations?
- [ ] static typing? (typescript was slow when I tried it)
- [ ] buttons styles options?
- [ ] skins?
- [ ] maybe there a case for the right click? - like for second audio stream, or always play from the beginning
