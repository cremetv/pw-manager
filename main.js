const { app, BrowserWindow, Menu, Tray } = require('electron')
const windowStateKeeper = require('electron-window-state')

let tray = null
let win

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    icon: __dirname + '/public/images/icon.png',
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindowState.manage(win);

  win.loadFile('index.html')

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
// app.on('ready', () => {
//   tray = new Tray('public/images/icon.png')
//   const contextMenu = Menu.buildFromTemplate([
//     { label: 'Item1', type: 'radio' },
//     { label: 'Item2', type: 'radio', checked: true }
//   ])
//   tray.setToolTip('MM Passwort Manager')
//   tray.setContextMenu(contextMenu)
// })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
