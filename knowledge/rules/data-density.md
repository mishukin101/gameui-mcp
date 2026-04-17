# Data Density & Progressive Disclosure (데이터 밀도 & 점진적 공개)

Domain: Information Architecture
Related screen types: inventory, equipment_enhance, collection, forge, shop, hud

## Rule: Item Card Stat Cap

**Condition**: IF displaying an item in a grid or list slot
**Decision**: THEN show at most 3 data points on the card (name, rarity border color, primary stat or combat power) and defer all secondary stats to a tap-to-open detail panel.
**Rationale**: 모바일 그리드 셀은 44-60pt. 3개 이상 데이터는 판독 불가. LW 인벤토리 그리드는 아이콘+수량+등급 테두리만 표시.
**Confidence**: observed-convention
**Screen types**: inventory, collection, equipment_enhance
**Sources**: LW lw-inventory-001, LOY loy-inventory-003, NNGroup Progressive Disclosure

## Rule: Detail Panel Progressive Reveal

**Condition**: IF player taps an item or equipment slot
**Decision**: THEN open a modal/overlay showing full stat block, enhancement history, and contextual actions (equip, disassemble, sell). Never inline-expand within the grid.
**Rationale**: 4개 게임 모두 아이템 상세에 오버레이 모달 사용. 인라인 확장은 그리드 리플로우 유발.
**Confidence**: observed-convention
**Screen types**: inventory, forge, equipment_enhance
**Sources**: LOY loy-inventory-003, NC nc-inventory-001

## Rule: Number Abbreviation Threshold

**Condition**: IF a numeric value exceeds 99,999
**Decision**: THEN abbreviate with locale-appropriate suffix (Korean: 만/억; international: K/M). Keep full comma-separated numbers below that threshold.
**Rationale**: LOY "108,776" 전투력, LW "36,614" 재화를 축약 없이 표시. 한국 MMORPG는 정확한 수치가 민맥싱에 중요하므로 서양 게임보다 축약 임계값이 높음.
**Confidence**: observed-convention
**Screen types**: hud, inventory, equipment_enhance, shop
**Sources**: LOY loy-inventory-001, LW lw-inventory-001

## Rule: Capacity Indicator Always Visible

**Condition**: IF inventory has capacity limits (slots or weight)
**Decision**: THEN show persistent capacity indicator (e.g., "96/200 slots", "19.2% weight") anchored to inventory panel edge. Do not hide behind a tap.
**Rationale**: LW (16/120 + 12% weight)와 LOY (96/200 + 19.2%) 모두 이중 용량 표시. 전리품 획득 여부 즉시 판단 필요.
**Confidence**: observed-convention
**Screen types**: inventory
**Sources**: LW lw-inventory-001, LOY loy-inventory-001

## Rule: Probability Placement Adjacent to Action

**Condition**: IF action has variable outcomes with known rates (forge, gacha)
**Decision**: THEN place probability values adjacent to (not separate from) the action button. Grade-level probabilities use color-coded tiers (gold=top, grey=lowest).
**Rationale**: 확률을 버튼에서 떨어뜨리면 플레이어가 비용 대비 성공률을 놓침. LOY 대장간 "상급 6%, 중급 24%, 기본 70%" 색상 구분 표시. (확률 공개 자체의 법적 의무는 confirmation-safeguards의 Enhancement Probability Display 참조)
**Confidence**: observed-convention
**Screen types**: forge, gacha, equipment_enhance
**Sources**: LOY loy-forge-003
