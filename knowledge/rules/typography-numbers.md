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

## Rule: Percentage Format for Probabilities

**Condition**: IF displaying success rates for enhancement, gacha, or crafting
**Decision**: THEN format as explicit percentage with one decimal place (e.g., "성공률 32.5%"). Use "%" suffix, not decimal (0.325).
**Rationale**: LOY "precision_probability (4/7)" 관찰. 소수점 1자리는 정확도와 가독성의 균형. (확률 공개 법적 의무는 confirmation-safeguards의 Enhancement Probability Display 참조)
**Confidence**: observed-convention
**Screen types**: equipment_enhance, gacha, crafting
**Sources**: LOY profile precision_probability (4/7)
