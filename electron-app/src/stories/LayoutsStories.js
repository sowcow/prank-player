import React from 'react'

import CentralLayout from '../app/layout/CentralLayout'
import Distinct from './helpers/Distinct';
import featuresFor from './helpers/featuresFor'


featuresFor(
  'layouts',
  'CentralLayout corners',
  `
  x corners
`,
  <CentralLayout
    leftTop={<Distinct>leftTop</Distinct>}
    rightTop={<Distinct>rightTop</Distinct>}
    leftBottom={<Distinct>leftBottom</Distinct>}
    rightBottom={<Distinct>rightBottom</Distinct>}
    center={<Distinct>{'center\ngoes\nhere'}</Distinct>}
  />
)

featuresFor(
  'layouts',
  'CentralLayout top',
  `
  x top
`,
  <CentralLayout
    leftBottom={<Distinct>leftBottom</Distinct>}
    rightBottom={<Distinct>rightBottom</Distinct>}
    center={<Distinct>{'center\ngoes\nhere'}</Distinct>}
    top={<Distinct>{'top!'}</Distinct>}
  />
)
featuresFor(
  'layouts',
  'CentralLayout top simply overlaps',
  `
  x top
`,
  <CentralLayout
    leftTop={<Distinct>{'leftTop\ngoes\nhere'}</Distinct>}
    rightTop={<Distinct>{'rightTop\ngoes\nhere'}</Distinct>}
    leftBottom={<Distinct>leftBottom</Distinct>}
    rightBottom={<Distinct>rightBottom</Distinct>}
    center={<Distinct>{'center\ngoes\nhere'}</Distinct>}
    top={<Distinct>{'top!'}</Distinct>}
  />
)

featuresFor(
  'layouts',
  'CentralLayout bottom',
  `
  x bottom
`,
  <CentralLayout
    leftTop={<Distinct>leftTop</Distinct>}
    rightTop={<Distinct>rightTop</Distinct>}
    center={<Distinct>{'center\ngoes\nhere'}</Distinct>}
    bottom={<Distinct>{'bottom!'}</Distinct>}
  />
)

featuresFor(
  'layouts',
  'CentralLayout bottom simply overlaps',
  `
  x bottom
`,
  <CentralLayout
    leftTop={<Distinct>leftTop</Distinct>}
    rightTop={<Distinct>rightTop</Distinct>}
    leftBottom={<Distinct>leftBottom</Distinct>}
    rightBottom={<Distinct>rightBottom</Distinct>}
    center={<Distinct>{'center\ngoes\nhere'}</Distinct>}
    bottom={<Distinct>{'bottom!'}</Distinct>}
  />
)

/*
featuresFor(
  'SoundBoard',
  'editing with new entries',
  `
  x User sees a button that hides new entries
  x User can click it to see them
    They can be dragged to the main area where they are positioned this way
    They are clickable buttons that play audio
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
      { name: "Now it's time for the fourth entry" },
      {
        name:
          "And the fifth entry shall take it' place here"
      }
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
*/
