---
description: Complete a sprint with design verification and deployment
---

# Sprint Completion

Close out a sprint with quality checks and deployment.

## 1. UX Review (Final)

Invoke the UX Designer for final review:
```
/ux-designer
```

### Maya's Final Checklist
- [ ] All UI matches approved mockups
- [ ] Consistent spacing and typography
- [ ] No orphaned states or dead ends
- [ ] Mobile responsive verified

## 2. Visual Verification

### Screenshots
Capture key screens:
```bash
# Use browser tool to capture
Take screenshot of landing page
Take screenshot of folder view
```

### Before/After Comparison
If redesigning, show both states side-by-side.

## 3. Design Artifact Cleanup

- [ ] Move approved prototypes to implementation
- [ ] Archive rejected mockups
- [ ] Update design documentation

## 4. Build & Deploy

// turbo
```bash
npm run build
```

```bash
git add . && git commit -m "Sprint [N] complete" && git push origin main
```

## 5. Verification

// turbo
```bash
open https://itsocialist.github.io/presentation-library-builder/
```

- [ ] Landing page loads
- [ ] New features visible
- [ ] No console errors

## 6. Documentation Update

- [ ] README updated with new features
- [ ] Sprint retrospective notes added
- [ ] Next sprint themes identified

## 7. Retrospective

### What Went Well
- 

### What Could Improve
- 

### Action Items for Next Sprint
- 
