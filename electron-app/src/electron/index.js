import {
  GET_BOARDS,
  GET_ONE_BOARD,
  SAVE_BOARD_DATA,
  SET_TITLE
} from './constants'
import { isEditingState } from '../app/domain/state/mainState'
import doSave from '../app/domain/doSave'

function createChannel () {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  )
}

export function setTitle (title) {
  let ipc = window.require('electron').ipcRenderer
  let channel = createChannel()
  let message = { channel, title }
  let promise = new Promise((resolve, reject) => {
    ipc.once(channel, (event, x) => resolve(x))
    ipc.send(SET_TITLE, message)
  })
  return promise
}

export function getBoards () {
  let ipc = window.require('electron').ipcRenderer
  let channel = createChannel()
  let message = { channel }
  let promise = new Promise((resolve, reject) => {
    ipc.once(channel, (event, x) => resolve(x))
    ipc.send(GET_BOARDS, message)
  })
  return promise
}

export function getOneBoard (board) {
  let ipc = window.require('electron').ipcRenderer
  let channel = createChannel()
  let message = { channel, board }
  let promise = new Promise((resolve, reject) => {
    ipc.once(channel, (event, x) => resolve(x))
    ipc.send(GET_ONE_BOARD, message)
  })
  return promise
}

export function saveBoardData (board, data) {
  let ipc = window.require('electron').ipcRenderer
  let channel = createChannel()
  let message = { channel, board, data }
  let promise = new Promise((resolve, reject) => {
    ipc.once(channel, (event, x) => resolve(x))
    ipc.send(SAVE_BOARD_DATA, message)
  })
  return promise
}

function logStuff () {
  let ipc = window.require('electron').ipcRenderer
  let channel = 'LOG'
  ipc.on(channel, (event, x) => console.log(x))
}
logStuff()

function nowClose () {
  let ipc = window.require('electron').ipcRenderer
  ipc.send('now-close', {})
}
function saveOnExit () {
  let ipc = window.require('electron').ipcRenderer
  let channel = 'will-close'
  ipc.on(channel, (event, x) => {
    if (isEditingState.get()) {
      doSave()
        .then(() => nowClose())
        .catch(() => alert('Error saving soundboard data!'))
    } else {
      nowClose()
    }
  })
}
saveOnExit()
