# Using Claude Code with Unified Presentation Framework

**Date:** January 3, 2026  
**Project:** cinematic-scroll-deck-project → unified-presentation-framework  
**Development Mode:** Local (Claude Code) + Cloud (Claude.ai) coordination

---

## Setup

### 1. Navigate to Project

```bash
cd ~/workspace/cinematic-scroll-deck-project/
```

### 2. Create Evolution Branch

```bash
git checkout -b unified-framework-v2
```

### 3. Start Claude Code

```bash
claude-code .
```

Or if you prefer to specify the project:
```bash
claude-code ~/workspace/cinematic-scroll-deck-project/
```

---

## Initial Refactoring with Claude Code

### Session 1: Package Renaming

**Tell Claude Code:**
```
I'm evolving cinematic-scroll-deck into unified-presentation-framework.

Phase 1: Refactor package structure
1. Rename cinematic_scroll_deck/ to presentation_framework/
2. Update __init__.py to maintain backward compatibility
3. Create core/ subdirectory with these modules:
   - presentation.py (main class)
   - block_system.py (block management)
   - theme_engine.py (theme loading)
   - navigation.py (navigation system)
4. Move existing core.py code into presentation.py
5. Update all imports
6. Verify tests still pass

Create backward compatibility so v1 users aren't broken:
- from cinematic_scroll_deck import CinematicDeck should still work
- But map to new presentation_framework.core.presentation.Presentation

Commit changes with message: "Refactor: Rename package to presentation_framework (v2.0.0)"
```

### Session 2: Background System Enhancement

**Tell Claude Code:**
```
Add continuous background system to presentation_framework.

Create presentation_framework/visual/backgrounds.py:

1. BackgroundMode enum (PAGE_BASED, CONTINUOUS, HYBRID)
2. BackgroundSystem class:
   - set_mode(mode)
   - set_global_background(bg_type, options)
   - set_section_background(section_id, bg_type)
   - render_backgrounds() returns CSS/JS

3. Update Presentation class to use BackgroundSystem

4. Add JavaScript for continuous background flow:
   - Backgrounds persist across scroll boundaries
   - Smooth transitions between sections
   - Animation continues uninterrupted

5. Add tests in tests/test_backgrounds.py:
   - Test page-based mode (current behavior)
   - Test continuous mode
   - Test hybrid mode
   - Test background transitions

Example API:
```python
# Continuous mode
pres.set_global_background('particles', mode='continuous')

# Page-based mode (current)
pres.set_global_background(mode='page')
pres.add_slide('title', background='particles')
pres.add_slide('content', background='grid')
```

Commit: "Add continuous background system"
```

### Session 3: Depth Layer System

**Tell Claude Code:**
```
Add depth layer system with parallax scrolling.

Create presentation_framework/visual/depth_layers.py:

1. DepthLayer class:
   - depth: int (0 = background, higher = foreground)
   - content: str (HTML or canvas ID)
   - speed: float (parallax speed 0.0-2.0)
   - opacity: float (0.0-1.0)

2. DepthLayerSystem class:
   - add_layer(depth, content, speed, opacity)
   - remove_layer(layer_id)
   - on_scroll(scroll_position) - update all layers
   - render() - generate HTML/CSS/JS

3. JavaScript parallax engine:
   - Use CSS transform translateY + translateZ
   - Smooth requestAnimationFrame updates
   - Layer composition with proper z-index
   - Preserve 3D perspective

4. Update Presentation.add_slide() to accept layers parameter:
```python
pres.add_slide(
    'hero',
    title='Deep Space',
    layers=[
        {'depth': 0, 'content': 'stars', 'speed': 0.2},
        {'depth': 1, 'content': 'nebula', 'speed': 0.5},
        {'depth': 2, 'content': 'hero-text', 'speed': 1.0},
        {'depth': 3, 'content': 'metrics', 'speed': 1.3}
    ]
)
```

5. Add tests in tests/test_depth_layers.py

Commit: "Add depth layer parallax system"
```

### Session 4: Staggered Animation System

**Tell Claude Code:**
```
Add staggered animation and fade effects.

Create presentation_framework/visual/animations.py:

1. StaggeredAnimation class:
   - __init__(elements, stagger_ms, direction, fade_type)
   - trigger() - start animation sequence
   - animate_element(element, index)

2. FadeSystem class:
   - fade_in(element, duration, easing)
   - fade_out(element, duration, easing)
   - fade_through(element, duration) - fade out then in
   - cross_fade(from_element, to_element)

3. Direction options: 'up', 'down', 'left', 'right'
4. Fade types: 'in', 'out', 'through', 'cross'
5. Easing options: 'linear', 'ease-in', 'ease-out', 'ease-in-out'

6. Update Presentation.add_slide() to accept animation parameter:
```python
pres.add_slide(
    'content',
    title='Key Points',
    content=['Point 1', 'Point 2', 'Point 3'],
    animation={
        'type': 'staggered-fade',
        'stagger': 150,
        'direction': 'up',
        'fade': 'in'
    }
)
```

7. JavaScript implementation:
   - Use Intersection Observer for scroll triggers
   - setTimeout for stagger delays
   - CSS transitions for smooth fades

8. Add tests in tests/test_animations.py

Commit: "Add staggered animation and fade systems"
```

### Session 5: Theme Interpreter

**Tell Claude Code:**
```
Add LLM creative theme interpretation system.

Create presentation_framework/themes/theme_interpreter.py:

1. Update theme JSON format to include creative_parameters:
```json
{
  "structure": { ... },
  "creative_parameters": {
    "mood": "confident",
    "energy_level": "medium",
    "formality": "professional",
    "allowed_variations": {
      "color_temperature": "±10%",
      "spacing_flexibility": "±20%",
      "accent_placement": "creative"
    },
    "llm_guidance": {
      "description": "...",
      "interpretation_examples": { ... }
    }
  }
}
```

2. ThemeInterpreter class:
   - __init__(theme_config)
   - interpret_for_content(content_type, context)
   - apply_variations(base_style, variation_rules)
   - get_layout_recommendation(content_type, context)

3. Update Theme class to support creative parameters

4. Update Presentation class to accept interpretation_mode and context:
```python
pres = Presentation(
    theme='technical-dark',
    interpretation_mode='creative',  # vs 'strict'
    context={
        'audience': 'executive',
        'purpose': 'product-launch',
        'emphasis': 'innovation'
    }
)
```

5. Add 3 interpretation examples to each built-in theme

6. Add tests in tests/test_theme_interpreter.py:
   - Test strict mode (no variation)
   - Test creative mode (within boundaries)
   - Test context influence
   - Test variation limits

Commit: "Add theme interpretation system for LLM creativity"
```

### Session 6: Block System

**Tell Claude Code:**
```
Add block system for modular content management.

Create presentation_framework/core/block_system.py:

1. Block class:
   - __init__(block_id, block_type, content, theme, animations)
   - render() - generate HTML
   - update(new_content) - update without full regeneration
   - to_dict() - serialize
   - from_dict(data) - deserialize

2. BlockLibrary class:
   - register_block_type(type_name, template_path)
   - get_block_template(type_name)
   - list_block_types()

3. Block types to implement:
   - title-slide
   - section-slide
   - content-slide (1/2/3 column)
   - stats-slide
   - comparison-slide
   - appendix-slide

4. Update Presentation class:
   - add_block(block_id, block_type, content)
   - get_block(block_id)
   - update_block(block_id, new_content)
   - remove_block(block_id)
   - reorder_blocks(new_order)

5. Natural language command parsing (basic):
   - "Update SLIDE_001 title to 'New Title'"
   - "Remove STATS_002"
   - "Move SLIDE_003 before SLIDE_001"

6. Create blocks/ directory with HTML templates:
   - blocks/slides/title-slide.html
   - blocks/slides/section-slide.html
   - blocks/slides/content-slide.html
   - blocks/slides/stats-slide.html
   - blocks/slides/comparison-slide.html

7. Add tests in tests/test_block_system.py

Commit: "Add block system for modular content management"
```

---

## Coordination Pattern

### Local Development Cycle (Claude Code)

1. **Implement feature** using Claude Code
2. **Run tests locally**
   ```bash
   python tests/validate.py
   ```
3. **Commit changes**
   ```bash
   git add .
   git commit -m "Description"
   ```

### Validation Cycle (Claude.ai)

4. **Return to this chat** with:
   - "I just added [feature] with Claude Code"
   - Summary of what was changed
   - Any questions or issues

5. **I'll validate:**
   - Architecture consistency
   - Integration with other components
   - Skill package implications
   - Documentation needs

6. **I'll provide:**
   - Architecture feedback
   - Next steps
   - Skill package updates
   - Documentation

### Example Coordination

**You (after Session 1):**
> "Claude Code refactored the package structure. Renamed to presentation_framework, created core/ subdirectory, maintained backward compatibility. All tests passing. Ready for background system next?"

**Me:**
> "Great! Architecture looks good. Before background system, let's validate the backward compatibility layer. Can you show me the __init__.py import structure? Also, did the CLI tool get updated to use new package name while maintaining old command?"

---

## Testing Commands

### Run All Tests
```bash
cd ~/workspace/cinematic-scroll-deck-project/
python tests/validate.py
```

### Test Specific Module
```bash
python -m pytest tests/test_backgrounds.py -v
python -m pytest tests/test_depth_layers.py -v
python -m pytest tests/test_animations.py -v
```

### Test CLI
```bash
# Old command (backward compatibility)
cinematic-deck --input examples/test.md --output test.html

# New command
presentation-framework generate --input examples/test.md --output test.html
```

### Build Package
```bash
python -m build
```

### Test Installation
```bash
pip install -e .
python -c "from presentation_framework import Presentation; print('✓ Import works')"
python -c "from cinematic_scroll_deck import CinematicDeck; print('✓ Backward compat works')"
```

---

## Git Workflow

### Commit Messages Format
```
Type: Brief description (max 50 chars)

Detailed explanation of changes (wrap at 72 chars):
- What was changed
- Why it was changed
- Any breaking changes or migration notes

Example:
Add: Depth layer parallax system

Implemented DepthLayerSystem class with:
- Multiple layer support (0-10 depth levels)
- Parallax speed control per layer
- CSS 3D transforms with perspective
- Smooth scroll-based updates

API: pres.add_slide(..., layers=[{depth, content, speed}])
```

### Branch Strategy
```bash
# Main development
git checkout unified-framework-v2

# Feature branches (optional for major features)
git checkout -b feature/depth-layers
# ... work ...
git checkout unified-framework-v2
git merge feature/depth-layers
```

### Push to Remote (when ready)
```bash
git remote add origin https://github.com/yourusername/unified-presentation-framework.git
git push -u origin unified-framework-v2
```

---

## File Operations with Claude Code

### Reading Current Code
**Tell Claude Code:**
```
Show me the current structure of presentation_framework/core/presentation.py
```

### Creating New Files
**Tell Claude Code:**
```
Create presentation_framework/visual/backgrounds.py with [specification]
```

### Modifying Existing Files
**Tell Claude Code:**
```
Update presentation_framework/core/presentation.py:
- Add method add_block(block_id, block_type, content)
- Add method update_block(block_id, new_content)
- Update __init__ to accept interpretation_mode parameter
```

### Running Commands
**Tell Claude Code:**
```
Run the test suite: python tests/validate.py
```

---

## Progress Tracking

### Session Checklist

After each Claude Code session, verify:
- [ ] Code compiles without errors
- [ ] Tests pass (python tests/validate.py)
- [ ] Backward compatibility maintained
- [ ] Git commit created with clear message
- [ ] Documentation updated (if needed)

### Report to Claude.ai

After completing a feature:
1. Summary of what was added
2. Test results
3. Any challenges or questions
4. Next feature to tackle

---

## Emergency Recovery

If something breaks:

```bash
# See what changed
git status
git diff

# Revert last commit
git reset --soft HEAD~1

# Revert file to last commit
git checkout -- path/to/file.py

# Return to main branch
git checkout main
```

---

## Next Session Prep

Before starting each Claude Code session:

1. **Pull latest** (if working across machines)
   ```bash
   git pull origin unified-framework-v2
   ```

2. **Review plan** (this document + PROJECT_OVERVIEW.md)

3. **Pick one feature** to implement

4. **Tell Claude Code clearly** what to build

5. **Test locally** before reporting back

---

**Ready to start? Choose Session 1 (Package Refactoring) and begin with Claude Code.**
