# VS Code AI Model Detector - Installation Guide# AI Model Detector - Installation Guide for Others



**Version**: 2.1.0  ## 📦 **Current Status**

**Package**: [vscode-ai-model-detector](https://www.npmjs.com/package/vscode-ai-model-detector)  - **Version**: 1.0.0 (Extension) + 2.1.0 (MCP Server)

**Repository**: [GitHub](https://github.com/thisis-romar/vscode-ai-model-detector)- **Published**: ❌ Not publicly available

- **Installation**: Manual sharing required

---

---

## 📋 Prerequisites

## 🚀 **Option 1: Quick Share via VSIX (Recommended for Family/Friends)**

Before installing, ensure you have:

### **For You (Package Creator):**

- ✅ **VS Code** installed (latest version recommended)

- ✅ **Node.js** v18 or higher ([download](https://nodejs.org/))```powershell

- ✅ **GitHub Copilot** extension installed and active# Navigate to extension directory

- ✅ **npm** (comes with Node.js)cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector



---# Install dependencies (if not already done)

npm install

## 🚀 Quick Start

# Compile TypeScript

### Install via npmnpm run compile



The easiest way to install the MCP server:# Package the extension

npm run package

```bash```

npm install -g vscode-ai-model-detector

```This creates: `vscode-ai-model-detector-1.0.0.vsix`



---### **Share These Files:**

1. `vscode-ai-model-detector-1.0.0.vsix` (VS Code Extension)

## 🔧 Configuration2. Entire `mcp-server` folder (MCP Integration)

3. This installation guide

### 1. Configure MCP in Claude Desktop

---

If using with Claude Desktop, add to your `claude_desktop_config.json`:

### **For Your Dad (Installation):**

```json

{#### **Step 1: Install VS Code Extension**

  "mcpServers": {

    "ai-model-detector": {```powershell

      "command": "npx",# Method A: Via VS Code UI

      "args": ["-y", "vscode-ai-model-detector"]# 1. Open VS Code

    }# 2. Press Ctrl+Shift+P

  }# 3. Type "Extensions: Install from VSIX"

}# 4. Select the .vsix file you received

```

# Method B: Via Command Line

**Config location**:code --install-extension vscode-ai-model-detector-1.0.0.vsix

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json````

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

- **Linux**: `~/.config/Claude/claude_desktop_config.json`#### **Step 2: Setup MCP Server**



### 2. Configure MCP in VS Code (Optional)1. **Copy MCP Server Files**

   ```powershell

For VS Code MCP integration, create or edit `mcp.json` in your VS Code user directory:   # Copy the mcp-server folder to a permanent location

   # For example: C:\Users\[YourDad]\Tools\ai-model-detector\mcp-server

**Location**:   ```

- **Windows**: `%APPDATA%\Code\User\mcp.json`

- **macOS**: `~/Library/Application Support/Code/User/mcp.json`2. **Install MCP Server Dependencies**

- **Linux**: `~/.config/Code/User/mcp.json`   ```powershell

   cd C:\Users\[YourDad]\Tools\ai-model-detector\mcp-server

**Configuration**:   npm install

```json   ```

{

  "servers": {3. **Configure MCP in VS Code**

    "ai-model-detector": {   

      "type": "stdio",   Open or create: `%APPDATA%\Code\User\mcp.json`

      "command": "npx",   

      "args": ["-y", "vscode-ai-model-detector"],   Add this configuration:

      "env": {   ```json

        "MCP_VERSION": "2.1.0"   {

      }     "servers": {

    }       "ai-model-detector": {

  }         "type": "stdio",

}         "command": "node",

```         "args": [

           "C:\\Users\\[YourDad]\\Tools\\ai-model-detector\\mcp-server\\start.mjs"

### 3. Restart Applications         ],

         "cwd": "C:\\Users\\[YourDad]\\Tools\\ai-model-detector\\mcp-server",

- Restart Claude Desktop (if using)         "env": {

- Restart VS Code           "MCP_VERSION": "2.1.0"

- Reload GitHub Copilot extension         }

       }

---     }

   }

## ✅ Verification   ```



### Test MCP Server4. **Restart VS Code**



```bash#### **Step 3: Verify Installation**

# Test the MCP server directly

npx vscode-ai-model-detector1. **Check Extension**

```   - Open VS Code

   - Press `Ctrl+Shift+M` 

You should see:   - Should detect current AI model

```

AI Model Detector MCP Server v2.1.0 started2. **Check MCP Tools**

```   - Open GitHub Copilot Chat

   - Use the MCP detection tools (should be available)

### Verify in Claude Desktop

---

1. Open Claude Desktop

2. Look for the 🔌 icon (MCP tools)## 🌐 **Option 2: Publish to GitHub (For Public Sharing)**

3. You should see tools from `ai-model-detector`

### **Steps to Publish:**

### Verify in VS Code

1. **Create GitHub Repository**

1. Open GitHub Copilot Chat   ```bash

2. Try using model detection features   # Create public repo: emblem-projects/ai-model-detector

3. Check the status bar for model information   # or use your personal GitHub account

   ```

---

2. **Push Code**

## 🎮 Usage   ```bash

   cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector

### Available MCP Tools   git init

   git add .

Once configured, you have access to these tools:   git commit -m "Initial release v1.0.0"

   git remote add origin https://github.com/[your-username]/ai-model-detector.git

1. **`detect_current_model`** - Get current AI model information   git push -u origin main

2. **`get_model_capabilities`** - Query model capabilities   ```

3. **`monitor_model_changes`** - Track model switching

4. **`validate_model_access`** - Verify model accessibility3. **Create Release with VSIX**

   - Build VSIX: `npm run package`

### Example Usage in Claude   - Create GitHub Release (v1.0.0)

   - Attach VSIX file to release

```

Can you detect which AI model I'm currently using?### **Installation from GitHub:**

```

```bash

Claude will use the `detect_current_model` tool to provide accurate information.# Clone repository

git clone https://github.com/[your-username]/ai-model-detector.git

---cd ai-model-detector



## 📦 Alternative Installation Methods# Install extension

code --install-extension vscode-ai-model-detector-1.0.0.vsix

### From GitHub Release

# Setup MCP server

Download the latest release from [GitHub Releases](https://github.com/thisis-romar/vscode-ai-model-detector/releases):cd mcp-server

npm install

```bash

# Download and extract release# Follow MCP configuration steps from Option 1

wget https://github.com/thisis-romar/vscode-ai-model-detector/releases/download/v2.1.0/vscode-ai-model-detector-2.1.0.tgz```



# Install globally---

npm install -g vscode-ai-model-detector-2.1.0.tgz

```## 📦 **Option 3: Publish to npm (MCP Server Only)**



### From Source### **Publish MCP Server to npm:**



For development or customization:1. **Prepare Package**

   ```bash

```bash   cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\mcp-server

# Clone repository   

git clone https://github.com/thisis-romar/vscode-ai-model-detector.git   # Update package.json name to scoped package

cd vscode-ai-model-detector   # Change: "ai-model-detector-mcp-server"

   # To: "@emblem-projects/ai-model-detector-mcp"

# Install dependencies   ```

npm install

2. **Publish to npm**

# Build the project   ```bash

npm run compile   npm login  # Login to npm account

   npm publish --access public

# Link globally for testing   ```

npm link

```### **Installation via npm:**



---Once published, anyone can install with:



## 🔧 Troubleshooting```json

{

### MCP Server Not Starting  "servers": {

    "ai-model-detector": {

**Issue**: Server doesn't start or shows errors      "type": "stdio",

      "command": "npx",

**Solutions**:      "args": [

```bash        "-y",

# Check Node.js version        "@emblem-projects/ai-model-detector-mcp"

node --version  # Should be v18+      ]

    }

# Clear npm cache  }

npm cache clean --force}

```

# Reinstall package

npm uninstall -g vscode-ai-model-detector**Much simpler!** No manual file copying needed.

npm install -g vscode-ai-model-detector

---

# Test directly

npx vscode-ai-model-detector## 🎯 **Recommended Approach for Your Dad**

```

**Best Option**: **Option 1 (Quick Share)**

### Tools Not Appearing in Claude

**Why?**

**Issue**: MCP tools don't show up in Claude Desktop- ✅ No publishing setup required

- ✅ Quick to share (just send files)

**Solutions**:- ✅ Full control over distribution

1. Verify `claude_desktop_config.json` syntax (must be valid JSON)- ✅ Can update easily by sending new VSIX

2. Check config file location is correct for your OS

3. Completely quit and restart Claude Desktop (not just close window)**Steps Summary:**

4. Check Claude Desktop logs:1. You: Run `npm run package` to create VSIX

   - **Windows**: `%APPDATA%\Claude\logs\`2. You: Share VSIX + mcp-server folder

   - **macOS**: `~/Library/Logs/Claude/`3. Dad: Install VSIX in VS Code

4. Dad: Copy mcp-server folder and configure mcp.json

### Detection Not Working in VS Code5. Dad: Restart VS Code

6. Done! ✅

**Issue**: Model detection fails or shows errors

---

**Solutions**:

1. Ensure GitHub Copilot extension is active## 📋 **What Your Dad Needs**

2. Check VS Code output panel: View → Output → Select "GitHub Copilot"

3. Verify MCP server is running: Check `mcp.json` configuration### **Prerequisites:**

4. Restart VS Code completely- ✅ VS Code installed

- ✅ Node.js installed (v18+)

### Permission Errors on Windows- ✅ GitHub Copilot extension installed

- ✅ Basic familiarity with VS Code settings

**Issue**: `EPERM` or permission denied errors

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
