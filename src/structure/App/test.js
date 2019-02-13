import React from 'react'
import ReactDOM from 'react-dom'

import Subj from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Subj />, div)
  ReactDOM.unmountComponentAtNode(div)
})
