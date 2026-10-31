
const { app, BrowserWindow, WebContentsView, ipcMain } = require('electron');
const path = require('node:path');
const pty = require('node-pty');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 850,
    title: 'Electron Bash Bridge v0.1',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  const bashProcess = pty.spawn('/bin/bash', [], {
    name: 'xterm-256color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env
  });
  bashProcess.onData((data) => {
    if (!win.isDestroyed() && !win.webContents.isDestroyed()) {
      win.webContents.send('terminal-output', data);
    }
  });

  ipcMain.on('terminal-input', (event, data) => {
    if (event.sender !== win.webContents) return;

    if (typeof data === 'string') {
      bashProcess.write(data);
    }
  });
  ipcMain.on('terminal-resize', (event, cols, rows) => {
    if (event.sender !== win.webContents) return;

    if (
      Number.isInteger(cols) &&
      Number.isInteger(rows) &&
      cols > 0 &&
      rows > 0
    ) {
      bashProcess.resize(cols, rows);
    }
  });

  // Load our local application interface.
  win.loadFile('index.html');
  win.webContents.once('did-finish-load', () => {
    win.setSize(1201, 850);
    win.setSize(1200, 850);
  });

  // Create an embedded browser for the AI website.
  const aiView = new WebContentsView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  win.contentView.addChildView(aiView);

  // Initial layout: top 65% for the AI website.
  let splitPercentage = 65;
  function resizeAIView() {
    const [width, height] = win.getContentSize();

    aiView.setBounds({
      x: 0,
      y: 0,
      width: width,
      height: Math.floor(height * splitPercentage / 100) - 8
    });
  }

  resizeAIView();

  win.on('resize', resizeAIView);
  ipcMain.on('set-split', (event, percentage) => {
    const [width, height] = win.getContentSize();
    const split = Math.max(20, Math.min(80, Number(percentage)));
    
    if (event.sender !== win.webContents) return;
    splitPercentage = split;

    if (!Number.isFinite(split)) return;

    aiView.setBounds({
        x: 0,
        y: 0,
        width: width,
        height: Math.floor(height * split / 100) - 8
      });
  });

  // Load ChatGPT.
  aiView.webContents.loadURL('https://chatgpt.com');
//  aiView.webContents.openDevTools({ mode: 'detach' });

  // Close the embedded browser when the window closes.
  win.on('closed', () => {
    if (!aiView.webContents.isDestroyed()) {
      aiView.webContents.close();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});


