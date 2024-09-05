# 外观模式

## 介绍
外观模式，即Facade，是一个比较简单的模式。它的基本思想如下：
如果客户端要跟许多子系统打交道，那么客户端需要了解各个子系统的接口，比较麻烦。如果有一个统一的“中介”，让客户端只跟中介打交道，中介再去跟各个子系统打交道，对客户端来说就比较简单。所以Facade就相当于搞了一个中介。

## 案例
```java
// 家庭影院系统，其中包含了不同的设备（子系统），如音响、投影仪、灯光、屏幕等。我们将创建一个遥控器（外观类），用户可以通过这个遥控器来控制整个家庭影院系统的启动和关闭

// 子系统类 - PopcornPopper
class PopcornPopper {
  // 打开爆米花机
  public void on() {
    System.out.println("PopcornPopper on");
  }

  // 关闭爆米花机
  public void off() {
    System.out.println("PopcornPopper off");
  }

  // 开始制作爆米花
  public void pop() {
    System.out.println("PopcornPopper popping popcorn!");
  }
}

// 子系统类 - 家庭影院灯光
class HomeTheaterLight {
  // 调暗灯光到指定亮度
  public void dim(int level) {
    System.out.printf("Dimming the lights to %d%%\n", level);
  }

  // 打开灯光
  public void on() {
    System.out.println("Lights on");
  }
}

// 子系统类 - 投影仪
class Projector {
  // 打开投影仪
  public void on() {
    System.out.println("Projector on");
  }

  // 设置宽屏模式
  public void wideScreenMode() {
    System.out.println("Projector in widescreen mode (for movie)");
  }

  // 关闭投影仪
  public void off() {
    System.out.println("Projector off");
  }
}

// 子系统类 - 放大器
class Amplifier {
  // 打开放大器
  public void on() {
    System.out.println("Amplifier on");
  }

  // 设置DVD播放器
  public void setDvd(DvdPlayer dvd) {
    System.out.printf("Amplifier setting DVD player to %s\n", dvd);
  }

  // 设置环绕声模式
  public void setSurroundSound() {
    System.out.println("Amplifier setting surround on");
  }

  // 设置音量
  public void setVolume(int level) {
    System.out.printf("Setting volume to %d\n", level);
  }

  // 关闭放大器
  public void off() {
    System.out.println("Amplifier off");
  }
}

// 子系统类 - DVD播放器
class DvdPlayer {
  // 打开DVD播放器
  public void on() {
    System.out.println("DVD Player on");
  }

  // 播放电影
  public void play(String movie) {
    System.out.printf("Playing movie '%s'\n", movie);
  }

  // 停止播放
  public void stop() {
    System.out.println("Stopping movie");
  }

  // 弹出光盘
  public void eject() {
    System.out.println("Ejecting DVD");
  }

  // 关闭DVD播放器
  public void off() {
    System.out.println("DVD Player off");
  }
}

// 外观类 - 家庭影院控制器
class HomeTheaterFacade {
  private Amplifier amp;       // 放大器
  private DvdPlayer dvd;       // DVD播放器
  private Projector projector; // 投影仪
  private HomeTheaterLight lights; // 家庭影院灯光
  private PopcornPopper popper; // 爆米花机

  // 构造函数，初始化子系统对象
  public HomeTheaterFacade(Amplifier amp, DvdPlayer dvd, Projector projector, HomeTheaterLight lights, PopcornPopper popper) {
    this.amp = amp;
    this.dvd = dvd;
    this.projector = projector;
    this.lights = lights;
    this.popper = popper;
  }

  // 启动电影观看流程
  public void watchMovie(String movie) {
    System.out.printf("Getting ready to watch %s...\n", movie);
    popper.on();           // 打开爆米花机
    popper.pop();          // 制作爆米花
    lights.dim(10);        // 将灯光调暗至10%
    projector.on();        // 打开投影仪
    projector.wideScreenMode(); // 设置投影仪为宽屏模式
    amp.on();              // 打开放大器
    amp.setDvd(dvd);       // 设置放大器的输入源为DVD播放器
    amp.setSurroundSound(); // 设置环绕声音效
    amp.setVolume(5);      // 设置音量为5
    dvd.on();              // 打开DVD播放器
    dvd.play(movie);       // 播放电影
  }

  // 结束电影观看流程
  public void endMovie() {
    System.out.println("Shutting movie theater down...");
    popper.off();          // 关闭爆米花机
    lights.on();           // 打开灯光
    projector.off();       // 关闭投影仪
    amp.off();             // 关闭放大器
    dvd.stop();            // 停止播放电影
    dvd.eject();           // 弹出DVD
    dvd.off();             // 关闭DVD播放器
  }
}

public class Main {
  public static void main(String[] args) {
    // 创建子系统对象
    Amplifier amp = new Amplifier();
    DvdPlayer dvd = new DvdPlayer();
    Projector projector = new Projector();
    HomeTheaterLight lights = new HomeTheaterLight();
    PopcornPopper popper = new PopcornPopper();

    // 初始化外观类
    HomeTheaterFacade facade = new HomeTheaterFacade(amp, dvd, projector, lights, popper);

    // 观看电影
    facade.watchMovie("Avatar");

    // 结束电影
    facade.endMovie();
  }
}
```