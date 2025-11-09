import { bgColors, colors, styles, ESC } from './ansi.js';

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const makeAnsi = (...codes) => (text) => `${ESC}${codes.join(';')}m${text}${ESC}${styles.reset}m`;

function createAnsi(currentCodes = []) {
  const builder = {};

  for (const [style, code] of Object.entries(styles)) {
    Object.defineProperty(builder, style, {
      get() {
        return createAnsi([...currentCodes, code]);
      },
    });
  }

  for (const [color, code] of Object.entries(colors)) {
    builder[color] = (text) => makeAnsi(...currentCodes, code)(text);
  }

  for (const [color, code] of Object.entries(bgColors)) {
    const name = `bg${color[0].toUpperCase() + color.slice(1)}`;
    builder[name] = (text) => makeAnsi(...currentCodes, code)(text);
  }

  builder.hex = (hex) => {
    const [r, g, b] = hexToRgb(hex);
    return (text) => makeAnsi(...currentCodes, `38;2;${r};${g};${b}`)(text);
  };

  builder.rgb = (r, g, b) => (text) => makeAnsi(...currentCodes, `38;2;${r};${g};${b}`)(text);

  builder.bgHex = (hex) => {
    const [r, g, b] = hexToRgb(hex);
    return (text) => makeAnsi(...currentCodes, `48;2;${r};${g};${b}`)(text);
  };

  builder.bgRgb = (r, g, b) => (text) => makeAnsi(...currentCodes, `48;2;${r};${g};${b}`)(text);

  return builder;
}

export const ansi = createAnsi();
