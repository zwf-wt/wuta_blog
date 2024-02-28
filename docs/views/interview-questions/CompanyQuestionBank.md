# 某公司题库

## 一、选择题
### 1. 以下哪种方式不能改变作用域链？
A. eval

B. while

C. try...catch

> 答案：B

### 2. 下列关于 `web` 页面级优化描述最正确的是
A. 减少 HTTP 请求次数

B. 进行资源合并和压缩

C. 将外部脚本置于低端

D. 以上描述都对

> 答案: D

### 3. 浮动会导致页面非正常显示，以下几种清除浮动的方法，哪个是不推荐使用的？
A. 在浮动元素末尾添加一个空的标签, 并添加样式 clear:both。

B. 通过设置父元素 `overflow` 值为 hidden

C. 给父元素添加 clearfix 类

D. 父元素也设置浮动

> 答案：D

### 4. 物理学研究与艺术创作有异曲同工之妙，若是不能（），就只能千锤百炼，通过成年累月的辛苦工作来解开暗物质的谜团了。填入括号部分最恰当的一项是
A. 一蹴而就

B. 妙手偶得

C. 灵机一动 

D. 守株待兔

> 答案：B

### 5. 在JavaScript中，如果需要创建某一种产品对象类的实例，一般采用哪种设计模式？
A.	抽象工厂模式

B.	工厂方法模式

C.	建造者模式

D.	简单工厂模式

> 答案：D
### 6. 当在手机中需要保存移动手机号码时，怎样才能知道输入的手机号就是11位的移动手机号？
```js
// A.
var filt=^1[0-9]{10};
if (!filt.test(str)) {
  alert(“手机号输入错误”)
}

// B.
var filt=/^1[0-9]{10}*$/;
if (!filt.test(str)) {
  alert(“手机号输入错误”)
}

// C.
var filt=/^[0-9]{10}/;
if (!filt.test(str)) {
  alert(“手机号输入错误”)
}

// D.
var filt=/^1[0-9]/;
if (!filt.test(str)) {
  alert(“手机号输入错误”)
}
```
> 答案：B

### 7.	下面代码的输出结果是
```js
var num = Number("Hello")
console.log(typeof num)
```
A. hello

B. number

C. NaN

C. string

> 答案：B

### 8. 下面代码的输出结果是

```js
var text = "mom and dad and baby"
var pattern = /mom(and dad( and baby)?)?/gi
var matches = pattern.exec(text)
console.log(matches[2])

```
A.	mom and dad

B.	mom and dad and baby

C.	and dad and baby

D.	and baby
> 答案：undefined

### 9. `JavaScript` 设计模式中的有关组合模式的说法，不正确的是：
A. 又称为`部分-整体`模式。

B. 是将对象组合成树形结构以表示“部分-整体”的层次结构。

C. 使行用户对单个对象和组合对象的使用具有一致性。

D. 该模式会导致大量的代码重构

> 答案：D

### 10. 深拷贝和浅拷贝只是针对引用数据类型的
A. T

B. F

> 答案：A

### 11. 关于这段代码正确的结论是：
```js
var F = function(){};

Object.prototype.a = function(){}

Function.prototype.b = function(){}

var f = new F();
```
A. F 能取到 a, 不能取到 b

B. F能取到b，不能取到a

C. f能取到a，但取不到b

D. f能取到a，b

> 答案：D

### 12. 下面代码的输出结果是：
```js
var myObject = {
  foo: "bar",
  func: function() {
    var self = this;
    console.log( this.foo, self.foo);
    (function() {
      console.log(this.foo, self.foo);
    })();
  }
}
```
A. undefined bar undefined bar

B. bar bar bar undefined

C. bar bar bar bar

D. bar bar undefined bar
> 答案: D

### 13. 设置文字颜色应使用属性
A. font-family

B. color

C. font-color

D. font

> 答案：B

### 14. 以下代码常见的应用场景是：
```js
var form = document.getElementById("myForm");
EventUtil.addHandler(form, "submit", function(event){
  event = EventUtil.getEvent(event);
}
```
A. 获取表单的提交事件对象，提交给服务器进行处理

B. 阻止按钮的默认点击事件，以免发送给服务器

C. 获取表单的提交事件对象，阻止接收服务器返回的数据

D. 当表单数据无效时，可以阻止表单提交的默认事件，不发送给服务器

> 答案：D

### 15. 在 js 中，用于对底层结构兼容性做统一封装来简化用户使用，一般采用哪种设计模式
A. 适配器模式

B. 单例模式

C. 外观模式

D. 原型模式

> 答案：C

### 16. JS 中的数字在计算机内存存储为多少Byte?
A. 16Byte

B. 2Byte

C. 4Byte

D. 8Byte

> 答案：D

### 17. `let {x, y, ...z} = {x: 1, y: 2, a: 5, b: 6}` 的解构结果为：
A. `x = 1, y = 2, z = {a: 5, b: 6}`

B. `x = 1, y = 2, z = {a: 5}`

C. `x = 1, y = 2, z = 5`

D. `x = 1, y = 2, z = 6`

> 答案：`A`
### 18.	在JavaScript中，如果需要限制某个对象类只能实例化一次，一般采用哪种设计模式？
A. 单例模式

B. 简单工厂模式

C. 抽象工厂模式

D. 工厂方法模式

> 答案：`A`

### 19. 以下代码执行后，`array` 的结果是？
```js
var array = [-1,1,3,4,6,10]
array.sort((a,b) => Math.abs(a - 3) - Math.abs(b - 3))
```
A. `[10, -1, 6, 1, 4, 3]`

B. `[10, 6, 4, 3, 1, -1]`

C. `[3, 4, 1, 6, -1, 10]`

D. `[-1, 1, 3, 4, 6, 10]`

> 答案：`C`

### 20. 哪一个html盒模型中的border的正确写法？
```css
/* A */
p {
  border:5px solid red;
}

/* B. */
p {
  border: 5px red solid;
}

/* C. */
p {
  border: red solid 5px;
}

/* D. */
p {
  border: solid red 5px;
}
```
> 答案：`A`
### 21. 浏览器的顶层对象是指
A. global

B. window

> 答案：`B`

### 22. 从字符串`const str = 'qwbewrbbeqqbbbweebbbbqee'`,中能得到结果`["b", "bb", "bbb", "bbbb"]`以下错误语句是？
A. str.match(/b*/g)

B. str.match(/b+/g)

C. str.match(/b{1,4}/g)

D. str.match(/b{1,5}/g)

> 答案：`A`

### 23. (多选)import导入模块使用正确的有（）
A. `import * as example from "./exportExample.js"`

B. `import {add}  from "./example.js"`

C. `import {add,edit,save} from "./exportExample.js"`

D. `import add from "./example.js"`

> 答案：`A、B、C、D`

### 24. (多选)以下哪个属于ES6的声明变量的方法
A. var

B. let

C. import

D. class

> 答案：`B、D`

### 25 (多选)以下哪些是HTML5的特性：
A. 对本地离线存储的更好的支持

B. 对于浏览器事件更好的支持

C. 用于绘画的canvas元素

D. 用于媒介回放的video和audio元素

E. 新的表单控件，比如calendar、date、time、url、search

> 答案： `A、C、D、E`

### 26. (多选)下面关于IE、FF下面CSS的解释区别描述正确的有？
A.	FireFox的div的内嵌div可以把父级的高度撑大，而IE6.0不可以，要自己设置高度

B.	当设置为三列布局时，FireFox的float高度不能达到100%，而IE6.0可以，当设置为两列布局时，两种浏览器都可以

C.	火狐浏览器中，非float的div前面有同一父级的float的div，此div若有背景图，要使用clear:both，才能显示背景图，而IE6.0中不用使用
clear:both

D.	在[text-decoration:underline]的属性下，IE6.0显示的下划线会比FireFox低一点，在FireFox中，部分笔画会在下划线的下面1个像素左右

> 答案：`C、D`

### 27. (多选)关于Generator函数yield表达式，说法正确的是（）
A. Generator函数可以不用yield表达式

B. yield表达式与普通函数的return语句功能一样

C. 遇到yield表达式，就暂停执行后面的操作

D. 函数体内部使用yield表达式，定义不同的内部状态

> 答案：`C、D`

### 28. (多选)JavaScript设计模式中的装饰者模式的特点有：
A. 可以添加功能且不改变原对象的原本结构

B. 装饰对象中包含对原对象的引入

C. 装饰对象和原对象具有相同的接口

D. 装饰对象是真正的原对象经过包装后的对象

> 答案：`A、C、D`

### 29. (多选)一个完美的JavaScript实现包括哪些内容
A. ECMAscript

B. Dom

C. Bom

D. cenvi

> 答案：`A、B、C`

### 30. (多选)有关JavaScript设计模式中的组合模式，正确的是
A. 最底层的对象不具备子成员

B. 上一层的对象可以具备子成员

C. 组合模式是多层次的组合

D. 组合模式是单层次的组合

> 答案：`C`

### 31. (多选)关于webpack打包，描述正确的是：
A. 打包时没有办法处理图片

B. 只能打包成一个js

C. 打包时要注意路径的配置

D. 生产环境须压缩代码，以保证安全性

> 答案：`C`

### 32. (多选)如果说代码时可维护的，它需要遵循哪些特点：
A. 可适应性

B. 可理解性

C. 直观性

D. 可扩展性

E. 可调试性

> 答案：`A、B、C、D、E`

### 33. (多选)以下哪些调用场景会导致跨域问题：
A. 主域和子域之间的调用

B. 不同域名下页面的调用

C. 同一域名下不同的端口号之间的调用

D. 域名和域名对应的IP之间的调用

> 答案：`A、B、C、D`

### 34. (多选)以下对引用类型指描述正确的有：
A.	引用类型的值是对象，保存在栈内存中

B.	包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针

C.	从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终指向同一个对象

D.	确定一个值是哪种引用类型可以使用typeof操作符

> 答案：`B、C`

### 35.		(多选)Iframe的使用场景有？
A.	与第三方域名下的页面共享cookie

B.	资源加载

C.	左边固定右边自适应的布局

D.	上传图片，避免当前页刷新
> 答案：`B、C、D`
### 36.	(多选)有关JavaScript设计模式中的状态模式，其作用在于：
A.	依赖于if/else实现

B.	每种判断条件都是对象内部的一种状态

C.	可以减少代码中的条件判断语句

D.	更加方便管理

> 答案：`B、C、D`

### 37.	ECMAScript中函数可以重载
A.	T

B.	F

> 答案： B

### 38.	javaScript具有自动垃圾回收机制
A.	对

B.	错

> 答案：A
### 39.	JavaScript设计模式中的装饰者模式很简单，就是对原有对象的属性与方法的添加
A.	对

B.	错

> 答案：`B`
### 40.	JavaScript中的链模式就是通过在对象中的每个方法调用执行完毕后返回当前对象this来实现的
A.	T

B.	F

> 答案：`A`


### 43.	数据访问对象（DAO）模式即是对数据库操作（CRUD等）进行封装，提供简单统一的操作接口
A.	T

B.	F

> 答案：`A`

### 44.	Webpack是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码，从而在现有环境执行
A.	T

B.	F

> 答案：`B`

### 45.	JavaScript设计模式中的享元模式是将数据分为内、外部数据，并将方法分为内、外部方法
A.	对

B.	错

> 答案：`A`

### 46.	命令模式是将执行的命令封装，解决命令发起者和执行者之间的耦合
A.	T

B.	F

> 答案：`A`


### 47.	Generator函数是ES6提供的一种同步编程解决方案，语法行为与传统函数基本相同
A.	T

B.	F

> 答案：`B`

### 48.	对于JavaScript设计模式中的责任链模式，使得多个对象都有机会处理请求，避免请求的发送者和接收者之间的耦合关系
A.	对

B.	错

> 答案：`A`

### 49.	中午午休时间，我们需要离开工位一段时间，外出就餐，以下操作中能够保证电脑资料相对安全的是：
A.	将电脑进行锁屏设置

B.	将没有设置密码的电脑进行关机

C.	将重要文件拷贝到U盘里，将U盘带在身上

D.	不需要对电脑进行特殊处理，直接离开即可

> 答案：`A`

### 50.	以下哪个场景适合适用basc64？
A.	api中返回用户头像

B.	登录功能中加密用户密码

C.	数据库中加密用户密码字段

D.	以上三项都合适

> 答案：`A`

### 51.	应用程序开发过程中，下面哪种开发习惯可能导致安全漏洞？
A.	在使用数组前判断是否越界

B.	在程序代码中打印日志输出敏感信息方便调试

C.	在生成随机数据前使用当前时间设置随机数种子

D.	设置配置文件权限为r-r-r-

> 答案：`B`

### 52.	以下关于图形验证码的说法中，正确的是

A.	当用户输入了正确的验证码后，验证码才失效，更换。

B.	无论用户输入的验证码是否正确，判断后该验证码都必须立即失效，更换。

C.	图形验证码人人都可以识别，没有存在的必要

D.	图形验证码可以直接以文字的形式显示到页面上

> 答案：`B`

### 53.	隐藏用户手机号中间4位的方法是
A.	储存用户手机号时就不储存中间4位

B.	在服务端将中间4位替换为*号

C.	在客户端将中间4位替换为*号

D.	以上方法都可以

> 答案：`C`

### 54.	以下哪项活动对安全编码没有帮助
A.	编码培训

B.	安全编码规范

C.	代码审计

D.	代码版本管理

> 答案：`D`

### 55.	网络安全的含义？
A.	网络安全是指信息的传播及内容具有控制能力

B.	网络安全是指网络系统的硬件、软件及其系统中的数据受到保护，不因偶然的或者恶意的原因而遭受到破坏

C.	网络安全是指包括数据敏感类的传播方式

D.	网络安全是指，信息的传播及内容具有控制能力，包括数据敏感类的传播方式

> 答案：`B`

### 56.	以下哪些信息可以仅在前端做验证？
A.	用户邮箱格式

B.	用户昵称

C.	用户邮箱地址

D.	以上全都可以

> 答案：`D`


### 57.	《网络安全法》从什么时候开始实施
A. 2018年1月1日

B.2016年11月1日

C.2017年6月1日

D.2016年12月18日

> 答案：`C`


### 58.	作为信息安全管理人员，你以为变更管理过程最重要的是？
A.	变更过程要留痕

B.	变更申请与上线提出要经过审批

C.	变更过程要坚持环境分离和人员分离原则

D.	变更要与容灾预案同步

> 答案：`B`

### 59.	获取input节点的正确方法（）
A.	document.getElementByTagName(‘file’)[0]

B.	document.getElementById(‘file’)[0]

C.	document.getElementByName(‘file’)[0]

D.	document.querySelectorAll(‘file’)[0]

> 答案：`D`

### 60.	下面代码的输出结果是：
```js
var flag = true
console.log(typeof(typeof(flag)))
```
A.	true

B.	string

C.	boolean

D.	flag

> 答案：`B`

### 61.	下列全部属于css单位的是
A.	%，px,em

B.	sp,dp,%

C.	px,dp,%

D.	pt,sp,px

> 答案：A

### 62.	以下哪个选项不是块级元素（）
A.	p

B.	span

C.	div

D.	h1

> 答案：B
### 63.	下面选择器哪个优先级最高？
A.	html元素的内联样式

B.	类选择器、属性选择器

C.	Html元素选择器，伪元素选择器

D.	ID选择器的样式

> 答案：D

### 64.	JavaScript中`document.getElementById`的返回值的类型为（）
A.	Function

B.	Array

C.	Object

D.	string

> 答案：C
### 65.	img标签中src属性表示
A.	图片存储的地址

B.	图片的描述

C.	图片的名称

D.	图片大小

> 答案：A

### 66.	BOM的核心对象是
A.	screen

B.	location

C.	history

D.	window

> 答案：D

### 67.	下面代码的输出结果是：
```js
var colors = [“red”,”green”,”blue”,”yellow”,”purple”]
console.log(colors.slice(1,4))

```
A.	[“red”,”green”,”blue”]

B.	[”green”,”blue”,”yellow”] 

C.	[”green”,”blue”,”yellow”,”purple”]

D.	[“red”,”purple”]

> 答案：B
68.	下列代码中hasOwnProperty的作用是？
```js
var obj = {}
... ...
obj.hasOwnProperty(“val”)
```
A.	判断obj的原型对象是否具有val的属性

B.	判断obj对象是否具有val的属性

C.	判断obj对象是否具有val的值

D.	ECMAScript正则表达式不支持的特性有哪些判断obj的原型对象是否具有val的值

> 答案：B
### 69.	下列关于websocket协议，描述错误的是：
A.	让浏览器和服务器建立全双工通信，任何一方都可以主动发消息给对方

B.	WebSocket连接可以由浏览器发起，也可以由服务端发起

C.	WebSocket不是全新的协议，而是利用了HTTP协议来建立连接

D.	GET请求的地址不是类似/path/，而是以ws：//开头的地址

> 答案：B
### 70.	`let [a, b, ...c] = [“n”]` 解构之后的结果为
A.	a=undefined, b=undefined,c=”n”

B.	a=”n”, b=undefined,c=undefined

C.	a=”n”, b=undefined,c=undefined

D.	a=”n”, b=undefined,c=[]

> 答案：D

### 71.	以下描述错误的是

A.	cookie以及loaclStorage都会伴随着http请求发送到服务器

B.	在JavaScript中可以操作cookie

C.	Html5中的新增存储方式包括loaclStorage/sessionStorage

D.	Get提交的url会有长度的限制，而post提交的数据则可以比较大

E.	JavaScript在浏览器的执行是单线程的

> 答案：A

### 72.	哪些方案可以解决前端跨一级域传值问题：

A.	JsonP

B.	利用Nginx代理解决

C.	采用CORS解决

D.	共享cookie

> 答案：`D`

### 73.	对于JavaScript设计模式中的责任链模式，以下说法正确的是：
A.	适用于公司的一些申请流程

B.	这是一种链式接口，每个节点有两种操作：停止该请求的操作或将请求转发到下一节点

C.	需要借助java代码实现

D.	具有发布-订阅的一对多特性

> 答案：B

### 74.	为了增加代码的可维护性，可以采用以下哪些手段：
A.	避免写注释，减少代码体积

B.	解耦CSS，JavaScript

C.	解耦应用逻辑，事件处理程序

D.	解耦HTML,JavaScript

> 答案：B、C、D

### 76.	关于异常捕获，以下描述正确的是：
A.	try catch性能损耗大，捕获不到异步错误，可能导致报错点模糊

B.	try里边代码报错时，catch里边代码才会执行

C.	try里边代码报错时，finally里边代码才会执行

D.	如果catch和finally都出错，则会catch和finally里面的错误

> 答案：B

### 77.	有关JavaScript设计模式中的模板方法模式，以下正确的是：

A.	子类做出任何改动需通知父类

B.	该模式的核心在于对方法的重用

C.	核心方法应封装在基类中

D.	子类继承的方法也是可以扩展和重写的

> 答案：BD

### 78.	有关Set和Map的说法，正确的有()
A.	set的成员可以重复

B.	Set只有键值没有键名，类似数组

C.	Map本质上是键值对的集合

D.	二者都可以遍历

> 答案：`BCD`


### 79.	将一个JavaScript对象的接口转化成另外一个接口，以满足用户需求，解决对象之间接口的不兼容问题，可以选用适配器模式。
A.	对

B.	错

> 答案：`A`
### 80.	WeakMap支持clear方法
A.	T

B.	F

> 答案：`B`
### 81.	JavaScript访问者模式解决了数据与数据的操作方法之间的耦合，将数据的操作方法独立于数据，增加了操作数据的灵活性。
A.	T

B.	F

> 答案：`A`
### 82.	JavaScript设计模式中的组合模式，整体是部分的组合，不同的部分进行组合又丰富了整体
A.	对

B.	错

> 答案：`A`
### 83.	正则表达式中，\B描述单词的前或后边界
A.	T

B.	F

> 答案：`B`


### 84.	如果你需要使用朋友家的电脑处理工作事宜，以下做法中比较安全的是：
A.	如果需要使用网络收发邮件，重要、机密的邮件不要处理

B.	先将文件上传到互联网网盘上，再通过朋友家电脑下载后进行处理

C.	将U盘文件拷贝到朋友电脑上进行处理

D.	将U盘插到朋友电脑上，在U盘里直接处理文件，中途离开不退出U盘

> 答案：`A`

### 85.	对系统安全需求进行评审，以下哪类人不适合参与
A.	系统分析员

B.	业务代表

C.	安全专家

D.	合规代表

> 答案：`A`

### 86.	对于邮件中的附件，应该采取的正确的方式是
A.	要能在确信附件来源可靠并且知道是什么内容的情况下才可以打开附件

B.	对于扩展名为.bait、.com、.ese、.vbs的附件可以直接打开

C.	针对来历不明邮件中的附件，如果紧急可以打开

D.	对于微软文件类型的附件可以不经过病毒扫描直接打开

> 答案：`A`

### 87.	Linux系统中，日志文件一般储存在哪个目录？
A.	/var/log

B.	/usr/log

C.	/tmp/log

D.	/etc/log

> 答案：`A`
### 88.	从哪些地方下载的应用程序比较安全？
A.	国内各种软件下载站

B.	软件官方网站

C.	百度搜索结果前几页

D.	以上说法都正确

> 答案：`B`
`
### 89.	以下行为不属于违反信息安全规范的是：
A.	使用个人申请的邮箱注册互联网论坛社交应用账号

B.	将公司内部资料上传到互联网网盘并在家中下载操作

C.	在内网办公终端上安装使用盗版软件

D.	将公司内部机密文件存储在安全U盘并带回家中在互联网操作

> 答案：`A`

### 90.	在连接互联网的计算机上（）处理、存储涉及国家秘密和企业秘密信息
A.	不确定

B.	严禁

C.	可以

D.	只要网络环境安全就可以

> 答案：`B`

### 6. 下列那一个不是属性
A. Charat

B. Type

C. Src

D. Style

> 答案：`A`

### 12. 浏览器的顶层对象是（）
A.	Window

B.	Global

> 答案：`A`

### 14. Javascript设计模式中的有关组合模式的说法不正确的是
A.	使得用户对单个对象和组合对象的使用具有一致性

B.	又称为“部分-整体”模式

C.	是将对象组合或结构以及表示层次结构

D.	该模式会造成大量的代码重写

> 答案：`D`

### 16. 在javascript中，用于对底层结构兼容性封装来局化用户使用，一般采用那种设计模式。

A.	适配器模式

B.	单例模式

C.	原型模式

D.	外观模式

> 答案：`D`

### 22. 请根据以下代码给出`book.gettype()`的运行效果
```js
function createBook(name,time,type) {
  var o = new Object()
  o.name = name;
  o.type = type;
  o.time = time
  return o
}
var a = createBook(“book”,2014,”js”)
```
A.	js book

B.	2014 

C.	Js

D.	Book

> 答案：`C`

### 23. input元素的type属性的取值可以是（）
A. Checkout

B. Image

C. Select

D. Button

> 答案：`A、B、D`

### 25. 当用户打开一个网页时，想一直停留在当前打开的网页，禁止页面前进后退，下列不正确的是（）

A.	window.history.forwad(1)

B.	window.history.back(1)

C.	window.history.go(-1)

D.	window.history.forwad(-1)

> 答案：`BC`

### 28. ECMAScript正则表达式不支持的特性有那些
A.	向后查找lookbehind

B.	并集与交集

C.	向前查找lookbehead

D.	正则表达式注释

> 答案：`ABD`

### 31. 下列那些标识符是错误的
A.	_name

B.	666age

C.	Null

D.	$count

> 答案：`BC`
### 32. 以下对引用类型描述正确的有
A.	包含引用类型值的变量实际上包含的并不是对象本身，只是一个指向对象的指针

B.	引用类型的值是对象，保存在栈内存中

C.	从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因为两个变量最终指向同一个变量

D.	确定了一个值是那种引用类型可以使用typeof操作符

> 答案：`AC`

### 36. javascript具有自动垃圾回收机制
A.	对

B.	错

> 答案：`A`

### 37. 将一个javascript对象的接口转化另外一个接口，以满足用户需求，解决对象之间接口的不兼容问题，可以选用适配器模式
A 对

B 错

> 答案：`A`

### 38. Javascript设计模式中的享元模式是将数据分为内，外部数据，并将方法分为内外部方法
A.	对

B.	错

> 答案：`A`

### 39. Javascript设计模式中的享元模式是指重复利用某个颗粒度的对象
A.	对

B.	错

> 答案：`A`

### 40. 对于Javascript设计模式中的责任链模式，使得多个对象有机会处理请求，避免请求的发送者和接收者之间的耦合关系
A.	对

B.	错

> 答案：`A`


### 42. javascript访问者模式解决了数据与数据的操作方法之间的耦合，将数据的操作方法独立于数据，增加了操作数据的灵活性
A.	T

B.	F

> 答案：`A`

### 43. Javascript设计模式中的组合模式，整体是部分的组合，不同的部分进行组合又丰富了整体
A.	T

B.	F

> 答案：`A`

### 44. 命令模式是将执行的命令封装，解决命令发起者与执行者之间的耦合
A.	T

B.	F

> 答案：`A`

### 45. 正则表达式中，\B描述单词的前或后边界
A.	T

B.	F

> 答案：`B`

### 1.	读取localStorage数据的方法是
A.	localStorage.loadItem(“键名”)

B.	localStorage.loadItem(“键值”)

C.	localStorage.getItem(“键值”)

D.	localStorage.getItem(“键名”)

> 答案：`D`

### 2.	程序输出结果是
```js
Promise.resolve(1)
  .then(res) => {
    console.log(res)
    return 2
  }.catch(err) => {
    return 3
  }.then(res) => {
    console.log(res)
  }

```
A.2 1

B.2 1 3 

C.2 3 1

D.1 2

> 答案：`D`

### 3.	css样式下面那一个元素能够达到最大宽度，且最后各有一个换行
A. Box Element

B. Side Element

C. Square Element

D. Block Element

> 答案：`D`

### 4.	下面呢一种不属于js的六种基本数据类型
A. Null

B. Undefined

C. String

D. Object

> 答案: `D`

### 5.	`var value = 5 + 3 + "7" `,value的结果是
A. 15

B. 0

C.	Null

D.	87

> 答案：`D`

### 6.	下列代码的显示结果是
```js
var x = new Boolean(false)
if(x){
  alert('h1')
}

var y = Boolean(0)
if(y){
  alert('hello')
}

```
A. H1

B. H1 hello

C. Hello

D. 不显示

> 答案：`A`


### 7.	以下关于cookie描述错误的是
A. 浏览器对于cookie的尺寸和个数都有限制

B. 如果设置的cookie失效时间是个已经过去的事件，则cookie会立刻被删除

C. 指定安全标志后 cookie只有在使用SSL连接时才会发送到服务器

D. Window.cookie属性可以设置为一个新的cookie字符串

> 答案：`D`

### 8.	通过Javascript控制id=”d1”的div隐藏，使用的代码是
A.	document.getElementById(‘d1’).style.display = “none”

B.	document.getElementById(‘d1’).style.show = “false”

C.	document.getElementById(‘d1’).style.show = “none”

D.	document.getElementById(‘d1’).style.display = “false”

> 答案：`A`


### 9. 其中两次alert输出结果为
```js
var foo = “hello”
(function(){
  var bar = “word”
  alert(foo+bar)
  }
)()
alert(foo+bar)
```
A.	hello world 报错

B.	Hello word hello world 

C.	Hello world hello

> 答案：`A`

### 10.	下面有关javascript系统方法的描述 错误的是
A.	parseFloat方法 该方法将一个字符串转化成对应的小数

B.	IsNaN方法 该方法用于检测参数是否为数值型 如果是返回true 否则 返回false

C.	Escape方法 该方法返回一个字符串编码后的结果字符串

D.	Eval方法 该方法某个参数字符串作为一个javascript执行

> 答案：`B`


### 12.	以下那种是javascript的复杂数据类型
A.	Undefined

B.	Null

C.	Object

D.	Number

> 答案：`C`

### 13.	多重css样式的优先级最低的是

A.	浏览器缺省设置

B.	外部样式表

C.	内部样式表（位于标签内部）

D.	内联样式（在HTML元素内部）

> 答案：`A`

### 17.	 x的值是
```js
function A() {
  this.do = function(){
    return ‘foo’
  }
}
A.property = function () {
  this.do = function() {
    return ‘bar’
  }
}
var x = new A().do()
```
A.	Bar

B.	报错

C.	Foo

D.	Undefined

> 答案：`C`

### 19.	下列代码输出为true的是
A.	alert(isNaN(10))

B.	alert(isNaN(‘true’))

C.	alert(isNaN(‘10’))

D.	alert(isNaN(true))

> 答案：`B`

### 21.	遍历数组的方法
A.	Values

B.	Keys

C.	entries

D.	Iterator

> 答案：`ABC`

### 23.	有关javascript设计模式中的组合模式，正确的是
A.	组合模式是多层次的组合

B.	最底层的对象不具备子成员

C.	上一层的对象可以具备子成员

D.	组合模式是单层次的组合

> 答案：`AC`

### 24.	以下那三种使用css来格式化网页的方式
A.	在HEAD中引用

B.	作为标记来引用

C.	作为文件来引用

D.	在BODY中引用

> 答案：`ABC`

### 25.	以下那些是HTML5的特性

A.	用于绘画的canvas元素

B.	用于媒介回访的video和audio元素

C.	对本地离线存储更好的支持

D.	对于浏览器事件更好的支持

E.	新的表单控件比如date time url search

> 答案：`ABCE`

### 26.	对于javascript设计模式中的状态模式，由于这个状态需要所有用户访问，所以该状态变量应该是状态对象外部的公有变量
A.	T

B.	F

> 答案：`B`

### 27.	对于javascript设计模式中的策略模式其目的是将算法的使用与算法的实现分离开来

A. T

B. F

> 答案：A


### 29.	在javascript中介者模式中，订阅者是双向的，就可以是消息的发布者也可以是订阅者
A.	T

B.	F

> 答案：B

### 30.	javascript中的链式模式就是通过在对象中的每个方法调用执行完毕后返回当前对象this来实现的
A.	T

B.	F

> 答案：`A`

### 31.	在javascript中介者模式中消息统一由中介者对象发布 所有订阅者对象间接被中介者管理
A.	T

B.	F

> 答案：A

### 32.	javascript语言的对象继承是通过接口来实现的
A.	T

B.	F

> 答案：A

### 39.javascript设计模式中的模板方法模式就是多个模型抽象化归一从中抽象提去出来一个基本模板
A.	T

B.	F

> 答案：A

### 33.	javascript设计模式中的享元模式是将数据分为内外部数据，并将方法分为内外部方法
A.	T

B.	F

> 答案：A

### 34.	对于javascript设计模式中的责任链模式，使得多个对象都有机会处理请求，避免请求的发送者与接收者之间的离合关系
A.	T

B.	F

> 答案：A

### 3.	下面关于软件测试的说法错误的是
A.	测试方案和测试结果应当成为软件开发项目文档的主要不问被妥善的保存

B.	所谓黑盒测试就是测试过程中不测试报告中的进行描述，切对外严格保密

C.	出于安全考虑再测试过程中尽量不要使用真是的生产数据

D.	软件测试不仅应关注需要的功能是否可以实现，还要注意是否有不需要的功能被实现了

> 答案：`B`


### 5.	为防止病毒感染和传播 日常应用中应做到
A.	安装公司规定的统一采购的防病毒软件

B.	不点击或打开来源不明的邮件和链接

C.	使用安全移动存储介质前先杀毒

D.	以上都是

> 答案：`D`

### 7.	当局域存在xss时，仅使用CSRFTOKENS是否防御CSRF漏洞
A.	如果cookie设置了httpOnly标识就可以

B.	可以

C.	xss为存储型xss时就不可以

D.	不可以

> 答案：`D`

### 8.	用户登录成功后客户端要求查询账号信息（根据userid查询） 这个userid可以通过什么方法取值
A.	客户端cookie中的userid

B.	客户端post提交的userid

C.	Session中的userid

D.	以上方法都可以

> 答案：`D`

### 9.	当你需要U盘到客户电脑拷贝文件时，此时该U盘有公司重大成果文件，为了保证文件资料不被泄露，相对比安全的措施是
A.	亲自拿U盘到客户电脑拷贝，拷贝过程中不离开

B.	拷贝前下载U盘加密器，对U盘进行加密

C.	将文件内容进行加密设置

D.	告知客户该U盘有重要文件请忽打开和下载

> 答案：`A`

### 10.	以下可能会造成信息泄露的是
A.	将贵重物品，含有机密信息的资料接入框中

B.	离开时，对所使用的电脑桌面进行锁屏

C.	在公共场合谈论公司信息

D.	复印或打印的资料及时取走

> 答案：`C`

### 1.	如下代码输出的结果是什么
```js
console.log(1 + '2' + '2')
console.log(1 + '      ' + '2'+ '2')
console.log('A' - 'B' + '2')
console.log('A' - 'B' + 2)
```
A.122 122 NaN NaN

B.122 32 NaN NaN2

C.122 32 NaN2 NaN


D.122 32 NaN2 NaN2

> 答案：`C`

### 2.	对于li这个节点，下列判断那个css选择器的优先级最高

A.	li#app

B.	li.cat

C.	#app.cat

D.	li.cnt:before

> 答案：`C`

### 3.	下列关于web页面优化描述最正确的是
A.	减少HTTP请求的次数

B.	以上描述都对

C.	进行资源合并和压缩

D.	将外部脚本置于低端

> 答案：`B`

### 4.	以下那个不是javascript的关键字
A. Var

B. Void

C. If

D. Name

> 答案：`D`

### 6.	以下关于cookie的描述 错误的是
A.	如果设置cookie失效时间是个已经过去的时间则cookie会立刻被删除

B.	浏览器对于cookie的尺寸和个数都有限制

C.	指定安全标志后cookie只存在使用SSL连接时才发送到服务器

D.	Window.cookie属性可以设置一个新的cookie字符串

> 答案：`D`

### 7.	在ECMAscript6中 下面那个不属于promise的状态
A.	Resolved

B.	Pending

C.	Rejected

D.	Pause

> 答案：`D`

### 8.	如何在CSS文件中插入注释
A. //this is a comment

B. //this is a comment //

C. /*this is a comment */

D. *this is a comment 

> 答案：`C`

### 12.	关于setTimeout（‘check’，10）中说法正确的是
A.	chenk函数每10秒执行一次

B.	10作为参数传给check

C.	Check函数每10毫秒执行一次

D.	程序循环执行10次

> 答案：`C`

### 13.	以下那个方法实现添加一个数组元素
A.	insert()

B.	Pop()

C.	Shift()

D.	Push()

> 答案：`D`

### 14.	以下那些不是javascript创建对象的设计模式

A.	代理模式

B.	单例模式

C.	原型模式

D.	简单工厂模式

> 答案：`A`


### 15.	字符串对象的正则方法包括
A.	Replace

B.	Search

C.	Split

D.	Test

> 答案：`ABD`

### 16.	Iframe的使用场景有
A.	与第三方域名下的页面共享cookie

B.	上传图片，避免当前页面刷新

C.	左边固定右边自适应的布局

D.	资源加载

> 答案：`ABCD`

### 17.	有关Javascript设计模式中的状态模式，其做用在于：
A.	可以减少代码中的条件判断语句

B.	每种判断条件都是对象内部的一种状态

C.	依赖于if/else实现

D.	更加方便管理

> 答案：`ABD`


### 18.	下列那个样式定义后，内联（非块状）元素不可以定义高度和宽度
A.	display:inline;

B.	Display:none;

C.	Display:inherit;

D.	Display:block;

> 答案：`A`

### 19.	下面那些属于Javascript的typeof运算符的可能结果
A.	Undefined

B.	Symbol

C.	Boolean

D.	String

> 答案：`ABCD`

### 20.	Javascript设计模式种的装饰着模式的特点有
A.	可以添加功能且不改变原对象的原本结构

B.	装饰对象和原对象具有相同的接口

C.	装饰对象中包含对原对象的引入

D.	装饰对象是真正的原对象经过包装后的对象

> 答案：`ABCD`


### 23.	ECMAScript正则表达式不支持的特性有那些
A.	向后查找lookbehind

B.	并集和交集

C.	向前查找lookhead

D.	正则表达式注释

> 答案：`ABD`

### 24.	以下那个属于ES6的声明变量的方法
A.	var 

B.	Import

C.	Let

D.	Const

> 答案：`CD`

### 25.	Javascript设计模式中的享元模式时将数据分为内，外部数据，并将方法分为内外部方法
A.	T

B.	F

> 答案：`A`

### 26.	const [x,y,z] = ‘123’ 解钩的结果为x=’123’,y=undefined,z=undefined
A.	T

B.	F

> 答案：`B`

### 27.	命令模式每次执行一次操作都调用一次命令对象，降低了系统复杂度
A.	T

B.	F

> 答案：`A`

### 28.	Promise对象的then方法返回的是一个新的Promise实例 ，所以可以采用链式调用，用then方法后面再调用一个then方法
A.	T

B.	F

> 答案：`A`


30.	返回的结果为555
```js
const map = new Map()
map.set(['a'],555)
map.get([‘a’])
```
A.	T

B.	F

> 答案：`B`

### 31.	weakMap是一个广泛使用的ES6转码器，可以将ES6代码转化为ES5代码，从而在现有环境执行
A.	T

B.	F

> 答案：`B`


### 1.	在链接互联网的计算机上（）处理存储设计国家秘密和企业秘密信息
A.	可以

B.	严禁

C.	只要网络环境安全就可以

D.	不确定

> 答案：`B`

### 2.	服务器上存在文件jsp jkkk HjgiiiApache会将此文件解析为
A.	jsp文件

B.	Hjgiii文件

C.	Jkkk文件

D.	纯文本文件

> 答案：`A`

### 3.	安全评估人员为某个医疗机构的生产和测试环境进行评估，在访谈中注意到生产数据被用于测试环境测试这种情况下存在那种最有可能的风险
A.	测试环境的硬件可能与生产环境不同

B.	测试环境可能由于使用生产环境数据产生不精确的信息

C.	测试环境可能没有重组的控制确保数据的精确性

D.	测试环境可能没有充分的访问控制以确保数据机密性

> 答案：`D`

### 5.	开发人员认为架构不合理需要讨论调整后，再次进入编码阶段开发团队可能采取的开发方法为
A.	IP模型

B.	迭代模型

C.	净室模型

D.	瀑布模型

> 答案：`D`

### 6.	关于有第三方公司人员在公司办公操作规范不正确的是
A.	相关工作人员应提醒第三方人员在公司办公时时刻配套身份证明

B.	长期合作的第三方人员由于工作需要可将公司内部资料私自带回家处理

C.	相关工作人员应告知第三方人员公司的保密管理规定

D.	合作结束后，工作人员需与第三方人员进行书面的交换工作 确保收回需要上交的资料

> 答案：`B`

### 7.	以下那个不属于信息安全三要素之一
A.	机密性

B.	可用性

C.	完整性

D.	加密性

> 答案：`D`


### 1.	假设val已经声明 可定义为任何值 则下面js代码有可能输出的结果为
A.	Undefined

B.	其他选项都有可能

C.	Value is define

D.	Value iis undefine

> 答案：`A`

### 2.	NOSCRIPT标签是做什么用的
A.	制止脚本的运行

B.	防止区域脚本被js修改

C.	用来定义在脚本未被执行时的替代内容

D.	NOSCRIPT标签并不存在

> 答案：`C`

### 4.	有var d = new Date(‘2018-05-09’),可以设置为6月份操作是
A.	d.setDate(40)

B.	d.setMonth(6)

C.	d.setMonth(7)

D.	d.setMonth(5)

> 答案：`AD`

### 5.	添加样式的方法有
A.	嵌入式 即用标签括起来写在页面中的样式

B.	内联式 即直接加载标签上的样式

C.	导入样式 @import url (“css/style.css”)

D.	外部引用式 即将样式单独放到一个文件夹中 然后用link标签引入页面的形式

> 答案：`ABCD`

### 6.	以下那些调用场景会导致跨域问题
A.	不同域名下页面的调用

B.	域名和域名对应的IP之间的调用

C.	主域和子域之间的调用

D.	同一域名之下不同的端口号之间的调用

> 答案：`ACD`

### 7.	接口的格式有那些类型
A.	Webservice

B.	SOAP

C.	restful风格接口

D.	HTTP+URL

> 答案：`ABCD`

### 8.	Symbol值可以转化为
A.	数值

B.	布尔值

C.	字符串

> 答案：`BC`
