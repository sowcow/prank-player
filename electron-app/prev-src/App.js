import './App.css';

import React from 'react';

import { getBoards, getOneBoard, saveBoardData } from './electron';
import logo from './logo.svg';

let boardsList = []

let wtf = () => {
  getBoards().then(xs => {
    console.log(xs)
    boardsList = xs
    xs.forEach( x => {
      getOneBoard(x).then(x => {
        console.log(x)
      })
    })
  })
}

let alter = () => {
  let board = boardsList[0]
  let data = { hello: 'there' }
  saveBoardData(board, data)
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={wtf}>
          SEND THE MESSAGE
        </button>
        <button onClick={alter}>
          ALTER
        </button>
        <img src='soundboard://second/set.gif' alt='' />
        <audio controls
          src='soundboard://first/a.mp3'
        >
          No support?
        </audio>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
