# Presentation Library Builder

A static site generator for hosting HTML presentations on GitHub Pages with access-code protection, folder organization, and a premium "Liquid Glass" UI.

## 🌐 Live Demo
- **Full Library**: https://itsocialist.github.io/presentation-library-builder/
- **CIQ Executive Library**: https://itsocialist.github.io/presentation-library-builder/ciq/

## ✨ Features
- **Access Code Protection** - Gate presentations behind simple codes
- **Folder Organization** - Collapsible sections by category
- **Thumbnail Generation** - Auto-generated PNG previews
- **WYSIWYG Editing** - Edit presentations directly in the viewer
- **Responsive Design** - Works on desktop and mobile
- **Umami Analytics** - Built-in tracking

## 🚀 Quick Start
```bash
npm install
npm run build    # Generate docs/ for GitHub Pages
npm run serve    # Preview locally at localhost:8080
```

## 📁 Structure
```
presentations/       # Source HTML presentations by folder
  └── CIQ Stacks/   # Protected folder (Base64 encoded)
  └── Misc/
docs/               # Generated output (GitHub Pages root)
build/              # Build scripts
```

## 🔧 Configuration
Edit `build/generate-library.js`:
```javascript
const CONFIG = {
  accessCodes: ['8888'],
  protectedFolders: ['CIQ Stacks'],
  skipThumbnails: false
};
```

## 📋 Roadmap
See [BACKLOG.md](./BACKLOG.md) and [GitHub Issues](https://github.com/itsocialist/presentation-library-builder/issues)
