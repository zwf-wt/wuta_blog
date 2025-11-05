# 集合
## 集合的理解和好处
> 数组的不足之处
1. 长度开始时必须指定，而且一旦指定，不能更改
2. 保存的必须为同一类型的元素
3. 使用数组进行增加/删除元素时，比较麻烦
```java
Person [] pers = new Person[1]; // 大小是1
pers[o] = new Person();

// 添加元素
Person[] pers2 = new Person[pers.length + 1]; // 新创建数组
for() {} // 拷贝
pers2[per2.length - 1] = new Person(); // 添加新元素
```
> 集合
1. 可以动态保存任意多个对象，使用比较方便！
2. 提供了一系列方便的操作对象的方法：add、remove、set、get等
3. 使用集合添加、删除新元素的效率较高
```java
import java.util.ArrayList;
import java.util.HashMap;

public class Main {
  public static void main(String[] args) {
    /**
     * 1. 集合主要是两组(单列集合，双列集合)
     * 2. Collection 接口有两个重要的子接口 List Set, 他们的实现子类都是单列集合
     * 3. Map 接口的实现子类是 双列集合，存放的 K-V
     *
     * Collection
     * Map
     * */

    ArrayList arrayList = new ArrayList();
    arrayList.add("jack");
    arrayList.add("tom");

    HashMap hashMap = new HashMap();
    hashMap.put("NO1", "北京");
    hashMap.put("NO2", "上海");

    System.out.println("ArrayList = " + arrayList);
    System.out.println("HashMap = " + hashMap);
  }
}
```
## Collection
### Collection 接口和常用方法
> `public interface Collection<E> extends iterable<E>`

1. (Collection) 实现子类可以存放多个元素，每个元素可以是Ojbect
2. 有些 Collection 的实现类，可以存放重复的元素，有些不可以
3. 有些 Collection 的实现类，有些是有序的(List), 有些不是有序(Set)
4. Collection 接口没有直接的实现子类，是通过它的子接口 Set 和 List 来实现的
```java
/**
 * Collection 接口和常用方法
 * 1. add: 添加单个元素
 * 2. remove: 删除指定元素
 * 3. contains: 查找指定元素是否存在
 * 4. size: 获取元素个数
 * 5. isEmpty: 判断是否为空
 * 6. clear: 清空
 * 7. addAll: 添加多个元素
 * 8. containsAll: 查找多个元素是否存在
 * 9. removeAll: 删除多个元素
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class Main {
  public static void main(String[] args) {
    List list = new ArrayList();

    // 添加单个元素
    list.add("jack");
    list.add(10);
    list.add(new Integer(10));
    list.add(true);
    System.out.println("list = " + list);

    // 删除指定元素
    list.remove(0);
    list.remove(true);
    System.out.println("list = " + list);

    // contains: 查找元素是否存在
    Boolean flag = list.contains("jack"); // false
    System.out.println("jack 是否存在 " + flag);

    // 获取元素个数
    System.out.println("元素个数：" + list.size()); // 2

    // 判断是否为空
    System.out.println("元素是否为空：" + list.isEmpty()); // false

    // 清空
    list.clear();
    System.out.println("list = " + list); // []

    // 添加多个元素
    ArrayList list2 = new ArrayList();
    list2.add("红楼梦");
    list2.add("三国演义");
    list.add(list2);
    System.out.println("list = " + list);

    // 删除多个元素
    list.add("聊斋");
    list.removeAll(list2);
    System.out.println("list = " + list);
  }
}
```
### Collection 遍历方式
#### 1. 使用迭代器(Iterator)
1. Inerator 对象称为迭代器，主要用于遍历 Collection 集合中的元素。
2. 所有实现了Collection接口的集合类都有一个 iterator() 方法，用以返回一个实现了 Iterator 接口的对象。即可以返回一个迭代器
3. Iterator 仅用于遍历集合，本身并不提供存储集合元素的功能，即 Iterator 本身并不具备 add()、remove() 方法。
```java
Iterator iterator = coll.iterator(); // 得到一个集合的迭代器
// hasNext(): 判断是否还有下一个元素
while (iterator.hasNext()) {
  // next(): 1. 指针下移，将下称以后集合位置上的元素返回
  System.out.println(iterator.next());
}
```
#### Iterator 接口的方法
```java
/**
 * hasNext(): 判断是否还有下一个元素
 * next(): 指针下移，将下称以后集合位置上的元素返回
 * remove(): 删除集合中当前指针指向的元素
 * 
 * 注意：在调用it.next()方法之前，必须要调用it.hasNext()进行判断，若不判断，且下标越界，会抛出NoSuchElementException
 */
```
#### 使用迭代器遍历
```java
import java.util.*;


public class Main {
    public static void main(String[] args) {
        Collection col = new ArrayList();

        col.add(new Book("三国演义", "罗贯中", 10.1));
        col.add(new Book("小李飞刀", "古龙", 5.1));
        col.add(new Book("红楼梦", "曹雪芹", 34.6));

        System.out.println("col = " + col);

        // 1. 先得到 col 对应的迭代器
        Iterator iterator = col.iterator();

        // 2. 使用while循环遍历
        while(iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println("obj = " + obj);
        }

        // 3. 当退出 while 循环后，这时 iterator 迭代器，指向最后的元素
        // iterator.next(); // 当运行这条语句时，会报 NoSuchElementException
        // 4. 如果希望再次遍历，需要重置我们的迭代器
        iterator = col.iterator();
        System.out.println(" = 第二次遍历 = ");
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println(" obj = " + obj);
        }
    }
}

class Book {
    private String name;
    private String author;
    private double price;

    public Book(String name, String author, double price) {
        this.name = name;
        this.author = author;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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
                ", author='" + author + '\'' +
                ", price=" + price +
                '}';
    }
}
```
#### 使用增强for循环
增强for循环，可以代替 iterator 迭代器，特点：增强for循环就是简化版的iterator, 本质一样，只能用于遍历集合或数组
```java
/**
 * for (元素类型 元素名: 集合名或数组名) {
 *   // 操作元素名, 访问元素
 * }
 */

import java.util.*;


public class Main {
    public static void main(String[] args) {
        Collection col = new ArrayList();

        col.add(new Book("三国演义", "罗贯中", 10.1));
        col.add(new Book("小李飞刀", "古龙", 5.1));
        col.add(new Book("红楼梦", "曹雪芹", 34.6));

        System.out.println("col = " + col);

        /**
         * 1. 使用增强for, 在Collection 集合
         * 2. 增强for，底层仍然是迭代器
         * 3. 增强for可以理解成就是简化版本的迭代器遍历
         * */
        for (Object book: col) {
            System.out.println("book = " + book);
        }

        // 增强 for 循环, 也可以直接在数组中使用
        int[] nums = {1, 8, 10, 90};
        for (int i: nums) {
            System.out.println("i = " + i);
        }
    }
}

class Book {
    private String name;
    private String author;
    private double price;

    public Book(String name, String author, double price) {
        this.name = name;
        this.author = author;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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
                ", author='" + author + '\'' +
                ", price=" + price +
                '}';
    }
}
```
#### collection 接口和常用方法
```java
/**
 * 1. 创建 3 个Dog{name,age}对象，添加到ArrayList集合中，赋给 List 引用
 * 2. 用迭代器和增强for 循环两种方式来遍历
 * 3. 重写 Dog 的 toString 方法，输出 name 和 age
 */

import java.util.*;


public class Main {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add(new Dog("小黑", 3));
        list.add(new Dog("大黄", 100));
        list.add(new Dog("大壮", 8));
        System.out.println("list = " + list);

        System.out.println("使用for循环");
        // 先使用for增强
        for (Object dog: list) {
            System.out.println("dog = " + dog);
        }

        System.out.println("使用迭代器循环");
        // 使用迭代器
        Iterator iterator = list.iterator();

        while (iterator.hasNext()) {
            Object dog = iterator.next();
            System.out.println("dog = " + dog);
        }

    }
}

class Dog {
    private String name;
    private int age;

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```
## List
### List基本介绍
> List 接口是Collection接口的子接口
1. List 集合类中元素有序(即添加顺序和取出顺序一致),并且可重复
2. List 集合中的每个元素都有其对应的顺序索引, 即支持索引。
3. List 容器中的元素都对应一个整数型的序号记载其中容器中的位置，可以根据序号存取容器中的元素。
```java
import java.util.*;


public class Main {
    public static void main(String[] args) {
        // 1. List 集合类中元素有序(即添加顺序和取出顺序一致)、且可重复
        List list = new ArrayList();
        list.add("jack");
        list.add("tom");
        list.add("mary");
        list.add("zhangsan");
        list.add("tom");
        System.out.println("list = " + list);
        // 2. List集合中的每个元素都有其对应的顺序索引，即支持索引，索引是从0开始的
        System.out.println(list.get(3));
        // 3. List容器中的元素都对应一个整数型的序号记载其中容器中的位置，可以根据序号存取容器中的元素
        System.out.println(list.indexOf("tom"));
    }
}

```
### List常用方法
```java
import java.util.*;


public class Main {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add("张三丰");
        list.add("贾宝玉");

        /**
         * void add(int index, Object ele): 在 index 位置插入ele元素
         *
         * */
        list.add(1, "张三"); // 在 index = 1的位置插入一个对象
        System.out.println("list = " + list); // list = [张三丰, 张三, 贾宝玉]

        // boolean addAll(int index, Collection eles): 从 index 位置开始将 ele 中的所有元素添加进来
        List list2 = new ArrayList();
        list2.add("jact");
        list2.add("tom");
        list.addAll(1, list2);
        System.out.println("list = " + list); // list = [张三丰, jact, tom, 张三, 贾宝玉]

        // Object get(int index): 获取指定 index 位置的元素
        System.out.println("index 为 1的元素是：" + (list.get(1))); // index 为 1的元素是：jact

        // int indexOf(Object obj): 返回obj在集合中首次出现的位置
        System.out.println(list.indexOf("tom")); // 2

        // int lastIndexOf(Object obj): 返回 obj 在当前集合中末次出现的位置
        list.add("张三丰");
        System.out.println(list.lastIndexOf("张三丰")); // 5

        // Object remove(int index): 移除指定index位置的元素，并返回此元素
        list.remove(0);
        System.out.println("list = " + list); // list = [jact, tom, 张三, 贾宝玉, 张三丰]
        // Object set(int index, Object.ele): 设置指定index位置的元素为 ele, 相当于是替换
        list.set(1, "李四");
        System.out.println("list = " + list);
        // List subList(int fromIndex, int toIndex): 返回从fromIndex到toIndex位置的子集合 [fromIndex, toIndex)
        List list3 = list.subList(0, 2);
        System.out.println("list = " + list3); // list = [jact, 李四]
    }
}
```
```java
import java.util.*;


public class Main {
    public static void main(String[] args) {
        /**
         * 添加 10 个以上的元素(比如 String "张三"),
         * 在2号位插入一个元素“李四”,
         * 获得第5个元素，
         * 删除第6个元素，
         * 修改第7个声乐系。
         * 使用迭代器遍历集合
         * */
        List list = new ArrayList();
        for(int i = 0; i < 12; i++) {
            list.add("张三 " + i);
        }

        System.out.println("list = " + list); // [张三 0, 张三 1, 张三 2, 张三 3, 张三 4, 张三 5, 张三 6, 张三 7, 张三 8, 张三 9, 张三 10, 张三 11]

        // 在 2 号位插入一个元素 "李四"
        list.add(1, "李四");
        System.out.println(list); // [张三 0, 李四, 张三 1, 张三 2, 张三 3, 张三 4, 张三 5, 张三 6, 张三 7, 张三 8, 张三 9, 张三 10, 张三 11]

        // 获得第 5 个元素
        System.out.println("第五个元素 = " + list.get(4)); // 第五个元素 = 张三 3

        // 删除第 6 个元素
        list.remove(5);
        System.out.println("list = " + list ); // list = [张三 0, 李四, 张三 1, 张三 2, 张三 3, 张三 5, 张三 6, 张三 7, 张三 8, 张三 9, 张三 10, 张三 11]

        // 修改第7个元素
        list.set(6, "三国演义");
        System.out.println("list = " + list); // list = [张三 0, 李四, 张三 1, 张三 2, 张三 3, 张三 5, 三国演义, 张三 7, 张三 8, 张三 9, 张三 10, 张三 11]

        // 在使用迭代器遍历集合
        Iterator iterator = list.iterator();
        while(iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println("obj = " + obj);
        }
    }
}

```
### List的有三种遍历方式
```java
import java.util.*;


public class Main {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add("jack");
        list.add("tom");
        list.add("鱼香肉丝");
        list.add("张三");

        // 1. 使用迭代器遍历
        Iterator iterator = list.iterator();
        while(iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println(obj);
        }

        // 2. 使用增强 for 循环
        System.out.println();
        for (Object o: list) {
            System.out.println("o = " + o);
        }

        // 3. 使用普通 for
        System.out.println();
        for (int i = 0; i < list.size(); i++) {
            Object obj = list.get(i);
            System.out.println(obj);
        }
    }
}

```
### 练习
```java
/**
 * 使用 List 的实现类添加三本图书，并遍历
 * 1. 按价格排序，从低到高
 */
import java.util.*;


public class Main {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add(new Book("红楼梦", "曹雪芹", 100));
        list.add(new Book("西游记", "吴承恩", 500));
        list.add(new Book("水浒传", "罗贯中", 8));
        list.add(new Book("三国演义", "放耐庵", 90));

        for (Object o: list) {
            System.out.println("o = " + o);
        }

        // 冒泡排序
        sort(list);
        System.out.println("排序后");

        for (Object o: list) {
            System.out.println("o = " + o);
        }
    }

    public static void sort(List list) {
        int listSize = list.size();
        for (int i = 0; i < listSize - 1; i++) {
            for (int j = 0; j < listSize - 1 - i; j++) {
                Book book1 = (Book) list.get(j);
                Book book2 = (Book) list.get(j + 1);

                if (book1.getPrice() > book2.getPrice()) {
                    list.set(j, book2);
                    list.set(j + 1, book1);
                }
            }
        }
    }
}


class Book {
    private String name;
    private String author;
    private double price;

    public Book(String name, String author, double price) {
        this.name = name;
        this.author = author;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
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
                ", author='" + author + '\'' +
                ", price=" + price +
                '}';
    }
}

```
### ArrayList的注意事项
1. `permits all elements`, `including null`, `ArrayList` 可以加入 `null` 元素, 并且多个
2. `ArrayList` 是由数组来实现数据存储的
3. `ArrayList` 基本等同于 `Vector`, 除了`ArrayList` 是线程不安全(执行效率高)，在多线程情况下不建议使用，`Vector` 是线程安全的
```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        /**
         * ArrayList 是线程不安全的，没有 synchronized
         * public boolean add(E e) {
         *     ensureCapacityInternal(size + 1) // Increments modCount!!
         *     elementData[size++] = e;
         *     return true;
         * }
         * */
        ArrayList arrayList = new ArrayList();
        arrayList.add(null);
        arrayList.add("hello");
        arrayList.add(null);
        System.out.println(arrayList);
    }
}
```
#### ArrayList源码分析
1. `ArrayList` 中维护了一个`Object` 类型的数组 `elementData`
2. 当创建对象时，如果使用的是无参构造器，则初始 `elementData` 容量为0
3. 当添加对象时: 先判断是否需要扩容，如果需要扩容，则调用 `grow()` 方法进行扩容， 否则直接添加元素到合适位置
4. 如果使用的是无参构造器，如果第一次添加，需要扩容的话，则扩容`elementData`为10， 如果需要再次扩容的话，则扩容`elementData`为1.5倍
5. 如果使用的是指定容量`capacity`的构造器，则初始`elementData`容量为`capacity`
6. 如果使用的是指定容量`capacity`的构造器，如果需要扩容的话，则扩容`elementData`为1.5倍
### Vector
```java
/**
 * public class Vector<E>
 * extends AbstractList<E> 
 * implements List<E>, RandomAccess, Cloneable, java.io.Serializable
 * 
 * Vector 底层也是一个对象数组，protected Object[] elementData;
 * 
 * Vector 是线程同步的，即线程安全，Vector类的操作方法带有synchronized
 * public synchronized E get(int index) {
 *   if (index >= elementCount) {
 *     throw new ArrayIndexOutOfBoundsException(index);
 *   }
 * 
 *    return elementData(index);
 * }
 * 
 * 在开发中，需要线程同步安全操作时，用Vector
 */
```
### Vector和ArrayList的区别
||底层结构|版本|线程安全(同步)效率|扩容倍数|
|-----|-----|-----|-----|-----|
|ArrayList|可变数组|jdk1.2|不安全，效率高|如果有参构造1.5倍。如果是无参，第一次10，从第二次开始安1.5扩容|
|Vector|可变数组|jdk1.0|安全，效率不高|如果是无参，默认10，满后，就按2倍扩容。如果指定大小，则每次直接按2倍速扩|

```java
import java.util.*;


public class Main {
    public static void main(String[] args) {
        // 无参构造器
        Vector vector = new Vector();
        for(int i = 0; i < 10; i++) {
            vector.add(i);
        }

        System.out.println(vector);
    }


    /**
     * 1. new Vector() 底层
     * public Vector() {
     *   this(10);
     * }
     * 如果是 Vector vector = new Vector(20); 底层运行的方法是
     * public Vector(int initialCapacity) {
     *   this(initialCapacity, 0);
     * }
     * 
     * 
     * 2. vector.add(i)
     * 2.1 下面这个方法就是添加数据到 Vector 集合
     * public synchronized boolean add(E e) {
     *   modCount++;
     *   ensureCapacityHelper(elementCount + 1);
     *   elementData[elementCount++] = e;
     *   return true;
     * }
     * 
     * 2.2 确定是否需要扩容 条件： minCapacity - elementData.length > 0
     * private void ensureCapacityHelper(int minCapacity) {
     *   // overflow-conscious code
     *   if (minCapacity - elementData.length > 0)
     *     grow(minCapacity);
     * }
     * 
     * 2.3 如果需要的数组大小不够用，就扩容，扩容的算法
     * int newCapacity = oldCapacity + ((capacityIncrement > 0) ?
     *                                  capacityIncrement : oldCapacity);
     * 就是扩容2倍
     * private void grow(int minCapacity) {
     *   // overflow-conscious code
     *   int oldCapacity = elementData.length;
     *   int newCapacity = oldCapacity + ((capacityIncrement > 0) ?
     *                                  capacityIncrement : oldCapacity);
     *   if (newCapacity - minCapacity < 0)
     *     newCapacity = minCapacity;
     *   if (newCapacity - MAX_ARRAY_SIZE > 0)
     *     newCapacity = hugeCapacity(minCapacity);
     *   elementData = Arrays.copyOf(elementData, newCapacity);
     * }
     */
}
```
### LinkedList
1. LinkedList 实现了双向链表和双端队列特点
2. 可以添加任意元素(元素可以重复)，包括null
3. 线程不安全，没有实现同步
#### LinkedList 底层结构
1. LinkedList底层维护了一个双向链表
2. LinkedList中维护了两个属性first和last，分别指向链表的第一个元素和最后一个元素
3. 每个节点（Node对象）对象，里面又维护了prev、next、item三个属性，其中通过prev指向前一个元素，通过next指向后一个元素，最终实现双向链表
4. LinkedList的元素添加与删除，不是通过一个一个添加删除的，而是通过头指针与尾指针操作的

```java
// 模拟一个简单的双向链表
import java.util.*;


public class Main {
    public static void main(String[] args) {
        // 模拟一个简单的双向链表
        Node jack = new Node("jack");
        Node tom = new Node("tom");
        Node momo = new Node("momo");

        // 连接三个结点，形成双向
        // jack -> tom -> momo
        jack.next = tom;
        tom.next = momo;

        // momo -> tom -> jack
        momo.prev = tom;
        tom.prev = jack;

        Node first = jack; // 让 first 引用指向jack, 就是双向链表的头结点
        Node last = momo; // 让 last 引用指向 momo, 就是双向链表的尾结点

        System.out.println("------ 从头到尾进行遍历 ------");
        while (true) {
            if (first == null) {
                break;
            }

            // 输出 first 信息
            System.out.println(first);

            first = first.next;
        }

        System.out.println("------ 从尾到头进行遍历 ------");
        while (true) {
            if (last == null) {
                break;
            }

            // 输出 last 信息
            System.out.println(last);

            last = last.prev;
        }

        // 添加数据
        Node smith = new Node("smith");

        smith.next = momo;
        smith.prev = tom;
        momo.prev = smith;
        tom.next = smith;
        first = jack;
        System.out.println("添加 smith 之后, 从头到尾进行遍历 ");
        while (true) {
            if (first == null) {
                break;
            }

            // 输出 first 信息
            System.out.println(first);

            first = first.next;
        }

        last = momo;
        System.out.println("------ 添加 smith 之后, 从尾到头进行遍历 ------");
        while (true) {
            if (last == null) {
                break;
            }

            // 输出 last 信息
            System.out.println(last);

            last = last.prev;
        }
    }


}

// 定义一个Node类，Node对象表示双向链表的一个结点
class Node {
    public Object item;
    public Node next;
    public Node prev;

    public Node(Object name) {
        this.item = name;
    }

    @Override
    public String toString() {
        return "Node name = " + item;
    }
}


```
```java
// LinkedList的增删改查案例

import java.util.*;


public class Main {
    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        linkedList.add(1);

        System.out.println("linkedList = " + linkedList);
        /**
         * 1. LinkedList linkedList = new LinkedList();
         *    public LinkedList() {}
         * 2. 这时 linkedList 的属性 first = null last = null
         * 3. 执行添加
         *    public boolean add(E e) {
         *        linkLast(e);
         *        return true;
         *    }
         * 4. 将新的结点，加入到双向链表的最后
         *    void linkLast(E e) {
         *      final Node<E> l = last;
         *      final Node<E> newNode = new Node<>(e, null, l);
         *      last = newNode;
         *      if (l == null)
         *        first = newNode;
         *      else
         *        l.next = newNode;
         *      size++;
         *      modCount++;
         * }
         
         * */

        linkedList.remove(); // 这是默认删除的是第一个结点
        souttln("linkedList = " + linkedList);
        /**
         * 1. 执行 remove
         * public E remove() {
         *      return removeFirst();
         * }
         * 2. 执行 removeFirst
         * public E removeFirst() {
         *    final Node<E> f = first;
         *    if (f == null)
         *        throw new NoSuchElementException();
         *    return unlinkFirst(f);
         * }
         * 3. 执行 unlinkFirst, 将 f 指向的结点从链表中删除
         * private E unlinkFirst(Node<E> f) {
         *    // assert f == first && f != null;
         *    final E element = f.item;
         *    final Node<E> next = f.next;
         *    f.item = null;
         *    f.next = null; // help GC
         *    first = next;
         *    if (next == null)
         *        last = null;
         *    else
         *        next.prev = null;
         *    size--;
         *    modCount++;
         *    return element;
         * }
         */

        // 修改某个结点对象
        linkedList.set(1, "aaa");
        System.out.println("linkedList = " + linkedList);

        // 得到某个结点对象
        // get(1) 是得到双向链表的第二个对象
        Object o = linkedList.get(1);
        System.out.println("o = " + o);


        // 因为LinkedList 实现了List 接口
        System.out.println("====== LinkedList 遍历迭代器 ======")
        Iterator iterator = linkedList.iterator();
        while (iterator.hasNext()) {
            Object next = iterator.next();
            System.out.println("next = " + next);
        }

        System.out.println("====== LinkedList 遍历增强for ======");
        for (Object o1 : linkedList) {
            System.out.println("o1 = " + o1);
        }

        System.out.println("====== LinkedList 遍历普通for ======");
        for (int i = 0; i < linkedList.size(); i++) {
            System.out.println(linkedList.get(i));
        }
    }


}

```
#### ArrayList 和 LinkedList 的区别
||底层结构|增删的效率|改查的效率|
|---|---|---|---|
|ArrayList|可变数组|较低，数组扩容|较高|
|LinkedList|双向链表|较高，通过链表追加|较低|

> 如何选择ArrayList 和 LinkedList
1. 如果查询操作比较多，使用ArrayList
2. 如果增删操作比较多，使用LinkedList
3. 一般来说，在程序中，80%都是查询，因此大部分情况下会选择ArrayList
4. 在一个项目中，根据业务灵活选择，也可能这样，一个模块使用的是ArrayList，另一个模块使用的是LinkedList

## Set
### 基本介绍
1. 无序(添加和取出的顺序不一致)，没有索引
2. 不允许重复元素，最多包含一个null
### Set接口常用方法
和List 接口一样，Set 接口也是Collection 接口的子接口，因此Set 接口也拥有Collection 接口中的全部方法
### Set 接口的遍历方式
同 Collection 接口一样，Set 接口也是Collection 接口的子接口，因此Set 接口也拥有Collection 接口中的全部方法，所以Set 接口的遍历方式同Collection 接口一样
1. 可以使用迭代器
2. 增强for
3. 不能使用索引的方式来获取
### 案例
```java
import java.util.*;


public class Main {
    public static void main(String[] args) {
        // 1. 以 set 接口的实现类 HashSet 来讲解Set 接口的方法
        // 2. set 接口的实现类的对象(Set接口对象)，不能存放重复的元素，可以添加一个null
        // 3. set 接口对象存放数据是无序(即添加的顺序和取出的顺序不一致)
        // 4. 注意：取出的顺序虽然不是添加的顺序，但是他是固定的
        Set set = new HashSet();
        set.add("john");
        set.add("lucy");
        set.add("john");
        set.add("jack");
        set.add(null);
        set.add(null);

        System.out.println("set = " + set);
        // 遍历
        System.out.println("========= 使用迭代器 =========");
        Iterator iterator = set.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println("obj = " + obj);
        }
        System.out.println("========= 使用增强for =========");
        for(Object o: set) {
            System.out.println("o = " + o);
        }
    }
}

```
### HashSet介绍
1. HashSet 实现了Set接口
2. HashSet实际上是HashMap的Key集合
```java
public HashSet() {
    map = new HashMap<>();
}
```
3. 可以存放null值，但是只能有一个null
4. HashSet不保证元素是有序的，即不保证存储和取出的元素顺序一致。取决于hash后，再确定索引的结果
5. 不能有重复元素，如果有重复元素，后面的元素无法添加成功

#### HashSet案例
```java
import java.util.*;


public class Main {
    public static void main(String[] args) {
        HashSet set = new HashSet();

        // 1. 在执行add方法后，会返回一个 boolean 值
        // 2. 如果添加成功，返回true, 否则返回false
        // 3. 可以通过 remove 指定删除哪个对象
        System.out.println(set.add("john")); // T
        System.out.println(set.add("lucy")); // T
        System.out.println(set.add("john")); // F
        System.out.println(set.add("jack")); // T
        System.out.println(set.add("Rose")); // T
        System.out.println("set = " + set);
        set.remove("john");
        System.out.println("set = " + set);

        set = new HashSet();
        System.out.println("set = " + set);
        // 4. HashSet 不能添加相同的元素/数据
        set.add("lucy"); // 添加成功
        set.add("lucy"); // 添加失败
        set.add(new Dog("tom")); // 添加成功
        set.add(new Dog("tom")); // 添加成功
        System.out.println("set = " + set);

        set.add(new String("zhangsan")); // 加入成功
        set.add(new String("zhangsan")); // 加入不了
        System.out.println("set = " + set);

    }
}

class Dog {
    private String name;

    public Dog(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

```java
// 使用HashSet 实现简单的数组 + 链表结构
public class HashSetStructure {
    public static void main(String[] args) {
        // 模拟一个HashSet的底层(HashMap)
        // 1. 创建一个数组，数组的类型是Node[]
        // 2. 也可以反Node[] 数组称为 表
        Node[] table = new Node[16];
        System.out.println("table = " + table);

        // 3. 创建结点
        Node john = new Node("John", null);

        table[2] = john;
        Node jack = new Node("jack", null);
        john.next = jack; // 将 jack 结点挂载到 john
        Node rose = new Node("Rose", null);
        jack.next = rose; // 将 rose 结点挂载下 jack
        System.out.println("table = " + table);

        Node lucy = new Node("lucy", null);
        table[3] = lucy; // 把lucy放到table表的索引为3的位置
        System.out.println("table = " + table);
    }
}


class Node { // 结点，存储数据，可以指向下一个结点，从而形成链表
    Object item; // 存放数据
    Node next; // 指向下一个结点

    public Node(Object item, Node next) {
        this.item = item;
        this.next = next;
    }

    @Override
    public String toString() {
        return "Node{" +
                "item=" + item +
                ", next=" + next +
                '}';
    }
}
```
#### HashSet 底层机制说明
1. HashSet 底层是 HashMap
2. 添加一个元素时，先得到hash值，会转成 -> 索引值
3. 找到存储数据表 table, 看这个索引位置是否已经存放的有元素
4. 如果没有，直接加入
5. 如果有，调用 equals() 方法比较，如果相同，则不加入，不相同，则加入最后
6. 在 Java8 中，如果一条链表的元素个数超过 TREEIFY_THRESHOLD(默认是 8 )，并且 table 的大小 >= MIN_TREEIFY_CAPACITY(默认是 64)，就会把链表转换成红黑树
```java
public class HashSetSource {
    public static void miain(String[] args) {
        HashSet set = new HashSet();
        set.add("Tom");
        set.add("Jerry");
        set.add("Jack");
        System.out.println("set = " + set);
    }
    /**
     * 1. 执行 HashSet()
     *    public HashSet() {
     *         map = new HashMap<>();
     *    }
     * 2. 执行 add()
     *    public boolean add(E e) { // e = "Tom"
     *      return map.put(e, PRESENT)==null; // (static) PRESENT = new Object();
     *    }
     * 3. 执行 put(), 该方法会执行 hash(key) 得到key对应的hash值， 算法 h = key.hashCode() ^ (h >>> 16);
     *    public V put(K key, V value) { // key = "Tom", value = PRESENT 共享
     *        return putVal(hash(key), key, value, false, true);
     *    }
     * 4. 执行 putVal()
     *    final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
     *        Node<K,V>[] tab; Node<K,V> p; int n, i; // 定义了辅助变量
     *        // table 就是 HashMap 的一个数组，类型是 Node[]
     *        // if 语句表示如果当前table 是 null， 或者 length = 0， 就调用 resize() 方法初始化，表示第一次扩容， 16个空间
     *        if ((tab = table) == null || (n = tab.length) == 0)
     *            n = (tab = resize()).length;
     *        // 根据 key, 得到 hash 去计算该 key 应该存放到 table 表的哪个索引位置，并把这个位置的值 赋给 p
     *        // 2. 判断 p 是否为 null
     *        // 2.1 如果 p 为 null, 表示 还没有存放元素，就创建一个Node(key = "Tom", value = PRESENT)
     *        // 2.2 就放在该位置 tab[i] = newNode(hash, key, value, null);
     *        if ((p = tab[i = (n - 1) & hash]) == null)
     *            tab[i] = newNode(hash, key, value, null);
     *        else {
     *            Node<K,V> e; K k;
     *            // 如果当前索引位置对应的链表的第一个元素和准备添加的key的hash值一样，并且满足下面两个条件之一
     *            // 1. 准备加入的Key和 p 指向的 Node 结点的 key 是同一个引用，也就是两个 key 是同一个对象
     *            // 2. p 指向的 Node 结点的 key 的 equals() 和准备加入的 key 相等
     *            // 那么就不加入
     *            if (p.hash == hash &&
     *                ((k = p.key) == key || (key != null && key.equals(k))))
     *                e = p;
     *            // 如果不相同，则判断 p 是不是红黑树结点，如果是红黑树结点，则通过红黑树的方式插入(putTreeVal)
     *            else if (p instanceof TreeNode)
     *                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
     *            else {
     *                // 如果 table 对应的索引位置，已经是一个链接，就使用 for 循环比较
     *                // 1. 依次和该链表的每一个元素比较后，都不相同，则加入到该链表的最后
     *                      注意在把元素添加到链表后，立即判断，该链表是否已经达到8个结点，就调用 treeifyBin() 对链表进行树化(转成红黑树)
     *                      注意，在转成红黑树时，要进行判断，判断条件
     *                      if (tab == null || (n == tab.length)  < MIN_TREEIFY_CAPACITY) { // MIN_TREEIFY_CAPACITY = 64
     *                          resize();
     *                      }
     *                      如果上面条件成立，先table扩容，只有上面条件不成立，才进行转成红黑树
     *                // 2. 在比较时，如果有相同情况，就直接break
     *                for (int binCount = 0; ; ++binCount) {
     *                    if ((e = p.next) == null) {
     *                        p.next = newNode(hash, key, value, null);
     *                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 的原因和树化有关
     *                            treeifyBin(tab, hash);
     *                        break;
     *                    }
     *                    if (e.hash == hash &&
     *                        ((k = e.key) == key || (key != null && key.equals(k))))
     *                        break;
     *                    p = e;
     }
     }
         
     }

     }

     */
}
```
#### HashSet 的扩容和转成红黑树机制
1. HashSet 底层是HashMap, 第一次添加时，table 数组扩容到16，临界值(threshold)是16*0.75(加载因子，loadFactor)=12，
2. 如果table数组中的元素个数超过临界值，就会进行扩容，扩容为原来的两倍32(16 * 2)，扩容后，阈值(threshold)变为24(32*0.75)，依次类推
3. 在Java8 中，如果一条链表的元素个数到达TREEIFY_THRESHOLD(默认是8)个，并且table的大小 >= MIN_TREEIFY_CAPACITY(默认是64)，就会进行树化(红黑树)，否则仍然采用数组扩容机制
```java
public class HashSetIncrement {
    public static void main(String[] args) {
        /**
         * HashSet 底层是HashMap, 第一次添加时，table 数组扩容到16，临界值(threshold)是16*0.75(加载因子，loadFactor)=12，
         * 如果table数组中的元素个数超过临界值，就会进行扩容，扩容为原来的两倍32(16 * 2)，扩容后，阈值(threshold)变为24(32*0.75)，依次类推
         * */ 
        HashSet hashSet = new HashSet();
        for (int i = 1; i <= 100; i++) {
            hashSet.add(i);
        }

        /**
         * 在Java8 中，如果一条链表的元素个数到达TREEIFY_THRESHOLD(默认是8)个，
         * 并且table的大小 >= MIN_TREEIFY_CAPACITY(默认是64)，就会进行树化(红黑树)，
         * 否则仍然采用数组扩容机制
         */
        for (int i = 1; i <= 12; i++) {
            hashSet.add(new A(i));
        }
        System.out.println("hashSet = " + hashSet);

        for (int i = 1; i <= 7; i++) { // 在table的某一个链表上添加了 7 个元素
            hashSet.add(new A(i));
        }
        for (int i = 1; i <= 7; i++) { // 在table的另外一个链表上添加了 7 个元素
            hashSet.add(new B(i));
        }
        // 这两条链表上的元素个数相加到达了64个，那么就会进行树化

    }
}

class B {
    private int n;

    public B(int n) {
        this.n = n;
    }

    public int hashCode() {
        return 200;
    }
}
class A {
    private int n;

    public A(int n) {
        this.n = n;
    }

    public int hashCode() {
        return 100;
    }
}
```
#### HaseSet 练习
```java

/**
 * 定义一个Employee 类，该类包含：private 成员变量 name, age 要求：
 * 1. 创建3个Employee 放入 HashSet 中
 * 2. 当 name 和 age 相同时，认为是相同员工，不能添加到 HashSet 中
 */

import java.util.HashSet;
import java.util.Objects;

public class HashTest {
    public static void main(String[] args) {
        HashSet hashSet = new HashSet();
        hashSet.add(new Employee("milan", 10));
        hashSet.add(new Employee("smith", 20));
        hashSet.add(new Employee("milan", 10));
        System.out.println(hashSet); // 这三个对象是不同的对象，所以会添加成功

        HashSet hashSet2 = new HashSet();
        hashSet2.add(new Employee2("milan", 10));
        hashSet2.add(new Employee2("smith", 20));
        hashSet2.add(new Employee2("milan", 10));
        // 因为 Employee2 重写了 equals 和 hashCode 方法，所以最后一个milan对象不会被添加
        System.out.println(hashSet2); 
    }
}

class Employee {
    private String name;
    private int age;

    public Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }


    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}


class Employee2 {
    private String name;
    private int age;

    public Employee2(String name, int age) {
        this.name = name;
        this.age = age;
    }


    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    // 重写 equeals 和 hasCode 方法：如果name和age值相同，则返回相同的hash值

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee2 employee2 = (Employee2) o;
        return age == employee2.age && Objects.equals(name, employee2.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

/**
 * 定义一个 Employee 类
 * 包含：private 成员属性 name, sal, birthday(MyDate 类型)，其中 birthday 为自定义的类(MyDate)
 * MyDate 类包含: private 成员属性 year, month, day
 * 要求：
 * 1. 创建3个 Employee 放入HashSet中
 * 2. 当 name 和 birthday 的值相同时，认为是相同员工，不能添加到HashSet中
 */
```
#### HashSet 添加元素总结
1. 先获取元素的哈希值(hasCode)方法
2. 对哈希值进行运算，得出一个索引值即为要存放在哈希表中的位置号
3. 如果该位置上没有其他元素，则直接存放。如果该位置上已经有其他元素，则需要进行equals判断，如果相等，则不再添加，如果不相等，则以链表的方式添加
### LinkedHashSet
#### 说明
1. LinkedHashSet 是 HashSet 的子类
2. LinkedHashSet 底层是一个LinkedHashMap,底层维护了一个数组+ 双向链表
3. LinkedHashSet 根据元素的 hashCode 值来决定元素的存储位置，同时合用链表维护元素的次序，这样使得元素看起来是以插入顺序保存的
4. LinkedHashSet 不允许添加重复元素
```java
import java.util.LinkedHashSet;
import java.util.Set;

public class LiskedHashSetSouce {
    public static void main(String[] args) {
        Set set = new LinkedHashSet();
        set.add(new String("AA")); //
        set.add(456);
        set.add(new Customer("刘", 1001));
        set.add(123);
        set.add("zhangsan");


    }
}

class Customer {
    private String name;
    private int no;

    public Customer(String name, int no) {
        this.name = name;
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }
}
/**
 * 1. 在LinkedHashSet中维护了一个hash表和双向链表(LinkedHashSet 有 head 和 tail)
 * 2. 每一个节点有 pre 和 next 属性,可以形成双向链表
 * 3. 在添加一个元素时，先求 hash 值，在求索引，确定该元素在 hashtable的位置，然后将添加的元素加入到双向链表（如果已经存在，不添加，原则和hashset一样）
 *    this.next = newElement // 简单指定
 *    newElement.pre = tail
 *    tail = newElement
 * 4. 这样的话，我们遍历 LinkedHashSet 时，也能确保插入顺序和便利顺利一致
 * 
 * 
 * 1. linkedhashset 加入顺序和取出元素/数据的顺序一致
 * 2. linkedhashset 底层维护的是一个linkedhashmap(是hashmap的子类）
 * 3. linkedhashset底层结构（数组table+双向链表）
 * 4. 添加第一次时，直接将数组table扩容到16,存放的结点类型是linkedhashap$entry
 * 5. 数组是hashmap$node[]存放的元素/数据是linkedhashmap$entry类型
 *    static class Entry<K,V> extends HashMap.Node<K,V> {
 *        Entry<K,V> before, after;
 *        Entry(int hash, K key, V value, Node<K,V> next) {
 *            super(hash, key, value, next);
 *        }
 *    }
 */
```
#### LinkedHashSet 练习
```java
/**
 * Car类(属性：name, price), 如果name和price 一样，
 * 则认为相同元素，不能添加
 */
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

public class LiskedHashSetSouce {
    public static void main(String[] args) {
        LinkedHashSet linkedHashSet = new LinkedHashSet();
        linkedHashSet.add(new Car("奥托", 1000));
        linkedHashSet.add(new Car("奥迪", 2000));
        linkedHashSet.add(new Car("法拉得", 3000));
        linkedHashSet.add(new Car("奥迪", 2000)); // 添加失败
        linkedHashSet.add(new Car("保时捷", 1000));
        linkedHashSet.add(new Car("奥迪", 1000));
        System.out.println(linkedHashSet);
    }
}


class Car {
    private String name;
    private double price;

    public Car(String name, double price) {
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

    // 重写 equqals 和 hashCode 方法
    // 当 name 和 price 相同时，认为两个对象相等, 不会重复添加，返回相同的hashCode值

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Double.compare(price, car.price) == 0 && Objects.equals(name, car.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, price);
    }

    @Override
    public String toString() {
        return "Car{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
```
## Map
#### Map 特点
1. Map 与 Collection 并列存在，用于保存具有映射关系的数据：`key-value`
2. Map 中的 key 和 value 可以是任何引用类型的数据，会封装到HashMap$Node对象中
3. Map 中的 key 不允许重复，原因和HashSet一样
4. Map 中的 value 可以重复
5. Map 中的 key 可以为 null, value 也可以为 null, 注意 key 为 null, 只能有一个，valueo null, 可以有多个
6. 常用String类作为Map的key
7. key 和 value 之间存在单向一对一关系，即通过指定的 key 总能找到对应的 value
8. Map 存放数据的 `key-value`, 一对 k-v 是放在一个 Node 中的，又因为Node 实现了 Entry 接口，有些时候也把一对 k-v 称为一个 Entry
```java
Map map = new HashMap();
map.put("no1", "张三"); // key: no1, value: 张三
map.put("no2", "李四"); // key: no2, value: 李四
map.put("no1", "王五"); // key: no1, value: 王五, 会覆盖原有的 key-value
map.put("no3", "赵六"); // key: no3, value: 赵六
map.put(null, "钱七"); // key: null, value: 钱七
map.put(null, 'abc'); // key: null, value: abc, 会覆盖原有的 key-value
map.put(1, "hello"); // key: 1, value: hello
map.put(new Object(), "world"); // key: new Object(), value: world

// 通过 get 方法，传入 key, 会返回对应的 value
System.out.println(map.get("no1")); // 王五
System.out.println("map = " + map);

Map map = new HashMap();
map.put("no1", "张三"); // key: no1, value: 张三
map.put("no2", "李四"); // key: no2, value: 李四

// 1. k-v 最后是 Hashmap$Node node = new Node(hash,key,value,null)
// 2. k-v为了方便程序员的遍历，还会创建 Entryset集合，该集合存放的元素的类型 Entry,而一个entry
// 对像就有k,v, Entryset<Entry<K, V>>即：transient Set<Map, Entry<K, V>> entryset;
// 3. entrySet中，定义的类型是Map.Entry, 但是实际上存放的还是 HashMap$Node
// 这时因 这时因为HashMap$Node implements Map.entry

Set set = map.entrySet();
System.out.println("set = " + set.getClass()); // HashMap$EntrySet
for (Object entry: set) {
    System.out.println(entry.getClass()); // HashMap$Node

    // 为了从 HashMap$Node 获取 k-v, 需要向下转型
    Map.Entry entry1 = (Map.Entry) entry;
    System.out.println("key = " + entry1.getKey() + ", value = " + entry1.getValue());   
}

Set set1 = map.keySet();
System.out.println("set1 = " + set1.getClass()); // HashSet
Collection values = map.values();
System.out.println("values = " + values.getClass()); // HashMap$Values
```
#### Map 接口常用方法
```java
/**
 * 1. put: 添加
 * 2. remove: 根据键删除映射关系
 * 3. get: 根据键获取值
 * 4. size: 获取键值对个数
 * 5. isEmpty: 判断是否为空
 * 6. clear: 清空
 * 7. containsKey: 判断是否包含某个键
 */
Map map = new HashMap();
map.put("邓超", new Book("", 100)); // 添加
map.put("邓超", "孙俪"); // 修改
map.put("王宝强", "马蓉");
map.put("宋喆", "马蓉");
map.put("刘令博", null);
map.put(null, "刘亦菲");
map.put("鹿晗", "关晓彤");

System.out.println("map = " + map);

// remove: 根据键删除映射关系
map.remove(null);
System.out.println("map = " + map);

// get: 根据键获取值
Object val = map.get("鹿晗");
System.out.println("val = " + val);

// size: 获取键值对个数
System.out.println("size = " + map.size());

// isEmpty: 判断是否为空
System.out.println("isEmpty = " + map.isEmpty());

// clear: 清空
map.clear();
System.out.println("map = " + map);

// containsKey: 判断是否包含某个键
System.out.println("containsKey = " + map.containsKey("王宝强"));

Class Book {
    String name;
    double price;
    public Book(String name, double price) {
        this.name = name;
        this.price = price;
    }
}
```
#### Map 遍历
```java

/**
 * 1. containsKey: 查找键是否存在
 * 2. keySet: 获取所有的键
 * 3. entrySet: 获取所有关系k-v
 * 4. values: 获取所有的值
 */

Map map = new HashMap();
map.put("邓超", new Book("", 100)); // 添加
map.put("邓超", "孙俪"); // 修改
map.put("王宝强", "马蓉");
map.put("宋喆", "马蓉");
map.put("刘令博", null);
map.put(null, "刘亦菲");
map.put("鹿晗", "关晓彤");

// 1. 先取出 所有的键，通过键找值
Set keySet = map.keySet();
// (1) 增强 for
System.out.println("增强 for");
for (Object key : keySet) {
    System.out.println(key + " = " + map.get(key));
}
// (2) 迭代器
System.out.println("迭代器");
Iterator iterator = keySet.iterator();
while (iterator.hasNext()) {
    Object key = iterator.next();
    System.out.println(key + " = " + map.get(key));
}

// 2. 把所有的 values 取出
Collection values = map.values();
// (1). 增强 for
System.out.println("增强 for");
for (Object value : values) {
    System.out.println(value);
}
// (2) 迭代器
System.out.println("迭代器");
Iterator iterator1 = values.iterator();
while (iterator1.hasNext()) {
    Object value = iterator1.next();
    System.out.println(value);
}

// 3. 通过 EntrySet 获取所有的 k-v
Set entrySet = map.entrySet(); // EntrySet<Map.Entry<K, V>>
// (1). 增强 for
System.out.println("增强 for");
for (Object entry : entrySet) {
    // 将 entry 转成 Map.Entry
    Map.Entry entry1 = (Map.Entry) entry;
    System.out.println(entry1.getKey() + " = " + entry1.getValue());
}
// (2) 迭代器
System.out.println("迭代器");
Iterator iterator2 = entrySet.iterator();
while (iterator2.hasNext()) {
    Object entry1 = iterator2.next();
    System.out.println(entry1.getClass()); // HashMap$Node - 实现 Map.Entry
    // 向下转型
    Map.Entry entry2 = (Map.Entry) entry1;
    System.out.println(entry2.getKey() + " = " + entry2.getValue());
}
```
#### Map 练习
```java
/**
 * 使用HashMap 添加 3 个员工对象，要求
 * 键：员工编号
 * 值：员工对象
 * 并遍历显示工资 > 18000的员工(遍历方式最少两种)
 * 员工类：姓名、工资、员尖id
 */

public class MapExercise {
    public static void main(String[] args) {
        Map hashMap = new HashMap();

        // 添加员工
        hashMap.put(1001, new Emp("张三", 28000, 1001));
        hashMap.put(1002, new Emp("李四", 27000, 1002));
        hashMap.put(1003, new Emp("王五", 16000, 1003));

        // 1. 使用keySet -> 增强 for
        Set keySet = hashMap.keySet();
        for (Object key: keySet) {
            // 先获取 key
            Emp emp = (Emp) hashMap.get(key);
            if (emp.getSal() > 18000) {
                System.out.println(emp);
            }
        }

        // 2. 使用EntrySet -> 迭代器
        Set entrySet = hashMap.entrySet();
        System.out.println("==========");
        Iterator iterator = entrySet.iterator();
        while (iterator.hasNext()) {
            Map.Entry entry = (Map.Entry)iterator.next();
            System.out.println(entry.getClass()); // HashMap$Node - 实现 Map.Entry
            // 向下转型 通过 entry 获取 key 和 value
            Emp emp = (Emp) entry.getValue();
            if (emp.getSal() > 18000) {
                System.out.println(emp);
            }
        }
    }
}

class Emp {
    private String name;
    private double sal;
    private int id;

    public Emp(String name, double sal, int id) {
        this.name = name;
        this.sal = sal;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSal() {
        return sal;
    }

    public void setSal(double sal) {
        this.sal = sal;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "name='" + name + '\'' +
                ", sal=" + sal +
                ", id=" + id +
                '}';
    }

}
```
#### HaspMap 小结
1. Map 接口的常用实现类：HashMap、Hashtable 和 Properties.
2. HashMap 是 Map 接口使用频率最高的实现类.
3. HashMap 是以 key-val 对的方式来存储数据
4. key 不能重复，但是值可以重复，即一个 key 只能映射一个值，允许使用 null 键和 null 值
5. 如果添加相同的key, 则会覆盖原来的key-val, 等同于修改.(key不会替换，val会替换)
6. 与HashSet一样，不保证映射的顺序，因为底层是以hash表的方式来存储的
7. HashMap 没有实现同步，因此是线程不安全的。
#### HashMap 的底层实现原理
1. (K-v)是一个Node,实现了`Map.Entry<K,V>`
2. jdk7.0的hashmap 底层实现(数组+链表)， jdk8.0的hashmap 底层实现(数组+链表+红黑树)
3. HashMap底层维护了Node类型的数组 table, 默认为null
4. 当创建对象时，将加载因子(loadFactor)初始化为0.75
5. 当添key-val时，通过key的哈希值得到在table的索引。然后判断该索引处是否有元素，如果没有元素直接添加，如果该索引处有元素，继续判断该元素的key是否和准备加入的
key相等，如果相等，则直接替换val;如果不相等需要判断是树结构还是链表结构，做出相应处理。如果添加时发现容量不够，则需要扩容。
6. 第1次添加，则需要扩容table容量为16,临界值(threshold)为12.
7. 以后再扩容，则需要扩容table容量为原来的2倍，临界值为原来的2倍，即24,依次类推。
8. 在java8中，如果一条链表的元素个数超过 TREEIFY_THRESHOLD(默认是8), 并且table的大小>= MIN_TREEIFY_CAPACITY(默认64),就会进行树化（红黑树）

```java
/**
 * 1. 执行构造器 new HashMap(). 初始化加载因子loadFactor=0.75。HashMap$Node[] table = null
 * 2. 执行 put 调用 hash 方法，让算出 key 的 hash 值。(h = key.hashCode()) ^ (h >>> 16)
 *    public V put(K key, V value) {// K = "java" value = 10
 *        return putVal(hash(key), key, value, false, true);
 *    }
 * 3. 执行 putVal 方法
 *    final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
 *        Node<K,V>[] tab; Node<K,V> p; int n, i; // 辅助变量
 *        // 如果底层的 table 数组为 null, 或者 length = 0, 就扩容到 16
 *        if ((tab = table) == null || (n = tab.length) == 0) {
 *            n = (tab = resize()).length;
 *        }
 *        // 取出 hash 值对应的 table 的索引位置的 Node, 如果为 null, 就直接把加入的 k-v,
 *        // 创建成一个Node, 加入该位置即可。
 *        if ((p = tab[i = (n - 1) & hash]) == null) {
 *            tab[i] = newNode(hash, key, value, null);
 *        } else {
 *            Node<K,V> e; K k; // 辅助变量
 *            // 如果table的索引位置的 key 的 hash 相同和新值的key 的 hash 值相同。
 *            // 并且满足 (table 现有的结点的 key 和准备添加的 key 是同一个对象 或者是 equals 返回值相等)
 *            // 就认为不能加入新的 k-v
 *            if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k)))) {
 *                e = p;
 *            } else if (p instanceof TreeNode) { // 如果当前的 table 的已有的 Node 是红黑树，就按照红黑树的规则来插入 k-v
 *                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
 *            } else {
 *                // 如果找到的结点，后面是链表，就循环比较
 *                for (int binCount = 0; ; ++binCount) { // 循环比较
 *                    if ((e = p.next) == null) { // 如果整个链表，没有和他的 hash 和 key 相同的，就添加到链表的最后
 *                        p.next = newNode(hash, key, value, null);
 *                        if (binCount >= TREEIFY_THRESHOLD - 1) // 如果链表的长度大于等于 8, 并且当前 table 的长度大于等于 64
 *                            treeifyBin(tab, hash); // 把链表转换成红黑树
 *                        break;
 *                    }
 *                    // 如果在链表中找到了和要插入的 key 相同的 key, 就认为不能加入新的 k-v
 *                    // 如果在循环比较过程中，发现有相同，就break, 就只是替换 value
 *                    if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
 *                        break;
 *                    p = e;
 *                }
 *             }
 *            if (e != null) { // existing mapping for key
 *                V oldValue = e.value;
 *                if (!onlyIfAbsent || oldValue == null)
 *                    e.value = value; // 替换，key对应value
 *                afterNodeAccess(e); // 替换后，回调
 *                return oldValue;
 *            }
 *        }
 *        ++modCount; // 每增加一个Node, 就Size++
 *        if (++size > threshold) // 如果size大于临界值，就扩容
 *            resize(); // 扩容
 *        afterNodeInsertion(evict);
 *        return null;
 *    }
 * 5. 关于树化(转成红黑树)
 * // 如果table 为 null, 或者大小还没有到64, 暂时不树化，而是进行扩容
 * // 否则才会真正的树化 -> 剪枝
 * find void treeifyBin(Node<K,V>[] tab, int hash) {
 *        int n, index; Node<K,V> e;
 *        if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
 *            resize();
 */
```
#### HashMap扩容
```java

public class HashMapSource2 {
    public static void main(String[] args) {
        HashMap hashMap = new HashMap();
        for (int i = 1; i <= 12; i++) {
            hashMap.put(new A(i), "hello");
        }
    }
}

class A {
    privat int num;

    public A(int num) {
        this.num = num;
    }

    @Override
    public int hashCode() {
        return 100;
    }
}
```
### HashTable的基本介绍
1. 存放的元素是键值对：即k-v
2. hashtable 的键和值都不允许为null，否则会抛出NullPointerException
3. hashtable 使用方法基本上和hashmap一样
4. hashtable 是线程安全的，单线程操作效率低。hashMap是线程不安全的，单线程操作效率高
```java
public class HashTableExercise {
    public static void main(String[] args) {
        Hashtable table = new Hashtable();
        table.put("john", 100);
        table.put(null, 100); // 抛出异常 NullPointerException
        table.put("john", null); // 抛出异常 NullPointerException
        table.put("lucy", 100);
        table.put("lic", 100);
        table.put("lic", 200); // 替换
        System.out.println(table);
        // 简单说明一下hashtabe的底层
        //1. 底层有数组 Hashtable$entry[] 初始化大小为 11
        //2. 临界值threshold 8 = 11*0.75
        //3. 扩容：按照自己的扩容机制来进行即。
        //4. 执行方法addentry(hash,key,value,index);添加k-v封装到entry
        //5. 当if(count >= threshold)满足时，就进行扩容
        //6. 按照 int newcapacity = (oldcapacity << 1) + 1 的大小扩容
    }
}
```
#### HashTable 和 HashMap 的区别
||版本|线程安全(同步)|效率|允许null键null值|
|-----|--------|------|-------|---------|
|HashMap|jdk1.2|不安全|高|可以|
|HashTable|jdk1.0|安全|低|不可以|
### Map接口实现类 Properties
1. Properties 类继承自 Hashtable 类并且实现了 Map 接口，也是使用一种键值对的形式来保存数据。
2. 它的使用特点和 Hashtable 类似
3. Properties 还可以用于从 xxx.properties 文件中，加载数据到 Properties 类对象，并进行读取和修改
4. 工作后 xxx.properties 文件通常作为配置文件，用来保存一些不能被代码直接修改的配置信息
```java
import java.util.Properties;

public class Properties_ {
    public static void main(String[] args) {
        Properties prop = new Properties();
        prop.put("john", 100);
        // prop.put(null, 100); // 抛出空指针异常
        // prop.put("john", null); // 抛出空指针异常
        prop.put("lucy", 100);
        prop.put("lic", 100);
        prop.put("lic", 88); // 如果有相同的key, value 会被替换

        System.out.println("prop" + prop);

        // 1. Properties 继承 Hashtable
        // 2. 可以通过 k-v 存放数据，当然key 和 value 不能为 null

        // 通过 k 获取对应值
        System.out.println("lic = " + prop.get("lic"));

        // 删除
        prop.remove("lic");
        System.out.println(prop);

        // 修改
        prop.put("john", "约翰");
        System.out.println(prop);
    }
}
```
## TreeSet
```java
import java.util.Comparator;
import java.util.TreeSet;

public class TreeSet_ {
    public static void main(String[] args) {




        TreeSet treeSet = new TreeSet();
        // 添加数据
        treeSet.add("jack");
        treeSet.add("tom");
        treeSet.add("sp");
        treeSet.add("a");

        System.out.println("treeSet = " + treeSet);
        // 1. 当我们使用无参构造器，创建了TreeSet时，仍然是无序的
        // 2. 如果希望添加的元素，按照字符大小来排序
        // 3. 使用TreeSet 提供的一个构造器，可以传入一个比较器
        TreeSet treeSet1 = new TreeSet(new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                return ((String) o2).compareTo((String) o1);
            }
        });
        // 添加数据
        treeSet1.add("jack");
        treeSet1.add("tom");
        treeSet1.add("sp");
        treeSet1.add("a");
        System.out.println("treeSet1 = " + treeSet1);
        /**
         * 1. 构造器把传入的比较器对象，赋给了 TreeSet 的底层的 TreeMap 的属性 this.comparator
         *    public TreeMap(Comparator<? super K> comparator) {
         *        this.comparator = comparator
         *    }
         * 2. 在调用 treeSet.add("tom") 在底层会执行到
         *    if (cpr != null) { // car 就是我们的匿名内部类(对象)
         *        do {
         *            parent = t;
         *            // 动态绑定到我们的匿名内部类（对象）compare
         *            cmp = cpr.compare(key, t.key);
         *            
         *            if (cmp < 0) {
         *                t = t.left;
         *            } else if (cmp > 0) {
         *                t = t.right;
         *            } else { // 如果相等，即返回 0，这个数据就加入
         *                return t.setValue(value);
         *            } 
         *        } while(t !- null)
         *    }
         * 
         * */

    }
}

```
## TreeMap
```java
import java.util.Comparator;
import java.util.TreeMap;
import java.util.TreeSet;

public class TreeMap_ {
    public static void main(String[] args) {




        TreeMap treeMap = new TreeMap(new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                // 根据传入的 k (String) 的大小进行排序
                return ((String) o1).compareTo((String) o2);
            }
        });
        // 添加数据
        treeMap.put("jack", "杰克");
        treeMap.put("tom", "汤姆");
        treeMap.put("kristina", "克瑞斯提诺");
        treeMap.put("smith", "斯密斯");

        System.out.println(treeMap);
        /**
         * 1. 调用构造器，把传入的实现了 Comparator 接口的匿名内部类(对象)，传给了TreeMap的comparator
         *    public TreeMap(Comparator<? super K> comparator) {
         *        this.comparator = comparator
         *    }
         * 2. 调用 put 方法
         * 2.1 第一次添加，把 k-v 封装到 Entry 对象，放入 root
         *    Entry<K, V> t = root;
         *    if (t == null) {
         *       comparae(key, key); // type (and possibly null) check
         *
         *       root = new Entry<>(key, value, null);
         *       size = 1;
         *       modCount++;
         *       return null;
         *    }
         * 2.2 以后添加
         *    Comparator<? super K> cpr = comparator;
         *    if (cpr != null) {
         *       do { // 遍历所有的key, 给当前key找到适当位置
         *         parent = t;
         *         cmp = cpr.compare(key, t.key); // 动态绑定到我们的匿名内部类的 compare
         *         if (cmp < 0) {
         *           t = t.left;
         *         } else if (cmp > 0) {
         *           t = t.right;
         *         } else { // 如果遍历过程中，发现准备添加 key, 和当前已有的key相等，就不添加
         *           return t.setValue(value);
         *         }
         *       } while (t != null);
         *       
         *    }
         * */

    }
}

```
## 总结
在开发中，选择什么集合实现类，主要取决于业务操作特点，然后根据集合实现类特性进行选择，分析如下：
1. 先判断存储的类型(一组对象或一组键值对)
2. 一组对象: Collection 接口
   1. 允许重复：List
      - 增删多：LinkedList(底层维护了一个双向链表)
      - 改查多：ArrayList(底层维护了一个Object类型的可变数组)
   2. 不允许重复：Set
      - 无序：HashSet(底层维护了一个哈希表, 即 HashMap(数组 + 链表 + 红黑树))
      - 排序：TreeSet
      - 插入和取出顺序一致：LinkedHashSet(底层维护了一个双向链表)
   3. 一组键值对：Map
      - 键无序：HashMap (底层是：哈希表，jdk7: 数组 + 链表， jdk8: 数组 + 链表 + 红黑树)
      - 键排序：TreeMap
      - 键插入和取出顺序一致：LinkedHashMap
      - 读取文件：Properties
## Collections 工具类
### Collections 工具类介绍
1. Collections 是一个操作 Set、List 和 Map 等集合的工具类
2. Collections 中提供了一系列静态的方法对集合元素进行排序、查询和修改等操作，还提供了对集合对象设置不可变、对集合对象实现同步控制等方法
> 排序操作(均为静态方法)
1. reverse(List)：反转 List 中元素的顺序
2. shuffle(List)：对 List 集合元素进行随机排序
3. sort(List)：根据元素的自然顺序对指定 List 集合元素按升序排序
4. sort(List, Comparator)：根据指定的 Comparator 产生的顺序对 List 集合元素进行排序
5. swap(List, int, int)：将指定 List 集合中的 i 处元素和 j 处元素进行交换
```java

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Collections_ {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add("tom");
        list.add("smith");
        list.add("king");
        list.add("milan");

        System.out.println(list);

        // reverse(list): 反转 list 中元素的顺序
        Collections.reverse(list);
        System.out.println(list);

        // shuffle(list): 对 list 集合元素进行随机排序
        for (int i = 0; i < 5; i++) {
            Collections.shuffle(list);
            System.out.println("list = " + list);
        }
        // sort(list): 根据元素的自然顺序对指定List集合元素按升序排序
        Collections.sort(list);
        System.out.println("自然排序后" );
        System.out.println("list" + list);
        // sort(list, Comparator): 根据指定的 Comparator 产生的顺序对 List 集合元素
        // 希望按照 字符串的长度大小排序
        Collections.sort(list, new Comparator() {
            public int compare (Object o1, Object o2) {
                return ((String)o2).length() - ((String)o1).length();
            }
        });
        System.out.println("list" + list);
        // swap(list, int, int): 将指定 list 集合中的 i 处元素和 j处元素进行交换
        Collections.swap(list, 0, 1);
        System.out.println("交换后的情况");
        System.out.println("list =" + list);

    }
}

```
### 查找、替换
1. `Object max(Collection)`: 根据元素的自然顺序，返回给定集合中的最大元素
2. `Object max(Collection, Comparator)`: 根据Comparator 指定的顺序，返回给定集合中的最大元素
3. `Object min(Collection)`: 根据元素的自然顺序，返回给定集合中的最小元素
4. `Object min(Collection, Comparator)`: 根据Comparator 指定的顺序，返回给定集合中的最小元素
5. `int frequency(Collection, Object)`: 返回指定集合中指定元素的出现次数
6. `void copy(List dest, List src)`: 将src中的内容复制到dest中
7. `boolean replaceAll(List list, Object oldVal, Object newVal)`: 使用新值替换List 对象的所有旧值
```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Collections_ {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add("tom");
        list.add("smith");
        list.add("king");
        list.add("milan");

        // Object max(Collection):
        System.out.println("自然顺序最大元素 = " + Collections.max(list));
        // Object max(Collection, Comparator)
        Object maxObject = Collections.max(list, new Comparator() {
            public int compare(Object o1, Object o2) {
                return ((String)o1).length() - ((String)o2).length();
            }
        });
        System.out.println("长度最大的元素 " + maxObject);

        // in frequeency(Collection, Object): 返回指定集合中指定元素的出现次数
        System.out.println("tom 出现的次数 = " + Collections.frequency(list, "tom"));

        // void copy(list dest, list src): 将 src中的内容复制到 dest 中
        ArrayList dest = new ArrayList();
        // 为了完成一下完整的拷贝，需要先给 dest 赋值，大小和 list.size() 一样
        for(int i = 0; i < list.size(); i++) {
            dest.add("");
        }
        // 拷贝
        Collections.copy(dest, list);
        System.out.println("dest =" + dest);

        // boolean replaceAll(list list, Object oldVal, Object newVal): 使用新值替换 list 对象的原有旧值
        // 如果list有 tom 就替换成 汤姆
        Collections.replaceAll(list, "tom", "汤姆");
        System.out.println(list);
    }
}

```
## 练习
```java
/**
 * 1. 封装实现类，包含标题和内容属性，提供 get set 方法，重写 toString 方法, 打印对象时只打印标题
 * 2. 只提供一个带参数的构造器，实例化对象时，只初始化标题; 并且实例化两个对象
 * 新闻一：新冠确诊病例超千万，数百万人涌向机场，专家：疫情尚未结束
 * 新闻二：男子120元买刮刮乐第三张刮出100万，厂家回应：在操作
 * 3. 将新闻对象添加到 ArrayList 集合中，并遍历集合，打印每条新闻的标题
 * 4. 在遍历集合过程中，对新闻标题进行处理，超过15字的只保留前15个，后面用...代替
 * 5. 在控制台打印出每条处理后的新闻标题
 */
import java.util.ArrayList;

public class HomeWork1 {
    public static void main(String[] args) {
        ArrayList arrayList = new ArrayList();
        arrayList.add(new News("新冠确诊病例超千万，数百万人涌向机场，专家：疫情尚未结束"));
        arrayList.add(new News("男子120元买刮刮乐第三张刮出100万，厂家回应：在操作"));

        int size = arrayList.size();
        for (int i = size - 1; i >= 0; i--) {
            // System.out.println(arrayList.get(i));
            News news = (News) arrayList.get(i);
            System.out.println(processTitle(news.getTitle()));
        }
    }

    public static String processTitle(String title) {
        if (title == null) {
            return "";
        }

        if (title.length() > 15) {
            return title.substring(0, 15) + "...";
        }

        return title;
    }
}

class News {
    private String title;
    private String content;

    public News(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "News{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}

```
```java
/**
 * 使用 ArrayList 完成对 对象 Car {name, price} 的各种操作
 * 1. add 添加单个元素
 * 2. remove: 删除指定元素
 * 3. contains: 查找元素是否存在
 * 4. size: 获取元素个数
 * 5. isEmpty: 判断是否为空
 * 6. clear: 清空
 * 7. addAll: 添加多个元素
 * 8. containsAll: 查找多个元素是否存在
 * 9. removeAll: 删除多个元素
 * 
 * 使用增强for 和迭代器来遍历 所有的car, 需要重写 Car 的 toString
 * 
 */

import java.util.ArrayList;
import java.util.Iterator;

public class HomeWork2 {
    public static void main(String[] args) {
        ArrayList arrayList = new ArrayList();
        Car car = new Car("宝马", 40000);
        Car car1 = new Car("宾利", 5000000);

        // 1. add 添加单个元素
        arrayList.add(car);
        arrayList.add(car1);
        System.out.println(arrayList);

        // 2. 删除指定元素
        arrayList.remove(car);
        System.out.println(arrayList);

        // 3. contains 查找元素是否存在
        System.out.println(arrayList.contains(car)); // false

        // 4. size 获取元素个数
        System.out.println(arrayList.size()); // 1

        // 5. isEmpty: 判断是否为空
        System.out.println(arrayList.isEmpty()); // false

        // 6. clear 清空
        // arrayList.clear();
        // System.out.println(arrayList); // []

        // 7. addAll 添加多个元素
        arrayList.addAll(arrayList);
        System.out.println(arrayList); // 2个宾利

        // 8. containsAll: 查找多个元素是否都存在
        System.out.println(arrayList.containsAll(arrayList)); // true

        // 9. removeAll: 删除多个元素
        // arrayList.removeAll(arrayList); // 相当于清空
        // System.out.println(arrayList); // []

        // 使用增强 for 和 迭代器来遍历所有的 car, 需要重写 Car 的toString方法
        for (Object o: arrayList) {
            System.out.println(o);
        }

        System.out.println("迭代器");
        Iterator iterator = arrayList.iterator();
        while(iterator.hasNext()) {
            Object next = iterator.next();
            System.out.println(next);
        }

    }
}

class Car2 {
    private String name;
    private double prive;

    public Car2(String name, double prive) {
        this.name = name;
        this.prive = prive;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrive() {
        return prive;
    }

    public void setPrive(double prive) {
        this.prive = prive;
    }

    @Override
    public String toString() {
        return "Car{" +
                "name='" + name + '\'' +
                ", prive=" + prive +
                '}';
    }
}

```
```java
/**
 * 1. 使用 HashMap 类实例化一个Map类型的对象 m, 键(String)和值(int)分别用于存储员工的姓名和工资
 *    存入数据如下：jack-650元，tom-1200元，smith-2900元
 * 2. 将 jack 的工资更改为2600元
 * 3. 为所有员工工资加薪 100 元
 * 4. 遍历集合中所有的员工
 * 5. 遍历集合中所有的工资
 */
import java.util.*;

public class HomeWork3 {
    public static void main(String[] args) {
        Map m = new HashMap();
        m.put("jack", 650); // int -> Integer
        m.put("tom", 1200); // int -> Integer
        m.put("smith", 2900); // int -> Integer
        System.out.println("m = " + m);
        m.put("jack", 2600); // 替换更新
        System.out.println("m = " + m);

        // 为所有员工的工次加薪 100 元
        Set keySet = m.keySet();
        for(Object key: keySet) {
            m.put(key, (Integer)m.get(key) + 100);
        }

        System.out.println(m);

        System.out.println("-----------------------遍历----------------------------------");
        Set entrySet = m.entrySet();
        // 迭代器
        Iterator iterator = entrySet.iterator();
        while (iterator.hasNext()) {
            Map.Entry entry = (Map.Entry)iterator.next();
            System.out.println(entry.getKey() + " - " + entry.getValue());
        }

        System.out.println("===================== 遍历所有的工资=============");
        Collection values = m.values();
        for (Object value: values) {
            System.out.println("工资 = " + value);
        }
    }
}
```
```java
// 试分析 HashSet 和 TreeSet 分别如何实现去重的
/**
 * 1. HashSet 的去重机制：haseCode() + equals(), 底层先通过存入对象，进行运算得到一个
 *    hash 值，通过 hash 值得到对应的索引，如果发现table索引所在的位置，没有数据，就直接存放，
 *    如果有数据，就进行 equals 比较[遍历比较]，如果比较后，不相同，就加入，否则就不加入
 * 2. TreeSet的去重机制：如果你传入了一个 Comparator 匿名对象，就使用实现的 compare 去重，如果方
 *    法返回0，就认为是相同的元素/数据，就不添加，如果你没有传入一个 Comparator 匿名对象，则以你
 *    添加的对象实现 Compareable 接口的 compareTo 去重.
 */


// 运行以下代码会不会抛出异常，并说明原因
/**
 * TreeSet treeSet = new TreeSet();
 * treeSet.add(new Person());
 * 
 * class Person{}
 * 
 */
import java.util.TreeSet;

public class HomeWork {
    public static void main(String[] args) {
        TreeSet treeSet = new TreeSet();
        /**
         * add 方法：因为TreeSet() 构造器没有传入 Comparator 接口的匿名内部类
         * 所以底层 Camparable<? super K> k = (Comparable<? super K>) key;
         * 即把Person 转成 Comparable 类型
         * */
        treeSet.add(new Person());
    }
}

class Person {

}

// 修改后的 Person
class Person implements Comparable {
    public int compareTo(Object o) {
        return 0;
    }
}

```
```java
/**
 * 已知：Person 类按照 id 和 name 重写了 hashCode 和 equals 方法, 下面代码输出什么？
 * 
 * HashSet set = new HashSet();
 * Person p1 = new Person(1, "AA");
 * Person p2 = new Person(1, "BB");
 * set.add(p1);
 * set.add(p2);
 * p1.name = "CC";
 * set.remove(p1);
 * System.out.println(set); // [Person{id=1, name='BB'}]
 * set.add(new Person(1, "CC"));
 * System.out.println(set); // [Person{id=1, name='BB'}, Person{id=1, name='CC'}]
 * set.add(new Person(1, 'AA'));
 * System.out.println(set); // [Person{id=1, name='BB'}, Person{id=1, name='CC'}, Person{id=1, name='AA'}]
 * 
 * 
 * class Person {
 *      private int id;
 *      private String name;
 *      public Person(int id, String name) {
 *          this.id = id;
 *          this.name = name;
 *      }
 *      @Override
 *      public boolean equals(Object o) {
 *          if (this == o) return true;
 *          if (o == null || getClass() != o.getClass()) return false;
 *          Person person = (Person) o;
 *          return id == person.id && Objects.equals(name, person.name);
 *      }
 *      @Override
 *      public int hashCode() {     
 *          return Objects.hash(id, name);
 *      }
 * }
 */
```
> Vector 和ArrayListr 的区别
|         |底层结构        |版本  |线程安全(同步)效率|扩容倍数|
|---------|---------------|------|----------------|--------|
|ArrayList|可变数组        |jdk1.2|非线程安全,效率高|如果使用有参构造器按照1.5倍扩容；如果是无参构造器: 第一次扩容10，从第二次开始按照1.5倍|
|Vector   |可变数组Object[]|jdk1.0|线程安全,效率不高|如果是无参，默认10, 满后按照2倍扩容，如果是指定大小创建Vector,则每次按照2倍扩容|
