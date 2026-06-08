# KIRBS Design System

A token-driven, dark-mode-ready design system for KIRBS — a B2B admin/console
visual language built around a deep indigo primary (`#2D3378`), Pretendard Korean
type, and a rigorously semantic token layer.

This project repackages and visualises the upstream design tokens at
**[github.com/dawooni0625/claude](https://github.com/dawooni0625/claude)** (W3C DTCG JSON
+ generated CSS/SCSS) into a browsable system: a fonts + semantic stylesheet,
visual specimens, and a working UI kit that demonstrates how the tokens compose
into a real product surface. See `tokens/UPSTREAM_README.md` and
`tokens/UPSTREAM_CLAUDE.md` for the original Korean documentation.

---

## Index

| File / Folder | Purpose |
|---|---|
| `tokens.css` | All CSS custom properties — primitives, semantic, **and the full `--component-*` layer** (290 vars, light + dark). **The source of truth at runtime.** Imported by everything. |
| `colors_and_type.css` | Semantic layer — webfont imports, `<h1>`/`<p>`/`<code>` defaults, `.text-*` colour helpers, the `.prose` long-form scope (lists, blockquote, hr, figure, tables), focus ring, selection. |
| `tokens/` | Upstream JSON sources (W3C DTCG, 18 categories) + the generated `tokens.scss`. The build-time origin of `tokens.css`. |
| `preview/` | One-concept-per-card design system specimens (Colors, Type, Spacing, Components, Brand). Component cards now cover every Figma guide page — table, breadcrumbs, large selector, date picker, accordion, banner, carousel, file upload, tag input, bottom app nav, circle progress / stepper, modal, tooltip, image guidelines. |
| `icon/` | Full 113-icon set in 10 categories (`navigation`/`action`/`data`/`content`/`media`/`commerce`/`notification`/`user`/`system`/`social` — social has filled + `-line` variants). `currentColor`. |
| `brand/` | Official logos — `kirbs-logo.svg` (full lockup) + `kirbs-wordmark.svg` (compact), each with a `*-mono.svg` `currentColor` variant for dark/inverse surfaces. |
| `ui_kits/admin/` | Working UI kit — sidebar + topbar shell, login → dashboard / members / settings click-through, light/dark toggle. |
| `SKILL.md` | Agent Skills manifest so this folder can be dropped into Claude Code. |
| `fonts/PretendardVariable.woff2` | Self-hosted Pretendard variable font (weight axis 100–900). |

---

## Quick start

```html
<link rel="stylesheet" href="colors_and_type.css">
<!-- tokens.css is auto-imported by colors_and_type.css -->

<button class="btn-primary">버튼</button>

<style>
.btn-primary {
  background: var(--color-interactive-primary);
  color:      var(--color-text-inverse);
  height:     56px;
  padding:    0 var(--space-12);
  border:     0;
  border-radius: var(--border-radius-md);
  font:       700 var(--font-size-body-md) var(--font-family-base);
  transition: var(--transition-color);
}
.btn-primary:hover { background: var(--color-interactive-primary-hover); }
</style>
```

Dark mode: `<html data-theme="dark">`. Every **semantic** token swaps automatically — see the policy below for how component tokens behave.

---

## Dark mode & the component-token policy

Dark mode flips on `[data-theme="dark"]`. What swaps and what doesn't is a hard rule, not a preference:

- ✅ **Semantic tokens swap.** `--color-text-*`, `--color-bg-*`, `--color-border-*`, `--color-interactive-*`, and `--elevation-*` all have dark overrides. Build product colour from these and dark mode "just works."
- ✅ **Component sizing is theme-safe.** Every non-colour `--component-*` token (height, padding, radius, font-size, gap, transition, `*-min-width`, `*-max-width`, shadows expressed as dimensions) is identical in both themes. Use freely anywhere.
- ⛔ **Component colour tokens are LIGHT-MODE literals.** Every `--component-*-color-*` value is a fixed hex from `tokens/component.json`. **They do _not_ change under `[data-theme="dark"]`** — upstream defines no dark component layer.

**The rule:** any colour that must adapt to theme MUST come from a semantic token, never from a `--component-*-color-*` token. Reach for component colour tokens only for (a) surfaces that are intentionally light-only, or (b) reading the canonical light-mode reference value.

This is enforced by convention, not by the cascade — a primary button built from `--component-button-color-primary-bg` (`#2D3378`) will stay indigo in dark mode instead of lightening to the dark-theme `--color-interactive-primary` (`#A9A5E8`). That is the bug this policy prevents.

### Mapping — component colour → semantic to use for dark-safe builds

| If you reach for… | Use instead (dark-safe) |
|---|---|
| `--component-button-color-primary-bg` | `--color-interactive-primary` (+ `-hover` / `-active`) |
| `--component-button-color-primary-text` | `--color-text-inverse` |
| `--component-*-color-bg` / `-bg-default` | `--color-bg-elevated` / `--color-bg-surface` |
| `--component-*-color-border*` | `--color-border-default` / `--color-border-focus` |
| `--component-*-color-text*` | `--color-text-primary` / `--color-text-secondary` / `--color-text-tertiary` |
| `--component-toast-color-*-bg` / state fills | `--color-bg-{success,warning,error,info}` |
| `--component-*-color-*-text` (state) | `--color-text-{success,warning,error,info}` |

> The admin UI kit (`ui_kits/admin/`) already follows this: it styles from semantic tokens and toggles cleanly, which is why the theme switch works end-to-end.

---

## Brand principles

- **Primary** `#2D3378` — deep indigo. Used for headlines, primary actions, brand surfaces.
- **Type** Pretendard (UI body) + JetBrains Mono (code / numerals). Korean-first; Latin coverage via Pretendard's subset.
- **Grid** 30px gutter, fixed. Margins: mobile 16 / tablet 24 / desktop 32.
- **Spacing** `--space-{n}` = *n* × 2px. Component-scale runs `--space-1`…`--space-16` (32px); the extended scale `--space-20`…`--space-60` (40–120px) covers public-web section rhythm. For section padding prefer the semantic `--section-pad-{sm,md,lg}` (64/96/120px) + `--section-block-gap` / `--section-stack-gap`.
- **Shadows** are indigo-tinted (`rgba(45,51,120,…)`), not neutral black. This is a signature.
- **Semantic-first** Never use `var(--color-gray-1)` in product code; always reach for `var(--color-text-secondary)` so dark mode just works.

---

## Content fundamentals

The upstream documentation is **bilingual Korean-first**: token names and CSS
variables are English (machine-friendly), descriptions are Korean (human-
friendly). Product copy in the UI kit follows the same convention.

- **Language** Korean-primary. English used for product nouns ("Dashboard", proper nouns, code).
- **Voice** Formal-polite (`-요`/`-습니다`). Honorific level high but not stiff. No second-person pronouns; address the user implicitly via verb endings.
- **Tone** Calm, factual, technical. No exclamation points outside celebratory toasts. No marketing puffery.
- **Microcopy patterns**
  - Buttons: short verb phrases — `저장`, `추가`, `취소`, `로그아웃`. Two-character verbs preferred over full sentences.
  - Labels: nouns with no trailing colon — `이메일`, `비밀번호`.
  - Helper text: short sentence ending with `요`/`다` — `회사 이메일을 입력해 주세요.`
  - Errors: state the problem, not the rule — `유효하지 않은 입력입니다.`
  - Empty states: cause + next action — `아직 항목이 없어요 / 첫 항목을 추가하면 여기에 표시됩니다.`
- **Numerals** Use Arabic numerals with thousands separator. Currency: `₩ 42.8M`, not `42,800,000원` in summaries.
- **Casing** English UI strings sentence-case (`Continue`, `With icon`), not Title Case. Tokens are kebab-case.
- **Emoji** Not used in product UI. The brand voice is professional.
- **Code-style nouns** Token references appear in mono with the `--` prefix preserved: `--color-text-primary`.

---

## Visual foundations

### Colour

- **Hue strategy** A single saturated indigo (`#2D3378`) anchors the system. Three brand tints (`#5B63A8`, `#8E96D3`, `#E8EAF6`) extend it — quaternary is the only token used as a *background* tint; the others are foreground/interactive accents.
- **Neutrals** Two true blacks (`#000`, `#1D1D1D`) for text only; five grays (`#333` → `#E0E0E0`) for everything else. There is no off-white in the primitive palette; `#F8F8FB` is *derived* and exists only at the semantic layer as `--color-bg-surface`.
- **State colours** Saturated, conventional web semantics: `#2F80ED` info / `#27AE60` success / `#E2B93B` warning / `#EB5757` error. Warning is the only one that pairs with black text — its yellow is too bright for white.
- **Semantic-first rule** Product code MUST use `--color-text-*` / `--color-bg-*` / `--color-border-*` / `--color-interactive-*`. Primitives exist only for the token layer to alias.

### Type

- **Pretendard** Korean-first geometric sans. Self-hosted variable font (`fonts/PretendardVariable.woff2`), weights 400 + 700 in product use (variable axis 100–900 available for displays).
- **JetBrains Mono** Code, token references, numerals in tables/KPIs.
- **Scale** 13 sizes split into Display (5) for marketing, Heading (5) for h1–h5, Body (3) for everything else. Line-height is a flat `1.5` everywhere — even displays, which then get a tighter override (`1.1`) per the specimen.
- **Weights** Only `400` (regular) and `700` (bold). No 500/600 in the token system.
- **Letter spacing** `0em` globally. Large displays tighten to `−1.5%` to `−2.5%` (applied in `colors_and_type.css`, not a token).

### Surfaces & elevation

- **Cards** White (`#FFF`) on surface (`#F8F8FB`). 1px hairline border (`#E0E0E0`) + `--elevation-1` shadow. Radius `--border-radius-md` (8px). No glassmorphism, no gradients on surfaces.
- **Shadows are tinted indigo** — `rgba(45,51,120,…)` at opacities .08 / .12 / .16 / .20. This is what makes the system feel KIRBS-y vs generic Material.
- **Elevation rules**
  - `0` flat (default body content)
  - `1` resting cards, table rows on hover
  - `2` dropdowns, tooltips, floating action buttons
  - `3` modals, dialogs, side panels
  - `4` full-screen overlays, top-of-stack popups
- **Background imagery** The system ships no photography or illustration set, but it *does* define image-handling guidelines (per the Figma guide): recommended aspect ratios (21:9 → 9:16), corner-radius shapes (`--component-image-radius-*`), and text-legibility overlays (`--component-image-overlay-dark/brand/light`). Actual image assets still live at the product layer. See `preview/comp-image.html`.

### Borders & corners

- **Border widths** `1px` / `2px` / `3px`. Form inputs use `1.5px` (component-token only — not a primitive).
- **Radius scale** `0 / 2 / 4 / 8 / 12 / 16 / 9999`. Cards/inputs default to `8`, modals to `16`, badges/avatars to `9999`. Nothing in the system uses `xs` (2px) except focus-ring fallback.
- **Pill vs square** Buttons offer both — `square` (8px) for forms and dense UI, `round` (99px) for marketing CTAs.

### Motion

- **Duration scale** `0 / 100 / 200 / 300 / 500ms`. `200` is the default ("normal").
- **Easing**
  - `out` (`cubic-bezier(0,0,.2,1)`) is the default. Use for anything appearing.
  - `in` for anything leaving.
  - `in-out` for state changes / position moves.
  - `spring` (`cubic-bezier(.34,1.56,.64,1)`) for celebratory: toasts, badge pops.
  - `linear` only for progress bars.
- **No bounces** outside `spring`. No parallax, no scroll-driven animations defined at the system level.

### Hover / press / disabled

- **Hover**
  - Primary background: darken ~10% (`#232968`).
  - Tertiary / secondary backgrounds: fill with `#E8EAF6` (brand-quaternary). Never opacity-fade.
  - Links: shift to `--color-text-link-hover` (deeper indigo).
- **Press / active**
  - Primary background: darken ~20% (`#1A1F52`). No transform/scale.
  - Tertiary: fill with `#D0D5EA`.
- **Disabled**
  - `--color-interactive-primary-disabled` = `#BDBDBD` (gray-4). Or `opacity: 0.38` on the element (`--opacity-disabled`).
  - Disabled cursor: `not-allowed`.
- **Transitions** 100ms on colour/background, 200ms on shadow, 300ms on size/position. Always `cubic-bezier(0,0,.2,1)`.

### Focus

- **Always visible** `:focus-visible` shows a 2px solid `#2F80ED` outline at 2px offset. The focus colour is deliberately blue, not brand-indigo, to ensure contrast on indigo backgrounds.
- Form fields *also* get a 3px indigo-tinted glow (`focus-shadow` component token) in addition to the outline.

### Transparency & blur

- **Used sparingly.** Modal/overlay backdrop is `rgba(0,0,0,0.5)` light / `rgba(0,0,0,0.72)` dark. No backdrop-blur defined at the token layer.
- **Tooltips** are opaque (`#1D1D1D`), not translucent.
- **No glass surfaces** in the system.

### Iconography

See the `ICONOGRAPHY` section below.

---

## Iconography

The full **113-icon set in 10 categories** lives in `icon/<category>/<name>.svg`:

| Category | Count | Examples |
|---|---|---|
| `navigation` | 15 | home, search, menu, chevron-{up,down,left,right}, arrow-{…}, x |
| `action` | 29 | check, plus, edit, trash-2, download, upload, filter, link, send, heart, zap |
| `data` | 10 | bar-chart, bar-chart-2, pie-chart, trending-{up,down}, table, database |
| `content` | 13 | mail, calendar, file, folder, star, image, phone, map-pin |
| `media` | 8 | play, pause, skip-{forward,back}, volume-{2,x}, camera, mic |
| `commerce` | 6 | shopping-cart, shopping-bag, credit-card, dollar-sign, gift, percent |
| `notification` | 8 | bell, info, alert-{circle,triangle}, check-circle-2, x-circle, clock |
| `user` | 7 | user, users, user-plus, settings, lock, key, log-out |
| `system` | 5 | sun, moon, unlock, shield, wifi |
| `social` | 6 + 6 | google, kakao, naver, github, apple, facebook — each as a filled mark **and** a `-line` outline variant |

**Format.** Every icon is a `currentColor` stroke SVG (round caps/joins) on a
`20`–`24` viewBox. Monochrome — colour is controlled entirely by the host's CSS
`color` (social marks like Google use `currentColor` with opacity shading rather
than brand colours, so they tint cleanly too).

**Usage.** Two patterns, both colour via `color`:

```html
<!-- Static HTML: CSS mask, tinted by background-color -->
<span style="width:24px;height:24px;background:var(--color-text-brand);
  -webkit-mask:url(icon/navigation/home.svg) center/contain no-repeat;
  mask:url(icon/navigation/home.svg) center/contain no-repeat;"></span>
```

```jsx
// React (admin kit): fetch + inline so currentColor inherits natively
<Icon name="navigation/home" size={24} color="var(--color-text-brand)" />
```

- **Sizes** `xs` 16 · `sm` 20 (default) · `md` 24 · `lg` 32 · `xl` 48
- **Colour** Always inherits via `currentColor` / mask `background`. Never hardcode fills.
- **Where used** Buttons (`sm`), GNB/sidebar (`md`), empty states (`lg`/`xl`).
- **Emoji** Not used. Unicode symbols not used outside ▲/▼ for delta indicators in metrics.
- **Brand illustrations** None defined. The system is glyph-driven.

`ui_kits/admin/Icons.jsx` maps the legacy `Icon*` component names (e.g. `IconHome`,
`IconBell`) to files in this set, so existing screens keep working.

---

## Caveats & substitutions

1. **Icons** — ✅ Resolved. The icon set is sourced from **Lucide Icons** (MIT, 2px stroke, 24×24 grid — the library specified in the Figma guide), self-hosted as the 113-icon set in `icon/<category>/` so there is no CDN dependency. The admin kit + preview card use it directly via `currentColor`.
2. **Logos** — ✅ Resolved. Official artwork lives in `brand/`: `kirbs-logo.svg` (full lockup — ring wordmark + 한글 회사명 + EN tagline, 362×56) and `kirbs-wordmark.svg` (compact ring + KIRBS, 130×42), plus `*-mono.svg` `currentColor` variants for dark/inverse surfaces. See `preview/brand-logo.html`. (KIRBS = **K**orean **I**ntegrated **R**eport & **B**usiness **S**ystem, per the Figma brand guide.)
3. **Product surfaces** — The upstream repo is a pure-token system with no example product UI. The `ui_kits/admin/` here is the most plausible interpretation given the `component.json` shape (heavy emphasis on `table`, `nav-sidebar`, `dropdown`, `modal`) — i.e. a B2B admin/console. *Action: confirm or redirect.*
4. **Font** — Pretendard is self-hosted from `fonts/PretendardVariable.woff2` via `@font-face` in `colors_and_type.css` (one variable file, weight axis 100–900). JetBrains Mono is still loaded from Google Fonts; swap to a local woff2 if your CSP blocks third-party CDNs.

---

## Further reading

The upstream repo carries deep context this overview doesn't:

- **Original Korean docs** — `tokens/UPSTREAM_README.md`, `tokens/UPSTREAM_CLAUDE.md`
- **Per-category tokens** — `tokens/{color,spacing,typography,…}.json` (W3C DTCG)
- **Component tokens** — `tokens/component.json` defines exact sizing/colour for 33 components (textfield, button, modal, table, breadcrumbs, large-selector, date-picker, accordion, banner, carousel, file-upload, tag-input, nav-app, progress-circle, stepper, image, footer, …). These are also compiled into `tokens.css` as `--component-{component}-{...path}` CSS variables (e.g. `var(--component-button-height-md)` → `56px`, `var(--component-table-row-height)` → `48px`), so you can reference them at runtime without reading the JSON. **Sizing/spacing component vars are theme-safe; colour component vars are light-mode literals** — for dark-mode-aware surfaces use the semantic `--color-*` tokens, which swap under `[data-theme="dark"]`. Reach for these *before* hardcoding any number.
- **Live source** — [github.com/dawooni0625/dw](https://github.com/dawooni0625/dw)

Browse the upstream repo for the design rationale and edge cases — this
folder is an opinionated subset focused on getting designs out the door.
