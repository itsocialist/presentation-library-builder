---
description: Relocate a presentation between folders
---

# Move Presentation

Move a presentation from one folder to another.

## Usage

```
/move [presentation] [target-folder]
```

## Steps

1. Find the presentation file:
```bash
find presentations -name "*[search-term]*" -type f
```

2. Move the file to the new folder:
```bash
mv presentations/[CurrentFolder]/[file.html] presentations/[TargetFolder]/
```

3. Update metadata (if exists):
```bash
# Find metadata file
ls metadata/ | grep -i "[presentation-name]"

# Update folder field in JSON
{
  "folder": "[TargetFolder]"
}
```

4. Regenerate metadata for new path:
```bash
node build/generate-metadata.js
```

5. Rebuild and deploy:
```bash
npm run build && git add . && git commit -m "Move [presentation] to [folder]" && git push origin main && npx gh-pages -d docs
```

## Available Folders

- **Deep** — AI visualizations, experiments
- **RLC-H** — RLC-H product content
- **RLC-AI** — RLC-AI product content
- **CIQ Stacks** — CIQ stack comparisons
- **Training** — Training materials
- **Tests** — Test/experimental content
- **Ad Examples** — Advertisement mockups
- **Misc** — Everything else
- **Proposals** — Business proposals
