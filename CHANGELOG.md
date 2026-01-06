# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- Added padding to backgrounded box elements
- Fixed camel case numeric splitting in variable generation
- Updated grid function to use new breakpoint variables
- Typography module now renders all type sizes
- Improved variable building script to handle numeric values in camelCase

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

## [0.10.0] - 2025-04-16

### Added

- Added margin `m` and padding `p`
- Added space maker classes to media queries

### Changed

- Minor updates for payment-novaramedia.com

## [0.9.0] - 2025-04-15

### Added

- Initialised library structure and base styles
