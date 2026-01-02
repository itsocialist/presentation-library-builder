#!/bin/bash

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  CIQ Presentation Library Builder - First Run             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js
echo "▶ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found."
    echo "   Install from: https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js $(node --version) detected"
echo ""

# Install dependencies
echo "▶ Installing dependencies..."
echo "   This may take 2-3 minutes on first run..."
npm install
echo "✓ Dependencies installed"
echo ""

# Install Playwright browser
echo "▶ Installing headless browser for thumbnails..."
npx playwright install chromium --with-deps
echo "✓ Browser installed"
echo ""

# Build initial library
echo "▶ Building presentation library..."
npm run build
echo ""

# Summary
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Setup Complete! ✅                                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📚 Your presentation library is ready in docs/"
echo ""
echo "🌐 Preview locally:"
echo "   npm run serve"
echo ""
echo "📤 Deploy to GitHub Pages:"
echo "   See GETTING_STARTED.md for full instructions"
echo ""
