# Function

Use Function constructor can create a Funtion object, every function in javascript is a Function object
```javascript
new Function([arg1[, arg2[, ...argN]]], functionBody)
```

Pay attention
1. 使用Function构造器生成的Function对象是在`函数创建时`解析的, 所以更加低效（与函数表达式和声明相比）
    - 函数表达式
    ```javascript
    function foo(){
        ...
    }
    ```
    - 函数声明
    ```javascript
    var foo = function() {
        ...
    }
    ```
    以上都是和其他代码一起解析的

2. 使用Function构造器生成的函数，并`不会在创建它们的上下文中创建闭包`；它们一般在`全局作用域`中被创建。当运行这些函数的时候，它们只能访问自己的`本地变量`和`全局变量`，不能访问Function构造器`被调用生成的上下文的作用域`。(这很重要)


## 一些例子
```javascript
const add = new Function('a', 'b', 'return a+b');
add(1, 2);  //3
```

用构造器创建的函数闭包在全局作用域
```javascript
// 1、f()函数返回的function e()是闭包.
var n = 1;
function f(){
    var n = 2;
    function e(){
        return n;
    }
    return e;
}
console.log (f()());               //2

// 2、f()函数返回的function e()是全局作用域函数
var n = 1;
function f(){
    var n = 2;
    var e = new Function("return n;");
    return e;
}
console.log (f()());                //1
```

