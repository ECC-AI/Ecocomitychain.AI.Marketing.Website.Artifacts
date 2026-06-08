# ECC Website Build - Session Handoff
Last updated: June 8 2026. Read this entire file before taking any action.

## What We Are Working On
Building the ECC (EcocomityChain.AI) marketing website from scratch.
ECC is a pre-first-customer supply chain resilience platform targeting automotive OEMs and T1 suppliers.
The platform has two live segments: Proactive Resilience (8-level material genealogy, dual-node scoring, TTR computation, XAI) and Reactive Resilience (ICA Intelligence, temporal co-optimisation, Resilience Copilot).
We are building the GTM website, blog, and content assets needed to support the first customer acquisition.

## Topics Handled in This Thread
- Full website architecture decision: GitHub Pages chosen over Wix for HTML hosting
- DNS migration: ecocomitychain.ai A records and www CNAME updated to point at GitHub Pages
- HTTPS certificate provisioned via GitHub Pages
- Homepage built: hero, spectrum SVG, 4-layer stack diagram (iframe), platform cards, RIF section, case study cards, pilot form (Formspree), research report gate (Formspree + PDF)
- Proactive resilience page: full content, consistent nav, brief download gated
- Platform parent page created but removed from nav (intentionally kept for future use)
- Two case briefs deployed: Renesas (proactive) and Magnesium (reactive), ungated, open same window
- Static blog built on GitHub Pages at /blog: index with category filter, 3 posts
- Five Disruptions blog: all 5 cases (Renesas, Magnesium, Bastnaesite, Manganese Dual Path, Substitution Trap)
- Ford-MIT Q4 Problem blog: full content
- xAI Engineering blog: proper code blocks (Python), embedded diagram iframes (Diagram1, Diagram2)
- Technical Brief PDF (9 pages, Puppeteer-generated, clean): hosted at /resources/PMG_Platform_Technical_Brief.pdf
- Formspree forms wired for pilot applications and brief/report downloads
- Nav rationalised: Solutions dropdown | Blog | How It Works | Request Pilot Access
- Wix blog posts published (3 posts, now redundant - blog is on GitHub Pages)

## Why Wix Did Not Work and What We Do Instead
Wix was the original hosting plan. Three approaches were tried and all failed for page content:
1. Classic Editor iFrame embeds: Wix Media stores HTML files as .txt with text/plain content type. Browsers display raw source code, not rendered HTML.
2. Wix Studio iFrame embeds: Same content-type problem. GitHub raw URLs blocked by X-Frame-Options: deny.
3. Wix REST API page creation: Wix does not expose any API endpoint for creating pages or placing widgets. The page canvas is editor-only.
Decision: Use GitHub Pages to serve the HTML site directly. Wix Premium is kept ONLY for DNS zone management and business email continuity (MX -> Outlook). Do not cancel Wix Premium before moving nameservers to Big Rock (April 2027 deadline).
The Wix Blog API works perfectly and was used to publish 3 posts. However, blog is now on GitHub Pages at /blog to eliminate Wix dependency.

## Blog Architecture on GitHub Pages
There is no CMS, no Jekyll, no server-side processing. GitHub Pages serves static HTML files.
Blog index: blog/index.html - hand-crafted HTML with JavaScript category filter
Blog posts: blog/posts/[slug]/index.html - each is a standalone HTML file
Categories are implemented as data-cat attributes on post cards in the index, filtered client-side by JavaScript
Three categories defined: Product Intelligence (amber), Engineering Excellence (blue), Trade and Tariff Intelligence (green)
When adding new posts: build the HTML file, push to blog/posts/[slug]/index.html, add a card to blog/index.html
Companion diagrams and assets: blog/assets/xai/ for the engineering posts
The markdown source files in Blogs/ are the content source of truth. HTML is the published artifact.
Code blocks in posts use pre/code HTML with Space Mono font and #a8d8a8 green colour.
Diagram iframes reference URLs at: https://ecc-ai.github.io/Ecocomitychain.AI.Marketing.Website.Artifacts/blog/assets/xai/

## Pending Items (priority order)
1. S2 Trade Risk Uncovered - 5 blog posts from a separate Claude thread. Sriram has the HTML files locally. Push to blog/posts/ and add cards to blog/index.html with data-cat=trade.
2. Reactive resilience page - not built. Content brief at: Website/ECC_Website_Proactive_Resilience_Revamp_Brief.md
3. Research report (The Missing Phase) - needs external-safe rewrite. Currently gate delivers Technical Brief PDF as placeholder.
4. Asset 9 ECC_Asset9_RegulatoryStack.html - never built. Regulatory compliance stack visual.
5. Nav/footer hash links - About, Privacy Policy, Terms of Use, Sustainability Intelligence, Value Chain Optimization.
6. Wix exit plan - move nameservers from Wix to Big Rock before April 2027. All 18 DNS records documented. Do not cancel Wix Premium first.
7. Ford-MIT blog: check for completeness (not audited this session).

## Technical Details
Hosting: GitHub Pages, main branch, root /. Build confirms via Actions tab: completed|success.
DNS: A ecocomitychain.ai -> 185.199.108-111.153 (all four GitHub Pages IPs). CNAME www -> ecc-ai.github.io.
HTTPS: enforced. TLS cert provisioned by GitHub Let's Encrypt integration.
Formspree pilot: mqeoqpaq. Formspree report/brief gate: mykawezp.
Wix site ID: 7996260b-01de-47f2-a71b-870805bb73df.
Stack diagram: iframed from ReusableArtifacts/Platform_Layered_Architecture/ECC_Stack_Diagram_Web.html. Uses 56.25% padding-bottom aspect ratio container (1080/1920 = 56.25%). No fixed height - scales to container.
Technical Brief PDF: generated via Puppeteer from Technical Brief/PMG_Platform_Technical_Brief.html. 9 pages. Hosted at resources/PMG_Platform_Technical_Brief.pdf.
Large file pushes (>1MB): use Python urllib not curl (argument list too long error).
Blog post truncation bug (fixed): original markdown converter stopped at horizontal rules (---). All posts now hand-built HTML to avoid this.

## Design System
Background: #07090f | Card: #0c1018 | Amber: #eca030 | Blue: #3aa0d8 | Green: #32d282
Text: #dde2f0 / #8898b8 / #4a5570 | Border: rgba(255,255,255,0.07)
Fonts: Syne (display/headings) | Space Grotesk (body) | Space Mono (labels/code/mono)
Hero headline: The supply chains that don't break aren't lucky. They're built differently.
Brand lead frame: value chain resilience. PMG is a capability, not the brand story.
Partner intelligence network (unnamed: Semantic Visions, Veridion, Total Materia, Supply Graph AI).

## File Structure (from repo root)
index.html - homepage
platform/index.html - platform parent (not in nav)
platform/proactive-resilience/index.html
resources/renesas-case/index.html
resources/magnesium-case/index.html
resources/PMG_Platform_Technical_Brief.pdf
blog/index.html
blog/posts/five-disruptions-supplier-tools-cannot-predict/index.html
blog/posts/ford-mit-q4-problem-material-depth/index.html
blog/posts/cross-cutting-context-objects-explainability/index.html
blog/assets/xai/Diagram1_ExplanationContext_Flow.html
blog/assets/xai/Diagram2_ExplanationStep_Anatomy.html
ReusableArtifacts/Platform_Layered_Architecture/ECC_Stack_Diagram_Web.html
Technical Brief/PMG_Platform_Technical_Brief.html

## Critical Working Style Notes
Sriram is direct. Discuss strategy before executing on anything ambiguous.
Targeted edits only. Never regenerate entire files from scratch.
Always verify JS syntax before pushing. Python string escaping has broken async/await and backtick template literals multiple times in this session.
Confirm build after every push: check Actions runs for completed|success.
Large files: Python urllib not curl.
Start each session: full repo tree inventory via GitHub tree API with recursive=1 parameter.
Platform parent /platform is intentionally not in nav. Do not delete it.
Email MX and all Microsoft/Teams DNS records: DO NOT TOUCH under any circumstances.