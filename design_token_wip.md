# 피그마 디자인 가이드 수집 및 토큰 변환 가이드

본 문서는 피그마 MCP를 통해 수집한 디자인 가이드를 기록하고, 원티드 몬타주 스타일의 JSON 토큰으로 변환하기 위한 임시 작업 문서입니다.

## 1. 수집된 피그마 원본 정보 (Raw Data From Figma)

<!-- 조회 일시: 2026-05-18 | 파일: Design-guide (gFxpQc2iOUSo722uDP85Bg) -->
<!-- 조회 페이지 목록: Cover / Colors / Typography / Icon / Grid Systems / Spacing / Selectors / Textfields / Buttons / Small Elements / Big Elements / Cards / Logo / Images / Elevation / Border stroke / Border radius / Motion / Forms / Loading / Empty / Toast·Notification / Hover / Global Header / Sidebar / App Nav -->

### 1-Color Styles / Variables

**페이지:** Colors (node: 4:301)

#### Brand Colors

| 이름 | Hex | 피그마 토큰명 | 용도 설명 |
|---|---|---|---|
| Primary | #2D3378 | --brand/primary | 로고, 헤드라인, 강조 버튼 |
| Secondary | #5B63A8 | --brand/secondary | 서브 버튼, 아이콘, 마우스 호버 |
| Tertiary | #8E96D3 | --brand/tertiary | 일러스트 요소, 보조 그래픽 |
| Quaternary | #E8EAF6 | --brand/quarternary | 배경톤, 배경색 |

#### State Colors

| 이름 | Hex | 피그마 토큰명 | 용도 설명 |
|---|---|---|---|
| Info | #2F80ED | --state/info | 안내, 중립 메시지 |
| Success | #27AE60 | --state/success | 완료, 성공 상태 |
| Warning | #E2B93B | --state/warning | 주의, 경고 상태 |
| Error | #EB5757 | --state/error | 오류, 실패 상태 |

#### Black / White

| 이름 | Hex | 피그마 토큰명 | 비고 |
|---|---|---|---|
| Black 1 | #000000 | --color/black1 | |
| White | #FFFFFF | --color/white | |
| Black 2 | #1D1D1D | --color/black2 | hidden (숨김 레이어) |
| Black 3 | #282828 | --color/black3 | hidden (숨김 레이어) |

#### Gray Colors (폰트 컬러와 공통으로 사용)

| 이름 | Hex | 피그마 토큰명 | 용도 설명 |
|---|---|---|---|
| Gray 1 | #333333 | --color/gray1 | 주요 본문 텍스트 |
| Gray 2 | #4F4F4F | --color/gray2 | 보조 텍스트 |
| Gray 3 | #828282 | --color/gray3 | 플레이스홀더, 힌트 |
| Gray 4 | #BDBDBD | --color/gray4 | 비활성, 구분선 |
| Gray 5 | #E0E0E0 | --color/gray5 | 배경 구분선, 테두리 |

---

### 2-Typography Styles

**페이지:** Typography (node: 4:394)

**공통 속성**
- Font Family: Pretendard
- Line Height: 150%
- Letter Spacing: 0
- Weight: Regular(400) / Bold(700)

#### Display (배너·마케팅 용도. 자유 변형 가능하나 과도한 크기 남용 지양)

| 토큰명 | Size | Weight | Line-h | 사용 예시 |
|---|---|---|---|---|
| Display/xlarge | 64px | 700 Bold | 150% | 히어로 배너, 랜딩 페이지 최상단, 메인 슬로건 전용 |
| Display/large | 48px | 700 Bold | 150% | 섹션 히어로, 주요 섹션 상단, 마케팅 타이틀 |
| Display/medium | 40px | 700 Bold | 150% | 프로모션, 캠페인 헤드라인, 광고 소재 |
| Display/small | 32px | 700 Bold | 150% | 서브 배너, 보조 섹션 헤드라인, 랜딩 페이지 내 소제목 |
| Display/xsmall | 24px | 700 Bold | 150% | 강조 문구, 인포그래픽·수치 강조, 배너 내 보조 텍스트 |

#### Title / Heading (페이지·섹션 계층 구조 — h1~h5 태그와 1:1 대응)

| 토큰명 | HTML Tag | Size | Weight | Line-h | 사용 예시 |
|---|---|---|---|---|---|
| Title/h1 | h1 | 32px | 700 Bold | 150% | 페이지 제목, 메인 페이지 타이틀, 모달 주요 헤더 |
| Title/h2 | h2 | 24px | 700 Bold | 150% | 섹션 제목, 카드 그룹 헤더, 탭 내부 섹션명 |
| Title/h3 | h3 | 20px | 700 Bold | 150% | 카드 제목, 카드 헤더·아코디언, Large 버튼 font-size |
| Title/h4 | h4 | 18px | 700 Bold | 150% | 서브 타이틀, 테이블 섹션 헤더, 설정 항목 그룹 |
| Title/h5 | h5 | 16px | 700 Bold | 150% | 폼 레이블, 인풋 상단 레이블, 사이드바 섹션명 |

#### Body (UI 전반 본문 텍스트 — ⭐ medium이 기본값)

> ⭐ 기본값: Body/medium-bold (16px·700), Body/medium-regular (16px·400)  
> 가독성 주의: Body/small (14px)은 부가 설명 전용. 본문 주력 크기로 사용 금지

| 토큰명 | Size | Weight | Line-h | 사용 예시 |
|---|---|---|---|---|
| Body/large-bold | 18px | 700 Bold | 150% | 써머리, KPI 수치 강조, 중요 정보 요약 |
| Body/large-regular | 18px | 400 Regular | 150% | 리드 텍스트, 섹션 도입부, 설명 요약문 |
| Body/medium-bold ⭐ | 16px | 700 Bold | 150% | 버튼 텍스트, 탭, 테이블 헤더, 레이블 |
| Body/medium-regular ⭐ | 16px | 400 Regular | 150% | 본문 텍스트, 인풋, 드롭다운, 설명문 |
| Body/small-bold | 14px | 700 Bold | 150% | 부가 정보, 뱃지·상태 텍스트, 메타 정보 강조 |
| Body/small-regular | 14px | 400 Regular | 150% | 부가 설명, 캡션, 툴팁 텍스트, 인풋 하단 힌트 |

---

### 3-Spacing & Grid Variables

#### Spacing Scale (페이지: Spacing / node: 5:1059)

핵심 원칙 — 외부 간격 > 내부 간격
- 컴포넌트 내부(2–4px) → 요소 간(8px) → 패딩(12–16px) → 섹션 구분(24–32px)
- 기준: 2px 기본 단위 × 8포인트 그리드 스케일
- 간격이 클수록 요소 간의 관계가 더 독립적임을 의미

| 토큰 | 값 | 사용 카테고리 | 적용 예시 |
|---|---|---|---|
| space-1 | 2px | 컴포넌트 내부 | 아이콘-텍스트 간격, 인디케이터 내부 등 가장 작은 요소 간 간격 |
| space-2 | 4px | 컴포넌트 내부 | 뱃지 상하 패딩, 체크박스-레이블 간격 |
| space-4 | 8px | 관련 요소 간 | 버튼 그룹, 메타데이터 아이템, 리스트 행 내부 패딩 |
| space-6 | 12px | 버튼·폼 좌우 패딩 전용 | Button / Input / Tab 좌우 패딩에만 사용. 세로 패딩은 8px 사용 |
| space-8 | 16px | 그룹 구분·패딩 | 카드 내부 패딩, 관련 없는 요소·그룹 간 간격 |
| space-12 | 24px | 하위 섹션 구분 | 콘텐츠 하위 섹션 구분, 카드 그리드 간격, 폼 필드 그룹 간격 |
| space-16 | 32px | 주요 섹션 구분 | 콘텐츠 섹션 간 구분, 페이지 내 주요 블록 구분 |

#### Grid Systems (페이지: Grid Systems / node: 5:1001)

4개 브레이크포인트 기반 12컬럼 그리드. 일관된 여백과 정렬로 반응형 레이아웃을 구성.

| 브레이크포인트 | 프레임 너비 | 컬럼 수 | 컬럼 너비 | 거터 | 마진 |
|---|---|---|---|---|---|
| Desktop HD | ≥1440px | 12 | 65px | 30px | Auto (중앙 정렬) |
| Desktop | ≥1024px | 12 | 50px | 30px | 32px |
| Tablet | ≥768px | 6 | 88px | 30px | 24px |
| Mobile | ≥320px | 2 | 130px | 30px | 16px |

**Responsive 규칙:**
1. 거터 고정: 모든 브레이크포인트에서 Gutter = 30px 고정. 컬럼 수·너비만 변화
2. 컬럼 수 축소: Desktop (12) → Tablet (6) → Mobile (2)
3. 마진 비례: Mobile 16px → Tablet 24px → Desktop 32px → HD Auto(중앙)
4. 최대 컨텐츠 너비: 1440px 제한. 이상 화면에서는 좌우 Auto 마진으로 중앙 정렬

**Column Span 패턴 (Desktop HD 12컬럼 기준):**
- Full: 12/12
- 반반: 6/12 + 6/12
- Main+Aside: 8/12 + 4/12
- 3등분: 4/12 × 3
- 4등분: 3/12 × 4
- 6등분: 2/12 × 6
- Offset 예시: offset-2 / span-8, offset-3 / span-6 (centered)

---

### 4-Elevation

**페이지:** Elevation (node: 192:2729)

그림자 색상 기반: Brand Primary(#2D3378) 투명도 변화
> 낮은 레벨일수록 페이지에 가깝고, 높은 레벨일수록 위에 떠 있는 느낌

| 토큰 | CSS Value | 사용 위치 |
|---|---|---|
| elevation-0 | box-shadow: none | 기본 평면 배경 요소 (페이지 배경, 구분선) |
| elevation-1 | 0px 1px 3px rgba(45,51,120,0.08) | 카드, 테이블 행, 목록 아이템 |
| elevation-2 | 0px 2px 8px rgba(45,51,120,0.12) | 드롭다운 메뉴, 툴팁, 플로팅 버튼 |
| elevation-3 | 0px 4px 16px rgba(45,51,120,0.16) | 모달 창, 다이얼로그, 사이드 패널 |
| elevation-4 | 0px 8px 32px rgba(45,51,120,0.20) | 전체화면 오버레이, 최상위 팝업 |

---

### 5-Border Stroke

**페이지:** Border stroke (node: 194:2841)

#### Stroke Width

| 토큰 | 값 | 사용 위치 |
|---|---|---|
| border-thin | 1px | 기본 테두리 — 인풋, 카드, 구분선, 테이블 셀 |
| border-medium | 2px | 포커스 링, 강조 테두리 — 선택된 카드, 활성 탭 |
| border-thick | 3px | 액센트 인디케이터 — 활성 사이드바 항목, 진행 표시 |

#### Stroke Color

| 토큰 | Hex | 사용 위치 |
|---|---|---|
| border-default | #E0E0E0 | 모든 기본 상태 컴포넌트 |
| border-primary | #2D3378 | 포커스, 선택, 활성 상태 |
| border-secondary | #5B63A8 | 보조 강조, 호버 상태 |
| border-error | #EB5757 | 에러 상태 인풋·셀렉터 |
| border-success | #27AE60 | 성공·완료 상태 인풋 |
| border-disabled | #BDBDBD | 비활성 컴포넌트 전체 |

---

### 6-Border Radius

**페이지:** Border radius (node: 194:3026)

> radius-full은 알약형(pill) 및 원형 UI에만 사용. 값이 클수록 친근하고 현대적인 느낌

| 토큰 | 값 | 사용 위치 |
|---|---|---|
| radius-none | 0px | 테이블 셀, 구분선, 엄격한 격자 레이아웃 |
| radius-xs | 2px | 뱃지, 태그, 코드 블록 |
| radius-sm | 4px | Input 필드, 텍스트에리어, 작은 버튼 |
| radius-md | 8px | 카드, 드롭다운 패널, 툴팁 |
| radius-lg | 12px | 모달 창, 큰 카드, 사이드 패널 |
| radius-xl | 16px | 바텀시트, 대형 팝업, 알림 배너 |
| radius-full | 9999px | 알약형 버튼, 아바타, 토글, 뱃지 카운트 |

---

### 7-Motion

**페이지:** Motion (node: 194:3172)

#### Duration (⭐ 기본값: duration-normal 200ms)

| 토큰 | 값 | 사용 위치 |
|---|---|---|
| duration-instant | 0ms | 즉각 반응 필요 요소 (애니메이션 없음) |
| duration-fast | 100ms | 버튼 호버·포커스, 색상 전환, 토글 |
| duration-normal ⭐ | 200ms | 드롭다운, 탭 전환, 아코디언 — UI 전반 기본값 |
| duration-slow | 300ms | 모달 open/close, 사이드패널 슬라이드 |
| duration-slower | 500ms | 페이지 전환, 복잡한 레이아웃 변화 |

#### Easing (⭐ 기본값: ease-out)

| 토큰 | CSS Value | 사용 위치 |
|---|---|---|
| ease-linear | cubic-bezier(0,0,1,1) | 프로그레스 바, 로딩 인디케이터 (등속) |
| ease-in | cubic-bezier(0.4,0,1,1) | 요소 퇴장(exit), 사라지는 애니메이션 (가속) |
| ease-out ⭐ | cubic-bezier(0,0,0.2,1) | 요소 등장(enter) — 가장 자주 사용 (감속) |
| ease-in-out | cubic-bezier(0.4,0,0.2,1) | 상태 전환, 위치 이동 애니메이션 (가감속) |
| ease-spring | cubic-bezier(0.34,1.56,0.64,1) | 뱃지 팝업, 알림 등장, 강조 효과 (스프링) |

---

## 2. 정제된 디자인 토큰 명세 (Structured Tokens)

<!-- 레이어 구조: 원시(Primitive) → 시맨틱(Semantic) → 컴포넌트(Component) -->
<!-- 포맷: W3C DTCG | $type: color / dimension / number / shadow / duration / cubicBezier / transition / fontFamily / fontWeight -->
<!-- CSS 변수 네이밍: semantic.color.text.primary → --color-text-primary | spacing.8 → --space-8 | zIndex.modal → --z-modal -->

### 카테고리 구성 개요

| # | 키 | 레이어 | 설명 |
|---|---|---|---|
| 01 | `color` | Primitive | 브랜드·상태·흑백·그레이 원시 색상 |
| 02 | `spacing` | Primitive | 2px 기반 7단계 간격 스케일 |
| 03 | `typography` | Primitive | 폰트 패밀리·사이즈·굵기·행간·자간 |
| 04 | `border` | Primitive | stroke 두께·색상·radius |
| 05 | `elevation` | Primitive | 0~4단계 그림자 (브랜드 컬러 기반) |
| 06 | `motion` | Primitive | duration 5단계 + easing 5종 |
| 07 | `grid` | Primitive | 4 브레이크포인트 컬럼·거터·마진 |
| 08 | `zIndex` | Primitive | 레이어 순서 8단계 |
| 09 | `transition` | Primitive | 전환 프리셋 7종 |
| 10 | `semantic` | Semantic | 용도별 색상 (text / bg / border / interactive) |
| 11 | `theme.dark` | Semantic | 다크모드 semantic 오버라이드 |
| 12 | `component` | Component | 컴포넌트 치수·색상 (14개) |
| 13 | `layout` | Utility | 컨테이너 max-width |
| 14 | `skeleton` | Utility | 스켈레톤 UI 색상·애니메이션 |
| 15 | `opacity` | Utility | 불투명도 스케일 0~100 |
| 16 | `icon` | Utility | 아이콘 크기 5단계 |
| 17 | `focus` | Utility | 포커스 링 너비·색상 |
| 18 | `overlay` | Utility | 모달·드로어 딤 배경 |

---

### 01. Color — 원시 색상

```json
{
  "color": {
    "brand": {
      "primary":    { "$value": "#2D3378", "$type": "color", "$description": "로고, 헤드라인, 브랜드 버튼" },
      "secondary":  { "$value": "#5B63A8", "$type": "color", "$description": "서브 버튼, 아이콘, 호버" },
      "tertiary":   { "$value": "#8E96D3", "$type": "color", "$description": "일러스트 요소, 보조 그래픽" },
      "quaternary": { "$value": "#E8EAF6", "$type": "color", "$description": "배경톤, 연한 브랜드 배경" }
    },
    "state": {
      "info":    { "$value": "#2F80ED", "$type": "color", "$description": "안내, 중립 메시지" },
      "success": { "$value": "#27AE60", "$type": "color", "$description": "완료, 성공 상태" },
      "warning": { "$value": "#E2B93B", "$type": "color", "$description": "주의, 경고 상태" },
      "error":   { "$value": "#EB5757", "$type": "color", "$description": "오류, 실패 상태" }
    },
    "black": {
      "1": { "$value": "#000000", "$type": "color", "$description": "가장 진한 텍스트·아이콘" },
      "2": { "$value": "#1D1D1D", "$type": "color", "$description": "텍스트·아이콘" },
      "3": { "$value": "#282828", "$type": "color", "$description": "텍스트·아이콘 (옅음)" }
    },
    "white": { "$value": "#FFFFFF", "$type": "color", "$description": "배경, 반전 텍스트" },
    "gray": {
      "1": { "$value": "#333333", "$type": "color", "$description": "주요 본문 텍스트" },
      "2": { "$value": "#4F4F4F", "$type": "color", "$description": "보조 텍스트" },
      "3": { "$value": "#828282", "$type": "color", "$description": "플레이스홀더, 힌트" },
      "4": { "$value": "#BDBDBD", "$type": "color", "$description": "비활성, 구분선" },
      "5": { "$value": "#E0E0E0", "$type": "color", "$description": "배경 구분선, 테두리" }
    }
  }
}
```

---

### 02. Spacing — 간격 스케일

```json
{
  "spacing": {
    "1":  { "$value": "2px",  "$type": "dimension", "$description": "아이콘-텍스트 극소 간격" },
    "2":  { "$value": "4px",  "$type": "dimension", "$description": "뱃지 패딩, 체크박스-레이블 간격" },
    "4":  { "$value": "8px",  "$type": "dimension", "$description": "버튼 그룹, 메타데이터 아이템 간격" },
    "6":  { "$value": "12px", "$type": "dimension", "$description": "버튼·인풋·탭 좌우 패딩 전용" },
    "8":  { "$value": "16px", "$type": "dimension", "$description": "카드 내부 패딩, 그룹 간격" },
    "12": { "$value": "24px", "$type": "dimension", "$description": "하위 섹션 구분, 카드 그리드 간격" },
    "16": { "$value": "32px", "$type": "dimension", "$description": "주요 섹션 구분, 페이지 블록 구분" }
  }
}
```

---

### 03. Typography — 타이포그래피

```json
{
  "typography": {
    "fontFamily": {
      "base": { "$value": "'Pretendard', 'Noto Sans KR', sans-serif", "$type": "fontFamily", "$description": "전체 UI 기본 폰트" },
      "mono": { "$value": "'JetBrains Mono', 'Courier New', monospace", "$type": "fontFamily", "$description": "코드·숫자 모노스페이스" }
    },
    "fontSize": {
      "display-2xl": { "$value": "64px", "$type": "dimension", "$description": "히어로 배너, 랜딩 최상단" },
      "display-xl":  { "$value": "48px", "$type": "dimension", "$description": "섹션 히어로, 마케팅 타이틀" },
      "display-lg":  { "$value": "40px", "$type": "dimension", "$description": "프로모션 헤드라인" },
      "display-md":  { "$value": "32px", "$type": "dimension", "$description": "서브 배너, 보조 헤드라인" },
      "display-sm":  { "$value": "24px", "$type": "dimension", "$description": "인포그래픽 수치 강조" },
      "heading-1":   { "$value": "32px", "$type": "dimension", "$description": "h1 — 페이지 제목, 모달 주요 헤더" },
      "heading-2":   { "$value": "24px", "$type": "dimension", "$description": "h2 — 섹션 제목, 카드 그룹 헤더" },
      "heading-3":   { "$value": "20px", "$type": "dimension", "$description": "h3 — 카드 제목, 아코디언 헤더" },
      "heading-4":   { "$value": "18px", "$type": "dimension", "$description": "h4 — 서브 타이틀, 설정 항목 그룹" },
      "heading-5":   { "$value": "16px", "$type": "dimension", "$description": "h5 — 폼 레이블, 사이드바 섹션명" },
      "body-lg":     { "$value": "18px", "$type": "dimension", "$description": "KPI 수치, 리드 텍스트" },
      "body-md":     { "$value": "16px", "$type": "dimension", "$description": "⭐ 기본값 — 버튼, 탭, 일반 본문" },
      "body-sm":     { "$value": "14px", "$type": "dimension", "$description": "부가 설명, 캡션, 툴팁, 힌트" }
    },
    "fontWeight": {
      "regular": { "$value": "400", "$type": "fontWeight", "$description": "일반 본문 텍스트" },
      "bold":    { "$value": "700", "$type": "fontWeight", "$description": "Display, Title, 버튼, 레이블 강조" }
    },
    "lineHeight": {
      "normal": { "$value": "1.5", "$type": "number", "$description": "전체 공통 행간 150%" }
    },
    "letterSpacing": {
      "normal": { "$value": "0em", "$type": "dimension", "$description": "전체 공통 자간 0" }
    }
  }
}
```

---

### 04. Border — 테두리

```json
{
  "border": {
    "width": {
      "thin":   { "$value": "1px", "$type": "dimension", "$description": "기본 — 인풋, 카드, 구분선" },
      "medium": { "$value": "2px", "$type": "dimension", "$description": "포커스 링, 활성 탭 인디케이터" },
      "thick":  { "$value": "3px", "$type": "dimension", "$description": "활성 사이드바 항목, 진행 강조 선" }
    },
    "color": {
      "default":   { "$value": "#E0E0E0", "$type": "color", "$description": "모든 기본 상태" },
      "primary":   { "$value": "#2D3378", "$type": "color", "$description": "포커스, 선택, 활성 상태" },
      "secondary": { "$value": "#5B63A8", "$type": "color", "$description": "보조 강조, 호버 상태" },
      "error":     { "$value": "#EB5757", "$type": "color", "$description": "에러 상태" },
      "success":   { "$value": "#27AE60", "$type": "color", "$description": "성공 상태" },
      "disabled":  { "$value": "#BDBDBD", "$type": "color", "$description": "비활성 컴포넌트" }
    },
    "radius": {
      "none": { "$value": "0px",    "$type": "dimension", "$description": "테이블 셀, 직각 레이아웃" },
      "xs":   { "$value": "2px",    "$type": "dimension", "$description": "뱃지, 태그, 코드 블록" },
      "sm":   { "$value": "4px",    "$type": "dimension", "$description": "Input 필드, 텍스트에리어" },
      "md":   { "$value": "8px",    "$type": "dimension", "$description": "카드, 드롭다운, 툴팁" },
      "lg":   { "$value": "12px",   "$type": "dimension", "$description": "모달, 큰 카드, 사이드 패널" },
      "xl":   { "$value": "16px",   "$type": "dimension", "$description": "바텀시트, 대형 팝업" },
      "full": { "$value": "9999px", "$type": "dimension", "$description": "알약형 버튼, 아바타, 토글" }
    }
  }
}
```

---

### 05. Elevation — 그림자

```json
{
  "elevation": {
    "0": { "$value": "none",                               "$type": "shadow", "$description": "평면 기본 요소" },
    "1": { "$value": "0px 1px 3px rgba(45,51,120,0.08)",  "$type": "shadow", "$description": "카드, 테이블 행, 목록 아이템" },
    "2": { "$value": "0px 2px 8px rgba(45,51,120,0.12)",  "$type": "shadow", "$description": "드롭다운, 툴팁, 플로팅 버튼" },
    "3": { "$value": "0px 4px 16px rgba(45,51,120,0.16)", "$type": "shadow", "$description": "모달, 다이얼로그, 사이드 패널" },
    "4": { "$value": "0px 8px 32px rgba(45,51,120,0.20)", "$type": "shadow", "$description": "전체화면 오버레이, 최상위 팝업" }
  }
}
```

---

### 06. Motion — 모션

```json
{
  "motion": {
    "duration": {
      "instant": { "$value": "0ms",   "$type": "duration", "$description": "즉각 반응 — 애니메이션 없음" },
      "fast":    { "$value": "100ms", "$type": "duration", "$description": "호버·포커스, 색상 전환, 토글" },
      "normal":  { "$value": "200ms", "$type": "duration", "$description": "⭐ 기본값 — 드롭다운, 탭, 아코디언" },
      "slow":    { "$value": "300ms", "$type": "duration", "$description": "모달 open/close, 사이드패널 슬라이드" },
      "slower":  { "$value": "500ms", "$type": "duration", "$description": "페이지 전환, 복잡한 레이아웃 변화" }
    },
    "easing": {
      "linear": { "$value": "cubic-bezier(0, 0, 1, 1)",          "$type": "cubicBezier", "$description": "프로그레스 바, 등속 로딩" },
      "in":     { "$value": "cubic-bezier(0.4, 0, 1, 1)",        "$type": "cubicBezier", "$description": "요소 퇴장(exit) — 가속" },
      "out":    { "$value": "cubic-bezier(0, 0, 0.2, 1)",        "$type": "cubicBezier", "$description": "⭐ 가장 자주 사용 — 요소 등장, 감속" },
      "in-out": { "$value": "cubic-bezier(0.4, 0, 0.2, 1)",      "$type": "cubicBezier", "$description": "상태 전환, 위치 이동 — 가감속" },
      "spring": { "$value": "cubic-bezier(0.34, 1.56, 0.64, 1)", "$type": "cubicBezier", "$description": "뱃지 팝업, 알림 등장 — 스프링" }
    }
  }
}
```

---

### 07. Grid — 그리드 시스템

```json
{
  "grid": {
    "breakpoint": {
      "mobile":     { "$value": "320px",  "$type": "dimension" },
      "tablet":     { "$value": "768px",  "$type": "dimension" },
      "desktop":    { "$value": "1024px", "$type": "dimension" },
      "desktop-hd": { "$value": "1440px", "$type": "dimension" }
    },
    "columns": {
      "mobile":     { "$value": 2,  "$type": "number" },
      "tablet":     { "$value": 6,  "$type": "number" },
      "desktop":    { "$value": 12, "$type": "number" },
      "desktop-hd": { "$value": 12, "$type": "number" }
    },
    "gutter": {
      "mobile":     { "$value": "30px", "$type": "dimension", "$description": "전 브레이크포인트 고정값" },
      "tablet":     { "$value": "30px", "$type": "dimension" },
      "desktop":    { "$value": "30px", "$type": "dimension" },
      "desktop-hd": { "$value": "30px", "$type": "dimension" }
    },
    "margin": {
      "mobile":     { "$value": "16px", "$type": "dimension" },
      "tablet":     { "$value": "24px", "$type": "dimension" },
      "desktop":    { "$value": "32px", "$type": "dimension" },
      "desktop-hd": { "$value": "auto", "$type": "dimension", "$description": "≥1440px 좌우 auto 중앙 정렬" }
    }
  }
}
```

---

### 08. zIndex — 레이어 순서

```json
{
  "zIndex": {
    "base":     { "$value": "0",   "$type": "number", "$description": "기본 페이지 요소" },
    "raised":   { "$value": "10",  "$type": "number", "$description": "카드, 강조 요소" },
    "dropdown": { "$value": "100", "$type": "number", "$description": "드롭다운, 팝오버" },
    "sticky":   { "$value": "200", "$type": "number", "$description": "sticky 헤더, 사이드바" },
    "overlay":  { "$value": "300", "$type": "number", "$description": "딤 레이어" },
    "modal":    { "$value": "400", "$type": "number", "$description": "모달 창" },
    "toast":    { "$value": "500", "$type": "number", "$description": "토스트 알림" },
    "tooltip":  { "$value": "600", "$type": "number", "$description": "툴팁 — 최상위" }
  }
}
```

---

### 09. Transition — 전환 프리셋

```json
{
  "transition": {
    "fade":   { "$value": "opacity 200ms cubic-bezier(0,0,0.2,1)",                                                              "$type": "transition", "$description": "요소 나타남·사라짐" },
    "slide":  { "$value": "transform 300ms cubic-bezier(0,0,0.2,1)",                                                            "$type": "transition", "$description": "드로어·패널 슬라이드" },
    "expand": { "$value": "height 300ms cubic-bezier(0.4,0,0.2,1)",                                                             "$type": "transition", "$description": "아코디언·확장 패널" },
    "scale":  { "$value": "transform 100ms cubic-bezier(0.34,1.56,0.64,1)",                                                     "$type": "transition", "$description": "팝오버·메뉴 등장" },
    "color":  { "$value": "color 100ms cubic-bezier(0,0,0.2,1), background-color 100ms cubic-bezier(0,0,0.2,1)",                "$type": "transition", "$description": "hover 색상 전환" },
    "shadow": { "$value": "box-shadow 200ms cubic-bezier(0,0,0.2,1)",                                                           "$type": "transition", "$description": "카드 hover elevation" },
    "all":    { "$value": "all 200ms cubic-bezier(0,0,0.2,1)",                                                                  "$type": "transition", "$description": "범용 전환" }
  }
}
```

---

### 10. Semantic — 시맨틱 색상

```json
{
  "semantic": {
    "color": {
      "text": {
        "primary":     { "$value": "#000000", "$type": "color", "$description": "본문 핵심 텍스트 ← black-1" },
        "secondary":   { "$value": "#333333", "$type": "color", "$description": "보조 설명 텍스트 ← gray-1" },
        "tertiary":    { "$value": "#4F4F4F", "$type": "color", "$description": "메타·캡션 ← gray-2" },
        "disabled":    { "$value": "#828282", "$type": "color", "$description": "비활성 텍스트 ← gray-3" },
        "placeholder": { "$value": "#828282", "$type": "color", "$description": "입력 필드 플레이스홀더 ← gray-3" },
        "inverse":     { "$value": "#FFFFFF", "$type": "color", "$description": "다크 배경 위 텍스트 ← white" },
        "link":        { "$value": "#5B63A8", "$type": "color", "$description": "링크 색상 ← brand-secondary" },
        "link-hover":  { "$value": "#2D3378", "$type": "color", "$description": "링크 hover ← brand-primary" },
        "brand":       { "$value": "#2D3378", "$type": "color", "$description": "강조·브랜드 ← brand-primary" },
        "error":       { "$value": "#EB5757", "$type": "color", "$description": "에러 메시지 ← state-error" },
        "success":     { "$value": "#27AE60", "$type": "color", "$description": "성공 메시지 ← state-success" },
        "warning":     { "$value": "#E2B93B", "$type": "color", "$description": "경고 메시지 ← state-warning" },
        "info":        { "$value": "#2F80ED", "$type": "color", "$description": "안내 메시지 ← state-info" }
      },
      "bg": {
        "page":         { "$value": "#FFFFFF", "$type": "color", "$description": "페이지 배경 ← white" },
        "surface":      { "$value": "#F8F8FB", "$type": "color", "$description": "카드·패널 배경" },
        "elevated":     { "$value": "#FFFFFF", "$type": "color", "$description": "elevation 위 컴포넌트 배경" },
        "muted":        { "$value": "#E0E0E0", "$type": "color", "$description": "비활성·구분 배경 ← gray-5" },
        "overlay":      { "$value": "rgba(0,0,0,0.5)", "$type": "color", "$description": "모달 딤 레이어" },
        "brand":        { "$value": "#2D3378", "$type": "color", "$description": "브랜드 강조 배경 ← brand-primary" },
        "brand-subtle": { "$value": "#E8EAF6", "$type": "color", "$description": "연한 브랜드 배경 ← brand-quaternary" },
        "error":        { "$value": "#FDEEEE", "$type": "color", "$description": "에러 배경" },
        "success":      { "$value": "#EDFAF4", "$type": "color", "$description": "성공 배경" },
        "warning":      { "$value": "#FDF8E6", "$type": "color", "$description": "경고 배경" },
        "info":         { "$value": "#EEF2FD", "$type": "color", "$description": "안내 배경" }
      },
      "border": {
        "default":  { "$value": "#E0E0E0", "$type": "color", "$description": "일반 경계선 ← gray-5" },
        "focus":    { "$value": "#2F80ED", "$type": "color", "$description": "포커스 인디케이터 ← state-info" },
        "error":    { "$value": "#EB5757", "$type": "color", "$description": "에러 상태 경계 ← state-error" },
        "success":  { "$value": "#27AE60", "$type": "color", "$description": "성공 상태 경계 ← state-success" },
        "disabled": { "$value": "#BDBDBD", "$type": "color", "$description": "비활성 경계 ← gray-4" }
      },
      "interactive": {
        "primary":          { "$value": "#2D3378", "$type": "color", "$description": "기본 액션 ← brand-primary" },
        "primary-hover":    { "$value": "#232968", "$type": "color", "$description": "primary 10% 어둡게" },
        "primary-active":   { "$value": "#1A1F52", "$type": "color", "$description": "primary 20% 어둡게" },
        "primary-disabled": { "$value": "#BDBDBD", "$type": "color", "$description": "비활성 ← gray-4" },
        "secondary":        { "$value": "#5B63A8", "$type": "color", "$description": "보조 액션 ← brand-secondary" },
        "danger":           { "$value": "#EB5757", "$type": "color", "$description": "파괴적 액션 ← state-error" },
        "danger-hover":     { "$value": "#C94040", "$type": "color", "$description": "danger 10% 어둡게" }
      }
    }
  }
}
```

---

### 11. Theme Dark — 다크모드 오버라이드

```json
{
  "theme": {
    "dark": {
      "$description": "[data-theme='dark'] 셀렉터에 적용되는 semantic 토큰 오버라이드",
      "color": {
        "text": {
          "primary":     { "$value": "#F0F0F0", "$type": "color" },
          "secondary":   { "$value": "#C5C5C5", "$type": "color" },
          "tertiary":    { "$value": "#9B9B9B", "$type": "color" },
          "disabled":    { "$value": "#4F4F4F", "$type": "color" },
          "placeholder": { "$value": "#6B6B6B", "$type": "color" },
          "inverse":     { "$value": "#000000", "$type": "color" },
          "link":        { "$value": "#6BA8E8", "$type": "color" },
          "link-hover":  { "$value": "#A9A5E8", "$type": "color" },
          "brand":       { "$value": "#A9A5E8", "$type": "color" },
          "error":       { "$value": "#F07878", "$type": "color" },
          "success":     { "$value": "#4FD48A", "$type": "color" },
          "warning":     { "$value": "#F5D040", "$type": "color" },
          "info":        { "$value": "#6BA8E8", "$type": "color" }
        },
        "bg": {
          "page":         { "$value": "#0F0F12", "$type": "color" },
          "surface":      { "$value": "#1A1A1F", "$type": "color" },
          "elevated":     { "$value": "#252529", "$type": "color" },
          "muted":        { "$value": "#333338", "$type": "color" },
          "overlay":      { "$value": "rgba(0,0,0,0.72)", "$type": "color" },
          "brand":        { "$value": "#1E1A5E", "$type": "color" },
          "brand-subtle": { "$value": "rgba(45,51,120,0.25)", "$type": "color" },
          "error":        { "$value": "rgba(235,87,87,0.15)", "$type": "color" },
          "success":      { "$value": "rgba(39,174,96,0.15)", "$type": "color" },
          "warning":      { "$value": "rgba(226,185,59,0.15)", "$type": "color" },
          "info":         { "$value": "rgba(47,128,237,0.15)", "$type": "color" }
        },
        "border": {
          "default":  { "$value": "#2E2E34", "$type": "color" },
          "focus":    { "$value": "#6BA8E8", "$type": "color" },
          "error":    { "$value": "#F07878", "$type": "color" },
          "success":  { "$value": "#4FD48A", "$type": "color" },
          "disabled": { "$value": "#2E2E34", "$type": "color" }
        },
        "interactive": {
          "primary":          { "$value": "#A9A5E8", "$type": "color" },
          "primary-hover":    { "$value": "#C5C2F0", "$type": "color" },
          "primary-active":   { "$value": "#8B86C8", "$type": "color" },
          "primary-disabled": { "$value": "#333338", "$type": "color" },
          "secondary":        { "$value": "#6BA8E8", "$type": "color" },
          "danger":           { "$value": "#F07878", "$type": "color" },
          "danger-hover":     { "$value": "#F59090", "$type": "color" }
        }
      },
      "elevation": {
        "0": { "$value": "none",                             "$type": "shadow" },
        "1": { "$value": "0px 1px 3px rgba(0,0,0,0.40)",    "$type": "shadow" },
        "2": { "$value": "0px 4px 8px rgba(0,0,0,0.50)",    "$type": "shadow" },
        "3": { "$value": "0px 8px 16px rgba(0,0,0,0.60)",   "$type": "shadow" },
        "4": { "$value": "0px 16px 32px rgba(0,0,0,0.72)",  "$type": "shadow" }
      }
    }
  }
}
```

---

### 12. Component — 컴포넌트 토큰

#### 12-1. Textfield

```json
{
  "component": {
    "textfield": {
      "height": {
        "sm": { "$value": "32px", "$type": "dimension" },
        "md": { "$value": "48px", "$type": "dimension", "$description": "⭐ 기본 크기" },
        "lg": { "$value": "56px", "$type": "dimension" }
      },
      "padding": {
        "x-sm": { "$value": "10px", "$type": "dimension" },
        "x-md": { "$value": "14px", "$type": "dimension", "$description": "⭐ 기본 좌우 패딩" },
        "x-lg": { "$value": "16px", "$type": "dimension" },
        "y-sm": { "$value": "6px",  "$type": "dimension" },
        "y-md": { "$value": "8px",  "$type": "dimension" },
        "y-lg": { "$value": "10px", "$type": "dimension" }
      },
      "font": {
        "label":         { "$value": "13px", "$type": "dimension" },
        "label-weight":  { "$value": "700",  "$type": "fontWeight" },
        "value":         { "$value": "14px", "$type": "dimension" },
        "placeholder":   { "$value": "14px", "$type": "dimension" },
        "helper":        { "$value": "12px", "$type": "dimension" },
        "helper-weight": { "$value": "400",  "$type": "fontWeight" }
      },
      "border-radius":       { "$value": "8px",   "$type": "dimension",  "$description": "radius-md" },
      "border-width":        { "$value": "1.5px", "$type": "dimension" },
      "focus-shadow":        { "$value": "0 0 0 3px rgba(45,51,120,0.12)", "$type": "shadow" },
      "icon-padding-left":   { "$value": "38px",  "$type": "dimension" },
      "textarea-min-height": { "$value": "88px",  "$type": "dimension" },
      "color": {
        "bg-default":     { "$value": "#FFFFFF", "$type": "color" },
        "bg-disabled":    { "$value": "#E0E0E0", "$type": "color" },
        "bg-filled":      { "$value": "#F5F5F8", "$type": "color" },
        "border-default": { "$value": "#E0E0E0", "$type": "color" },
        "text-value":     { "$value": "#1D1D1D", "$type": "color" },
        "text-label":     { "$value": "#333333", "$type": "color" },
        "text-helper":    { "$value": "#4F4F4F", "$type": "color" },
        "text-error":     { "$value": "#EB5757", "$type": "color" },
        "text-success":   { "$value": "#27AE60", "$type": "color" }
      }
    }
  }
}
```

#### 12-2. Button

```json
{
  "component": {
    "button": {
      "height": {
        "sm": { "$value": "45px", "$type": "dimension" },
        "md": { "$value": "56px", "$type": "dimension", "$description": "⭐ 기본 크기" },
        "lg": { "$value": "63px", "$type": "dimension" },
        "xl": { "$value": "70px", "$type": "dimension" }
      },
      "min-width": {
        "sm": { "$value": "70px",  "$type": "dimension", "$description": "font-size 14px × 5" },
        "md": { "$value": "80px",  "$type": "dimension", "$description": "font-size 16px × 5" },
        "lg": { "$value": "90px",  "$type": "dimension", "$description": "font-size 18px × 5" },
        "xl": { "$value": "100px", "$type": "dimension", "$description": "font-size 20px × 5" }
      },
      "font-size": {
        "sm": { "$value": "14px", "$type": "dimension" },
        "md": { "$value": "16px", "$type": "dimension", "$description": "⭐ 기본" },
        "lg": { "$value": "18px", "$type": "dimension" },
        "xl": { "$value": "20px", "$type": "dimension" }
      },
      "icon-gap": { "$value": "8px", "$type": "dimension" },
      "border-radius": {
        "square": { "$value": "8px",  "$type": "dimension", "$description": "기본 사각형 버튼" },
        "round":  { "$value": "99px", "$type": "dimension", "$description": "알약형 버튼" }
      },
      "transition": { "$value": "all 100ms cubic-bezier(0,0,0.2,1)", "$type": "transition" },
      "color": {
        "primary-bg":          { "$value": "#2D3378", "$type": "color" },
        "primary-bg-hover":    { "$value": "#232860", "$type": "color" },
        "primary-bg-active":   { "$value": "#1A1F4D", "$type": "color" },
        "primary-bg-disabled": { "$value": "#BDBDBD", "$type": "color" },
        "primary-text":        { "$value": "#FFFFFF", "$type": "color" },
        "secondary-bg":        { "$value": "#FFFFFF", "$type": "color" },
        "secondary-bg-hover":  { "$value": "#E8EAF6", "$type": "color" },
        "secondary-bg-active": { "$value": "#D0D5EA", "$type": "color" },
        "secondary-border":    { "$value": "#2D3378", "$type": "color" },
        "secondary-text":      { "$value": "#2D3378", "$type": "color" },
        "tertiary-bg":         { "$value": "transparent", "$type": "color" },
        "tertiary-bg-hover":   { "$value": "#E8EAF6", "$type": "color" },
        "tertiary-bg-active":  { "$value": "#D0D5EA", "$type": "color" },
        "tertiary-text":       { "$value": "#2D3378", "$type": "color" }
      }
    }
  }
}
```

#### 12-3. Badge

```json
{
  "component": {
    "badge": {
      "padding-x":     { "$value": "12px", "$type": "dimension" },
      "padding-y":     { "$value": "4px",  "$type": "dimension" },
      "font-size":     { "$value": "12px", "$type": "dimension" },
      "font-weight":   { "$value": "700",  "$type": "fontWeight" },
      "border-radius": { "$value": "99px", "$type": "dimension" },
      "color": {
        "brand-bg":     { "$value": "#2D3378", "$type": "color" },
        "brand-text":   { "$value": "#FFFFFF", "$type": "color" },
        "info-bg":      { "$value": "#2F80ED", "$type": "color" },
        "info-text":    { "$value": "#FFFFFF", "$type": "color" },
        "success-bg":   { "$value": "#27AE60", "$type": "color" },
        "success-text": { "$value": "#FFFFFF", "$type": "color" },
        "warning-bg":   { "$value": "#E2B93B", "$type": "color" },
        "warning-text": { "$value": "#000000", "$type": "color" },
        "error-bg":     { "$value": "#EB5757", "$type": "color" },
        "error-text":   { "$value": "#FFFFFF", "$type": "color" },
        "neutral-bg":   { "$value": "#E0E0E0", "$type": "color" },
        "neutral-text": { "$value": "#333333", "$type": "color" }
      }
    }
  }
}
```

#### 12-4. Tooltip

```json
{
  "component": {
    "tooltip": {
      "sm": {
        "padding-x":  { "$value": "8px", "$type": "dimension" },
        "padding-y":  { "$value": "5px", "$type": "dimension" },
        "arrow-size": { "$value": "6px", "$type": "dimension" }
      },
      "lg": {
        "padding-x": { "$value": "14px",  "$type": "dimension" },
        "padding-y": { "$value": "10px",  "$type": "dimension" },
        "min-width": { "$value": "160px", "$type": "dimension" }
      },
      "font-size":     { "$value": "12px",    "$type": "dimension" },
      "border-radius": { "$value": "4px",     "$type": "dimension" },
      "bg":            { "$value": "#1D1D1D", "$type": "color" },
      "text":          { "$value": "#FFFFFF", "$type": "color" },
      "elevation":     { "$value": "0px 2px 8px rgba(45,51,120,0.12)", "$type": "shadow" }
    }
  }
}
```

#### 12-5. Avatar

```json
{
  "component": {
    "avatar": {
      "size": {
        "sm": { "$value": "40px", "$type": "dimension" },
        "md": { "$value": "64px", "$type": "dimension", "$description": "⭐ 기본 크기" },
        "lg": { "$value": "80px", "$type": "dimension" }
      },
      "border-radius": { "$value": "50%",    "$type": "dimension" },
      "border-width":  { "$value": "2px",    "$type": "dimension" },
      "border-color":  { "$value": "#FFFFFF", "$type": "color", "$description": "겹침 표시 시 흰 테두리" }
    }
  }
}
```

#### 12-6. Card

```json
{
  "component": {
    "card": {
      "padding": {
        "md": { "$value": "20px", "$type": "dimension" },
        "lg": { "$value": "24px", "$type": "dimension" }
      },
      "border-radius":    { "$value": "8px",    "$type": "dimension" },
      "border-width":     { "$value": "1px",    "$type": "dimension" },
      "bg":               { "$value": "#FFFFFF", "$type": "color" },
      "border-color":     { "$value": "#E0E0E0", "$type": "color" },
      "elevation":        { "$value": "0px 1px 3px rgba(45,51,120,0.08)", "$type": "shadow" },
      "elevation-hover":  { "$value": "0px 2px 8px rgba(45,51,120,0.12)", "$type": "shadow" }
    }
  }
}
```

#### 12-7. Modal

```json
{
  "component": {
    "modal": {
      "max-width": {
        "sm": { "$value": "480px", "$type": "dimension" },
        "md": { "$value": "720px", "$type": "dimension", "$description": "⭐ 기본" },
        "lg": { "$value": "960px", "$type": "dimension" }
      },
      "border-radius": { "$value": "12px",   "$type": "dimension" },
      "padding-x":     { "$value": "24px",   "$type": "dimension" },
      "padding-y":     { "$value": "24px",   "$type": "dimension" },
      "header-height": { "$value": "64px",   "$type": "dimension" },
      "footer-height": { "$value": "72px",   "$type": "dimension" },
      "bg":            { "$value": "#FFFFFF", "$type": "color" },
      "elevation":     { "$value": "0px 4px 16px rgba(45,51,120,0.16)", "$type": "shadow" }
    }
  }
}
```

#### 12-8. Checkbox

```json
{
  "component": {
    "checkbox": {
      "size":            { "$value": "18px",   "$type": "dimension" },
      "border-radius":   { "$value": "4px",    "$type": "dimension" },
      "border-width":    { "$value": "1.5px",  "$type": "dimension" },
      "check-icon-size": { "$value": "12px",   "$type": "dimension" },
      "label-gap":       { "$value": "8px",    "$type": "dimension" },
      "color": {
        "border-default":  { "$value": "#BDBDBD", "$type": "color" },
        "border-hover":    { "$value": "#5B63A8", "$type": "color" },
        "checked-bg":      { "$value": "#2D3378", "$type": "color" },
        "checked-border":  { "$value": "#2D3378", "$type": "color" },
        "checked-icon":    { "$value": "#FFFFFF", "$type": "color" },
        "disabled-bg":     { "$value": "#E0E0E0", "$type": "color" },
        "disabled-border": { "$value": "#BDBDBD", "$type": "color" },
        "error-border":    { "$value": "#EB5757", "$type": "color" }
      }
    }
  }
}
```

#### 12-9. Radio

```json
{
  "component": {
    "radio": {
      "size":         { "$value": "18px",  "$type": "dimension" },
      "dot-size":     { "$value": "8px",   "$type": "dimension" },
      "border-width": { "$value": "1.5px", "$type": "dimension" },
      "label-gap":    { "$value": "8px",   "$type": "dimension" },
      "color": {
        "border-default":  { "$value": "#BDBDBD", "$type": "color" },
        "border-hover":    { "$value": "#5B63A8", "$type": "color" },
        "checked-border":  { "$value": "#2D3378", "$type": "color" },
        "checked-dot":     { "$value": "#2D3378", "$type": "color" },
        "disabled-bg":     { "$value": "#E0E0E0", "$type": "color" },
        "disabled-border": { "$value": "#BDBDBD", "$type": "color" },
        "error-border":    { "$value": "#EB5757", "$type": "color" }
      }
    }
  }
}
```

#### 12-10. Toggle

```json
{
  "component": {
    "toggle": {
      "track-width":   { "$value": "44px",    "$type": "dimension" },
      "track-height":  { "$value": "24px",    "$type": "dimension" },
      "thumb-size":    { "$value": "20px",    "$type": "dimension" },
      "thumb-offset":  { "$value": "2px",     "$type": "dimension" },
      "border-radius": { "$value": "9999px",  "$type": "dimension" },
      "transition":    { "$value": "background-color 100ms cubic-bezier(0,0,0.2,1), transform 100ms cubic-bezier(0,0,0.2,1)", "$type": "transition" },
      "color": {
        "off-track": { "$value": "#BDBDBD", "$type": "color" },
        "on-track":  { "$value": "#2D3378", "$type": "color" },
        "thumb":     { "$value": "#FFFFFF", "$type": "color" },
        "disabled":  { "$value": "#E0E0E0", "$type": "color" }
      }
    }
  }
}
```

#### 12-11. Tabs

```json
{
  "component": {
    "tabs": {
      "height":             { "$value": "44px",  "$type": "dimension" },
      "padding-x":          { "$value": "16px",  "$type": "dimension" },
      "gap":                { "$value": "8px",   "$type": "dimension" },
      "font-size":          { "$value": "16px",  "$type": "dimension" },
      "font-weight-active": { "$value": "700",   "$type": "fontWeight" },
      "indicator-height":   { "$value": "2px",   "$type": "dimension" },
      "color": {
        "text-default":  { "$value": "#828282", "$type": "color" },
        "text-hover":    { "$value": "#4F4F4F", "$type": "color" },
        "text-active":   { "$value": "#2D3378", "$type": "color" },
        "indicator":     { "$value": "#2D3378", "$type": "color" },
        "bg-hover":      { "$value": "#E8EAF6", "$type": "color" }
      }
    }
  }
}
```

#### 12-12. Dropdown

```json
{
  "component": {
    "dropdown": {
      "item-height":   { "$value": "40px",  "$type": "dimension" },
      "padding-x":     { "$value": "14px",  "$type": "dimension" },
      "padding-y":     { "$value": "10px",  "$type": "dimension" },
      "border-radius": { "$value": "8px",   "$type": "dimension" },
      "max-height":    { "$value": "280px", "$type": "dimension" },
      "font-size":     { "$value": "14px",  "$type": "dimension" },
      "elevation":     { "$value": "0px 2px 8px rgba(45,51,120,0.12)", "$type": "shadow" },
      "color": {
        "bg":                 { "$value": "#FFFFFF", "$type": "color" },
        "border":             { "$value": "#E0E0E0", "$type": "color" },
        "item-hover-bg":      { "$value": "#E8EAF6", "$type": "color" },
        "item-active-bg":     { "$value": "#D0D5EA", "$type": "color" },
        "item-selected-bg":   { "$value": "#E8EAF6", "$type": "color" },
        "item-selected-text": { "$value": "#2D3378", "$type": "color" }
      }
    }
  }
}
```

#### 12-13. Pagination

```json
{
  "component": {
    "pagination": {
      "item-size":     { "$value": "32px", "$type": "dimension" },
      "border-radius": { "$value": "4px",  "$type": "dimension" },
      "font-size":     { "$value": "14px", "$type": "dimension" },
      "gap":           { "$value": "4px",  "$type": "dimension" },
      "color": {
        "text-default":  { "$value": "#4F4F4F", "$type": "color" },
        "text-hover":    { "$value": "#2D3378", "$type": "color" },
        "active-bg":     { "$value": "#2D3378", "$type": "color" },
        "active-text":   { "$value": "#FFFFFF", "$type": "color" },
        "hover-bg":      { "$value": "#E8EAF6", "$type": "color" },
        "disabled-text": { "$value": "#BDBDBD", "$type": "color" }
      }
    }
  }
}
```

#### 12-14. Table

```json
{
  "component": {
    "table": {
      "header-height":      { "$value": "40px", "$type": "dimension" },
      "row-height":         { "$value": "48px", "$type": "dimension" },
      "cell-padding-x":     { "$value": "16px", "$type": "dimension" },
      "cell-padding-y":     { "$value": "12px", "$type": "dimension" },
      "header-font-size":   { "$value": "13px", "$type": "dimension" },
      "header-font-weight": { "$value": "700",  "$type": "fontWeight" },
      "body-font-size":     { "$value": "14px", "$type": "dimension" },
      "border-width":       { "$value": "1px",  "$type": "dimension" },
      "color": {
        "border":          { "$value": "#E0E0E0", "$type": "color" },
        "header-bg":       { "$value": "#F8F8FB", "$type": "color" },
        "header-text":     { "$value": "#333333", "$type": "color" },
        "row-bg":          { "$value": "#FFFFFF", "$type": "color" },
        "row-hover-bg":    { "$value": "#F0F0F5", "$type": "color" },
        "row-selected-bg": { "$value": "#E8EAF6", "$type": "color" },
        "row-striped-bg":  { "$value": "#F8F8FB", "$type": "color" }
      }
    }
  }
}
```

---

### 13. Utility Tokens

#### Layout

```json
{
  "layout": {
    "container": {
      "max-sm": { "$value": "640px",  "$type": "dimension" },
      "max-md": { "$value": "960px",  "$type": "dimension" },
      "max-lg": { "$value": "1280px", "$type": "dimension" },
      "max-xl": { "$value": "1440px", "$type": "dimension" }
    }
  }
}
```

#### Skeleton

```json
{
  "skeleton": {
    "bg":        { "$value": "#E0E0E0",               "$type": "color",       "$description": "gray-5" },
    "shimmer":   { "$value": "rgba(255,255,255,0.6)", "$type": "color",       "$description": "shimmer 하이라이트" },
    "radius":    { "$value": "4px",                   "$type": "dimension",   "$description": "radius-sm" },
    "radius-lg": { "$value": "8px",                   "$type": "dimension",   "$description": "radius-md" },
    "duration":  { "$value": "1.5s",                  "$type": "duration",    "$description": "shimmer 주기" },
    "timing":    { "$value": "cubic-bezier(0.4,0,0.6,1)", "$type": "cubicBezier" }
  }
}
```

#### Opacity

```json
{
  "opacity": {
    "0":        { "$value": "0",    "$type": "number" },
    "10":       { "$value": "0.1",  "$type": "number" },
    "20":       { "$value": "0.2",  "$type": "number" },
    "30":       { "$value": "0.3",  "$type": "number" },
    "40":       { "$value": "0.4",  "$type": "number" },
    "50":       { "$value": "0.5",  "$type": "number" },
    "60":       { "$value": "0.6",  "$type": "number" },
    "70":       { "$value": "0.7",  "$type": "number" },
    "80":       { "$value": "0.8",  "$type": "number" },
    "90":       { "$value": "0.9",  "$type": "number" },
    "100":      { "$value": "1",    "$type": "number" },
    "disabled": { "$value": "0.38", "$type": "number", "$description": "비활성 컴포넌트" },
    "overlay":  { "$value": "0.5",  "$type": "number", "$description": "모달 딤 배경" }
  }
}
```

#### Icon / Focus / Overlay

```json
{
  "icon": {
    "size": {
      "xs": { "$value": "16px", "$type": "dimension", "$description": "Badge 내부, Caption 인디케이터" },
      "sm": { "$value": "20px", "$type": "dimension", "$description": "⭐ 기본값 — 버튼, 입력, 탭" },
      "md": { "$value": "24px", "$type": "dimension", "$description": "GNB, Sidebar, 독립 액션" },
      "lg": { "$value": "32px", "$type": "dimension", "$description": "Empty State, 카드 상단 강조" },
      "xl": { "$value": "40px", "$type": "dimension", "$description": "온보딩, 일러스트형 강조" }
    }
  },
  "focus": {
    "ring-width":  { "$value": "2px",     "$type": "dimension" },
    "ring-offset": { "$value": "2px",     "$type": "dimension" },
    "ring-color":  { "$value": "#2F80ED", "$type": "color", "$description": "접근성 포커스 인디케이터 ← state-info" }
  },
  "overlay": {
    "bg": { "$value": "rgba(0,0,0,0.5)", "$type": "color", "$description": "모달·드로어 딤 배경" }
  }
}
```
