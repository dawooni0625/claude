/* global React, IconSearch, IconBell, IconChevron, Avatar, IconButton, TextField, IconUserCircle, IconLogout, IconSettings, Icon, useViewport */
// 64px global nav-header · upstream `component.nav-header.*`

const HEADER_BREADCRUMBS = {
  dashboard: ['Workspace', '대시보드'],
  members:   ['Workspace', '멤버 관리'],
  analytics: ['Workspace', '분석'],
  projects:  ['Workspace', '프로젝트'],
  reports:   ['Reports',   '리포트'],
  settings:  ['System',    '설정'],
};

function TopBar({ active, onLogout, onMenuClick }) {
  const { isMobile } = useViewport();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const menuRef = React.useRef();
  const notifRef = React.useRef();

  React.useEffect(() => {
    const fn = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const crumbs = HEADER_BREADCRUMBS[active] || [];

  return (
    <header style={{
      height: 64, padding: isMobile ? '0 16px' : '0 32px',
      background: 'var(--color-bg-elevated)',
      borderBottom: '1px solid var(--color-border-default)',
      display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 24,
      flexShrink: 0,
    }}>
      {/* Hamburger (mobile / tablet) */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          aria-label="메뉴 열기"
          style={{
            width: 40, height: 40, flexShrink: 0,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: 'var(--color-text-secondary)',
            border: 0, borderRadius: 'var(--border-radius-sm)', cursor: 'pointer',
          }}
        >
          <Icon name="navigation/menu" size={22} />
        </button>
      )}

      {/* Breadcrumb (desktop) / page title (mobile) */}
      {isMobile ? (
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {crumbs[crumbs.length - 1] || active}
        </span>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <span style={{ color: 'var(--color-text-tertiary)' }}>/</span>
              )}
              <span style={{
                color: i === crumbs.length - 1 ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                fontWeight: i === crumbs.length - 1 ? 700 : 400,
              }}>{c}</span>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Search — full field on desktop, icon button on mobile */}
      {isMobile ? (
        <button
          aria-label="검색"
          style={{
            marginLeft: 'auto', width: 40, height: 40, flexShrink: 0,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: 'var(--color-text-secondary)',
            border: 0, borderRadius: 'var(--border-radius-sm)', cursor: 'pointer',
          }}
        >
          <IconSearch size={20} />
        </button>
      ) : (
        <div style={{ flex: 1, maxWidth: 480, marginLeft: 'auto' }}>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--color-text-tertiary)', display: 'inline-flex',
            }}><IconSearch size={16} /></span>
            <input
              type="search"
              placeholder="검색…"
              style={{
                width: '100%', height: 40,
                padding: '8px 14px 8px 36px',
                background: 'var(--color-bg-surface)',
                border: '1px solid transparent',
                borderRadius: 'var(--border-radius-md)',
                fontFamily: 'var(--font-family-base)', fontSize: 14,
                color: 'var(--color-text-primary)',
                outline: 'none',
              }}
              onFocus={e => { e.currentTarget.style.background = 'var(--color-bg-elevated)'; e.currentTarget.style.borderColor = 'var(--color-interactive-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,51,120,0.12)'; }}
              onBlur={e => { e.currentTarget.style.background = 'var(--color-bg-surface)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>
        </div>
      )}

      {/* Notifications */}
      <div ref={notifRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setNotifOpen(o => !o)}
          aria-label="Notifications"
          style={{
            position: 'relative', width: 40, height: 40,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: notifOpen ? 'var(--color-bg-surface)' : 'transparent',
            color: 'var(--color-text-secondary)',
            border: 0, borderRadius: 'var(--border-radius-sm)', cursor: 'pointer',
          }}
        >
          <IconBell size={20} />
          <span style={{
            position: 'absolute', top: 8, right: 8,
            width: 8, height: 8, background: 'var(--color-state-error)',
            border: '2px solid #FFFFFF', borderRadius: '50%',
          }}/>
        </button>
        {notifOpen && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 100,
            width: 320,
            background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--border-radius-md)',
            boxShadow: 'var(--elevation-2)', overflow: 'hidden',
          }}>
            <div style={{
              padding: '14px 16px',
              borderBottom: '1px solid var(--color-border-default)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>알림 3</span>
              <a style={{ fontSize: 12, color: 'var(--color-text-link)', textDecoration: 'none', cursor: 'pointer' }}>모두 읽음</a>
            </div>
            {[
              ['새 멤버 가입', '김지원 님이 워크스페이스에 합류했습니다.', '5분 전'],
              ['리포트 생성 완료', '12월 월간 리포트를 확인하세요.', '1시간 전'],
              ['결제 알림', '곧 청구 주기가 갱신됩니다.', '어제'],
            ].map(([title, body, time], i) => (
              <div key={i} style={{
                padding: '12px 16px',
                borderBottom: i < 2 ? '1px solid var(--color-border-default)' : 0,
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-bg-elevated)'}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginTop: 2 }}>{body}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', marginTop: 4 }}>{time}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Avatar dropdown */}
      <div ref={menuRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: menuOpen ? 'var(--color-bg-surface)' : 'transparent',
            border: 0, borderRadius: 'var(--border-radius-sm)',
            padding: '4px 8px 4px 4px', cursor: 'pointer',
          }}
        >
          <Avatar name="다우니" size="xs" />
          {!isMobile && <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>다우니</span>}
          {!isMobile && <IconChevron size={16} color="var(--color-text-tertiary)" />}
        </button>
        {menuOpen && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 100,
            width: 220,
            background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--border-radius-md)',
            boxShadow: 'var(--elevation-2)', overflow: 'hidden',
          }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border-default)' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>다우니</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>dawooni@kirbs.io</div>
            </div>
            {[['프로필', IconUserCircle], ['설정', IconSettings], ['로그아웃', IconLogout]].map(([label, Icon]) => (
              <div key={label}
                onClick={() => { setMenuOpen(false); if (label === '로그아웃') onLogout?.(); }}
                style={{ height: 40, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--color-text-primary)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-surface)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-bg-elevated)'}
              >
                <Icon size={16} color="var(--color-text-tertiary)" />
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

Object.assign(window, { TopBar });
