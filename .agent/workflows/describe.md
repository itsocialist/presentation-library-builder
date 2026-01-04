---
description: Add or edit description, tags, and notes for a presentation
---

# Describe Presentation

Update metadata fields for a presentation.

## Usage

```
/describe [presentation]
```

## Steps

1. Find the presentation's metadata file:
```bash
ls metadata/ | grep -i "[search-term]"
```

2. View current metadata:
```bash
cat metadata/[filename].json
```

3. Edit the metadata JSON with new values:
```json
{
  "title": "Presentation Title",
  "description": "Brief description of the content",
  "tags": ["security", "visualization", "interactive"],
  "notes": "Internal notes about this presentation",
  "author": "Brian Dawson"
}
```

## Editable Fields

| Field | Type | Purpose |
|-------|------|---------|
| `title` | string | Display title |
| `description` | string | Brief summary |
| `tags` | array | Searchable keywords |
| `notes` | string | Internal notes |
| `author` | string | Creator name |

## Example

```json
{
  "title": "AI Dreamscape Deep Visualization",
  "description": "An immersive exploration of AI consciousness patterns",
  "tags": ["ai", "visualization", "deep", "consciousness"],
  "notes": "Updated for 2026 color scheme",
  "author": "Brian Dawson"
}
```

## After Editing

No rebuild needed for metadata-only changes (metadata not currently used by build).

To commit changes:
```bash
git add metadata/ && git commit -m "Update metadata for [presentation]" && git push origin main
```
