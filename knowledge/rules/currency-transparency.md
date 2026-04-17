# Currency & Cost Transparency (재화 & 비용 투명성)

Domain: Information Architecture
Related screen types: shop, gacha, forge, hud, equipment_enhance

## Rule: Persistent Currency Bar on Shop Screens

**Condition**: IF player is on any shop, gacha, or purchase-related screen
**Decision**: THEN display relevant currency balance in a persistent top bar with currency icon, updated in real time after each transaction.
**Rationale**: LW lw-shop-001 다이아몬드 잔액(36,614) 상단 중앙. NC, RV 상점 모두 헤더에 자원 바 포함. 구매 전 잔액 확인을 위해 다른 화면으로 이동할 필요 없어야 함.
**Confidence**: observed-convention
**Screen types**: shop, gacha, forge
**Sources**: LW lw-shop-001, NC nc-shop-001, RV rv-shop-001

## Rule: Price Inline with Currency Icon

**Condition**: IF displaying a price on a product card or purchase button
**Decision**: THEN place currency icon immediately left of numeric price on the same line. Never separate icon from number across different UI regions.
**Rationale**: 아이콘과 숫자 분리 시 시각적 도약(saccade)으로 인지 속도 저하.
**Confidence**: observed-convention
**Screen types**: shop, gacha, forge, equipment_enhance
**Sources**: LW lw-shop-001, NC nc-shop-001, LOY loy-shop-002

## Rule: Purchase Limit Visibility

**Condition**: IF item has purchase frequency cap (daily, weekly, lifetime)
**Decision**: THEN display remaining/total count (e.g., "0/10 per week") directly on purchase confirmation modal. Do not bury in tooltip.
**Rationale**: LOY loy-shop-002 "캐릭터당, 주간 0/10" 구매 모달에 표시. 불필요한 시도 방지.
**Confidence**: observed-convention
**Screen types**: shop
**Sources**: LOY loy-shop-002

## Rule: Bundle Value Decomposition

**Condition**: IF selling a package or bundle with multiple items
**Decision**: THEN list each included item with icon + quantity in a vertical stack. Show total price as a single CTA button at the bottom.
**Rationale**: NC nc-shop-001 패키지 내용물(무기, 재화, 소모품) 아이콘+수량 나열, "구매 5,500원" 하단 우측. 명시적 내용 목록이 가격 정당화.
**Confidence**: observed-convention
**Screen types**: shop, gacha
**Sources**: NC nc-shop-001, nc-shop-004

## Rule: Step-Up Pricing Visual Progression

**Condition**: IF offering multi-tier or step-up purchase package
**Decision**: THEN display tiers as horizontally connected cards with arrows, showing escalating prices and content. Locked tiers visually dimmed.
**Rationale**: NC nc-shop-003 STEP 1-4 카드 화살표 연결(2,000원~110,000원), 순차 해금. 전체 비용 사다리 투명성으로 구매 후회 감소.
**Confidence**: observed-convention
**Screen types**: shop
**Sources**: NC nc-shop-003
