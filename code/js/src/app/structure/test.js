import React from 'react'
import ReactDOM from 'react-dom'

import MainArea from './MainArea'
import App from './App'
import TopBar from './TopBar'

it('renders without crashing: MainArea', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MainArea />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing: App', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing: TopBar', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TopBar />, div)
  ReactDOM.unmountComponentAtNode(div)
})
