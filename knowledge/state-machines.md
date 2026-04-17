# Screen Type State Machines (화면 유형별 상태 머신)

Mobile MMORPG 주요 화면의 전형적인 상태 전이 흐름.

## Forge / Enhancement

**Screen type**: forge, equipment_enhance
**Flow**: Select Item → View Stats/Probability → Select Materials → Confirm Cost → Execute Animation → Result (Success/Fail) → Loop or Exit
**Error states**: insufficient materials, insufficient currency, item locked, max level reached
**Notes**: Legend of Ymir adds "Auto Appraisal" with condition-setting for automated loops.

## Inventory

**Screen type**: inventory
**Flow**: Browse Grid → Select Item → Action Menu Popup → Sub-action (equip/enhance/sell/details) → Confirm if destructive → Feedback
**Error states**: full inventory, level-locked item, bound item (cannot trade/sell)

## Shop / Purchase

**Screen type**: shop
**Flow**: Browse Categories (sidebar) → Select Product → View Details + Price → Purchase Confirm (modal) → Result → Return
**Notes**: Max 2 taps to completion after reaching shop.

## Gacha / Summon

**Screen type**: gacha
**Flow**: Hub Selection (type cards) → Banner Selection → Pull Type (1x/10x) → Confirm Cost → Pull Animation (color signals rarity) → Result Reveal (ceremony) → Collect
**Notes**: Rarity escalation animation — common = subtle, legendary = dramatic full-screen.
