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
