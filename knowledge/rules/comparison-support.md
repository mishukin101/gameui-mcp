# Comparison & Decision Support (비교 & 의사결정 지원)

Domain: Information Architecture
Related screen types: inventory, equipment_enhance, forge, character, shop

## Rule: Auto-Equip Recommendation

**Condition**: IF player opens inventory with unequipped items stronger than current gear
**Decision**: THEN show recommendation overlay with one-tap "equip all" action, selecting items by primary sort key (growth score / combat power).
**Rationale**: LOY loy-inventory-001 정확히 이 패턴 구현 — 최적 장비 추천 중앙 패널 + 단일 "장착" 버튼. 모바일에서 다단계 비교 부담 감소.
**Confidence**: observed-convention
**Screen types**: inventory, character
**Sources**: LOY loy-inventory-001

## Rule: Stat Delta with Directional Color

**Condition**: IF player is comparing a candidate item against current gear
**Decision**: THEN display stat deltas inline using green (+) for improvements and red (-) for downgrades, positioned directly next to each stat row.
**Rationale**: RPG 범용 관습. 명시적 델타로 암산 제거.
**Confidence**: observed-convention
**Screen types**: inventory, equipment_enhance, forge, character
**Sources**: Game UI Database, NC nc-inventory-001

## Rule: Before/After Preview for Enhancement

**Condition**: IF player is about to enhance, appraise, or upgrade
**Decision**: THEN show current stats on the left and projected outcome on the right (or above/below) in the same panel. Cost and success rate between them.
**Rationale**: LOY loy-forge-003 현재 아이템 좌측, 감정 액션 중앙 배치. 좌=현재/우=목표 레이아웃이 자연스러운 읽기 방향과 일치.
**Confidence**: observed-convention
**Screen types**: forge, equipment_enhance
**Sources**: LOY loy-forge-001, loy-forge-003

## Rule: Sort Controls at Grid Edge

**Condition**: IF item grid exceeds one screenful (~20+ items)
**Decision**: THEN place sort/filter control at top or bottom-right of grid with active criterion visible (e.g., "Grade descending").
**Rationale**: NC nc-inventory-001 "등급 내림차순" 정렬을 그리드 우하단에 배치. 현재 정렬 기준 라벨이 있어야 긴 목록 스크롤 시 혼란 방지.
**Confidence**: observed-convention
**Screen types**: inventory, collection, shop
**Sources**: NC nc-inventory-001, LOY loy-inventory-001
