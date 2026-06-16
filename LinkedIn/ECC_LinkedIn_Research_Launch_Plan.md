# ECC LinkedIn Research Launch Plan
**Research papers → LinkedIn carousels → gated download → pilot pipeline**
*Version 1.0 | June 2026 | For founder use*

---

## What exists today (ready to use)

| Asset | Status | Location |
|---|---|---|
| Optimization research paper (gated PDF) | Live | `resources/ECC_Optimization_Research_Report.pdf` |
| RIF/CACM architecture paper (gated PDF) | Live | `resources/ECC_RIF_CACM_Research_Report.pdf` |
| Gated download gate on website | Live | `/platform/reactive-resilience/#research` |
| Formspree capture (mykawezp) | Live | Both papers wired |
| Carousel 1 — 5 Findings (LinkedIn PDF) | Ready | `LinkedIn/ECC_Carousel1_5Findings_Disruption_Response.pdf` |
| Carousel 2 — Alert to Recovery (LinkedIn PDF) | Ready | `LinkedIn/ECC_Carousel2_AlertToRecoveryPlan.pdf` |

---

## The posting sequence

**Cadence: 2 posts per month + 1 monthly newsletter roundup**

### Month 1, Post 1 — Carousel 1
**File:** `ECC_Carousel1_5Findings_Disruption_Response.pdf`
**Upload as:** Native LinkedIn document post (not a link, not an image)
**Caption (draft):**

> We spent two years studying how supply chain teams actually respond to disruptions.
>
> The finding that surprised us most: fewer than 7% of companies introduce a genuinely new countermeasure. Everyone runs the same three plays — build inventory, dual-source, regionalise — regardless of disruption type.
>
> We wanted to understand why. We studied 1,000+ documented cases. Here are 5 things the evidence shows.
>
> [carousel slides]
>
> Full research in the comments — free to download. If you've lived through a major disruption and want to share what the response actually looked like, I'd genuinely like to hear it.

**After 2–3 hours** (regardless of engagement volume): drop this in first comment:
> Full research paper: [URL to /platform/reactive-resilience/#research]

**Note on timing:** Post on Tuesday or Wednesday, 8–10am IST. These are peak engagement windows for LinkedIn in the APAC/Europe overlap that covers automotive and supply chain leaders.

---

### Month 1, Post 2 — Standalone thought leadership
**Format:** Text post, no carousel, no download CTA
**Topic:** Why GenAI alone cannot solve the disruption response problem — the three structural reasons (probabilistic output, no constraint enforcement, no objective function). All framing from published academic research, no ECC product mention.
**Purpose:** Builds credibility with technically sophisticated buyers between the two paper announcements. This audience (supply chain analytics, procurement tech) engages with structural arguments, not stats.

---

### Month 2, Post 1 — Carousel 2
**File:** `ECC_Carousel2_AlertToRecoveryPlan.pdf`
**Upload as:** Native LinkedIn document post
**Caption (draft):**

> Most platforms stop at the alert.
>
> The harder problem — what is the optimal response, right now, under real constraints — remains unsolved by detection tools, planning suites, and GenAI assistants alike.
>
> Here is how we think about the architecture of that problem.
>
> [carousel slides]
>
> Full research on the architecture in the comments.

**After 2–3 hours:** Drop link to `/platform/reactive-resilience/#research` in first comment.

---

### Month 2, Post 2 — Community ask
**Format:** Text post, no carousel
**Topic:** Genuine practitioner invitation. Not a product pitch. Ask directly: what does your team's disruption response actually look like? What's the hardest decision you've had to make during a live disruption?
**Purpose:** Market research + relationship building + surfaces warm leads who engage.
**Post-5 conditional:** If this post generates real practitioner responses (even 3–5 substantive ones), the following month's newsletter roundup synthesises them. If it doesn't, the roundup covers the research findings instead — it works either way.

---

### Newsletter (monthly, end of month)
**Format:** LinkedIn native newsletter
**Suggested name:** "ECC Supply Chain Intelligence Brief"
**Structure each issue:**
- One key finding from the research (one stat, explained in 3 sentences)
- One case angle (a real disruption and what the response looked like)
- One question for readers

**Why newsletter now:** LinkedIn newsletters push notifications to all subscribers with 40–50% open rates — the highest of any format on the platform. Starting now builds the subscriber base before you need it. Each issue can repurpose existing blog content from the Trade Risk Uncovered and Signal and the Proof series.

---

## Tactical rules

**Links in comments, not posts.** LinkedIn's 2026 algorithm penalises posts with external links by ~60% reduced reach. Post substantive content natively, wait 2–3 hours, add the link in the first comment. Always add the link eventually — even with zero engagement, the post can resurface weeks later and needs a destination.

**Document posts outperform everything.** Carousels uploaded as PDF documents achieve 6.6% average engagement rate vs 2–3% for text posts. The swipe mechanic signals engagement to the algorithm. Every research announcement should be a carousel, never a link preview.

**No engagement bait.** "Comment YES if you agree" and reaction polls are now detected and suppressed by LinkedIn's 2026 ranking system. Ask genuine questions that require a thoughtful answer.

**Commenting before broadcasting.** In the 2 weeks before the first post, spend time commenting substantively on posts from supply chain leaders, automotive procurement heads, and Gartner analysts. This builds visibility with their audiences before you're asking for attention.

---

## What not to do

- Do not mention CACM, RIF, or any internal architecture terminology in carousel posts or captions. These belong in the gated research paper, not in the teaser.
- Do not post both carousels in the same month. One month apart keeps each announcement from competing with the other.
- Do not post the partner intelligence network statistics (10M+ companies, 1.9M daily articles) — these are a partner's numbers.
- Do not put the research paper link in the post body — always in the comment.

---

## Repo structure for these assets

```
LinkedIn/
  ECC_Carousel1_5Findings_Disruption_Response.pdf   ← Post 1
  ECC_Carousel2_AlertToRecoveryPlan.pdf              ← Post 3
  captions/
    post1_carousel1_caption.md
    post2_thought_leadership.md
    post3_carousel2_caption.md
    post4_community_ask.md
```

Caption drafts to be added once the posting schedule is confirmed.

---

## Success metrics to watch (first 60 days)

| Metric | What it tells you |
|---|---|
| Carousel slide views | How deep people scroll — low = cover didn't land, high = content is working |
| First comment clicks | Direct conversion from post to gated download |
| Formspree captures | Actual leads generated |
| Comments with practitioner stories | Quality signal — these are the warm conversations |
| Newsletter subscribers | Long-term audience building |

Do not optimise for likes. Optimise for comments with substance and link clicks in the first comment.

---

*This document lives in the repo. Update it after each post with actual engagement data.*
