# 07 — Privacy & Trust Architecture

---

## The Core Tension

Two legitimate needs that appear to conflict:

- **Learners** need to feel safe that their skill gaps, struggles, and assessment results are not being used against them by their employer
- **Buyers** (CHROs, admins, managers) need clear visibility into organizational progress to justify the investment and do their jobs

These are not incompatible — but they require deliberate, transparent design to coexist. The resolution is a **tiered visibility model** with radical transparency about exactly what each party can see.

---

## Why This Matters for Adoption

Psychological safety drives engagement. Engagement drives data quality. Data quality drives ROI.

If learners suspect their employer is watching their every interaction, they will:
- Only engage with required content (minimizing "exposure")
- Avoid content about weaknesses or gaps they don't want documented
- Treat the platform as a compliance tool rather than a growth partner

This destroys the very data that makes the platform valuable to buyers.

> **Protecting learner privacy is not just a values statement — it is what makes the ROI framework work.**

This framing should be part of the sales conversation with CHROs: *"The reason our data is more meaningful than your current LMS's data is that employees actually use it voluntarily. They do that because they trust it."*

---

## Tiered Visibility Model

### What Learners Own (Private)
- Individual skill gap details and assessment results
- Personal career identity and aspiration data
- Specific content interactions, struggles, and abandoned content
- Feed interaction patterns and personalization signals

**No employer access. No manager access. Ever.**

### What Managers See
- Team-level completion status for required learning
- Aggregate team engagement trends (not individual)
- Recommended development opportunities for their reports — framed as tools to help, surfaced proactively by the system
- Individual completion of assigned content (this is functionally required for their role)

**Managers do not see:** individual assessment scores, voluntary learning choices, or anything that could be used in a performance review without the learner's knowledge.

### What L&D Admins See
- Organizational completion rates by department, cohort, or program
- Compliance status — who has completed required training
- Program health metrics — engagement, completion, drop-off points
- Aggregate skill gap analysis across the organization

**Admins do not see:** individual learner-level voluntary behavior, personal assessment results, or career identity data.

### What CHROs / Executives See
- Organizational HCA score and capability velocity
- Department and cohort-level trends
- Benchmark comparisons against industry peers (future state)
- Compliance and program completion at the organizational level
- Prescriptive recommendations for organizational capability improvement

**Executives do not see:** individual learner detail beyond what managers are permitted to see.

---

## Transparency as a Product Feature

The learner-facing privacy layer is **not buried in terms of service.** It is a visible, accessible, plain-language feature of the platform.

### The Learner Privacy Commitment

> *"Your growth data belongs to you. Your organization sees the big picture — team progress, organizational health, compliance status. They do not see your personal journey, your gaps, or your struggles. ILS is on your side."*

This message should be:
- Surfaced during onboarding in plain language
- Accessible at any time from the learner's profile
- Specific — not "we protect your privacy" but "here is exactly what your employer can and cannot see"

### What "On Your Side" Means in Practice
- The system never surfaces a learner's individual gaps to their manager without explicit consent
- Assessment results are used to personalize the learner's experience, not to generate employer reports
- Learners can see exactly what data is stored about them
- Learners can control what activity is visible to peers in the social proof layer

---

## Social Proof Privacy Design

The fluid social proof layer (see [`05-features.md`](./05-features.md)) requires specific privacy considerations:

- All social signals are **aggregate and anonymized** — never individually attributed without consent
- *"3 people with your role completed this"* — not *"Your colleague Sarah completed this"*
- Learners can opt out of contributing to social proof signals while still seeing them
- No peer-to-peer visibility of learning history by default — opt-in only

---

## Data Governance Principles

1. **Minimum necessary collection** — only collect data that directly improves the learner's or buyer's experience
2. **Purpose limitation** — data collected for personalization is not used for employer reporting
3. **Learner data portability** — learners can export their own data in a readable format
4. **Clear retention policies** — data retention periods are disclosed and enforced
5. **Bidirectional integration transparency** — when skills assessment data flows to external systems (Lattice, Culture Amp), learners are informed of what is shared and with which systems

See [`09-integrations.md`](./09-integrations.md) for details on bidirectional data flows.
