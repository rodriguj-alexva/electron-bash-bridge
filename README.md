# Electron Bash Bridge

A desktop application that connects web-based AI assistants with a local Bash terminal using the system clipboard.

Built with Electron, Node.js, xterm.js, and node-pty.

## Overview

Electron Bash Bridge provides two panels in a single window:

- **Top panel:** An embedded AI webpage, currently ChatGPT.
- **Bottom panel:** An interactive Bash terminal.

A draggable divider allows the panels to be resized.

The application uses the system clipboard to exchange information between the AI assistant and the terminal, without requiring an AI API key or paid API access.

## Features

- Embedded ChatGPT webpage
- Interactive Bash terminal
- Resizable split-screen interface
- Clipboard monitoring for copied commands
- Command preview with manual Execute button
- Copy terminal output to the system clipboard
- Support for normal Bash commands and interactive terminal sessions

## Installation

### Prerequisites

- Node.js and npm
- Git
- Linux development environment

### Clone and run

```bash
git clone https://github.com/rodriguj-alexva/electron-bash-bridge.git
cd electron-bash-bridge
git switch development
npm install
npm start
```

The terminal JavaScript bundle is built automatically before the application starts.

## Usage

1. Launch the application using `npm start`.
2. Sign in to ChatGPT in the upper panel.
3. Copy a command from ChatGPT.
4. Review the command displayed above the terminal.
5. Click **Execute** to run it.
6. Click **Copy Output** to copy the terminal output.
7. Paste the output into ChatGPT using Ctrl+V.

## Security

Commands are not automatically executed when copied. The user must explicitly click Execute.

Review every command before executing it, especially commands that modify files, install software, or require elevated privileges.

## Current limitations

- Linux is the initial development and testing platform.
- ChatGPT is currently the only configured AI webpage.
- Clipboard monitoring detects changes in text, not repeated copies of identical text.
- Copied terminal output may include echoed commands, Bash prompts, or terminal formatting.
- Packaging and distribution have not yet been implemented.

## Project status

Early development — version 0.1.

Planned improvements include support for additional AI webpages, improved terminal output capture, and packaged releases for multiple operating systems.

## License

License to be determined.