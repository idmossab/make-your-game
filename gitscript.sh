#!/bin/bash

# Log file to collect results
LOG_FILE="script_execution_results.log"
DEPLOY_DIR="./deployed_scripts"

# Function to log messages
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Check if required parameters are provided
if [ -z "$1" ]; then
    log_message "⚠️ Please provide a file path or directory!"
    echo "Usage: $0 <path> <commit_message>"
    exit 1
fi
if [ -z "$2" ]; then
    log_message "⚠️ Please provide a commit message!"
    echo "Usage: $0 <path> <commit_message>"
    exit 1
fi

# Check if this is a valid git repository
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    log_message "❌ This is not a valid Git repository!"
    exit 1
fi

# Detect current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)
if [ -z "$CURRENT_BRANCH" ]; then
    log_message "❌ Failed to determine current branch!"
    exit 1
fi

# Handle directory or file
if [ -d "$1" ]; then
    # It's a directory
    log_message "📁 Adding directory contents: $1"
    # Check if it's the current directory
    if [ "$1" = "." ]; then
        git add .
    else
        git add "$1/"
    fi
elif [ -f "$1" ]; then
    # It's a file
    log_message "📄 Adding file: $1"
    
    # Check if the file is a script and make it executable if needed
    if [[ "$1" == *.sh && ! -x "$1" ]]; then
        log_message "Making script executable: chmod +x $1"
        chmod +x "$1"
    fi
    
    # Add the file to git
    git add "$1"
else
    # Path doesn't exist
    log_message "⚠️ The specified path doesn't exist: $1"
    echo "The path '$1' doesn't exist. Please provide a valid file or directory."
    exit 1
fi

# Check if git add was successful
if [ $? -ne 0 ]; then
    log_message "❌ Failed to add path: $1"
    exit 1
fi

# Commit with the provided message
log_message "💾 Committing changes with message: $2"
git commit -m "$2"
if [ $? -ne 0 ]; then
    log_message "❌ Failed to commit!"
    exit 1
fi

# Push changes to the current branch
log_message "🚀 Pushing changes to branch: $CURRENT_BRANCH"
git push origin "$CURRENT_BRANCH"
if [ $? -ne 0 ]; then
    log_message "❌ Failed to push changes to branch: $CURRENT_BRANCH"
    exit 1
fi

log_message "✅ Changes have been successfully pushed to branch: $CURRENT_BRANCH"
echo "✅ Changes have been successfully pushed to branch: $CURRENT_BRANCH"