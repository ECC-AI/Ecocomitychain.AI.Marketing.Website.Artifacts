# LinkedIn — Founder Post
## "Why we chose Neo4j over a relational database for this problem"
### Primary audience: Engineers + technical founders
### Series: S1 · Material Intelligence

---

We spent three weeks trying to make a relational database work for this problem before we stopped pretending.

The problem: map an automotive bill of materials from finished assembly all the way down to the raw ore — eight levels, every material transformation, every supplier at every depth. Then compute which nodes are structural single points of failure. Then compute how long it actually takes to recover from a disruption, not at the T1 supplier, but at the deepest constrained node in the chain.

Here is where the relational model breaks:

**Level heterogeneity.** An Assembly (L1) and a RawMaterial (L8) are not the same kind of thing. They have different schemas, different properties, different risk dimensions. A self-referencing BOM table collapses this into one schema and loses meaning. A separate table per level gives you eight tables and a seven-way join every time you traverse the chain.

**Relationship semantics.** We have seven distinct relationship types just for material transformation — `COMP_USES_MATERIAL`, `COMP_MAT_TRANSFORMS_TO_SEMI`, `SEMI_TRANSFORMS_TO_PRIMARY`, and four more. Each one represents a different industrial process with different lead time physics and supplier dependencies. In a relational model these become seven join tables, or one polymorphic edge table with a type column that loses all semantic meaning. You can no longer query "give me all paths through refining steps only."

**Variable-length traversal.** Diamond detection — finding every assembly that ultimately depends on a given ore — requires traversing backwards through up to eight levels across any combination of those seven relationship types. In SQL that is a recursive CTE with a UNION ALL at every step, and SQL has no way to express "any of these seven relationship types" natively. In Cypher it is six lines with `*1..8` and a list of relationship types. That query ran against our live graph in under 200ms and returned 19 assemblies — all converging on one L8 ore node.

**Cross-domain queries.** Our most important questions span three domains simultaneously: material chemistry (L3–L8), supplier network (who supplies what at which depth), and risk properties (TTR, geographic concentration, single-source likelihood) stored as node properties. In a relational world these live in three separate systems. On the graph, they are one traversal.

The graph scale we are working with: 34,713 nodes, 52,856 relationships, 17 relationship types, 554 suppliers across all eight tiers, 1,477 supplier locations.

The highest `diamond_assembly_count` in our graph is 19. One L8 ore node. Every assembly in a full vehicle programme converging on the same raw material. That is not visible in any flat data model. The graph detected it automatically — no analyst marked it, no spreadsheet tracks it. It is a computed property of the network.

Neo4j did not make this problem easy. Graph data modelling at this depth has its own complexity. But it made the problem expressible. The alternative was a system that could not ask the questions we needed to ask.

We are building PMG on Neo4j as part of the Neo4j for Startups programme. The full technical write-up — schema, three scenarios, Cypher — is in the blog post linked below.

#Neo4j #GraphDatabase #SupplyChain #MaterialIntelligence #Cypher #StartupEngineering #BillOfMaterials

---
*Word count: ~420 words. Formatted for LinkedIn — no headers render, so the bold labels carry the structure.*
