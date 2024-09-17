# 观察者模式
## 介绍
观察者模式（Observer Pattern）是一种软件设计模式，在面向对象的设计模式中属于行为型模式。它定义了对象之间的一对多依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知并自动更新。

- 观察者模式包含以下几个主要的角色：

1. Subject（主题/被观察者）：也称为目标或被观察者。它维护了一个观察者列表，并提供添加和删除观察者的接口。当它的状态发生改变时，会向观察者们发出通知。
2. Observer（观察者）：实现了一个更新的接口方法，当接收到主题的通知时会被调用，从而可以更新自己的状态。
3. ConcreteSubject（具体主题）：是Subject的具体实现类，它持有内部状态，并且在状态改变时通知它的观察者。
4. ConcreteObserver（具体观察者）：是Observer的具体实现类，它存储了与具体主题相关的信息，并且会在接到具体主题的通知后更新自己的状态。

一个简单的观察者模式的应用例子可以是一个股票报价系统。假设有一个股票报价主题，多个用户订阅该主题以获取最新的股票价格信息。当股票价格发生变化时，主题会通知所有订阅的用户，用户可以根据新的价格做出相应的决策。

- 观察者模式的优点包括：

1. 它使得对象之间的依赖关系最小化，增强系统的灵活性。
2. 可以实现事件处理机制，比如GUI框架中的按钮点击事件等。

- 缺点则可能有：

- 如果一个主题对象有很多直接和间接的观察者，将所有的观察者通知到会花费很多时间。
- 如果在观察者和观察目标之间有循环依赖的话，可能会引发更新的风暴。

在实际应用中，观察者模式非常常见，尤其是在需要实现某种订阅-发布机制的情况下。许多现代编程语言和框架都有内置的支持来简化观察者模式的实现。例如，在Java中有java.util.Observable类可以使用，在JavaScript中可以通过事件监听器机制来实现观察者模式。

## 案例
1. 我们将创建一个天气数据站（被观察者）和一些天气显示设备（观察者），当天气数据发生变化时，显示设备会自动更新。
```java
/**
 * 首先，我们需要定义一个 Observer 接口，
 * 然后创建一个 WeatherDisplay 类来实现这个接口。
 * 接下来，我们定义一个 Subject 接口，
 * 然后创建一个 WeatherStation 类来实现这个接口。
 * 最后，我们将创建主程序来展示这个模式的工作方式。
 *  */
import java.util.ArrayList;
import java.util.List;

// Observer 接口定义了观察者的行为
interface Observer {
    void update(float temperature, float humidity);
}

// 具体的观察者类
class WeatherDisplay implements Observer {
    private String location;

    public WeatherDisplay(String location) {
        this.location = location;
    }

    @Override
    public void update(float temperature, float humidity) {
        System.out.printf("%s Display: Updating with new weather data: Temperature=%.1f°C, Humidity=%.1f%%\n",
                location, temperature, humidity);
    }
}

// Subject 接口定义了被观察者的行为
interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}

// 具体的被观察者类
class WeatherStation implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private float temperature;
    private float humidity;

    @Override
    public void registerObserver(Observer o) {
        System.out.println("Weather Station: Registering an observer...");
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        int i = observers.indexOf(o);
        if (i >= 0) {
            System.out.println("Weather Station: Removing an observer...");
            observers.remove(i);
        }
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity);
        }
    }

    // 设置新的天气数据
    public void setMeasurements(float temperature, float humidity) {
        this.temperature = temperature;
        this.humidity = humidity;
        System.out.printf("Weather Station: New measurements recorded: Temperature=%.1f°C, Humidity=%.1f%%\n",
                temperature, humidity);
        notifyObservers(); // 数据改变后，通知所有观察者
    }
}

public class Main {
    public static void main(String[] args) {
        // 创建天气数据站实例
        WeatherStation weatherStation = new WeatherStation();

        // 创建两个显示设备实例
        WeatherDisplay homeDisplay = new WeatherDisplay("Home");
        WeatherDisplay officeDisplay = new WeatherDisplay("Office");

        // 注册显示设备为观察者
        weatherStation.registerObserver(homeDisplay);
        weatherStation.registerObserver(officeDisplay);

        // 模拟更新天气数据
        weatherStation.setMeasurements(28.5f, 65.0f);
    }
}

/**
 * 在这个例子中：
 * WeatherStation 类实现了 Subject 接口，作为被观察者。
 * WeatherDisplay 类实现了 Observer 接口，作为观察者。
 * 当 WeatherStation 中的数据发生变化时，
 * 它会调用 notifyObservers 方法来通知所有注册的观察者。
 * 观察者通过 update 方法接收新的数据，并更新自身的显示。
 * 运行这段代码，你会看到两个显示设备都收到了天气数据更新的通知，
 * 并显示了新的数据。这就是观察者模式的一个基本实现。
 */
```