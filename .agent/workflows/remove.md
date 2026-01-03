---
description: Remove a presentation from the library (moves to unpublished)
---

# Remove Presentation

Safely removes a presentation by moving it to an unpublished folder (preserving structure).

## Usage

```
/remove [presentation-name]
/remove [folder]/[presentation-name]
```

## Steps

1. **Confirm the file to remove** - Show the user which file will be moved:
```bash
ls -la presentations/*/[name]*.html
```

2. **Wait for user confirmation** - Ask: "Remove this presentation? (y/n)"

3. **Move to unpublished** (preserves folder structure):
```bash
# Create mirror folder structure in unpublished
mkdir -p unpublished/[original-folder]

# Move the presentation
mv presentations/[folder]/[name].html unpublished/[folder]/
```

// turbo
4. **Rebuild and deploy**:
```bash
npm run build && git add . && git commit -m "Remove [name] from published library" && git push origin main
```

5. **Confirm removal** - The presentation is now in `unpublished/` and can be restored if needed.

## Restore a Presentation

To restore a previously removed presentation:
```bash
mv unpublished/[folder]/[name].html presentations/[folder]/
npm run build && git add . && git commit -m "Restore [name]" && git push origin main
```
