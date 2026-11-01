
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  setSplit: (percentage) => {
    ipcRenderer.send('set-split', percentage);
  },

  onTerminalOutput: (callback) => {
    ipcRenderer.on('terminal-output', (_event, data) => {
      callback(data);
    });
  },

  sendTerminalInput: (data) => {
    ipcRenderer.send('terminal-input', data);
  },

  resizeTerminal: (cols, rows) => {
    ipcRenderer.send('terminal-resize', cols, rows);
  },
  onClipboardChanged: (callback) =>
    ipcRenderer.on('clipboard-changed', (_event, text) => callback(text)),

  commandExecuted: () => ipcRenderer.send('command-executed')

});
