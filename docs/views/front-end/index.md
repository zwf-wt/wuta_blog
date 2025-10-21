# 大前端

## css 方案选择

### CSS预处理器
- Sass、Less、Stylus
#### 核心概念
- 变量、嵌套规则、混合（Mixins）、继承、运算
- 提供强大工具和逻辑控制，如条件语句、循环语句
#### 优点
- 提升CSS开发效率，代码模块化、易维护
- 提供逻辑控制功能
#### 缺点
- 需要编译，增加开发流程复杂性。
- 生成CSS可能冗余，性能优势较低。

### CSS-in-JS
- styled-components、emotion、emotion-theming、styled-jsx、emotion/styled
#### 核心概念
- 样式与组件绑定，动态生成CSS
- 支持模块化与作用域隔离
#### 优点
- 与Ract等现代框架无缝集成, 动态样式管理简单
- 避免全局样式污染
#### 缺点
- 运行时性能开销较大
- 学习曲线较陡(需要理解JSX语法)

### CSS Modules
- CSS Modules 是一种 CSS 文件模块化方案，通过局部作用域和命名空间来避免全局样式污染。
#### 核心概念
- 每个组件的 CSS 只在其自身范围内生效，不会影响其他组件。
- 使用 CSS Modules 时，每个 CSS 文件都会被编译成一个唯一的类名，从而避免样式冲突。按需加载

```css
:root {
  --color-primary: pink;
  --bg-primary: white;
  --margin: 2px;
  --padding: 2px;
}
```
#### 优点
- 避免命名冲突，性能优于`CSS-in-JS`
- 适合模块化项目，维护性强
#### 缺点
- 需要构建工具支持，如Webpack
- 动态样式支持不够灵活

### Atomic CSS/Utility-first CSS(自动化CSS)
- Tailwind CSS、Tachyons、Bulma、Windi CSS
#### 核心概念
- 提供大量天型功能类名，通过组合构建页面。
#### 优点
- 快速开发，无需自定义CSS规则
- 样式统一，社区生态强大(如Tailwind CSS)
#### 缺点
- 学习成本高（大量类名）
- HTML文件样式类名多，可读性较差

### PostCSS
- PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。
#### 核心概念
- 使用插件处理CSS，如自动添加浏览器前缀、代码压缩、CSS变量转换等
#### 优点
- 提供丰富的插件，灵活处理CSS, 插件链可定制
- 与现代构建工具无缝集成。
#### 缺点
- 学习插件配置复杂，增加开发成本

### BEM命名规范
- BEM 是一种 CSS 命名规范，通过块（Block）、元素（Element）、修饰符（Modifier）来组织 CSS 类名。
#### 核心概念
-基于类名的命名约定: Block(模块)、Element(元素)、Modifier (变体)。
#### 优点
- 命名清晰，团队协作友好
- 无工具依赖，简单直接。
#### 缺点
- 类名较长，增加代码冗长
- 无法动态生成样式，灵活性低于CSS in Js。

```css
/* 块 */
/* 定义： 一个独立的、可复用的功能模块或组件。它代表了 UI 中的一个完整单元。
特点： 可以嵌套其他 Block，也可以被复用在不同的地方。
命名规则： 使用小写字母，单词之间用连字符 - 连接。 */
.header          /* 页头块 */
.menu           /* 菜单块 */
.button         /* 按钮块 */
.card           /* 卡片块 */


/* element 元素 */
/* 定义： 一个 Block 的组成部分，不能脱离 Block 独立存在。
特点： 它是 Block 的“孩子”，语义上依赖于 Block。
命名规则： Block名__元素名。使用双下划线 __ 连接 Block 和 Element。 */
.menu__item      /* 菜单块中的菜单项 */
.menu__link      /* 菜单块中的链接 */
.button__text   /* 按钮块中的文字 */
.card__title     /* 卡片块中的标题 */

/* Modifier (修饰符) */
/* 定义： 用于定义 Block 或 Element 的外观、状态或行为的变化。
特点： 它不是一个新组件，而是对现有 Block 或 Element 的“变体”或“状态”。
命名规则：
Block名--修饰符名 或 Element名--修饰符名
使用双连字符 -- 连接。
修饰符值可以是布尔型（有/无）或键值对型。 */

/* 布尔型修饰符 (表示一种状态) */
.button--disabled    /* 禁用状态的按钮 */
.menu__item--active  /* 当前激活的菜单项 */

/* 键值对型修饰符 (表示一种具体值) */
.button--theme_primary    /* 主题为“primary”的按钮 */
.button--size_large       /* 尺寸为“large”的按钮 */
.menu--orientation_vertical /* 垂直方向的菜单 */
```


### Functional CSS
- Functional CSS 是一种 CSS 编写风格，通过函数和变量来定义样式。如Tachons
#### 核心概念
- 样式为功能块，极简类名代表单一功能。
- 类似Atomic CSs，但更注重功能抽象化。
#### 优点
- 功能清晰，简化CSS开发
- 易于理解和维护。
#### 缺点
- 可读性差，依赖文档记忆