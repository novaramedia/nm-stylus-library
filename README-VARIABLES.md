# Variable Synchronization System

This library now includes a build system that synchronizes design system variables between Stylus and JavaScript, ensuring no mismatches between the two sources.

## How It Works

1. **Single Source of Truth**: All variables are defined in `variables.json`
2. **Build Process**: The build script (`scripts/build-variables.js`) reads `variables.json` and generates:
   - `variables.styl` - For Stylus usage in CSS
   - `variables.js` - For JavaScript usage

## Usage

### In Stylus/CSS

Variables are available as both Stylus variables and CSS custom properties:

```stylus
// Stylus variables (for breakpoints and constants)
@media screen and (max-width: $breakpoint-m)
  // styles here

// CSS custom properties (for runtime values)
.my-component
  background-color: var(--color-red)
  font-family: var(--font-family-sans)
```

### In JavaScript

```javascript
// ES6 imports
import { variables, cssVariableNames } from './variables.js';
// or
import variables from './variables.js';

// Access design tokens directly
const primaryColor = variables.colors.red; // '#FF1941'
const mediumBreakpoint = variables.breakpoints.m; // '910px'

// Get CSS custom property names for runtime access
const redColorVar = cssVariableNames.colors.red; // '--color-red'
const computedRed = getComputedStyle(document.documentElement)
  .getPropertyValue(redColorVar); // Gets the actual computed value

// Use with CSS-in-JS libraries
const styles = {
  backgroundColor: variables.colors.red,
  transition: `all ${variables.transitions.speedMedium} ease`
};
```

## Development Workflow

### Adding/Modifying Variables

1. Edit `variables.json` (the single source of truth)
2. Run `npm run build:variables` to regenerate Stylus and JavaScript files
3. The generated files will be automatically updated

### Build Process

The build script runs automatically:
- Before releases (`prerelease` hook)
- When you run `npm run build:variables`
- As part of the release process

### File Structure

```
├── variables.json          # Source of truth (edit this)
├── variables.styl          # Generated (do not edit)
├── variables.js            # Generated (do not edit)
└── scripts/
    └── build-variables.js  # Build script
```

## Important Notes

- **Never edit** `variables.styl` or `variables.js` directly - they are auto-generated
- Always edit `variables.json` and run the build script
- The build script automatically runs before releases
- CSS custom properties use kebab-case (e.g., `--color-red`)
- JavaScript properties use camelCase (e.g., `colors.red`)