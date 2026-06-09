# EE-1 · LinkedIn Founder Post
# Series: S3 · Engineering Excellence · EE-1
# Attach: none

---

I have a habit that probably slows us down.

Every time we add a new scoring component to the platform, I ask: if this score were wrong, how would we know?

Not wrong in an obvious way. Wrong in the way that matters in enterprise software — subtly wrong, in a specific edge case, in a way that a compliance team or a procurement lead would notice before we did.

The answer to that question shapes the architecture.

For a supply chain risk platform, being wrong has consequences. A score that incorrectly flags a critical supplier as low risk delays action that should have been taken. A score that incorrectly flags a stable supplier as critical creates procurement scrambles that cost real money. And in regulated industries, an AI system that cannot explain its own reasoning is not a system a compliance team can defend to a regulator.

Early on, we made a decision that felt expensive at the time: we would not build explainability on top of the scoring system. We would build it into the system's data model.

This means every computation that contributes to a risk score produces a structured evidence record as a side effect. Not a log entry. A structured object — with an ID, a type, a value, a source, a confidence level, and a timestamp — that becomes part of the score's permanent record.

We call this the ExplanationContext pattern. I wrote up the full technical rationale and implementation approach in the first post of our Engineering Excellence series.

The short version: explainability bolted on after the fact produces narratives. Explainability designed into the data model produces evidence. Only one of those holds up when someone senior asks why the system flagged what it flagged.

The longer version — with code structure, the two-consumer output model, and the write fence pattern — is in the post linked below.

---

*For the engineers and technical evaluators: this one is written for you. [link in comments]*
