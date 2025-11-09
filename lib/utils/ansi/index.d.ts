export type ColorName =
	| 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'gray';

export type BgColorName = ColorName;

export type StyleName =
	| 'reset'
	| 'bold'
	| 'dim'
	| 'italic'
	| 'underline'
	| 'inverse'
	| 'hidden'
	| 'strikethrough';

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

export const ansi: AnsiBuilder;

export {};
