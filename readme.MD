Research on vm module in nodejs

## 需求
1. 提供给用户自定义逻辑的功能
    - 安全性（不信任代码）
2. 模块封装
    - node module

## about vm
All JavaScript executed within Node.js runs within the scope of a "context"

In V8, a context is an `execution environment` that allows `separate`, `unrelated`, JavaScript applications to run in a `single instance` of V8.

## vm.createContext()

When the method vm.createContext() is called, the sandbox object that is passed in is associated `internally with a new instance of a V8 Context`.

The vm.createContext() method is primarily useful for creating a `single` sandbox that can be used to run `multiple scripts`.

## runInContext vs runInNewContext vs runInThisContext
    - runInContext, pass in a `already` contextified object
    - runInNewContext, pass in a plain object, runInNewContext will contextify it and then run the code
    - runInThisContext, only has access to current `global` object, but don't have access to current `local scope`

