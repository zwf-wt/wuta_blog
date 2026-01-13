# 网络
## 网络的相关概念
### 网络通信
1. 概念：两台设备之间通过网络实现数据传输
2. 网络通信：将数据通过网络从一台设备传输到另一台设备
3. `java.net` 包下提供了一系列的类或接口，供程序员使用，完成网络通信
### 网络
1. 概念：两台或多台设备通过一定物理设备连接起来构成了网络
2. 根据网络的覆盖范围不同，对网络进行分类：
- 局域网（LAN）：Local Area Network，简称LAN，是指在某一区域由多台计算机组成的网络。覆盖范围最小，仅仅覆盖一个教室、一个办公室或一个家庭
- 城域网（MAN）：Metropolitan Area Network，简称MAN，是介于局域网和广域网之间规模较大的一种网络。覆盖范围可跨越一个城市，通常由一个城市中的计算机系统组成。覆盖范围较大，可以覆盖一个城市
- 广域网（WAN）：Wide Area Network，简称WAN，是覆盖范围最大的网络，可以覆盖一个国家、一个地区，甚至全球。覆盖范围最大，可以覆盖一个国家、一个地区，甚至全球
### IP地址
1. 概念：用于唯一标识网络中的每台计算机
2. 查看IP地址：`ipconfig`
3. ip地址的表示形式：点分十进制 `xx.xx.xx.xx
4. 每一个十进制数的范围：0~255
5. ip地址分为两部分：网络地址和主机地址，比如192.168.1.100
6. IPV6是用于替代IPV4的下一代协议，它的地址长度为128位，可以提供更多的地址空间。其地址数量号称可以为全世界的每一粒沙子编上一个地址
7. 由于IPV4最大的问题在于网络地址的缺乏，严重制约了互联网的应用和发展。IPV6的使用，不仅能解决网络地址资源数量的问题，而且也解决了多种接入设备连入互联网的障碍
#### IPV4地址分类
1. A类地址：0 + 7位网络地址 + 24位主机地址, 比如：0.0.0.0~127.255.255.255
2. B类地址：10 + 14位网络地址 + 16位主机地址, 比如：128.0.0.0~191.255.255.255
3. C类地址：110 + 21位网络地址 + 8位主机地址, 比如：192.0.0.0~223.255.255.255
4. D类地址：1110 + 28位多播地址, 比如：224.0.0.0~239.255.255.255
5. E类地址：11110 + 27位保留地址, 比如：240.0.0.0~255.255.255.255
6. 特殊IP地址：127.0.0.1，表示本机地址

- IPV4: 4个字节，32位，1个字节的范围是0~255。比如：192.168.1.100
- IPV6: 16个字节，128位，是IPV4的4倍。1个字节的范围是0~FFFF。比如：2001:0db8:85a3:0000:0000:8a2e:0370:7334
### 域名
1. `www.baidu.com`
2. 好处：为了方便记忆，避免记忆复杂的IP地址
3. 将ip地址和域名对应起来，通过DNS服务器解析
### 端口号
1. 概念：用于标识计算机上某个特定的网络程序
2. 端口号的范围：0~65535
3. 0~1024已经被系统占用，比如：80端口，用于HTTP服务。21端口，用于FTP服务。22端口，用于SSH服务。25端口，用于SMTP服务。
4. 常见的网络程序端口号：tomcat：8080，mysql：3306，oracle：1521，redis：6379, sqlserver：1433
### 网络通信协议
#### TCP/IP协议
TCP/IP(Transmission Control Protocol/Internet Protocol，传输控制协议/网间协议)是指能够在多个不同网络间实现信息传输的协议簇。TCP/IP协议不仅仅指的是TCP和IP两个协议，而是指一个由FTP、SMTP、TCP、UDP、IP等协议构成的协议簇， 只是因为TCP/IP协议是Internet国际互联网络的基础，所以被称TCP/IP协议。由网络层的IP协议和传输层的TCP协议组成。
> 人和人交流(通讯)：依靠语言。语言本身就是一种协议。数据的组织形式就是协议。

|OSI模型|TCP/IP模型|TCP/IP模型各层对应协议|
|---|---|---|
|应用层|应用层|HTTP、FTP、Telnet、DNS|
|表示层|应用层|HTTP、FTP、Telnet、DNS|
|会话层|应用层|HTTP、FTP、Telnet、DNS|
|传输层|传输层|TCP、UDP|
|网络层|网络层|IP、ICMP、IGMP|
|数据链路层|物理 + 数据链路层|Link|
|物理层|物理 + 数据链路层|Link|
#### TCP协议 传输控制协议
1. 使用TCP协议前，须先建立TCP连接，形成传输数据通道
2. 传输前，采用“三次握手”方式，确认连接可靠
3. TCP协议进行通信的两个应用进程：客户端和服务器端
4. 在连接中可进行大数据量的传输
5. 传输完毕，需释放已建立的连接，效率低
#### UDP协议 用户数据报协议
1. 将数据、源、目的封闭成数据包，不需要建立连接
2. 每个数据报的大小限制在64K内
3. 因无连接，故是不可靠的协议
4. 发送数据结束时无需释放资源(因为不是面向连接的)，速度快

## InetAddress类
```java
/**
 * 1. 获取本机InetAddress对象 getLocalHost()
 * 2. 根据指定主机名/域名获取InetAddress对象 getByName(String host)
 * 3. 获取InetAddress对象的主机名 getHostName()
 * 4. 获取InetAddress对象的IP地址 getHostAddress()
 */
import java.net.InetAddress;
import java.net.UnknownHostException;

//TIP 要<b>运行</b>代码，请按 <shortcut actionId="Run"/> 或
// 点击装订区域中的 <icon src="AllIcons.Actions.Execute"/> 图标。
public class Main2 {
    public static void main(String[] args) throws UnknownHostException {

        // 1. 获取本机的InetAddress对象
        InetAddress localHost = InetAddress.getLocalHost();
        System.out.println(localHost);

        // 2. 根据指定主机名 获取 InetAddress 对象
        InetAddress host1 = InetAddress.getByName("DESKTOP-01RAALBV");
        System.out.println("host = " + host1);

        // 3. 根据域名返回 InetAddress 对象，比如 www.baidu.com 对应
        InetAddress host2 = InetAddress.getByName("www.baidu.com");
        System.out.println("host2 = " + host2); // www.baidu.com/110.242.69.21

        // 4. 通过InetAddress 对象，获取对应的地址
        String hostAddress = host2.getHostAddress(); //
        System.out.println("host2 对应的IP = " + hostAddress);

        // 5. 通过 InetAddress 对象，获取对应的主机名/或者域名
        String hostName = host2.getHostName();
        System.out.println("host 对应的主机名/域名 = " + hostName);
    }
}
```
## Socket
1. 套接字（Socket）开发网络应用程序被广泛采用，以至于成为事实上的标准。
2. 通信的两端都要有Socket, 是两台机器间通信的端点
3. 网络通信其实就是Socket间的通信。
4. Socket 允许程序把网络连接当成一个流，数据在两台机器间通过Socket传输。
5. 一般主动发起通信的应用程序属于客户端，等待通信请求的为服务器端。

```java
/**
 * 1. 编写一个服务端，和一个客户端
 * 2. 服务器端在 9999 端口监听
 * 3. 客户端连接到服务端，发送 "hello, server"， 然后退出
 * 4. 服务器端接收到 客户端发送的信息，输出，并退出
 */

/* --------- 服务端 ----------- */
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketTCP01Server {
    public static void main(String[] args) throws IOException {
        // 1. 在本机的 9999 端口监听，等待连接。要求在本机没有其它服务在监听 9999
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端， 在9999端口监听，等待连接...");

        // 2. 当没有客户端连接 9999 端口时，程序会 阻塞，等待连接
        //    如果没有客户端连接，则会返回Socked对象，程序继续
        Socket socket = serverSocket.accept();
        System.out.println("socket = " + socket.getClass());

        // 3. 通过socket.getInputStream() 读取客户端写入到数据通道的数据，显示
        InputStream inputStream = socket.getInputStream();

        // 4. IO读取
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            System.out.println(new String(buf, 0, readLen)); // 根据读取到的实际长度，显示内容
        }

        // 5. 关闭流和socket
        inputStream.close();
        System.out.println("服务端退出");
    }
}

/* --------- 客户端 ----------- */
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;

public class SocketTCP01Client {
    public static void main(String[] args) throws IOException {
        // 1. 连接服务器(ip, 端口. 连接本机的 9999 端口，如果连接成功，返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        System.out.println("客户端 socket 返回 = " + socket.getClass());

        // 2. 连接上后，生成Socket。得到和 socket 对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();

        // 3. 通过输出流，写入数据到 数据通道
        outputStream.write("hello, server".getBytes());

        // 4. 关闭流对象和socket, 必须关闭
        outputStream.close();
        socket.close();
        System.out.println("客户端退出....");
    }
}

/**
 * 1. 编写一个服务端，和一个客户端
 * 2. 服务器端在 9999 端口监听
 * 3. 客户端连接到服务端，发送 "hello, server"， 并接收服务器端回发的"hello, client"，再退出
 * 4. 服务器端接收到 客户端发送的信息，输出，并退出，并发送"hello, client", 再退出
 */
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketTCP02Server {
    public static void main(String[] args) throws IOException {
        // 1. 在本机的 9999 端口监听，等待连接。要求在本机没有其它服务在监听 9999
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端， 在9999端口监听，等待连接...");

        // 2. 当没有客户端连接 9999 端口时，程序会 阻塞，等待连接
        //    如果没有客户端连接，则会返回Socked对象，程序继续
        Socket socket = serverSocket.accept();
        System.out.println("socket = " + socket.getClass());

        // 3. 通过socket.getInputStream() 读取客户端写入到数据通道的数据，显示
        InputStream inputStream = socket.getInputStream();

        // 4. IO读取
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            System.out.println(new String(buf, 0, readLen)); // 根据读取到的实际长度，显示内容
        }
        // 5. 获取socket 相关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello, client".getBytes());
        // 设置结束标记
        socket.shutdownOutput();
        // 5. 关闭流和socket
        outputStream.close();
        inputStream.close();
        socket.close();
        serverSocket.close();
        System.out.println("服务端退出");
    }
}

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;

public class SocketTCP02Client {
    public static void main(String[] args) throws IOException {
        // 1. 连接服务器(ip, 端口. 连接本机的 9999 端口，如果连接成功，返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        System.out.println("客户端 socket 返回 = " + socket.getClass());

        // 2. 连接上后，生成Socket。得到和 socket 对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();

        // 3. 通过输出流，写入数据到 数据通道
        outputStream.write("hello, server".getBytes());
        // 设置结束标记
        socket.shutdownOutput();

        // 4. 获取和socket关联的输入流，读取数据(字节)，并显示
        InputStream inputStream = socket.getInputStream();
        byte[] buf = new byte[2024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            System.out.println(new String(buf, 0, readLen));
        }


        // 5. 关闭流对象和socket, 必须关闭
        inputStream.close();
        outputStream.close();
        socket.close();
        System.out.println("客户端退出....");
    }
}


/**
 * 1. 编写一个服务端，和一个客户端
 * 2. 服务器端在 9999 端口监听
 * 3. 客户端连接到服务端，发送 "hello, server"， 并接收服务器端回发的"hello, client"，再退出
 * 4. 服务器端接收到 客户端发送的信息，输出，并退出，并发送"hello, client", 再退出
 * 使用字符流
 */
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketTCP03Server {
    public static void main(String[] args) throws IOException {
        // 1. 在本机的 9999 端口监听，等待连接。要求在本机没有其它服务在监听 9999
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端， 在9999端口监听，等待连接...");

        // 2. 当没有客户端连接 9999 端口时，程序会 阻塞，等待连接
        //    如果没有客户端连接，则会返回Socked对象，程序继续
        Socket socket = serverSocket.accept();
        System.out.println("socket = " + socket.getClass());

        // 3. 通过socket.getInputStream() 读取客户端写入到数据通道的数据，显示
        InputStream inputStream = socket.getInputStream();

        // 4. IO读取，使用字符流，使用InputStreamReader 将 inputStream 转成字符流
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String s = bufferedReader.readLine();
        System.out.println(s); // 输出


        // 5. 获取socket 相关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        // 使用字符输出流的方式回复信息
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
        bufferedWriter.write("hello client 字符流");
        bufferedWriter.newLine(); // 插入一下换行符，表示回复内容的结束
        bufferedWriter.flush(); // 注意需要手动的flush

        // 6. 关闭流和socket
        bufferedReader.close();
        bufferedWriter.close();
        socket.close();
        serverSocket.close();
        System.out.println("服务端退出");
    }
}

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;

public class SocketTCP03Client {
    public static void main(String[] args) throws IOException {
        // 1. 连接服务器(ip, 端口. 连接本机的 9999 端口，如果连接成功，返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        System.out.println("客户端 socket 返回 = " + socket.getClass());

        // 2. 连接上后，生成Socket。通过socket.getOutputStream() 得到 和 socket 对象关联的输出流对象
        OutputStream outputStream = socket.getOutputStream();

        // 3. 通过输出流，写入数据到 数据通道, 使用字符流
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
        bufferedWriter.write("hello, serve 字符流");
        bufferedWriter.newLine(); // 插入一个换行符，表示写入的内容结束，注意，要求对方使用readLine()
        bufferedWriter.flush(); // 如果使用的字符流，需要手动刷新，否则数据不会写入数据通道

        // 4. 获取和socket关联的输入流，读取数据(字符)，并显示
        InputStream inputStream = socket.getInputStream();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String s = bufferedReader.readLine();
        System.out.println(s);

        // 5. 关闭流对象和socket, 必须关闭
        bufferedReader.close(); // 关闭外层流
        bufferedWriter.close();
        socket.close();
        System.out.println("客户端退出....");
    }
}

/**
 * 1. 编写一个服务服务端，和一个客户端
 * 2. 服务器端在 9999 端口监听
 * 3. 客户端连接到服务器端，发送一张图片
 * 4. 服务器端接收到客户端发送的图片，保存到本地，并发送成功后的反馈给客户端, 然后退出
 * 5. 客户端接收到服务器端反馈后退出
 */
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

public class StreamUtils {

    public static byte[] steamToByteArray(InputStream is) throws Exception {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] b = new byte[1024]; // 字节数据
        int len;
        while((len = is.read(b)) != -1) { // 循环读取
            bos.write(b, 0, len); // 把读取到的数据，写入bos
        }

        byte[] array = bos.toByteArray(); // 然后将bos，转成字节数据
        bos.close();

        return array;
    }

    public static String streamToString(InputStream is) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));

        StringBuilder builder = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null) {
            builder.append(line + "\r\n");
        }

        return builder.toString();
    }
}


import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class TCPFileUploadServer {
    public static void main(String[] args) throws Exception {

        //1. 服务端在本机监听9999端口
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务端在9999端口监听...");

        // 2. 等待连接
        Socket socket = serverSocket.accept();

        // 3. 读取客户端发送的数据，通过 socket 得到输入流
        BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
        byte[] bytes = StreamUtils.steamToByteArray(bis);

        // 4. 将得到 bytes 数组, 写入到指定的路径，就得到一个文件了
        String destFilePath = "D:\\coding_after\\java_test\\thread\\custom_network\\src\\img.png";
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(destFilePath));
        bos.write(bytes);
        bos.close();

        // 向客户端回复 “服务端已收到图片”
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        writer.write("服务端已收到图片");
        writer.flush(); // 把内容刷新到数据通道
        socket.shutdownOutput(); // 设置写入结束标记

        // 关闭其它资源
        writer.close();
        bis.close();
        socket.close();
        serverSocket.close();
    }
}


import java.io.*;
import java.net.InetAddress;
import java.net.Socket;

public class TCPFileUploadClient {
    public static void main(String[] args) throws Exception {

        // 1. 客户端连接服务端 9999， 得到Socket 连接
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        // 创建读取磁盘文件的输入流
        String filePath = "C:\\Users\\18831\\Desktop\\工作\\a.png";
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(filePath));

        // bytes 就是 filePath 对应的字节数组
        byte[] bytes = StreamUtils.steamToByteArray(bis);

        // 通过 socket 获取到输出流，将bytes数据发送给服务器
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());
        bos.write(bytes); // 将文件对应的字节数组的内容，写入到数据通道
        bis.close();
        socket.shutdownOutput(); // 设置写入数据的结束标记

        // 接收从服务器回复的消息
        InputStream inputStream = socket.getInputStream();
        // 使用StreamUtils的方法，直接将 inputStream 读取到的内容 转成字符串
        String s = StreamUtils.streamToString(inputStream);
        System.out.println(s);

        // 关闭相关的流
        bos.close();
        socket.close();
    }
}

```
## netstat 指令
1. netstat -an 可以查看当前主机网络情况，包括端口监听和网络连接情况
2. netstat -an | more 可以分页显示
3. 要求在 cmd 窗口下执行`win + r`

> 说明
1. Listening 表示某个端口在监听
2. 如果有一个外部程序(客户端)连接到该端口，就会显示一条连接信息
3. 可以输入 `Ctrl + c` 退出

## TCP网络编程
当客户端连接到服务端后，实际上客户端也是通过一个端口和服务端进行通讯的，这个端口是TCP/IP来分配的。

## UDP网络通信编程
1. 类DatagramSocket 和 DatagramPacket 实现了基于UDP协议的网络通信
2. UDP数据报通过数据报套接字 DatagramSocket 发送和接收，系统不保证UDP数据报一定能够安全送到目的地，也不能确定什么时候可以抵达。
3. DatagramPacket 对象封装了UDP数据报，在数据报中包含了发送端的IP地址和端口号以及接收端的IP地址和端口号
4. UDP协议中每个数据报都给出了完整的地址信息，因此无须建立发送和接收方的连接。

> 说明
1. 没有明确的服务端和客户端，演变成数据的发送端和接收端
2. 接收数据和发送数据是通过 DatagramSocket 对象完成的
3. 将数据封装到 DatagramPacket 对象中进行装包。
4. 当接收到 DatagramPacket 对象，需要进行拆包，取出数据
5. DatagramSocket 可以指定在哪个端口接收数据。

```java
/**
 * 1. 编写一个接收端A，和一个发送端B
 * 2. 接收端A在9999端口等待接收数据(receive)
 * 3. 发送端B向接收端A发送数据"hello, 明天吃火锅"
 * 4. 接收端A接收到数据后，并显示在控制台,并向发送端B回复 "好的，明天见"。再退出
 * 5. 发送端接收回复的数据，并显示在控制台，然后退出
 */
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPReceiverA {
    public static void main(String[] args) throws IOException {
        // 1. 创建一个 DatagramSocket 对象，准备在9999接收数据
        DatagramSocket socket = new DatagramSocket(9999);

        // 2. 构建一个 DatagramSocket 对象，准备接收数据
        byte[] buff = new byte[1024]; // UDP协议，一个数据包最大 64K
        DatagramPacket packet = new DatagramPacket(buff, buff.length);

        // 3. 调用接收方法，将通过网络传输的 DatagramPacked 对象，填充到 packet 对象
        //    当有数据包发送到 本机的 9999 端口时，就会接收到数据。如果没有数据包发送到 本机的9999端口，就会阻塞等待
        System.out.println("接收端 等待接收数据。。。");
        socket.receive(packet);

        // 4. 可以把 packet 进行拆包，取出数据，并显示。。。
        int length = packet.getLength();
        byte[] data = packet.getData();
        String s = new String(data, 0, length);
        System.out.println(s);

        // ================= 回复消息给B端，将需要发送的数据，封装到 DatagramPacket 对象
        data = "好的，明天见".getBytes();
        packet = new DatagramPacket(data, data.length, InetAddress.getByName("127.0.0.1"), 9998);
        socket.send(packet); // 发送


        // 5. 关闭资源
        socket.close();
        System.out.println("A 端退出");
    }
}


import java.io.IOException;
import java.net.*;

public class UDPSenderB {
    public static void main(String[] args) throws SocketException, UnknownHostException, IOException {
        // 1. 创建 DatagramSocket 对象，准备在9998端口，接收数据
        DatagramSocket socket = new DatagramSocket(9998);

        // 2. 将需要发送的数据，封装到 DatagramPacket 对象
        byte[] data = "hello 明天吃火锅".getBytes(); // netAddress.getByName("192.168.12.1")
        // 封装的 DatagramPacket 对象 data内容字节数组，data.length, 主机(IP), 端口
        DatagramPacket packet = new DatagramPacket(data, data.length, InetAddress.getByName("127.0.0.1"), 9999);

        socket.send(packet);

        // 3. ======== 接收从A端回复的信息
        //      构建一个DatagramPacket 对象，准备接收数据
        byte[] buf = new byte[1024];
        packet = new DatagramPacket(buf, buf.length);
        // 调用 接收方法，将通过网络传输的 DatagramPacket 对象
        // 填充到 packet 对象
        // 当有数据包发送到本机的9998端口时，应付接收到数据，如果没有数据包发送到本机的9998端口，应付阻塞等待。
        socket.receive(packet);
        // 把packet 进行拆包，取出数据，并显示。。。
        int length = packet.getLength(); // 实际接收到的数据字节长度
        data = packet.getData(); // 接收到数据
        String s = new String(data, 0, length);
        System.out.println(s);


        // 关闭资源
        socket.close();
        System.out.println("B端退出");
    }
}
```
## 练习
```java
/**
 * 1. 使用字符流的方式，编写一个客户端程序和服务器端程序
 * 2. 客户端发送"name", 服务端接收到后，返回"我是 nova", nova是你的名字
 * 3. 客户端发送"hobby", 服务器端接收到后，返回"编写java程序", 编写java程序是你的爱好
 * 4. 如果不是这两个问题，回复"你说啥呢"
 */

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.util.Scanner;

public class Homework01Client {
    public static void main(String[] args) throws IOException {
        // 1. 连接服务器(ip, 端口)
        // 连接本机的9999端口，如果连接成功，返回socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);

        /**
         * 2. 连接上后，生成 Socket,通过socket.getOutputStream()得到和socket对象关联的输出流对象
         * */
        OutputStream outputStream = socket.getOutputStream();
        // 3. 通过输入流，写入数据到 数据通道，使用字符流
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));

        // 从键盘读取用户的问题
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入你的问题：");
        String question = scanner.next();

        bufferedWriter.write(question);
        bufferedWriter.newLine(); // 插入一个换行符，表示写入的内容结束，要求对方使用readLine()
        bufferedWriter.flush(); // 如果使用的字符流，需要手动刷新，否则数据不会写入数据通道

        // 4. 获取 和 socket关联的输入流，读取数据(字符)，并显示
        InputStream inputStream = socket.getInputStream();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String s = bufferedReader.readLine();
        System.out.println(s);

        // 5. 关闭流对象和socket，必须关闭
        bufferedReader.close();
        bufferedWriter.close();
        socket.close();
        System.out.println("客户端退出...");
    }
}


import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Homework01Server {
    public static void main(String[] args) throws IOException {
        /**
         * 1. 在本机的9999端口监听，等待连接
         * 要求在本机没有其它服务在监听9999
         * 这个ServerSocket可以通过accept()返回多个Socket,多个客户端连接服务器的并发
         * */
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务器，在9999端口监听，等待连接...");

        // 2. 当没有客户端连接9999端口时，程序 会阻塞，等待连接
        // 如果有客户端连接，则会返回Socket对象，程序继续
        Socket socket = serverSocket.accept();
        System.out.println("服务器 socket = " + socket.getClass());

        // 3. 通过 socket.getInputStream() 读取客户端写入到数据通道的数据，显示
        InputStream inputStream = socket.getInputStream();

        // 4. IO读取，使用字符流，使用InputStreamReader 将 inputStream 转成字符流
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String s = bufferedReader.readLine();
        String answer = "";

        if ("name".equals(s)) {
            answer = "我是张三";
        } else if ("hobby".equals(s)) {
            answer = "编写java程序";
        } else {
            answer = "你说啥子";
        }

        // 5. 获取socket相关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        // 使用字符输出流的方式回得信息
        BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
        bufferedWriter.write(answer);
        bufferedWriter.newLine(); // 插入一个换行符，表示回复内容的结束
        bufferedWriter.flush(); // 注意需要手动的flush

        // 6 关闭流和socket
        socket.close();
        bufferedReader.close();
        bufferedWriter.close();
    }
}
```
```java
/**
 * 1. 编写一个接收端A，和一个发送端B，使用UDP协议完成
 * 2. 接收端在 8888 端口等待接收数据(receive)
 * 3. 发送端向接收端 发送 数据 "四大名著有哪些"
 * 4. 接收端接收到发送端的问题后，返回”四大名著是。。。“，否则返回what
 * 5. 接收端和发送端程序退出
 */

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class Homework02ReceiverA {
    public static void main(String[] args) throws IOException {
        // 1. 创建一个 DatagramSocket 对象，准备在8888接收数据
        DatagramSocket socket = new DatagramSocket(8888);
        // 2. 构建一个 DatagramPacket 对象，准备接收数据
        byte[] buf = new byte[1024];
        DatagramPacket packet = new DatagramPacket(buf, buf.length);

        // 3. 调用接收方法，将通过网络传输的 DatagramPacket 对象填充到 packet 对象
        // 当有数据包发送到本机的8888端口时，就会接收到数据，如果没有数据包发送到本机的8888端口，就会阻塞等待
        System.out.println("接收端A等待接收数据...");
        socket.receive(packet);

        // 4. 可以把packet 进行拆包，取出数据，并显示
        int lentgh = packet.getLength(); // 实际接收到的数据字节长度
        byte[] data = packet.getData(); // 接收到数据
        String s = new String(data, 0, lentgh);

        // 判断接收到的信息是什么
        String answer = "";
        if("四大名著".equals(s)) {
            answer = "四大名著.......";
        } else {
            answer = "what?";
        }

        // ===== 回复信息给B端
        // 将需要发送的数据，封装到 DatagramPacket 对象
        data = answer.getBytes();
        // 说明：封装的 DatagramPacket 对象 data 内容字节数组，data.length, 主机号，端口
        packet = new DatagramPacket(data, data.length, InetAddress.getByName("127.0.0.1"), 8889);
        socket.send(packet); // 发送

        // 5. 关闭资源
        socket.close();
        System.out.println("A端退出...");
    }
}


import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Scanner;

public class Homework02SenderB {
    public static void main(String[] args) throws IOException {
        // 1. 创建 DatagramSocket 对象，准备在8889端口上接收数据
        DatagramSocket socket = new DatagramSocket(8889);

        // 2. 将需要发送的数据，封装到 DatagramPacket 对象
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入你的问题：");
        String question = scanner.next();
        byte[] data = question.getBytes();

        DatagramPacket packet = new DatagramPacket(data, data.length, InetAddress.getByName("127.0.0.1"), 8888);

        socket.send(packet);

        // 3. ======= 接收A端回复的信息
        // 3.1. 构建一个DatagramPacket对象，准备接收数据
        byte[] buf = new byte[1024]; // UDP协议，最大接收64K
        packet = new DatagramPacket(buf, buf.length);
        // 3.2. 调用接收方法，将通过网络传输的 DatagramPacket 对象，填充到 packet 对象
        // 当有数据包发送到本机的8888端口时，就会接收到数据，如果没有数据包发送到本机的8888端口，就会阻塞等待。
        socket.receive(packet);

        // 3.3 可以把 packet 进行拆包，取出数据，并显示
        int length = packet.getLength(); // 实际接收到的数据字节长度
        data = packet.getData(); // 接收到数据
        String s = new String(data, 0, length);
        System.out.println(s);


        // 4. 关闭资源
        socket.close();
        System.out.println("B端退出...");
    }
}
```
```java
/**
 * 1. 编写客户端程序和服务器端程序
 * 2. 客户端可以输入一个音乐文件名，比如：xxx.mp3，服务端收到音乐名后，可以给客户端返回这个音乐文件，如果服务器没有这个文件，返回一个默认的音乐即可。
 * 3. 客户端收到文件后，保存到本地e://
 */

// ------------------------------  StreamUtils  ------------------------------------
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

public class StreamUtils {

    public static byte[] steamToByteArray(InputStream is) throws Exception {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] b = new byte[1024]; // 字节数据
        int len;
        while((len = is.read(b)) != -1) { // 循环读取
            bos.write(b, 0, len); // 把读取到的数据，写入bos
        }

        byte[] array = bos.toByteArray(); // 然后将bos，转成字节数据
        bos.close();

        return array;
    }

    public static String streamToString(InputStream is) throws Exception {
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));

        StringBuilder builder = new StringBuilder();
        String line;
        while((line = reader.readLine()) != null) {
            builder.append(line + "\r\n");
        }

        return builder.toString();
    }
}

// ------------------------------  Homework03Server  ------------------------------------
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Homework03Server {
    public static void main(String[] args) throws Exception {
        // 1. 监听 9999 端口
        ServerSocket serverSocket = new ServerSocket(9999);

        // 2. 等待客户端连接
        Socket socket = serverSocket.accept();

        // 3. 读取，客户端发送要下载文件的名字
        InputStream inputStream = socket.getInputStream();
        byte[] b = new byte[1024];
        int len = 0;
        String downLoadFileName = "";
        while ((len = inputStream.read(b)) != -1) {
            downLoadFileName += new String(b, 0, len);
        }

        System.out.println("客户端希望下载文件名 = " + downLoadFileName);

        // 如果客户下载的是 123 我们就返回该文件，否则一律返回 aaa
        String resFileName = "";
        if ("123".equals(downLoadFileName)) {
            resFileName = "D:\\coding_after\\java_test\\thread\\custom_network\\src\\1233333.mp3";
        } else {
            resFileName = "D:\\coding_after\\java_test\\thread\\custom_network\\src\\aaa.mp3";
        }

        // 4. 创建一个输入流，读取文件
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(resFileName));

        // 5. 使用工具类 StreamUtils, 读取文件到一个字节数组
        byte[] bytes = StreamUtils.steamToByteArray(bis);

        // 6. 得到 soccket 关联的输出流
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());

        // 7. 写入到数据里面，返回给客户端
        bos.write(bytes);
        socket.shutdownOutput();

        // 8. 关闭想装的资源
        bis.close();
        inputStream.close();
        socket.close();
        serverSocket.close();
        System.out.println("服务端退出...");
    }
}

// ------------------------------  Homework03Client  ------------------------------------
import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class Homework03Client {
    public static void main(String[] args) throws Exception {
        // 1. 接收用户输入，指定下载文件名
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入下载文件名");
        String downloafFileName = scanner.next();

        // 2. 客户端连接服务器，准备发送
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);

        // 3. 获取和 socket 关联的输出流
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write(downloafFileName.getBytes());

        // 设置写入结束的标志
        socket.shutdownOutput();

        // 4. 读取服务端返回的文件(字节数据)
        BufferedInputStream bis = new BufferedInputStream(socket.getInputStream());
        byte[] bytes = StreamUtils.steamToByteArray(bis);

        // 5. 得到一个输出流，准备将 bytes 写入到磁盘文件
        String filePath = "d:\\" + downloafFileName + ".mp3";
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
        bos.write(bytes);

        // 6. 关闭相关的资源
        bos.close();
        bis.close();
        outputStream.close();
        socket.close();
        System.out.println("客户端下载完毕，退出...");
    }
}

```