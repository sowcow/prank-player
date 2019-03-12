// import './basement/loadFirst'
import 'typeface-roboto'
import './basement/style.css'

import React from 'react'
import ReactDOM from 'react-dom'

import Application from './Application'
import * as serviceWorker from './basement/serviceWorker'


let app = <Application />

let element = document.getElementById('root')

ReactDOM.render(app, element)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
