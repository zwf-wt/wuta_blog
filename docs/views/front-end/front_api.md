## 1. call
```js
Function.prototype.myCall = function (context, ...args) {
  context = new Object(context) || window
  const fnSymbol = Symbol('temp')
  context[fnSymbol] = this
  context[fnSymbol](...args)
  Reflect.deleteProperty(context, fnSymbol)
}
```

## 2. apply
```js	
Function.prototype.myApply = function(context, args) {
  context = Object(context) || window
  const temp = Symbol('temp')			
  context[temp] = this
  context[temp](...args)
  Reflect.deleteProperty(context, temp)
}
```


## 3. bind
```js
Function.prototype.bind = function(context, ...args) {
  context = context || window
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  return function(..._args) {
    args = args.concat(_args)
    context[fnSymbol](...args);
    delete context[fnSymbol];
  }
}
```