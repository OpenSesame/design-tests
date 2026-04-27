# 09 — Integration Ecosystem

---

## Strategic Importance

Integrations are not a feature list — they are what makes the ROI framework **provable** and the ambient learning experience **possible**.

The system needs data connections into the organization's existing stack to:
1. Connect learning activity to business outcomes (ROI proof)
2. Deliver context-triggered ambient learning signals (motivation architecture)
3. Understand organizational context for personalization (relevance)
4. Send novel skills data back to the HR tech stack (competitive moat)

---

## Bidirectional Data: The Key Differentiator

Most platforms consume data. ILS **generates novel assessed data** that other systems want.

By sending AI-assessed skills profiles back to performance management tools, ILS becomes a source of truth for the organization's talent intelligence layer. This creates a stickiness that goes far beyond the learning experience — the platform becomes infrastructure.

> *"Your Lattice performance reviews now include AI-assessed skill competency data from ILS."*

This bidirectional model also strengthens the ROI story: ILS data enriches the tools buyers already use and trust.

---

## Integration Map

| Category | Tools | Data In → ILS | Data Out → Tool |
|---|---|---|---|
| **HRIS** | BambooHR, Workday, Rippling, SAP SuccessFactors | Role, tenure, org structure, performance reviews, promotions | Skills assessments, capability scores, development milestones |
| **Performance Management** | Lattice, Culture Amp, 15Five | Goals, review scores, engagement survey data | AI-assessed skills profiles, learning activity, competency growth |
| **CRM** | Salesforce, HubSpot | Deal data, pipeline, activity metrics | Sales skill gap analysis, training completion correlated to outcomes |
| **Communication** | Slack, Microsoft Teams | Calendar events, meeting context, project activity | Ambient learning nudges, pre-meeting micro-content |
| **Productivity** | Google Workspace, Microsoft 365 | Document activity, role context signals | Flow-of-work content recommendations |
| **Talent Management** | Greenhouse, Lever, Workday | Job profiles, internal mobility data | Skill gap analysis, development path recommendations |

---

## Phased Integration Rollout

### Phase 1 — MVP (Months 1–6)
**Goal:** Establish core data connections for personalization and basic ROI signaling.

**Priority integrations:**
- **BambooHR** — HRIS for role/org context and retention data
- **Slack** — ambient learning signals, calendar-triggered nudges
- **Google Workspace** — calendar integration for context-triggered delivery, flow-of-work recommendations from Google Docs/Drive

**Rationale:** These cover smaller and mid-market stacks where early customers are likely to be. They validate the integration model before investing in enterprise-grade connectors.

### Phase 2 — Growth (Months 7–18)
**Goal:** Enable the full ROI framework with lagging indicator data and bidirectional flows.

**Priority integrations:**
- **Lattice / Culture Amp** — performance management data in, skills assessment data out
- **Salesforce** — sales performance correlation for ROI attribution
- **Microsoft Teams** — ambient signals for the Microsoft-stack majority of enterprise
- **15Five** — engagement and goal data for manager effectiveness correlation

### Phase 3 — Enterprise (Months 19–36)
**Goal:** Full enterprise-grade integration ecosystem.

**Priority integrations:**
- **Workday** — full HRIS and talent management suite
- **SAP SuccessFactors** — enterprise HRIS for large global organizations
- **Greenhouse / Lever** — talent acquisition for internal mobility tracking
- **Microsoft 365** — deep Outlook and Teams integration for ambient signals

---

## Integration Design Principles

### 1. Data Minimization
Only request the data actually needed for a specific feature. Don't request broad API access "for future use." Enterprise security teams will scrutinize permissions carefully.

### 2. Graceful Degradation
The platform should work without integrations — they enhance the experience, they don't gate it. A learner with no integrations configured gets a great personalized feed. A learner with full integrations gets ambient signals, flow-of-work delivery, and maximum personalization.

### 3. Transparency for Learners
When data from external systems is used to personalize the learner's experience or trigger a nudge, the system should be transparent about the source:
- *"This recommendation is based on your role in [HRIS]"*
- *"We noticed you have a meeting coming up based on your calendar"*

Learners should never be surprised by how the system knows something about them.

### 4. Admin Control
Admins configure which integrations are active and what data is shared. They should have clear visibility into what is flowing in and out of ILS without needing technical support to understand it.

### 5. Privacy Compliance
All integrations must comply with the tiered visibility model in [`07-privacy-and-trust.md`](./07-privacy-and-trust.md). Integration data is subject to the same data governance principles as natively collected data.

---

## The Ambient Learning Signal Architecture

The integration with calendar and communication tools powers the ambient learning signal system. The triggering logic:

| Trigger | Source | Signal Type |
|---|---|---|
| Meeting with direct report scheduled | Calendar | Manager conversation prompt |
| Performance review scheduled | Calendar or HRIS | Feedback framework refresher |
| Promotion or role change | HRIS | Role transition learning path |
| New project assignment | Project management tool | Relevant skill content |
| Friday afternoon | Time-based | Weekly reflection prompt (connected to week's activity) |
| Skill gap identified in assessment | Internal | Relevant content recommendation |

**The bar for sending any signal:** Would a thoughtful mentor send this message right now? If no — silence.
