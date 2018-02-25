const vm = require('vm');
const util = require('util');

const sandbox = {
    x: 1,
    y: 2,
};

vm.createContext(sandbox);

const code1 = `
    x = x + 10;
    y = y * 2;
`

const code2 = `
    x -= 5;
    y -= 5;
`

// different code but same context
vm.runInContext(code1, sandbox);
console.log(util.inspect(sandbox));
vm.runInContext(code2, sandbox);
console.log(util.inspect(sandbox));

