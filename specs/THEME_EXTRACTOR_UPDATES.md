# Theme Extractor - Document Updates

**Date:** January 3, 2026  
**Purpose:** Targeted additions to existing project documents

---

## Updates Required

### 1. PROJECT_OVERVIEW.md

**Add to "Technical Architecture" section** (after Theme Interpreter):

```markdown
#### 8. Theme Extractor

Extract themes from websites or images:

```python
from presentation_framework.themes import ThemeExtractor

# From website
extractor = ThemeExtractor()
theme = extractor.from_website('https://linear.app')
theme.save('themes/linear-inspired/')

# From image
theme = extractor.from_image('design-mockup.png')
theme.save('themes/extracted/')
```

**Features:**
- Color palette detection (k-means clustering)
- Typography extraction (CSS parsing)
- Effect detection (glass, shadows, animations)
- Automatic WCAG AA compliance fixes
- Preview generation before saving
```

**Add to "File Structure Evolution - Target (v2.0.0)":**

```
├── themes/
│   ├── theme_interpreter.py
│   ├── theme_extractor.py          # ← ADD THIS LINE
```

---

### 2. CLAUDE_CODE_INSTRUCTIONS.md

**Add after Session 6:**

```markdown
### Session 7: Theme Extractor

**Tell Claude Code:**
```
Add theme extraction from websites and images.

Create presentation_framework/themes/theme_extractor.py with ThemeExtractor class.

Methods:
- from_website(url) - extract theme from URL
- from_image(image_path) - extract from image/screenshot
- validate_theme(theme) - ensure compliance
- generate_theme_json(analysis) - create theme.json

Add dependencies to pyproject.toml:
- Pillow (image analysis)
- beautifulsoup4 (HTML parsing)  
- cssutils (CSS parsing)

Add CLI command: presentation-framework theme extract --from-url [url] --output [dir]

Add tests: tests/test_theme_extractor.py

See THEME_EXTRACTOR_SPEC.md for complete implementation details.

Commit: "Add theme extraction from websites and images"
```
```

---

### 3. START_HERE.md

**Add to "Feature Implementation Order" section:**

```markdown
7. **Theme Extractor** (extends theme capabilities)
   - Website analysis
   - Image analysis  
   - Auto-validation
```

---

## New Files to Create

1. ✅ `THEME_EXTRACTOR_SPEC.md` - Complete specification (already created)

---

## That's It

**No full document regeneration needed.**  
Just add these sections to the existing documents when ready.

For Claude Code development, reference `THEME_EXTRACTOR_SPEC.md` for complete implementation details.
