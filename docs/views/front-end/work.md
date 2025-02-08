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
### 10. 苹果IOS浏览器上时间格式不兼容Date问题
```js
const dateStr = '2024-12-17'

// 日期格式不兼容, 如果是低版本的 Safari 会返回Invalid Date
const date = new Date(dateStr) 

// 解决办法 '2024-12-17' -> '2024/12/17'
const date = new Date(dateStr.replace(/-/g, '/'))
```
### 11. 定高虚拟列表

[原文](https://mp.weixin.qq.com/s/unNbvl6L6vLHXcnyheI1UQ)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>固定高度虚拟列表</title>
  <style>
    .container {
      border: 1px solid red;
      height: 100%;
      overflow: auto;
      position: relative;
    }

    .placeholder {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
    }

    .card-item {
      padding: 10px;
      color: #777;
      box-sizing: border-box;
      border-bottom: 1px solid #e1e1e1;
    }
  </style>
</head>
<body>
  <dom id="app">
    {{ renderList }} {{ renderCount }}
    <div style="height: 100vh; width: 100vw">
      <div ref="container" class="container" @scroll="handleScroll">
        <div
          class="placeholder"
          :style="{ height: listHeight + 'px'}"
        ></div>
        <div class="list-wrapper" :style="{ transform: getTransform }">
          <div
            class="card-item"
            v-for="item in renderList"
            :key="item.id"
            :style="{
              height: itemSize + 'px',
              lineHeight: itemSize + 'px',
            }"
          >
            {{ item.value + 1 }}
          </div>
        </div>
      </div>
    </div>
  </dom>
  <script src="./vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      name: 'App',
      computed: {
        end() {
          return this.start + this.renderCount
        },
        listHeight() {
          return this.itemSize * this.listData.length
        },
        renderCount() {
          return Math.ceil(this.containerHeight / this.itemSize)
        },
        renderList() {
          return this.listData.slice(this.start, this.end + 1)
        },
        getTransform() {
          return `translate3d(0, ${this.offset}px, 0)`
        }
      },
      data: {
        itemSize: 100,
        listData: [],
        start: 0, // 可视区域内渲染的第一个item的index的值，初始化为0。
        offset: 0, // 可视区域内渲染的第一个item的偏移量
        containerHeight: 0,
      },
      mounted() {
        for (let i = 0; i < 1000; i++) {
          this.listData.push({
            id: i,
            value: i
          })
        }
        this.containerHeight = this.$refs.container.clientHeight || 600        
      },
      methods: {
        handleScroll(e) {
          console.log('handleScroll run')
          const scrollTop = e.target.scrollTop;
          this.start = Math.floor(scrollTop / this.itemSize);
          this.offset = scrollTop - (scrollTop % this.itemSize);
        }
      }
    });
  </script>
</body>
</html>
```

### 12. 不定调虚拟列表
[原文](https://mp.weixin.qq.com/s/s7lYTKRu-QBlZPWrR7CYdg)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>不定高虚拟列表</title>
  <style>
    .container {
      border: 1px solid red;
      height: 100%;
      overflow: auto;
      position: relative;
      width: 600px
    }

    .placeholder {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
    }

    .card-item {
      padding: 10px;
      color: #777;
      box-sizing: border-box;
      border-bottom: 1px solid #e1e1e1;
    }
  </style>
</head>
<body>
  <dom id="app">
    <div style="height: 100vh; width: 100vw">
      <div ref="container" class="container" @scroll="handleScroll">
        <div
          class="placeholder"
          :style="{ height: listHeight + 'px'}"
        ></div>
        <div class="list-wrapper" :style="{ transform: getTransform }">
          <div
            class="card-item"
            v-for="item in renderList"
            :key="item.index"
            ref="itemRefs"
            :data-index="item.index"
          >
            <span style="color: red">{{ item.index }}</span>
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </dom>
  <script src="../chajian/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      name: 'App',
      computed: {
        end() {
          return this.start + this.renderCount
        },
        renderList() {
          return this.listData.slice(this.start, this.end + 1)
        },
        renderCount() {
          return Math.ceil(this.containerHeight / this.itemSize)
        },
        listHeight() {
          // return this.itemSize * this.listData.length

          return this.positions.length ? this.positions[this.positions.length - 1].bottom : 0
        },
        getTransform() {
          return `translate3d(0, ${this.offset}px, 0)`
        }
      },
      data: {
        itemSize: 50,  // 预估item高度，不是真实item高度
        listData: [], // 列表数据
        start: 0, // 可视区域内渲染的第一个item的index的值，初始化为0。
        offset: 0, // 可视区域内渲染的第一个item的偏移量
        containerHeight: 0,
        positions: [],
      },
      mounted() {
        
        const randomStr = () => {
          // 生成一个0-500之间的随机数作为数组的长度
          const arrayLength = Math.floor(Math.random() * 501);
  
          // 定义可能的字符集：数字加上大小写字母
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
          // 创建指定长度的数组并用随机选择的字符填充
          const randomArray = Array.from({ length: arrayLength }, () => 
            characters.charAt(Math.floor(Math.random() * characters.length))
          );

          return randomArray.join('').trim();
        }
        console.log('randomStr ', randomStr())
        for (let i = 0; i < 1000; i++) {
          const str = randomStr()
          this.listData.push({
            index: i,
            value: str || '11111111111111111', // randomStr()
          })
        }
        this.containerHeight = this.$refs.container.clientHeight || 600        
        this.initPosition()
      },
      updated() {
        this.updatePosition()
      },
      methods: {
        handleScroll(e) {
          console.log('handleScroll run')
          const scrollTop = e.target.scrollTop;
          this.start = this.getStart(scrollTop); //  Math.floor(scrollTop / this.itemSize);
          this.offset = this.positions[this.start].top || 0 // scrollTop - (scrollTop % this.itemSize);
        },
        getStart(scrollTop) {
          let left = 0;
          let right = this.positions.length - 1;
          while(left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (this.positions[mid].bottom == scrollTop) {
              return mid + 1;
            } else if (this.positions[mid].bottom < scrollTop) {
              left = mid + 1;
            } else {
              right = mid - 1
            }
          }

          return left;
        },

        initPosition() {
          this.positions = [];
          this.listData.forEach((item, index) => {
            this.positions.push({
              index,
              height: this.itemSize,
              top: index * this.itemSize,
              bottom: (index + 1) * this.itemSize,
            })
          })
        },

        updatePosition() {
          this.$refs.itemRefs.forEach((el, _index) => {
            const index = +el.getAttribute("data-index")
            const realHeight = el.getBoundingClientRect().height;
            let diffVal = this.positions[index].height - realHeight;
            const curItem = this.positions[index];
            if (diffVal !== 0) {
              curItem.height = realHeight;
              curItem.bottom = curItem.bottom - diffVal;
              for (let i = index + 1; i < this.positions.length; i++) {
                this.positions[i].top = this.positions[i].top - diffVal;
                this.positions[i].bottom = this.positions[i].bottom - diffVal;
              }

            }
          })
        }
      }
    });
  </script>
</body>
</html>
```
### 13. 将 hex 转换为 rgb
```js
const hexToRgb = (hex) => {
  // 确保输入的十六进制字符串以 # 开头，如果不是则添加
  if (hex.charAt(0) !== '#') {
    hex = '#' + hex;
  }

  // 移除可能存在的井号并解析为整数
  let bigint = parseInt(hex.slice(1), 16);

  // 获取红色、绿色和蓝色分量
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // 返回 RGB 字符串或对象
  return `rgb(${r}, ${g}, ${b})`;
  // 或者返回对象形式
  // return {r: r, g: g, b: b};
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