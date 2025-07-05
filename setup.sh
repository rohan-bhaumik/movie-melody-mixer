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

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Spotify Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
EOF
    echo "⚠️  Please update .env.local with your actual API keys"
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API keys"
echo "2. Run: $PACKAGE_MANAGER run dev"
echo "3. Open http://localhost:3000 in your browser" 