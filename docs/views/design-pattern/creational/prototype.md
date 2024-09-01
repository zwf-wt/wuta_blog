# 原型模式

原型模式（Prototype Pattern）是一种创建型设计模式，它用于创建对象的副本，而不是通过 new 关键字创建新对象。这种模式可以避免创建一个对象所需的各种繁琐过程，例如复杂的构造函数或者初始化过程。通过复制现有的对象实例，原型模式能够快速地生成新的对象实例。

## 介绍

- 原型模式的核心概念

原型对象：拥有 clone 方法的对象，可以复制自身以创建新的对象。

客户端：使用原型对象的 clone 方法来创建新的对象。
- 原型模式的优点

性能优化：对于那些创建过程耗时的对象，使用原型模式可以显著提升性能，因为它避免了重复的构造过程。

封装性：对象的具体创建细节被封装在原型对象内部，客户端代码不需要知道这些细节。

动态性：可以在运行时根据需要选择不同的原型对象，从而创建出不同的对象。

- JavaScript 中的原型模式
在 JavaScript 中，原型模式可以通过以下方式实现：

使用内置的 Object.create 方法：这种方法可以基于一个已有的对象创建一个新的对象，并设置新对象的原型为已有的对象。
实现 clone 方法：在原型对象上定义一个 clone 方法，用于复制对象

## 案例

```js
// 使用 Object.create
// 假设有一个复杂的对象需要复制
const prototype = {
  init: function (x, y) {
    this.x = x;
    this.y = y;
  },
  move: function (dx, dy) {
    this.x += dx;
    this.y += dy;
  },
  printPosition: function () {
    console.log(`Position: (${this.x}, ${this.y})`);
  },
};

// 创建一个新对象，其原型为 prototype
const obj1 = Object.create(prototype);
obj1.init(10, 20);
obj1.printPosition(); // 输出: Position: (10, 20)

// 创建另一个新对象，其原型也为 prototype
const obj2 = Object.create(prototype);
obj2.init(30, 40);
obj2.printPosition(); // 输出: Position: (30, 40)

// 在这个例子中，Object.create 方法用于创建新对象，并将其原型设置为 prototype 对象。这意味着 obj1 和 obj2 都共享了相同的原型方法，如 move 和 printPosition。

// 示例：实现 clone 方法
// 另一种方式是在对象中直接实现 clone 方法，以便更灵活地控制复制过程：

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.move = function (dx, dy) {
  this.x += dx;
  this.y += dy;
};

Point.prototype.printPosition = function () {
  console.log(`Position: (${this.x}, ${this.y})`);
};

Point.prototype.clone = function () {
  // 深拷贝对象
  return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
};

// 创建一个点对象
const p1 = new Point(10, 20);
p1.printPosition(); // 输出: Position: (10, 20)

// 使用 clone 方法创建一个新对象
const p2 = p1.clone();
p2.move(5, 5);
p2.printPosition(); // 输出: Position: (15, 25)
p1.printPosition(); // 输出: Position: (10, 20)

// 在这个例子中，Point 构造函数创建了一个点对象，clone 方法用于创建一个包含相同属性的新对象。这里使用了 Object.assign 和 Object.create 方法来确保新对象具有正确的原型链。

// 通过这种方式，原型模式可以帮助我们在 JavaScript 中更高效地创建和管理对象实例。
```

```java
// 在Java中实现原型模式通常涉及到实现Cloneable接口，并重写clone()方法。下面我将展示一个简单的例子来说明如何使用原型模式在Java中创建对象的副本。

// 首先，我们定义一个实现了Cloneable接口的类MyObject，然后在这个类中覆盖clone()方法。为了安全起见，通常我们会使用受保护的方法clone()并声明它抛出CloneNotSupportedException异常。这是一个示例实现：

public class MyObject implements Cloneable {
    private int id;
    private String name;

    public MyObject(int id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getter and Setter methods
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    protected MyObject clone() throws CloneNotSupportedException {
        // 调用super.clone()来创建一个浅拷贝
        MyObject cloned = (MyObject) super.clone();
        // 如果有需要深拷贝的对象，这里应该创建它们的副本
        return cloned;
    }

    @Override
    public String toString() {
        return "MyObject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}

// 这个类中的clone()方法会创建一个MyObject的副本。如果MyObject中有任何引用类型的成员变量，且需要深拷贝的话，则需要在clone()方法中对这些对象也进行克隆。

// 接下来，我们可以创建一个测试类来演示如何使用这个MyObject类：

public class PrototypePatternDemo {
    public static void main(String[] args) {
        try {
            // 创建一个对象
            MyObject original = new MyObject(1, "Object 1");
            System.out.println("Original object: " + original);

            // 使用clone方法创建一个副本
            MyObject cloned = original.clone();
            System.out.println("Cloned object: " + cloned);

            // 修改原始对象，查看是否影响到克隆的对象
            original.setName("Modified Name");
            System.out.println("Modified original object: " + original);
            System.out.println("Unchanged cloned object: " + cloned);
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
    }
}

// 在这个例子中，我们创建了一个MyObject实例，并打印出来。接着我们调用了clone()方法来创建一个副本，并且修改了原始对象的名字，然后再次打印两个对象的状态。如果clone()方法正确地执行了浅拷贝（对于基本数据类型和不可变对象），那么克隆的对象不应该受到原始对象修改的影响。

// 请注意，如果你的类中包含可变对象或其他复杂的数据结构，可能需要实现深拷贝逻辑来确保克隆的对象与原对象完全独立。这通常涉及到递归地克隆对象图中的每个对象。
```

```py
'''在Python中实现原型模式同样可以通过实现一个clone方法来完成。Python 中没有内置的Cloneable接口，但我们可以利用标准库中的copy模块来简化工作。
示例：使用 copy 模块实现原型模式
我们将创建一个简单的类 MyObject，并使用 copy 模块中的 deepcopy 方法来实现深拷贝。
''''

# 定义 MyObject 类
class MyObject:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def get_id(self):
        return self.id

    def set_id(self, id):
        self.id = id

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def clone(self):
        # 使用 deepcopy 进行深拷贝
        import copy
        return copy.deepcopy(self)

    def __str__(self):
        return f"MyObject(id={self.id}, name='{self.name}')"

# 创建一个对象
original = MyObject(1, "Object 1")
print("Original object:", original)

# 使用 clone 方法创建一个副本
cloned = original.clone()
print("Cloned object:", cloned)

# 修改原始对象，检查是否影响到克隆的对象
original.set_name("Modified Name")
print("Modified original object:", original)
print("Unchanged cloned object:", cloned)

# 在这个例子中，MyObject 类包含了基本的属性和方法。clone 方法使用了 copy.deepcopy 来创建一个深拷贝，这样即使原始对象中有可变对象，也能确保克隆的对象是完全独立的。

# 2. 测试 MyObject 类
# 上述代码创建了一个 MyObject 实例，并使用 clone 方法创建了一个副本。接着，修改了原始对象的名称，并打印了两个对象的状态，以验证克隆的对象是否保持不变。

# 示例：手动实现深拷贝
# 如果你想手动实现深拷贝，可以这样做：

class MyComplexObject:
    def __init__(self, data):
        self.data = data  # 假设 data 是一个列表或其他可变对象

    def clone(self):
        # 手动实现深拷贝
        import copy
        return MyComplexObject(copy.deepcopy(self.data))

    def __str__(self):
        return f"MyComplexObject(data={self.data})"

# 创建一个包含可变对象的复杂对象
original_complex = MyComplexObject([1, 2, 3])
print("Original complex object:", original_complex)

# 使用 clone 方法创建一个副本
cloned_complex = original_complex.clone()
print("Cloned complex object:", cloned_complex)

# 修改原始对象中的可变数据，检查是否影响到克隆的对象
original_complex.data.append(4)
print("Modified original complex object:", original_complex)
print("Unchanged cloned complex object:", cloned_complex)

# 在这个例子中，MyComplexObject 包含了一个列表作为其数据成员。clone 方法创建了一个新的 MyComplexObject 实例，并使用 copy.deepcopy 对列表进行了深拷贝。这样即使原始对象中的数据被修改，克隆的对象也不会受到影响。

# 这两个例子展示了如何在Python中使用原型模式来创建对象的副本。通过使用 copy 模块或手动实现深拷贝逻辑，可以确保克隆的对象与原始对象完全独立。
```
