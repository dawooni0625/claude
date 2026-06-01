/* global React, IconX, IconCheckCircle, IconInfo, IconAlert, useViewport */
// Surface containers: Card, Modal, Toast.

function Card({ children, padding = 20, hoverable, style, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--border-radius-md)',
        padding,
        boxShadow: hoverable && hover ? 'var(--elevation-2)' : 'var(--elevation-1)',
        transition: 'box-shadow 200ms cubic-bezier(0,0,.2,1)',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  if (!open) return null;
  const maxW = { sm: 480, md: 720, lg: 960 }[size];
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'var(--color-bg-overlay)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'kirbs-fade 200ms cubic-bezier(0,0,.2,1)',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: maxW,
          maxHeight: 'calc(100vh - 48px)',
          display: 'flex', flexDirection: 'column',
          background: 'var(--color-bg-elevated)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--elevation-3)',
          overflow: 'hidden',
          animation: 'kirbs-pop 200ms cubic-bezier(.34,1.56,.64,1)',
        }}
      >
        <div style={{
          height: 64, padding: '0 24px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-border-default)',
        }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 32, height: 32, border: 0, background: 'transparent', cursor: 'pointer',
              color: 'var(--color-text-tertiary)', borderRadius: 'var(--border-radius-sm)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-surface)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <IconX size={20} />
          </button>
        </div>
        <div style={{ padding: 24, overflowY: 'auto' }}>
          {children}
        </div>
        {footer && (
          <div style={{
            minHeight: 72, padding: '16px 24px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
            borderTop: '1px solid var(--color-border-default)',
            background: 'var(--color-bg-surface)',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

const TOAST_TONE = {
  success: { bg: 'var(--color-bg-success)', fg: 'var(--color-state-success)', Icon: IconCheckCircle },
  error:   { bg: 'var(--color-bg-error)',   fg: 'var(--color-state-error)',   Icon: IconAlert },
  warning: { bg: 'var(--color-bg-warning)', fg: '#B08000',                    Icon: IconAlert },
  info:    { bg: 'var(--color-bg-info)',    fg: 'var(--color-state-info)',    Icon: IconInfo },
  default: { bg: 'var(--color-black-2)',    fg: '#FFFFFF',                    Icon: IconInfo },
};
function Toast({ tone = 'default', children, onClose }) {
  const t = TOAST_TONE[tone];
  const Icon = t.Icon;
  return (
    <div style={{
      width: 'min(420px, calc(100vw - 32px))', minWidth: 0,
      padding: '14px 16px',
      background: t.bg, color: t.fg,
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--elevation-3)',
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 14,
      animation: 'kirbs-slide-in 300ms cubic-bezier(.34,1.56,.64,1)',
    }}>
      <Icon size={20} />
      <span style={{ flex: 1 }}>{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss"
          style={{
            background: 'transparent', border: 0, color: 'currentColor', opacity: 0.7,
            cursor: 'pointer', display: 'inline-flex', padding: 2,
          }}
        ><IconX size={16}/></button>
      )}
    </div>
  );
}

function ToastStack({ toasts, onDismiss }) {
  const { isMobile } = useViewport();
  return (
    <div style={{
      position: 'fixed', zIndex: 500,
      top: isMobile ? 16 : 24,
      right: isMobile ? 16 : 24,
      left: isMobile ? 16 : 'auto',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10,
    }}>
      {toasts.map(t => (
        <Toast key={t.id} tone={t.tone} onClose={() => onDismiss(t.id)}>{t.message}</Toast>
      ))}
    </div>
  );
}

Object.assign(window, { Card, Modal, Toast, ToastStack });
