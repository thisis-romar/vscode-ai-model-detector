# 🎁 AI Model Detector - Ready to Install!

Hey there! 👋

Your son/daughter has built an awesome tool for VS Code that shows you **exactly which AI model** you're using in GitHub Copilot. No more guessing!

## 🚀 What This Does

- Shows your current AI model in real-time
- Works with GitHub Copilot Chat
- Displays model info in the status bar
- Tracks your model usage history

## 📋 What You Need

Before installing, make sure you have:

- ✅ **VS Code** installed
- ✅ **Node.js** (version 18 or higher)
- ✅ **GitHub Copilot** extension active

## ⚡ Super Quick Installation (Recommended)

### **Option 1: Automatic Script (Easiest!)**

1. **Extract all files** to a folder (e.g., `C:\Tools\ai-model-detector`)

2. **Right-click** on `install-ai-model-detector.ps1`

3. Select **"Run with PowerShell"**

4. **Restart VS Code**

5. **Done!** Press `Ctrl+Shift+M` to try it out

---

### **Option 2: Manual Installation**

If the script doesn't work, follow these steps:

#### **Step 1: Install the Extension**

1. Open VS Code
2. Press `Ctrl+Shift+P`
3. Type: `Extensions: Install from VSIX`
4. Select the file: `vscode-ai-model-detector-1.0.0.vsix`

#### **Step 2: Setup MCP Server**

1. Open PowerShell in the `mcp-server` folder
2. Run: `npm install`

#### **Step 3: Configure MCP**

1. Press `Windows Key + R`
2. Type: `%APPDATA%\Code\User`
3. Press Enter
4. Create a file named `mcp.json` (if it doesn't exist)
5. Copy this configuration:

```json
{
    "servers": {
        "ai-model-detector": {
            "type": "stdio",
            "command": "node",
            "args": [
                "C:\\Path\\To\\Your\\mcp-server\\start.mjs"
            ],
            "cwd": "C:\\Path\\To\\Your\\mcp-server",
            "env": {
                "MCP_VERSION": "2.1.0"
            }
        }
    }
}
```

**Important:** Replace `C:\\Path\\To\\Your\\mcp-server` with the actual path!

#### **Step 4: Restart VS Code**

---

## 🎮 How to Use

### **Quick Detection**
- Press `Ctrl+Shift+M` anytime to see your current AI model

### **Status Bar**
- Look at the bottom right of VS Code
- You'll see your current model displayed (e.g., "🤖 Claude Sonnet 4.5")

### **In Chat**
- The MCP tools are automatically available in GitHub Copilot Chat
- Your model information will be detected in real-time

---

## ✅ Verify It's Working

1. **Open VS Code**
2. **Press** `Ctrl+Shift+M`
3. **You should see** a popup showing your current AI model

**Example Output:**
```
🎯 Current AI Model

Name: Claude Sonnet 4.5
Vendor: Anthropic
Family: claude
Max Tokens: 100,000
Confidence: High
```

---

## 🆘 Troubleshooting

### **Extension not showing up?**
```powershell
# Check if installed
code --list-extensions

# Look for: emblem-projects.vscode-ai-model-detector
```

### **MCP not working?**
```powershell
# Test the MCP server
cd C:\Path\To\mcp-server
node start.mjs

# Should see: "AI Model Detector MCP Server v2.1.0 started"
# Press Ctrl+C to stop
```

### **Nothing happens when pressing Ctrl+Shift+M?**
- Make sure GitHub Copilot is active
- Check VS Code's Output panel for errors
- Try restarting VS Code

---

## 📞 Need Help?

If you run into any issues:

1. Check the `INSTALLATION_GUIDE.md` for detailed troubleshooting
2. Look at the Output panel in VS Code (View → Output)
3. Ask your son/daughter for help 😊

---

## 🎉 Enjoy!

Once installed, you'll always know exactly which AI model is helping you code. Pretty cool, right?

Happy coding! 💻

---

**Version:** 1.0.0 (Extension) + 2.1.0 (MCP Server)  
**Built with ❤️ by your family member**
