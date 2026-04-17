# Typography & Numeric Display (타이포그래피 & 수치 표시)

Domain: Visual Language
Related screen types: inventory, equipment_enhance, character, forge, gacha

## Rule: Plus-Sign Enhancement Level

**Condition**: IF displaying an enhanced equipment item
**Decision**: THEN show "+N" in bright accent color (gold or green) immediately after item name, e.g., "Sword of Dawn +12".
**Rationale**: LOY 프로필 강화 수치 핵심 패턴(4/7). LW green_positive로 강화 숫자 표시. "+N" 형식은 한국 MMORPG 범용.
**Confidence**: observed-convention
**Screen types**: inventory, equipment_enhance, trade, character
**Sources**: LOY profile precision_probability, LW profile green_positive (5/37)

## Rule: Stat Change Arrow Notation

**Condition**: IF stat will change due to enhancement or equipment swap
**Decision**: THEN show "current → result" with green for increases and red for decreases, using arrow or delta notation.
**Rationale**: LOY "before_after_comparison: 스탯 변화를 현재 → 결과로 나란히 표시 (3/7)." 4개 게임 공통.
**Confidence**: observed-convention
**Screen types**: equipment_enhance, character, inventory
**Sources**: LOY profile before_after_comparison (3/7)

## Rule: Probability as Explicit Percentage

**Condition**: IF displaying success rates for enhancement, gacha, or crafting
**Decision**: THEN show exact percentage with one decimal place (e.g., "성공률 32.5%") in prominent position near action button.
**Rationale**: LOY "precision_probability (4/7)." 한국 법률 확률 공개 의무.
**Confidence**: regulatory-requirement
**Screen types**: equipment_enhance, gacha, crafting
**Sources**: LOY profile precision_probability (4/7), 한국 게임산업진흥법
