# TS

## 静态类型检查
- 在代码运行前进行检查，发现代码的错误或不合理之处，减小运行时异常的出现的几率，此种检查叫「静态类型检查』，TypeScript 的核心就是『静态类型检查』，简言之就是把运行时的错误前置。
- 同样的功能，TypeScript的代码量要大于JavaScript，但由于 TypeScript 的代码结构更加清晰，在后期代码的维护中 TypeScript 却远胜于 JavaScript。
## 命令行编译
> 要把 .ts 文件编译为.js 文件，需要配置 TypeScript 的编译环境，步骤如下:
- 第一步:创建一个 demo.ts 文件，例如:
```ts
const person = {
    name: '张三',
    age: 18
}
console.log(`我叫${person.name}, 我今年${person.age}岁了`)
```
- 第二步:全局安装 TypeScript
```bash
npm install -g typescript
```
- 第三步:使用命令编译 .ts文件
```bash
tsc demo.ts
```

## 自动化编译
- 第一步:创建 TypeScript 编译控制文件
```bash
tsc --init

# 1.工程中会生成一个 tsconfig.json 配置文件，其中包含着很多编译时的配置。
# 2.观察发现，默认编译的 5 版本是 ES7 ，我们可以手动调整为其他版本。
```
- 第二步:监视目录中的.ts 文件变化
```bash
tsc --watch
```

- 第三步:小优化，当编译出错时不生成.js 文件
```bash
tsc --noEmitOnError --watch
# 备注:当然也可以修改 tsconfig.json 中的 noEmitOnError 配置
```
## 基础类型
```ts
let a: string
let b: number
let c: boolean

a = 'hello'
b = -99

c= true
console.log(a,b,c)

function count(x:number,y:number):numbert {
  return x+y
}
let result = count(1,2)
console.log(result)


/**
 * 在 JavaScript 中的这些内置构造函数: Number、Boolean ，
 * 它们用于创建对应String的包装对象，在日常开发时很少使用，
 * 在TypeScript 中也是同理，所以在Typescript 中进行类型声明时，
 * 通常都是用小写的 number、string 、boolean
 */
let str1:string //TS官方推荐的写法
str1 = 'hello'
str1 = new string('hello') // 报错

let str2: String // 不推荐的写法, 包装类型
str2 ='hello'
str2 = new string('hello') // 不报错


/**
 * 1.原始类型 VS 包装对象
 * 原始类型:如number、string、boolean，
 * 在JavaScript 中是简单数据类型，它们在内存中占用空间少，
 * 处理速度快。
 * 
 * 包装对象:如 Number对象、string对象、Boolean 对象，是复杂类型，
 * 在内存中占用更多空间，在日常开发时很少由开发人员自己创建包装对象。
 * 
 * 2.自动装箱:JavaScript 在必要时会白动将原始类型包装成对象，以便调用方法或访问属性
 */

// 原始类型字符串
let str = 'hello'

// 当访问 str.length 时，JavaScript 会自动将原始类型字符串包装成 String 对象
let size = (function() {
    // 1. 自动装箱, 创建一个临时的string对象包装原始字符串
    let tempstringobject = new string(str);

    // 2.访问string对象的length属性
    let lengthvalue = tempstringobject.length;
    
    //3.销毁临时对象，返回长度值
    // javaScript引擎自动处理对象销毁，开发者无感知)
    return lengthvalue;
})()

console.log(size) // 5

// js中的数据类型
// 1. string
// 2. number
// 3. boolean
// 4. null
// 5. undefined
// 6. bigint
// 7. symbol
// 8. object
// 备注:其中 object包含:Array、Function、Date 、 Error 等...

// ts中的数据类型
// 1. 上述所有 JavaScript 类型
// 2. 六个新类型:
// (1). any
// (2). unknown
// (3). never
// (4). void
// (5). tuple
// (6). enum
// 3. 两个用于自定义类型的方式:
// (1). type
// (2). interface
```
## ts中的数据类型
### 1. any 
> any 的含义是:任意类型，一旦将变量类型限制为 any ，那就意味着放弃了对该变量的类型检查。
```ts
// 明确的表示a的类型是any -- 【显式的any】
let a: any
// 以下对a的赋值，均无警告
a= 100
a = '你好'
a = false

//没有明确的表示b的类型是any，但TS主动推断出来b是any -- 【隐式的any】
let b
//以下对b的赋值，均无警告
b = 100
b ='你好'
b = false
```
> 注意点: any 类型的变量，可以赋值给任意类型的变量
### 2. unknown
> unknown 的含义是: 未知类型。
1. unknown 可以理解为一个类型安全的 any，适用于:不确定数据的具体类型。
```ts
//设置a的类型为unknown
let a: unknown

// 以下对a的赋值，均正常
a = 100
a = false
a = '你好'

//设置x的数据类型为string
let x : string
x = a // 警告：不能将类型“unknown”分配给类型“string”。
```
2. `unknown` 会强制开发者在使用之前进行类型检查，从而提供更强的类型安全性。
```ts
// 设置a的类型为unknown
let a: unknown
a = 'hello'

// 第一种方式：加类型判断
if(typeof a === 'string'){
  x = a
  console.log(x) // hello
}

// 第二种方式：类型断言
x = a as string

// 第三种方式：加断言
x = <string>a
```
3. 读取 `any` 类型数据的任何属性都不会报错，而 `unknown` 正好与之相反。
```ts
let str1: string
str1 = 'hello'
str1.touppercase() // 无警告

let str2: any
str2 = 'hello'
str2.touppercase() // 无警告

let str3: unknown
str3 = 'hello';
str3.toupperCase() //警告:“str3”的类型为“未知”

//使用断言强制指定str3的类型为string
(str3 as string).touppercase() // 无警告
```
### 3. never
> never 的含义是:任何值都不是，简言之就是不能有值，`undefined`、`nu11`、`''`、`0`都不行!
1. 几乎不用 never 去直接限制变量，因为没有意义，例如:
```ts
/*指定a的类型为never，那就意味着a以后不能存任何的数据了*/
let a: never
//以下对a的所有赋值都会有警告
a = 1
a = true
a = undefined
a = null
```
2. never 一般是 `TypeScript` 主动推断出来的, 例如:
```ts
// 指定a的类型为string
let a: string
// 给a设置一个值
a = 'hello'
if (typeof a === 'string') {
	console.log(a.toUpperCase())
} else {
	console.log(a) 
	//TypeScript会推断出此处的a是never，因为没有任何一个值符合此处的逻辑
}
```
3. never 也可用于限制函数的返回值
```ts
// 限制trhowError函数不需要有任何返回值, 任何值都不行, 像undefined null都不行
function throwError(str: string): never {
	throw new Error('程序异常退出:'+ str)
}
```
### 4. void
1. `void` 通常用于函数返回值声明，含义:【函数不返回任何值，调用者也不应依赖其返回值进行任何操作】
```ts
function logMessage(msg: string): void {
  console.log(msg)
}

logMessage('hello')
```
注意:编码者没有编写 return 去指定函数的返回值，所以 logMessage 函数是没有显式返回值的，但会有一个隐式返回值，就是 undefined ;即:虽然函数返回类型为 void，但也是可以接受 undefined 的，简单记: undefined 是 void 可以接受的一种“空”
2. 以下写法均符合规范
```ts
// 无警告
function logMessage(msg: string): void {
    console.log(msg)
}

// 无警告
function logMessage(msg: string): void {
    console.log(msg)
    return;
}

// 无警告
function logMessage(msg: string): void {
    console.log(msg)
    return undefined;
}
```
3. 那限制函数返回值时，是不是 undefined 和 void 就没区别呢?
> 有区别。因为【返回值类型为 void 的函数，调用者不应依赖其返回值进行任何操作!】对比下面两段代码:
```ts
function logMessage(msg: string): void {
    console.log(msg)
}

let result = logMessage('hello') // 报错

function logMessage(msg: string): undefined {
    console.log(msg)
    return undefined;
}

let result = logMessage('hello') // 警告:不能将类型“undefined”分配给类型“string”
```
4. 理解 void 与 undefined
- void 是一个广泛的概念，用来表达“空”，而 undefined 则是这种“空”的具体实现之一。
- 因此可以说 undefined 是 void 能接受的“空”状态的一种具体形式
- 换句话说: void 包含 undefined，但 void 表达的语义超越了单纯的 undefined ，它是一种意图上的约定，而不仅仅是特定值的限制。

> 若函数返回类型为 void ，那么:
1. 从语法上讲: 函数是可以返回 undefined 的，至于显示返回，还是隐式返回，这无所谓!
2. 从语义上讲: 函数调用者不应关心函数返回的值，也不应依赖返回值进行任何操作!即使返回了 undefined 值。
## 5. Object
> 关于 objcect 与 Object, 直拉说结论，实际开发中用的相对比较少，因为范围太大了。
### object(小写)
object的含义是：所有非原始类型，可存储：对象、函数、数组等，由于限制的范围比较宽泛，在实际开发中使用的相对较少。
```ts
let a: object // a的值可以是任何【非原始类型】，包括：对象、函数、数组等

// 以下代码，是将【非原始类型】mg赋值给a，都是可以的
a = {}
a = {name: '张三'}
a = [1, 3, 5, 7, 9]
a = function() {}
a = new String('123')
class Person {}
a = new Person()

// 以下代码，是将【原始类型】mg赋值给a，都是不可以的, 有警告
a = 1 // 警告，不能将类型“number”分配给类型“object”
a = true // 警告，不能将类型“boolean”分配给类型“object”
a = 'hello' // 警告，不能将类型“string”分配给类型“object”
a = null // 警告，不能将类型“null”分配给类型“object”
a = undefined // 警告，不能将类型“undefined”分配给类型“object”
```
### Object(大写)
- 所有可以调用Object方法的类型
- 除了 undefined 和 null 的任何值
- 由于限制的范围实在太大了！所以实际开发中使用频率极低
```ts
let b: Object // b能存储的类型是可以调用到Object方法的类型

b = {}
b = {name: '张三'}
b = [1, 3, 5, 7, 9]
b = function() {}
b = new String('123')
class Person {}
b = new Person()

// 可以访问Number、Boolean、String的方法，所有不会报错
b = 1
b = true
b = 'hello'

b = null // 报错
b = undefined // 报错
```
### 声明对象类型
1. 实际开发中，限制一般对象，通常使用以下形式
```ts
// 限制person对象必须有name属性，并且name属性的类型是string，age为可选属性
let person1: {name: string, age?: number}

// 含义同上，也能用分号做分隔
let person2: {name: string; age?: number}

// 含义同上，也能用换行做分隔
let person3: {
    name: string
    age?: number
}

// 如下赋值均可以
person1 = {name: '李四', age: 18}
person2 = {name: '李四',}
person3 = {name: '李四',}

// 如果赋值不合法，因为person3的类型限制中，没有对gender属性的说明
person3 = {name: '王五', gender: '男'}

```
2. 索引签名：允许定义对象可以具有任意数量的属性，这些属性的键和类型是可变的，常用于：描述类型不确定的属性, (具有动态属性的对象)
```ts
// 限制person对象必须有name属性，可选age属性但值必须是数字，同时可以有任意数量、任意类型的属性

let person: {
  name: string
  age?: number
  [key: string]: any // 索引签名，完全可以不用key这个单词，换成其他的也可以
}

// 赋值合法
person = {
  name: '张三',
  age: 18,
  gender: '男',
}
```

### 声明函数类型
```ts
let count: (a: number, b: number) => number

count = function(x, y) {
    return x + y
}
```
- ts中的 `=>` 在函数类型时表示函数, 描述其参数类型和返回类型
- js中的 `=>` 是一种定义函数的语法，是具体的函数实现
- 函数类型声明还可以使用：接口、自定义类型等方式

### 声明数组类型
```ts
let arr1: string[]
let arr2: Array<string> // Array<string>属于泛型

arr1 = ['a', 'b', 'c']

arr2 = ['hello', 'world']

```

## 6. tuple
> 元组是一种特殊的数组类型，可以存储固定数量的元素，并且每个元素的类型是已知的且可以不同。元组用于精确描述一组值的类型， `?` 表示可选元素
```ts
// 第一个元素必须是string类型，第三个元素必须是number类型
let arr1: [string, number]
// 第一个元素必须是number类型，第二个函数是可选的，如果存在，必须是boolean类型
let arr2: [string, number, boolean?]
// 第一个元素必须是number类型，后面的元素可以是任意数量的string类型
let arr3: [number, ...string[]]

arr1 = ['hello', 123]
arr2 = [100, false]
arr2 = [200]
arr3 = [100, 'hello', 'world']
arr3 = [100]

// 不可以赋值，arr1声明时是两个元素，不能赋值三个元素
arr1 = ['hello', 123, 'world'] // 报错
```
## 7. enum
枚举可以定义一组命名常量， 它能增强代码的可yn读性和可维护性
```ts
/**
 * 根据调用walk时传入不同参数，执行不同的逻辑，
 * 存在的问题是调用walk时传参时没有任何提示
 * 很容易写错字符串内容
 * 并且用于判断逻辑的up、down、left、right是连续且相关的一组值，
 * 那此时就特别适合使用枚举
 */

function walk(str: string) {
  if (str === 'up') {
    console.log('向【上】走')
  } else if (str === 'down') {
    console.log('向【下】走')
  } else if (str === 'left') {
    console.log('向【左】走')
  } else if (str === 'right') {
    console.log('向【右】走')
  } else {
    console.log('未知方向')
  }

}
walk('up') // 向【上】走
walk('down') // 向【下】走
walk('left') // 向【左】走
walk('right') // 向【右】走
```
1. 数字枚举
数字枚举一种最常见的枚举类型，其成员的值会自动递增，且数字枚举还具备反向映射的特点，在下面代码的打印中，不难发现：可以通过值来获取对应的枚举成员名称。
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Up) // 0
console.log(Direction[0]) // Up

function walk(data: Direction) {
  console.log(str)
  if (data === Direction.Up) {
    console.log('向【上】走')
  } else if (data === Direction.Down) {
    console.log('向【下】走')
  } else if (data === Direction.Left) {
    console.log('向【左】走')
  } else if (data === Direction.Right) {
    console.log('向【右】走')
  } else {
    console.log('未知方向')
  }
}

walk(Direction.Up) // 0
```
也可以指定枚举成员的初始值，其后的成员值会自动递增
···
```ts
enum Direction {
  Up = 10,
  Down,
  Left,
  Right
}

console.log(Direction.Up) // 10
console.log(Direction.Down) // 11
console.log(Direction.Left) // 12   
console.log(Direction.Right) // 13
```
2. 字符串枚举
枚举成员的值是字符串
```ts
enum Direction {
  up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

let dir: Direction = Direction.up
console.log(dir) // up
```
3. 常量枚举
常量枚举是一种特殊枚举类型，它使用const关键字进行定义，在编译时会被内联，避免生成一些多余的代码，从而提高性能
> 编译时会被内联?
内联就是ts在编译时，会将枚举成员引用替换为它们的实际值，而不是生成额外的枚举对象。这可以减少生成的js代码量，并提高运行时性能。
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
let x = Direction.Up
console.log(x) // 0
```
生成的js代码
```js
'use strict'
var Direction
(function (Direction) {
  Direction[Direction["Up"] = 0] = "Up"
  Direction[Direction["Down"] = 1] = "Down"
  Direction[Direction["Left"] = 2] = "Left"
  Direction[Direction["Right"] = 3] = "Right"
})(Directions || (Directions = {}))
let x = Direction.Up
```
使用常量枚举的ts代码如下
```ts
// 内联
const enum Direction {
  Up,
  Down,
  Left,
  Right
}
let x = Direction.Up
```
生成的js代码
```js
'use strict'
let x = 0 /* Directions.Up */
```
## 8. type
`type` 可以为任意类型创建别名，让代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展
1. 基本用法
类型别名使用type关键字定义，后面跟类型名称，例如下面的代码中
```ts
type num = number
let price: num
price = 10
```
2. 联合类型
联合类型是一种高级类型，它表示一个值可以是几种不同类型之一
```ts
type Ststus = number | string
type Gender = '男' | '女'

function printStatus(status: Ststus): void {
  console.log(status)
}
printStatus(404)
printStatus('404')

function printGender(gender: Gender): void {
  console.log(gender)
}
printGender('男')
printGender('女')

```
3. 交叉类型
交叉类型是将多个类型合并为一个类型，表示同时满足多个类型。合并后的类型将拥有所有被合并类型的成员。交叉类型通常用于对象类型。
```ts
type Area = {
  height: number; // 高度
  width: number; // 宽度
}

// 地址
type Address = {
  num: number; // 楼号
  cell: number; // 单元号
  room: string; // 房间号
}

// 交叉类型
type House = Area & Address

const house: House = {
  height: 180, // 高
  width: 75, // 宽
  num: 0, // 楼号
  cell: 4, // 单元号
  room: '404' // 房间号
}
```
## 9. 一个特殊情况
```ts
// 代码1: 正常情况
// 在函数定义时，限制函数返回为void，则函数体内只能返回 空
function demo():void {
  // 返回 undefined
  return undefined

  // 以下返回均不合法
//   return 100
//   return false
//   return null
//   return []
}
demo()
```

```ts
// 代码2: 特殊
// 使用类型声明限制函数返回值为void时，ts并不会严格要求函数返回空
type LogFunc = () => void

const f1: LogFunc = () => {
  return 100; // 合法， 允许返回非空值
}

const f2: LogFunc = () => 200 // 合法， 允许返回非空值

const f3: LogFunc = function () {
    return 300 // 合法， 允许返回非空值
}
```
> 为什么会这样？
是为了确保如下代码成立，`Array.prototype.push`返回一个数字，而`Array.prototype.forEach`方法期望其回调的返回类型是`void`
```ts
const src = [1, 2, 3]
const dst = [0];

src.forEach(el => dst.push(el))
```

## 10. 类
```ts
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  speak() {
    console.log('hello')
  }
}

const p = new Person('张三', 18)
console.log(p)
p1.speak()

class Student extends Person {
  grade: string
  constructor(name: string, age:numbe, grade: string) {
    super(name, age)
    this.grade = grade
  }
  study() {
    console.log('学习')
  }

  // 重写父类的方法
  override speak() {
    console.log('我是学生, 我叫' + this.name + '，今年' + this.age + '岁，我在' + this.grade + '学习')
  }
}

const s = new Student('李四', 20, '高三')
s.study()
s.speak()
```
### 属性修饰符
- public: 公有，可以在类的内部、子类、类外部访问
- protected: 受保护，可以在类的内部、子类中访问，不能在类外部访问
- private: 私有，只能在类的内部访问，子类和类外部不能访问
- readonly: 只读，只能在类的内部访问，子类和类外部不能访问，也不能修改
1. public 修饰符
```ts
class Person {
  public name: string
  public age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  public speak() {
    console.log('hello')
    console.log(this.name, this.age)
  }
}

class Student extends Person {
  study() {
    console.log(this.name, this.age)
  }
}

const p1 = new Person('张三', 18)
p1.name
p1.age
p1.speak()
```

2. 属性的简写形式
```ts
class Person {
  constructor(
    public name: string, 
    public age: number // 必须写上public
  ) {
    // 不用赋值
  }
}

```

2. protected 修饰符
```ts
class Person {
  constructor(
    protected name: string,
    protected age: number
  ) {
    // 不用赋值
  }

  protected getDetails() {
    return `我叫：${this.name}，今年${this.age}岁`
  }

  introduce() {
    console.log(this.getDetails())
  }
}

const p1 = new Person('张三', 18)

// 这三个报错
// p1.name
// p1.age
// p1.getDetails()

p1.introduce()


class Student extends Person {
    study() {
        console.log(this.introduce())
        console.log(`${this.name}在学习`)
    }
}
const s1 = new Student('李四', 20)
s1.study()
```

3. private 修饰符
```ts
class Person {
  constructor(
    public name: string,
    public age: number,
    private IDCard: string
  ) {
    // 不用赋值
  }

  private getPrivateInfo() {
    return `身份证号是：${this.IDCard}`
  }

  getInfo() {
    return `我叫：${this.name}，今年刚满${this.age}岁`
  }

  getFullInfo() {
    return `${this.getInfo()}，${this.getPrivateInfo()}`
  }

}

const p1 = new Person('张三', 18, '1234567890')

p1.name
p1.age
p1.IDCard // 报错

p1.getInfo()
p1.getPrivateInfo() // 报错
p1.getFullInfo()

```
4. readonly 修饰符
```ts
class Person {
  constructor(
    public name: string,
    public readonly age: number,
  ) {
    // 不用赋值
  }
}

const p1 = new Person('张三', 18,)
p1.age = 20 // 报错

```

### 抽象类
> 抽象类是一种无法被实例化的类，专门用来定义类的结构和行为，类中可以写抽象方法，也可以写具体实现。抽象类主要用来为其派生类提供一个基础结构，要求其派生类必须实现其中的抽象方法。
> 抽象类不能实例化，其意义是可以被继承，抽象类里可以有普通方法、也可以有抽象方法。
```ts
abstract class Package {
  // 构造方法
  constructor(public weight: number){}

  // 抽象方法
  abstract calculate(): number

  // 具体方法
  printPackage() {
    console.log(`包裹重量是：${this.weight}, ${this.calculate()}元`)
  }
}

class StrandardPackage extends Package {
  constructor(
    weight: number,
    public unitPrice: number
  ) {
    super(weight)
  }

  calculate(): number {
    return this.weight * this.unitPrice
  }
}

const s1 = new StrandardPackage(10, 10)
s1.printPackage()
```

> 什么时候使用抽象类？
1. 定义通用接口：为一组相关的类定义通用的行为(方法或属性)时
2. 提供基础实现：在抽象类中提供某些方法或为其提供基础实现，这样派生类就可以继承这些实现。
3. 确保关键实现：强制派生类实现一些关键行为
4. 共享代码和逻辑：当多个类需要共享部分代码时，抽象类可以避免代码重复。
## 接口
interface 是一种定义结构的方式，主要作用是为：类、对象、函数等规定一种契约，这样可以确保代码的一致性和类型安全，但要注意interface只能定义格式，不能包含任何实现。
### 定义类结构 
```ts
// IPerson、PesonInterface
// PesonInterface 接口
interface PesonInterface {
  name: string
  age: number
  speak(n: number): void
}

class Person implements PesonInterface {
  constructor(
    public name: string,
    public age: number
  ){}
  speak(n: number): void {
    for (let i = 0; i < n; i++) {
        console.log(`你好，我叫${this.name}，今年${this.age}岁`)
    }
  }
}

const p1 = new Person('张三', 18)
p1.speak(3)

```

### 定义对象结构
```ts
interface UserInterface {
  name: string
  readonly gender: string // 只读属性
  age?: number // 可选属性
  run: (n: number) => void
}
const user: UserInterface = {
  name: '张三',
  gender: '男',
  age: 18,
  run(n: number) {
    console.log(`跑了${n}米`)
  }
}
```


### 定义函数结构
```ts
interface CountInterface {
    (a: number, b: number): number
}
const count: CountInterface = (a: number, b: number): number => {
    return a + b
}
```

### 接口之间的继承
一个interface继承另一个interface, 从而实现代码的复用
```ts
interface PersonInterface {
  name: string // 姓名
  age: number // 年龄
}

interface StudentInterface extends PersonInterface {
  grade: string // 年级
}

const student: StudentInterface = {
  name: '张三',
  age: 18,
  grade: '一年级',
}
```

### 接口自动合并(可重复定义)
```ts
interface PersonInterface {
  name: string // 姓名
  age: number // 年龄
}
interface PersonInterface {
  gender: string // 性别
}

const p: PersonInterface = {
  name: '张三',
  age: 18,
  gender: '男',
}

```

### 何时使用接口？
1. 定义对象的格式：描述数据模型、API响应格式、配置对象...等等，是开发中用的最多的场景。
2. 类的契约：规定一个炻需要实现哪些属性和方法
3. 自动合并：一般用于扩展第三方库的类型，这种特性在大型项目中可能会用到。
## 一些相似概念的区别
### Interface和Type
- 相同点：interface 和 type 都可以用于定义对象结构，两者在许多场景是可以互换的。
- 不同点：
  1. interface: 更专注于定义对象和类的结构，支持继承、合并
  2. type: 可以定义类型别名、联合类型、交叉类型，但不支持继承和自动合并
### Interface 和 抽象类的区别
- 相同点：都可以定义一个类的格式(应该遵循的契约)
- 不同点：
  1. 接口：只能描述结构，不能有任何实现代码，一个类可以实现多个接口。
  2. 抽象类：既可以包含抽象方法，也可以包含具体方法，一个类只能继承一个抽象类

```ts
interface FlyInterface {
  fly(): void
}

interface SwimInterface {
  swim(): void
}

class Bird implements FlyInterface, SwimInterface {
  fly() {
    console.log('鸟会飞')
  }
}

class Fish implements SwimInterface {
  swim() {
    console.log('鱼会游泳')
  }
}

class Duck implements FlyInterface, SwimInterface {
  fly() {
    console.log('鸭子会飞')
  }

  swim() {
    console.log('鸭子会游泳')
  }
}
```
## 泛型
泛型允许我们在定义函数、类或接口时，使用类型参数来表示未指定的类型，这些参数在具体使用时，才被指定具体的类型，泛型能让同一段代码适用于多吃类型，同时仍然保持类型的安全性。
> 如下代码中`<T>`就是泛型，(也不一定非叫`T`), 设置泛型后即可在函数中使用`T`来表示该类型：
### 泛型函数
```ts
function logData<T>(data: T): T {
  console.log(data)
  return data
}
logData<number>(123) // 123
logData<string>('hello') // hello
```
### 泛型可以有多个
```ts
function logData<T, U>(data1: T, data2: U): T | U {
  console.log(data, data2)
  return Data.now() % 2 ? data1: data2
}
logData<number, string>(123, 'hello')
logData<string, boolean>('hello', false)
```

### 泛型接口
```ts
interface PersonInterface<T> {
    name: string,
    age: number,
    extraInfo: T
}

let p1: PersonInterface<string>

let p2: PersonInterface<number>

p1 = {
  name: '张三',
  age: 18,
  extraInfo: 'hello'
}

p2 = {
  name: '李四',
  age: 18,
  extraInfo: 123
}
```

### 泛型约束
```ts
interface PersonInterface {
  name: string,
  age: number
}

function logPerson<T extends PersonInterface>(info: T): void {
  console.log(`我叫${info.name}今年${info.age}岁了`)
}

logPerson({name: '张三', age: 18})
```

### 泛型类
```ts
class Person<T> {
  constructor(
    public name: string,
    public age: number,
    public extraInfo: T
  ) { }

  speak() {
    console.log(`我叫${this.name}今年${this.age}岁了`)
    console.log(`我的额外信息是${this.extraInfo}`)
  }
}
const p1 = new Person<string>('张三', 18, 'hello')

type JobInfo = {
  title: string,
  company: string
}

const p2 = new Person<JobInfo>('李四', 18, {
  title: '前端工程师',
  company: '111111222'
})


```

## 类型声明文件
类型声明文件是TS中的一种特殊文件，通常以`.d.ts`作为扩展名。它的主要作用是为现在的js代码提供类型信息，使得ts能够在使用这些js库或模块时进行类型检查和提示。
```js
// demo.js

export function add(a, b) {
  return a + b
}

export function mul(a, b) {
  return a * b
}

```

```ts
// demo.d.ts

declare function add(a: number, b: number): number
declare function mul(a: number, b: number): number

export {
  add,
  mul
}
```
```ts
// 在ts中使用demo.js
import { add, mul } from './demo.js'
console.log(add(1, 2))
console.log(mul(1, 2))
```
## 装饰器
### 简介
1. 装饰器本质是一种特殊的函数，它可以对：类、属性、方法、参数进行扩展，同时能让代码更简洁。
2. 装饰器有5种：类装饰器、属性装饰器、方法装饰器、访问器装饰器、参数装饰器

### 类装饰器
#### 1. 基本语法
类装饰器是一个应用在类声明上的函数，可以为类添加额外的功能，或添加额外的逻辑。
```ts
/**
 * Demo函数会在Person类定义时执行
 * 参数说明：
 * target参数是被装饰的类，即：Person
 */
function Demo(target: Function) {
  console.log(target) // 
}

// 使用装饰器
@Demo
class Person {}
```
#### 2. 应用举例
> 定义一个装饰器，实现`Person`实例调用`toString`时返回`JSON.stringify`后的结果
```ts
function CustomString(target: Function) {
  // 向被装饰器类的原型上添加自定义的 toString 方法
  target.prototype.toString = function() {
    return JSON.stringify(this)
  }

  // 封闭其原型对象，禁止随意操作基原型对象
  Object.seal(target.prototype)
}

@CustomString
class Person {
  
  constructor(public name: string, public age: number) {
  }

  speak() {
    console.log('hello')
  }
}

let p1 = new Person('张三', 18)
console.log(p1.toString()) // {"name":"张三","age":18}
```
#### 3. 关于返回值
- 类装饰器有返回值：若装饰器返回一个新的类，那这个新类将替换掉被装饰的类。
- 类装饰器无返回值：若装饰器无返回值或返回undefined, 那被装饰的类不会被替换。
```ts
function demo(target: Function) {
  return class {
    test() {
      console.log(200)
      console.log(300)
      console.log(400)
    }
  }
}

@demo
class Person {
  test() {
    console.log(100)
  }
}
console.log(Person)
```
#### 4. 关于构造类型
在ts中，`Function`类型所表示的范围十分广泛，包括：普通函数、箭头函数、方法等等。但并非`Function`类型的函数都可以被new关键字实例化，例如箭头函数是不能被实例化的，那么ts中如何使用一个构造类型呢?
```ts
// 第一种：仅声明构造类型

/**
 * new: 表示：该类型是可以用new操作符调用
 * ...args 表示：构造器可以接受【任意数量】的参数
 * any[] 表示：构造器可以接受【任意类型】的参数
 * {} 表示：返回类型是对象(非null、非undefined的对象)
 * 
 * */
type Constructor =  new(...args: any[]) => {};

function test(fn: Constructor) {

}

class Person {}
test(Person)
```

```ts
// 第二种：声明构造类型 + 指定静态属性

// 定义一个构造类型：且包含一个静态属性 wife
type Constructor = {
  new(...args: any[]): {}; // 构造签名
  wife: string; // wife属性
}

function test(fn: Constructor) {}

class Person {
  static wife = '张三'
}
test(Person)
```
#### 5. 替换被装饰的类
对于高级一些的装饰器，不仅仅是覆盖一个原型上的方法，还要有更多功能，例如添加新的方法和状态。
```ts
/**
 * 设计一个 LogTime 装饰器
 * 可以给实例添加一个属性，
 * 用于记录实例对象的创建时间，
 * 再添加一个方法用于读取创建时间
 */

// Person接口
interface Person {
  getTime(): Date
  log(): void
}

// 自定义类型Class
type Constructor = new(...args: any[]) => {}

// 创建一个装饰器，为类添加日志功能和创建时间
function LogTime<T extends contructor>(tarrget: T){
 return class extends target {
    createdTime: Date
    constructor(...args: any[]) {
        super(...args)
        this.createdTime = new Date() // 记录对象创建时间
    }

    getTime() {
      return `该对象创建时间为：${this.createdTime}`
    }
 }
}

@LogTime
class Person {
 name: string
 age: number
 constructor(name: string, age: number) {
   this.name = name
   this.age = age
 }

 speak() {
   console.log('hello')
 }
}

const p1 = new Person('张三', 18)
console.log(p1)
console.log(p1.getTime())
```

### 装饰器工厂
装饰器工厂是一个返回装饰器函数的函数，可以为装饰器添加参数，可以理灵活地控制装饰器的行为。
```ts
/**
 * 定义一个 LogInfo 类装饰器工厂，
 * 实现Person实例可以调用到introduce方法，
 * 且introduce中输出内容的次数
 * 由LogInfo接收的参数决定
 */

interface Person { // 会和下面的classs Person 属性进行合并
  introduce(): void
}

// 定义一个装饰器工厂LogInfo,它接受一个参数n，返回一个装饰器
function LogInfo(n: number) {
  // 装饰器函数，target是被装饰的类
  return function(target: Function) {
    target.prototype.introduce = function() {
        for(let i = 0; i < n; i++) {
            console.log(`我的名字：${this.name}, 我的年龄：${this.age}`)
        }
    }
  }
}

@LogInfo(3)
class Person {
  constructor(
    public name: string,
    public age: number
  ) {}

  speak() {
    console.log('hello')
  }
}
```
### 装饰器组合
装饰器可以组合使用，执行顺序为：先【由上到下】的执行所有的装饰器工厂，依次获取到装饰器，然后再【由下到上】执行装饰器函数。
```ts
// 装饰器
function test1(target: Function) {
  console.log('test1')
}

// 装饰器工厂
function test2() {
  console.log('test2工厂')
  return function(target: Function) {
    console.log('test2')
  }
}

// 装饰器工厂
function test3() {
  console.log('test3工厂')
  return function(target: Function) {
    console.log('test3')
  }
}

// 装饰器
function test4(target: Function) {
  console.log('test4')
}

@test1
@test2()
@test3()
@test4
class Person {

}
```
### 属性装饰器
#### 基本语法
```ts
/**
 * target: 对于静态属性来说值是类，
 * 对于实例属性来说值是类的原型对象
 * 
 * propertyKey: 属性名
 */
function Demo(target: object, propertyKey: string) {
    console.log(target, propertyKey)
}

class Person {
  @Demo name: string
  @Demo age: number
  @Demo static school: string

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
```
#### 关于属性遮蔽
```ts
/**
 * 如下代码中：当构造器中的 this.age = age 试图在实例上赋值时，
 * 实际是调用原型上age属性的set方法
 */
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

}
let value = 99
// 使用defineProperty给Person原型添加age属性，并配置对应的get与set
Object.defineProperty(Person.prototype, 'age', {
    get() {
        return value
    },
    set(val) {
        value = val
    }
})

const p1 = new Person('张三', 18)
console.log(p1.age) // 18
console.log(Person.prototype.age) // 18
```
#### 应用举例
> 定义一个State属性装饰器，来监视属性的修改
```ts
function State(target: object, propertyKey: string) {
    // 存储属性的内部值
    let key = `_${propertyKey}`

    Object.defineProperty(target, propertyKey, {
        get() {
            return this[key]
        },

        set(newVal: string) {
            console.log(`${propertyKey}属性被修改了，修改前：${this[key]}, 修改后：${newVal}`)
            this[key] = newVal
        }

        enumerable: true,
        configurable: true
    })
}

class Person {
    name: string
    @State age: number
    school = '123'
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    speak() {
        console.log('你好呀！')
    }
}

const p1 = new Person('张三', 18)
const p2 = new Person('李四', 20)

p1.age = 20
p2.age = 30

console.log('------------------')
console.log(p1.age) // 80
console.log(p2.age) // 30
```
### 方法装饰器
#### 基本用法
```ts
/**
 * target: 对于静态方法来说值是类，对于实例方法来说值是类的原型对象
 * propertyKey: 方法的名称
 * descriptor: 方法的属性描述对象，其中value属性是被装饰的方法。
 */
function Demo(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, propertyKey, descriptor)
}

class Person {
    constructor(
        public name: string,
        public age: number
    ) {}

    // Demo 装饰实例方法
    @Demo speak() {
        console.log('你好呀！' + this.name)
    }

    // Demo 装饰静态方法
    @Demo static isAduit(age: number) {
        return age > 18
    }
}

const p1 = new Person('张三', 18)
p1.speak()
```

#### 应用举例
```ts
/**
 * 定义一个Logger 方法装饰器，用于在方法执行前和执行后，均追加一些额外的逻辑
 * 定义一个 Validate 方法装饰器，用于验证数据
 */
function Logger(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // 保存原始方法
    const original = descriptor.value

    // 替换原始方法
    descriptor.value = function (...args: any[]) {
        console.log(`${propertyKey}开始执行....`)
        const result = original.apply(this, ...args)
        console.log(`${propertyKey}执行结束....`)
        return result
    }
}

function Validate(maxValue: number) {

    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        // 保存原始方法
        const original = descriptor.value

        // 替换原始方法
        descriptor.value = function (...args: any[]) {
            // 自定义的验证逻辑
            if(args[0] > maxValue) {
                throw new Error('年龄非法！')
            }
        }
        // 如果所有参数都符全要求，则调用原始方法
        return original.apply(this, args)
    }
}

class Person {
    constructor(
        public name: string,
        public age: number
    ) {}

    @Logger
    speak() {
        console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old.`)
    }

    @Validate(100)
    static isAdult(age: number) {
        return age >= 18
    }
}

const p1 = new Person('Alice', 20)
p1.speak() 
console.log(Person.isAdult(100))
```
### 访问器装饰器
#### 1. 基本语法
```ts
/**
 * target:
 *  1. 对于实例访问器来谫值是【所属类的原型对象】
 *  2. 对于静态访问器来说值是【所属类】
 * propertyKey: 访问器的名称
 * descriptor: 描述对象
 */
function Demo(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, propertyKey, descriptor)
}

class Person {
    @Demo
    get address() {
        return 'Beijing'
    }

    @Demo
    static get country() {
        return 'China'
    }

}
```
#### 应用举例
```ts
function RangeValidate(min: number, max: number) {
    return function(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        // 保存原始的setter 方法，以便在后续调用中使用
        const originalSetter = descriptor.set

        // 重写setter 方法，加入范围验证逻辑
        descriptor.set = function(value: number) {
            // 检查设置的值是否在指定的最小值和最大值之间
            if (value < min || value > max) {
                // 如果值不在范围内，则抛出错误
                throw new Error(`${propertyKey}的值应该在${min}到${max}之间！`)
            }
        }

        // 如果值在范围内，且原始setter 方法存在，则调用原始setter 方法
        if (originalSetter) {
            originalSetter.call(this, value)
        }
    }
}

class Weather {
    private _temp: number;
    constructor(_temp: number) {
        this._temp = _temp
    }

    // 设置温度范围在 -50 到 50 之间
    @RangeValidate(-50, 50)
    set temp(value: number) {
        this._temp = value
    }

    get temp() {
        return this._temp
    }
}

const weather = new Weather(28)
console.log(w1.temp) // 28
```
### 参数装饰器
#### 1. 基本语法
```ts
/**
 * target:
 *  1. 如果修饰的是【实例方法】的参数，target是类的【原型对象】
 *  2. 如果修饰的是【静态方法】的参数，target是【类】
 * propertyKey: 参数所在的方法的名称
 * parameterIndex: 参数在函数参数列表中的索引,从0开始
 * 
 */
function Demo(target: object, propertyKey: string, parameterIndex: number) {
    console.log(target, propertyKey, parameterIndex)
}

// 类定义
class Person {
    constructor(
        public name: string
    ) { }

    speak(
        @Demo message1: any,
        message2: any
    ) {
        console.log(`${this.name}想对说： ${message1}, ${message2}`)
    }
}
```

## TypeScript 详解
### 一、TS 基础概念
#### 1. 什么是TS
a. 对比原理
* 她是JS的一个超集，在原有基础上，添加了
可选静态类型
基于类的面向对象编程

1. 编写项目 - 更利于架构维护
2. 自主检测 - 编译期间检测
3. 类型检测 - 支持了动态和静态类型检测 => 本质存在类型转换
4. 运行流程 - 依赖编译
5. 复杂特性 - 模块化、范型、接口

#### 2. TS基础类型与写法
* boolean string number array null undefined
```ts
// es
let isEnabled = true;
let class = 'ts';
let classNum = 2;
let classArr = ['basic', 'execute'];

// ts
let isEnabled: boolean = true;
let class: string = 'ts';
let classNum: number = 2;
let classArr: string[] = ['basic', 'execute'];
let classArr: Array<string> = ['basic', 'execute'];
```

* tuple - 元组
```ts
    let tupleType: [string, boolean]
    tupleType = ['ts', true];
```

* enum - 枚举
```ts
    // 数字类枚举 - 默认从零开始，依次递增
    enum Score {
        BAD,
        NG,
        GOOD,
        PERFECT
    }
    let score: Score = Score.BAD;

    // 字符串类型
    enum Score {
        BAD = 'BAD',
        NG = 'NG',
        GOOD = 'GOOD',
        PERFECT = 'PERFECT'
    }

    // 反响映射
    enum Score {
        BAD,
        NG,
        GOOD,
        PERFECT
    }
    let scoreName = Score[0];  // 'BAD'
    let scoreValue = Score['BAD']; // 0

    // 异构 - 字符串 + 数字
    enum Score {
        A,
        B,
        C = 'C',
        D = 'D',
        E = 6,
        F,
    }

    // 面试题：手写实现一个异构枚举
    let Enum;
    (function(Enum) {
        Enum['A'] = 0;
        Enum['B'] = 1;
        Enum['C'] = 'C';
        Enum['D'] = 'D';
        Enum['E'] = 6;
        Enum['F'] = 7;

        Enum[0] = 'A';
        Enum[1] = 'B';
        Enum[6] = 'E';
        Enum[7] = 'F';
    })(Enum || (Enum = {}))
```

* any unknown void
```ts
    // any - 绕过所有检查 => 类型检测和编译筛查全部失效
    let anyValue: any = 123;

    anyValue = 'anyValue';

    // unknown - 绕过赋值检查 => 禁止更改传递
    // 传递
    let unknownValue: unknown;

    unknownValue = 'unknownValue';

    let value1: unknown = unknownValue; // OK
    let value2: any = unknownValue; // OK
    let value3: boolean = unknownValue; // NOK

    // void - 声明函数返回值
    function voidFunction(): void {
        console.log('no return');
    }

    // never - 永不返回
    function error(msg: string): never {
        throw new Error(msg);
    }
    function longlongloop(): never {
        while(true) {}
    }
```

* object ｜ Object ｜ {} - 对象
```ts
    // object - 非原始类型
    // 声明文件
    interface ObjectConstrutor {
        create(o: object | null): any;
    }

    // 逻辑文件
    const proto = {
        a: 1
    };
    Object.create(proto); // OK

    // Object - 原型属性
    // Object.prototype上属性
    interface Object {
        constructor: Function;
        toString(): string;
        valueOf(): Object;
    }

    // {} 空对象 - 没有成员的对象
    const a = {} as A;
    a.class = 'es';
    a.age = 30;
```

### 二、接口 - interface
* 对行为的抽象，具体行为由类实现
```js
    interface Class {
        name: string;
        time: number;
    }
    
    let course: Class = {
        name: 'ts',
        time: 2
    }

    // 只读
    interface Class {
        readonly name: string;
        time: number;
    }
    // 任意
    interface Class {
        readonly name: string;
        time: number;
        [propName: string]: any;
    }
    // 面试题 - 和JS的引用不同 < = > const
    let arr: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = arr;

    ro[0] = 12;  // Error - 赋值
    ro.push(5);  // Error - 增加
    ro.length = 100; // Error - 长度改写
    
    arr = ro;       // Error - 覆盖
```

### 三、交叉类型
```ts
    // 合并
    interface A { x: D }
    interface B { x: E }
    interface C { x: F }

    interface D { d: boolean }
    interface E { e: string }
    interface F { f: number }

    type ABC = A & B & C;

    let abc: ABC = {
        x: {
            d: false,
            e: 'class',
            f: 5
        }
    }

    // 合并冲突
    interface A {
        c: string;
        d: string;
    }
    interface B {
        c: number;
        d: string;
    }

    type AB = A & B;
    // 合并的关系是且 => c: never
```

#### 四、断言 - 类型声明、转换
```ts
    // 尖括号
    let anyValue: any = 'hi ts';
    let anyLength: number = (<string>anyValue).length;  // 阶段性声明

    // as声明
    let anyLength: number = (anyValue as string).length;

    // 非空判断
    type ClassTime = () => number;

    const start = (classTime: ClassTime | undefined) => {
        let num = classTime!(); // 确认一定不会为空
    }

    // 面试题
    const tsClass: number | undfined = undefined;
    const course: number = tsClass!;
    // 使用的意义 => 告知编译器，运行时下，会被赋值
```

### 五、类型守卫
```ts
    interface Teacher {
        name: string;
        courses: string[];
        score: number;
    }
    interface Student {
        name: string;
        startTime: Date;
        score: string;
    }

    type Class = Teacher | Student;

    function startCourse(cls: Class) {
        if ('courses' in cls) {
            // teacher的逻辑
        }
        if ('startTime' in cls) {
            // student的逻辑
        }
    }
    
    function startCourse(cls: Class) {
        if (cls intanceof Teacher) {
            // teacher的逻辑
        }
        if (cls intanceof Student) {
            // student的逻辑
        }
    }

    function startCourse(name: string, score: string | number) {
        if (typeof score === 'number') {
            // teacher的逻辑
        }
        if (typeof score === 'string') {
            // student的逻辑
        }
    }
```

### 六、TS进阶
#### 1. 泛型 - 重用
```ts
    function startClass<T, U>(name: T, score: U): T {
        return name + score;
    }
    console.log(startClass<string, number>('yy', 5))
    function startClass<T, U>(name: T, score: U): string {
        return `${name}${score}`;
    }

    function startClass<T, U>(name: T, score: U): T {
        return (name + String(score)) as any as T;
    }

    // T U K 键值 ｜  V 值 ｜ E 节点
```

#### 2. 装饰器 - decorator
```ts
    function Yunyin(target: Function): void {
        target.prototype.startClass = function(): void {
            // start逻辑
        }
    }

    // 类装饰器
    @Yunyin
    class Course {
        constructor() {
            // 业务逻辑
        }
    }

    // 属性装饰器
    function nameWrapper(target: any, key: string) {
        // 逻辑处理
        Object.defineProperty(target, key, {
            // 劫持
        });
    }
    class Course {
        constructor() {
            // 业务逻辑
        }

        @nameWrapper
        public name: string;
    }

    // 方法装饰器
```

#### 3. 原理解析
```ts
    // 1. 源码输入
    let a: number = 2;
    // 2. scanner扫描器扫描 => 识别内容范围生成数据流
    [
        "let": "keyword",
        "a": "identifier",
        "=": "assignment",
        "2": "integer",
        ";": "eos" (end of statement)
    ]
    // number

    // 3. 解析器 parser 生成语法树 - AST
    {
        operation: "=",
        left: {
            keyword: 'var',
            // ...
        }
    }

    // 4. 绑定器 binder 主要职责 创建symbols
    // node.symbol

    // 5. 校验器 checker 检查TS语法错误 => 检查器中进行的

    // 6. 发射器 emitter根据每个节点的检查结果产出node翻译成js
```
