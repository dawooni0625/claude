/* global React, LoginScreen, Sidebar, TopBar, DashboardScreen, MembersScreen, SettingsScreen, InviteModal, ToastStack, useViewport */
// Top-level admin shell.
//   - LoginScreen → Authed shell (sidebar + topbar + screen slot)
//   - Responsive: sidebar becomes a drawer below 1024px (hamburger in top bar).
//   - Light/dark theme toggle via <html data-theme> (fixed bottom-right).
//   - Plain prop-drilling for screen + modal + toast state.

const SCREEN_TITLE = {
  dashboard: '대시보드',
  members:   '멤버 관리',
  analytics: '분석',
  projects:  '프로젝트',
  reports:   '리포트',
  settings:  '설정',
};

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="테마 전환"
      style={{
        position: 'fixed', right: 20, bottom: 20,
        height: 40, padding: '0 14px',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'var(--color-bg-elevated)',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 99,
        boxShadow: 'var(--elevation-2)',
        fontFamily: 'var(--font-family-base)',
        fontSize: 13, fontWeight: 700,
        cursor: 'pointer',
        zIndex: 800,
      }}
    >
      <span aria-hidden style={{ fontSize: 14 }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}

function ScreenPlaceholder({ id }) {
  return (
    <div style={{
      padding: 48,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 12, minHeight: 400,
      color: 'var(--color-text-tertiary)',
    }}>
      <div style={{
        fontSize: 13, fontFamily: 'var(--font-family-mono)',
        padding: '4px 10px', border: '1px dashed var(--color-border-default)',
        borderRadius: 'var(--border-radius-md)',
        color: 'var(--color-text-tertiary)',
      }}>
        screen: {id}
      </div>
      <p style={{ fontSize: 14, margin: 0 }}>
        이 화면은 UI 킷 데모 범위 밖이에요 — 사이드바의 다른 항목을 눌러보세요.
      </p>
    </div>
  );
}

function App() {
  const { drawerNav, isMobile } = useViewport();
  const [authed, setAuthed]     = React.useState(false);
  const [screen, setScreen]     = React.useState('dashboard');
  const [theme,  setTheme]      = React.useState('light');
  const [modal,  setModal]      = React.useState(null);   // null | 'invite'
  const [toasts, setToasts]     = React.useState([]);
  const [navOpen, setNavOpen]   = React.useState(false);  // drawer open (mobile/tablet)

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Close the drawer whenever we cross back to desktop.
  React.useEffect(() => { if (!drawerNav) setNavOpen(false); }, [drawerNav]);

  const pushToast = React.useCallback((message, tone = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, tone, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  const dismissToast = React.useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  // ── Unauthed
  if (!authed) {
    return (
      <div style={{ height: '100%', background: 'var(--color-bg-surface)' }}>
        <LoginScreen onLogin={() => {
          setAuthed(true);
          pushToast('환영합니다. 로그인되었어요.');
        }} />
        <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      </div>
    );
  }

  // ── Authed shell
  let body;
  switch (screen) {
    case 'dashboard':
      body = <DashboardScreen onAddProject={() => pushToast('새 프로젝트가 추가되었어요.')} />;
      break;
    case 'members':
      body = <MembersScreen onInvite={() => setModal('invite')} />;
      break;
    case 'settings':
      body = <SettingsScreen onSave={() => pushToast('변경 사항이 저장되었어요.')} />;
      break;
    default:
      body = <ScreenPlaceholder id={screen} />;
  }

  const navigate = (id) => { setScreen(id); setNavOpen(false); };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--color-bg-surface)',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-family-base)',
    }}>
      <Sidebar
        active={screen}
        onNavigate={navigate}
        drawer={drawerNav}
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar
          active={SCREEN_TITLE[screen] || screen}
          onLogout={() => { setAuthed(false); setScreen('dashboard'); }}
          onMenuClick={drawerNav ? () => setNavOpen(true) : undefined}
        />
        <main style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '20px 16px' : '28px 32px' }}>{body}</main>
      </div>

      {modal === 'invite' && (
        <InviteModal
          open
          onClose={() => setModal(null)}
          onInvited={(email) => {
            setModal(null);
            pushToast(`${email}로 초대장을 보냈어요.`);
          }}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
      <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
