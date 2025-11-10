/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import { bgColors, colors, styles, ESC, BgColorName, ColorName, StyleName } from './ansi';

export type AnsiCode = string | number;

export type PigmyBuilder = {
	[K in ColorName]: (text: string) => string;
} & {
	[K in BgColorName as `bg${Capitalize<K>}`]: (text: string) => string;
} & {
	[K in StyleName]: PigmyBuilder;
} & {
	hex(hex: string): (text: string) => string;
	rgb(r: number, g: number, b: number): (text: string) => string;
	bgHex(hex: string): (text: string) => string;
	bgRgb(r: number, g: number, b: number): (text: string) => string;
};

export type PigmyProps = {
    createAnsi: (currentCodes?: AnsiCode[]) => PigmyBuilder;
    hexToRgb: (hex: string) => [number, number, number];
    addColor: (name: string, code: AnsiCode) => void;
    addBgColor: (name: string, code: AnsiCode) => void;
    addStyle: (name: string, code: AnsiCode) => void;
}

export class Pigmy implements PigmyProps {
    constructor() {}

    // instance-level maps so users can register new color/style names at runtime
    private colors: Record<string, AnsiCode> = { ...colors };
    private bgColors: Record<string, AnsiCode> = { ...bgColors };
    private styles: Record<string, AnsiCode> = { ...styles };

    private makeAnsi(...codes: AnsiCode[]) {
        return (text: string) => `${ESC}${codes.join(';')}m${text}${ESC}${this.styles.reset}m`;
    }

    addColor(name: string, code: AnsiCode) {
        this.colors[name] = code;
    }

    addBgColor(name: string, code: AnsiCode) {
        this.bgColors[name] = code;
    }

    addStyle(name: string, code: AnsiCode) {
        this.styles[name] = code;
    }

    hexToRgb(hex: string): [number, number, number] {
        const clean = hex.replace('#', '');
        const bigint = parseInt(clean, 16);
        return [ (bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255 ];
    }

    createAnsi(currentCodes: AnsiCode[] = []): PigmyBuilder {
        const builder: Partial<PigmyBuilder> = {};

        const styleEntries = Object.entries(this.styles) as Array<[string, AnsiCode]>;
        for (const [style, code] of styleEntries) {
            Object.defineProperty(builder, style, {
                get: () => this.createAnsi([...currentCodes, code]),
                enumerable: true,
                configurable: true,
            });
        }

        const colorEntries = Object.entries(this.colors) as Array<[string, AnsiCode]>;
        for (const [color, code] of colorEntries) {
            (builder as any)[color] = (text: string) => this.makeAnsi(...currentCodes, code)(text);
        }

        const bgEntries = Object.entries(this.bgColors) as Array<[string, AnsiCode]>;
        for (const [color, code] of bgEntries) {
            const name = `bg${color[0].toUpperCase() + color.slice(1)}`;
            (builder as any)[name] = (text: string) => this.makeAnsi(...currentCodes, code)(text);
        }

        builder.hex = (hex: string) => {
            const [r, g, b] = this.hexToRgb(hex);
            return (text: string) => this.makeAnsi(...currentCodes, `38;2;${r};${g};${b}`)(text);
        };

        builder.rgb = (r: number, g: number, b: number) => (text: string) => this.makeAnsi(...currentCodes, `38;2;${r};${g};${b}`)(text);

        builder.bgHex = (hex: string) => {
            const [r, g, b] = this.hexToRgb(hex);
            return (text: string) => this.makeAnsi(...currentCodes, `48;2;${r};${g};${b}`)(text);
        };

        builder.bgRgb = (r: number, g: number, b: number) => (text: string) => this.makeAnsi(...currentCodes, `48;2;${r};${g};${b}`)(text);

        return builder as PigmyBuilder;
    }
}
