import{_ as e,o,c as d,R as c}from"./chunks/framework.H90atOJc.js";const P=JSON.parse('{"title":"计算机网络","description":"","frontmatter":{},"headers":[],"relativePath":"views/interview-questions/network.md","filePath":"views/interview-questions/network.md"}'),t={name:"views/interview-questions/network.md"},a=c('<h1 id="计算机网络" tabindex="-1">计算机网络 <a class="header-anchor" href="#计算机网络" aria-label="Permalink to &quot;计算机网络&quot;">​</a></h1><h2 id="_1-http-三次握手" tabindex="-1">1. HTTP 三次握手 <a class="header-anchor" href="#_1-http-三次握手" aria-label="Permalink to &quot;1. HTTP 三次握手&quot;">​</a></h2><p>HTTP协议是基于TCP协议的，而TCP协议使用三次握手建立连接。在HTTP中，并不直接进行三次握手，而是通过底层的TCP协议来实现连接的建立。</p><p>在TCP协议中，三次握手的过程如下：</p><p>客户端向服务器发送一个带有SYN标志的数据包，请求建立连接。 服务器接收到客户端发送的SYN包后，会回复一个带有SYN/ACK标志的数据包，表示同意建立连接。 最后，客户端再向服务器发送一个带有ACK标志的数据包，表示连接建立成功。 这样，经过三次握手，客户端和服务器就建立了可靠的连接，可以进行数据传输。HTTP协议在这个基础上进行数据的传输与通信。</p><h2 id="_2-http-协议和https-区别" tabindex="-1">2. HTTP 协议和HTTPS 区别 <a class="header-anchor" href="#_2-http-协议和https-区别" aria-label="Permalink to &quot;2. HTTP 协议和HTTPS 区别&quot;">​</a></h2><ul><li><code>http</code>是超文本传输协议，信息是明文传输，<code>https</code>是具有安全性的<code>ssl</code>解密传输协议</li><li><code>http</code>和<code>https</code>连接方式完全不同,端口也不同,<code>http</code>是<code>80</code>,<code>https</code>是<code>443</code></li><li><code>http</code>的连接很简单，是无状态的，<code>https</code>协议是由<code>ssl+http</code>协议构建的可进行加密传输，身份认证的网络协议，比<code>http</code>协议安全</li></ul><h2 id="_3-http常见状态码" tabindex="-1">3. HTTP常见状态码？ <a class="header-anchor" href="#_3-http常见状态码" aria-label="Permalink to &quot;3. HTTP常见状态码？&quot;">​</a></h2><ul><li><code>100</code>: 这个状态码是告诉客户端应该继续发送请求，这个临时响应是用来通知客户端的，部分的请求服务器已经接受，但是客户端应继续发送求请求的剩余部分，如果请求已经完成，就忽略这个响应，而且服务器会在请求完成后向客户发送一个最终的结果</li><li><code>200</code>: 这个是最常见的 <code>http</code> 状态码，表示服务器已经成功接受请求，并将返回客广端所请求的最终结果</li><li><code>202</code>: 表示服务器已经接受了请求，但是还没有处理，而且这个请求最终会不会处理还不确定</li><li><code>204</code>: 服务器成功处理了请求，但没有返回任何实体内容 ，可能会返回新的头部元信息</li><li><code>301</code>: 客户端请求的网页已经永久移动到新的位置，当链接发生变化时返回 <code>301</code> 代码告诉客户端链接的变化，客户端保存新的链接，并向新的链接发出请求，已返回请求结果</li><li><code>404</code>: 请求失败，客户端请求的资源没有找到或者是不存在</li><li><code>500</code>: 服务器遇到未知的错误，导致无法完成客户端当前的请求.</li><li><code>503</code>: 服务器由于临时的服务器过载或者是维护，无法解决当前的请求</li></ul><h2 id="_4-get-和-post-不同" tabindex="-1">4. Get 和 post 不同 <a class="header-anchor" href="#_4-get-和-post-不同" aria-label="Permalink to &quot;4. Get 和 post 不同&quot;">​</a></h2><p><code>Get</code> 是从服务器上获取数据，<code>post</code> 是向服务器传送数据在客户端，<code>get</code>通过<code>url</code> 提交数据，数据在<code>url</code> 中可以看到，<code>post</code> 方式数据放在 <code>html header</code> 中提交安全性问题 <code>Get</code>提交数据最多只能有 <code>1024</code> 字节，<code>post</code> 没有限制</p><h2 id="_5-一个页面从输入-url-页面加载显示完成-这个过程中都发生了什么" tabindex="-1">5. 一个页面从输入 URL 页面加载显示完成，这个过程中都发生了什么? <a class="header-anchor" href="#_5-一个页面从输入-url-页面加载显示完成-这个过程中都发生了什么" aria-label="Permalink to &quot;5. 一个页面从输入 URL 页面加载显示完成，这个过程中都发生了什么?&quot;">​</a></h2><p>分为4个步骤</p><ol><li>当发送一个<code>URL</code>请求时，不管这个<code>URL</code>是<code>Web</code>页面的<code>URL</code>还是<code>Web</code>页面上每个资源的 <code>URL</code>，浏览器都会开启一个线程来处理这个请求，同时在远程<code>DNS</code>服务器上启动一个<code>DNS</code>查询。这能使浏览器获得请求对应的<code>IP</code>地址</li><li>浏览器与远程<code>Web</code>服务器通过<code>TCP</code>三次握手协商来建立一个<code>TCP/IP</code>连接。该握手包括一个同步报文，一个同步-应答报文和一个应答报文，这二个报文在 浏览器和服务器之间传递。该握手首先由客户端尝试建立起通信，然后服务器响应并接受客户端的请求，最后由客户端发出该请求已经被接受的报文</li><li>一旦<code>TCP/IP</code>连接建立，浏览器会通过该连接向远程服务器发送<code>HTTP</code>的<code>GET</code>请求。远程服务器找到资源并使用<code>HTTP</code>响应返回该资源</li><li>此时，<code>Web</code>服务器提供资源服务，客户端开始下载资源</li></ol><h2 id="_6-get-请求传参长度的误" tabindex="-1">6. get 请求传参长度的误 <a class="header-anchor" href="#_6-get-请求传参长度的误" aria-label="Permalink to &quot;6. get 请求传参长度的误&quot;">​</a></h2><p>误区: 我们经常说<code>get</code>请求参数的大小存在限制，而<code>post</code>请求的参数大小是无限制的。实际上<code>HTTP</code>协议从未规定<code>GET/POST</code>的请求长度限制是多少。对<code>get</code>请求参数的限制是来源与浏览器或<code>web</code>服务器，浏览器或<code>web</code>服务器限制了<code>url</code>的长度。为了明确这个概念，我们必须再次强调下面几点<code>HTTP</code>协议 未规定<code>GET</code>和<code>POST</code>的长度限制<code>GET</code>的最大长度显示是因为 浏览器和<code>web</code>服务器限制了<code>URI</code>的长度不同的浏览器和<code>WEB</code>服务器，限制的最大长度不一样要支持<code>IE</code>，则最大长度为<code>2083byte</code>，若只支持<code>Chrome</code>，则最大长度<code>8182byte</code></p><h2 id="_7-get-和-post-请求在缓存方面的区别" tabindex="-1">7. get 和 post 请求在缓存方面的区别 <a class="header-anchor" href="#_7-get-和-post-请求在缓存方面的区别" aria-label="Permalink to &quot;7. get 和 post 请求在缓存方面的区别&quot;">​</a></h2><p><code>post/get</code> 的请求区别，具体不再整述补充补充个<code>get</code>和<code>post</code>在缓存方面的区别:</p><ul><li><code>get</code>请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。</li><li><code>post</code>不同，<code>post</code>做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。</li></ul><blockquote><p>因此<code>get</code>请求适合于请求缓存</p></blockquote>',20),l=[a];function i(r,s,h,p,n,T){return o(),d("div",null,l)}const u=e(t,[["render",i]]);export{P as __pageData,u as default};
