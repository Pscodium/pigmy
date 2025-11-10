
# Pigmy

Pigmy — a tiny, expressive terminal color helper for Node.js.

Elegant, chainable APIs let you style CLI output with readable, composable calls. Pigmy ships TypeScript declarations so consumers get great typing out of the box.

## Why Pigmy?

- Minimal API surface, easy to learn. 
- Chainable getters for styles (e.g. `pigmy.bold.underline.red('text')`).
- 24-bit color helpers (hex / rgb) and background variants.
- Ships TypeScript declarations for excellent DX.

## Install

Install from npm:

```powershell
npm install pigmy
```

## Quick start

Works the same in JavaScript and TypeScript.

```js
import pigmy from 'pigmy';

console.log(pigmy.red('This is red text'));
console.log(pigmy.bold.cyan('Important'));
console.log(pigmy.hex('#C200FF')('Purple by hex'));
console.log(pigmy.rgb(255, 160, 0)('Orange by rgb'));

// Chaining styles (getter-based):
console.log(pigmy.bold.underline.magenta('Bold, underlined, magenta'));
```

## API at a glance

- Colors: `pigmy.black`, `pigmy.red`, `pigmy.green`, `pigmy.yellow`, `pigmy.blue`, `pigmy.magenta`, `pigmy.cyan`, `pigmy.white`, `pigmy.gray` — each accepts a string: `pigmy.red('text')`.
- Backgrounds: `pigmy.bgBlack`, `pigmy.bgRed`, `pigmy.bgGreen`, ... (same naming with `bg` prefix).
- Styles (getter properties returning a builder you can chain): `pigmy.bold`, `pigmy.italic`, `pigmy.underline`, `pigmy.reset`, etc.
- 24-bit color helpers:
	- `pigmy.hex('#rrggbb')('text')` — hex color
	- `pigmy.rgb(r, g, b)('text')` — RGB color
	- `pigmy.bgHex('#rrggbb')('text')` and `pigmy.bgRgb(r,g,b)('text')` for backgrounds

Examples:

```js
console.log(pigmy.hex('#00ff88')('Hex color'));
console.log(pigmy.bgHex('#001122')('Background with hex'));
console.log(pigmy.rgb(123,45,67)('RGB color'));
```

## Reference — Modifiers, Colors & Backgrounds

This section lists only the features implemented in the codebase. Pigmy also provides 24-bit helpers (`hex`, `rgb`, `bgHex`, `bgRgb`) and runtime registration methods (`addColor`, `addBgColor`, `addStyle`).

Modifiers (available as getter properties)
- `reset` — Reset the current style (used automatically by builders).
- `bold` — Make the text bold.
- `dim` — Make the text have lower opacity.
- `italic` — Make the text italic. (Not widely supported)
- `underline` — Put a horizontal line below the text. (Not widely supported)
- `inverse` — Invert background and foreground colors.
- `hidden` — Print the text but make it invisible.
- `strikethrough` — Put a horizontal line through the center of the text. (Not widely supported)

Colors (foreground)
- `black`
- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `gray`

Background colors
- `bgBlack`
- `bgRed`
- `bgGreen`
- `bgYellow`
- `bgBlue`
- `bgMagenta`
- `bgCyan`
- `bgWhite`

24-bit color helpers
- `hex('#rrggbb')('text')` — 24-bit foreground hex color
- `rgb(r, g, b)('text')` — 24-bit foreground RGB
- `bgHex('#rrggbb')('text')` — 24-bit background hex color
- `bgRgb(r, g, b)('text')` — 24-bit background RGB

Runtime API (on the `Pigmy` class)
- `addColor(name, code)` — register a new foreground color code; new name becomes available on future builders created with `createAnsi()`.
- `addBgColor(name, code)` — register a new background color (builders expose it as `bgName`).
- `addStyle(name, code)` — register a new style (getter) that can be chained.

Notes
- The default `pigmy` instance is created in `lib/index.ts` using `new Pigmy().createAnsi()`.
- Builders capture current style codes and return functions that wrap text in ANSI sequences and append the reset code.

## TypeScript support

Pigmy ships declaration files (`dist/index.d.ts`) so TypeScript projects get types automatically when you `import pigmy from 'pigmy'`.

If you maintain the project and prefer generating `.d.ts` from JSDoc/TS, run the TypeScript build locally:

```powershell
npm run build:tsc
```

> Note: The repository keeps source `.d.ts` under `lib/` and the published `dist/` contains the bundled JS and `index.d.ts`.

## Testing the distributed bundle locally

A small test harness lives in `test/` to exercise the built bundles. From the project root:

```sh
npm run build
```

Or run test scripts directly with Node (see `test/` for details).

## Build & publish

Build the package (produces `dist/` and copies `.d.ts`):

```powershell
npm run build
```

## Development notes

- The published package contains both ESM and CJS bundles and `dist/index.d.ts`.
- To regenerate `.d.ts` from sources, keep a local TypeScript install and run `npm run build:tsc`.

## License

MIT

## Maintainers

- Pscodium — https://github.com/Pscodium

