import { bgColors, colors, styles, ESC } from "./ansi.js";

const hexToRgb = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

type ColorName = keyof typeof colors;
type BgColorName = keyof typeof bgColors;
type StyleName = keyof typeof styles;

export type AnsiBuilder = {
  [K in ColorName]: (text: string) => string;
} & {
  [K in BgColorName as `bg${Capitalize<K>}`]: (text: string) => string;
} & {
  [K in StyleName]: AnsiBuilder;
} & {
  hex(hex: string): (text: string) => string;
  rgb(r: number, g: number, b: number): (text: string) => string;
  bgHex(hex: string): (text: string) => string;
  bgRgb(r: number, g: number, b: number): (text: string) => string;
};

const makeAnsi = (...codes: (string | number)[]) => (text: string) =>
  `${ESC}${codes.join(";")}m${text}${ESC}${styles.reset}m`;

function createAnsi(currentCodes: number[] = []): AnsiBuilder {
  const builder: any = {};

  for (const [style, code] of Object.entries(styles)) {
    Object.defineProperty(builder, style, {
      get() {
        return createAnsi([...currentCodes, code]);
      },
    });
  }

  for (const [color, code] of Object.entries(colors)) {
    builder[color] = (text: string) =>
      makeAnsi(...currentCodes, code)(text);
  }

  for (const [color, code] of Object.entries(bgColors)) {
    const name = `bg${color[0].toUpperCase() + color.slice(1)}`;
    builder[name] = (text: string) =>
      makeAnsi(...currentCodes, code)(text);
  }

  builder.hex = (hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    return (text: string) =>
      makeAnsi(...currentCodes, `38;2;${r};${g};${b}`)(text);
  };

  builder.rgb = (r: number, g: number, b: number) =>
    (text: string) =>
      makeAnsi(...currentCodes, `38;2;${r};${g};${b}`)(text);

  builder.bgHex = (hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    return (text: string) =>
      makeAnsi(...currentCodes, `48;2;${r};${g};${b}`)(text);
  };

  builder.bgRgb = (r: number, g: number, b: number) =>
    (text: string) =>
      makeAnsi(...currentCodes, `48;2;${r};${g};${b}`)(text);

  return builder;
}

export const ansi: AnsiBuilder = createAnsi();