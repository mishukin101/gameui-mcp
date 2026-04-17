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

## Rule: Minimum Font Size

**Condition**: IF displaying any body text or data
**Decision**: THEN minimum 11pt (body), 9pt (caption/metadata). CJK languages target 12pt minimum due to denser glyphs. Never go below 9pt even for timestamps or source credits.
**Rationale**: 모바일 가독성 연구. 한글/한자는 glyph 복잡도가 높아 작은 크기에서 흐릿함.
**Confidence**: platform-guideline
**Screen types**: all
**Sources**: Apple HIG Typography, Material Design type scale

## Rule: CJK Line Height Adjustment

**Condition**: IF mixing CJK and Latin text in the same UI
**Decision**: THEN use line-height 1.5-1.7 for CJK (vs 1.2-1.4 for Latin-only). CJK glyphs occupy vertical space more fully, requiring more gap.
**Rationale**: 라틴 기준 line-height로 CJK 렌더링 시 글자가 서로 닿아 판독성 저하.
**Confidence**: platform-guideline
**Screen types**: all
**Sources**: W3C CSS Text 3 spec, Google Fonts CJK guidelines

## Rule: Percentage Format for Probabilities

**Condition**: IF displaying success rates for enhancement, gacha, or crafting
**Decision**: THEN format as explicit percentage with one decimal place (e.g., "성공률 32.5%"). Use "%" suffix, not decimal (0.325).
**Rationale**: LOY "precision_probability (4/7)" 관찰. 소수점 1자리는 정확도와 가독성의 균형. (확률 공개 법적 의무는 confirmation-safeguards의 Enhancement Probability Display 참조)
**Confidence**: observed-convention
**Screen types**: equipment_enhance, gacha, crafting
**Sources**: LOY profile precision_probability (4/7)
