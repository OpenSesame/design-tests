# 03 — ROI Framework & Human Capital Intelligence

---

## The ROI Conundrum

The traditional ROI problem in L&D is **attribution and lag**. Training happens. Outcomes happen months later. Connecting the two is nearly impossible. Unlike Sales (revenue) or Engineering (shipped product), L&D sits upstream of every outcome but gets credited for none of them.

The industry's existing tools — Kirkpatrick's 4 levels, post-training surveys, completion rates — all fail at the same point: Level 4 (business results) almost never gets measured in practice.

ILS does not try to fix this with better attribution models. It **reframes the question entirely.**

---

## The Reframe: Capability Velocity

> Instead of asking *"what did training cost vs. earn?"*, ILS measures **how fast the organization builds capability from gap to excellent** — and attaches that velocity to business outcomes.

This changes the conversation from training ROI (a cost center question) to **organizational readiness** (a strategic question that CEOs and boards already care about).

---

## The Human Capital Asset (HCA) Framework

The HCA Framework is a first-class product feature and the primary interface for executive buyers. It presents organizational capability as a **financial asset** — like a balance sheet for human capital.

- **Skills** are valued assets
- **Gaps** are liabilities
- **Development investment** appears as asset appreciation

A CHRO can walk into a board meeting and say *"our human capital assets grew 18% this quarter"* with the same confidence a CFO discusses equipment depreciation.

### HCA Framework Components

| Component | Description |
|---|---|
| **HCA Score** | Proprietary metric representing overall organizational capability health |
| **Capability Velocity** | Rate at which the organization moves from skill gap to demonstrated competency |
| **Industry Benchmark** | "Your HCA grew 18% — 5% above average for your industry and company size" |
| **Readiness Tier** | Bronze / Silver / Gold / Platinum — capability posture framed like cybersecurity readiness |
| **Prescriptive Actions** | "Your current HCA is below market. Initiate these programs to increase your score by 5%" |

### The Readiness Tier Model

Borrowing the urgency language of cybersecurity posture (which boards already respond to):

- **Bronze** — foundational compliance coverage, minimal voluntary engagement
- **Silver** — active learning culture, measurable capability growth
- **Gold** — capability velocity above industry benchmark, strong internal mobility
- **Platinum** — recognized workforce transformation leader, proprietary benchmark data contributor

The tier framing serves dual purposes: it motivates organizational progress and it creates a natural product expansion path (achieving higher tiers requires using more of the platform).

---

## Dual ROI Layers

Sophisticated buyers trust the system more when it is **transparent about the difference** between early signals and proven outcomes. ILS surfaces both layers clearly and labels them explicitly.

Trying to claim full business impact in 30 days destroys credibility. Acknowledging the distinction builds it.

| Layer | Indicators | Timeline |
|---|---|---|
| **Leading Indicators** | Engagement depth, knowledge retention scores, behavior self-reporting, manager observations, feed interaction patterns | Visible in weeks |
| **Lagging Indicators** | Retention delta, time-to-productivity acceleration, internal mobility rate, manager effectiveness correlation, performance lift | Visible in months (6–18) |

---

## Concrete ROI Mechanisms

### 1. Time-to-Productivity Tracking
The most defensible ROI metric available. When a new hire or internal transfer reaches full productivity 3 weeks faster, that's a calculable dollar amount based on their salary. The system tracks performance milestones against a role baseline and surfaces the delta.

### 2. Skill Gap → Business Risk Mapping
Rather than reporting "employees completed 40 hours of training," the system surfaces:
> *"Your sales team has a critical gap in enterprise negotiation. Based on your current pipeline, this represents approximately $2.3M in at-risk revenue."*

Training spend becomes **risk mitigation**, not a cost center.

### 3. Internal Mobility Rate
Track and value the ratio of internal vs. external hires. Attach average cost-per-hire data. Surface the savings from talent development. CHROs understand this number intimately — average cost to replace an employee is 50–200% of annual salary.

### 4. Manager Effectiveness Correlation
Train managers, then track their teams' performance metrics — retention, engagement scores, output. Build a statistical correlation layer using internal organizational data showing that managers who completed certain development paths have measurably better team outcomes. This is particularly powerful because it's **internal data**, not industry benchmarks.

### 5. Retention Lift Attribution
Show that employees who engage with development programs have meaningfully lower attrition rates within the same organization. The dollar math is straightforward once the data exists.

### 6. Bidirectional Integration Value
ILS sends AI-assessed skills data back to performance tools (Lattice, Culture Amp), making the platform a **source of truth** for the broader HR tech stack. Most tools consume data. ILS generates novel assessed data that other systems want. This is a meaningful moat.

---

## The Benchmark Dataset

Industry benchmarking — *"Your HCA is 5% above your peer group"* — is a future-state feature dependent on sufficient customer volume for statistical significance.

**However:** The data architecture and pipeline must be designed from day one to support this. Anonymized aggregate data collection should be built into the MVP infrastructure, even before the dataset is large enough to be meaningful.

The benchmark dataset becomes a compounding asset: more customers → better benchmarks → more valuable product → more customers.

---

## Design Requirement: External Data Connections

For any of this ROI framework to work, the system needs to connect to performance data outside itself. The ROI dashboard is not a standalone feature — it only works if ILS has data tentacles into the organization's existing stack.

See [`09-integrations.md`](./09-integrations.md) for the full integration strategy.
