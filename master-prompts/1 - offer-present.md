# Offer Presentation Generator — Instructions for AI

Instructions for recreating the Kodara AI Product Strategy HTML presentation for any client, given their offer reference material.

**Reference implementation:** `alisa_presentation.html` in this folder.
**Design system:** `DESIGN_SYSTEM.md` in this folder.

---

## 1. Overview

This presentation is a **single-file HTML strategy deck** that:

- Scrolls vertically through full-viewport "pages" in the browser
- Can be saved as a PDF via `Ctrl+P` / browser print (A4 landscape)
- Uses the **Kodara glass-morphism design system** (see `DESIGN_SYSTEM.md`)
- Contains **all** content from the offer file — nothing should be omitted
- Targets the client (Alisa, etc.) as the reader, not the end customer

The offer file typically contains two audience analyses (B2B + B2C) with matching product concepts, pricing, belief ladders, email sequences, social posts, and packaging. Each audience gets its own full section in the presentation.

---

## 2. Source Material Structure

The offer file follows this repeating pattern (once per audience):

```
CONTEXT IDENTIFICATION
  1. The client and their business
  2. Their audience
  3. The repetitive work the audience does
  4. What the audience already does well
  5. The client's credibility
  6. Existing products/services
  7. Audience's current frustrations and alternatives
  8. Current market conditions

PART 1: AI PRODUCT IDEATION
  - Product concept
  - Who it's for
  - What it does (8 capabilities with detailed parentheticals)
  - What makes it different from generic AI (7 differentiators)
  - The manual alternative
  - The "I need that" moment

PART 2: THE BELIEF LADDER
  1. Motivation — Pain (with nested sub-bullets and stats)
  2. Pointing — The AI-powered solution concept
  3. Selling — The specific product pitch

PART 1: PRICING STRATEGY
  - Recommended price + "why this number"
  - Price anchor comparisons
  - Payment plan + rationale
  - Launch pricing + strategy

PART 2: WARM LEAD MESSAGING
  2A: 7-email launch sequence (subject, belief, core argument, CTA each)
  2B: Social media talking points (quote, core point, belief, format each)

PART 3: PACKAGING
  - The core product
  - Recommended inclusions (6 items with descriptions)
  - What to leave out (3 items with rationale)
  - The complete product (summary paragraph)
```

---

## 3. Page-by-Page Structure

The presentation should map the source material to pages in this order. If an offer file has 2 audiences, both get the full treatment. Adapt the page count to fit the content — more data means more pages.

### Opening (shared across audiences)

| Page | Title | Content source | Layout |
|------|-------|---------------|--------|
| 1 | **Cover** | Client name, product name, subtitle, 4 credibility stats | Centered, hero-orb icon, scroll cue, g4 stat grid |
| 2 | **Credibility** | Context section 5 (credibility) — ALL bullet points | sec-num + h2 + lead + g2 grid of tint cards |
| 3 | **Existing Products & Market** | Context sections 6 + 8 | g2: left = ladder-row product list, right = glass card with bullet list of market conditions |

### Per-Audience Block (repeat for each audience)

| Page | Title | Content source | Layout |
|------|-------|---------------|--------|
| N+0 | **Audience Divider** | Context section 2 (audience description) | Centered chip label ("Audience 1"), h1 name, lead description, secondary audience note |
| N+1 | **Repetitive Work + Strengths** | Context sections 3 + 4 | g2: left glass = repetitive work bullet list, right glass-subtle = strengths list |
| N+2 | **Frustrations & Failed Alternatives** | Context section 7 | g2: left glass = alternatives tried (muted bullets), right glass-subtle = core frustrations |
| N+3 | **The Pain** | Belief Ladder level 1 + "I need that" moment | sec-num + h2 + lead + g3 stat cards + g2 (tint with pain sub-bullets + moment quote) |
| N+4 | **The Solution** | Product ideation "what it does" (all 8 items with detail) | g2: two glass cards, 4 items each with feature-icon lists |
| N+5 | **Differentiation** | "What makes it different" + manual alternative | g2: glass-subtle (generic AI) vs glass (Alisa's AI) comparison columns + tint manual-alternative block |
| N+6 | **Belief Ladder** | All 3 belief levels with sub-bullets | g3: three cards (glass-subtle for pain, glass for pointing, glass with brand border for selling) |
| N+7 | **Pricing Strategy** | Price, anchors, rationale, payment plan, launch | price-grid: left = featured price card with inclusions, right = tint card with anchor comparisons + rationale |
| N+8 | **Package Details** | Inclusions (detailed) + exclusions + complete product | g2 of tint cards for 6 inclusions, then g2: exclusions (red-left-border tint) + complete product (moment card) |
| N+9 | **Launch Emails 1–4** | Emails with subject, argument, CTA | g2 of email-block cards (2 per column) |
| N+10 | **Launch Emails 5–7** | Remaining emails | g2 of email-block cards |
| N+11 | **Social Media** | All posts with quote, belief tag, format | g2 of social-card stacks |

### Closing (shared)

| Page | Title | Content | Layout |
|------|-------|---------|--------|
| Last | **Closing** | Product summaries for both audiences, CTA buttons | Centered hero-orb, h2, lead, g2 summary tint cards, button row |

---

## 4. Design System Rules

Follow `DESIGN_SYSTEM.md` strictly. Key rules summarized:

### Colors
- **ALL grays are alpha-based:** `rgba(26,26,26, <alpha>)` — never flat hex grays
- Body text: `rgba(26,26,26, 0.60)` — never solid black
- High-emphasis text: `rgba(26,26,26, 0.80)`
- Brand green `#106844` used **only in alpha form**: 0.06 for bg, 0.08 for hover, 0.92 for text
- Borders: `rgba(26,26,26, 0.06)` or `0.09` — barely visible
- Modal overlays: 80% white, not black

### Typography
- Font: `Instrument Sans` from Google Fonts (variable, 400–700)
- Must apply `font-variation-settings: 'wdth' 100` on body
- Default weight: 500 for UI, 400 for body, 600 for labels/headers
- No uppercase transforms except section numbers and tags

### Surfaces
- Glass cards: translucent white + `backdrop-filter: blur()` — ALWAYS pair transparency with blur
- Three card tiers:
  - `.glass` — 75% white, blur 14px, shadow, border (primary cards)
  - `.glass-subtle` — 28% white, blur 6px, border only (secondary/comparison)
  - `.tint` — 4% black, no blur (settings-style cards, package items)
- Multi-layer shadows (5 layers, mostly invisible) — use exact values from design system

### Decorative Orbs
- Each page gets 1–2 decorative orbs: large blurred circles with `rgba(16,104,68, 0.04–0.06)` or `rgba(0,180,212, 0.03–0.04)`
- Position absolutely, filter blur 90px, pointer-events none
- Vary placement per page (alternate corners/sides)

---

## 5. Typography Scale (30% larger for readability)

These are the production values — the 30% scaling is already baked in:

| Element | Size | Line Height | Weight | Color |
|---------|------|-------------|--------|-------|
| `h1` | 70px | 80px | 400 | alpha-light-900 |
| `h2` | 50px | 60px | 400 | alpha-light-900 |
| `h3` | 29px | 38px | 500 | alpha-light-900 |
| `h4` | 20px | 28px | 600 | alpha-light-900 |
| `p` (body) | 20px | 34px | 400 | alpha-light-600 |
| `.lead` | 22px | 36px | 400 | alpha-light-600 |
| `.sec-num` | 14px | — | 600 | alpha-light-300 |
| `.chip` | 16px | — | 600 | alpha-brand-950 |
| `.fl li` (feature list) | 18px | 28px | 500 | alpha-light-600 |
| `.fl.sm li` (compact list) | 17px | 26px | 500 | alpha-light-600 |
| `.bl li` (bullet list) | 18px | 28px | 400 | alpha-light-600 |
| `.stat-num` | 57px | 66px | 400 | alpha-light-900 |
| `.stat-label` | 17px | 24px | 500 | alpha-light-500 |
| `.price-big` | 60px | 68px | 400 | alpha-light-900 |
| `.email-subj` | 18px | — | 600 | alpha-light-900 |
| `.email-arg` | 17px | 26px | 400 | alpha-light-600 |
| `.email-cta` | 15px | — | 600 | alpha-brand-950 |
| `.email-belief` | 14px | — | 600 | alpha-light-300 |
| `.social-card .sq` | 17px | 26px | 400 | alpha-light-900 (italic) |
| `.social-card .sm-meta` | 14px | — | 600 | alpha-light-400 |
| `.social-card .sm-format` | 14px | — | 500 | alpha-brand-950 |

Max content width: `1200px`. Page padding: `100px 48px`.

---

## 6. Component Reference

### Page wrapper
```html
<div class="pg" id="p01">
  <div class="orb" style="width:500px;height:500px;background:rgba(16,104,68,0.06);top:8%;left:-6%"></div>
  <div class="pg-inner">
    <!-- content -->
  </div>
  <div class="pf">Client Name — AI Product Strategy · Page 1</div>
</div>
```
- Every page gets `class="pg"` with a unique `id`
- Every page gets a `.pf` footer (hidden on screen, visible in print)
- 1–2 decorative `.orb` elements per page

### Section number
```html
<div class="sec-num rv">01 — The problem</div>
```

### Stat card grid
```html
<div class="g3">
  <div class="glass-subtle stat">
    <div class="stat-num">$62.5k</div>
    <div class="stat-label">Description<br>second line</div>
  </div>
  <!-- more stats -->
</div>
```
- Use g3 for 3 stats, g4 for 4 stats

### Moment/Quote card
```html
<div class="moment">
  <div class="moment-tag">The "I need that" moment</div>
  <p>"Quoted text in italics..."</p>
</div>
```

### Feature list (with icons)
```html
<ul class="fl sm">
  <li>
    <span class="fi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/>
    </svg></span>
    Feature description text
  </li>
</ul>
```
- Use sparkle SVG for feature items, checkmark SVG for pricing inclusions
- Checkmark SVG: `<path d="M20 6 9 17l-5-5"/>`

### Bullet list (simple)
```html
<ul class="bl">
  <li>Item text</li>
</ul>
```
- Add class `muted` for de-emphasized lists (failed alternatives, exclusions)
- Bullets are auto-generated via `::before` pseudo-element

### Comparison columns
```html
<div class="g2" style="gap:28px">
  <div class="glass-subtle comp-col comp-generic">
    <h4 style="color:var(--alpha-light-400)">Generic AI says...</h4>
    <ul><li>Item</li></ul>
  </div>
  <div class="glass comp-col comp-alisa">
    <h4 style="color:var(--alpha-brand-950)">Client's AI says...</h4>
    <ul><li>Item</li></ul>
  </div>
</div>
```

### Pricing card (featured)
```html
<div class="price-card feat">
  <div class="chip">Founding member</div>
  <div class="price-big">$397</div>
  <p class="price-note"><span class="strike">$497</span> — after launch</p>
  <p class="price-plan">or 3 payments of $179</p>
  <div class="divider"></div>
  <ul class="fl sm"><!-- inclusions with checkmark icons --></ul>
</div>
```

### Email block
```html
<div class="email-block">
  <div class="email-belief">Email 1 — Pain</div>
  <div class="email-subj">"Subject line here"</div>
  <div class="email-arg">Core argument text.</div>
  <div class="email-cta">CTA: Call to action text</div>
</div>
```

### Social media card
```html
<div class="social-card">
  <p class="sq">"Post content in italics."</p>
  <div class="sm-row">
    <span class="sm-meta">Pain · Belief 1</span>
    <span class="sm-format">Text post</span>
  </div>
</div>
```

### Ladder row (product lineup / upsell path)
```html
<div class="ladder-row">
  <span class="ladder-label" style="color:var(--alpha-light-600)">Product name</span>
  <span class="ladder-val">$X/mo</span>
</div>
```
- Highlight active/new product with `color:var(--alpha-brand-950);font-weight:600`
- Use `font-style:italic;color:var(--alpha-light-400)` for in-development items

### Audience divider page
```html
<div class="pg" id="pXX" style="text-align:center">
  <div class="orb" style="width:500px;height:500px;background:rgba(16,104,68,0.05);top:30%;left:50%;transform:translateX(-50%)"></div>
  <div class="pg-inner" style="text-align:center">
    <div class="chip rv" style="margin-bottom:28px">Audience 1</div>
    <h1 class="rv d1">Audience Name</h1>
    <p class="lead rv d2" style="margin:24px auto 0;color:var(--alpha-light-500)">Audience description.</p>
    <p class="rv d3" style="margin-top:16px;font-size:18px;color:var(--alpha-light-400)">Secondary audience note.</p>
  </div>
</div>
```

### Belief ladder (3-column)
```html
<div class="g3" style="gap:24px">
  <div class="glass-subtle" style="padding:28px">
    <h4 style="color:var(--alpha-light-400)">1 — Pain</h4>
    <ul class="bl" style="gap:10px;margin-top:12px">
      <li style="font-size:16px;line-height:24px">Pain point</li>
    </ul>
  </div>
  <div class="glass" style="padding:28px">
    <h4 style="color:var(--alpha-brand-950)">2 — Pointing</h4>
    <ul class="bl"><!-- items --></ul>
  </div>
  <div class="glass" style="padding:28px;border-color:var(--alpha-brand-200)">
    <h4 style="color:var(--alpha-brand-950)">3 — Selling</h4>
    <ul class="bl"><!-- items --></ul>
  </div>
</div>
```

---

## 7. Interactive Features

### Scroll reveal
- Add `rv` class to any element that should fade in on scroll
- Add delay classes `d1` through `d5` for staggered reveals (80ms increments)
- JavaScript `IntersectionObserver` adds `vis` class when element enters viewport

### Navigation dots
- Fixed right sidebar, auto-generated from all `.pg[id]` elements
- Active dot elongates and turns brand green
- Click to smooth-scroll to that page

### Save as PDF button
- Fixed top-right, glass-morphism styled
- Calls `window.print()` on click
- Hidden in print via `@media print`

---

## 8. Print / PDF Styles

Critical rules in `@media print`:

```css
@page { size: A4 landscape; margin: 0; }
```

- Force `print-color-adjust: exact` on html, body, and all glass/tint/colored elements
- All `.rv` elements: `opacity:1; transform:none; transition:none` (force visible)
- Hide: `.nav`, `.scroll-cue`, `.save-pdf`
- Show: `.pf` (page footers)
- Pages: `min-height:0; height:auto; padding:40px 48px; page-break-after:always`
- Orbs: reduce to `opacity:0.6`
- Slightly reduce h2 to `42px` for print fit

---

## 9. Content Mapping Checklist

When building from a new offer file, ensure EVERY item below is included. Check off as you go:

### Context (per audience)
- [ ] Full audience description with demographics, psychographics, secondary audience
- [ ] All repetitive work items (typically 10)
- [ ] All "what they already do well" items (typically 8)
- [ ] All frustrations listed
- [ ] All failed alternatives with reasons why they failed
- [ ] All market conditions

### Product (per audience)
- [ ] All capabilities with **full parenthetical descriptions** (time durations, specific outputs, number of exercises, rationale)
- [ ] All differentiators from generic AI (typically 7)
- [ ] Manual alternative with specific costs and limitations
- [ ] "I need that" moment quote

### Belief Ladder (per audience)
- [ ] All Pain sub-bullets with specific numbers and stats
- [ ] All Pointing sub-bullets with time savings, reinvestment options
- [ ] All Selling sub-bullets with credibility proof points

### Pricing (per audience)
- [ ] Recommended price
- [ ] "Why this number" reasoning (every bullet)
- [ ] All price anchor comparisons with specific dollar amounts
- [ ] Payment plan details + psychological rationale
- [ ] Launch pricing + founding member mechanics + raise-price strategy

### Package (per audience)
- [ ] All inclusions with **full descriptions** (format, duration, what it covers, why it matters)
- [ ] All exclusions with **rationale** (what tier it belongs to, why including it would be harmful)
- [ ] "The complete product" summary paragraph

### Launch Emails (per audience, typically 7)
- [ ] Subject line
- [ ] Belief ladder level label
- [ ] Core argument (full text)
- [ ] CTA (specific action)

### Social Media (per audience, typically 7–8)
- [ ] Full post text/quote
- [ ] Core point / belief label
- [ ] Suggested format (text post, carousel, video, story poll, etc.)

### Shared
- [ ] Full credibility section (all achievements, certifications, documented results, names)
- [ ] Complete existing product lineup with all price points
- [ ] In-development products noted as such
- [ ] Market conditions (all items)

---

## 10. Naming and File Conventions

- Filename: `{clientname}_presentation.html` (lowercase, underscores)
- Title tag: `{Client Name} — AI Product Strategy`
- Page footers: `{Client Name} — AI Product Strategy · Page {N}`
- Closing footer: `Strategy prepared by Kodara`
- Cover chip: `AI Product Strategy`
- Audience divider chips: `Audience 1`, `Audience 2`

---

## 11. Adaptation Notes

### Single-audience offers
If the offer file only covers one audience, skip the audience divider pages and reduce the page count accordingly. The structure remains the same minus the repetition.

### Different product types
The page structure works for any AI product offer — coaching, SaaS, community, etc. Adapt the solution page headers and differentiation framing to match the product type.

### Custom credibility
The cover stats (4-grid) should highlight the client's most impressive numbers. Look for: years of experience, number of students/clients, certifications, content pieces created, methodology steps, etc. Pick the 4 most impactful.

### Pricing variations
- One-time purchases: use `$XXX` format
- Subscriptions: use `$XX/mo` with `<span>` for the `/mo` suffix
- Payment plans: show below price as `.price-plan`
- Annual options: show as `.price-plan` below the subscription price

### Icons
Two SVG icons are used throughout:
1. **Sparkle/sun** — for feature list items (what the product does)
2. **Checkmark** — for pricing inclusion lists

Use the sparkle for capability descriptions, the checkmark for "what's included in the package."

---

## 12. Step-by-Step Build Process

1. **Read the offer file** completely. Identify: number of audiences, client name, all sections present.
2. **Copy the CSS and JS** from the reference implementation (`alisa_presentation.html`). The styles are fully reusable — only swap the font link if using a different font.
3. **Build the cover page** with the client's name, product name, and 4 best credibility stats.
4. **Build the credibility page** with ALL achievement bullets from the offer.
5. **Build the existing products + market page** with the full product ladder and all market conditions.
6. **For each audience**, build the full 12-page block in order: divider → repetitive work → frustrations → pain → solution → differentiation → belief ladder → pricing → package → emails (2 pages) → social media.
7. **Build the closing page** with both product summaries and CTA buttons.
8. **Verify completeness** against the checklist in Section 9. Every item from the offer file should appear somewhere in the presentation.
9. **Test PDF output** via `Ctrl+P` → Save as PDF → A4 Landscape. Verify backgrounds render, page breaks are clean, and footers appear.
