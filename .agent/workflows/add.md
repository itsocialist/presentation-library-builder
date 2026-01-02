---
description: Add and deploy new presentations to the library
---

# Add New Presentations

Run this workflow after dropping new HTML files or zip packages into `presentations/`.

## Steps

// turbo
1. Stage, commit, and push all changes:
```bash
git add . && git commit -m "Add new presentations" && git push origin main
```

2. GitHub Actions will automatically:
   - Extract any zip files
   - Generate thumbnails
   - Build the landing page
   - Deploy to GitHub Pages (~1-2 min)

3. View live at: https://itsocialist.github.io/presentation-library-builder/
