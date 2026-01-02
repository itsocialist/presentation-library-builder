---
description: Systematic debugging workflow for diagnosing and fixing issues
---

# Systematic Debugging Workflow

Use this workflow when encountering deployment failures, build errors, or other technical issues.

## 1. Stop and Analyze

**STOP** all attempted fixes. Document the current state:
- What was attempted?
- What is the current error/failure state?
- What logs or error messages are available?

## 2. Identify Root Causes

Research and analyze to generate **3 high-probability root causes**, ranked by likelihood:

**Example Format:**
1. **[Root Cause Name]** (X% likelihood)
   - Why it's likely
   - Evidence supporting this theory
   
2. **[Root Cause Name]** (X% likelihood)
   - Why it's likely
   - Evidence supporting this theory
   
3. **[Root Cause Name]** (X% likelihood)
   - Why it's likely
   - Evidence supporting this theory

## 3. Generate Solutions

For each root cause, define:
- **Validate:** How to confirm this is the actual problem
- **Eliminate:** How to fix it if validated

## 4. Execute Validation Plan

Work through each solution systematically:

1. **Check documentation/examples** (web search, official docs, GitHub issues)
2. **Inspect logs** (build logs, runtime logs, error traces)
3. **Verify configuration** (env vars, config files, dependencies)
4. **Test hypothesis** (minimal reproduction, toggle variables)

## 5. Implement Fix

Once root cause is confirmed:
- Apply the fix
- Verify it resolves the issue
- Document what was changed

## 6. Update Documentation

- Add notes about the issue and solution
- Update relevant workflow or setup docs
- Consider adding validation checks to prevent recurrence

---

## Example Application: Umami Analytics Deployment

**Problem:** Vercel deployment failing for Umami fork

**Root Causes:**
1. **Missing Required Env Vars** (90%) - `APP_SECRET` not set
2. **DB Schema Not Initialized** (60%) - Tables not created
3. **Wrong Connection String Format** (30%) - Pooler URL incompatible

**Solution 1 Validation:**
- ✅ Web search: Umami docs confirm `APP_SECRET` required
- ✅ Check Vercel logs: Look for env var errors
- ✅ Fix: Generate random secret, add to Vercel, redeploy

**Result:** Issue resolved by adding `APP_SECRET` environment variable.
