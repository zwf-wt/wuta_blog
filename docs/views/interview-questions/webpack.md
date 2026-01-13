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

## 6. 说一下 webpack 的打包原理
Webpack是把项目当做一个整体，通过给定一个主文件，webpack将从这个主文件开始找到项目中所有依赖的文件，使用loaders 类外理，最后打包成一个或者多个浏览器可识别的js 文件
## 7. Commonjs 与 ES6 模块区别?
common 模块是拷贝，可以修改值，es6 模块是引用，只读状态不能修改值
commonjs 模块是运行时加载，es6 模块是编译时输出接
## 8. webpack优化有哪些

对于Webpack的优化，可以考虑以下几个方面：

1. 减小打包体积：可以通过使用Webpack的Tree Shaking功能来消除未使用的代码，通过配置合适的mode（如production）来启用代码压缩，以及按需引入第三方库等方式来减小打包体积。

2. 加载性能优化：可以通过Webpack的代码分割（Code Splitting）功能将代码拆分成多个较小的块，实现按需加载。使用动态导入（Dynamic Import）或者使用React的Suspense和Vue的异步组件等技术，将组件进行懒加载，从而提高页面的加载速度。

3. 缓存优化：可以通过配置Webpack的output.filename和output.chunkFilename来使用hash、chunkhash等方式生成文件名，使文件名随内容变化而变化，以便利用浏览器缓存机制。同时，可以通过配置webpack-manifest-plugin插件来生成一个清单文件，用于记录每个文件的hash值，以便在构建时进行对比，只更新有变化的文件。

4. 并行构建：可以使用HappyPack或者Thread Loader等工具，将Webpack的构建过程并行化，从而加快构建速度，特别是在多核CPU的机器上。

5. 模块解析优化：可以通过配置resolve.alias来设置模块的别名，减少模块的搜索范围。此外，也可以使用resolve.extensions来配置模块的后缀名，减少文件查找的时间。

6. 资源优化：可以通过使用url-loader或者file-loader等loader，将小图片转为base64编码，以减少HTTP请求。此外，还可以对图片、字体等资源进行压缩，减小文件大小。

7. 代码优化：可以通过Webpack的插件（如UglifyJsPlugin）来进行代码压缩和混淆，从而提高代码的运行效率。
8. 按需加载：可以使用Webpack的动态导入（Dynamic Import）功能，实现按需加载模块，从而减小初始加载的体积。此外，也可以使用React的Suspense和Vue的异步组件等技术来实现组件的按需加载。

9. 多线程构建：可以使用Webpack的parallel-webpack插件，将Webpack的构建过程分配到多个子进程中执行，从而加快构建速度。

10. 缓存优化：可以使用Webpack的缓存特性来加快构建速度。通过配置cache-loader或者hard-source-webpack-plugin等插件，将中间结果缓存起来，以便下次构建时复用。

11. 模块热替换：可以使用Webpack的Hot Module Replacement（HMR）功能，实现模块级别的热替换，从而加快开发效率。

12. 长缓存优化：可以使用Webpack的contenthash等方式来生成文件名，使文件名与文件内容相关联，从而方便利用浏览器缓存机制。

13. 资源CDN优化：可以将静态资源（如图片、字体、JavaScript库等）上传到CDN上，并在Webpack的output.publicPath中指定CDN的地址，从而减轻服务器的负载，提高页面加载速度。

14. 生产环境优化：在webpack配置中使用mode: 'production'，以启用内置的优化。此外，使用UglifyJsPlugin或TerserPlugin来压缩和混淆代码。

15. 代码拆分（Code Splitting）：通过使用Webpack的动态导入功能（Dynamic Imports）或SplitChunksPlugin插件，将代码拆分为多个文件，以便实现按需加载和减小初始加载时间。

16. Tree Shaking：通过配置webpack，确保只将项目中用到的代码打包到最终的bundle中，去除未引用的代码，减小打包体积。

17. 持久化缓存：使用contenthash或chunkhash来生成文件名，以确保浏览器缓存生效，减少不必要的网络请求。

18. 使用DllPlugin预先编译第三方库：将第三方库（如React、Vue等）单独打包成一个文件，并且在开发过程中不经常改变，以提高构建速度。

19. 多进程/多实例构建：通过webpack-parallel-uglify-plugin等插件，利用多进程或多实例同时处理多个任务，提高构建效率。

20. 合理配置resolve.modules和resolve.extensions：减少模块解析的时间。

21. 使用HardSourceWebpackPlugin：使用此插件可以在构建过程中缓存模块，以加快二次构建速度。

22. 避免不必要的loader处理：仔细选择需要的loader，避免过多或不必要的loader处理。
> 这只是一些常见的Webpack优化策略，具体的优化方法和策略会根据项目的需求和特点有所差异。在进行优化时，可以结合使用Webpack的相关插件和工具，以及借助性能分析工具（如Webpack Bundle Analyzer）来帮助定位和解决性能瓶颈

## 9. webpack的配置有哪些？
webpack的配置主要包括以下几个部分：
- **entry**: 入口文件地址。可以是单个，可以是多外。
- **output**: 输出的内容，path, filename, publicPath等。
- **module**: 模块配置，包括rules，loader等。
- **plugins**: 对打包流程的干预和增加
- **resolve**: 别名，扩展名等
- **extensions**: 外部扩展名
- **devServer**: 开发服务器配置
- **optimization**: 拆chunk, cacheGroup
- stats: 打包状态
- context: 上下文
- performance: 性能
- target: 打包目标
- mode: 模式
## 10. 口喷一下配置
```js
const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.[chuckhash:8].js',
        publicPath: './',
        clearn: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        persets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg)$/,
                generator: {
                    filename: 'static/assets/[name].[contenthash:8].[ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        })
    ]
}
```
### 11. 有哪些常见的loader，它们的作用是什么？
- `babel-loader`: 使用 babel的能力，处理js代码 @babel/core
- `vue-loader`: 处理vue文件
- `ts-loader`: 处理ts文件

- `style-loader`: 将css文件以style标签的形式插入到html中
- `css-loader`: 处理css文件中的url()等 css module
- `less-loader`: 处理less文件
- `sass-loader`: 处理sass文件
- `postcss-loader`: 使用postcss插件转换css
- `file-loader`: 处理文件路径，将文件赋值到输出目录
- `url-loader`: 处理文件大小，是转换成base64,还是直接拷贝。小于limit的文件会返回DataURL

## 有哪些常见的 plugin, 它们的作用是什么？
- `html-webpack-plugin`: 基于 html 模板生成对应的文件和引用关系，构建运行时产物
- `clean-webpack-plugin`: 清理构建产物
- `mini-css-extract-plugin`: 将css提取成单独的文件
- `css-minimizer-webpack-plugin`: 压缩css
- `terser-webpack-plugin`: 压缩js
- `uglifyjs-webpack-plugin`: 
- `define-webpack-plugin`: 定义全局变量，css主题
- `bundle-analyzer-webpack-plugin`: 打包分析
- `copy-webpack-plugin`: 拷贝文件

## loader 和 plugin 的区别是什么？
- loader: 转换器，核心是解析
webpack 没有loader的话，只能打包基础的cjs的js文件，对于css，静态资源是无法实现打包的，这时候就需要引入一些loader来进行文件的处理，更多的是，文件**转换器**
- plugin: 插件扩展器，核心是扩展，扩展webpack的能力，比如打包优化，资源管理和环境变量注入等，目的是解决loader无法实现的其他事. 在webpack的运行周期里，会有一些hooks对外暴露，所以在webpack打包编译的过程中，plugin会根据这些hooks执行一些自定义的操作。来实现对输出结果的干预的增强。

区别：
loader 更专注于文件的转换，**是转换器**，让webpack处理非js模块，一般在固定的流程(打包文件之前)起作用
plugin 更专注于流程的扩展，**是扩展器**，让输出资源的能力更丰富。在整个生命周期里，都起作用。

## 14. babel-loader 常见的配置
### 方案一：
```js
{
    test: /\.(.jsx|.tst|.js|.ts)$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            chrome: '60',
                        },
                        useBuiltIns: 'usage',
                        corejs: 3
                    }
                ],
                '@babel/preset-react',
                '@babel/preset-typescript'
            ],
        },
        plutins: [

        ]
    }
}



// {
//     presets: [
//         '@babel/preset-env',
//         '@babel/preset-react',
//         '@babel/preset-typescript'
//     ]
// }
```
### 方案二：
独立出来.babellc或者babel.config.js配置presets和plugins

## 15. webpack的指纹占位符

```js
filename: 'main.[chunkhash:8].js'
filename: 'static/asserts/[name].[contenthash:8].[ext]'
```
ext: 资源的后缀名
name: 资源的名字
path: 文件的相对路径
folder: 文件所在的文件夹

hash: 每次构建的时候，任何一点改动，整个项目的hash值都会变
chunkhash: 只在当前chunk发生变化的时候，hash值才会变
contenthash: 文件内容发生变化的时候，hash值才会变
    - 静态资源，也是缓存下来的。
## 16. webpack的构建流程
1. 初始化各种参数，读取配置文件，进行解析。merge..., 形成标准化的配置
2. 开始编译：complile 对象初始化，注册所有的配置插件，执行run方法开始编译
3. 从entry 开始，读取所有的依赖树，形成AST，不断地递归下去进行处理。
4. 文件编译：根据文件正则所匹配对应的loader, 进行文件转换
5. 形成一个整体的资源树，完成模块的编译
6. 输出资源：根据入口和模块的关系，组成一个个的chunk,再把每个chunk转换成单独的文件，准备输出
7. 输出完成。根据output配置的内容，把文件最后写入到磁盘

## 17. bundle, chunk, module 的区别
### module 模块
- 从构建的角度来说，一个文件，或者肉片高内聚的文件，就是一个module

### chunk
- 一般是指一个构建流程的产物，代表着一个静态分析的过程，从入口如何形成一整个依赖树。形成了一个chunk
- split chunk

### boundle 包
- 一般是指，我最后的产物，main.xxx.js,我要把所有的文件合并在一起，最后形成一个bundle.js

bundle ---> xxx.js, xxx.css index.html
bundleless
    -> 
        - card
        - button
        - menu
        - input
        - form
## 18. webpack的tree shaking的原理
简单来说有三种：
- usedExports: 我在静态分析的过程中，会有一些导入了，但是没有用过的东西。可以直接删除
- sideEffects: 删除模块中导出了，但是未被使用的变量
- dead code elimination: 删除模块中，执行不到的代码,最终在产物里，删除一些死代码。

## 19. 如何提高webpack的构建速度
- 使用多进程打包：使用thread-loader, happypack等工具，将构建的流程分解为多个进行或线程去处理。esbuild,swc相关
- 使用dllPlugin将第三方库预先进行打包，减少构建
- 使用 HardSourceWebpackPlugin, 缓存一些中间文件，加速后续的构建流程
- 使用tree shaking
- 移除一些不必要的配置
    - 不必须的插件，不适用
    - loader 写得更清楚一些，.css文件，就不要用less-loader
    - extensions等缩写的顺序，尽量把常见的后缀，放前面一些。
    - oneof 
- cache-loader, 可以启动缓存loader

1. 不要不清晰，让工具反复查找
2. 使得缓存，不做重复的事情
3. 使用并行，空间换时间

## 20. 如何减少webpack打包后的体积/性能优化
1. code spliting
    1. 非首屏加载的数据，先排除掉
2. tree shaking
    1. 没用的，先干掉
3. 压缩代码
    1. css压缩
    2. js压缩
```js
optimization: {
    minimize: true,
    minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
    ]
}
```
4. 压缩图片
5. 按需引入 
    1. babel的编译，useBuiltIns的配置，在不同的浏览器，按需引入 polyfill
5. CDN加速
    1. 用户的一引起react, vue，比较大的第三方，在用户处缓存起来。

## 21. 写一个loader
```js
// style-loader.js
module.exports = function style_loader(resource, map) {
    const style = `document.createElement('style');
    style.innerHTML = ${JSON.stringfy(resource)};
    document.head.appendChild(style)`;
    return style;
}

const less = require('less');
module.exports = function less_loader(resource, map) {
    const callback = this.async();

    less.render(resource, { sourceMap: {} }, function(err, res) {
        let { css, map } = res;
        callback(null, css, map);
    })
}
```

## 22. 写一个css-loader的配置
```js
module: {
    rules: [
        {
            // 提高效率，所以使用oneOf
            oneOf: [
                {
                    test: /\.module\.(less|css)$/,
                    includes: [path.resolve(__dirname, 'src')],
                    use: [
                        isDev ? 'style-loader': MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]'
                                }
                            }
                        },
                        "less-loader",
                        "postcss-loader"
                    ]
                }
            ]
        }
    ]
}
```
### 23. 写一个plugin
```js

// new ZipPlugin({filename: 'xxx.zip'})
const JSZip = require('jszip');
const { RawSource } = require('weback-sources');
class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        let context = this;
        compiler.hooks.emit.tapAsync('zipPlugin', (compilation, callback) => {
            const assets = compilation.assets;

            const zip = new JSZip();

            // emit 阶段
            Object.keys(assets).forEach((fileName) => {
                const source = assets[fileName].source();

                zip.file(fileName, source);
            })

            zip.generateAsync({
                type: 'nodebuffer'
            }).then(res => {
                compilation.assets[context.options.filename] = new RawSource(res);
                callback();
            })
        })
    }
}
```