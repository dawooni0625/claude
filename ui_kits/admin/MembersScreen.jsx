/* global React, Card, Badge, Button, Avatar, IconButton, IconSearch, IconFilter, IconPlus, IconMore, IconDownload, IconChevronR, Modal, TextField, Select */
// Members — table-heavy screen demonstrating table.* + pagination.* + dropdown.* + modal

const MEMBERS = [
  { name: '김지원', email: 'jiwon.kim@kirbs.io',  role: 'Admin',  team: 'Design',     status: 'active',   joined: '2023-04-12' },
  { name: '이서연', email: 'seoyeon.lee@kirbs.io', role: 'Editor', team: 'Engineering', status: 'active',   joined: '2023-06-21' },
  { name: '박민준', email: 'minjun.park@kirbs.io', role: 'Member', team: 'Marketing',   status: 'invited',  joined: '2024-01-08' },
  { name: '최예린', email: 'yerin.choi@kirbs.io',  role: 'Editor', team: 'Sales',       status: 'active',   joined: '2024-02-14' },
  { name: '정하늘', email: 'haneul.jung@kirbs.io', role: 'Member', team: 'Operations',  status: 'inactive', joined: '2022-11-30' },
  { name: '한도윤', email: 'doyun.han@kirbs.io',   role: 'Admin',  team: 'Design',     status: 'active',   joined: '2022-08-03' },
  { name: '윤서아', email: 'seoah.yoon@kirbs.io',  role: 'Member', team: 'Engineering', status: 'active',   joined: '2023-09-19' },
  { name: '오민서', email: 'minseo.oh@kirbs.io',   role: 'Member', team: 'Sales',       status: 'active',   joined: '2024-03-02' },
];

const STATUS = {
  active:   { label: '활성',   tone: 'success-subtle' },
  invited:  { label: '초대됨', tone: 'info-subtle' },
  inactive: { label: '비활성', tone: 'neutral' },
};

function MembersScreen({ onInvite }) {
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState(new Set());
  const [page, setPage] = React.useState(1);
  const [actionFor, setActionFor] = React.useState(null);  // member name with open action menu

  const filtered = MEMBERS.filter(m =>
    !query
    || m.name.toLowerCase().includes(query.toLowerCase())
    || m.email.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (name) => {
    const next = new Set(selected);
    if (next.has(name)) next.delete(name); else next.add(name);
    setSelected(next);
  };
  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(m => m.name)));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, letterSpacing: '-0.01em' }}>멤버 관리</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--color-text-tertiary)' }}>
            {MEMBERS.length}명의 멤버 · 활성 {MEMBERS.filter(m => m.status === 'active').length}명
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" size="sm" icon={<IconDownload size={16}/>}>CSV 내보내기</Button>
          <Button variant="primary" size="sm" icon={<IconPlus size={16}/>} onClick={onInvite}>멤버 초대</Button>
        </div>
      </div>

      {/* Toolbar */}
      <Card padding={0}>
        <div style={{
          padding: 16,
          display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
          borderBottom: '1px solid var(--color-border-default)',
        }}>
          <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 360 }}>
            <span style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--color-text-tertiary)', display: 'inline-flex',
            }}><IconSearch size={16} /></span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="이름 또는 이메일 검색…"
              style={{
                width: '100%', height: 40,
                padding: '8px 14px 8px 36px',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--border-radius-md)',
                fontFamily: 'var(--font-family-base)', fontSize: 14,
                outline: 'none',
              }}
            />
          </div>
          <Button variant="secondary" size="sm" icon={<IconFilter size={16}/>}>필터</Button>
          {selected.size > 0 && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>{selected.size}명 선택됨</span>
              <Button variant="danger" size="sm">삭제</Button>
            </div>
          )}
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ height: 40, background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-default)' }}>
                <th style={{ width: 44, padding: '0 16px', textAlign: 'left' }}>
                  <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll}
                    style={{ accentColor: 'var(--color-interactive-primary)', width: 16, height: 16 }}/>
                </th>
                {['이름', '팀', '역할', '상태', '가입일', ''].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '0 16px',
                    fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr
                  key={m.name}
                  style={{
                    height: 56,
                    borderBottom: '1px solid var(--color-border-default)',
                    background: selected.has(m.name) ? 'var(--color-brand-quaternary)' : 'var(--color-bg-elevated)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!selected.has(m.name)) e.currentTarget.style.background = 'var(--color-bg-surface)'; }}
                  onMouseLeave={e => { if (!selected.has(m.name)) e.currentTarget.style.background = 'var(--color-bg-elevated)'; }}
                >
                  <td style={{ padding: '0 16px' }} onClick={e => e.stopPropagation()}>
                    <input type="checkbox" checked={selected.has(m.name)} onChange={() => toggle(m.name)}
                      style={{ accentColor: 'var(--color-interactive-primary)', width: 16, height: 16 }}/>
                  </td>
                  <td style={{ padding: '0 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={m.name} size="xs" />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0 16px', color: 'var(--color-text-secondary)' }}>{m.team}</td>
                  <td style={{ padding: '0 16px' }}>
                    {m.role === 'Admin' ? <Badge tone="brand-subtle">Admin</Badge> : <span style={{ color: 'var(--color-text-secondary)' }}>{m.role}</span>}
                  </td>
                  <td style={{ padding: '0 16px' }}>
                    <Badge tone={STATUS[m.status].tone}>{STATUS[m.status].label}</Badge>
                  </td>
                  <td style={{ padding: '0 16px', fontFamily: 'var(--font-family-mono)', fontSize: 13, color: 'var(--color-text-tertiary)' }}>{m.joined}</td>
                  <td style={{ padding: '0 16px', position: 'relative' }} onClick={e => e.stopPropagation()}>
                    <IconButton icon={<IconMore size={18}/>} onClick={() => setActionFor(actionFor === m.name ? null : m.name)} ariaLabel="Actions"/>
                    {actionFor === m.name && (
                      <div style={{
                        position: 'absolute', right: 16, top: 44, zIndex: 100,
                        width: 180, background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border-default)',
                        borderRadius: 'var(--border-radius-md)',
                        boxShadow: 'var(--elevation-2)',
                        overflow: 'hidden',
                      }}
                      onMouseLeave={() => setActionFor(null)}
                      >
                        {['프로필 보기', '역할 변경', '재초대 보내기'].map(label => (
                          <div key={label} style={{ height: 40, padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 14, cursor: 'pointer' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-surface)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-bg-elevated)'}
                          >{label}</div>
                        ))}
                        <div style={{ borderTop: '1px solid var(--color-border-default)' }}/>
                        <div style={{ height: 40, padding: '0 14px', display: 'flex', alignItems: 'center', fontSize: 14, color: 'var(--color-text-error)', cursor: 'pointer' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-error)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-bg-elevated)'}
                        >멤버 제거</div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          padding: '14px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid var(--color-border-default)',
        }}>
          <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
            {filtered.length}명 중 1–{filtered.length} 표시
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['‹', 1, 2, 3, '›'].map((p, i) => {
              const active = p === page;
              const disabled = p === '‹' || p === '›';
              return (
                <button
                  key={i}
                  onClick={() => typeof p === 'number' && setPage(p)}
                  style={{
                    width: 32, height: 32,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: active ? 'var(--color-interactive-primary)' : 'transparent',
                    color: active ? '#FFFFFF' : disabled ? 'var(--color-text-disabled)' : 'var(--color-text-secondary)',
                    border: 0, borderRadius: 'var(--border-radius-sm)',
                    fontSize: 14, fontWeight: active ? 700 : 400,
                    cursor: disabled ? 'default' : 'pointer',
                  }}
                  onMouseEnter={e => { if (!active && !disabled) e.currentTarget.style.background = 'var(--color-brand-quaternary)'; }}
                  onMouseLeave={e => { if (!active && !disabled) e.currentTarget.style.background = 'transparent'; }}
                >{p}</button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

// Invite modal (called from App)
function InviteModal({ open, onClose, onInvited }) {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('member');
  const submit = () => {
    if (!email) return;
    onInvited?.(email);
    setEmail('');
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="멤버 초대"
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>취소</Button>
          <Button variant="primary" size="sm" onClick={submit} disabled={!email}>초대 보내기</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <TextField
          label="이메일"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          helper="회사 이메일을 입력해 주세요."
        />
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6 }}>역할</label>
          <Select value={role} onChange={setRole} options={[
            { value: 'admin',  label: 'Admin · 전체 권한' },
            { value: 'editor', label: 'Editor · 편집 권한' },
            { value: 'member', label: 'Member · 보기 권한' },
          ]}/>
        </div>
      </div>
    </Modal>
  );
}

Object.assign(window, { MembersScreen, InviteModal });
