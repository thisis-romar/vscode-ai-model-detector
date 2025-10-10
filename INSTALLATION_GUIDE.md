# AI Model Detector - Installation Guide for Others

## 📦 **Current Status**
- **Version**: 1.0.0 (Extension) + 2.1.0 (MCP Server)
- **Published**: ❌ Not publicly available
- **Installation**: Manual sharing required

---

## 🚀 **Option 1: Quick Share via VSIX (Recommended for Family/Friends)**

### **For You (Package Creator):**

```powershell
# Navigate to extension directory
cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector

# Install dependencies (if not already done)
npm install

# Compile TypeScript
npm run compile

# Package the extension
npm run package
```

This creates: `vscode-ai-model-detector-1.0.0.vsix`

### **Share These Files:**
1. `vscode-ai-model-detector-1.0.0.vsix` (VS Code Extension)
2. Entire `mcp-server` folder (MCP Integration)
3. This installation guide

---

### **For Your Dad (Installation):**

#### **Step 1: Install VS Code Extension**

```powershell
# Method A: Via VS Code UI
# 1. Open VS Code
# 2. Press Ctrl+Shift+P
# 3. Type "Extensions: Install from VSIX"
# 4. Select the .vsix file you received

# Method B: Via Command Line
code --install-extension vscode-ai-model-detector-1.0.0.vsix
```

#### **Step 2: Setup MCP Server**

1. **Copy MCP Server Files**
   ```powershell
   # Copy the mcp-server folder to a permanent location
   # For example: C:\Users\[YourDad]\Tools\ai-model-detector\mcp-server
   ```

2. **Install MCP Server Dependencies**
   ```powershell
   cd C:\Users\[YourDad]\Tools\ai-model-detector\mcp-server
   npm install
   ```

3. **Configure MCP in VS Code**
   
   Open or create: `%APPDATA%\Code\User\mcp.json`
   
   Add this configuration:
   ```json
   {
     "servers": {
       "ai-model-detector": {
         "type": "stdio",
         "command": "node",
         "args": [
           "C:\\Users\\[YourDad]\\Tools\\ai-model-detector\\mcp-server\\start.mjs"
         ],
         "cwd": "C:\\Users\\[YourDad]\\Tools\\ai-model-detector\\mcp-server",
         "env": {
           "MCP_VERSION": "2.1.0"
         }
       }
     }
   }
   ```

4. **Restart VS Code**

#### **Step 3: Verify Installation**

1. **Check Extension**
   - Open VS Code
   - Press `Ctrl+Shift+M` 
   - Should detect current AI model

2. **Check MCP Tools**
   - Open GitHub Copilot Chat
   - Use the MCP detection tools (should be available)

---

## 🌐 **Option 2: Publish to GitHub (For Public Sharing)**

### **Steps to Publish:**

1. **Create GitHub Repository**
   ```bash
   # Create public repo: emblem-projects/ai-model-detector
   # or use your personal GitHub account
   ```

2. **Push Code**
   ```bash
   cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector
   git init
   git add .
   git commit -m "Initial release v1.0.0"
   git remote add origin https://github.com/[your-username]/ai-model-detector.git
   git push -u origin main
   ```

3. **Create Release with VSIX**
   - Build VSIX: `npm run package`
   - Create GitHub Release (v1.0.0)
   - Attach VSIX file to release

### **Installation from GitHub:**

```bash
# Clone repository
git clone https://github.com/[your-username]/ai-model-detector.git
cd ai-model-detector

# Install extension
code --install-extension vscode-ai-model-detector-1.0.0.vsix

# Setup MCP server
cd mcp-server
npm install

# Follow MCP configuration steps from Option 1
```

---

## 📦 **Option 3: Publish to npm (MCP Server Only)**

### **Publish MCP Server to npm:**

1. **Prepare Package**
   ```bash
   cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\mcp-server
   
   # Update package.json name to scoped package
   # Change: "ai-model-detector-mcp-server"
   # To: "@emblem-projects/ai-model-detector-mcp"
   ```

2. **Publish to npm**
   ```bash
   npm login  # Login to npm account
   npm publish --access public
   ```

### **Installation via npm:**

Once published, anyone can install with:

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

**Much simpler!** No manual file copying needed.

---

## 🎯 **Recommended Approach for Your Dad**

**Best Option**: **Option 1 (Quick Share)**

**Why?**
- ✅ No publishing setup required
- ✅ Quick to share (just send files)
- ✅ Full control over distribution
- ✅ Can update easily by sending new VSIX

**Steps Summary:**
1. You: Run `npm run package` to create VSIX
2. You: Share VSIX + mcp-server folder
3. Dad: Install VSIX in VS Code
4. Dad: Copy mcp-server folder and configure mcp.json
5. Dad: Restart VS Code
6. Done! ✅

---

## 📋 **What Your Dad Needs**

### **Prerequisites:**
- ✅ VS Code installed
- ✅ Node.js installed (v18+)
- ✅ GitHub Copilot extension installed
- ✅ Basic familiarity with VS Code settings

### **Files to Receive:**
1. `vscode-ai-model-detector-1.0.0.vsix`
2. `mcp-server` folder (entire directory)
3. This installation guide

### **Time Required:**
- ⏱️ ~5-10 minutes for complete setup

---

## 🔧 **Troubleshooting**

### **Extension Not Loading**
```bash
# Check installed extensions
code --list-extensions

# Should see: emblem-projects.vscode-ai-model-detector
```

### **MCP Server Not Working**
```bash
# Test MCP server manually
cd [mcp-server-path]
node start.mjs

# Should see: "AI Model Detector MCP Server v2.1.0 started"
```

### **Detection Not Working**
- Ensure GitHub Copilot is active
- Try keyboard shortcut: `Ctrl+Shift+M`
- Check VS Code Output panel for errors

---

## 📞 **Support**

If your dad encounters issues:
1. Check this troubleshooting section
2. Verify all prerequisites are met
3. Test MCP server independently
4. Contact you for assistance 😊

---

## 🔄 **Future Updates**

When you make updates:
1. Build new VSIX: `npm run package`
2. Share updated files
3. Dad reinstalls by selecting new VSIX
4. MCP server updates automatically from shared folder

---

**✅ Ready to Share!** Once you run `npm run package`, you'll have everything your dad needs to use this tool in his VS Code Copilot environment.
