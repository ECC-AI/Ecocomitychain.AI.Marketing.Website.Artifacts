# Wix Implementation Tasks
**Two pending items to complete after current build session.**

---

## Task 1 — Replace flat diagram in Technical Brief (P4) with screenshot

### Step 1: Take the screenshot
1. Open `ECC_Stack_Diagram_Web.html` in Chrome
2. Press `F12` to open DevTools
3. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
4. Type `Capture full size screenshot` → press Enter
5. Chrome saves a PNG to your Downloads folder
6. **Optional — Retina quality:** Before capturing, open DevTools → click the device toolbar icon → set Device Pixel Ratio to 2. This gives a 2x resolution PNG, sharper at all screen sizes.

### Step 2: Upload to Wix Media Library
1. Log in to Wix → go to **Media Manager** (left sidebar or via Site → Media)
2. Click **Upload Media** → select the PNG from Downloads
3. Once uploaded, click the image → click **Copy URL** (or right-click → Copy Link)
4. The URL will look like: `https://static.wixstatic.com/media/[filename].png`

### Step 3: Insert into the Technical Brief HTML
1. Open `PMG_Platform_Technical_Brief.html` in a text editor
2. Find this comment on Page 4 (search for `af-wrap`):
   ```html
   <div class="af-wrap">
   ```
3. Replace the entire `af-wrap` div block with:
   ```html
   <img
     src="PASTE_WIX_URL_HERE"
     alt="ECC Intelligence Architecture — four intelligence layers on one material graph"
     style="width:100%; border-radius:8px; display:block; margin:0 0 20px;"
   />
   ```
4. Save the file, re-export to PDF via Chrome → Print → Save as PDF (check Background graphics)

---

## Task 2 — Email gate for Platform Technical Brief download

### What to build
A Wix form page that collects an email address before allowing the PDF download.
Flow: Download button on main page → Form page (email input) → Submit → Thank-you page with PDF download link.

### Step 1: Upload the PDF
1. Export `PMG_Platform_Technical_Brief.html` to PDF via Chrome:
   - `Ctrl+P` → Destination: **Save as PDF** → check **Background graphics** → Save
2. Go to Wix **Media Manager** → Upload the PDF
3. Copy the PDF URL after upload

### Step 2: Create the Thank-You page
1. In Wix Editor → **Pages** → **Add Page** → name it `brief-thankyou` (set to hidden/not in nav)
2. Add a text element: *"Thank you. Your download will start shortly."*
3. Add a **Button** element → label: `Download Platform Brief →`
4. Set button link: **Web Address** → paste the Wix Media PDF URL
5. Publish the page, copy its URL (e.g. `https://www.ecocomitychain.ai/brief-thankyou`)

### Step 3: Create the form page
1. **Pages** → **Add Page** → name it `get-the-brief` (set to hidden/not in nav)
2. Add a **Wix Forms** element (from Add Elements → Contact & Forms)
3. Configure the form:
   - Keep only the **Email** field (delete all others)
   - Set Submit button label: `Get the Brief →`
   - Under **Form Settings → Submit Message**: change to **Redirect to URL**
   - Paste the `brief-thankyou` page URL
4. Under **Form Settings → Submissions**: submissions go to **Wix Contacts** automatically
5. **Optional — email the link instead of showing it:** In **Wix Automations** → create a new automation:
   - Trigger: Form submitted (select this form)
   - Action: Send email → paste your template with the PDF download link
   - This is more professional but requires setting up an email template

### Step 4: Connect the Download button on the main page
1. Open the `/platform/proactive-resilience` page in Wix Editor
2. Find the **Download Brief →** button in the download band section
3. Set its link to: **Web Address** → `https://www.ecocomitychain.ai/get-the-brief`
4. Publish

### Notes
- All form submissions are stored in **Wix Contacts** automatically — no additional setup needed
- To export the email list later: Wix Contacts → Export
- The redirect approach (Step 3) is simpler. The email approach (Step 3 Optional) is better for tracking and lets you add a follow-up sequence later.
- Both pages (`get-the-brief` and `brief-thankyou`) should be set to **not appear in navigation** in Page Settings

---

## Task 3 — Upload platform screenshots for homepage carousel

### Screenshots to upload (5 images)
These are from the synthetic BEV model value chain. All safe to publish publicly — no real customer data.

| Filename to use | Source image | Carousel caption tag |
|---|---|---|
| `pmg-tree.png` | PMG_Supplier_Material_Risk_GraphView.png | Full Supply Network — 8 Levels Deep |
| `diamond-niobium.png` | Material_Diamond_Type_B_GraphView.png | Diamond Pattern Detection — Material Node |
| `supplier-detail-xai.png` | Supplier_Risk_DetailsView.png | Deep-Tier Supplier — XAI Risk Explanation |
| `world-map-diamond.png` | Supplier_Diamond_Risk_WorldMapView.png | Geographic Concentration — Supplier Diamond Formation |
| `tariff-ndfeb.png` | Tariff_Risk_GraphView_1.png | Tariff Risk — NdFeB Supply Chain |

### Step 1: Upload to Wix Media
1. Log in to Wix → **Media Manager** → **Upload Media**
2. Upload all 5 PNGs with the filenames listed above (or note the Wix-assigned URLs)
3. For each uploaded image: click image → **Copy URL**
4. URLs will look like: `https://static.wixstatic.com/media/[hash]_[filename].png`

### Step 2: Update carousel image paths in homepage HTML
1. Open `index.html` (the homepage file)
2. Find the `const slides = [` array in the `<script>` block near the bottom
3. Replace each `src:` value with the corresponding Wix Media URL:
   - `'/assets/platform/pmg-tree.png'` → `'https://static.wixstatic.com/media/[your-url]'`
   - `'/assets/platform/diamond-niobium.png'` → `'https://static.wixstatic.com/media/[your-url]'`
   - `'/assets/platform/supplier-detail-xai.png'` → `'https://static.wixstatic.com/media/[your-url]'`
   - `'/assets/platform/world-map-diamond.png'` → `'https://static.wixstatic.com/media/[your-url]'`
   - `'/assets/platform/tariff-ndfeb.png'` → `'https://static.wixstatic.com/media/[your-url]'`
4. Save and re-upload the updated `index.html` to the Wix HTML widget on the homepage

### Notes
- The carousel is triggered by the "See the platform in action" button on the Proactive Resilience card
- Images display with `object-fit: contain` on a dark (#07090f) background — no cropping
- Caption text and tags are already written in the slides array — no changes needed unless you want to adjust wording
- The 6th screenshot (Tariff_Risk_GraphView_2.png — the detail panel) can be added as a 6th slide if desired: add a new object to the slides array following the same pattern

---

## Task 4 — Integrate temporal co-optimisation animation into homepage

### What this is
An interactive HTML animation explaining ECC's temporal co-optimisation capability — three-period supply recovery solved as one integrated problem. Built as a standalone widget; needs to be embedded in the homepage reactive resilience section.

### Integration approach
The animation is triggered by a "See how it works" button on the Reactive Resilience card (same pattern as the "See the platform in action" button on the Proactive card). It opens in a modal overlay.

### Step 1: Add the trigger button to the reactive card
1. Open `index.html` in a text editor
2. Find this line in the reactive segment:
   ```html
   <a class="seg-link" href="/platform">Explore Reactive Resilience →</a>
   ```
3. After that line (before the closing `</div>` of the reactive segment), add:
   ```html
   <button class="see-platform-btn" style="border-color:rgba(58,160,216,0.25);color:#3aa0d8;background:rgba(58,160,216,0.08);" onclick="openTemporalModal()">
     <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/><polygon points="5,4 9,6.5 5,9" fill="currentColor"/></svg>
     See temporal co-optimisation
   </button>
   ```

### Step 2: Add the temporal modal
The full animation HTML (from the separately generated artifact) needs to be embedded inside a modal overlay div in the homepage, following the same pattern as the screenshot carousel modal. Add this block after the `platformModal` div:

```html
<div class="modal-overlay" id="temporalModal">
  <div class="modal-box" style="max-width:700px;">
    <div class="modal-header">
      <span class="modal-title">Reactive Resilience — Temporal Co-Optimisation</span>
      <button class="modal-close" onclick="closeTemporalModal()">✕</button>
    </div>
    <div style="padding:24px;">
      <!-- PASTE the animation HTML content here (from the temporal co-opt artifact) -->
      <!-- Everything from <div class="wrap"> to the closing </div> and <script> block -->
    </div>
  </div>
</div>
```

Then add these two JS functions to the script block:
```javascript
function openTemporalModal() {
  document.getElementById('temporalModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTemporalModal() {
  document.getElementById('temporalModal').classList.remove('open');
  document.body.style.overflow = '';
}
```

### Notes
- The animation defaults to ECC co-optimised view with phase rotation
- A "Compare with classical response" toggle is available but subtle — not the primary interaction
- The modal uses the same `.modal-overlay` and `.modal-box` styles already in the homepage CSS
- On mobile, the modal scrolls internally — no changes needed to CSS

---

*Prepared during ECC PMG website build session.*
