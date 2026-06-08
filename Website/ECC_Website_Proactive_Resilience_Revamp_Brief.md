# ECC Website Revamp — Thread Handoff Brief
**Paste this as the first message in the new website revamp thread.**
**Reactive resilience content:** to be provided by user in this thread before reactive page work begins.

---

## RULES FOR THIS THREAD — READ BEFORE STARTING ANYTHING

1. **Do not write any reactive resilience content under any circumstances until the user explicitly provides the details in this thread.** No placeholders, no assumptions.

2. **When you reach Step 1 Section 7 (real graph findings), stop and ask the user for confirmed numbers from the live graph or VS Code Copilot before writing that section.** Do not generate plausible-sounding statistics. Every number on the website must be confirmed from the actual dataset.

3. **When you reach Step 3 (architecture diagram web adaptation), stop and ask the user for the JS and CSS source files for the v3 layered architecture diagram.** Do not attempt to rebuild the diagram from description.

4. **When you reach Step 5 (Depth Demo animation), stop and ask the user to confirm the node data from VS Code Copilot before building.** Partial data is available in Section 12 of this brief but must be verified and extended before use.

5. **Never generate numbers, statistics, or specific claims about the platform without a source.** If a number is not in this brief or confirmed by the user in this thread, ask for it.

6. **The website is on Wix.** Blog content is pasted as rich text. Interactive components are embedded as HTML widgets. Static visuals are PNG screenshots uploaded to Wix media library. Design and build accordingly — every deliverable must be compatible with Wix's constraints.

---

## 1. Company Context

**EcocomityChain.AI (ECC)** builds the **PMG (Product Material Genealogy)** platform — a supply chain risk intelligence platform on Neo4j.

**Core proposition:** ECC surfaces material-level supply chain risks that exist below the depth of every existing risk tool — risks only visible when you trace a bill of materials not to T1 or T2 but to the raw material source at T6, T7, or T8.

**Live dataset:** 170,000+ nodes, 540+ suppliers, 8 BOM levels (L1 Assembly → L8 Raw Ore), modelled on a representative European BEV bill of materials.

**Status:** Pre-first-customer. Platform built and running with real data. No case studies yet.

**Platform has two segments:**
1. **Proactive Resilience** — fully specified, content-ready. This brief covers it.
2. **Reactive Resilience** — equally substantial. User will provide full details in this thread.

---

## 2. Proactive Resilience — What It Is

Four intelligence layers built on the same 8-level material graph:

| Layer | Status | What it does |
|---|---|---|
| Proactive Supply Chain Resilience BASE | Live | 8-level material genealogy, dual-node scoring (supplier + material nodes simultaneously), 4-vector risk model (Manufacturing · Financial · Operational · Geopolitical), TTR computed from material graph, XAI audit trail |
| Trade & Tariff Resilience | Live | Tariff exposure scoring across material paths, state-machine compliance workflow, agentic tariff enrichment |
| Regulatory Compliance Resilience | Live | DPP/Battery Regulation acceleration, EU regulatory alignment |
| DPP & Sustainability | Roadmap | Material-level carbon and sustainability scoring |

**Prescriptive Intelligence spine** runs across all layers — the AI agent layer that converts scores into recommended actions.

**Key differentiators — state these as facts, never as claims or superlatives:**
- 8-level material genealogy — competitors stop at T2 or T3
- Dual-node scoring: BOTH supplier nodes AND material nodes scored simultaneously
- TTR computed from the material graph, not declared by the supplier
- XAI audit trail: 100% of scores carry a structured reasoning chain usable for regulatory audit
- Composable layers: each intelligence layer deployable independently

---

## 3. Reactive Resilience — Placeholder

User to provide full content in this thread. What is known:
- Nvidia NIM 8B orchestrator deployed in reactive resilience
- Agentic copilot system for supply chain response workflows
- State machine guardrails for autonomous workflow compliance
- Connects to proactive intelligence: proactive alerts trigger reactive response workflows
- The combination (proactive + reactive) is the holistic differentiator

**Do not write any reactive resilience content until user provides details. See Rule 1 above.**

---

## 4. Recommended Website Structure

```
/platform                           ← Parent overview page (thin, written last)
  /platform/proactive-resilience    ← Deep page (build first)
  /platform/reactive-resilience     ← Deep page (build when content provided)
```

**Parent /platform page:** One headline, two or three sentences on why proactive + reactive together matters, two routing cards (one per segment), one CTA. Under 150 words of copy. Written last — it summarises what the subpages contain.

---

## 5. Build Priority Order

Follow this sequence strictly. Each step depends on the one before it.

**Step 1 — Page copy for /platform/proactive-resilience**
Write all section copy before any design or visual work begins. Sections in order:

1. Hero headline + one-paragraph platform summary
2. "What makes this different" — 4 specific differentiators, under 120 words, no superlatives
3. "What the graph shows" — real findings from the live 170K-node dataset
   ⚠️ **Stop here and ask the user for confirmed numbers before writing this section.**
4. "Your stack stays intact" — SAP/ERP integration model (see Section 8)
5. "How we deploy" — deployment model and data sovereignty (see Section 9)
6. "How a pilot works" — 3-phase timeline description (feeds into visual in Step 5)
7. Gated download CTA — Platform Technical Brief
8. FAQ section (see Section 10)
9. Contact CTA

**Step 2 — Platform Technical Brief (highest-priority artifact)**
6-8 page PDF. Gated behind email capture on the website.
Content: what the platform does, graph architecture concept, four scoring layers, agent intelligence layer, integration model, deployment model, security approach.
IP rules apply throughout (see Section 11).
Write alongside or immediately after page copy — they cover much of the same ground.

**Step 3 — Architecture diagram web adaptation**
Source: v3 layered architecture diagram (JS and CSS files).
⚠️ **Stop here and ask the user for the source files before starting this step.**
Adaptation only — not a rebuild. Changes needed:
- Responsive layout (desktop + mobile)
- Layer descriptions visible without hover or interaction
- Optional: click-to-expand for layer detail
Low token cost. One focused session.

**Step 4 — Parent /platform page copy and layout**
Written once both subpage structures are confirmed.

**Step 5 — Depth Demo animation**
One HTML/React component serving two purposes:
- Auto-plays on page load as a 20-second scripted animation (passive mode)
- Visitor can pause and explore nodes interactively (active mode)
Scripted sequence: starts at L1 vehicle assembly, drills to L8 raw ore, risk signal appears at L6-L7 — invisible to T1-focused tools.
⚠️ **Stop here and ask the user to confirm full node data from VS Code Copilot before building.** Partial data is in Section 12 but must be verified and extended.
Does not need Claude Design. Built as HTML/React component, Wix-embeddable.

**Step 6 — "The Question Your Tool Cannot Answer" one-pager (PDF)**
One page. One question: "Can your current system tell you the TTR of a Tier 1 supplier's Tier 6 material source?" Brief explanation of why this matters. No product pitch. Designed to be forwarded internally. Quick to build, slots between other tasks.

**Deferred — do not build in this thread:**
- Self-assessment / Well-Architected-style scoring tool: needs both proactive and reactive segments complete. Must include reactive resilience criteria.
- Engineering credibility section: housed in a separate `/blog` or `/engineering` page, routed from main navigation, not on the platform page.

---

## 6. Critical Messaging — Must Appear as Visible Page Sections, Not in FAQ

**Integration message:**
"ECC integrates with SAP and other SCM systems through published APIs or SAP's own agentic connectors. Your existing systems — ERP, procurement workflows, supplier portals — remain unchanged. ECC reads the data it needs, on a need-to-know basis, through a defined and auditable integration layer."

**Deployment and data sovereignty message:**
"ECC deploys into your own Azure subscription and your own Neo4j instance. We provision and configure — you own the infrastructure. Your supply chain data never leaves your environment. ECC does not store, process, or access your data on shared cloud infrastructure."

---

## 7. Tone and Voice Rules

- Engineering-led. Not a marketing brochure.
- No superlatives. No: "best," "most advanced," "only platform that," "revolutionary," "game-changing."
- No AI hype language.
- Specific numbers where available and confirmed. Vague claims where not confirmed yet.
- Short sentences. Direct statements.
- The platform's capabilities speak for themselves. Do not over-explain.

---

## 8. SAP and Stack Integration — Precise Framing

- ECC integrates through SAP's published APIs or SAP's own agentic system
- Read-only, need-to-know basis
- No requirement to change underlying stack
- No raw data extraction — API-native, SAP-ecosystem compatible
- Customer's existing procurement workflows, data models, and supplier relationships are untouched

---

## 9. Deployment Model and Security — Precise Framing

**Deployment:**
- ECC creates Azure and Neo4j instances in the customer's own Azure subscription
- Customer owns the infrastructure
- ECC provisions and configures, does not host
- Customer data never moves to ECC's infrastructure

**Security positioning:**
- No security certifications yet — do not claim any
- The user has a Microsoft-certified Cybersecurity and Solutions Architect background
- Security architecture, threat model, network isolation design, data access controls, and testing documentation can be authored to enterprise standard and are available on request
- Website statement: "Built to enterprise security standards. Security architecture, threat model documentation, and testing results available on request."

---

## 10. FAQ Section — Confirmed Entries

| Question | Answer summary |
|---|---|
| Does ECC replace my existing SCM system? | No. SAP, ERP, and supplier portals stay as they are. ECC integrates through published APIs, reads what it needs, nothing more. |
| Where does my supply chain data live? | In your own Azure subscription and your own Neo4j instance. ECC never stores your data on our infrastructure. |
| Do you have security certifications? | Not yet. We provide security architecture, threat model documentation, and testing results on request. Our deployment model — customer-owned infrastructure — is the primary data security mechanism. |
| How does a pilot work? | Three phases over 4-6 weeks: data connection (1-2 weeks), graph build and scoring (2-3 weeks), validated output review (1 week). Scoped to one plant and one vehicle line. |
| What data do you need from us? | BOM data, supplier master data, and relevant procurement data. Read-only access. Scoped to the pilot plant and vehicle line. |
| Are you SaaS? | No. We deploy into your infrastructure. Your data never moves to a shared cloud environment. |
| What happens after the pilot? | The pilot produces a validated risk intelligence output. We then discuss whether and how to extend coverage. No automatic commitments. |
| Will you need access to our internal systems? | Through defined APIs only. No direct database access, no raw data extraction, no persistent connection beyond what the integration requires. |

---

## 11. IP Boundary Rules

**Safe to describe:**
- Outputs and concepts
- Architecture at moderate level (layer names, engine names, pattern names)
- Production metrics (170K+ nodes, 8 BOM levels, <100ms read latency, ~45s batch)
- Named public data sources (USGS, DOE, Argonne GREET, NREL USLCI, Panjiva)
- XAI audit trail concept and dual-consumer architecture
- State machine compliance workflow concept
- Deployment model (Azure + Neo4j in customer account)

**Never describe:**
- Scoring weights or weight calculation methodology
- Graph schema internals (node types, relationship types, property names)
- Agent logic or tool-calling sequences
- Classification trigger conditions
- Internal guardrail numbering — write "write fence" not "Guardrail G8"
- Manufacturing process initialisation logic
- Copilot subsystem code

---

## 12. EPS Sub-Graph Data for Depth Demo Animation (Partial — Verify Before Use)

⚠️ These numbers are from the live Neo4j graph queried in the content session. Verify with VS Code Copilot before using in the animation.

NdFeB path (L1→L8):
- L1: Electric Power Steering (Column-Mount BLDC, 48V) — T1: JTEKT, ZF Friedrichshafen, Marelli
- L2: BLDC Assist Motor (48V, 1.5 kW Peak)
- L3: Rotor Magnets (Neodymium Iron Boron)
- L4: NdFeB — mfg_complexity=4, single_source=true, TTR=240d
- L5: Sintered NdFeB block (N52) — mfg_complexity=5 (MAX in EPS graph), tooling=true, TTR=365d
- L6: Neodymium (Nd) metal — tooling=true, single_source=true, TTR=365d, Supplier: Baotou Steel Rare Earth (China)
- L7: NdPrOx (mixed rare earth oxide)
- L8: Bastnäsite ore (REO-bearing mineral)
- T1 declared TTR: 8-12 weeks. PMG computed: 52+ weeks

---

## 13. Design Constraints

- **Theme:** Dark throughout. Background #07090f. Consistent with all existing marketing assets.
- **Typography:** Space Grotesk (headings + body), Space Mono (code/technical labels). Google Fonts.
- **Platform:** Wix. All interactive components must be Wix-embeddable HTML widgets. All static visuals must be PNG files for Wix media library upload. No external JavaScript frameworks that Wix cannot embed.
- **Tone:** Engineering-led. See Section 7.

---

## 14. Existing Assets Available in /mnt/user-data/outputs/

| Asset | File | Use |
|---|---|---|
| Slide 2 — differentiators | PMG_Companion_Slide2.html | Reference for "What makes this different" copy |
| EPS TTR dual-path diagram | EPS_TTR_DualPath_Visual1.html | Data reference for Depth Demo |
| Ford-MIT blog | Blog_TTR_FordMIT_Article.md | Blog section reference |
| Five Disruptions blog | Blog_FiveDisruptions.md | Blog section reference |

**Note:** The v3 layered architecture diagram source files (JS + CSS) are held by the user and will be provided when Step 3 is reached.

*End of website revamp brief.*
