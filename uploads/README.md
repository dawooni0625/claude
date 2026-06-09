# KIRBS 디자인 시스템

KIRBS를 위한 토큰 기반·다크모드 대응 디자인 시스템입니다 — 깊은 인디고
프라이머리(`#2D3378`), Pretendard 한글 서체, 그리고 철저히 시맨틱한 토큰
레이어를 중심으로 구성된 B2B 어드민/콘솔용 비주얼 언어입니다.

이 프로젝트는 업스트림 디자인 토큰(W3C DTCG JSON + 생성된 CSS/SCSS)을
탐색 가능한 시스템으로 재구성·시각화한 것입니다: 폰트 + 시맨틱 스타일시트,
비주얼 스펙(specimen), 그리고 토큰이 실제 제품 화면으로 어떻게 조합되는지를
보여주는 동작하는 UI 킷으로 이뤄져 있습니다. 원본 한글 문서는
`tokens/UPSTREAM_README.md` 와 `tokens/UPSTREAM_CLAUDE.md` 를 참고하세요.

---

## 목차

| 파일 / 폴더 | 용도 |
|---|---|
| `tokens.css` | 모든 CSS 커스텀 프로퍼티 — primitive, 시맨틱, **그리고 전체 `--component-*` 레이어**(33개 컴포넌트에 걸친 435개 변수; 컴포넌트 색상은 라이트모드 고정값). **런타임의 단일 진실 공급원(source of truth).** 모든 파일이 import 합니다. |
| `colors_and_type.css` | 시맨틱 레이어 — 웹폰트 import, `<h1>`/`<p>`/`<code>` 기본값, `.text-*` 색상 헬퍼, 롱폼 본문용 `.prose` 스코프(리스트, 인용, hr, figure, 표), 포커스 링, 텍스트 선택 스타일. |
| `tokens/` | 업스트림 JSON 소스(W3C DTCG, 18개 카테고리) + 생성된 `tokens.scss`. `tokens.css`의 빌드타임 원천. |
| `preview/` | 개념 1개당 카드 1장 형식의 디자인 시스템 스펙(Colors, Type, Spacing, Components, Brand). 컴포넌트 카드는 Figma 가이드의 모든 페이지를 커버합니다 — 표, breadcrumbs, large selector, date picker, accordion, banner, carousel, file upload, tag input, 하단 앱 내비, circle progress / stepper, modal, tooltip, 이미지 가이드라인 — 여기에 상호작용 상태 카드까지: **폼 입력 상태**(기본 / 포커스 / 에러 / 비활성 / 성공), **테이블 상태**(로딩 / 빈 데이터 / 정렬 / 선택), **스켈레톤 로딩**. |
| `templates/` | 바로 쓰는 페이지 스타팅 포인트(피커의 **Pages** 섹션). 모두 공유 `_shell.css`(240px 사이드바 + 64px 상단바) 위에 구성: **login**, **dashboard**(KPI + 차트 + 피드), **list**(필터 + 표 + 페이지네이션), **report**(인적성검사 결과표), **form**(검사 배정 + 검증 상태), **detail**(프로필 + 탭 + 타임라인), **settings**(서브내비 + 프로필), **error-404**. |
| `icon/` | 10개 카테고리의 113개 아이콘 전체 세트(`navigation`/`action`/`data`/`content`/`media`/`commerce`/`notification`/`user`/`system`/`social` — social은 filled + `-line` 변형 제공). `currentColor`. |
| `brand/` | 공식 로고 — `kirbs-logo.svg`(전체 로크업) + `kirbs-wordmark.svg`(축약형), 각각 다크/반전 배경용 `*-mono.svg` `currentColor` 변형 포함. |
| `ui_kits/admin/` | 동작하는 UI 킷 — 사이드바 + 상단바 셸, login → dashboard / members / settings 클릭 흐름, 라이트/다크 토글. |
| `SKILL.md` | 이 폴더를 Claude Code에 그대로 넣을 수 있게 하는 Agent Skills 매니페스트. |
| `fonts/PretendardVariable.woff2` | 자체 호스팅 Pretendard 가변 폰트(weight 축 100–900). |

---

## 빠른 시작

```html
<link rel="stylesheet" href="colors_and_type.css">
<!-- tokens.css 는 colors_and_type.css 가 자동으로 import 합니다 -->

<button class="btn-primary">버튼</button>

<style>
.btn-primary {
  background: var(--color-interactive-primary);
  color:      var(--color-text-inverse);
  height:     44px;
  padding:    0 var(--space-12);
  border:     0;
  border-radius: var(--component-button-border-radius-square);
  font:       700 var(--font-size-body-md) var(--font-family-base);
  transition: var(--transition-color);
}
.btn-primary:hover { background: var(--color-interactive-primary-hover); }
</style>
```

다크 모드: `<html data-theme="dark">`. 모든 **시맨틱** 토큰은 자동으로 전환됩니다 — 컴포넌트 토큰의 동작 방식은 아래 정책을 참고하세요.

---

## 다크 모드 & 컴포넌트 토큰 정책

다크 모드는 `[data-theme="dark"]` 에서 켜집니다. 무엇이 전환되고 무엇이 전환되지 않는지는 선호가 아니라 엄격한 규칙입니다:

- ✅ **시맨틱 토큰은 전환됩니다.** `--color-text-*`, `--color-bg-*`, `--color-border-*`, `--color-interactive-*`, `--elevation-*` 모두 다크 오버라이드를 가집니다. 제품 색상을 이들로 구성하면 다크 모드가 "그냥 동작"합니다.
- ✅ **컴포넌트 크기는 테마 안전(theme-safe)합니다.** 색상이 아닌 모든 `--component-*` 토큰(높이, 패딩, 반경, 폰트 크기, gap, transition, `*-min-width`, `*-max-width`, 치수로 표현된 그림자)은 두 테마에서 동일합니다. 어디서든 자유롭게 쓰세요.
- ⛔ **컴포넌트 색상 토큰은 라이트모드 고정값입니다.** 모든 `--component-*-color-*` 값은 `tokens/component.json`의 고정 hex입니다. **`[data-theme="dark"]` 에서 변하지 않습니다** — 업스트림은 다크용 컴포넌트 레이어를 정의하지 않습니다.

**규칙:** 테마에 적응해야 하는 색상은 반드시 시맨틱 토큰에서 가져와야 하며, 절대 `--component-*-color-*` 토큰에서 가져오면 안 됩니다. 컴포넌트 색상 토큰은 (a) 의도적으로 라이트 전용인 표면이거나, (b) 라이트모드 기준값을 읽을 때만 사용하세요.

이는 캐스케이드가 아니라 관례로 강제됩니다 — `--component-button-color-primary-bg`(`#2D3378`)로 만든 프라이머리 버튼은 다크 모드에서 다크 테마의 `--color-interactive-primary`(`#A9A5E8`)로 밝아지지 않고 인디고 그대로 남습니다. 이 정책이 막으려는 버그가 바로 그것입니다.

### 매핑 — 컴포넌트 색상 → 다크 안전 빌드를 위해 쓸 시맨틱 토큰

| 이걸 쓰려 한다면… | 대신 사용(다크 안전) |
|---|---|
| `--component-button-color-primary-bg` | `--color-interactive-primary` (+ `-hover` / `-active`) |
| `--component-button-color-primary-text` | `--color-text-inverse` |
| `--component-*-color-bg` / `-bg-default` | `--color-bg-elevated` / `--color-bg-surface` |
| `--component-*-color-border*` | `--color-border-default` / `--color-border-focus` |
| `--component-*-color-text*` | `--color-text-primary` / `--color-text-secondary` / `--color-text-tertiary` |
| `--component-toast-color-*-bg` / 상태 채움색 | `--color-bg-{success,warning,error,info}` |
| `--component-*-color-*-text`(상태) | `--color-text-{success,warning,error,info}` |

> 어드민 UI 킷(`ui_kits/admin/`)은 이미 이 규칙을 따릅니다: 시맨틱 토큰으로 스타일링하고 깔끔하게 토글되며, 그래서 테마 전환이 처음부터 끝까지 동작합니다.

---

## 브랜드 원칙

- **프라이머리** `#2D3378` — 깊은 인디고. 헤드라인, 주요 액션, 브랜드 표면에 사용.
- **타입** Pretendard — 시스템 전체에 단일 서체. 한글 우선이며, 라틴은 Pretendard 서브셋으로 커버. 숫자·코드는 자릿수 정렬을 위해 tabular figures(`'tnum'`)를 적용한 Pretendard를 재사용.
- **그리드** 30px 거터, 고정. 마진: 모바일 16 / 태블릿 24 / 데스크톱 32.
- **간격(Spacing)** `--space-{n}` = *n* × 2px. 컴포넌트 스케일은 `--space-1`…`--space-16`(32px); 확장 스케일 `--space-20`…`--space-60`(40–120px)은 퍼블릭 웹 섹션 리듬용. 섹션 패딩은 시맨틱 `--section-pad-{sm,md,lg}`(64/96/120px) + `--section-block-gap` / `--section-stack-gap`을 우선 사용.
- **그림자(Shadows)** 는 중성 블랙이 아니라 인디고 틴트(`rgba(45,51,120,…)`)입니다. 이것이 시그니처입니다.
- **시맨틱 우선** 제품 코드에서 `var(--color-gray-1)`을 절대 쓰지 말고, 항상 `var(--color-text-secondary)`처럼 시맨틱 토큰을 사용해 다크 모드가 자동으로 동작하도록 합니다.

---

## 콘텐츠 기본 원칙

업스트림 문서는 **이중 언어(한글 우선)** 입니다: 토큰명과 CSS 변수는
영어(기계 친화적), 설명은 한글(사람 친화적)입니다. UI 킷의 제품 카피도 같은
관례를 따릅니다.

- **언어** 한글 우선. 영어는 제품 명사("Dashboard"), 고유명사, 코드에 사용.
- **문체(Voice)** 격식 있는 존댓말(`-요`/`-습니다`). 경어 수준은 높되 딱딱하지 않게. 2인칭 대명사 없이 어미로 사용자를 암묵적으로 지칭.
- **톤(Tone)** 차분하고 사실적이며 기술적. 축하용 토스트 외에는 느낌표 금지. 마케팅식 과장 금지.
- **마이크로카피 패턴**
  - 버튼: 짧은 동사구 — `저장`, `추가`, `취소`, `로그아웃`. 완전한 문장보다 2글자 동사 선호.
  - 라벨: 콜론 없는 명사 — `이메일`, `비밀번호`.
  - 헬퍼 텍스트: `요`/`다`로 끝나는 짧은 문장 — `회사 이메일을 입력해 주세요.`
  - 에러: 규칙이 아니라 문제를 명시 — `유효하지 않은 입력입니다.`
  - 빈 상태: 원인 + 다음 행동 — `아직 항목이 없어요 / 첫 항목을 추가하면 여기에 표시됩니다.`
- **숫자** 천 단위 구분자를 쓴 아라비아 숫자. 통화: 요약에서는 `42,800,000원`이 아니라 `₩ 42.8M`.
- **케이싱** 영어 UI 문자열은 Title Case가 아니라 sentence-case(`Continue`, `With icon`). 토큰은 kebab-case.
- **이모지** 제품 UI에서 사용하지 않음. 브랜드 보이스는 전문적입니다.
- **코드 스타일 명사** 토큰 참조는 `--` 접두사를 유지한 코드 스타일(tabular figures 적용)로 표기: `--color-text-primary`.

---

## 비주얼 파운데이션

### 색상(Colour)

- **색조 전략** 브랜드 primary는 단일 채도 높은 인디고(`#2D3378`)로 시스템을 고정합니다(brand 토큰 — 유지). 3개의 브랜드 틴트(`#5B63A8`, `#8E96D3`, `#E8EAF6`)가 이를 확장하며 — quaternary만 *배경* 틴트로 쓰이고 나머지는 전경/인터랙티브 액센트입니다. 보조·중립·시맨틱 색상은 Figma "Colors"(2025-03-21) 풀 톤 스케일을 따릅니다 — **Secondary**(청록), **Grayscale**, **Action**(파랑), **Positive**(초록), **Warning**(노랑), **Danger**(빨강) 각 12단계(`--color-{family}-{0…100}`). `preview/colors-figma-scales.html` 참고.
- **중성색(Neutrals)** 텍스트 전용 트루 블랙 2개(`#000`, `#1D1D1D`); 그 외 회색 5개(`--color-gray-1…5`)는 Figma **Grayscale**에 정렬(`#2D2D2D` → `#E4E4E4`)되며 전체 13단계는 `--color-grayscale-0…100`으로 제공됩니다. primitive 팔레트에 오프화이트는 없으며, `#F8F8FB`는 *파생값*으로 시맨틱 레이어에서 `--color-bg-surface`로만 존재합니다.
- **상태색(State colours)** Figma 각 계열의 대표값(60단계)에 정렬: `#297AFF` info(Action) / `#42A148` success(Positive) / `#FEB51A` warning(Warning) / `#F54336` error(Danger). warning만 검정 텍스트와 짝지어집니다 — 노란색이 흰색에 비해 너무 밝기 때문입니다. 연한 배경 틴트는 각 계열 5단계(`--color-bg-{info,success,warning,error}`)를 씁니다.
- **시맨틱 우선 규칙** 제품 코드는 반드시 `--color-text-*` / `--color-bg-*` / `--color-border-*` / `--color-interactive-*` 를 사용해야 합니다. primitive는 토큰 레이어가 별칭으로 삼기 위해서만 존재합니다.

### 타입(Type)

- **Pretendard** 한글 우선 지오메트릭 산세리프. 자체 호스팅 가변 폰트(`fonts/PretendardVariable.woff2`), 제품에서는 weight 400 + 700 사용(디스플레이용으로 가변 축 100–900 사용 가능). 시스템 전체의 단일 서체입니다.
- **숫자 & 코드** tabular figures(`font-feature-settings: 'tnum'`)를 적용한 Pretendard 재사용으로 표·KPI에서 자릿수가 세로 정렬됩니다 — 별도 monospace 폰트 없음.
- **스케일** 14개 크기를 Display(5, 마케팅용), Heading(5, h1–h5), Body(4, 그 외 전부 — `body-lg` 18 / `body-md` 16 / `body-sm` 14 / `body-xs` 12)로 분할. line-height는 어디서나 평탄한 `1.5` — 디스플레이도 마찬가지이며, 스펙에 따라 더 좁은 값(`1.1`)으로 오버라이드됩니다.
- **굵기(Weights)** `400`(regular)과 `700`(bold)만. 토큰 시스템에 500/600 없음.
- **자간(Letter spacing)** 전역 `0em`. 큰 디스플레이는 `−1.5%`~`−2.5%`로 좁힘(`colors_and_type.css`에서 적용, 토큰 아님).

### 표면 & 고도(Surfaces & elevation)

- **카드** 표면(`#F8F8FB`) 위 흰색(`#FFF`). 1px 헤어라인 테두리(`#E4E4E4`) + `--elevation-1` 그림자. 반경 `--border-radius-md`(8px). 글래스모피즘 없음, 표면 그라데이션 없음.
- **그림자는 인디고 틴트** — `rgba(45,51,120,…)`을 .08 / .12 / .16 / .20 불투명도로. 이것이 일반 Material 대비 KIRBS다움을 만듭니다.
- **고도 규칙**
  - `0` 평면(기본 본문 콘텐츠)
  - `1` 정지 상태 카드, hover 시 테이블 행
  - `2` 드롭다운, 툴팁, 플로팅 액션 버튼
  - `3` 모달, 다이얼로그, 사이드 패널
  - `4` 전체 화면 오버레이, 최상단 팝업
- **배경 이미지** 시스템은 사진/일러스트 세트를 포함하지 않지만, 이미지 처리 가이드라인은 *정의*합니다(Figma 가이드 기준): 권장 종횡비(21:9 → 9:16), 모서리 반경 형태(`--component-image-radius-*`), 텍스트 가독성 오버레이(`--component-image-overlay-dark/brand/light`). 실제 이미지 에셋은 여전히 제품 레이어에 둡니다. `preview/comp-image.html` 참고.

### 테두리 & 모서리(Borders & corners)

- **테두리 두께** `1px` / `2px` / `3px`. 폼 입력은 `1.5px` 사용(컴포넌트 토큰 전용 — primitive 아님).
- **반경 스케일** `0 / 2 / 4 / 8 / 12 / 16 / 9999`. 카드/입력은 기본 `8`, 모달은 `16`, 뱃지/아바타는 `9999`. 포커스 링 폴백을 제외하면 시스템 어디서도 `xs`(2px)를 쓰지 않습니다.
- **알약형 vs 사각형** 버튼은 둘 다 제공 — 폼·고밀도 UI용 `square`(6px), 마케팅 CTA용 `round`(99px).

### 모션(Motion)

- **지속시간 스케일** `0 / 100 / 200 / 300 / 500ms`. `200`이 기본("normal").
- **이징(Easing)**
  - `out`(`cubic-bezier(0,0,.2,1)`)이 기본. 나타나는 모든 것에 사용.
  - `in`은 사라지는 것에.
  - `in-out`은 상태 변화 / 위치 이동에.
  - `spring`(`cubic-bezier(.34,1.56,.64,1)`)은 축하용: 토스트, 뱃지 팝.
  - `linear`는 프로그레스 바에만.
- **바운스 금지** `spring` 외에는 없음. 시스템 레벨에서 패럴랙스·스크롤 구동 애니메이션 정의 없음.

### Hover / press / disabled

- **Hover**
  - 프라이머리 배경: ~10% 어둡게(`#232968`).
  - tertiary / secondary 배경: `#E8EAF6`(brand-quaternary)로 채움. 불투명도 페이드 금지.
  - 링크: `--color-text-link-hover`(더 진한 인디고)로 이동.
- **Press / active**
  - 프라이머리 배경: ~20% 어둡게(`#1A1F52`). transform/scale 없음.
  - tertiary: `#D0D5EA`로 채움.
- **Disabled**
  - `--color-interactive-primary-disabled` = `#C6C6C6`(gray-4). 또는 요소에 `opacity: 0.38`(`--opacity-disabled`).
  - 비활성 커서: `not-allowed`.
- **Transition** 색상/배경 100ms, 그림자 200ms, 크기/위치 300ms. 항상 `cubic-bezier(0,0,.2,1)`.

### 포커스(Focus)

- **항상 보이게** `:focus-visible`은 2px offset에 2px solid `#2F80ED` 아웃라인을 표시합니다. 포커스 색은 인디고 배경 위 대비 확보를 위해 의도적으로 브랜드 인디고가 아닌 파랑입니다.
- 폼 필드는 아웃라인 *외에* 3px 인디고 틴트 글로우(`focus-shadow` 컴포넌트 토큰)도 받습니다.

### 투명도 & 블러(Transparency & blur)

- **절제해서 사용.** 모달/오버레이 백드롭은 라이트 `rgba(0,0,0,0.5)` / 다크 `rgba(0,0,0,0.72)`. 토큰 레이어에 backdrop-blur 정의 없음.
- **툴팁**은 반투명이 아니라 불투명(`#1D1D1D`)입니다.
- 시스템에 **글래스 표면 없음.**

### 아이코노그래피(Iconography)

아래 `아이코노그래피` 섹션 참고.

---

## 아이코노그래피

**10개 카테고리의 113개 아이콘** 전체 세트가 `icon/<category>/<name>.svg`에 있습니다:

| 카테고리 | 개수 | 예시 |
|---|---|---|
| `navigation` | 15 | home, search, menu, chevron-{up,down,left,right}, arrow-{…}, x |
| `action` | 29 | check, plus, edit, trash-2, download, upload, filter, link, send, heart, zap |
| `data` | 10 | bar-chart, bar-chart-2, pie-chart, trending-{up,down}, table, database |
| `content` | 13 | mail, calendar, file, folder, star, image, phone, map-pin |
| `media` | 8 | play, pause, skip-{forward,back}, volume-{2,x}, camera, mic |
| `commerce` | 6 | shopping-cart, shopping-bag, credit-card, dollar-sign, gift, percent |
| `notification` | 8 | bell, info, alert-{circle,triangle}, check-circle-2, x-circle, clock |
| `user` | 7 | user, users, user-plus, settings, lock, key, log-out |
| `system` | 5 | sun, moon, unlock, shield, wifi |
| `social` | 6 + 6 | google, kakao, naver, github, apple, facebook — 각각 filled 마크 **및** `-line` 아웃라인 변형 |

**포맷.** 모든 아이콘은 `20`–`24` viewBox 위의 `currentColor` 스트로크
SVG(둥근 캡/조인)입니다. 모노크롬 — 색상은 전적으로 호스트의 CSS `color`로
제어합니다(Google 같은 소셜 마크는 브랜드 색 대신 `currentColor` + 불투명도
음영을 써서 깔끔하게 틴트됩니다).

**사용법.** 두 가지 패턴, 둘 다 `color`로 색상 제어:

```html
<!-- 정적 HTML: CSS mask, background-color로 틴트 -->
<span style="width:24px;height:24px;background:var(--color-text-brand);
  -webkit-mask:url(icon/navigation/home.svg) center/contain no-repeat;
  mask:url(icon/navigation/home.svg) center/contain no-repeat;"></span>
```

```jsx
// React(어드민 킷): fetch + inline 으로 currentColor 가 자연스럽게 상속됨
<Icon name="navigation/home" size={24} color="var(--color-text-brand)" />
```

- **크기** `xs` 16 · `sm` 20(기본) · `md` 24 · `lg` 32 · `xl` 48
- **색상** 항상 `currentColor` / mask `background`로 상속. 절대 fill 하드코딩 금지.
- **사용 위치** 버튼(`sm`), GNB/사이드바(`md`), 빈 상태(`lg`/`xl`).
- **이모지** 사용 안 함. 메트릭의 증감 표시 ▲/▼ 외에는 유니코드 기호도 쓰지 않음.
- **브랜드 일러스트** 정의 없음. 시스템은 글리프 중심입니다.

`ui_kits/admin/Icons.jsx`는 레거시 `Icon*` 컴포넌트명(예: `IconHome`,
`IconBell`)을 이 세트의 파일에 매핑하므로 기존 화면이 계속 동작합니다.

---

## 프로젝트 시작하기

### 디자인 시스템 프리뷰 보기

모든 프리뷰 카드는 **빌드 단계가 필요 없는** 자체 완결형 HTML 파일입니다.

1. **브라우저에서 프리뷰 파일을 직접 열기:**
   ```bash
   # 프로젝트 루트에서 preview/*.html 파일을 브라우저로 열기
   # 로컬 서버 불필요 — 파일은 상대 경로로 tokens.css 를 참조함
   open preview/brand-foundations.html
   open preview/comp-button-variants.html
   open preview/colors-brand.html
   # 등등
   ```

2. **또는 간단한 로컬 서버 실행**(CORS/모듈 문제가 있을 때 권장):
   ```bash
   # Python 3.x
   python3 -m http.server 8000

   # Python 2.x
   python -m SimpleHTTPServer 8000

   # Node.js (npx — Node ≥14 이면 설치 불필요)
   npx http-server -p 8000
   ```
   그런 다음 `http://localhost:8000/preview/` 에서 카드를 둘러보세요.

### 어드민 UI 킷 실행

`ui_kits/admin/`은 CDN에서 React를 로드하는 **동작하는 React/JSX 애플리케이션**입니다. 빌드 단계가 필요 없습니다.

1. **UI 킷 직접 열기:**
   ```bash
   open ui_kits/admin/index.html
   # 또는 로컬 서버 경유:
   # http://localhost:8000/ui_kits/admin/
   ```

2. **정상 로드 확인:**
   - "KIRBS" 브랜딩이 있는 로그인 화면이 보여야 합니다.
   - 브라우저 콘솔(F12 → Console)에 에러가 없어야 합니다.
   - 빈 화면이거나 에러가 나면 아래 "의존성 & 호환성"을 참고하세요.

3. **클릭 경로 테스트:**
   - **로그인:** `@` 포함 이메일 + 4자 이상 비밀번호 입력 → 로그인 클릭.
   - **대시보드:** KPI 카드 + 활동 피드가 나타남.
   - **멤버:** 사이드바에서 멤버 관리 클릭 → 표가 렌더됨.
   - **모달:** 초대하기 클릭 → 초대 모달이 열림.
   - **테마 토글:** 우측 하단 ☀️/🌙 버튼이 다크 모드를 전환 — 모든 화면이 시맨틱 토큰으로 리테마됨.
   - **로그아웃:** 아바타 메뉴 → 로그아웃 시 로그인으로 복귀.

---

## 빌드 & 개발

### 토큰 파이프라인 이해

디자인 시스템 토큰은 다음 흐름으로 진행됩니다:

```
tokens/{color,spacing,typography,...}.json (W3C DTCG 소스)
           ↓
tokens/component.json (33개 컴포넌트 레이어 토큰)
           ↓
tokens/tokens.json (집계본, 업스트림)
           ↓
[빌드 단계: 이 레포에 없는 도구로 컴파일됨]
           ↓
tokens/tokens.scss (생성된 SCSS 변수)
           ↓
[로컬 컴파일: tokens.scss → tokens.css]
           ↓
tokens.css ← 런타임 단일 진실 공급원
           ↓
colors_and_type.css (tokens.css import, 시맨틱 레이어 추가)
```

**현재:** `tokens.css` 와 `colors_and_type.css` 는 **미리 컴파일되어 레포에 커밋**되어 있습니다. 일반 사용 시 다시 빌드할 필요가 없습니다.

**토큰 JSON 파일을 수정한다면:**
- `tokens/*.json` 변경 시 업스트림 빌드로 `tokens/tokens.scss`를 재생성해야 합니다(공식 빌드 과정은 `tokens/UPSTREAM_README.md` 참고).
- 그 다음 `tokens.scss` → `tokens.css`로 재컴파일하세요(예: `sass tokens/tokens.scss tokens.css` 또는 사용하는 빌드 도구).
- CSS 파일은 파일 감시로 자동 재빌드되지 않습니다 — 토큰이 바뀌면 수동으로 재빌드하세요.

### 로컬 개발 셋업(선택)

**토큰 JSON 파일을 편집**하거나 **tokens.scss를 커스터마이즈**할 계획이라면:

1. **Sass 설치**(미설치 시):
   ```bash
   # macOS (Homebrew)
   brew install sass/sass/sass

   # Node.js (npm/yarn)
   npm install -g sass
   ```

2. **tokens.scss 감시 & 컴파일:**
   ```bash
   sass --watch tokens:. --no-source-map
   # tokens/ 폴더를 감시하고 프로젝트 루트에 tokens.css 를 출력
   # 소스맵이 필요하면 --no-source-map 제거 (약 50KB 추가)
   ```

3. **실시간 변경을 위해 로컬 서빙:**
   ```bash
   python3 -m http.server 8000
   # tokens.scss 편집 → Sass 재컴파일 → 브라우저 새로고침
   ```

---

## 의존성 & 호환성

### 외부 폰트 & CDN

- **Pretendard(자체 호스팅, 유일한 서체):** `fonts/PretendardVariable.woff2`를 `colors_and_type.css`의 `@font-face`로 로드. 외부 CDN 없음, CSP 이슈 없음. ✅
- **다른 웹폰트 없음.** 숫자·코드는 tabular figures를 적용한 Pretendard 재사용 — 서드파티 CDN에서 가져오는 것 없음.

### 브라우저 호환성

- **최신 브라우저(2022+):** CSS 커스텀 프로퍼티, flexbox, grid, SVG mask 모두 지원. ✅
- **IE 11:** 미지원. CSS 커스텀 프로퍼티가 필수입니다.
- **모바일:** iOS Safari 15+ 및 Chrome Android에서 테스트됨. 반응형 브레이크포인트: 768px / 1024px.

### React & CDN 버전(어드민 UI 킷)

어드민 UI 킷(`ui_kits/admin/index.html`)은 버전과 무결성 해시를 고정해 **unpkg**에서 React를 로드합니다:

```html
<script crossorigin integrity="sha384-..." src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
<script crossorigin integrity="sha384-..." src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.22.5/babel.min.js"></script>
```

- **React 18.2.0**(프로덕션 빌드, unpkg의 사전 minify본)
- **Babel 7.22.5**(브라우저 내 JSX 변환용)
- **SRI 해시 고정** — CDN이 예상치 못한 콘텐츠를 제공하면 즉시 실패.
- **npm / node_modules 불필요** — 모든 것이 런타임에 로드됨.

CSP나 네트워크로 unpkg가 차단되면:
- 이 라이브러리들을 자체 호스팅하거나,
- UI 킷을 로컬 빌드 도구(Vite, Webpack 등)로 옮기고 npm으로 의존성을 설치하세요.

---

## 유의사항 & 대체(Caveats & substitutions)

1. **아이콘** — ✅ 해결됨. 아이콘 세트는 **Lucide Icons**(MIT, 2px 스트로크, 24×24 그리드 — Figma 가이드에 명시된 라이브러리)에서 가져와 `icon/<category>/`의 113개 세트로 자체 호스팅하여 CDN 의존성이 없습니다. 어드민 킷 + 프리뷰 카드가 `currentColor`로 직접 사용합니다.

2. **로고** — ✅ 해결됨. 공식 아트워크는 `brand/`에 있습니다: `kirbs-logo.svg`(전체 로크업 — 링 워드마크 + 한글 회사명 + EN 태그라인, 362×56) 및 `kirbs-wordmark.svg`(축약형 링 + KIRBS, 130×42), 그리고 다크/반전 표면용 `*-mono.svg` `currentColor` 변형. `preview/brand-logo.html` 참고. (KIRBS = **K**orean **I**ntegrated **R**eport & **B**usiness **S**ystem, Figma 브랜드 가이드 기준.)

3. **제품 화면** — 업스트림 토큰 세트는 예시 제품 UI가 없는 순수 토큰 시스템입니다. 여기의 `ui_kits/admin/`은 `component.json` 형태(`table`, `nav-sidebar`, `dropdown`, `modal`에 대한 강한 비중)를 고려한 가장 그럴듯한 해석 — 즉 B2B 어드민/콘솔입니다. *액션: 확인 또는 방향 수정.*

4. **폰트** — **상태: ✅ 해결됨.**
   - ✅ **Pretendard** 자체 호스팅: `fonts/PretendardVariable.woff2`(가변 weight 축 100–900, 약 150KB). `colors_and_type.css`의 `@font-face`로 로드. 외부 의존성 없음, CSP 우려 없음.
   - ✅ **단일 서체.** 숫자·코드는 tabular figures를 적용한 Pretendard 재사용(`--font-family-mono`가 Pretendard로 resolve); monospace 웹폰트는 없고 CDN에서 로드하는 것도 없음.

5. **토큰 빌드 파이프라인** — 업스트림 토큰 JSON 소스는 `tokens/`에서 관리되지만 **이 레포에서 자동 컴파일되지 않습니다.** `tokens.scss`와 `tokens.css`는 사전 생성되어 커밋되어 있습니다. `tokens/*.json` 파일을 수정한다면:
   - 업스트림 빌드 과정으로 `tokens.scss`를 재생성해야 합니다(`tokens/UPSTREAM_README.md` 참고).
   - 그 다음 Sass로 `tokens.scss` → `tokens.css`를 로컬 컴파일하세요(위 "빌드 & 개발" 참고).
   - 재컴파일하지 않으면 CSS 변경이 런타임에 반영되지 않습니다.

---

## 더 읽을거리

더 깊은 맥락은 이 프로젝트의 토큰과 함께 있습니다:

- **원본 한글 문서** — `tokens/UPSTREAM_README.md`, `tokens/UPSTREAM_CLAUDE.md`
- **카테고리별 토큰** — `tokens/{color,spacing,typography,…}.json`(W3C DTCG)
- **컴포넌트 토큰** — `tokens/component.json`은 33개 컴포넌트(textfield, button, modal, table, breadcrumbs, large-selector, date-picker, accordion, banner, carousel, file-upload, tag-input, nav-app, progress-circle, stepper, image, footer, …)의 정확한 크기/색상을 정의합니다. 이들은 `tokens.css`에 `--component-{component}-{...path}` CSS 변수로도 컴파일됩니다(예: `var(--component-button-height-md)` → `44px`, `var(--component-table-row-height)` → `48px`). 따라서 JSON을 읽지 않고 런타임에 참조할 수 있습니다. **크기/간격 컴포넌트 변수는 테마 안전; 색상 컴포넌트 변수는 라이트모드 고정값** — 다크 모드 대응 표면에는 `[data-theme="dark"]`에서 전환되는 시맨틱 `--color-*` 토큰을 사용하세요. 숫자를 하드코딩하기 *전에* 이들을 먼저 찾으세요.

이 폴더는 디자인을 빠르게 내보내는 데 집중한, 의견이 담긴 서브셋입니다.
