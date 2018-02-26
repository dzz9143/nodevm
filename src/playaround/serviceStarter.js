const http = require('http');
const vm = require('vm');
const fs = require('fs');
const path = require('path');

const funcBody = fs.readFileSync(path.resolve(__dirname, 'testFuncBody'), 'utf-8');
const srcCode = `
    ((req, res) => {
        ${funcBody}
    })
`
const host = '127.0.0.1';
const port = 3000;
const listener = vm.runInNewContext(srcCode, Object.create(null));

const server = http.createServer(listener);

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});