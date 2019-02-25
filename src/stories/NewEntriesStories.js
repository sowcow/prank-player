import React from 'react'

import NewEntriesList from '../app/ui/NewEntriesList';
import featuresFor from './helpers/featuresFor'

featuresFor(
  'new entries',
  'todo',
  `
    todo
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
