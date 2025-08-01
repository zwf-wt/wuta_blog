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
## 包装类
1. 针对八种基本数据类型定义相应的引用类型——包装类（封装类）
2. 有了类的特点，就可以调用类中的方法，更方便操作基本数据类型
3. 包装类都位于java.lang包下
4. 包装类都是 final 的，因此不能被继承
5. 包装类都实现了 Serializable 接口
6. 包装类都是不可变的，即一旦初始化，就不能改变其值

| 基本数据类型 | 包装类|
|-------------|-------|
| byte        | Byte  |
| short       | Short |
| int         | Integer |
| long        | Long |
| float       | Float |
| double      | Double |
| char        | Character |
| boolean     | Boolean |

```java
public class WrapperType {
  public static void main(String[] args) {
    // boolean -> Boolean
    Boolean a = true;

    // char -> Character
    Character c = 'c';

    // byte -> Byte
    Byte b = 1;

    // short -> Short
    Short s = 1;

    // int -> Integer
    Integer i = 1;

    // long -> Long
    Long l = 1L;

    // float -> Float
    Float f = 1.0f;

    // double -> Double
    Double d = 1.0;

    // short -> Short
    Short sh = 1;

    // 自动装箱和自动拆箱
    // Integer i = 1; // 自动装箱
    // int j = i; // 自动拆箱
    // long -> Long

    // float -> Float
    // double -> Double

    // short -> Short
  }
}
```
### 包装类和基本数据的转换
1. jdk5.0之前，手动装箱和拆箱
2. jdk5.0之后，自动装箱和拆箱
3. 自动装箱底层调用的是`valueOf` 方法，比如`Interger.valueOf(1)`
```java

public class Integer01 {
  public static void main(String[] args) {

    // jdk5.0之前，手动装箱和拆箱
    // 手动装箱 int -> Integer
    int n1 = 100;
    Integer integer = new Integer(n1);
    Integer integer1 = Integer.valueOf(n1);

    // 手动拆箱 Interger -> int
    int i = integer.intValueOf();



    // jdk5.0之后，自动拆箱和装箱
    // 自动装箱 int -> Integer
    int n2 = 200;
    Integer integer2 = n2; // 底层使用的是 Integer.valueOf(n2);

    // 自动拆箱 Integer -> int
    int n3 = integer2; // 底层使用的是 intValue();





    // 练习题
    // 1. 下面代码是否正确，为什么？
    Double d = 100d; 
    Fload f = 1.5f;

    // 如下两个题目输出结果相同吗？各是什么？
    Object obj1 = true ? new Integer(1) : new Double(2.0); // 1.0

    Object obj2;
    if (true) {
      obj2 = new Integer(1);
    } else {
      obj2 = new Double(2.0);
    }
    System.out.println(obj1); // 1.0
    System.out.println(obj2); // 1




    // 包装类型和String类型的相互转换
    // 包装类型(Integer) -> String
    Interger i = 100; // 自动装箱
    // 方式1
    String str1 = i + "";
    // 方式2
    String str2 = i.toString();
    // 方式3
    String str3 = String.valueOf(i);

    // String -> 包装类型(Integer)
    String str4 = "12345";
    // 方式1
    Integer i2 = Integer.parseInt(str4);
    // 方式2
    Integer i3 = new Integer(str4);

  }
}
```
### Integer类和Character类的常用方法
```java
Integer.MIN_VALUE // Integer的最小值
Integer.MAX_VALUE // Integer的最大值

Character.isDigit('a'); // 判断是否为数字
Character.isLetter('a'); // 判断是否为字母
Character.isUpperCase('a'); // 判断是否为大写字母
Character.isLowerCase('a'); // 判断是否为小写字母

Character.isWhitespace('a'); // 判断是否为空格
Character.toUpperCase('a'); // 转换为大写字母
Character.toLowerCase('a'); // 转换为小写字母
```
### Interger类面试题
```java
/**
 * 
 * public static Integer valueOf(int i) {
 *   if (i >= IntegerCache.low && i <= IntegerCache.high) {
 *     return IntegerCache.cache[i + (-IntegerCache.low)];
 *   }
 *   return new Integer(i);
 * }
 * 
 */
public void method1() {
  Integer i = new Integer(1);
  Integer j = new Integer(1);
  System.out.println(i == j); // false, 比较的是内存地址
  
  // 这里主要看范围 -128 ~ 127，如果在这个范围内，会直接从缓存中获取，所以是相等的
  Integer m = 1; // 底层，Integer.valueOf(1)
  Integer n = 1; // 底层，Integer.valueOf(1)
  System.out.println(m == n); // true

  // 这里主要看范围 -128 ~ 127, 超过这个范围，会重新创建对象，所以是不相等的
  Integer x = 128;
  Integer y = 128;
  System.out.println(x == y); // false

  Integer i1 = new Integer(127);
  Integer i2 = new Integer(127);
  System.out.println(i1 == i2); // false

  Integer i3 = new Integer(128);
  Integer i4 = new Integer(128);
  System.out.println(i3 == i4); // false

  Integer i5 = 127;
  Integer i6 = 127;
  System.out.println(i5 == i6); // true

  Integer i7 = 128;
  Integer i8 = 128;
  System.out.println(i7 == i8); // false

  Integer i9 = 127
  Integer i10 = new Interger(127);
  System.out.println(i9 == i10); // false


  Integer i11 = 127;
  int i12 = 127;
  System.out.println(i11 == i12); // true, 只要有基本数据类型，判断的是值是否相同

  Integer i13 = 128;
  int i14 = 128;
  System.out.println(i13 == i14); // true, 只要有基本数据类型，判断的是值是否相同
}
```

### String类
1. String 对象用于保存字符串，也就是一组字符序列
2. 字符串常量对象是用双引号括起的字符序列。例如："hello"、"java" 等
3. 字符串的字符使用 Unicode 字符集表示，每个字符(不区分字母还是汉字)占用 2 个字节
4. String类较常用构造方法，构造器的重载
```java
String s1 = new String();
String s2 = new String(String original);
String s3 = new String(char[] a);
String s4 = new String(char[] a, int startIndex, int numChars); // 指定范围
String s5 = new String(byte[] b);

String name = "jack";
name = "tom";
```
5. String 类实现了接口 `Serializable【String】`，可以串行代：可以在网络传输。
   String 类实现了接口 `Comparable【String】`，可以比较大小
6. String 是 final 类，不能被其他的类继承
7. String 有属性 `private final char value[];` 用于存放字符串内容
8. 一定要注意：`value` 是一个`final`类型，不可能修改
#### 创建String对象的两种方式
1. 直接赋值 `String s = "hello";`
> 先从常量池查看是否有`"hello"`数据空间，如果有，直接指向;如果没有则重新创建，然后指向。s最终指向的是常量池的空间地址
2. 构造器赋值 `String s = new String("hello");`
先在堆中创建空间，里面维护了`value`属性，指向常量池的`"hello"`空间, 如果常量池没有`"hello"`，重新创建，如果有，直接通过`value`指向。最终指向的是堆中的空间地址。
```java

String a = "abc";
String b = "abc";
System.out.println(a.equals(b)); // true, 判断的是值是否相同
System.out.println(a == b); // true, 指向的是同一个地址

String a = "hello";
String b = new String("hello");
System.out.println(a.equals(b)); // true
System.out.println(a == b); // false
System.out.println(a == b.intern()); // true
System.out.println(b == b.intern()); // false
/**
 * 当调用 intern 方法时，如果池已经包含一个等于此 String 对象的字符串(equals.(Object) 方法确定)则返回池中的字符串。否则，将此 String 对象添加到池中，并返回* 此 String 对象的引用
 * b.intern()方法最终返回的是常量池的地址(对象)
 */


String s1 = "hello"; // 指向常量池，hello
String s2 = 'java'; // 指向常量池，java
String s3 = new String("java"); // 指向堆内存
String s4 = "java"; // 指向常量池，java
System.out.println(s2 == s3); // false, s2指向常量池，s3指向堆内存
System.out.println(s2 == s4); // true, 两个都指向常量池
System.out.println(s2.equals(s3)); // true, 内容相同
System.out.println(s1 == s2); // false, s1指向常量池，s2指向常量池



Person p1 = new Person();
p1.name= "hspedu";
Person p2 = new Person();
p2.name ="hspedu";
System.out.println(p1.name.equals(p2.name))://比较内容: True
System.out.println(p1.name ==p2.name)://T 
System.out.println(p1.name=="hspedu");// T
String s1 = new String("bcde");
String s2 = new String("bcde");
System.out.println(s1==s2); //False
```
## 集合

## 泛型

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