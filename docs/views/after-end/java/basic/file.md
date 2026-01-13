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
import java.io.File;
import java.io.IOException;
public class Main {
    public static void main(String[] args) {
    //    m1();
    //    m2();
        m3();
    }


    

    public static void m1() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\111.txt";
        File file = new File(filePath);

        if (file.exists()) {
            if (file.delete()) {
                System.out.println(filePath + " 删除成功");
            } else {
                System.out.println(filePath + " 删除失败");
            }
        } else {
            System.out.println(filePath + " 删除失败");
        }
    }

    // 判断目录是否存在，如果存在删除，否则提示不存在
    // 在 java 中，目录也被当做文件
    public static void m2() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\111";
        File file = new File(filePath);

        if (file.exists()) {
            if (file.delete()) {
                System.out.println(filePath + " 删除成功");
            } else {
                System.out.println(filePath + " 删除失败");
            }
        } else {
            System.out.println("该目录不存在");
        }
    }

    // 判断目录是否存在，如果存在就提示已经存在，否则就创建
    public static void m3() {
        String dirPath = "C:\\Users\\18831\\Desktop\\工作\\111";
        File file = new File(dirPath);

        if (file.exists()) {
            System.out.println("该目录已存在");
        } else {
            if (file.mkdir()) { // 创建一级目录使用 mkdir, 创建多级目录使用 mkdirs
                System.out.println("该目录创建成功");
            } else {
                System.out.println("该目录创建失败");

            }
        }
    }
}

// 
```
## IO流原理
1. I/O 是 Input/Output 的缩写，I/O技术是非常实用的技术，用于处理设备之间的数据传输。如读/写文件，网络通讯等。
2. Java程序中，对于数据的输入/输出操作以“流(stream)”的方式进行。
3. java.io 包下提供了各种“流”类和接口，用以获取不同种类的数据，并通过标准的方法输入或输出数据。
4. 输入input：读取外部数据(磁盘、光盘等存储设备的数据)到程序(内存)中。
5. 输出output：将程序(内存)数据输出到磁盘、光盘等存储设备中。
## 流的分类
- 按操作数据单位不同分为:字节流(8 bit)，字符流(按字符)
- 按数据流的流向不同分为:输入流，输品流
- 按流的角色的不同分为:节点流，处理流/包装流

|抽象基类|字节流|字符流|
|--------|-----|-----|
|输入流|InpuStream|Reader|
|输出流|OuputStream|Writer|
1. Java的IO流共涉及40多个类，实际上非常规则，都是从如上4个抽象基类派生的。
2. 由这四个类派生出来的子类名称都是以其父类名作为子类名后缀。
### InputSteam 字节输入流
> InputStream抽象类是所有类字节输入流的超类
1. FileInputStream: 文件输入流, 从文件系统中的某个文件中获得输入字节 
2. BufferedInputStream: 缓冲字节输入流, 使用缓冲区描述输入字节流 
3. ObjectInputStream: 对象字节输入流, 从文件系统中的某个文件中获得输入字节并进行解序列化 
```java
// 请使用FilelnputStream 读取 hello.txt 文件，并将文件内容显示到控制台.

public class Main {
    public static void main(String[] args) {
        // 演示 读取文件
        readFile01();
        readFile02();
    }

    // 单个字节的读取
    public static void readFile01() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\hello.txt";
        int readData = 0;
        FileInputStream fileInputStream = null;
        try {

            // 从该输入流读取一个字节的数据。如果没有输入可用，此方法将阻止
            // 如果返回 -1，表示读取完毕
            fileInputStream = new FileInputStream(filePath);
            while ((readData = fileInputStream.read()) != -1) {
                System.out.print((char) readData);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // finally 关闭文件，释放资源
            try {
                fileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 单个字节的读取，效率比较低
     * -> 优化 使用 read(byte[] b) 读取文件， 提高效率
     * */
    public static void readFile02() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\hello.txt";
        int readlen = 0;
        // 字节数组
        byte[] buf = new byte[8]; // 一次读取8个字节

        FileInputStream fileInputStream = null;
        try {

            // 从该输入流读取最多 b.length 字节的数据到字节数组。此方法将阻止，直到某些输入可用
            // 如果返回 -1，表示读取完毕
            // 如果读取正常的话，返回的是实际读取的字节数
            fileInputStream = new FileInputStream(filePath);
            while ((readlen = fileInputStream.read(buf)) != -1) {
                System.out.print(new String(buf, 0, readlen));
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // finally 关闭文件，释放资源
            try {
                fileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
### OutputStream

```java
    /**
     * 演示使用 FileOutputStream 将数据写入到文件中
     * 如果该文件不存在，则创建该文件
     */
public class Main {
    public static void main(String[] args) {
       writeFile();
    }


    public static void writeFile() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\a.txt";
        FileOutputStream fileOutputStream = null;

        try {
            // 1. new FileOutputStream(filePath) 创建方式，当写入内容时，会覆盖原先的内容
            // 2. new FileOutputStream(filePath, true) 创建方式，当写入内容时，会追加到文件的内容
            fileOutputStream = new FileOutputStream(filePath, true);

            // 写入一个字节
            // fileOutputStream.write('a');

            // 写入一个字符串
            String str = "hello, world";
            // str.getBytes(): 可以把字符串转成字符数组
            // fileOutputStream.write(str.getBytes());

            // write(byte[] b, int off, int len) 将 len 字节从位于偏移量 off 的指定字节数组写入此文件输出流
            fileOutputStream.write(str.getBytes(), 0, str.length());
            fileOutputStream.write(str.getBytes(), 0, 2);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fileOutputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}

```
### 文件的拷贝
```java
public class Main {
    public static void main(String[] args) {

        fileCopy();
    }

    public static void fileCopy() {
        String srcFilePath = "C:\\Users\\18831\\Desktop\\工作\\a.png";
        String destFilePath = "D:\\aa.png";
        /**
         * 完成 文件拷贝，将 "C:\\Users\\18831\\Desktop\\工作\\a.png" 拷贝 到 D
         * 1. 创建文件输入流，将文件读入内存
         * 2. 创建文件输出流，将读取到的文件数据，写入到指定的文件
         * */
        FileInputStream fileInputStream = null;
        FileOutputStream fileOutputStream = null;

        try {
            fileInputStream = new FileInputStream(srcFilePath);
            fileOutputStream = new FileOutputStream(destFilePath);
            // 定义一个字符数组，提高读取效率
            byte[] buf = new byte[1024];
            int readLen = 0;
            while((readLen = fileInputStream.read(buf)) != -1) {
                // 读取到后，就写入到文件，通过 fileOutputStream
                // 即，是一边读，一边写
                fileOutputStream.write(buf, 0, readLen);
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // finally 关闭文件，释放资源
            try {
                if (fileOutputStream != null) {
                    fileInputStream.close();
                }

                if (fileOutputStream != null) {
                    fileOutputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```
### FileReader 和 FileWriter
FileReader 和 FileWriter 是字符流，即按照字符来操作io
```java
/**
 * FileReader相关方法:
 * 1) new FileReader(File/String)
 * 2) read: 每次读取单个字符，返回该字符，如果到文件未尾返回-1
 * 3) read(char[]): 批量读取多个字符到数组，返回读取到的字符数，如果到文件末尾返回-1
 * 
 * 相关API:
 * 1) new String(char[]): 将char[]转换成String
 * 2) new String(char[],off,len): 将char[]的指定部分转换成String
 * 
 * 
 * FileWriter常用方法
 * 1) new FileWriter(File/String): 覆盖模式，相当于流的指针在首端
 * 2) new FileWriter(File/String, true): 追加模式，相当于流的指针在尾端
 * 3) write(int): 写入单个字符
 * 4) write(char[]): 写入指定数组
 * 5) write(char[],off,len):写入指定数组的指定部分
 * 6) write(string): 写入整个字符串
 * 7) write(string,off,len): 写入字符串的指定部分
 * 相关APl: String类:
 * toCharArray: 将String转换成char[]
 * 
 * > 注意:
 * FileWriter使用后，必须要关闭(close)或刷新(flush)，否则写入不到指定的文件
 */
```
#### FileReader
```java
public class Main {
    public static void main(String[] args) {
        //    fileRead01();
        //    fileRead02();
    }

    // 单个字符读取
    public static void fileRead01() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\222.txt";
        FileReader fileReader = null;
        int data = 0;
        try {

            fileReader = new FileReader(filePath);

            // 单个字符读取: 循环读取，使用 read
            while ((data = fileReader.read()) != -1) {
                System.out.print((char) data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fileReader != null) {
                try {

                    fileReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    // 使用字符数组读取文件
    public static void fileRead02() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\222.txt";
        FileReader fileReader = null;
        int readLen = 0;
        char[] buf = new char[8];
        try {

            fileReader = new FileReader(filePath);

            // 使用read(buf), 返回的是实际读取到的字符，如果返回-1，表示读取完比
            while ((readLen = fileReader.read(buf)) != -1) {
                System.out.print(new String(buf, 0, readLen));
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fileReader != null) {
                try {

                    fileReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
```
#### FileWriter
```java
/**
 * 1. 创建FileWriter对象
 * FileWriter fw = new FileWriter("src\\fw.txt", true); // true表示追加，false表示覆盖
 * flush方法作用是 刷新该流的缓冲，如果没有执行，内容不会写入到文件中
 * 2. 写入数据
 * fw.write("hello");
 * 
 * 3. 关闭流
 * writer.flush();
 * 关闭：刷新(flush) + 关闭
 * writer.close();
 * 
*/
public class Main {
    public static void main(String[] args) {
        fileWrite01();
    }

    public static void fileWrite01() {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\333.txt";
        FileWriter fileWriter = null;
        char[] chars = {'a', 'b', 'c'};
        try {
            fileWriter = new FileWriter(filePath); // 覆盖形式
            // 1. writer(int): 写入单个字符
            fileWriter.write("H");

            // 2. write(char[]): 写入指定数组
            fileWriter.write(chars);
            // 3. write(char[], off, len):写入指定数组的指定部分
            fileWriter.write("张三，你好！".toCharArray(), 0, 3);
            // 4. write(string): 写入整个字符串
            fileWriter.write("北京，~");
            // 5. write(string, off, len): 写入字符串的某个部分
            fileWriter.write("上海不天当", 1, 3);

            // 在数据量大的情况下，可以使用循环操作

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 对于fileWrite, 一定要关闭流,或者 flush
            if (fileWriter != null) {
                try {

                    // 关闭文件流 ，等价于 flush() + close()
                    fileWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        System.out.println("程序结束");
    }
}
```
## 文件流和处理流
1. 节点流可以从一个特定的数据源读写数据，如FileReader、FileWriter
2. 处理流(也叫包装流)是“连接”在已存在的流(节点流或处理流)之上，为程序提供2更为强大的读写功能，如BufferedReader、BufferedWriter

- 数据源: 就是存放数据地方
- BufferedReader 类中，有属性Reader, 即可以封装一个节点流
该节点流可以是任意的.只要是Reader子类

|抽象基类|字节输入流|字节输出流|字符输入流|字符输出流||
|--------|---------|--------|----------|---------|----|
|抽象基类|InputStream|OutputStream|Reader|Writer|节点流
|访问文件|FileInputStream|FileOutputStream|FileReader|FileWriter|节点流|
|访问数组|ByteArrayInputStream|ByteArrayOutputStream|CharArrayReader|CharArrayWriter|节点流|
|访问管道|PipedInputStream|PipedOutputStream|PipedReader|PipedWriter|节点流|
|访问字符串|||StringReader|StringWriter|处理流|
|缓冲流|BufferedInputStream|BufferedOutputStream|BufferedReader|BufferedWriter|处理流|
|转换流|||InputStreamReader|OutputStreamWriter|处理流|
|对象流|ObjectInputStream|ObjectOutputStream| | |处理流|
|抽象基类|FilterInputStream|FilterOutputStream|FilterReader|FilterWriter|处理流|
|打印流||PrintStream||PrintWriter|处理流|
|推回输入流|PushbackInputStream| |PushbackReader| |处理流|
|特殊流|DataInputStream|DataOutputStream| | |处理流|

> 处理流-BufferedReader和BufferedWriter。BufferedReader 和 BufferedWriter 属于字符流，是按照字符来读取数据的>关闭时，只需要关闭外层流即可
### 节点流和处理流的区别和联系
1. 节点流是底层流/低级流,直接跟数据源相接。
2. 处理流包装节点流，既可以消除不同节点流的实现差异，也可以提供更方便的方法来完成输入输出。
3. 处理流(也叫包装流)对节点流进行包装，使用了修饰器设计模式，不会直接与数据源相连

- 处理流的功能主要体现在以下两个方面:
1. 性能的提高:主要以增加缓冲的方式来提高输入输出的效率
2. 操作的便捷:处理流可能提供了一系列便捷的方法来一次输入输出大批量的数据,使用更加灵活方便
```java
import java.io.*;
public class Main {
    public static void main(String[] args) {
        BufferReader_ bufferReader_ = new BufferReader_(new FileReader_());
        // bufferReader_.readFiles(10);
        bufferReader_.readFile();

        // 这次希望通过 BuffereReader_ 多次读取字符串
        BufferReader_ bufferReader_2 = new BufferReader_(new StringFreader_());
        bufferReader_2.readString(5);
    }
}

abstract class Reader_ { // 抽象类
    public void readFile() {};

    public void readString() {};
}

class FileReader_ extends Reader_{
    public void readFile() {
        System.out.println("对文件进行读取");
    }
}

class StringFreader_ extends Reader_ {
    public void readString() {
        System.out.println("读取字符串... ");
    }
}

// 处理流
class BufferReader_ extends Reader_ {
    private Reader_ reader_; // 属性是 Reader_ 类型

    public BufferReader_(Reader_ reader_) {
        this.reader_ = reader_;
    }

    public void readFile() { // 封装一层
        reader_.readFile();
    }

    // 方法更加灵活，多次读取文件，或者加缓冲char[]...
    public void readFiles(int num) {
        for (int i = 0; i < num; i++) {
            reader_.readFile();
        }
    }

    // 拓展 readString, 批量处理字符串数据
    public void readString(int num) {
        for (int i = 0; i < num; i++) {
            reader_.readString();
        }
    }
}
```
#### BufferedReader
```java
import java.io.*;

/**
 * 演示BufferedReader 使用
 * */
public class Main {
    public static void main(String[] args) throws Exception {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\333.txt";

        // 创建 bufferedReader
        BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath));

        // 读取
        String line; // 按行读取
        /**
         * 1. bufferedReader.readLine() 按行读取，当读取内容为空时，表示文件读取完毕
         *
         * */
        while ((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
        };

        // 关闭流，这里注意，只需要关闭BufferedReader, 因为底层会自动的去关闭节点流
        bufferedReader.close();

    }
}

```
#### BufferedWriter
```java
import java.io.*;

/**
 * 演示BufferedWriter 使用
 * */
import java.io.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;


public class Main {
    public static void main(String[] args) throws Exception {
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\333.txt";

        // 创建 BufferedWriter。new FileWriter(filePath, true)：以追加的方式来写入，如果没有true，则表示是覆盖
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(filePath, true));

        bufferedWriter.write("hello 张三！");
        bufferedWriter.newLine(); // 插入一个系统相关的换行
        bufferedWriter.write("hello, 李四");
        bufferedWriter.newLine(); // 插入一个系统相关的换行

        // 关闭流，这里注意，只需要关闭bufferedWriter, 因为底层会自动的去关闭节点流
        bufferedWriter.close();
    }
}

```
#### Buffered拷贝
```java
import java.io.*;
/**
 * Buffered拷贝
 * */
public class Main {
    public static void main(String[] args) throws Exception {

        // 1. BufferedReader、BufferedWrite 是按照字符操作的
        // 2. 不要去操作二进制文件，可能造成文件损坏 （比如：doc、ppt、xls、jpg、mp3、mp4、avi、wmv）
        String srcFilePath = "C:\\Users\\18831\\Desktop\\工作\\333.txt";
        String destFilePath = "C:\\Users\\18831\\Desktop\\工作\\444.txt";
        BufferedReader br = null;
        BufferedWriter bw = null;
        String line;
        try {

            br = new BufferedReader(new FileReader(srcFilePath));
            bw = new BufferedWriter(new FileWriter(destFilePath));

            // readline 读取一行内容，但是没有换行
            while ((line = br.readLine()) != null) {
                // 每读取一行，就写入
                bw.write(line);
                bw.newLine();
            }


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } finally {
            // 关闭流
            try {

                if (br != null) {

                    br.close();
                }

                if (bw != null) {
                    bw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }



    }
}

```