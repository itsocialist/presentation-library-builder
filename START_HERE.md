# Start Here: Unified Presentation Framework Evolution

**Date:** January 3, 2026  
**Status:** Ready to Begin  
**Next Action:** Execute steps below

---

## What You Have Now

✅ **Existing Project:** `cinematic-scroll-deck-project/` (v1.1.0)
- Git initialized, tests passing, PyPI-ready
- 3 themes, 4 backgrounds, scroll animations
- Production-ready foundation

✅ **Evolution Plan:** Complete architecture for v2.0.0
- Block system, theme interpreter, depth layers
- Continuous backgrounds, staggered animations
- Brand plugin system, multi-directional navigation

✅ **Documentation:**
- `PROJECT_OVERVIEW.md` - Complete technical architecture
- `CLAUDE_CODE_INSTRUCTIONS.md` - Step-by-step development guide
- `presentation-framework-analysis.md` - Full requirements analysis

---

## Start Development Now

### Step 1: Open Terminal

```bash
cd ~/workspace/cinematic-scroll-deck-project/
```

### Step 2: Create Evolution Branch

```bash
git checkout -b unified-framework-v2
```

### Step 3: Start Claude Code

```bash
claude-code .
```

### Step 4: First Task (Package Refactoring)

**Copy this prompt to Claude Code:**

```
I'm evolving cinematic-scroll-deck into unified-presentation-framework v2.0.0.

PHASE 1: Package Structure Refactoring

Tasks:
1. Rename directory: cinematic_scroll_deck/ → presentation_framework/
2. Create subdirectories:
   - presentation_framework/core/
   - presentation_framework/visual/
   - presentation_framework/blocks/
   - presentation_framework/themes/
   - presentation_framework/plugins/

3. Move core.py → core/presentation.py and refactor:
   - Rename CinematicDeck class to Presentation
   - Keep all existing functionality

4. Update __init__.py for backward compatibility:
   ```python
   from .core.presentation import Presentation
   
   # Backward compatibility for v1 users
   CinematicDeck = Presentation
   
   __version__ = "2.0.0-alpha"
   __all__ = ["Presentation", "CinematicDeck"]
   ```

5. Update cli.py imports to use new structure

6. Update tests to import from presentation_framework

7. Run tests: python tests/validate.py

8. Create git commit:
   git add .
   git commit -m "Refactor: Rename to presentation_framework, create v2 structure

   - Renamed cinematic_scroll_deck to presentation_framework
   - Created core/, visual/, blocks/, themes/, plugins/ subdirs
   - Moved core.py to core/presentation.py
   - Maintained backward compatibility (CinematicDeck still works)
   - All tests passing
   
   This is the foundation for v2.0.0 evolution."

Expected outcome: Package renamed, tests passing, ready for new features.
```

---

## After Step 4: Report Back

Once Claude Code completes the refactoring, **return to this Claude.ai chat** and say:

> "Phase 1 complete. Package refactored to presentation_framework. Tests passing. Ready for next phase."

Then I'll help you:
- Validate the refactoring
- Choose next feature (backgrounds, depth layers, or theme interpreter)
- Provide next Claude Code prompt

---

## Development Pattern

```
┌─────────────────────────────────────┐
│  Claude Code (Local)                │
│  - Implement feature                │
│  - Run tests                        │
│  - Git commit                       │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│  You → Claude.ai Chat               │
│  "Feature X complete, tests pass"   │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│  Claude.ai (Validation)             │
│  - Validate architecture            │
│  - Provide next prompt              │
│  - Update documentation             │
└──────────────┬──────────────────────┘
               │
               ↓
          (Repeat)
```

---

## Quick Reference

### Your Current Project Location
```bash
~/workspace/cinematic-scroll-deck-project/
```

### Evolution Branch
```bash
unified-framework-v2
```

### Key Files to Reference
- `PROJECT_OVERVIEW.md` - Full architecture
- `CLAUDE_CODE_INSTRUCTIONS.md` - All development sessions
- `presentation-framework-analysis.md` - Requirements mapping

### If You Get Stuck

**In Claude Code:**
- Ask: "What's the current state of the project?"
- Ask: "Show me the file structure"
- Ask: "Run the tests"

**In Claude.ai (this chat):**
- Share the error message
- Describe what you were trying to do
- I'll help troubleshoot

---

## Feature Implementation Order (Recommended)

After Phase 1 (Package Refactoring), choose:

1. **Background System** (easiest, builds on existing)
   - Continuous backgrounds
   - Page-based backgrounds
   - Hybrid mode

2. **Depth Layers** (visual impact, moderate difficulty)
   - Parallax scrolling
   - Multi-layer composition
   - 3D transforms

3. **Animation System** (high impact, moderate difficulty)
   - Staggered scrolling
   - Fade effects (in/out/through/cross)
   - Direction options

4. **Block System** (foundation for modularity)
   - Block management
   - Natural language updates
   - Template library

5. **Theme Interpreter** (most complex, enables creativity)
   - Creative parameters
   - LLM interpretation
   - Context awareness

6. **Navigation** (extends user experience)
   - Grid navigation (reveal.js style)
   - Freeflow paths
   - Page tracker UI

---

## Expected Timeline

**Phase 1 (Package Refactoring):** 30-60 minutes  
**Phase 2 (First Feature):** 2-4 hours  
**Phase 3 (Second Feature):** 2-4 hours  
**Phase 4 (Third Feature):** 2-4 hours

**Total for MVP:** 1-2 days of focused development

---

## Success Indicators

After Phase 1, you should have:
- ✅ Package renamed to `presentation_framework`
- ✅ Directory structure organized
- ✅ Backward compatibility working
- ✅ All tests passing
- ✅ Git commit created
- ✅ Ready for feature additions

---

## Ready?

**Execute Steps 1-4 above, then report back to this chat.**

The instructions are designed to work with Claude Code directly. Just copy the prompt from Step 4 into Claude Code and it will handle the refactoring.

**Good luck! 🚀**
