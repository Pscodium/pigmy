// ESM test: importa o bundle ESM em dist/index.js
import pigmy, { pigmy as named } from '../dist/index.js';

console.log('ESM default -> red:', pigmy.red('this is red'));
console.log('ESM named  -> blue:', named.blue('this is blue'));
console.log('ESM hex    -> hex:', pigmy.hex('#ff8800')('this is hex orange'));

// demonstrate chained styles
console.log('ESM chained ->', pigmy.bold.underline.magenta('bold underline magenta'));
