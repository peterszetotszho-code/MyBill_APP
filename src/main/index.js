import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {
  initDatabase,
  getCategories,
  addExpense,
  getExpenses,
  deleteExpense,
  addCategory,
  deleteCategory,
  getStats
} from './db'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function registerIpc() {
  ipcMain.handle('db:getCategories', () => getCategories())
  ipcMain.handle('db:addExpense', (_e, data) => addExpense(data))
  ipcMain.handle('db:getExpenses', (_e, filter) => getExpenses(filter))
  ipcMain.handle('db:deleteExpense', (_e, id) => deleteExpense(id))
  ipcMain.handle('db:addCategory', (_e, name, parentId) => addCategory(name, parentId))
  ipcMain.handle('db:deleteCategory', (_e, id) => deleteCategory(id))
  ipcMain.handle('db:getStats', (_e, month) => getStats(month))
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.heima.bill')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  await initDatabase()
  registerIpc()
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
