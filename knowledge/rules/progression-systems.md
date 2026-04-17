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
