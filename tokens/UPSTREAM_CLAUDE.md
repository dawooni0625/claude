# KIRBS 디자인 시스템 가이드

## 토큰 파일

| 파일 | 용도 |
|---|---|
| `tokens.json` | W3C DTCG 포맷 전체 원본 (18개 카테고리 병합) |
| `tokens.css`  | CSS Custom Properties — UI 작업 시 직접 참조 |
| `tokens.scss` | SCSS 변수·믹스인 (반응형·다크모드·포커스 링 포함) |
| `tokens/`     | 카테고리별 분리 파일 (Style Dictionary 연동용) |

## CSS 변수명 네이밍 규칙

```
color.brand.primary          → --color-brand-primary
semantic.color.text.primary  → --color-text-primary      ← "semantic." 제거
spacing.8                    → --space-8                  ← "spacing" → "space"
zIndex.modal                 → --z-modal                  ← "zIndex" → "z"
border.radius.md             → --border-radius-md
elevation.2                  → --elevation-2
transition.fade              → --transition-fade
motion.duration.normal       → --motion-duration-normal
typography.fontSize.body-md  → --font-size-body-md
```

## 시맨틱 토큰 우선 사용 (다크모드 자동 대응)

```css
/* ❌ 금지: 원시 토큰 직접 사용 */
color: var(--color-gray-1);

/* ✅ 권장: 시맨틱 토큰 사용 */
color: var(--color-text-secondary);
```

**텍스트:** `--color-text-primary` / `secondary` / `tertiary` / `disabled` / `placeholder` / `inverse` / `brand` / `link` / `link-hover` / `error` / `success` / `warning` / `info`

**배경:** `--color-bg-page` / `surface` / `elevated` / `muted` / `overlay` / `brand` / `brand-subtle` / `error` / `success` / `warning` / `info`

**경계:** `--color-border-default` / `focus` / `error` / `success` / `disabled`

**인터랙션:** `--color-interactive-primary` / `primary-hover` / `primary-active` / `primary-disabled` / `secondary` / `danger` / `danger-hover`

## 자주 쓰는 토큰 참조표

### Spacing (`--space-{n}` = n × 2px)

| CSS 변수 | 값 | 용도 |
|---|---|---|
| `--space-1` | 2px | 아이콘-텍스트 간격 |
| `--space-2` | 4px | 뱃지 패딩 |
| `--space-4` | 8px | 버튼 그룹, 아이템 간격 |
| `--space-6` | 12px | 버튼·인풋 좌우 패딩 |
| `--space-8` | 16px | 카드 패딩, 그룹 간격 |
| `--space-12` | 24px | 섹션 구분 |
| `--space-16` | 32px | 페이지 블록 구분 |

### Border Radius

| CSS 변수 | 값 | 용도 |
|---|---|---|
| `--border-radius-sm` | 4px | Input, 작은 버튼 |
| `--border-radius-md` | 8px | 카드, 드롭다운 |
| `--border-radius-lg` | 12px | 모달, 사이드 패널 |
| `--border-radius-full` | 9999px | 알약형 버튼, 아바타 |

### Elevation (box-shadow)

| CSS 변수 | 용도 |
|---|---|
| `--elevation-1` | 카드, 테이블 행 |
| `--elevation-2` | 드롭다운, 툴팁 |
| `--elevation-3` | 모달, 다이얼로그 |
| `--elevation-4` | 전체화면 팝업 |

### zIndex

| CSS 변수 | 값 |
|---|---|
| `--z-dropdown` | 100 |
| `--z-sticky` | 200 |
| `--z-modal` | 400 |
| `--z-toast` | 500 |
| `--z-tooltip` | 600 |

## SCSS 사용법

```scss
@import 'tokens';   // tokens.css 로드
@import 'tokens';   // tokens.scss 로드

// 반응형
.container {
  padding: $space-8;
  @include respond-to(tablet)     { padding: $space-12; }
  @include respond-to(desktop)    { padding: $space-16; }
}

// 다크모드
.card {
  background: $color-bg-surface;
  @include dark-theme {
    border-color: var(--color-border-default);
  }
}

// 포커스 링
button:focus-visible { @include focus-ring; }

// 텍스트 스타일
h1 { @include text-style(heading-1, bold); }

// 스켈레톤
.skeleton-line { @include skeleton-shimmer; }
```

## 컴포넌트 토큰 (`tokens/component.json`)

치수·색상이 정의된 컴포넌트 목록. CSS 작업 시 직접 값을 하드코딩하지 말고 이 파일을 먼저 확인하세요.

| 컴포넌트 | 주요 토큰 키 |
|---|---|
| `textfield` | height(sm/md/lg), padding-x/y, font, border-radius, color |
| `button` | height(sm–xl), font-size, border-radius(square/round), color |
| `badge` | padding-x/y, font-size, border-radius, color |
| `tooltip` | padding-x/y(sm/lg), font-size, bg, elevation |
| `avatar` | size(sm/md/lg), border-radius, border-color |
| `card` | padding, border-radius, bg, elevation, elevation-hover |
| `modal` | max-width(sm/md/lg), padding-x/y, header/footer-height, elevation |
| `checkbox` | size, border-radius, border-width, color |
| `radio` | size, dot-size, border-width, color |
| `toggle` | track-width/height, thumb-size, transition, color |
| `tabs` | height, padding-x, indicator-height, color |
| `dropdown` | item-height, max-height, padding-x/y, elevation, color |
| `pagination` | item-size, border-radius, gap, color |
| `table` | header/row height, cell-padding, border-width, color |
| `progress` | height(sm/md/lg), border-radius, transition, color |
| `spinner` | size(sm/md/lg), stroke-width, duration, color |
| `toast` | min/max-width, padding, border-radius, elevation, color |
| `empty-state` | icon-size, gap, max-width, font, color |
| `nav-header` | height(64px), padding-x, logo-height, color |
| `nav-sidebar` | width(240px), collapsed-width(64px), item-height, color |

## 아이콘 시스템

```html
<span class="icon icon-md icon-search" style="color: var(--color-text-brand)"></span>
```

**크기:** `icon-xs`(16px) · `icon-sm`(20px) · `icon-md`(24px) · `icon-lg`(32px) · `icon-xl`(40px)

**카테고리 (76개):** navigation · action · notification · user · data · content · social

## 작업 규칙

1. 모든 색상·크기·간격은 `tokens.css`의 CSS 변수를 사용합니다.
2. **시맨틱 토큰**(`--color-text-*`, `--color-bg-*`)을 원시 토큰보다 우선 사용합니다.
3. 토큰에 없는 임의 색상·수치는 사용하지 않습니다.
4. 다크모드 필요 시 `[data-theme="dark"]` 오버라이드 또는 `@include dark-theme` 사용합니다.
5. 아이콘은 `icons/` 폴더의 76개 SVG 중에서 선택합니다.

## 디자인 원칙

- **브랜드 Primary:** `#2D3378` (남색 계열)
- **기본 폰트:** Pretendard (단일 서체 · 숫자는 tabular figures)
- **그리드:** mobile 2col / tablet 6col / desktop 12col, gutter 30px 고정
- **spacing 기준:** 키 숫자 × 2px (`--space-8` = 16px)
