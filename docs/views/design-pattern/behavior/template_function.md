# 介绍
> 在软件工程的设计模式中，模板方法模式是一种行为型设计模式。它允许开发者定义一个算法的整体结构，同时允许子类在不改变算法结构的情况下重新定义算法中的某些步骤。

> 模板方法模式通过定义一个抽象类，该抽象类包含一个称为模板方法的操作，该方法定义了算法的基本结构，包括算法的各个步骤和它们的顺序。这些步骤可以是抽象的，也可以具有默认的实现。子类可以覆盖这些抽象方法或者改变默认的实现来实现自己的行为。

> 模板方法模式的核心思想是在父类中定义一个算法的框架，具体的步骤由子类来实现。这样可以提高代码的复用性和可维护性，同时允许不同的子类实现不同的行为，但又保持了算法的整体结构。

> 模板方法模式常用于具有相似算法结构但具有不同实现细节的情况下，例如，某个算法的流程相同，但具体的步骤实现可能因为不同的业务需求而有所差异。通过使用模板方法模式，可以避免代码重复和冗余，并提高代码的灵活性和可扩展性。

# 案例
```js
// 抽象类 AbstractClass
class AbstractClass {
  executeAlgorithm() {
    this.stepOne();
    this.stepTwo();
    this.stepThree();
    this.concreteMethod();
  }
  stepOne() {
    console.log("AbstractClass.stepOne() is called.");
  }
  stepTwo() {
    console.log("AbstractClass.stepTwo() is called.");
  }
  stepThree() {
    console.log("AbstractClass.stepThree() is called.");
  }
  concreteMethod() {
    throw new Error("Abstract method: concreteMethod() is not implemented.");
  }
}

// 具体类 ConcreteClass1
class ConcreteClass1 extends AbstractClass {
  concreteMethod() {
    console.log("ConcreteClass1.concreteMethod() is called.");
  }
}

// 具体类 ConcreteClass2
class ConcreteClass2 extends AbstractClass {
  concreteMethod() {
    console.log("ConcreteClass2.concreteMethod() is called.");
  }
}

// 客户端代码
const concrete1 = new ConcreteClass1();
const concrete2 = new ConcreteClass2();

concrete1.executeAlgorithm();
concrete2.executeAlgorithm();

/**
 * 在上面的示例中，AbstractClass 是一个抽象类，
 * 它定义了一个模板方法 executeAlgorithm() 
 * 和三个抽象方法 stepOne()、stepTwo()、stepThree()。
 * executeAlgorithm() 方法是该设计模式的核心，它提供了模板方法的骨架，
 * 其中调用了三个抽象方法和一个具体方法 concreteMethod()。
 * 
 * 具体类 ConcreteClass1 和 ConcreteClass2 
 * 继承自 AbstractClass 并实现了 concreteMethod() 方法，
 * 在执行模板方法时，它们将重写掉父类中定义的抽象方法，
 * 从而实现了自己的具体行为。
 * 在客户端代码中，我们创建了两个具体类的实例，
 * 然后通过调用它们的 executeAlgorithm() 方法来执行模板方法。
 * 当执行完模板方法后，ConcreteClass1 和 ConcreteClass2 的具体方法都会被调用，
 * 从而实现了它们各自的行为。
 */
```