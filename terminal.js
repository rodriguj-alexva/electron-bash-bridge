
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
let commandOutput = '';
window.electronAPI.onTerminalOutput((data) => {
    commandOutput += data;
    terminal.write(data);
});

terminal.onData((data) => {
    window.electronAPI.sendTerminalInput(data);
});

document.getElementById('copy-output').addEventListener('click', async () => {
  const cleanOutput = commandOutput
      .replace(/\x1B\][^\x07\x1B]*(?:\x07|\x1B\\)/g, '')
      .replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '');

  const outputWithoutPrompt = cleanOutput
    .replace(/\r/g, '')
    .replace(/\n[^\n]*[$#]\s*$/, '')
    .trimEnd();

  await navigator.clipboard.writeText(outputWithoutPrompt);
  console.log('Terminal output copied to clipboard');
});

window.resetCommandOutput = () => {
  commandOutput = '';
};

document.getElementById('clear-terminal')
  .addEventListener('click', () => {
    terminal.clear();
  });
