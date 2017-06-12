import * as path from 'path';
import * as url from 'url';

import { app, BrowserWindow } from 'electron';

require('electron-debug')({ showDevTools: true });
const unhandled = require('electron-unhandled');
unhandled();

let win: Electron.BrowserWindow;

function createWindow() {
	win = new BrowserWindow({ width: 800, height: 600 })

	win.setMenuBarVisibility(false);

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Emitted when the window is closed.
	win.on('closed', () => {
		win = null
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});