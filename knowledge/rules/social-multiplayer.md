# Social & Multiplayer Context (소셜 & 멀티플레이어)

Domain: System Context
Related screen types: clan, chat, trade

## Rule: Guild Roster as Sortable Table

**Condition**: IF displaying guild list with 10+ guilds or 50+ members
**Decision**: THEN use data table with sortable columns (name, level, leader, members "49/50", activity) and inline action buttons per row.
**Rationale**: NC nc-clan-001 정확히 이 패턴: 엠블럼, 레벨, 길드장, 멤버 수(현재/최대), 출석, 행별 "즉시 가입" 버튼. "49/50" 형식으로 가입 가능 여부 즉시 판단.
**Confidence**: observed-convention
**Screen types**: clan
**Sources**: nc-clan-001

## Rule: Tabbed Guild Hub Navigation

**Condition**: IF guild system has 4+ sub-functions (roster, war, raids, settings)
**Decision**: THEN use top horizontal tab bar with all guild sub-functions accessible from one screen. Do not use nested menus.
**Rationale**: NC 5개 길드 탭("추천 길드/신청/초대/생성/길드 대전/길드 약탈"). 평면 탭 접근이 시간 민감한 길드 활동의 내비게이션 깊이 감소.
**Confidence**: observed-convention
**Screen types**: clan
**Sources**: nc-clan-001, RV clan references (7 files)

## Rule: Persistent Chat Window

**Condition**: IF chat system exists in MMORPG
**Decision**: THEN use semi-transparent collapsible chat window anchored to bottom-left or bottom-right. Default collapsed state, expand on tap. Support tab switching between channels (전체/길드/파티/귓속말).
**Rationale**: 채팅이 항상 열려 있으면 게임 뷰포트 차단. 접힌 상태에서도 최근 메시지 미리보기 제공이 관행.
**Confidence**: observed-convention
**Screen types**: chat, hud
**Sources**: 6개 게임 공통 관찰

## Rule: Block/Report Safety Access

**Condition**: IF player interacts with another player (chat, trade, guild, PvP)
**Decision**: THEN provide block/report action accessible within 2 taps from player name or portrait. Block is immediate (no confirmation); report opens form with category selection.
**Rationale**: 성인 콘텐츠나 스팸 즉시 차단 필요. 한국 게임법 청소년 보호 요구. Block 확인 다이얼로그는 피해자 지연 유발.
**Confidence**: regulatory-requirement
**Screen types**: chat, clan, trade
**Sources**: 한국 게임산업진흥법 청소년 보호, 모바일 MMORPG 공통 관행

## Rule: Party Frame Real-Time Update

**Condition**: IF player is in a party/raid group
**Decision**: THEN display party member HP/MP bars in top-left or left-side stack, updated in real time. Each member shows: name, class icon, HP bar, MP bar, status effects.
**Rationale**: 실시간 전투에서 파티원 상태 확인은 핵심. 좌측은 전통적 MMORPG 관습.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: 모바일 MMORPG 파티 플레이 공통 관찰
