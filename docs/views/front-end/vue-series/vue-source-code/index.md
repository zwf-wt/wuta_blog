# 学习路线


## 源码阅读入口推荐
> Vue 3 的源码仓库是：`https://github.com/vuejs/core`

### 推荐目录结构（packages/ 下）：
```bash
core/
  ├── packages/
  │   ├── vue/              // Vue 主包（入口）
  │   ├── reactivity/       // 响应式系统（核心）
  │   ├── runtime-core/     // 核心运行时（平台无关）
  │   ├── runtime-dom/      // 浏览器 DOM 渲染引擎
  │   ├── compiler-core/    // 编译器核心
  │   ├── compiler-dom/     // DOM 编译器
  │   ├── compiler-sfc/     // 单文件组件（.vue 文件）编译器
  │   ├── server-renderer/  // 服务端渲染（SSR）
  │   └── shared/           // 公共工具函数
```
## 推荐学习顺序（由浅入深）
### 1. 从响应式系统开始（reactivity）
这是 Vue 的灵魂，理解 reactive、ref、effect、computed、watch 的实现机制。

> 推荐阅读路径：
- packages/reactivity/src/effect.ts：响应式副作用核心
- packages/reactivity/src/reactive.ts：reactive() 的实现
- packages/reactivity/src/ref.ts：ref() 的实现
- packages/reactivity/src/computed.ts：computed() 的实现

### 2. 进入核心运行时（runtime-core）
这部分是 Vue 的“虚拟 DOM”和组件系统的核心，与平台无关。
> 推荐阅读路径：

- packages/runtime-core/src/apiCreateApp.ts：createApp() 的实现
- packages/runtime-core/src/component.ts：组件创建和生命周期
- packages/runtime-core/src/renderer.ts：渲染器核心逻辑
- packages/runtime-core/src/vnode.ts：虚拟节点（VNode）定义
### 3. 浏览器渲染引擎（runtime-dom）
这一层是 runtime-core 的具体实现，针对浏览器 DOM。
> 推荐阅读路径：

- packages/runtime-dom/src/index.ts：入口
- packages/runtime-dom/src/patchProp.ts：属性更新逻辑
- packages/runtime-dom/src/nodeOps.ts：DOM 操作封装

### 4. 编译器（compiler-core + compiler-dom + compiler-sfc）
Vue 的模板编译器将 .vue 文件中的 template 编译成 render 函数。

> 推荐阅读路径：
- packages/compiler-core/src/：编译器核心逻辑（词法分析、AST 转换）
- packages/compiler-dom/src/：针对 DOM 的编译扩展
- packages/compiler-sfc/src/：vue 文件解析与编译

> 你可以用 `@vue/compiler-sfc` 搭建一个 playground 来调试模板编译过程。

### 5. 服务端渲染（server-renderer）
了解 Vue 在 Node.js 环境下如何渲染 HTML 字符串。

> 推荐阅读路径：
- packages/server-renderer/src/renderToString.ts：SSR 的主要入口
- packages/runtime-core/src/ssr.ts：支持 SSR 的运行时逻辑

### 6. 公共工具函数（shared）
包含一些基础工具函数，如类型判断、字符串操作等。
> 推荐阅读路径：
packages/shared/src/index.ts：常用工具函数一览

## 学习建议

|        建议            |说明     |
|------------------------|--------|
|✅ 从模块入手，不要一上来就看完整流程       |比如先学响应式，再学组件系统|
|多写注释 + 画图 |帮助理解复杂逻辑  |
|搭建调试环境 |fork 官方 repo，调试源码  |
| 阅读 issue 和 PR |了解设计决策和优化思路  |
| 做一个 mini-vue |实现响应式 + 渲染器，加深理解  |

## 延伸学习（进阶）

|        建议            |说明     |
|------------------------|--------|
|Vue 的响应式原理（Proxy vs Object.defineProperty）       |深入 reactivity 模块|
|Vue 的 Diff 算法 |看 renderer.ts 中的 patch 和 diff 逻辑  |
|Vue 的异步更新机制（nextTick） |看 scheduler.ts  |
|Vue 的 Composition API 实现|看 setup、effectScope 等相关逻辑  |
|Vue 插件系统 |看 app.use() 的实现  |
