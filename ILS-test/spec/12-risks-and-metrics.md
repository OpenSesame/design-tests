# 12 — Risks, Open Questions & Success Metrics

---

## Key Risks

### Product Risks

**Scope creep — product identity dilution**
The Career Identity Engine, micro-challenges, and the Executive Layer all carry scope creep risk if not tightly bounded. The product's power comes from doing a focused set of things exceptionally well. Doing everything makes the product do nothing.

*Mitigation:* Apply the Feature Prioritization Principles from [`11-roadmap.md`](./11-roadmap.md) to every new request. Default to implementing new ideas as feed content types before building new surfaces.

**Feed tension — required content poisoning the experience**
Required learning in the same feed as voluntary content can destroy the intrinsic motivation environment if the algorithm treats them identically or if the UX signals compliance-mode.

*Mitigation:* Invest significantly in feed algorithm design. Required content must feel contextually relevant, not administratively assigned. Treat the feed algorithm with the same priority as the HCA dashboard.

**Benchmark chicken-and-egg**
Industry benchmarking requires sufficient customer volume to be statistically meaningful. Promising this feature before the dataset is ready damages credibility.

*Mitigation:* Do not surface benchmarking until the data is statistically meaningful. Build the data pipeline from day one so the feature can be activated at the right threshold. Be transparent with buyers about the timeline.

**Onboarding cold start**
The system needs data to deliver a great first experience, but can't ask for too much data at onboarding. If the first feed experience feels generic, the habit never forms.

*Mitigation:* Invest heavily in the onboarding experience. Define the minimum viable personalization data set. Test what produces an "eerily relevant" first experience with the least input.

---

### Business Risks

**Publisher licensing constraints**
Current publisher agreements may not permit catalog use for AI model training or content remixing. Building features that assume these rights before securing them creates legal and business risk.

*Mitigation:* Legal audit of all publisher agreements is a **near-term business action, not a future task.** Do not build AI training features that depend on catalog content until rights are confirmed or renegotiated.

**AI vendor lock-in**
Partnership-first AI strategy carries long-term control and cost risk if the architecture becomes dependent on a single provider.

*Mitigation:* Treat the AI layer as replaceable infrastructure from day one. The AI provider should be a configuration choice, not an architectural dependency.

**Sales motion shift**
Moving up-market to C-suite requires different relationships, longer sales cycles, different proof points, and a different kind of sales team than the existing L&D professional motion.

*Mitigation:* Treat this as a deliberate GTM transition, not an incidental byproduct of building the Executive Layer. The sales motion, enablement, and success definitions need to evolve in parallel with the product.

**Privacy trust deficit**
If learners perceive the platform as surveillance infrastructure for their employer, adoption will be superficial and the data will be meaningless.

*Mitigation:* Implement the full privacy architecture from MVP. Make the learner privacy commitment visible and specific. Train the sales team to lead with privacy as a feature, not a disclaimer.

---

## Open Questions

These are unresolved decisions that will shape the next phase of product work. They should be answered before the corresponding features are built.

### Onboarding
- What is the minimum data set at onboarding that produces a compelling enough first experience to earn the learner's trust for progressive profiling?
- How do we test "eerily relevant" as a qualitative first-session outcome? What does that measurement look like?

### Feed Algorithm
- How does the feed handle a learner who consistently skips required content — escalate to admin, adjust delivery format, or both?
- What is the right ratio of required to voluntary to micro-challenge to social proof content in a healthy feed?
- How does the algorithm handle a new learner with no behavioral data yet?

### Executive Layer
- What is the commercial model for the Executive Intelligence Layer — included in the enterprise tier, or a separate SKU?
- How do we design the executive experience so that it feels like a strategic advisor rather than a learning app, without it feeling disconnected from the platform?

### Benchmarking
- At what customer volume does the benchmark dataset become statistically meaningful?
- What is the plan to seed or simulate benchmark data before that threshold — and is that ethically defensible?
- How granular should benchmarks be (industry + company size + geography)?

### Privacy & Trust
- How do we handle the edge case where a manager requests individual learner data that falls outside their visibility tier?
- What is the audit log and transparency mechanism for data sharing with integrated systems?

### Integrations
- What is the minimum viable integration for the ambient learning signal feature to work? (Does it require calendar access, or can it work from HRIS role data alone?)
- How do we handle customers who cannot or will not provide integration access due to IT security policies?

---

## Success Metrics

### Learner Engagement Health

| Metric | What It Measures | Target Signal |
|---|---|---|
| Daily Active Learners / MAU | Platform stickiness | Growing ratio of voluntary return vs. required-content-only sessions |
| Feed session quality score | Insight density per session | Completion rate and content depth, not session length |
| Time-to-first-value | Onboarding effectiveness | Learner engages with 3+ relevant pieces of content in first session |
| Voluntary vs. required engagement ratio | Intrinsic motivation development | Voluntary engagement grows faster than required over time |
| Re-engagement nudge conversion | Signal quality of outbound messages | High conversion = contextually relevant; low conversion = deprioritize that trigger type |

### Organizational Capability Health

| Metric | What It Measures | Target Signal |
|---|---|---|
| HCA score trajectory | Organizational capability growth | Month-over-month improvement across customer base |
| Capability velocity | Speed of gap-to-competency | Trending down quarter-over-quarter |
| Required training compliance rate | Admin confidence in the platform | Consistently above customer's historical LMS baseline |
| Internal mobility rate | Talent development ROI | Increasing over 12-month periods |

### Business Health

| Metric | What It Measures | Target Signal |
|---|---|---|
| Integration depth per customer | Platform stickiness and data quality | More integrations = higher retention probability |
| Expansion revenue | Product-led growth | Organizations adding seats, integrations, or upgrading tiers |
| CHRO NPS | Executive buyer advocacy | Advocates, not just renewers |
| Time-to-first-integration | Onboarding depth | Faster integration = faster ROI realization = faster renewal confidence |

---

## Anti-Metrics

These metrics should **not** be used as success measures, and optimizing for them is actively harmful:

- **Total time in app** — optimizing for this leads to engagement-farming design
- **Notification open rate** — optimizing for this leads to more notifications, not better ones
- **Course completion count** — this is the LMS metric we are replacing, not improving
- **Content catalog size** — volume is not differentiation; curation and relevance are
