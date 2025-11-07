# VS Code AI Model Detector

A Visual Studio Code extension that provides real-time detection and classification of AI models used in GitHub Copilot and other AI-powered extensions. Supports accurate model identification using VS Code's native storage and settings.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![VS Code](https://img.shields.io/badge/VS%20Code-1.85%2B-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- 🔍 **Real-Time Model Detection**: Accurately identifies current AI model from VS Code's application storage
- 🧠 **Dynamic Model Registry**: Supports 41+ model IDs across major AI providers
- ⚡ **High Performance**: Direct integration with VS Code's SQLite storage
- 📊 **Comprehensive Classification**: Detects model family, vendor, and capabilities
- 🔄 **Live Updates**: Monitor model changes in real-time
- 🎯 **High Confidence Detection**: Uses actual VS Code settings and Chat Participant API
- 🛡️ **Multi-Installation Support**: Works with VS Code Stable, Insiders, and VSCodium

## Supported Models

> **Source**: Model IDs and formats match official VS Code Chat Model enums from [microsoft/vscode-copilot-chat](https://github.com/microsoft/vscode-copilot-chat) configurationService.ts

### OpenAI GPT Series
- GPT-4.1 (2025-04-14) ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L529))
- GPT-4o mini ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L530))
- GPT-5 ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L531))
- GPT-5 mini ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L532))
- GPT-5-Codex ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L533))

### OpenAI O-Series
- O1 ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L535))
- O1 mini ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L536))
- O3 mini ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L537))

### Anthropic Claude Series
- Claude 3.5 Sonnet ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L540))
- Claude 3.7 Sonnet ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L541))
- Claude Haiku 4.5 ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L542))
- Claude Opus 4 ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L543))
- Claude Opus 4.1 ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L544))
- Claude Sonnet 4 ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L545))
- Claude Sonnet 4.5 ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L546))

### Google Gemini Series
- Gemini 2.5 Pro ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L550))
- Gemini 2.0 Pro Experimental ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L551))
- Gemini 2.0 Flash ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L552))

### Other Models
- DeepSeek Chat ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L555))
- Grok Code Fast 1 ([VS Code Chat Model](https://github.com/microsoft/vscode-copilot-chat/blob/main/src/configurationService.ts#L556))

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "AI Model Detector"
4. Click Install

Or install from VS Code Marketplace: [AI Model Detector Extension](https://marketplace.visualstudio.com/items?itemName=thisis-romar.vscode-ai-model-detector)

## Usage

### Basic Detection
```typescript
const detector = vscode.extensions.getExtension('thisis-romar.vscode-ai-model-detector');
const api = await detector.activate();

const result = await api.detectCurrentModel();
console.log('Current Model:', result.currentModel);
```

### Monitor Model Changes
```typescript
// Start monitoring with 5 second intervals
const sessionId = await api.startModelMonitoring(5000);

// Later, stop monitoring
await api.stopModelMonitoring(sessionId);
```

### Get Model Capabilities
```typescript
const modelInfo = await api.getModelCapabilities('claude-3.5-sonnet');
console.log('Capabilities:', modelInfo.capabilities);
```

## How It Works

### Model Detection Process
1. Queries VS Code's SQLite storage database (`state.vscdb`)
2. Looks for `chat.currentLanguageModel.panel` key
3. Parses model identifier to determine family and provider
4. Cross-references with dynamic registry of 41+ models
5. Returns comprehensive model information with high confidence

### Dynamic Registry
- Real-time updates for new model versions
- Format normalization (dots vs hyphens)
- Comprehensive metadata including:
  - Token limits
  - Special capabilities
  - Context windows
  - Model families
  - Vendor information

## Model Metadata

Each detected model includes:
```typescript
interface ModelInfo {
  id: string;           // Unique model identifier
  name: string;         // Display name
  vendor: ModelVendor;  // OpenAI, Anthropic, Google, etc.
  family: ModelFamily;  // GPT, Claude, Gemini, etc.
  maxTokens: number;    // Maximum context length
  capabilities: ModelCapability[]; // Supported features
  version?: string;     // Model version if available
  accuracy?: string;    // Detection accuracy level
}
```

## Configuration

No configuration required for basic usage. The extension automatically detects models from VS Code's native storage.

## Requirements

- Visual Studio Code >= 1.85.0
- GitHub Copilot extension (for Copilot model detection)
- Active AI extension using VS Code's Chat Participant API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes with proper [attribution](#attribution)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Attribution

This project follows the GIT-ATT-001 v1.1.0 standard for AI attribution. All commits should include proper AI attribution blocks:

```
AI-Attribution:
- Model: <model-id> (Vendor)
- Session: <chat-session-uuid or manual-commit-timestamp>
- Context: <development context>

Co-authored-by: <Platform-Name> (<model-id>) <admin+llm-[normalized-id]@emblemprojects.com>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📫 Issue Tracker: [GitHub Issues](https://github.com/thisis-romar/vscode-ai-model-detector/issues)
- 📝 Documentation: [Wiki](https://github.com/thisis-romar/vscode-ai-model-detector/wiki)
- 🤝 Discussions: [GitHub Discussions](https://github.com/thisis-romar/vscode-ai-model-detector/discussions)

---

**Note**: Model IDs and formats match official VS Code Chat Model enums. For complete documentation of the model registry, see `docs/OFFICIAL_MODEL_REGISTRY.md`.
