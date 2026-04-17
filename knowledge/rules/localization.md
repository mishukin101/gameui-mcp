# Localization & Cultural Adaptation (현지화 & 문화 적응)

Domain: System Context
Related screen types: all

## Rule: KR-to-EN Text Expansion Budget

**Condition**: IF designing UI text containers that will be localized from Korean to English
**Decision**: THEN allocate 30-40% additional horizontal space for English text, or use auto-truncation with ellipsis at container boundary.
**Rationale**: 한국어는 음절 문자로 압축적. "강화"(2자) → "Enhance"(7자). 4개 게임 한국어 라벨이 영어 전환 시 오버플로우.
**Confidence**: academic-evidence
**Screen types**: all
**Sources**: W3C i18n Text Size Guide (w3.org/International/articles/article-text-size), IBM Globalization Text Expansion table

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

## Rule: RTL Language Mirror Support

**Condition**: IF localizing to RTL languages (Arabic, Hebrew)
**Decision**: THEN mirror the entire UI layout — navigation, sidebars, progress direction, back arrows all flip horizontally. Numbers remain LTR. Icons that imply direction (arrows, play buttons) flip; icons that don't (gear, home) stay.
**Rationale**: RTL 시장은 모바일 게임 성장 지역이지만 단순 텍스트 번역만으로는 UX 파괴. 거울 대칭이 표준.
**Confidence**: platform-guideline
**Screen types**: all
**Sources**: Material Design RTL guidelines, Apple HIG RTL

## Rule: CJK Font Fallback Stack

**Condition**: IF designing UI that will display Korean, Japanese, and Chinese (Simplified + Traditional)
**Decision**: THEN define a font fallback stack per language (e.g., Korean: "Noto Sans KR" → "Malgun Gothic" → system-ui; Chinese: "Noto Sans SC" → "PingFang SC"). Do not rely on a single pan-CJK font — glyph variants differ.
**Rationale**: CJK 통합 한자(Unicode Unification) 때문에 동일 코드포인트가 언어별로 다른 glyph. 중국어 폰트로 한국어 렌더링 시 어색한 글자 출력.
**Confidence**: platform-guideline
**Screen types**: all
**Sources**: Unicode CJK Unification technical notes, W3C CSS font-family

## Rule: Locale-Specific Date and Number Format

**Condition**: IF displaying dates, times, or formatted numbers
**Decision**: THEN use platform locale formatters (Intl API on web, NSDateFormatter/DateFormat on native). Never hardcode "2026-04-17" or "1,234" — let the locale decide.
**Rationale**: 한국(YYYY-MM-DD, 쉼표 천단위), 유럽(DD/MM/YYYY, 점 천단위), 미국(MM/DD/YYYY, 쉼표 천단위) 모두 다름. 하드코딩은 혼란 유발.
**Confidence**: platform-guideline
**Screen types**: all
**Sources**: ECMAScript Intl API, Unicode CLDR
