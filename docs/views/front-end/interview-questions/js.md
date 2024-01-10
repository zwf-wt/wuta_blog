# JS相关面试题

## 1. 如何判断一个数据是`NaN`
`NaN`表示非数字,但是用`typeof`检测是`number`类型
```js
console.log(typeof NaN) // number
```
> 所以利用`NaN`的定义： 用`typeof`判断是否为`number`类型并且判断是否满足`isnan`
利用`NaN`是唯一个不等于任何自身的特点`n !== n`
```js
let n = Number('a') // NaN
console.log('是否是NaN', n != n) // 是否是NaN, true
console.log(Object.is(n, NaN)) // true
```
## 2. JS 中 `null` 和 `undefined` 区别
- 相同点: 用`if`判断时，两者都会被转换成`false`
- 不同点:
  1. `number`转换的值不同`Number(null)` 为`0`,  `Number(undefined)`为`NaN`
  ```js
  console.log(Number(null)) // 0
  console.log(Number(undefined)) // NaN
  ```
  2. `Null` 表示一个值被定义了，但是这个值是空值
  3. `Undefined` 变量声明但未赋值

## 3. 闭包是什么?有什么特性? 对页面会有什么影响
> 闭包可以简单理解成: 定义在一个函数内部的函数。其中一个内部函数在包含它们的外部函数之外被调用时，就会形成闭包

> 特点:

1. 函数嵌套函数
2. 函数内部可以引用外部的参数和变量
3. 参数和变量不会被垃圾回收机制回收。
> 使用:
1. 读取函数内部的变量;
2. 这些变量的值始终保持在内存中，不会在外层函数调用后被自动清除

> 优点:
1. 变量长期驻扎在内存中
2. 避免全局变量的污染
3. 私有成员的存在
> 缺点:会造成内存泄露

> 为什么要用闭包
- 匿名自执行函数: 我们知道所有的变量，如果不加上 var 关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，比如: 别的函数可能误用这些变量，造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链上遍历的)。

> 除了每次使用变量都是用 var 关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护可以用闭包。

- 结果缓存: 我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留

## 4. Js 中常见的内存泄漏
1. 意外的全局变量
2. 被遗忘的计时器或回调函数
3. 脱离`DOM`的引用
4. 闭包

## 5. ES6 新特性

1. `const`和`let`
2. 模板字符串
3. 箭头函数
4. 函数的参数默认值
5. 对象和数组解构
6. `for...of`和`for...in`
7. `ES6`中的类
8. `Promise`

## 6. let 与 var 与 const 的区别
- `var`声明的变量会挂载在`window`上，而`let`和`const`声明的变量不会
- `var`声明的变量存在变量提升,`let`和`const`不存在变量提升
- 同一作用域下`var`可以声明同名变量,`let`和`const`不可以
- `let`和`const`声明会形成块级作用域
- `const`一旦声明必须赋值，不能用`null`占位，声明后不能再修改，如果声明的是复合类型数据，可以修改属性

## 7.普通函数和构造函数的区别
1. 构造函数也是一个普通函数，创建方式和普通函数一样，但是构造函数习惯上首字母大写
2. 调用方式不一样，普通函数直接调用，构造函数要用关键字 new 来调用
3. 调用时，构造函数内部会创建一个新对象，就是实例，普通函数不会创建新对象
4. 构造函数内部的 this 指向实例，普通函数内部的 this 指向调用函数的对象 (如果没有对象调用，默认为 window)5.构造函数默认的返回值是创建的对象 (也就是实例)，普通函数的返回值由 return 语句决定
6. 构造函数的函数名与类名相同

## 8. 箭头函数与普通函数的区别
- 箭头函数是匿名函数，不能作为构造函数
- 箭头函数不能使用`new`, 
- 箭头函数不能绑定`arguments`，要用`rest`参数解决
- 箭头函数没有原型属性
- 箭头函数的`this`永远指向其上下文的`this`
- 箭头函数不能绑定`this`，会捕获其所在的上下文的`this`值，作为自己的`this`值

## 9. 请简述原型/原型链/(原型) 继承
### 1. 什么是原型:
任何对象实例都有一个原型，也叫原型对象，这个原型对象由对象的内置属性 `_proto_` 指向它的构造函数的`prototype`指向的对象，即任何对象都是由一个构造函数创建的，但是不是每一个对象都有`prototype`只有方法才有`prototype`
### 2. 什么是原型链?
原型链基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。我们知道，每个构造函数都有一个原型对象，每个原型对象都有一个指向构造函数的指针，而实例又包涵一个指向原型对象的内部指针。
原型链的核心就是依赖对象的`_proto_`的指向，当自身不存在的属性时，就一层层的扒出创建对象的构造函数，直至到`Object`时，就没有`_proto_`指向了。因为`_proto_`实质找的是`prototype`，所以我们只要找这个链条上的构造函数的`prototype`。其中`Object.prototype` 是没有`_proto_` 属性的，它==`null`.

### 3. (原型) 继承
每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含指向原型对象内部的指针。我们让原型对象 (1)等于另一个原型对象的实例(2)此时原型对象 (2) 将包含一个指向原型对象 (1) 的指针再让原型对象(2)的实例等于原型对象 (3)，如此层层递进就构成了实例和原型的链条，这就是原型链的概念每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数想指针(constructon)，而实例对象都包含一个指向原型对象的内部指针(proto )。如果让原型对象等于另一个原型对象的实例，此时的原型对象将包含一个指向另一个原型的指针( proto )，另一个原型也包含着一个指向另一个构造函数的指针(constructor)。假如另个原型又是另一个类型的实例......这就构成了实例与原型的链条。也叫原型链原型继承是jis 的一种继承方式，原型链作为实现继承的主要方法,其基本思路是利用原型让一个引用类型继承另一个引用类型的属性和方法原型继承:利用原型中的成员可以被和其相关的对象共享这一特性，可以实现继承，这种实现继承的方式，就叫做原型继承.

## 10. 继承
### 1. 原型链继承（Prototype Inheritance）： 这是 JavaScript 中最基本的继承方式，通过将子类的原型指向父类的实例来实现继承。示例代码如下：
```js
// 父类
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.name);
}

// 子类
function Cat(name) {
  Animal.call(this, name);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

// 测试
var cat = new Cat("Tom");
cat.sayHello(); // 输出：Hello, I'm Tom

```
### 2. 构造函数继承（Constructor Inheritance）： 通过在子类的构造函数中调用父类的构造函数来实现继承。示例代码如下：
```js
// 父类
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.name);
}

// 子类
function Cat(name) {
  Animal.call(this, name);
}

// 测试
var cat = new Cat("Tom");
cat.sayHello(); // 输出：Hello, I'm Tom

```
3. 组合继承（Combination Inheritance）： 结合原型链继承和构造函数继承的方式，使子类既能继承父类的属性和方法，又能保持独立的实例。示例代码如下:
```js
// 父类
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.name);
}

// 子类
function Cat(name) {
  Animal.call(this, name);
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

// 测试
var cat = new Cat("Tom");
cat.sayHello(); // 输出：Hello, I'm Tom

```
### 4. 原型式继承（Prototype Chain Inheritance）： 通过使用一个空对象作为中介，将父类的实例作为子类的原型来实现继承。示例代码如下：
```js
// 父类
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.name);
}

// 子类
function Cat(name) {
  var obj = Object.create(Animal.prototype);
  obj.name = name;
  return obj;
}

// 测试
var cat = new Cat("Tom");
cat.sayHello(); // 输出：Hello, I'm Tom

```

### 5. 寄生式继承（Parasitic Inheritance）： 在原型式继承的基础上，增强子类对象，并返回一个新的对象以实现继承。示例代码如下：

```js
// 父类
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.name);
}

// 子类
function Cat(name) {
  var obj = Object.create(Animal.prototype);
  obj.name = name;
  obj.sayHello = function() {
    console.log("Meow, I'm " + this.name);
  };
  return obj;
}

// 测试
var cat = new Cat("Tom");
cat.sayHello(); // 输出：Meow, I'm Tom

```
### 6. 寄生组合式继承（Parasitic Combination Inheritance）： 在组合继承的基础上，优化父类构造函数的调用，避免在子类原型中创建无用的属性和方法。示例代码如下：

```js
// 父类
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.name);
}

// 子类
function Cat(name) {
  Animal.call(this, name);
}

(function() {
  var Super = function() {};
  Super.prototype = Animal.prototype;
  Cat.prototype = new Super();
})();

Cat.prototype.constructor = Cat;

// 测试
var cat = new Cat("Tom");
cat.sayHello(); // 输出：Hello, I'm Tom
```

### 7. ES6 的 class 继承： 在 ES6 中引入了 class 关键字来定义类和继承关系，使用 extends 关键字来实现继承。示例代码如下：
```js
// 父类
class Animal {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log("Hello, I'm " + this.name);
  }
}

// 子类
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

// 测试
let cat = new Cat("Tom");
cat.sayHello(); // 输出：Hello, I'm Tom
```

## 11. Promise 的理解
1. 什么是`Promise`?
我们都知道，`Promise`是承诺的意思，承诺它过一段时间会给你一个结果。
`Promise`是一种解决异步编程的方案，相比回调函数和事件更合理和更强大。
从语法上讲，promise 是一个对象，从它可以获取异步操作的消息
2. `promise`有三种状态: `pending`初始状态也叫等待状态，`fulfiled`成功状态,`rejected`失败状态;状态一旦改变,就不会再变。创造`promise`实例后，它会立即执行
3. `Promise`的两个特点
- `Promise`对象的状态不受外界影响
- `Promise`的状态一旦改变，就不会再变，任何时候都可以得到这个结果，状态不可以逆
4. `Promise`的二个缺点
- 无法取消`Promise`,一旦新建它就会立即执行，无法中途取消
- 如果不设置回调函数，`Promise`内部抛出的错误，不会反映到外部
- 当处于`pending`(等待)状态时，无法得知目前进展到哪一个阶段是刚刚开始还是即将完成

## 12. 一个页面从输入 URL 页面加载显示完成，这个过程中都发生了什么?
分为4个步骤
1. 当发送一个`URL`请求时，不管这个`URL`是`Web`页面的`URL`还是`Web`页面上每个资源的 `URL`，浏览器都会开启一个线程来处理这个请求，同时在远程`DNS`服务器上启动一个`DNS`查询。这能使浏览器获得请求对应的`IP`地址
2. 浏览器与远程`Web`服务器通过`TCP`三次握手协商来建立一个`TCP/IP`连接。该握手包括一个同步报文，一个同步-应答报文和一个应答报文，这二个报文在 浏览器和服务器之间传递。该握手首先由客户端尝试建立起通信，然后服务器响应并接受客户端的请求，最后由客户端发出该请求已经被接受的报文
3. 一旦`TCP/IP`连接建立，浏览器会通过该连接向远程服务器发送`HTTP`的`GET`请求。远程服务器找到资源并使用`HTTP`响应返回该资源
4. 此时，`Web`服务器提供资源服务，客户端开始下载资源

## 13. get 请求传参长度的误
误区: 我们经常说`get`请求参数的大小存在限制，而`post`请求的参数大小是无限制的。实际上`HTTP`协议从未规定`GET/POST`的请求长度限制是多少。对`get`请求参数的限制是来源与浏览器或`web`服务器，浏览器或`web`服务器限制了`url`的长度。为了明确这个概念，我们必须再次强调下面几点`HTTP`协议 未规定`GET`和`POST`的长度限制`GET`的最大长度显示是因为 浏览器和`web`服务器限制了`URI`的长度不同的浏览器和`WEB`服务器，限制的最大长度不一样要支持`IE`，则最大长度为`2083byte`，若只支持`Chrome`，则最大长度`8182byte`

## 14. get 和 post 请求在缓存方面的区别
`post/get` 的请求区别，具体不再整述补充补充个`get`和`post`在缓存方面的区别: 
- `get`请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
- `post`不同，`post`做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。

> 因此`get`请求适合于请求缓存

## 15. JS 的 new 操作符做了哪些事情
`new`操作符新建了一个空对象，这个对象原型指向构造函数的`prototype`，执行构造函数后返回这个对象

## 16. 改变函数内部 this 指针的指向函数 (bind，apply，call 的区别)
通过`apply`和`call`改变函数的`this`指向，他们两个函数的第一个参数都是一样的表示要改变指向的那个对象,第二个参数,`apply`是数组，而`call`则是`arg1,arg2...`这种形式。通过 `bind`改变`this`作用域会返回一个新的函数，这个函数不会马上执行

## 17. JS 的各种位置，比 clientHeight,scrollHeight,offsetHeight ,以及scrollTop, offsetTop,clientTop 的区别?
- `clientHeight`: 表示的是可视区域的高度，不包含`border`和滚动条
- `offsetHeight`: 表示可视区域的高度，包合了`border`和滚动条
- `scrollHeight`: 表示了所有区域的高度，包含了因为滚动被隐藏的部分
- `clientTop`: 表示边框 `border` 的厚度，在未指定的情况下一般为`O`
- `scrollTop`: 滚动后被隐藏的高度，获取对象相对于由 `offsetParent` 属性指定的父坐标(`css` 定位的元素或 `body` 元素)距离顶端的高度

## 18. 为什么会造成跨域/请简述同源策略
### 1. 为什么会造成跨域?
在前后端分离的模式下，前后端的域名是不一致的，此时就会发生跨域访问问题。在请求的过程中我们要想回去数据 般都是`post/get`请求所以..跨域问题出现跨域问题来源于`JavaScript`的同源策略，即只有 `协议+主机名+端口号(如存在)`相同，则允许相互访问。也就是说 `JavaScript`只能访问和操作自己域下的资源，不能访问和操作其他域下的资源。
### 2. 同源策略
是由 NetScape 提出的一个著名的安全策略。所谓的同源，指的是`协议，域名，端口`相同。浏览器处于安全方面的考虑，只允许本域名下的接口交互，不同源的客户端脚本，在没有明确授权的情况下，不能读写对方的资源。

## 19. 请输出三种减少页面加载时间的方式
1. 优化图片

2. 图像格式的选择(GIF: 提供的颜色较少，可用在-一些对颜色要求不高的地方)
3. 优化 CSS (压缩合并 css，如 margin-top, margin-left...)
4. 网址后加斜杠(如www.campr.com/目录，会判断这个目录是什么文件类型，或者是目录。)一cdn 托管
5. 标明高度和宽度(如果浏览器没有找到这两个参数，它需要一边下载图片一边计算大小，如果图片很多，浏览器需要不断地调整页面。这不但影响速度，也影影响浏览体验
当浏览器知道了高度和宽度参数后，即使图片暂时无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容。从而加载时间快了，浏览体验也更好了)
6. 减少 http 请求 (合并文件，合并图片)

## 20. this 指向
= 在`JavaScript`中，`this`通常指向的是我们正在执行的函数本身，或者是指向该函数所属的对象
- 全局的`this`>指向的是`Window`
- 对象中的`this`指向其本身
- 事件中`this`>指向事件对象

## 21. For 循环与 map 循环有什么区别
- `For`遍历对象自身的和继承可枚举的属性，也就是说会包括哪些原型链上的属性
- `Map`方法不会对空数组进行检测，`map` 会返回一个新数组，不会对原数
组产生影响

## 22. 重绘和回流是什么
- 回流:当`render tree`中的 部分或者全部因为元素的规模尺寸，布局隐藏等改变而需要重新构建，这就叫回流，每个页面至少需要一次回流就是在页面第一次加载的时候，这时候一定会发生回流，因为要构建`render tree`
- 在回流的时候，浏览器会使渲染树中收到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中这就是重绘
当`rendertree`中的一些元素需要更新属性，而这些属性只是影响元素的外观，不会影响布局，就叫重绘

## 23. HTTP 协议和HTTPS 区别
- `http`是超文本传输协议，信息是明文传输，`https`是具有安全性的`ssl`解密传输协议
- `http`和`https`连接方式完全不同,端口也不同,`http`是`80`,`https`是`443`
- `http`的连接很简单，是无状态的，`https`协议是由`ssl+http`协议构建的可进行加密传输，身份认证的网络协议，比`http`协议安全

## 24. 什么是 js 内存泄露?

内存泄漏是指一块被分配的内存既不能使用又不能回收，直到浏览器进程结束
释放内存的方法: 赋值为`null`

## 25. HTTP常见状态码？
- `100`: 这个状态码是告诉客户端应该继续发送请求，这个临时响应是用来通知客户端的，部分的请求服务器已经接受，但是客户端应继续发送求请求的剩余部分，如果请求已经完成，就忽略这个响应，而且服务器会在请求完成后向客户发送一个最终的结果
- `200`: 这个是最常见的 `http` 状态码，表示服务器已经成功接受请求，并将返回客广端所请求的最终结果
- `202`: 表示服务器已经接受了请求，但是还没有处理，而且这个请求最终会不会处理还不确定
- `204`: 服务器成功处理了请求，但没有返回任何实体内容 ，可能会返回新的头部元信息
- `301`: 客户端请求的网页已经永久移动到新的位置，当链接发生变化时返回 `301` 代码告诉客户端链接的变化，客户端保存新的链接，并向新的链接发出请求，已返回请求结果
- `404`: 请求失败，客户端请求的资源没有找到或者是不存在
- `500`: 服务器遇到未知的错误，导致无法完成客户端当前的请求.
- `503`: 服务器由于临时的服务器过载或者是维护，无法解决当前的请求

## 26. 预加载和懒加载的区别，预加载在什么时间加载合适
- 预加载是指在页面加载完成之前，提前将所需资源下载，之后使用的时候从缓存中调用。
- 懒加载是延迟加载，按照一定的条件或者需求等到满足条件的时候再加载对应的资源

> 两者主要区别是一个是提前加载，一个是迟缓其至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。

## 27. Js 的函数节流和函数防抖的区别

- 函数节流是指一定时间内`js`方法只执行一次, 函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码次
- 函数节流是 声明一个变量当标志位，记录当前代码是否在执行，如果正在执行，取消这次方法执行，直接`return`，如果空闲，正常触发方法执行
- 函数防抖是需要一个延时器来辅助实现，延迟执行需要执行的代码，如果方法多次触发，把上次记录的迟执行代码用` cleartimeout `清除掉重新开始，如果计时完毕，没有方法来访问触发，则执行代码

## 28.Get 和 post 不同
`Get` 是从服务器上获取数据，`post` 是向服务器传送数据在客户端，`get`通过`url` 提交数据，数据在`url` 中可以看到，`post` 方式数据放在 `html header` 中提交安全性问题
`Get`提交数据最多只能有 `1024` 字节，`post` 没有限制
## 29.什么是 csrf 攻击
Csrf (跨站点请求伪造) 攻击者在用户已经登录目标网站之后，诱使用户访问一个攻击页面，利用目标网站对用户的信任，以用户身份再攻击页面对目标网站发起伪造用户操作的请求，达到攻击目的
## 30. [1, 2, 3].map(parseInt) 答案是多少
```js
/**
 * 这是因为你在使用 map() 方法时传递的回调函数是 parseInt。
 * map() 方法会对数组中的每个元素都调用一次指定的回调函数，并返回一个新数组，其中包
 * 含回调函数的返回值。
 * 在 parseInt 函数中，它接收两个参数：要解析的字符串和解析的基数（可选，默认为十进* 制）。在 map() 中，当前元素会作为第一个参数传递给 parseInt，而当前元素的索引则会* 作为第二个参数（即基数）传递给 parseInt。
 * 让我们来逐个解析 [1, 2, 3].map(parseInt) 的步骤：
 * 第一个元素是 1，将其作为字符串 "1" 传递给 parseInt，解析的基数为 0（索引）。在基* 数为 0 的情况下，parseInt("1", 0) 会将字符串解析为十进制数，结果为 1。
 * 第二个元素是 2，将其作为字符串 "2" 传递给 parseInt，解析的基数为 1（索引）。在基* 数为 1 的情况下，parseInt("2", 1) 会尝试将字符串解析为一进制数，但是一进制中只能 * 用 0 表示数字，因此解析失败，返回 NaN。
 * 第三个元素是 3，将其作为字符串 "3" 传递给 parseInt，解析的基数为 2（索引）。在基* 数为 2 的情况下，parseInt("3", 2) 会尝试将字符串解析为二进制数，但是二进制数中只* 能使用 0 和 1 表示数字，因此解析失败，返回 NaN。
 * 所以最终得到的结果是 [1, NaN, NaN]。
 *  如果你想得到期望的结果 [1, 2, 3]，你可以使用箭头函数或指定回调函数的参数来忽略基* 数的影响，例如 [1, 2, 3].map(num => parseInt(num)) 或 [1, 2, 3].map((num, *       index) => parseInt(num))。
 */
console.log([1, 2, 3].map(parseInt)) // [1, NaN, NaN]
```

## 31. `Object.create(null)`和`{}`区别？
`Object.create(null)`创建一个没有原型的新对象。这意味着生成的对象没有继承的属性或方法。它通常用作简单的字典对象，因为它允许设置和访问键，而不会与继承的属性或方法发生任何潜在冲突。
```js
const obj = Object.create(null); // 返回了一个没有任何属性的对象
console.log(obj.__proto__); // undefined
```
`{}`用`object`创建了一个新对象。`{}`的原型是`Object.prototype`。这意味着生成的对象继承了`Object.prototype`的所有属性和方法。这在某些情况下是有用的，但如果不小心，也可能导致意想不到的行为。
```js
const obj2 = {};
console.log(obj2.__proto__ === Object.prototype) // true
```
## 32. 函数防抖
```js
function debounce(func, duration = 500) {
  let timerId;
  // return 返回的函数一定不要用箭头函数，因为保证 this 一致
  return function(...args) {
    clearTimeout(timerId);

    // setTimeout 一定要用箭头函数
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, duration);
  };
}
```