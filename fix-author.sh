#!/bin/bash

# Fix author attribution for commits with AI-only authorship
# This script rewrites git history to change author from anthropic_Claude to thisis-romar

# Suppress filter-branch warning
export FILTER_BRANCH_SQUELCH_WARNING=1

# Step 1: Fix author and committer metadata
echo "==> Step 1: Fixing author/committer metadata..."
git filter-branch --force \
  --env-filter '
    if [ "$GIT_AUTHOR_EMAIL" = "admin+copilot.claude-sonnet-4@emblemprojects.com" ]; then
      export GIT_AUTHOR_NAME="thisis-romar"
      export GIT_AUTHOR_EMAIL="thisis.romar+github.com@gmail.com"
      export GIT_COMMITTER_NAME="thisis-romar"
      export GIT_COMMITTER_EMAIL="thisis.romar+github.com@gmail.com"
    fi
  ' \
  206810c^..HEAD

if [ $? -eq 0 ]; then
  echo "✓ Author/committer metadata fixed"
else
  echo "✗ Failed to fix author/committer metadata"
  exit 1
fi

# Step 2: Fix Co-authored-by trailers
echo ""
echo "==> Step 2: Fixing Co-authored-by trailers..."
git filter-branch --force \
  --msg-filter '
    MSG=$(cat)
    if echo "$MSG" | grep -q "Co-authored-by: GitHub Copilot"; then
      # Replace incorrect Co-authored-by
      echo "$MSG" | sed "s/Co-authored-by: GitHub Copilot <copilot@github.com>/Co-authored-by: anthropic_Claude (copilot\/claude-sonnet-4-5) <admin+llm-claude-sonnet-4-5@emblemprojects.com>/"
    else
      # Add Co-authored-by if missing (only if not already present)
      if echo "$MSG" | grep -q "Co-authored-by: anthropic_Claude"; then
        # Already has correct co-author, just output as-is
        echo "$MSG"
      else
        # Add the Co-authored-by trailer
        echo "$MSG"
        echo ""
        echo "Co-authored-by: anthropic_Claude (copilot/claude-sonnet-4-5) <admin+llm-claude-sonnet-4-5@emblemprojects.com>"
      fi
    fi
  ' \
  206810c^..HEAD

if [ $? -eq 0 ]; then
  echo "✓ Co-authored-by trailers fixed"
else
  echo "✗ Failed to fix Co-authored-by trailers"
  exit 1
fi

# Show results
echo ""
echo "=== RESULTS ==="
echo "Modified commits (newest first):"
git log --format="%h - %s (by %an)" 206810c..HEAD

echo ""
echo "Detailed view of first modified commit:"
git log --format="fuller" -1 HEAD

echo ""
echo "✓ Fix complete! Review the changes above."
echo "To push to GitHub: git push origin main --force-with-lease"
