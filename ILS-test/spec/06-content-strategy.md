# 06 — Content Strategy

---

## Strategic Position

ILS owns a proprietary catalog of **50,000+ courses** from verified expert publishers, TED, Harvard University, and hundreds of specialist partners.

> **The catalog is not the product. It is the infrastructure that powers the product.**

Content brings users in. The platform makes them stay. The catalog's value is not in volume — it is in quality, curation, and verified expertise. This is what powers the AI coaching layer, the skills assessment engine, and the personalization intelligence. It is the defensible moat beneath everything.

---

## The Catalog as Competitive Moat

The 50,000+ course corpus is a curated, high-quality, domain-rich dataset that most AI companies would pay significant sums to acquire. Most AI models are trained on the general internet — noisy, unverified, and shallow on applied professional knowledge. This catalog is the opposite.

**What the catalog enables (beyond content delivery):**
- An AI coach that draws on synthesized expert knowledge across the entire library — not generic best practices
- An AI skills assessor that understands competency deeply because it was trained on how experts actually teach and test those competencies
- A personalization engine that understands professional domains at a level of nuance that generic AI models cannot match
- Future: a proprietary fine-tuned or RAG-powered model that no competitor can replicate without the same catalog

---

## Phased Content Strategy

### Phase 1 — MVP (Crawl)
**Approach:** Curation and personalization within existing publisher agreements.

- AI-powered recommendation on top of the existing catalog
- Smart curation by role, industry, skill gap, and career trajectory
- No licensing complications — fast to ship, legally clean, commercially defensible
- The differentiation is *how* we personalize, not what content we have

### Phase 2 — Growth (Walk)
**Approach:** Short-form micro-content feed and expanded content formats.

- TikTok-style micro-content derived from the catalog — within current publisher terms
- AI-generated summaries and insight clips (short-form, derivative, within fair use)
- User-generated reactions and annotations creating a social layer on catalog content
- This creates new proprietary data about which content actually resonates

### Phase 3 — Enterprise (Run)
**Approach:** AI-generated custom content and proprietary model training.

- AI-generated custom content via renegotiated publisher agreements with explicit AI training rights
- Proprietary fine-tuned model trained on catalog corpus for coaching and assessment
- User-generated content with editorial curation layer
- By this phase: brand equity and user scale provide negotiating leverage with publishers

---

## Publisher Relationship Management

Publisher relationships are both the competitive moat **and** a potential constraint on innovation. The goal is to protect these relationships in the short term while strategically expanding what they permit over time.

### Near-Term (MVP)
- Operate strictly within current agreement terms — curation and personalization only
- Conduct a **legal audit of all current publisher agreements** for AI training rights before building any AI features that depend on catalog content — this is a business priority, not a future consideration
- Do not build features that assume renegotiated rights

### Medium-Term (Growth)
- Begin proactive renegotiation conversations with strategic partners
- Prioritize AI training rights for highest-value catalog segments
- Frame renegotiation as **expanded reach and new revenue models** for publishers, not extraction
- Implement **publisher permission tiers:**

| Tier | Permissions |
|---|---|
| Standard | Delivery and curation only |
| Extended | Available for short-form remixing and summarization |
| Full | Available for AI model training |

### Long-Term (Enterprise)
- As brand equity and user base grow, negotiating leverage increases
- Premium partners (TED, Harvard) should be treated as collaborative partners in renegotiation — their brand association with ILS is valuable to them too
- Target: majority of high-value catalog in Full or Extended tier

> **Legal Priority:** Audit all current publisher agreements for AI training rights before building AI features that depend on catalog content. This is a near-term business action, not a future product consideration.

---

## AI Model Strategy

### Partnership-First for MVP
Partner with an AI provider to accelerate time to market. This gets the personalization and recommendation layer functional without building from scratch.

**Critical architectural requirement:** The AI provider must be a **replaceable layer**, not load-bearing infrastructure. Avoid deep vendor lock-in from day one. The codebase should be structured so that swapping AI providers requires configuration changes, not architectural rewrites.

### In-House Path
As the catalog's AI training rights are secured and the user base grows, evaluate building or fine-tuning proprietary models:

- A catalog-trained model for coaching and assessment that no competitor can replicate
- A RAG layer that grounds AI responses in verified, expert-curated knowledge
- Skills assessment capabilities trained on how experts actually define and test competencies

The decision to go in-house vs. continue partnership should be driven by: (1) when catalog training rights are secured at sufficient scale, (2) when the technical team has the capability, and (3) when the competitive advantage of a proprietary model outweighs the investment cost.

---

## The Short-Form Content Feed

The TikTok-style feed is more significant than a format choice — it is a **new content type that corporate L&D has not done well.**

### What Makes It Different From Just Shorter Courses
- AI identifies the single most critical insight from a longer piece of content and renders it as a 60–90 second visual story
- Content is remixed by **role context** — the negotiation insight a sales rep needs looks different from the one a procurement manager needs, even if sourced from the same course
- A **daily learning feed** that feels like social media consumption but is tuned to each person's skill gaps and learning style

### The Feed Mix
The short-form feed contains three content types in a unified stream:
1. **Micro-content** derived from the catalog
2. **Recommended full content** (courses, paths) based on personalization
3. **Required learning** assigned by managers or admins

The experience design challenge is making all three feel like they belong in the same feed — so required learning doesn't create a "compliance mode" that breaks the experience.
