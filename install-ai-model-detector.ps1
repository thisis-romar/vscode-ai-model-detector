# Quick Installation Script for AI Model Detector
# Save this as: install-ai-model-detector.ps1

Write-Host "🚀 AI Model Detector Installation Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

# Check VS Code
$vsCodePath = Get-Command code -ErrorAction SilentlyContinue
if ($null -eq $vsCodePath) {
    Write-Host "❌ VS Code not found. Please install VS Code first." -ForegroundColor Red
    exit 1
}
Write-Host "✅ VS Code found" -ForegroundColor Green

# Check Node.js
$nodePath = Get-Command node -ErrorAction SilentlyContinue
if ($null -eq $nodePath) {
    Write-Host "❌ Node.js not found. Please install Node.js (v18+) first." -ForegroundColor Red
    exit 1
}
$nodeVersion = node --version
Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installation Steps:" -ForegroundColor Yellow
Write-Host "1. Installing VS Code Extension..." -ForegroundColor White

# Install VSIX
$vsixFile = "vscode-ai-model-detector-1.0.0.vsix"
if (Test-Path $vsixFile) {
    code --install-extension $vsixFile
    Write-Host "✅ Extension installed" -ForegroundColor Green
} else {
    Write-Host "❌ VSIX file not found: $vsixFile" -ForegroundColor Red
    Write-Host "   Please ensure the VSIX file is in the same directory as this script." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "2. Setting up MCP Server..." -ForegroundColor White

# Setup MCP server
$mcpServerPath = Join-Path $PSScriptRoot "mcp-server"
if (Test-Path $mcpServerPath) {
    Push-Location $mcpServerPath
    Write-Host "   Installing MCP server dependencies..." -ForegroundColor White
    npm install
    Pop-Location
    Write-Host "✅ MCP server configured" -ForegroundColor Green
} else {
    Write-Host "❌ MCP server folder not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "3. Configuring MCP in VS Code..." -ForegroundColor White

# Create mcp.json configuration
$mcpConfigPath = "$env:APPDATA\Code\User\mcp.json"
$mcpServerFullPath = (Resolve-Path $mcpServerPath).Path
$startMjsPath = Join-Path $mcpServerFullPath "start.mjs"

# Escape backslashes for JSON
$escapedPath = $startMjsPath -replace '\\', '\\'
$escapedCwd = $mcpServerFullPath -replace '\\', '\\'

$mcpConfig = @"
{
    "servers": {
        "ai-model-detector": {
            "type": "stdio",
            "command": "node",
            "args": [
                "$escapedPath"
            ],
            "cwd": "$escapedCwd",
            "env": {
                "MCP_VERSION": "2.1.0"
            }
        }
    }
}
"@

# Backup existing mcp.json if it exists
if (Test-Path $mcpConfigPath) {
    $backupPath = "$mcpConfigPath.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Copy-Item $mcpConfigPath $backupPath
    Write-Host "   📋 Backed up existing mcp.json to: $backupPath" -ForegroundColor Cyan
    
    # Merge with existing configuration (simple append for now)
    Write-Host "   ⚠️  Note: You may need to manually merge MCP server configurations" -ForegroundColor Yellow
    Write-Host "   📝 New configuration saved to: $mcpConfigPath.new" -ForegroundColor Yellow
    $mcpConfig | Out-File "$mcpConfigPath.new" -Encoding UTF8
} else {
    # Create new mcp.json
    $mcpConfig | Out-File $mcpConfigPath -Encoding UTF8
    Write-Host "✅ MCP configuration created" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Installation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Restart VS Code" -ForegroundColor White
Write-Host "2. Press Ctrl+Shift+M to test the extension" -ForegroundColor White
Write-Host "3. Open GitHub Copilot Chat to use MCP tools" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Quick Test:" -ForegroundColor Cyan
Write-Host "   In VS Code Chat, the MCP tools should now be available" -ForegroundColor White
Write-Host "   Try detecting your current AI model!" -ForegroundColor White
Write-Host ""
Write-Host "📞 Need Help?" -ForegroundColor Cyan
Write-Host "   Check INSTALLATION_GUIDE.md for troubleshooting" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
