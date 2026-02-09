# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Novara Media's shared Stylus CSS design system library. Consumed as an npm dependency by NM web products (primarily the WordPress theme at novaramedia.com). This is the single source of truth for the NM web design system in code.

Not published to npm — installed via git reference. Releases create GitHub draft releases via `release-it` which are manually published on Github.

## Commands

```bash
npm test                    # Validates variables.json ↔ variables.styl ↔ variables.js sync
npm run build:variables     # Regenerate variables.styl and variables.js from variables.json
npm run release             # Release (must be on main, runs build:variables first)
npm run release:dry         # Dry-run release
```

There is no CSS compilation step in this repo — Stylus files are compiled by consuming projects.

Each module has documentation in its header comments describing available classes, functions, and usage. These comments are stripped during Stylus compilation so add no weight to production output.

## Architecture

### Variable Synchronization System

Design tokens live in three synchronized files generated from a single source:

- `variables.json` — **edit this file only** (source of truth)
- `variables.styl` — **auto-generated**, do not edit
- `variables.js` — **auto-generated**, do not edit

`scripts/build-variables.js` reads `variables.json` and generates both output files. `scripts/validate-variables.js` checks they're in sync (this is the `npm test` target).

Naming conventions in generated output:
- Stylus breakpoints become `$breakpoint-{size}` variables (used in media queries)
- CSS custom properties use `--{category}-{kebab-case-name}` on `html`
- JS exports use camelCase with `variables` and `cssVariableNames` named exports

Typography font stacks are hardcoded in the build script (not in variables.json).

### Stylus Module Structure

`index.styl` is the single entry point, importing in dependency order:

1. **Resets** — Meyer reset + modern-normalize
2. **Variables** — CSS custom properties and Stylus variables
3. **Functions** — `grid-function-new.styl` (24-column flex grid generator with `grid-maker()`)
4. **Utilities** — `helpers.styl` (accessibility helpers, video embeds, display utilities)
5. **Modules** — base, layout, spacing, typography, backgrounds, ui, carousel

### Key Patterns

**Responsive breakpoints** (mobile-first `max-width`): `s` (759px), `m` (910px), `l` (1104px), `xl` (1408px). Used as Stylus variables in `@media` queries throughout modules.

**Typography scale**: 15-step font size system with two scales (large for desktop, small for mobile). Classes like `.font-size-{n}` where `.font-size-10` maps to 1rem (the root size). Responsive variants: `.font-size-{breakpoint}-{n}`. The `font-size-maker()` and `font-size-single()` functions in `modules/typography.styl` generate these.

**Spacing system**: `spacer-maker()` in `modules/spacing.styl` generates margin/padding utility classes (`.m-0` through `.m-12`, `.mt-0`, `.p-0`, etc.) with responsive variants (`.mt-s-0`, `.p-m-3`).

**Grid system**: Dual grid approach — CSS Grid (`.layout-grid`, 24-column) and Flexbox (`.grid-row` + `.is-{breakpoint}-{cols}`). The flex grid uses `grid-maker()` to generate column/offset classes.

**UI components**: `modules/ui.styl` uses a `formElementBase()` mixin for buttons/inputs with BEM-style modifiers (`--red`, `--small`, `--slimline`).

## Development Workflow

When developing locally for a consuming project: delete the `nm-stylus-library` folder inside the consumer's `node_modules` and clone this repo in its place.

Components are typically developed inside the consuming project first, then upstreamed here once stable.

## Release Process

1. Checkout `main`
2. `npm run release` (builds variables, bumps version, tags, creates draft GitHub release)
3. Review and publish the draft release on GitHub
4. Update package references in consuming projects
