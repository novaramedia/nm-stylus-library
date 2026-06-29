# Code conventions — nm-stylus-library

Lightweight conventions for this design-system library. Stylus strips `//`
comments at compile time, so these cost nothing in shipped CSS.

## Doc headers

Each module, mixin, and component block gets a **one-line purpose comment**
directly above it (already the norm across `modules/*`). Keep it to one line.

```stylus
// Responsive aspect-ratio container for iframes / embeds (video, maps, etc.).
.ui-embed-container
  ...
```

## Deprecation comments

Mark any deprecated class / mixin / variable with a single-line comment
**directly above** the symbol:

```stylus
// @deprecated since vX.Y.Z → use <replacement>. Removed: vA.B.0
.old-thing
  ...
```

- `since` — the version that introduced the deprecation.
- `Removed:` — the version it will be deleted in. Default to the **next minor**
  (one-cycle deprecation window).
- When the comment can't sit directly above a single symbol (e.g. two selectors
  share one declaration block), name the deprecated symbol explicitly:

```stylus
// @deprecated since vX.Y.Z: .old-name → use .new-name. Removed: vA.B.0
.new-name, .old-name
  ...
```

> ⚠️ **Brace-syntax files use `/* … */`, not `//`.** In indentation-syntax
> `.styl` files (most of `modules/`), `//` line comments are stripped at
> compile time. But in files written in CSS-like **brace/`;` syntax** — notably
> `functions/grid-function-new.styl` — a `//` comment placed directly above an
> emitted rule **leaks into the compiled CSS**, where the `/` then breaks
> consumers' CSS minifiers (postcss-selector-parser: "Unexpected '/'"). In those
> files write the deprecation as a block comment, which compiles to a CSS comment
> the minifier strips, and keep the text ASCII (use `->`, not `→`):
>
> ```stylus
> /* @deprecated since vX.Y.Z: .old-name -> use .new-name. Removed: vA.B.0 */
> .new-name, .old-name { ... }
> ```
>
> (This caused the 0.14.0 → 0.14.1 build-break fix.) Still greppable on
> `@deprecated since`.

### Why this format

It is **greppable**, which lets the upstream/version-bump workflow find work
mechanically:

```bash
grep -rn "@deprecated since"        # every active deprecation
grep -rn "Removed: v0.15.0"         # everything due for deletion in 0.15.0
```

When cutting a release, grep `Removed: v<this-version>` and delete those symbols
+ their comments.

## Locally-scoped CSS variables for modifiers

When a base utility has colour/size variants, drive the varying property through
a **locally-scoped custom property** that the base sets as a default and
modifiers override. This makes a modifier work uniformly regardless of which
base helper it's paired with.

```stylus
.ui-rounded-box
  --ui-border-radius: var(--corner-radius)   // default
  border-radius: var(--ui-border-radius)
  &--nested
    --ui-border-radius: var(--corner-radius-large)   // override

// borders follow the same pattern with --ui-border-color
```
