<#
.SYNOPSIS
    Fix author attribution for historical commits with AI-only authorship.

.DESCRIPTION
    This script corrects 8 commits (206810c..3f43d6a) from Oct 10, 2025 that incorrectly
    show anthropic_Claude as the primary author instead of thisis-romar with AI co-author.
    
    The script:
    1. Creates a backup branch for safety
    2. Changes author/committer from anthropic_Claude to thisis-romar
    3. Fixes Co-authored-by trailers to use correct AI attribution format
    4. Shows before/after comparison
    5. Optionally force-pushes to GitHub (requires confirmation)

.NOTES
    Version: 1.0.0
    Author: thisis-romar
    Created: 2025-01-XX
    
    WARNING: This rewrites git history and requires force-push to GitHub.
    ALWAYS create a backup branch before running this script.

.EXAMPLE
    .\Fix-AuthorAttribution.ps1
    
    Runs the full fix process with interactive confirmation.

.EXAMPLE
    .\Fix-AuthorAttribution.ps1 -WhatIf
    
    Shows what would be changed without actually modifying anything.
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$RepositoryPath = "H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector",
    [string]$CommitRangeStart = "206810c",
    [string]$CommitRangeEnd = "3f43d6a",
    [string]$BackupBranchName = "backup/before-author-fix-$(Get-Date -Format 'yyyyMMdd-HHmmss')",
    [switch]$SkipBackup,
    [switch]$SkipPush,
    [switch]$Force
)

$ErrorActionPreference = "Stop"

# Color output helpers
function Write-Status {
    param([string]$Message, [string]$Color = "Cyan")
    Write-Host "==> $Message" -ForegroundColor $Color
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

# Change to repository directory
Set-Location $RepositoryPath
Write-Status "Working in repository: $RepositoryPath"

# Verify we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Error "Not a git repository: $RepositoryPath"
    exit 1
}

# Verify we're on main branch
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Warning "Not on main branch (currently on: $currentBranch)"
    $response = Read-Host "Continue anyway? (y/N)"
    if ($response -ne "y") {
        Write-Status "Aborted by user"
        exit 0
    }
}

# Create backup branch
if (-not $SkipBackup) {
    Write-Status "Creating backup branch: $BackupBranchName"
    git branch $BackupBranchName
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to create backup branch"
        exit 1
    }
    Write-Success "Backup branch created: $BackupBranchName"
} else {
    Write-Warning "Skipping backup branch creation (not recommended!)"
}

# Show commits that will be modified
Write-Status "Commits that will be modified:"
git log --oneline "$CommitRangeStart^..$CommitRangeEnd"

# Show current author info for first commit
Write-Status "`nCurrent author info (first commit):"
git log --format="fuller" -1 $CommitRangeEnd

# Confirm before proceeding
if (-not $WhatIfPreference -and -not $Force) {
    Write-Warning "`nThis will REWRITE GIT HISTORY for 8 commits."
    Write-Warning "This operation cannot be undone (except by using the backup branch)."
    $response = Read-Host "`nContinue with author fix? (yes/N)"
    if ($response -ne "yes") {
        Write-Status "Aborted by user"
        exit 0
    }
}

# Step 1: Fix author and committer metadata
Write-Status "`nStep 1: Fixing author and committer metadata..."

$envFilter = @'
if [ "$GIT_AUTHOR_EMAIL" = "admin+copilot.claude-sonnet-4@emblemprojects.com" ]; then
    export GIT_AUTHOR_NAME="thisis-romar"
    export GIT_AUTHOR_EMAIL="thisis.romar+github.com@gmail.com"
    export GIT_COMMITTER_NAME="thisis-romar"
    export GIT_COMMITTER_EMAIL="thisis.romar+github.com@gmail.com"
fi
'@

if ($PSCmdlet.ShouldProcess("Git history", "Rewrite author/committer metadata")) {
    # Remove previous filter-branch backup if exists
    Remove-Item ".git/refs/original" -Recurse -Force -ErrorAction SilentlyContinue
    
    # Build the git command as an array to avoid shell parsing issues
    $gitArgs = @(
        "filter-branch"
        "--force"
        "--env-filter"
        $envFilter
        "$CommitRangeStart^..$CommitRangeEnd"
    )
    
    & git $gitArgs
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to fix author/committer metadata"
        exit 1
    }
    Write-Success "Author/committer metadata fixed"
}

# Step 2: Fix Co-authored-by trailers
Write-Status "`nStep 2: Fixing Co-authored-by trailers..."

$msgFilter = @'
if grep -q "Co-authored-by: GitHub Copilot"; then
    # Replace incorrect Co-authored-by
    sed 's/Co-authored-by: GitHub Copilot <copilot@github.com>/Co-authored-by: anthropic_Claude (copilot\/claude-sonnet-4-5) <admin+llm-claude-sonnet-4-5@emblemprojects.com>/'
else
    # Add Co-authored-by if missing
    cat && echo "" && echo "Co-authored-by: anthropic_Claude (copilot/claude-sonnet-4-5) <admin+llm-claude-sonnet-4-5@emblemprojects.com>"
fi
'@

if ($PSCmdlet.ShouldProcess("Git history", "Rewrite commit messages with Co-authored-by")) {
    # Remove previous filter-branch backup if exists
    Remove-Item ".git/refs/original" -Recurse -Force -ErrorAction SilentlyContinue
    
    # Build the git command as an array
    $gitArgs = @(
        "filter-branch"
        "--force"
        "--msg-filter"
        $msgFilter
        "$CommitRangeStart^..$CommitRangeEnd"
    )
    
    & git $gitArgs
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to fix Co-authored-by trailers"
        exit 1
    }
    Write-Success "Co-authored-by trailers fixed"
}

# Show results
Write-Status "`n=== RESULTS ==="
Write-Status "Modified commits (newest first):"
git log --format="%h - %s (by %an)" "$CommitRangeStart^..$CommitRangeEnd"

Write-Status "`nDetailed view of first commit (after fix):"
git log --format="fuller" -1 HEAD

# Compare with backup
if (-not $SkipBackup) {
    Write-Status "`n=== COMPARISON ==="
    Write-Status "Changes between backup and fixed version:"
    git diff --stat "$BackupBranchName..HEAD"
}

# Prompt for force push
if (-not $SkipPush -and -not $WhatIfPreference) {
    Write-Warning "`n=== FORCE PUSH TO GITHUB ==="
    Write-Warning "The changes require a force-push to GitHub because history was rewritten."
    Write-Warning "This will affect anyone who has pulled the old history."
    Write-Status "`nCommand that will be executed:"
    Write-Host "    git push origin main --force-with-lease" -ForegroundColor Yellow
    
    if ($Force) {
        Write-Status "Force flag enabled, proceeding with push..."
        $response = "yes"
    } else {
        $response = Read-Host "`nProceed with force-push? (yes/N)"
    }
    
    if ($response -eq "yes") {
        git push origin main --force-with-lease
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Successfully force-pushed to GitHub"
        } else {
            Write-Error "Force-push failed"
            Write-Status "You can manually push later with: git push origin main --force-with-lease"
        }
    } else {
        Write-Status "Skipped force-push. Changes are only local."
        Write-Status "To push later: git push origin main --force-with-lease"
    }
}

# Final summary
Write-Status "`n=== SUMMARY ==="
if (-not $SkipBackup) {
    Write-Success "Backup branch created: $BackupBranchName"
}
Write-Success "8 commits fixed: author changed from anthropic_Claude to thisis-romar"
Write-Success "Co-authored-by trailers added/corrected"
Write-Status "`nIf you need to undo these changes:"
Write-Host "    git reset --hard $BackupBranchName" -ForegroundColor Yellow

Write-Status "`nScript complete!" -Color Green
