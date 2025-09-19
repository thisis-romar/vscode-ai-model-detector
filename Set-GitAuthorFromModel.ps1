#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Automatically set Git author based on detected AI model

.DESCRIPTION
    Uses the test-final-detection.js tool to detect the current AI model
    and automatically configures Git with the appropriate author name and email
    using the EmblemProjects email format: admin+llm-[model]@emblemprojects.com

.EXAMPLE
    .\Set-GitAuthorFromModel.ps1
#>

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "HH:mm:ss.fff"
    $colors = @{ "INFO" = "Cyan"; "SUCCESS" = "Green"; "WARNING" = "Yellow"; "ERROR" = "Red"; "FOUND" = "Magenta" }
    $color = if ($colors.ContainsKey($Level)) { $colors[$Level] } else { "White" }
    Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
}

function Get-ModelEmailMapping {
    return @{
        # OpenAI Models
        "copilot/gpt-4.1" = @{ name = "GPT-4.1"; email = "admin+llm-gpt-4-1@emblemprojects.com" }
        "copilot/gpt-4o" = @{ name = "GPT-4o"; email = "admin+llm-gpt-4o@emblemprojects.com" }
        "copilot/gpt-5-mini" = @{ name = "GPT-5 Mini"; email = "admin+llm-gpt-5-mini@emblemprojects.com" }
        "copilot/gpt-5" = @{ name = "GPT-5"; email = "admin+llm-gpt-5@emblemprojects.com" }
        "copilot/o3-mini" = @{ name = "o3-mini"; email = "admin+llm-o3-mini@emblemprojects.com" }
        "copilot/o4-mini" = @{ name = "o4-mini"; email = "admin+llm-o4-mini@emblemprojects.com" }
        
        # Anthropic Models  
        "copilot/claude-sonnet-3.5" = @{ name = "Claude Sonnet 3.5"; email = "admin+llm-claude-sonnet-3-5@emblemprojects.com" }
        "copilot/claude-sonnet-3.7" = @{ name = "Claude Sonnet 3.7"; email = "admin+llm-claude-sonnet-3-7@emblemprojects.com" }
        "copilot/claude-sonnet-4" = @{ name = "Claude Sonnet 4"; email = "admin+llm-claude-sonnet-4@emblemprojects.com" }
        
        # Google Models
        "copilot/gemini-2.5-pro" = @{ name = "Gemini 2.5 Pro"; email = "admin+llm-gemini-2-5-pro@emblemprojects.com" }
        
        # xAI Models
        "copilot/grok-code-fast-1" = @{ name = "Grok Code Fast 1"; email = "admin+llm-grok-code-fast-1@emblemprojects.com" }
    }
}

# Header
Clear-Host
Write-Host "🤖 Git Author Configuration Based on AI Model Detection" -ForegroundColor Green
Write-Host "EmblemProjects Email Format | $(Get-Date -Format 'yyyy-MM-dd')" -ForegroundColor Gray
Write-Host "=" * 70 -ForegroundColor Gray

Write-Log "Detecting current AI model..."

# Run the detection tool
$detectionPath = "H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\mcp-server\test-final-detection.js"
if (-not (Test-Path $detectionPath)) {
    Write-Log "Detection tool not found at $detectionPath" "ERROR"
    exit 1
}

try {
    $detectionOutput = & node $detectionPath 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Log "Model detection failed: $detectionOutput" "ERROR"
        exit 1
    }
    
    # Parse the output to extract model ID
    $modelIdMatch = $detectionOutput | Select-String "Model ID: (.+)"
    if (-not $modelIdMatch) {
        Write-Log "Could not parse model ID from detection output" "ERROR"
        Write-Log "Detection output: $detectionOutput" "ERROR"
        exit 1
    }
    
    $modelId = $modelIdMatch.Matches[0].Groups[1].Value.Trim()
    Write-Log "Detected model: $modelId" "FOUND"
    
    # Get email mapping
    $mappings = Get-ModelEmailMapping
    if (-not $mappings.ContainsKey($modelId)) {
        Write-Log "No email mapping found for model: $modelId" "WARNING"
        Write-Log "Creating generic mapping..." "INFO"
        
        # Create generic mapping
        $genericName = $modelId -replace "copilot/", "" -replace "-", " "
        $genericEmail = "admin+llm-" + ($modelId -replace "copilot/", "") + "@emblemprojects.com"
        $mapping = @{ name = $genericName; email = $genericEmail }
    } else {
        $mapping = $mappings[$modelId]
        Write-Log "Found email mapping for $modelId" "SUCCESS"
    }
    
    # Configure Git
    Write-Log "Setting Git configuration..."
    & git config user.name $mapping.name
    & git config user.email $mapping.email
    
    if ($LASTEXITCODE -eq 0) {
        Write-Log "Git configuration updated successfully!" "SUCCESS"
        
        Write-Host "`n" + "=" * 70 -ForegroundColor Green
        Write-Host "✅ GIT AUTHOR CONFIGURATION COMPLETE" -ForegroundColor Green
        Write-Host "=" * 70 -ForegroundColor Green
        
        Write-Host "`nAuthor Name: " -ForegroundColor White -NoNewline
        Write-Host $mapping.name -ForegroundColor Yellow
        Write-Host "Author Email: " -ForegroundColor White -NoNewline  
        Write-Host $mapping.email -ForegroundColor Yellow
        Write-Host "Model ID: " -ForegroundColor White -NoNewline
        Write-Host $modelId -ForegroundColor Cyan
        
        Write-Host "`n💡 Next commits will be attributed to: $($mapping.name)" -ForegroundColor Green
    } else {
        Write-Log "Failed to update Git configuration" "ERROR"
        exit 1
    }
    
} catch {
    Write-Log "Error during model detection or Git configuration: $_" "ERROR"
    exit 1
}