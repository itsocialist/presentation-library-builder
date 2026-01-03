---
description: Plan a sprint with design review stages
---

# Sprint Planning

Create a sprint plan with UX review and UI design stages.

## 1. Define Sprint Scope

```markdown
# Sprint [N]: [Theme]

**Start:** YYYY-MM-DD  
**Status:** 📋 Planning

## Goals
- Goal 1
- Goal 2
- Goal 3
```

## 2. Create User Stories

For each feature:
```markdown
### US-[N]: [Title] [S/M/L]

**As a** [user type],  
**I want** [feature],  
**So that** [benefit].

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
```

## 3. UX Review Stage (Maya)

Invoke the UX Designer:
```
/ux-designer
```

Maya will review each story and provide:
- **ASCII wireframe** — Quick layout sketch
- **Flow analysis** — User journey critique
- **Friction points** — Identified issues

Example ASCII wireframe:
```
┌─────────────────────────────────────┐
│  [Logo]    Most Recent    [Search]  │
├─────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐             │
│ │thumb│ │thumb│ │thumb│  ← Recent   │
│ │ v1  │ │ v2  │ │ v3  │             │
│ └─────┘ └─────┘ └─────┘             │
├─────────────────────────────────────┤
│ ▼ RLC-H (5)                         │
│ ▼ Training (3)                      │
│ ▼ Deep (12)                         │
└─────────────────────────────────────┘
```

## 4. UI Design Stage

For visual features, generate mockups:

### Option A: React Prototype
Create a quick component in `prototypes/`:
```jsx
// prototypes/MostRecent.jsx
export const MostRecent = () => (
  <section className="most-recent">
    <h2>Most Recent</h2>
    <div className="card-row">
      {recentItems.map(item => <Card key={item.id} {...item} />)}
    </div>
  </section>
);
```

### Option B: Image Mockup
Use `generate_image` tool:
```
Generate a mockup of the presentation library landing page 
showing a "Most Recent" section with 3 cards at the top.
```

## 5. Finalize Sprint

- [ ] All stories have UX review
- [ ] Key UI features have mockups
- [ ] Stories sized and prioritized
- [ ] Sprint plan saved to `docs/sprints/sprint-[N].md`
