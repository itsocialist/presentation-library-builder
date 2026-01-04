# Unified Presentation Framework - Project Structure Recommendation

**Date:** January 3, 2026  
**Context:** Extending existing cinematic-scroll-deck project vs. creating new project

---

## Recommendation: Extend Existing Project ✅

**Project:** `cinematic-scroll-deck-project/` (created today, git initialized)

**Why extend vs. create new:**

1. ✅ **Already initialized** - Git repo, Python package structure, CLI tools
2. ✅ **Has foundations** - Theme system, backgrounds, animations, scroll handling
3. ✅ **Production-ready** - Tests passing, documented, PyPI distributions built
4. ✅ **Clean evolution** - Rename/refactor to `unified-presentation-framework` in place

**Migration path:**
```bash
cd cinematic-scroll-deck-project/
git checkout -b unified-framework-evolution
# Refactor and extend
# When ready: git merge into main
```

---

## Advanced Visual Capabilities Mapping

### What You Already Have (cinematic-scroll-deck)

| Feature | Current Status | Enhancement Needed |
|---------|---------------|-------------------|
| **Background animations** | ✅ 4 types (particles, grid, gradient-waves, static) | ➕ Add continuous scrolling backgrounds |
| **Scroll animations** | ✅ Intersection Observer fade-ins | ➕ Add staggered scrolling |
| **Fade effects** | ✅ Basic fade-in on scroll | ➕ Add fade-out, directional fades |
| **Depth layers** | ⚠️ Basic z-index | ➕ Add parallax depth system |
| **Page backgrounds** | ✅ Per-section backgrounds | ➕ Add continuous background option |
| **Theme structure** | ✅ 3 themes with strict structure | ➕ Add LLM creative interpretation layer |

### New Capabilities to Add

**1. Continuous vs Page-Based Backgrounds**

```python
# Current (page-based)
deck.add_section(background='particles')  # Each section has own background

# Add (continuous)
deck.set_global_background('particles', mode='continuous')
# Background persists across all sections
```

**Implementation:**
```python
class BackgroundMode(Enum):
    PAGE_BASED = "page"      # Current: each section independent
    CONTINUOUS = "continuous" # New: background flows across pages
    HYBRID = "hybrid"        # New: persistent + section overlays

class Presentation:
    def __init__(self):
        self.background_mode = BackgroundMode.PAGE_BASED
        self.global_background = None
        self.background_layers = []  # For depth
```

**2. Staggered Scrolling & Fades**

```javascript
// Add to existing scroll system
class StaggeredAnimation {
    constructor(elements, options) {
        this.elements = elements;
        this.stagger = options.stagger || 100;  // ms between elements
        this.direction = options.direction || 'down'; // up, down, left, right
        this.fadeType = options.fadeType || 'in';  // in, out, through
    }
    
    trigger() {
        this.elements.forEach((el, index) => {
            setTimeout(() => {
                this.animateElement(el);
            }, index * this.stagger);
        });
    }
}
```

**Python API:**
```python
deck.add_section(
    title="Multiple Points",
    content=[
        "First point",
        "Second point", 
        "Third point"
    ],
    animation={
        'type': 'staggered-fade',
        'stagger': 150,  # ms
        'direction': 'up',
        'fade': 'in'
    }
)
```

**3. Multiple Depth Layers**

```python
deck.add_section(
    layers=[
        {
            'depth': 0,  # Background (slowest parallax)
            'content': 'particles',
            'speed': 0.2
        },
        {
            'depth': 1,  # Mid-layer
            'content': 'grid-overlay',
            'speed': 0.5,
            'opacity': 0.3
        },
        {
            'depth': 2,  # Foreground content (fastest)
            'content': 'text-content',
            'speed': 1.0
        },
        {
            'depth': 3,  # Overlay elements
            'content': 'floating-metrics',
            'speed': 1.2  # Moves faster than scroll (dramatic)
        }
    ]
)
```

**JavaScript parallax system:**
```javascript
class DepthLayerSystem {
    constructor() {
        this.layers = [];
        this.scrollY = 0;
    }
    
    onScroll(scrollY) {
        this.scrollY = scrollY;
        this.layers.forEach(layer => {
            const offset = scrollY * layer.speed;
            layer.element.style.transform = 
                `translateY(${offset}px) translateZ(${layer.depth * 10}px)`;
        });
    }
}
```

**4. Advanced Background Animations**

```python
# Existing
deck.add_section(background='particles')

# Enhanced with continuous flow
deck.add_section(
    background={
        'type': 'particles',
        'flow': 'continuous',  # Particles flow across page boundaries
        'density': 'medium',
        'speed': 'slow',
        'color_shift': True  # Color changes as you scroll
    }
)

# Multiple animated layers
deck.add_section(
    background_layers=[
        {'type': 'gradient-waves', 'depth': 0, 'speed': 0.3},
        {'type': 'particles', 'depth': 1, 'speed': 0.6},
        {'type': 'grid', 'depth': 2, 'opacity': 0.1}
    ]
)
```

**5. Theme with LLM Creative Interpretation**

Current theme structure (strict):
```json
{
  "name": "technical-dark",
  "colors": {
    "surface": "#0F172A",
    "primary": "#10B981"
  }
}
```

Enhanced with creative parameters:
```json
{
  "name": "technical-dark",
  "structure": {
    "colors": {
      "surface": "#0F172A",
      "primary": "#10B981",
      "accent": "#06B6D4"
    },
    "typography": {
      "display": "Inter",
      "body": "Inter"
    },
    "spacing": "comfortable"
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
      "avoid": ["playful", "casual", "decorative"],
      "emphasize": ["clarity", "structure", "confidence"],
      "example_interpretations": [
        "Use sharp angles for emphasis blocks",
        "Accent bars can be diagonal or vertical",
        "Metrics can float or be grounded",
        "Section transitions can be fade or slide"
      ]
    }
  }
}
```

**LLM interpretation in code:**
```python
class ThemeInterpreter:
    def __init__(self, theme_config):
        self.structure = theme_config['structure']  # Strict rules
        self.creative = theme_config['creative_parameters']  # Flexible
    
    def interpret_for_content(self, content_type, context):
        """
        LLM can make creative choices within boundaries
        
        Args:
            content_type: 'hero', 'stats', 'comparison', etc.
            context: User's content and intent
            
        Returns:
            Specific styling decisions
        """
        base = self.structure.copy()
        
        # LLM creative interpretation
        if self.creative['mood'] == 'confident':
            if content_type == 'stats':
                base['metric_size'] = 'large'
                base['accent_style'] = 'bold-left-bar'
            elif content_type == 'hero':
                base['layout'] = 'asymmetric-left'
                base['title_weight'] = 'heavy'
        
        # Apply variations within allowed ranges
        base['primary'] = self.vary_color(
            base['primary'], 
            self.creative['allowed_variations']['color_temperature']
        )
        
        return base
```

**Usage:**
```python
# Strict theme (current)
deck = CinematicDeck(theme='technical-dark')

# Creative interpretation (new)
deck = CinematicDeck(
    theme='technical-dark',
    interpretation_mode='creative',  # vs 'strict'
    context={
        'audience': 'executive',
        'purpose': 'product launch',
        'emphasis': 'innovation'
    }
)

# LLM adapts theme based on context
# Same structure, but:
# - Spacing slightly more generous for executives
# - Animations slightly more dramatic for launch
# - Accent placement emphasizes innovation points
```

---

## Project Structure Evolution

### Current (cinematic-scroll-deck)
```
cinematic-scroll-deck-project/
├── cinematic_scroll_deck/
│   ├── __init__.py
│   ├── core.py              # CinematicDeck class
│   └── cli.py               # Command-line interface
├── tests/
├── docs/
└── examples/
```

### Evolved (unified-presentation-framework)
```
unified-presentation-framework/
├── presentation_framework/           # Renamed from cinematic_scroll_deck
│   ├── __init__.py
│   ├── core/
│   │   ├── presentation.py          # Main Presentation class
│   │   ├── block_system.py          # Block management
│   │   ├── theme_engine.py          # Theme + LLM interpretation
│   │   ├── navigation.py            # Multi-directional nav
│   │   └── background_system.py     # ← NEW: Continuous/page backgrounds
│   │
│   ├── visual/
│   │   ├── depth_layers.py          # ← NEW: Parallax depth system
│   │   ├── animations.py            # ← NEW: Staggered, fade effects
│   │   └── backgrounds.py           # Enhanced: continuous flow
│   │
│   ├── blocks/
│   │   ├── slides/                  # ← NEW: Presentation slides
│   │   ├── layouts/                 # ← NEW: Column systems
│   │   └── content/                 # ← NEW: Rich content modules
│   │
│   ├── themes/
│   │   ├── base_theme.py            # Theme base class
│   │   ├── theme_interpreter.py     # ← NEW: LLM creative interpreter
│   │   ├── technical_dark/
│   │   ├── premium_glass/
│   │   ├── cod_hud/
│   │   └── [themes...]/
│   │
│   ├── plugins/
│   │   ├── plugin_loader.py         # ← NEW: Brand package system
│   │   └── README.md                # Plugin development guide
│   │
│   └── cli.py                       # Enhanced CLI
│
├── plugins/                         # ← NEW: Brand packages
│   ├── ciq-brand-package/
│   └── [other-brands]/
│
├── tests/
│   ├── test_presentation.py
│   ├── test_backgrounds.py          # ← NEW
│   ├── test_depth_layers.py         # ← NEW
│   ├── test_animations.py           # ← NEW
│   └── test_theme_interpreter.py    # ← NEW
│
├── docs/
│   ├── ADVANCED_VISUALS.md          # ← NEW: Depth, stagger, fade docs
│   ├── THEME_INTERPRETATION.md      # ← NEW: LLM creative guide
│   └── MIGRATION_FROM_V1.md         # ← NEW: cinematic-scroll → unified
│
└── examples/
    ├── basic-deck.md
    ├── depth-layers-demo.md         # ← NEW
    ├── staggered-animation.md       # ← NEW
    └── creative-theme.md            # ← NEW
```

---

## Migration Strategy

### Step 1: Preserve Current (Branch Strategy)

```bash
cd cinematic-scroll-deck-project/

# Create evolution branch
git checkout -b unified-framework-v2

# Current main branch stays as cinematic-scroll-deck v1.1.0
# Evolution branch becomes v2.0.0 (unified framework)
```

### Step 2: Incremental Enhancement

**Week 1: Core Expansion**
- Rename package internally: `cinematic_scroll_deck` → `presentation_framework`
- Add `core/` subdirectory with refactored modules
- Maintain backward compatibility: `from cinematic_scroll_deck import *` still works

**Week 2: Visual Systems**
- Add `visual/depth_layers.py`
- Add `visual/animations.py` (staggered, fade effects)
- Enhance `backgrounds.py` with continuous mode

**Week 3: Theme Interpreter**
- Add `themes/theme_interpreter.py`
- Update theme JSON format with creative parameters
- Add LLM interpretation logic

**Week 4: Block System & Plugins**
- Add `blocks/` hierarchy (slides, layouts, content)
- Add `plugins/` system
- Create first brand package (CIQ)

### Step 3: Version Management

```python
# __init__.py
__version__ = "2.0.0"
__legacy_name__ = "cinematic-scroll-deck"

# Backward compatibility
from .core.presentation import Presentation as CinematicDeck

# New API
from .core.presentation import Presentation
```

Users can:
```python
# Old code still works
from cinematic_scroll_deck import CinematicDeck

# New code uses enhanced API
from presentation_framework import Presentation
```

---

## Development with Claude Code

### Local Setup

```bash
# Your existing project
cd ~/workspace/cinematic-scroll-deck-project/

# Create evolution branch
git checkout -b unified-framework-v2

# Open with Claude Code
claude-code .
```

### Workflow

**With Claude Code (local):**
- File operations, code generation, testing
- Git commits, branch management
- Package builds, local testing

**With Me (Claude.ai):**
- Architecture decisions, design patterns
- Skill distribution creation
- Documentation generation
- Integration testing

**Example session:**
```
[Claude Code - Local]
User: "Add depth layer system to backgrounds.py"
Claude Code: [implements depth_layers.py, commits]

[Claude.ai - This Chat]
User: "Test the depth layer system and create skill distribution"
Claude.ai: [creates test cases, validates, packages skill]
```

---

## Recommendation Summary

✅ **Extend existing** `cinematic-scroll-deck-project/`  
✅ **Branch strategy:** `unified-framework-v2` branch  
✅ **Incremental evolution:** Add features without breaking existing  
✅ **Dual development:** Claude Code (local) + Claude.ai (testing/skills)  

**Advantages:**
- ✅ Already initialized with git, package structure, CLI
- ✅ Has working theme system, backgrounds, animations as foundation
- ✅ Production-ready starting point (tests passing, documented)
- ✅ Clear migration path from v1 to v2
- ✅ Backward compatibility maintained

**Next Action:**
```bash
cd ~/workspace/cinematic-scroll-deck-project/
git checkout -b unified-framework-v2
# Ready for enhancement
```

Want to start with the background system enhancements (continuous mode, depth layers)?
