# DOM相关

## 17. JS 的各种位置，比 clientHeight,scrollHeight,offsetHeight ,以及scrollTop, offsetTop,clientTop 的区别?
- `clientHeight`: 表示的是可视区域的高度，不包含`border`和滚动条
- `offsetHeight`: 表示可视区域的高度，包合了`border`和滚动条
- `scrollHeight`: 表示了所有区域的高度，包含了因为滚动被隐藏的部分
- `clientTop`: 表示边框 `border` 的厚度，在未指定的情况下一般为`O`
- `scrollTop`: 滚动后被隐藏的高度，获取对象相对于由 `offsetParent` 属性指定的父坐标(`css` 定位的元素或 `body` 元素)距离顶端的高度

## 26. 预加载和懒加载的区别，预加载在什么时间加载合适
- 预加载是指在页面加载完成之前，提前将所需资源下载，之后使用的时候从缓存中调用。
- 懒加载是延迟加载，按照一定的条件或者需求等到满足条件的时候再加载对应的资源

> 两者主要区别是一个是提前加载，一个是迟缓其至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。
