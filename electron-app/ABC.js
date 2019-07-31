const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, height: 680,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
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
  startServer(mainWindow)
}

function startServer(mainWindow) {
var http = require("http");
// var crypto = require("crypto");
var server = http.createServer(function (req, res) {
  // var port = crypto.randomBytes(16).toString("hex");
  // ipc.once(port, function (ev, status, head, body) {
  //   res.writeHead(status, head);
  //   res.end(body);
  // });
  // window.webContents.send("request", req, port);
  // console.log(request.url)
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString() })
    req.on('end', () => {
        console.log(body)
        mainWindow.webContents.send('gotData', body)
        res.end('ok')
    });
  }
  res.end()
  // response.end('Hello Node.js Server!')
});
server.listen(8000);
console.log("http://localhost:8000/");
}
