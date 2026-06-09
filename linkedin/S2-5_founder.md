# S2-5 · LinkedIn Founder Post
# Series: S2 · Trade Risk Uncovered · Phase 2 · Incident Evidence
# Attach: none

---

We found $31 million in tariff exposure sitting undocumented in a single BOM position.

Here is exactly how we found it — step by step.

**Step 1: The component**
A mid-power EV traction motor. German T1 supplier. Declared German origin. Customs entry filed at 2.5% MFN. Nothing flagged.

**Step 2: The material graph query**
ECC traces the motor to its material precursors. At L4: sintered NdFeB block, HS 8505.11. At L5: NdFeB alloy powder, HS 2846.90. Origin state on both nodes: unconfirmed. Industry-level concentration: China produces more than 85% of global NdFeB by volume.

Conservative scoring kicks in: 71% stacked rate (Section 301 + IEEPA) applied until origin is confirmed otherwise.

**Step 3: The exposure calculation**
3 kg NdFeB per vehicle × $100/kg customs value = $300 per vehicle.
$300 × 71% = $213 per vehicle at conservative scoring.
$213 × 150,000 units per year = **$31.95M annual exposure.**

**Step 4: The resolution**
Third-party trade monitoring platform records confirm the alloy powder was sintered at a Vietnamese facility — a Chapter 28-to-85 HS transformation outside China. Vietnamese origin established.

Conservative scoring released. Confirmed rate: 2% MFN. Residual exposure: $0.9M per year.

**Step 5: The arithmetic**
Resolution value: $31.05M.
Attestation cost: approximately $50,000.
ROI: **621:1 on one programme.**

If the same magnet grade runs across three vehicle platforms — which it typically does — the same attestation resolves all three simultaneously.
**1,863:1. One supplier letter.**

The $31M was always there. It was invisible because no standard tool asks what is inside the motor at the material level, and from where those materials originated.

ECC asks that question. And answers it before CBP does.

---

*How many material streams in your BOM have never been traced to this level?*
