# VS Code AI Model Detector - Installation Guide# VS Code AI Model Detector - Installation Guide# AI Model Detector - Installation Guide for Others



**Version**: 2.1.0  

**Package**: [vscode-ai-model-detector](https://www.npmjs.com/package/vscode-ai-model-detector)  

**Repository**: [GitHub](https://github.com/thisis-romar/vscode-ai-model-detector)  **Version**: 2.1.0  ## 📦 **Current Status**

**Published**: ✅ **Publicly Available on npm**

**Package**: [vscode-ai-model-detector](https://www.npmjs.com/package/vscode-ai-model-detector)  - **Version**: 1.0.0 (Extension) + 2.1.0 (MCP Server)

---

**Repository**: [GitHub](https://github.com/thisis-romar/vscode-ai-model-detector)- **Published**: ❌ Not publicly available

## 📦 Current Status

- **Installation**: Manual sharing required

- ✅ **Published on npm**: https://www.npmjs.com/package/vscode-ai-model-detector

- ✅ **Version**: 2.1.0 (MCP Server)---

- ✅ **Public Repository**: https://github.com/thisis-romar/vscode-ai-model-detector

- ✅ **Installation**: Simple npm install---



---## 📋 Prerequisites



## 📋 Prerequisites## 🚀 **Option 1: Quick Share via VSIX (Recommended for Family/Friends)**



Before installing, ensure you have:Before installing, ensure you have:



- ✅ **VS Code** installed (latest version recommended)### **For You (Package Creator):**

- ✅ **Node.js** v18 or higher ([download](https://nodejs.org/))

- ✅ **GitHub Copilot** extension installed and active- ✅ **VS Code** installed (latest version recommended)



---- ✅ **Node.js** v18 or higher ([download](https://nodejs.org/))```powershell



## 🚀 Installation Methods- ✅ **GitHub Copilot** extension installed and active# Navigate to extension directory



### Method 1: Global Installation (Recommended)- ✅ **npm** (comes with Node.js)cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector



Install the MCP server globally via npm:



```bash---# Install dependencies (if not already done)

npm install -g vscode-ai-model-detector

```npm install



#### Configuration## 🚀 Quick Start



Create or update your Claude Desktop config file:# Compile TypeScript



**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  ### Install via npmnpm run compile

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  

**Linux**: `~/.config/Claude/claude_desktop_config.json`



Add this configuration:The easiest way to install the MCP server:# Package the extension



```jsonnpm run package

{

  "mcpServers": {```bash```

    "ai-model-detector": {

      "command": "vscode-ai-model-detector"npm install -g vscode-ai-model-detector

    }

  }```This creates: `vscode-ai-model-detector-1.0.0.vsix`

}

```



#### Restart Claude Desktop---### **Share These Files:**



Close and reopen Claude Desktop to load the MCP server.1. `vscode-ai-model-detector-1.0.0.vsix` (VS Code Extension)



---## 🔧 Configuration2. Entire `mcp-server` folder (MCP Integration)



### Method 2: npx (No Installation Required)3. This installation guide



Use npx to run the server without installing:### 1. Configure MCP in Claude Desktop



```json---

{

  "mcpServers": {If using with Claude Desktop, add to your `claude_desktop_config.json`:

    "ai-model-detector": {

      "command": "npx",### **For Your Dad (Installation):**

      "args": ["-y", "vscode-ai-model-detector"]

    }```json

  }

}{#### **Step 1: Install VS Code Extension**

```

  "mcpServers": {

---

    "ai-model-detector": {```powershell

### Method 3: Local Development Installation

      "command": "npx",# Method A: Via VS Code UI

For contributing or testing:

      "args": ["-y", "vscode-ai-model-detector"]# 1. Open VS Code

```bash

# Clone the repository    }# 2. Press Ctrl+Shift+P

git clone https://github.com/thisis-romar/vscode-ai-model-detector.git

cd vscode-ai-model-detector  }# 3. Type "Extensions: Install from VSIX"



# Install dependencies}# 4. Select the .vsix file you received

npm install

```

# Link for local development

npm link# Method B: Via Command Line

```

**Config location**:code --install-extension vscode-ai-model-detector-1.0.0.vsix

Then use the same Claude Desktop configuration as Method 1.

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json````

---

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

## 🔧 VS Code Configuration

- **Linux**: `~/.config/Claude/claude_desktop_config.json`#### **Step 2: Setup MCP Server**

### Using MCP Tools in VS Code



Once installed, the MCP server provides 4 tools accessible through GitHub Copilot Chat:

### 2. Configure MCP in VS Code (Optional)1. **Copy MCP Server Files**

1. **`detect_current_model`** - Detect currently active AI model

2. **`validate_model_access`** - List all available models   ```powershell

3. **`get_model_capabilities`** - Analyze model capabilities

4. **`monitor_model_changes`** - Monitor for model switchesFor VS Code MCP integration, create or edit `mcp.json` in your VS Code user directory:   # Copy the mcp-server folder to a permanent location



### Example Usage   # For example: C:\Users\[YourDad]\Tools\ai-model-detector\mcp-server



In GitHub Copilot Chat, you can now:**Location**:   ```



```- **Windows**: `%APPDATA%\Code\User\mcp.json`

@workspace What AI model am I currently using?

```- **macOS**: `~/Library/Application Support/Code/User/mcp.json`2. **Install MCP Server Dependencies**



The MCP server will detect the model and return accurate information.- **Linux**: `~/.config/Code/User/mcp.json`   ```powershell



---   cd C:\Users\[YourDad]\Tools\ai-model-detector\mcp-server



## ✅ Verification**Configuration**:   npm install



After installation, verify the setup:```json   ```



### 1. Check Package Installation{



```bash  "servers": {3. **Configure MCP in VS Code**

npm list -g vscode-ai-model-detector

```    "ai-model-detector": {   



Expected output:      "type": "stdio",   Open or create: `%APPDATA%\Code\User\mcp.json`

```

vscode-ai-model-detector@2.1.0      "command": "npx",   

```

      "args": ["-y", "vscode-ai-model-detector"],   Add this configuration:

### 2. Test MCP Server

      "env": {   ```json

Run the server manually:

        "MCP_VERSION": "2.1.0"   {

```bash

vscode-ai-model-detector      }     "servers": {

```

    }       "ai-model-detector": {

Expected output:

```  }         "type": "stdio",

MCP Server started successfully

Listening for commands...}         "command": "node",

```

```         "args": [

Press `Ctrl+C` to stop.

           "C:\\Users\\[YourDad]\\Tools\\ai-model-detector\\mcp-server\\start.mjs"

### 3. Verify in Claude Desktop

### 3. Restart Applications         ],

1. Open Claude Desktop

2. Check the MCP section in settings         "cwd": "C:\\Users\\[YourDad]\\Tools\\ai-model-detector\\mcp-server",

3. You should see "ai-model-detector" listed

4. Status should show "Connected" or "Ready"- Restart Claude Desktop (if using)         "env": {



---- Restart VS Code           "MCP_VERSION": "2.1.0"



## 🌐 Multi-Platform Support- Reload GitHub Copilot extension         }



### Windows       }



```powershell---     }

# Install via npm

npm install -g vscode-ai-model-detector   }



# Configuration path## ✅ Verification   ```

%APPDATA%\Claude\claude_desktop_config.json

```



### macOS### Test MCP Server4. **Restart VS Code**



```bash

# Install via npm

npm install -g vscode-ai-model-detector```bash#### **Step 3: Verify Installation**



# Configuration path# Test the MCP server directly

~/Library/Application Support/Claude/claude_desktop_config.json

```npx vscode-ai-model-detector1. **Check Extension**



### Linux```   - Open VS Code



```bash   - Press `Ctrl+Shift+M` 

# Install via npm

npm install -g vscode-ai-model-detectorYou should see:   - Should detect current AI model



# Configuration path```

~/.config/Claude/claude_desktop_config.json

```AI Model Detector MCP Server v2.1.0 started2. **Check MCP Tools**



---```   - Open GitHub Copilot Chat



## 🔄 Updating   - Use the MCP detection tools (should be available)



To update to the latest version:### Verify in Claude Desktop



```bash---

npm update -g vscode-ai-model-detector

```1. Open Claude Desktop



Or for a specific version:2. Look for the 🔌 icon (MCP tools)## 🌐 **Option 2: Publish to GitHub (For Public Sharing)**



```bash3. You should see tools from `ai-model-detector`

npm install -g vscode-ai-model-detector@latest

```### **Steps to Publish:**



Check your current version:### Verify in VS Code



```bash1. **Create GitHub Repository**

vscode-ai-model-detector --version

```1. Open GitHub Copilot Chat   ```bash



---2. Try using model detection features   # Create public repo: emblem-projects/ai-model-detector



## 🧰 Advanced Configuration3. Check the status bar for model information   # or use your personal GitHub account



### Custom Working Directory   ```



```json---

{

  "mcpServers": {2. **Push Code**

    "ai-model-detector": {

      "command": "vscode-ai-model-detector",## 🎮 Usage   ```bash

      "cwd": "/path/to/your/workspace"

    }   cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector

  }

}### Available MCP Tools   git init

```

   git add .

### Environment Variables

Once configured, you have access to these tools:   git commit -m "Initial release v1.0.0"

```json

{   git remote add origin https://github.com/[your-username]/ai-model-detector.git

  "mcpServers": {

    "ai-model-detector": {1. **`detect_current_model`** - Get current AI model information   git push -u origin main

      "command": "vscode-ai-model-detector",

      "env": {2. **`get_model_capabilities`** - Query model capabilities   ```

        "NODE_ENV": "production",

        "MCP_LOG_LEVEL": "info"3. **`monitor_model_changes`** - Track model switching

      }

    }4. **`validate_model_access`** - Verify model accessibility3. **Create Release with VSIX**

  }

}   - Build VSIX: `npm run package`

```

### Example Usage in Claude   - Create GitHub Release (v1.0.0)

### Debug Mode

   - Attach VSIX file to release

Enable verbose logging:

```

```json

{Can you detect which AI model I'm currently using?### **Installation from GitHub:**

  "mcpServers": {

    "ai-model-detector": {```

      "command": "vscode-ai-model-detector",

      "args": ["--debug"]```bash

    }

  }Claude will use the `detect_current_model` tool to provide accurate information.# Clone repository

}

```git clone https://github.com/[your-username]/ai-model-detector.git



------cd ai-model-detector



## 🐛 Troubleshooting



### Server Not Starting## 📦 Alternative Installation Methods# Install extension



**Issue**: MCP server doesn't appear in Claude Desktopcode --install-extension vscode-ai-model-detector-1.0.0.vsix



**Solutions**:### From GitHub Release

1. Verify installation: `npm list -g vscode-ai-model-detector`

2. Check config file syntax (valid JSON)# Setup MCP server

3. Restart Claude Desktop completely

4. Check logs in Claude Desktop settingsDownload the latest release from [GitHub Releases](https://github.com/thisis-romar/vscode-ai-model-detector/releases):cd mcp-server



### Command Not Foundnpm install



**Issue**: `vscode-ai-model-detector: command not found````bash



**Solutions**:# Download and extract release# Follow MCP configuration steps from Option 1

1. Ensure global npm install: `npm install -g vscode-ai-model-detector`

2. Check npm global path: `npm config get prefix`wget https://github.com/thisis-romar/vscode-ai-model-detector/releases/download/v2.1.0/vscode-ai-model-detector-2.1.0.tgz```

3. Add npm global bin to PATH:

   - Windows: `%APPDATA%\npm`

   - macOS/Linux: `/usr/local/bin`

# Install globally---

### Model Detection Not Working

npm install -g vscode-ai-model-detector-2.1.0.tgz

**Issue**: AI model is not being detected

```## 📦 **Option 3: Publish to npm (MCP Server Only)**

**Solutions**:

1. Ensure GitHub Copilot is active in VS Code

2. Verify VS Code version (minimum v1.85.0)

3. Check that Copilot Chat is open### From Source### **Publish MCP Server to npm:**

4. Try switching between different AI models

5. Restart VS Code



### Permission ErrorsFor development or customization:1. **Prepare Package**



**Issue**: EACCES or permission denied during installation   ```bash



**Solutions**:```bash   cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\mcp-server



**Windows**:# Clone repository   

```powershell

# Run PowerShell as Administratorgit clone https://github.com/thisis-romar/vscode-ai-model-detector.git   # Update package.json name to scoped package

npm install -g vscode-ai-model-detector

```cd vscode-ai-model-detector   # Change: "ai-model-detector-mcp-server"



**macOS/Linux**:   # To: "@emblem-projects/ai-model-detector-mcp"

```bash

# Fix npm permissions (recommended)# Install dependencies   ```

mkdir ~/.npm-global

npm config set prefix '~/.npm-global'npm install

echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc

source ~/.bashrc2. **Publish to npm**



# Then install# Build the project   ```bash

npm install -g vscode-ai-model-detector

```npm run compile   npm login  # Login to npm account



---   npm publish --access public



## 📚 Features Overview# Link globally for testing   ```



### Supported AI Models (14+)npm link



- ✅ **Anthropic**: Claude Sonnet 3.5, Claude Sonnet 4, Claude Opus```### **Installation via npm:**

- ✅ **OpenAI**: GPT-4, GPT-4o, GPT-4 Turbo, o1-preview, o1-mini

- ✅ **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 2.0 Flash

- ✅ **GitHub**: Custom Copilot models

---Once published, anyone can install with:

### MCP Tools Available



| Tool | Description |

|------|-------------|## 🔧 Troubleshooting```json

| `detect_current_model` | Get the currently active AI model |

| `validate_model_access` | List all available models in your VS Code |{

| `get_model_capabilities` | Analyze model features and limitations |

| `monitor_model_changes` | Track model switching during sessions |### MCP Server Not Starting  "servers": {



### Detection Method    "ai-model-detector": {



- **Accuracy**: 100% (uses VS Code Chat Participant API)**Issue**: Server doesn't start or shows errors      "type": "stdio",

- **Speed**: Real-time detection

- **Context**: Per-chat panel awareness      "command": "npx",

- **Storage**: SQLite3-based model state tracking

**Solutions**:      "args": [

---

```bash        "-y",

## 🔐 Privacy & Security

# Check Node.js version        "@emblem-projects/ai-model-detector-mcp"

- ✅ **No External Calls**: All detection happens locally

- ✅ **No Data Collection**: Zero telemetry or trackingnode --version  # Should be v18+      ]

- ✅ **Open Source**: Full transparency ([view source](https://github.com/thisis-romar/vscode-ai-model-detector))

- ✅ **No Dependencies**: Minimal attack surface    }



---# Clear npm cache  }



## 🤝 Contributingnpm cache clean --force}



Found a bug or want to contribute?```



1. **Report Issues**: [GitHub Issues](https://github.com/thisis-romar/vscode-ai-model-detector/issues)# Reinstall package

2. **Submit PRs**: [Pull Requests](https://github.com/thisis-romar/vscode-ai-model-detector/pulls)

3. **Documentation**: Help improve this guidenpm uninstall -g vscode-ai-model-detector**Much simpler!** No manual file copying needed.



---npm install -g vscode-ai-model-detector



## 📄 License---



MIT License - See [LICENSE](LICENSE) file for details# Test directly



---npx vscode-ai-model-detector## 🎯 **Recommended Approach for Your Dad**



## 🔗 Links```



- **npm Package**: https://www.npmjs.com/package/vscode-ai-model-detector**Best Option**: **Option 1 (Quick Share)**

- **GitHub Repository**: https://github.com/thisis-romar/vscode-ai-model-detector

- **Issues & Support**: https://github.com/thisis-romar/vscode-ai-model-detector/issues### Tools Not Appearing in Claude

- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

**Why?**

---

**Issue**: MCP tools don't show up in Claude Desktop- ✅ No publishing setup required

## 💡 Usage Examples

- ✅ Quick to share (just send files)

### Example 1: Detect Current Model

**Solutions**:- ✅ Full control over distribution

```typescript

// In GitHub Copilot Chat1. Verify `claude_desktop_config.json` syntax (must be valid JSON)- ✅ Can update easily by sending new VSIX

@workspace What model am I using right now?

2. Check config file location is correct for your OS

// Response: "You are currently using Claude Sonnet 4 (Anthropic)"

```3. Completely quit and restart Claude Desktop (not just close window)**Steps Summary:**



### Example 2: List Available Models4. Check Claude Desktop logs:1. You: Run `npm run package` to create VSIX



```typescript   - **Windows**: `%APPDATA%\Claude\logs\`2. You: Share VSIX + mcp-server folder

// In GitHub Copilot Chat

@workspace Show me all available AI models   - **macOS**: `~/Library/Logs/Claude/`3. Dad: Install VSIX in VS Code



// Response: Lists all 14+ models with their providers4. Dad: Copy mcp-server folder and configure mcp.json

```

### Detection Not Working in VS Code5. Dad: Restart VS Code

### Example 3: Model Capabilities

6. Done! ✅

```typescript

// In GitHub Copilot Chat**Issue**: Model detection fails or shows errors

@workspace What are the capabilities of the current model?

---

// Response: Detailed capability analysis

```**Solutions**:



---1. Ensure GitHub Copilot extension is active## 📋 **What Your Dad Needs**



## ⚡ Quick Start Summary2. Check VS Code output panel: View → Output → Select "GitHub Copilot"



1. **Install**: `npm install -g vscode-ai-model-detector`3. Verify MCP server is running: Check `mcp.json` configuration### **Prerequisites:**

2. **Configure**: Add to Claude Desktop config

3. **Restart**: Restart Claude Desktop4. Restart VS Code completely- ✅ VS Code installed

4. **Verify**: Check MCP connection in settings

5. **Use**: Ask Claude about your AI model!- ✅ Node.js installed (v18+)



---### Permission Errors on Windows- ✅ GitHub Copilot extension installed



**✅ You're all set!** The AI Model Detector is now installed and ready to use.- ✅ Basic familiarity with VS Code settings



For questions or support, open an issue on [GitHub](https://github.com/thisis-romar/vscode-ai-model-detector/issues).**Issue**: `EPERM` or permission denied errors


### **Files to Receive:**

**Solutions**:1. `vscode-ai-model-detector-1.0.0.vsix`

```powershell2. `mcp-server` folder (entire directory)

# Run PowerShell as Administrator3. This installation guide

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

### **Time Required:**

# Install in user directory- ⏱️ ~5-10 minutes for complete setup

npm install -g vscode-ai-model-detector --prefix=%LOCALAPPDATA%\npm

```---



### Module Not Found Errors## 🔧 **Troubleshooting**



**Issue**: `Cannot find module` errors### **Extension Not Loading**

```bash

**Solutions**:# Check installed extensions

```bashcode --list-extensions

# Verify npm global path

npm config get prefix# Should see: emblem-projects.vscode-ai-model-detector

```

# Add to PATH if needed (Windows)

# Add: %APPDATA%\npm to System PATH### **MCP Server Not Working**

```bash

# Add to PATH if needed (macOS/Linux)# Test MCP server manually

export PATH="$PATH:$(npm config get prefix)/bin"cd [mcp-server-path]

```node start.mjs



---# Should see: "AI Model Detector MCP Server v2.1.0 started"

```

## 🔄 Updates

### **Detection Not Working**

### Check Current Version- Ensure GitHub Copilot is active

- Try keyboard shortcut: `Ctrl+Shift+M`

```bash- Check VS Code Output panel for errors

npm list -g vscode-ai-model-detector

```---



### Update to Latest Version## 📞 **Support**



```bashIf your dad encounters issues:

npm update -g vscode-ai-model-detector1. Check this troubleshooting section

```2. Verify all prerequisites are met

3. Test MCP server independently

### Check for Available Updates4. Contact you for assistance 😊



```bash---

npm outdated -g vscode-ai-model-detector

```## 🔄 **Future Updates**



After updating, restart Claude Desktop and VS Code.When you make updates:

1. Build new VSIX: `npm run package`

---2. Share updated files

3. Dad reinstalls by selecting new VSIX

## 🗑️ Uninstallation4. MCP server updates automatically from shared folder



### Remove Package---



```bash**✅ Ready to Share!** Once you run `npm run package`, you'll have everything your dad needs to use this tool in his VS Code Copilot environment.

npm uninstall -g vscode-ai-model-detector
```

### Remove Configuration

**Claude Desktop**:
- Edit `claude_desktop_config.json`
- Remove the `ai-model-detector` entry from `mcpServers`

**VS Code**:
- Edit or delete `mcp.json`
- Remove the `ai-model-detector` server configuration

---

## 📞 Support

### Get Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/thisis-romar/vscode-ai-model-detector/issues)
- **Documentation**: [README.md](https://github.com/thisis-romar/vscode-ai-model-detector#readme)
- **Release Notes**: [RELEASE_NOTES_v2.1.0.md](https://github.com/thisis-romar/vscode-ai-model-detector/blob/main/RELEASE_NOTES_v2.1.0.md)

### Useful Commands

```bash
# Check installation
npm list -g vscode-ai-model-detector

# View package info
npm info vscode-ai-model-detector

# Test server
npx vscode-ai-model-detector

# View logs (add to config)
# Add "logLevel": "debug" to your MCP config
```

---

## 🎯 Next Steps

After successful installation:

1. ✅ Verify MCP server is running
2. ✅ Test detection in Claude Desktop
3. ✅ Configure git attribution (optional): Use included `Set-GitAuthorFromModel.ps1`
4. ✅ Explore MCP tools for model detection
5. ✅ Star the repository: [vscode-ai-model-detector](https://github.com/thisis-romar/vscode-ai-model-detector)

---

## 📚 Additional Resources

- **npm Package**: https://www.npmjs.com/package/vscode-ai-model-detector
- **GitHub Repository**: https://github.com/thisis-romar/vscode-ai-model-detector
- **MCP Documentation**: [Model Context Protocol](https://modelcontextprotocol.io/)
- **Claude Desktop**: [Anthropic Claude](https://claude.ai/download)

---

**Installation Complete!** 🎉

Your AI Model Detector MCP server is now ready to use. The server provides 100% accurate runtime detection of AI models in VS Code Copilot through the Chat Participant API.
