
const { Terminal } = require('@xterm/xterm');
const { FitAddon } = require('@xterm/addon-fit');

const terminal = new Terminal({
  cursorBlink: true,
  fontSize: 14,
  theme: {
    background: '#101010',
    foreground: '#ffffff'
  }
});

const fitAddon = new FitAddon();
terminal.loadAddon(fitAddon);

terminal.open(document.getElementById('terminal'));
fitAddon.fit();

terminal.attachCustomKeyEventHandler((event) => {
  if (
    event.type === 'keydown' &&
    event.ctrlKey &&
    event.shiftKey &&
    event.code === 'KeyC'
  ) {
    const selectedText = terminal.getSelection();

    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
    }

    return false;
  }

  return true;
});

const resizeObserver = new ResizeObserver(() => {
  fitAddon.fit();

  window.electronAPI.resizeTerminal(
    terminal.cols,
    terminal.rows
  );
});

resizeObserver.observe(document.getElementById('terminal'));

terminal.writeln('Electron Bash Bridge v0.1');
terminal.writeln('Terminal initialized.');
window.electronAPI.onTerminalOutput((data) => {
  terminal.write(data);
});

terminal.onData((data) => {
  window.electronAPI.sendTerminalInput(data);
});
