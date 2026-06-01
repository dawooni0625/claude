---
name: kirbs-design
description: Use this skill to generate well-branded interfaces and assets for KIRBS — a B2B admin/console design system with a deep indigo (#2D3378) primary, Pretendard Korean type, and a full W3C-DTCG token layer. Good for production code, throwaway prototypes, mocks, slide decks, and design explorations that need to feel like KIRBS.
user-invocable: true
---

# KIRBS Design Skill

This folder is a design system. It contains the canonical CSS tokens, a Korean-first type stack, a clickable admin UI kit, and ~35 preview cards demonstrating colour, type, spacing, and component patterns.

## How to use this skill

1. **Read `README.md`** at the root first — it has the visual foundations, content fundamentals, iconography rules, and an index of every other file.
2. **Wire the styles into your output.** Any HTML you generate should start with:
   ```html
   <link rel="stylesheet" href="colors_and_type.css">
   ```
   This pulls in `tokens.css` automatically and self-hosts Pretendard from `fonts/PretendardVariable.woff2`. Set `<html data-theme="dark">` to flip the whole system into dark mode — every semantic token swaps.
3. **Always use semantic tokens in product code.** `var(--color-text-primary)` not `var(--color-gray-1)`; `var(--color-interactive-primary)` not `#2D3378`. Primitives exist only so the semantic layer has something to alias. **Dark-mode policy (hard rule):** semantic tokens + non-colour `--component-*` (sizing/spacing/radius) swap or stay safe under `[data-theme="dark"]`; `--component-*-color-*` tokens are **light-mode literals that never swap**, so any theme-adaptive colour MUST come from a semantic token. Full policy + component→semantic mapping table in `README.md` › "Dark mode & the component-token policy".
4. **Reach for tokens before hardcoding numbers.** The 21-component layer (`tokens/component.json`) is compiled into `tokens.css` as `--component-{component}-{...path}` CSS variables — e.g. `var(--component-button-height-md)`, `var(--component-table-row-height)`, `var(--component-modal-max-width-md)`. Use them directly; no need to read the JSON at runtime. Sizing/spacing vars are theme-safe; the `*-color-*` component vars are light-mode literals, so for dark-mode-aware colour reach for the semantic `--color-*` tokens instead.
5. **Copy components, don't reinvent.** `ui_kits/admin/` has working React/JSX implementations of every common pattern. Lift the styling, simplify the behaviour as needed.

## Decision tree

- **Visual artifact (slide, mock, throwaway prototype, marketing page)** → write static HTML files that link `colors_and_type.css`. Copy the relevant preview card from `preview/` as a starting point. Open them with the user.
- **Production code** → read the tokens, follow the semantic-first rule, lift JSX from `ui_kits/admin/` and adapt to the host framework. Tell the user what you copied and from where.
- **User invokes this skill without other guidance** → ask what they want to build, ask 3–5 clarifying questions (audience, surface, dark mode needed?, Korean only or bilingual?, any specific components), then produce HTML artifacts.

## Consistent design output

When the user asks you to create a new page or screen **based on an existing file**, ensure consistent output by:

### 1. Reference file explicitly
```
"Read [existing-file.html] and use it as the exact template. Copy the layout structure, 
CSS variable names, and component patterns. Only replace the data/content with [new content]."
```

### 2. Fix layout structure (DO NOT CHANGE)
```
"Keep the layout structure identical:
- KPI cards: same count, same grid (auto-fit, minmax)
- Main area: same 2-column split ratios
- Sidebar: same width, same navigation items
- Header: same height, same search bar width

Do NOT reorganize the layout. Only swap content."
```

### 3. Reuse CSS variables (DO NOT CREATE NEW)
```
"Use the existing CSS variables from the reference file:
- Colors: --cp, --tx1, --bg1, --bd (keep exact names)
- Spacing: use the same numeric values (16px, 12px, etc.)
- Effects: --el1, --el2, --el3 shadows (do not modify)

Do NOT create new CSS variables. Use only what exists in the reference."
```

### 4. Copy components exactly
```
"Reuse components from the reference file:
- KPICard: same props, same styling, same icon/color mapping
- DocRow: same cell structure, same hover effects
- StatusBadge: same status map, same color logic

Do NOT reinvent component structures. Copy-paste and adapt data only."
```

### 5. Specify changes ONLY
```
"Make ONLY these changes:
1. KPI card values: [new values]
2. Table data: [new data rows]
3. Section titles: [new titles]
4. Navigation labels: [new labels]

All other aspects (layout, style, spacing, fonts, animations) remain identical to the reference."
```

### 6. Template-based instruction
```
"Treat [reference-file.html] as a template where:
- Layout structure: LOCKED (no changes allowed)
- CSS variable names: LOCKED (use exact names)
- Component structure: LOCKED (copy exactly)
- Data/text content: FLEXIBLE (replace with new content)

Generate output that is visually 100% identical to the reference, with only content swapped."
```

---

**When users don't provide a reference file**, default to copying from `ui_kits/admin/` components and `preview/` cards rather than inventing new patterns.

## Visual rules (the short version)

- **Primary** `#2D3378` (deep indigo). **Type** Pretendard + JetBrains Mono. **Radius** 8px default, 12px modals, 9999 pills. **Shadow** indigo-tinted, never neutral black. **Motion** 100/200/300ms · `cubic-bezier(0,0,.2,1)` default. **Focus** 2px solid `#2F80ED` outline at 2px offset. **Korean copy** formal-polite (요/습니다). **No emoji** in product UI. **No glassmorphism, no gradients on surfaces, no parallax.**

## File map

| Path | Purpose |
|---|---|
| `README.md` | Full system reference. Read first. |
| `tokens.css` | Every CSS custom property — primitives, semantic, and the full `--component-*` layer (290 vars), incl. section-spacing tokens (light + dark). The runtime source of truth. |
| `colors_and_type.css` | Webfont imports, base reset, semantic text classes, and the `.prose` long-form scope (lists, blockquote, hr, figure, tables). |
| `tokens/*.json` | W3C-DTCG source (18 categories) + upstream Korean docs. |
| `preview/` | 35 specimen cards — colours, type scale, spacing, components, brand (incl. logo, footer, prose). Copy-paste-friendly HTML. |
| `icon/` | Full 113-icon set, 10 categories (social: filled + line). `currentColor`. |
| `brand/` | Official logos — `kirbs-logo.svg` (full lockup) + `kirbs-wordmark.svg` (compact), each with a `*-mono.svg` `currentColor` variant for dark/inverse. |
| `ui_kits/admin/` | Clickable React UI kit. Sidebar shell, login, dashboard, members table, settings form. Responsive (drawer nav < 1024). |
| `fonts/PretendardVariable.woff2` | Self-hosted variable font, weight axis 100–900. |

## Caveats baked in

- Icons: full 113-icon set in `icon/<category>/` (10 categories; social has filled + `-line` variants). `currentColor`. Tint via CSS `color` (React) or mask `background` (static HTML).
- Official logos in `brand/`: `kirbs-logo.svg` (full lockup) + `kirbs-wordmark.svg` (compact), with `*-mono.svg` `currentColor` variants for dark/inverse. Use the wordmark in app headers/sidebars, the full lockup for marketing/footers.
- No hero photography or illustration set. The system is glyph- and surface-driven.
