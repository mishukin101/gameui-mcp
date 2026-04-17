# Economy & Monetization Patterns (경제 & 수익화)

Domain: System Context
Related screen types: shop, gacha, hud, inventory

## Rule: Left Sidebar Category Navigation for Shops

**Condition**: IF in-game shop with 5+ product categories
**Decision**: THEN use vertical category sidebar on left with product grid occupying remaining right area.
**Rationale**: NC nc-shop-002와 RV 모두 좌측 사이드바+우측 그리드. NC split_left_right (25/58) 지배적 레이아웃.
**Confidence**: observed-convention
**Screen types**: shop, gacha
**Sources**: nc-shop-002, NC profile split_left_right (25/58), RV profile vertical_sidebar (20/71)

## Rule: Premium vs Free Currency Icons

**Condition**: IF game has both free and premium currencies
**Decision**: THEN represent premium currency as faceted gem/diamond icon, free currency as gold coin icon. Always display both in persistent top-bar.
**Rationale**: 4개 게임 모두 동일 관습. NC 다이아(프리미엄) vs 골드(무료), LW 다이아 vs 아데나 코인. 상단 바 배치 LW(28/37), NC(15/58).
**Confidence**: observed-convention
**Screen types**: hud, shop, gacha, inventory
**Sources**: NC currency_types, LW currency_types, RV currency_types

## Rule: Real Currency on Purchase Button

**Condition**: IF shop item costs real money (not in-game currency)
**Decision**: THEN show localized real-money price directly on purchase button (e.g., "구매 5,500원"), not in separate label.
**Rationale**: NC nc-shop-001 "구매 5,500원" CTA 버튼 위 표시. 한국 앱스토어 가이드라인과 소비자 신뢰.
**Confidence**: observed-convention
**Screen types**: shop
**Sources**: nc-shop-001, NC currency_types (KRW 4/58)
