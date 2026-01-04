---
description: Toggle presentation visibility (published/hidden)
---

# Hide/Show Presentation

Toggle a presentation's visibility status in the library.

## Usage

```
/hide [presentation-name-or-path]
```

## Steps

1. Find the presentation's metadata file:
```bash
# Search by name
ls metadata/ | grep -i "[search-term]"
```

2. Update the visibility field in the metadata JSON:
```json
{
  "visibility": "hidden"  // or "published" to show
}
```

3. Rebuild and deploy:
```bash
npm run build && git add . && git commit -m "Hide [presentation]" && git push origin main && npx gh-pages -d docs
```

## Visibility States

| State | Effect |
|-------|--------|
| `published` | Visible in library |
| `hidden` | Excluded from library |
| `draft` | Work in progress (not visible) |

## Notes

- Hidden presentations remain in `presentations/` folder
- Metadata file tracks visibility state
- Build script should filter by visibility (future enhancement)
