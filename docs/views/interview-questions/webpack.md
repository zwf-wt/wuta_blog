# Webpack面试题

## 1. 对 webpack 的理解
webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。我们可以使用webpack管理模块。因为在webpack看来，项目中的所有资源皆为模块，通过分析模块间的依赖关系，在其内部构建出一个依赖图，最终编绎输出模块为 HTML、JavaScript、CSS 以及各种静态文件（图片、字体等），让我们的开发过程更加高效。
### webpack的主要作用如下：
- 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。

- 编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过webpack的Loader机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如.less，.vue，.jsx这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

- 能力扩展。通过webpack的Plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

## 2. webpack 的构建流程
> webpack的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. 完成模块编译：在经过上一步使用 loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

> 在以上过程中，webpack会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用webpack提供的 API 改变webpack的运行结果。

### 简单理解：
- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 entry 出发，针对每个 Module 串行调用对应的 loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中


## 3. 请简述 webpack 中的 loaders 与 plugin 的区别
### 1.1 什么是loaders
loaders 是文件加载器能够加载资源文件，并对这些文件进行外理，例如，编译，压缩等，最终一起打包到指定文件中。
### 1.2 什么是 plugin
在 webpack 运行的生命周期会有许多事件，plugin可以监听这些事件

### 1.3 区别: 
- 加载器是用来加载文件的，webpack 本身只能载js 文件(内置 babel-loader)，加载其他文件就需要安装别的loader，比如:css-loader file-loader

- loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中；plugin赋予了webpack各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader无法实现的其他事。

- Plugin 是扩展 webpack 功能的，通过 plugin ，webpack可以实现loader 不能完成的复杂功能

- 在配置上，loader在module.rules中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性；plugin在 plugins中单独配置，类型为数组，每一项是一个 plugin 的实例，参数都通过构造函数传入。

- 在运行时机上，loader 运行在打包文件之前；plugin则是在整个编译周期都起作用。

## 4. webpack的热更新原理是？
`模块热替换(HMR - hot module replacement)`，又叫做热更新，在不需要刷新整个页面的同时更新模块，能够提升开发的效率和体验。热更新时只会局部刷新页面上发生了变化的模块，同时可以保留当前页面的状态，比如复选框的选中状态等。

热更新的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上webpack-dev-server与浏览器之间维护了一个websocket，当本地资源发生变化时，webpack-dev-server会向浏览器推送更新，并带上构建时的hash，让客户端与上一次资源进行对比。客户端对比出差异后会向webpack-dev-server发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向webpack-dev-server发起 jsonp 请求获取该chunk的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader和vue-loader都是借助这些 API 实现热更新。

## 5. 如何提高webpack的构建速度？
1. 代码压缩
- JS压缩
webpack 4.0默认在生产环境的时候是支持代码压缩的，即mode=production模式下。
实际上webpack 4.0默认是使用terser-webpack-plugin这个压缩插件，在此之前是使用 uglifyjs-webpack-plugin，两者的区别是后者对 ES6 的压缩不是很好，同时我们可以开启 parallel参数，使用多进程压缩，加快压缩。
- CSS压缩
CSS 压缩通常是去除无用的空格等，因为很难去修改选择器、属性的名称、值等。可以使用另外一个插件：css-minimizer-webpack-plugin。
- HTML压缩
使用HtmlWebpackPlugin插件来生成 HTML 的模板时候，通过配置属性minify进行 html 优化。

```js
module.exports = {
    plugin:[
        new HtmlwebpackPlugin({
            minify:{
                minifyCSS: false, // 是否压缩css
                collapseWhitespace: false, // 是否折叠空格
                removeComments: true // 是否移除注释
            }
        })
    ]
}

```
2. 图片压缩
配置image-webpack-loader

3. Tree Shaking
Tree Shaking是一个术语，在计算机中表示消除死代码，依赖于ES Module的静态语法分析（不执行任何的代码，可以明确知道模块的依赖关系）。 在webpack实现Tree shaking有两种方案：
- usedExports：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的
```js
module.exports = {
  optimization:{
      usedExports
  }
}
```
使用之后，没被用上的代码在webpack打包中会加入unused harmony export mul注释，用来告知Terser在优化时，可以删除掉这段代码。
- sideEffects：跳过整个模块/文件，直接查看该文件是否有副作用
sideEffects用于告知webpack compiler哪些模块时有副作用，配置方法是在package.json中设置sideEffects属性。如果sideEffects设置为false，就是告知webpack可以安全的删除未用到的exports。如果有些文件需要保留，可以设置为数组的形式，如：

```js
"sideEffecis":[
    "./src/util/format.js",
    "*.css" // 所有的css文件
]
```
4. 缩小打包域
排除webpack不需要解析的模块，即在使用loader的时候，在尽量少的模块中去使用。可以借助 include和exclude这两个参数，规定loader只在那些模块应用和在哪些模块不应用。


5. 减少ES6转为ES5的冗余代码
使用bable-plugin-transform-runtime插件

6. 提取公共代码
通过配置CommonsChunkPlugin插件，将多个页面的公共代码抽离成单独的文件

## 2. 说一下 webpack 的打包原理
Webpack是把项目当做一个整体，通过给定一个主文件，webpack将从这个主文件开始找到项目中所有依赖的文件，使用loaders 类外理，最后打包成一个或者多个浏览器可识别的js 文件
## 3. Commonjs 与 ES6 模块区别?
common 模块是拷贝，可以修改值，es6 模块是引用，只读状态不能修改值
commonjs 模块是运行时加载，es6 模块是编译时输出接