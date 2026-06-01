/* global React, Card, Badge, Button, AvatarStack, IconTrendUp, IconArrowR, IconPlus, IconChart, IconUsers, IconFile, useViewport */
// Dashboard — KPI cards + recent activity feed + spark "chart".

const KPIS = [
  { label: '월간 매출', value: '₩ 42.8M', delta: '+12.4%', trend: 'up',   tone: 'success' },
  { label: '신규 가입', value: '184',     delta: '+8.2%',  trend: 'up',   tone: 'success' },
  { label: '활성 사용자', value: '2,184',  delta: '+3.1%',  trend: 'up',   tone: 'success' },
  { label: '이탈률',    value: '2.4%',   delta: '−0.6%p', trend: 'down', tone: 'success' },
];

function StatCard({ kpi }) {
  return (
    <Card padding={20}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
        }}>{kpi.label}</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 700,
          color: 'var(--color-text-success)',
        }}>
          <IconTrendUp size={12} />
          {kpi.delta}
        </span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em' }}>{kpi.value}</div>
      <div style={{
        marginTop: 14, height: 32,
        background: 'var(--color-bg-surface)',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* fake sparkline */}
        <svg viewBox="0 0 200 32" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <polyline
            fill="none"
            stroke="var(--color-brand-secondary)"
            strokeWidth="1.5"
            points="0,24 20,20 40,22 60,16 80,18 100,12 120,14 140,8 160,10 180,4 200,6"
          />
          <polyline
            fill="var(--color-brand-quaternary)"
            stroke="none"
            opacity="0.6"
            points="0,24 20,20 40,22 60,16 80,18 100,12 120,14 140,8 160,10 180,4 200,6 200,32 0,32"
          />
        </svg>
      </div>
    </Card>
  );
}

const ACTIVITY = [
  { who: '김지원', what: '새 프로젝트를 만들었습니다',     where: 'KIRBS Design v2',  when: '5분 전',  tone: 'brand-subtle' },
  { who: '이서연', what: '문서를 업로드했습니다',           where: '2024년 4분기 리포트', when: '12분 전', tone: 'info-subtle' },
  { who: '박민준', what: '워크스페이스에 합류했습니다',     where: 'KIRBS Admin',       when: '1시간 전', tone: 'success-subtle' },
  { who: '최예린', what: '결제 정보를 업데이트했습니다',     where: '청구 · Enterprise', when: '3시간 전', tone: 'brand-subtle' },
  { who: '정하늘', what: '리포트를 공유했습니다',           where: 'NPS 월간 트래킹',    when: '어제',     tone: 'info-subtle' },
];

function DashboardScreen({ onAddProject }) {
  const { isMobile } = useViewport();
  return (
    <div>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: isMobile ? 24 : 32, fontWeight: 700, letterSpacing: '-0.01em' }}>대시보드</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--color-text-tertiary)' }}>
            워크스페이스 전반의 핵심 지표를 한눈에 확인하세요.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" size="sm">기간: 30일</Button>
          <Button variant="primary" size="sm" icon={<IconPlus size={16}/>} onClick={onAddProject}>프로젝트 추가</Button>
        </div>
      </div>

      {/* KPI grid — auto-fits to width (4 → 2 → 1 up) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {KPIS.map(kpi => <StatCard key={kpi.label} kpi={kpi} />)}
      </div>

      {/* Two-column: chart + activity → stacks on mobile */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', gap: 16 }}>
        <Card padding={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>주간 활성 사용자</h3>
              <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>최근 8주</span>
            </div>
            <Badge tone="success-subtle">+12.4% vs prev</Badge>
          </div>
          <div style={{ height: 200, position: 'relative' }}>
            <svg viewBox="0 0 400 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              {/* gridlines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" x2="400" y1={i * 50} y2={i * 50} stroke="var(--color-border-default)" strokeWidth="1" strokeDasharray="2 4"/>
              ))}
              {/* bars */}
              {[110, 135, 120, 155, 140, 175, 168, 185].map((h, i) => (
                <rect
                  key={i}
                  x={i * 48 + 16}
                  y={200 - h}
                  width={28}
                  height={h}
                  rx={4}
                  fill={i === 7 ? 'var(--color-interactive-primary)' : 'var(--color-brand-tertiary)'}
                  opacity={i === 7 ? 1 : 0.6}
                />
              ))}
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: 'var(--color-text-tertiary)' }}>
            {['W37', 'W38', 'W39', 'W40', 'W41', 'W42', 'W43', 'W44'].map(w => <span key={w}>{w}</span>)}
          </div>
        </Card>

        <Card padding={0}>
          <div style={{
            height: 56, padding: '0 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '1px solid var(--color-border-default)',
          }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>최근 활동</h3>
            <a style={{ fontSize: 12, color: 'var(--color-text-link)', cursor: 'pointer' }}>전체 보기</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{
                padding: '12px 20px',
                borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--color-border-default)' : 0,
                display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--color-brand-quaternary)', color: 'var(--color-text-brand)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, flexShrink: 0,
                }}>{a.who[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>
                    <strong>{a.who}</strong> {a.what}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {a.where} · {a.when}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
