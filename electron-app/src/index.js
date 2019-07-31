// import './basement/loadFirst'
import 'typeface-roboto'

import './basement/style.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { PRODUCTION } from './app/misc/debug';
// import { sendUpdatesOnNeed } from './app/domain/doSave';
import Application from './Application'
import * as serviceWorker from './basement/serviceWorker'
// import viewerMode, { savingModeRun } from './basement/viewerMode';


// let view = viewerMode()

// if (view) {
  // savingModeRun()
  // let html = `
  // <span style='color: green; font-size: 24pt'>press "ctrl+s" to save in the directory "with mp3s"</span>
  // <hr />
  // <div id='json'>${view}</div>
  // `
  // document.documentElement.innerHTML = html
  // document.title = 'soundboard'
// } else {
  runReactApp()
  // sendUpdatesOnNeed()
// }


function runReactApp() {
  let app = <Application />

  let element = document.getElementById('root')

  ReactDOM.render(app, element)

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  if (PRODUCTION) {
    serviceWorker.register()
  } else {
    serviceWorker.unregister()
  }
}