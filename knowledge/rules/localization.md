# Localization & Cultural Adaptation (현지화 & 문화 적응)

Domain: System Context
Related screen types: all

## Rule: KR-to-EN Text Expansion Budget

**Condition**: IF designing UI text containers that will be localized from Korean to English
**Decision**: THEN allocate 30-40% additional horizontal space for English text, or use auto-truncation with ellipsis at container boundary.
**Rationale**: 한국어는 음절 문자로 압축적. "강화"(2자) → "Enhance"(7자). 4개 게임 한국어 라벨이 영어 전환 시 오버플로우.
**Confidence**: academic-evidence
**Screen types**: all
**Sources**: W3C internationalization guidelines, cross-game observation

## Rule: Comma Separator for KRW Pricing

**Condition**: IF displaying real-money prices in Korean Won
**Decision**: THEN use comma-separated thousands (e.g., "110,000원") with currency unit "원" suffixed. No decimal places.
**Rationale**: NC nc-shop-002 "110,000원", "55,000원". 한국 로케일 쉼표 구분, 원 하위 단위 없음.
**Confidence**: observed-convention
**Screen types**: shop
**Sources**: nc-shop-002 price display

## Rule: Gold as Universal Premium Accent

**Condition**: IF designing rarity/premium visual cues for multi-region MMORPG
**Decision**: THEN use gold/amber as universal premium accent color. Safe across KR, JP, EN, CN markets.
**Rationale**: LW gold_accent (30/37), NC gold_premium (42/58), RV gold (38/71), LOY accent_primary (7/7). 금색은 부와 성취를 동서양 모두에서 긍정적으로 연상.
**Confidence**: observed-convention
**Screen types**: all
**Sources**: LW gold_accent (30/37), NC gold_premium (42/58), RV gold (38/71), LOY accent_primary (7/7)
