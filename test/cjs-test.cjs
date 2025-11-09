// CJS test: require o bundle CommonJS em dist/index.cjs
const mod = require('../dist/index.cjs');
const pigmy = mod.pigmy || mod.default || mod;

console.log('CJS -> green:', pigmy.green('this is green'));
console.log('CJS -> bgRed:', pigmy.bgRed('background red'));
console.log('CJS -> rgb:', pigmy.rgb(123, 45, 67)('this is rgb'));

// chained styles
console.log('CJS chained ->', pigmy.italic.yellow('italic yellow'));
