/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { Pigmy } from '../lib/pigmy';

const ESC = "\x1b[";

describe('Pigmy - ansi builder', () => {
  it('hexToRgb converts hex string to rgb tuple', () => {
    const p = new Pigmy();
    expect(p.hexToRgb('#ff0000')).toEqual([255, 0, 0]);
    expect(p.hexToRgb('00ff00')).toEqual([0, 255, 0]);
  });

  it('creates basic color codes', () => {
    const p = new Pigmy();
    const c = p.createAnsi();
    expect(c.red('x')).toBe(`${ESC}31mx${ESC}0m`);
    expect(c.gray('hi')).toBe(`${ESC}90mhi${ESC}0m`);
  });

  it('applies styles then color (chaining)', () => {
    const p = new Pigmy();
    const c = p.createAnsi();
    const out = c.bold.red('ok');
    // bold = 1, red = 31 -> codes should be 1;31
    expect(out).toBe(`${ESC}1;31mok${ESC}0m`);
  });

  it('supports rgb and hex color builders for fg and bg', () => {
    const p = new Pigmy();
    const c = p.createAnsi();
    expect(c.hex('#ff00ff')('a')).toBe(`${ESC}38;2;255;0;255ma${ESC}0m`);
    expect(c.rgb(1, 2, 3)('b')).toBe(`${ESC}38;2;1;2;3mb${ESC}0m`);
    expect(c.bgHex('#010203')('c')).toBe(`${ESC}48;2;1;2;3mc${ESC}0m`);
    expect(c.bgRgb(4, 5, 6)('d')).toBe(`${ESC}48;2;4;5;6md${ESC}0m`);
  });

  it('allows adding new colors/styles at runtime', () => {
    const p = new Pigmy();
    p.addColor('foo', 91);
    const b = p.createAnsi();
    expect((b as any).foo('z')).toBe(`${ESC}91mz${ESC}0m`);

  p.addStyle('blink', 5);
  // builders capture styles at creation time, so create a fresh builder after adding style
  const b2 = p.createAnsi();
  const chained = (b2 as any).blink.red('y');
  expect(chained).toBe(`${ESC}5;31my${ESC}0m`);
  });
});
