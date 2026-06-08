/* @ds-bundle: {"format":3,"namespace":"KIRBSDesignSystem_dc1229","components":[],"sourceHashes":{"ui_kits/admin/App.jsx":"409c1f87e983","ui_kits/admin/Atoms.jsx":"2f32da579ac8","ui_kits/admin/DashboardScreen.jsx":"97b7a52a755d","ui_kits/admin/Forms.jsx":"85965cb4fbf9","ui_kits/admin/Icons.jsx":"8d05eae554ad","ui_kits/admin/LoginScreen.jsx":"0b5670116ec4","ui_kits/admin/MembersScreen.jsx":"1ef9287d7070","ui_kits/admin/Responsive.jsx":"816c2978eefc","ui_kits/admin/SettingsScreen.jsx":"ad3b55006ac7","ui_kits/admin/Sidebar.jsx":"b368cde750c2","ui_kits/admin/Surfaces.jsx":"3dbd3d07f769","ui_kits/admin/TopBar.jsx":"698a0155fc63"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KIRBSDesignSystem_dc1229 = window.KIRBSDesignSystem_dc1229 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/admin/App.jsx
try { (() => {
/* global React, LoginScreen, Sidebar, TopBar, DashboardScreen, MembersScreen, SettingsScreen, InviteModal, ToastStack, useViewport */
// Top-level admin shell.
//   - LoginScreen → Authed shell (sidebar + topbar + screen slot)
//   - Responsive: sidebar becomes a drawer below 1024px (hamburger in top bar).
//   - Light/dark theme toggle via <html data-theme> (fixed bottom-right).
//   - Plain prop-drilling for screen + modal + toast state.

const SCREEN_TITLE = {
  dashboard: '대시보드',
  members: '멤버 관리',
  analytics: '분석',
  projects: '프로젝트',
  reports: '리포트',
  settings: '설정'
};
function ThemeToggle({
  theme,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-label": "\uD14C\uB9C8 \uC804\uD658",
    style: {
      position: 'fixed',
      right: 20,
      bottom: 20,
      height: 40,
      padding: '0 14px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--color-bg-elevated)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 99,
      boxShadow: 'var(--elevation-2)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 13,
      fontWeight: 700,
      cursor: 'pointer',
      zIndex: 800
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      fontSize: 14
    }
  }, theme === 'dark' ? '🌙' : '☀️'), theme === 'dark' ? 'Dark' : 'Light');
}
function ScreenPlaceholder({
  id
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 48,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      minHeight: 400,
      color: 'var(--color-text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontFamily: 'var(--font-family-mono)',
      padding: '4px 10px',
      border: '1px dashed var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      color: 'var(--color-text-tertiary)'
    }
  }, "screen: ", id), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      margin: 0
    }
  }, "\uC774 \uD654\uBA74\uC740 UI \uD0B7 \uB370\uBAA8 \uBC94\uC704 \uBC16\uC774\uC5D0\uC694 \u2014 \uC0AC\uC774\uB4DC\uBC14\uC758 \uB2E4\uB978 \uD56D\uBAA9\uC744 \uB20C\uB7EC\uBCF4\uC138\uC694."));
}
function App() {
  const {
    drawerNav,
    isMobile
  } = useViewport();
  const [authed, setAuthed] = React.useState(false);
  const [screen, setScreen] = React.useState('dashboard');
  const [theme, setTheme] = React.useState('light');
  const [modal, setModal] = React.useState(null); // null | 'invite'
  const [toasts, setToasts] = React.useState([]);
  const [navOpen, setNavOpen] = React.useState(false); // drawer open (mobile/tablet)

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Close the drawer whenever we cross back to desktop.
  React.useEffect(() => {
    if (!drawerNav) setNavOpen(false);
  }, [drawerNav]);
  const pushToast = React.useCallback((message, tone = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, {
      id,
      tone,
      message
    }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  const dismissToast = React.useCallback(id => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  // ── Unauthed
  if (!authed) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        background: 'var(--color-bg-surface)'
      }
    }, /*#__PURE__*/React.createElement(LoginScreen, {
      onLogin: () => {
        setAuthed(true);
        pushToast('환영합니다. 로그인되었어요.');
      }
    }), /*#__PURE__*/React.createElement(ThemeToggle, {
      theme: theme,
      onToggle: () => setTheme(theme === 'dark' ? 'light' : 'dark')
    }));
  }

  // ── Authed shell
  let body;
  switch (screen) {
    case 'dashboard':
      body = /*#__PURE__*/React.createElement(DashboardScreen, {
        onAddProject: () => pushToast('새 프로젝트가 추가되었어요.')
      });
      break;
    case 'members':
      body = /*#__PURE__*/React.createElement(MembersScreen, {
        onInvite: () => setModal('invite')
      });
      break;
    case 'settings':
      body = /*#__PURE__*/React.createElement(SettingsScreen, {
        onSave: () => pushToast('변경 사항이 저장되었어요.')
      });
      break;
    default:
      body = /*#__PURE__*/React.createElement(ScreenPlaceholder, {
        id: screen
      });
  }
  const navigate = id => {
    setScreen(id);
    setNavOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      background: 'var(--color-bg-surface)',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-family-base)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: screen,
    onNavigate: navigate,
    drawer: drawerNav,
    open: navOpen,
    onClose: () => setNavOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    active: SCREEN_TITLE[screen] || screen,
    onLogout: () => {
      setAuthed(false);
      setScreen('dashboard');
    },
    onMenuClick: drawerNav ? () => setNavOpen(true) : undefined
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: isMobile ? '20px 16px' : '28px 32px'
    }
  }, body)), modal === 'invite' && /*#__PURE__*/React.createElement(InviteModal, {
    open: true,
    onClose: () => setModal(null),
    onInvited: email => {
      setModal(null);
      pushToast(`${email}로 초대장을 보냈어요.`);
    }
  }), /*#__PURE__*/React.createElement(ToastStack, {
    toasts: toasts,
    onDismiss: dismissToast
  }), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onToggle: () => setTheme(theme === 'dark' ? 'light' : 'dark')
  }));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Atoms.jsx
try { (() => {
/* global React */
// KIRBS atomic visuals: Button, IconButton, Badge, Avatar, Tag.
// All sizes/colours read from `tokens.css` CSS vars.

// ── Button ────────────────────────────────────────────────────────
const BTN_VARIANT = {
  primary: {
    bg: 'var(--color-interactive-primary)',
    fg: '#FFFFFF',
    hov: 'var(--color-interactive-primary-hover)'
  },
  secondary: {
    bg: 'var(--color-bg-elevated)',
    fg: 'var(--color-interactive-primary)',
    hov: 'var(--color-brand-quaternary)',
    border: 'var(--color-interactive-primary)'
  },
  tertiary: {
    bg: 'transparent',
    fg: 'var(--color-interactive-primary)',
    hov: 'var(--color-brand-quaternary)'
  },
  danger: {
    bg: 'var(--color-interactive-danger)',
    fg: '#FFFFFF',
    hov: 'var(--color-interactive-danger-hover)'
  }
};
const BTN_SIZE = {
  sm: {
    h: 45,
    min: 70,
    fs: 14,
    px: 14
  },
  md: {
    h: 56,
    min: 80,
    fs: 16,
    px: 20
  },
  lg: {
    h: 63,
    min: 90,
    fs: 18,
    px: 24
  },
  xl: {
    h: 70,
    min: 100,
    fs: 20,
    px: 28
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  shape = 'square',
  icon,
  iconRight,
  children,
  disabled,
  onClick,
  fullWidth,
  style
}) {
  const v = BTN_VARIANT[variant];
  const s = BTN_SIZE[size];
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const bg = disabled ? 'var(--color-interactive-primary-disabled)' : active && variant === 'primary' ? 'var(--color-interactive-primary-active)' : hover ? v.hov : v.bg;
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: s.h,
      minWidth: s.min,
      padding: `0 ${s.px}px`,
      fontFamily: 'var(--font-family-base)',
      fontSize: s.fs,
      fontWeight: 700,
      lineHeight: 1,
      background: bg,
      color: disabled ? '#FFFFFF' : v.fg,
      border: v.border ? `1.5px solid ${v.border}` : 0,
      borderRadius: shape === 'round' ? 99 : 'var(--border-radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 100ms cubic-bezier(0,0,.2,1), color 100ms cubic-bezier(0,0,.2,1)',
      width: fullWidth ? '100%' : undefined,
      ...style
    }
  }, icon, children, iconRight);
}

// ── Icon button (square, ghost) ────────────────────────────────────
function IconButton({
  icon,
  size = 36,
  onClick,
  active,
  ariaLabel,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": ariaLabel,
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? 'var(--color-brand-quaternary)' : hover ? 'var(--color-bg-surface)' : 'transparent',
      color: active ? 'var(--color-text-brand)' : 'var(--color-text-secondary)',
      border: 0,
      borderRadius: 'var(--border-radius-sm)',
      cursor: 'pointer',
      transition: 'background-color 100ms cubic-bezier(0,0,.2,1)',
      ...style
    }
  }, icon);
}

// ── Badge (pill) ──────────────────────────────────────────────────
const BADGE_TONE = {
  brand: {
    bg: 'var(--color-bg-brand)',
    fg: '#FFFFFF'
  },
  info: {
    bg: '#2F80ED',
    fg: '#FFFFFF'
  },
  success: {
    bg: 'var(--color-state-success)',
    fg: '#FFFFFF'
  },
  warning: {
    bg: 'var(--color-state-warning)',
    fg: '#000000'
  },
  error: {
    bg: 'var(--color-state-error)',
    fg: '#FFFFFF'
  },
  neutral: {
    bg: 'var(--color-gray-5)',
    fg: 'var(--color-text-secondary)'
  },
  // subtle (soft fill, coloured text)
  'success-subtle': {
    bg: 'var(--color-bg-success)',
    fg: 'var(--color-state-success)'
  },
  'error-subtle': {
    bg: 'var(--color-bg-error)',
    fg: 'var(--color-state-error)'
  },
  'info-subtle': {
    bg: 'var(--color-bg-info)',
    fg: 'var(--color-state-info)'
  },
  'brand-subtle': {
    bg: 'var(--color-bg-brand-subtle)',
    fg: 'var(--color-text-brand)'
  }
};
function Badge({
  tone = 'brand',
  children,
  style
}) {
  const t = BADGE_TONE[tone] || BADGE_TONE.brand;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1.4,
      color: t.fg,
      background: t.bg,
      borderRadius: 99,
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}

// ── Avatar ────────────────────────────────────────────────────────
const AVATAR_SIZE = {
  sm: 40,
  md: 64,
  lg: 80,
  xs: 32
};
const AVATAR_FS = {
  sm: 14,
  md: 20,
  lg: 26,
  xs: 12
};
const AVATAR_COLORS = ['#2D3378', '#5B63A8', '#8E96D3', '#E2B93B', '#27AE60', '#EB5757'];
function avatarColor(seed = '') {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = h * 31 + seed.charCodeAt(i) | 0;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function Avatar({
  name = '?',
  size = 'md',
  bordered,
  color,
  style
}) {
  const px = typeof size === 'number' ? size : AVATAR_SIZE[size];
  const fs = typeof size === 'number' ? Math.round(size * 0.4) : AVATAR_FS[size];
  const bg = color || avatarColor(name);
  const initials = name.split(/\s+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || '?';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: px,
      height: px,
      borderRadius: '50%',
      background: bg,
      color: '#FFFFFF',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: fs,
      border: bordered ? '2px solid #FFFFFF' : undefined,
      flexShrink: 0,
      ...style
    }
  }, initials);
}
function AvatarStack({
  names = [],
  size = 'sm',
  max = 4
}) {
  const px = typeof size === 'number' ? size : AVATAR_SIZE[size];
  const visible = names.slice(0, max);
  const extra = names.length - visible.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, visible.map((n, i) => /*#__PURE__*/React.createElement(Avatar, {
    key: n + i,
    name: n,
    size: size,
    bordered: true,
    style: {
      marginLeft: i ? -10 : 0
    }
  })), extra > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: -10,
      width: px,
      height: px,
      borderRadius: '50%',
      background: 'var(--color-brand-quaternary)',
      color: 'var(--color-text-brand)',
      border: '2px solid #FFFFFF',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: Math.round(px * 0.32)
    }
  }, "+", extra));
}
Object.assign(window, {
  Button,
  IconButton,
  Badge,
  Avatar,
  AvatarStack
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Atoms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/DashboardScreen.jsx
try { (() => {
/* global React, Card, Badge, Button, AvatarStack, IconTrendUp, IconArrowR, IconPlus, IconChart, IconUsers, IconFile, useViewport */
// Dashboard — KPI cards + recent activity feed + spark "chart".

const KPIS = [{
  label: '월간 매출',
  value: '₩ 42.8M',
  delta: '+12.4%',
  trend: 'up',
  tone: 'success'
}, {
  label: '신규 가입',
  value: '184',
  delta: '+8.2%',
  trend: 'up',
  tone: 'success'
}, {
  label: '활성 사용자',
  value: '2,184',
  delta: '+3.1%',
  trend: 'up',
  tone: 'success'
}, {
  label: '이탈률',
  value: '2.4%',
  delta: '−0.6%p',
  trend: 'down',
  tone: 'success'
}];
function StatCard({
  kpi
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--color-text-tertiary)'
    }
  }, kpi.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--color-text-success)'
    }
  }, /*#__PURE__*/React.createElement(IconTrendUp, {
    size: 12
  }), kpi.delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.01em'
    }
  }, kpi.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      height: 32,
      background: 'var(--color-bg-surface)',
      borderRadius: 4,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 32",
    preserveAspectRatio: "none",
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    fill: "none",
    stroke: "var(--color-brand-secondary)",
    strokeWidth: "1.5",
    points: "0,24 20,20 40,22 60,16 80,18 100,12 120,14 140,8 160,10 180,4 200,6"
  }), /*#__PURE__*/React.createElement("polyline", {
    fill: "var(--color-brand-quaternary)",
    stroke: "none",
    opacity: "0.6",
    points: "0,24 20,20 40,22 60,16 80,18 100,12 120,14 140,8 160,10 180,4 200,6 200,32 0,32"
  }))));
}
const ACTIVITY = [{
  who: '김지원',
  what: '새 프로젝트를 만들었습니다',
  where: 'KIRBS Design v2',
  when: '5분 전',
  tone: 'brand-subtle'
}, {
  who: '이서연',
  what: '문서를 업로드했습니다',
  where: '2024년 4분기 리포트',
  when: '12분 전',
  tone: 'info-subtle'
}, {
  who: '박민준',
  what: '워크스페이스에 합류했습니다',
  where: 'KIRBS Admin',
  when: '1시간 전',
  tone: 'success-subtle'
}, {
  who: '최예린',
  what: '결제 정보를 업데이트했습니다',
  where: '청구 · Enterprise',
  when: '3시간 전',
  tone: 'brand-subtle'
}, {
  who: '정하늘',
  what: '리포트를 공유했습니다',
  where: 'NPS 월간 트래킹',
  when: '어제',
  tone: 'info-subtle'
}];
function DashboardScreen({
  onAddProject
}) {
  const {
    isMobile
  } = useViewport();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: isMobile ? 24 : 32,
      fontWeight: 700,
      letterSpacing: '-0.01em'
    }
  }, "\uB300\uC2DC\uBCF4\uB4DC"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 14,
      color: 'var(--color-text-tertiary)'
    }
  }, "\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uC804\uBC18\uC758 \uD575\uC2EC \uC9C0\uD45C\uB97C \uD55C\uB208\uC5D0 \uD655\uC778\uD558\uC138\uC694.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "\uAE30\uAC04: 30\uC77C"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(IconPlus, {
      size: 16
    }),
    onClick: onAddProject
  }, "\uD504\uB85C\uC81D\uD2B8 \uCD94\uAC00"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 16,
      marginBottom: 24
    }
  }, KPIS.map(kpi => /*#__PURE__*/React.createElement(StatCard, {
    key: kpi.label,
    kpi: kpi
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 24
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700
    }
  }, "\uC8FC\uAC04 \uD65C\uC131 \uC0AC\uC6A9\uC790"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-tertiary)'
    }
  }, "\uCD5C\uADFC 8\uC8FC")), /*#__PURE__*/React.createElement(Badge, {
    tone: "success-subtle"
  }, "+12.4% vs prev")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 200,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 200",
    preserveAspectRatio: "none",
    style: {
      width: '100%',
      height: '100%'
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "0",
    x2: "400",
    y1: i * 50,
    y2: i * 50,
    stroke: "var(--color-border-default)",
    strokeWidth: "1",
    strokeDasharray: "2 4"
  })), [110, 135, 120, 155, 140, 175, 168, 185].map((h, i) => /*#__PURE__*/React.createElement("rect", {
    key: i,
    x: i * 48 + 16,
    y: 200 - h,
    width: 28,
    height: h,
    rx: 4,
    fill: i === 7 ? 'var(--color-interactive-primary)' : 'var(--color-brand-tertiary)',
    opacity: i === 7 ? 1 : 0.6
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      fontSize: 11,
      color: 'var(--color-text-tertiary)'
    }
  }, ['W37', 'W38', 'W39', 'W40', 'W41', 'W42', 'W43', 'W44'].map(w => /*#__PURE__*/React.createElement("span", {
    key: w
  }, w)))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700
    }
  }, "\uCD5C\uADFC \uD65C\uB3D9"), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-link)',
      cursor: 'pointer'
    }
  }, "\uC804\uCCB4 \uBCF4\uAE30")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, ACTIVITY.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '12px 20px',
      borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--color-border-default)' : 0,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--color-brand-quaternary)',
      color: 'var(--color-text-brand)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 12,
      flexShrink: 0
    }
  }, a.who[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-primary)',
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("strong", null, a.who), " ", a.what), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-tertiary)',
      marginTop: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, a.where, " \xB7 ", a.when))))))));
}
Object.assign(window, {
  DashboardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Forms.jsx
try { (() => {
/* global React, IconCheck, IconChevron */
// Form atoms: TextField, Toggle, Checkbox, RadioGroup.

function TextField({
  label,
  helper,
  error,
  success,
  icon,
  value,
  onChange,
  type = 'text',
  placeholder,
  size = 'md',
  disabled,
  style
}) {
  const [focused, setFocused] = React.useState(false);
  const H = {
    sm: 32,
    md: 48,
    lg: 56
  }[size];
  const borderColor = error ? 'var(--color-border-error)' : success ? 'var(--color-border-success)' : focused ? 'var(--color-interactive-primary)' : 'var(--color-border-default)';
  const helperColor = error ? 'var(--color-text-error)' : success ? 'var(--color-text-success)' : 'var(--color-text-tertiary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--color-text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--color-text-tertiary)',
      display: 'inline-flex'
    }
  }, icon), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value ?? '',
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      height: H,
      padding: icon ? `8px 14px 8px 38px` : `8px 14px`,
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--border-radius-md)',
      background: disabled ? 'var(--color-bg-muted)' : 'var(--color-bg-elevated)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 14,
      color: 'var(--color-text-primary)',
      outline: 'none',
      boxSizing: 'border-box',
      boxShadow: focused && !error ? '0 0 0 3px rgba(45,51,120,0.12)' : 'none',
      transition: 'border-color 100ms, box-shadow 100ms'
    }
  })), (helper || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: helperColor
    }
  }, error || helper));
}
function Textarea({
  label,
  helper,
  value,
  onChange,
  placeholder,
  rows = 4,
  style
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--color-text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", {
    value: value ?? '',
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      minHeight: 88,
      padding: '10px 14px',
      background: 'var(--color-bg-elevated)',
      border: `1.5px solid ${focused ? 'var(--color-interactive-primary)' : 'var(--color-border-default)'}`,
      borderRadius: 'var(--border-radius-md)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 14,
      color: 'var(--color-text-primary)',
      outline: 'none',
      resize: 'vertical',
      boxShadow: focused ? '0 0 0 3px rgba(45,51,120,0.12)' : 'none',
      transition: 'border-color 100ms, box-shadow 100ms'
    }
  }), helper && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-tertiary)'
    }
  }, helper));
}
function Toggle({
  checked,
  onChange,
  label,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange?.(!checked),
    style: {
      position: 'relative',
      width: 44,
      height: 24,
      background: checked ? 'var(--color-interactive-primary)' : 'var(--color-gray-4)',
      borderRadius: 9999,
      transition: 'background-color 100ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 22 : 2,
      width: 20,
      height: 20,
      background: '#FFFFFF',
      borderRadius: '50%',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transition: 'left 100ms cubic-bezier(0,0,.2,1)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--color-text-primary)'
    }
  }, label));
}
function Checkbox({
  checked,
  onChange,
  label,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange?.(!checked),
    style: {
      width: 18,
      height: 18,
      background: checked ? 'var(--color-interactive-primary)' : disabled ? 'var(--color-gray-5)' : 'var(--color-bg-elevated)',
      border: `1.5px solid ${checked ? 'var(--color-interactive-primary)' : 'var(--color-gray-4)'}`,
      borderRadius: 'var(--border-radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 100ms, border-color 100ms'
    }
  }, checked && /*#__PURE__*/React.createElement(IconCheck, {
    size: 12,
    color: "#FFFFFF"
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--color-text-primary)'
    }
  }, label));
}
function Radio({
  checked,
  onChange,
  label,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange?.(),
    style: {
      width: 18,
      height: 18,
      border: `1.5px solid ${checked ? 'var(--color-interactive-primary)' : 'var(--color-gray-4)'}`,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-elevated)',
      transition: 'border-color 100ms'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: 'var(--color-interactive-primary)',
      borderRadius: '50%'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--color-text-primary)'
    }
  }, label));
}
function RadioGroup({
  value,
  onChange,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, options.map(opt => /*#__PURE__*/React.createElement(Radio, {
    key: opt.value,
    label: opt.label,
    checked: value === opt.value,
    onChange: () => onChange?.(opt.value)
  })));
}
function Select({
  value,
  options,
  onChange,
  placeholder = '선택',
  size = 'md',
  style
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const fn = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  const H = {
    sm: 32,
    md: 48,
    lg: 56
  }[size];
  const selected = options.find(o => o.value === value);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      width: '100%',
      height: H,
      padding: '0 14px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--color-bg-elevated)',
      border: `1.5px solid ${open ? 'var(--color-interactive-primary)' : 'var(--color-border-default)'}`,
      borderRadius: 'var(--border-radius-md)',
      cursor: 'pointer',
      fontFamily: 'var(--font-family-base)',
      fontSize: 14,
      color: selected ? 'var(--color-text-primary)' : 'var(--color-text-placeholder)'
    }
  }, /*#__PURE__*/React.createElement("span", null, selected?.label || placeholder), /*#__PURE__*/React.createElement(IconChevron, {
    size: 16
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--elevation-2)',
      overflow: 'hidden'
    }
  }, options.map(opt => /*#__PURE__*/React.createElement("div", {
    key: opt.value,
    onClick: () => {
      onChange?.(opt.value);
      setOpen(false);
    },
    style: {
      height: 40,
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      cursor: 'pointer',
      background: opt.value === value ? 'var(--color-brand-quaternary)' : 'transparent',
      color: opt.value === value ? 'var(--color-text-brand)' : 'var(--color-text-primary)',
      fontWeight: opt.value === value ? 700 : 400
    },
    onMouseEnter: e => {
      if (opt.value !== value) e.currentTarget.style.background = 'var(--color-bg-surface)';
    },
    onMouseLeave: e => {
      if (opt.value !== value) e.currentTarget.style.background = 'transparent';
    }
  }, opt.label))));
}
Object.assign(window, {
  TextField,
  Textarea,
  Toggle,
  Checkbox,
  Radio,
  RadioGroup,
  Select
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Forms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
// KIRBS icon system — real 76-icon set (7 categories) from /icon/<category>/<name>.svg.
// Each SVG ships with `currentColor` fills/strokes, so colour is controlled via the
// wrapper's CSS `color`. We fetch + inline the SVG so currentColor inherits natively
// (works for monochrome strokes AND the opacity-shaded brand marks like Google).
//
// Usage:
//   <Icon name="navigation/home" size={24} color="var(--color-text-brand)" />
//   <IconHome size={20} />              // named convenience wrappers (see map below)

const ICON_BASE = '../../icon'; // relative to ui_kits/admin/index.html
const _iconCache = {};
function useIconSvg(name) {
  const [svg, setSvg] = React.useState(_iconCache[name] || null);
  React.useEffect(() => {
    if (_iconCache[name]) {
      setSvg(_iconCache[name]);
      return;
    }
    let alive = true;
    fetch(`${ICON_BASE}/${name}.svg`).then(r => r.ok ? r.text() : Promise.reject(r.status)).then(text => {
      // Strip fixed width/height so the wrapper controls size; keep viewBox.
      const normalized = text.replace(/<svg([^>]*?)>/, (m, attrs) => {
        const cleaned = attrs.replace(/\swidth="[^"]*"/i, '').replace(/\sheight="[^"]*"/i, '');
        return `<svg${cleaned} width="100%" height="100%">`;
      });
      _iconCache[name] = normalized;
      if (alive) setSvg(normalized);
    }).catch(() => {/* leave empty box on failure */});
    return () => {
      alive = false;
    };
  }, [name]);
  return svg;
}
function Icon({
  name,
  size = 20,
  color,
  style,
  ...rest
}) {
  const svg = useIconSvg(name);
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flexShrink: 0,
      color: color || 'currentColor',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: svg || ''
    }
  }));
}

// ── Named convenience wrappers (used across the admin kit) ──────────
// Maps the legacy Icon* names to real files in the 76-icon set.
const NAME_MAP = {
  IconHome: 'navigation/home',
  IconUsers: 'user/users',
  IconChart: 'data/bar-chart-2',
  IconFile: 'content/file',
  IconSettings: 'user/settings',
  IconBell: 'notification/bell',
  IconSearch: 'navigation/search',
  IconPlus: 'action/plus',
  IconX: 'navigation/x',
  IconCheck: 'action/check',
  IconChevron: 'navigation/chevron-down',
  IconChevronR: 'navigation/chevron-right',
  IconArrowR: 'navigation/arrow-right',
  IconUpRight: 'navigation/external-link',
  IconMore: 'action/more-horizontal',
  IconFolder: 'content/folder',
  IconLogout: 'user/log-out',
  IconHelp: 'notification/help-circle',
  IconDownload: 'action/download',
  IconFilter: 'action/filter',
  IconCheckCircle: 'notification/check-circle-2',
  IconInfo: 'notification/info',
  IconAlert: 'notification/alert-triangle',
  IconTrendUp: 'data/trending-up',
  IconUserCircle: 'user/user'
};
const named = {};
for (const [comp, path] of Object.entries(NAME_MAP)) {
  named[comp] = p => /*#__PURE__*/React.createElement(Icon, _extends({
    name: path
  }, p));
}
Object.assign(window, {
  Icon,
  ...named
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/LoginScreen.jsx
try { (() => {
/* global React, Button, TextField, Checkbox */
// Login — entry screen demonstrating focus states, form layout, brand mark.

function LoginScreen({
  onLogin
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const valid = email.includes('@') && password.length >= 4;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      background: 'var(--color-bg-surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 420,
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-lg)',
      padding: 36,
      boxShadow: 'var(--elevation-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      background: 'var(--color-interactive-primary)',
      color: '#FFFFFF',
      borderRadius: 'var(--border-radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      fontSize: 20,
      letterSpacing: '-0.04em'
    }
  }, "K"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: '-0.025em',
      color: 'var(--color-text-primary)'
    }
  }, "KIRBS")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 24,
      fontWeight: 700
    }
  }, "\uB2E4\uC2DC \uC624\uC2E0 \uAC83\uC744 \uD658\uC601\uD569\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 28px',
      fontSize: 14,
      color: 'var(--color-text-tertiary)'
    }
  }, "\uC774\uBA54\uC77C\uB85C \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC5D0 \uB85C\uADF8\uC778\uD558\uC138\uC694."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (valid) onLogin?.();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "\uC774\uBA54\uC77C",
    type: "email",
    placeholder: "name@example.com",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "\uBE44\uBC00\uBC88\uD638",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: password,
    onChange: e => setPassword(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: remember,
    onChange: setRemember,
    label: "\uB85C\uADF8\uC778 \uC0C1\uD0DC \uC720\uC9C0"
  }), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-link)',
      cursor: 'pointer'
    }
  }, "\uBE44\uBC00\uBC88\uD638 \uCC3E\uAE30")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    fullWidth: true,
    disabled: !valid,
    onClick: () => onLogin?.()
  }, "\uB85C\uADF8\uC778")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 24,
      borderTop: '1px solid var(--color-border-default)',
      textAlign: 'center',
      fontSize: 13,
      color: 'var(--color-text-tertiary)'
    }
  }, "\uC544\uC9C1 \uACC4\uC815\uC774 \uC5C6\uC73C\uC2E0\uAC00\uC694? ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--color-text-link)',
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, "\uD68C\uC6D0\uAC00\uC785"))));
}
Object.assign(window, {
  LoginScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/MembersScreen.jsx
try { (() => {
/* global React, Card, Badge, Button, Avatar, IconButton, IconSearch, IconFilter, IconPlus, IconMore, IconDownload, IconChevronR, Modal, TextField, Select */
// Members — table-heavy screen demonstrating table.* + pagination.* + dropdown.* + modal

const MEMBERS = [{
  name: '김지원',
  email: 'jiwon.kim@kirbs.io',
  role: 'Admin',
  team: 'Design',
  status: 'active',
  joined: '2023-04-12'
}, {
  name: '이서연',
  email: 'seoyeon.lee@kirbs.io',
  role: 'Editor',
  team: 'Engineering',
  status: 'active',
  joined: '2023-06-21'
}, {
  name: '박민준',
  email: 'minjun.park@kirbs.io',
  role: 'Member',
  team: 'Marketing',
  status: 'invited',
  joined: '2024-01-08'
}, {
  name: '최예린',
  email: 'yerin.choi@kirbs.io',
  role: 'Editor',
  team: 'Sales',
  status: 'active',
  joined: '2024-02-14'
}, {
  name: '정하늘',
  email: 'haneul.jung@kirbs.io',
  role: 'Member',
  team: 'Operations',
  status: 'inactive',
  joined: '2022-11-30'
}, {
  name: '한도윤',
  email: 'doyun.han@kirbs.io',
  role: 'Admin',
  team: 'Design',
  status: 'active',
  joined: '2022-08-03'
}, {
  name: '윤서아',
  email: 'seoah.yoon@kirbs.io',
  role: 'Member',
  team: 'Engineering',
  status: 'active',
  joined: '2023-09-19'
}, {
  name: '오민서',
  email: 'minseo.oh@kirbs.io',
  role: 'Member',
  team: 'Sales',
  status: 'active',
  joined: '2024-03-02'
}];
const STATUS = {
  active: {
    label: '활성',
    tone: 'success-subtle'
  },
  invited: {
    label: '초대됨',
    tone: 'info-subtle'
  },
  inactive: {
    label: '비활성',
    tone: 'neutral'
  }
};
function MembersScreen({
  onInvite
}) {
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState(new Set());
  const [page, setPage] = React.useState(1);
  const [actionFor, setActionFor] = React.useState(null); // member name with open action menu

  const filtered = MEMBERS.filter(m => !query || m.name.toLowerCase().includes(query.toLowerCase()) || m.email.toLowerCase().includes(query.toLowerCase()));
  const toggle = name => {
    const next = new Set(selected);
    if (next.has(name)) next.delete(name);else next.add(name);
    setSelected(next);
  };
  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());else setSelected(new Set(filtered.map(m => m.name)));
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'clamp(24px, 5vw, 32px)',
      fontWeight: 700,
      letterSpacing: '-0.01em'
    }
  }, "\uBA64\uBC84 \uAD00\uB9AC"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 14,
      color: 'var(--color-text-tertiary)'
    }
  }, MEMBERS.length, "\uBA85\uC758 \uBA64\uBC84 \xB7 \uD65C\uC131 ", MEMBERS.filter(m => m.status === 'active').length, "\uBA85")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(IconDownload, {
      size: 16
    })
  }, "CSV \uB0B4\uBCF4\uB0B4\uAE30"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(IconPlus, {
      size: 16
    }),
    onClick: onInvite
  }, "\uBA64\uBC84 \uCD08\uB300"))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap',
      borderBottom: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: '1 1 220px',
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--color-text-tertiary)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(IconSearch, {
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "\uC774\uB984 \uB610\uB294 \uC774\uBA54\uC77C \uAC80\uC0C9\u2026",
    style: {
      width: '100%',
      height: 40,
      padding: '8px 14px 8px 36px',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 14,
      outline: 'none'
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(IconFilter, {
      size: 16
    })
  }, "\uD544\uD130"), selected.size > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-tertiary)'
    }
  }, selected.size, "\uBA85 \uC120\uD0DD\uB428"), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm"
  }, "\uC0AD\uC81C"))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      minWidth: 720,
      borderCollapse: 'collapse',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      height: 40,
      background: 'var(--color-bg-surface)',
      borderBottom: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 44,
      padding: '0 16px',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: selected.size === filtered.length && filtered.length > 0,
    onChange: toggleAll,
    style: {
      accentColor: 'var(--color-interactive-primary)',
      width: 16,
      height: 16
    }
  })), ['이름', '팀', '역할', '상태', '가입일', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '0 16px',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--color-text-secondary)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(m => /*#__PURE__*/React.createElement("tr", {
    key: m.name,
    style: {
      height: 56,
      borderBottom: '1px solid var(--color-border-default)',
      background: selected.has(m.name) ? 'var(--color-brand-quaternary)' : 'var(--color-bg-elevated)',
      cursor: 'pointer'
    },
    onMouseEnter: e => {
      if (!selected.has(m.name)) e.currentTarget.style.background = 'var(--color-bg-surface)';
    },
    onMouseLeave: e => {
      if (!selected.has(m.name)) e.currentTarget.style.background = 'var(--color-bg-elevated)';
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 16px'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: selected.has(m.name),
    onChange: () => toggle(m.name),
    style: {
      accentColor: 'var(--color-interactive-primary)',
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: m.name,
    size: "xs"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--color-text-primary)'
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-tertiary)'
    }
  }, m.email)))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 16px',
      color: 'var(--color-text-secondary)'
    }
  }, m.team), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 16px'
    }
  }, m.role === 'Admin' ? /*#__PURE__*/React.createElement(Badge, {
    tone: "brand-subtle"
  }, "Admin") : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-text-secondary)'
    }
  }, m.role)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: STATUS[m.status].tone
  }, STATUS[m.status].label)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 16px',
      fontFamily: 'var(--font-family-mono)',
      fontSize: 13,
      color: 'var(--color-text-tertiary)'
    }
  }, m.joined), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 16px',
      position: 'relative'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(IconMore, {
      size: 18
    }),
    onClick: () => setActionFor(actionFor === m.name ? null : m.name),
    ariaLabel: "Actions"
  }), actionFor === m.name && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      top: 44,
      zIndex: 100,
      width: 180,
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--elevation-2)',
      overflow: 'hidden'
    },
    onMouseLeave: () => setActionFor(null)
  }, ['프로필 보기', '역할 변경', '재초대 보내기'].map(label => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      height: 40,
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--color-bg-surface)',
    onMouseLeave: e => e.currentTarget.style.background = 'var(--color-bg-elevated)'
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--color-border-default)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      color: 'var(--color-text-error)',
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--color-bg-error)',
    onMouseLeave: e => e.currentTarget.style.background = 'var(--color-bg-elevated)'
  }, "\uBA64\uBC84 \uC81C\uAC70")))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-tertiary)'
    }
  }, filtered.length, "\uBA85 \uC911 1\u2013", filtered.length, " \uD45C\uC2DC"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, ['‹', 1, 2, 3, '›'].map((p, i) => {
    const active = p === page;
    const disabled = p === '‹' || p === '›';
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => typeof p === 'number' && setPage(p),
      style: {
        width: 32,
        height: 32,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: active ? 'var(--color-interactive-primary)' : 'transparent',
        color: active ? '#FFFFFF' : disabled ? 'var(--color-text-disabled)' : 'var(--color-text-secondary)',
        border: 0,
        borderRadius: 'var(--border-radius-sm)',
        fontSize: 14,
        fontWeight: active ? 700 : 400,
        cursor: disabled ? 'default' : 'pointer'
      },
      onMouseEnter: e => {
        if (!active && !disabled) e.currentTarget.style.background = 'var(--color-brand-quaternary)';
      },
      onMouseLeave: e => {
        if (!active && !disabled) e.currentTarget.style.background = 'transparent';
      }
    }, p);
  })))));
}

// Invite modal (called from App)
function InviteModal({
  open,
  onClose,
  onInvited
}) {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('member');
  const submit = () => {
    if (!email) return;
    onInvited?.(email);
    setEmail('');
    onClose();
  };
  return /*#__PURE__*/React.createElement(Modal, {
    open: open,
    onClose: onClose,
    title: "\uBA64\uBC84 \uCD08\uB300",
    size: "sm",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: onClose
    }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      onClick: submit,
      disabled: !email
    }, "\uCD08\uB300 \uBCF4\uB0B4\uAE30"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "\uC774\uBA54\uC77C",
    placeholder: "name@example.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    helper: "\uD68C\uC0AC \uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694."
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--color-text-secondary)',
      marginBottom: 6
    }
  }, "\uC5ED\uD560"), /*#__PURE__*/React.createElement(Select, {
    value: role,
    onChange: setRole,
    options: [{
      value: 'admin',
      label: 'Admin · 전체 권한'
    }, {
      value: 'editor',
      label: 'Editor · 편집 권한'
    }, {
      value: 'member',
      label: 'Member · 보기 권한'
    }]
  }))));
}
Object.assign(window, {
  MembersScreen,
  InviteModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/MembersScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Responsive.jsx
try { (() => {
/* global React */
// Shared responsive helper. Tracks the live viewport width and exposes
// breakpoint flags aligned to the KIRBS grid tokens
// (mobile 320 / tablet 768 / desktop 1024 / desktop-hd 1440).
//
//   const { width, isMobile, isTablet, isDesktop } = useViewport();
//
// isMobile  → < 768  : drawer sidebar, stacked content, condensed top bar
// isTablet  → 768–1023: drawer sidebar, 2-up grids
// isDesktop → ≥ 1024 : static sidebar, full multi-column layout

function useViewport() {
  const read = () => typeof window !== 'undefined' ? window.innerWidth : 1280;
  const [width, setWidth] = React.useState(read());
  React.useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setWidth(read()));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    // sidebar collapses to a drawer below desktop
    drawerNav: width < 1024
  };
}
Object.assign(window, {
  useViewport
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Responsive.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/SettingsScreen.jsx
try { (() => {
/* global React, Card, Button, TextField, Textarea, Toggle, RadioGroup, Select, Badge, Avatar, useViewport */
// Settings — form-heavy screen with tabs (general / notifications / billing / appearance)

const TABS = [{
  id: 'general',
  label: '일반'
}, {
  id: 'notifs',
  label: '알림'
}, {
  id: 'billing',
  label: '청구'
}, {
  id: 'appearance',
  label: '테마'
}];
function TabBar({
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      borderBottom: '1px solid var(--color-border-default)',
      marginBottom: 24,
      overflowX: 'auto'
    }
  }, TABS.map(t => {
    const isActive = t.id === active;
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      onClick: () => onChange(t.id),
      style: {
        height: 44,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        fontSize: 16,
        fontWeight: isActive ? 700 : 400,
        color: isActive ? 'var(--color-text-brand)' : 'var(--color-text-tertiary)',
        borderBottom: isActive ? '2px solid var(--color-interactive-primary)' : '2px solid transparent',
        marginBottom: -1,
        cursor: 'pointer',
        transition: 'color 100ms'
      }
    }, t.label);
  }));
}
function Section({
  title,
  description,
  children
}) {
  const {
    isMobile
  } = useViewport();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
      gap: isMobile ? 16 : 40,
      padding: '24px 0',
      borderBottom: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 13,
      color: 'var(--color-text-tertiary)',
      lineHeight: 1.5
    }
  }, description)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560
    }
  }, children));
}
function GeneralTab({
  onSave
}) {
  const [name, setName] = React.useState('KIRBS Workspace');
  const [url, setUrl] = React.useState('kirbs');
  const [desc, setDesc] = React.useState('디자인 시스템과 디자인 토큰을 관리하는 워크스페이스입니다.');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    title: "\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uC815\uBCF4",
    description: "\uD300 \uBA64\uBC84\uC5D0\uAC8C \uD45C\uC2DC\uB418\uB294 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uC774\uB984\uACFC URL\uC785\uB2C8\uB2E4."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "\uC774\uB984",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "URL",
    value: url,
    onChange: e => setUrl(e.target.value),
    helper: "kirbs.io/{url} \uD615\uC2DD\uC73C\uB85C \uC811\uC18D\uB429\uB2C8\uB2E4."
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "\uC124\uBA85",
    value: desc,
    onChange: e => setDesc(e.target.value),
    helper: "\uACF5\uAC1C \uD398\uC774\uC9C0\uC5D0 \uD45C\uC2DC\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4."
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "\uC5B8\uC5B4 \uBC0F \uC9C0\uC5ED",
    description: "\uAE30\uBCF8 \uC5B8\uC5B4 \uBC0F \uC2DC\uAC04\uB300 \uC124\uC815\uC785\uB2C8\uB2E4."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--color-text-secondary)',
      marginBottom: 6
    }
  }, "\uC5B8\uC5B4"), /*#__PURE__*/React.createElement(Select, {
    value: "ko",
    options: [{
      value: 'ko',
      label: '한국어'
    }, {
      value: 'en',
      label: 'English'
    }]
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--color-text-secondary)',
      marginBottom: 6
    }
  }, "\uC2DC\uAC04\uB300"), /*#__PURE__*/React.createElement(Select, {
    value: "kst",
    options: [{
      value: 'kst',
      label: 'Asia/Seoul (UTC+9)'
    }, {
      value: 'utc',
      label: 'UTC'
    }]
  })))), /*#__PURE__*/React.createElement(Section, {
    title: "\uC704\uD5D8 \uAD6C\uC5ED",
    description: "\uC774 \uC791\uC5C5\uC740 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      background: 'var(--color-bg-error)',
      border: '1px solid var(--color-state-error)',
      borderRadius: 'var(--border-radius-md)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--color-text-error)'
    }
  }, "\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uC0AD\uC81C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-secondary)',
      marginTop: 2
    }
  }, "\uBAA8\uB4E0 \uBA64\uBC84 \xB7 \uD504\uB85C\uC81D\uD2B8 \xB7 \uB370\uC774\uD130\uAC00 \uC601\uAD6C \uC0AD\uC81C\uB429\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm"
  }, "\uC0AD\uC81C"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "\uBCC0\uACBD \uCDE8\uC18C"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onSave
  }, "\uC800\uC7A5")));
}
function NotificationsTab() {
  const [prefs, setPrefs] = React.useState({
    mention: true,
    comment: true,
    weekly: false,
    marketing: false,
    billing: true
  });
  const toggle = k => setPrefs(p => ({
    ...p,
    [k]: !p[k]
  }));
  const rows = [['mention', '멘션 알림', '@멘션을 받으면 이메일과 인앱 알림을 받습니다.'], ['comment', '댓글 알림', '내 항목에 새 댓글이 달릴 때 알림을 받습니다.'], ['weekly', '주간 요약', '매주 월요일 워크스페이스 활동 요약을 받습니다.'], ['marketing', '제품 업데이트', '새 기능과 개선 사항을 이메일로 받습니다.'], ['billing', '결제 및 청구', '청구 주기와 결제 영수증 알림을 받습니다.']];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    title: "\uC54C\uB9BC \uCC44\uB110",
    description: "\uC774\uBA54\uC77C\uACFC \uC778\uC571 \uC54C\uB9BC \uCC44\uB110\uC744 \uBAA8\uB450 \uAD00\uB9AC\uD569\uB2C8\uB2E4."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, rows.map(([k, label, desc]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--color-text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-tertiary)',
      marginTop: 2
    }
  }, desc)), /*#__PURE__*/React.createElement(Toggle, {
    checked: prefs[k],
    onChange: () => toggle(k)
  }))))));
}
function BillingTab() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    title: "\uD604\uC7AC \uD50C\uB79C",
    description: "\uD50C\uB79C \uBCC0\uACBD \uBC0F \uCCAD\uAD6C \uC815\uBCF4\uB97C \uAD00\uB9AC\uD569\uB2C8\uB2E4."
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 20,
    style: {
      background: 'var(--color-bg-brand-subtle)',
      border: '1px solid var(--color-brand-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--color-text-brand)'
    }
  }, "Enterprise"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "\uD604\uC7AC \uD50C\uB79C")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-secondary)'
    }
  }, "\uB2E4\uC74C \uACB0\uC81C: 2026\uB144 6\uC6D4 1\uC77C \xB7 \u20A9 1,200,000")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "\uD50C\uB79C \uAD00\uB9AC")))), /*#__PURE__*/React.createElement(Section, {
    title: "\uACB0\uC81C \uC218\uB2E8",
    description: "\uCCAD\uAD6C\uC5D0 \uC0AC\uC6A9\uB418\uB294 \uACB0\uC81C \uCE74\uB4DC\uC785\uB2C8\uB2E4."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['Visa', '•••• 4242', '2027 / 03', true], ['Mastercard', '•••• 9912', '2025 / 11', false]].map(([brand, num, exp, primary]) => /*#__PURE__*/React.createElement("div", {
    key: num,
    style: {
      padding: 16,
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      background: 'var(--color-bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 28,
      background: 'var(--color-bg-surface)',
      borderRadius: 4,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-family-mono)',
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--color-text-secondary)'
    }
  }, brand), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-family-mono)',
      fontSize: 14,
      fontWeight: 700
    }
  }, num), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-tertiary)'
    }
  }, "\uB9CC\uB8CC ", exp))), primary ? /*#__PURE__*/React.createElement(Badge, {
    tone: "success-subtle"
  }, "\uAE30\uBCF8") : /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    size: "sm"
  }, "\uAE30\uBCF8\uC73C\uB85C \uC124\uC815"))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    style: {
      alignSelf: 'flex-start'
    }
  }, "+ \uCE74\uB4DC \uCD94\uAC00"))));
}
function AppearanceTab() {
  const [theme, setTheme] = React.useState('light');
  const [density, setDensity] = React.useState('comfortable');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    title: "\uD14C\uB9C8",
    description: "\uC571 \uC804\uCCB4\uC5D0 \uC801\uC6A9\uB418\uB294 \uC0C9\uC0C1 \uBAA8\uB4DC\uC785\uB2C8\uB2E4."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12
    }
  }, [{
    id: 'light',
    label: '라이트',
    bg: '#FFFFFF',
    fg: '#000000',
    border: '#E0E0E0'
  }, {
    id: 'dark',
    label: '다크',
    bg: '#0F0F12',
    fg: '#F0F0F0',
    border: '#2E2E34'
  }, {
    id: 'system',
    label: '시스템 따라가기',
    bg: 'linear-gradient(90deg,#FFFFFF 50%,#0F0F12 50%)',
    fg: '#5B63A8',
    border: '#E0E0E0'
  }].map(opt => /*#__PURE__*/React.createElement("div", {
    key: opt.id,
    onClick: () => setTheme(opt.id),
    style: {
      padding: 14,
      cursor: 'pointer',
      background: 'var(--color-bg-elevated)',
      border: `2px solid ${theme === opt.id ? 'var(--color-interactive-primary)' : 'var(--color-border-default)'}`,
      borderRadius: 'var(--border-radius-md)',
      transition: 'border-color 100ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 60,
      background: opt.bg,
      borderRadius: 6,
      border: `1px solid ${opt.border}`,
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: theme === opt.id ? 700 : 400,
      color: theme === opt.id ? 'var(--color-text-brand)' : 'var(--color-text-primary)'
    }
  }, opt.label))))), /*#__PURE__*/React.createElement(Section, {
    title: "\uBC00\uB3C4",
    description: "\uBAA9\uB85D\uACFC \uD45C\uC758 \uD589 \uB192\uC774\uB97C \uC870\uC808\uD569\uB2C8\uB2E4."
  }, /*#__PURE__*/React.createElement(RadioGroup, {
    value: density,
    onChange: setDensity,
    options: [{
      value: 'comfortable',
      label: '여유롭게 (기본)'
    }, {
      value: 'compact',
      label: '촘촘하게'
    }]
  })));
}
function SettingsScreen({
  onSave
}) {
  const [tab, setTab] = React.useState('general');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 32,
      fontWeight: 700,
      letterSpacing: '-0.01em'
    }
  }, "\uC124\uC815"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 14,
      color: 'var(--color-text-tertiary)'
    }
  }, "\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD658\uACBD\uC124\uC815\uACFC \uCCAD\uAD6C \uC815\uBCF4\uB97C \uAD00\uB9AC\uD569\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(TabBar, {
    active: tab,
    onChange: setTab
  }), tab === 'general' && /*#__PURE__*/React.createElement(GeneralTab, {
    onSave: onSave
  }), tab === 'notifs' && /*#__PURE__*/React.createElement(NotificationsTab, null), tab === 'billing' && /*#__PURE__*/React.createElement(BillingTab, null), tab === 'appearance' && /*#__PURE__*/React.createElement(AppearanceTab, null));
}
Object.assign(window, {
  SettingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Sidebar.jsx
try { (() => {
/* global React, IconHome, IconUsers, IconChart, IconFile, IconSettings, IconChevron, IconHelp, IconLogout, IconFolder */
// 240px nav-sidebar · upstream `component.nav-sidebar.*`

const SIDEBAR_SECTIONS = [{
  label: 'WORKSPACE',
  items: [{
    id: 'dashboard',
    label: '대시보드',
    icon: IconHome
  }, {
    id: 'members',
    label: '멤버 관리',
    icon: IconUsers,
    badge: '14'
  }, {
    id: 'analytics',
    label: '분석',
    icon: IconChart
  }, {
    id: 'projects',
    label: '프로젝트',
    icon: IconFolder
  }]
}, {
  label: 'REPORTS',
  items: [{
    id: 'reports',
    label: '리포트',
    icon: IconFile
  }]
}, {
  label: 'SYSTEM',
  items: [{
    id: 'settings',
    label: '설정',
    icon: IconSettings
  }]
}];
function SidebarItem({
  item,
  active,
  onClick
}) {
  const Icon = item.icon;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: 44,
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      borderRadius: 6,
      cursor: 'pointer',
      background: active ? 'var(--color-brand-quaternary)' : hover ? 'var(--color-bg-surface)' : 'transparent',
      color: active ? 'var(--color-text-brand)' : 'var(--color-text-tertiary)',
      fontWeight: active ? 700 : 500,
      fontSize: 14,
      transition: 'background-color 100ms, color 100ms'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, item.label), item.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: '2px 8px',
      background: active ? 'var(--color-text-brand)' : 'var(--color-gray-5)',
      color: active ? '#FFFFFF' : 'var(--color-text-tertiary)',
      borderRadius: 99
    }
  }, item.badge));
}
function Sidebar({
  active,
  onNavigate,
  drawer = false,
  open = false,
  onClose
}) {
  const aside = /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 240,
      flexShrink: 0,
      background: 'var(--color-bg-elevated)',
      borderRight: '1px solid var(--color-border-default)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      ...(drawer ? {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 'var(--z-modal, 400)',
        boxShadow: 'var(--elevation-3)',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 300ms cubic-bezier(0,0,.2,1)'
      } : {})
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 64,
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      borderBottom: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      background: 'var(--color-interactive-primary)',
      color: '#FFFFFF',
      borderRadius: 'var(--border-radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      fontSize: 16,
      letterSpacing: '-0.04em'
    }
  }, "K"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 17,
      letterSpacing: '-0.025em',
      color: 'var(--color-text-primary)'
    }
  }, "KIRBS")), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      padding: '20px 12px',
      overflowY: 'auto'
    }
  }, SIDEBAR_SECTIONS.map((section, i) => /*#__PURE__*/React.createElement("div", {
    key: section.label,
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 8px',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      color: 'var(--color-text-tertiary)',
      textTransform: 'uppercase'
    }
  }, section.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, section.items.map(item => /*#__PURE__*/React.createElement(SidebarItem, {
    key: item.id,
    item: item,
    active: active === item.id,
    onClick: () => onNavigate(item.id)
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      borderTop: '1px solid var(--color-border-default)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(SidebarItem, {
    item: {
      id: 'help',
      label: '도움말',
      icon: IconHelp
    },
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(SidebarItem, {
    item: {
      id: 'logout',
      label: '로그아웃',
      icon: IconLogout
    },
    onClick: () => {}
  })));
  if (!drawer) return aside;

  // Drawer mode: backdrop + sliding panel
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    "aria-hidden": "true",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 'var(--z-overlay, 300)',
      background: 'var(--color-bg-overlay)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 300ms cubic-bezier(0,0,.2,1)'
    }
  }), aside);
}
Object.assign(window, {
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Surfaces.jsx
try { (() => {
/* global React, IconX, IconCheckCircle, IconInfo, IconAlert, useViewport */
// Surface containers: Card, Modal, Toast.

function Card({
  children,
  padding = 20,
  hoverable,
  style,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      padding,
      boxShadow: hoverable && hover ? 'var(--elevation-2)' : 'var(--elevation-1)',
      transition: 'box-shadow 200ms cubic-bezier(0,0,.2,1)',
      cursor: onClick ? 'pointer' : undefined,
      ...style
    }
  }, children);
}
function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) {
  if (!open) return null;
  const maxW = {
    sm: 480,
    md: 720,
    lg: 960
  }[size];
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 400,
      background: 'var(--color-bg-overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      animation: 'kirbs-fade 200ms cubic-bezier(0,0,.2,1)'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: maxW,
      maxHeight: 'calc(100vh - 48px)',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-bg-elevated)',
      borderRadius: 'var(--border-radius-lg)',
      boxShadow: 'var(--elevation-3)',
      overflow: 'hidden',
      animation: 'kirbs-pop 200ms cubic-bezier(.34,1.56,.64,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 64,
      padding: '0 24px',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 700
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 32,
      height: 32,
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--color-text-tertiary)',
      borderRadius: 'var(--border-radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--color-bg-surface)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      overflowY: 'auto'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 72,
      padding: '16px 24px',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 12,
      borderTop: '1px solid var(--color-border-default)',
      background: 'var(--color-bg-surface)'
    }
  }, footer)));
}
const TOAST_TONE = {
  success: {
    bg: 'var(--color-bg-success)',
    fg: 'var(--color-state-success)',
    Icon: IconCheckCircle
  },
  error: {
    bg: 'var(--color-bg-error)',
    fg: 'var(--color-state-error)',
    Icon: IconAlert
  },
  warning: {
    bg: 'var(--color-bg-warning)',
    fg: '#B08000',
    Icon: IconAlert
  },
  info: {
    bg: 'var(--color-bg-info)',
    fg: 'var(--color-state-info)',
    Icon: IconInfo
  },
  default: {
    bg: 'var(--color-black-2)',
    fg: '#FFFFFF',
    Icon: IconInfo
  }
};
function Toast({
  tone = 'default',
  children,
  onClose
}) {
  const t = TOAST_TONE[tone];
  const Icon = t.Icon;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'min(420px, calc(100vw - 32px))',
      minWidth: 0,
      padding: '14px 16px',
      background: t.bg,
      color: t.fg,
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--elevation-3)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 14,
      animation: 'kirbs-slide-in 300ms cubic-bezier(.34,1.56,.64,1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      background: 'transparent',
      border: 0,
      color: 'currentColor',
      opacity: 0.7,
      cursor: 'pointer',
      display: 'inline-flex',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 16
  })));
}
function ToastStack({
  toasts,
  onDismiss
}) {
  const {
    isMobile
  } = useViewport();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      zIndex: 500,
      top: isMobile ? 16 : 24,
      right: isMobile ? 16 : 24,
      left: isMobile ? 16 : 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 10
    }
  }, toasts.map(t => /*#__PURE__*/React.createElement(Toast, {
    key: t.id,
    tone: t.tone,
    onClose: () => onDismiss(t.id)
  }, t.message)));
}
Object.assign(window, {
  Card,
  Modal,
  Toast,
  ToastStack
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Surfaces.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/TopBar.jsx
try { (() => {
/* global React, IconSearch, IconBell, IconChevron, Avatar, IconButton, TextField, IconUserCircle, IconLogout, IconSettings, Icon, useViewport */
// 64px global nav-header · upstream `component.nav-header.*`

const HEADER_BREADCRUMBS = {
  dashboard: ['Workspace', '대시보드'],
  members: ['Workspace', '멤버 관리'],
  analytics: ['Workspace', '분석'],
  projects: ['Workspace', '프로젝트'],
  reports: ['Reports', '리포트'],
  settings: ['System', '설정']
};
function TopBar({
  active,
  onLogout,
  onMenuClick
}) {
  const {
    isMobile
  } = useViewport();
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
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 64,
      padding: isMobile ? '0 16px' : '0 32px',
      background: 'var(--color-bg-elevated)',
      borderBottom: '1px solid var(--color-border-default)',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? 12 : 24,
      flexShrink: 0
    }
  }, onMenuClick && /*#__PURE__*/React.createElement("button", {
    onClick: onMenuClick,
    "aria-label": "\uBA54\uB274 \uC5F4\uAE30",
    style: {
      width: 40,
      height: 40,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: 0,
      borderRadius: 'var(--border-radius-sm)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "navigation/menu",
    size: 22
  })), isMobile ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--color-text-primary)'
    }
  }, crumbs[crumbs.length - 1] || active) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14
    }
  }, crumbs.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-text-tertiary)'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: i === crumbs.length - 1 ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
      fontWeight: i === crumbs.length - 1 ? 700 : 400
    }
  }, c)))), isMobile ? /*#__PURE__*/React.createElement("button", {
    "aria-label": "\uAC80\uC0C9",
    style: {
      marginLeft: 'auto',
      width: 40,
      height: 40,
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: 0,
      borderRadius: 'var(--border-radius-sm)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(IconSearch, {
    size: 20
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 480,
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--color-text-tertiary)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(IconSearch, {
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    type: "search",
    placeholder: "\uAC80\uC0C9\u2026",
    style: {
      width: '100%',
      height: 40,
      padding: '8px 14px 8px 36px',
      background: 'var(--color-bg-surface)',
      border: '1px solid transparent',
      borderRadius: 'var(--border-radius-md)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 14,
      color: 'var(--color-text-primary)',
      outline: 'none'
    },
    onFocus: e => {
      e.currentTarget.style.background = 'var(--color-bg-elevated)';
      e.currentTarget.style.borderColor = 'var(--color-interactive-primary)';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(45,51,120,0.12)';
    },
    onBlur: e => {
      e.currentTarget.style.background = 'var(--color-bg-surface)';
      e.currentTarget.style.borderColor = 'transparent';
      e.currentTarget.style.boxShadow = 'none';
    }
  }))), /*#__PURE__*/React.createElement("div", {
    ref: notifRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setNotifOpen(o => !o),
    "aria-label": "Notifications",
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: notifOpen ? 'var(--color-bg-surface)' : 'transparent',
      color: 'var(--color-text-secondary)',
      border: 0,
      borderRadius: 'var(--border-radius-sm)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(IconBell, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      background: 'var(--color-state-error)',
      border: '2px solid #FFFFFF',
      borderRadius: '50%'
    }
  })), notifOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      right: 0,
      zIndex: 100,
      width: 320,
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--elevation-2)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      borderBottom: '1px solid var(--color-border-default)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\uC54C\uB9BC 3"), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-link)',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "\uBAA8\uB450 \uC77D\uC74C")), [['새 멤버 가입', '김지원 님이 워크스페이스에 합류했습니다.', '5분 전'], ['리포트 생성 완료', '12월 월간 리포트를 확인하세요.', '1시간 전'], ['결제 알림', '곧 청구 주기가 갱신됩니다.', '어제']].map(([title, body, time], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '12px 16px',
      borderBottom: i < 2 ? '1px solid var(--color-border-default)' : 0,
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--color-bg-surface)',
    onMouseLeave: e => e.currentTarget.style.background = 'var(--color-bg-elevated)'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--color-text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--color-text-tertiary)',
      marginTop: 2
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--color-text-tertiary)',
      marginTop: 4
    }
  }, time))))), /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenuOpen(o => !o),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: menuOpen ? 'var(--color-bg-surface)' : 'transparent',
      border: 0,
      borderRadius: 'var(--border-radius-sm)',
      padding: '4px 8px 4px 4px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "\uB2E4\uC6B0\uB2C8",
    size: "xs"
  }), !isMobile && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--color-text-primary)'
    }
  }, "\uB2E4\uC6B0\uB2C8"), !isMobile && /*#__PURE__*/React.createElement(IconChevron, {
    size: 16,
    color: "var(--color-text-tertiary)"
  })), menuOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      right: 0,
      zIndex: 100,
      width: 220,
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border-default)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--elevation-2)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      borderBottom: '1px solid var(--color-border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "\uB2E4\uC6B0\uB2C8"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-tertiary)'
    }
  }, "dawooni@kirbs.io")), [['프로필', IconUserCircle], ['설정', IconSettings], ['로그아웃', IconLogout]].map(([label, Icon]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    onClick: () => {
      setMenuOpen(false);
      if (label === '로그아웃') onLogout?.();
    },
    style: {
      height: 40,
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 14,
      color: 'var(--color-text-primary)',
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--color-bg-surface)',
    onMouseLeave: e => e.currentTarget.style.background = 'var(--color-bg-elevated)'
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    color: "var(--color-text-tertiary)"
  }), label)))));
}
Object.assign(window, {
  TopBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/TopBar.jsx", error: String((e && e.message) || e) }); }

})();
