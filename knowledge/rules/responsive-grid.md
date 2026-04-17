# Responsive Grid & Slot Systems (반응형 그리드 & 슬롯)

Domain: Layout
Related screen types: inventory, collection, shop, crafting

## Rule: Grid Column Count by Device

**Condition**: IF displaying an item grid (inventory, collection, mount list)
**Decision**: THEN use 5-6 columns on phones (landscape ~540-640pt width) and 8-10 columns on tablets. Split-panel layouts (list+detail) use 2-3 columns in the constrained side.
**Rationale**: NC nc-inventory-001 마운트 그리드 우측 패널에 2열. 풀스크린 인벤토리는 5-6열이 표준. 아이콘 가독성과 용량 표시 균형.
**Confidence**: observed-convention
**Screen types**: inventory, collection, shop
**Sources**: nc-inventory-001, rv-collection-001

## Rule: Minimum Tappable Slot Size

**Condition**: IF rendering grid slots that player must tap to select
**Decision**: THEN enforce minimum 44×44pt (132×132px @3x). For item grids with detailed icons (rarity borders, stack counts, lock badges), target 52-60pt per slot.
**Rationale**: Apple HIG 44pt 최소 기준. 한국 MMORPG 아이템은 등급 테두리, 강화 수치, 수량 뱃지, 잠금 아이콘 등 밀도 높은 시각 정보 포함.
**Confidence**: regulatory-requirement
**Screen types**: inventory, collection, shop, crafting
**Sources**: Apple HIG Layout, LW lw-collection-001, NC nc-collection-001

## Rule: Fixed Column Count with Adaptive Slot Sizing

**Condition**: IF grid must work across phone and tablet screen widths
**Decision**: THEN fix column count per breakpoint (phone=5, tablet=8) and let slot size scale to fill available width with uniform 4-8pt gutters. Do not use fixed pixel slot size that creates orphan columns.
**Rationale**: 관찰된 한국 MMORPG 그리드는 화면 내 균일 슬롯 크기 사용. 적응형 슬롯 크기가 넓은 기기에서 공간 낭비 방지.
**Confidence**: observed-convention
**Screen types**: inventory, collection, shop
**Sources**: rv-collection-001, nc-inventory-001, Material Design Grid

## Rule: Sparse Grid Visual Density

**Condition**: IF item grid is less than 50% full
**Decision**: THEN show empty slots as dimmed outlines (not invisible) to communicate total capacity. Display fill counter (e.g., "12/60") near grid header. Do not collapse empty rows.
**Rationale**: NC nc-collection-001 "2/899" 표시, 미수집 아이템 어둡게 표시. 빈 슬롯이 보여야 용량 한계와 수집 진행도 전달 — 한국 MMORPG 핵심 동기 루프.
**Confidence**: observed-convention
**Screen types**: inventory, collection
**Sources**: nc-collection-001, nc-inventory-001, lw-collection-001
