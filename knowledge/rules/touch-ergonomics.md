# Touch Ergonomics & Gesture Vocabulary (터치 인체공학 & 제스처)

Domain: Interaction
Related screen types: hud, inventory, forge, shop, skill_tree, character, chat, settings, world_map

## Rule: Minimum Tap Target Size

**Condition**: IF mobile touch target
**Decision**: THEN minimum 44×44dp (iOS) / 48×48dp (Android). Combat-critical buttons (skills, auto-battle) use 56-64dp.
**Rationale**: Apple HIG / Google Material 가이드라인 기본값. 한국 MMORPG는 전투 버튼을 더 크게 만들어 빠른 반응을 지원.
**Confidence**: regulatory-requirement (platform guidelines) + observed-convention (MMORPG upsizing)
**Screen types**: hud, inventory, forge, shop, skill_tree, character
**Sources**: Apple HIG, Google Material Design, Lineage W / Night Crows / Raven 2 프로필 분석

## Rule: Thumb Zone Layout — Landscape MMORPG

**Condition**: IF landscape orientation mobile MMORPG HUD
**Decision**: THEN primary action buttons (attack, skills, auto-battle) → bottom-right quadrant; character status (HP/MP/portrait) → top-left; currency/resource bar → top-center.
**Rationale**: 오른손 엄지가 자연스럽게 도달하는 영역에 고빈도 액션 배치. 상태 정보는 시선만으로 확인 가능한 위치에.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: Lineage W (28/37 screenshots), Night Crows (6/58 edge-anchored), Raven 2 (6/71 edge-anchored)

## Rule: One-Thumb-Plus-Auto Play Model

**Condition**: IF Korean mobile MMORPG
**Decision**: THEN design for "one-thumb + auto-combat" interaction model. Auto-combat/auto-move handles routine play; manual intervention (skill activation, dodging) requires only right thumb.
**Rationale**: 한국 MMORPG의 지배적 플레이 패턴. 자동 전투가 기본이고, 수동 개입은 최소화.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: Night Crows 프로필 (auto_convenience: 5/58)

## Rule: Critical Feedback Placement

**Condition**: IF displaying combat feedback (damage numbers, boss mechanics)
**Decision**: THEN never place in bottom-right where right thumb rests. Use top-center or center of game world viewport.
**Rationale**: 엄지가 화면의 약 33%를 가리므로, 중요 피드백이 가려지면 안 됨.
**Confidence**: academic-evidence
**Screen types**: hud
**Sources**: platform-adaptation.md ("thumb covers 33%"), gameplay-hud.md ("80% gaze on game world")

## Rule: Tap to Select, Long-Press for Detail

**Condition**: IF inventory, collection, or grid-based item screen
**Decision**: THEN tap = select item, long-press = show detail tooltip/popup. Consistent across all grid screens.
**Rationale**: 모바일 MMORPG의 사실상 표준 제스처. 사용자가 학습 없이 기대하는 동작.
**Confidence**: observed-convention
**Screen types**: inventory, collection, shop, forge, character
**Sources**: 6개 게임 프로필 공통 관찰, item-grid role 전 게임 출현

## Rule: Swipe for Scroll, Not for Tab Switch

**Condition**: IF tabbed navigation with scrollable content
**Decision**: THEN use explicit tab buttons for switching (tap on tab). Avoid full-screen swipe to switch tabs — reserve swipe for content scrolling within the current tab.
**Rationale**: 풀스크린 스와이프로 탭 전환 시 콘텐츠 스크롤과 충돌. 한국 MMORPG는 탭 탭 전환을 선호.
**Confidence**: observed-convention
**Screen types**: inventory, shop, skill_tree, character, clan, quest_journal
**Sources**: Raven 2 vertical_sidebar (20/71), Lineage W left_vertical_category_filter (7/37)

## Rule: Pinch Reserved for World Map

**Condition**: IF pinch gesture
**Decision**: THEN reserve exclusively for world map zoom. Never use pinch inside menu/inventory screens.
**Rationale**: 메뉴 화면에서 핀치는 의미 없고 오작동 유발.
**Confidence**: observed-convention
**Screen types**: world_map
**Sources**: 6개 게임 분석 — 메뉴 화면에서 핀치 사용 사례 0건
