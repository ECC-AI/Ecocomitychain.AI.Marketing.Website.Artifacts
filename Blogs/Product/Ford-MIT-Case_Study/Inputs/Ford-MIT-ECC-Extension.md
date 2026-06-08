---

**Quick summary of the four points with their code evidence:**

1. **BASF / chemical manufacturing complexity** — `manufacturing_complexity_index > 4` threshold in derived_properties_engine.py triggers Vector A. The BASF→Lanxess→Continental inheritance path with the "proprietary PA66 GF30 compounding" rationale is in the explainability data structure in the Phase 2 spec.

2. **Magnets / rare earth export restrictions** — `base_ttr_weeks = 26` for L8 nodes, `critical_mineral_dependency`, `concentration_country = CN`, Vector D signal. The cross-assembly NdFeB flagging (EDU Front, Rear, HVAC, EPS) is a design decision explicitly documented in VULNERABILITY_INJECTION_PATTERN.md.

3. **Low-spend / high-impact (Q4 suppliers)** — Phase 5 supplier-scoped TTR traversal in derived_properties_engine.py has a 30-line comment block explaining exactly why assembly-level TTR collapses Q4 and why per-path traversal surfaces it. The T1-A ($45M) vs T1-B ($2M) cooling plate example is verbatim in the code.

4. **The differentiator claim** — Two clean dimensions: TTR is **material-chemistry-aware** (process physics on material nodes) + TTR inheritance is **path-specific** (per supplier's own BOM path, not assembly aggregate). Neither requires claiming originality over Ford-MIT's framework — only over the inputs it can consume.

Good — I have the full picture now. Here is the supplementary addition to the briefing, covering the two missing points:

---

## Supplementary Addition to PMG TTR-PI Briefing

---

### 5. Proprietary Tooling + Single-Sourcing — The Physical Lock-in Multiplier

This is distinct from BASF's chemical complexity case and deserves its own entry. The BASF example is about *process physics* — the chemistry itself cannot be replicated quickly. The tooling case is about *physical manufacturing assets* — the tooling dies, press moulds, or extrusion equipment that produce a specific component to OEM tolerances are owned by a single supplier, often custom-fabricated for that OEM's specification.

**What PMG carries on each node:**

Every supplier node in the graph carries two co-dependent properties that together create the strongest Vector A trigger in the system:

- `tooling_required: true` — the component cannot be sourced from an alternative supplier without re-cutting new tooling from scratch
- `single_source_likelihood: 0.85` (or higher) — only one qualified supplier in the world currently produces this component to spec

The Vector A trigger condition in design_docs/MULTI_VECTOR_RISK_PHYSICS.md requires **both simultaneously**:

```
Trigger: single_source_likelihood = true AND (tooling_required = true OR mfg_complexity_index > 4)
```

This is deliberate. Either condition alone is manageable. `single_source_likelihood = 0.85` with commodity tooling (stamped steel bracket) means you can re-source in 6–8 weeks. `tooling_required = true` with multiple qualified suppliers means you can dual-qualify quickly. But *both together* is the physical lock-in scenario: there is one supplier, they hold your tooling, and re-cutting takes 10–20 weeks minimum before a new supplier can even begin qualification trials. That is the TTR the system assigns: `base_ttr = tooling_recut_time if tooling_required else lead_time_weeks` — as explicitly defined in the Phase 2 specification.

**The Land Rover / UPF 2001 precedent** is modelled directly in the system. UPF Thompson (chassis frames supplier) went bankrupt. Land Rover's tooling for the Discovery chassis was held at UPF's plant. Land Rover paid £15–20M to recover that tooling and keep the line running — this cost is captured in the Vector B formula as `Bailout_Cost_Estimation`. But the *reason* it cost so much is that tooling for a chassis frame cannot be moved overnight; the TTR was the tooling-asset recovery time, not just a supplier substitution timeline.

**Why this is invisible to Ford-MIT:** The Ford-MIT methodology classifies a supplier by observable parameters — geography, tier depth, single-source status (at T1), financials. It cannot see that the T2 supplier of a body panel uses a 12-tonne progressive die press that was custom-built for this OEM's panel geometry at a cost of €2.3M and lives in a single factory in Saarland. PMG carries `tooling_required: true` and `single_source_likelihood: 0.85` on that specific L3 Component node, propagates a 14-week `base_ttr` from there, and that TTR inherits up to the T1 supplier — making the T1's scatter-plot position reflect a physical reality that is invisible if you only look at T1 parameters.

In the demo data, this pattern appears directly — components like the Valve Solenoid (Electromagnetic) at L3 carry `tooling_required: true` and `single_source_likelihood: 0.85`, which together trigger Type A diamond detection and elevate the TTR of the T1 suppliers mapping through that node.

---

### 6. The Ford-MIT Methodology's Scope — and Why Sub-Tier Extension Makes It More Robust

**What the Ford-MIT study actually measured:**

The Simchi-Levi et al. paper studied Ford's supply base of approximately 4,000 Tier-1 suppliers. The TTR and PI scores were calculated using parameters *observed at the T1 level and at the direct interface between T1 and Ford*: annual spend with Ford, T1 capacity, T1 single-source status, T1 time-to-survive. Sub-tier information was not available at the time of the original study. The paper's central finding — the Q4 hidden-risk cluster of low-spend, high-PI suppliers — was derived entirely from T1-observable data.

This is important to understand because it means the Ford-MIT methodology, as originally designed, has a **structural ceiling**. It can identify *which T1 supplier is risky*, but it cannot explain *why* that T1 supplier is risky from a sub-tier perspective, nor can it detect disruptions that originate below T1 before they surface at T1.

**Three specific ways sub-tier extension strengthens the methodology:**

**6a. TTR becomes causally grounded, not estimated.**

In the original methodology, TTR for a T1 supplier is estimated from observable proxies: "single-source + tooling = 12 weeks." This is a heuristic. PMG replaces the heuristic with a graph traversal that finds the actual deep-tier node driving the TTR. If a T1's TTR is 20 weeks, the system shows *which* L7 precursor node or L8 raw material node is the root cause — and the 20-week estimate is grounded in that node's material properties (`estimated_ttr_days` or level-based default), not in a blanket category assumption.

**6b. Disruptions that originate below T1 are detected before they reach T1.**

The Ford-MIT approach waits for a disruption to manifest at a T1 supplier before it can be scored. A factory fire at a T3 resin compounder does not appear in T1-level data until the T1 starts issuing allocation warnings — which can be weeks after the event. PMG's graph covers T2–T8 suppliers via `SUPPLIES_TO` edges (from Semantic Visions network intelligence). A disruption alert at a T3 node can be immediately propagated forward through the graph to identify which T1 suppliers are in the blast radius and what their PI exposure is — before any T1 has reported a problem. This is the advance-warning use case that T1-only approaches structurally cannot provide.

**6c. The Q4 hidden-risk cluster becomes more populated and more accurate.**

In the Ford-MIT study, Q4 suppliers are identified because they have low T1 spend but high T1 PI. PMG's supplier-scoped TTR traversal means that a T1 supplier's PI reflects the deepest-tier signal in *their specific supply path* — not the assembly-wide worst case. This creates a more granular and differentiated scatter plot: T1 suppliers that source commodity components (low TTR at every depth) correctly land in Q2/Q3, while T1 suppliers whose path passes through a tooling-constrained or single-source sub-tier node land in Q4. The Q4 population is more precisely defined because the TTR attribution is path-specific, not assembly-average.

**The honest framing for the blog:**

> "The Ford-MIT methodology was designed for T1 supplier analysis and validated against a population of ~4,000 T1 suppliers at Ford. It demonstrates that PI is a better predictor of business risk than spend alone, and that the Q4 cluster (low-spend, high-PI) is where hidden supply chain risk concentrates.
>
> PMG extends this framework down to T8 by grounding TTR in the material genealogy graph rather than in T1-observable heuristics. This extension does three things the original methodology cannot: it explains *why* a T1's TTR is what it is (tracing it to a specific sub-tier material node), it detects disruptions that originate below T1 before they surface at T1, and it produces a more accurate Q4 cluster because each T1's PI reflects their own supply path depth, not an assembly-wide average."

That is a clean, defensible, and additive claim — it respects the original methodology's contribution while precisely identifying what the material-graph extension adds.