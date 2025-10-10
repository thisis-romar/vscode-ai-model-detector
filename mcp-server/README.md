# AI Model Detector MCP Server

[![npm version](https://img.shields.io/npm/v/@emblem-projects/ai-model-detector-mcp.svg)](https://www.npmjs.com/package/@emblem-projects/ai-model-detector-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Real-time VS Code AI model detection MCP server with SQLite3 storage analysis, per-chat context awareness, and 100% accuracy.

## 🎯 Features

- **Panel-Only Detection**: Reads the authoritative `chat.currentLanguageModel.panel` key from VS Code's storage database
- **Real-time Results**: Instantly surfaces the active model ID, vendor, and family with high confidence
- **Zero Fallbacks**: No heuristics or settings parsing—every answer is sourced from the panel configuration
- **SQLite3 Storage Analysis**: Direct queries against `state.vscdb` ensure reproducible evidence
- **Model Intelligence**: Bundled model metadata enables capability lookups and validation workflows
- **MCP Protocol**: Standard Model Context Protocol interface for easy integration

## 📦 Installation

### NPM (Global)
```bash
npm install -g @emblem-projects/ai-model-detector-mcp
```

### NPX (No Installation)
```bash
npx @emblem-projects/ai-model-detector-mcp
```

### Claude Desktop Configuration

Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ai-model-detector": {
      "command": "npx",
      "args": [
        "-y",
        "@emblem-projects/ai-model-detector-mcp"
      ]
    }
  }
}
```

Or use the local path (if installed globally):

```json
{
  "mcpServers": {
    "ai-model-detector": {
      "command": "node",
      "args": [
        "/path/to/node_modules/@emblem-projects/ai-model-detector-mcp/dist/index.js"
      ]
    }
  }
}
```

### Other MCP Clients

For VS Code with MCP support, add to `mcp.json`:

```json
{
  "servers": {
    "ai-model-detector": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@emblem-projects/ai-model-detector-mcp"
      ]
    }
  }
}
```

## 🛠️ Available Tools

### 1. `detect_current_model`
Detects the currently active AI model by reading VS Code's panel configuration.

**Response includes:**
- Model ID (e.g., `copilot/gpt-5-codex`)
- Model family (Claude, GPT, Gemini, etc.)
- Vendor (Anthropic, OpenAI, Google, etc.)
- Detection source (`storage:panel`)
- Confidence score

**Example:**
```json
{
  "model": "copilot/gpt-5-codex",
  "family": "gpt",
  "vendor": "OpenAI",
  "source": "storage:panel",
  "confidence": "high"
}
```

### 2. `validate_model_access`
Validates the panel detection pipeline and optionally returns the catalog of known models.

**Response includes:**
- Detection capability status
- Optional list of supported model definitions
- VS Code storage status summary

### 3. `get_model_capabilities`
Analyzes capabilities of a known AI model.

**Parameters:**
- `modelId`: Model identifier to analyze

**Response includes:**
- Model family classification
- Vendor information
- Typical capabilities (context window, features)

### 4. `monitor_model_changes`
Starts monitoring for model changes.

**Parameters:**
- `interval`: Monitoring interval in milliseconds (default: 5000)

## 🔧 Requirements

- **Node.js**: >= 18.0.0
- **VS Code**: >= 1.85.0 (for detection to work)
- **Operating System**: Windows, macOS, or Linux

## 📊 Detection Method

The MCP server performs a single, deterministic lookup:

1. **Panel Storage Query**: Reads `chat.currentLanguageModel.panel` from VS Code's `state.vscdb`
  - Source: `storage:panel`
  - Confidence: **high** (direct panel configuration)
  - Failure Mode: Returns an explicit error if the key is missing

No editor, editing-session, or settings.json fallbacks are executed—every answer is grounded in the panel selection.

## 🚀 Usage Examples

### With Claude Desktop

Once configured, ask Claude:
- "What model are we currently using?"
- "Detect the current AI model"
- "What models are available?"

Claude will use the MCP tools to provide accurate, real-time information.

### Programmatic Access

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['node_modules/@emblem-projects/ai-model-detector-mcp/dist/index.js']
});

const client = new Client({
  name: 'my-app',
  version: '1.0.0'
}, {
  capabilities: {}
});

await client.connect(transport);

// Detect current model
const result = await client.callTool({
  name: 'detect_current_model',
  arguments: {}
});

console.log(result);
```

## 📝 Development

### Building from Source

```bash
git clone https://github.com/emblem-projects/ai-model-detector-mcp.git
cd ai-model-detector-mcp
npm install
npm run build
```

### Testing

```bash
# Run test detection
node test-storage-detection.js

# Test MCP server
node start.mjs
```

## 🔒 Privacy & Security

- **Local Only**: All detection happens locally on your machine
- **No External Calls**: No data is sent to external services
- **Read-Only**: Only reads VS Code storage, never writes
- **SQLite3 Safety**: Uses proper SQLite3 binding with error handling

## 📄 Version History

### 2.1.0 (Current)
- Refactored to use RealVSCodeBridge for accurate detection
- Enhanced per-chat context awareness
- Improved error handling and logging
- Added comprehensive test suite

### 2.0.0
- Initial MCP server implementation
- Basic model detection via storage analysis

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/emblem-projects/ai-model-detector-mcp/issues)
- **Email**: tools@emblem-projects.com

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built on the [Model Context Protocol](https://modelcontextprotocol.io/) by Anthropic
- Uses [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- Inspired by the need for accurate AI model detection in VS Code

---

**Made with ❤️ by Emblem Projects**
