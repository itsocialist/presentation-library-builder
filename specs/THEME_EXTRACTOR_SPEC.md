# Theme Extractor Capability

**Addition to:** Unified Presentation Framework v2.0.0  
**Date:** January 3, 2026  
**Feature:** Automatic theme extraction from websites and images

---

## Overview

Extract presentation themes from existing visual designs by analyzing websites or images. Automatically generates compliant `theme.json` files ready for use in the framework.

---

## Capabilities

### 1. Website Analysis
**Input:** URL  
**Output:** Complete theme.json with colors, typography, spacing, effects

```python
from presentation_framework.themes import ThemeExtractor

extractor = ThemeExtractor()
theme = extractor.from_website('https://example.com')
theme.save('themes/extracted-theme/')
```

### 2. Image Analysis
**Input:** Screenshot, design mockup, or brand board  
**Output:** Theme extracted from visual design

```python
theme = extractor.from_image('design-mockup.png')
theme.save('themes/design-system/')
```

---

## Implementation

### ThemeExtractor Class

**Location:** `presentation_framework/themes/theme_extractor.py`

```python
class ThemeExtractor:
    def from_website(self, url):
        """Extract theme from website"""
        # 1. Fetch website with web_fetch tool
        # 2. Parse CSS for colors, fonts, spacing
        # 3. Analyze DOM structure for layout patterns
        # 4. Extract effects (glass, shadows, animations)
        # 5. Generate theme.json
        pass
    
    def from_image(self, image_path):
        """Extract theme from image/screenshot"""
        # 1. Analyze color palette (dominant, accent, background)
        # 2. Identify typography (if text present)
        # 3. Detect design patterns (spacing, borders, effects)
        # 4. Generate theme.json
        pass
    
    def validate_theme(self, theme):
        """Ensure theme meets framework standards"""
        # Check required fields
        # Validate color contrast
        # Verify typography accessibility
        pass
    
    def generate_theme_json(self, analysis_results):
        """Create complete theme.json from analysis"""
        pass
```

---

## Extraction Logic

### Color Palette Detection

```python
def extract_colors_from_website(html_content, css_content):
    """
    Priority order:
    1. CSS variables (--primary, --surface, etc.)
    2. Most frequent background colors → surface
    3. CTA/button colors → primary
    4. Link colors → accent
    5. Text colors → foreground
    """
    colors = {
        'surface': extract_background_color(css),
        'primary': extract_accent_color(css, buttons=True),
        'accent': extract_accent_color(css, links=True),
        'text': extract_text_color(css),
        'text-muted': extract_secondary_text(css)
    }
    return colors

def extract_colors_from_image(image_path):
    """
    Use color quantization to find dominant colors
    """
    from PIL import Image
    import numpy as np
    
    img = Image.open(image_path)
    pixels = np.array(img)
    
    # K-means clustering to find 5-8 dominant colors
    # Classify: background, primary, accents, text
    pass
```

### Typography Detection

```python
def extract_typography_from_website(css_content):
    """
    Look for:
    1. font-family declarations
    2. Most common fonts on h1, h2, body
    3. Font weights used
    4. Letter-spacing patterns
    """
    typography = {
        'display': extract_heading_font(css),
        'body': extract_body_font(css),
        'mono': extract_code_font(css) or 'monospace',
        'weights': extract_font_weights(css),
        'features': {
            'letter_spacing': detect_letter_spacing(css),
            'line_height': detect_line_height(css)
        }
    }
    return typography
```

### Design Pattern Detection

```python
def extract_design_patterns(html_content, css_content):
    """
    Analyze:
    1. Border radius (sharp vs rounded)
    2. Shadows (presence, intensity)
    3. Glassmorphism (backdrop-filter usage)
    4. Grid systems (spacing, columns)
    5. Animation styles
    """
    patterns = {
        'corners': 'sharp' if avg_border_radius < 4 else 'rounded',
        'shadows': detect_shadow_system(css),
        'glass': 'backdrop-filter' in css,
        'grid': detect_grid_system(css),
        'spacing_scale': extract_spacing_pattern(css),
        'effects': {
            'animations': detect_animation_style(css),
            'transitions': detect_transition_timing(css)
        }
    }
    return patterns
```

---

## Generated Theme Format

### Complete Output

```json
{
  "name": "extracted-from-example-com",
  "version": "1.0.0",
  "source": "https://example.com",
  "extracted_date": "2026-01-03",
  
  "structure": {
    "colors": {
      "surface": "#0F172A",
      "surface-elevated": "#1E293B",
      "primary": "#10B981",
      "accent": "#06B6D4",
      "text": "#F8FAFC",
      "text-muted": "#94A3B8"
    },
    "typography": {
      "display": {
        "family": "Inter",
        "weights": [600, 700],
        "source": "Google Fonts"
      },
      "body": {
        "family": "Inter",
        "weights": [400, 500],
        "source": "Google Fonts"
      },
      "mono": {
        "family": "JetBrains Mono",
        "weights": [400],
        "source": "Google Fonts"
      }
    },
    "spacing": {
      "base": "16px",
      "scale": 1.5,
      "grid": "8px"
    },
    "effects": {
      "corners": "rounded",
      "border_radius": "8px",
      "shadows": "soft",
      "glass": true,
      "backdrop_blur": "20px"
    }
  },
  
  "creative_parameters": {
    "mood": "confident",
    "energy_level": "medium",
    "formality": "professional",
    "visual_weight": "balanced",
    
    "allowed_variations": {
      "color_temperature": "±10%",
      "spacing_flexibility": "±20%",
      "accent_placement": "creative",
      "animation_intensity": "0.5-1.0"
    },
    
    "llm_guidance": {
      "description": "Clean technical aesthetic with systematic precision",
      "personality": ["confident", "modern", "structured"],
      "avoid": ["playful", "decorative"],
      "emphasize": ["clarity", "hierarchy"]
    }
  },
  
  "extraction_metadata": {
    "confidence": 0.85,
    "manual_review_needed": ["typography weights", "spacing scale"],
    "auto_detected": ["colors", "border-radius", "glass effects"]
  }
}
```

---

## CLI Usage

### Extract from Website

```bash
# Basic extraction
presentation-framework theme extract \
  --from-url https://example.com \
  --output themes/example-theme/

# With validation
presentation-framework theme extract \
  --from-url https://stripe.com \
  --output themes/stripe-inspired/ \
  --validate \
  --preview
```

### Extract from Image

```bash
# From screenshot
presentation-framework theme extract \
  --from-image design-mockup.png \
  --output themes/mockup-theme/

# From brand board
presentation-framework theme extract \
  --from-image brand-colors.jpg \
  --output themes/brand-theme/ \
  --enhance-contrast  # Auto-fix accessibility issues
```

### Refine Extracted Theme

```bash
# Interactive refinement
presentation-framework theme refine \
  --theme themes/extracted-theme/ \
  --interactive

# Prompts:
# - "Detected font: Inter. Keep or change?"
# - "Primary color: #10B981. Adjust?"
# - "Glass effects detected. Enable? [Y/n]"
```

---

## Python API

```python
from presentation_framework.themes import ThemeExtractor, Theme

# Extract from website
extractor = ThemeExtractor()
theme = extractor.from_website('https://example.com')

# Validate before using
if theme.validate():
    theme.save('themes/example-theme/')
    
    # Use in presentation
    pres = Presentation(theme=theme)
else:
    print(f"Validation issues: {theme.validation_errors}")

# Extract from image
theme = extractor.from_image('mockup.png')

# Manual refinement
theme.colors['primary'] = '#2BE099'
theme.typography['display']['family'] = 'Montserrat'
theme.save('themes/refined-theme/')
```

---

## Integration with Claude

### Natural Language Extraction

**In Claude chat:**
```
"Extract a theme from https://linear.app and name it 'linear-inspired'"

Claude:
1. Fetches website with web_fetch
2. Analyzes design system
3. Generates theme.json
4. Saves to themes/linear-inspired/
5. Shows preview
6. Asks: "Want to test with a sample presentation?"
```

### Image-Based Extraction

**In Claude chat:**
```
"Here's a screenshot of a dashboard I like [uploads image]. 
Extract a theme from it."

Claude:
1. Analyzes image colors, typography, spacing
2. Generates theme.json
3. Creates preview presentation
4. Shows: "Extracted theme 'dashboard-inspired'. Review?"
```

---

## Theme Validation Rules

### Required Fields
- ✅ Colors: surface, primary, text (minimum)
- ✅ Typography: display, body (minimum)
- ✅ Spacing: base (minimum)

### Accessibility Checks
- ✅ Text contrast ratio ≥ 4.5:1 (WCAG AA)
- ✅ Primary/surface contrast ≥ 3:1
- ✅ Font sizes ≥ 14px for body text

### Framework Compatibility
- ✅ All required CSS custom properties defined
- ✅ Glassmorphic effects valid (if enabled)
- ✅ Animation timings reasonable (100ms - 1000ms)

---

## Claude Code Development Session

### Session 7: Theme Extractor

**Tell Claude Code:**
```
Add theme extraction capability to unified-presentation-framework.

Create presentation_framework/themes/theme_extractor.py:

1. ThemeExtractor class with methods:
   - from_website(url) - extract from URL
   - from_image(image_path) - extract from image
   - validate_theme(theme) - check compliance
   - generate_theme_json(analysis) - create theme.json

2. Website analysis:
   - Use web_fetch to get HTML/CSS
   - Parse CSS for color variables, fonts, spacing
   - Detect design patterns (glass, shadows, corners)
   - Extract animation timings

3. Image analysis:
   - Use PIL for color quantization
   - Identify dominant colors (k-means clustering)
   - Classify: background, primary, accent, text
   - Estimate spacing from visual analysis

4. Validation:
   - Required fields present
   - Color contrast ratios (WCAG AA)
   - Typography accessibility
   - CSS property compatibility

5. Add CLI command:
   ```bash
   presentation-framework theme extract \
     --from-url https://example.com \
     --output themes/extracted/
   ```

6. Dependencies to add:
   - Pillow (for image analysis)
   - beautifulsoup4 (for HTML parsing)
   - cssutils (for CSS parsing)

7. Tests in tests/test_theme_extractor.py:
   - Test website extraction
   - Test image extraction
   - Test validation
   - Test theme.json generation

Commit: "Add theme extraction from websites and images"
```

---

## Usage Examples

### Example 1: Extract Stripe's Theme
```python
extractor = ThemeExtractor()
stripe_theme = extractor.from_website('https://stripe.com')

# Shows extracted:
# - Colors: Purple primary (#635BFF), clean backgrounds
# - Typography: Custom font stack
# - Spacing: Generous, modern
# - Effects: Subtle shadows, sharp corners

stripe_theme.save('themes/stripe-inspired/')
```

### Example 2: Extract from Brand Board
```python
theme = extractor.from_image('brand-colors.png')

# Detects:
# - Color palette from image
# - Creates theme structure
# - Suggests names based on dominant colors

theme.save('themes/brand-board/')
```

### Example 3: Refine Extracted Theme
```python
theme = extractor.from_website('https://github.com')

# Adjust creative parameters
theme.creative_parameters['mood'] = 'technical'
theme.creative_parameters['energy_level'] = 'low'

# Add LLM guidance
theme.creative_parameters['llm_guidance'] = {
    'description': 'Minimal technical aesthetic, code-focused',
    'emphasize': ['clarity', 'function', 'precision']
}

theme.save('themes/github-inspired/')
```

---

## Implementation Priority

**Add after:** Session 5 (Theme Interpreter)  
**Dependencies:** Theme interpreter must exist for validation  
**Session:** 7 (after block system)

---

## File Additions

```
presentation_framework/
└── themes/
    ├── theme_extractor.py          # ← NEW
    └── extraction_rules.json       # ← NEW: Detection heuristics
```

**Update:**
```
tests/
└── test_theme_extractor.py         # ← NEW
```

**Update CLI:**
```python
# Add to cli.py
@click.command()
@click.option('--from-url')
@click.option('--from-image')
@click.option('--output')
def theme_extract(from_url, from_image, output):
    """Extract theme from website or image"""
    pass
```

---

## Technical Details

### Color Extraction Algorithm

```python
def extract_colors(source_type, source):
    if source_type == 'website':
        # Parse CSS
        # Priority: CSS vars > computed styles > inline styles
        colors = {
            'surface': find_most_common_background(),
            'primary': find_button_cta_colors(),
            'accent': find_link_colors(),
            'text': find_body_text_color()
        }
    
    elif source_type == 'image':
        # Use k-means clustering
        from sklearn.cluster import KMeans
        pixels = load_image_pixels(source)
        kmeans = KMeans(n_clusters=8)
        clusters = kmeans.fit(pixels)
        
        # Classify clusters
        colors = classify_color_roles(clusters.cluster_centers_)
    
    return colors
```

### Typography Extraction

```python
def extract_typography(css_content):
    # Find font-family declarations
    fonts = find_font_families(css_content)
    
    # Classify by usage
    typography = {
        'display': most_common_on_selectors(['h1', 'h2', '.title']),
        'body': most_common_on_selectors(['body', 'p', 'div']),
        'mono': find_monospace_font() or 'monospace'
    }
    
    # Extract weights
    typography['weights'] = find_used_weights(css_content)
    
    return typography
```

### Effect Detection

```python
def detect_effects(css_content):
    effects = {
        'glass': 'backdrop-filter' in css_content,
        'backdrop_blur': extract_blur_amount(css_content),
        'shadows': detect_shadow_type(css_content),  # 'none', 'soft', 'hard'
        'corners': detect_border_radius(css_content),  # 'sharp', 'rounded', 'pill'
        'animations': detect_animation_patterns(css_content)
    }
    return effects
```

---

## Validation & Compliance

### Automatic Fixes

```python
class ThemeValidator:
    def validate_and_fix(self, theme):
        """Validate theme, auto-fix issues"""
        issues = []
        
        # Color contrast
        if not self.check_contrast(theme.colors['text'], 
                                   theme.colors['surface']):
            # Auto-fix: Lighten text color
            theme.colors['text'] = self.adjust_for_contrast(
                theme.colors['text'], 
                theme.colors['surface']
            )
            issues.append('Adjusted text color for WCAG AA compliance')
        
        # Typography
        if not self.check_font_availability(theme.typography['display']):
            # Suggest fallback
            theme.typography['display']['fallback'] = 'sans-serif'
            issues.append('Added fallback font')
        
        return theme, issues
```

---

## Usage in Framework

### Complete Workflow

```python
# 1. Extract theme
extractor = ThemeExtractor()
theme = extractor.from_website('https://vercel.com')

# 2. Validate and refine
theme, issues = theme.validate_and_fix()
print(f"Fixed {len(issues)} issues automatically")

# 3. Preview
pres = Presentation(theme=theme)
pres.add_slide('title', title='Preview Extracted Theme')
pres.add_slide('content', content='Sample content...')
pres.render('preview.html')

# 4. User reviews preview, decides to save
theme.save('themes/vercel-inspired/')

# 5. Use in future presentations
pres = Presentation(theme='vercel-inspired')
```

---

## CLI Workflow

```bash
# Extract
presentation-framework theme extract \
  --from-url https://linear.app \
  --output themes/linear-inspired/ \
  --preview

# Opens preview.html in browser
# User reviews: "Looks good!"

# Refine (optional)
presentation-framework theme refine themes/linear-inspired/
# Interactive prompts for adjustments

# Use
presentation-framework generate \
  --theme linear-inspired \
  --content deck.md \
  --output linear-deck.html
```

---

## Add to Project Overview

**Section to add:** Theme Extractor (after Theme Interpreter)  
**Priority:** Medium (after core systems)  
**Dependencies:** Theme interpreter, validation system  
**Development Session:** 7 (dedicated session)

---

**Implementation Status:** Specification complete, ready for development
