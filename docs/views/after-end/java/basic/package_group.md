# 包装类
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
## 包装类和基本数据的转换
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
## Integer类和Character类的常用方法
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

## String类
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
### 创建String对象的两种方式
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
### 字符串特性
```java
/**
 * String a = "hello" + "abc";
 * 创建了几个对象？1个对象
 * String a = "hello" + "abc" ====> 优化等价 String a = "helloabc";
 * 
 * 统计器做了优化，判断创建的常量池对象，是否有引用指向
 */

public class StringTest {
    public static void main(String[] args) {
        String a = "hello";
        String b = "abc";
        // 1. 先创建一个StringBuilder sb = StrringBuilder();
        // 2. 执行 sb.append("hello");
        // 3. 执行 sb.append("abc");
        // 4. String c = sb.toString();
        // 最后 c 指向堆中的对象(String) value [] -> 池中 "helloabc"
        String c = a + b;

        String d = "helloabc";
        System.out.println(c == d); // false
        String e = "hello" + "abc"; // 直接看常量池，e指向池中 "helloabc"
        System.out.println(d == e); // true

    }
}
```
1. `String` 是一个 `final` 类，代表不可变的字符序列
2. 字符串是不可变的，一个字符串对象一旦被创建，其内容就不能被改变
```java
/**
 * String a = "hello"; // 创建a对象
 * String b = "abc"; // 创建b对象
 * String c = a + b;
 * 一共创建了几个对象？3个
 * 
 * 底层是 StringBuilder sb = new StringBuilder();
 * sb.append(a);
 * sb.append(b);
 * sb是在堆中，并且append是在原来字符串的基础上追加的。
 * 重要规则：String c1 = "ab" + "cd" 常量相加，看的不是对象，而是常量池中的值
 * String c1 = a + b; 变量相加，看的不是常量池中的值，而是对象
 * 所以是 3 个对象
 */


String s1 = "hello"; // s1 指向常量池中的 "hello"
String s2 = "java"; // s2 指向常量池中的 "java"
String s5 = "hellojava"; // s5 指向常量池中的 "hellojava"
String s6 = (s1 + s2).intern(); // s6 指向常量池中的 "hellojava"
System.out.println(s5 == s6); // true 
System.out.println(s5.equals(s6)); // true

public class Test1 {
  String str = new String("hello");
  final char[] ch = {'j', 'a', 'v', 'a'};
  public void change(String str, char ch[]) {
    str = "world";
    ch[0] = 'h';
  }

  public static void main(String[] args) {
    Test1 test = new Test1();
    test.change(test.str, test.ch);
    System.out.println(test.str); // hello, // 因为String 是 final 修饰的，所以不能改变
    System.out.println(test.ch); // hava, // 因为 char[] 是数组，所以可以改变
  }
}
```
### 字符串常用方法
String 类是保存字符串常量的。每次更新都需要重新开辟空间，效率较低，因此java设计者还提供了StringBuilder和StringBuffer类，来增强String的功能，并提高效率。

1. equals: 区分大小写，判断内容是否相等
```java
String s1 = "hello";
String s2 = "Hello";
System.out.println(s1.equals(s2)); // false
```
2. equealsIgnoreCase: 忽略大小写的判断内容是否相等
```java
if ("john".equalsIgnoreCase("John")) {
  System.out.println("yes");
} else {
  System.out.println("no");
}

String username = "john";
if ("john".equalsIgnoreCase(username)) {
  System.out.println("yes");
} else {
  System.out.println("no");
}
```
3. length: 获取字符的个数，字符串的长度
```java
System.out.println("hello".length()); // 5
```
4. indexOf: 获取字符在字符串中第一次出现的索引，如果找不到，返回-1
```java
String s1 = 'hello';
System.out.println(s1.indexOf('e')); // 1
```
5. lastIndexOf: 获取字符在字符串中最后一次出现的索引，如果找不到，返回-1
```java
String s1 = 'java';
System.out.println(s1.lastIndexOf('a')); // 3
```
6. substring: 截取指定范围的字符串
```java
String name = "john";
// 表示从索引1开始截取，到索引3结束，包括索引1，不包括索引3 [1, 3)
System.out.println(name.substring(1, 3)); // oh
// 表示从索引1开始截取，一直到字符串末尾 [1, end)
System.out.println(name.substring(1)); // ohn
```
7. trim: 去除字符串两端的空格
```java
String s = "  hello  ";
System.out.println(s.trim()); // hello
```
8. charAt: 获取某索引处的字符, 注意不能使用`Str[index]`这种方式
```java
String s = "hello";
System.out.println(s.charAt(1)); // e
```
9. toUpperCase: 将字符串中的字符转换为大写
```java
String s = "hello";
System.out.println(s.toUpperCase()); // HELLO
```
10. toLowerCase: 将字符串中的字符转换为小写
```java
String s = "HELLO";
System.out.println(s.toLowerCase()); // hello
```
11. concat: 拼接字符串
```java
String s1 = "hello";
String s2 = "world";
System.out.println(s1.concat(s2)); // helloworld
```
12. replace: 替换字符串中的字符
```java
String s = "hello";

// s.replace()方法执行后，返回的结果才是替换的，s本身并没有改变
System.out.println(s.replace('l', 'x')); // hexxo
```
13. split: 分割字符串
```java
String s = "hello world";
String[] arr = s.split(" ");
for (String str : arr) {
  System.out.println(str); // hello world
}

String s2 = "hello\\aaa";
String[] arr2 = s2.split("\\\\");
for (String str : arr2) {
  System.out.println(str); // hello\aaa
}
```
14. compareTo: 比较两个字符串的大小。
```java
/**
 * 如果str1>str2，返回正数；如果str1<str2，返回负数；如果str1=str2，
 * 返回0
 * 
 * 如果长度相同，并且每个字符也相同，就返回0,
 * 如果长度相同或者不相同，比较时，就返回
 * if (c1 != c2) {
 *   return c1 - c2;
 * }
 * 如果前面的部分都相同，就返回长度差 str1.length() - str2.length();
 * */ 
String s1 = "hello";
String s2 = "world";
System.out.println(s1.compareTo(s2)); // -15 因为h的ASCII码比w小

String s3 = "hello";
String s4 = "hello";
System.out.println(s3.compareTo(s4)); // 0

```
15. toCharArray: 将字符串转换为字符数组
```java
String s = "hello";
char[] arr = s.toCharArray();
for (char c : arr) {
  System.out.println(c); // h e l l o
}
```
16. format: 格式化字符串
```java
/**
 * 占位符
 * %d: 整数
 * %f: 浮点数
 * %s: 字符串
 * %c: 字符
 * %b: 布尔值
 * %x: 十六进制整数
 * %e: 科学计数法
 * %n: 换行
 */
String name = "张三";
int age = 18;
double score = 98.5;
boolean isPass = true;

// %s, %d, %f, %b 统称为占位符，这些占位符由后面变量来替换
Strint info = "姓名：%s，年龄：%d，成绩：%f，是否通过：%b"
String str = String.format(info, name, age, score, isPass);
```
### StringBuffer 类
1. StringBuffer 代表可变的字符序列，可以对字符串内容进行增删改查。
2. 很多方法与String相同，但StringBuffer 是可变的。
3. StringBuffer 是一个容器
4. `StringBuffer` 是`final`类，实现了`Serizlizable`接口，可以保存到文件，或网络传输。继承了抽象类`AbstractStringBuilder`。`AbstractStringBuilder` 属性 `char[] value`, 存放的字符序列
```java
public static void main(String[] args) {
  
  /**
   * 1. StringBuffer 的直接父类是 AbstractStringBuilder
   * 2. StringBuffer 实现了 Serializable 接口，即StringBuffer的对象可以串行化
   * 3. 在父类中 AbstractStringBuilder 中有一个属性 char[] value ，不是final, 该 value 数组存放字符串内容，引用在堆中
   * 4. StringBuffer 是final类，不能被继承
   * 5. 因为StringBuffer字符内容是存在 char[] value, 所有在变化(增加/删除)，不用每次都更换地址(即不是每次创建新对象)，所以效率高于 String
   */

  StringBuffer sb = new StringBuffer("hello");
}
```
### String VS StringBuffer
1. String保存的是字符串常量，里面的值不能更改，每次String类的更新实际上就是更改地址，效率较低。
```java
private final char value[];
`
2. StringBuffer保存的是字符串变量，里面的值可以更改，每次StringBuffer的更新实际上就是更改内容，不用更新地址效率较高。
```java
char[] value; // 这个存放在堆中
```
### StringBuffer构造器
1. `StringBuffer()`: 构造一个其中不带字符的字符串缓冲区，其初始容量为16个字符。
2. `StringBuffer(int capacity)`: 构造一个不带字符，但具有指定初始容量的字符串缓冲区。即对`char[]`大小进行指定
3. `StringBuffer(String str)`: 构造一个字符串缓冲区，并将其内容初始化为指定的字符串内容。即对`char[]`大小进行指定，并赋值
4. `StringBuffer(CharSequence seq)`: 构造一个字符串缓冲区，它包含与指定 CharSequence 相同的字符。
```java
// 1. 创建一个 大小为16的 char[] 数组，用于存放字符内容
StringBuffer sb = new StringBuffer();

// 2. 通过构造器指定 char[] 大小
StringBuffer stringBuffer = new StringBuffer(100);

// 3. 通过给一个String创建StringBuffer, char[] 大小为str.length() + 16
StringBuffer hello = new StringBuffer("hello");
```

### String 和 StringBuffer 的转换
```java
// 1. String -> StringBuffer
String str = "hello";
// 方式1 使用构造器
// 返回的才是StringBuffer对象, 对str本身没有影响
StringBuffer b1 = new StringBuffer(str);
// 方式2 使用append方法
StringBuffer b2 = new StringBuffer();
b2.append(str);

// 2. StringBuffer -> String
// 方式1 使用StringBuffer提供的toString方法
String s2 = b2.toString();
// 方式2 使用构造器来搞定
String s3 = new String(b2);
```
### StringBuffer 常用方法
1. `append()`: 追加
2. `insert()`: 插入
3. `delete()`: 删除
4. `replace()`: 替换
5. `indexOf()`: 查找
6. `length()`: 获取长度
```java
StringBuffer s = new StringBuffer("hello");
// 追加
s.append(',');
s.append("world");
s.append(123).append(45.6).append(true);
System.out.println(s); // hello,world12345.6true

/**
 * 删
 * 删除索引为 >= start && < end 的字符
 * 注意: 删除后, 后面的字符会往前移动
 * 
 * 删除 索引为 0-5 的字符[0, 5)
 * */
s.delete(0, 5);
System.out.println(s); // ,world12345.6true

/**
 * 改
 */
s.replace(0, 1, "H");
System.out.println(s); // Hworld12345.6true


// 查找：查找指定的子串在字符串第一次出现的索引，如果没有返回-1
int index = s.indexOf("world");
System.out.println(index); // 1

// 插：在索引为index的位置插入字符串，索引从0开始，注意：插入后，后面的字符会往后移动
s.insert(0, "java");
System.out.println(s); // javaHworld12345.6true

// 获取长度
System.out.println(s.length()); // 21
```
### StringBuffer类课堂测试题
```java
String str = null;
StringBuffer sb = new StringBuffer();
sb.append(str); // 底层调用的是 AbstractStringBuilder 的 appendNull
System.out.println(sb.length()); // 4

System.out.println(sb); // null

// 会报空指针异常，NullpointerException
StringBuffer sb1 = new StringBuffer(str); // super(str.length() + 16);
System.out.println(sb1);

/**
 * 输入商品名称和商品价格，要求打印效果示例
 * 商品名称 商品价格
 * 手机     123,456.78
 * 
 * 要求：价格的小数点前面每三位用逗号隔开
 * 
 * 1. 定义一个Scanner 对象，接收用户输入的价格(String)
 * 2. 希望使用到 StringBuffer 的 insert, 需要将String转成StringBuffer
 * 3. 然后在使用相关方法进行字符串的处理
*/
String price = "12345678.123456";
StringBuffer sb2 = new StringBuffer(price);

// int i = sb.lastIndexOf(".");
// sb = sb.insert(i - 3, ",");

for (int i = sb2.lastIndexOf(".") - 3; i > 0; i -= 3) {
    sb2 = sb2.insert(i, ",");
}
System.out.println(sb2);
```
### StringBuilder类
1. 一个可变的字符序列。此类提供一个与StringBuffer兼容的API，但不保证同步(StringBuilder 不是线程安全)。该类被设计用作StringBuffer的一个简易替换，用在字符串缓冲区被单个线程使用的时候（这种情况很普遍）。如果可能，建议优先采用该类，因为在大多数实现中，它比StringBuffer要快。
2. 在StringBuilder上的主要操作是append和insert，它们被提供很多重载形式，以支持各种数据类型。
3. StringBuilder 是 final
4. 继承了 AbstractStringBuilder，属性 char[] value, 内容存到 value 中
5. 实现了Serializable 接口，序列化(所谓序列化即可以保存类型和数据本身)
```java
puclic class StringBuilder01 {
  public static void main(String[] args) {
    /**
     * 1. StringBuilder 继承 AbstractStringBuilder
     * 2. 实现了Serializable 接口, 说明StringBuilder对象是可以串行化(对象可以网络传输，可以保存到文件)
     * 3. StringBuilder 是 final, 不能被继承
     * 4. StringBuilder 对象字符序列仍然是存放在其父类 AbstractStringBuilder 的 char[] value 中,因此，字符序列是堆中
     * 5. StringBuilder的方法，没有做互斥的处理，即没有synchronized关键字，因此在单线程情况下使用
     * stringBuilder效率更高，因为不用处理多线程同步问题
     */
    StringBuilder sb = new StringBuilder();
  }
}
```
### String、StringBuffer、StringBuilder 的比较
1. StringBuilder 和 StringBuffer非常类似，均代表可变的字符序列，而且方法也一样
2. String: 不可变的字符序列，效率低，但是复用率高
3. StringBuffer: 可变的字符序列，效率较高（增删）、线程安全
4. StringBuilder: 可变的字符序列，效率最高、线程不安全
5. String使用注意：
```java
String s = "abc"; // 创建了一个字符串
s += "b"; // 实际上原来的 "a" 字符串对象已经丢弃了，现在又产生了一个字符串 s + "b"(也就是"ab")。如果多次执行这些改变字符串内容的方法，会导致大量副本字符串对象存留在内存中，降低效率。如果这样的操作放到循环中，会极大影响程序的性能。
// 结论：如果我们对String做大量修改，不要使用String
```

```java
public class StringVSStringBuilderVSStringBuffer {
  public static void main(String[] args) {
    long startTime = 0L;
    long endTime = 0L;
    
    StringBuffer buffer = new StringBuffer("");
    startTime = System.currentTimeMillis();
    for (int i = 0; i < 20000; i++) {
        buffer.append(String.valueOf(i));
    }
    endTime = System.currentTimeMillis();
    System.out.println("StringBuffer的执行时间：" + (endTime - startTime));


    StringBuilder builder = new StringBuilder("");
    startTime = System.currentTimeMillis();
    for (int i = 0; i < 20000; i++) {
        builder.append(String.valueOf(i));
    }
    endTime = System.currentTimeMillis();
    System.out.println("StringBuilder的执行时间：" + (endTime - startTime));

    
    String text = "";
    startTime = System.currentTimeMillis();
    for (int i = 0; i < 20000; i++) {
        text += "i";
    }
    endTime = System.currentTimeMillis();
    System.out.println("String的执行时间：" + (endTime - startTime));
  }
}
```
### String、StringBuilder、StringBuffer的选择
1. 如果字符串存在大量的修改操作，一般使用StringBuffer 或 StringBuilder
2. 如果字符串存在大量的修改操作，并在单线程下，一般使用StringBuilder
3. 如果字符串存在大量的修改操作，并在多线程下，一般使用StringBuffer
4. 如果字符串很少修改，被多个对象引用，使用String，比如常量池中的字符串
## Math类
Math类包用于执行基本数学运算的方法，如初等指数、对数、平方根和三角函数。
```java
/**
 * abs 绝对值
 * pow 求幂
 * ceil 向上取整
 * floor 向上取整
 * round 四舍五入
 * sqrt 求开方
 * random 求随机数
 * max 求最大值
 * min 求最小值
 */

public class MathMethod {
  public static void main(String[] args) {
    // 1. abs 绝对值
    int abs = Math.abs(-1);
    System.out.println("abs:" + abs); // 1

    // 2. pow 求幂
    double pow = Math.pow(2, 3);
    System.out.println("pow:" + pow);  // 8.0

    // 3. ceil 向上取整, 返回>=该参数的最小整数
    double ceil = Math.ceil(3.14);
    System.out.println("ceil:" + ceil);  // 4.0
    System.out.println("ceil:" + Math.ceil(-3.14));  // -3.0

    // 4. floor 向下取整, 返回<=该参数的最大整数
    double floor = Math.floor(3.14);
    System.out.println("floor:" + floor);  // 3.0
    System.out.println("floor:" + Math.floor(-3.14));  // -4.0

    // 5. round 四舍五入
    double round = Math.round(3.14);
    System.out.println("round:" + round);  // 3
    System.out.println("round:" + Math.round(-3.14));  // -3


    // 6. sqrt 求开方
    double sqrt = Math.sqrt(9);
    System.out.println("sqrt:" + sqrt);  // 3.0

    /**
     * 7. random 求随机数
     * random 返回的是 0 <= x < 1 之间的double类型随机小数
     * 
     * 请写出获取 a - b 之前的随机整数，a, b 为整数, 比如 a = 2, b = 7
     * 即返回一个数x。2 <= x < 7
     * Math.random() * (b -a) 返回的就是0 <= 数 <= b - a
     * 1. (int)(a) <= x <= (int)(a + Math.random() * (b - a + 1))
     * 2. a = 2, b = 7
     * (int)(a + Math.random() * (b - a + 1)) = (int)(2 + Math.random() * (7 -2 + 1)) = (int)(2 + Math.random() * 6)
     * Math.random() * 6 返回的是 0 <= x < 6 的随机数
     * 2 + Math.random() * 6 返回的是 2 <= x < 8 的随机数
     * (int)(2 + Math.random() * 6) 返回的是 2 <= x <= 7 的随机数
     * 3. 公式就是 (int)(a + Math.random() * (b - a + 1))
    */
    for (int i = 0; i < 10; i++) {
      System.out.println(2 + Math.random() * (7 - 2 + 1));
    }

    // 8. max, min, 返回最大值和最小值
    int min = Math.min(1, 2);
    int max = Math.max(1, 2);
    System.out.println("min:" + min + ", max:" + max);

}
```

## Arrays 类
Arrays 类是 java.util 包下的一个工具类，用来操作数组，它提供的所有方法都是静态的，可以直接使用类名调用。
1. toString()：将数组转换成字符串
```java
Integer[] integers = {1, 20, 90};
for (int i = 0; i < integers.length; i++) {
    System.out.println(integers[i]);
}
System.out.println("-------------" + Arrays.toString(integers));
```
2. sort 排序(自然排序和定制排序)
```java
public static void main(String[] args) {

    // 1. toString 返回数据的字符串形式
    Integer[] integers = {1, 20, 90, -1, 7};
    /**
     * 排序
     * 1. 可以直接使用冒泡排序，也可以直接使用Arrays提供的sort方法排序
     * 2. 因为数组是引用类型，所以用过sort排序后，会直接影响到 实参 arr
     * 3. sort是重载的，也可以通过传入一个接口 Comparator 实现定制排序
     * 4. 调用定制排序时，传入两个参数
     *  (1). 排序的数据 arr
     *  (2). 实现 Comparator 接口的匿名内部娄，要求实现 compare 方法
     * 5. 这里体现了接口编程的方式
     *  (1). Arrays.sort(arr, new Comparator())
     *  (2). 最终到 TimeSort 类的 private static <T> void binarySort(T[] a, int lo, Comparator<? supper T c>())
     *  (3). 执行到 binarySort 方法的代码，会根据动态绑定机制 c.compare() 执行我们传入的匿名内部类的 compare()
     *      while(left < right) {
     *          int mid = (left + right) >>>> 1;
     *          if (c.mare(pivot, a[mid]) < 0)
     *              right = mid;
     *          else
     *              left = mid + 1;
     *      }
     *   (4) new Comparator() {
     *          @Override
     *          public int compare(Object o1, Object o2) {
     *              Integer i1 = (Integer) i1;
     *              Ingeger i2 = (Integer) i2;
     *
     *              return i2 - i1;
     *          }
     *   }
     *   (5) public int compare(Object o1, Object o2) {
     *      // 返回的值 > 0 还是小于0会影响整个排序结果，这就充分体现了 接口编程 + 动态绑定 + 匿名内部类的统合使用
     *      // 将来的底层框架和源码的使用方式，会非常常见
     *   }
     * */
    Arrays.sort(integers); // 默认排序方法
    System.out.println("排序后的数据 " + Arrays.toString(integers));

    integers[0] = 100;
    // 定制排序
    Arrays.sort(integers, new Comparator() {
        @Override
        public int compare(Object o1, Object o2) {
            Integer i1 = (Integer) o1;
            Integer i2 = (Integer) o2;
            return i1 - i2;
        }
    });
    System.out.println("--- 排序后 ------ ");
    System.out.println(Arrays.toString(integers));

    integers[3] = -30;
    // 定制排序 + 冒泡排序
    bubble02(integers, new Comparator() {
        @Override
        public int compare(Object o1, Object o2) {
            int i1 = (Integer) o1;
            int i2 = (Integer) o2;

            return i1 - i2;
        }
    });
    System.out.println(" 定制排序后 " + Arrays.toString(integers));
}

public static void bubble02(Integer[] arr, Comparator c) {
    int temp = 0;
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr.length - 1 - i; j++) {
            // 数组排序由 c.compare(arr[j], arr[j + 1]) 返回的值决定
            if (c.compare(arr[j], arr[j + 1]) > 0) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

3. binarySearch 二分查找
```java
/**
 * binarySearch 通过二分搜索法进行查找，要求必须排好
 * 1. 使用 binarySearch 二叉查找
 * 2. 要求该数组是有序的。如果该数组是无序的。不能使用 binarySearch
 * 3. 如果数组中不存在该元素，就返回 -(arr.length() + 1)
 * */
Integer[] integers = {1, 2, 90, 123, 6};

int index = Arrays.binarySearch(integers, 123);
System.out.println(" index " + index); // 3

index = Arrays.binarySearch(integers, 567);
System.out.println(" index " + index); // -6
```
4. copyOf 复制数组
```java
/**
 * copyOf 数组元素的复制
 * 1. 从 arr 数组中，拷贝 arr.length 个元素到 newArr 数组中
 * 2. 如果拷贝的长度 > arr.length 就在新数组的后面增加 null
 * 3. 如果拷贝的长度 < 0, 就抛出异常 NegativeArraySizeException
 * 4. 该方法的底层使用的是 System.arraycopy()
 * */
Integer[] arr = {1, 2, 90, 123, 6};
Integer[] newArr = Arrays.copyOf(arr, 10);
// newArr = Arrays.copyOf(arr, -1); // 报错

System.out.println("拷贝执行完毕后 " + Arrays.toString(newArr)); // [1, 2, 90, 123, 6, null, null, null, null, null]
```
5. fill 数组元素的填充
```java
Integer[] num = new Integer[]{9, 3, 2};
System.out.println("填充之前的数组 =  " + Arrays.toString(num)); // [9, 3, 2]

// 使用 99 去填充 num 数组，可以理解成是替换数组中的元素
Arrays.fill(num, 99);
System.out.println("填充之后的数组 =  " + Arrays.toString(num)); // [99, 99, 99]
```
6. equals 比较数组元素是否相等
```java
Integer[] num = new Integer[]{9, 3, 2};

Integer[] num2 = {1, 2, 90};

// 1. 如果 num 和 num2 的每个元素都相等，那么返回 true
// 2. 如果不是完全一样，就返回 false
boolean flag = Arrays.equals(num, num2);
System.out.println("equals " + flag); // false
```

7. asList 将数组转为 List 集合
```java
/**
 * 1. asList 方法，会将(2, 3, 4, 5, 6, 1) 转为 List 集合
 * 2. 返回的 asList 编译类型 List(接口)
 * 3. asList 运行类型 java.util.Arrays$ArrayList(类), 是 Arrays 的一个静态内部类
 *    private static class ArrayList<E> extends AbstractList<E> implements RandomAccess, java.io.Serializable
 */
List asList = Arrays.asList(2, 3, 4, 5, 6, 1);
System.out.println("asList = " + asList); // [2, 3, 4, 5, 6, 1]
System.out.println("asList 的运行类型" + asList.getClass()); // class java.util.Arrays$ArrayList



/**
 * 自定义 Book 类，里面包含 name 和 price, 按 price 排序从大到小
 *
 */

public class Main {
  public static void main(String[] args) {

    Book[] books = new Book[4];
    books[0] = new Book("红楼梦", 100);
    books[1] = new Book("青年文摘", 90);
    books[2] = new Book("python", 10);
    books[3] = new Book("go", 200);
    System.out.println("排序前的 book " + Arrays.toString(books));
    Arrays.sort(books, new Comparator() {
        @Override
        public int compare(Object o1, Object o2) {
            // 这里的 o1 和 o2 就是Book对象
            Book book1 = (Book) o1;
            Book book2 = (Book) o2;
            double priceVal = book2.getPrice() - book1.getPrice();

            if (priceVal > 0) {
                return 1;
            }
            if (priceVal < 0) {
                return -1;
            }

            return 0;
        }
    });

    System.out.println("排序后的 book " + Arrays.toString(books));
  }
}
class Book {
    private String name;
    private double price;

    public Book(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Book{" +
                "name='" + name + '\'' +
                ", price=" + price + '}';
    }
}

```
## System类
```java
// 1. exit 退出当前程序
System.out.println("ok1");
// 1. exit(0) 表示程序退出
// 2. 0: 表示一个状态，正常状态
System.exit(0);
System.out.println("ok2");

// 2. arraycopy
/**
 * 
 * */
int[] src = {1, 2 ,3};
int[] dest = new int[5]; // dest 当前是 {0, 0, 0, 0, 0}

/**
 * 
 * 源数组
 * @param    src  the source array
 * srcPos: 从源数组的哪个索引位置开始拷贝
 * @param    srcPos starting position in the source array
 * dest: 目标数组，即把数组的数据拷贝到哪个数组
 * @param    dest the destination array
 * destPOs: 把源数组的数据拷贝到 目标数组的哪个索引
 * @param destPos starting position in the destination data
 * lenth: 从源数组拷贝到多少个数据到目标数组
 * @prams length the number of array elements to be copied.
 **/
System.arraycopy(src, 0, dest, 0, src.length);
System.out.println(Arrays.toString(dest)); // [1, 2, 3, 0, 0]


// 3. currentTimeMillis: 返回当前时间距离1970-1-1之间的毫秒数
System.out.println(System.currentTimeMillis());
// 4. gc: 运行垃圾回收机制 
System.gc();
```
## BigInteger 和 BigDecimal 类
1. BigInteger: 适合保存比较大的整型
2. BigDecimal: 适合保存精度更高的浮点型(小数)
```java
/**
 * add: 加法
 * subtract: 减法
 * multiply: 乘法
 * divide: 除法
 */
// 当我们编程中,需要处理很大的整数, long 不够用
// 可以使用BigInteger类来搞定
// long l = 23788888888888888888999999999999l; // 编译错误
// System.out.println("l = " + l);

// 当我们编程中,需要处理很大的整数, long 不够用
// 可以使用BigInteger类来搞定
// long l = 23788888888888888888999999999999l;
// System.out.println("l = " + l);

BigInteger bigI = new BigInteger("23788888888888888888999999999999");
System.out.println("bigIn + " + bigI);

BigInteger add = bigI.add(bigI); // 加
System.out.println("add = " + add);
BigInteger subI = bigI.subtract(bigI); // 减
System.out.println("subI = " + subI);
BigInteger multiply = bigI.multiply(bigI); // 乘
System.out.println("multiply = " + multiply);
BigInteger divide = bigI.divide(bigI); // 除
System.out.println("divide = " + divide);

// 当我们需要保存一个精度很高的娄时,double不够用
// 可以用 BigDecimal
// double d = 1999.1111111111999999999999998888888887777777777777d;
// System.out.println(d);

BigDecimal bigDecimal = new BigDecimal("1999.1111111111999999999999998888888887777777777777");
BigDecimal bigDecimal2 = new BigDecimal("1.1");
System.out.println(bigDecimal);
// 1. 如果对 BigDecimal 进行运算,比如加减乘除,需要使用对应的方法
// 2. 创建一个需要操作的 BigDecimal 然后调用相应的方法即可.
System.out.println(bigDecimal.add(bigDecimal2)); // 加
System.out.println(bigDecimal.subtract(bigDecimal2)); // 减
System.out.println(bigDecimal.multiply(bigDecimal2)); // 乘
// System.out.println(bigDecimal.divide(bigDecimal2)); // 可以抛出异常ArithmeticException
// 在调用 divide 方法时,指定精度即可. BigDecimal.ROUND_CEILING
// 如果有无限循环小数,就会保留分子的精度
System.out.println(bigDecimal.divide(bigDecimal2, BigDecimal.ROUND_CEILING)); // 除
```
## 日期时间类
### 第一代日期类
1. Date: 精确到毫秒，代表特定的瞬间
2. SimpleDateFormat: 格式化和解析日期的具体类。它允许进行格式化（也就是日期 -> 文本）、解析（文本 -> 日期）和规范化。
```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Main {
  public static void main(String[] args) throws ParseException {
    /**
     * 1. 获取当前系统时间
     * 2. 这里的 Date 类是在java.util包
     * 3. 默认输出的日期格式是国外的方式，因此通常需要对格式进行转换
     * */
    Date d1 = new Date();
    System.out.println("当期日期" + d1);
    System.out.println(d1.getTime()); // 获取某个时间对应的毫秒数
    Date d2 = new Date(9234567); // 通过指定毫秒数得到时间
    System.out.println("d2 = " + d2);


    SimpleDateFormat sdf = new SimpleDateFormat();
    String format = sdf.format(d1);
    System.out.println("当前日期 " + format);

    // 1. 创建 SimpleDateFormat 对象，可以指定相应的格式
    // 2. 这时的格式任县的字母是规定好的，不能乱写
    sdf = new SimpleDateFormat("YYYY年MM月dd日 hh:mm:ss E");
    format = sdf.format(d1);
    System.out.println("当前日期 " + format);

    /**
     * 1. 可以把一个格式化的String转成对应的 Date
     * 2. 得到Date仍然在输出时，还是按照国外的形式，如果希望指定格式的输出，需要转换
     * 3. 在把 String -> Date, 使用的 sdf 格式需要和你给的 String 的格式一样，否则会抛出转换异常
     * */
    String s = "1996年01月01日 10:20:30 星期二";
    Date parse = sdf.parse(s);
    System.out.println("parse " + parse);
  }
}
```
### 第二代日期类
1. 第二代日期类，主要就是`Calendar`类(日历)
```java
public abstract class Calendar extends Object implements Serializable, Cloneable, Comparable<Calendar> {
  
}
```
2. Calendar类是一个抽象类，它为特定瞬间与一级诸如`YEAR`、`MONTH`、`DAY_OF_MONTH`、`HOUR`等日历字段之间的转换提供了一些方法，并为操作日历字段（例如获得下星期的日期）提供了一些方法。
```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Main {
  public static void main(String[] args) throws ParseException {

    // 第二代日期类
    /**
     * 1. Calendar是一个抽象类，并且构造器是private
     * 2. 可能通过 getInstance() 来获取实例
     * 3. 提供大量的方法和字段提供使用
     * */
    Calendar c = Calendar.getInstance();
    System.out.println("c = " + c);
    // 2. 获取日历对象的某个日历字段
    System.out.println("年： " + c.get(Calendar.YEAR));
    System.out.println("月： " + (c.get(Calendar.MONDAY) + 1));
    System.out.println("日： " + c.get(Calendar.DAY_OF_MONTH));
    System.out.println("小时： " + c.get(Calendar.HOUR));
    System.out.println("分钟： " + c.get(Calendar.MINUTE));
    System.out.println("秒： " + c.get(Calendar.SECOND));

    // Canlender 没有专门的格式化方法，所以需要自己来组件显示
    System.out.println(c.get(Calendar.YEAR) + "-" + (c.get(Calendar.MONDAY) + 1) + "-" + c.get(Calendar.DAY_OF_MONTH) + " " + c.get(Calendar.HOUR) + ":" + c.get(Calendar.MINUTE) + ":" + c.get(Calendar.SECOND));

  }
}
```
### 第三代日期类
> 前面两代日期类存在很多问题，所以Java8推出了第三代日期类。
JDK1.0中包含了一个java.util.Date类，但是它的大多数方法已经在JDK1.1中的Calendar类中取代。而Calendar也存在一些问题。
1. 可变性：像日期和时间这样的类应该是不可变的，但是Calendar类是可变的，这是Java日期/时间API最大的问题之一。
2. 偏移性：Date中的年份是从1900开始的，月份是从0开始的，日期是从1开始的，
3. 格式化：格式化只对Date有用，对Calendar则无效。
4. 此外，它们也不是线程安全的，不能处理闰秒等(每隔2天，多出1秒)。
```java
/**
 * LocalDate(日期)、LocalTime(时间)、LocalDateTime(日期时间)
 * LocalDate 只包含日期，可以获取日期字段
 * LocalTime 只包含时间，可以获取时间字段
 * LocalDateTime 包含日期和时间，可以获取日期和时间字段
 */
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

public class Main {
  public static void main(String[] args) throws ParseException {
    // 第三代日期
    // 1. 使用now()返回当前日期时间的对象
    LocalDateTime ldt = LocalDateTime.now(); // LocalDate.now(); // LocalTime.now();
    System.out.println(ldt);
    System.out.println("年 = " + ldt.getYear());
    System.out.println("月 = " + ldt.getMonth());
    System.out.println("月 = " + ldt.getMonthValue());
    System.out.println("日 = " + ldt.getDayOfMonth());
    System.out.println("时 = " + ldt.getHour());
    System.out.println("分 = " + ldt.getMinute());
    System.out.println("秒 = " + ldt.getSecond());

    LocalDate now = LocalDate.now();
    System.out.println(now.getYear());

    // 2. DateTimeFormatter 格式日期类
    // 类似于SimpleDateFormat
    LocalDateTime ldt2 = LocalDateTime.now();
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss"); // 格式不能乱写
    String format2 = dtf.format(ldt2);
    System.out.println("格式化后的日期 = " + format2);

    /**
     * 3. 时间戳
     * 类似于Date，提供了一系列和Date类转换的方式
     * Instant -----> Date:
     * Date date = Date.from(instant)
     * Date --------> Instant:
     * Instant instant = date.toInstant();
     * */
    // 1. 通过静态方法 now()获取表示当前时间戳的对象
    Instant now2 = Instant.now();
    System.out.println(now2);
    // 2. 通过 from 可以把Instant转成Date
    Date date = Date.from(now2);
    // 3. 通过date的toInstant() 可以把date 转成Instant对象
    Instant instant = date.toInstant();

    /**
     * 4. 第三代日期类更多方法
     * (1). LocalDateTime类
     * (2). MonthDay类： 检查重复事件
     * (3). 是否是闰年
     * (4). 增加日期的某个部分
     * (5). 使用 plus 方法测试增加时间的某个部分
     * (6). 使用 minus 方法测试查看一年前和一年后的日期
     * */

    // 看看890天后，是什么时候
    LocalDateTime localDateTime = ldt2.plusDays(890);
    System.out.println("890天后=" + dtf.format(localDateTime));

    // 看看在 3456分钟前是什么时候，
    LocalDateTime localDateTime2 = ldt2.minusMinutes(3456);
    System.out.println("3456分钟前 日期 = " + dtf.format(localDateTime2));
  }
}
```