# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Deprecation comments in `functions/grid-function-new.styl` used `//` line syntax, which (unlike the indentation-syntax modules) leaked into compiled CSS and broke consumers' CSS minifiers (`Unexpected '/'`). Converted to `/* … */` block comments. Documented the brace-syntax caveat in `CONVENTIONS.md`.

## [0.14.0] - 2026-06-29

### Added

- `$container-*` Stylus variables (`$container-xxl`…`$container-smax`) for use in `calc()` (and `@media` width queries for the length-valued ones; note `$container-s` is `98%`), mirroring the `--container-*` custom properties
- `.ui-button--gray` button modifier
- `.ui-border--gray-mid` border colour modifier
- `.ui-rounded-box--nested` (4px) modifier for nested colour-blocked boxes
- `.grid-row--nested` / `.grid-row--nested-tight` — canonical names for nested-grid negative margins
- `.ui-embed-container` responsive aspect-ratio embed container (default 16:9) with `--4-3` / `--1-1` ratio modifiers

### Changed

- `.ui-tag` dot indicator sized in `em` (`0.7em`) instead of `1cap` for cross-browser consistency
- `.ui-border`, `.ui-border-top`, `.ui-border-bottom`, `.ui-border-left` now use `--color-gray-light` (new grey) instead of `--color-gray-light-old`

### Fixed

- Corrected xxl container size variable
- `.text-overflow-ellipsis` now uses valid `white-space` + `overflow` + `text-overflow` (was invalid `overflow: ellipsis`)
- `.grid-item` now explicitly declares `box-sizing: border-box` for resilience when imported without the full reset

### Deprecated

- `.ui-rounded-image` → use `.ui-rounded-box`; removed in v0.15.0
- `.ui-rounded-box--large` → use `.ui-rounded-box--nested`; removed in v0.15.0
- `.grid--nested` / `.grid--nested-tight` → use `.grid-row--nested(-tight)`; removed in v0.15.0
- `.u-video-embed-container` / `.ui-responsive-video-container` → use `.ui-embed-container`; removed in v0.15.0

## [0.13.0] - 2026-02-09

### Added

- Container size variables: `--container-xxl`, `--container-xl`, `--container-l`, `--container-m`, `--container-s`, `--container-s-max`
- New font family variable: `--font-family-sans-condensed` (Helvetica Neue LT Pro Condensed)
- New `modules/lists.styl` module with inline action list styles
- `.ui-responsive-video-container` component in UI module for responsive iframes
- Documentation header comments on all modules and functions

### Changed

- Updated `--font-family-sans` to use Helvetica Neue LT Pro as primary webfont
- `.only-desktop` now uses `!important` to prevent override conflicts
- Replaced `$margin-tiny` reference in typography with explicit `0.5rem`

## [0.12.0] - 2026-01-06

### Added

- Variables are generated from .json config and available as .js export as well as .styl
- development/color-palette.html display of colors from variables file
- New `modules/base.styl` module with display helpers (only-mobile, only-desktop, display-s-block)
- New `modules/carousel.styl` module with Swiper pagination and navigation button styles
- New UI component: `.ui-boxed-title` with color variants (white, gray)
- Additional UI dot color variants: `--red-300`, `--pink`, `--gray`
- New button variant: `--slimline` for more compact buttons
- Red color scale (red-100 through red-900) for extended color palette
- New corner radius variable: `--corner-radius-large` (4px)
- New color variable: `--color-pink` (#FF19B4)
- Updated `--color-acfm-pink` to match new pink color (#FF19B4)
- New gray colors: `--color-gray-base`, `--color-gray-mid`, `--color-gray-mid-new`
- Background utility classes: `.background-gray-base`, `.background-gray-mid`

### Changed

- Renamed gray colors to arrive at 3 functional grays: base, mid and light
- Extended type scale with 4 larger sizes
- Updated spacing module to use breakpoint variables for media queries
- Refactored rounded box classes in UI module
- Added padding helper for backgrounded box elements
- Updated grid function to use new breakpoint variables
- Typography module now renders all type sizes

### Deprecated

- `.background-gray` (use `.background-gray-base` or `.background-gray-mid` instead)
- `.background-light-gray` (use updated gray variants)
- `.background-green-neon`, `.background-light-blue`, `.background-teal` marked as deprecated
- `--color-gray-light-old` (replaced by new gray system)

### Removed

- --color-gray-extra-light, --color-gray-transparent, --color-gray-light-old-transparent

### Fixed

- For loop length bug in grid function
- Typo fixes and linting improvements

## [0.11.0] - 2025-07-18

### Added

- Meyer reset and modern-normalise inside the project
- Single entry index.styl
- Documentation for release flow
- release-it scripting

### Changed

- Implmentation of corner radius for buttons
- Spacing unit for letter-spacing in the font size generator
- List items (`ul`, `ol`) inside `.text-copy` now use `--font-family-serif` matching paragraph copy

## [0.10.0] - 2025-04-16

### Added

- Added margin `m` and padding `p`
- Added space maker classes to media queries

### Changed

- Minor updates for payment-novaramedia.com

## [0.9.0] - 2025-04-15

### Added

- Initialised library structure and base styles
