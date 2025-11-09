# Pigmy

Pigmy is a tiny, expressive terminal color helper for Node.js. It provides a fluent API
to colorize and style text for CLI output and ships TypeScript declaration files so
consumers get typing support.

## Install

Install from npm:

```powershell
npm install pigmy
```

## Usage

Pigmy works the same whether your project is JavaScript or TypeScript — here's a minimal example you can copy into your CLI script or project:

```js
import pigmy from 'pigmy';

console.log(pigmy.red('This is red text'));
console.log(pigmy.bold.cyan('Important'));
console.log(pigmy.hex('#C200FF')('Purple by hex'));
console.log(pigmy.rgb(255, 160, 0)('Orange by rgb'));

// chaining styles (getter-based):
console.log(pigmy.bold.underline.magenta('Bold, underlined, magenta'));
```

## API overview

- Color functions: `pigmy.black|red|green|yellow|blue|magenta|cyan|white|gray(text)`
- Background colors: `pigmy.bgBlack|bgRed|bgGreen|...` (same names with `bg` prefix)
- Styles (getter properties that return a new builder): `pigmy.bold`, `pigmy.italic`, `pigmy.underline`, `pigmy.reset`, etc. You can chain styles like `pigmy.bold.underline.red('...')`.
- Convenience color constructors:
	- `pigmy.hex('#rrggbb')(text)` — 24-bit color by hex
	- `pigmy.rgb(r,g,b)(text)` — 24-bit color by RGB
	- `pigmy.bgHex('#rrggbb')(text)`
	- `pigmy.bgRgb(r,g,b)(text)`

Examples:

```js
console.log(pigmy.hex('#00ff88')('Hex color'));
console.log(pigmy.bgHex('#001122')('Background with hex'));
console.log(pigmy.rgb(123,45,67)('RGB color'));
```

## TypeScript support

Pigmy ships declaration files (`dist/index.d.ts`) so TypeScript projects get types automatically
when you `import pigmy from 'pigmy'`.

If you author JS and use JSDoc, you can generate or update `.d.ts` files with `tsc` (requires TypeScript installed):

```powershell
npm run build:tsc
```

> Note: the package includes pre-built `.d.ts` declarations. The normal `npm run build` produces bundles in `dist/`
> and the repository stores `.d.ts` sources under `lib/` which are copied to `dist/` by the build.

## Testing the distributed bundle locally

There is a small test harness in `test/` to exercise the built bundles. From the project root:

```powershell
cd test
.\run-tests.ps1
```

Or run the test scripts individually with Node.

## Build & publish

Build the package (produces `dist/` and copies `.d.ts`):

```powershell
npm run build
```

## Development notes

- The published package includes ESM and CJS bundles and `dist/index.d.ts`.
- If you want to maintain automatic generation of `.d.ts` from JSDoc or JS sources, keep a local TypeScript install and use `npm run build:tsc`.

## Maintainers

- [Pscodium](https://github.com/Pscodium)

## License

MIT