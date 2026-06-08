# The Q4 Problem: What Ford and MIT Discovered, and What Material Depth Reveals Next

*A landmark study proved that supply chain risk is not where companies think it is. A decade later, the same methodology has a deeper problem that most risk teams have not noticed yet.*

---

In 2015, David Simchi-Levi and colleagues at MIT published the results of a three-year research engagement with Ford Motor Company. The central finding was counterintuitive: the suppliers creating the largest financial risk for Ford were not the ones receiving the largest share of Ford's procurement spend.

When they plotted every Tier 1 supplier site on a scatter chart — total spend on one axis, Performance Impact on the other — a cluster appeared in the bottom-right corner that nobody had been watching. Low spend. High impact. Out of 4,534 supplier sites examined, 408 had "very high" performance impact. Many of these were suppliers Ford had not considered strategic. Ford estimated the lost revenue from a two-week disruption at the newly identified sites ranged from several hundred thousand dollars to $2.5 billion.

This was the Q4 insight: **risk and spend are not correlated.** Focusing risk management resources on your largest suppliers protects your procurement budget. It does not protect your production lines.

The methodology rests on two variables. **TTR (Time-to-Recover)** is the time a node needs to return to full functionality after a disruption. **PI (Performance Impact)** is the financial exposure during that recovery window. The approach is deliberately agnostic to the *cause* of disruption — whether a supplier fails due to fire, insolvency, a geopolitical restriction, or a weather event, what matters is how long recovery takes and what it costs. This is correct. Disruption causes are unpredictable. Disruption impact is calculable.

---

## The structural ceiling

The methodology's authors were clear about the data they worked with. In the paper, they write: *"although manufacturers typically have good information on Tier 1 suppliers, they have considerably less information on lower-tier suppliers in the supply chain."* This is not a flaw. It is a design acknowledgement. The methodology was built for the data that existed — T1-observable parameters.

TTR, in the Ford-MIT model, is a parameter that each supplier estimates and declares. The paper notes that *"a supplier may be optimistic when assessing its TTR; that is, a supplier may underestimate the time required to recover."* The TTS (Time-to-Survive) concept was introduced specifically to handle this uncertainty: if you cannot trust a TTR, at least identify which suppliers need a better estimate before your supply chain's survival window runs out.

But TTS does not solve the deeper problem. **A Tier 1 supplier cannot accurately estimate their own TTR without visibility into their own supply chain.** In most cases, they do not have it. Their declared TTR reflects their own operational recovery capacity. It says nothing about what lies beneath them.

---

## Two nodes, one assembly, two invisible TTR floors

The diagram below shows two paths within the same Electric Power Steering assembly — both terminating at Tier 4, the same depth. Neither is visible to the T1 supplier's TTR estimate.

---

**[INSERT VISUAL 1 HERE]**

*Two paths within the same EPS assembly. The T1 declares 8–12 weeks. PMG computes 52+ weeks on the NdFeB path and 34+ weeks on the Galfenol path — both rooted in material-level constraints the T1 supplier cannot see.*

---

**The chemical complexity node.** The NdFeB magnet material in the BLDC assist motor requires sintered N52-grade blocks produced through a multi-stage process: vacuum casting, hydrogen decrepitation, jet milling to 3–5 micron powder, magnetic field pressing, and vacuum sintering at over 1,000°C. Only a handful of facilities globally can produce this grade to specification. At the next level down, the Neodymium metal is sourced from a concentrated cluster of refineries. The TTR computed from these nodes is not 8–12 weeks. It is 52 weeks or more.

The T1 supplier did not misrepresent their estimate. They simply cannot see their own material chain below the component level.

**The tooling lock-in node.** The torque sensor shaft uses a Galfenol magnetostrictive alloy casting that requires a proprietary magnetic field alignment fixture during production — held by one qualified supplier. Substituting this node requires fabricating a new fixture, validating the magnetostrictive properties, and completing OEM re-qualification. The TTR floor is 34+ weeks. Not because the supplier is slow. Because the tooling constraint is a physical fact that no amount of capacity reallocation can shortcut.

The Ford-MIT paper itself identifies this dynamic, noting that *"TTR may be different for different modes of disruptions (e.g., process disruption versus tooling damage)."* The observation is correct. Working from T1-observable data, the model had no mechanism to act on it.

The 1997 Aisin Seiki fire illustrates the consequence at scale. Aisin was Toyota's sole supplier of brake proportioning valves — a component requiring specialised tooling. Toyota halted production across all its plants within days. Recovery required Toyota to mobilise over 200 alternative suppliers and send engineering teams to each one to physically help build the tooling needed to produce the valves. The first batch arrived four days after the fire — but only because Toyota had the relationships and the resources to do this. Without that network, the tooling-dependent TTR would have been months, not days.

---

## What changes when TTR is computed, not declared

Three things shift when TTR is derived from the material graph rather than declared by the supplier:

**TTR becomes causally grounded.** Instead of a category estimate ("single-source, complex tooling = 12 weeks"), the score traces back to the actual node driving the constraint — the specific chemistry, the specific fixture, the specific ore source. The number is not a guess. It is a traversal result.

**Sub-tier disruptions become detectable before they reach T1.** A disruption event at an L6 rare earth refinery does not appear in T1-level data until that T1 begins issuing allocation warnings — typically weeks after the underlying event. If the sub-tier graph is pre-populated, the downstream blast radius is computable the moment the event is identified, not the moment the T1 reports a problem.

**The Q4 cluster becomes more accurately populated.** In the original methodology, a T1 supplier's PI reflects their position relative to the assembly. With path-specific TTR traversal, each T1's score reflects their own supply path depth — not an assembly-wide average. Suppliers whose path passes through a chemistry-constrained or tooling-locked node land in Q4. Suppliers whose path runs through commodity materials do not. The Q4 cluster is smaller, but every supplier in it is genuinely dangerous.

---

## The honest framing

The Ford-MIT methodology demonstrated something important and durable: PI is a better predictor of supply chain risk than spend, and the Q4 cluster is where hidden risk concentrates. Those findings remain correct.

What material genealogy adds is not a replacement. It is a deeper input for the same framework. When the graph carries material chemistry, process physics, and tooling constraints at every level down to the raw source, TTR stops being an estimate and starts being a computed property of the network.

The Q4 problem that Ford and MIT identified in 2015 is real and still underappreciated in most supply chain risk programmes. The question for the next decade is not whether the framework is right. It is whether the inputs it receives are deep enough to let it do its job.

---

*The EPS supply chain data in this article is illustrative, drawn from a modelled automotive BOM using publicly available material science data. The Ford-MIT methodology is documented in: Simchi-Levi, D., Schmidt, W., Wei, Y. et al., "Identifying Risks and Mitigating Disruptions in the Automotive Supply Chain," Interfaces 45(5), pp. 375–390, 2015.*

