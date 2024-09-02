# 单例模式
单例模式（Singleton Pattern）是一种常用的软件设计模式，它保证一个类只有一个实例，并提供一个全局访问点来获取这个实例。这种模式通常用于那些需要频繁实例化然后销毁的对象，或者创建对象需要消耗大量资源的情况，比如数据库连
接、线程池等。


## 单例模式特点
1. 单一实例：确保类只有一个实例存在。
2. 全局访问点：提供一个全局的访问点供外部调用。
3. 延迟初始化：在真正需要的时候才创建实例。
4. 线程安全：在多线程环境中也能正确工作。
## 单例模式应用场景
单例模式在软件开发中非常常见，尤其适用于那些需要在整个应用中共享唯一实例的场景。下面列举了一些常见的应用场景：
1. 配置管理:
  - 应用程序通常需要读取配置文件并在整个应用中保持这些配置信息的一致性。单例模式可以用来封装这些配置信息，确保每次读取到的配置都是相同的实例。
2. 日志记录:
  - 日志记录类通常作为单例使用，因为一般不需要多个日志记录器实例。通过单例模式可以简化对日志记录器的访问，并确保所有日志记录操作都通过同一个实例进行。
3. 线程池:
  - 线程池可以复用预先创建好的线程，避免频繁创建与销毁线程所造成的开销。线程池通常以单例形式存在，以便在应用中统一管理线程资源。
5. 数据库连接管理:
  - 数据库连接通常是比较昂贵的资源，因此通常采用连接池的方式进行管理。连接池中的连接可以通过单例模式来控制，确保所有数据库操作都使用同一个连接池实例。
6. 对话框和工具条:
  - 用户界面中的一些组件，如对话框或工具栏，通常只需要一个实例，可以通过单例模式来实现。
7. 注册表/服务定位器:
  - 服务定位器模式通常用作依赖注入的一种变体，它可以作为一个单例来存储和检索其他对象的引用。
8. 消息队列:
  - 单一的消息队列管理器可以确保所有的消息发送和接收操作都在同一个队列中进行。
9. 缓存管理:
  - 缓存通常需要在整个应用中共享，使用单例模式可以确保缓存的一致性和高效性。
10. 系统设置:
  - 系统级别的设置，例如用户偏好设置，可以通过单例模式来管理，确保设置在不同模块间的一致性。
11. 任务调度器:
  - 任务调度器负责管理定时任务或周期性任务，单例模式可以确保所有任务都通过同一个调度器实例来调度。
## 单例模式实现

### 懒汉式单例模式
```js
// js版本
function Singleton() {
  if (typeof Singleton.instance === 'object') {
    return Singleton.instance;
  }

  this.instanceId = Math.random(); // 假设这是某个初始化逻辑
  Singleton.instance = this;
  return this;
}

// 使用示例
var instance1 = new Singleton();
var instance2 = new Singleton();

console.log(instance1 === instance2); // 输出 true
```
### 饿汉式单例模式
饿汉式单例模式的特点是在类定义时就创建实例，而不是在需要时才创建
```js
// js版本
class Singleton {
  constructor() {
    if (typeof Singleton.instance === 'object') {
      return Singleton.instance;
    }

    // 初始化逻辑
    this.instanceId = Math.random(); // 假设这是某个初始化逻辑

    Singleton.instance = this;
    return this;
  }
}

// 使用示例
const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // 输出 true

// 解释
// 构造函数:
// Singleton 类定义了一个构造函数，该构造函数在类定义时就创建了一个实例。
// 构造函数内部首先检查 Singleton.instance 是否已经存在。如果存在，则直接返回这个现有的实例。
// 如果不存在，则创建一个新的实例，并将其赋值给 Singleton.instance。
// 实例化:
// 每次通过 new Singleton() 创建实例时，都会返回同一个实例，从而确保了在整个应用中只有一个实例存在。
// 注意事项
// 在上述示例中，构造函数内部的逻辑确保了单例模式的实现，但是这种方法在 ES6 类语法中并不理想，因为它涉及到在构造函数中返回非 this 的值。
// 更加推荐的做法是使用闭包或者静态属性来实现单例模式，这样可以避免构造函数内部复杂的逻辑。
```
### 使用闭包实现饿汉式单例模式
```js
function Singleton() {
  if (Singleton.instance) {
    return Singleton.instance;
  }

  // 初始化逻辑
  this.instanceId = Math.random(); // 假设这是某个初始化逻辑

  Singleton.instance = this;
  return this;
}

// 使用示例
const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // 输出 true

// 解释
// 闭包:
// Singleton 函数内部使用了一个局部变量 Singleton.instance 来存储单例对象。
// 每次调用 new Singleton() 时，都会检查 Singleton.instance 是否已经存在。
// 如果已经存在，则直接返回该实例；如果不存在，则创建一个新的实例并将其赋值给 Singleton.instance。
// 静态属性:
// 也可以使用类的静态属性来实现单例模式，这种方式更加符合 ES6 类语法的规范。
```

### 使用静态属性实现饿汉式单例模式
```js
class Singleton {
  constructor() {
    if (typeof Singleton.instance === 'object') {
      return Singleton.instance;
    }

    // 初始化逻辑
    this.instanceId = Math.random(); // 假设这是某个初始化逻辑

    Singleton.instance = this;
    return this;
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// 使用示例
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // 输出 true

// 解释
// 静态方法:
// Singleton 类定义了一个静态方法 getInstance，这个方法会在第一次调用时创建实例，并将其存储在静态属性 Singleton.instance 中。
// 之后的每次调用都会返回同一个实例。
```

## 单例模式的案例

## 注意事项
