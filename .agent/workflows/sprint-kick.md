---
description: Kick off a sprint with design and implementation prep
---

# Sprint Kick-Off

Start a sprint with design artifacts and implementation prep.

## 1. Load Sprint Context

```bash
cat docs/sprints/sprint-[N].md
```

## 2. UX Review (Required)

Invoke the UX Designer for each major feature:
```
/ux-designer
```

### Maya's Review Checklist
- [ ] Primary user action identified
- [ ] Information hierarchy reviewed
- [ ] Mobile/responsive considerations noted
- [ ] Accessibility flags raised

### Deliverables
- ASCII wireframe for new layouts
- Annotated flow for new workflows

## 3. UI Design (For Visual Features)

Generate mockups before implementation:

### ASCII Mockups (Quick)
```
┌──────────────────────────┐
│  Component Layout        │
├──────────────────────────┤
│  [Element A]  [Element B]│
│  ┌────────────────────┐  │
│  │   Content Area     │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

### React Prototypes (Functional)
Create in `prototypes/[feature].jsx` for interactive review.

### Image Mockups (High-Fidelity)
Use generate_image for polished visuals:
```
Mockup: [description of the UI state]
Style: Modern, minimal, dark theme
Dimensions: 1200x800
```

## 4. Implementation Prep

// turbo
```bash
git checkout -b sprint-[N]
mkdir -p prototypes
```

- [ ] Branch created
- [ ] Prototypes folder ready
- [ ] First story implementation started

## 5. Daily Standup Format

```
YESTERDAY: What was completed
TODAY: What will be worked on
BLOCKERS: Any impediments
```
