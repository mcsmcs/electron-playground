const path = require('path');
const url = require('url');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const Tray = electron.Tray;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

let appIcon;
function setupIcon(){
  const iconPath = path.join(__dirname, '..', 'icons', 'success', '16x16.png');
  appIcon = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([{
    label: 'Remove'
  }]);

  appIcon.setToolTip('Demo in tray!');
  appIcon.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  createWindow();
  setupIcon();

  ipcMain.on('sync-message', (event, arg) => {
    console.log(arg);  // prints "ping"
    event.returnValue = 'pong';
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  appIcon && appIcon.destroy();

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.