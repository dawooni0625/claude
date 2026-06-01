/* global React */
// KIRBS icon system — real 76-icon set (7 categories) from /icon/<category>/<name>.svg.
// Each SVG ships with `currentColor` fills/strokes, so colour is controlled via the
// wrapper's CSS `color`. We fetch + inline the SVG so currentColor inherits natively
// (works for monochrome strokes AND the opacity-shaded brand marks like Google).
//
// Usage:
//   <Icon name="navigation/home" size={24} color="var(--color-text-brand)" />
//   <IconHome size={20} />              // named convenience wrappers (see map below)

const ICON_BASE = '../../icon';     // relative to ui_kits/admin/index.html
const _iconCache = {};

function useIconSvg(name) {
  const [svg, setSvg] = React.useState(_iconCache[name] || null);
  React.useEffect(() => {
    if (_iconCache[name]) { setSvg(_iconCache[name]); return; }
    let alive = true;
    fetch(`${ICON_BASE}/${name}.svg`)
      .then(r => (r.ok ? r.text() : Promise.reject(r.status)))
      .then(text => {
        // Strip fixed width/height so the wrapper controls size; keep viewBox.
        const normalized = text.replace(/<svg([^>]*?)>/, (m, attrs) => {
          const cleaned = attrs
            .replace(/\swidth="[^"]*"/i, '')
            .replace(/\sheight="[^"]*"/i, '');
          return `<svg${cleaned} width="100%" height="100%">`;
        });
        _iconCache[name] = normalized;
        if (alive) setSvg(normalized);
      })
      .catch(() => { /* leave empty box on failure */ });
    return () => { alive = false; };
  }, [name]);
  return svg;
}

function Icon({ name, size = 20, color, style, ...rest }) {
  const svg = useIconSvg(name);
  return (
    <span
      aria-hidden="true"
      {...rest}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, flexShrink: 0,
        color: color || 'currentColor',
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: svg || '' }}
    />
  );
}

// ── Named convenience wrappers (used across the admin kit) ──────────
// Maps the legacy Icon* names to real files in the 76-icon set.
const NAME_MAP = {
  IconHome:        'navigation/home',
  IconUsers:       'user/users',
  IconChart:       'data/bar-chart-2',
  IconFile:        'content/file',
  IconSettings:    'user/settings',
  IconBell:        'notification/bell',
  IconSearch:      'navigation/search',
  IconPlus:        'action/plus',
  IconX:           'navigation/x',
  IconCheck:       'action/check',
  IconChevron:     'navigation/chevron-down',
  IconChevronR:    'navigation/chevron-right',
  IconArrowR:      'navigation/arrow-right',
  IconUpRight:     'navigation/external-link',
  IconMore:        'action/more-horizontal',
  IconFolder:      'content/folder',
  IconLogout:      'user/log-out',
  IconHelp:        'notification/help-circle',
  IconDownload:    'action/download',
  IconFilter:      'action/filter',
  IconCheckCircle: 'notification/check-circle-2',
  IconInfo:        'notification/info',
  IconAlert:       'notification/alert-triangle',
  IconTrendUp:     'data/trending-up',
  IconUserCircle:  'user/user',
};

const named = {};
for (const [comp, path] of Object.entries(NAME_MAP)) {
  named[comp] = (p) => <Icon name={path} {...p} />;
}

Object.assign(window, { Icon, ...named });
