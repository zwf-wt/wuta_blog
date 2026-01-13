# ts相关面试题

## 1. TypeScript 中 interface 和 type 的核心区别有哪些？至少说出 3 点。

1. 扩展方式不同
`interface` 只能通过 `extends` 实现扩展，比如 `interface A extends B {}；`
`type` 则是通过 `&`（交叉类型）实现扩展，比如 `type A = B & C`。
2. 重复定义处理不同
同名的 `interface` 可以多次声明，会自动合并属性；
同名的 `type` 不允许重复定义，会直接报语法错误。
3. 支持的类型范围不同
`type` 可以定义基础类型、联合类型、元组等，比如 `type Str = string`、`type NumOrStr = number | string`；
`interface` 只能定义对象类型，无法表示基础类型或联合类型。
4. 映射类型兼容性
`type` 配合 `in` 关键字可以轻松实现映射类型（如 `type Readonly<T> = { readonly [P in keyof T]: T[P] }`）；
`interface` 不支持直接编写映射类型

## 2. 请解释 TypeScript 中 keyof 与 in 的作用，并举例说明。
1. keyof
- 作用：是索引类型查询操作符，作用于一个类型 T 时，会返回该类型所有公共属性名组成的联合类型。
```ts
interface User {
  name: string;
  age: number;
}
// Key 类型为 "name" | "age"
type Key = keyof User;
```
2. in
- 作用：是类型映射操作符，通常和 keyof 搭配使用，用于遍历联合类型的每一个成员，常用于构建映射类
```ts
interface User {
  name: string;
  age: number;
}
// 生成一个所有属性变为可选的新类型
type PartialUser = {
  [P in keyof User]?: User[P];
}
```
## 3. 请说明 TypeScript 中 unknown 与 any 的区别，并举例说明如何使用 unknown。
- any：会完全关闭 TypeScript 的类型检查，变量可以赋值给任意类型，也可以被任意类型赋值，调用任意属性 / 方法都不会报错，类型安全极低。
- unknown：是类型安全的 any，变量同样可以被任意类型赋值，但不能直接赋值给其他类型（除 any 和 unknown 外），也不能直接调用属性 / 方法，必须先进行类型收窄（类型断言、类型守卫），才能操作。

```ts
// 1. 赋值规则对比
let anyVal: any = "hello";
let unknownVal: unknown = 123;

let str: string = anyVal; // 不报错，any 跳过检查
// let str2: string = unknownVal; // 报错！unknown 不能直接赋值给其他类型

// 2. unknown 的正确使用（类型收窄）
// 方式1：类型断言
let num1: number = unknownVal as number;

// 方式2：类型守卫
if (typeof unknownVal === "number") {
  let num2: number = unknownVal; // 不报错，类型已收窄为 number
}
```
## 4. 请写出 TypeScript 中泛型约束的定义和一个简单示例。
泛型约束用于限制泛型可以接受的类型范围，避免泛型被赋予任意类型导致的类型不安全问题，通过 extends 关键字实现约束。
```ts
// 需求：定义一个函数，获取对象指定属性的值，要求传入的属性必须是该对象的现有属性。
// 定义约束接口
interface HasName {
  name: string;
}

// 泛型 T 被约束为 包含 name 属性的类型
function getName<T extends HasName>(obj: T): string {
  return obj.name;
}

// 合法调用
getName({ name: "张三", age: 20 }); // 返回 "张三"

// 非法调用（会报错）
// getName({ age: 20 }); 

// 另一个常见场景（约束属性存在）：
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "李四", age: 25 };
getProp(user, "name"); // 合法
// getProp(user, "gender"); // 报错，gender 不是 user 的属性
```
## 5. 请解释 TypeScript 中 类型断言 的概念，以及它的两种语法格式，并举例说明。
类型断言是 TypeScript 中一种手动指定变量类型的方式，用于告诉编译器：“我明确知道这个变量的具体类型，你不需要再做类型推断了”。
它不会改变变量的实际类型，只是绕过编译器的类型检查，属于编译时语法。
```ts
// as 语法
let value: unknown = "hello ts";
// 断言 value 为 string 类型
let strLength = (value as string).length;

// 尖括号语法
let value: unknown = "hello ts";
// 尖括号断言为 string 类型
let strLength = (<string>value).length;
```

## 6. 请解释 TypeScript 中 类型守卫 的概念，并列举 3 种常见的类型守卫方式。
类型守卫 是 TypeScript 中一种在代码块内收窄变量类型的手段，它能让编译器在特定分支中，自动识别变量的具体类型，从而支持更安全的属性 / 方法调用，无需额外的类型断言。
简单来说：类型守卫就是用代码告诉编译器 “这个变量现在是什么类型”。
```ts
// 1. typeof 类型守卫
// 适用于 基础类型（string/number/boolean/symbol 等）的类型判断。
function printValue(val: string | number) {
  if (typeof val === "string") {
    // 此分支内，val 被收窄为 string 类型
    console.log(val.length); 
  } else {
    // 此分支内，val 被收窄为 number 类型
    console.log(val.toFixed(2));
  }
}

// 2. instanceof 类型守卫
// 适用于 类 / 构造函数创建的对象 的类型判断，判断实例是否属于某个类。
class Animal {}
class Dog extends Animal {
  bark() { console.log("汪汪汪"); }
}

function doSomething(animal: Animal) {
  if (animal instanceof Dog) {
    // 此分支内，animal 被收窄为 Dog 类型
    animal.bark(); 
  }
}

// 3. 自定义类型守卫（is 关键字）
// 适用于 复杂对象类型 的判断，通过自定义函数来实现类型收窄，函数返回值格式为 arg is Type。
interface Cat { type: "cat"; meow(): void }
interface Dog { type: "dog"; bark(): void }
type Pet = Cat | Dog;

// 自定义类型守卫函数
function isCat(pet: Pet): pet is Cat {
  return pet.type === "cat";
}

function play(pet: Pet) {
  if (isCat(pet)) {
    // 此分支内，pet 被收窄为 Cat 类型
    pet.meow();
  } else {
    pet.bark();
  }
}
```

## 7. 请说明 TypeScript 中 枚举（enum） 的定义和两种常见的枚举类型，以及 enum 与 type 联合类型的区别
### 一、枚举（enum）的定义
enum 是 TypeScript 提供的用于定义一组命名常量的语法，它可以清晰地表示一个有穷的取值集合，提升代码可读性和可维护性，编译后会生成对应的 JavaScript 对象。

```ts
// 数字枚举（默认从 0 开始自增）
enum Direction {
  Left,
  Right,
  Top,
  Bottom
}

// 访问枚举成员
const dir = Direction.Left; // 0
```
### 二、两种常见的枚举类型
1. 数字枚举
- 成员值默认为数字类型，从 0 开始递增，也可以手动指定初始值或成员值。
- 支持反向映射（即可以通过值获取对应的成员名）。
```ts
enum Status {
  Success = 200,
  Error = 500
}
console.log(Status.Success); // 200
console.log(Status[200]); // "Success" 反向映射
```
### 字符串枚举
- 成员值必须全部显式指定为字符串，不支持反向映射。
- 语义更明确，适合需要直观表示含义的场景。
```ts
enum Gender {
  Male = "男",
  Female = "女"
}
console.log(Gender.Male); // "男"
// console.log(Gender["男"])  报错，无反向映射
```
### 三、enum 与 type 联合类型的区别
|特性|enum 枚举|type 联合类型|
|---|---|---|
|编译产物|生成真实的 JS 对象|仅存在于编译阶段，无 JS 产物|
|取值限制|成员固定，无法扩展|可灵活组合基础类型 / 字面量|
|反向映射|数字枚举支持|不支持|
|使用场景|表示固定的业务常量（如状态码、方向）|表示多种类型的组合（如 `string	number`）|
## 8. 请解释 TypeScript 中 元组（Tuple） 的概念，并举例说明元组的特点和常见用法。
TypeScript 中的元组是一种特殊的数组，它明确限定了数组元素的类型、数量和顺序，元素类型可以不同；而普通数组的元素类型通常是一致的。
1. 元素类型、数量、顺序固定
定义后，元组的长度和对应位置的类型就被锁定，越界添加元素会触发类型检查警告（但不是完全不能修改元素值）。
```ts
// 定义一个 [string, number] 类型的元组
let user: [string, number] = ["张三", 20];
user[0] = "李四"; // ✅ 允许修改元素值（类型匹配即可）
user.push(30); // ⚠️ 可以添加，但 TS 会警告；读取 user[2] 会提示类型不安全
```
2. 元素类型可以不同
这是元组和普通数组的核心区别之一，普通数组一般要求元素类型统一。
```ts
// 合法元组：string + boolean + number
let info: [string, boolean, number] = ["前端", true, 2025];
```
### 常见用法
```ts
// 1. 函数多返回值
function getUser(): [string, number] {
  return ["张三", 25];
}
const [name, age] = getUser(); // 解构赋值，类型明确

// 2. 固定结构的数据存储
// 比如存储坐标、键值对等：
let coordinate: [number, number] = [100, 200]; // x, y 坐标
```

## 9. 请解释 TypeScript 中 never 类型的概念，并举例说明它的两种常见用法。
never 表示 永不存在的值的类型，是 TypeScript 中最底层的类型之一。
它的核心特点：变量 / 函数永远不会有返回值，或永远会抛出错误，任何类型都不能赋值给 never 类型（除了 never 本身）。
1. 表示永远不会返回的函数
- 函数体里有无限循环（无法执行到 return）
- 函数总是抛出错误（执行到 throw 就终止，不会返回值）
```ts
// 1. 抛出错误的函数
function throwError(msg: string): never {
  throw new Error(msg); // 执行后直接报错，无返回值
}

// 2. 无限循环的函数
function infiniteLoop(): never {
  while (true) {} // 永远不会结束，无返回值
}
```
2. 用于类型守卫的穷尽性检查
结合联合类型使用，确保所有分支都被覆盖，避免遗漏情况，增强代码健壮性。
```ts
type Fruit = "apple" | "banana" | "orange";

function getFruitPrice(fruit: Fruit): number {
  switch (fruit) {
    case "apple":
      return 5;
    case "banana":
      return 3;
    case "orange":
      return 4;
    // 若遗漏某个 Fruit 类型，TS 会报错
    default:
      // 这里 fruit 的类型会被推断为 never
      const _exhaustiveCheck: never = fruit;
      return _exhaustiveCheck;
  }
}
// 如果后续给 Fruit 新增了类型（比如 grape）但没更新 switch，TS 会在 default 分支提示类型不匹配，帮我们发现遗漏。
```
## 10. 请说明 TypeScript 中 readonly 修饰符的作用，并举例说明它在接口、数组、元组中的应用。

## 11. TypeScript 是什么？它和 JavaScript 的关系是什么？
TypeScript 是 JavaScript 的超集，添加了静态类型系统；它最终会被编译为纯 JavaScript 运行，兼容所有 JavaScript 运行环境。

## 12. TypeScript 的核心优势是什么？
1. 静态类型检查，提前发现错误；
2. 增强代码可读性和可维护性；
3. 支持 ES 新特性并扩展；
4. 提供强大的 IDE 智能提示。
## 13. TypeScript 中 any 类型的作用是什么？使用时需要注意什么？
any 会关闭类型检查，变量可以被赋予任意类型、调用任意属性 / 方法。注意：滥用 any 会丧失 TS 类型优势，尽量用 unknown 替代。
## 14. void 类型和 never 类型的区别是什么？
- void 表示函数无返回值（可以返回 undefined）；
- never 表示永不存在的值（函数永远报错或无限循环，不会有任何返回）。
## 15. TypeScript 中的原始类型有哪些？
string、number、boolean、null、undefined、symbol、bigint。



## 16. interface 和 type 的核心区别？
1. 扩展方式：interface 用 extends，type 用交叉类型 &；
2. 重复定义：interface 支持合并，type 不允许重复；
3. 类型范围：type 可定义基础类型、联合类型、元组，interface 只能定义对象类型；
4. 映射类型：type 支持，interface 不支持。

## 17. 什么是联合类型？什么是交叉类型？举例说明。
- 联合类型 | 表示变量可以是多个类型中的一个，如 type NumOrStr = number | string；
- 交叉类型 & 表示合并多个类型为一个，如 type User = { name: string } & { age: number }。

## 18. 什么是元组？它和普通数组的区别是什么？
元组是特殊数组，限定了元素的类型、数量和顺序，元素类型可不同；普通数组元素类型通常一致，长度不固定。例：`let user: [string, number] = ["张三", 20]`。

## 19. 什么是枚举？数字枚举和字符串枚举的区别？
枚举 enum 用于定义命名常量集合；数字枚举成员值为数字，默认自增，支持反向映射；字符串枚举成员值必须是字符串，不支持反向映射。

## 20. 如何定义一个函数的类型？举例说明。
可通过类型别名或接口定义。例：
```ts
type AddFn = (a: number, b: number) => number;
const add: AddFn = (x, y) => x + y;
```


## 21. 什么是可选属性？什么是只读属性？如何定义？
可选属性用 ? 标记，可不存在；只读属性用 readonly 标记，初始化后不可修改。例：
```ts
interface User {
  name: string;
  age?: number; // 可选
  readonly id: number; // 只读
}
```
## 22. type 可以定义函数类型吗？和 interface 定义函数类型的区别？
可以。type 定义函数类型更简洁，interface 可通过函数签名定义，且支持扩展。例：
```ts
type Fn = (x: number) => number;
interface FnInterface { (x: number): number }
```
## 23. 什么是索引签名？作用是什么？
索引签名用于定义对象的动态属性类型，解决 “对象属性名不确定” 的类型问题。例：
```ts
interface Obj {
  [key: string]: number; // 键为 string，值为 number
}
const obj: Obj = { a: 1, b: 2 };
```
## 24. null 和 undefined 在 TypeScript 中的默认类型行为是什么？如何修改？
默认情况下，null 和 undefined 是所有类型的子类型，可以赋值给任意类型；通过配置 tsconfig.json 中 strictNullChecks: true，可禁止这种隐式赋值，需显式声明联合类型。
## 25. 什么是泛型？泛型的作用是什么？
泛型是 “类型参数”，用于定义可复用的组件，在使用时再指定具体类型，避免重复定义多种类型的代码，保证类型安全。
### 26. 什么是泛型约束？如何实现？
泛型约束用于限制泛型的类型范围，通过 extends 关键字实现。例：
```ts
function getProp<T extends { name: string }>(obj: T) {
  return obj.name;
}
```
## 27. 泛型的默认类型如何设置？举例说明。
通过 T = DefaultType 设置泛型默认值。例：
```ts
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
createArray(3, "a"); // string[]
createArray<number>(3, 1); // number[]
```
## 28. keyof 关键字的作用是什么？举例说明。
keyof 是索引类型查询操作符，作用于类型 T 时，返回 T 的所有公共属性名组成的联合类型。例：
```ts
interface User { name: string; age: number }
type UserKeys = keyof User; // "name" | "age"
```
## 29. in 关键字的作用是什么？通常和什么搭配使用？
in 是类型映射操作符，用于遍历联合类型的每个成员，通常和 keyof 搭配构建映射类型。例：
```ts
type ReadonlyUser<T> = { readonly [P in keyof T]: T[P] }
```
## 30. 什么是映射类型？TypeScript 内置了哪些常用映射类型？
```ts
// 映射类型基于已有类型创建新类型，通过 in 和 keyof 实现；
// 内置常用的有 Readonly<T>（只读）、`Partial<T>`（可选）、`Required<T>`（必选）、`Pick<T, K>`（挑选属性）、`Record<K, T>`（创建对象类型）。
```
## 34. 什么是类型守卫？常见的类型守卫方式有哪些？
类型守卫是在代码块内收窄变量类型的手段，让编译器识别变量具体类型；
常见方式：
1. typeof 守卫（基础类型）；
2. instanceof 守卫（类实例）；
3. 自定义类型守卫（is 关键字）；
4. in 守卫（对象属性）。
## 35. 如何实现自定义类型守卫？举例说明。
通过函数返回值 arg is Type 实现。例：
```ts
interface Cat { type: "cat"; meow(): void }
function isCat(pet: unknown): pet is Cat {
  return (pet as Cat).type === "cat";
}
```
## 36. 类型守卫适用于哪些类型？
适用于基础类型 string、number、boolean、symbol，以及 function 类型。
## 37. instanceof 类型守卫的作用是什么？适用于什么场景？
用于判断实例是否属于某个类 / 构造函数，适用于类或构造函数创建的对象类型。
## 38. in 关键字如何作为类型守卫使用？举例说明。
通过判断对象是否包含某个属性来收窄类型。例：
```ts
interface Dog { bark(): void }
interface Cat { meow(): void }
function petFn(pet: Dog | Cat) {
  if ("bark" in pet) pet.bark(); // pet 收窄为 Dog
}
```

## 43. 如何在 TypeScript 中使用第三方库？如果库没有类型定义怎么办？
1. 安装库的类型定义包（@types/xxx）；
2. 若没有类型定义，可手动创建 .d.ts 声明文件；
3. 临时使用 any 类型（不推荐）。
## 44. 什么是声明文件？.d.ts 文件的作用是什么？
声明文件 .d.ts 用于描述 JavaScript 模块的类型信息，告诉 TS 编译器模块的类型结构，不生成 JS 代码，仅用于类型检查。
## 45. 如何定义一个全局变量的类型？
在 .d.ts 文件中通过 declare var/let/const 定义。例：
```ts
// global.d.ts
declare var $: any;
```
## 46. TypeScript 中如何处理函数重载？
先定义多个函数签名，再实现一个兼容所有签名的函数体。例：
```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}
```

## 47. this 在 TypeScript 中的类型如何指定？
可在函数的第一个参数位置指定 this 的类型（该参数仅用于类型检查，不会被编译）。例：
```ts
interface User { name: string }
function getName(this: User) {
  return this.name;
}
getName.call({ name: "张三" });
```
## 48. 什么是命名空间（namespace）？它和模块的区别是什么？
namespace 用于在全局作用域内组织代码，避免命名冲突；模块是基于文件的，通过 import/export 导入导出，而命名空间是内部模块，可通过 /// <reference path="..." /> 引用。
## 49. TypeScript 中如何实现类型兼容？
TS 的类型兼容基于结构子类型，即只要两个类型的结构一致，就可以兼容；对于对象类型，目标类型的属性少于源类型即可兼容；对于函数类型，参数数量更少、参数类型兼容、返回值类型兼容即可。
## 50. tsconfig.json 的作用是什么？
tsconfig.json 是 TypeScript 项目的配置文件，用于指定编译选项、文件包含 / 排除规则、项目引用等，TS 编译器会根据该文件的配置编译代码。
## 51. tsconfig.json 中 strict 选项开启后，会启用哪些子选项？
开启 strict: true 会启用一系列严格类型检查选项，包括 strictNullChecks、strictFunctionTypes、strictPropertyInitialization、strictBindCallApply 等。
## 52. strictNullChecks 选项的作用是什么？
启用后，null 和 undefined 不能隐式赋值给其他类型，必须显式声明联合类型，增强类型安全。
## 53. target 选项的作用是什么？常见的值有哪些？
target 指定编译后的 JavaScript 版本；常见值有 ES3、ES5、ES6/ES2015、ES2020 等。
## 54. module 选项的作用是什么？常见的模块规范有哪些？
module 指定编译后的模块系统；常见规范有 CommonJS、ESNext、AMD、UMD 等。
## 55. outDir 和 rootDir 选项的作用分别是什么？
outDir 指定编译后 JS 文件的输出目录；rootDir 指定 TS 源文件的根目录，编译器会按照该目录的结构输出 JS 文件。

## 56. include 和 exclude 选项的作用是什么？
include 指定需要编译的 TS 文件列表；exclude 指定需要排除的文件列表，优先级高于 include。
## 57. TypeScript 中如何处理循环依赖？
① 重构代码，提取公共模块；② 使用 import type 导入类型（仅用于类型检查，不生成运行时代码）；③ 调整导入导出顺序。
## 58. 什么是 ts-node？它的作用是什么？
ts-node 是一个用于直接运行 TypeScript 文件的工具，无需手动编译为 JS，内部集成了 TS 编译器和 Node.js 运行时。
## 59. TypeScript 编译后的代码如何在浏览器中运行？
① 编译为 ES5 及以下版本（通过 target 配置）；② 若使用模块，需结合打包工具（如 Webpack、Vite）打包为浏览器可识别的代码；③ 引入编译后的 JS 文件到 HTML 中。
