# TS


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
2. 从语义上讲: 函数调用者不应关心函数返回的值，也不应依赖返回值进行任何操作!即使返回了 und
efined 值。