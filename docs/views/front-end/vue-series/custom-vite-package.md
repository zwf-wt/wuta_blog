# 使用 vite 创建一个 npm 包并发布到 npmjs.com

## 1. 创建一个 vite 项目，并安装依赖
```bash
# 创建一个不使用任何框架的js项目
npm create vite wt_vtools
```
如果项目创建成功之后，就可以得到这样的一个目录结构
```bash
.
├── public
│   └── vite.svg
├── .gitignore
├── counter.js
├── index.html
├── javascript.svg
├── main.js
├── package.json
├── style.css
```
接下来调整目录结构，删除不用的文件，以及创建一个 `vite.config.js`、`README.md` 文件 。调整完毕后的目录结构如下：
```bash
.
├── src
│   └── main.js
├── .gitignore
├── package.json
├── README.md
├── vite.config.js
```
安装依赖
```bash
pnpm i
```

## 2. 编写代码
在 `src/main.js` 中编写代码
```js
// src/main.js
/**
 *
 * @param name
 * @returns
 */
export const getPrice = (name) => {
  let price = 0.0

  switch (name) {
    case '苹果':
      price = 9.99
      break
    case '香蕉':
      price = 59.99
      break
    case '葡萄':
      price = 79.99
      break
    default:
      throw new Error('没有找到该商品')
  }

  return price
}

export default {
  getPrice
}
```

## 3. 配置 vite.config.js
```js
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // 输出目录
    target: 'es2015', // 构建目标
    lib: {
      entry: 'src/main.js', // 入口文件
      formats: ['es', 'cjs'], // 输出格式
    },
  },
})
```

## 5. 打包

```bash
pnpm build
# 会得到一个 dist 目录
...
├── dist
│   └── wt_vtools.cjs
│   └── wt_vtools.js
```
## 6. 修改package.json
```json
{
  "name": "wt_vtools",
  // 必须为 false
  "private": false,
  "version": "0.0.5",
  "type": "module",
  "main": "dist/wt_vtools_js.cjs",
  "module": "dist/wtvtools_js.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    // 配置发布命令
    "release": "npm publish"
  },
  "devDependencies": {
    "vite": "^5.2.0"
  },
  // vite 支持更细粒化的导入匹配规则
  "exports": {
    ".": {
      "import": "./dist/wt_vtools_js.js",
      "require": "./dist/wt_vtools_js.cjs"
    }
  }
}

```
## 7. 登录npm
```bash
npm login
# 输入npm的用户名、密码，如果没有需要注册一个npm账户 【https://www.npmjs.com/login】
```

## 8. 发布
```bash
npm publish
```
### 可能遇到的问题
1. 包名称可能会相同，需要修改包名称
2. npm 源必须设置为官方的源


## 9. 创建一个vue项目测试一下
```bash
# 创建一个vue+js项目
npm create vite test_custom_package

# 进入项目
cd test_custom_package

# 安装依赖
pnpm install

# 安装包
pnpm add wt_vtools

```

### 9.1 在 App.vue 文件中使用 wt_vtools
```vue
...
<script setup>
import { ref } from 'vue'
import { getPrice } from 'wt_vtools'
const price = getPrice('苹果')

console.log(price)
</script>

...
```
## 10. 问题
1. 没有使用eslint，校验代码
2. 没有使用husky
3. 有条件的话，可以使用ts创建一个包