# Markdown-Editor-v2

This project provides a simple Electron based Markdown editor with block based editing. Markdown and inline LaTeX expressions of the form `$ax^2$` are supported via **markdown-it** and **katex**.

## Features
- Each press of `Enter` finalises the current block and creates a new one.
- Blocks can contain any Markdown including tables, headers, block quotes and code blocks.
- Pages are rendered in A4 format and new pages are automatically added when needed.
- A custom caret is displayed with a short easing animation when moving between characters.

## Development
To run the editor you will need Node.js installed. Install the dependencies and start Electron:

```bash
npm install
npm start
```

If dependency installation fails due to network restrictions, download the listed packages manually and place them in `node_modules`.
