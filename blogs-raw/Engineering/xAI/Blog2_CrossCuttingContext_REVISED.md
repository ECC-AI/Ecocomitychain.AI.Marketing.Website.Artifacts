# Cross-Cutting Context Objects: Threading Structured Evidence Through a Multi-Engine Pipeline

*By [Author Name], Engineering @ EcocomityChain*

---

## The Hard Way

During a validation session for our tariff compliance layer, a team member asked us to walk through why a Tier 7 rare earth ore supplier had been rated at higher risk than a Tier 1 assembly partner with three times the annual procurement spend. We had the score. We had the risk bucket. We had the label for the dominant vector. What we did not have was a structured answer to *why* Vector B outweighed Vector D for that specific supplier at that specific assessment cycle.

The reasoning had existed in engine memory for approximately 40 milliseconds. Then it was gone.

We had logs. We had the final numbers. What we didn't have was the causal chain — which upstream engine set the preconditions that downstream engines consumed, what weight each signal received at the moment of computation, and why the threshold comparison that tipped the score went the way it did. We had built three independent scoring engines, got the numbers right, and shipped. We had planned to add explainability afterwards.

This is the first mistake. By the time you try to explain a score after the fact, the reasoning context is gone.

The key insight that reframed our architecture: **explainability is infrastructure, not a feature.** It cannot be added after the scoring pipeline is built, because the reasoning context that needs to be captured only exists during computation — live in engine memory, discarded when the engine returns a number. The moment the engine exits, that context is unrecoverable. Logs are not a substitute. Post-hoc LLM summarisation is not a substitute. Reconstruction is not the same as capture.

This post describes the pattern we built instead: a cross-cutting context object that accumulates structured evidence across N independent engines, without coupling them, and serves that evidence to three fundamentally different consumers.

Our risk analytics platform scores ~170,000 nodes across an 8-level bill-of-materials graph. The scoring pipeline consists of multiple independent engines: a `DerivedPropertiesEngine` that detects pre-conditions (geographic concentration, structural single-points-of-failure, financial distress signals), a `TTRPICalculator` that computes time-to-recover and performance impact, a `RiskSeverityEngine` that produces a weighted multi-vector score, and — more recently — agentic tariff compliance workflows. Each engine has its own domain logic, its own data sources, its own computation model. No engine knows about the others.

The question this post addresses: **how do you design a first-class data object that accumulates structured evidence across N independent engines, without coupling them to each other, and then serve that evidence to three fundamentally different consumers?**

---

## The Alternatives We Rejected

### Option 1: Logging

Every engine already logs. We could parse log files to reconstruct explanations.

The problem isn't volume — it's structure. A log line says `"geo_concentration=0.87 exceeds threshold 0.80"`. But it doesn't say whether that **increased** or **decreased** the risk score, what **weight** it carried, or which **engine** produced it relative to the others in the pipeline. Logs are append-only text streams with no semantic meaning. You cannot build a UI from them. You cannot feed them to a copilot for question-answering. You cannot present them to a regulator as an audit trail.

### Option 2: Per-Engine Explanation Endpoints

Each engine exposes a `/explain` route. The caller stitches N separate explanations together.

This creates two problems. First, Engine 3's explanation depends on Engine 2's output — explaining why Vector B was weighted at 40% requires knowing that the diamond pattern was already detected upstream. The caller becomes an explanation orchestrator, tightly coupled to every engine's internals. Second, the stitching logic itself is a source of bugs: if you add Engine 7, every stitching call site needs to be updated. You've moved the coupling from the engines to the explanation layer.

### Option 3: Post-Hoc LLM Summarisation

Feed the final score plus the raw inputs to an LLM and ask "why is this supplier high risk?"

This is fast to build and produces plausible-sounding text. It is also the most dangerous option in a regulated environment. The LLM is **reasoning about the score** — it might infer a justification that sounds correct but doesn't match what the engine actually computed. If Vector B dominated because of a FHR threshold breach, but the LLM attributes the high score to geographic concentration (which is a more "interesting" story), you have an explanation that contradicts the math. In a CBP audit, that's not just unhelpful — it's a liability.

All three options share the same structural mistake: they treat explainability as something that reads the scoring result and infers a narrative. But the reasoning context only exists **during** computation, not after.

---

## The Pattern: A First-Class Accumulator Object

The `ExplanationContext` is created at the start of each entity assessment and threaded through every engine that touches that entity. An `ExplanationStep` is a single reasoning event — one threshold comparison, one weight assignment, one signal activation — recorded as structured data with a declared impact direction (`INCREASES_RISK`, `DECREASES_RISK`, `NEUTRAL`, or `SETS_CONTEXT`). An `ExplanationDimension` captures a complete scored risk dimension: its weight, its contribution to the final score, the rationale, and the signals that drove it. The `FinalVerdict` is the terminal record: bucket, score, dominant factor, weighting rationale.

Each engine receives the `ExplanationContext` as a parameter, calls `add_step()` and `add_dimension()` as it computes, and passes it along. No engine reads what previous engines wrote — it only appends.

Here is the actual class:

```python
class ExplanationContext:
    """
    Audit trail object — created per entity, passed through all engines.
    Each engine adds reasoning steps and dimensions;
    ExplainabilityEngine converts to NL at the end.
    """

    def __init__(self, entity_type: str, entity_id: str, entity_name: str,
                 computation_context: dict = None):
        self.entity_type = entity_type       # "supplier" | "material"
        self.entity_id = entity_id
        self.entity_name = entity_name
        self.steps: List[ExplanationStep] = []
        self.dimensions: List[ExplanationDimension] = []
        self.final_verdict: Optional[FinalVerdict] = None
        self.created_at = datetime.utcnow().isoformat() + "Z"
        self.computation_context: dict = computation_context or {}
        self._step_counter: dict = {}  # For generating unique step_ids per engine

    def add_step(self, engine: str, description: str,
                 technical_detail: dict = None, impact: str = "NEUTRAL") -> None:
        """Append a reasoning step to the audit trail."""
        if engine not in self._step_counter:
            self._step_counter[engine] = 1
        else:
            self._step_counter[engine] += 1
        step_id = f"{engine}_{self._step_counter[engine]:03d}"
        self.steps.append(ExplanationStep(
            engine=engine, step_id=step_id,
            description=description,
            technical_detail=technical_detail or {},
            impact=impact
        ))
```

And here is what a single `ExplanationStep` looks like:

```python
@dataclass
class ExplanationStep:
    engine: str              # "DERIVED_PROPERTIES" | "TTR_PI" | "RISK_SEVERITY"
    step_id: str             # Unique within context: "DERIVED_PROPERTIES_001"
    description: str         # Human-readable: what was computed and why
    technical_detail: dict   # Raw values: {"threshold": 0.80, "actual": 0.87}
    impact: str = "NEUTRAL"  # "INCREASES_RISK" | "DECREASES_RISK" | "NEUTRAL" | "SETS_CONTEXT"
    timestamp: str = ...     # ISO timestamp
```

The `impact` field is the critical design decision. It's not computed from the score — the engine that produces the step **declares** whether this computation increases or decreases risk. This is a direct extension of the core principle: impact direction must be captured at computation time, not inferred afterwards. The same problem that makes post-hoc LLM summarisation dangerous applies here too. Downstream consumers (UI, copilot, auditor) get a machine-readable signal direction without ever needing to reverse-engineer the scoring math.

---

## How Engines Participate

Each engine in the pipeline receives the `ExplanationContext` as an optional parameter (`ctx`). The contract is simple: if `ctx` is not None, append your reasoning steps. If it is None, compute the score without explanation (useful for batch performance testing where xAI overhead is unwanted).

### DerivedPropertiesEngine — Signal Detection

The first engine in the pipeline detects pre-conditions: geographic concentration, diamond patterns (structural single-points-of-failure), financial distress signals, quality degradation. Each detection becomes a step:

```python
def _add_derived_property_steps(entity_data: dict, ctx: ExplanationContext) -> None:
    geo_conc = entity_data.get("geographic_concentration")
    if geo_conc and geo_conc > 0.80:
        dominant = entity_data.get("dominant_supplier_country", "unknown")
        ctx.add_step(
            engine="DERIVED_PROPERTIES",
            description=(
                f"Vector D signal activated: geo_concentration={geo_conc:.2f} "
                f"exceeds threshold 0.80. Dominant sourcing country: {dominant}."
            ),
            technical_detail={
                "geo_concentration": geo_conc,
                "threshold": 0.80,
                "dominant_country": dominant
            },
            impact="INCREASES_RISK",
        )

    is_diamond = entity_data.get("is_diamond_node")
    if is_diamond:
        diamond_type = entity_data.get("diamond_type", "MATERIAL_CONVERGENCE")
        ctx.add_step(
            engine="DERIVED_PROPERTIES",
            description=(
                f"Diamond pattern detected ({diamond_type}): node converges "
                f"{entity_data.get('diamond_assembly_count', '?')} assembly paths. "
                f"Structural SPOF risk elevated."
            ),
            technical_detail={
                "diamond_type": diamond_type,
                "is_diamond": True
            },
            impact="INCREASES_RISK",
        )
```

Notice: the `DerivedPropertiesEngine` doesn't know that a `RiskSeverityEngine` will run next. It doesn't know what weights its signals will receive. It just records what it found and tags the impact direction.

### TTRPICalculator — Supply Chain Depth

The second engine computes time-to-recover and performance impact. Its steps explain how the numbers were derived — not just the output, but the propagation logic:

```python
if inherited_ttr is not None:
    base_ttr_context = (
        f" (supplier's own base TTR: {base_ttr} weeks)"
        if base_ttr is not None and base_ttr != inherited_ttr
        else ""
    )
    ctx.add_step(
        engine="TTR_PI",
        description=(
            f"Inherited TTR = {inherited_ttr} weeks — the maximum time-to-recover "
            f"propagated from the deepest upstream supply chain node{base_ttr_context}. "
            f"Exposure window = {exposure_weeks} weeks beyond JIT buffer "
            f"({self.TTS_JIT_WEEKS} weeks)."
        ),
        technical_detail={
            "inherited_ttr_weeks": inherited_ttr,
            "base_ttr_weeks": base_ttr,
            "tts_jit_weeks": self.TTS_JIT_WEEKS,
            "exposure_weeks": exposure_weeks,
        },
        impact="SETS_CONTEXT",
    )
```

The `SETS_CONTEXT` impact tag is deliberate — TTR doesn't directly increase or decrease the risk score, but it provides context that influences downstream weighting. The distinction matters in the UI: steps tagged `SETS_CONTEXT` are rendered differently from steps tagged `INCREASES_RISK`.

### RiskSeverityEngine — Weighted Multi-Vector Scoring

The final scoring engine records both per-dimension contributions and the aggregation logic:

```python
# ExplanationContext instrumentation inside RiskSeverityEngine
if ctx is not None:
    for i, assessment in enumerate(sorted_dimensions):
        dim_code, dim_display_name = _DIMENSION_CODE_MAP.get(
            assessment.name, (assessment.name.upper(), assessment.label)
        )
        ctx.add_dimension(
            name=dim_display_name,
            dimension_code=dim_code,
            score=assessment.score,
            weight=assessment.weight,
            rationale=f"{assessment.summary} Weight={assessment.weight*100:.0f}% of final score.",
            signals=list(assessment.evidence),
            is_primary=(i == 0 and assessment.score >= 0.1),
        )
        ctx.add_step(
            engine="RISK_SEVERITY",
            description=(
                f"{dim_display_name}: score={assessment.score:.2f}, "
                f"weight={assessment.weight*100:.0f}%, "
                f"contribution={assessment.score * assessment.weight:.2f}."
            ),
            technical_detail={
                "dimension": assessment.name,
                "score": assessment.score,
                "weight": assessment.weight,
                "contribution": assessment.score * assessment.weight,
            },
            impact="INCREASES_RISK" if assessment.score >= 0.25 else "NEUTRAL",
        )

    ctx.set_final(
        bucket=risk_bucket,
        score=risk_score,
        dominant_factor=dominant_factor,
        weighting_rationale=weighting_rationale,
        color=risk_color,
    )
```

At this point, the `ExplanationContext` contains the complete reasoning chain: 2-3 steps from signal detection, 2 steps from TTR/PI calculation, 6+ steps from multi-vector scoring (one per dimension plus the final verdict). A typical supplier assessment produces 10-12 steps.

The engines don't coordinate. They don't know about each other's steps. The `ExplanationContext` is the only connective tissue — and its contract is trivially simple: `add_step()`, `add_dimension()`, `set_final()`.

> **[DIAGRAM 1 — ExplanationContext Flow]**
>
> Horizontal pipeline with 4 engine boxes: `DerivedPropertiesEngine` → `TTRPICalculator` → `RiskSeverityEngine` → `ExplainabilityEngine`. A single `ExplanationContext` document flows left-to-right, growing taller (more steps appended) at each engine. Each engine box shows example steps being added. The `ExplainabilityEngine` at the end splits into two outputs: human-readable NL and structured JSON.

---

## The LLM's Role: Humaniser, Not Reasoner

After all engines have run, the `ExplanationContext` is complete. But it's structured data — step_ids, dimension codes, technical_detail dictionaries. A compliance analyst doesn't want to read JSON.

This is where the LLM enters. But its role is precisely scoped: **translate structured evidence into professional prose**. The LLM never reasons about why the score is what it is. It receives the complete context — every step, every dimension, every weight, the final verdict — and is instructed to write a narrative that faithfully represents what the engines actually computed.

The `ExplanationContext` class has a `to_llm_prompt()` method that builds a deterministic, structured prompt:

```python
def to_llm_prompt(self) -> str:
    steps_text = "\n".join([
        f"{i+1}. [{s.engine}] {s.step_id}: {s.description}\n   Impact: {s.impact}"
        for i, s in enumerate(self.steps)
    ])
    dimensions_text = "\n".join([
        f"- {d.name} (code: {d.dimension_code}): score={d.score:.2f}, "
        f"weight={d.weight:.2f} ({d.weighted_contribution:.2f} contribution)\n"
        f"  Rationale: {d.rationale}\n"
        f"  Signals: {', '.join(d.signals) if d.signals else 'none'}\n"
        f"  Primary driver: {d.is_primary}"
        for d in self.dimensions
    ])
    # ... entity context, final verdict, instructions
    return prompt.strip()
```

The `ExplainabilityEngine` wraps this in a GPT-4.1 call with low temperature (0.2) for consistent output:

```python
class ExplainabilityEngine:
    def __init__(self, llm_client):
        self.llm_client = llm_client
        self.model = "gpt-4.1"
        self.temperature = 0.2  # Low temperature for consistent, professional output

    def generate(self, ctx: ExplanationContext) -> ExplanationResult:
        """
        Takes completed ExplanationContext, calls GPT-4.1, returns ExplanationResult.
        Handles LLM failures gracefully — falls back to template-based explanation.
        """
```

Why this separation matters: if the LLM hallucinates or the API call fails, the structured evidence in the `ExplanationContext` is still intact. The `ExplainabilityEngine` has a `_template_fallback()` method that generates a rule-based explanation from the context without any LLM call. The LLM is a rendering layer, not a reasoning layer. Swap it, upgrade it, or disable it — the evidence trail is unchanged.

> **[DIAGRAM 2 — Single ExplanationStep Anatomy]**
>
> A blown-up card view of one ExplanationStep:
> ```
> ┌─────────────────────────────────────────────────┐
> │ engine: RISK_SEVERITY                           │
> │ step_id: RISK_SEVERITY_003                      │
> │ description: "Vector D (Geopolitical): score=   │
> │   0.65, weight=25%, contribution=0.16.          │
> │   Taiwan concentration 85% exceeds threshold."  │
> │ technical_detail:                                │
> │   { dimension: "geo_concentration",             │
> │     score: 0.65, weight: 0.25,                  │
> │     contribution: 0.16 }                        │
> │ impact: INCREASES_RISK ▲                        │
> │ timestamp: 2026-04-25T08:12:03Z                 │
> └─────────────────────────────────────────────────┘
> ```
> Caption: "Not a log line. A structured evidence record with declared impact direction."

---

## Scaling the Pattern: From 12 Engine Steps to 40+ Agentic Steps

The `ExplanationContext` was designed for deterministic engines that produce 10-12 steps per entity. Then we introduced agentic tariff compliance workflows, and the pattern was stress-tested.

### The Tariff xAI Challenge

The tariff compliance layer adds an AI agent (the `TariffWorkerAgent`) that operates in a ReAct loop: it gathers external trade intelligence (Panjiva shipment records, supplier verification data), evaluates which regulatory case applies, and writes a scoring decision to the graph. A single agent run can involve:

- **NODE_SELECTION** — deterministic Tier-0 step recording why this node was flagged for tariff analysis (origin country, HS code, rate stack, conservative exposure calculation)
- **STATE_TRANSITION** — the agent moves the node from one compliance state to another (e.g., `SCORED_CONSERVATIVE → INTELLIGENCE_CONFIRMED`), recording the evidence that justified the transition
- **ATTESTATION** — a supplier declaration or certificate of origin arrives, triggering a transition to `SUPPLIER_DECLARED` or `ATTESTED_CONFIRMED`

Each of these events produces an `ExplanationStep` with the same schema as the deterministic engines — `engine`, `step_id`, `description`, `technical_detail`, `impact`, `timestamp` — but with additional tariff-specific fields:

```json
{
  "engine": "TARIFF_RISK_AGENT",
  "step_id": "TARIFF_RISK_AGENT_4:abc123_1716312736",
  "event_type": "STATE_TRANSITION",
  "state_from": "SCORED_CONSERVATIVE",
  "state_to": "INTELLIGENCE_CONFIRMED",
  "impact": "DECREASES_RISK",
  "description": "Panjiva confirmed VN origin via 47 shipments. HS chapter change 28→85 confirmed.",
  "technical_detail": {
    "source": "Panjiva",
    "record_ref": "PANJ-2024-VN-8505-00441",
    "rate_before": 0.71,
    "rate_after": 0.02,
    "annual_exposure_before": 31950000,
    "annual_exposure_after": 900000
  },
  "timestamp": "2026-05-21T19:12:16Z"
}
```

A single material node that goes through the full compliance lifecycle (conservative scoring → Panjiva intelligence → supplier declaration → formal attestation) accumulates 4-6 tariff xAI steps on top of the initial 10-12 deterministic risk steps. For a complex material with multiple enrichment rounds, the count can reach 40+ steps.

### What Didn't Need to Change

The `ExplanationStep` schema is identical. The tariff agent uses the same `engine`, `step_id`, `description`, `technical_detail`, `impact` fields. The only addition is `event_type` (NODE_SELECTION / INITIAL_SCORING / STATE_TRANSITION / ATTESTATION) which drives timeline rendering in the UI.

The accumulator pattern scaled without modification — append-only semantics means the tariff agent simply appends more steps to the same array. The deterministic engines wrote 12 steps; the agentic layer writes 12 + N more. No schema migration, no breaking change.

### What Did Need to Change: The PENDING Write Fence

The agentic layer introduced a crash-safety concern that the deterministic pipeline didn't have. If the `TariffWorkerAgent` dies mid-run, the node's tariff state must not be left in an inconsistent state. The solution was a write fence: before calling the agent, the orchestrator atomically writes:

```cypher
SET n.tariff_state = 'PENDING',
    n.tariff_state_pending_prior = CASE
        WHEN n.tariff_state IS NOT NULL
         AND n.tariff_state <> 'PENDING'
        THEN n.tariff_state
        ELSE n.tariff_state_pending_prior
    END,
    n.tariff_checkpoint_at = $timestamp
```

This creates a problem for the explanation trail: by the time the agent's write tool runs, the node's `tariff_state` in Neo4j is `PENDING`, not the actual prior state. Reading `tariff_state` directly would always yield `PENDING` → wrong `state_from` → incorrect explanation step.

The solution is **backward iteration** through the stored explanation steps:

```python
for step in reversed(existing_steps):
    candidate = step.get("state_to")
    if candidate and candidate not in ("PENDING", "SCORING_QUEUED"):
        state_from = candidate
        break
```

> **The trail serves double duty: audit trail for humans, state-reconstruction mechanism for the system itself.** We didn't design this second use case. It emerged from the append-only semantics and the decision to treat the trail as canonical state. If you'd asked us during design whether the explanation trail would become load-bearing infrastructure for crash recovery, we would have said no.

The explanation trail is not just an output artifact — it became the system of record for deriving prior state. That's an emergent property of append-only accumulation: once you commit to "the trail is always the truth," other parts of the system can rely on it too.

---

## Dual Consumers: Same Data, Different Interfaces

The same `ExplanationContext` feeds two completely different output paths through two methods on the same class.

### Consumer 1: Human-Readable UI (via LLM)

The `to_llm_prompt()` method builds a structured prompt that gets sent to GPT-4.1. The output is a 2-3 sentence `summary` plus per-factor `ExplainedFactor` objects, each with a full NL explanation. This is what appears in the risk detail panel when an analyst clicks on a supplier.

Example output for a specific supplier:

> *"Acme Electronics is rated HIGH risk, primarily driven by active financial distress signals. An FHR of 42 places the company in the distressed range with a 68% probability of default within 12 months — the model's highest-weighted factor. A secondary concentration risk from Taiwan (85% of sourcing) amplifies this assessment."*

Every claim in that text maps to a specific `ExplanationStep` in the context. The LLM's temperature is 0.2 — it isn't generating creative prose, it's translating structured evidence into professional narrative. If the LLM call fails, the `_template_fallback()` method generates a mechanical but accurate explanation from the same data.

### Consumer 2: RAG / Copilot (via Structured Text)

The `to_rag_chunk()` method produces a dense, semantically-tagged text block optimised for vector store indexing:

```python
def to_rag_chunk(self) -> str:
    # Entity header with machine-readable tags
    rag_sections.append(
        f"[ENTITY_TYPE: {self.entity_type}] [ENTITY_ID: {self.entity_id}]\n"
        f"[RISK_BUCKET: {verdict.bucket}] [SCORE: {verdict.score}/25]"
    )
    # Risk drivers by priority order
    rag_sections.append(
        f"PRIMARY_DRIVER: {d.name}. Score={d.score:.2f}, Weight={d.weight:.0%}.\n"
        f"{d.rationale} Signals: {', '.join(d.signals)}."
    )
    # Bucket logic from SETS_CONTEXT steps
    bucket_steps = [s for s in self.steps if s.impact == "SETS_CONTEXT"
                    and "bucket" in s.description.lower()]
    rag_sections.append(f"BUCKET_LOGIC: " + " ".join(s.description for s in bucket_steps))
    # ...
```

When a user asks the copilot "why is Acme Electronics high risk?", the retrieval system finds this chunk by semantic similarity and returns the facts — not a re-interpretation. The copilot's LLM generates a response from the retrieved structured evidence, grounded in the same data that produced the original score. Two LLM calls, both constrained by the same source-of-truth `ExplanationContext`.

### Why Not One Format?

NL prose is lossy — it's readable but drops precision. Structured text preserves precision but isn't readable. The `ExplanationContext` is the canonical representation; the two output methods are projections of the same data for different access patterns. If we had used only one format, one consumer would always be underserved.

> **[DIAGRAM 3 — Dual Consumer Fork]**
>
> Y-shaped diagram. `ExplanationContext` sits at the fork point. LEFT branch → `to_llm_prompt()` → GPT-4.1 (low temperature) → NL summary for UI panel. RIGHT branch → `to_rag_chunk()` → structured text → Copilot vector store for question-answering. Annotation: "Same data object. Two rendering paths. The LLM translates — it never reasons."

---

## Change Detection: When to Re-Explain

Re-generating explanations is expensive (LLM calls, token costs, latency). The `ExplanationContext` includes a `has_material_change()` method that compares the current context against a previous one:

```python
def has_material_change(self, previous_context: Optional["ExplanationContext"]) -> bool:
    if not previous_context:
        return True  # First time → always generate

    # Bucket changed?
    if prev_bucket != curr_bucket:
        return True

    # Dominant dimension changed?
    if prev_primary != curr_primary:
        return True

    # Signal values changed?
    if prev_all_signals != curr_all_signals:
        return True

    return False
```

A `context_hash` (SHA-256 of the inputs) is stored on the entity node in Neo4j alongside the summary. During refresh cycles, the hash is compared before invoking the LLM. If the inputs haven't changed, the existing explanation is reused. This typically avoids regeneration for 60-70% of entities in a refresh cycle.

---

## Honest Limitations

### Linear Growth

The context object grows linearly with pipeline depth. A deterministic assessment produces ~12 steps. A tariff-enriched assessment reaches 20-25 steps. A node that goes through multiple enrichment rounds can hit 40+ steps. We chose "accumulate everything, filter at read time" over "selective recording" because selective recording requires every engine to know which steps are "important" — a coupling we wanted to avoid.

The tradeoff: serialisation cost at the tail. For the top 5% of nodes by step count, the `ExplanationContext` JSON exceeds 15KB. We store the full `ExplanationResult` on a linked `ExplanationNode` in Neo4j (not as a node property, which has practical size limits) and keep only the 2-3 sentence summary as a direct property for fast list-view reads.

### Synthesis as Backfill

Not every node enters the pipeline through the orchestrator. Some are seeded directly (for demos or data migration), bypassing the engines entirely. These nodes have scores but no explanation trail. A `_synthesise_explanation_steps()` function reconstructs a plausible trace from the node's persisted properties — but it's reverse-engineering, exactly the anti-pattern we designed against. Synthesis is a pragmatic concession: it's deterministic (same properties → same output), but it doesn't capture the original reasoning.

We track which explanations are synthesised (`"synthesised": true` in the API response) so consumers can distinguish between genuine audit trails and reconstructed ones.

### The LLM Is a Rendering Dependency

If the LLM provider is down, the human-readable summary is unavailable until it recovers (or the template fallback kicks in). The structured evidence in the `ExplanationContext` and the RAG chunk are unaffected — they don't touch the LLM at all. But the UI panel shows a degraded experience. We consider this acceptable because the *data* is never lost, only the *presentation* is delayed.

---

## Production Numbers

- **Entities scored**: ~170,000 nodes per batch cycle
- **Steps per deterministic assessment**: 10-12 (3 engines × 3-4 steps each)
- **Steps per tariff-enriched assessment**: 20-40 (deterministic base + agent ReAct trace)
- **ExplanationResult stored**: linked `ExplanationNode` in Neo4j (no 64KB property limit)
- **Summary property**: 2-3 sentences on the entity node itself (zero-hop read in list views)
- **Regeneration skip rate**: 60-70% of entities unchanged between refresh cycles (hash-based)
- **LLM fallback rate**: <2% of calls use template fallback (GPT-4.1 reliability at low temperature)

---

## Conclusion

The `ExplanationContext` pattern — an append-only accumulator threaded through N independent engines — solved the cross-engine coupling problem cleanly. But the more durable finding was something we didn't design for: append-only, structured evidence collection becomes load-bearing in unexpected ways. The trail became the system's own state-reconstruction mechanism when the agentic layer introduced crash-safety requirements. Explainability that lives in a cross-cutting accumulator is explainability that exists when you need it. Everything else is forensics.

The pattern is also extensible in the direction the system is already heading. As the platform moves toward human-in-the-loop workflows, every step will carry `actor_type` (SYSTEM vs. HUMAN) and `proof_docs` (blob references to the actual source documents — Panjiva PDFs, supplier declarations, certificates of origin). Human overrides create new steps, never mutate existing ones. The append-only property makes this natural. The audit trail becomes a complete compliance timeline: system recommended X, human overrode to Y at timestamp T, document Z is why.

---

*Tags: Distributed Systems, Explainability, Multi-Engine Architecture, Audit Trail, Software Design Patterns*
