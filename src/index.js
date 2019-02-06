import 'typeface-roboto'

import './firstThings'
import './style.css'

import React from 'react'
import ReactDOM from 'react-dom'

import AppContext from './AppContext'
import DummyApp from './components/DummyApp'
import * as serviceWorker from './serviceWorker'

let app = (
  <AppContext>
    <DummyApp />
  </AppContext>
)

let element = document.getElementById('root')

ReactDOM.render(app, element)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
