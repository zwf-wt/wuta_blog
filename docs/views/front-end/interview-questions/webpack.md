# Webpack面试题

## 1. 请简述 webpack 中的 loaders 与 plugin 的区别
### 1.1 什么是loaders
loaders 是文件加载器能够加载资源文件，并对这些文件进行外理，例如，编译，压缩等，最终一起打包到指定文件中。
### 1.2 什么是 plugin
在 webpack 运行的生命周期会有许多事件，plugin可以监听这些事件

> 区别: 
- 加载器是用来加载文件的，webpack 本身只能载js 文件(内置 babel-loader)，加载其他文件就需要安装别的loader，比如:css-loader file-loader
- Plugin 是扩展 webpack 功能的，通过 plugin ，webpack可以实现loader 不能完成的复杂功能

## 2. 说一下 webpack 的打包原理
Webpack是把项目当做一个整体，通过给定一个主文件，webpack将从这个主文件开始找到项目中所有依赖的文件，使用loaders 类外理，最后打包成一个或者多个浏览器可识别的js 文件
## 3. Commonjs 与 ES6 模块区别?
common 模块是拷贝，可以修改值，es6 模块是引用，只读状态不能修改值
commonjs 模块是运行时加载，es6 模块是编译时输出接