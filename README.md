# AI Model Detector

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/thisis-romar/vscode-ai-model-detector/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/thisis-romar/vscode-ai-model-detector)](https://github.com/thisis-romar/vscode-ai-model-detector/issues)

A [Visual Studio Code](https://code.visualstudio.com/) extension for real-time AI model detection with 100% accuracy using the [Chat Participant API](https://code.visualstudio.com/api/extension-guides/ai/chat).

## 📑 Table of Contents

- [Technical Implementation](#technical-implementation)
- [Chat Participant API Documentation](#chat-participant-api-documentation)
  - [Chat Participant API](#chat-participant-api)
  - [Language Model API](#language-model-api)
- [Benefits & Use Cases](#benefits-use-cases)
- [Installation](#installation)
- [Related Documentation](#related-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Technical Implementation

This extension leverages the [Visual Studio Code Extension API](https://code.visualstudio.com/api) to provide real-time AI model detection capabilities. The implementation uses several key [VS Code APIs](https://code.visualstudio.com/api/references/vscode-api) to achieve accurate model detection and user interaction.

## 📚 Chat Participant API Documentation

This section provides an overview of the [VS Code Chat Participant API](https://code.visualstudio.com/api/extension-guides/ai/chat) and [Language Model API](https://code.visualstudio.com/api/extension-guides/ai/language-model) used in this project, with links to the official documentation.

### Chat Participant API

The extension uses the [Chat Participant API](https://code.visualstudio.com/api/extension-guides/ai/chat) to create an interactive chat participant that users can invoke with `@modeldetector`.

- **[createChatParticipant](https://code.visualstudio.com/api/references/vscode-api#chat.createChatParticipant)**: Creates and registers a new chat participant. This method is used to initialize the `@modeldetector` participant that handles model detection requests.
  
- **[ChatRequestHandler](https://code.visualstudio.com/api/references/vscode-api#ChatRequestHandler)**: A function that processes incoming chat requests from users. The handler receives the user's request, context, and a response stream to provide real-time feedback.
  
- **[ChatResponseStream](https://code.visualstudio.com/api/references/vscode-api#ChatResponseStream)**: Provides methods to stream responses back to the chat interface. This allows the extension to display markdown, progress indicators, buttons, and other interactive elements.
  
- **[ChatRequest](https://code.visualstudio.com/api/references/vscode-api#ChatRequest)**: Represents a user's chat request, containing the prompt text, command, and other metadata needed to process the request.
  
- **[ChatContext](https://code.visualstudio.com/api/references/vscode-api#ChatContext)**: Contains the context for a chat session, including chat history and references, enabling context-aware responses.

### Language Model API

The extension also uses the [Language Model API](https://code.visualstudio.com/api/extension-guides/ai/language-model) for model detection and capabilities:

- **[vscode.lm](https://code.visualstudio.com/api/references/vscode-api#lm)**: The Language Model namespace provides access to available AI models and their capabilities within VS Code.

- **[LanguageModelChat](https://code.visualstudio.com/api/references/vscode-api#LanguageModelChat)**: Represents a language model that can be used for chat-based interactions, providing information about model family, vendor, and capabilities.

## 📈 Benefits & Use Cases

- **Real-time Model Detection**: Instantly identify which AI model is currently being used in VS Code
- **100% Accuracy**: Uses the [Chat Participant API](https://code.visualstudio.com/api/extension-guides/ai/chat) for precise model identification
- **Developer Insights**: Understand model capabilities, token limits, and vendor information
- **Continuous Monitoring**: Optional status bar integration for ongoing model tracking
- **Detection History**: Track and review model usage patterns over time

## 📦 Installation

For detailed installation instructions, please see the [Installation Guide](INSTALLATION_GUIDE.md).

### Quick Start

1. Ensure you have [Visual Studio Code](https://code.visualstudio.com/Download) v1.85.0 or higher
2. Install the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension
3. Install the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension
4. Install the AI Model Detector extension (see [Installation Guide](INSTALLATION_GUIDE.md) for methods)

## 📚 Related Documentation

- **[Installation Guide](INSTALLATION_GUIDE.md)** - Complete installation instructions and prerequisites
- **[Publishing Guide](PUBLISHING_GUIDE.md)** - Guide for publishing the extension
- **[Release Notes](RELEASE_NOTES_v2.1.0.md)** - Version 2.1.0 release notes
- **[MCP Server Documentation](mcp-server/README.md)** - MCP server integration documentation
- **[VS Code Extension API](https://code.visualstudio.com/api)** - Official VS Code Extension API documentation
- **[GitHub Copilot Documentation](https://docs.github.com/en/copilot)** - Official GitHub Copilot documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests:

- **[Report Issues](https://github.com/thisis-romar/vscode-ai-model-detector/issues)** - Report bugs or request features
- **[View Releases](https://github.com/thisis-romar/vscode-ai-model-detector/releases)** - Check out previous releases
- **[Repository](https://github.com/thisis-romar/vscode-ai-model-detector)** - View the source code

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

## 🔗 Additional Resources

- **[Model Context Protocol (MCP)](https://modelcontextprotocol.io/)** - Learn about MCP
- **[VS Code Chat Extensions](https://code.visualstudio.com/api/extension-guides/chat)** - Build chat extensions for VS Code
- **[NPM Package](https://www.npmjs.com/package/@emblem-projects/ai-model-detector-mcp)** - MCP server on NPM

---

**Author**: [Romar Johnson](mailto:admin@emblemprojects.com)  
**Repository**: [github.com/thisis-romar/vscode-ai-model-detector](https://github.com/thisis-romar/vscode-ai-model-detector)

