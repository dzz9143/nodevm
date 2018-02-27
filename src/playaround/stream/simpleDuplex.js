const { Duplex } = require('stream');

const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },

    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push(null);
        }
    }
});

inoutStream.currentCharCode = 65;
process.stdin.pipe(inoutStream).pipe(process.stdout);

const { Transform } = require('stream');

const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {    // has the write interface
    this.push(chunk.toString().toUpperCase());  // but can push for consume
    callback();
  }
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);