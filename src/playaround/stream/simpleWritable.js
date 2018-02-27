const { Writable } = require('stream');

const myWritableStream = new Writable({
    write(chunk, encoding, cb) {
        console.log('received chunk: ', chunk.toString());
        cb();
    }
});

// process.stdin.pipe(process.stdout);
process.stdin.pipe(myWritableStream);