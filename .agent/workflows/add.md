---
description: Add and deploy new presentations to the library
---

# Add Presentations

Add presentations from a file path or URL.

## Usage

```
/add file:///path/to/presentation.html
/add file:///path/to/presentation.html [folder]
```

## Steps

1. Copy the file to the target folder (default: Misc, or specify folder):
```bash
# Default to Misc folder
cp /path/to/file.html presentations/Misc/

# Or specify folder like: Deep, RLC-H, Tests, Training, etc.
cp /path/to/file.html presentations/[FOLDER]/
```

// turbo
2. Build and deploy:
```bash
npm run build && git add . && git commit -m "Add [filename] to library" && git push origin main
```

3. GitHub Actions will deploy automatically (~1-2 min)

4. View live at: https://itsocialist.github.io/presentation-library-builder/

## Available Folders

- **Deep** — AI visualizations, experiments
- **RLC-H** — RLC-H product content
- **RLC-AI** — RLC-AI product content
- **CIQ Stacks** — CIQ stack comparisons
- **Training** — Training materials
- **Tests** — Test/experimental content
- **Ad Examples** — Advertisement mockups
- **Misc** — Everything else
