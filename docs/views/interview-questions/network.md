# 计算机网络

## 1. HTTP 三次握手
HTTP协议是基于TCP协议的，而TCP协议使用三次握手建立连接。在HTTP中，并不直接进行三次握手，而是通过底层的TCP协议来实现连接的建立。

在TCP协议中，三次握手的过程如下：

客户端向服务器发送一个带有SYN标志的数据包，请求建立连接。
服务器接收到客户端发送的SYN包后，会回复一个带有SYN/ACK标志的数据包，表示同意建立连接。
最后，客户端再向服务器发送一个带有ACK标志的数据包，表示连接建立成功。
这样，经过三次握手，客户端和服务器就建立了可靠的连接，可以进行数据传输。HTTP协议在这个基础上进行数据的传输与通信。


## 2. HTTP 协议和HTTPS 区别
- `http`是超文本传输协议，信息是明文传输，`https`是具有安全性的`ssl`解密传输协议
- `http`和`https`连接方式完全不同,端口也不同,`http`是`80`,`https`是`443`
- `http`的连接很简单，是无状态的，`https`协议是由`ssl+http`协议构建的可进行加密传输，身份认证的网络协议，比`http`协议安全

## 3. HTTP常见状态码？
- `100`: 这个状态码是告诉客户端应该继续发送请求，这个临时响应是用来通知客户端的，部分的请求服务器已经接受，但是客户端应继续发送求请求的剩余部分，如果请求已经完成，就忽略这个响应，而且服务器会在请求完成后向客户发送一个最终的结果
- `200`: 这个是最常见的 `http` 状态码，表示服务器已经成功接受请求，并将返回客广端所请求的最终结果
- `202`: 表示服务器已经接受了请求，但是还没有处理，而且这个请求最终会不会处理还不确定
- `204`: 服务器成功处理了请求，但没有返回任何实体内容 ，可能会返回新的头部元信息
- `301`: 客户端请求的网页已经永久移动到新的位置，当链接发生变化时返回 `301` 代码告诉客户端链接的变化，客户端保存新的链接，并向新的链接发出请求，已返回请求结果
- `404`: 请求失败，客户端请求的资源没有找到或者是不存在
- `500`: 服务器遇到未知的错误，导致无法完成客户端当前的请求.
- `503`: 服务器由于临时的服务器过载或者是维护，无法解决当前的请求

## 4. Get 和 post 不同
`Get` 是从服务器上获取数据，`post` 是向服务器传送数据在客户端，`get`通过`url` 提交数据，数据在`url` 中可以看到，`post` 方式数据放在 `html header` 中提交安全性问题
`Get`提交数据最多只能有 `1024` 字节，`post` 没有限制


## 5. 一个页面从输入 URL 页面加载显示完成，这个过程中都发生了什么?
分为4个步骤
1. 当发送一个`URL`请求时，不管这个`URL`是`Web`页面的`URL`还是`Web`页面上每个资源的 `URL`，浏览器都会开启一个线程来处理这个请求，同时在远程`DNS`服务器上启动一个`DNS`查询。这能使浏览器获得请求对应的`IP`地址
2. 浏览器与远程`Web`服务器通过`TCP`三次握手协商来建立一个`TCP/IP`连接。该握手包括一个同步报文，一个同步-应答报文和一个应答报文，这二个报文在 浏览器和服务器之间传递。该握手首先由客户端尝试建立起通信，然后服务器响应并接受客户端的请求，最后由客户端发出该请求已经被接受的报文
3. 一旦`TCP/IP`连接建立，浏览器会通过该连接向远程服务器发送`HTTP`的`GET`请求。远程服务器找到资源并使用`HTTP`响应返回该资源
4. 此时，`Web`服务器提供资源服务，客户端开始下载资源

## 6. get 请求传参长度的误
误区: 我们经常说`get`请求参数的大小存在限制，而`post`请求的参数大小是无限制的。实际上`HTTP`协议从未规定`GET/POST`的请求长度限制是多少。对`get`请求参数的限制是来源与浏览器或`web`服务器，浏览器或`web`服务器限制了`url`的长度。为了明确这个概念，我们必须再次强调下面几点`HTTP`协议 未规定`GET`和`POST`的长度限制`GET`的最大长度显示是因为 浏览器和`web`服务器限制了`URI`的长度不同的浏览器和`WEB`服务器，限制的最大长度不一样要支持`IE`，则最大长度为`2083byte`，若只支持`Chrome`，则最大长度`8182byte`

## 7. get 和 post 请求在缓存方面的区别
`post/get` 的请求区别，具体不再整述补充补充个`get`和`post`在缓存方面的区别: 
- `get`请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
- `post`不同，`post`做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。

> 因此`get`请求适合于请求缓存