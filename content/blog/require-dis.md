---
title: "How I Built a Demand Mining System with Claude to Find Product Ideas"
date: "2026-07-07"
image: "/images/blog/require-dis.png"
category: "build-in-public"
tags: ["Claude Code", "demand mining", "AI tools", "indie dev", "product direction", "SaaS"]
description: "Two months of indie dev, zero products built. The problem wasn't a lack of ideas — it was my inability to evaluate them. I used Claude Code's Skill mechanism to build an automated demand mining pipeline that scans Reddit, HN, and Product Hunt, scores opportunities across 5 dimensions, and found 3 high-value directions in the first real run."
---
## The problem: two months, zero products shipped

I decided to become an indie developer. First question: what should I build?

> If you're also searching for a product direction, this post might save you those two months.

For two months, my daily routine looked like this:

1. Scrolling r/SaaS and r/startups on Reddit, hunting for complaint threads
2. Browsing Product Hunt rankings and comment sections
3. Reading 2–4 star App Store reviews
4. Following indie dev discussions on X to spot hot directions

Every time, same pattern — I'd find a need, get excited all night, then wake up the next morning and start talking myself out of it:

- "But Google Sheets can solve that too"
- "What if a big company just builds the same thing"
- "Canada only has 40 million people, the market is too small"

**Two months, zero progress.**

Later I reviewed the process and found the real problem.

---

## The real problem: not enough input to judge on

Everything I used to decide "is this worth building" came from my own head.

A head that had done full-stack development for a few years and had essentially zero market judgment.

I didn't know how many freelancers there are worldwide. I didn't know the size of the Canadian personal finance market. I didn't know how similar products had succeeded in the past.

**I was making judgments without even having the material to judge on.**

Worse, I could always disguise "I don't know" as "I don't think so." A friend mentioned seeing huge demand for cross-border payments, and my first reaction was "doesn't Stripe already do that?" — when in fact I didn't even know Stripe's exact pricing.

It's like someone who has never left their village, pointing at a world map and saying: not worth going here, not worth going there either.

---

## A different angle

If my judgment is unreliable, whose is good enough?

Investors? They look at thousands of deals a year and still have a high failure rate. Successful founders? Their experience is tightly bound to a specific time and context, nearly impossible to copy.

Then it hit me: **large models like GPT-4 and Claude have read orders of magnitude more business cases, market reports, and user feedback than I have.**

Claude's training data likely includes public analyses of every YC-backed company, widely cited market research reports, and countless Reddit and HN product discussions. Its "breadth of knowledge" exceeds any single human expert.

So why not let it make the calls?

---

## What I built

Using Claude Code's Skill mechanism, I built a pipeline called `demand-mining`. It's not a standalone app — it's a Markdown process definition file, roughly 200 lines, describing the full logic from signal collection to opportunity ranking.

Claude Code Skill files live at `.claude/skills/<name>/SKILL.md` in a project; invoking `/demand-mining` runs it.

The full pipeline has 6 phases:

### Phase 1: Pick a direction

Input a domain (e.g. "financial tools websites"), or input nothing and let the system auto-scan current hot discussions from sources like Reddit, HN, and Product Hunt.

### Phase 2: Multi-source signal collection

Call the WebSearch and WebFetch tools to pull raw data from:

- **Reddit**: complaint threads in r/SaaS, r/startups, r/selfhosted, r/productivity
- **Hacker News**: Ask HN and Show HN threads about pain points
- **App stores**: 2–4 star reviews (most likely to contain specific, rational pain descriptions)
- **Product Hunt**: negative comments and improvement suggestions on highly upvoted products
- **X / Twitter**: search for "I wish there was..." style expressions

Every raw signal must record its source URL, key quotes (verbatim), and signal type.

### Phase 3: Extract demand signals

Pull structured info out of the complaints: who is in pain? How bad is it? How do they solve it today? Have they expressed willingness to pay?

Key rule: **only keep pain points with concrete scenarios.** Vague comments like "this software sucks" get discarded.

### Phase 4: Five-dimension scoring (the core)

This is the most important step in the whole system. Each demand signal is scored on 5 dimensions (1–10), and **every score must come with concrete evidence**.

| Dimension | Weight | What it measures |
|------|------|------|
| Pain intensity | 25% | Emotional strength of user language, daily impact, expressed willingness to pay |
| Market size | 25% | Global population estimate of affected users (relies on model knowledge; estimation logic must be shown) |
| Competitive landscape | 20% | Number and quality of competitors, their user ratings — must name specific competitors with data |
| Technical feasibility | 15% | Stack difficulty, resources needed, existing open-source references |
| Monetization clarity | 15% | Comparable competitor pricing, payment willingness, whether it's a must-pay expense |

Total score = weighted sum.

**The most important constraint: scoring is done entirely by the model from its own knowledge — asking the user for opinions is forbidden.** This keeps my own cognitive bias out of the scoring.

### Phase 5: Filter and rank

Anything below 4.5 is eliminated outright. Essentially identical needs are merged. The rest are sorted descending into three tiers:

- 🔥 High priority (≥ 7.5)
- ✅ Worth watching (6.0–7.4)
- ⚠️ On radar (4.5–5.9)

### Phase 6: Deep analysis

For the top 3 demands, dig into:

1. Why has this need gone unsolved? (Technical barrier? Market too small? Low payment willingness?)
2. Are there historical success cases similar to this?
3. What should the MVP look like? What's the core assumption to validate?
4. Risk list: technical, market, competitive, platform risks
5. The model's own confidence in its judgment (high/medium/low) and why

---

## First real run: the "financial tools" direction

I had the system analyze the "financial tools websites" direction.

It searched about 15 keyword combinations, extracted 8 demand signals from 20+ sources including Reddit, HN, Product Hunt, Trustpilot, and app store reviews, then scored and ranked each one.

**The top 3:**

**#1 Real-time tax estimation for freelancers — 7.50**

The US has 64 million freelancers (Upwork 2024 data), all estimating quarterly taxes and setting money aside. Underestimate and you face IRS penalties (8% underpayment rate in 2025); overestimate and you tie up cash flow. QuickBooks Self-Employed used to be the only purpose-built tool, but Intuit shut it down in 2024, leaving hundreds of thousands of paying users stranded.

**#2 All-in-one finance tool for freelancers — 7.15**

Invoicing, bookkeeping, tax estimation, client management — freelancers currently stitch together 3–5 tools with no data flowing between them. QuickBooks is bloated and expensive ($30+/month), Wave's free tier keeps shrinking, FreshBooks has trust issues.

**#3 Personal finance tools for non-US markets — 7.10**

Monarch Money was rated 2.3 by Canadian users on Trustpilot — "completely useless in Canada." Mainstream personal finance apps almost universally support only US banks; users in Canada, the UK, Australia, and Singapore are systematically ignored.

---

Before this system, I would not have seriously considered any of these three directions.

"Tax estimation? Too boring." "Non-US markets? I don't know them." — that was my instinct at work. The actual data says these are precisely the directions with the strongest demand, the least competition, and the largest markets.

**My instinct was wrong on every high-scoring opportunity.**

---

## Key design decisions

### 1. "No asking the user" is the precondition for the system working

If users could intervene during scoring — "I like this one, bump the score up" — cognitive bias re-enters the system. An "AI financial assistant" scoring 9 on technical feasibility sounds cool, but its market size is a 5 and monetization a 4. If I were allowed to adjust scores, it would jump to #1.

### 2. "Evidence required" matters more than the score itself

In early versions my instruction was just "please score this," and the model would hand out 7s and 8s with no reasoning. After changing it to "every score must state its evidence: data sources, estimation logic, reasoning," both the quality and the verifiability of the scores improved dramatically. A 7 because "there are X million practitioners worldwide" versus a 7 because "the market feels big" — night and day.

### 3. Weighted vs equal weights

I ran a comparison with equal weights. The result: "cool-sounding AI directions" shot to #1 on novelty points, despite big uncertainty in market size and monetization. Weighting pushes "pain + market" to 50%, letting "certain but boring" demands rise to the top. For an indie developer, certainty beats novelty.

### 4. Source diversity determines report quality

Version one used Reddit only. The output skewed heavily toward a technical audience — all "dev tools" and "productivity tools," ignoring regular users' needs. Expanding to app store reviews and Trustpilot complaints clearly improved signal diversity. Tailoring sources to your target users beats blindly adding more of them.

---

## The limits of this system

In fairness.

**1. Model knowledge goes stale.** Claude's training cutoff means it may not know the latest market changes (a competitor's fresh funding round, a product that just launched). Reports need verification against live search.

**2. Scoring has a recency/tech bias.** After several runs, the model tends to score technically sophisticated directions higher. This likely reflects training data bias, since Reddit and HN discussions skew technical. To a large model, "tax software" is inherently less sexy than "AI tools."

**3. Market-size numbers may be wrong.** The figures the model cites come from training corpora — some outdated, some misestimated, some contradictory. Treat the numbers in the evidence as "initial estimates," not facts.

**4. This is not a replacement for real user research.** The report gives direction-level judgment. At the execution level you still need to talk to target users, run landing page tests, and ship MVP experiments. This system replaces "which direction should I pick," not "how do I build a good product."

---

## Update 2026-07-07

The Skill is still iterating. The current version has had one real run (financial tools direction), producing a full analysis report. Next steps:

- Add domain customization (scoring logic should differ for B2B SaaS vs consumer apps)
- Introduce a "trend dimension" (are AI-related demands growing fast?)
- Calibrate the model's scoring scale as more cases accumulate

---

## On being right or wrong

After writing this, one clarification:

I'm not saying "this system found the right answers." The scoring may be biased, and model knowledge may be outdated.

What I am saying: **before this pipeline, my judgments came from unreliable instinct. After it, they come from structured, traceable, correctable data analysis.**

Even when the analysis is wrong, I can look back, find which dimension's score was off, and fix it. When an instinctive judgment is wrong, you don't even know *what* was wrong.

**A correctable error is worth more than a stubborn certainty.**

---

> **Related reading**: [How I Built My Personal Site in Half a Day with Claude Code + Next.js + Cloudflare Pages](/blog/xiaoniubuniu-site-build) — this demand mining system was built on the same Claude Code Skill mechanism. Same tool, completely different use.

*If you're also hunting for a product direction, or have better ideas for the scoring dimensions, join the discussion on the project's [GitHub](https://github.com/xiaoyunchengzhu/require-dis).*

---

*This article was drafted with Claude Code assistance based on my first-hand experience building the demand mining Skill. All screenshots, methodology, and analysis are from my own work.*
