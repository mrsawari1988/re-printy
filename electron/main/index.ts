import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { release } from 'node:os';
import { join } from 'node:path';
const { getPrinters, print } = require('pdf-to-printer');

import { fileItem, fileItems } from './fileItem';

process.env.DIST_ELECTRON = join(__dirname, '../');
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist');
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

function printFiles(filesItems: fileItems) {
    filesItems.forEach((element: fileItem) => {
        print(element.filePath, { silent: true, printer: element.printerName }).then((res) => {
            console.log(res);
        });
    });
}

const sendPrinters = async () => {
    const printers = await getPrinters();
    return printers;
};

let win: BrowserWindow | null = null;
const preload = join(__dirname, '../preload/index.js');
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, 'index.html');

async function createWindow() {
    win = new BrowserWindow({
        width: 920,
        height: 510,
        webPreferences: {
            preload,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        // electron-vite-vue#298
        win.loadURL(url);
        // Open devTool if the app is not packaged
        win.webContents.openDevTools();
    } else {
        win.loadFile(indexHtml);
    }

    ipcMain.on('print-file', (event, filesItems) => {
        printFiles(filesItems);
        // console.log(filesItems);
    });
    ipcMain.on('app-quit', () => {
        // console.log('quit app');
        app.quit();
    });
    ipcMain.on('window-minimize', () => {
        // console.log('quit app');
        win.minimize();
    });
    //sending printers list back to the front end
    ipcMain.handle('get-printers', sendPrinters);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    win = null;
    if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});
