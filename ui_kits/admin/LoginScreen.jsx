/* global React, Button, TextField, Checkbox */
// Login — entry screen demonstrating focus states, form layout, brand mark.

function LoginScreen({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const valid = email.includes('@') && password.length >= 4;

  return (
    <div style={{
      minHeight: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32,
      background: 'var(--color-bg-surface)',
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--border-radius-lg)',
        padding: 36,
        boxShadow: 'var(--elevation-2)',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{
            width: 36, height: 36,
            background: 'var(--color-interactive-primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--border-radius-md)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 20, letterSpacing: '-0.04em',
          }}>K</div>
          <span style={{
            fontWeight: 800, fontSize: 22, letterSpacing: '-0.025em',
            color: 'var(--color-text-primary)',
          }}>KIRBS</span>
        </div>

        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>다시 오신 것을 환영합니다</h1>
        <p style={{ margin: '6px 0 28px', fontSize: 14, color: 'var(--color-text-tertiary)' }}>
          이메일로 워크스페이스에 로그인하세요.
        </p>

        <form
          onSubmit={e => { e.preventDefault(); if (valid) onLogin?.(); }}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          <TextField
            label="이메일"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="비밀번호"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Checkbox checked={remember} onChange={setRemember} label="로그인 상태 유지" />
            <a style={{ fontSize: 13, color: 'var(--color-text-link)', cursor: 'pointer' }}>비밀번호 찾기</a>
          </div>
          <Button variant="primary" size="md" fullWidth disabled={!valid} onClick={() => onLogin?.()}>
            로그인
          </Button>
        </form>

        <div style={{
          marginTop: 24, paddingTop: 24,
          borderTop: '1px solid var(--color-border-default)',
          textAlign: 'center',
          fontSize: 13, color: 'var(--color-text-tertiary)',
        }}>
          아직 계정이 없으신가요? <a style={{ color: 'var(--color-text-link)', fontWeight: 700, cursor: 'pointer' }}>회원가입</a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen });
