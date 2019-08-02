import 'typeface-roboto'

import './basement/style.css'

import React from 'react'
import ReactDOM from 'react-dom'

import Application from './Application'


runReactApp()


function runReactApp() {
  let app = <Application />

  let element = document.getElementById('root')

  ReactDOM.render(app, element)
}
