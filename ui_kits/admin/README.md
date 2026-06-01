# Admin UI Kit

A clickable B2B admin/console built entirely on KIRBS design tokens.

## Run it

Open `index.html` directly — no build step. React, ReactDOM, and Babel
load from unpkg with integrity hashes pinned.

## What's in here

| File | Role |
|---|---|
| `index.html` | Entry point. Loads React + Babel, then every JSX module below in dependency order, then mounts `<App />`. |
| `App.jsx` | Top-level shell. Owns auth toggle, screen routing (`dashboard` / `members` / `settings` / placeholders), modal state, toast stack, and a light/dark theme toggle. |
| `Sidebar.jsx` | 240px nav with sections (`Workspace`, `Reports`, `System`), badges, hover/active states. |
| `TopBar.jsx` | 64px global header with breadcrumb, search, notification bell, avatar menu. |
| `LoginScreen.jsx` | Centred 420px card. Demonstrates form layout, focus states, primary CTA, brand mark. |
| `DashboardScreen.jsx` | KPI stat cards + recent-activity feed. |
| `MembersScreen.jsx` | Data table with sort, row hover, badges, pagination, and the `InviteModal` it triggers. |
| `SettingsScreen.jsx` | Tabbed, form-heavy screen: text fields, toggles, radio groups, primary/secondary action row. |
| `Atoms.jsx` | Visual atoms — `Button`, `IconButton`, `Badge`, `Avatar`, `AvatarStack`. |
| `Forms.jsx` | Form atoms — `TextField`, `Textarea`, `Toggle`, `Checkbox`, `Radio`, `RadioGroup`, `Select`. |
| `Surfaces.jsx` | Container atoms — `Card`, `Modal`, `Toast`, `ToastStack`. |
| `Icons.jsx` | 113-icon set loader — fetches + inlines SVGs from `icon/<category>/`. Legacy `Icon*` names map to real files. |
| `Responsive.jsx` | `useViewport()` hook — live width + `isMobile`/`isTablet`/`isDesktop`/`drawerNav` flags (breakpoints 768 / 1024). |

## Responsive behavior

The shell adapts at the KIRBS grid breakpoints (inline styles switched via `useViewport()`, since inline styles can't carry media queries):

- **≥ 1024 (desktop)** — static 240px sidebar, full breadcrumb, wide search field, 4-up KPI grid, two-column dashboard, side-by-side settings sections.
- **< 1024 (tablet / mobile)** — sidebar collapses to an off-canvas **drawer** opened by a hamburger in the top bar (backdrop + slide-in).
- **< 768 (mobile)** — breadcrumb condenses to the page title, search becomes an icon button, avatar hides its name, KPI grid auto-fits down to 1-up, dashboard + settings sections stack, the members table scrolls horizontally (min-width 720), toasts span the viewport width, modals cap height and scroll.

Resize the preview to see it reflow.

## Conventions

- **Tokens, always.** No hardcoded colour/size — everything reads from `var(--color-*)` / `var(--space-*)` / `var(--border-radius-*)` etc.
- **No CSS files per component.** Styles live as `const fooStyles = { … }` objects with file-specific names (the project shares `window` scope across `<script>` tags — generic `styles` would collide).
- **Sharing across files.** Each module ends with `Object.assign(window, { Comp1, Comp2, … })`. New components must be added there, or the next file in the load order won't see them.
- **State.** Plain prop-drilling. `setScreen` / `setModal` / `pushToast` flow top-down from `App.jsx`. No router, no state library.

## Click path to verify

1. Land on **login** — enter any email containing `@` + ≥4-char password → click 로그인.
2. Toast confirms login; **dashboard** appears with KPIs.
3. Click **멤버 관리** in the sidebar → table renders.
4. Click **초대하기** → invite modal opens → submit → toast confirms.
5. Click **설정** → tabbed form → 저장 → toast confirms.
6. Bottom-right **☀️ / 🌙** toggle flips `<html data-theme>` — every screen rethemes via semantic tokens.
7. Avatar menu → 로그아웃 returns to login.

## What it doesn't do

- No real auth / network. Everything is local state.
- No persistence — refresh resets to login.
- No keyboard nav beyond the browser default. Real products should add proper `tabindex` + ARIA at the product layer.
- The placeholder screens (`analytics`, `projects`, `reports`) are out-of-scope stubs.

## Where the design comes from

Every visual decision was lifted from `tokens/component.json` + `tokens/semantic.json` upstream — not from a screenshot. If something looks "off", the right move is to fix the token, not the JSX.
