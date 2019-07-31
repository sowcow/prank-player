import React from 'react'

import featuresFor from './helpers/featuresFor'
import Application from '../Application'

let data = require('../../../../tmp/testingSnapshots.json')

const prepareName = name =>
  name.replace(/_+/g, ' ')

data.entries.forEach(x => {
  featuresFor(
    'test snapshots',
    prepareName(x.name),
    `
      todo?
  `,
    <Application
      app_state={x.app_state}
    />
  )
})

