# Presentation Library Builder

Automatically build a GitHub Pages presentation library. Drop HTML presentations into the `presentations/` folder and run the build script to generate a beautiful landing page with thumbnails.

## Quick Start

```bash
# 1. Run first-time setup
./start.sh

# 2. Add presentations to presentations/ folder
cp your-deck.html presentations/

# 3. Build the library
npm run build

# 4. Deploy to GitHub Pages
npm run deploy
```

Your library will be live at: `https://yourusername.github.io/presentation-library`

## Features

- **Auto-thumbnail generation**: Creates preview images from first slide
- **Beautiful landing page**: CIQ-branded dark theme with search
- **One-command deploy**: Build and push to GitHub Pages
- **GitHub Actions**: Auto-deploy when you push new presentations
- **Claude Code optimized**: Works seamlessly with Claude workflows
- **Metadata support**: Title, date, author, tags
- **Custom thumbnails**: Drop PNG alongside HTML to use custom image
- **Responsive design**: Works on desktop, tablet, mobile

### Sprint 1: Foundation (v1.0.0)
- **Featured section**: Pin presentations to top with UI button
- **Recently Viewed**: Collapsible section with localStorage tracking
- **Umami Analytics**: Page-level tracking integrated
- **Agent Workflows**: `/add`, `/remove`, `/hide`, `/move`, `/describe`
- **Mouse-tracking gradient**: Subtle CIQ green glow follows cursor

### Sprint 2: Multi-Format (v1.1.0)
- **PDF/PPTX support**: Auto-detect and display non-HTML presentations
- **Format badges**: Visual PDF (red) and PPTX (orange) indicators
- **PDF viewer**: Dedicated viewing page for PDFs
- **Placeholder thumbnails**: Generated icons for non-HTML files

## Documentation

- **GETTING_STARTED.md** - Complete walkthrough (start here!)
- **QUICKSTART.md** - 5-minute setup guide
- **CLAUDE_CODE_GUIDE.md** - Integration with Claude Code
- **DEPLOYMENT_GUIDE.md** - GitHub Pages setup
- **PROJECT_SUMMARY.md** - Technical architecture

## Commands

```bash
npm run build   # Generate library from presentations/
npm run serve   # Preview at localhost:8080
npm run deploy  # Build + commit + push to GitHub
npm run clean   # Delete docs/ and start fresh
```

## Project Structure

```
presentation-library-builder/
├── presentations/          # Drop HTML presentations here
├── build/                  # Build scripts
├── docs/                   # Auto-generated (GitHub Pages)
└── .github/workflows/      # Auto-deploy configuration
```

## Example Included

Your CIQ Platform Stack deck is already in `presentations/` as an example.

Run `npm run build` to see it in action!
