# Markdownify with Jina Reader

## Installation

1. Download this extension
2. Go to `chrome://extensions/`
3. Turn on "Developer mode" (top-right corner)
4. Click "Load unpacked"
5. Select the extension folder

## Features

- Adds a "Markdownify with Jina Reader" option to your right-click context menu
- Fetches the Markdown version of the current page from Jina's Reader service
- Automatically copies the Markdown to your clipboard
- Displays a toast notification when the content is copied
- Shows error notifications if something goes wrong

## How It Works

1. Right-click anywhere on a webpage
2. Select "Markdownify with Jina Reader" from the context menu
3. The extension will fetch the Markdown version from `https://r.jina.ai/[current-url]`
4. The Markdown content is automatically copied to your clipboard
5. A toast notification appears confirming the copy action

## Permissions

This extension requires the following permissions:

- `contextMenus`: To add the right-click menu option
- `activeTab`: To access the current tab's URL
- `clipboardWrite`: To copy the Markdown to your clipboard
- `scripting`: To inject the toast notification script
- Access to `https://r.jina.ai/*`: To fetch the Markdown content

## Troubleshooting

If you encounter any issues:

- Make sure you have an active internet connection
- Check that the current page is accessible to Jina's Reader service
- Try reloading the extension from the Chrome extensions page

## License

[MIT License](LICENSE)
