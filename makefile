# Variables
GITHUB_USERNAME := Jupyyter
REPO_NAME := nepune_place

# Default target
all: build commit push deploy

# Build the project
build:
	npm run build

# Commit changes
commit:
	git add .
	@echo "Enter commit message:"
	@read message; \
	git commit -m "$$message"

# Push to GitHub
push:
	git push origin main

# Deploy (this assumes you're using GitHub Actions for deployment)
deploy:
	@echo "Deployment will be handled by GitHub Actions."
	@echo "Please ensure your .github/workflows/deploy.yml file is set up correctly."

# Initialize the repository (run this only once)
init:
	git init
	git remote add origin https://github.com/$(GITHUB_USERNAME)/$(REPO_NAME).git
	git branch -M main

# Update the project on GitHub and trigger deployment
update: build commit push

# Help command
help:
	@echo "Available commands:"
	@echo "  make build   - Build the project"
	@echo "  make commit  - Commit changes (you'll be prompted for a commit message)"
	@echo "  make push    - Push changes to GitHub"
	@echo "  make deploy  - Reminder about GitHub Actions deployment"
	@echo "  make init    - Initialize the Git repository (run only once)"
	@echo "  make update  - Build, commit, and push changes"
	@echo "  make         - Build, commit, push, and deploy"

.PHONY: all build commit push deploy init update help