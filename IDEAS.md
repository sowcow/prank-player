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

# old ideas

- [ ] tweaks
  - [ ] for added entries use last performed scale/rotation or
    just use values from last edited entry
  - [ ] show an icon instedad of making it red to mark delete action
- [ ] go back to the tdd process

** ui ideas
- fabric.js drawn dragged entry for arrangement
- nested bubbles or so - clipped groups?
  there is a problem with mouse interactions
  and animation for clipping area + border
  also use selectable: false
** other ideas and thoughts
- [ ] ?to save screenshots in these directories as well
  so I can view them in the storybook?

- [ ] is there an option for nice vector editor?
- [ ] ogg could be used but whatever
- [ ] can have undo without using redux?
- [ ] playing progress bar?
- [ ] animations?
- [ ] spinner
- [ ] static typing? (typescript was slow when I tried it)
- [ ] buttons styles options?
- [ ] skins?
- [ ] options - audio output, persist
- [ ] editing: create groupings of buttons - modal-like containers
- [ ] manual placing from tray vs (virtual) button with icon -> button...

# old (irrelevant) notes

- bigger directory structure change
- also tools should be made testable (cowboy development debt)
- omg I gotta stop reimplementing cucumber on top of rspec...

- I may try to use purescript somewhere here
- js libraries are reliable base still

- baobab looks great for the state handling
- the state is built in a very dynamical, decoupled and DRY way
- unit testing for state handling using ava

- the process:
  - scenario(input,sketchy,user/world-wise)
  - feature(skill,details,project-wise)
  - modules(prediction,code-base-wise)
  - TDD (GOOS way?)
