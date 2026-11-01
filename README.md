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

**Version 0.1 — Early development**

The current version supports:

- ChatGPT as the embedded AI webpage.
- Bash as the local terminal shell.
- Bidirectional clipboard communication between ChatGPT and Bash.

### Planned features

Future versions are intended to support:

- **Configurable AI webpage:** Enter any URL instead of being restricted to ChatGPT, allowing services such as Claude, Gemini, and other web-based AI assistants.
- **Configurable shell:** Select alternative shells such as Zsh, Fish, PowerShell, or other supported command interpreters.
- **Cross-platform support:** Run on Linux, Windows, and macOS.
- Improved terminal output capture and clipboard handling.
- Packaged application releases for easier installation.

The long-term goal is a flexible, platform-independent bridge between web-based AI assistants and local command-line environments, without requiring AI API integration.

## License

Electron Bash Bridge is released into the public domain under
[The Unlicense](https://unlicense.org/).

See the [LICENSE](LICENSE) file for details.