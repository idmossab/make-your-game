#!/bin/bash

# Check if required parameters are provided
if [ -z "$1" ]; then
    echo "⚠️  Please provide a file name!"
    echo "Usage: $0 <file_name> <commit_message>"
    exit 1
fi
if [ -z "$2" ]; then
    echo "⚠️  Please provide a commit message!"
    echo "Usage: $0 <file_name> <commit_message>"
    exit 1
fi

# Check if this is a valid git repository
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    echo "❌ This is not a valid Git repository!"
    exit 1
fi

# Detect current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)
if [ -z "$CURRENT_BRANCH" ]; then
    echo "❌ Failed to determine current branch!"
    exit 1
fi

# Add changes (with proper handling of spaces in filename)
git add "$1"
if [ $? -ne 0 ]; then
    echo "❌ Failed to add file: $1"
    exit 1
fi

# Commit with the provided message
git commit -m "$2"
if [ $? -ne 0 ]; then
    echo "❌ Failed to commit!"
    exit 1
fi

# Push changes to the current branch
git push origin "$CURRENT_BRANCH"
if [ $? -ne 0 ]; then
    echo "❌ Failed to push changes to branch: $CURRENT_BRANCH"
    exit 1
fi

echo "✅ Changes have been successfully pushed to branch: $CURRENT_BRANCH"