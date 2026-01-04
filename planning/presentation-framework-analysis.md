# Presentation Framework Analysis & Proposal

**Date:** January 3, 2026  
**Analyst:** Claude  
**Subject:** Unified Modular Presentation Framework

---

## Executive Summary

**You already have the architecture patterns and 70% of the components needed.** The `ciq-product-page-framework` demonstrates the exact modular block system you need, but since it's CIQ work IP, we'll build your personal framework from scratch using those proven patterns. Your personal visualization skills (`cinematic-scroll-deck`, `emotional-viz-design-system`, `revealjs-generator`) provide the foundation, with CIQ capabilities packaged as pluggable brand modules.

**Key Insight:** Build a brand-agnostic core framework with modular brand packages. CIQ becomes one theme/content bundle among many.

---

## IP Ownership & Architecture Strategy

### Core Framework: Your Personal IP

**Personal Skills (Direct Use):**
- ✅ `cinematic-scroll-deck` - Your recent Python package, full ownership
- ✅ `emotional-viz-design-system` - Personal visualization system
- ✅ `revealjs-generator` - Personal presentation generator
- ✅ `d3-visualizations` - Personal data viz library
- ✅ `cod-hud-profile-generator` - Personal UI system
- ✅ `canvas-cinematic-presentations` - Personal animation framework

**CIQ Work IP (Pattern Reference Only):**
- 🔒 `ciq-product-page-framework` - Use block system pattern, rebuild from scratch
- 🔒 `ciq-visual-design` - Extract as CIQ brand plugin
- 🔒 `ciq-brand-guidelines` - Package as CIQ config bundle
- 🔒 `ciq-brand-assets` - Package as CIQ asset module
- 🔒 `rlc-ai-visuals` - Package as RLC-AI content module

### Modular Brand Architecture

```
unified-presentation-framework/          # Your core IP
├── core/                                # Brand-agnostic engine
│   ├── block-system.js
│   ├── navigation.js
│   ├── theme-engine.js
│   └── layout-engine.js
│
├── blocks/                              # Universal content blocks
│   ├── slides/
│   ├── layouts/
│   └── content/
│
├── themes/                              # Built-in themes
│   ├── technical-dark/
│   ├── premium-glass/
│   └── cod-hud/
│
└── plugins/                             # Brand packages
    ├── ciq-brand-package/              # ← CIQ as plugin
    │   ├── brand.json
    │   ├── ciq-dark.css
    │   ├── assets/
    │   │   ├── logos/
    │   │   └── product-icons/
    │   └── blocks/
    │       ├── rlc-hero.html
    │       ├── product-comparison.html
    │       └── stats-display.html
    │
    ├── dawson-bros-package/            # Your other brand
    └── tactical-ui-package/            # Another theme
```

### CIQ Integration Pattern

**Framework stays brand-agnostic:**
```python
# Your personal framework
from presentation_framework import Presentation

pres = Presentation()  # No CIQ dependency
```

**Load CIQ brand when needed:**
```python
# Load CIQ plugin
from presentation_framework.plugins import load_brand_package

ciq = load_brand_package('ciq-brand-package')
pres = Presentation(brand=ciq)

# Now has access to:
# - CIQ color palette
# - CIQ typography
# - CIQ product blocks
# - RLC-AI specific layouts
```

**Or via CLI:**
```bash
# Without CIQ
presentation-framework generate \
  --theme technical-dark \
  --output deck.html

# With CIQ
presentation-framework generate \
  --brand-package ./plugins/ciq-brand-package \
  --output ciq-deck.html
```

This approach:
- ✅ Keeps your core framework as personal IP
- ✅ Allows CIQ-polished output via modular plugin
- ✅ Enables other brands (Dawson Bros, client work) as separate plugins
- ✅ CIQ can update their package independently
- ✅ You control the core architecture

---

## Your Requirements Mapped to Existing Solutions

### ✅ Requirements You Already Have

| Requirement | Existing Solution | Location |
|-------------|------------------|----------|
| **Modular content generation** | Block-based architecture | `ciq-product-page-framework` |
| **Natural language editing** | Block update commands | `ciq-product-page-framework` |
| **Theme system** | Multiple themes with auto-apply | `cinematic-scroll-deck` |
| **Page navigation** | Multi-directional navigation | `revealjs-generator` |
| **Responsive design** | Full viewport responsiveness | All visualization skills |
| **Content modules** | 13+ block types (hero, stats, comparison, etc.) | `ciq-product-page-framework` |
| **COD HUD theme** | Complete implementation | `cod-hud-profile-generator` |
| **Brand integration** | CIQ brand standards | `ciq-visual-design`, `ciq-brand-guidelines` |
| **Local/file system use** | HTML artifacts with inline CSS/JS | All skills |
| **Claude execution** | All skills work in Claude environment | ✅ Active |

### ⚠️ Capabilities That Need Integration

| Requirement | Gap | Solution Approach |
|-------------|-----|------------------|
| **Presentation-style pages** | Product pages, not slides | Add slide layouts to block library |
| **Page tracker/navigation UI** | No built-in nav | Port reveal.js navigation to block system |
| **Multi-directional flow** | Linear scroll only | Integrate reveal.js grid navigation |
| **Fixed page sizes** | Only responsive | Add portrait/landscape modes |
| **Content reordering** | Manual HTML editing | Add reorder command to block system |
| **Theming existing content** | Must regenerate | Add theme-switching without regeneration |
| **Animation modules** | Limited to backgrounds | Port Canvas API animations as blocks |

---

## The Pattern Reference: CIQ Product Page Framework

The `ciq-product-page-framework` demonstrates **perfectly architected patterns** you should replicate in your personal framework. While you can't use the CIQ code directly, the architecture is exactly what you need.

### Core Pattern Strengths (to replicate)

**1. Modular Block System**
```
Block ID: HERO_main
Block ID: VALUE_props  
Block ID: STATS_numbers
etc.
```
Pattern benefits:
- Self-contained HTML/CSS blocks
- Independent generation
- No cross-block dependencies
- Named for easy reference

**Implementation for your framework:**
```python
# Your personal framework architecture (new code)
class Block:
    def __init__(self, block_id, block_type, content):
        self.id = block_id
        self.type = block_type
        self.content = content
        self.template = self.load_template(block_type)
    
    def render(self):
        return self.template.format(**self.content)
```

**2. Natural Language Editing Pattern**
```bash
CIQ framework uses:
"Update PRICING_cards to show $2,000/node"
"Add Red Hat to COMPARISON_table"
"Remove STATS_numbers block"
```

**Your framework implementation:**
```python
# Replicate this pattern in your code
class Presentation:
    def update_block(self, block_id, new_content):
        """Update specific block without affecting others"""
        block = self.get_block(block_id)
        block.update(new_content)
        self.rebuild_single_block(block)  # Only regenerate this block
```

**This pattern is what you want** - surgical updates without breaking other content. You'll implement this fresh in your framework.

**3. Content Module Library Pattern**

CIQ has these blocks (you'll create equivalents):
- Hero sections
- Value propositions  
- Feature grids
- Comparison tables
- Stats displays
- Pricing cards

**Your framework will have:**
- Universal slide templates (title, content, stats, comparison, etc.)
- Layout components (1/2/3 column)
- Content modules (charts, diagrams, animations)
- Embeddable widgets (cards, lists, images)

**4. Theme System Pattern**

CIQ uses:
- Base colors (#13161B, #2BE099)
- Alternating backgrounds
- Consistent typography

**Your framework pattern:**
```json
{
  "theme": {
    "name": "your-theme",
    "colors": { "background": "#...", "primary": "#..." },
    "typography": { "display": "...", "body": "..." },
    "effects": { "glass": true, "animations": true }
  }
}
```

CIQ theme becomes a plugin that uses this same structure.

---

## CIQ Brand Package Architecture

### Package Structure

```
ciq-brand-package/
├── brand.json                    # CIQ configuration
├── themes/
│   ├── ciq-dark.css             # Primary CIQ theme
│   ├── rlc-ai.css               # RLC-AI variant
│   └── rlc-hardened.css         # RLC-H variant
│
├── assets/
│   ├── logos/
│   │   ├── ciq-logo.svg
│   │   ├── rlc-logo.svg
│   │   ├── rlc-ai-logo.svg
│   │   └── rlc-h-logo.svg
│   ├── icons/
│   │   └── product-icons.svg
│   └── fonts/
│       └── montserrat/
│
├── blocks/
│   ├── product-hero.html        # RLC product hero template
│   ├── feature-grid.html        # CIQ-styled feature grid
│   ├── comparison-table.html    # Competitive comparison
│   ├── stats-display.html       # Metrics with CIQ styling
│   └── pricing-cards.html       # CIQ pricing layout
│
├── layouts/
│   ├── product-page.json        # One-page product layout
│   └── pitch-deck.json          # Presentation layout
│
└── README.md                    # Package documentation
```

### brand.json Specification

```json
{
  "name": "ciq-brand-package",
  "version": "1.0.0",
  "description": "CIQ brand standards for unified presentation framework",
  
  "colors": {
    "primary": "#2BE099",
    "background": "#13161B",
    "surface": "#1A1D23",
    "text": "#ECECED",
    "text-muted": "#61656C",
    "accent": "#12A66F"
  },
  
  "typography": {
    "display": {
      "family": "Montserrat",
      "weights": [400, 500, 600, 700],
      "source": "Google Fonts"
    },
    "body": {
      "family": "Inter",
      "weights": [300, 400, 500],
      "source": "Google Fonts"
    }
  },
  
  "products": {
    "rlc": {
      "name": "Rocky Linux from CIQ",
      "logo": "assets/logos/rlc-logo.svg",
      "color": "#10B981"
    },
    "rlc-ai": {
      "name": "RLC-AI",
      "logo": "assets/logos/rlc-ai-logo.svg",
      "color": "#10B981"
    },
    "rlc-hardened": {
      "name": "RLC-Hardened",
      "logo": "assets/logos/rlc-h-logo.svg",
      "color": "#EF4444"
    }
  },
  
  "blocks": {
    "product-hero": {
      "template": "blocks/product-hero.html",
      "description": "Hero section for CIQ products",
      "fields": ["product_name", "tagline", "cta_primary", "cta_secondary"]
    },
    "comparison-table": {
      "template": "blocks/comparison-table.html",
      "description": "Competitor comparison with CIQ styling",
      "fields": ["competitors", "features", "highlight_column"]
    }
  },
  
  "anti_ai_patterns": {
    "forbidden_phrases": [
      "seamless", "effortless", "revolutionary", "game-changing"
    ],
    "required_specificity": true,
    "enforce_metrics": true
  }
}
```

### Using CIQ Package in Your Framework

**Installation:**
```bash
# Your framework
pip install unified-presentation-framework

# Add CIQ package
presentation-framework plugin install ./ciq-brand-package
```

**Python API:**
```python
from presentation_framework import Presentation
from presentation_framework.plugins import BrandPackage

# Load CIQ brand
ciq = BrandPackage.load('ciq-brand-package')

# Create presentation with CIQ brand
pres = Presentation(brand=ciq)
pres.add_slide('title', 
               title='RLC-AI Launch',
               theme=ciq.themes['rlc-ai'])

# Use CIQ-specific blocks
pres.add_block(ciq.blocks['product-hero'],
               product_name='RLC-AI',
               tagline='OS-level optimization for AI inference',
               cta_primary='Get Early Access')

# Render with CIQ assets and styling
pres.render('rlc-ai-deck.html')
```

**CLI Usage:**
```bash
# Generate with CIQ brand
presentation-framework generate \
  --brand ciq-brand-package \
  --template product-launch \
  --product rlc-ai \
  --output rlc-ai-launch.html

# Update CIQ content
presentation-framework update \
  --file rlc-ai-launch.html \
  --block product-hero \
  --field tagline="Optimized for AI workloads"
```

### Extracting from CIQ Skills

To create this package, extract content from CIQ skills:

**From `ciq-visual-design`:**
- Color palette → `brand.json` colors
- Typography system → `brand.json` typography  
- Design philosophy → Package documentation

**From `ciq-brand-guidelines`:**
- Product naming → `brand.json` products
- Logo usage → Assets + documentation
- Writing standards → Anti-AI patterns

**From `ciq-product-page-framework`:**
- Block templates → `blocks/` directory
- Layout patterns → `layouts/` directory
- CSS framework → `themes/ciq-dark.css`

**From `rlc-ai-visuals`:**
- RLC-AI specific blocks → `blocks/rlc-*.html`
- Infrastructure visualizations → Content modules
- Technical animations → Canvas components

### Package Distribution

```bash
# Create distributable package
cd ciq-brand-package/
zip -r ciq-brand-package-v1.0.0.zip .

# Or as Python package
python3 setup.py sdist bdist_wheel

# Install from package
presentation-framework plugin install ciq-brand-package-v1.0.0.zip
```

---

## What You Need: The Presentation Extension

### Proposed Architecture (Personal IP)

```
unified-presentation-framework/              # YOUR core framework
├── core/
│   ├── block_system.py              # Block management engine
│   ├── navigation.py                # Multi-directional navigation
│   ├── theme_engine.py              # Theme loading & switching
│   ├── layout_engine.py             # Page/slide layout system
│   └── plugin_loader.py             # Brand package loader
│
├── blocks/                           # Universal block templates
│   ├── slides/                      # Presentation-specific
│   │   ├── title-slide.html
│   │   ├── section-slide.html
│   │   ├── content-slide.html
│   │   ├── comparison-slide.html
│   │   ├── stats-slide.html
│   │   └── appendix-slide.html
│   │
│   ├── layouts/                     # Column systems
│   │   ├── one-column.html
│   │   ├── two-column.html
│   │   ├── three-column.html
│   │   └── asymmetric.html
│   │
│   └── content/                     # Embeddable modules
│       ├── image.html
│       ├── video.html
│       ├── chart.html               # D3 integration
│       ├── diagram-venn.html
│       ├── diagram-flow.html
│       ├── card.html
│       ├── bulleted-list.html
│       └── animation.html           # Canvas API integration
│
├── themes/                          # Built-in themes (yours)
│   ├── technical-dark/             # From cinematic-scroll-deck
│   ├── premium-glass/              # From cinematic-scroll-deck
│   ├── cod-hud/                    # From cod-hud-profile-generator
│   ├── clean-light/                # Generic professional
│   └── tactical-ui/                # Your tactical theme
│
├── navigation/
│   ├── linear.js                   # Default: Down/Enter scroll
│   ├── grid.js                     # Reveal.js style: ←↑→↓
│   ├── freeflow.js                 # Custom paths
│   └── tracker.js                  # Page counter UI
│
├── integrations/                   # Existing skill integrations
│   ├── d3_viz.py                  # D3-visualizations wrapper
│   ├── emotional_viz.py           # Emotional-viz wrapper
│   └── canvas_animation.py        # Canvas-cinematic wrapper
│
├── plugins/                        # Brand packages (modular)
│   ├── README.md                  # Plugin development guide
│   ├── ciq-brand-package/         # ← CIQ work content
│   │   ├── brand.json
│   │   ├── themes/
│   │   ├── blocks/
│   │   └── assets/
│   │
│   ├── dawson-bros-package/       # Your personal brand
│   └── [other-clients]/           # Future brands
│
├── cli/
│   ├── generate.py                # Create new presentation
│   ├── update.py                  # Modify blocks
│   ├── theme.py                   # Switch themes
│   ├── plugin.py                  # Manage brand packages
│   └── export.py                  # PDF, PPTX, HTML
│
├── examples/
│   ├── basic-deck.md
│   ├── technical-presentation.md
│   └── product-launch.md
│
└── tests/
    ├── test_block_system.py
    ├── test_navigation.py
    ├── test_theme_engine.py
    └── test_plugins.py
```

**Key IP Boundaries:**

```python
# Your core framework (MIT licensed, your IP)
from presentation_framework import Presentation

# Brand packages (separate ownership)
from presentation_framework.plugins import BrandPackage

# Your framework works standalone
pres = Presentation(theme='technical-dark')

# Or with brand packages
ciq_brand = BrandPackage.load('ciq-brand-package')
pres = Presentation(brand=ciq_brand)
```

---

## Implementation Roadmap

### Phase 1: Foundation Merge (Week 1)

**Goal:** Combine existing block system with presentation layouts

**Tasks:**
1. Extract block system from `ciq-product-page-framework`
2. Create new slide block templates:
   - Title slide (full viewport, centered)
   - Section slide (label + headline + intro)
   - Content slide (1/2/3 column layouts)
   - Stats slide (big numbers with context)
   - Comparison slide (side-by-side)
   - Appendix slide (references/sources)

3. Add layout system:
   ```javascript
   // Example block with layout
   {
     id: "CONTENT_main",
     layout: "two-column",
     left: { type: "text", content: "..." },
     right: { type: "image", src: "..." }
   }
   ```

**Deliverable:** Core framework that can generate both product pages and slide decks

---

### Phase 2: Navigation System (Week 2)

**Goal:** Add reveal.js-style multi-directional navigation

**Tasks:**
1. Port reveal.js navigation from `revealjs-generator`:
   - Arrow key handling (←↑→↓)
   - Vertical/horizontal slide organization
   - Keyboard shortcuts (Home, End, Esc overview)

2. Add navigation modes:
   ```javascript
   // Config
   {
     navigation: "grid",      // reveal.js style
     // OR
     navigation: "linear",    // scroll only
     // OR  
     navigation: "freeflow"   // custom paths
   }
   ```

3. Create page tracker UI:
   ```html
   <div class="page-tracker">
     <span class="current">5</span>
     <span class="separator">/</span>
     <span class="total">12</span>
   </div>
   ```

**Deliverable:** Full navigation system with page tracking

---

### Phase 3: Theme Engine (Week 2-3)

**Goal:** Universal theming without content regeneration

**Tasks:**
1. Extract theme systems from all visualization skills:
   - `cinematic-scroll-deck` themes (technical-dark, premium-glass, clean-light)
   - `cod-hud-profile-generator` theme
   - `ciq-visual-design` brand standards
   - `rlc-ai-visuals` color palette

2. Create theme manifest format:
   ```json
   {
     "name": "cod-hud",
     "colors": {
       "background": "#0a0a0a",
       "surface": "#1a1a1a",
       "primary": "#4a90c4",
       "accent-orange": "#e8904f",
       "accent-yellow": "#f5c563"
     },
     "typography": {
       "display": "Rajdhani, sans-serif",
       "body": "Inter, sans-serif",
       "mono": "JetBrains Mono, monospace"
     },
     "effects": {
       "glass": true,
       "particles": true,
       "scanlines": true,
       "glare": true
     }
   }
   ```

3. Add theme switching command:
   ```bash
   "Apply cod-hud theme to this presentation"
   "Switch to technical-dark theme"
   "Use CIQ brand theme"
   ```

**Deliverable:** Theme library with hot-swapping

---

### Phase 4: Content Modules (Week 3-4)

**Goal:** Rich content types as embeddable blocks

**Tasks:**
1. Create content module library:

**Images:**
```html
<div class="module-image">
  <img src="{{src}}" alt="{{alt}}">
  <caption>{{caption}}</caption>
</div>
```

**Charts (D3 integration):**
```html
<div class="module-chart" data-type="bar">
  <svg id="chart-{{id}}"></svg>
  <script>/* D3 code */</script>
</div>
```

**Diagrams:**
```html
<div class="module-diagram-venn">
  <!-- SVG Venn diagram -->
</div>

<div class="module-diagram-flow">
  <!-- Mermaid.js or custom SVG -->
</div>
```

**Animations (Canvas API):**
```html
<div class="module-animation">
  <canvas id="anim-{{id}}"></canvas>
  <script>/* Canvas animation */</script>
</div>
```

**Cards:**
```html
<div class="module-card">
  <h3>{{title}}</h3>
  <p>{{content}}</p>
</div>
```

**Bulleted Lists:**
```html
<ul class="module-list">
  <li class="fragment">{{item1}}</li>
  <li class="fragment">{{item2}}</li>
</ul>
```

**UI Mockups:**
```html
<div class="module-mockup">
  <!-- Interpreted from description -->
  <div class="device-frame">
    <div class="mockup-content">...</div>
  </div>
</div>
```

2. Add module commands:
   ```bash
   "Add bar chart showing growth metrics"
   "Insert Venn diagram comparing features"
   "Include UI mockup of dashboard"
   "Add animated data flow visualization"
   ```

**Deliverable:** Complete content module library

---

### Phase 5: Advanced Features (Week 4+)

**Goal:** NotebookLM-style generative features

**Tasks:**
1. **Content generation from sources:**
   ```bash
   "Generate presentation from this PRD"
   "Create slides from meeting notes"
   "Build deck from competitive analysis"
   ```

2. **Responsive modes:**
   ```javascript
   {
     mode: "responsive",  // Default: fluid
     // OR
     mode: "fixed",
     aspectRatio: "16:9", // or "4:3", "letter-portrait", "letter-landscape"
     dimensions: { width: 1920, height: 1080 }
   }
   ```

3. **Export system:**
   ```bash
   "Export as PDF"
   "Export as PPTX"
   "Export as HTML package"
   "Export individual slides as PNGs"
   ```

**Deliverable:** Full-featured presentation framework

---

## Technical Integration Points

### Using Framework in Claude

**Direct invocation:**
```python
# In Claude's execution environment
from unified_presentation_framework import Presentation

pres = Presentation(theme="cod-hud")
pres.add_slide("title", title="RLC-AI Launch", subtitle="January 2026")
pres.add_slide("stats", metrics=[{"value": "90%", "label": "Faster deployment"}])
pres.render("/mnt/user-data/outputs/presentation.html")
```

**Through skills:**
```bash
# Natural language in Claude
"Create a COD HUD themed presentation about RLC-AI with 5 slides"

# Claude internally:
# 1. Reads /mnt/skills/user/unified-presentation-framework/SKILL.md
# 2. Calls framework generate script
# 3. Returns HTML artifact
```

### Local/Repository Use

**Installation:**
```bash
# Clone from private repo
git clone git@github.com:ciq/presentation-framework.git
cd presentation-framework

# Install dependencies
pip install -r requirements.txt
npm install

# Generate presentation
python3 cli/generate.py \
  --title "Product Launch" \
  --theme "ciq-dark" \
  --slides "title,stats,comparison" \
  --output "launch-deck.html"
```

**API usage:**
```python
# In your own scripts
from presentation_framework import Presentation, themes

pres = Presentation(theme=themes.COD_HUD)
pres.add_slide("title", title="Mission Briefing")
pres.add_slide("content", layout="two-column", 
               left="Objective details...",
               right={"type": "image", "src": "map.jpg"})
pres.render("briefing.html")
```

### Through Other Skills/Applications

**Skill integration:**
```python
# In another skill's SKILL.md
from unified_presentation_framework import Presentation

# Generate supporting presentation
pres = Presentation(theme="technical-dark")
pres.from_markdown(content)
pres.render()
```

**API endpoint (optional):**
```bash
# If you want web service
POST /api/generate
{
  "theme": "cod-hud",
  "slides": [...],
  "output": "html"
}
```

---

## Adding New Themes

### Theme Bundle Structure

```
themes/tactical-ui/
├── theme.json              # Manifest
├── tactical-ui.css         # Styles
├── assets/
│   ├── logo.svg
│   ├── textures/
│   └── sounds/            # Optional: UI sounds
└── README.md              # Usage guide
```

### Theme Manifest (`theme.json`)

```json
{
  "name": "tactical-ui",
  "version": "1.0.0",
  "description": "Military-inspired tactical interface",
  "author": "Brian Dawson",
  
  "colors": {
    "background": "#0d1117",
    "surface": "#161b22",
    "primary": "#7ee787",
    "secondary": "#ffa657",
    "accent": "#58a6ff",
    "danger": "#ff7b72",
    "warning": "#f0883e",
    "text": "#c9d1d9",
    "text-muted": "#8b949e"
  },
  
  "typography": {
    "display": "Rajdhani, Impact, sans-serif",
    "body": "Inter, -apple-system, sans-serif",
    "mono": "JetBrains Mono, monospace",
    "scale": {
      "base": "16px",
      "ratio": 1.25
    }
  },
  
  "effects": {
    "glass": false,
    "scanlines": true,
    "particles": false,
    "grid": true,
    "corners": "chamfer",  // or "round", "sharp"
    "shadows": "hard"      // or "soft", "none"
  },
  
  "animation": {
    "timing": "cubic-bezier(0.4, 0.0, 0.2, 1)",
    "duration": "200ms",
    "stagger": "50ms"
  },
  
  "blocks": {
    "title-slide": {
      "layout": "full-center",
      "decoration": "corner-brackets"
    },
    "content-slide": {
      "layout": "asymmetric-left",
      "accent-position": "left-bar"
    }
  }
}
```

### Adding Theme to Framework

**Method 1: Command line**
```bash
python3 cli/theme.py add \
  --name "tactical-ui" \
  --manifest "./themes/tactical-ui/theme.json" \
  --css "./themes/tactical-ui/tactical-ui.css"
```

**Method 2: Natural language in Claude**
```bash
"Add my tactical-ui theme from ~/themes/tactical-ui/"
```

**Method 3: Drop into themes folder**
```bash
cp -r ~/tactical-ui-theme /mnt/skills/user/unified-presentation-framework/themes/
# Auto-detected on next use
```

---

## Content Reordering

### Current Capability (Product Framework)

```bash
User: "Reorder blocks: DEPLOY_anywhere before COMPONENTS_grid"
```

### Enhanced Presentation System

**Slide reordering:**
```bash
User: "Move slide 5 to position 2"
User: "Swap slides 3 and 7"
User: "Reorder: title, stats, comparison, close"
```

**Section reordering:**
```bash
User: "Move Problem section after Solution"
```

**Implementation:**
```python
def reorder_slides(presentation, new_order):
    """
    new_order: list of slide IDs or positions
    Example: ["slide_1", "slide_5", "slide_2", "slide_3", "slide_4"]
    """
    slides_dict = {s.id: s for s in presentation.slides}
    presentation.slides = [slides_dict[sid] for sid in new_order]
    presentation.rebuild_navigation()
```

---

## Content Theming/Restyling

### The Challenge

Traditional approach: **regenerate everything** to change theme.

### Proposed Solution: Style Injection

**Architecture:**
```html
<!-- Base content (theme-agnostic) -->
<div class="slide" data-type="title">
  <h1 class="slide-title">{{title}}</h1>
  <p class="slide-subtitle">{{subtitle}}</p>
</div>

<!-- Theme applied via CSS classes -->
<body class="theme-cod-hud">
  <!-- Content remains same, appearance changes -->
</body>
```

**Theme switching:**
```bash
User: "Apply tactical-ui theme to current presentation"

# Framework:
# 1. Reads tactical-ui.css
# 2. Swaps <body> class
# 3. Re-renders with new styles
# 4. Content structure unchanged
```

**CSS theme structure:**
```css
/* Base styles (theme-agnostic) */
.slide-title { font-weight: 600; }

/* COD HUD theme */
.theme-cod-hud .slide-title {
  font-family: 'Rajdhani';
  color: #4a90c4;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Tactical UI theme */
.theme-tactical-ui .slide-title {
  font-family: 'Impact';
  color: #7ee787;
  text-shadow: 0 0 10px currentColor;
}
```

**Result:** Change themes without regenerating content.

---

## Comparison: Your Requirements vs. Personal Framework Architecture

| Requirement | Status | Solution |
|-------------|--------|----------|
| Quick visual content generation | ✅ Ready | Your personal skills (emotional-viz, cinematic-scroll, d3) |
| Local/repo/filesystem hosting | ✅ Ready | HTML artifacts, git-compatible, Python package |
| Use through other skills | ✅ Ready | Python API + skill integration |
| Use within Claude | ✅ Ready | Direct execution + artifact rendering |
| Easily add themes | 🔨 Build | Theme manifest system (COD HUD as first example) |
| Add brand bundles (CIQ, etc.) | 🔨 Build | Plugin architecture (CIQ as brand package) |
| Structured navigable pages | 🔨 Build | Reveal.js navigation + page tracker |
| Linear + multi-directional nav | 🔨 Build | Navigation modes (linear/grid/freeflow) |
| Organic flow + page structure | 🔨 Build | Flexible layouts + scroll-snap |
| Responsive + fixed sizes | ✅ Ready | Mode switching (already in cinematic-scroll-deck) |
| Page tracker | 🔨 Build | Counter UI component |
| Modular editing by NLP | 🔨 Build | Block update commands (pattern from CIQ, fresh code) |
| Page/slide reordering | 🔨 Build | Block reorder system |
| Content theming | 🔨 Build | CSS class injection system |
| Reveal.js + NotebookLM features | 🔨 Build | Navigation + content generation |
| Rich content modules | 🔨 Build | Image/chart/diagram/animation blocks |
| **Personal IP ownership** | ✅ Core | Your framework, CIQ as plugin |
| **CIQ-quality output** | 🔌 Plugin | CIQ brand package (modular) |

**Legend:**
- ✅ Ready: Already in your personal skills
- 🔨 Build: Needs new implementation in your framework
- 🔌 Plugin: Modular brand package (CIQ, tactical-UI, etc.)

---

## Next Steps

### Immediate Actions (This Week)

1. **Review existing `ciq-product-page-framework`** 
   - Confirm block system meets requirements
   - Identify any gaps in update commands

2. **Prototype slide layouts**
   - Create 5 essential slide blocks (title, section, content, stats, close)
   - Test with existing block system

3. **Design theme manifest format**
   - Extract COD HUD theme as first bundle
   - Document theme.json schema

### Month 1: MVP

**Goal:** Working presentation framework with 3 themes and 10 content modules

**Deliverables:**
- Core framework with block system
- Linear + grid navigation
- 3 themes (CIQ Dark, COD HUD, Tactical UI)
- 10 content modules (text, image, chart, diagram, card, list, stats, comparison, hero, close)
- CLI for generation
- Natural language commands in Claude

### Month 2: Polish

**Goal:** Full feature parity with reveal.js + unique advantages

**Deliverables:**
- Theme hot-swapping
- Content generation from sources
- Export to PDF/PPTX
- Advanced navigation (freeflow)
- 20+ content modules
- Documentation

### Month 3: Ecosystem

**Goal:** Integration with broader CIQ tooling

**Deliverables:**
- Presentation library management interface
- Version control integration
- Collaboration features
- Analytics (time on slide, etc.)
- Template marketplace

---

## Conclusion

**You have the patterns and personal skills ready.** Build your universal presentation framework using proven architecture patterns, then package CIQ capabilities as a pluggable brand module.

**Your Personal IP Foundation:**

1. ✅ **Architecture patterns** (from CIQ framework, reimplemented fresh)
2. ✅ **Visualization engines** (cinematic-scroll-deck, emotional-viz-design-system)
3. ✅ **Navigation systems** (revealjs-generator)
4. ✅ **Animation frameworks** (canvas-cinematic-presentations, cod-hud)
5. ✅ **Data visualization** (d3-visualizations)

**CIQ Integration:**

1. 🔌 **Brand package** (pluggable module with CIQ standards)
2. 🔌 **Product blocks** (RLC-AI, RLC-H specific templates)
3. 🔌 **Theme bundle** (CIQ dark, product variants)
4. 🔌 **Asset library** (logos, icons, fonts)

**What's missing:**

1. 🔨 **Core framework engine** (block system, theme engine, layout engine)
2. 🔨 **Presentation layouts** (slides vs pages modes)
3. 🔨 **Advanced navigation** (reveal.js grid + custom flows)
4. 🔨 **Content module library** (charts, diagrams, animations as blocks)
5. 🔨 **Plugin system** (load brand packages dynamically)

**The Architecture:**

```
Your Framework (Personal IP)
├── Core engine
├── Universal blocks
├── Built-in themes
└── Plugin system
    ├── CIQ brand package ← Work IP, modular
    ├── Dawson Bros package
    ├── Tactical UI package
    └── [Other brands...]
```

**Benefits:**

- ✅ **Your IP:** Core framework is yours, usable for any project
- ✅ **CIQ Compatible:** Generate polished CIQ content via plugin
- ✅ **Multi-brand:** Support multiple clients/brands independently  
- ✅ **Maintainable:** CIQ can update their package without touching your core
- ✅ **Portable:** Take framework to new opportunities, leave CIQ plugin at CIQ

**Next Steps:**

1. **Phase 1 (Week 1):** Build core framework with block system
2. **Phase 2 (Week 2):** Add navigation + theme engine
3. **Phase 3 (Week 3):** Create CIQ brand package as first plugin
4. **Phase 4 (Week 4):** Add content modules + export system

This gives you:
- **Universal presentation framework** (your IP)
- **CIQ-quality output** (when you need it)
- **Freedom to use elsewhere** (other brands, projects, clients)
- **Clear IP boundaries** (personal core + work plugins)

---

**Recommendation:** Start with Phase 1 (Core Framework). We can build the block system and validate it with a simple example before extracting CIQ content into a brand package.

Ready to begin?
