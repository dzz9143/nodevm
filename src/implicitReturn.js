const vm = require('vm');

const code1 = `
var a = 10;
var b = 15;
var c = a + b;
`;

const result1 = vm.runInNewContext(code1);
console.log(result1);   //undefined

// mind the difference between code2 and code1
const code2 = `
var a = 10;
var b = 15;
a + b;
`;
const result2 = vm.runInNewContext(code2);
console.log(result2);   //25

const code3 = `
var arr = [1, 2];
arr;
`
const result3 = vm.runInNewContext(code3);
console.log(result3);   //[1, 2]

const code4 = `
5
`
const result4 = vm.runInNewContext(code4);
console.log(result4);   //5

const code5 = `
[1, 'hello']
`
const result5 = vm.runInNewContext(code5);
console.log(result5);   //[1, 'hello']

// mind this special case when you want to implicitly return an object
const code6 = `
{
    a: 'b'
}
`
const result6 = vm.runInNewContext(code6);
console.log(result6);   // b
console.log(result6.a); // undefined

// mind the difference between this and code6
const code7 = `
var obj = {
    a: 'b'
}
obj;
`
const result7 = vm.runInNewContext(code7);
console.log(result7);   // {a: 'b'}
console.log(result7.a); // b


// what about function
const code8 = `
function foo() {
    return 10;
}
`
const result8 = vm.runInNewContext(code8);
console.log(typeof result8);    // undefined

const code9 = `
function foo() {
    return 10;
}
foo;
`
const result9 = vm.runInNewContext(code9);
console.log(typeof result9);    // function
console.log(result9()); //10

// please compare the difference between code10, code9 and code8
const code10 = `
(function foo() {
    return 'code10';
})
`
const result10 = vm.runInNewContext(code10);
console.log(typeof result10);    // function
console.log(result10()); // code10

const code11 = `
((a, b) => {
    return a + b + 10;
})
`
const result11 = vm.runInNewContext(code11);
console.log(typeof result11);   // function
console.log(result11(1, 3));    // 14

const code12 = `
((fs) => {
    return fs.readFileSync('src/testData', 'utf-8');
})
`
const result12 = vm.runInNewContext(code12);
const fs = require('fs');
console.log(result12(fs));  //hello world

const code13 = `
((require) => {
    var fs = require('fs');
    return fs.readFileSync('src/testData', 'utf-8');
})
`
const result13 = vm.runInNewContext(code13);
console.log(result13(require));  //hello world
