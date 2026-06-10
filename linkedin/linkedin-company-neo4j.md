# LinkedIn — Company Post
## "PMG + Neo4j: what graph-native supply chain risk looks like at L8"
### Primary audience: Supply chain / procurement leaders
### Series: S1 · Material Intelligence

---

Your T1 supplier quotes a lead time. That number reflects their inventory, their capacity, their procurement relationships.

It does not reflect what is six levels beneath them.

We built PMG — our material genealogy platform — on Neo4j because supply chain risk cannot be answered at the supplier level. It has to be answered at the material level. All the way down to the ore.

Three things the graph shows that supplier-level tools do not:

**1. The convergence problem**
In a flat model, your Battery Pack has a nickel supplier. Your Traction Motor has a different nickel supplier. Your Braking System has a third. Three independent risks.

In the graph, all three paths trace back to the same ore at Level 8. If that ore supply is disrupted, every assembly in the vehicle programme is affected simultaneously. Our graph found 19 assemblies converging on one material node. None of this is visible in any supplier profile or spend report.

**2. The TTR problem**
Time-to-Recover is not what your T1 declares. It is the maximum constraint across the full dependency path — and that maximum almost always sits deep in the material chain, not at the T1.

In one lithium supply chain we modelled: the T1 assembly supplier's declared lead time reflects their operations. The raw ore at Level 8 carries a 270-day TTR. The gap between what procurement sees and what the material chain requires is not a rounding error. It is a structural blind spot.

**3. The supplier overlay problem**
Suppliers connect to your value chain at every depth — not just at Tier 1. A critical material at Level 6 may have a single qualified supplier whose geographic location concentrates an entirely different geopolitical risk. That supplier does not appear on any T1 scorecard.

The graph maps all 554 suppliers across all eight tiers, with typed relationships at every depth. It tells you not just who supplies what — but where in the material chain that relationship actually lives, and what the recovery physics look like if it breaks.

---

PMG is built as part of the Neo4j for Startups programme.

The full technical write-up — 34,713 nodes, 52,856 relationships, three graph scenarios with Cypher — is linked in the first comment.

If your procurement or risk team is asking how to get ahead of the next disruption before it reaches T1: this is the architecture.

#SupplyChainRisk #MaterialIntelligence #Neo4j #AutomotiveSupplyChain #Procurement #ValueChainResilience #BEV #CriticalMaterials

---
*Word count: ~360 words. No Cypher. Procurement framing throughout. Blog link goes in first comment per standard practice.*
