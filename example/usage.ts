/* eslint-disable @typescript-eslint/no-explicit-any */
import Pigmy, { pigmy } from '../lib/index';

console.log(pigmy.hex('#FF5733')('Example - hex #FF5733'));

console.log(pigmy.red('Example - red'));
console.log(pigmy.green('Example - green'));

console.log(pigmy.bold.yellow('Example - bold yellow'));
console.log(pigmy.underline.magenta('Example - underlined magenta'));
console.log(pigmy.italic.cyan('Example - italic cyan'));

console.log(pigmy.rgb(123, 45, 67)('Example - rgb(123,45,67)'));
console.log(pigmy.hex('#00CC66')('Example - hex #00CC66'));

console.log(pigmy.bold.bgYellow('Example - bold on yellow'));
console.log(pigmy.bgRgb(10, 100, 200)('Example - bgRgb(10,100,200)'));

console.log(pigmy.inverse.white('Example - inverse white'));
console.log(pigmy.bold.underline.red('Example - bold + underline + red'));

const raw = new Pigmy();
console.log('hexToRgb', raw.hexToRgb('#FF5733'));


const dyn = new Pigmy();
dyn.addColor('orange', '38;2;255;165;0');
dyn.addBgColor('orange', '48;2;255;165;0');

const custom = dyn.createAnsi();

console.log((custom as any).orange('Example - dynamic orange (foreground)'));
console.log((custom as any).bgOrange('Example - dynamic orange (background)'));

console.log(((custom.bold as any).orange)('Example - bold + dynamic orange'));
