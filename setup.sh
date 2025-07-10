#!/bin/bash

echo "🎬 Setting up Movie Melody Mixer (Astro Version)"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Environment variables for Movie Melody Mixer
# Add any API keys or configuration here if needed
EOF
    echo "✅ .env.local created"
fi

echo ""
echo "🎉 Setup complete! You can now run the following commands:"
echo ""
echo "  npm run dev     - Start the development server"
echo "  npm run build   - Build for production"
echo "  npm run preview - Preview the production build"
echo ""
echo "🚀 To start developing, run: npm run dev"
echo "🌐 The app will be available at: http://localhost:4321" 