
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  setSplit: (percentage) => {
    ipcRenderer.send('set-split', percentage);
  }
});
