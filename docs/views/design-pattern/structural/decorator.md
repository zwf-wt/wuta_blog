# 装饰者模式
## 介绍
装饰器模式（Decorator Pattern）是一种结构型设计模式，它让你可以在不改变对象结构的情况下，动态地给单个对象添加新的功能。这种模式涉及到一个包含多个子类的组件层次结构，以及一系列装饰器类，这些装饰器类自身也是组件或者能够充当组件的角色。

装饰器模式的主要组成部分包括：

1. Component（组件）：定义了一个对象接口，可以给这些对象动态地添加职责。
2. Concrete Component（具体组件）：定义了Component的基础功能。
3. Decorator（装饰器）：持有Component类型的引用，并且定义了一个与Component相同的接口。这意味着所有的Decorator都必须实现Component的所有方法。
4. Concrete Decorators（具体装饰器）：负责在适当的地方调用父类的方法，并且增加了自己的行为。
## 案例

### 1. 咖啡案例
```java
// 假设我们有一个简单的Coffee类，它表示一杯咖啡，并且有一个`getCost()`方法用于计算咖啡的价格。
// 现在，如果我们想添加额外的扩展功能（比如加奶咖啡、加糖咖啡等）。
// 不想修改Coffee类的代码，这种情况我们就可以使用装饰器模式。

// 1. 首先，定义Coffee接口 及 它的实现类SimpleCoffee
// Coffee 接口  
interface Coffee {  
    double getCost();  
}  
  
// SimpleCoffee 类，实现了 Coffee 接口  
class SimpleCoffee implements Coffee {  
    @Override  
    public double getCost() {  
        return 2.5; // 假设一杯基础咖啡的价格是2.5元  
    }  
}

// *说明：这样一杯咖啡的功能就实现了

// 2. 定义抽象类CoffeeDecorator，实现Coffee接口 并持有一个 Coffee对象的引用
// CoffeeDecorator 抽象类  
abstract class CoffeeDecorator implements Coffee {  
    protected Coffee coffee;  
  
    public CoffeeDecorator(Coffee coffee) {  
        this.coffee = coffee;  
    }  
  
    @Override  
    public double getCost() {  
        return coffee.getCost(); // 默认情况下，返回被装饰咖啡的价格  
    }  
}

// *说明：这里就是装饰器的思想了，将同类以构造的方式拿到后进行组合及扩展

// 3.1 创建具体的装饰器类，例如：加奶咖啡
// MilkCoffee 类，继承自 CoffeeDecorator  
class MilkCoffee extends CoffeeDecorator {  
    public MilkCoffee(Coffee coffee) {  
        super(coffee);  
    }  
  
    @Override  
    public double getCost() {  
        return super.getCost() + 0.5; // 在原价格基础上加0.5美元（加奶的费用）  
    }  
  
    public String getDescription() {  
        return "加奶的";  
    }  
}  

// *说明：继承抽象装饰器，根据传入的品类结合自身进行扩展。

// 3.2 创建具体的装饰器类，例如：加糖咖啡
// SugarCoffee 类，继承自 CoffeeDecorator  
class SugarCoffee extends CoffeeDecorator {  
  public SugarCoffee(Coffee coffee) {  
    super(coffee);  
  }  

  @Override  
  public double getCost() {  
    return super.getCost() + 0.3; // 在原价格基础上加0.3美元（加糖的费用）  
  }  

  public String getDescription() {  
    return "加糖的";  
  }  
}

// 4. 组合装饰器 构成各种各样的新品咖啡
public class CoffeeShop {  
  public static void main(String[] args) {  
    // 创建一个基础咖啡对象  (来一杯苦咖啡)
    Coffee coffee = new SimpleCoffee();  
    System.out.println("基础咖啡的价格: $" + coffee.getCost());  

    // 使用装饰器添加奶  (牛奶咖啡新品出炉)
    Coffee milkCoffee = new MilkCoffee(coffee);  
    System.out.println(milkCoffee.getDescription() + "咖啡的价格: $" + milkCoffee.getCost());  

    // 在加奶的咖啡基础上再加糖  (加糖的牛奶咖啡新品出炉)
    Coffee milkSugarCoffee = new SugarCoffee(milkCoffee);  
    System.out.println(milkSugarCoffee.getDescription() + "并且" + milkSugarCoffee.getDescription() + "的咖啡的价格: $" + milkSugarCoffee.getCost());  
  }  
}


// 疑问：CoffeeDecorator类的作用
// 1. 代码重用和减少冗余：如果所有的装饰器都直接实现Coffee接口，那么它们都需要重复实现一些公共的方法或属性。通过创建一个装饰器抽象类，你可以将公共的方法或属性放在这个抽象类中，从而减少代码的冗余和提高代码的可维护性。
// 2. 简化装饰器之间的交互：如果装饰器之间需要相互协作或访问彼此的状态，通过继承一个共同的装饰器抽象类，可以更容易地实现这些交互。抽象类可以提供一些保护成员（protected members）或方法，供子类访问和使用。
// 3. 类型检查和安全性：通过继承装饰器抽象类，你可以在编译时进行类型检查，确保所有的装饰器都遵循某种预定的约定或行为。此外，使用抽象类可以防止客户端错误地将不适当的对象传递给装饰器构造函数，因为编译器会要求传入的对象是装饰器抽象类或其子类的实例。
// 4. 可扩展性和维护性：随着系统的发展，你可能需要添加新的装饰器或修改现有的装饰器。如果所有的装饰器都直接实现接口，那么当你需要修改或添加新的公共方法时，你需要修改所有的装饰器实现。而如果使用装饰器抽象类，你只需要在抽象类中修改一次，所有的子类都会继承这个修改。
// 5. 设计模式一致性：装饰器模式通常与抽象类一起使用，这是因为它符合该模式的核心思想：动态地给一个对象添加一些额外的职责。通过继承一个共同的抽象类，你可以更清晰地表达这种“添加职责”的概念。
```

### 2. 小汽车案例
```java
// 有一辆玩具车，这个玩具车很基本，只能走动。现在，我想给玩具车增加一些新的功能，比如加上漂亮的彩色贴纸、喇叭和闪亮的灯。但是我不想改变原来的玩具车

// 首先，定义一个基础的ToyCar类，表示最基础的玩具车，它可以移动。
public abstract class ToyCar {
  public abstract void move();
}

// 接着，定义一个基本的玩具车实现，它只具备移动的功能：
public class BasicToyCar extends ToyCar {
  @Override
  public void move() {
    System.out.println("The toy car is moving.");
  }
}

// 接下来，定义几个装饰器类，分别为玩具车增加不同的功能：
// StickerDecorator：给玩具车增加彩色贴纸。
// HornDecorator：给玩具车增加喇叭。
// LightDecorator：给玩具车增加闪亮的灯。

public class StickerDecorator extends ToyCar {
    private ToyCar toyCar;

    public StickerDecorator(ToyCar toyCar) {
      this.toyCar = toyCar;
    }

    @Override
    public void move() {
      System.out.println("Adding colorful stickers...");
      toyCar.move();
    }
}

public class HornDecorator extends ToyCar {
    private ToyCar toyCar;

    public HornDecorator(ToyCar toyCar) {
      this.toyCar = toyCar;
    }

    @Override
    public void move() {
      System.out.println("Adding a horn...");
      toyCar.move();
    }
}

public class LightDecorator extends ToyCar {
    private ToyCar toyCar;

    public LightDecorator(ToyCar toyCar) {
      this.toyCar = toyCar;
    }

    @Override
    public void move() {
      System.out.println("Adding shiny lights...");
      toyCar.move();
    }
}

// 最后，我们可以创建一个基本的玩具车，并通过装饰器动态地为其增加功能：
public class Main {
  public static void main(String[] args) {
    // 创建一个基本的玩具车
    ToyCar basicCar = new BasicToyCar();

    // 依次给玩具车增加彩色贴纸、喇叭和闪亮的灯
    ToyCar decoratedCar = new StickerDecorator(new HornDecorator(new LightDecorator(basicCar)));

    // 移动玩具车
    decoratedCar.move();
  }
}

// 在这个例子中，ToyCar接口定义了所有玩具车（包括装饰器）都必须实现的方法move。BasicToyCar实现了这个接口，并提供了最基本的功能——移动。StickerDecorator、HornDecorator和LightDecorator都继承自ToyCar，并在各自的move方法中增加了新的功能，并调用了被装饰对象的move方法以保持原有的行为。

// 当你运行Main类中的main方法时，输出将会依次显示每一步装饰的过程，并最终展示带有新功能的玩具车的移动情况。这种方式使得我们可以在不修改原始BasicToyCar类的情况下，动态地为其添加新的功能。
```
