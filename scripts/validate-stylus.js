#!/usr/bin/env node

const path = require('path');
const stylus = require('stylus');

const ROOT = path.join(__dirname, '..');
const VIRTUAL_FILENAME = path.join(ROOT, '__validate__.styl');

// Wrap entry with grid-maker calls so @css{} blocks are emitted and testable.
// Consuming projects call these at each breakpoint; without them the grid
// passthrough blocks are never rendered and // leaks go undetected.
const src = [
  `@import "index.styl"`,
  `grid-maker('xl')`,
  `grid-maker('l')`,
  `grid-maker('m')`,
  `grid-maker('s')`,
].join('\n');

console.log('Compiling index.styl (with grid-maker calls)...\n');

stylus(src)
  .set('filename', VIRTUAL_FILENAME)
  .set('paths', [ROOT])
  .render((err, css) => {
    if (err) {
      console.error('Stylus compilation failed:\n');
      console.error(err.message);
      process.exit(1);
    }

    // Detect // comments leaked into CSS output (invalid CSS, breaks minifiers).
    // These appear when // is used inside @css {} passthrough blocks.
    const lines = css.split('\n');
    const leaks = lines
      .map((line, i) => ({ line: i + 1, text: line }))
      .filter(({ text }) => /^\s*\/\//.test(text));

    if (leaks.length > 0) {
      console.error('Invalid // comments found in CSS output (use /* */ inside @css {} blocks):\n');
      leaks.forEach(({ line, text }) => console.error(`  Line ${line}: ${text.trim()}`));
      process.exit(1);
    }

    const kb = (css.length / 1024).toFixed(1);
    console.log(`Compiled successfully (${kb} KB output, no // leaks)\n`);
  });
