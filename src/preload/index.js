import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  getCategories: () => ipcRenderer.invoke('db:getCategories'),
  addExpense: (data) => ipcRenderer.invoke('db:addExpense', data),
  getExpenses: (filter) => ipcRenderer.invoke('db:getExpenses', filter),
  deleteExpense: (id) => ipcRenderer.invoke('db:deleteExpense', id),
  addCategory: (name, parentId) => ipcRenderer.invoke('db:addCategory', name, parentId),
  deleteCategory: (id) => ipcRenderer.invoke('db:deleteCategory', id),
  getStats: (month) => ipcRenderer.invoke('db:getStats', month)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
