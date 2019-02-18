import { Provider } from 'react-redux'
import React from 'react'

import { storiesOf } from '@storybook/react'

import Example from './Example'
// import { StoreProvider } from '../../redux/store'

function featuresFor (name, details, features, component) {
  return storiesOf(name, module).add(details, () => (
    // <StoreProvider>
      <Example features={features}>{component}</Example>
    // </StoreProvider>
  ))
}

export default featuresFor
