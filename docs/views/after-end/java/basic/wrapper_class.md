# 八大 wrapper 类

## 包装类
1. 针对八种基本定义相应的引用类型——包装类
2. 有了类的特点，就可以调用类中的方法。
|基本数据类型|包装类            |
|-----------|------------------|
|   boolean |Boolean       |
|   char    |Character |
|   byte    |Byte |
|   short   |Short |
|int |Integer |
|long |Long |
|float |Float |
|double |Double |
### 自动装箱和拆箱
1. jdk5 之前，需要手动装箱和拆箱，装箱：基本类型 -> 包装类型。反之，拆箱
2. jdk5 之后，自动装箱和拆箱
3. 自动装箱底层调用的是 valueOf 方法，比如Integer.valueOf()
```java
// 手动装箱
public static void main(String[] args) {
  // 手动装箱 int -> Integer
  int n1 = 100;
  Integer integer = new Integer(n1);
  Integer integer1 = Integer.valueOf(n1);

  // 手动拆箱
  // Integer -> int
  int n2 = integer.intValue();


  // jdk5后，就可以自动装箱和自动拆箱
  int n2 = 200;
  // 自动装箱：int -> Integer
  Integer integer2 = n2; // 底层使用的是Integer.valueOf(n2)

  // 自支拆箱 Integer -> int;
  int n3 = integer2; // 底层使用的是intValue()
}
```
### 包装类型和String类型的相互转换
```java
public static void main(String[] args) {
  // 包装类型(Integer) -> String
  Integer i = 1;
  // 方式1
  String str1 = i + "";
  // 方式2
  String str2 = i.toString();
  // 方式3
  String str3 = String.valueOf(i);


  // String -> 包装类型(Integer)
  String str4 = "123";
  Integer i2 = Integer.parseInt(str4);
  Integer i3 = new Integer(str4);

}
```
### 包装类Integet 和 Character 的常用方法
```java
public static void main(String[] args) {
  // 包装类Integet 和 Character 的常用方法
  System.out.println(Integer.MAX_VALUE); // 最大值
  System.out.println(Integer.MIN_VALUE); // 最小值

  System.out.println(Character.isDigit('a')); // 判断是否是数字
  System.out.println(Character.isLetter('a')); // 判断是否是字母
  System.out.println(Character.isUpperCase('a')); // 判断是否是大写字母
  System.out.println(Character.isLowerCase('a')); // 判断是否是小写字母

  System.out.println(Character.isWhitespace('a')); // 判断是否是空格
  System.out.println(Character.toUpperCase('a')); // 转成大写字母
  System.out.println(Character.toLowerCase('A')); // 转成小写字母
}
```

### String
1. String 对象用于保存字符串，也就是一组字符序列
2. 字符串常量对象是用双引号括起的字符序列。例如："Hello"
3. 字符串的字符使用 unicode 字符编码，一个字符（不区分字母还是汉字）对应两个字节
4. String 类较常用的构造方法
```java
String s1 = new String(); 
String s2 = new String(String original); 
String s3 = new String(char[] a);
String s4 = new String(char[] a, int startIndex, int count);
```
5. String 类 实现了接口 Serializable 【String 可以串行化：可以在网络传输】、接口Comparable【String 对象可以比较大小】
6. String 是 final 类，不能被其他的类继承
7. String 有属性 prIvate final char value[]；用于存放字符串内容
8. 一定要注意：value 是一个 final 类型，不可以修改(指的是地址不能修改，但是地址指向的内容可以修改)：即value不能指向新的地址，但是单个字符内容是可以变化

#### 创建String对象的两种方式
1. 直接赋值 String s = "hello"
  - 先从常量池查看是否有"hello"这个数据空间，如果有，则直接指向；如果没有则重新创建，然后指向。s最终指向的是常量池的空间地址
2. 调用构造器 String s = new String("hello")
  - 先在堆中创建空间，里面维护了value属性，指出常量池的”hello“空间。如果常量池没有”hello“，则重新创建，如果有，直接通过value指向。最终指向的是堆中的空间地址。