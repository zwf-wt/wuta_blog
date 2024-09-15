# 责任链模式
## 介绍
责任链模式（Chain of Responsibility Pattern）是一种设计模式，它让你能够将请求沿着处理者链进行发送。接收请求后，每个处理者都可以对请求进行处理或者将其传给链上的下一个处理者。这种模式有助于减少请求发送者与多个请求处理者的耦合，因为发送者只需要知道请求会被处理，而不需要知道具体哪个处理者会处理它。

## 责任链模式通常包括以下组成部分：
- 发送者(Sender)：创建一个请求的对象，并且不知道具体的接收者是谁。
- 请求(Request)：需要处理的信息。
- 接收者(Receiver)：处理请求的对象，接收者包含具体的处理逻辑。每个接收者要么处理请求，要么将请求传递给下一个接收者。
- 抽象处理者(Abstract Handler)：定义了一个处理请求的接口，通常包含一个方法来调用下一个处理者。
- 具体处理者(Concrete Handlers)：实现抽象处理者中定义的方法，具体决定是否要处理请求，如果不处理，则将请求传给它的后继对象。

## 优点：
- 降低耦合度：发送者与接收者之间没有直接关联，使得系统更加灵活。
- 方便增加新的处理者：可以动态地添加新的处理者到链中，而不影响其他处理者或客户端代码。
- 更好的分工合作：每个处理者只负责自己的职责范围内的工作，有助于职责分离原则的实现。

## 缺点：
- 增加了系统的复杂性：维护多个处理者类和它们之间的关系可能会变得复杂。
- 可能导致责任模糊：如果没有明确指出某个请求应该由谁处理，可能会导致请求未被处理的情况。

## 案例
```java
/**
 * 假设有一个客户支持系统，该系统有三个级别的支持人员：一线支持、二线支持和技术专家。
 * 每种支持人员处理不同类型的问题，如果他们不能处理问题，那么问题会被传递给更高一级的支持人员。
 */

// 定义抽象处理者（Abstract Handler）
// 首先，我们定义一个抽象类 SupportHandler，它定义了处理请求的基本行为，以及如何将请求传递给下一个处理者。
public abstract class SupportHandler {
  private SupportHandler next;

  public void setNext(SupportHandler next) {
    this.next = next;
  }

  public final void handleRequest(String issue) {
    if (next != null) {
      doHandle(issue);
      next.handleRequest(issue);
    } else {
      doHandle(issue);
    }
  }

  protected abstract void doHandle(String issue);
}

// 创建具体处理者（Concrete Handlers）
// 然后，为每种类型的支持人员创建具体的类，并实现 doHandle 方法。
// 一线支持
public class LevelOneSupport extends SupportHandler {
  @Override
  protected void doHandle(String issue) {
    if ("常见问题".equals(issue)) {
      System.out.println("LevelOneSupport: 我可以解决这个问题.");
    } else {
      System.out.println("LevelOneSupport: 我无法解决这个问题.");
    }
  }
}

// 二线支持
public class LevelTwoSupport extends SupportHandler {
  @Override
  protected void doHandle(String issue) {
    if ("技术配置".equals(issue)) {
      System.out.println("LevelTwoSupport: 我可以解决这个问题.");
    } else {
      System.out.println("LevelTwoSupport: 我无法解决这个问题.");
    }
  }
}

// 技术专家
public class TechnicalExpert extends SupportHandler {
  @Override
  protected void doHandle(String issue) {
    if ("高级故障排除".equals(issue)) {
      System.out.println("TechnicalExpert: 我可以解决这个问题.");
    } else {
      System.out.println("TechnicalExpert: 我无法解决这个问题.");
    }
  }
}

// 组建责任链
// 接下来，我们需要设置责任链中的顺序：
public class Client {
  public static void main(String[] args) {
    SupportHandler levelOne = new LevelOneSupport();
    SupportHandler levelTwo = new LevelTwoSupport();
    SupportHandler expert = new TechnicalExpert();

    // 设置责任链
    levelOne.setNext(levelTwo).setNext(expert);

    // 提交请求
    levelOne.handleRequest("常见问题");
    levelOne.handleRequest("技术配置");
    levelOne.handleRequest("高级故障排除");
  }
}

// 在这个例子中，请求从一线支持开始传递，
// 如果一线支持不能解决，就传递给二线支持；
// 如果二线支持也不能解决，再传递给技术专家。
// 这样，请求就会沿着责任链传递，直到找到可以解决问题的支持人员为止。
```