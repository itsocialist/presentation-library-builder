---
description: Bulk toggle presentation folders up (publish) or down (unpublish)
---

# Switch Presentations Up/Down

A single command to toggle presentation folders between published and unpublished states.

## Usage

```
/switch [up|down] [folder-name or "all"]
```

## Folder Locations

| State | Location | Description |
|-------|----------|-------------|
| **UP (Published)** | `presentations/` folder | Source for library builds |
| **DOWN (Unpublished)** | Root level (outside `presentations/`) | Hidden staging area |

**Build script reads from:** `presentations/` directory

## Commands

### Switch Everything UP (Publish All - Move to presentations/)

```bash
cd /Users/briandawson/workspace/presentation-library-builder

# Move all content folders into presentations/
for folder in "Ad Examples" "CIQ Stacks" "DB" "Deep" "Facets" "General" "Misc" "Other  Formats" "Proposals" "RLC-AI" "RLC-H" "Stage" "Tests" "Training"; do
  if [ -d "$folder" ]; then
    mv "$folder" presentations/
  fi
done
```

### Switch Everything DOWN (Unpublish All - Move out of presentations/)

```bash
cd /Users/briandawson/workspace/presentation-library-builder

# Move all folders from presentations/ to root
for folder in presentations/*/; do
  [ -d "$folder" ] && mv "$folder" .
done
```

### Switch a Single Folder UP (Publish)

```bash
# Move specific folder into presentations/
mv "[folder-name]" presentations/
```

### Switch a Single Folder DOWN (Unpublish)

```bash
# Move specific folder out of presentations/
mv "presentations/[folder-name]" .
```

## After Switching

```bash
# turbo
# IMPORTANT: Clean docs output folder first (prevents stale content on GitHub Pages)
rm -rf docs/presentations/* docs/thumbnails/* docs/ciq

# Rebuild and deploy
npm run build && git add -A && git commit -m "Switch presentations [up/down]" && git push
```

## Content Folders Reference

- `Ad Examples` - Advertisement examples
- `CIQ Stacks` - CIQ Stack presentations  
- `DB` - Dawson Bros content
- `Deep` - Deep AI/philosophical content
- `Facets` - FACETS system content
- `General` - General presentations
- `Misc` - Miscellaneous content
- `Other  Formats` - PDFs, PPTX files
- `Proposals` - Proposal documents
- `RLC-AI` - RLC AI content
- `RLC-H` - RLC Hardened content
- `Stage` - Staging content
- `Tests` - Test files
- `Training` - Training materials

## Notes

- **UP = Published**: Folders inside `presentations/` are included in builds
- **DOWN = Unpublished**: Folders at root level are excluded from builds
- Hidden `.` prefix folders inside presentations are also excluded
