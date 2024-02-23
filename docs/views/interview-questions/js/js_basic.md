# js语法篇


## 1. 基础语法篇

### 1. 如何判断一个数据是`NaN`
`NaN`表示非数字,但是用`typeof`检测是`number`类型
```js
console.log(typeof NaN) // number
```
> 所以利用`NaN`的定义： 用`typeof`判断是否为`number`类型并且判断是否满足`isnan`
利用`NaN`是唯一个不等于任何自身的特点`n !== n`
```js
let n = Number('a') // NaN
console.log('是否是NaN', n != n) // 是否是NaN, true
console.log(Object.is(n, NaN)) // true
```
### 2. JS 中 `null` 和 `undefined` 区别
- 相同点: 用`if`判断时，两者都会被转换成`false`
- 不同点:
  1. `number`转换的值不同`Number(null)` 为`0`,  `Number(undefined)`为`NaN`
  ```js
  console.log(Number(null)) // 0
  console.log(Number(undefined)) // NaN
  ```
  2. `Null` 表示一个值被定义了，但是这个值是空值
  3. `Undefined` 变量声明但未赋值
