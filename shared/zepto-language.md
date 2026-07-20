# Zepto design language — extraction for the hi-fi pass

**Sources & method.** Two live app screenshots provided by the user (Pet Care PLP, Cart), plus
Zepto's live web bundle (zeptonow.com, fetched 2026-07-19) for ground-truth font names and hex
values. App-only values that couldn't be sampled directly are marked **~approx**. Nothing below
is invented; where the app and web may differ, the note says so.

---

## 1 · Type

| Role | Zepto uses | Evidence | Our stand-in (to confirm) |
|---|---|---|---|
| Everything in-app | **Zepto Norms** (proprietary custom sans) | web bundle `font-family: Zepto Norms` | **Figtree** (Google Fonts) — same modern grotesque feel; DM Sans as fallback |
| Display / marketing accents | **Fraunces** (serif) | web bundle, subset woff2 | Fraunces itself (open font, on Google Fonts) — optional, campaign shell only |

Observed type behaviour in the app:
- Headings are **bold, tight, sentence case** ("Coupons & offers", "Delivering in 5 mins"). No all-caps headings anywhere.
- Two text greys below ink — secondary (pack sizes, subtitles) and tertiary (metadata) — before hitting disabled.
- Numerals are heavily used and always bold when they carry money ("₹403", "To Pay ₹125", "saved ₹45").
- Body sizes run small: ~12–15px equivalents. Nothing airy.

## 2 · Color — extracted values

### Brand & semantic roles (the important insight)
Zepto's language is **role-coloured**: each hue has one job, used consistently.

| Role | Hex (source) | Where seen |
|---|---|---|
| **Brand purple** — identity, selection, "this is Zepto" | `#9A16CA` (web bundle, 20×); darker steps `#8C24A8`, `#7A14AC` | selected rail label, brand moments |
| **Selection tint** — lavender wash behind the active thing | `#F3EBFF` (web bundle) | selected category block in PLP rail |
| **Commerce pink** — every buy-action | `#FA3778` / `#F9105E` / `#E33E62` family (web bundle) | ADD button border+text, Pay Now fill, stepper, "Add More Items", Offers chip |
| **Money green** — price you pay, savings, ratings | `#329537` (web bundle, 28×) | price badge fill, "₹47 OFF", saved-strip text, rating star |
| **Mint tint** — good-news background | ~approx `#DFF3E7` | "Yay! You saved ₹45" strip |
| **Amber** — "action needed to unlock" | ~approx `#E58A1F` text on `#FEF5E9` tint (tint from bundle) | "Shop for ₹904 more to apply", Schedule button |
| **Info blue** — neutral tags | `#2364E5` on light-blue tint | "Ocean Fish" attribute chip |
| **Deep plum-navy** — high-contrast utility surface | `#2B1E35` (bundle) / near-black | floating "Unlock free delivery" bar, Amazon Pay tile |

### Neutrals (from bundle)
| Step | Hex |
|---|---|
| Ink | `#262A33` (also `#101418` for max contrast) |
| Grey-1 secondary text | `#586274` |
| Grey-2 tertiary | `#667085` |
| Grey-3 metadata | `#757C8D` |
| Hairline / borders | ~`#E0E0E0`–`#ECEFF3` |
| Page grey (cart bg) | `#F3F5F7` |
| Card | `#FFFFFF` |

**Key correction to our lo-fi instinct:** Zepto pages are *white or light-grey with white
panels* — the immersive dark shell exists only inside campaign micro-sites. Product surfaces
are bright, dense, high-contrast.

## 3 · Shape & elevation

- **Radii**: panels/cards ~16–20px; buttons/pills ~10–14px; product-image tiles ~12px;
  floating bottom bar ~20–24px; thumbnails ~12–16px. Circles are reserved for icon buttons.
- **Two chrome dialects, context-dependent** (both real):
  - *PLP / dense list surfaces*: *plain* icons in the header (back chevron, heart, search — no circles).
  - *Cart / focused surfaces*: white **circle buttons with soft shadow** (back, wishlist).
- **Elevation is quiet**: soft small shadows on white panels over grey pages; hairlines do most
  separation work. The only loud shadow belongs to the floating dark bar.
- **Dashed hairlines** separate groups inside a panel (coupon rows) — a real Zepto pattern,
  conveniently echoing our lo-fi grammar.

## 4 · Component inventory (mapped to our screens)

| Component | Anatomy observed | Used in our screens |
|---|---|---|
| **ADD button** | white pill, 1.5px pink border, pink bold caps label, sits inside image bottom-right | 06 |
| **Price badge** | green fill, white bold ₹, radius ~8; grey strikethrough MRP beside; "₹47 OFF" green bold below | 06 |
| **Stepper** | pink-tinted rounded rect, pink − / count / +, count bold | 07 |
| **Locked coupon pill** | ghost: grey 1.5px border, grey semibold label | 07 |
| **Coupon row** | 44px icon squircle · title ink semibold · amber condition line · trailing pill | 07 |
| **White panel** | radius ~18, soft shadow, 16px padding, bold panel heading | 07 |
| **Floating utility bar** | deep plum-navy, radius ~22, icon circle + bold white line + grey sub-line | 06 |
| **Progress ladder** | green check nodes joined by a line, green filled progress segment | 07 |
| **Filter chips** | white pill, hairline border, 12.5px medium, chevron; leading icon-only chip | 06 |
| **Category rail item** | 56px image tile + 10.5px label; selected = lavender block + purple bold label | 06 |
| **Lens strip / toggles / search** | circles + labels; pill toggles (active = dark); search field with hairline | 01 |
| **Pay bar** | white, To-Pay stack + outlined Instant Order + pink filled Pay Now | 07 |
| **Success strip** | mint tint, green bold numerals | 07 |

## 5 · Voice

- Sentence case everywhere; caps only for tiny labels (ADD) and coupon codes.
- Money is always concrete and bold: "saved ₹45", "Shop for ₹4 more".
- Mild delight, never cute: "Yay!" is as far as it goes.
- Conditions are amber, benefits are green, actions are pink — the copy's tone is carried by
  the color system as much as the words.

## 6 · What this changes for our hi-fi screens

1. **Campaign shell (02/03x/04/05)** keeps its immersive-microsite feel — that's licensed by
   Zepto's campaign factory — but must swap grey for **brand purple + lavender tints**, with
   Fraunces available as an optional display accent.
2. **PLP (06)** becomes white + role colors: pink ADDs, green price badges, lavender selected
   rail ("For Meesha" gets the same selection treatment as the real app's active category).
3. **Cart (07)** becomes grey page + white panels; our nudge row keeps its dashed border 
   but inherits the coupon-row anatomy; "Unlock" CTA goes **pink** (it's a commerce action),
   conditions stay amber.
4. **Home (01)** gets the white feed + real chrome; our banner slots in with campaign purple.
5. Buttons: primary CTAs in the flow become pink (Zepto's action color), not black.
   Selection/identity moments (pet cards, active states) use purple family.
6. Dark surfaces are *utility*, not default: only the floating reward bar keeps deep plum.

## 7 · Home feed anatomy (from the 19-frame scroll capture)

Top → bottom, as actually shipped:

1. **Campaign-skinned header region.** The entire top block — status bar backdrop, ETA
   ("17 minutes ▾" + address), coins badge + profile — sits on **campaign art** (the "Bling
   Mode On" pink sky). The home top is a re-skinnable surface; campaigns literally paint it.
2. **Storefront toggles**: white pills on the skin — zepto (wordmark) · Monsoon Store ·
   Super Mall · Cafe (with a red "From ₹19" badge).
3. **Search**: white rounded field, rotating hint in quotes ('Search for "Korean Heart"').
   On scroll the header compresses: search + a small **Late Night Store** promo tile share
   the row, and search + lens strip stick to the top on white.
4. **Lens strip**: **text tabs with small icons** — All · Pooja · Match Day · Fresh ·
   Electronics; active tab = dark + underline. (Correction to our lo-fi: not circles.)
5. **Campaign hero block**: display-type headline ("Bling Mode On", "Up to 80% off") +
   grid of rounded sub-cards (Makeup Favourites, Skincare Collection…) with product
   photography and per-card offer labels.
6. Then the merchandised rows, each with its own micro-theme:
   - **Steal Deals** (display type + category icon rail + product carousel)
   - **Coupons & Offers**: scallop-edged coupon cards, green badge icon, "FLAT ₹50 OFF /
     above ₹999"; bank/UPI offer rows below
   - **Buy Again**: filter chips (All Items · Zepto Cafe · …) + product grid
   - **Wellness Days**: baby-blue themed block, 3D prop (giant capsule), category sub-tiles
   - **Deals starting at ₹9**: heavy condensed display, red price blocks ("DEALS AT ₹9/₹19/₹29")
   - **Fresh**: green serif heading + produce cards
   - Blockbuster Deals · **Fashion Under ₹199** (pink display) · Flash Deals
   - **Category mega-sections**: Grocery & Kitchen, Snacks & Drinks, Beauty & Personal Care,
     Household Essentials (Pet Care lives here as one tile), Shop by (Monsoon/Gift/Co-Op/Pooja
     Store), Late Night Store banner (dark neon)
   - A **PET STORE banner** exists mid-feed (green/purple, product collage) — precedent for
     our campaign banner slot.
7. **Floating dark pill** above the nav: "High demand in your area — Shop for ₹299 to unlock
   free delivery", with a small pink collapsed **"Offers ⌃" tab** peeking above it.
8. **Bottom nav**: Home · Categories · Play & Win · Cafe — line icons, active = **pink**.

**Component dialect corrections/additions:**
- Two ADD variants by context: home carousels use a compact **pink-bordered square "+"** at
  the image's top-right; PLP uses the **ADD pill** inside the image bottom-right.
- Two price dialects: home cards = bold ink price + grey strikethrough + **green "₹135 OFF"**
  line; PLP = green **price badge**.
- Section headers on home use **expressive display type per campaign** (serif italic, heavy
  condensed, script) — the type itself is themed, which licenses Fraunces-style display for
  our campaign surfaces.
- Alternating rhythm: white product rows ↔ full-bleed pastel themed blocks. The feed is a
  magazine, not a list.

## 8 · Illustration & art direction (for our campaign assets)

What Zepto actually does — and what we reproduce:

- **Product-forward collage, not mascot illustration.** Banners are built from real product
  packshots arranged on soft scenes. Flat cartoon mascots are absent; the closest to
  "illustration" is 3D props (the Wellness capsule, the hanging wood sign) and environmental
  backdrops (pink sky, clouds).
- **Pastel environmental backdrops** per campaign: sky pink (Bling), baby blue (Wellness),
  mint/green (Fresh, Pet Store), dark neon navy (Late Night). One hue owns one campaign.
- **Soft dimensionality**: gentle drop shadows, floating elements, slight perspective —
  "3D-lite", never hard vector-flat, never photoreal-gritty.
- **Display type as part of the art**: the headline is styled *into* the scene (arched,
  colored, serif-italic etc.), then everything below reverts to Zepto Norms.
- **Density is a feature**: offer labels, sub-cards and prices live inside the art block.

**Recipe for our pet-campaign art (CSS/SVG-achievable):**
- Backdrop: **lavender-to-soft-purple pastel gradient** (campaign hue = brand purple family,
  consistent with Pet Care's existing purple lean in the PLP) with soft cloud/blob shapes.
- Foreground: rounded-square pet photo frames (our roster component) casting soft shadows,
  floating paw-print and treat glyphs at low opacity, subtle sparkle accents.
- Headline in **Fraunces** (serif display, as their campaigns do), body/UI in the sans.
- Soft shadows + slight rotation on floating cards for the 3D-lite feel; no mascots, no
  flat-cartoon pets — the *user's own pet photo* is the hero image, which is exactly the
  campaign's thesis.

## 9 · To confirm before tokens-hifi.css

- [ ] **Font**: Figtree as the Zepto Norms stand-in (needs Google Fonts link — CDN or local download?), Fraunces optional for the campaign shell display type.
- [ ] **Primary purple**: `#9A16CA` (web-true) vs the deeper app-icon violet (~`#5A0FC8`) — recommend web-true since it's sampled, labeling it as such.
- [ ] CTA pink anchor: `#F9105E` vs `#FA3778` (both live in the bundle; recommend `#FA3778` for fills, deeper `#E33E62` for pressed).
- [ ] Do campaign screens (02–05) get Fraunces display headings, or stay 100% sans?
