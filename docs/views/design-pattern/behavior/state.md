# 状态模式
## 介绍
状态模式（State Pattern）是面向对象设计模式中的一种，它允许一个对象在其内部状态改变时改变它的行为。这个模式将与特定状态相关的行为封装进一个单独的类中，这样对象就可以像改变它的属性一样改变它当前的状态。这种模式可以使得状态转换变得更加清晰和灵活。

状态模式的核心思想是定义一组对象来表示不同的状态，并且将状态之间的转换封装在这些对象之中。当一个外部条件使对象需要改变其行为时，它可以动态地改变状态。这样做的好处是：

- 它遵循了开闭原则（Open-Closed Principle），即软件实体应该对扩展开放，对修改关闭。也就是说，你可以添加新的状态类而不必修改现有代码。
- 提高了易维护性和系统的灵活性。

状态模式通常包括以下部分：

- 环境角色(Context)：包含一个状态对象的引用，通常定义了一个接口来将状态对象传递给客户端。
- 抽象状态(State)：定义一个接口或抽象类，强制具体状态类实现某些方法。
- 具体状态(Concrete States)：每个具体状态类都实现了抽象状态中的方法，并负责改变上下文的状态。
```java
/**
 * 假设有一个交通信号灯系统，
 * 它有三种状态：红灯、黄灯和绿灯。
 * 每种状态都有其特定的行为，比如红灯亮时，车不能行驶；绿灯亮时，车可以行驶等。
 */
// 定义一个状态接口，所有具体的灯状态都需要实现此接口
interface TrafficLightState {
    void handle(); // 每个状态都会定义如何处理当前的情况
}

// 具体状态之一：红灯状态
class RedLight implements TrafficLightState {
    @Override
    public void handle() {
        System.out.println("Red light is on, stop!"); // 当前为红灯状态，指示车辆停止
    }
}

// 具体状态之二：黄灯状态
class YellowLight implements TrafficLightState {
    @Override
    public void handle() {
        System.out.println("Yellow light is on, get ready!"); // 当前为黄灯状态，提示准备
    }
}

// 具体状态之三：绿灯状态
class GreenLight implements TrafficLightState {
    @Override
    public void handle() {
        System.out.println("Green light is on, go!"); // 当前为绿灯状态，允许通行
    }
}

// 环境角色：交通灯
class TrafficLight {
    // 状态变量，持有当前交通灯的状态
    private TrafficLightState state;

    // 设置当前状态的方法
    public void setState(TrafficLightState state) {
        this.state = state;
    }

    // 改变当前状态的方法
    public void change() {
        state.handle(); // 调用当前状态的handle方法
    }
}

// 主程序，用于演示状态模式的应用
public class Main {
    public static void main(String[] args) {
        TrafficLight trafficLight = new TrafficLight(); // 创建交通灯实例
        
        // 设置初始状态为红灯
        trafficLight.setState(new RedLight());
        trafficLight.change(); // 输出：Red light is on, stop!
        
        // 更改状态为绿灯
        trafficLight.setState(new GreenLight());
        trafficLight.change(); // 输出：Green light is on, go!
        
        // 更改状态为黄灯
        trafficLight.setState(new YellowLight());
        trafficLight.change(); // 输出：Yellow light is on, get ready!
    }
}

/**
 * 在这个例子中：
 * TrafficLightState 接口定义了所有状态都应该实现的 handle 方法。
 * RedLight, YellowLight, 和 GreenLight 类分别实现了 TrafficLightState 接口，代表了交通灯的三种可能状态。
 * TrafficLight 类作为环境角色，它持有当前状态的信息，并提供了改变状态的方法。
 * 在 Main 类的 main 方法中，我们创建了一个 TrafficLight 实例，并通过调用 setState 方法来更改交通灯的状态，然后调用 change 方法来展示当前状态的行为。
 */
```