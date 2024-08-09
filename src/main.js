const { app, BrowserWindow } = require('electron');
const path = require('path');
const Titlebar = require('custom-electron-titlebar');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  new Titlebar.Titlebar({
    backgroundColor: Titlebar.Color.fromHex('#444'),
    menu: null
  });

  mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});