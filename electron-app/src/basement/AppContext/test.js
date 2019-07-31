import React from 'react'
import ReactDOM from 'react-dom'

import AppContext from './'

let Subj = AppContext

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Subj />, div)
  ReactDOM.unmountComponentAtNode(div)
})
