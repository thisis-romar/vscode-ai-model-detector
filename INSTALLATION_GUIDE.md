# VS Code AI Model Detector - Installation Guide

**Version**: 2.1.0  
**Extension Type**: VS Code Extension with MCP Integration  
**Repository**: [GitHub](https://github.com/thisis-romar/vscode-ai-model-detector)  
**Marketplace**: Coming Soon

---

## 📦 What Is This?

**VS Code AI Model Detector** is a VS Code extension that provides real-time AI model detection for GitHub Copilot. It uses the Chat Participant API breakthrough for 100% accurate model detection and includes an integrated MCP (Model Context Protocol) server for enhanced capabilities.

### Key Features

- ✅ **100% Accurate Detection**: Direct access to VS Code's selected AI model via Chat Participant API
- ✅ **Status Bar Integration**: Real-time model information in your VS Code status bar
- ✅ **Chat Participant**: `@modeldetector` command for instant model information
- ✅ **MCP Integration**: Built-in MCP server for enhanced tool capabilities
- ✅ **Multi-Model Support**: Works with Claude, GPT-4, Gemini, and all GitHub Copilot models

---

## 📋 Prerequisites

Before installing, ensure you have:

- ✅ **VS Code** v1.85.0 or higher ([download](https://code.visualstudio.com/))
- ✅ **GitHub Copilot** extension installed and active
- ✅ **GitHub Copilot Chat** extension (for `@modeldetector` participant)
- ✅ **Node.js** v18+ (only if using MCP features, [download](https://nodejs.org/))

---

## 🚀 Installation Methods

### Method 1: VS Code Marketplace (Recommended - Coming Soon)

Once published, install directly from the VS Code Extensions marketplace:

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
3. Search for "AI Model Detector"
4. Click **Install**
5. Reload VS Code when prompted

### Method 2: VSIX Package Installation (Current Method)

For early access or development versions:

1. **Download** the latest `.vsix` file from [GitHub Releases](https://github.com/thisis-romar/vscode-ai-model-detector/releases)

2. **Install via VS Code**:
   ```bash
   code --install-extension vscode-ai-model-detector-2.1.0.vsix
   ```

   Or manually:
   - Open VS Code
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
   - Type "Install from VSIX"
   - Select the downloaded `.vsix` file

3. **Reload VS Code** when prompted

### Method 3: Development Installation

For contributors and developers:

```bash
# Clone the repository
git clone https://github.com/thisis-romar/vscode-ai-model-detector.git
cd vscode-ai-model-detector

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension (optional)
npm run package

# Run in development mode
# Press F5 in VS Code to launch Extension Development Host
```

---

## ✅ Verification

After installation, verify the extension is working:

### 1. Check Extension is Installed

```bash
code --list-extensions | findstr vscode-ai-model-detector
```

Expected output:
```
emblem-projects.vscode-ai-model-detector
```

### 2. Check Status Bar

Look for the model detector icon in the VS Code status bar (bottom):
- 🤖 **Icon**: Shows current AI model vendor
- **Text**: Displays current model name
- **Click**: Opens detailed model information

### 3. Test Chat Participant

Open GitHub Copilot Chat and try:

```
@modeldetector
```

Expected response: Comprehensive model detection information including:
- Current model name and vendor
- Model ID and version
- Detection accuracy (100%)
- Detection method (Chat Participant API)

### 4. Test Commands

Press `Ctrl+Shift+P` and search for:
- "AI Model Detector: Detect Current Model"
- "AI Model Detector: Toggle Status Bar"

---

## 🔧 Configuration

Access settings via `Ctrl+,` → Search "AI Model Detector"

### Available Settings

```json
{
  "aiModelDetector.enableStatusBar": true,
  "aiModelDetector.statusBarUpdateInterval": 5000,
  "aiModelDetector.autoDetectInterval": 5000,
  "aiModelDetector.enableMcpIntegration": true
}
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableStatusBar` | boolean | `true` | Show/hide status bar item |
| `statusBarUpdateInterval` | number | `5000` | Status bar update frequency (milliseconds) |
| `autoDetectInterval` | number | `5000` | Auto-detection interval (milliseconds) |
| `enableMcpIntegration` | boolean | `true` | Enable MCP server features |

---

## 🌉 MCP Integration (Advanced)

The extension includes a built-in MCP server that provides enhanced capabilities through VS Code's Model Context Protocol support.

### What is MCP Integration?

The MCP (Model Context Protocol) server runs **inside the VS Code extension** and provides 4 additional tools:

1. **`detect_current_model`** - Enhanced detection with metadata
2. **`get_model_capabilities`** - Detailed model specifications
3. **`monitor_model_changes`** - Real-time change tracking
4. **`validate_model_access`** - Access verification

### How It Works

```
VS Code GitHub Copilot Chat
        ↕️ (Primary: 100% Accurate)
   Chat Participant API  
        ↕️ (Secondary: Enhanced Features)
    IPC Bridge (Port 3001)
        ↕️
    Built-in MCP Server (inside extension)
```

**Note**: This is NOT the same as Claude Desktop's `claude_desktop_config.json`. This uses VS Code's built-in MCP Server Definition Provider system.

### Verify MCP Server

To check if the MCP server is running:

1. Open VS Code Output panel: `View > Output`
2. Select "AI Model Detector" from the dropdown
3. Look for: "MCP Server started successfully on port 3001"

---

## 🐛 Troubleshooting

### Extension Not Loading

**Issue**: Extension doesn't appear in Extensions list

**Solutions**:
1. Verify installation: `code --list-extensions`
2. Check VS Code version (minimum v1.85.0)
3. Reload VS Code: `Ctrl+R` or `Developer: Reload Window`
4. Check Output panel for errors: `View > Output > AI Model Detector`

### Status Bar Not Showing

**Issue**: No model information in status bar

**Solutions**:
1. Check setting: `aiModelDetector.enableStatusBar` must be `true`
2. Ensure GitHub Copilot is active
3. Open a file (status bar requires active editor)
4. Try toggling: `Ctrl+Shift+P` → "AI Model Detector: Toggle Status Bar"

### Chat Participant Not Working

**Issue**: `@modeldetector` command not recognized

**Solutions**:
1. Ensure **GitHub Copilot Chat** extension is installed
2. Reload VS Code window
3. Open Copilot Chat panel: `Ctrl+Alt+I` or `View > Open View... > GitHub Copilot Chat`
4. Try typing `@` to see available participants

### Model Detection Shows "Unknown"

**Issue**: Extension can't detect current model

**Solutions**:
1. Ensure GitHub Copilot is active and connected
2. Try switching models in Copilot Chat
3. Restart VS Code
4. Check GitHub Copilot status in status bar

### MCP Server Not Starting

**Issue**: MCP features unavailable

**Solutions**:
1. Check setting: `aiModelDetector.enableMcpIntegration` must be `true`
2. Verify Node.js is installed: `node --version` (v18+ required)
3. Check port 3001 is not in use
4. Review Output panel: `View > Output > AI Model Detector`

---

## 📚 Supported AI Models (14+)

The extension accurately detects:

### Anthropic
- ✅ Claude Sonnet 3.5
- ✅ Claude Sonnet 4
- ✅ Claude Opus
- ✅ Claude Haiku

### OpenAI
- ✅ GPT-4
- ✅ GPT-4o
- ✅ GPT-4 Turbo
- ✅ o1-preview
- ✅ o1-mini

### Google
- ✅ Gemini 1.5 Pro
- ✅ Gemini 1.5 Flash
- ✅ Gemini 2.0 Flash

### GitHub
- ✅ Custom Copilot models

---

## 🔐 Privacy & Security

- ✅ **No External Calls**: All detection happens locally within VS Code
- ✅ **No Data Collection**: Zero telemetry or tracking
- ✅ **Open Source**: Full transparency ([view source](https://github.com/thisis-romar/vscode-ai-model-detector))
- ✅ **No Network**: MCP server runs on localhost only (127.0.0.1:3001)

---

## 🤝 Contributing

Found a bug or want to contribute?

1. **Report Issues**: [GitHub Issues](https://github.com/thisis-romar/vscode-ai-model-detector/issues)
2. **Submit PRs**: [Pull Requests](https://github.com/thisis-romar/vscode-ai-model-detector/pulls)
3. **Documentation**: Help improve this guide

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 🔗 Links

- **GitHub Repository**: https://github.com/thisis-romar/vscode-ai-model-detector
- **Issues & Support**: https://github.com/thisis-romar/vscode-ai-model-detector/issues
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- **VS Code Marketplace**: Coming Soon

---

## 💡 Usage Examples

### Example 1: Detect Current Model in Chat

```
@modeldetector

Response:
✅ Current Model: Claude Sonnet 4 (Anthropic)
📊 Model ID: claude-3-5-sonnet-20241022
🎯 Detection Method: Chat Participant API
✨ Accuracy: 100%
```

### Example 2: Check Status Bar

Click the status bar item (e.g., "🤖 Claude Sonnet 4") to see:
- Full model name
- Vendor information
- Model family
- Detection timestamp

### Example 3: Use Keyboard Shortcut

Press `Ctrl+Shift+M` to:
- Instantly detect current model
- Display quick pick with model details
- Access model-specific actions

---

## ⚡ Quick Start Summary

1. **Install**: Via VSIX or VS Code Marketplace (coming soon)
2. **Verify**: Check status bar shows current model
3. **Test**: Use `@modeldetector` in Copilot Chat
4. **Configure**: Adjust settings via `Ctrl+,`
5. **Enjoy**: 100% accurate AI model detection!

---

**✅ You're all set!** The AI Model Detector is now installed and ready to use in VS Code.

For questions or support, open an issue on [GitHub](https://github.com/thisis-romar/vscode-ai-model-detector/issues).