# 文件
1. 文件,对我们并不陌生,文件是保存数据的地方,比如大家经常使用的word文档,txt文件,excel文件...都是文件。它既可以保存一张图片,也可以保持视频,声音....
2. 文件在程序中是以流的形式来操作的
  - 流:数据在数据源(文件)和程序(内存)之间经历的路径
  - 输入流:数据从数据源(文件)到程序(内存)的路径
  - 输出流:数据从程序(内存)到数据源(文件)的路径
## 创建文件
```java
/**
 * new File(String pathname)//根据路径构建一个File对象
 * new File(File parent,String child)//根据父目录文件+子路径构建
 * new File(String parent,String child)//根据父目录+子路径构建
 */
public class Main {
    public static void main(String[] args) {
        create01();
        create01();
        create02();
    }


    public static void create01() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\111.txt";
        // 这个 file 对昂只是 java 内存中的对象
        // 只有运行 createNewFile，才会在磁盘中创建对象
        File file = new File(filePath);

        try {
            file.createNewFile();
            System.out.println("文件创建成功...");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void create02() {
        File parentFile = new File("C:\\Users\\18831\\Desktop\\工作");
        String fileName = "222.txt";
        File file = new File(parentFile, fileName);

        try {
            file.createNewFile();
            System.out.println("文件创建成功...");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void create03() {
        String parentPath = "C:\\Users\\18831\\Desktop\\工作";
        String filePath = "333.txt";
        File file = new File(parentPath, filePath);
        try {
            file.createNewFile();
            System.out.println("文件创建成功...");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
### 文件信息
```java
/**
 * getName
 * getAbsolutePath
 * getParent
 * length
 * exists
 * isFileisDirectory
 */
public class Main {
    public static void main(String[] args) {
        info();
    }

    // 获取文件信息
    public static void info() {
        File file = new File("C:\\Users\\18831\\Desktop\\工作\\111.txt");

        // 调用相应方法得到信息
        System.out.println("文件名称 " + file.getName());
        System.out.println("文件绝对路径 " + file.getAbsoluteFile());
        System.out.println("文件父目录 " + file.getParent());
        System.out.println("文件大小 " + file.length());
        System.out.println("文件是否存在 " + file.exists());
        System.out.println("是不是一个文件 " + file.isFile());
        System.out.println("是不是一个目录 " + file.isDirectory());
    }
}
```
### 文件的目录操作
```java
/**
 * mkdir创建一级目录、mkdirs创建多级目录、delete删除空目录或文件
 */
```