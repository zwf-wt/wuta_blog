# 工作中遇到的情况

## 1. js
### 1.生成`FormData`数据
```js
// 生成formData数据
const createFormData = obj => {
  const formData = new FormData()
  Object.keys(obj).forEach(item => {
    if (!Array.isArray(obj[item])) {
      formData.append(item, obj[item])
    } else {
      obj[item].forEach(childItem => {
        formData.append(`${item}[]`, childItem)
      })
    }
  })
  return formData
}
```
### 2. 将字符串和 `unicode` 码互相转换

```js
// 1. 将字符串转换为unicode码
let char = '三';
let unicode = char.charCodeAt(0).toString(16);
unicode = '\u' + '0000'.substr(0, 4 - unicode.length) + unicode;

// 输出结果为：\u4e09

// 2. 将 unicode 码转换为字符串
console.log(`\u4e09`) // 使用 ES6+ 模板字符串转换
// 输出结果为：三
```

### 3. 使用位运算实现权限组合
```js
// 定义基础权限
const READ = 0b1;
const CREATE = 0b10;
const UPDATE = 0b100;
const DELETE = 0b1000;

// 通过上面的基础权限构造出复杂权限
const xxx = READ | UPDATE | DELETE

// 判断是否有读权限
console.log((xxx & READ) === 0)
```

### 4. 怎么实现常见登录业务的

### 5. 函数柯里化
```js
// add(1)(2)(3)(4)
const add = function() {
    // 2. 输入 处理外层arguments => 类数组处理
    let args = Array.prototype.slice.call(arguments);

    // 1. 构造科里化结构
    let inner = function() {
        // 主功能
        args.push(...arguments);
        return inner;
    }

    // 3. 最终返回值的输出
    inner.toString = function() {
        return args.reduce((prev, cur) => {
            return prev + cur;
        })
    }

    return inner;
}
// 面试：
// toString - 本地方法的调整用于多类型返回的处理
// 追问：
// 如果要用到真正的toString? - 利用call直接运行String
// 追问：
// 函数类型？ - 类型统一 => 不纯
```
### 6. 判断数据类型
```js
var _toString = Object.prototype.toString;
/**
 * 获取数据类型
 * @param {*} value 要判断类型的值
 */
function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

toRawType(1) // => Number
toRawType('1') // => String
/**
 * Object.prototype.toString.call(value) => [object Type]
 * [object String]
 * 因此，通过slice(8, -1)可以获取到Type
 * 可能会返回的类型有：
 * String, Number, Boolean,
 * Undefined, Null,
 * Object, Array, Function,
 * Date, RegExp, Error, Symbol, BigInt
 */

/**
 * 判断数据是否是对象
 * @param {*} val 要判断的数据
 * @returns {boolean}
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

/**
 * 判断数据是否是对象,
 * 仅仅只取分出简单数据或者复杂数据类型的话，
 * 可以用这个方法
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * 判断数据是否是正则
 * @param {*} val 要判断的数据
 * @returns {boolean}
 */
function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}
```
### 7. 将数据转换成数值
```js
/**
 * 将数据转换成数值, 如果转换失败则返回原数据
 * @param {*} val 要转换的数据
 * @returns {number | *}
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}
```

### 8. 判断是否是Promise
```js
function isPromise (val) {
  return (
    val &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}
```
### 9. 判断某个对象中是否含有某个属性
```js
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
```
## 模块
### 1. depcheck
> 超级好用的依赖检查工具`depcheck`
```txt
npm i -g depcheck

depcheck
```
### 2. 解决 npm或pnpm : 无法加载文件 `C:\Users\hp\AppData\Roaming\npm\cnpm.ps1`
因为在此系统上禁止运行脚本

1. 以管理员身份打开 powershell 
2. 运行 `set-ExecutionPolicy RemoteSigned` 
3. 选择 `Y` 或者 `A`