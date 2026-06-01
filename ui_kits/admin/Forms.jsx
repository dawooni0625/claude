/* global React, IconCheck, IconChevron */
// Form atoms: TextField, Toggle, Checkbox, RadioGroup.

function TextField({ label, helper, error, success, icon, value, onChange, type = 'text', placeholder, size = 'md', disabled, style }) {
  const [focused, setFocused] = React.useState(false);
  const H = { sm: 32, md: 48, lg: 56 }[size];
  const borderColor = error ? 'var(--color-border-error)'
    : success ? 'var(--color-border-success)'
    : focused ? 'var(--color-interactive-primary)'
    : 'var(--color-border-default)';
  const helperColor = error ? 'var(--color-text-error)'
    : success ? 'var(--color-text-success)'
    : 'var(--color-text-tertiary)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)' }}>{label}</label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--color-text-tertiary)', display: 'inline-flex',
          }}>{icon}</span>
        )}
        <input
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', height: H,
            padding: icon ? `8px 14px 8px 38px` : `8px 14px`,
            border: `1.5px solid ${borderColor}`,
            borderRadius: 'var(--border-radius-md)',
            background: disabled ? 'var(--color-bg-muted)' : 'var(--color-bg-elevated)',
            fontFamily: 'var(--font-family-base)', fontSize: 14,
            color: 'var(--color-text-primary)',
            outline: 'none', boxSizing: 'border-box',
            boxShadow: focused && !error ? '0 0 0 3px rgba(45,51,120,0.12)' : 'none',
            transition: 'border-color 100ms, box-shadow 100ms',
          }}
        />
      </div>
      {(helper || error) && (
        <span style={{ fontSize: 12, color: helperColor }}>{error || helper}</span>
      )}
    </div>
  );
}

function Textarea({ label, helper, value, onChange, placeholder, rows = 4, style }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)' }}>{label}</label>}
      <textarea
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          minHeight: 88, padding: '10px 14px',
          background: 'var(--color-bg-elevated)',
          border: `1.5px solid ${focused ? 'var(--color-interactive-primary)' : 'var(--color-border-default)'}`,
          borderRadius: 'var(--border-radius-md)',
          fontFamily: 'var(--font-family-base)', fontSize: 14, color: 'var(--color-text-primary)',
          outline: 'none', resize: 'vertical',
          boxShadow: focused ? '0 0 0 3px rgba(45,51,120,0.12)' : 'none',
          transition: 'border-color 100ms, box-shadow 100ms',
        }}
      />
      {helper && <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{helper}</span>}
    </div>
  );
}

function Toggle({ checked, onChange, label, disabled }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}>
      <span
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          position: 'relative', width: 44, height: 24,
          background: checked ? 'var(--color-interactive-primary)' : 'var(--color-gray-4)',
          borderRadius: 9999, transition: 'background-color 100ms',
        }}
      >
        <span style={{
          position: 'absolute', top: 2, left: checked ? 22 : 2,
          width: 20, height: 20, background: '#FFFFFF', borderRadius: '50%',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left 100ms cubic-bezier(0,0,.2,1)',
        }}/>
      </span>
      {label && <span style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{label}</span>}
    </label>
  );
}

function Checkbox({ checked, onChange, label, disabled }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}>
      <span
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          width: 18, height: 18,
          background: checked ? 'var(--color-interactive-primary)' : disabled ? 'var(--color-gray-5)' : 'var(--color-bg-elevated)',
          border: `1.5px solid ${checked ? 'var(--color-interactive-primary)' : 'var(--color-gray-4)'}`,
          borderRadius: 'var(--border-radius-sm)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background-color 100ms, border-color 100ms',
        }}
      >
        {checked && <IconCheck size={12} color="#FFFFFF" />}
      </span>
      {label && <span style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{label}</span>}
    </label>
  );
}

function Radio({ checked, onChange, label, disabled }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}>
      <span
        onClick={() => !disabled && onChange?.()}
        style={{
          width: 18, height: 18,
          border: `1.5px solid ${checked ? 'var(--color-interactive-primary)' : 'var(--color-gray-4)'}`,
          borderRadius: '50%',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--color-bg-elevated)', transition: 'border-color 100ms',
        }}
      >
        {checked && <span style={{ width: 8, height: 8, background: 'var(--color-interactive-primary)', borderRadius: '50%' }}/>}
      </span>
      {label && <span style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{label}</span>}
    </label>
  );
}

function RadioGroup({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map(opt => (
        <Radio key={opt.value} label={opt.label} checked={value === opt.value} onChange={() => onChange?.(opt.value)} />
      ))}
    </div>
  );
}

function Select({ value, options, onChange, placeholder = '선택', size = 'md', style }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  const H = { sm: 32, md: 48, lg: 56 }[size];
  const selected = options.find(o => o.value === value);
  return (
    <div ref={ref} style={{ position: 'relative', ...style }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', height: H, padding: '0 14px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--color-bg-elevated)', border: `1.5px solid ${open ? 'var(--color-interactive-primary)' : 'var(--color-border-default)'}`,
          borderRadius: 'var(--border-radius-md)', cursor: 'pointer',
          fontFamily: 'var(--font-family-base)', fontSize: 14,
          color: selected ? 'var(--color-text-primary)' : 'var(--color-text-placeholder)',
        }}
      >
        <span>{selected?.label || placeholder}</span>
        <IconChevron size={16} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 100,
          background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: 'var(--elevation-2)', overflow: 'hidden',
        }}>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange?.(opt.value); setOpen(false); }}
              style={{
                height: 40, padding: '10px 14px',
                display: 'flex', alignItems: 'center',
                fontSize: 14, cursor: 'pointer',
                background: opt.value === value ? 'var(--color-brand-quaternary)' : 'transparent',
                color: opt.value === value ? 'var(--color-text-brand)' : 'var(--color-text-primary)',
                fontWeight: opt.value === value ? 700 : 400,
              }}
              onMouseEnter={e => { if (opt.value !== value) e.currentTarget.style.background = 'var(--color-bg-surface)'; }}
              onMouseLeave={e => { if (opt.value !== value) e.currentTarget.style.background = 'transparent'; }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { TextField, Textarea, Toggle, Checkbox, Radio, RadioGroup, Select });
