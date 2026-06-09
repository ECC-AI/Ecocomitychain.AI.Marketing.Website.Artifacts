# S1-7 · LinkedIn Founder Post
# Series: S1 · Material Intelligence · Phase 1 · Problem
# Attach: none

---

When we started building ECC, the obvious approach was a supplier graph.

Map the suppliers. Connect them. Score them by financial health, operational performance, geographic risk. Add more suppliers. Go deeper.

This is what every tool in this space does. They compete on the breadth of their supplier database, the freshness of their signals, the sophistication of their scoring models. Some are very good at it.

We started there. And then we hit a problem that would not go away.

We were modelling a supply chain disruption scenario. Not a financial failure — a material disruption. A single processing facility going offline. And we kept finding that the financial health score of the Tier 1 supplier was essentially irrelevant to the recovery time.

A financially healthy Tier 1 supplier with a single-source dependency on a specialty material — one that requires months of chemical re-qualification to substitute — has a longer recovery time than a financially stressed supplier with three alternative material paths available. The supplier score told us nothing about the material constraint.

The risk was not in the relationship between companies. It was in the specification of the material itself.

So we asked a different question: what if we built the graph around the material, not the supplier?

What if every node represented either a supplier entity OR a material specification, and both were scored independently? What if we traced not just who supplies whom, but what each component is made of, where those materials come from, and what the physics of recovery actually looks like at each level?

That decision changed everything about the architecture.

It is why we can compute Time-to-Recover from the material chain, not just declare it from the supplier. It is why we score supplier risk and material risk simultaneously rather than choosing one. It is why our graph goes eight levels deep — because that is where the actual constraint lives.

Building a material graph instead of a supplier graph was not the obvious choice. It was the necessary one.

---

*What question is your current supply chain risk tool unable to answer?*
