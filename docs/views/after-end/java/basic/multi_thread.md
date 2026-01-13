
## 多线程
### 程序
是为完成特定任务，用某种语言编写的一组指令的集合。简单的说：就是我们写的代码。
### 进程概念
1. 进程是批运行中的程序，比如正在使用的微信、QQ、浏览器等，就启动了一个进程，操作系统就会为该进程分配内存空间。当关闭程序时，操作系统就会释放该进程所占用的内存空间。
2. 进程是程序的一次执行过程，或是正在运行的一个程序。是动态过程：有它自身的产生、存在和消亡的过程。
### 线程概念
1. 线程是由进程创建的，是进程的一个实体
2. 一个进程可以拥有多个线程

### 其他概念
1. 单线程:同一个时刻，只允许执行一个线程，
2. 多线程:同一个时刻,可以执行多个线程，比如:一个qq进程，可以同时打开多个聊天窗口，一个迅雷进程，可以同时下载多个文件
3. 并发:同一个时刻，多个任务交替执行，造成一种“貌似同时”的错觉，简单的说，单核cpu实现的多任务就是并发。
4. 并行:同一个时刻，多个任务同时执行。多核cpu可以实现并行。

```java
public class CpuNum {
  public static void main(String[] args) {
    Runtime runtime = Runtime.getRuntime();

    // 获取cpu的核数
    int cpuNums = runtime.availableProcessors();
  }
}
```
### 线程基本使用
> 在java中线程使用有两种方法
1. 继承 `Thread` 类，重写 `run` 方法
2. 实现 `Runnable` 接口，重写 `run` 方法

```java
// 1. 请编写程序，并开启一个线程，该线程每隔1秒，在控制台打印一次：`"hello,world"`
// 2. 当输出超过5次后，结束该线程

public class Thread01 {
  public static void main(String[] args) {
    // 创建Cat对象，可以当做线程使用
    Cat cat = new Cat();
    /**
     * public synchronized void start() {
     *   start0();
     * }
     * start0() 是本地望海潮，是JVM调用，底层是C/C++实现
     * 真正实现多线程的效果是 start0() 底层代码，而不是run
     * private native void start0();
     */
    // cat.start(); // 启动线程，最终会执行cat的run方法

    cat.run(); // run方法就是一个普通的方法，没有真正启动一个线程，就会把run方法执行完比，才向下执行
    // 说明：当main线程启动一个子线程 Thread-0, 主线程不会阻塞，会继续执行
    // 这时，主线程和子线程是交替执行...
    System.out.println("主线程继续执行"+Thread.currentThread().getName());//名字main
    for(int i=0;i<60;i++){
      System.out.println("主线程 i="+ i);
      //让主线程休眠
      Thread.sleep(1000);
    }
  }
}

/**
 * 1. 当一个类继承了 Thread 类，该类就可以当做线程使用
 * 2. 我们会重写 run 方法，把线程要执行的代码，都卸载 run 方法中
 * 3. run Thread 类实现 Runnable 接口的 run 方法
 * 
 * @Override
 * public void run() {
 *  if (target != null) {
 *    target.run();
 *  }
 * }
 */
class Cat extends Thread {
  int times = 0;
  
  @Override
  public void run() { // java中实现直正的多线程是 start 中的 start0() 方法，run() 方法只是一个普通的方法
    while (true) {
      // 休息(睡眠)一秒
      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      System.out.println("hello,world" + (++times));

      if (times == 5) {
        break;
      }
    }
  }
}

/**
 * start 方法调用 start0() 方法后，该线程并不一定会立马执行，只是将线程变成了可运行状态。具
 * 体什么时候执行，取决于 CPU ，由 CPU统一调度。
 */
```
### 实现Runnable接口
1. java 是单继承的，在某些情况下一个类可能已经继承了某个父类，这时再继承 Thread 类就不可能了。
2. java 为了解决单继承的局限性，提供了一个接口 `java.lang.Runnable`。实现 `Runnable` 接口，就可以实现多线程编程。
```java

public class Thread02 {
  public static void main(String[] args) {
    Dog dog = new Dog();
    // dog.start(); // 这里不能调用 start 方法，因为 Dog 没有继承 Thread 类

    // 创建了 Thread 对象，把 dog 作为参数传递进去
    Thread t = new Thread(dog);
    t.start();

  }
}
class Dog implements Runnable {
  int count = 0;

  @Override
  public void run() {
    while (true) {
      System.out.println("汪汪汪 hi " + (++count) + Thread.currentThread().getName());

      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      if (count == 5) {
        break;
      }
    }
  }
}

// 线程代理类
class ThreadProxy implements Runnable {
  private Runnable target = null; // 属性，类型是Runnable

  @Override
  public void run() {
    if (target != null) {
      target.run(); // 动态绑定(运行类型 Tiger)
    }
  }

  public ThreadProxy(Runnable target) {
    this.target = target;
  }

  public void start() {
    start0();
  }

  public void start0() {
    run();
  }
}
```
### 继承 Thread 类和实现 Runnable 接口的区别
1. 从java的设计来看，通过继承Thread或者实现Runnable接口来创建线程本质上没有区别, 从jdk帮助文档我们可以看到Thread类本身就实现了Runnable接口 start()->start
2. 实现Runnable接口方式更加适合多个线程共享一个资源的情况，并且避免了单继承的限制
```java
T3 t3 = new T3("hello");
Thread thread01 = new Thread(t3);
Thread thread02 = new Thread(t3);
thread01.start();
thread02.start();
System.out.println("主线程完毕");
```

### 多线程案例

```java
/**
 * 
 * 请编写一个程序,创建两个线程,
 * 一个线程每隔1秒输出“hello,world”,输出10次，退出，
 * 一个线程每隔1秒输出“hi”,输出 5次退出
 * */

public class Thread02 {

    public static void main(String[] args) {
        // 创建 T1 和 T2 类的实例
        T1 task1 = new T1();
        T2 task2 = new T2(); // 假设你有这个类

        // 创建线程，将 Runnable 实例传递给 Thread 构造函数
        // 可以同时给线程命名，便于调试
        Thread thread1 = new Thread(task1, "Thread-Hello");
        Thread thread2 = new Thread(task2, "Thread-Hi");

        thread1.start();
        thread2.start();

    }
}

// 每隔1秒输出 hello,world, 输出10次
class T1 implements Runnable {
  int count = 0;

  @Override
  public void run() {
    while (true) {
      System.out.println("hello,world" + (++count) + Thread.currentThread().getName());

      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      if (count == 10) {
        break;
      }
    }
  }
}

// 每隔1秒输出 hi, 输出10次
class T2 implements Runnable {
  int count = 0;

  @Override
  public void run() {
    while (true) {
      System.out.println("hi" + (++count) + Thread.currentThread().getName());

      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      if (count == 5) {
        break;
      }
    }
  }
}
```
### 线程退出
1. 当线程完成任务后，自动退出
2. 还可能通过使用变量来控制run方法退出的方式停止线程，即通过方式
```java
/**
 * 使用多线程实现，三个窗口同时售票，总票数为100张
 */

public class SellTicketDemo1 {
  public static void main(String[] args) {
    SellTicket sellTicket01 = new SellTicket();
    SellTicket sellTicket02 = new SellTicket();
    SellTicket sellTicket03 = new SellTicket();
    // 这里会导致三个窗口同时卖票，因为三个窗口共享SellTicket对象，出现 卖票超卖的情况
    sellTicket01.start();
    sellTicket02.start();
    sellTicket03.start();

    SellTicket01 sellTicket02 = new SellTicket02();

    new Thread(sellTicket02).start(); // 
    new Thread(sellTicket02).start(); // 
    new Thread(sellTicket02).start(); // 
  }
}

// 使用Thread实现
class sellTicket01 extends Thread {
  private static int ticketNum = 100; // 让多个线程共享

  public void run() {
    while (true) {
      if (ticketNum <= 0) {
        System.out.println("票卖完了");
        break;
      }

      // 休眠50毫秒
      try {
        Thread.sleep(50);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      System.out.println("窗口" + Thread.currentThread().getName() + "卖出一张票，剩余票数：" + (--ticketNum));
    }
  }
}

// 使用Runnable实现

class SellTicket02 implements Runnable {
  private int ticketNum = 100; // 让多个线程共享

  public void run() {
    while (true) {
      if (ticketNum <= 0) {
        System.out.println("票卖完了");
        break;
      }

      // 休眠50毫秒
      try {
        Thread.sleep(50);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      System.out.println("窗口" + Thread.currentThread().getName() + "卖出一张票，剩余票数：" + (--ticketNum));
    }
  }
}
```
以上一个案例，不管是使用Thread还是Runnable，多个线程共享了ticketNum变量，导致票数出现了错误。这是因为多个线程在操作ticketNum时，会存在线程安全问题。

```java
// 线程退出案例
public class ThreadExit {
  public static void main(String[] args) {
    T t1 = new T();
    t1.start();

    // 主线程休眠10秒
    Thead.sleep(10000);
    
    // 如果希望主线程去控制t1线程的退出，必须修改loop
    // 让t1退出run方法，从而终止t1线程 -> 通知方式
    t1.setLoop(false);
  }
}

class T extends Thread {
  int count = 0;
  // 设置一个控制变量
  private boolean loop = true;

  @Override
  public void run() {
    while (loop) {
      try {
        Thread.sleep(50);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      System.out.println("T 线程运行中 ... " + (++count));
    }
  }

  public void setLoop(boolean loop) {
    this.loop = loop;
  }
}
```
### 线程常用方法
1. setName:设置线程名称，使之与参数 name 相同
2. getName: 返回该线程的名称
3. start: 使该线程开始执行;Java 虚拟机底层调用该线程的 start0 方法。start 底层会创建新的线程，调用run，run本身 就是一个简单的方法调用，不会启动新线程
4. run: 调用线程对象 run 方法
5. setPriority: 更改线程的优先级
6. getPriority: 获取线程的优先级
7. sleep: 在指定的毫秒数内让当前正在执行的线程休眠(暂停执行)
8. interrupt: 中断线程，但并没有真正的结束线程。所以一般用于中断正在休眠线程
9. sleep: 线程的静态方法，使当前线程休眠
10. yield: 线程的礼让。让出cpu，让其他线程执行，但礼让的时间不确定，所以也不一定礼让成功
11. join: 线程的插队。插队的线程一旦插队成功，则肯定先执行完插入的线程所有的任务

### 线程中断
```java

public class ThreadInterrupt throws InterruptedException {
  public static void main(String[] args) {
    T t = new T();
    t.setName("吃包子");
    t.setPriority(Thread.MIN_PRIORITY);

    t.start();

    // 主线程输出打印 5 个hi, 然后就中断子线程的休眠
    for (int i = 0; i < 5; i++) {
      Thread.sleep(1000);
      System.out.println("hi " + i);
    }

    System.out.println(t.getName() + " 线程的优先级 " + t.getPriority());
    t.interrupt(); // 当执行到这里，就会中断 t 线程的休眠
  }

}
class T extends Thread {
    @Override
    public void run() {
        while (true) {
            for (int i = 0; i < 100; i++) {
                System.out.println(Thread.currentThread().getName() + " 吃包子 " + (++i));
            }
            try {
                System.out.println(Thread.currentThread().getName() + " 休眠中 ");
                Thread.sleep(20000);
            } catch (InterruptedException e) {
                // 当线程被执行到一个 Interrupt 方法时，就会catch一个异常，可以加入自己的业务代码
                // InterruptExpection 是捕获到一个中断异常
                System.out.println(Thread.currentThread().getName() + " 被 interrupt");
            }

        }
    }
}
```
### 线程插队
```java

public class Main {
  public static void main(String[] args) throws InterruptedException {
      T2 t2 = new T2();
      t2.start();

      for (int i = 0; i < 20; i++) {
          Thread.sleep(1000);
          System.out.println("主线程 吃了 " + i);

          if (i == 5) {
              System.out.println("主线程让子线程全部吃完");
              t2.join(); // 相当于让t2先执行完毕
              //  t2.yield(); // 礼让不一定成功
              System.out.println("子线程吃完了，主线程再接着吃");
          }
      }
  }

}
class T2 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("子线程吃了 ---- " + i + " 个包子");


        }
    }
}
```

```java
/**
 * 创建一个子线程，每隔1s输出hello，输出20次，
 * 主线程每隔1秒输出hi,输出20次，
 * 要求：两个线程同时执行，当主线程输出5次后，就让子线程运行，子线程运行完毕，主线程再继续
 */
public class Main {
  public static void main(String[] args) throws InterruptedException {
  
    Thread t3 = new Thread(new T3());
    for (int i = 0; i <= 10; i++) {
        System.out.println("hi " + i);
        if (i == 5) { // 说明主线程输出了5次hi
            t3.start(); // 启动子线程 输出hello...
            t3.join(); // 立即将 t3 子线程，插入到主线程，让 t3 先执行
        }
        Thread.sleep(1000); // 输出一次hi, 让主线程休眠一秒
    }
  
  }
}
class T3  implements Runnable {
    private int count = 0;

    @Override
    public void run() {
        while (true) {
            System.out.println("hello " + (++count));

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            if (count >= 10) {
                break;
            }
        }
    }
}
```
### 用户线程和守护线程
1. 用户线程：也叫工作线程，当线程的任务执行完或通知方式结束
2. 守护线程：一般是为工作线程服务的，当所有的用户线程结束，守护线程自动结束
3. 常见的守护线程：垃圾回收机制
```java
public class Main {
    public static void main(String[] args) throws InterruptedException {
        MyDeaemonThread myDeaemonThread = new MyDeaemonThread();
        // 如果我们希望当main结束结束后，子线程自动结束
        // 只需要将子线程设为守护线程即可
        myDeaemonThread.setDaemon(true);
        myDeaemonThread.start();

        for (int i = 1; i <= 10; i++) {
            System.out.println("主线程在工作。。。。" + i);
            Thread.sleep(1000);
        }
        System.out.println("主线程结束工作");
    }
}


class MyDeaemonThread extends Thread {

    @Override
    public void run() {
        for(;;) { // 无限循环
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("子线程在工作");
        }

    }
}
```
### 线程的7种状态
1. NEW: 新建状态，线程被创建，但是还没有调用start方法。尚未启动的线程处于此状态。
2. RUNNABLE: 运行状态，Java线程中将就绪（ready）和运行中（running）两种状态笼统地称为“运行中”。 在Java虚拟机中执行的线程处于此状态。
3. BLOCKED: 阻塞状态，线程被阻塞等待监视器锁定的线程处于此状态。被阻塞等待监视器锁定的线程处于此状态。
4. WAITING: 等待状态，等待另一个线程执行特定操作的线程处于此状态。等待另一个线程执行特定操作的线程处于此状态。正在等待另一个线程执行特定动作的线程处于此状态。
5. TIMED_WAITING: 超时等待状态，等待另一个线程执行动作达到指定等待时间的线程处于此状态。等待另一个线程执行动作达到指定等待时间的线程处于此状态。正在等待另一个线程执行动作达到指定等待时间的线程处于此状态。
6. TERMINATED: 终止状态，已终止线程的线程处于此状态。线程已经结束执行。已退出的线程处于此状态。
```java

public class Main {
    public static void main(String[] args) throws InterruptedException {
        T t = new T();
        System.out.println(t.getName() + " 状态 " + t.getState());
        t.start();

        while (Thread.State.TERMINATED != t.getState()) {
            System.out.println(t.getName() + " 状态 " + t.getState());
        }

        System.out.println(t.getName() + " 状态 " + t.getState());
    }
}


class T extends Thread {
    @Override
    public void run() {
        while (true) {
            for (int i = 0; i < 10; i++) {
                System.out.println("hi " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            break;
        }
    }
}
```
### 线程同步
1. 在多线程编程，一些敏感数据不允许被多个线程同时访问，此时就使用同步访问技术，保证数据在任何时刻，最多有一个线程访问，以保证数据的完整性。
2. 也可以这里理解:线程同步，即当有一个线程在对内存进行操作时，其他线程都不可以对这个内存地址进行操作，直到该线程完成操作，其他线程才能对该内存地址进行操作。

#### 线程同步的两种方式
1. 同步代码块
```java
synchronized (锁对象) { // 得到对象的锁，才能执行同步代码块中的内容
  // 需要被同步的代码
}
```
2. synchronized 还可以放在方法声明中，表示整个方法为同步方法
```java
public synchronized void method() {
  // 需要被同步的代码
}
```
```java
// 卖票案例
public class Main {
    public static void main(String[] args) throws InterruptedException {
        SellTicket03 sellTicket03 = new SellTicket03();
        new Thread(sellTicket03).start(); //
        new Thread(sellTicket03).start(); //
        new Thread(sellTicket03).start();
    }
}
class SellTicket03 implements Runnable {
    private int ticketNum = 100; // 让多个线程共享
    private boolean loop = true;

    // 1. public synchronized void sell(){} 就是一个同步方法
    // 2. 这时锁在this对象
    // 3. 也可以在代码块上写synchronize同步代码块
    public synchronized void sell() { // 同步方法，在同一时刻，只能有一个线程来执行run方法
        if (ticketNum <= 0) {
            System.out.println("票卖完了");
            this.loop = false;
            return;
        }

        // 休眠50毫秒
        try {
            Thread.sleep(50);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("窗口" + Thread.currentThread().getName() + "卖出一张票，剩余票数：" + (--ticketNum));
    }
    public void run() {
        while (loop) {
            sell(); // sell方法是一个同步方法
        }
    }
}
```

### 互斥锁
1. Java在Java语言中，引入了对象互斥锁的概念，来保证共享数据操作的完整性。
2. 每个对象都对应于一个可称为“互斥锁”的标记，这个标记用来保证在任一时刻，只能有一个线程访问该对象。
3. 关键字`synchronized` 来与对象的互斥锁联系。当某个对象用synchronized修饰时表明该对象在任一时刻只能由一个线程访问
4. 同步的局限性:导致程序的执行效率要降低
5. 同步方法(非静态的)的锁可以是this,也可以是其他对象(要求是同一个对象)
6. 同步方法(静态的)的锁为当前类本身

```java
public class Main {
    public static void main(String[] args) throws InterruptedException {

        SellTicket03 sellTicket03 = new SellTicket03();
        new Thread(sellTicket03).start(); //
        new Thread(sellTicket03).start(); //
        new Thread(sellTicket03).start();
    }
}

// 实现接口方式，使用synchronized实现线程同步
class SellTicket03 implements Runnable {
    private int ticketNum = 100; // 让多个线程共享
    private boolean loop = true; // 控制run方法变量
    Object object = new Object();

    // 同步方法(静态的)的锁为当前类本身
    // 1. public synchronized static void m1(){}锁是加在 SellTicket03.class
    // 2. 如果在静态方法中，实现一个同步代码块。
    public synchronized static void m1() {

    }

    // 如果在静态方法中，实现一个同步代码块。
    public static void m2() {
        synchronized (SellTicket03.class) {
            System.out.println("m2...");
        }
    }

    //1. public synchronized void sell(){} 就是一个同步方法
    //2. 这时锁在 this对象

    //3. 也可以在代码块上写synchronize,同步代码块
    public void sell() { // 同步方法，在同一时刻，只能有一个线程来执行run方法
//        synchronized (this) {
        synchronized (object) {
            if (ticketNum <= 0) {
                System.out.println("票卖完了");
                this.loop = false;
                return;
            }

            // 休眠50毫秒
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("窗口" + Thread.currentThread().getName() + "卖出一张票，剩余票数：" + (--ticketNum));
        }
    }
    public void run() {
        while (loop) {
            sell(); // sell方法是一个同步方法
        }
    }
}
```
#### 互斥锁的注意事项
1. 同步方法如果没有使用static修饰:默认锁对象为this
2. 如果方法使用static修饰，默认锁对象:当前类.class
3. 实现的落地步骤:
- 需要先分析上锁的代码
- 选择同步代码块或同步方法
- 要求多个线程的锁对象为同一个即可!
### 死锁
多个线程都占用了对方的锁资源，但不肯相让，导致了死锁,在编程是一定要避免死锁的发生.

```java
/**
 * 妈妈:你先完成作业，才让你玩手机小明:你先让我玩手机，我才完成作业
*/

public class Main {
    public static void main(String[] args) throws InterruptedException {
        // 模拟死锁现象
        DeadLockDemo A = new DeadLockDemo(true);
        A.setName("线程A");
        DeadLockDemo B = new DeadLockDemo(false);
        B.setName("线程B");

        A.start();
        B.start();

    }
}


class DeadLockDemo extends Thread {
    static Object o1 = new Object();
    static Object o2 = new Object();

    boolean flag;

    public DeadLockDemo(boolean flag) {
        this.flag = flag;
    }

    @Override
    public void run() {
        //下面业务逻辑的分析
        // 1. 如果flag为T，线程A就会先得到/持有01对象锁，然后尝试去获取02对象锁
        // 2. 如果线程A得不到02对象锁，就会Blocked
        // 3. 如果flag为F，线程B就会先得到/持有02对象锁，然后尝试去获取01对象锁
        // 4。如果线程B得不到01对象锁，就会Blocked
        if (flag) {
            synchronized (o1) { // 对象互斥锁，下面就是同步代码
                System.out.println(Thread.currentThread().getName() + "进入1");
                synchronized (o2) { // 这里获得li对象的监视权
                    System.out.println(Thread.currentThread().getName() + "进入2");
                }
            }
        } else {
            synchronized (o2) {
                System.out.println(Thread.currentThread().getName() + "进入3");
                synchronized (o1) { //这里获得li对象的监视权
                    System.out.println(Thread.currentThread().getName() + "进入4");
                }
            }
        }
    }
}

```
### 释放锁
#### 下面操作不会释放锁

1. 线程执行同步代码块或同步方法时，程序调用Thread.sleep()、Thread.yield()方法暂停当前线程的执行，不会释放锁。案例:上厕所，太困了，在坑位上眯了一会
2. 线程执行同步代码块时，其他线程调用了该线程的suspend()方法将该线程挂起，该线程不会释放锁。`提示:应尽量避免使用suspend()和resume()来控制线程，方法不再推荐使用`
#### 下面操作会释放锁

1. 当前线程的同步方法、同步代码块执行结束`案例:上厕所，完事出来`
2. 当前线程在同步代码块、同步方法中遇到break、return`案例:没有正常的完事，经理叫他修改bug，不得已出来`
3. 当前线程在同步代码块、同步方法中出现了未处理的Error或Exception，导致异常结束`案例:没有正常的完事，发现忘带纸，不得已出来`
4. 当前线程在同步代码块、同步方法中执行了线程对象的wait()方法，当前线程暂停，并释放锁。`觉得需要酝酿下，所以出来等会再进去`

### 线程练习
```java
/**
 * 1. 在 main 方法中启动两个线程
 * 2. 第1个线程循环随机打印100以内的整数
 * 3. 直到第2个线程从键盘读取了“Q”命令
 */

public class Main {
    public static void main(String[] args) {
        A a = new A();
        B b = new B(a);

        a.start();
        b.start();

    }
}

class A extends Thread {
    private boolean loop = true;

    @Override
    public void run() {
        while (loop) {
            int num = (int)(Math.random() * 100 + 1);
            System.out.println(num);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("A 线程退出");
    }

    public void setLoop(boolean loop) {
        this.loop = loop;
    }
}

class B extends Thread {

    private A a;
    private Scanner scanner = new Scanner(System.in);
    public B(A a) { // 在构造器中传入 A 类对象
        this.a = a;
    }

    public void setA(A a) {
        this.a = a;
    }

    @Override
    public void run() {
        while (true) {
            System.out.println("请输入你的指令：");
            char key = scanner.next().toUpperCase().charAt(0);

            if (key == 'Q') {
                // 以通知的方式结束A线程
                a.setLoop(false);
                System.out.println("B 线程退出");
                break;
            }
        }
    }
}

/**
 * 1. 有2个用户分别从同一个卡上取钱(总额:10000)
 * 2. 每次都取1000,当余额不足时，就不能取款了
 * 3. 不能出现超取现象 =》 线程同步问题.
 */

public class Main {
    public static void main(String[] args) {
        T t = new T();
        Thread thread1 = new Thread(t);
        thread1.setName("t1");
        Thread thread2 = new Thread(t);
        thread2.setName("t2");

        thread1.start();
        thread2.start();
    }
}
// 因为涉及到多个线程共享资源，所以我们使用Runnable方式
class T implements Runnable {
    private int money = 10000;

    @Override
    public void run() {

        while (true) {
            /**
             * 1. 这里使用 synchronized 实现了线程同步
             * 2. 当多个线程执行到这里时，就会去争夺 this对象锁
             * 3. 哪个线程争夺到(获取)this对象锁，就执行 synchronized 代码块，执行完后，会释放 this对象锁
             * 4. 争夺不到this对象锁，就blocked。准备继续争夺
             * */
            synchronized (this) {
                if (money < 1000) {
                    System.out.println("余额不足");
                    break;
                }

                money -= 1000;
                System.out.println(Thread.currentThread().getName() + " 取出了1000块，当前余额 = " + money);

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```