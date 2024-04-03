## 枚举
```java
public class Enmeration02 {
  public static void main(String[] args) {
    System.out.println(Season.SPRING);
    System.out.println(Season.SUMMER);
  }
}

// 演示自定义枚举实现
class Season {
  private String name;
  private String desc;
  
  public static final Season SPRING = new Season("春天", "春暖花开");
  public static final Season SUMMER = new Season("夏天", "夏日炎炎");
  public static final Season AUTUMN = new Season("秋天", "秋高气爽");
  public static final Season WINTER = new Season("冬天", "冰天雪地");
  // 1. 将构造器私有化，防止外部调用
  // 2. 去掉 setXXX方法，防止属性被修改
  // 3. 在Season 内部，直接创建固定的对象
  // 4. 优化，加以加入 final 修改
  private Season(String name, String desc) {
    this.name = name;
    this.desc = desc;
  }

  public String getName() {
    return name;
  }

  public String getDesc() {
    return desc;
  }

  public String toString() {
    return "Season{" +
        "name='" + name + '\'' +
        ", desc='" + desc + '\'' +
        '}';
  }
}
/**
 * 1. 构造器私有化
 * 2. 本类内部创建一组对象
 * 3. 对外暴露对象(通过为对象添加 public final static 修饰符)
 * 4. 可以提供get方法，但是不要提供 set
 */
```

```java
// 使用关键字来实现枚举类

public class Enmeration02 {
  public static void main(String[] args) {
    System.out.println(Season.SPRING);
    System.out.println(Season.WINTER);
  }
}

// 演示自定义枚举实现
enum Season {
  
  // public static final Season SPRING = new Season("春天", "春暖花开");
  // public static final Season SUMMER = new Season("夏天", "夏日炎炎");
  // public static final Season AUTUMN = new Season("秋天", "秋高气爽");
  // public static final Season WINTER = new Season("冬天", "冰天雪地");

  // 如果使用 enum 来实现枚举，那么编译器会自动添加以下内容
  // 1. 使用关键字 enum 替代 class
  // 2. public static final Season SPRING = new Season("春天", "春暖花开"); 直接使用
  //    SPRING('春天', '温暖'); 解读 常量名(实参列表)
  // 3. 如果有多个常量(对象)， 使用 ，号间隔即可
  // 4. 如果使用 enum 来实现枚举，要求将定义常量对象，写在前面
  SPRING('春天', '温暖'), WINTER("冬天", "冰天雪地");
  
  private String name;
  private String desc;


  // 1. 将构造器私有化，防止外部调用
  // 2. 去掉 setXXX方法，防止属性被修改
  // 3. 在Season 内部，直接创建固定的对象
  // 4. 优化，加以加入 final 修改
  private Season(String name, String desc) {
    this.name = name;
    this.desc = desc;
  }

  public String getName() {
    return name;
  }

  public String getDesc() {
    return desc;
  }
  
  public String toString() {
    return "Season{" +
        "name='" + name + '\'' +
        ", desc='" + desc + '\'' +
        '}';
  }
}
```
### enum 关键字实现枚举注意事项
1. 当我们使用enum 关键字开发一个枚举类时，默认会继承 Enum类
2. 传统的 public static final Season2 SPRING = new Season2("春天", "温暖"); 简化成 SPRING(), 这里必须知道，它调用的是哪个构造器
3. 如果使用无参构造器 创建 枚举对象，则实参列表和小括号都可以省略
4. 当有多个枚举对象时，使用`，`间隔，最后有一个分号结尾
5. 枚举对象必须放在枚举类的行首
### enum 成员方法
1. valueof：传递枚举类型的 Class 对象和枚举常量名称给静态方法 valueOf, 会得到与参数匹配的枚举常量
2. toString：返回当前枚举常量的名称, 你可以通过重写这个方法使得到的结果更易读
3. eaquals：在枚举类型中可以直接使用 == 来比较两个枚举常量是否相等。Enum提供的这个equals() 方法，也是直接使用 == 实现的。它的存在是为了在 Set、List 和 Map 中使用。注意，equals() 是不可变的。
4. hashCode:Enum实现了hashCode() 来和 equals() 保持一致。它也是不可变的。
5. getDeclanhgClass：得到枚举常量所属枚举类型的Class对象。可以用它来判断两个枚举常量是否属于同一个枚举类型。
6. name：得到当前枚举常量的名称。建议优先使用toString()。
7. ordinal：得到当前枚举常量的次序
8. compareTo：枚举类型实现了Comparable接口，这样可以比较两个枚举常量的大小(按声明的顺序排列)
9. clone:枚举类型不能被Clone。为了防止子类实现克隆方法，Enum 实现了一个仅抛出 CloneNotSupportedException 异常的不变 Clone().


```java
// 使用关键字来实现枚举类

public class Enmeration02 {
  public static void main(String[] args) {
    // System.out.println(Season.SPRING);
    // System.out.println(Season.WINTER);
    Season2 spring = Season2.SPRING;
    // 输出枚举对象的名称
    System.out.println(spring.name()) // 输出 春天
    // 输出的是该枚举对象的次序/编号
    System.out.println(spring.ordinal()); // 输出 0

    // 返回 Season2 含有定义的所有枚举对象
    System.our.println(sprint.valueOf())
  }
}

// 演示自定义枚举实现
enum Season {

  SPRING('春天', '温暖'), WINTER("冬天", "冰天雪地");
  
  private String name;
  private String desc;


  // 1. 将构造器私有化，防止外部调用
  // 2. 去掉 setXXX方法，防止属性被修改
  // 3. 在Season 内部，直接创建固定的对象
  // 4. 优化，加以加入 final 修改
  private Season(String name, String desc) {
    this.name = name;
    this.desc = desc;
  }

  public String getName() {
    return name;
  }

  public String getDesc() {
    return desc;
  }
  
  public String toString() {
    return "Season{" +
        "name='" + name + '\'' +
        ", desc='" + desc + '\'' +
        '}';
  }
}
```
### enum 实现接口
1. 使用 enum 关键字后，就不能再继承其它类了，因为enum会隐式继承 Enum,而Java是单继承机制。
2. 枚举类和普通类一样，可以实现接口，如下形式。
```java
// enum 类名 implements 接口1, 接口2 {}
```

## 注解
1. 注解(Annotation)也被称为元数据(Metadata), 用于修饰解释包、类、方法、属性、构造器、局部变量等数据信息。
2. 和注释一样，注解不影响程序逻辑，但注解可以被编译或运行，相当于嵌入在代码中的补充信息。
3. 在 JavaSE 中，注解的使用目的比较简单，例如标记过时的功能，忽略警告等。在JavaEE中注解占据了更重要的角色，例如用来配置应用程序 的任何切面，代替JavaEE旧版中使用的繁冗的XML配置等。
### 基本的 Annotation 介绍
使用 Annotation 时要其前面增加`@`符号，并把该 Annotation 当成一个修饰符使用。用于修饰它支持的程序元素：
#### @Override: 限定某个方法，是重写父类方法, 该注解只能用于方法
```java
class Father {
  public void fly() {
    System.out.println("Father fly");
  }
}

class Son extends Father {
  // 1. @overrider 注解放在fly方法上，表示fly方法是重写父类的方法
  // 2. 这是如果没有写 @Override 还是重写
  // 3. 如果你写了@Override 注解，编译器就会去检查该方法是否真的重写了父类的方法
  //    如果的确重写了，则编译通过，如果没有重写，则编译失败，提示错误信息
  @Override
  public void fly() {
    System.out.println("Son fly");
  }
}
```
  - @override 表示指定重写父类的方法(从编译层面验证)，如果父灯没有 fly 方法，则会报错
  - 如果不写 @Override 注解，而父类仍有 public void fly() {}, 仍然构成重写
  - @Override 只能修饰方法，不能修饰其它类，包，属性等等
  - 查看@Override 注解源码为 @Target(ElementType.METHOD),说明只能修饰方法
  - @Target 是修饰注解的注解，称为元注解
#### @Deprecated: 用于表示某个程序元素(类, 方法等)已过时。通常是因为所修饰的结构危险或存在更好的选择。
1. 可以修饰方法、类、字段、包、参数等待
2. @Target(value = {CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE})
3. @Deprecated 的作用可以做到新旧版本的兼容和过渡
```java
// 1. @Deprecated 修饰某个元素，表示该元素过时
// 2. 即不再推荐使用，但是仍然可以使用
@Deprecated
class A {
  public int n1 = 10;

  @Deprecated
  public void hi() {

  }
}
```
#### @SuppressWarnings: 抑制编译器警告信息。
1. all, 抑制所有警告
2. boxing, 抑制与封装/拆箱相关的警告
3. cast, 抑制与强制转换相关的警告
4. dep-ann, 抑制与淘汰注释相关的警告
5. deprecation, 抑制与淘汰的相关的警告
6. fallthrough, 抑制与switch陈述式中遗漏break相关的警告
7. finally, 抑制与未传回finally区块相关的警告
8. hiding, 抑制与隐藏变量的区域变量相关的警告
9. incomplete-switch, 抑制与switch陈述式(enum case)中遗漏项目相关的获取 
10. javadoc, 抑制与javadoc相关的警告
11. nls, 抑制与非nls字串文字相关的警告
12. null, 抑制与空分析相关的警告
13. rawtypes, 抑制与使用raw类型的警告

```java
public  class AnnotationDemo01 {
  // 1. 当我们不希望看到这些警告的时候，可以使用 @SuppressWarnings 注解，来抑制警告信息

  @SuppressWarnings("all")
  @SuppressWarnings({"rawtypes", "unchecked"})
  public static void main(String[] args) {
    List list = new ArrayList();
    list.add("");
    list.add("");
    list.add("");
    int i;
    System.out.println(list.get(i));

  }
}
```
### 四种元注解(本身作用不大)
#### Retention: 指定注解的作用范围，SOURCE, CLASS, RUNTIME
只能用于修饰一个Annotation定义，用于指定该Annotation可以保留多长时间，@Rentention包含一个RetentionPolicy类型的成员变量，使用@Rentention时必须为该value成员变量指定值
1. RetentionPolicy.SOURCE: 编译器使用后，直接丢弃这种策略的注释
2. RetentionPolicy.CLASS: 编译器将把注释记录在class文件中。当运行Java程序时，JVM不会保留注解。这是默认值
3. RetentionPolicy.RUNTIME: 编译器将把注释记录在class文件中。当运行Java程序时，JVM会保留注释。程序可以通过反射获取该注释

#### Target: 指定注解可以在哪些地方使得
用于修饰 Annotation 定义，用于指定被修饰的 Annotation 能用于修饰哪些程序元素。@Target也包含一个名为value的成员变量。
#### Documented: 指定该注解是否会在javadoc体现
用于指定被该元Annotation修饰的Annotation类将被 JavaDoc 工具提取成文档，即在生成文档时，可以看到该注释。
说明：定义为Documented 的注解必须设置Retention值为RUNTIME。
#### Inherited: 子类会继承父类注解
被它修饰的Annotation将具有继承性。如果某个类使用了被@Inherited修饰的Annotation, 则其子类将自动具有该注解。

## 异常
```java
Java语言中，将程序执行中发生的不正常情况称为"异常"。(开发过程中的语法错误和逻辑错误不是异常)
异常可以分为两大类：
1. Error(错误)：Java虚拟机无法解决的严重问题。如：系统崩溃、虚拟机错误、动态链接失败等。比如：StackOverflowError[栈溢出]和OOM(out of memory), Error 是严重错误，程序会崩溃。
2. Exeption: 其它因编程错误或偶然的外在因素导致的一般性问题，可以使用针对性的代码进行处理。例如空指针访问，试图读取不存在的文件，网络连接中断等等，Exeption有两类
  - 运行时异常，编译器不要求强制处置的异常。一般是指编程时的逻辑错误，是程序员应该避免其出现的异常。java.lang.RuntimeException类及它的子类都是运行时异常。对于运行时异常，可以不作处理，因为这类异常很普遍，若全处理可能会对程序的可读性和运行效率产生影响。
  - 编译时异常，编译器要求必须处置的异常。Exception类及其子类是编译时异常。


```java
public static void main(String[] args) {
  int num1 = 10;
  int num2 = 0;

  try {
    int res = num1 / num2;
  } catch (Exception e) {
    e.printStackTrace();
  }

  System.out.println(res);
}
```

### 常见运行时异常
#### NullPointerException: 空指针异常
1. 空指针异常是运行时异常，当应用程序试图在需要对象的地方使用null时，抛出该异常。
```java
public class NullPointerException_ {
  public static void main(Stringp[] args) {
    String name = null
    System.out.println(name.length);
  }
}
```
2. ArithmeticException: 数学运算异常
当出现异常的运算条件时，抛出此异常。例如，一个整数"除以零"时，抛出此类的一个实例。
```java
  
```
3. ArrayIndexOutOfBoundsException: 数组索引越界异常
用非法索引访问数组时抛出的异常。如果索引为负或大于等于数组大小，则该索引为非法索引。
```java
public static void main(Stringp[] args) {
  int[] arr = {1, 2, 3, 4, 5};
  System.out.println(arr[5]);
}
```
4. ClassCastException: 类型转换异常
当试图将对象强制转换为不是字例的子类时，抛出该异常
```java
class A {}
class B extends A {}
class C extends A {}

public static void main(Stringp[] args) {
  A b = new B(); // 向上转型
  B b2 = (B) b; // 向下转型
  C c = (C) b; // 编译不通过，因为 B 和 C 没有任何关系，B不是C的父类
}
```
5. NumberFormatException: 数字格式异常
当应用程序 试图将字符串转换成一种数值类型，但该字符串不能转换为适当格式时，抛出该异常=> 使用异常我们可以确保输入的是满足条件数字。
```java
public static void main(Stringp[] args) {
  String name = "123";
  int num = Integer.parseInt(name);
  System.out.println(num); // 1234

  name = '张三'
  num = Integer.parseInt(name); // 编译不通过，因为字符串不能转换成数字

}
```
### 常见编译时异常
#### SQLException: 数据库异常, 查询表可能发生异常
#### IOException: 操作文件时，发生的异常
#### FileNotFoundException: 当操作一个不存在的文件时，发生异常
#### ClassNotFoundException: 加载类，找不到类异常时，发生异常
#### EOFException: 操作文件，到文件末尾，发生异常
#### IIIegalArguementException: 参数异常
### 异常处理机制
异常处理就是当异常发生时，对异常处理的方式。
#### try-catch-finally
程序员在代码中捕获发生的异常，自行处理
```java
try {
  // 代码/可能有异常
} catch (Exception e) {
  /**
   * 捕获到异常
   * 1. 当异常发生时
   * 2. 系统将异常封装成Exception 对象 e, 传递给 catch
   * 3. 得到异常对象后，程序员，自己处理
   * 4. 如果没有发生异常catch代码块不执行
   */
} finally {
  // 无论是否发生异常，都会执行finally
  // 所以，通常将释放资源的代码，放在 finally 中
}
```
#### throws
将发生的异常抛出，交给调用者(方法)来处理，最顶级的处理者就是JVM
1. 如果一个方法(中的语句执行时)可能生成某种异常，但是并不能确定如何处理这种异常，则此方法应显示地声明抛出异常，表明该方法将不能这些异常进行处理，而由该方法的调用者负责处理。
2. 在方法声明中用throws语句可以声明抛出异常的列表，throws后面的异常类型可以是方法中产生的异常类型，也可以是它的父类。
```java
public static void main(Stringp[] args) {
  // 1. 调用方法，发生异常
  // 2. 程序会终止，异常信息会输出到控制台
  // 3. 异常信息会输出到控制台，程序会终止
}

public void f1() throws FileNotFoundException, NullPointerException, ArithmeticException {
  // 创建了一个文件流对象
  // 这里的异常是一个 FileNotFoundException 编译异常
  // 1. 使用前面讲过的 try-catch-finally 处理异常
  // 2. 使用 throws 处理异常
  // 3. 使用 throws, 抛出异常，让调用 f1 方法的调用者处理异常
  // 4. throws 后面的异常类型可以是方法中产生的异常类型，也可以是它的父类
  // 5. throws 关键字后也可以是 异常列表，即可以抛出多个异常
  FileInputStream fis = new FileInputStream("a.txt");
}
```
#### throw注意事项和使用细节
1. 对于编译异常，程序中必须处理，比如try-catch 或者 throws
2. 对于运行异常，程序中如果没有处理，默认就是 throws 的方式处理
3. 子类重写父类的方法时，对抛出异常的规定：子类重写的方法，所抛出的异常类型要么和父类抛出的异常致，要么为父类抛出的异常的类型的子类型
4. 在 throws 过程中，如果有方法 try-catch,就相当于处理异常，就可以不必 throws
```java
public void test() {
  // 2
  int n1 = 9 / 0; // 发生运行异常，如果没有 cathch, 默认就是 throws 
}

class Father {
  public void method() throws Exception {}
}

class Son extends Father {
  // 3
  public void method() throws NullPointerException {}
}

public class ExceptionTest {
  public static void f3() throws FileNotFoundException {
    FileInpputStream fis = new FileInputStream("a.txt");
  }

  public static void f1() throws FileNotFoundException {
    // 1. 因为 f3() 方法抛出的是一个编译异常
    // 2. 即这里，就要f1() 必须 处理这个编译异常
    // 3. 在 f1()，要么try-catch-finally, 或者继续 throws 这个编译异常
    f3(); // 抛出异常
  }

  public static void f5() throws ArithmeticException {}

  public static void f4() {
    // 在 f4() 中调用方法 f5() 是 ok,
    // 原因是 f5() 抛出的是运行异常
    // 而 java 中，并不要求程序员显示处理，因为有默认处理机制
    f5();
  }
}

```

#### 自定义异常
1. 定义类：自定义异常类名() 继承 Exception 或 RuntimeException
2. 如果继承Exception, 属于编译异常
3. 如果继承RuntimeException, 属于运行异常(一般来说，继承RuntimeException)
```java
public class CustomException {
  public static void main(Stringp[] args) {
    int age = 80;
    if ((age >= 18 && age <= 120)) {
      // 这更可以通过构造器，设置信息
      throw new AgeException("年龄不合法");
    }

    System.out.println("年龄合法");
  }
}

// 1. 一般情况下，自定义异常继承RuntimeException
// 2. 即把自定义异常做成运行时异常，可以使用默认的处理机制
class AgeException extends RuntimeException {
  public AgeException(String message) {
    super(message);
  }
}
```
#### throw 和 throws 的区别
|      |        意义            |位置     |后面跟的东西|
|------|------------------------|--------|-----------|
|throws|异常处理的一种方式       |方法声明处|异常类型|
|throw |手动生成异常对象的关键字 |方法体中  |异常对象|
