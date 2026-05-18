# KIRBS Design Tokens

KIRBS 디자인 시스템의 디자인 토큰 레포지토리입니다.  
W3C DTCG 포맷으로 정의된 토큰을 CSS Custom Properties, SCSS 변수로 제공합니다.

---

## 파일 구조

```
.
├── tokens.json          # 전체 토큰 병합본 (W3C DTCG, 18개 카테고리)
├── tokens.css           # CSS Custom Properties (:root + 다크모드)
├── tokens.scss          # SCSS 변수, 맵, 믹스인
├── tokens/              # 카테고리별 분리 소스 파일
│   ├── color.json
│   ├── spacing.json
│   ├── typography.json
│   ├── border.json
│   ├── elevation.json
│   ├── motion.json
│   ├── grid.json
│   ├── zIndex.json
│   ├── transition.json
│   ├── semantic.json    # Primitive 참조 alias 사용
│   ├── theme.dark.json  # 다크모드 semantic 오버라이드
│   ├── component.json   # 컴포넌트별 치수·색상 (20개)
│   ├── layout.json
│   ├── skeleton.json
│   ├── opacity.json
│   ├── icon.json
│   ├── focus.json
│   └── overlay.json
└── icons/               # SVG 아이콘 76개
```

---

## 빠른 시작

### CSS

```html
<link rel="stylesheet" href="tokens.css">
```

```css
.button {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
  border-radius: var(--border-radius-md);
  padding: var(--space-4) var(--space-8);
  transition: var(--transition-color);
}

.button:hover {
  background-color: var(--color-interactive-primary-hover);
}
```

### SCSS

```scss
@import 'tokens';   // tokens.css 먼저 로드
@import 'tokens';   // tokens.scss 로드

.card {
  background: $color-bg-surface;
  border-radius: $border-radius-md;
  box-shadow: $elevation-1;
  padding: $space-8;

  @include respond-to(tablet) {
    padding: $space-12;
  }

  @include dark-theme {
    border: 1px solid var(--color-border-default);
  }
}

button:focus-visible {
  @include focus-ring;
}
```

---

## CSS 변수명 네이밍 규칙

`tokens.json` 키 경로와 CSS 변수명 매핑표입니다.

| 토큰 경로 | CSS 변수 | 변환 규칙 |
|---|---|---|
| `color.brand.primary` | `--color-brand-primary` | 그대로 |
| `semantic.color.text.primary` | `--color-text-primary` | `semantic.` 접두어 제거 |
| `spacing.8` | `--space-8` | `spacing` → `space` |
| `zIndex.modal` | `--z-modal` | `zIndex` → `z` |
| `border.radius.md` | `--border-radius-md` | 그대로 |
| `elevation.2` | `--elevation-2` | 그대로 |
| `transition.fade` | `--transition-fade` | 그대로 |
| `motion.duration.normal` | `--motion-duration-normal` | 그대로 |
| `typography.fontSize.body-md` | `--font-size-body-md` | `typography.fontSize` → `font-size` |

---

## 시맨틱 토큰

원시 토큰(`--color-gray-*`) 대신 **시맨틱 토큰**을 사용하면 다크모드가 자동 대응됩니다.

```css
/* 나쁨 — 다크모드 미대응 */
color: var(--color-gray-1);

/* 좋음 — 다크모드 자동 전환 */
color: var(--color-text-secondary);
```

### 시맨틱 텍스트 (`--color-text-*`)

| 변수 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| `--color-text-primary` | `#000000` | `#F0F0F0` | 본문 핵심 텍스트 |
| `--color-text-secondary` | `#333333` | `#C5C5C5` | 보조 설명 |
| `--color-text-tertiary` | `#4F4F4F` | `#9B9B9B` | 메타·캡션 |
| `--color-text-disabled` | `#828282` | `#4F4F4F` | 비활성 |
| `--color-text-brand` | `#2D3378` | `#A9A5E8` | 브랜드 강조 |
| `--color-text-link` | `#5B63A8` | `#6BA8E8` | 링크 |
| `--color-text-error` | `#EB5757` | `#F07878` | 에러 |
| `--color-text-success` | `#27AE60` | `#4FD48A` | 성공 |

### 시맨틱 배경 (`--color-bg-*`)

| 변수 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| `--color-bg-page` | `#FFFFFF` | `#0F0F12` | 페이지 배경 |
| `--color-bg-surface` | `#F8F8FB` | `#1A1A1F` | 카드·패널 배경 |
| `--color-bg-elevated` | `#FFFFFF` | `#252529` | 높이 있는 컴포넌트 |
| `--color-bg-muted` | `#E0E0E0` | `#333338` | 비활성·구분 배경 |

---

## 스페이싱 스케일

키 숫자 × 2px 규칙. CSS 변수는 `--space-{n}`.

| 변수 | 값 | 용도 |
|---|---|---|
| `--space-1` | 2px | 아이콘-텍스트 극소 간격 |
| `--space-2` | 4px | 뱃지 패딩 |
| `--space-4` | 8px | 버튼 그룹, 아이템 간격 |
| `--space-6` | 12px | 버튼·인풋 좌우 패딩 |
| `--space-8` | 16px | 카드 패딩, 그룹 간격 |
| `--space-12` | 24px | 섹션 구분 |
| `--space-16` | 32px | 페이지 블록 구분 |

---

## 반응형 브레이크포인트

| 이름 | 값 | 그리드 컬럼 |
|---|---|---|
| `mobile` | 320px | 2 |
| `tablet` | 768px | 6 |
| `desktop` | 1024px | 12 |
| `desktop-hd` | 1440px | 12 |

```scss
// SCSS 믹스인
.component {
  width: 100%;
  @include respond-to(tablet)  { width: 50%; }
  @include respond-to(desktop) { width: 33.333%; }
}
```

---

## 다크모드

`[data-theme="dark"]` 속성을 `<html>` 또는 최상위 컨테이너에 설정합니다.

```html
<html data-theme="dark">
```

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

```scss
// SCSS 믹스인
.card {
  background: $color-bg-surface;
  @include dark-theme {
    border-color: var(--color-border-default);
  }
}
```

---

## 아이콘 시스템

`icons/` 폴더에 SVG 76개가 저장되어 있습니다.  
CSS `color` 속성으로 색상을 제어합니다 (currentColor 기반).

```html
<span class="icon icon-md icon-search" style="color: var(--color-text-brand)"></span>
```

**크기 클래스:** `icon-xs`(16px) · `icon-sm`(20px) · `icon-md`(24px) · `icon-lg`(32px) · `icon-xl`(40px)

**카테고리:** navigation(15) · action(17) · notification(8) · user(7) · data(10) · content(13) · social(6)

---

## Style Dictionary 빌드

```bash
npm install
npm run build        # JSON → CSS + SCSS 생성
npm run build:css    # CSS만 생성
npm run build:scss   # SCSS만 생성
```

---

## 브랜드 원칙

- **Primary:** `#2D3378` (남색 계열)
- **폰트:** Pretendard (UI) / JetBrains Mono (코드)
- **그리드:** Gutter 30px 고정, 여백 mobile 16px / tablet 24px / desktop 32px
