# Unified Presentation Framework - Project Overview

**Version:** 2.0.0  
**Evolution From:** cinematic-scroll-deck v1.1.0  
**Date:** January 3, 2026  
**Owner:** Brian Dawson (Personal IP)

---

## Vision

Build a universal, modular presentation framework that supports:
- Multiple output formats (web presentations, slide decks, product pages)
- Rich visual capabilities (depth layers, staggered animations, continuous backgrounds)
- Flexible theming (strict structure + LLM creative interpretation)
- Brand modularity (CIQ as plugin, not core dependency)
- Natural language editing (block-level updates without regeneration)
- Multi-directional navigation (linear, grid, freeflow)

---

## IP Architecture

### Your Personal IP (Core Framework)
```
unified-presentation-framework/
├── Core engine (block system, themes, navigation)
├── Visual systems (backgrounds, animations, depth)
├── Universal content modules
└── Plugin system for brand packages
```

### Work IP (Brand Plugins)
```
plugins/
├── ciq-brand-package/     # CIQ brand standards, blocks, assets
├── dawson-bros-package/   # Your personal brand
└── [client-packages]/     # Future client work
```

**Key Principle:** Core framework has no CIQ dependencies. CIQ capabilities load via plugin system.

---

## Evolution Strategy

### Phase 1: Foundation (v1.1.0 → v2.0.0)
**Current:** `cinematic-scroll-deck` - Working scroll-based presentations  
**Target:** `unified-presentation-framework` - Universal modular system

**Migration Path:**
1. Create `unified-framework-v2` branch
2. Refactor package: `cinematic_scroll_deck` → `presentation_framework`
3. Maintain backward compatibility for v1 users
4. Add new capabilities incrementally

### Phase 2: Core Systems
**Add:**
- Block system (modular content management)
- Enhanced theme engine (strict + creative interpretation)
- Multi-directional navigation (linear/grid/freeflow)
- Plugin loader (brand package system)

### Phase 3: Visual Systems
**Add:**
- Continuous background flow
- Depth layer system (parallax)
- Staggered scrolling and fades
- Multi-layer composition

### Phase 4: Content & Integration
**Add:**
- Rich content modules (charts, diagrams, animations)
- Brand packages (CIQ, Dawson Bros, Tactical UI)
- Library management integration
- Export systems (PDF, PPTX, HTML)

---

## Technical Architecture

### Core Framework Structure

```python
# presentation_framework/
from .core.presentation import Presentation
from .core.block_system import Block, BlockLibrary
from .core.theme_engine import Theme, ThemeInterpreter
from .core.navigation import NavigationMode
from .visual.backgrounds import BackgroundSystem, BackgroundMode
from .visual.depth_layers import DepthLayerSystem
from .visual.animations import StaggeredAnimation, FadeSystem
from .plugins.plugin_loader import BrandPackage

# Usage - Basic
pres = Presentation(theme='technical-dark')
pres.add_slide('title', title='My Presentation')
pres.render('output.html')

# Usage - With Brand Package
ciq = BrandPackage.load('ciq-brand-package')
pres = Presentation(brand=ciq)
pres.add_block(ciq.blocks['product-hero'], product='RLC-AI')
pres.render('ciq-deck.html')
```

### Key Systems

#### 1. Block System
```python
class Block:
    """Self-contained content module"""
    def __init__(self, block_id, block_type, content):
        self.id = block_id           # e.g., "SLIDE_001"
        self.type = block_type       # e.g., "title-slide"
        self.content = content       # Dict of content
        self.theme = None
        self.animations = []
        self.background = None
        
    def render(self) -> str:
        """Generate HTML for this block"""
        pass
    
    def update(self, new_content):
        """Update content without affecting other blocks"""
        pass
```

#### 2. Theme Engine with LLM Interpretation
```python
class Theme:
    """Base theme with structure + creative parameters"""
    def __init__(self, config):
        self.structure = config['structure']      # Strict rules
        self.creative = config['creative_params'] # LLM flexibility
        
class ThemeInterpreter:
    """Interprets theme for specific content with LLM creativity"""
    def interpret(self, content_type, context):
        """
        Apply theme creatively based on:
        - content_type: 'hero', 'stats', 'comparison'
        - context: audience, purpose, emphasis
        
        Returns styling decisions within theme boundaries
        """
        pass
```

#### 3. Background System
```python
class BackgroundMode(Enum):
    PAGE_BASED = "page"      # Each section independent
    CONTINUOUS = "continuous" # Flows across sections
    HYBRID = "hybrid"        # Persistent + overlays

class BackgroundSystem:
    def __init__(self, mode=BackgroundMode.PAGE_BASED):
        self.mode = mode
        self.global_background = None
        self.section_backgrounds = {}
        
    def set_continuous(self, bg_type, options):
        """Enable continuous background flow"""
        pass
```

#### 4. Depth Layer System
```python
class DepthLayer:
    """Single layer in depth system"""
    def __init__(self, depth, content, speed):
        self.depth = depth       # 0 = background, higher = foreground
        self.content = content   # HTML/Canvas content
        self.speed = speed       # Parallax speed (0.0 - 2.0)
        
class DepthLayerSystem:
    """Manages multiple depth layers with parallax"""
    def __init__(self):
        self.layers = []
        
    def add_layer(self, depth, content, speed):
        pass
        
    def on_scroll(self, scroll_position):
        """Update all layers based on scroll"""
        pass
```

#### 5. Animation System
```python
class StaggeredAnimation:
    """Staggered element animations"""
    def __init__(self, elements, stagger_ms=100):
        self.elements = elements
        self.stagger = stagger_ms
        self.direction = 'down'  # up, down, left, right
        
class FadeSystem:
    """Advanced fade effects"""
    def __init__(self):
        self.fade_type = 'in'  # in, out, through, cross
        self.duration = 600
        self.easing = 'ease-out'
```

#### 6. Navigation System
```python
class NavigationMode(Enum):
    LINEAR = "linear"        # Down/Enter only
    GRID = "grid"           # ←↑→↓ reveal.js style
    FREEFLOW = "freeflow"   # Custom paths

class Navigation:
    def __init__(self, mode=NavigationMode.LINEAR):
        self.mode = mode
        self.slides = []
        self.current = 0
        
    def configure_grid(self, rows, cols):
        """Configure grid navigation"""
        pass
        
    def configure_freeflow(self, paths):
        """Configure custom navigation paths"""
        pass
```

#### 7. Plugin System
```python
class BrandPackage:
    """Pluggable brand module"""
    def __init__(self, config):
        self.name = config['name']
        self.themes = {}      # Brand-specific themes
        self.blocks = {}      # Brand-specific blocks
        self.assets = {}      # Logos, icons, fonts
        self.config = config  # Full brand.json
        
    @staticmethod
    def load(path_or_name):
        """Load brand package from filesystem or name"""
        pass
```

---

## New Capabilities Detail

### 1. Continuous vs Page-Based Backgrounds

**Current (v1.1.0):**
```python
deck.add_section(background='particles')  # Independent per section
```

**New (v2.0.0):**
```python
# Continuous background
pres.set_global_background('particles', mode='continuous')
# Background persists across all slides

# Per-slide backgrounds (current behavior)
pres.set_global_background(mode='page')
pres.add_slide('title', background='particles')
pres.add_slide('content', background='grid')

# Hybrid mode
pres.set_global_background('gradient-waves', mode='continuous')
pres.add_slide('title', overlay_background={'particles': 0.3})
```

### 2. Staggered Scrolling & Fade Effects

**API:**
```python
pres.add_slide(
    'content',
    title='Key Points',
    content=[
        'First insight',
        'Second insight',
        'Third insight'
    ],
    animation={
        'type': 'staggered-fade',
        'stagger': 150,      # ms between elements
        'direction': 'up',   # up, down, left, right
        'fade': 'in',       # in, out, through
        'easing': 'ease-out'
    }
)
```

**JavaScript Implementation:**
```javascript
class StaggeredFade {
    constructor(elements, options) {
        this.elements = elements;
        this.stagger = options.stagger || 100;
        this.direction = options.direction || 'down';
        this.fadeType = options.fade || 'in';
    }
    
    trigger() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElements();
                }
            });
        });
        // Observe first element to trigger sequence
        observer.observe(this.elements[0]);
    }
    
    animateElements() {
        this.elements.forEach((el, index) => {
            setTimeout(() => {
                this.applyFade(el);
            }, index * this.stagger);
        });
    }
}
```

### 3. Multiple Depth Layers

**API:**
```python
pres.add_slide(
    'hero',
    title='Deep Space',
    layers=[
        {
            'depth': 0,              # Far background
            'content': 'stars',
            'speed': 0.2,            # Slow parallax
            'opacity': 0.6
        },
        {
            'depth': 1,              # Mid layer
            'content': 'nebula',
            'speed': 0.5,
            'opacity': 0.4
        },
        {
            'depth': 2,              # Foreground (content)
            'content': 'text-hero',
            'speed': 1.0             # Normal scroll
        },
        {
            'depth': 3,              # Overlay elements
            'content': 'floating-metrics',
            'speed': 1.3,            # Faster than scroll (dramatic)
            'opacity': 0.9
        }
    ]
)
```

**JavaScript Implementation:**
```javascript
class DepthLayerSystem {
    constructor() {
        this.layers = [];
        this.scrollY = 0;
    }
    
    addLayer(depth, element, speed) {
        this.layers.push({
            depth: depth,
            element: element,
            speed: speed,
            baseY: element.offsetTop
        });
        
        // Apply CSS transform for 3D effect
        element.style.transformStyle = 'preserve-3d';
        element.style.transform = `translateZ(${depth * 50}px)`;
    }
    
    onScroll(scrollY) {
        this.scrollY = scrollY;
        
        this.layers.forEach(layer => {
            // Parallax calculation
            const offset = (scrollY - layer.baseY) * layer.speed;
            
            // Apply transform with depth
            layer.element.style.transform = 
                `translateY(${offset}px) translateZ(${layer.depth * 50}px)`;
        });
    }
}

// Usage
const depthSystem = new DepthLayerSystem();
document.addEventListener('scroll', () => {
    depthSystem.onScroll(window.scrollY);
});
```

### 4. Theme with LLM Creative Interpretation

**Theme Structure:**
```json
{
  "name": "technical-dark",
  "version": "2.0.0",
  
  "structure": {
    "colors": {
      "surface": "#0F172A",
      "primary": "#10B981",
      "accent": "#06B6D4",
      "text": "#F8FAFC"
    },
    "typography": {
      "display": "Inter",
      "body": "Inter",
      "mono": "JetBrains Mono"
    },
    "spacing": {
      "base": "16px",
      "scale": 1.5
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
      "personality": ["confident", "structured", "modern"],
      "avoid": ["playful", "casual", "decorative"],
      "emphasize": ["clarity", "hierarchy", "purpose"],
      
      "interpretation_examples": {
        "hero_slide": [
          "Large bold title, left-aligned, asymmetric layout",
          "Accent bar on left, vertical or diagonal",
          "Metrics can float right or ground bottom"
        ],
        "stats_slide": [
          "Big numbers with mono font, generous spacing",
          "Left bar accent or top bar accent",
          "Staggered reveal, slow and confident"
        ],
        "content_slide": [
          "Asymmetric column layouts preferred",
          "Use accent color sparingly for emphasis",
          "Progressive disclosure over reveal-all"
        ]
      }
    }
  }
}
```

**Theme Interpreter Usage:**
```python
# Strict interpretation (current)
pres = Presentation(theme='technical-dark')

# Creative interpretation (new)
pres = Presentation(
    theme='technical-dark',
    interpretation_mode='creative',
    context={
        'audience': 'executive',       # vs 'technical', 'general'
        'purpose': 'product-launch',   # vs 'training', 'update'
        'emphasis': 'innovation',      # vs 'stability', 'performance'
        'formality': 'high'            # vs 'medium', 'casual'
    }
)

# Theme adapts:
# - Executives: More whitespace, larger text, fewer details
# - Product launch: More dramatic animations, bold colors
# - Innovation emphasis: Accent placement on future-facing content
# - High formality: Professional spacing, structured layouts
```

---

## Development Workflow

### Local Development (Claude Code)
```bash
# Your workspace
cd ~/workspace/cinematic-scroll-deck-project/

# Create evolution branch
git checkout -b unified-framework-v2

# Open with Claude Code
claude-code .

# Claude Code handles:
# - File operations, code generation
# - Git commits, branch management
# - Local testing, package builds
```

### Validation & Distribution (Claude.ai)
```bash
# After local development
# Come to this chat with:
# - Code changes summary
# - Test results
# - Questions/issues

# Claude.ai handles:
# - Architecture validation
# - Integration testing
# - Skill package creation
# - Documentation updates
```

---

## Success Criteria

### v2.0.0 Release Checklist

**Core Framework:**
- [ ] Block system operational
- [ ] Theme engine with LLM interpretation
- [ ] Multi-directional navigation
- [ ] Plugin loader system

**Visual Systems:**
- [ ] Continuous background mode
- [ ] Depth layer system (4+ layers)
- [ ] Staggered animations
- [ ] Fade effects (in, out, through, cross)

**Content:**
- [ ] 10+ universal slide templates
- [ ] 5+ layout systems
- [ ] 10+ content modules
- [ ] 3+ built-in themes

**Brand Packages:**
- [ ] CIQ brand package
- [ ] Dawson Bros package
- [ ] Plugin system validated

**Quality:**
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Skill package generated
- [ ] Examples working

**Compatibility:**
- [ ] Backward compatible with v1.1.0
- [ ] Migration guide complete
- [ ] Legacy API maintained

---

## File Structure Evolution

### Current (v1.1.0)
```
cinematic-scroll-deck-project/
├── cinematic_scroll_deck/
│   ├── __init__.py
│   ├── core.py
│   └── cli.py
├── tests/
├── docs/
└── examples/
```

### Target (v2.0.0)
```
unified-presentation-framework/
├── presentation_framework/
│   ├── __init__.py
│   ├── core/
│   │   ├── presentation.py
│   │   ├── block_system.py
│   │   ├── theme_engine.py
│   │   └── navigation.py
│   ├── visual/
│   │   ├── backgrounds.py
│   │   ├── depth_layers.py
│   │   └── animations.py
│   ├── blocks/
│   │   ├── slides/
│   │   ├── layouts/
│   │   └── content/
│   ├── themes/
│   │   ├── base_theme.py
│   │   ├── theme_interpreter.py
│   │   └── [theme-dirs]/
│   ├── plugins/
│   │   └── plugin_loader.py
│   └── cli.py
├── plugins/
│   └── [brand-packages]/
├── tests/
├── docs/
└── examples/
```

---

## Next Steps

### Immediate (This Week)
1. **Branch Creation**
   ```bash
   git checkout -b unified-framework-v2
   ```

2. **Core Refactoring**
   - Rename package directories
   - Create core/ subdirectory structure
   - Set up backward compatibility layer

3. **First Enhancement**
   - Choose: Background system OR Theme interpreter OR Block system
   - Implement with Claude Code
   - Validate with Claude.ai

### Short Term (Month 1)
- Complete core systems
- Add visual enhancements
- Build first brand package (CIQ)
- Generate skill distribution

### Medium Term (Month 2)
- Add content modules
- Build library management integration
- Export systems (PDF, PPTX)
- Complete documentation

### Long Term (Month 3+)
- Template marketplace
- Collaboration features
- Analytics system
- Community plugins

---

## Questions to Answer Before Development

1. **Priority Order:** Which system to build first?
   - Background enhancements
   - Block system
   - Theme interpreter
   - Navigation
   - Depth layers

2. **API Design:** Confirm Python API feels right

3. **Theme Philosophy:** How much LLM creativity vs structure?

4. **Brand Packages:** CIQ extraction strategy

5. **Library Management:** Integration approach

---

**Ready to begin evolution. Choose starting point and initiate with Claude Code.**
