# 05 — Feature Architecture

---

## Feature Map

| Feature | Primary Persona | Phase |
|---|---|---|
| [The Feed](#the-feed) | Learner | MVP |
| [Onboarding Experience](#onboarding-experience) | Learner | MVP |
| [Career Identity Engine](#career-identity-engine) | Learner | MVP (language layer) → Growth (full feature) |
| [Fluid Social Proof Layer](#fluid-social-proof-layer) | Learner | MVP |
| [Manager Dashboard](#manager-dashboard) | Manager | MVP (v1) → Growth (v2) |
| [Admin Console](#admin-console) | L&D Admin | MVP |
| [Executive Intelligence Layer](#executive-intelligence-layer) | CHRO / Executive | Growth |
| [HCA Dashboard](#hca-dashboard) | CHRO / Admin | MVP (leading indicators) → Growth (lagging + benchmarks) |
| [Ambient Learning Signals](#ambient-learning-signals) | Learner | Growth |
| [Micro-Challenges](#micro-challenges) | Learner | Growth |

---

## The Feed

The Feed is the **front door of ILS** — the primary user interface and the single most important surface in the product. Feed algorithm design should receive the same product investment as the HCA dashboard.

The Feed normalizes daily engagement, blurs the line between required and voluntary learning, and creates the habit loop that makes the platform indispensable.

### Content Types in the Feed

| Type | Description | Who Controls It |
|---|---|---|
| **Micro-content** | Short-form clips, 60–180 seconds, single insight per clip | Algorithm + catalog |
| **Recommended Learning** | Full courses and learning paths, personalized by role, goals, and behavior | Algorithm |
| **Required Learning** | Assigned content from manager or admin | Manager / Admin |
| **Micro-Challenges** | Small real-world application tasks that create a need for content | Algorithm |
| **Social Proof Signals** | Ambient peer activity — "3 people on your path completed this" | System-generated |
| **Ambient Nudges** | Context-triggered prompts tied to calendar, work tools, role milestones | System-generated |

### Feed Design Principles

- **Required content receives identical visual treatment to voluntary content.** No compliance stigma. No visual differentiation that signals "this is the boring mandatory stuff."
- **Optimize for insight density, not session length.** The goal is not to maximize time in app.
- **Introduce natural stopping points.** No infinite scroll. The feed should be easy to start and satisfying to stop.
- **Surface content that creates application opportunities,** not just learning moments.
- **The algorithm earns trust over time** — the more the learner uses it, the better it knows them. This is a retention mechanic in itself.

### The Required vs. Voluntary Tension

Required learning has a completion obligation — it can feel like a chore. Voluntary learning feels like discovery. If the feed algorithm doesn't handle this distinction carefully, required content will poison the entire experience.

**Resolution:**
- Present required content in the same format with the same visual language as everything else
- Frame required content in terms of personal relevance, not organizational obligation
- Use required content completion as an **on-ramp** to voluntary learning — a compliance module becomes a gateway to genuine curiosity

---

## Onboarding Experience

The first 5 minutes of the learner experience determine whether the motivation architecture ever gets a chance to work.

### Design Goal
Onboarding should feel like a **quick, engaging self-discovery experience** — not a drawn-out personality assessment. The system needs rich data to work well, but asking for all of it upfront feels like homework.

### Approach: Progressive Profiling

Collect the minimum viable data needed for a compelling first experience. Collect the rest over time through behavior inference.

**At onboarding (collect):**
- Role and industry
- 1–2 aspirational prompts framed as interesting questions, not form fields
- Nothing else — no lengthy skills inventories

**Over time (infer):**
- Skill level and gaps from behavior and feed interaction
- Learning style preferences from content format engagement
- Career trajectory from content choices and completions
- Everything else the algorithm needs

### The Promise of Onboarding
The first content experience after onboarding should feel **eerily well-matched** to who the learner is. That moment of recognition — *"this app actually gets me"* — is what earns trust and sets the habit.

### Tone
Curious and energizing. Focused on aspirations, not deficiencies. The system is excited about who this person is becoming, not cataloging their current gaps.

---

## Career Identity Engine

Every learner has a **Career Identity** — a living narrative of where they've been, who they're becoming, and what they stand for professionally. The Career Identity Engine connects learning to that identity.

### Scope Constraint
**ILS must not become a career recommendation platform.** The risk of scope creep here is real and must be actively managed. Career Identity is a framing tool, not a career navigation product.

### MVP Implementation: Language Layer
In the MVP, Career Identity manifests primarily through **tone and framing** rather than as a dedicated feature surface.

- How recommendations are worded: *"You're becoming the kind of leader who..."*
- How progress is reflected back: *"People who became what you want to become always developed X next"*
- How gaps are surfaced: through possibility, not deficiency

This costs nothing to build and **tests the hypothesis** before any heavy product investment. If users respond, the foundation is already there.

### Future State: Full Feature
- Career arc visualization
- Aspiration-mapped learning paths
- Milestone celebrations tied to identity narrative, not just completions
- Peer comparison framed around trajectory ("others who became X started with Y")

---

## Fluid Social Proof Layer

Ambient awareness that others like you are on a similar path and moving forward. Not competitive. Not public rankings. Confirmatory and low-pressure.

### What It Is
- *"3 people with your role and career trajectory completed this last week"*
- *"Your peers in [industry] are prioritizing [skill area] right now"*
- Visible forward motion of similar people, not a leaderboard

### What It Is Not
- Public rankings or competitive leaderboards
- Peer-visible learning history (without consent)
- Social networking or messaging

### Privacy Requirements
- Learners control what activity is visible to peers
- All social signals are aggregate and anonymized at the individual level
- People should feel seen by peers, not surveilled by employers
- See [`07-privacy-and-trust.md`](./07-privacy-and-trust.md) for the full privacy model

---

## Manager Dashboard

Managers are **learning multipliers** — the single biggest variable in whether learning transfers to behavior change is the manager. ILS treats managers as learning architects for their teams, not just assignment administrators.

### Manager Dashboard v1 (MVP)
- **Team capability map** — visual overview of team skill gaps and development progress
- **Assignment tools** — initiate team-specific programs without L&D admin involvement
- **Completion visibility** — real-time view of required learning status across direct reports
- **Manager's own feed** — leadership development content surfaces alongside team management tools

### Manager Dashboard v2 (Growth)
- **AI-generated conversation prompts** — suggested talking points for 1:1s based on team member learning activity
- **Manager effectiveness tracking** — the system tracks managers as developers of talent as part of their own performance arc
- **Team capability trend** — month-over-month visualization of team skill growth
- **Recommended programs for the team** — AI-surfaced suggestions based on team gaps and upcoming projects

### The Manager as Learner
Managers are not exempt from the "all users are learners" principle. Their feed includes:
- Leadership development content appropriate to their level
- Communication and feedback frameworks
- Management effectiveness content triggered by their team's activity

---

## Admin Console

The L&D Admin's operational home. Built to make compliance a solved problem, not an ongoing battle.

### Core Capabilities
- **Program management** — create, assign, and schedule required learning with full control over deadlines and escalations
- **Completion tracking** — real-time compliance dashboards by department, cohort, or individual
- **Reporting** — exportable reports formatted for executive presentations and audit requirements
- **Content curation tools** — build custom learning paths from the catalog without technical expertise
- **Bulk assignment** — assign learning to groups, departments, or the entire organization in one action
- **Escalation controls** — configure automated reminders that meet the helpfulness standard (contextual, not generic)

### Compliance First
The Admin Console must make compliance tracking **easier and more reliable than any LMS the admin has used before.** This is table stakes. If admins can't trust ILS for compliance, the contract doesn't get signed.

---

## Executive Intelligence Layer

A distinct experience within the same platform that feels less like a learning app and more like a **private strategic advisor.** Designed for the time constraints and status sensitivities of C-suite users.

### What It Includes
- **Strategic briefings** — curated intelligence on AI disruption, workforce trends, and industry shifts, framed as strategic input, not training content
- **AI thought partner** — coaching conversations for ambiguous, high-stakes leadership decisions: *"Here's a decision I'm facing. Help me think through it."*
- **Peer benchmarking** — *"Here's how companies at your stage are approaching workforce transformation"*
- **Reflective prompts** — questions that develop executive thinking without feeling like coursework
- **Full HCA dashboard** — organizational capability view with benchmark comparisons and prescriptive recommendations

### Design Principles for This Surface
- Content must be ruthlessly concise and high-signal — time is the binding constraint
- Peer context matters more than best practices — executives want to know what other executives are doing
- The experience should feel like a private advisor, not a classroom
- Never use the word "course" or "training" in this layer — the language is "intelligence," "insight," "strategy"

---

## HCA Dashboard

The primary interface for executive buyers. See [`03-roi-framework.md`](./03-roi-framework.md) for the full HCA framework.

### MVP (Leading Indicators)
- Engagement depth and active learner trends
- Capability velocity by department
- Completion rates and compliance status
- Top skill gaps across the organization

### Growth (Lagging Indicators + Prescriptive)
- Retention correlation data
- Time-to-productivity tracking
- Manager effectiveness scores
- Industry benchmark comparisons (when dataset reaches sufficient scale)
- Prescriptive recommendations tied to HCA score improvement

---

## Ambient Learning Signals

The system operates in the **background of work life** through integrations with communication and productivity tools. Delivers micro-interventions without requiring the learner to open the app.

### Examples
- *"You have a performance review tomorrow. Here's a 4-minute refresher on feedback frameworks."* (triggered by calendar)
- *"Your team just kicked off a new project. Here's one thing successful project leads do in the first week."* (triggered by project tool integration)
- *"You had three difficult conversations this week. What would you do differently?"* (Friday reflection, triggered by meeting data)

### The Standard for Sending Any Signal
> Would a thoughtful mentor send this message right now?

If the answer is no, the system stays silent. Every outbound signal must be connected to real contextual data — not time-since-last-login, not generic engagement campaigns.

---

## Micro-Challenges

Small, real-world application tasks that **create a need for content** — inverting the traditional learning model.

Instead of: content → hope for application  
ILS does: challenge → gap → content

### Scope Constraint
Micro-challenges are a **content type within the feed**, not a separate product surface or mode. A challenge card appears in the feed the same way a short video does. This avoids infrastructure investment and product identity dilution while testing the format's effectiveness.

### Example Challenge Cards
- *"Before your next team meeting, try one of these three techniques for more inclusive discussions. Come back and tell us what happened."*
- *"You're working on a proposal this week. Here's a framework to pressure-test your argument before you send it."*

The challenge creates the motivation. The content provides the method. The reflection builds the habit.
