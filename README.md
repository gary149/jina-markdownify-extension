# Chrome extension for [Jina Reader](https://jina.ai/reader/)

The fastest way to inject your current webpage into an AI chat.

![](./demo.gif)


> Feeding web information into LLMs is an important step of grounding, yet it can be challenging. The simplest method is to scrape the webpage and feed the raw HTML. However, scraping can be complex and often blocked, and raw HTML is cluttered with extraneous elements like markups and scripts. The Reader API addresses these issues by extracting the core content from a URL and converting it into clean, LLM-friendly text, ensuring high-quality input for your agent and RAG systems.

## Installation

1. Clone/download this repository.
2. Open `chrome://extensions/` and enable "Developer mode."
3. Click "Load unpacked" and select the extension folder.

## Usage

1. Right-click on any webpage.
2. Select "Markdownify with Jina Reader."
3. Markdown is copied automatically; a notification confirms the action.

## Troubleshooting

- Ensure an active internet connection.
- Verify page accessibility to Jina's Reader.
- Reload extension if needed.

## License

[MIT License](LICENSE)
