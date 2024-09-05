# 享元模式

## 介绍
> 运用共享技术有效地支持大量细粒度的对象

享元（Flyweight）的核心思想很简单：如果一个对象实例一经创建就不可变，那么反复创建相同的实例就没有必要，直接向调用方返回一个共享的实例就行，这样即节省内存，又可以减少创建对象的过程，提高运行速度。

> 单例一般是不允许创建新实例，享元的思想是用同一个实例

享元的英文是flyweight，是一个来自体育方面的专业用语，在拳击、摔跤和举重比赛中特指最轻量的级别。把这个单词移植到软件工程中，也是用来表示特别小的对象，即细粒度的对象。至于为什么把flyweight翻译为享元，可以理解为共享元对象，也就是共享细粒度对象。

享元模式（Flyweight Pattern）是一种用于性能优化的设计模式，它通过共享技术来有效地支持大量的细粒度对象。这种模式尽量复用已存在的对象，并且只在必要时才创建新对象，以此来减少内存中对象的数量，从而节省内存空间。享元模式特别适用于系统中有大量相似对象的情况，所有这些对象的结构都几乎相同，只是其中某些数据（内部状态）有所不同。

在享元模式中，对象的状态分为两部分：内在状态（Intrinsic State）和外在状态（Extrinsic State）。

- 内在状态：存储在享元对象内部并且不会随环境改变而改变的状态。它是对象可以共享的关键。
- 外在状态：必须在享元外部保存的状态，它是依赖于一个具体环境，不能共享的数据。

使用享元模式时，通常会有一个享元工厂（Flyweight Factory），负责创建和管理享元对象。当请求一个对象时，享元工厂首先检查池中是否存在这个对象，如果存在就直接返回，否则创建一个新的对象加入到池中。

### 案例
```js
// 假设我们正在开发一款策略游戏，游戏中有大量的单位（例如士兵、坦克等），每个单位都有特定的类型和一些动态变化的状态（如位置、健康值等）。为了优化内存使用，我们可以使用享元模式来管理这些单位的类型。

// 单位享元接口
class Unit {
    constructor(type) {
        this.type = type;
    }

    setPosition(x, y) {
        // 设置单位的位置
        this.x = x;
        this.y = y;
    }

    display() {
        console.log(`Unit of type ${this.type} at position (${this.x}, ${this.y})`);
    }
}

// 单位享元工厂
class UnitFactory {
    constructor() {
        this.units = {};
    }

    getUnit(type) {
        let unitKey = type;

        // 检查是否已经有这个类型的单位
        if (!this.units[unitKey]) {
            console.log(`UnitFactory: Creating new unit of type ${type}.`);
            this.units[unitKey] = new Unit(type);
        } else {
            console.log(`UnitFactory: Reusing existing unit of type ${type}.`);
        }

        return this.units[unitKey];
    }

    // 列出所有的单位类型
    listUnits() {
        console.log("Units created:");
        for (let type in this.units) {
            console.log(type);
        }
    }
}

// 使用享元模式
const factory = new UnitFactory();

// 创建一些单位
const soldier = factory.getUnit('soldier');
const tank = factory.getUnit('tank');
const anotherSoldier = factory.getUnit('soldier');

// 设置单位的位置
soldier.setPosition(10, 10);
tank.setPosition(20, 20);
anotherSoldier.setPosition(30, 30);

// 显示单位
soldier.display(); // 应显示位置 (10, 10)
tank.display();    // 应显示位置 (20, 20)
anotherSoldier.display(); // 应显示位置 (30, 30)，虽然它是另一个士兵，但实际上是共享了第一个士兵的对象

// 列出所有单位类型
factory.listUnits();

// 在这个例子中，Unit 类代表了一个单位，它具有类型（内在状态）以及位置（外在状态）。UnitFactory 类负责管理这些单位的创建和获取，通过重用相同的单位对象来节省内存资源。每次需要创建或获取一个单位时，工厂都会检查是否已经有了这个类型的单位对象，如果有则直接返回，如果没有则创建一个新的单位对象并将其保存在工厂中。

// 通过这种方式，即使游戏世界中有成千上万个单位，我们也可以通过享元模式有效地管理这些单位，减少内存占用，提高程序性能。
```