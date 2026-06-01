# KIRBS Design System (Final Production Version)

A token-driven, dark-mode-ready design system for KIRBS — a B2B admin/console visual language built around a deep indigo primary (`#2D3378`), Pretendard Korean type, and a rigorously semantic token layer.

This project repackages and visualises the upstream design tokens at **[github.com/dawooni0625/claude](https://github.com/dawooni0625/claude)** (W3C DTCG JSON + generated CSS/SCSS) into a browsable system.

---

## 🚨 CRITICAL AI DIRECTIVE: 레이아웃 일관성 절대 규칙 (AI 가이드라인)

클로드코드(Claude Code)가 여러 페이지를 생성하거나 동일 컴포넌트를 활용할 때, 화면 간 레이아웃이 미세하게 틀어지거나 다르게 렌더링되는 현상을 방지하기 위해 다음 4가지 개발 규칙을 **반드시 강제(Hard Enforcement)**합니다.

### 1. 다크 모드 버그 및 컴포넌트 컬러 토큰 사용 금지

- `[data-theme="dark"]` 속성이 켜지면 시맨틱 토큰은 자동으로 상응하는 다크 모드 색상으로 스왑됩니다.
- ⛔ **절대 금지:** `--component-*-color-*` 형태의 컴포넌트 고유 컬러 토큰은 라이트 모드 고정 hex 값(`#2D3378` 등)이므로 다크 모드에서 변환되지 않습니다.
- ✅ **해결책:** 모든 인터랙션, 배경, 텍스트 색상은 반드시 아래 **시맨틱 토큰 매핑 테이블**을 기준으로 코드를 작성해야 레이아웃과 테마가 깨지지 않고 일치합니다.

| 잘못된 사용 (컴포넌트 고정 컬러)         | 올바른 사용 (다크모드 대응 시맨틱 토큰)           | 적용 대상                       |
| :--------------------------------------- | :------------------------------------------------ | :------------------------------ |
| `--component-button-color-primary-bg`    | `--color-interactive-primary`                     | 기본 버튼 배경색                |
| `--component-button-color-primary-text`  | `--color-text-inverse`                            | 기본 버튼 텍스트색              |
| `--component-*-color-bg` / `-bg-default` | `--color-bg-elevated` / `--color-bg-surface`      | 카드 레이아웃 및 섹션 배경      |
| `--component-*-color-border*`            | `--color-border-default` / `--color-border-focus` | 컴포넌트 테두리 및 라인         |
| `--component-*-color-text*`              | `--color-text-primary` / `--color-text-secondary` | 메인 타이틀 및 라벨/서브 텍스트 |

### 2. 글로벌 레이아웃 그리드 (Fixed Grid & Margins)

- 모든 관리자 페이지, 대시보드, 컨텐츠 영역의 그리드는 **30px 고정 거터(Gutter)**를 유지합니다.
- 양 끝 여백(Margin)은 뷰포트에 따라 아래 수치로 고정하며, 임의의 flex gap이나 패딩을 페이지별로 다르게 부여하지 않습니다.
  - **Mobile:** `16px` | **Tablet:** `24px` | **Desktop:** `32px`

### 3. 섹션 패딩 및 리듬감 통일

- 컨텐츠 섹션 간의 여백을 줄 때는 하드코딩 수치를 배제하고, 통일된 시맨틱 섹션 토큰을 적용하여 상하 스페이싱 레이아웃을 완전히 일치시킵니다.
  - `--section-pad-sm` (64px) / `--section-pad-md` (96px) / `--section-pad-lg` (120px)

### 4. 타이포그래피 제약 조건

- 폰트는 Pretendard(UI 본문)와 JetBrains Mono(영문/숫자/코드 표기) 조합으로 고정합니다.
- 폰트 두께(Weight)는 오직 **`400` (Regular)**과 **`700` (Bold)** 두 가지만 사용합니다. 시스템에 존재하지 않는 `500`이나 `600` 단계를 임의로 적용하면 레이아웃 정렬이 무너지는 원인이 됩니다.

---

## 📂 파일 및 폴더 인덱스 (Directory Index)

| 파일 / 폴더 경로      | 용도 및 목적                                                                                          |
| :-------------------- | :---------------------------------------------------------------------------------------------------- |
| `tokens.css`          | 런타임 소스 오브 트루스(Source of Truth). 프리미티브, 시맨틱, 컴포넌트 전체 레이어(290개 변수) 포함.  |
| `colors_and_type.css` | 웹폰트 임포트 및 글로벌 기본 태그(`<h1>`, `<p>`, `<code>`, `.prose` 명세) 스타일시트.                 |
| `tokens/`             | 빌드타임 오리진. DTCG JSON 소스 및 제너레이팅된 `tokens.scss` 포함.                                   |
| `icon/`               | 10개 카테고리, 총 113개의 `currentColor` 스트로크 SVG 아이콘 세트.                                    |
| `brand/`              | 공식 로고 에셋. 통합 로고(`kirbs-logo.svg`, 362×56) 및 컴팩트 워드마크(`kirbs-wordmark.svg`, 130×42). |
| `ui_kits/admin/`      | 컴포넌트 조합 및 테마 스위칭이 사전 검증된 사이드바/탑바 쉘 및 대시보드 UI 키트 예시.                 |

---

## 🎨 시각 기반 및 UI 요소 가이드라인 (Visual Foundations)

### 카드 및 컨테이너 스타일 (Cards & Elevation)

- **표준 카드 형태:** 배경색 White(`#FFF`), 베이스 표면 Surface(`--color-bg-surface`, `#F8F8FB`) 위에 배치.
- **보더 및 라운딩:** `1px hairline border(#E0E0E0)` + `--border-radius-md` (8px 고정).
- **시그니처 그림자:** 검은색 계열을 배제하고 인디고가 가미된 틴트 그림자(`rgba(45,51,120, ... )`)와 `--elevation-1`을 기본 레이아웃 카드로 활용합니다.
- **글래스모피즘 / 그라데이션:** 시스템 전체에서 일체 허용하지 않으며 플랫한 컬러 표면만 사용합니다.

### 인터랙션 가이드 (Hover / Press / Disabled)

- **Hover (마우스 오버):** 프라이머리 배경은 약 10% 어둡게(`#232968`), 텍스트 링크는 `--color-text-link-hover`로 전환합니다. 서브 요소는 brand-quaternary(`#E8EAF6`) 컬러로 채우며 오파시티(투명도) 페이드는 지양합니다.
- **Disabled (비활성화):** 배경색은 그레이-4(`#BDBDBD`) 혹은 요소 투명도 `opacity: 0.38`을 부여하고, 커서는 무조건 `not-allowed`로 정렬 레이아웃을 고정합니다.
- **Focus (초점):** 인디고 배경에서의 명시성을 위해 브랜드 컬러가 아닌 2px 솔리드 블루(`#2F80ED`) 아웃라인을 2px 오프셋으로 노출합니다.

---

## ✍️ 컨텐츠 및 마이크로카피 패턴 (Content Fundamentals)

두 레이아웃이 텍스트 길이 등으로 인해 시각적으로 틀어지는 현상을 방지하기 위해 컨텐츠 포맷팅을 제한합니다.

- **어조:** 정중하고 정제된 경어체(`-요`, `-습니다`)를 유지하며, UI 내부에서 이모지나 문장 끝 느낌표(`!`)는 사용하지 않습니다.
- **버튼 명명 규칙:** 문장형 표현을 금지하고 2글자 내외의 명확한 명사형 동사로 레이아웃 부피를 최소화합니다. (예: `저장`, `추가`, `취소`, `로그아웃`)
- **데이터 및 숫자 표기:** 숫자는 아라비아 숫자를 원칙으로 하며 천 단위 콤마를 적용합니다. 특히 대시보드 카드 등의 요약 지표에서는 `42,800,000원`과 같은 긴 국문 표기 대신 `₩ 42.8M` 형태로 규격을 통일하여 텍스트 오버플로우로 인한 레이아웃 깨짐을 방지합니다.
