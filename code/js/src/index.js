// import './basement/loadFirst'
import 'typeface-roboto'

import './basement/style.css'

import React from 'react'
import ReactDOM from 'react-dom'

import Application from './Application'
import * as serviceWorker from './basement/serviceWorker'
import viewerMode from './basement/viewerMode';


let view = viewerMode()

if (view) {
  let html = `
  <span style='color: green; font-size: 24pt'>press "ctrl+s" to save in the directory "with mp3s"</span>
  <hr />
  <div id='json'>${view}</div>
  `
  document.documentElement.innerHTML = html
  document.title = 'soundboard'
} else {
  runReactApp()
}


function runReactApp() {
  let app = <Application />

  let element = document.getElementById('root')

  ReactDOM.render(app, element)

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister()
}
