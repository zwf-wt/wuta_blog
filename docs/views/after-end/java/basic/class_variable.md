# 类变量和类方法
## 类变量和类方法
```java
class Child {
  private String name;

  // 该变量最大的特点就是会被 Child 类的所有的对象实例共享
  public static int count = 0;
  public Child(String name) {
    this.name = name;
  }
  public void join() {
    System.out.println(name + "加入了游戏...");
  }
}

public static void main(String[] args) {
  Child child1 = new Child("小明");
  child1.join();
  child1.count++;

  Child child2 = new Child("小红");
  child2.join();
  child2.count++;

  Child child3 = new Child("小亮");
  child3.join();
  child3.count++;

  // 类变量可以通过类名直接访问
  System.out.println("游戏玩家数量：" + Child.count);
```
static 变量是对象共享不管static变量在哪里
1. static 变量是同一个类所有对象共享
2. static 类变量，在类加载的时候就生成了。

### 类变量
类变量也叫静态变量/静态属性，是该类的所有对象共享的变量，任何一个该类的对象去访问它时，取到的都是相同的值，同样任何一个该类的对象去修改它时，修改的也是同一个变量

### 定义类变量
- 访问修改符 static 数据类型 变量名;
- static 访问修饰符 数据类型 变量名;
### 如何访问类变量
类名.类变量名 或者 对象名.类变量名(静态变量的访问修饰符的访问权限和范围和普通属性是一样的)。推荐使用：类名.类变量名

```java
class A {
  public static String name = "张三"
}

public class Test {
  public static void main(String[] args) {
    // 类变量是随着类的加载而生成的，所以可以直接通过类名访问。没有创建实例也可以访问
    System.out.println(A.name)
    A a = new A()
    System.out.println(a.name)

  }
}


```

### 类变量使用注意事项和细节讨论
1. 什么时候需要要用类变量
  当我们吉布森发让某个类的所有对象都共享一个变量时， 就可以考虑使用类变量(静态变量)：比如：定义学生类，统计所有学生共交多少钱。Student (name, fee)
2. 类变量与实例变量(普通属性)的区别
  - 类变量是该类的所有对象共享的，而实例变量是每个对象独享的。
3. 加上static称为类变量或静态变量，否则称为实例变量/普通变量/非静态变量
4. 变就是可以通过 `类名.类变量名` 访问的，也可以通过 `对象名.类变量名` 访问。但 java 设计者推荐我们使用 `类名.类变量名` 访问(前提时 满足访问修改符的访问权限和范围)
5. 实例变量不能通过 类名.实例变量名` 访问
6. 类变量是在类加载时就初始化了，也就是说，即使你没有创建对象，只要类加载了，就可以使用类变量了。
7. 类变量的生命周期是随类的加载开始，随着类消亡而销毁。

### 类方法基本介绍
类方法也叫静态方法，形式如下：
```java
/**
 * 访问修改符 static 数据返回类型 方法名(参数列表){} 推荐
 * static 访问修饰符 数据返回类型 方法名(参数列表){}
 * class B {
 *   public static void printStart() {
 *     System.out.println("start...");
 *   }
 * }
 */
```
类方法的调用：类名.类方法名(推荐使用) 或者 对象名.类方法名
```java

public Stu {
  private String name; // 普通成员
  // 定义一个静态变量，来累积学生的学费
  private static double fee = 0;

  public Stu(String name) {
    this.name = name;
  }

  // 1. 当方法使用 static 修饰时，该方法就是一个类方法，也称为静态方法
  // 2. 静态方法可以访问静态变量，但是不能直接访问实例变量
  public static void payFee(double fee) {
    // 累积学生的学费
    Stu.fee += fee;
  }

  public void showFee() {
    System.out.println("总学费有：" + Stu.fee)
  }
}

public static void main(String[] args) {
  Stu stu = new Stu("小明");
  tom.payFee(100);

  Stu mary = new Stu('mary')
  mary.payFee(200);

  // 输出当前得到的总学费
  Stu.showFee();
}
```
### 类方法经典的使用场景
当方法中不涉及不对劲任何和对象相关的成员，则可以将方法设计成静态方法，提高开发效率。
```java
class MyTools {
  public double calSum(double n1, double n2) {
    return n1 + n2;
  }
}
```
### 类方法注意事项
1. 类方法和普通方法都是随着类的加载而加载，将结构信息存储在方法区：
  - 类方法中无this的参数
  - 普通方法中隐含着this的参数
2. 类方法可以通过类名调用，也可以通过对象名调用。
3. 普通方法和对象有关，需要通过对象名调用，比如`对象名.方法名(参数)`, 不能通过类名调用。
4. 类方法中不能使用和对象有关的关键字，比如this和super关键字。普通方法(成员方法)可以。
5. 类方法(静态方法)中只能访问静态变量或静态方法。
6. 普通成员方法，既可以访问普通变量(方法)，也可以访问静态变量(方法)。

> 小结：静态方法，只能访问静态的成员，非静态的方法，可以访问静态成员和非静态成员(必须遵守访问权限)
```java
public class Test {
  static int ccount = 9;
  public void count() {
    System.out.println("count..." + (count++));
  }

  public static void main(String[] args) {
    new Test().count();
    new Test().count();
    System.out.println(Test.count);
  }
  }

}

// 2
class Person {
  private int id;
  private static int total = 0;
  public static int getTotalPerson() {
    // id++; // 错误
    retrun total;
  }
  public Person() {
    total++;
    id = total;
  }
}

public class TestPerson {
  public static void main(String[] args) {
    System.out.println('Number of total is ' + Person.getTotalPerson()); // 0
    Person p1 = new Person();
    System.out.println('Number of total is ' + Person.getTotalPerson()); // 1
  }
}
```
## 理解 main 方法语法 static 
`public static void main(String[] args) {}`
1. java虚拟机需要调用类的main() 方法，所以该方法的访问权限必须是 public 
2. java 虚拟机在执行 main() 方法时不必创建对象，所以该方法必须是 static 
3. 该方法接收String 类型的数组参数，该数组中保存执行 java 命令时传递给所运行的类的参数
4. `java 执行的程序 参数1 参数2 参数3`
```java
// 通过命令行储运这个代码 并且多传递三个参数
public class Hello {
  public static void main(String[] args) {
    for (int i = 0; i < args.length; i++) {
      System.out.println("第" + (i + 1) + "个参数 = " + args[i])
    }
  }
}
```
5. 在 main() 方法中，我们可以直接调用 main 方法所有类的静态方法或静态属性
6. 但是，不能直接访问该类中的非静态成员，必须创建该类的一个实例对象后，才能通过这个对象去访问类中的非静态成员。

## 代码块
代码块又称为`初始化块`，属于类中的成员[即是类的一部分], 类似于方法，将逻辑语句封装在方法体中，通过`{}`包围起来。但和方法不同，没有方法名，没有返回，没有参数，只有方法体，而且不用通过对象或类显式调用，而是加载类时，或创建对象时隐式调用。
### 基本语法
```java
/**
 * [修改符] {
 *   代码
 * }
 * 1. 修饰符 可选，要写的话，也只能写 static
 * 2. 代码块分为两类，使用 static 修改的叫静态代码块，没有static 修改的，叫普通代码块。
 * 3. 逻辑语句上可以为任何逻辑语句(输入、输出、方法调用、循环、判断等)
 * 4. ;号可以写上，也可以省略。
 */
```
### 代码块的好处
1. 相当于另外一种形式的构造器(对构造器的补充机制)，可以做初始化的操作
2. 如果多个构造器中都有重复的语句，可以抽取到初始化块中，提高代码的重用性
```java
class Movie {
  private String name;
  private double price;
  private String director;


  // 这样不管调用哪个构造器，创建对象，都会执行下面的代码块
  // 代码块调用的顺序优先于构造器
  {
    System.out.println('电影屏幕打开...')
    System.out.println('广告开始...')
    System.out.println('电影正式开始...')
  }
  // 下面的三个构造器都有相同的语句
  // 这样代码看起来比较冗余
  // 这时我们可以把相同的语句，放入到一个代码块中，即可

  public Movie (String name) {
    System.out.println('电影屏幕打开...')
    System.out.println('广告开始...')
    System.out.println('电影正式开始...')
    this.name = name;
  }

  public Movie (String name, double price) {
    System.out.println('电影屏幕打开...')
    System.out.println('广告开始...')
    System.out.println('电影正式开始...')
    this.name = name;
    this.price = price;
  }

  public Movie (String name, double price, String director) {
    System.out.println('电影屏幕打开...')
    System.out.println('广告开始...')
    System.out.println('电影正式开始...')
    this.name = name;
    this.price = price;
    this.director = director;
  }
}
```
### 代码块的注意事项
1. static 代码块也叫静态代码块，作用就是对类进行初始化，而且它随着类的加载面执行，并且只会执行一次。如果是普通代码块，每创建一个对象，就执行。
2. 类什么时候初始加载
  - 创建对象实例时(new)
  - 创建子类对象实例，父类也会被加载
  - 使用类的静态成员时(静态属性，静态方法)

```java

class AA {
  static {
    System.out.println('AA 的静态代码块...')
  }
}

class BB extends AA {
  static {
    System.out.println('BB 的静态代码块...')
  }
}

class Cat {
  public static int n1 = 999;

  static {
    System.out.println('Cat 的静态代码块...')
  }
}
public static void main(String[] args) {
  // 1. 创建对象实例
  AA aa = new AA();

  // 2. 创建子类对象实例, 而且，父类先被加载，子类再进行加载
  BB bb = new BB();

  // 3. 使用类的静态成员时
  System.out.println(Cat.n1);
}
```

3. 普通的代码块，在创建对象实例时，会被隐式的调用, 初创建一次，就会调用一次。如果只是使用类的静态成员时，普通代码块并不会执行。
4. static 代码块是类加载时，执行，只会执行一次；普通代码块是在创建对象时调用的，创建一次，调用一次
5. 创建一个对象时，在一个类调用顺序是:
  - 调用静态代码块和静态属性初始化(注意：静态代码块和静态属性初始化调用的优先级一閪，如果有多个静态代码块和多个静态变量初始化，则按他们定义的顺序调用)
  - 调用普通代码块和普通属性的初始化(注意：普通代码块和普通属性初始化调用的优先级一样，如果有多个普通代码块和多个普通属性初始化，则安排好定义顺序调用)
  - 调用构造器

```java
class A {
  // 静态属性的初始化
  private static int n1 = 999;
  private static int n2 = getN1();
  private int n3 = getN2(); // 普通属性的初始化

  // 静态代码块
  static {
    System.out.println('A 的静态代码块...')
  }

  public static int getN1() {
    System.out.println('getN1...')
    return 1000;
  }

  public int getN2() { // 普通方法
    System.out.println('getN2...')
    return 2000;
  }
}
```
6. 构造方法(构造器)的最前面其实隐含了`super()` 和调用普通代码块
```java
class AAA {
  {
    System.out.println('AAA 的普通代码块...')
  }
  public AAA() {
    super();
    // 调用普通代码块
    System.out.println('AAA 的构造器...')
  }
}

class BBB extends AAA {
  {
    System.out.println('BBB 的普通代码块...')
  }
  public BBB () {
    System.out.println('BBB 的构造器...')
  }
}

public class Test {
  public static void main(String[] args) {
    BBB bbb = new BBB();
  }
}
```
7. 创建一个子类时(继承关系)，他们的静态代码块，静态属性的初始代，普通代码块，普通属性初始化，构造方法的调用顺序如下：
  - 父类的静态代码块和静态属性(优先级一样，按定义顺序调用)
  - 子类的静态代码块和静态属性(优先级一样，按定义顺序调用)
  - 父类的普通代码块和普通属性(优先级一样，按定义顺序调用)
  - 父类的构造方法
  - 子类的普通代码块和普通属性(优先级一样，按定义顺序调用)
  - 子类的构造方法
8. 静态代码块只能直接调用静态成员(静态属性和静态方法)，普通代码块可以调用任意成员。

## 单例设计模式
所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法

### 饿汉式
1. 构造器私有化，防止直接new
2. 类的内部创建对象
3. 向外暴露一个静态的公共方法，返回对象实例
4. 代码实现
```java
// 饿汉式可能造成创建了对象，没有使用
class Singleton {
  public static void main(String[] args) {
    // 1. 创建对象实例
    Singleton s1 = Singleton.getInstance();
  }
}

// 有一个类，GrilFriend, 只能有一具女朋友
class GrilFriend {
  private String name;

  private static GrilFriend gf = new GrilFriend('小红红');

  // 1. 构造器私有化，防止直接new
  // 2. 在类的内部直接创建对象
  // 3. 提供一个公共的static方法，返回 gf 对象
  private GridFriend(String name) {
    this.name = name;
  }

  public static GriFriend getInstance() {
    return gf;
  }
}
```
### 懒汉式
```java
class Singleton {
  public static void main(String[] args) {
    // 1. 创建对象实例
    GrilFriend gl = GrilFriend.getInstance();
  }
}

class GrilFriend {
  private String name;

  private static int n1 = 100;
  private static GrilFriend gf = null;

  // 1. 构造器私有化，防止直接new
  // 2. 在类的内部直接创建对象
  // 3. 提供一个公共的static方法，返回 gf 对象
  private GridFriend(String name) {
    this.name = name;
  }

  public static GriFriend getInstance() {
    if (gf == null) {
      gf = new GriFriend('小红红');
    }
    return gf;
  }
}
```
### 饿汉式 VS 懒汉式
1. 二者最主要的区别在于创建对象的时机不同：饿汉式是在类加载就创建了对象实例，而懒汉式是在使用时才创建
2. 饿汉式不存在线程安全问题，懒汉式存在线程安全问题
3. 饿汉式存在浪费资源的可能。因为如果程序员一个对象实例都没有使用，那么饿汉式创建的对象就浪费了，懒汉式是使用时才创建，就不存在这个 问题。
4. 在 JavaSE 标准类中，`java.lang.Runtime` 就是经典的单例模式，使用的饿汉式

## final 关键字
final 可以修饰类、属性、方法和局部变量。
1. 当不希望类被继承时，可以用final修饰
```java
final class Person {
  
}
```
2. 当不希望父类的某个方法被子类覆盖/重写时(override)时，可以用final关键字修饰
```java
class C {
  // 如果要求 hi 方法不能被重写，则可以加上 final 关键字
  public final void hi() {}
}

class D extends C {
  // 子类不能重写父类的hi方法 报错
  public void hi() {}
}

```
3. 当不希望类的某个属性的值被修改，可以用`final`修饰
```java
class E {
  public final double Tab_RATe = 0.8;
}
```
4. 当不希望某个局部变量被修改，可以使用`final`修饰
```java
class F {
  public void cry() {
    final double NUM = 0.01;
    NUM = 0.9; // 报错
    System.out.println(NUM);
  }
}
```
### final 注意事项和细节
1. `final` 修改的属性又叫常量，一般用 `XX_XX` 来命名
2. `final` 修改的属性在定义时，必须赋初值，并且以后不能再修改，赋值可以在如下位置之一
  - 定义时：如`public final double TAX_RATE = 0.08;`
  - 在构造器中
  - 在代码块中
3. 如果`final`修饰的属性是静态的，则初始化的位置只能是(定义时、在静态代码块中)。不能在构造器中赋值
4. `final` 类不能继承，但是可以实例化对象。
5. 如果类不是 `final` 类，但是含有`final`方法，则该方法虽然不能重写，但是可以被继承。
6. 一般来说，如果一个类已经是 final 类了，就没有必要再将方法修饰成final方法。
7. final 不能修饰构造方法(即构造器)
8. final 和 static 往往搭配使用，效率更高，底层编译器做了优化处理
```java
class Demo {
  public static final int i = 16;
  static {
    System.out.println('静态代码块...')
  }
}
```
9. 包装类(Ingeter、Double、Float、Boolean、String) 都是 final 类

## 抽象类
当父类的某些方法，需要声明，但是又不确定如何实现时，可以将其声明为抽象方法，那么这个类就是抽象类
```java
abstract class Animal {
  private string name;
  private int age;

  public Animal(String name, int age) {
    this.name = name;
    this.age = age;
  }

  // 一般来说，抽象类会被继承，由其子类实现抽象方法
  public abstract void eat();
}
```
### 基本介绍
1. 用 abstract 关键字来修饰一个类时，这个类就叫抽象类
```java
/**
 * 访问修饰符 abstract class 类名 {
 *   // 类体
 * }

 */
```
2. 用abstract 关键字来修饰一个方法时，这个方法就是抽象方法
```java
  /**
   * 访问修饰符 abstract 返回值类型 方法名(参数列表);// 没有方法体
   *
   */
```
3. 抽象类的价值更多作用是在于设计，是设计者设计好后，让子类继承并实现抽象类
### 抽象类的注意事项
1. 抽象类不能被实例化
```java
abastract class A {}

new A(); // 报错
```
  
```
```
2. 抽象类不一定要包含 abstract 方法。也就是说，抽象类可以设有 abstract 方法
```java
// 还可以有实现的方法
abstract class A {
  public void hi() {}
}
```
3. 一旦类包含了 abstract 方法，则这个类必须声明为 abstract 类
```java
abstract class B {
  public abstract void hi() // 报错
}
```
4. abstract只能修饰类和方法，不能修饰属性和其它的。
```java
class C {
  public abstract int n1 = 1; // 报错
}
```
5. 抽象类可以有任意成员【因为抽象类还是类】，比如：非抽象方法、构造器、静态属性等待
```java
// 抽象类的本质还是类，所以可以有类的任意成员
abstract class D {
  public int n1 = 10;
  public static String name = 'D';
  public void hi() {
    System.out.println('hi...')
  }

  public abstract void hello();

  public static void ok() {
    System.out.println('ok...')
  }
}
```
6. 抽象方法不能有主体，即不能实现
```java
abstract void add();
abstract void add() {} // 报错
```
7. 如果一个类继承了抽象类，则它必须实现抽象类的所有抽象方法，除非它自己也声明为 abstract 类
```java
abstract class E {
  public abstract void hi()
}

class F extends E {
  public void hi() {
    System.out.println('hi...')
  }
}
```
8. 抽象方法不能使用 private、final 和 static 来修饰，因为这些关键字都是和重写相违背的。
```java
abstract class H {
  private abstract void hi() {} // 抽象方法不能私有 报错
  public final abstract void hi() {} // 抽象方法的修饰符不能是 final 报错
  public static abstract void hi() {} // 报错
}
```

```java
// 模板方法模式


```
## 接口
```java
public interface UsbInterface {
  // 规定接口的相关方法
  public void start();
  public void stop();
}

// Phone 类实现 UsbInterface 接口
// 即 Phone 类需要实现 UsbInterface 接口的所有方法
public class Phone implements UsbInterface {
  public void start() {
    System.out.println('手机开始工作...')
  }

  public void stop() {
    System.out.println('手机停止工作...') 
  }
}

public class Camera implements UsbInterface {
  public void start() {
    System.out.println('相机开始工作...')
  }

  public void stop() {
    System.out.println('相机停止工作...')
  }
}

public class Computer {
  // 编写一个方法
  public void work(UsbInterface usbInterface) {
    usbInterface.start();
    usbInterface.stop();
  }
}

public class Test {
  public static void main(String[] args) {
    Camera camera = new Camear();
    Phone phone = new Phone();
    
    Computer computer = new Computer();
    computer.work(camera);  // 把相机接入到计算机
    computer.work(phone); // 把手机接入到计算机
  }
}
```
### 基本介绍
1. 接口是 Java 语言中一种引用数据类型，是抽象方法和常量的集合
接口就是给出一些没有实现的方法，封装到一起，到某个类要使用的时候，在根据具体情况把这些方法写出来 。
```java
// interface 接口名 {
//   // 属性
//   // 方法
// }

// class 类名 implements 接口名 {
//   // 自己属性
//   // 自己方法
//   // 必须实现的接口的抽象方法
// }
/**
 * 1. 在JDK7.0前，接口里的所有方法都没有方法体
 * 2. JDK8.0后，接口类可以有静态方法，默认方法，也就是说接口中可以有方法的具体实现
 */

interface AInterface {
  // 写属性
  public int n1 = 10;

  // 写方法
  // 在接口中，抽象方法，可以省略 abstract 关键字
  public void hi();

  // 在 jdk8后，可以有默认实现方法, 需要使用 default 关键字修饰
  default public void ok() {
    System.out.println('ok...')
  }

  public static void cry() {
    System.out.println('cry...')
  }
}

// 1. 如果一个类 implements 实现接口，需要将该接口的所有的抽象方法都实现
class A implements AInterface {
  // 实现抽象方法
  public void hi() {
    System.out.println('hi...')
  }
}
```

### 接口的使用细节
1. 接口不能被实例化，但是可以声明接口的引用变量
2. 接口中所有的方法是 public 方法，接口中的抽象方法，可以不用 abstract 侵华战争民
3. 一个普通类实现接口，就必须将接口的所有方法都实现。
```java
interface IA {
  void say();
  void hi();
}

class Cat implements IA { // alt + enter
  public void say() {
    System.out.println('say...')
  }

  public void hi() {
    System.out.println('hi...')
  }
}
```
4. 抽象类实现接口，可以不用实现接口的方法。
5. 一个类同时可以实现多个接口
```java
interface IB {
  void hi()
}
interface IC {
  void say()
}

class Pig implements IB, IC {
  public void hi() {
    System.out.println('hi...')
  }

  public void say() {
    System.out.println('say...')
  }
}
```

6. 接口中的属性，只能是 final 的，而且是 public static final 修饰符。
```java
int a = 1; // 实际上是 public static final int a = 1; 必须初始化

interface IB {
  int n1 = 10; // 等价 public static final int a = 1
  void hi();
}

public static void main(String[] args) {
  System.out.println(IB.n1)
  IB.n1 = 20; // 报错 说明 n1 是 final 修饰的
}
```
7. 接口中属性的访问形式：接口名.属性名
8. 一个接口不能继承其它的类，但是可以继承多个接口

9. 接口的修饰符，只能是 public 和默认，这点和类的修饰符是一样的。
### 接口 VS 继承
当子类继承了父类，就自动的拥有父类的功能。如果子类需要扩展功能，可以通过实现接口的方式来扩展。可以理解实现接口是对 `java` 单继承机制的一种补充。
### 接口和继承解决的问题不同
- 继承：解决代码的复用性和可维护性
- 接口：设计，设计好各种规范(方法)，让其它类去实现这些方法。
### 接口比继承更加灵活
接口比继承更加灵活，继承是满足 `is - a` 的关系，而接口只需满足 `like - a` 的关系。
接口在一定程度上实现代码解耦。
### 接口多态特性
1. 多态参数
```java
...
public class Computer {
  // 编写一个方法
  public void work(UsbInterface usbInterface) {
    usbInterface.start();
    usbInterface.stop();
  }
}

...

// 接口多态的体现
```java
interface IF {}

class Monster implements IF {}

class Car implements IF {}

class AAA {}

class BBB extends AAA {}

public static void main(String[] args) {

  // 接口多态的体现
  // 接口类型的变量 if01 可以指向 实现 IF 接口的对象实现
  If if01 = new Monster();
  if01 = new Car();

  // 继承体现的多态
  // 父类类型的变量 a 可以指向 继承AAA的对象实现
  AAA a = new BBB();
  a = new CCC();
}
```
2. 多态数组
```java

interface Usb {
  void work();
}

class Phone_ implements Usb {
  public void call() {
    System.out.println('手机打电话...')
  }

  public void work() {
    System.out.println('手机工作...')
  }
}

class Camera_ implements Usb {
  public void work() {
    System.out.println('相机工作...')
  }
}

public static void main(String[] args) {
  // 多态数组 -> 接口类型数组
  Usb[] usbs = new Usb[2];

  usbs[0] = new Phone_();
  usbs[1] = new Camera_();
  for(int i = 0; i < usbs.length; i++) {
    usbs[i].work();
    if (usbs[i] instanceof Phone_) {
      // Phone_ phone = (Phone_) usbs[i];
      // phone.call();
      ((Phone_) usbs[i]).call();
    }
  }

}
```
3. 接口存在多态传递现象
```java
interface IH {}
interface IG extends IH{}

class Teacher implements IG {

}

public static void main(String[] args) {
  // 接口存在多态传递现象
  // 接口类型的变量 ig 可以指向 实现 IG 接口的类 Teacher 的对象实现
  IG ig = new Teacher();

  // IH ih = new Teacher(); // 报错，如果 Teacher 类没有实现 IH 接口，则报错

  // 如果 IG 继承了 IH 接口，而Teacher 类实现了 IG 接口，
  // 那么，实际上就相当于 Teacher 类也实现了 IH 接口
  // 这就是所谓的 接口多态传递现象。
  IH ih = new Teacher(); // 正确
}
```
## 内部类
一个类的内部又完整的嵌套了另一个类结构。被嵌套的类称为内部类(inner class), 嵌套其他类的类称为外部类(outer class)。内部类最大的特点就是可以直接访问私有属性，并且可以体现类与类之间的包含关系
```java
/**
 * class Outer { // 外部类
 *   class Inner { // 内部类
 * 
 *   }
 * }
 * 
 * class Other { // 外部其他类
 * 
 * }
 */


class Outer { // 外部类
  private int n1 = 100;

  public Outer(int n1) {
    this.n1 = n1;
  }

  public void m1() {
    System.out.println('m1...')
  }

  {
    System.out.println('Outer 类的代码块...')
  }

  class Inner { // 内部类

  }
}

public class Other { // 外部其他类

}
```

### 内部类的分类
1. 定义在外部类局部位置上(比如方法内)
  - 局部内部类(有类名)
  - 匿名内部类(没有类名)
2. 定义在外部类的成员位置上：
  - 成员内部类(没用 static 修饰)
  - 静态内部类(使用 staticc 修饰)

### 局部内部类
局部内部类是定义在外部类的局部位置，比如方法中，并且有类名。
1. 可以直接访问外部类的所有成员
2. 不能添加访问修饰符，因为它的地位就是一个局部变量。局部变量是不能使用修饰符的。但是可以使用 final 修饰，因为局部变量也可以使用 final
3. 作用域：仅仅在定义它的方法或代码块中。
4. 局部内部类---- 访问 ----> 外部类的成员 [访问方式: 直接访问]
5. 外部类 --- 访问 ---> 局部内部类的成员 [访问方式: 创建对象，再访问(必须在作用域内)]
6. 外部其他类 ---- 不能 ----> 访问 局部内部类(因为 局部内部类地位是一个局部变量)
7. 如果外部类和局部内部类的成员重名时，默认遵循就近原则，如果想访问外部类的成员，则可以使用(外部类名.this.成员) 去访问
```java


class Outer02 {
  private int n1 = 100;

  private void m2 () { // 私有方法
    System.out.println('m2...')
  }

  public void m1() { // 方法
    // 局部内部类是定义在外部类的局部位置，通常在方法
    class Inner02 { // 局部内部类
      private int n1 = 200;

      // 可以直接访问外部类的所有成员，包含私有的
      public void f1() {
        // 局部内部类可以直接访问外部类的成员
        System.out.println('n1 = ' + n1);

        m2()

        // 通过外部类名.this.成员 访问外部类的成员
        // Outer02.this 本质 就是外部类对象，即哪个对象调用了m1, Outer02.this 就是哪个对象
        System.out.println('n1 = ' + Outer02.this.n1);
      }
    }

    class Innero3 extends Inner02 {}

    // 外部类在方法中，可以创建Inner02对象，然后调用方法即可
    Inner02 inner02 = new Inner02();
    inner02.f1();
  }

  {
    class Inner04 {}
  }
}

public static void main(String[] args) {
  Outer02 outer02 = new Outer02();
  outer02.m1();
```
### 匿名内部类的
- 匿名内部类是定义在外部类的局部位置，比如方法中，并且没有类名
```java
/**
 * new 类 或 接口 (参数列表) {
 *  // 类体
 * }
 */

class Outer04 {
  private int n1 = 10;
  public void method() {
    // 一、基于接口的匿名内部类

    // 1. 需求：要使用IA接口，并创建对象
    // 2. 传统方法，是写一个类，实现IA接口，并创建对象
    // 3. 匿名内部类，简化开发
    IA tiger = new Tiger();
    tiger.cry();

    // 4. 匿名内部类，简化开发
    // 1. 创建接口的匿名内部类对象
    // 2. 直接调用方法
    // tiger2 的编译类型是 IA, 运行类型就是匿名内部类
    IA tiger2 = new IA() {
      @Override
      public void cry() {
        System.out.println('老虎叫...')
      }
    }
    System.out.println('tiger2的运行类型' + tiger2.getClass())
    tiger2.cry();
  }
}

interface IA {
  public void cry();
}

class Tiger immplements IA {
  public void cry() {
    System.out.println('老虎叫...')
  }
}


// 二、基于类的匿名内部类
class Father {
  public Father(String name) {}

  public void test() {
    System.out.println('test...')
  }

}

Father father = new Father('jack') {
  public void test() {
    System.out.println('匿名内部类重写了 test 方法')
  }
}

// 三、基于抽象类的匿名内部类
abstract class Animal {
  public abstract void eat();
}
Animal animal = new Animal() {
  void eat() {
    System.out.println('小狗吃了骨头...')
  }
}
```
- 匿名内部类的语法比较奇特，因为匿名内部类既是一个类的定义，同时它本身也是一个对象，因此从语法上看，它既有定义类的特征，也有创建对象的特征，因此可以调用匿名内部类方法。
```java
class Person {
  public void hi() {
    System.out.println('hi...')
  }

  public void ok(String str) {
    System.out.println('ok...' + str)
  }
}

class Outer05 {
  private int n1 = 10;

  public void f1() {
    Person p = new Person() {
      public void hi() {
        System.out.println('匿名内部类hi...')
      }
    }

    p.hi(); // 动态绑定，运行类型是 Outer05$1

    // 也可以直接调用, 匿名内部类本身也是返回对象
    new Person() {
      public void hi() {
        System.out.println('匿名内部类hi ha ha ha...')
      }
    }.hi();

    new Person() {
      public void hi() {
        System.out.println('匿名内部类hi ha ha ha...')
      }

      public void ok(String str) {
        super.ok(str)
      }
    }.hi();
  }
}
```
- 可以直接访问外部类的所有成员，包含私有的
- 不能添加访问修饰符，因为它的地位就是一个局部变量。
- 作用域：仅仅在定义它的方法或代码块中
- 匿名内部类 -- 访问 ---> 外部类成员 [访问方式：直接访问]
- 外部其他类 --- 不能访问 ---> 匿名内部类(因为 匿名内部类地位是一个局部变量)
- 如果外部类和内部类的成员重名时，内部类访问的话，默认遵循就近原则，如果想访问外部类的成员，则可以使用(外部类名.this.成员) 去访问
### 匿名内部类应用场景
- 当做实参传递给方法
```java
interface IL{
  void show();
}

class Picture implements IL {
  public void show() {
    System.out.println('show...')
  }
}

public class InnerClassExercise01 {
  public static void main(String[] args) {
    // 当做实参传递，更加高效
    f1(new IL() {
      public void show() {
        System.out.println('匿名内部类...')
      }
    })

    // 传统方法
    f1(new Picture())

  }

  public static void f1(IL il) {
    il.show();
  }
}
```

```java
/**
 * 有一个铃声接口Bell, 里面有个ring方法。
 * 有一个手机类cellphone,具有闹钟功能 alarmclick, 参数是Bell类型
 * 测试手机类的闹钟功能，通过匿名内部类(对象)作为参数，打印：1111
 * 再传入另一个匿名内部类(对象)，打印：xxxx
 */

interface Bell {
  void ring()
}

class CellPhone {
  public void alarmClock(Bell bell) {

  }
}


CellPhone cellPhone = new CellPhone();
cellPhone.alarmClock(new Bell() {
  public void ring() {
    System.out.println('11111111111')
  }
})

CellPhone cellPhone = new CellPhone();
cellPhone.alarmClock(new Bell() {
  public void ring() {
    System.out.println('22222')
  }
})
```
## 成员内部类
成员内部类是定义在外部类的成员位置，并且是没有static 修饰的。
1. 可以直接访问外部类的所有成员，包含私有的
```java
class Outer01 { // 外部类
  private int n1 = 10;
  public String name = '张三';
  class Inner01 { // 成员内部类
    public vovid say() {
      System.out.println('Outer01 的 n1 = ' + n1 + "Out01的 name = " + name);
    }
  }
}
```
2. 可以添加任意访问修饰符(public、protected、默认、private)。因为它的地位就是一个成员。
3. 作用域。和外部类的其他成员一样，为整个类体。在外部类的成员方法中创建成员内部类对象是，再调用方法
4. 成员内部类 --- 访问 ---> 外部类的成员 [访问方式: 直接访问]
5. 外部类 --- 访问 ---> 内部类[访问方式：创建对象，再访问]
6. 外部其他类 --- 访问 ----> 成员内部类
```java
class Outer01 { // 外部类
  private int n1 = 10;
  public String name = '张三';
  class Inner01 { // 成员内部类
    public vovid say() {
      System.out.println('Outer01 的 n1 = ' + n1 + "Out01的 name = " + name);
    }
  }

  public Innero1 getInner01Instancce() {
    return new Innero1();
  }
}

public class MemberInnerClass01 {
  public static void main(String[] args) {
    Outer01 outer01 = new Outer01();
    
    // 1. 外部类在成员方法中，可以创建Inner01对象，然后调用方法即可
    Outer08.Inner01 inner01 = outer01.new Inner01();
    inner01.say();

    // 2. 在外部类中编写一个方法,可以返回 Inner01 对象
    outer01.getInner01Instancce().say();

    // 3. 
  }
}
```
7. 如果内部类和内部类的成员重名时，内部类访问的话，默认遵循就近原则，如果想访问外部类的成员，则可以使用(外部类名.this.成员)去访问

## 静态内部类
静态内部类是定义在外部类的成员位置，并且有statid 修饰
1. 可以直接访问外部类的所有静态成员，包含私有的，但不能直接访问非静态成员。
2. 可以添加任意访问修饰符(public、protected、默认、private)，因为它的地位就是一个趸。
3. 作用域：同其他的成员，为整个类体
```java
class Outer02 {
  private int n1 = 10;
  private static String name = '张三';
  static class Inner02 {
    public void say() {
      System.out.println("Out01的 name = " + name);

      // 不能直接访问外部类的非静态成员
      // System.out.println('Outer01 的 n1 = ' + n1);

      // 可以通过 外部类名.this.成员 访问外部类的成员
    }
  }
  public void show() {
    // 外部使用内部类
    new Inner02().say();
  }
}
```
4. 静态内部类---访问---> 外部类(比如：静态属性)[访问方式：直接访问所有静态成员]
5. 外部类 --- 访问 ----> 静态内部类 访问方式：创建对象，再访问
6. 外部其他类 --- 访问 ----> 静态内部类
```java
class Outer02 {
  private int n1 = 10;
  private static String name = '张三';
  static class Inner02 {
    public void say() {
      System.out.println("Out01的 name = " + name);

      // 不能直接访问外部类的非静态成员
      // System.out.println('Outer01 的 n1 = ' + n1);

      // 可以通过 外部类名.this.成员 访问外部类的成员
    }
  }
  public void show() {
    // 外部使用内部类
    new Inner02().say();
  }

  public Inner02 getInner02() {
    return new Inner02()
  }
}

public static void main(String[] args) {
  // 方式1
  Outer02.Inner02 inner02 = new Outer02.Inner02();
  inner02.say();

  // 方式2 ：编写一个方法，可以返回静态内部类的实例
  Outer02 outer02 = new Outer02();
  outer02.getInner02().say();
}
```
7. 如果外部类和静态内部类的成员重名时，静态内部类访问时，默认遵循就近原则，如果想访问外部类的成员，则可以使用(外部类名.成员)去访问
```java
class Outer02 {
  private int n1 = 10;
  private static String name = '张三';
  static class Inner02 {
    private static String name = '王五'
    public void say() {
      System.out.println(name)
    }

    public static void hello() {
      System.out.println(name + '访问外部类的 name' + Outer02.name)
    }
  }

  public void show() {
    // 外部类使用内部类
    new Inner02().say();
  }
}
```