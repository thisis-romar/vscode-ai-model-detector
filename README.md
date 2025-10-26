# AI Model Detector

A Visual Studio Code extension for real-time AI model detection with 100% accuracy using the Chat Participant API.

## 🎯 Technical Implementation

This extension leverages the Visual Studio Code Extension API to provide real-time AI model detection capabilities. The implementation uses several key VS Code APIs to achieve accurate model detection and user interaction.

## 📚 Chat Participant API Documentation

This section provides an overview of the VS Code Chat Participant API and Language Model API used in this project, with links to the official documentation.

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
- **100% Accuracy**: Uses the Chat Participant API for precise model identification
- **Developer Insights**: Understand model capabilities, token limits, and vendor information
- **Continuous Monitoring**: Optional status bar integration for ongoing model tracking
- **Detection History**: Track and review model usage patterns over time

