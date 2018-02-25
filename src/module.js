const vm = require('vm');

const code1 = `
    // module.exports = {}
    // console.log('this inside runInNewContext');
    // console.log('global inside runInNewContext', global);
    // console.log('process inside runInNewContext', procss);
    // console.log('hello');
    // const http = require('http');
    log('this:', this);
    // log('process:', process);
    // log('global:', global);
    log('console:', console);
`

vm.runInNewContext(code1, {
    log: console.log.bind(this),
});
// console.log('this', this);
// console.log('process', process);
