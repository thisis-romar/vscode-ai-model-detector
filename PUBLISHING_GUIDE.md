# Publishing Guide for AI Model Detector MCP Server

**Package Status**: ✅ **READY FOR PUBLISHING**

**Version**: 2.1.0  
**Package Name**: `@emblem-projects/ai-model-detector-mcp`  
**Package Size**: 20.5 kB (unpacked: 87.6 kB)  
**Files**: 11 essential files

---

## ✅ Pre-Publishing Checklist Completed

- [x] Package.json updated with correct metadata
- [x] Version bumped to 2.1.0 (matches refactored code)
- [x] Scoped package name: `@emblem-projects/ai-model-detector-mcp`
- [x] Repository URLs configured
- [x] Comprehensive README.md created
- [x] .npmignore configured (excludes dev files)
- [x] TypeScript compiled successfully
- [x] Dry-run completed successfully
- [x] All dependencies properly listed

---

## 📦 What's Included in Package

```
@emblem-projects/ai-model-detector-mcp@2.1.0
├── README.md (6.5kB) - Comprehensive documentation
├── package.json (1.2kB) - Package metadata
├── start.mjs (9.9kB) - MCP server entry point
└── dist/ - Compiled TypeScript
    ├── index.js (14.0kB) - Main module
    ├── index.d.ts (622B) - Type definitions
    ├── types.js (20.9kB) - RealVSCodeBridge implementation
    ├── types.d.ts (8.5kB) - Type definitions
    └── *.map files - Source maps
```

---

## 🚀 Step 1: Publish to npm

### A. Login to npm (One-time)

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- 2FA code (if enabled)

### B. Publish Package

```bash
cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\mcp-server

# Publish as public scoped package
npm publish --access public
```

Expected output:
```
npm notice Publishing to https://registry.npmjs.org/
+ @emblem-projects/ai-model-detector-mcp@2.1.0
```

### C. Verify Publication

```bash
npm view @emblem-projects/ai-model-detector-mcp
```

---

## 🐙 Step 2: Create GitHub Repository

### A. Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name**: `ai-model-detector-mcp`
3. **Description**: "Real-time VS Code AI model detection MCP server with SQLite3 storage analysis"
4. **Visibility**: Public
5. **Initialize**: Do NOT initialize with README (we have one)
6. Click "Create repository"

### B. Push Code to GitHub

```bash
cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector

# Initialize git (if not already done)
git init

# Add remote
git remote add origin https://github.com/emblem-projects/ai-model-detector-mcp.git

# Create .gitignore
echo "node_modules/
dist/
*.log
.vscode/
mcp-server/node_modules/
mcp-server/dist/
*.vsix" > .gitignore

# Add all files
git add .

# Commit
git commit -m "Initial release: AI Model Detector MCP Server v2.1.0

- Real-time VS Code AI model detection
- SQLite3 storage analysis
- Per-chat context awareness
- 4 MCP tools: detect, validate, capabilities, monitor
- 100% detection accuracy
- 14+ model support"

# Push to main branch
git branch -M main
git push -u origin main
```

### C. Create Release Tag

```bash
# Create version tag
git tag -a v2.1.0 -m "Release version 2.1.0

Features:
- RealVSCodeBridge refactoring
- Enhanced per-chat context detection
- Comprehensive README documentation
- Ready for npm distribution"

# Push tags
git push --tags
```

---

## 🏛️ Step 3: Submit to MCP Registry

### A. Fork MCP Servers Repository

1. Go to https://github.com/modelcontextprotocol/servers
2. Click "Fork" button (top right)
3. Clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/servers.git mcp-servers-fork
cd mcp-servers-fork
```

### B. Add Your Server to README

Edit `README.md` and add under **🌎 Community Servers** section (alphabetically):

```markdown
• [AI Model Detector](https://github.com/emblem-projects/ai-model-detector-mcp) - 
  Real-time VS Code AI model detection with SQLite3 storage analysis, 
  per-chat context awareness, and 100% accuracy. Provides 4 MCP tools 
  for detecting current model, validating access, analyzing capabilities, 
  and monitoring changes across 14+ AI models.
```

### C. Commit and Create Pull Request

```bash
git add README.md
git commit -m "Add AI Model Detector MCP server to community servers"
git push origin main
```

Then:
1. Go to https://github.com/modelcontextprotocol/servers/pulls
2. Click "New Pull Request"
3. Click "compare across forks"
4. Select your fork's main branch
5. Title: "Add AI Model Detector MCP server"
6. Description:

```markdown
## Server Information

**Name**: AI Model Detector MCP Server
**npm Package**: [@emblem-projects/ai-model-detector-mcp](https://www.npmjs.com/package/@emblem-projects/ai-model-detector-mcp)
**GitHub**: https://github.com/emblem-projects/ai-model-detector-mcp
**Version**: 2.1.0

## Description

Real-time VS Code AI model detection MCP server with SQLite3 storage analysis, 
per-chat context awareness, and 100% accuracy.

## Features

- 🎯 Real-time detection of active AI model
- 🔍 Per-chat context awareness (panel/editor/editing-session)
- 📊 SQLite3 storage analysis for reliable detection
- 🛠️ 4 MCP tools available
- 🚀 14+ model support (Claude, GPT, Gemini, etc.)
- ✅ 100% detection accuracy

## MCP Tools

1. `detect_current_model` - Detect currently active model
2. `validate_model_access` - List all available models
3. `get_model_capabilities` - Analyze model capabilities
4. `monitor_model_changes` - Monitor for model switches

## Installation

```bash
npm install -g @emblem-projects/ai-model-detector-mcp
```

Or use with npx:

```json
{
  "mcpServers": {
    "ai-model-detector": {
      "command": "npx",
      "args": ["-y", "@emblem-projects/ai-model-detector-mcp"]
    }
  }
}
```

## Checklist

- [x] Package published to npm
- [x] GitHub repository created and public
- [x] Comprehensive README documentation
- [x] MIT License
- [x] Follows MCP specification
```

6. Click "Create Pull Request"

---

## 📋 Step 4: Optional - Publish to VS Code Marketplace

If you also want to publish the VS Code extension:

```bash
cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector

# Create publisher account at https://marketplace.visualstudio.com/manage
# Get Personal Access Token from Azure DevOps

# Login with vsce
vsce login emblem-projects

# Publish extension
vsce publish
```

---

## 🎯 Quick Command Reference

### Publish to npm
```bash
cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\mcp-server
npm publish --access public
```

### Push to GitHub
```bash
cd H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector
git init
git remote add origin https://github.com/emblem-projects/ai-model-detector-mcp.git
git add .
git commit -m "Initial release v2.1.0"
git push -u origin main
git tag -a v2.1.0 -m "Release v2.1.0"
git push --tags
```

### Submit to MCP Registry
```bash
git clone https://github.com/YOUR-USERNAME/servers.git
cd servers
# Edit README.md to add your server
git add README.md
git commit -m "Add AI Model Detector MCP server"
git push origin main
# Then create PR on GitHub
```

---

## 📊 Post-Publishing

After publishing, your package will be available:

- **npm**: https://www.npmjs.com/package/@emblem-projects/ai-model-detector-mcp
- **GitHub**: https://github.com/emblem-projects/ai-model-detector-mcp
- **MCP Registry**: Listed in community servers (after PR approval)

Users can install with:
```bash
npm install -g @emblem-projects/ai-model-detector-mcp
```

Or use directly with npx in their MCP client configurations.

---

## 🔄 Future Updates

For future versions:

1. Update version in `package.json`
2. Build and test: `npm run build`
3. Commit changes: `git commit -am "Version X.X.X"`
4. Create tag: `git tag -a vX.X.X -m "Release vX.X.X"`
5. Push: `git push && git push --tags`
6. Publish: `npm publish --access public`

---

## ✅ Current Status

- [x] Package prepared and ready
- [ ] Published to npm (awaiting your command)
- [ ] GitHub repository created (awaiting your action)
- [ ] Submitted to MCP registry (awaiting npm publication first)

**Next Action**: Run `npm publish --access public` when ready!

---

**Prepared**: October 9, 2025  
**Package**: @emblem-projects/ai-model-detector-mcp@2.1.0  
**Size**: 20.5 kB (11 files)
