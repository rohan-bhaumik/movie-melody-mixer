#!/bin/bash

echo "🎬 Movie Melody Mixer - Next.js Setup"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/ (version 18 or higher)"
    echo "Or use a version manager like nvm:"
    echo "  nvm install 18"
    echo "  nvm use 18"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check for package managers
if command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
elif command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
elif command -v bun &> /dev/null; then
    PACKAGE_MANAGER="bun"
else
    echo "❌ No package manager found. Please install npm, yarn, or bun."
    exit 1
fi

echo "✅ Using package manager: $PACKAGE_MANAGER"

# Install dependencies
echo "📦 Installing dependencies..."
$PACKAGE_MANAGER install

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: $PACKAGE_MANAGER run dev"
echo "2. Open http://localhost:3000 in your browser"
echo ""
echo "Note: This app uses mock data for YouTube video recommendations."
echo "No API keys or external services are required." 