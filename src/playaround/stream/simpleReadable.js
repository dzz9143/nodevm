const { Readable } = require('stream');

// const myReadableStream = new Readable({});
// myReadableStream.push('ABCD');
// myReadableStream.push('EFG');
// myReadableStream.push(null);    // signal that the stream does not have any more data
// myReadableStream.pipe(process.stdout);

const inStream = new Readable({
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push(null);
        }
    }
});

inStream.currentCharCode = 65;
inStream.pipe(process.stdout);