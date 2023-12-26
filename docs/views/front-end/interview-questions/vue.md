# Vue面试题

## 1. 基础
### 1. v-text 与花括号(插值表达式)与 v-html 区别
- `插值表达式`将数据解析为纯文本，不能显示输出 `html`
- v-html 可以染输出 html
- v-text 将数据解析为纯文本，不能输出真正的 html，与花括号的区别是在页面加载时不显示双花括号
- v-text 指令:
作用: 操作网页元素中的纯文本内容。是他的另外一种写法
-v-text 与`{{}}`区别:
- `{{}}`叫模板插值
- v-text 叫指令。有一点区别就是，在渲染的数据比较多的时候，可能会把大括号显示出来，俗称屏幕闪动

### 2. Vue 循环的 key 作用
Key值的存在保证了唯一性，Vue 在执行时，会对节点进行检查，如果没有 key 值，那么 vue 检查到这里有 dom 节点，就会对内容清空并赋新值，如果有 kev 值存在，那么会对新老节点进行对比，比较两者 key是否相同，进行调换位置或删除操作

### 3. 什么是计算属性
计算属性是用来声明式的描述一个值依赖了其他的值，当它依赖的这个值发生改变时，就更新 DOM当在模板中把数据绑定到一个计算属性上时,vue 会在它依赖的任何值导致该计算属性改变时更新 DOM每个计算属性都包括一个 getter和 setter，读取时触发 getter，修改时触发 setter

### 4. Vue 的生命周期请简述
> vue 的生命周期就是 vue 实例创建到实例销毁的过程。期间会有 8个钩子函数的调用

- beforeCreate (创建实例)
- created (创建完成)
- beforeMount (开始创建模板)
- mounted (创建完成)
  DOM渲染在 mounted周期中就已经完成
- beforeUpdate (开始更新)
- updated (更新完成)
- beforeDestroy(开始销毁)
- destroyed (销毁完成)

### 5. Vue 数据绑定的几种方式
1. 单向绑定 双大括号 htl 内字符串绑定
2. v-bind 绑定 html 属性绑定
3. 双向绑定 v-model
4. 次性绑定 v-once 依赖于 v-model

### 6. 对 vue 中 keep-alive 的理解
- 概念: keep-alive 是vue 的内置组件，当它动态包裹组件时，会缓存不活动的组件实例，它自身不会渲染成一个 DOM 元素也不会出现在父组件链中
- 作用: 在组件切换过程中将状态保留在内存中，防止重复渲染 DOM，减少加载时间以及性能消耗，提高用户体验
- 生命周期函数: Activated 在 keep-alive 组件激活时调用，deactivated在 keep-alive 组件停用时调用

### 7. 如何让组件中的css在当前组件生效
在style中加上scoped属性，这样样式只会应用到当前组件中

### 8. Vue 组件中的 data 为什么是函数
Data 是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立，不会相互影响

如果是引用类型(对象)，当多个组件共用一个数据源时，一处数据改变所有的组件数据都会改变，所以要利用函数通过 return 返回对象的拷贝(返回一个新数据)，让每个实例都有自己的作用域，相互不影响。

### 9. Vue 组件中的 computed 和 watch 的区别
Computed、watch 区别就是 computed 的缓存功能，当无关数据数据改变时，不会重新计算，直接使用缓存中的值。计算属性是用来声明式的描述一个值依赖了其他的值，当所依赖的值后者变量发生变化时计算属性也跟着改变Watch 监听的是在 data 中定义的变量，当该变量变化时，会触发 watch中的方法

Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。
适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。
Watch没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。
当我们需要深度监听对象中的属性时，可以打开deep：true选项，这样便会对对象中的每一项进行监听。
这样会带来性能问题，优化的话可以使用字符串形式监听，如果没有写到组件中，不要忘记使用unWatch手动注销哦。

### 10. vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢?
如看实际情况，一般在 created (或 beforeRouter)里面就可以，如果涉及到需要页面加载完成之后的话就用 mounted。
在 created 的时候，视图中的 html 并没有染出来，所以此时如果直接去操作 html 的dom 节点，一定找不到相关的元素
而在 mounted 中，由于此时 html 已经染出来了，所以可以直接操作 dom 节点，(此时 document.getelementByld 即可生效)

### 11. Vue3.0 是如何变得更快的?(底层，源码)
- diff 方法优化
1. Vue2.x 中的虚拟 dom 是进行全量的对比
2. Vue3.0 中新增了静态标记(PatchFlag): 在与上次虚拟结点进行对比的时候，值对比带有patch flag的节点，并且可以通过flag的信息得知当前节点要对比的具体内容化。静态提升hoistStatic
- Vue2.x: 无论元素是否参与更新，每次都会重新创建
- Vue3.0: 对不参与更新的元素，只会被创建一次，之后会在每次渲染时候被不停的利用。
- cacheHandlers 事件侦听器缓存
默认情况下 onClick 会被视为动态绑定，所以每次都会去追踪它的变化但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可。

### 12. v-if与v-show的区别
- 共同点：都能控制元素的显示和隐藏；

- 不同点：实现本质方法不同，v-show本质就是通过控制css中的display设置为none，控制隐藏，只会编译一次；v-if是动态的向DOM树内添加或者删除DOM元素，若初始值为false，就不会编译了。而且v-if不停的销毁和创建比较消耗性能。 

> 总结：如果要频繁切换某节点，使用v-show(切换开销比较小，初始开销较大)。如果不需要频繁切换某节点使用v-if（初始渲染开销较小，切换开销比较大）。
### 13. 单页面应用和多页面应用区别及优缺点?
- 单页面应用（SPA）: 通俗一点说就是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源。多应用于pc端。

- 多页面（MPA）: 就是指一个应用中有多个页面，页面跳转时是整页刷新

#### 单页面的优点：
1. 用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点spa对服务器压力较小
2. 前后端分离
3. 页面效果会比较炫酷（比如切换页面内容时的专场动画）

#### 单页面缺点：
1. 不利于seo
2. 导航不可用，如果一定要导航需要自行实现前进、后退。（由于是单页面不能用浏览器的前进后退功能，所以需要自己建立堆栈管理）
3. 初次加载时耗时多
4. 页面复杂度提高很多

### 14. Vue性能优化方法
#### 1. 编码阶段
- 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher；
- 如果需要使用v-for给每项元素绑定事件时使用事件代理；
- SPA 页面采用keep-alive缓存组件；
- 在更多的情况下，使用v-if替代v-show；
- key保证唯一；
- 使用路由懒加载、异步组件；
- 防抖、节流；
- 第三方模块按需导入；
- 长列表滚动到可视区域动态加载；
- 图片懒加载；
#### 2. 用户体验：
- 骨架屏；
- PWA；
- 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。
#### 3. SEO优化
- 预渲染；
- 服务端渲染SSR；
#### 4. 打包优化
- 压缩代码；
- Tree Shaking/Scope Hoisting；
- 使用cdn加载第三方模块；
- 多线程打包happypack；
- splitChunks抽离公共文件；
- sourceMap优化；
### 15. nextTick的实现原理是什么?
在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用
- Promise
- MutationObserver
- setImmediate
- 如果以上都不行则采用setTimeout
定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列。

## 2. Vue-Router

### 1. Vue 路由模式 hash 和 history，简单讲一一下
- Hash 模式地址栏中有#，history 没有，
- History 模式下刷新，会出现 404 情况，需要后台配置使用 JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash值
可以使用 hashchange 事件来监听 hash 值的变化HTML5 提供了 History API 来实现 URL 的变化。其中最主要的 API有以下两个: history.pushState() 和 history.repalceState()。这两个API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录

### 2. Vue 路由传参的两种方式，params 和 query方式与区别
动态路由也可以叫路由传参，就是根据不同的选择在同一个组件渲染不同的内容
用法上: query 用 path 引入，params 用name引入，接收参数都是类似的，分别是 this.$route.query.name和 this.$route.params.nameurl 展示上:params类似于 post，query 类似于 get，也就是安全问题,params 传值相对更安全点,query 通过ur 传参,刷新页面还在,params刷新页面不在了

### 3. Vue 中路由跳转方式(声明式/编程式)
> Vue 中路由跳转有两种，分别是声明式和编程式
- 用js方式进行跳转的叫编程式导航 this.$router.push ()
- 用 router-link 进行跳转的叫声明式
router-view 路由出口，路由模板显示的位置
> 路由中 name 属性有什么作用?
在 router-link中使用 name 导航到对应路由使用 name 导航的同时，给了路由传递参数

### 4. Route  router 区别
1. router 是 VueRouter 的一个对象，通过 Vue.use(VueRouter)和VueRouter构造函数得到一个 router的实例对象，这个对象中是一个全局的对象，他包含了所有的路由包含了许多关键的对象和属性
2.route 是一个跳转的路由对象，每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 name,path,params,query等
## 3. Vuex
### 1. Vuex 是什么? 怎么使用? 在那种场景下使用
Vuex是一个专为 vue.is 应用程序开发的状态管理模式，通过创建一个集中的数据存储，方便程序中的所有组件进行访问，简单来说 vuex 就是vue 的状态管理T具
Vuex有五个属性 state getters mutations actions modulesstate 就是数据源存放地，对应一般vue 对象的 data,state 里面存放的数据是响应式的，state 数据发生改变，对应这个数据的组件也会发生改变用this.$store.state.xxx 调用Getters 相当于 store 的计算属性，主要是对 state 中数据的过滤，用this.$store.getters.xxx 调用Mutations 处理数据逻辑的方法全部放在 mutations 中，当触发事件想改变 state 数据的时候使用 mutations，用 this.$store.commit 调用给这个方法添加一个参数，就是 mutation 的载荷 (payload)Actions 异步操作数据，但是是通过 mutation 来操作 用this.$store.dispatch 来触发，actions 也支持载荷

### 2. Vuex 流程
在vue 组件里面，通过 dispatch 来触发 actions 提交修改数据的操作然后通过 actions的 commit触发 mutations来修改数据，mutations接收到 commit 的请求，就会自动通过 mutate 来修改 state，最后由store 触发每一个调用它的组件的更新

### 3. .Vuex 怎么请求异步数据
1. 首先在 state 中创建变量
2. 然后在 action 中调用封装好的 axios 请求，异步接收数据commit提交给 mutations
3. Mutations 中改变 state 中的状态，将从 action 中获取到的值赋值给state
### 4. Vuex 中 action 如何提交给 mutation 的
Action函数接收一个与store实例具有相同方法和属性的context 对象,可以调用 context.commit提交 个 mutation,或者通过 context.state和 context.getters 获取 state 和 getters

### 5. vuex 的 State 特性是?
State 就是数据源的存放地state 里面的数据是响应式的，state 中的数据改变，对应这个数据的组件也会发生改变
State 通过 mapstate 把全局的 state 和 getters 映射到当前组件的计算属性中

### 6. vuex 的 Getter 特性是?
Getter 可以对 state 进行计算操作，它就是 store 的计算属性
Getter 可以在多组件之间复用如果一个状态只在一个组件内使用，可以不用 getters

### 7. vuex 的 Mutation 特性是?
更改vuex store 中修改状态的唯 办法就是提交 mutation，可以在回调函数中修改 store 中的状态
### 8. vuex 的 actions 特性是?
Action 类似于 mutation，不同的是 action 提交的是 mutation，不是直接变更状态，可以包含任意异步操作

### 9. vuex 的优势

- 优点: 解决了非父了组件的通信，减少了 ajax 请求次数，有些可以直接从 state 中获取
- 缺点: 刷新浏览器，vuex 中的 state 会重新变为初始状态，解决办法是`vuex-along`插件，得配合计算属性和 sessionstorage 来实现
