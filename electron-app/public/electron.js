const GET_BOARDS = 'GET_BOARDS'
const GET_ONE_BOARD = 'GET_ONE_BOARD'
const SAVE_BOARD_DATA = 'SAVE_BOARD_DATA'
const SET_TITLE = 'SET_TITLE'

const BOARD_FILE_NAME = 'soundboard.json'

const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let fs = require('fs');
let pfs = require('promise-fs');


const { Menu, MenuItem } = require('electron')

let template = [
  { label: app.getName(), submenu: [
    { label: 'nothing here', accelerator: 'CmdOrCtrl+R',       click() { } },
    // { label: 'custom action 2', accelerator: 'Shift+CmdOrCtrl+R', click() { console.log('go!') } },
    { type: 'separator' },
    { role: 'quit' }
  ] }
]
const menu = Menu.buildFromTemplate(template)

function getExecutablePath() {
  return process.env.PWD || process.env.INIT_CWD || process.env.PORTABLE_EXECUTABLE_DIR
}

const SOUNDBOARDS_DIR = isDev ?
  path.join(__dirname, '../soundboards') :
  path.join(getExecutablePath(), 'soundboards') // XXX: can throw
// var currentPath = process.cwd();

ensurePath(SOUNDBOARDS_DIR)
// app.getAppPath('exe')
// process.env.PORTABLE_EXECUTABLE_DIR
// process.env.INIT_CWD


function ensurePath(path) {
  if (!fs.existsSync(path)){
      fs.mkdirSync(path);
  }
}


function isDirectory(path) {
  try {
    var stat = fs.lstatSync(path)
    return stat.isDirectory()
  } catch (e) {
    return false  // lstatSync throws unless path exists
  }
}

function getBoards() {
  let dir = SOUNDBOARDS_DIR
  doLog(process.env)
  doLog(dir)
  return new Promise((resolve, reject) => {
    fs.readdir(dir, function(err, files) {
      files = files.filter(x => isDirectory(path.join(dir,x)))
      files = files.map(name => ({ name }))
      resolve(files)
    })
  })
}

function getBoardData(board) {
  let { name } = board
  let dir = SOUNDBOARDS_DIR
  let file = path.join(dir, name, BOARD_FILE_NAME)
  return fileShouldExists(file).then( () =>
    readJSON(file)
  ).catch(() => null)
}

function readJSON(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function (err, data) {
      if (err) return reject(err)
      resolve(JSON.parse(data))
    })
  })
}

function saveBoardData(board, data) {
  let { name } = board
  let dir = SOUNDBOARDS_DIR
  let file = path.join(dir, name, BOARD_FILE_NAME)
  let json = JSON.stringify(data, null, 2)
  return pfs.writeFile(file, json)
}

function fileShouldExists(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.F_OK, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

function getOneBoard(board) {
  let { name } = board
  let dir = SOUNDBOARDS_DIR
  dir = path.join(dir, name)
  return new Promise((resolve, reject) => {
    fs.readdir(dir, function(err, files) {
      files = files.filter(x => !isDirectory(path.join(dir,x)))
      getBoardData(board).then( data => {
        let result = { name, data, files }
        resolve(result)
      })
    })
  })
}

function doLog(x) {
  mainWindow.webContents.send('LOG', x)
}

function respondToMessages() {
  let ipc = require('electron').ipcMain

  // NOTE: not used
  ipc.on(SET_TITLE, (event, given) => {
    let { channel, title } = given
    let result = null
    mainWindown.SetTitle(title)
    event.reply(channel, result)
  })

  ipc.on(GET_BOARDS, (event, given) => {
    let { channel } = given
    getBoards().then(result =>
      event.reply(channel, result)
    )
  })

  ipc.on(GET_ONE_BOARD, (event, given) => {
    let { channel, board } = given
    let { name } = board
    getOneBoard(board).then(result =>
      event.reply(channel, result)
    )
  })

  ipc.on(SAVE_BOARD_DATA, (event, given) => {
    let { channel, board, data } = given
    saveBoardData(board, data).then(result =>
      event.reply(channel, result)
    )
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 680,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.setMenuBarVisibility(false)
  Menu.setApplicationMenu(menu)

  let delayExit = true
  mainWindow.on('close', e => {
    if (delayExit) {
      e.preventDefault()
      mainWindow.webContents.send('will-close')
    }
  })
  let ipc = require('electron').ipcMain
  ipc.on('now-close', (e) => {
    delayExit = false
    mainWindow.close()
  })

  return mainWindow
}

app.on('ready', startApp)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    startApp();
  }
});

function startApp() {
  let mainWindow = createWindow()
  respondToMessages()
  handleFiles()
  // startServer(mainWindow)
}


function handleFiles() {
  let dir = SOUNDBOARDS_DIR
  let prefix = 'soundboard'
  electron.protocol.registerFileProtocol(prefix,
    (request, callback) => {
      const url = request.url.substr(prefix.length + 3)
      callback({ path: path.join(dir, url) })
      // callback({ path: path.normalize(`${dir}/${url}`) })
    }, (error) => {
      if (error) console.error('Failed to register protocol')
    }
  )
}

// function startServer(mainWindow) {
// var http = require("http");
// // var crypto = require("crypto");
// var server = http.createServer(function (req, res) {
//   // var port = crypto.randomBytes(16).toString("hex");
//   // ipc.once(port, function (ev, status, head, body) {
//   //   res.writeHead(status, head);
//   //   res.end(body);
//   // });
//   // window.webContents.send("request", req, port);
//   // console.log(request.url)
//   if (req.method === 'POST' && req.url === '/') {
//     let body = '';
//     req.on('data', chunk => { body += chunk.toString() })
//     req.on('end', () => {
//         console.log(body)
//         mainWindow.webContents.send('gotData', body)
//         res.end('ok')
//     });
//   }
//   res.end()
//   // response.end('Hello Node.js Server!')
// });
// server.listen(8000);
// console.log("http://localhost:8000/");
// }


/*
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
*/
