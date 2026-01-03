# Sprint 1: Foundation

**Start:** 2026-01-03  
**Status:** 📋 Planning

## Sprint Goals
- Implement "Most Recent" section on landing page
- Set up metadata system for presentation management
- Integrate Umami analytics tracking
- Create enhanced management workflows

---

## User Stories

### US-1: Most Recent Section [M]

**As a** returning user,  
**I want** to see my 3 most recently opened presentations at the top,  
**So that** I can quickly access what I was working on.

**Acceptance Criteria:**
- [ ] "Most Recent" section appears above folder sections
- [ ] Shows exactly 3 cards in a horizontal row
- [ ] Cards display thumbnail, title, folder badge
- [ ] Tracks views via localStorage or metadata
- [ ] Graceful fallback when < 3 items exist

---

### US-2: Metadata System [M]

**As a** library administrator,  
**I want** each presentation to have a metadata JSON file,  
**So that** I can manage titles, descriptions, tags, and visibility.

**Acceptance Criteria:**
- [ ] Build script creates metadata.json for each presentation
- [ ] Metadata includes: title, description, folder, tags, created, modified
- [ ] Landing page reads from metadata for display
- [ ] Missing metadata handled gracefully

---

### US-3: Umami Analytics Integration [S]

**As a** library owner,  
**I want** view tracking on all presentations,  
**So that** I can see which content is most popular.

**Acceptance Criteria:**
- [ ] Tracking script injected into all generated HTML
- [ ] Each presentation tracked with unique identifier
- [ ] Views visible in Umami dashboard
- [ ] No performance impact (defer/async loading)

---

### US-4: Enhanced Workflows [S]

**As a** content manager,  
**I want** workflows for hiding, moving, and describing presentations,  
**So that** I can manage the library without editing files manually.

**Acceptance Criteria:**
- [ ] `/hide` workflow moves to unpublished/
- [ ] `/move` workflow relocates between folders
- [ ] `/describe` workflow updates metadata
- [ ] All workflows trigger rebuild and deploy

---

## Definition of Done
- [ ] Code committed to `main`
- [ ] Deployed to GitHub Pages
- [ ] Acceptance criteria verified
- [ ] UX reviewed by Maya

---

## UX Review — Maya Chen

### US-1: Most Recent Section

**Layout Analysis:**
```
┌─────────────────────────────────────────────────────────────┐
│  [CIQ Logo]                              🔍 [Search]        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  MOST RECENT                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  ┌────────┐  │  │  ┌────────┐  │  │  ┌────────┐  │      │
│  │  │ thumb  │  │  │  │ thumb  │  │  │  │ thumb  │  │      │
│  │  │ 16:9   │  │  │  │ 16:9   │  │  │  │ 16:9   │  │      │
│  │  └────────┘  │  │  └────────┘  │  │  └────────┘  │      │
│  │  Title       │  │  Title       │  │  Title       │      │
│  │  [RLC-H]     │  │  [Deep]      │  │  [Training]  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ▼ RLC-H (5)                                                │
│  ▼ Training (3)                                             │
│  ▼ Deep (12)                                                │
│  ▼ Tests (2)                                                │
└─────────────────────────────────────────────────────────────┘
```

**Maya's Notes:**
- ✅ Most Recent at top = correct visual hierarchy
- ✅ 3 cards fits common viewport without scroll
- ⚠️ Consider "empty state" when user has no history
- ⚠️ Mobile: Stack cards vertically on narrow screens
- 💡 Add subtle "View All" link if > 3 recent items

### US-2: Metadata System

**Flow Analysis:**
```
Presentation Added → Auto-generate metadata.json
                  → Build script reads metadata
                  → Landing page renders from metadata
```

**Maya's Notes:**
- ✅ Metadata-driven = single source of truth
- ⚠️ Handle missing fields gracefully (fallback to filename)
- 💡 Consider "lastViewed" timestamp for Most Recent sorting

### US-3: Umami Analytics

**Maya's Notes:**
- ✅ Defer loading = no UX impact
- 💡 Add slide-level tracking for scroll presentations

### US-4: Enhanced Workflows

**Maya's Notes:**
- ✅ Agent-driven workflows reduce friction
- ⚠️ `/hide` should show confirmation before action
