# the module system and the pattern

The problem of JavaScript: the `lack of namespacing`

## The revealing module pattern
```javascript
var module = (function() {
    var privateFunc = function() { ... }
    var privateVar = 1;

    var export = {
        publicFoo: function(){...},
        publicBar: []
    }

    return export;
})()
``` 

## nodejs module explained
nodejs module system is built on top of commonjs module, with the addition of some custom extensions

```javascript
function loadModule(filename, module, require) {
    var wrappedSrc = `
        (function(module, exports, require){
            ${fs.readFileSync(filename, 'utf-8')}
        })(module, module.exports, require)
    `;
    eval(wrappedSrc);
}
```

now the require function
```javascript
var require = function(moduleName) {
    //resolve the full path of the module, which implements a speci c resolving algorithm
    var id = require.resolve(moduleName);
    if(require.cache[id]) {
        return require.cache[id].exports;
    }

    //module metadata, set up environment for the first load
    var module = {
        exports: {},
        id: id,
    };

    //update the cache
    require.cache[id] = module;
    
    //load the module, read the file and eval the code
    loadModule(id, module, require);

    return module.exports;
}

require.cache = {};
require.resolve = function(moduleName) {
    ...
}
```
As we see, there is nothing magical behind the workings of the Node.js module system; the trick is all in the wrapper we create around a module's source code and the `articial environment` in which we run it.

require is `synchronous`! As a consequence, any assignment to module.export must be synchronous as well.

If we need some `asynchronous initialization` steps for a module, we can always define and export an `uninitialized` module that is initialized asynchronously at a later time.

## the module cache
Each module is loaded and evaluated only the `first time` it is required, since any subsequent call of require() will simply return the cached version. 

Caching is crucial for performances, but it also has some important `functional implications`:
  1. It makes it possible to have `cycles` within module dependencies
  2.  It guarantees, to some extent, that always the `same instance` is returned when requiring the same module from within a given package

you can access the cache directly and even `invalidate` the cache by simply `deleting` the corresponding id

