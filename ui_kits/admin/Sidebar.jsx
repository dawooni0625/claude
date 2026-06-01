/* global React, IconHome, IconUsers, IconChart, IconFile, IconSettings, IconChevron, IconHelp, IconLogout, IconFolder */
// 240px nav-sidebar · upstream `component.nav-sidebar.*`

const SIDEBAR_SECTIONS = [
  {
    label: 'WORKSPACE',
    items: [
      { id: 'dashboard', label: '대시보드', icon: IconHome },
      { id: 'members',   label: '멤버 관리', icon: IconUsers, badge: '14' },
      { id: 'analytics', label: '분석',     icon: IconChart },
      { id: 'projects',  label: '프로젝트',  icon: IconFolder },
    ],
  },
  {
    label: 'REPORTS',
    items: [
      { id: 'reports', label: '리포트', icon: IconFile },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'settings', label: '설정', icon: IconSettings },
    ],
  },
];

function SidebarItem({ item, active, onClick }) {
  const Icon = item.icon;
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: 44, padding: '0 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderRadius: 6,
        cursor: 'pointer',
        background: active ? 'var(--color-brand-quaternary)' : hover ? 'var(--color-bg-surface)' : 'transparent',
        color: active ? 'var(--color-text-brand)' : 'var(--color-text-tertiary)',
        fontWeight: active ? 700 : 500,
        fontSize: 14,
        transition: 'background-color 100ms, color 100ms',
      }}
    >
      <Icon size={20} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge && (
        <span style={{
          fontSize: 11, fontWeight: 700,
          padding: '2px 8px',
          background: active ? 'var(--color-text-brand)' : 'var(--color-gray-5)',
          color: active ? '#FFFFFF' : 'var(--color-text-tertiary)',
          borderRadius: 99,
        }}>{item.badge}</span>
      )}
    </div>
  );
}

function Sidebar({ active, onNavigate, drawer = false, open = false, onClose }) {
  const aside = (
    <aside style={{
      width: 240, flexShrink: 0,
      background: 'var(--color-bg-elevated)',
      borderRight: '1px solid var(--color-border-default)',
      display: 'flex', flexDirection: 'column',
      height: '100%',
      ...(drawer ? {
        position: 'fixed', top: 0, left: 0, zIndex: 'var(--z-modal, 400)',
        boxShadow: 'var(--elevation-3)',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 300ms cubic-bezier(0,0,.2,1)',
      } : {}),
    }}>
      {/* Brand */}
      <div style={{
        height: 64, padding: '0 20px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid var(--color-border-default)',
      }}>
        <div style={{
          width: 28, height: 28,
          background: 'var(--color-interactive-primary)',
          color: '#FFFFFF',
          borderRadius: 'var(--border-radius-sm)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 16, letterSpacing: '-0.04em',
        }}>K</div>
        <span style={{
          fontWeight: 800, fontSize: 17, letterSpacing: '-0.025em',
          color: 'var(--color-text-primary)',
        }}>KIRBS</span>
      </div>

      {/* Sections */}
      <nav style={{ flex: 1, padding: '20px 12px', overflowY: 'auto' }}>
        {SIDEBAR_SECTIONS.map((section, i) => (
          <div key={section.label} style={{ marginBottom: 20 }}>
            <div style={{
              padding: '0 16px 8px',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
              color: 'var(--color-text-tertiary)',
              textTransform: 'uppercase',
            }}>{section.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section.items.map(item => (
                <SidebarItem key={item.id} item={item} active={active === item.id} onClick={() => onNavigate(item.id)} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: 12,
        borderTop: '1px solid var(--color-border-default)',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        <SidebarItem item={{ id: 'help', label: '도움말', icon: IconHelp }} onClick={() => {}} />
        <SidebarItem item={{ id: 'logout', label: '로그아웃', icon: IconLogout }} onClick={() => {}} />
      </div>
    </aside>
  );

  if (!drawer) return aside;

  // Drawer mode: backdrop + sliding panel
  return (
    <React.Fragment>
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 'var(--z-overlay, 300)',
          background: 'var(--color-bg-overlay)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 300ms cubic-bezier(0,0,.2,1)',
        }}
      />
      {aside}
    </React.Fragment>
  );
}

Object.assign(window, { Sidebar });
