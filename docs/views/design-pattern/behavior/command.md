# 命令模式
## 介绍 
命令模式（Command Pattern）是一种设计模式。它将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对命令排队或记录命令日志，以及支持可撤销的操作。

## 优点：
- 封装了请求：命令模式将请求封装成对象，可以使用不同的请求来参数化对象。
- 扩展性：可以通过定义新的命令类来进行扩展。
- 支持事务操作：可以将多个命令组合成一个复合命令，即宏命令（Macro Command），如果其中任何一个命令执行失败，则可以撤销所有已执行的命令。
- 支持撤销操作：通过记录执行过的命令，在需要的时候就可以恢复到执行前的状态。
## 命令模式包含以下几个角色：
- 命令（Command）：声明了一个执行操作的接口。
- 具体命令（Concrete Command）：实现了抽象命令接口，它拥有接收者对象，并通过调用接收者的功能来完成命令。
- 接收者（Receiver）：实现了命令中的业务逻辑。
- 请求发送者（Invoker）：请求发送者持有命令对象，并通过命令对象来间接调用接收者的方法。
- 客户端（Client）：创建具体命令对象，并设定其接收者。

## 代码示例

```java
/**
 * 要使用Java实现一个家用电器控制系统，我们可以采用命令模式来设计。
 * 下面是一个简化的示例代码，展示如何使用命令模式来创建一个开关面板，用于控制家中的灯光。
 * 
 * 首先，我们定义一个接收者类 Light，它表示我们想要控制的对象：
 */

public class Light {
    public void on() {
        System.out.println("Light is on");
    }

    public void off() {
        System.out.println("Light is off");
    }
}

// 然后，我们需要定义命令接口 Command 和具体的命令类 LightOnCommand 和 LightOffCommand：
public interface Command {
    void execute();
}

public class LightOnCommand implements Command {
    private final Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.on();
    }
}

public class LightOffCommand implements Command {
    private final Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.off();
    }
}

// 接下来，我们需要有一个调用者 RemoteControl，它可以用来存储并执行命令：
public class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
}

// 最后，我们可以创建一些实例，并演示如何使用这个系统：
public class Main {
    public static void main(String[] args) {
        // 创建一个灯光实例
        Light livingRoomLight = new Light();

        // 创建两个命令实例
        Command turnOn = new LightOnCommand(livingRoomLight);
        Command turnOff = new LightOffCommand(livingRoomLight);

        // 创建一个遥控器实例
        RemoteControl remoteControl = new RemoteControl();

        // 设置遥控器的命令，并执行
        remoteControl.setCommand(turnOn);
        remoteControl.pressButton();  // 输出 "Light is on"

        remoteControl.setCommand(turnOff);
        remoteControl.pressButton();  // 输出 "Light is off"
    }
}

/**
 *  这个简单的例子展示了如何使用命令模式来创建一个家用电器控制系统。
 * 在这个例子中，Light 类充当了接收者角色，
 * Command 接口定义了命令行为，LightOnCommand 和 LightOffCommand 是具体的命令实现，
 * 而 RemoteControl 则是请求发送者，它负责执行命令。
 *  */
```