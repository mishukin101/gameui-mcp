# Progression & Power Systems (성장 & 강화 시스템)

Domain: System Context
Related screen types: skill_tree, equipment_enhance, crafting, character

## Rule: Radial Skill Layout for Branching Trees

**Condition**: IF skill system has branching paths or multi-path progression
**Decision**: THEN use radial/circular node layout with nodes connected by glowing lines. Do not use linear list.
**Rationale**: RV "radial_skill_tree: 원형/방사형 스킬 트리." NC radial_layout (3/58). 방사형이 균등 선택지를 수직 트리보다 잘 전달.
**Confidence**: observed-convention
**Screen types**: skill_tree
**Sources**: RV profile radial_skill_tree, NC profile radial_layout (3/58)

## Rule: Milestone Bonus Track

**Condition**: IF enhancement progression has checkpoint rewards (e.g., every +3 or +5)
**Decision**: THEN display horizontal milestone track below enhancement UI showing unlocked/locked bonuses at each threshold.
**Rationale**: LOY "milestone_bonus (2/7)." 다음 구간 돌파 동기 부여.
**Confidence**: observed-convention
**Screen types**: equipment_enhance, crafting
**Sources**: LOY profile milestone_bonus (2/7)

## Rule: Attempt Counter for Limited Enhancement

**Condition**: IF enhancement/crafting has maximum attempt limit
**Decision**: THEN show "N/M" (current/maximum) attempts prominently near action button.
**Rationale**: LOY "finite_attempt: 시도 횟수 상한 표시 (1/32 등) (2/7)." 자원 투입 전 잔여 횟수 확인 필요.
**Confidence**: observed-convention
**Screen types**: equipment_enhance, crafting
**Sources**: LOY profile finite_attempt (2/7)

## Rule: Level-Up Feedback Ceremony

**Condition**: IF player levels up (character, skill, equipment)
**Decision**: THEN display brief fullscreen or banner ceremony: level number flash + particle burst + stat change preview. Duration 1-2s. Tap to dismiss or auto-dismiss.
**Rationale**: 레벨업은 핵심 성장 마일스톤. 무반응 레벨업은 성취감 상실.
**Confidence**: observed-convention
**Screen types**: hud, results_screen, character
**Sources**: 모바일 MMORPG 공통 관행

## Rule: XP Bar Placement

**Condition**: IF displaying experience progress
**Decision**: THEN anchor XP bar persistently at screen bottom (full width, thin ~4-8dp) OR near character portrait. Show current/next level numeric threshold on hover/tap.
**Rationale**: XP 진행도는 세션 내 지속 확인 필요. 바닥 전폭 또는 초상화 인접 배치가 표준.
**Confidence**: observed-convention
**Screen types**: hud, character
**Sources**: 모바일 MMORPG HUD 공통 관찰

## Rule: Combat Power as Primary Progression Metric

**Condition**: IF game has multiple power-contributing systems (level, gear, skills, gems)
**Decision**: THEN compute and display single aggregated "Combat Power" or "Growth Score" number prominently on character screen. Provide breakdown tooltip showing contribution from each subsystem.
**Rationale**: LOY "108,776 전투력" 관찰. 복잡한 성장 시스템을 단일 지표로 요약해야 플레이어가 진행도 파악 가능.
**Confidence**: observed-convention
**Screen types**: character, hud
**Sources**: LOY loy-inventory-001, 모바일 MMORPG 공통 관행
