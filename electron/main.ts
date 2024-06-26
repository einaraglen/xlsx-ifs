import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { exportData, prepareClipboard, readClipboard, readFile } from './lib/methods'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 600,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })


  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.setMenu(null)
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

type HandleEvent = [Electron.IpcMainInvokeEvent, any]

ipcMain.handle('read-clipboard', (...args: HandleEvent) => {
  return readClipboard(args[1])
})

ipcMain.handle('read-file', (...args: HandleEvent) => {
  return readFile(args[1])
})

ipcMain.handle('export-data', (...args: HandleEvent) => {
  return exportData(args[1])
})

ipcMain.handle('prepare-clipboard', (...args: HandleEvent) => {
  return prepareClipboard(args[1])
})

ipcMain.handle('show-dialog', (...args: HandleEvent) => {
  return dialog.showMessageBox(win!, args[1]);
})