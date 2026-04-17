# Screen Real Estate Budget (화면 공간 예산)

Domain: Layout
Related screen types: hud, inventory, collection, crafting, clan, shop, settings

## Rule: HUD Visibility Budget

**Condition**: IF player is in main gameplay field (exploration or combat)
**Decision**: THEN HUD elements must occupy no more than 25-30% of total screen area, leaving 70-75% as unobstructed game world. Anchor HUD to edges only (top strip, bottom strip, corner clusters).
**Rationale**: NC nc-hud-001 표준: 미니맵 좌상단, 자원 상단중앙, 퀘스트 우상단, 스킬바 하단중앙. 중앙 전체 비움. 4개 한국 MMORPG 공통.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: NC nc-hud-001, Polydin HUD Design Guide

## Rule: Maximum Simultaneous Overlays

**Condition**: IF player opens a panel or popup during gameplay
**Decision**: THEN allow at most 2 simultaneous overlays (e.g., chat window + one info tooltip). If a third panel is requested, auto-dismiss the oldest non-pinned panel.
**Rationale**: 4개 게임 모두 메뉴는 풀스크린 전환 사용. HUD 모드에서 채팅+툴팁만 공존. 모바일에서 3개 이상 패널 중첩 시 판독 불가.
**Confidence**: observed-convention
**Screen types**: hud, chat
**Sources**: NC nc-hud-001, LW lw-collection-001

## Rule: Fullscreen Takeover for System Menus

**Condition**: IF player opens inventory, collection, crafting, clan, or shop
**Decision**: THEN use fullscreen takeover (display_mode: fullscreen). Game world is fully replaced by menu UI.
**Rationale**: 4개 게임 전체 시스템 화면이 fullscreen. 분할 패널 레이아웃(리스트+상세, 그리드+미리보기)에 충분한 공간 필요.
**Confidence**: observed-convention
**Screen types**: inventory, collection, crafting, clan, shop, settings
**Sources**: LW (25/37 fullscreen), Lord Nine (42/76), Vampir (40/58)

## Rule: Auto-Hide HUD During Idle

**Condition**: IF player is idle for >10 seconds OR cinematic/cutscene triggers
**Decision**: THEN progressively fade non-essential HUD elements (quest tracker, system icons, resource bar) to 0% opacity over 2 seconds. Keep only HP/MP bars and minimap at 50% opacity. Restore full HUD on any touch.
**Rationale**: 모바일 화면 공간은 프리미엄. 한국 MMORPG는 3D 세계의 시각적 화려함 강조. 아이들 시 숨기면 "스크린샷 순간" 유도.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: Polydin HUD Design Guide
