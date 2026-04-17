# Confirmation Safeguards (확인 & 안전장치)

Domain: Interaction
Related screen types: shop, forge, trade, gacha, inventory, character

## Rule: Premium Currency Confirmation

**Condition**: IF spending premium currency (diamonds, gems, crystals, paid tokens)
**Decision**: THEN always show confirmation modal with: (1) cost amount, (2) current balance, (3) remaining balance after purchase, (4) explicit agreement checkbox or button. Lineage W adds legal notice (refund policy, minor protection) directly in the modal.
**Rationale**: 한국 게임산업진흥법 유료 아이템 거래 시 명시적 동의 의무. Fortnite $520M FTC 합의금이 미확인 결제의 위험을 증명.
**Confidence**: regulatory-requirement
**Screen types**: shop, gacha, trade
**Sources**: 한국 게임산업진흥법, FTC v. Epic Games (2022), lw-shop-002.md

## Rule: Enhancement Probability Display

**Condition**: IF enhancement, upgrade, or any probability-based action
**Decision**: THEN display exact success probability (typically 1 decimal place, e.g., "32.5%"). Show destruction/downgrade probability if applicable. Show cost (materials + currency) before allowing confirmation. Show before/after stat comparison.
**Rationale**: 한국 법률상 확률 공개 의무. MapleStory Star Force 패턴이 업계 표준.
**Confidence**: regulatory-requirement
**Screen types**: forge, crafting
**Sources**: 한국 게임산업진흥법, MapleStory Star Force UI, forge.md

## Rule: Gacha Probability Disclosure

**Condition**: IF gacha, loot box, or random reward system
**Decision**: THEN display exact drop rates for all tiers. Korean/Japanese/Chinese markets require this by law. US (FTC 2025.9) also requires exact percentages. Offer direct-purchase alternative alongside random options.
**Rationale**: 다국가 법적 의무. Genshin Impact $20M 합의금 사례.
**Confidence**: regulatory-requirement
**Screen types**: gacha, shop
**Sources**: 한국/일본/중국 게임법, FTC 2025.9 규정, Genshin Impact 합의

## Rule: Irreversible Action Two-Step Confirmation

**Condition**: IF action is irreversible (item destruction, character deletion, premium purchase, high-value trade)
**Decision**: THEN require two-step confirmation: (1) initial button press opens modal, (2) modal shows explicit consequence description + distinct confirm button. Default focus on the safe option (cancel), NOT on the destructive action.
**Rationale**: NNGroup — confirmation should only appear for high-consequence actions to avoid dialog fatigue. 기본 포커스가 위험 행동에 있으면 실수 유발.
**Confidence**: academic-evidence + observed-convention
**Screen types**: forge, inventory, character, trade
**Sources**: NNGroup (Page Laubheimer), Zoltan Kollin (Smashing Magazine 2018), rv-gacha-006.md

## Rule: Confirmation Button Color Convention

**Condition**: IF confirmation dialog with proceed/cancel options
**Decision**: THEN use color coding: blue/teal for "proceed", red/muted brown for "cancel". Cancel button should be visually less prominent (muted color, smaller size or outline style).
**Rationale**: 색상으로 의미 전달. 진행=긍정 톤, 취소=부정 톤.
**Confidence**: observed-convention
**Screen types**: shop, forge, gacha, trade, inventory
**Sources**: Raven 2 (teal proceed / brown cancel), Lineage W (teal confirm / brown cancel)

## Rule: Item Lock / Favorite to Prevent Accidental Loss

**Condition**: IF item could be accidentally sold, destroyed, or used as material
**Decision**: THEN provide favorite/lock mechanism. Locked items cannot be sold, destroyed, or used as enhancement material without explicitly unlocking first. Optionally provide buyback window (undo) for recently sold items.
**Rationale**: WoW vendor buyback 시스템이 업계 표준으로 자리잡음. "실수로 팔았다"는 가장 흔한 플레이어 불만.
**Confidence**: observed-convention
**Screen types**: inventory, forge, shop
**Sources**: inventory.md (Rule #8: "Favorites to prevent accidental sale"), WoW buyback system

## Rule: Destruction Risk Warning

**Condition**: IF enhancement/upgrade has item destruction risk
**Decision**: THEN show destruction warning in red/orange text near the action button. Offer "destruction prevention" option if available (typically at 2-3x cost). Show the exact destruction probability alongside success probability.
**Rationale**: 아이템 파괴는 플레이어에게 가장 큰 감정적 손실. 명확한 경고 없이 파괴되면 이탈.
**Confidence**: regulatory-requirement + observed-convention
**Screen types**: forge
**Sources**: forge.md (MapleStory: destruction prevention at 3x cost), Legend of Ymir forge 분석

## Rule: Cost Preview Before Action

**Condition**: IF any action consumes resources (currency, materials, items)
**Decision**: THEN show full cost breakdown before the action button becomes active. Include: each material type + quantity needed, each currency type + amount needed, current balance vs required amount. Highlight insufficient resources in red.
**Rationale**: 비용을 모르고 행동하면 후회. 부족한 자원은 즉시 인지해야 불필요한 시도 방지.
**Confidence**: observed-convention
**Screen types**: forge, crafting, shop, skill_tree
**Sources**: 6개 게임 강화/제작 화면 공통 관찰
