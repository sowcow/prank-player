import React from 'react'

import SoundBoard from '../components/ui/SoundBoard'
import featuresFor from './helpers/featuresFor'

featuresFor(
  'SoundBoard',
  'editing with new entries',
  `
  x User sees a button that hides new entries
    User can click it to see them
    They take space from the button to the right or left side (the longest part)
    They are clickable buttons that play audio
    They can be dragged to the main area where they are positioned this way
    ---
  x The component fills the given space
  x New stuff button is shown if there is something
  x The button signifies editing mode
  x It looks distinctive
  x It is positioned in the right-bottom corner
    ---
    There is a way to put a menu button in the corner?
`,
  <SoundBoard
    mode='editing'
    newEntries={[
      { name: 'First entry' },
      { name: 'Second entry' },
      { name: 'Third entry goes here' },
      { name: 'Now it\'s time for the fourth entry' },
      { name: 'And the fifth entry shall take it\' place here' },
    ]}
  />
)

featuresFor(
  'SoundBoard',
  'playing',
  `
`,
  <SoundBoard
    mode='playing'
    newEntries={[
      { name: 'First entry' },
      { name: 'Second entry' }
    ]}
  />
)

export default null
