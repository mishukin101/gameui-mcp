# Safe Zones & Device Adaptation (세이프 존 & 기기 적응)

Domain: Layout
Related screen types: hud, inventory, collection, settings, all

## Rule: Notch and Dynamic Island Exclusion Zone

**Condition**: IF the device has a notch or Dynamic Island (top safe-area-inset >= 44pt)
**Decision**: THEN reserve at minimum 62pt from the top edge and 34pt from the bottom edge for UI-free space. Use `env(safe-area-inset-*)` or platform equivalents at runtime.
**Rationale**: iPhone 16/17 models report top insets of 59-68pt. Android punch-holes vary 30-48pt. 노치 근처 탭은 오작동 유발.
**Confidence**: platform-guideline
**Screen types**: hud, inventory, collection, settings
**Sources**: Apple HIG Layout, iOS Safe Area Guide

## Rule: Landscape-Only Orientation Lock

**Condition**: IF Korean/Japanese 3D MMORPG with real-time combat
**Decision**: THEN lock to landscape orientation only. Design for primary aspect range 16:9 (1920x1080) through 20:9 (2400x1080), with 21:9 as stretch target.
**Rationale**: Lineage W, Night Crows, Raven 2, Legend of Ymir 모두 가로 고정. 세로 MMORPG는 극히 드묾. 스킬바와 미니맵에 넓은 수평 공간 필요.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: NC nc-hud-001, LW lw-collection-001

## Rule: Edge Margin Minimum

**Condition**: IF placing tappable UI elements near screen edges
**Decision**: THEN maintain at least 16pt side margins for interactive elements, and 32pt bottom padding above home indicator zone. Use `max(16pt, env(safe-area-inset-*))`.
**Rationale**: 화면 가장자리 탭은 시스템 제스처(iOS 스와이프, Android 제스처 내비게이션)와 충돌.
**Confidence**: academic-evidence
**Screen types**: hud, inventory, settings, shop
**Sources**: Apple HIG, Night Crows / Raven 2 버튼 마진 관찰

## Rule: Foldable and Ultra-Wide Letterboxing

**Condition**: IF device aspect ratio exceeds 21:9 (foldable inner screen, ultra-wide)
**Decision**: THEN clamp gameplay viewport to 21:9 maximum and letterbox with themed borders. Allow HUD elements to extend into extra margin if desired.
**Rationale**: 3D 뷰포트가 극단적 비율에서 왜곡. 한국 MMORPG 중 폴더블 내부 화면 최적화 사례 없음.
**Confidence**: observed-convention
**Screen types**: hud
**Sources**: Apple HIG Layout
