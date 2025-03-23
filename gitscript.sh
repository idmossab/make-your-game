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
    log_message "⚠️ Please provide a file name!"
    echo "Usage: $0 <script_file> <commit_message>"
    exit 1
fi
if [ -z "$2" ]; then
    log_message "⚠️ Please provide a commit message!"
    echo "Usage: $0 <script_file> <commit_message>"
    exit 1
fi

# Ensure the script exists
if [ ! -f "$1" ]; then
    log_message "❌ Script file does not exist: $1"
    exit 1
fi

# Check if the script is executable
if [[ "$1" == *.sh && ! -x "$1" ]]; then
    log_message "Making script executable: chmod +x $1"
    chmod +x "$1"
fi

# 1. COLLECTE DES RÉSULTATS - Collect results by running the script
log_message "🔄 Testing script execution: $1"
if [[ "$1" == *.sh ]]; then
    # Execute the bash script and collect its output
    script_output=$(bash "$1" 2>&1)
    exit_code=$?
    log_message "Script output: $script_output"
    log_message "Exit code: $exit_code"
else
    log_message "Script is not a bash script, skipping execution test"
    exit_code=0
fi

# 2. ÉVALUATION DES CAS DE TEST - Test case evaluation
log_message "🔍 Evaluating test cases"
# Check if the script contains test cases
if grep -q "test" "$1" || grep -q "assert" "$1"; then
    log_message "Test cases found in script"
    # Check if there's a separate test file
    test_file="${1%.*}_test.sh"
    if [ -f "$test_file" ]; then
        log_message "Running dedicated test file: $test_file"
        test_output=$(bash "$test_file" 2>&1)
        test_exit_code=$?
        log_message "Test output: $test_output"
        log_message "Test exit code: $test_exit_code"
        
        if [ $test_exit_code -ne 0 ]; then
            log_message "❌ Tests failed! Aborting commit."
            exit 1
        fi
    else
        log_message "No dedicated test file found"
    fi
else
    log_message "No test cases detected in script"
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

# Add changes (with proper handling of spaces in filename)
log_message "📝 Adding file to Git: $1"
git add "$1"
if [ $? -ne 0 ]; then
    log_message "❌ Failed to add file: $1"
    exit 1
fi

# Also add the log file to track execution results
git add "$LOG_FILE" 2>/dev/null

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

# 3. DÉPLOIEMENT DES SCRIPTS - Deploy the script
log_message "📦 Deploying script"
# Create deployment directory if it doesn't exist
mkdir -p "$DEPLOY_DIR"
# Copy the script to deployment directory
cp "$1" "$DEPLOY_DIR/"
deploy_status=$?
if [ $deploy_status -eq 0 ]; then
    log_message "✅ Script deployed successfully to $DEPLOY_DIR"
else
    log_message "⚠️ Script deployment failed with status $deploy_status"
fi

log_message "✅ Process completed successfully"
echo "✅ Changes have been successfully pushed to branch: $CURRENT_BRANCH and script deployed"