# Session Handoff — Zepto "Meet Your Pet, Unlock Rewards"

**Read this first in any new session.** This project has zero durable memory between
sessions except this file + the auto-memory notes at
`C:\Users\aarad\.claude\projects\C--Tata1mg-assignment\memory\` (start with `MEMORY.md`
there, then `zepto-pet-rewards-project.md`). This file is the detailed technical handoff;
memory is the lighter-weight index. Read both.

---

## 1 · What this project is

TATA 1mg Product Designer 1 take-home assignment. Brief: *"Design an experience where
users can unlock pet-related rewards by uploading a picture of their pet."* App chosen =
**Zepto** (quick-commerce). Deliverable is being built as **three phases**, of which the
first two (lo-fi, hi-fi wireframes) are now essentially frozen/done, and the project has
moved into **Phase 3: the case study**.

The user is meticulous, iterates by screenshot (pastes a render, tells me exactly what's
wrong), and corrects overcorrections quickly. Everything lives in real files on disk at
`C:\Tata1mg assignment\` — there is no Figma file that's the source of truth; **HTML/CSS
files are the source of truth**.

---

## 1.5 · MAJOR UPDATE (2026-07-20, done in Antigravity, not Claude Code)

`case-study/index.html` was substantially rebuilt in Antigravity while Claude Code's
session tokens were refreshing — **read the live file before trusting anything below in
§2-§8 about its structure**, several details there are now stale. What changed:

- Top-level view renamed **"Research" → "Overview"** (`id="view-overview"`,
  `data-view="overview"`; floating toggle button text is now "Overview"/"Prototype").
- The Overview view is no longer a hide/show single-panel scaffold — it's now **one
  continuous scrollable document** with a **scrollspy sidebar** (`#structure-nav` +
  `IntersectionObserver`, click = smooth-scroll to panel + `-40px` offset, not
  show/hide). The top-level Overview↔Prototype split is still strict hide/show (never
  share a scroll — that requirement is untouched).
- Sidebar currently has **9 phases**, fully written: `01 Overview`, `02 Opportunity`,
  `03 UX Audit` (audits 3 real Zepto campaigns — Match Hangout/Bling Mode On/Play & Win —
  against screenshots in `assets/`), `04 Current Flow` (includes a real Zepto home-feed
  scroll screenshot + numbered annotations, `assets/home_scroll_overview.png`),
  `05 User Personas`, `06 Visual Direction`, `07 Final Flow` (a step-by-step flow
  diagram), then **screen-by-screen breakdowns** starting `08 Entry (Home Feed)` and
  `09 Campaign Landing`.
- **The screen-breakdown pattern** (used for 08/09, to be repeated for the remaining
  screens): a `.diagram-split-layout` 2-column grid. Left = `.wireframe-container`
  wrapping a `.phone-shell > .phone-frame > iframe src="../lofi/0X-....html"` (a LIVE
  iframe into the actual lo-fi file, not a screenshot — deliberate, so future edits to
  the lo-fi HTML auto-reflect here) plus an absolute-positioned `.wireframe-overlay`
  containing numbered `.overlay-highlight` red-dashed boxes pinpointing specific regions
  (hand-placed `top/left/width/height` px values per screen). Right column = eyebrow
  "SCREEN 0X" + title + intro paragraph, then 2-3 "NN — Decision Title" blocks (paragraph
  + `.comparison-list` bullets), a `.challenge-card` "Why...?" callout, sometimes an
  `.info-card` "Microcopy Design" box.
- **Remaining work (in progress, going screen-by-screen with user dictating content,
  ChatGPT co-writing)**: add breakdown panels `10` onward for `03a-upload-empty`,
  `03a-i-photo-source`, `03b-upload-filled`, `03c-upload-second-pet`, `04-meet`,
  `05-reveal`, `06-picks`, `07-cart-unclaimed` — same pattern as 08/09. Each new panel
  needs a matching `<button class="structure-item" data-phase="...">` added to
  `#structure-nav` AND a matching `<div class="research-panel" data-phase="...">` added
  to `#research-content`, in the same order (no JS registration needed beyond that, the
  scrollspy/click logic already generically walks all `.research-panel`/`.structure-item`
  pairs). **Do not invent screen rationale unprompted — wait for dictated content per
  screen**, per standing working-style preference.
- Prototype view itself (phone frame + live `hifi/01-entry.html` iframe + restart button)
  is untouched.
- File is now ~3150 lines — read in chunks (it exceeds a single Read call's output cap).

---

## 2 · Current phase — READ THIS, it's what you'll be asked to continue

The user just redirected scope. Verbatim intent:

> We're done spending time on lo-fi/hi-fi wireframes. Now build TWO new deliverables:
> 1. **An interactive HTML "artifact"** — a case study page with two sections:
>    - **Research** section, broken into **phases** (the user will dictate phase content
>      turn by turn — do not invent research phases, wait to be told)
>    - **Prototype** section — the actual screens, **live and clickable**, so a viewer can
>      click through the real flow and feel it (not just look at static screenshots)
> 2. **A second, separate static HTML file** meant to be **imported into Figma** —
>    information-dense, NOT interactive, a documentation-style layout (unlike the artifact).

**I was told to start with the artifact and "wire the whole prototype" into it.** My plan
(confirmed implicitly, then interrupted for this handoff):

- Build `case-study/index.html` (directory created, file NOT yet written) containing:
  - Header/title for the case study
  - **Research section**: empty phase-slot scaffolding, ready to receive content the user
    will supply
  - **Prototype section**: a phone-frame mockup (390×844, matches `shared/device.css`)
    containing a single `<iframe>` pointed at `hifi/01-entry.html`
- Make the flow **actually clickable** by adding real `<a href="...">` navigation directly
  into the nine hi-fi screen files (converting existing `<button>`/`<span>`/`<div>` CTAs
  into `<a>` tags with matching classes — CSS still applies fine, `.btn` etc. don't rely on
  tag name). Since all screens are static files in the same folder, plain anchor tags
  inside the iframe navigate the iframe natively — no JS routing needed.

### Flow graph being wired (confirmed with user before starting)

```
01 (banner tap)              → 02
02 back → 01 · primary CTA   → 03a
03a back → 02 · photo tap    → 03a-i
03a-i (sheet) both rows      → 03b
03b back → 03a · Continue    → 04       · "+ Add another pet" → 03c
03c back → 03b · photo/Continue/"That's everyone" → 04   (simplified — no dedicated
                                                             second-pet sheet; static HTML
                                                             has no state to disambiguate
                                                             which pet triggered 03a-i)
04 (no input) tap anywhere   → 05
05 X → 01 · CTA              → 06
06                            → terminal, no forward link
07 (cart edge case) "Unlock" → 03a   · back → 06
```

### Wiring progress — DONE (2026-07-20 session)

All 9 hi-fi screens are now wired with real `<a href>` navigation per the flow graph
above. Verified via `read_page` (href audit on every screen) + a headless-Edge visual
render.

| File | Status |
|---|---|
| `hifi/01-entry.html` | ✅ done — `.pw-cta` banner button `<a href="02-landing.html">` |
| `hifi/02-landing.html` | ✅ done — back `.cc` → `01-entry.html`; primary CTA → `03a-upload-empty.html` |
| `hifi/03a-upload-empty.html` | ✅ done — back `.cc` → `02-landing.html`; `.ph` → `03a-i-photo-source.html` |
| `hifi/03a-i-photo-source.html` | ✅ done — back `.cc` → `03a-upload-empty.html` (dismisses sheet); both sheet rows → `03b-upload-filled.html` |
| `hifi/03b-upload-filled.html` | ✅ done — back `.cc` → `03a-upload-empty.html`; Continue → `04-meet.html`; "+ Add another pet" → `03c-upload-second-pet.html` |
| `hifi/03c-upload-second-pet.html` | ✅ done — back `.cc` → `03b-upload-filled.html`; `.ph` / Continue / "That's everyone" all → `04-meet.html` (simplified, no dedicated second sheet) |
| `hifi/04-meet.html` | ✅ done — full-screen invisible `<a class="tap-overlay">` (position:absolute; inset:0; z-index:2) → `05-reveal.html` |
| `hifi/05-reveal.html` | ✅ done — X `.cc` → `01-entry.html`; CTA → `06-picks.html` |
| `hifi/06-picks.html` | ✅ done — terminal screen; back-arrow `.head-ic` → `01-entry.html` (optional, added for consistency) |
| `hifi/07-cart-unclaimed.html` | ✅ done — "Unlock" `.cta-pink` → `03a-upload-empty.html`; back `.cc` → `06-picks.html` (second `.cc`, the heart/wishlist icon, left alone — not navigation) |

**Bug found + fixed during this pass**: converting `<button>`/`<div class="cc">` to `<a>`
exposed a latent issue — there was no `a { text-decoration: none }` reset anywhere in
`shared/tokens-hifi.css`, so every anchor painted the browser-default underline through
its descendant text (confirmed via `getComputedStyle` — the underline paints from the
anchor ancestor regardless of the descendant's own `text-decoration: none` computed
value). This affected the **already-shipped 01/02 screens too**, not just the newly
wired ones — it was just never visually caught because nobody had zoomed in on link
text. Fixed at the root: added `a { text-decoration: none; color: inherit; }` right
after the `*` reset in `shared/tokens-hifi.css` (line ~69), so it's inherited by every
hi-fi screen automatically. Verified via a cache-busted stylesheet reload in the Browser
pane (computed `text-decoration-line: none` on `.ph`, `.cc`, `.btn`, `.row` anchors) and
a fresh headless-Edge screenshot of `03a-upload-empty.html`.

**`case-study/index.html` itself: not yet written.** Only `mkdir` was run to create the
folder. This is pending task #1 now (renumbered — see §8).

---

## 3 · File structure (current, annotated)

```
C:\Tata1mg assignment\
├── HANDOFF.md                 ← this file
├── index.html                 ← review harness (Lo-fi/Hi-fi toggle, iframe gallery of all screens)
├── lofi\                      ← Phase 1, greyscale wireframes — considered DONE, low priority now
│   ├── 01-entry.html
│   ├── 02-landing.html        ← updated for "Paw Parade" concept (dashed bg-export placeholder + live reward-pack card + CTA)
│   ├── 03a-upload-empty.html
│   ├── 03a-i-photo-source.html
│   ├── 03b-upload-filled.html
│   ├── 03c-upload-second-pet.html
│   ├── 05-reveal.html         ← updated for Paw Parade (headline removed — baked into future bg image; equal-height cards) — ⚠️ did NOT get the later "move cards down 32-40px + remove heart divider" fix that hi-fi got. Minor inconsistency, low priority per user's "not wasting time on lo-fi" pivot, but flag if asked.
│   └── (06-picks, 07-cart-unclaimed exist but weren't touched in the Paw Parade pass)
├── hifi\                      ← Phase 2, polished screens — PRIMARY FOCUS for the prototype section
│   ├── 01-entry.html          ← "Paw Parade" full art: home feed, campaign-skinned header, store toggles (plain equal white cards — reverted from an abandoned "fused panel" experiment), category rail with real product photos, banner = assets/cardbg.png
│   ├── 02-landing.html        ← "Paw Parade" gift-box concept: assets/02-bg.png full-bleed background (headline+subhead baked into image), live reward-pack card + CTA overlay
│   ├── 03a-upload-empty.html  ← OLD hi-fi era (lavender shell, centered photo circle, bottom sheet) — NOT yet converted to generated-background pattern
│   ├── 03a-i-photo-source.html← OLD hi-fi era (bottom sheet)
│   ├── 03b-upload-filled.html ← OLD hi-fi era
│   ├── 03c-upload-second-pet.html ← OLD hi-fi era
│   ├── 04-meet.html           ← OLD hi-fi era (floating card deck, static — motion NOT yet authored)
│   ├── 05-reveal.html         ← "Paw Parade": assets/05-bg.png full-bleed (paw glow + clouds), headline/subhead baked into image, 3 equal-height reward cards, tagline+expiry live, heart divider REMOVED per latest fix
│   ├── 06-picks.html          ← OLD hi-fi era but WITH real product photography (Unsplash-sourced) in the PLP grid + category rail ("For Meesha"/"For Mike" as purple cutout tabs)
│   ├── 07-cart-unclaimed.html ← OLD hi-fi era, real Zepto cart anatomy reproduction
│   └── assets\                ← all images live here, flat folder
│       ├── cardbg.png         ← GPT-generated "Pawsome Rewards"→"Paw Parade" banner art, used in 01 (~358:252 ratio card)
│       ├── 02-bg.png          ← GPT-generated gift-box scene, 853×1844 (exact 390:844 device ratio), full-bleed in 02
│       ├── 05-bg.png          ← GPT-generated paw-glow/clouds scene, 853×1844, full-bleed in 05
│       ├── pet-hero.jpg       ← ⚠️ possibly ORPHANED — real Husky+cat photo (Unsplash, free-tier) used in an EARLIER version of 01's banner before the cardbg.png pivot. Check if still referenced before deleting.
│       ├── cat-daily-dog.jpg / cat-daily-cat.jpg       ← Daily Essentials category card (01)
│       ├── cat-treat-dog.jpg / cat-treat-cat.jpg       ← Treat Time category card (01)
│       ├── cat-toy-dog.jpg / cat-toy-cat.jpg           ← Toys & Play category card (01)
│       ├── cat-health-1.jpg / cat-health-2.jpg         ← Health & Care category card (01)
│       └── cat-groom-1.jpg / cat-groom-2.jpg           ← Grooming category card (01) — user uploaded real photos directly into this filename slot
├── shared\
│   ├── tokens-lofi.css        ← lo-fi greyscale design tokens
│   ├── tokens-hifi.css        ← hi-fi design tokens — SEE SECTION 4, colors changed multiple times this session
│   ├── device.css             ← 390×844 phone frame, status bar, home indicator (shared by everything)
│   ├── upload.css             ← lo-fi upload-flow (03a/03b/03c) shared styles
│   ├── upload-hifi.css        ← hi-fi upload-flow shared styles
│   └── zepto-language.md      ← full written design-language extraction from real Zepto screenshots (fonts, color roles, component inventory, illustration style). Read this before touching visual design.
└── case-study\                ← Phase 3, JUST CREATED, empty except this dir
    └── (index.html — NOT YET WRITTEN)
```

---

## 4 · Design tokens — current live values

`shared/tokens-hifi.css`:

```css
--font-ui:      "Figtree" (Google Fonts CDN)
--font-display: "Fraunces" (Google Fonts CDN)

--purple:       #9A16CA   /* identity & selection */
--purple-deep:  #7A14AC
--purple-tint:  #F3EBFF

--pink:         #FF2D78   /* ALL commerce/buy actions — updated this session from #FA3778 */
--pink-press:   #DB2767   /* derived proportionally from the new --pink */
--pink-tint:    #FFE9F0

--green:        #329537   /* money: prices, savings, ratings */
--amber:        #E58A1F   /* unlock conditions ("shop ₹X more") */
--blue:         #2364E5   /* neutral tags */
--plum:         #2B1E35   /* floating utility bars only */
```

Screen 01's atmosphere gradient (`.s01 .skin` in `hifi/01-entry.html`) has been changed
**three times** this session — currently:
```css
background: linear-gradient(180deg, #F3ECE1 0%, #F8F3EC 45%, #FFFFFF 100%);
```
This is a **warm cream**, not the original lavender. It was bumped to this warmer/deeper
value during an abandoned "fused store-selector panel" experiment (see §6) so a
same-color notch would still read against it. That store-selector experiment was fully
reverted, but **the atmosphere gradient itself was never reverted** — it's still this
cream value and the user has not objected, so treat it as current/accepted, not a bug.

Global pink CTA color role: **every buy/commerce action is pink**, never black, never
purple. Purple = brand identity/selection only.

---

## 5 · Settled decisions — DO NOT REOPEN

These come from the original assignment brief and are locked. Full detail lives in the
first auto-memory note; the essentials:

- **Reward structure**: Free delivery (hero, no minimum) + ₹50 off ₹250 + ₹150 off ₹500
  (supporting). NOT a tiered ladder. NOT reward-per-pet.
- **Household-level wallet, always.** Copy must NEVER read as belonging to one pet.
  Screen 05 headline stays "**Your pets' pack** is unlocked" / "packed **for Mike & Meesha**"
  — never singular "your pet's pack" or "your best friend," even when a generated
  reference image uses that phrasing. This was explicitly re-confirmed this session when
  a Paw Parade reference image used singular framing and I kept the plural/household copy.
- **Personas/cast**: Mike (Labrador, dog) + Meesha (indie cat). Always this household in
  every screen's example content.
- **Personalization is a union, not a primary** — a cat+dog household sees both cat and
  dog products, never forced to pick one pet.
- **One pet per photo**, progressive multi-photo upload. No group photos.
- **User-typed input always beats the model's breed guess.**
- **Indie/mixed is first-class**, never a fallback.
- Real brand logos (Whiskas/Drools/Pedigree/Royal Canin) now appear **baked into
  GPT-generated images** (`cardbg.png`) at the user's explicit direction — this is
  accepted for this portfolio case study, not something to flag or avoid going forward.

---

## 6 · Key learnings from this session (read before making visual changes)

### The store-selector saga (screen 01, storefront toggle row)
Took **5 full iterations** to get right, then got **reverted back to iteration 1**:
1. Purple underline bar under a white card — wrong
2. Transparent bordered pill — wrong
3. Solid colored "bump" fused to a shelf — wrong
4. Same-color-as-atmosphere transparent cutout with shadow-only definition — wrong (this
   was based on a literal written spec from the user, but still wasn't it)
5. Full "campaign panel" — a second background layer wrapping the whole store row + search
   + lens strip, with the selected store as a fused folder-tab handle — this matched a
   red-annotated reference image exactly, but the user then said **"revert back to this
   older version"** and pointed at an early plain screenshot.

**Current final state (do not redo this exploration): all four store toggles (zepto /
Monsoon / SuperMall / cafe) are equal, independent, raised white cards. The selected
store (`zepto`) is distinguished ONLY by purple brand-colored text — no special
background, shadow, fusion, or bump treatment at all.** This is intentionally simple.
Don't reopen it without new instruction.

**Lesson for next time**: for a specific real-app micro-interaction, ask for (or wait for)
a tight, annotated reference crop before iterating blind — general "make it look like the
real app" screenshots undershoot component-level fidelity and burn many turns.

### The illustration pivot (screens 01, 02, 05)
1. Started with **hand-built SVG cartoon illustrations** (dog+cat scenes) — user called
   this "terrible," nowhere close to a photoreal AI-generated reference they'd shown.
2. Moved to **real sourced photography** (free-tier `images.unsplash.com` only — **never**
   `plus.unsplash.com`, which is paid Unsplash+ and must never be used/linked). Verified
   each candidate visually before use; rejected several for showing real brand packaging
   (trademark risk) or wrong mood/setting.
3. User then started **generating full custom branded artwork via an external image
   model** ("Paw Parade" concept — headline, subhead, illustration, confetti, all
   composed together) and dropping the PNG into `hifi/assets/` under a filename they
   specify. **My job shifted to integration only**: place the image as either a bounded
   card background or a full-screen background (check the image's pixel dimensions — if
   they match ~390:844 almost exactly, it's a full-screen bg; if smaller/bounded, it's a
   card), then build ONLY the live interactive elements (buttons, cards with dynamic
   content, forms) as real HTML/CSS on top. **Do not generate more illustration myself
   going forward — this pattern (user generates art, I integrate + wire interactivity) is
   now standing practice.**

Two recurring integration bugs to watch for when doing this pattern again:
- **Card opacity**: a semi-transparent overlay card lets the background image "ghost"
  through messily. Use a solid/near-opaque fill (e.g. `#FBF8FE`) instead.
- **Vertical spacing math**: when a live content block (reward cards, CTA, trust line)
  sits below a tall background image inside a fixed 844px screen with a flex `.scroll`
  area, it's very easy to have the last element (usually an expiry/trust line) silently
  clipped by the scroll boundary. After any layout change here, always re-render and
  visually confirm the LAST element in the stack is actually visible, not just the first
  few.

### Rendering/verification workflow that actually works this session
The in-app Browser pane's `computer` screenshot tool was **flaky/hanging all session**
(unrelated `backdrop-filter` CSS also caused hangs early on — avoid `backdrop-filter` in
these screens). The reliable fallback used throughout:

```bash
SCRATCH="C:/Users/aarad/AppData/Local/Temp/claude/C--Tata1mg-assignment/bc6970ff-5125-4668-8db1-750beb6e805a/scratchpad"
rm -rf "$SCRATCH/edge-UNIQUENAME"
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --user-data-dir="$SCRATCH/edge-UNIQUENAME" --force-device-scale-factor=2 --window-size=470,900 \
  --virtual-time-budget=5000 --screenshot="$SCRATCH/OUTPUT.png" "http://localhost:8734/hifi/FILE.html"
```
Then `Read` the PNG. **Always use a fresh `--user-data-dir` per call** (reusing one
causes a silent failure needing one throwaway retry — this happened almost every single
render this session, budget for it). A static file server must be running:
`py -m http.server 8734` from the project root (probably still running in the
background from this session; if not, restart it — `file://` URLs are blocked in the
Browser pane).

### Global cleanup done this session
- Removed the share (↗) and sound (🔊) icon-pair chrome buttons from **every screen in
  both `lofi/` and `hifi/`** — chrome is now just a single back/X circle button
  everywhere. Also removed the now-dead `.cc-group` CSS rule from
  `shared/upload.css`, `shared/upload-hifi.css`, and `hifi/02-landing.html`'s inline
  style. **If you add a new screen, do not add the old two-button chrome pattern back.**
- Added a hairline stroke to screen 01's category cards (`.pcat`):
  `border: 1px solid rgba(122,20,172,.10)` — a soft purple tint so they don't blend into
  the near-white atmosphere from a distance.

---

## 7 · Figma

The Figma MCP was loaded and briefly used to inspect an existing lo-fi wireframe set the
user built manually in a Figma file (URL was
`https://www.figma.com/design/gksXfdQShOc94HytEQqAN6/Tata-1mg-Assignment`, node `423:339`
= a "wireframes" canvas containing frames for 01, 02, 03a/03a-i/03b/03c matching our lo-fi
build). **Hit the Figma MCP Starter-plan rate limit** after one `get_metadata` call and
had to abandon that path. If Figma work resumes: load the `figma-use` skill via
`get_figma_skill` (`skill://figma/figma-use/SKILL.md`) before any `use_figma` call — this
is mandatory per the tool's own instructions. Given the rate limit issue, the user may
still be doing Figma work manually, or may want the second deliverable (static
Figma-import HTML) to replace needing live Figma MCP access entirely — **worth asking**.

---

## 8 · Pending tasks, in priority order

1. **DONE, then RESTRUCTURED (2026-07-20)**: `case-study/index.html` written, then
   significantly revised same session per explicit user direction (shared a reference
   screenshot of a different project's docs-style layout: left "STRUCTURE" sidebar nav +
   numbered eyebrow/title/body main content). Current architecture:
   - **Two mutually-exclusive top-level views**, `#view-research` and `#view-prototype`
     (each `<section class="cs-view" data-view="...">`), toggled via the `hidden`
     attribute — **never both in the DOM's visible flow at once, so they can never share
     a scroll**. This was an explicit, deliberate requirement: *"the research and
     prototype will never come in the same scroll/page."* Switching resets `window.scrollTo(0,0)`.
   - The floating bottom toggle (built in the previous pass) now **drives this view swap
     directly** instead of `scrollIntoView`/`IntersectionObserver` scrollspy — the
     scrollspy approach was fully removed since there's no longer a shared scroll to spy
     on. Toggle logic lives in the first `<script>` IIFE in the file.
   - **Research view** is now a 2-column docs layout (`.research-layout`, CSS grid
     `220px 1fr`): a **sticky left sidebar** (`.research-sidebar`) with a "Structure" nav
     (`#structure-nav`, currently one real item — `01 / Intro` — plus a note "More phases
     are added here as research is shared" instead of fabricating placeholder phase
     names) and a small metadata block (Project / Role, reusing already-known facts, not
     invented) — and a **content column** (`.research-content`) with per-phase panels
     (`.research-panel[data-phase]`, toggled by a second small script IIFE that's
     independent of the top-level view switch). Only one real panel exists (`intro`),
     styled as eyebrow ("01 / Intro") + Fraunces title + body paragraph + an italic
     dashed "Phase content pending" note. **This is a scaffold, not real research
     content** — still waiting on the user to dictate phases; when they do, add more
     `<button class="structure-item" data-phase="X">` to `#structure-nav` and matching
     `<div class="research-panel" data-phase="X">` to `#research-content`, following the
     `intro` pair as the template.
   - Removed the header's old `.cs-nav` anchor-pills (`<a href="#research">` etc.) since
     they no longer make sense with true view-separation and are now fully superseded by
     the floating toggle — header is now just title/subtitle, no navigation of its own.
   - Prototype view content (phone-shell + iframe + restart button) is unchanged from the
     original build, just moved inside `#view-prototype`.
   - Verified via direct JS (`element.hidden`, click simulation, highlight transform
     math) in the Browser pane — `researchHidden`/`prototypeHidden` flip correctly on
     toggle click, no console errors, restart button still resets the iframe. **Did NOT
     get a fresh visual screenshot this pass** — the headless-Edge fallback (see §
     "Rendering/verification workflow" below) failed on every retry this turn, including
     on a trivial `data:` URL, so it's an environment-wide flake this time, not a
     page-specific issue. Worth a visual pass at the start of the next session before
     trusting the CSS grid/sidebar layout looks right — I'm confident in the DOM/JS
     correctness (confirmed via `read_page` content dump) but have not eyeballed the
     actual pixel layout of the new sidebar since writing it.
2. **RESOLVED**: screens `03a/03a-i/03b/03c/04/06/07` stay in their current hand-built
   hi-fi visual style permanently — they do NOT get converted to the generated-background
   image pattern. Only 01/02/05 use that pattern. The prototype section will show a mix
   of both styles across the flow; that's expected and final, not a bug to fix.
3. **Second deliverable**: the static, non-interactive, Figma-importable HTML file.
   Not started, no structure decided yet — needs its own scoping conversation with the
   user (what content, what layout, how "information-dense/documentation-style" differs
   in practice from the artifact).
4. **Minor**: mirror the "remove heart divider + push cards down ~36px" fix from
   `hifi/05-reveal.html` into `lofi/05-reveal.html` for consistency — low priority given
   the user's explicit pivot away from spending more time on lo-fi/hi-fi.
5. **Cleanup check**: confirm whether `hifi/assets/pet-hero.jpg` is still referenced
   anywhere (it was screen 01's banner photo before the `cardbg.png` pivot) — delete if
   orphaned, but verify first.
6. **Screen 04's motion beat** was scoped as a bonus deliverable in the original brief
   (CSS animation, `prefers-reduced-motion`, written spec) and was **never built** —
   screen 04 is still fully static. Not urgent given the case-study pivot, but it's a
   named deliverable from the original brief that hasn't been dropped, just deprioritized.

---

## 9 · Working style notes (how this user operates)

- **Screenshot-driven, iterative, corrects fast.** Expect to be shown a render and told
  precisely what's wrong; don't over-explain reasoning back, just fix it and re-render to
  confirm.
- **Everything is a real file in the project folder.** No abstraction layer, no separate
  "design system app" — just HTML/CSS files the user can open directly.
- **Model gets switched frequently mid-session** (sonnet/opus/fable) via slash command —
  this is the user's own workflow choice, not something to react to.
- Prefers being told **when I've deviated from a reference** rather than silently
  reinterpreting — flag departures from settled decisions or reference images explicitly,
  as done throughout with the household-copy framing and reward-card demotion questions.
- Values decisive action once enough context exists — don't re-ask questions already
  answered earlier in a long session.
