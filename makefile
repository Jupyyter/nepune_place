# Variables
GITHUB_USERNAME := Jupyyter
REPO_NAME := nepune_place

# ==============================================================================
# Main Targets
# ==============================================================================

# Default target: build, commit, push
all: build commit push

# Build the project
build:
	npm run build

# Commit changes
# NOTE: Before committing a new TYPE of large file (e.g., .mp4, .psd),
# you must first tell Git LFS to track it. Run: git lfs track "*.mp4"
# This updates the .gitattributes file, which should be committed.
commit:
	git add .
	@echo "Enter commit message:"
	@read message; \
	git commit -m "$$message"

# Push to GitHub (this will also push LFS files)
push:
	git push origin main

# Update the project on GitHub
update: build commit push

# ==============================================================================
# Setup Targets
# ==============================================================================

# Initialize the repository and set up Git LFS (run this only once)
init:
	@echo "Initializing Git repository..."
	git init
	git remote add origin https://github.com/$(GITHUB_USERNAME)/$(REPO_NAME).git
	git branch -M main
	@echo "\nConfiguring Git LFS..."
	@make lfs-setup
	@echo "\nGit and LFS setup complete."
	@echo "Please commit the .gitattributes file to save LFS configuration."
	git add .gitattributes
	git commit -m "feat: Configure Git LFS"

# Set up Git LFS to track common large file types
# This can be run again if your .gitattributes file is deleted.
lfs-setup:
	@echo "Initializing Git LFS..."
	git lfs install
	@echo "Tracking common large file types (.zip, .jar)..."
	git lfs track "*.zip"
	git lfs track "*.jar"
	# Add any other large file types you might use below
	# git lfs track "*.psd"
	# git lfs track "*.mp4"
	@echo "LFS will now track files listed in .gitattributes"

# ==============================================================================
# Informational Targets
# ==============================================================================

# Help command
help:
	@echo "Available commands:"
	@echo "  make          - Build, commit, and push the project."
	@echo "  make build    - Build the Next.js project."
	@echo "  make commit   - Add all files and commit (prompts for a message)."
	@echo "  make push     - Push changes to the 'main' branch on GitHub."
	@echo "  make update   - A shortcut for 'build', 'commit', and 'push'."
	@echo ""
	@echo "Setup commands (run once):"
	@echo "  make init     - Initializes the Git repo and configures Git LFS."
	@echo "  make lfs-setup- Manually run or re-run the Git LFS configuration."
	@echo ""
	@echo "Important Note on LFS:"
	@echo "  Before you add a NEW large file type (e.g., your first '.mp4' file),"
	@echo "  you must run 'git lfs track \"*.mp4\"' to tell LFS to manage it."

.PHONY: all build commit push update init lfs-setup help