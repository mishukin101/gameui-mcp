# Animation & Feedback Patterns (애니메이션 & 피드백)

Domain: Interaction
Related screen types: forge, gacha, hud, results_screen, inventory, shop

## Rule: Modal Transition Timing

**Condition**: IF opening or closing a modal dialog
**Decision**: THEN use center-scale animation with dimmed background, 200-250ms duration, ease-out curve.
**Rationale**: 한국 MMORPG 표준. 바텀시트 슬라이드는 드뭄, 센터 모달이 지배적.
**Confidence**: observed-convention
**Screen types**: shop, forge, inventory, gacha
**Sources**: RV confirmation dialogs, Lord Nine forge screens

## Rule: Tab Switch Speed

**Condition**: IF switching between tabs within a system
**Decision**: THEN near-instant content swap (<100ms). No crossfade or slide animation. Active tab gets color/underline change only.
**Rationale**: 깊은 메뉴 계층(LOY 6+ 탭)에서 전환 지연은 복합적 좌절감. 속도 우선.
**Confidence**: observed-convention
**Screen types**: inventory, shop, character, clan, collection
**Sources**: 6개 게임 공통 관찰

## Rule: Gacha Reveal Anticipation Sequence

**Condition**: IF gacha/loot box result reveal
**Decision**: THEN use multi-stage sequence: dark buildup (portal/circle) → light burst → card reveal. Duration 1.5-2.5s. Rarity escalation: common=subtle, legendary=full-screen flash + particle burst + screen shake.
**Rationale**: Zendle et al. ~2초 각성 윈도우. 등급별 연출 강도 차등으로 보상 감정 극대화.
**Confidence**: academic-evidence + observed-convention
**Screen types**: gacha, results_screen
**Sources**: Zendle et al., 6개 게임 가챠 결과 화면

## Rule: Enhancement Result Animation

**Condition**: IF forge/enhancement action completes
**Decision**: THEN success = bright light burst + ascending particles. Failure = red flash + crack effect + camera shake. If the screen already contains a 3D scene (e.g., forge altar, essence stones), use it as the animation stage instead of adding a separate overlay.
**Rationale**: Lord Nine 제단 + 빛나는 구, RV 에센스 스톤 — 3D 장면이 "애니메이션 스테이지" 역할.
**Confidence**: observed-convention
**Screen types**: forge, equipment_enhance
**Sources**: Lord Nine ln-equipment_enhance-001, RV rv-crafting-001

## Rule: Rarity-Based Animation Intensity

**Condition**: IF displaying result of any rarity-tiered outcome (gacha, crafting, drop)
**Decision**: THEN scale animation intensity by rarity: common = subtle glow, rare = moderate particles, legendary = full-screen flash + heavy particles + unique sound + extended reveal.
**Rationale**: Diablo/WoW 등급 시스템에서 유래, 모바일 MMORPG 표준. 2단계 피드백(Wheeler/Riot): 마일스톤=과장, 루틴=절제.
**Confidence**: observed-convention
**Screen types**: gacha, forge, results_screen, collection
**Sources**: Dan Wheeler (Riot Games) "Overwhelming Feedback" (GDC), Diablo/WoW rarity color system

## Rule: Button Press Feedback

**Condition**: IF player taps any interactive button
**Decision**: THEN provide immediate visual feedback (50-100ms): scale-down to 95% + slight color shift. Restore on release with ease-in-out.
**Rationale**: 반응성이 "게임 필"의 3대 구성요소 중 하나. 지연 없는 피드백이 조작감 형성.
**Confidence**: academic-evidence
**Screen types**: all
**Sources**: Steve Swink "Game Feel" (2008), Jan Willem Nijman "Art of Screenshake" (GDC)

## Rule: Loading State Feedback

**Condition**: IF operation takes longer than 300ms (network request, scene load, heavy computation)
**Decision**: THEN show loading feedback based on duration: 300ms-1s → inline spinner on the triggering element. 1-3s → skeleton screen for list/grid content. 3s+ → dedicated loading screen with progress bar and tips.
**Rationale**: NN/g 연구: 0.1s 이내 즉시 반응, 1s 이내 흐름 유지, 10s 넘으면 주의 상실. 스켈레톤은 로딩 인지 부하 감소.
**Confidence**: academic-evidence
**Screen types**: all, loading_screen
**Sources**: Jakob Nielsen "Response Times: The 3 Important Limits" (NN/g), Facebook Skeleton Screen pattern

## Rule: Network Latency Indicator

**Condition**: IF online/multiplayer feature AND connection is slow or interrupted
**Decision**: THEN display ping/latency indicator in top-right corner (colored dot + ms number). Switch to "reconnecting" overlay if disconnected >2s. Do not hide failed actions silently.
**Rationale**: MMORPG 실시간 전투는 지연에 민감. 끊김을 숨기면 플레이어는 자기 입력이 무시된 걸로 오해.
**Confidence**: observed-convention
**Screen types**: hud, all
**Sources**: 모바일 MMORPG 공통 관행
