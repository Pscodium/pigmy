import { ansi, colorize } from './utils/ansi/index.js';

export const colora = {
  red: (text: string) => colorize(text, ansi.red),
  green: (text: string) => colorize(text, ansi.green),
  yellow: (text: string) => colorize(text, ansi.yellow),
  blue: (text: string) => colorize(text, ansi.blue),
  magenta: (text: string) => colorize(text, ansi.magenta),
  cyan: (text: string) => colorize(text, ansi.cyan),
  white: (text: string) => colorize(text, ansi.white),
  bold: (text: string) => colorize(text, ansi.bold),
  underline: (text: string) => colorize(text, ansi.underline),
  bgRed: (text: string) => colorize(text, ansi.bgRed),
  bgGreen: (text: string) => colorize(text, ansi.bgGreen),
  bgBlue: (text: string) => colorize(text, ansi.bgBlue),

  success: (text: string) => colorize(text, ansi.green, ansi.bold),
  error: (text: string) => colorize(text, ansi.red, ansi.bold),
  warn: (text: string) => colorize(text, ansi.yellow, ansi.bold),
  info: (text: string) => colorize(text, ansi.cyan),
};
