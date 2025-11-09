# Pigmy

Pigmy is a small, expressive terminal color helper for Node.js. It provides a set of convenient functions to colorize and style text for CLI output.

## Install

Install from npm:

```bash
npm install pigmy
```

## Quick usage

Pigmy exports a `pigmy` helper with pre-built color and style functions.

ES module example:

```js
import { pigmy } from 'pigmy';

console.log(pigmy.red('This is red text'));
console.log(pigmy.success('Operation completed'));
console.log(pigmy.bold('Important'));
```

CommonJS example (when using require):

```js
const { pigmy } = require('pigmy');

console.log(pigmy.info('Here is some info'));
console.log(pigmy.error('Something went wrong'));
```

## API (short)

- `pigmy.red(text)` — red text
- `pigmy.green(text)` — green text
- `pigmy.yellow(text)` — yellow text
- `pigmy.blue(text)` — blue text
- `pigmy.magenta(text)` — magenta text
- `pigmy.cyan(text)` — cyan text
- `pigmy.white(text)` — white text
- `pigmy.bold(text)` — bold styling
- `pigmy.underline(text)` — underlined text
- `pigmy.bgRed(text)` / `pigmy.bgGreen(text)` / `pigmy.bgBlue(text)` — background colors

Convenience methods:

- `pigmy.success(text)` — bold green (for success messages)
- `pigmy.error(text)` — bold red (for error messages)
- `pigmy.warn(text)` — bold yellow (for warnings)
- `pigmy.info(text)` — cyan (for informational messages)

## TypeScript

Pigmy ships TypeScript types. You can import and get typed helpers in TS projects.

## Build

The project is written in TypeScript. To build locally (produces `dist/`):

```bash
npm run build
```

## License

MIT