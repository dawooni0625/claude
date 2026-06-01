/* global React */
// KIRBS atomic visuals: Button, IconButton, Badge, Avatar, Tag.
// All sizes/colours read from `tokens.css` CSS vars.

// ── Button ────────────────────────────────────────────────────────
const BTN_VARIANT = {
  primary:   { bg: 'var(--color-interactive-primary)',        fg: '#FFFFFF',                          hov: 'var(--color-interactive-primary-hover)' },
  secondary: { bg: 'var(--color-bg-elevated)',                 fg: 'var(--color-interactive-primary)', hov: 'var(--color-brand-quaternary)', border: 'var(--color-interactive-primary)' },
  tertiary:  { bg: 'transparent',                              fg: 'var(--color-interactive-primary)', hov: 'var(--color-brand-quaternary)' },
  danger:    { bg: 'var(--color-interactive-danger)',          fg: '#FFFFFF',                          hov: 'var(--color-interactive-danger-hover)' },
};
const BTN_SIZE = {
  sm: { h: 45, min: 70, fs: 14, px: 14 },
  md: { h: 56, min: 80, fs: 16, px: 20 },
  lg: { h: 63, min: 90, fs: 18, px: 24 },
  xl: { h: 70, min: 100, fs: 20, px: 28 },
};
function Button({ variant = 'primary', size = 'md', shape = 'square', icon, iconRight, children, disabled, onClick, fullWidth, style }) {
  const v = BTN_VARIANT[variant];
  const s = BTN_SIZE[size];
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const bg = disabled
    ? 'var(--color-interactive-primary-disabled)'
    : active && variant === 'primary' ? 'var(--color-interactive-primary-active)'
    : hover ? v.hov : v.bg;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        height: s.h, minWidth: s.min, padding: `0 ${s.px}px`,
        fontFamily: 'var(--font-family-base)', fontSize: s.fs, fontWeight: 700, lineHeight: 1,
        background: bg, color: disabled ? '#FFFFFF' : v.fg,
        border: v.border ? `1.5px solid ${v.border}` : 0,
        borderRadius: shape === 'round' ? 99 : 'var(--border-radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 100ms cubic-bezier(0,0,.2,1), color 100ms cubic-bezier(0,0,.2,1)',
        width: fullWidth ? '100%' : undefined,
        ...style,
      }}
    >
      {icon}{children}{iconRight}
    </button>
  );
}

// ── Icon button (square, ghost) ────────────────────────────────────
function IconButton({ icon, size = 36, onClick, active, ariaLabel, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={ariaLabel}
      style={{
        width: size, height: size,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'var(--color-brand-quaternary)' : hover ? 'var(--color-bg-surface)' : 'transparent',
        color: active ? 'var(--color-text-brand)' : 'var(--color-text-secondary)',
        border: 0, borderRadius: 'var(--border-radius-sm)', cursor: 'pointer',
        transition: 'background-color 100ms cubic-bezier(0,0,.2,1)',
        ...style,
      }}
    >
      {icon}
    </button>
  );
}

// ── Badge (pill) ──────────────────────────────────────────────────
const BADGE_TONE = {
  brand:   { bg: 'var(--color-bg-brand)',     fg: '#FFFFFF' },
  info:    { bg: '#2F80ED',                   fg: '#FFFFFF' },
  success: { bg: 'var(--color-state-success)',fg: '#FFFFFF' },
  warning: { bg: 'var(--color-state-warning)',fg: '#000000' },
  error:   { bg: 'var(--color-state-error)',  fg: '#FFFFFF' },
  neutral: { bg: 'var(--color-gray-5)',       fg: 'var(--color-text-secondary)' },
  // subtle (soft fill, coloured text)
  'success-subtle': { bg: 'var(--color-bg-success)', fg: 'var(--color-state-success)' },
  'error-subtle':   { bg: 'var(--color-bg-error)',   fg: 'var(--color-state-error)' },
  'info-subtle':    { bg: 'var(--color-bg-info)',    fg: 'var(--color-state-info)' },
  'brand-subtle':   { bg: 'var(--color-bg-brand-subtle)', fg: 'var(--color-text-brand)' },
};
function Badge({ tone = 'brand', children, style }) {
  const t = BADGE_TONE[tone] || BADGE_TONE.brand;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 12px',
      fontSize: 12, fontWeight: 700, lineHeight: 1.4,
      color: t.fg, background: t.bg,
      borderRadius: 99,
      whiteSpace: 'nowrap',
      ...style,
    }}>{children}</span>
  );
}

// ── Avatar ────────────────────────────────────────────────────────
const AVATAR_SIZE = { sm: 40, md: 64, lg: 80, xs: 32 };
const AVATAR_FS   = { sm: 14, md: 20, lg: 26, xs: 12 };
const AVATAR_COLORS = ['#2D3378', '#5B63A8', '#8E96D3', '#E2B93B', '#27AE60', '#EB5757'];
function avatarColor(seed = '') {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function Avatar({ name = '?', size = 'md', bordered, color, style }) {
  const px = typeof size === 'number' ? size : AVATAR_SIZE[size];
  const fs = typeof size === 'number' ? Math.round(size * 0.4) : AVATAR_FS[size];
  const bg = color || avatarColor(name);
  const initials = name.split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || '?';
  return (
    <div style={{
      width: px, height: px, borderRadius: '50%',
      background: bg, color: '#FFFFFF',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: fs,
      border: bordered ? '2px solid #FFFFFF' : undefined,
      flexShrink: 0,
      ...style,
    }}>{initials}</div>
  );
}

function AvatarStack({ names = [], size = 'sm', max = 4 }) {
  const px = typeof size === 'number' ? size : AVATAR_SIZE[size];
  const visible = names.slice(0, max);
  const extra = names.length - visible.length;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {visible.map((n, i) => (
        <Avatar key={n + i} name={n} size={size} bordered style={{ marginLeft: i ? -10 : 0 }} />
      ))}
      {extra > 0 && (
        <div style={{
          marginLeft: -10, width: px, height: px, borderRadius: '50%',
          background: 'var(--color-brand-quaternary)', color: 'var(--color-text-brand)',
          border: '2px solid #FFFFFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: Math.round(px * 0.32),
        }}>+{extra}</div>
      )}
    </div>
  );
}

Object.assign(window, { Button, IconButton, Badge, Avatar, AvatarStack });
