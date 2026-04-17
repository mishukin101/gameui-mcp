# gameui-mcp

LLM이 Figma MCP로 게임 UI를 생성/수정할 때 **디자인 판단의 정확도와 품질을 높이기 위한 지식베이스**. MCP 서버 + CLI로 제공.

## 왜 필요한가

게임 UI 스크린샷 구조 분석(예: [GameUI](https://github.com/mishukin101/GameUI))은 "무엇이 있다"는 잘 기술하지만, **"왜 그렇게 하는가"**(디자인 판단 근거)와 **"어떻게 동작하는가"**(인터랙션, 상태 전이)는 담고 있지 않습니다. 이 때문에 LLM이 UI를 생성할 때:

- 그리드 vs 리스트 중 뭘 써야 하는지 판단 못함
- 필터/정렬이 필요한지 모름
- 확인 다이얼로그가 필요한 상황을 모름
- 화면 간 전이 흐름을 모름

gameui-mcp는 두 종류의 지식을 결합해서 이 문제를 해결합니다:

1. **Cases** — GameUI의 실제 게임 분석 (관찰 기반, "무엇이 있다")
2. **Rules** — 디자인 문헌/가이드라인에서 추출한 판단 규칙 (연구 기반, "왜 그렇게 하는가")

## 현재 포함된 지식

- **83개 규칙**, 17개 카테고리, 5개 도메인 (모바일 MMORPG 특화)
- **6개 게임의 프로필**과 **433개 reference 파일** (GameUI 레포 참조)

카테고리:

| 도메인 | 카테고리 |
|--------|----------|
| **Interaction** | touch-ergonomics, navigation-flow, confirmation-safeguards, animation-feedback |
| **Layout** | safe-zones, screen-real-estate, responsive-grid |
| **Information Architecture** | data-density, comparison-support, currency-transparency |
| **Visual Language** | grade-signaling, icon-conventions, typography-numbers |
| **System Context** | economy-monetization, progression-systems, social-multiplayer, localization |

## 신뢰도 체계

규칙은 4단계 신뢰도로 분류됩니다:

- `regulatory-requirement` — 법적 의무 (예: 한국 게임법 확률 공개)
- `platform-guideline` — 플랫폼 가이드라인 (예: Apple HIG)
- `academic-evidence` — 연구/논문 기반
- `observed-convention` — 복수 게임에서 관찰된 관습

## 설치

```bash
git clone https://github.com/mishukin101/gameui-mcp.git
cd gameui-mcp
npm install
npm run build
```

## 설정

`gameui.config.json`에서 GameUI 레포의 로컬 경로를 지정:

```json
{
  "gameui_path": "/path/to/your/GameUI"
}
```

GameUI 레포는 `reference/{game}/*.md`와 `profiles/{game}.yaml` 구조를 가져야 합니다.

## MCP 서버로 사용 (Claude Code)

Claude Code 설정(`~/.claude.json` 또는 프로젝트의 `.claude/settings.local.json`)에 추가:

```json
{
  "mcpServers": {
    "gameui": {
      "command": "node",
      "args": ["/absolute/path/to/gameui-mcp/dist/server.js"]
    }
  }
}
```

또는 개발 중에는 tsx로 직접:

```json
{
  "mcpServers": {
    "gameui": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/gameui-mcp/src/server.ts"]
    }
  }
}
```

### 제공 도구 (MCP Tools)

- `get_design_rules` — 카테고리 또는 screen_type으로 규칙 조회
- `get_game_references` — 게임별 분석 reference 조회
- `get_game_profile` — 게임별 디자인 패턴 프로필 조회
- `design_advisor` — 규칙 + 프로필 + reference를 한번에 조합
- `search_knowledge` — 자연어 키워드 검색

## CLI로 사용 (Codex 등)

빌드 후 직접 실행:

```bash
# 모든 카테고리 목록
node dist/cli.js rules

# forge 화면 관련 규칙
node dist/cli.js rules --screen-type forge

# 특정 카테고리 전체
node dist/cli.js rules --category confirmation-safeguards

# 게임 프로필
node dist/cli.js profile --game night-crows

# 게임별 reference (요약)
node dist/cli.js references --game night-crows --type crafting --summary

# 종합 디자인 가이드 (규칙 + 프로필 + reference)
node dist/cli.js advise --screen-type forge --game night-crows

# 키워드 검색
node dist/cli.js search "probability display"

# 사용 가능한 게임 목록
node dist/cli.js games
```

## 사용 예시

### 시나리오: "night-crows 스타일로 forge 화면을 디자인하고 싶어"

```bash
node dist/cli.js advise --screen-type forge --game night-crows
```

반환:
- **Regulatory Requirements** (한국 게임법 확률 공개, 파괴 위험 경고 등)
- **Research-Backed** (2단계 확인 패턴 등)
- **Observed Conventions** (애니메이션, 모달 타이밍, 비교 표시 등)
- **State Machine** (Select → Materials → Confirm → Animation → Result)
- **Game Profile** (night-crows의 색상 역할, 레이아웃 관습)
- **Reference Examples** (실제 nc-equipment-enhance 분석 파일)

LLM은 이 정보를 참고하여 Figma MCP로 UI를 생성하거나 Tailwind+CSS 목업을 작성합니다.

## 프로젝트 구조

```
gameui-mcp/
├── knowledge/
│   ├── rules/              ← 17개 규칙 카테고리 파일
│   └── state-machines.md   ← 화면 유형별 상태 흐름
├── src/
│   ├── config.ts           ← GameUI 경로 설정 로드
│   ├── data.ts             ← 규칙 파싱 + GameUI 데이터 접근
│   ├── server.ts           ← MCP 서버 (5개 도구)
│   └── cli.ts              ← CLI 진입점 (6개 명령어)
├── gameui.config.json      ← GameUI 레포 경로
├── package.json
└── tsconfig.json
```

## 규칙 파일 포맷

각 규칙은 다음 형식:

```markdown
## Rule: [Rule Name]

**Condition**: IF [조건]
**Decision**: THEN [결정]
**Rationale**: [근거 — 왜 이렇게 해야 하는가]
**Confidence**: [regulatory-requirement | platform-guideline | academic-evidence | observed-convention]
**Screen types**: [해당되는 screen_type 목록]
**Sources**: [원천 소스, 인용]
```

## 한계

- 규칙은 LLM이 웹 리서치 + 6개 게임 분석 교차 검증으로 작성 (사람 검증 미완료)
- 모바일 MMORPG(한국/일본 중심)에 특화됨 — 다른 장르는 부분적 적용
- 스크린샷 1장 기반 분석이라 인터랙션/상태 전이는 제한적

## 기여

규칙 추가/수정 환영합니다. 각 규칙은 Condition/Decision/Rationale/Confidence/Screen types/Sources 형식을 따라야 합니다.
