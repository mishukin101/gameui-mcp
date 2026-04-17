# Rarity & Grade Signaling (등급 & 희귀도 신호)

Domain: Visual Language
Related screen types: inventory, equipment_enhance, gacha, collection, trade, crafting

## Rule: Grade Border Color Ladder

**Condition**: IF displaying item/equipment grade in a grid or slot
**Decision**: THEN use border color on a 5-tier ladder: gray (common) → green (uncommon) → blue (rare) → purple (epic) → gold (legendary/mythic).
**Rationale**: NC grade_borders (22/58), RV grade_border (25/71). green-blue-purple-gold 시퀀스가 한국 MMORPG 사실상 표준.
**Confidence**: observed-convention
**Screen types**: inventory, equipment_enhance, gacha, collection, trade, crafting
**Sources**: NC profile grade_borders (22/58), RV profile grade_border (25/71), LW profile green_positive

## Rule: Background Glow for Mythic+

**Condition**: IF item is mythic/legendary tier or higher
**Decision**: THEN add radial glow or particle effect behind the icon in addition to border, using tier's accent color.
**Rationale**: NC, RV 최상위 등급에만 애니메이션/글로우 배경. 테두리만으로는 최고 등급 시각적 차별화 부족.
**Confidence**: observed-convention
**Screen types**: gacha, results_screen, inventory, collection
**Sources**: NC notable_design_characteristics, RV gacha references

## Rule: Locked State Desaturation

**Condition**: IF item or slot is locked/unowned/unmet-prerequisite
**Decision**: THEN desaturate icon to grayscale and reduce opacity to 40-60%.
**Rationale**: NC gray_inactive (35/58), LW dark_bg_bright_focus (32/37). 한국 MMORPG "미해금" 범용 표현.
**Confidence**: observed-convention
**Screen types**: collection, skill_tree, inventory, shop
**Sources**: NC profile gray_inactive (35/58), LW profile dark_bg_bright_focus (32/37)
