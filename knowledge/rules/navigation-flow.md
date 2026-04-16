# Navigation Flow & State Machines (내비게이션 흐름 & 상태 머신)

Domain: Interaction
Related screen types: hud, inventory, forge, shop, gacha, skill_tree, character, clan, quest_journal, settings, world_map, collection, chat

## Rule: Hub-Spoke Architecture

**Condition**: IF mobile MMORPG menu structure
**Decision**: THEN use Hub-Spoke model with expandable icon grid. HUD is the hub; tapping menu icon reveals a grid of 15-25+ system icons. Do NOT use bottom tab bar (reserve bottom for skill bar during gameplay).
**Rationale**: 캐주얼 앱과 달리 MMORPG는 시스템이 15개 이상. 하단 탭바로는 수용 불가.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: 6개 게임 전체 공통. Lineage W, Night Crows, Raven 2, Lord Nine, Vampir, Legend of Ymir

## Rule: Maximum Navigation Depth

**Condition**: IF mobile MMORPG menu hierarchy
**Decision**: THEN HUD → menu grid → system → sub-tab/action = maximum 3-4 taps to any feature. Shop purchases should complete in max 2 taps after reaching the shop.
**Rationale**: 탭 수가 늘수록 이탈률 증가. 자주 쓰는 기능은 3탭 이내.
**Confidence**: observed-convention + academic-evidence
**Screen types**: hud, shop
**Sources**: shop.md ("max 2 taps to purchase completion"), NNGroup mobile navigation

## Rule: Quick-Access Entry Points

**Condition**: IF frequently accessed systems
**Decision**: THEN provide 3 tiers of entry: (1) HUD icon row (top-right, 4-6 shortcuts), (2) Expandable icon grid (all systems), (3) Quick-access bar (bottom, bag/equipment/skills). Add context shortcuts: tap quest tracker → jump to quest, tap currency → open shop.
**Rationale**: 다중 진입 경로로 사용자가 현재 맥락에서 최단 경로를 선택.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: 6개 게임 공통 관찰

## Rule: Back Button = Back to Parent

**Condition**: IF back button behavior
**Decision**: THEN use back-to-parent (hierarchical), NOT back-to-previous-screen (chronological). Android back button mimics top-left back arrow within systems; at HUD level trigger exit confirmation.
**Rationale**: 깊은 메뉴 구조에서 chronological back은 예측 불가능. Hierarchical이 직관적.
**Confidence**: observed-convention
**Screen types**: inventory, forge, shop, skill_tree, character, clan, quest_journal, settings
**Sources**: 6개 게임 공통, Android Navigation Architecture guidelines

## Rule: Modal for Confirmations

**Condition**: IF single action confirmation, item details, or purchase confirmation
**Decision**: THEN use modal (dim overlay + center panel). Game world remains visible behind the dim. Keep modals focused on one action.
**Rationale**: 단일 작업에 풀스크린은 과도. 모달은 맥락을 유지하면서 집중.
**Confidence**: observed-convention
**Screen types**: shop, forge, inventory, gacha, trade
**Sources**: Lord Nine (20/76 modal), Raven 2 (8/71), Vampir (8/58)

## Rule: Fullscreen for Complex Systems

**Condition**: IF multi-tab system with complex interactions (inventory management, crafting, character build)
**Decision**: THEN use fullscreen takeover. Reserve screen real estate for tabs, panels, and detailed content.
**Rationale**: 복잡한 시스템은 화면 전체를 써야 정보를 충분히 표시.
**Confidence**: observed-convention
**Screen types**: inventory, forge, character, skill_tree, clan, collection
**Sources**: Lineage W (25/37 fullscreen), Lord Nine (42/76), Vampir (40/58)

## Rule: Overlay Preserving Gameplay

**Condition**: IF auto-combat is active AND player opens a menu
**Decision**: THEN use semi-transparent overlay panel so auto-combat continues visibly behind the UI. Player can monitor combat state while managing inventory/settings.
**Rationale**: 한국 MMORPG 특유의 패턴. 자동 전투를 중단하지 않고 메뉴 사용.
**Confidence**: observed-convention
**Screen types**: inventory, settings
**Sources**: Vampir (6/58 overlay), Lord Nine (16/76), Lineage W (10/37)

## Rule: Ceremony Fullscreen for Results

**Condition**: IF gacha reveal, enhancement success, or major achievement
**Decision**: THEN use dramatic fullscreen with light effects, particle bursts. "Tap anywhere to dismiss." Duration 1.5-2.5s.
**Rationale**: 보상의 감정적 임팩트 극대화. 등급이 높을수록 연출 강도 증가.
**Confidence**: observed-convention
**Screen types**: gacha, forge, collection
**Sources**: Zendle et al. (~2s arousal window), 6개 게임 가챠/강화 결과 화면

## Rule: Horizontal Tabs at Top (3-5)

**Condition**: IF system has 3-5 functional subdivisions
**Decision**: THEN use horizontal tabs at top of screen. Active tab gets color/underline indicator. If more than 5, use scrollable tab row — never use "More" tab.
**Rationale**: 모바일에서 5개까지는 한 줄에 표시 가능. "더보기" 탭은 UX 안티패턴.
**Confidence**: observed-convention
**Screen types**: inventory, forge, shop, character, clan, collection
**Sources**: Night Crows (28/58 tabbed), Lineage W (18/37)

## Rule: Vertical Sidebar for Categories

**Condition**: IF system has 6+ categories or filterable content
**Decision**: THEN use left vertical sidebar. Scrollable, no practical category limit. Tap to filter content on the right.
**Rationale**: 카테고리가 많을 때 수평 탭은 공간 부족. 좌측 사이드바는 무한 확장 가능.
**Confidence**: observed-convention
**Screen types**: inventory, shop, collection, skill_tree
**Sources**: Vampir (25/58 sidebar), Raven 2 (20/71)

## Rule: Maximum Two-Level Tab Nesting

**Condition**: IF nested navigation within a system
**Decision**: THEN maximum 2 levels. Level 1 = top horizontal tabs, Level 2 = left sidebar or secondary tab row. Never go deeper.
**Rationale**: 3단계 이상은 현재 위치 파악이 어려움. 2단계까지가 인지 한계.
**Confidence**: observed-convention
**Screen types**: inventory, shop, character, clan
**Sources**: 6개 게임 전체 — 3단계 중첩 사례 0건

## State Machine: Forge/Enhancement

**Screen type**: forge
**Flow**: Select Item → View Stats/Probability → Select Materials → Confirm Cost → Execute Animation → Result (Success/Fail) → Loop or Exit
**Error states**: insufficient materials, insufficient currency, item locked, max level reached
**Notes**: Legend of Ymir adds "Auto Appraisal" with condition-setting for automated loops.

## State Machine: Inventory

**Screen type**: inventory
**Flow**: Browse Grid → Select Item → Action Menu Popup → Sub-action (equip/enhance/sell/details) → Confirm if destructive → Feedback
**Error states**: full inventory, level-locked item, bound item (cannot trade/sell)

## State Machine: Shop/Purchase

**Screen type**: shop
**Flow**: Browse Categories (sidebar) → Select Product → View Details + Price → Purchase Confirm (modal) → Result → Return
**Notes**: Max 2 taps to completion after reaching shop.

## State Machine: Gacha/Summon

**Screen type**: gacha
**Flow**: Hub Selection (type cards) → Banner Selection → Pull Type (1x/10x) → Confirm Cost → Pull Animation (color signals rarity) → Result Reveal (ceremony) → Collect
**Notes**: Rarity escalation animation — common = subtle, legendary = dramatic full-screen.
