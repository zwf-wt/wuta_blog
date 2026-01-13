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
### 14. 如何使用 `for` 循环删除数组中的元素
```js
const arr = [1, 2, 3, 4, 5];

// 正序遍历
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2) {
    arr.splice(i, 1);
    i--; // 修正索引，因为数组长度已经减少
  }
}

// 逆序遍历
for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] % 2) {
    arr.splice(i, 1);
  }
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
### package 解析
> 以 `vue3` 为例

```json
{
  "name": "vue", // 项目的名称是 vue，通常用于标识 npm 包的名称。
  "version": "3.5.18", // 当前版本号是 3.5.18，遵循语义化版本号（SemVer）。
  // 项目描述：Vue 是一个用于构建现代 Web UI 的渐进式 JavaScript 框架。
  "description": "The progressive JavaScript framework for building modern web UI.",
  // 默认的入口文件为 index.js，用于 CommonJS 模块加载。
  "main": "index.js",
  // 用于 ES Module 的入口文件是 dist/vue.runtime.esm-bundler.js，适合打包工具（如 Webpack、Vite）使用。
  "module": "dist/vue.runtime.esm-bundler.js",
  // 类型定义文件是 dist/vue.d.ts，用于 TypeScript 支持。
  "types": "dist/vue.d.ts",
  // 用于 CDN 使用的文件路径是 dist/vue.global.js，可以通过 unpkg.com 直接访问。
  "unpkg": "dist/vue.global.js",
  // 同样指定 CDN 文件路径，用于 jsDelivr。
  "jsdelivr": "dist/vue.global.js",
  // 指定发布到 npm 时包含的文件和目录
  "files": [
    "index.js", // 入口文件
    "index.mjs", // ES Module 入口文件
    "dist", // 构建输出目录。
    "compiler-sfc", // 包含单文件组件编译器。相关功能模块和类型定义。
    "server-renderer", // 包含服务器端渲染器。相关功能模块和类型定义。
    "jsx-runtime", // JSX 运行时。相关功能模块和类型定义。
    "jsx.d.ts" // JSX 类型定义。
  ],
  // 模块导出配置，定义了不同环境下的入口文件：
  "exports": {
    // 主模块导出配置
    ".": {
      // 使用 ES Module 时的入口
      "import": {
        "types": "./dist/vue.d.mts",
        "node": "./index.mjs",
        "default": "./dist/vue.runtime.esm-bundler.js"
      },
      // 使用 CommonJS 时的入口。
      "require": {
        "types": "./dist/vue.d.ts",
        "node": {
          "production": "./dist/vue.cjs.prod.js",
          "development": "./dist/vue.cjs.js",
          "default": "./index.js"
        },
        // 默认入口
        "default": "./index.js"
      }
    },
    // 服务端渲染模块的导出
    "./server-renderer": {
      "import": {
        "types": "./server-renderer/index.d.mts",
        "default": "./server-renderer/index.mjs"
      },
      "require": {
        "types": "./server-renderer/index.d.ts",
        "default": "./server-renderer/index.js"
      }
    },
    //单文件组件编译器的导出
    "./compiler-sfc": {
      "import": {
        "types": "./compiler-sfc/index.d.mts",
        "browser": "./compiler-sfc/index.browser.mjs",
        "default": "./compiler-sfc/index.mjs"
      },
      "require": {
        "types": "./compiler-sfc/index.d.ts",
        "browser": "./compiler-sfc/index.browser.js",
        "default": "./compiler-sfc/index.js"
      }
    },
    // JSX 支持相关模块
    "./jsx-runtime": {
      "types": "./jsx-runtime/index.d.ts",
      "import": "./jsx-runtime/index.mjs",
      "require": "./jsx-runtime/index.js"
    },
    // JSX 支持相关模块
    "./jsx-dev-runtime": {
      "types": "./jsx-runtime/index.d.ts",
      "import": "./jsx-runtime/index.mjs",
      "require": "./jsx-runtime/index.js"
    },
    // JSX 类型定义
    "./jsx": "./jsx.d.ts",
    // 所有 dist/ 下的文件都直接导出
    "./dist/*": "./dist/*",
    // 允许导入 package.json 文件
    "./package.json": "./package.json"
  },
  // 构建相关的配置：
  "buildOptions": {
    // 构建时的全局变量名。
    "name": "Vue",
    // 支持的构建格式
    "formats": [
      "esm-bundler", // 用于打包工具的 ESM 格式
      "esm-bundler-runtime", // ESM 运行时版本
      "cjs", //  CommonJS 格
      "global", // 全局变量（UMD）格式
      "global-runtime", // 全局运行时版本
      "esm-browser", // 浏览器端使用的 ESM 格式
      "esm-browser-runtime" // 浏览器端运行时版本。
    ]
  },
  // 代码仓库信息
  "repository": {
    "type": "git", // 类型为 git。
    "url": "git+https://github.com/vuejs/core.git" // 仓库地址
  },
  // 搜索关键词为 vue。
  "keywords": [
    "vue"
  ],
  // 作者是 Evan You（尤雨溪）。
  "author": "Evan You",
  // 使用 MIT 许可证。
  "license": "MIT",
  // 问题反馈地址。
  "bugs": {
    "url": "https://github.com/vuejs/core/issues"
  },
  // 项目主页链接，指向 GitHub 上的 readme 文件。
  "homepage": "https://github.com/vuejs/core/tree/main/packages/vue#readme",
  // 项目依赖的子模块
  "dependencies": {
    "@vue/shared": "3.5.18", // 共享工具库
    "@vue/compiler-dom": "3.5.18", // DOM 编译器
    "@vue/compiler-sfc": "3.5.18", // 单文件组件编译器。
    "@vue/server-renderer": "3.5.18", // 服务端渲染支持
    "@vue/runtime-dom": "3.5.18" // DOM 运行时。
  },
  // 需要用户安装的依赖：typescript，支持所有版本。
  "peerDependencies": {
    "typescript": "*"
  },
  // 表示 typescript 是可选依赖，即使未安装也不会报错。
  "peerDependenciesMeta": {
    "typescript": {
      "optional": true
    }
  }
}
```
```json
{
  // 作用：标记该项目为私有项目，防止意外发布到 npm。
  // 推荐设置：适用于内部项目或 monorepo 子项目。
  "private": true,
  // 作用：项目的当前版本号。
  // 语义化版本：遵循 SemVer 规范，格式为 主版本.次版本.修订号
  "version": "3.5.18",
  // 作用：指定推荐使用的包管理器为 pnpm，版本为 10.13.1。
  // 用途：确保团队使用一致的包管理器，避免因不同工具导致的依赖问题。
  "packageManager": "pnpm@10.13.1",
  // 作用：指定该项目使用 ES Module（ESM）格式作为默认模块系统。
  // 影响：.js 文件将被当作 ESM，而不是 CommonJS。
  "type": "module",
  // 定义项目的命令脚本，用于开发、构建、测试、发布等操作。
  "scripts": {
    // 启动本地开发服务器
    "dev": "node scripts/dev.js",
    // 构建项目。
    "build": "node scripts/build.js",
    // 生成 .d.ts 类型声明文件。
    "build-dts": "tsc -p tsconfig.build.json --noCheck && rollup -c rollup.dts.config.js",
    // 清理构建产物和缓存文件。
    "clean": "rimraf --glob packages/*/dist temp .eslintcache",
    // 测量不同构建目标的大小。
    "size": "run-s \"size-*\" && node scripts/usage-size.js",
    "size-global": "node scripts/build.js vue runtime-dom -f global -p --size",
    "size-esm-runtime": "node scripts/build.js vue -f esm-bundler-runtime",
    "size-esm": "node scripts/build.js runtime-dom runtime-core reactivity shared -f esm-bundler",
    // 使用 TypeScript 增量检查类型，不输出编译文件。
    "check": "tsc --incremental --noEmit",
    // 使用 ESLint 检查代码规范。
    "lint": "eslint --cache .",
    // 使用 Prettier 格式化代码或检查格式是否一致。
    "format": "prettier --write --cache .",
    "format-check": "prettier --check --cache .",
    // 运行单元测试。
    "test": "vitest",
    // 运行单元测试
    "test-unit": "vitest --project unit",
    // 运行端到端测试
    "test-e2e": "node scripts/build.js vue -f global -d && vitest --project e2e",
    // 验证生成的类型文件是否符合预期。
    "test-dts": "run-s build-dts test-dts-only",
    "test-dts-only": "tsc -p packages-private/dts-built-test/tsconfig.json && tsc -p ./packages-private/dts-test/tsconfig.test.json",
    // 运行带覆盖率的测试
    "test-coverage": "vitest run --project unit --coverage",
    "prebench": "node scripts/build.js -pf esm-browser reactivity",
    "prebench-compare": "node scripts/build.js -pf esm-browser reactivity",
    "bench": "vitest bench --project=unit --outputJson=temp/bench.json",
    "bench-compare": "vitest bench --project=unit --compare=temp/bench.json",
    // 发布新版本（通常包括构建、打 tag、推送到远程等操作）。
    "release": "node scripts/release.js",
    // 生成基于提交信息的变更日志。
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    // 使用 ESM 格式运行开发服务器。
    "dev-esm": "node scripts/dev.js -if esm-bundler-runtime",
    // 并行运行模板解析器和静态服务器。
    "dev-compiler": "run-p \"dev template-explorer\" serve",
    // 开发 SFC（单文件组件）模式。
    "dev-sfc": "run-s dev-sfc-prepare dev-sfc-run",
    "dev-sfc-prepare": "node scripts/pre-dev-sfc.js || npm run build-all-cjs",
    "dev-sfc-serve": "vite packages-private/sfc-playground --host",
    "dev-sfc-run": "run-p \"dev compiler-sfc -f esm-browser\" \"dev vue -if esm-bundler-runtime\" \"dev vue -ipf esm-browser-runtime\" \"dev server-renderer -if esm-bundler\" dev-sfc-serve",
    // 启动静态服务器。
    "serve": "serve",
    // 打开浏览器访问本地开发页面。
    "open": "open http://localhost:3000/packages-private/template-explorer/local.html",
    // 构建用于 SFC Playground 的多个格式。
    "build-sfc-playground": "run-s build-all-cjs build-runtime-esm build-browser-esm build-ssr-esm build-sfc-playground-self",
    // 构建所有模块的 CommonJS 格式。
    "build-all-cjs": "node scripts/build.js vue runtime compiler reactivity shared -af cjs",
    // 构建不同目标环境运行时的 ESM 模块。
    "build-runtime-esm": "node scripts/build.js runtime reactivity shared -af esm-bundler && node scripts/build.js vue -f esm-bundler-runtime && node scripts/build.js vue -f esm-browser-runtime",
    // 构建不同目标环境 浏览器 的 ESM 模块。
    "build-browser-esm": "node scripts/build.js runtime reactivity shared -af esm-bundler && node scripts/build.js vue -f esm-bundler && node scripts/build.js vue -f esm-browser",
    // 构建不同目标环境 SSR 的 ESM 模块。
    "build-ssr-esm": "node scripts/build.js compiler-sfc server-renderer -f esm-browser",
    "build-sfc-playground-self": "cd packages-private/sfc-playground && npm run build",
    // 强制使用 pnpm 安装依赖。
    "preinstall": "npx only-allow pnpm",
    // 安装 Git hooks（提交前检查等）。
    "postinstall": "simple-git-hooks"
  },
  // 配置 Git hooks（提交前触发的脚本）
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged && pnpm check", // 提交前执行代码格式化和类型检查。
    "commit-msg": "node scripts/verify-commit.js" // 验证提交信息是否符合规范。
  },
  // 对暂存区中的文件执行格式化
  "lint-staged": {
    // 文件使用 Prettier 格式化。
    "*.{js,json}": [
      "prettier --write"
    ],
    // 文件先用 ESLint 修复，再用 Prettier 格式化。
    "*.ts?(x)": [
      "eslint --fix",
      "prettier --parser=typescript --write"
    ]
  },
  // 指定项目需要的 Node.js 版本最低要求。避免在低版本 Node 上运行导致兼容性问题
  "engines": {
    "node": ">=18.12.0"
  },
  // 列出开发依赖项，用于构建、测试、格式化等工具。
  // TypeScript、ESLint、Prettier：类型检查、代码规范、格式化。
  // Vitest、Jest、Puppeteer：测试框架和浏览器自动化。
  // Rollup、Vite、SWC、Esbuild：构建工具。
  // Git hooks、Changelog 工具、版本管理相关工具。
  "devDependencies": {
    "@babel/parser": "catalog:",
    "@babel/types": "catalog:",
    "@rollup/plugin-alias": "^5.1.1",
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-json": "^6.1.0",
    "@rollup/plugin-node-resolve": "^16.0.1",
    "@rollup/plugin-replace": "5.0.4",
    "@swc/core": "^1.13.1",
    "@types/hash-sum": "^1.0.2",
    "@types/node": "^22.16.5",
    "@types/semver": "^7.7.0",
    "@types/serve-handler": "^6.1.4",
    "@vitest/coverage-v8": "^3.1.4",
    "@vitest/eslint-plugin": "^1.2.1",
    "@vue/consolidate": "1.0.0",
    "conventional-changelog-cli": "^5.0.0",
    "enquirer": "^2.4.1",
    "esbuild": "^0.25.8",
    "esbuild-plugin-polyfill-node": "^0.3.0",
    "eslint": "^9.27.0",
    "eslint-plugin-import-x": "^4.13.1",
    "estree-walker": "catalog:",
    "jsdom": "^26.1.0",
    "lint-staged": "^16.0.0",
    "lodash": "^4.17.21",
    "magic-string": "^0.30.17",
    "markdown-table": "^3.0.4",
    "marked": "13.0.3",
    "npm-run-all2": "^7.0.2",
    "picocolors": "^1.1.1",
    "prettier": "^3.5.3",
    "pretty-bytes": "^6.1.1",
    "pug": "^3.0.3",
    "puppeteer": "~24.9.0",
    "rimraf": "^6.0.1",
    "rollup": "^4.45.1",
    "rollup-plugin-dts": "^6.2.1",
    "rollup-plugin-esbuild": "^6.2.1",
    "rollup-plugin-polyfill-node": "^0.13.0",
    "semver": "^7.7.2",
    "serve": "^14.2.4",
    "serve-handler": "^6.1.6",
    "simple-git-hooks": "^2.13.0",
    "todomvc-app-css": "^2.4.3",
    "tslib": "^2.8.1",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.32.1",
    "vite": "catalog:",
    "vitest": "^3.1.4"
  }
}

```