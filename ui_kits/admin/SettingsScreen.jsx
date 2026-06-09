/* global React, Card, Button, TextField, Textarea, Toggle, RadioGroup, Select, Badge, Avatar, useViewport */
// Settings — form-heavy screen with tabs (general / notifications / billing / appearance)

const TABS = [
  { id: 'general',  label: '일반' },
  { id: 'notifs',   label: '알림' },
  { id: 'billing',  label: '청구' },
  { id: 'appearance', label: '테마' },
];

function TabBar({ active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 8,
      borderBottom: '1px solid var(--color-border-default)',
      marginBottom: 24,
      overflowX: 'auto',
    }}>
      {TABS.map(t => {
        const isActive = t.id === active;
        return (
          <div
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              height: 44, padding: '0 16px',
              display: 'flex', alignItems: 'center',
              whiteSpace: 'nowrap',
              fontSize: 16, fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--color-text-brand)' : 'var(--color-text-tertiary)',
              borderBottom: isActive ? '2px solid var(--color-interactive-primary)' : '2px solid transparent',
              marginBottom: -1,
              cursor: 'pointer',
              transition: 'color 100ms',
            }}
          >{t.label}</div>
        );
      })}
    </div>
  );
}

function Section({ title, description, children }) {
  const { isMobile } = useViewport();
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '280px 1fr', gap: isMobile ? 16 : 40,
      padding: '24px 0',
      borderBottom: '1px solid var(--color-border-default)',
    }}>
      <div>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{title}</h3>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>{description}</p>
      </div>
      <div style={{ maxWidth: 560 }}>{children}</div>
    </div>
  );
}

function GeneralTab({ onSave }) {
  const [name, setName] = React.useState('KIRBS Workspace');
  const [url, setUrl] = React.useState('kirbs');
  const [desc, setDesc] = React.useState('디자인 시스템과 디자인 토큰을 관리하는 워크스페이스입니다.');
  return (
    <>
      <Section title="워크스페이스 정보" description="팀 멤버에게 표시되는 워크스페이스 이름과 URL입니다.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TextField label="이름" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="URL" value={url} onChange={e => setUrl(e.target.value)} helper="kirbs.io/{url} 형식으로 접속됩니다." />
          <Textarea label="설명" value={desc} onChange={e => setDesc(e.target.value)} helper="공개 페이지에 표시될 수 있습니다." />
        </div>
      </Section>

      <Section title="언어 및 지역" description="기본 언어 및 시간대 설정입니다.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>언어</label>
            <Select value="ko" options={[{ value: 'ko', label: '한국어' }, { value: 'en', label: 'English' }]} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>시간대</label>
            <Select value="kst" options={[{ value: 'kst', label: 'Asia/Seoul (UTC+9)' }, { value: 'utc', label: 'UTC' }]} />
          </div>
        </div>
      </Section>

      <Section title="위험 구역" description="이 작업은 되돌릴 수 없습니다.">
        <div style={{
          padding: 16,
          background: 'var(--color-bg-error)',
          border: '1px solid var(--color-state-error)',
          borderRadius: 'var(--border-radius-md)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-error)' }}>워크스페이스 삭제</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>모든 멤버 · 프로젝트 · 데이터가 영구 삭제됩니다.</div>
          </div>
          <Button variant="danger" size="sm">삭제</Button>
        </div>
      </Section>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 24 }}>
        <Button variant="secondary" size="sm">변경 취소</Button>
        <Button variant="primary" size="sm" onClick={onSave}>저장</Button>
      </div>
    </>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = React.useState({
    mention: true, comment: true, weekly: false, marketing: false, billing: true,
  });
  const toggle = (k) => setPrefs(p => ({ ...p, [k]: !p[k] }));
  const rows = [
    ['mention',   '멘션 알림',         '@멘션을 받으면 이메일과 인앱 알림을 받습니다.'],
    ['comment',   '댓글 알림',         '내 항목에 새 댓글이 달릴 때 알림을 받습니다.'],
    ['weekly',    '주간 요약',         '매주 월요일 워크스페이스 활동 요약을 받습니다.'],
    ['marketing', '제품 업데이트',     '새 기능과 개선 사항을 이메일로 받습니다.'],
    ['billing',   '결제 및 청구',      '청구 주기와 결제 영수증 알림을 받습니다.'],
  ];
  return (
    <>
      <Section title="알림 채널" description="이메일과 인앱 알림 채널을 모두 관리합니다.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {rows.map(([k, label, desc]) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
              padding: '12px 0',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)' }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginTop: 2 }}>{desc}</div>
              </div>
              <Toggle checked={prefs[k]} onChange={() => toggle(k)}/>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function BillingTab() {
  return (
    <>
      <Section title="현재 플랜" description="플랜 변경 및 청구 정보를 관리합니다.">
        <Card padding={20} style={{ background: 'var(--color-bg-brand-subtle)', border: '1px solid var(--color-brand-tertiary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-brand)' }}>Enterprise</span>
                <Badge tone="brand">현재 플랜</Badge>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>다음 결제: 2026년 6월 1일 · ₩ 1,200,000</div>
            </div>
            <Button variant="secondary" size="sm">플랜 관리</Button>
          </div>
        </Card>
      </Section>
      <Section title="결제 수단" description="청구에 사용되는 결제 카드입니다.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[['Visa', '•••• 4242', '2027 / 03', true], ['Mastercard', '•••• 9912', '2025 / 11', false]].map(([brand, num, exp, primary]) => (
            <div key={num} style={{
              padding: 16, border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--border-radius-md)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
              background: 'var(--color-bg-elevated)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 28, background: 'var(--color-bg-surface)',
                  borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-family-mono)', fontSize: 10, fontWeight: 700, color: 'var(--color-text-secondary)',
                }}>{brand}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 14, fontWeight: 700 }}>{num}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>만료 {exp}</div>
                </div>
              </div>
              {primary ? <Badge tone="success-subtle">기본</Badge> : <Button variant="tertiary" size="sm">기본으로 설정</Button>}
            </div>
          ))}
          <Button variant="secondary" size="sm" style={{ alignSelf: 'flex-start' }}>+ 카드 추가</Button>
        </div>
      </Section>
    </>
  );
}

function AppearanceTab() {
  const [theme, setTheme] = React.useState('light');
  const [density, setDensity] = React.useState('comfortable');
  return (
    <>
      <Section title="테마" description="앱 전체에 적용되는 색상 모드입니다.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { id: 'light',  label: '라이트',    bg: '#FFFFFF', fg: '#000000', border: '#E4E4E4' },
            { id: 'dark',   label: '다크',      bg: '#0F0F12', fg: '#F0F0F0', border: '#2E2E34' },
            { id: 'system', label: '시스템 따라가기', bg: 'linear-gradient(90deg,#FFFFFF 50%,#0F0F12 50%)', fg: '#5B63A8', border: '#E4E4E4' },
          ].map(opt => (
            <div
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              style={{
                padding: 14, cursor: 'pointer',
                background: 'var(--color-bg-elevated)',
                border: `2px solid ${theme === opt.id ? 'var(--color-interactive-primary)' : 'var(--color-border-default)'}`,
                borderRadius: 'var(--border-radius-md)',
                transition: 'border-color 100ms',
              }}
            >
              <div style={{ height: 60, background: opt.bg, borderRadius: 6, border: `1px solid ${opt.border}`, marginBottom: 10 }}/>
              <div style={{ fontSize: 13, fontWeight: theme === opt.id ? 700 : 400, color: theme === opt.id ? 'var(--color-text-brand)' : 'var(--color-text-primary)' }}>{opt.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="밀도" description="목록과 표의 행 높이를 조절합니다.">
        <RadioGroup
          value={density}
          onChange={setDensity}
          options={[
            { value: 'comfortable', label: '여유롭게 (기본)' },
            { value: 'compact',     label: '촘촘하게' },
          ]}
        />
      </Section>
    </>
  );
}

function SettingsScreen({ onSave }) {
  const [tab, setTab] = React.useState('general');
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em' }}>설정</h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--color-text-tertiary)' }}>
          워크스페이스 환경설정과 청구 정보를 관리합니다.
        </p>
      </div>
      <TabBar active={tab} onChange={setTab}/>
      {tab === 'general'    && <GeneralTab onSave={onSave}/>}
      {tab === 'notifs'     && <NotificationsTab/>}
      {tab === 'billing'    && <BillingTab/>}
      {tab === 'appearance' && <AppearanceTab/>}
    </div>
  );
}

Object.assign(window, { SettingsScreen });
