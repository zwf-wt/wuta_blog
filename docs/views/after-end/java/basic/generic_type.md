# 泛型
```java
// 请编写程序，在ArrayList中，添加3个Dog对象
// Dog对象含有 name 和 age, 并输出 name 和 age(要求使用getXxx())
import java.util.ArrayList;

public class Generic01 {
    public static void main(String[] args) {
        ArrayList arrayList = new ArrayList();
        arrayList.add(new Dog("旺财", 10));
        arrayList.add(new Dog("发财", 1));
        arrayList.add(new Dog("小黄", 5));

        // arrayList.add(new Cat("招财猫", 8)); // 如果不小心加了这种语句，在写代码的时候，编译器就会报错，但是运行的时候会给出错信息
        for (Object o: arrayList) {
            Dog dog = (Dog) o; // 会报错  Cat cannot be cast to Dog
            System.out.println(dog.getName() + " ----- " + dog.getAge());
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

class Cat {
    private String name;
    private int age;

    public Cat(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
> 以上代码存在一些问题
1. 不能对加入到集合 ArrayList 中的数据类型进行约束(不安全)
2. 遍历的时候，需要进行类型转换，如果集合中的数据量较大，对效率有影响

```java
// 使用泛型优化下代码
public class Generic01 {
  public static void main(String[] args) {
    /**
     * 1. 当我们 ArrayList<Dog> 表示存放到 ArrayList 集合中的元素是 Dog 类型
     * 2. 如果编译器发现添加的类型与泛型指定的类型不一致，就会报错
     * 3. 在遍历的时候，可以直接取出 Dog 类型而不是 Object
     * 4. public class ArrayList<E> {} E称为泛型，那么 Dog -> E
     */
    ArrayList<Dog> arrayList = new ArrayList();
    arrayList.add(new Dog("旺财", 10));
    arrayList.add(new Dog("发财", 1));
    arrayList.add(new Dog("小黄", 5));

    // arrayList.add(new Cat("招财猫", 8)); // 在写代码的时候，编译器就会报错，避免了运行时异常的发生
    for (Dog dog: arrayList) {
        System.out.println(dog.getName() + " ----- " + dog.getAge());
    }
  }
}
```
> 泛型的好处
1. 编译时，检查添加元素的类型，提高了安全性
2. 减少了类型转换的次数，提高了效率
- 不使用泛型
`Dog -> Object -> Dog`: 放入到ArrayList中会先转成Object，取出的时候，需要转换成Dog
- 使用泛型
`Dog -> Dog -> Dog`: 放入到ArrayList中，直接就是Dog，取出的时候，也是Dog，避免了类型转换
3. 不再提示编译警告

## 泛型介绍
1. 泛型又称参数化类型或泛化，解决数据类型的安全性问题
2. 在类声明或实例化时只要指定好需要的具体的类型即可。
3. Java泛型可以保证如果程序在编译时没有发出警告，运行时就不会产生ClassCastException异常。同时，代码更加简洁、健壮。
4. 泛型的作用是：可以在类声明时通过一个标识表示类中某个属性的类型，或者是某个方法的返回值类型，或者是参数类型
```java
// 泛型的作用是：可以在类声明时通过一个标识表示类中某个属性的类型，或者是某个方法的返回值类型，或者是参数类型
public class Generic01 {
  public static void main(String[] args) {

    Person<String> person = new Person<String>("张三");
    /**
     * class Person<E> {
     *   E s; // E表示 s的数据类型，该数据类型在定义 Person 对象的时候指定，即在编译期间, 就确定E是什么类型
     *   public Person(E s) { // E 也可以是参数类型
     *       this.s = s;
     *   }
     *   public E f() { // 返回类型使用E
     *       return s;
     *   }
     *   public void show() {
     *     System.out.println(s.getClass()); // 显示s的运行类型 class java.lang.String
     *   }
     * }
     */

    person.show();
  }
}
class Person<E> {
  E s; // E表示 s的数据类型，该数据类型在定义 Person 对象的时候指定，即在编译期间, 就确定E是什么类型
  public Person(E s) { // E 也可以是参数类型
      this.s = s;
  }

  public E f() { // 返回类型使用E
      return s;
  }

  public void show() {
    System.out.println(s.getClass()); // 显示s的运行类型 class java.lang.String
  }
}
```
## 泛型语法
### 声明泛型
```java
/**
 * interface 接口<T> {} 
 * class 类<K, V> {}
 * 比如：List, ArrayList
 * 1. 其中, T、K、V 只是占位符，表示类型，不是具体的类型，不代表具体值
 * 2. 任意字母都可以，常用T表示，是Type的缩写
 */

```
### 泛型的实例化
1. `List<String> strList = new ArrayList<String>();`
2. `Iterator<Customer> inerator = customers.iterator();`
```java
/**
 * 1. 创建 3 个学生对象
 * 2. 放入到 HashMap 中，要求Key是String name, Value 就是学生对象
 * 3. 使用两种方式遍历
 * */ 
public class Generic01 {
  public static void main(String[] args) {

    HashSet<Student> students = new HashSet<Student>();
    students.add(new Student("jack", 18));
    students.add(new Student("tom", 28));
    students.add(new Student("mary", 19));

    for (Student s: students) {
        System.out.println(s.toString());
    }

    System.out.println(" ------------------------------- ");
    // 使用泛型方式给 HashMap 放入3个学生对象
    HashMap<String, Student> hm = new HashMap<String, Student>();
    hm.put("milan", new Student("milan", 3));
    hm.put("smith", new Student("smith", 48));
    hm.put("spike", new Student("spike", 28));

    Set<Map.Entry<String, Student>> entries = hm.entrySet();
    Iterator<Map.Entry<String, Student>> iterator = entries.iterator();
    while (iterator.hasNext()) {
      Map.Entry<String, Student> next = iterator.next();
      System.out.println(next.getKey() + " - " + next.getValue());
    }
  }
}

class Student {
  private String name;
  private int age;

  public Student(String name, int age) {
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
    return "Student{" +
      "name='" + name + '\'' +
      ", age=" + age +
      '}';
  }
}
```
### 泛型使用的注意事项
1. `interfact List<T> {}, public class HashSet<E> {}...`：T、E只能是引用类型，不能是基本数据类型
```java
// 以下语句是否正确
List<Integer> list = new ArrayList<Integer>(); // 正确

List<int> list = new ArrayList<int>(); // 错误
```
2. 在指定泛型具体类型后，可以传入该类型或者其子类类型
3. 泛型使用形式
```java
List<Integer> list1 = new ArrayList<Integer>();
List<Integer> list2 = new ArrayList<>(); // 省略表示类型是Integer
```
3. 如果不指定泛型类型，则默认是Object类型。比如`List list3 = new ArrayList()`, 默认给它的泛型是`<E> E就是Object`, 等价于`List<Object> list3 = new ArrayList<>()`
```java


public class Generic01 {
    public static void main(String[] args) {
        // 因为 E 指定了 A 类型，构造器传入了 new A()
        // 在给泛型指定具体类型后，可以传入该类型或者其子类类型
        Pig<A> aPig = new Pig<>(new A());
        aPig.f(); // class A

        Pig<A> aPig2 = new Pig<>(new B());
        aPig2.f(); // class B
    }
}

class A {}

class B extends A {}

class Pig<E> {
    E e;
    public Pig(E e) {
        this.e = e;
    }

    public void f() {
        System.out.println(e.getClass());
    }
}

// 泛型的使用形式
ArrayList<Integer> list1 = new ArrayList<Integer>();
List<Integer> list2 = new ArrayList<Integer>();
// 实际开始中，往往会简写，因为编译器会自动推断泛型类型
ArrayList<Integer> list3 = new ArrayList<>();
List<Integer> list4 = new ArrayList<>();
List<Pig> pigs = new ArrayList<>();

// 如果不指定泛型类型，则默认是Object类型。比如
ArrayList list5 = new ArrayList();

```
### 泛型练习
```java
/**
 * 定义一个Employee类
 * 1. 该类包含：private成员变量name,age,birthday，其中birthday 为MyDate类型的对象
 * 2. 为每一个属性定义getter, setter 方法
 * 3. 重写toString方法，格式如：name=张三,age=25,birthday=2000-01-01
 * 4. MyDate类包含: private成员变量year,month,day。为每一个属性定义getter, setter 方法
 * 5. 创建该类的 3 个对象，并把这些对象放入 ArrayList 集合中(ArrayList 需使用泛型来定义)，对集合中的元素进行排序，并遍历输出
 * 排序方式：调用ArrayList的sort方法，传入Comparator对象[使用泛型]，先按照年龄排序，如果年龄相同，则按照生日日期的先后排序。
 */
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;

public class Generic02 {
    public static void main(String[] args) {
        ArrayList<Employee> employees = new ArrayList();
        employees.add(new Employee("tom", 20000, new MyDate(2000, 11, 11)));
        employees.add(new Employee("jack", 12000, new MyDate(2001, 12, 12)));
        employees.add(new Employee("Li", 50000, new MyDate(1980, 10, 10)));

        employees.sort(new Comparator<Employee>() {
            @Override
            public int compare(Employee emp1, Employee emp2) {
                // 先按照name 排序，如果name相同, 则按照生日日期的先后排序
                if (!(emp1 instanceof Employee && emp2 instanceof Employee)) {
                    System.out.println("类型不正确...");
                    return 0;
                }

                // 比较 name
                int i = emp1.getName().compareTo(emp2.getName());
                if (i != 0) {
                    return i;
                }
                // 如果名字相同，就比较 birthday - year
                int yearMinus = emp1.getBirthday().getYear() - emp2.getBirthday().getYear();
                if (yearMinus != 0) {
                    return yearMinus;
                }

                // 如果year相同，就比较month
                int monthMinus = emp1.getBirthday().getMonth() - emp2.getBirthday().getMonth();
                if (monthMinus != 0) {
                    return monthMinus;
                }

                return emp1.getBirthday().getDay() - emp2.getBirthday().getDay();
            }
        });

        for (Employee e: employees) {
            System.out.println(e.toString());
        }
    }
}

class Employee {
    private String name;
    private double sal;
    private MyDate birthday;

    public Employee(String name, double sal, MyDate birthday) {
        this.name = name;
        this.sal = sal;
        this.birthday = birthday;
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

    public MyDate getBirthday() {
        return birthday;
    }

    public void setBirthday(MyDate birthday) {
        this.birthday = birthday;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", sal=" + sal +
                ", birthday=" + birthday +
                '}';
    }
}

class MyDate {
    private int year;
    private int month;
    private int day;

    public MyDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    @Override
    public String toString() {
        return "MyDate{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }
}

```
## 自定义泛型
### 泛型类
```java
/**
 * 基本语法
 * class 类名<T, R...> {
 *   成员
 * }
 * 
 * 注意细节
 * 1. 普通成员可以使用泛型(属性、方法)
 * 2. 使用泛型的数组，不能初始化
 * 3. 静态方法中不能使用类的泛型
 * 4. 泛型类的类型，是在创建对象时确定的(因为创建对象时，需要指定确定类型)
 * 5. 如果在创建对象时，没有指定类型，默认为Object
 */
public class Generic03 {
    public static void main(String[] args) {
        // T = Double, R = String, M = Integer
        Tiger<Double, String, Integer> g = new Tiger<>("jonh");
        g.setT(10.9); // ok
        
        // T = Integer, R = String, M = Double
        Tiger<Integer, String, Double> g2 = new Tiger<>("小虎", "红色", 99.9, 100);
        // g2.setT("20"); // 报错, 因为T是Integer

        // T = Object, R = Object, M = Object 
        Tiger g3 = new Tiger("小王");
        g3.setT("20"); // 正确, 因为T = Object, "20"是String, 而String是Object的子类

    }
}

/**
 * 1. Tiger 后面泛型,所以我们把 Tiger 就称为自定义泛型类
 * 2. T, R, M 泛型的标识符, 一般是单个大写字母
 * 3. 泛型标识符可以有多个
 * 4. 普通成员可以使用泛型(属性 方法)
 * 5. 使用泛型的数组,不能初始化
 * 6. 静态方法中不能使用类的泛型
 * */
class Tiger<T, R, M> {
    String name;
    R r; // 属性使用泛型
    M m;
    T t;
    // 因为数组在 new, 不能确定T的类型, 就无法在内存开空间
    T[] ts;

    public Tiger(String name, R r, M m, T t) { // 构造器使用泛型
        this.name = name;
        this.r = r;
        this.m = m;
        this.t = t;
    }

    public Tiger(String name) {
        this.name = name;
    }

    // 报错, 因为静态属性是和类相关的,在类加载时,对象还没有创建
    // 所以, 如果静态方法和静态属性使用了泛型, JVM就无法完成初始化
    // static R r2;
    // public static void m1(M m) {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public R getR() {
        return r;
    }

    public void setR(R r) { // 方法使用到泛型
        this.r = r;
    }

    public M getM() { // 返回类型可以使用泛型
        return m;
    }

    public void setM(M m) {
        this.m = m;
    }

    public T getT() {
        return t;
    }

    public void setT(T t) {
        this.t = t;
    }
}

```
### 自定义泛型接口
```java
/**
 * interface 接口名<T, R...> {
 * 
 * }
 * 
 * 1. 接口中,静态成员也不能使用泛型(这个和泛型类型类规定一样)
 * 2. 泛型接口的类型，在继承接口或者实现接口时确定
 * 3. 没有指定类型，默认为Object
 */
public class Generic04 {
    public static void main(String[] args) {

    }
}

interface IUsb<U, R> {
    int n = 10;
    // U name; // 报错，不能这样使用

    // 普通方法中，可以使用接口泛型
    R get(U u);

    void hi(R r);

    void run(R r1, R r2, U u1, U u2);
}
interface IA extends IUsb<String, Double> {}


/**
 * 当我们去实现IA接口时，因为IA在继承IUsb接口时，指定了 U 为 String, R为Double
 * 所以在实现IUsb接口的方法时，使用String替换U, Double替换R
 * */
class AA implements IA {
    @Override
    public Double get(String s) {
        return null;
    }

    @Override
    public void hi(Double aDouble) {

    }

    @Override
    public void run(Double r1, Double r2, String u1, String u2) {

    }
}

/**
 * 实现接口时，直接指定泛型接口的类型
 * 给 U 指定Integer 给 R指定了Float
 * 所以，当我们实现IUsb 方法时，给使用Integer 替换U,使用Float替换R
 * */
class BB implements IUsb<Integer, Float> {
    @Override
    public Float get(Integer integer) {
        return null;
    }

    @Override
    public void hi(Float aFloat) {

    }

    @Override
    public void run(Float r1, Float r2, Integer u1, Integer u2) {

    }
}

// 没有指定类型，默认为Object 
class CC implements IUsb { // 等价于 class CC implements IUSb<Object, Object> {
    @Override
    public Object get(Object o) {
        return null;
    }

    @Override
    public void hi(Object o) {

    }

    @Override
    public void run(Object r1, Object r2, Object u1, Object u2) {

    }
}
```
### 自定义泛型方法
```java
/**
 * 修饰符 <T, R...> 返回类型 方法名(参数列表) {
 *  方法体
 * }
 * 
 * 1. 泛型方法，可以定义在普通类中，也可以定义在泛型类中
 * 2. 当泛型方法被调用时，类型会确定
 * 3. public void Eat(E e) {}, 修饰符后没有<T, R...> eat方法不是泛型方法，而是使用了泛型的普通方法
 * 
 */
import java.util.ArrayList;

public class Generic05 {
    public static void main(String[] args) {
        Car car = new Car();
        car.fly("宝马", 100); // 当调用方法时，传入参数，编译器，就会确定类型
        car.fly(300, 300); // 当调用方法时，传入参数，编译器，就会确定类型

        Fish<String, ArrayList> fish = new Fish<>();
        fish.hello(new ArrayList(), 11.3f);
    }
}

class Car { // 普通类
    public void run() { // 普通方法

    }

    /**
     * 泛型方法
     * 1, <T, R>就是泛型
     * 2. 是提供给fly使用的
     * */
    public<T, R> void fly(T t, R r) { // 泛型方法
        System.out.println(t.getClass()); // String
        System.out.println(r.getClass()); // Integer
    }
}

class Fish<T, R> { // 泛型类
    public void run() { // 普通方法

    }

    public<U, M> void eat(U u, M m) { // 泛型方法

    }

    /**
     * 1. hi 方法不是泛型方法
     * 2. 是hi方法使用了类声明的泛型
     * */
    public void hi(T t) {

    }

    // 泛型方法，可以使用类声明的泛型，也可以使用自己声明泛型
    public<K> void hello(R r, K k) {
        System.out.println(r.getClass());
        System.out.println(k.getClass());
    }
}

// 以下代码是否正确
class Apple<T, R, M> {
    public<E> void fly(E e) { // 泛型方法
        system.out.println(e.getClass());
    } // 正确

    public void eat(U u) { // 错误，因为U没有声明 
    }

    public void run(M m) {} // 正确
}

class Dog{}

// 下面代码输出什么

// T -> String, R -> Integer, M -> Double
Apple<String, Integer, Double> apple = new Apple<>();
apple.fly(10); // 10, 会被自动装箱，Integer 10, 输出 Integer
apple.fly(new Dog()); // Dog
```
## 泛型的通配符和继承
1. 泛型不具备继承性
```java
List<Object> list = new ArrayList<String>(); // 错误
```
2. `<?>`: 支持任意泛型类型
3. `<? extends T>`: 支持T及其T的子类，规定了泛型类型的上限
4. `<? super T>`: 支持T及其T的父类，不限于直接父类，规定了泛型类型的下限
```java
import java.util.ArrayList;
import java.util.List;

public class Generic06 {
    public static void main(String[] args) {
        Object o = new String("xx");

        // List<Object> list = new ArrayList<String>(); // 报错

        // 举例说明下面三个方法的使用
        List<Object> list1 = new ArrayList<>();
        List<String> list2 = new ArrayList<>();
        List<Gaa> list3 = new ArrayList<>();
        List<Gbb> list4 = new ArrayList<>();
        List<Gcc> list5 = new ArrayList<>();

        // 如果是List<?> c, 可以接受任意的泛型类型
        printCollection1(list1);
        printCollection1(list2);
        printCollection1(list3);
        printCollection1(list4);
        printCollection1(list5);

        // List<? extends Gaa> c: 表示上限，可以接受 Gaa 或者 Gaa 子类
        // printCollection2(list1); // 编译时报错
        // printCollection2(list2); // 编译时报错
        printCollection2(list3);
        printCollection2(list4);
        printCollection2(list5);

        // List<? super Gaa> c: 支持AA类以及AA类的父类，不限于直接父类
        printCollection3(list1);
        // printCollection3(list2); // 编译错误
        printCollection3(list3);
        // printCollection3(list4); // 编译错误
        // printCollection3(list5); // 编译错误
    }

    // List<?> 表示任意泛型的类型都可以接受
    public static void printCollection1(List<?> c) {
        for (Object object: c) { // 通配符，取出时，就是Object
            System.out.println(object);
        }
    }

    // ? extends Gaa 表示 上限，可买接受 Gaa 或者 Gaa 子类
    public static void printCollection2(List<? extends Gaa> c) {
        for (Object object: c) { // 通配符，取出时，就是Object
            System.out.println(object);
        }
    }

    // ? super 子类类名Gaa: 支持Gaa类以及Gaa类的父类，不限于直接父类
    // 规定了泛型的下限
    public static void printCollection3(List<? super Gaa> c) {
        for (Object object: c) { // 通配符，取出时，就是Object
            System.out.println(object);
        }
    }


}

class Gaa {

}

class Gbb extends Gaa {

}

class Gcc extends Gbb {

}
```
## 泛型练习
```java
/**
 * 定义个泛型类 DAO<T>，在其中定义一个Map 成员变量，Map 的键为 String 类型，值为 T 类型。
 * 分别创建以下方法:
 * (1) public void save(String id,T entity): 保存T类型的对象到 Map 成员变量中
 * (2) publicT get(String id):从 map 中获取 id 对应的对象
 * (3) public void update(String id,T entity): 替换 map 中key为id的内容,改为 entity 对象
 * (4) public List<T>list():返回 map 中存放的所有T 对象
 * (5) public void delete(String id): 删除指定 id 对象
 * 定义一个 User 类:
 * 该类包含:private成员变量(int类型)id，age;((String 类型)name.
 * 创建 DAO 类的对象，分别调用其 save、get、update、list、delete 方法来操作 User 对象
 * 
 * 使用Junit单元测试类进行测试
 * 
 * @Test // 测试方法 鼠标右键先添加'Add Junit5.4 to classpath ', 然后在方法上添加@Test注解，最终在方法上点击小绿三角运行即可
 * public static void testList() {
 * }

 */
import java.util.*;

public class homework {
    public static void main(String[] args) {
        testList();
    }


    public static void testList() {

        // 这里给T指定类型是User
        DAO<User> dao = new DAO<>();
        dao.save("001", new User(1, 10, "jack"));
        dao.save("002", new User(2, 18, "king"));
        dao.save("003", new User(3, 38, "smith"));

        List<User> list = dao.list();
        System.out.println("list= " + list);

        dao.update("003", new User(3, 58, "milan"));
        dao.delete("001");

        System.out.println("---- 修改后 ----");
        list = dao.list();
        System.out.println("list = " + list);
        System.out.println("id == 003" + dao.get("003"));
    }
}
class User {
    private int id;
    private int age;
    private String name;

    public User(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}

class DAO<T> {
    private Map<String, T> map = new HashMap<>();

    public T get(String id) {
        return map.get(id);
    }

    public void update(String id, T entity) {
        map.put(id, entity);
    }

    // 返回 map 中存放的所有 T 对象
    // 遍历 map[k-v], 将map的所有 value(T entity), 封装到ArrayList返回即可
    public List<T> list() {

        // 创建 ArrayList
        List<T> list = new ArrayList<>();

        // 遍历map
        Set<String> keySet = map.keySet();
        for (String key: keySet) {
            list.add(map.get(key)); // 也可以直接使用本类的 get(String id)
        }
        return list;
    }

    public void delete(String id) {
        map.remove(id);
    }

    public void save(String id, T entity) {
        map.put(id, entity);
    }
}
```