# vue-router

## 路由参数

## 编程式导航

## 路由懒加载

## 导航守卫
1. 全局前置守卫
```js
/**
 * 全局前置守卫
 * to: Route: 即将要进入的目标 路由信息对象
 * from: Route: 当前导航正要离开的路由
 * next: Function: 一定要调用该方法来 resolve 这个钩子
 */
router.beforeEach((to, from, next) => {
  console.log('router beforeEach', to, from)

  next() // 必须调用 next()
})
```
2. 全局解析守卫
3. 全局后置钩子
```js
// 全局后置守卫
router.afterEach((to, from) => {
  console.log('router afterEach', to, from)
})
```
4. 路由独享守卫
5. 组件内守卫

## vue-router的两种模式
> `Vue` 路由有两种模式：`hash` 模式和 `history` 模式。
1. `hash` 模式：`URL` 中以 # 开头，如 http://www.example.com/#/home
原理是利用浏览器的 `hash（锚点）`来实现前端路由，当 `URL` 中的 `hash` 发生变化时，页面不会重新加载，而是通过监听 `hashchange` 事件来进行页面更新
- 优点：兼容性好，在不支持 `HTML5 History API` 的浏览器中也可以使用
- 缺点：URL 中有 `#` 可能影响 `SEO`，不够美观
2. history 模式：URL 中不包含 `#`，如 http://www.example.com/home
原理是利用 `HTML5 History API` 中的 `pushState` 和 `replaceState` 方法来改变 URL，并配合监听 `popstate` 事件来实现前端路由
- 优点：`URL` 美观，不会有 #，对 `SEO` 更友好
- 缺点：需要服务器端配置，防止用户直接访问 history 模式下的 URL 时出现 404 错误

> 总体来说，`hash` 模式兼容性好，使用简单，但 `URL` 不够美观；`history` 模式 `URL` 美观，对 `SEO` 更友好，但需要服务器端配置，且在一些老版本浏览器上可能存在兼容性问题。根据项目需求和实际情况选择合适的路由模式。