import { app, BrowserWindow } from 'electron';
import { enableLiveReload } from 'electron-compile';

let mainWindow: Electron.BrowserWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload();
}

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

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
