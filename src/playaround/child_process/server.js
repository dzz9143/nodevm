const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
let visits = 0;
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    });
    visits += 1;
    const msg = `Visits: ${visits}`;
    res.end(msg);
    console.log(msg);
    if (visits === 5) {
        process.exit(0);
    }
});

server.listen(port, hostname, () => {
    console.log(`listen at http://${hostname}:${port}`);
});