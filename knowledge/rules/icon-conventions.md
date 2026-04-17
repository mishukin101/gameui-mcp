# Iconography & Symbol Conventions (아이콘 & 심볼 관습)

Domain: Visual Language
Related screen types: hud, shop, inventory, trade, quest_journal

## Rule: Red Dot for Unclaimed Actions

**Condition**: IF tab, menu, or item has unclaimed reward or unread notification
**Decision**: THEN display small red circle badge (6-10dp) at top-right corner of the icon.
**Rationale**: LW red_warning (18/37), NC red_alert (28/58). 장르 범용, 플레이어 기대.
**Confidence**: observed-convention
**Screen types**: hud, inventory, quest_journal, clan
**Sources**: LW profile red_warning (18/37), NC profile red_alert (28/58)

## Rule: NEW/HOT Tag Badges

**Condition**: IF shop content is recently added or high-conversion
**Decision**: THEN overlay colored text tag — blue "NEW", red "HOT" — at top-left corner of card or category label.
**Rationale**: NC nc-shop-002 카테고리 사이드바와 상품 카드에 정확히 이 패턴 사용. RV 상점도 동일.
**Confidence**: observed-convention
**Screen types**: shop, gacha, lobby
**Sources**: nc-shop-002 design signals

## Rule: Lock Icon for Bound/Untradeable

**Condition**: IF item is character-bound or untradeable
**Decision**: THEN display small padlock icon at bottom-left of item slot.
**Rationale**: RV rv-trade-001 거래 가능 아이템에는 잠금 없음, 귀속 아이템에 자물쇠 표시. 한국 MMORPG 표준 귀속 표시.
**Confidence**: observed-convention
**Screen types**: inventory, trade, equipment_enhance
**Sources**: rv-trade-001, NC inventory references
