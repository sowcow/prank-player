import React from 'react'

import NewEntriesList from '../app/ui/NewEntriesList';
import featuresFor from './helpers/featuresFor'

featuresFor(
  'new entries view',
  'with some new entries',
  `
  x new entries list looks ok
    user can drag and place stuff to the main area
`,
  <NewEntriesList
    opened={true}
    entries={[
      { name: 'Hello' },
      { name: 'World' },
      { name: 'Very long name of one entry' },
      { name: 'Short name' },
    ]}
  />
)
