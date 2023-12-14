
# 介绍
> 建造者模式是一种创建型设计模式，它可以将复杂对象的创建过程封装起来，让用户能够逐步构造一个对象，同时保持灵活性。该模式适用于那些需要通过特定的顺序或算法来创建对象的情况，并且该对象可能有多种属性和配置选项，让用户能够自由组合和定制属性以满足不同的需求。

> 建造者模式的核心思想是将对象的构造过程分解成多个简单而相互独立的步骤，然后通过一个指挥者（Director）来指导这些步骤的顺序与组合方式以构建最终对象。具体来说，该模式通常包含以下几个角色：
>> 1. Builder：抽象建造者角色，定义了创建一个产品对象所需的各个组成部分的抽象接口，以及组合这些部件的方法。
>> 2. ConcreteBuilder：具体建造者角色，实现 Builder 接口来构造和装配各个部件，具体实现当中通常包括一个 Builder 对象和各个属性的赋值方法。
>> 3. Director：指挥者角色，负责统一组织建造者中定义的步骤来构造最终的对象，也可以根据具体需求来定义不同的组合方式。
>> 4. Product：产品角色，具体构造出来的复杂对象，通常包括多个组成部分和属性。

> 使用建造者模式可以将复杂对象的创建过程简化，减少用户的细节操作，同时也提供了一种灵活的方式来组合和定制对象的属性，从而让用户能够更加自由地构造出所需的对象。

# 案例
```js
/**
 * 当运用建造者模式时，让我们考虑一个例子：创建一个电脑对象。
 * 电脑对象通常由多个部件组成，例如处理器、内存、硬盘等，
 * 而每个部件可能有不同的配置选项。
 */

// 产品角色（Product）
class Computer {
  constructor() {
    this.processor = null;
    this.memory = null;
    this.hardDisk = null;
  }

  // 设置处理器
  setProcessor(processor) {
    this.processor = processor;
  }

  // 设置内存
  setMemory(memory) {
    this.memory = memory;
  }

  // 设置硬盘
  setHardDisk(hardDisk) {
    this.hardDisk = hardDisk;
  }

  // 显示电脑配置
  showConfiguration() {
    console.log("Computer Configuration:");
    console.log("Processor:", this.processor);
    console.log("Memory:", this.memory);
    console.log("Hard Disk:", this.hardDisk);
  }
}

// 抽象建造者角色（Builder）
class ComputerBuilder {
  constructor() {
    this.computer = new Computer();
  }

  // 设置处理器
  setProcessor(processor) {
    this.computer.setProcessor(processor);
  }

  // 设置内存
  setMemory(memory) {
    this.computer.setMemory(memory);
  }

  // 设置硬盘
  setHardDisk(hardDisk) {
    this.computer.setHardDisk(hardDisk);
  }

  // 获取构建完成的电脑
  getComputer() {
    return this.computer;
  }
}

// 具体建造者角色（Concrete Builder）
class GamingComputerBuilder extends ComputerBuilder {
  constructor() {
    super();
  }

  // 设置处理器（针对游戏电脑的特殊处理器）
  setProcessor() {
    this.computer.setProcessor("High-end Gaming Processor");
  }

  // 设置内存（针对游戏电脑的特殊内存）
  setMemory() {
    this.computer.setMemory("16GB DDR4 RAM");
  }

  // 设置硬盘（针对游戏电脑的特殊硬盘）
  setHardDisk() {
    this.computer.setHardDisk("1TB SSD");
  }
}

// 具体建造者角色（Concrete Builder）
class OfficeComputerBuilder extends ComputerBuilder {
  constructor() {
    super();
  }

  // 设置处理器（针对办公电脑的特殊处理器）
  setProcessor() {
    this.computer.setProcessor("Standard Processor");
  }

  // 设置内存（针对办公电脑的特殊内存）
  setMemory() {
    this.computer.setMemory("8GB DDR4 RAM");
  }

  // 设置硬盘（针对办公电脑的特殊硬盘）
  setHardDisk() {
    this.computer.setHardDisk("500GB HDD");
  }
}

// 指挥者角色（Director）
class ComputerDirector {
  constructor(builder) {
    this.builder = builder;
  }

  // 构建电脑
  buildComputer() {
    this.builder.setProcessor();
    this.builder.setMemory();
    this.builder.setHardDisk();
    return this.builder.getComputer();
  }
}

// 测试代码
const gamingBuilder = new GamingComputerBuilder();
const officeBuilder = new OfficeComputerBuilder();

const director = new ComputerDirector(gamingBuilder);
const gamingComputer = director.buildComputer();
gamingComputer.showConfiguration();

console.log("----------------------------------");

director.builder = officeBuilder;
const officeComputer = director.buildComputer();
officeComputer.showConfiguration();

/**
 * Computer Configuration:
 * Processor: High-end Gaming Processor
 * Memory: 16GB DDR4 RAM
 * Hard Disk: 1TB SSD
 * ----------------------------------
 * Computer Configuration:
 * Processor: Standard Processor
 * Memory: 8GB DDR4 RAM
 * Hard Disk: 500GB HDD
 * 
 * 在上述示例中，我们首先定义了产品角色 Computer，
 * 它代表了最终构建的电脑对象，并提供了设置各个部件和显示配置的方法。
 * 然后，我们定义了抽象建造者角色 ComputerBuilder，
 * 它包含了设置各个部件的抽象方法，并且提供了获取构建完成的电脑对象的方法。
 */
```