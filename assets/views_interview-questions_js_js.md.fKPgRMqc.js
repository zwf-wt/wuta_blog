import{_ as a,o as i,c as s,R as l}from"./chunks/framework.MMMQMGZx.js";const q=JSON.parse('{"title":"JS相关面试题","description":"","frontmatter":{},"headers":[],"relativePath":"views/interview-questions/js/js.md","filePath":"views/interview-questions/js/js.md"}'),e={name:"views/interview-questions/js/js.md"},t=l(`<h1 id="js相关面试题" tabindex="-1">JS相关面试题 <a class="header-anchor" href="#js相关面试题" aria-label="Permalink to &quot;JS相关面试题&quot;">​</a></h1><h2 id="_3-闭包是什么-有什么特性-对页面会有什么影响" tabindex="-1">3. 闭包是什么?有什么特性? 对页面会有什么影响 <a class="header-anchor" href="#_3-闭包是什么-有什么特性-对页面会有什么影响" aria-label="Permalink to &quot;3. 闭包是什么?有什么特性? 对页面会有什么影响&quot;">​</a></h2><blockquote><p>闭包可以简单理解成: 定义在一个函数内部的函数。其中一个内部函数在包含它们的外部函数之外被调用时，就会形成闭包</p></blockquote><blockquote><p>特点:</p></blockquote><ol><li>函数嵌套函数</li><li>函数内部可以引用外部的参数和变量</li><li>参数和变量不会被垃圾回收机制回收。</li></ol><blockquote><p>使用:</p></blockquote><ol><li>读取函数内部的变量;</li><li>这些变量的值始终保持在内存中，不会在外层函数调用后被自动清除</li></ol><blockquote><p>优点:</p></blockquote><ol><li>变量长期驻扎在内存中</li><li>避免全局变量的污染</li><li>私有成员的存在</li></ol><blockquote><p>缺点:会造成内存泄露</p></blockquote><blockquote><p>为什么要用闭包</p></blockquote><ul><li>匿名自执行函数: 我们知道所有的变量，如果不加上 var 关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，比如: 别的函数可能误用这些变量，造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链上遍历的)。</li></ul><blockquote><p>除了每次使用变量都是用 var 关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护可以用闭包。</p></blockquote><ul><li>结果缓存: 我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留</li></ul><h2 id="_4-js-中常见的内存泄漏" tabindex="-1">4. Js 中常见的内存泄漏 <a class="header-anchor" href="#_4-js-中常见的内存泄漏" aria-label="Permalink to &quot;4. Js 中常见的内存泄漏&quot;">​</a></h2><p>内存泄漏是指一块被分配的内存既不能使用又不能回收，直到浏览器进程结束 释放内存的方法: 赋值为<code>null</code></p><ol><li>意外的全局变量</li><li>被遗忘的计时器或回调函数</li><li>脱离<code>DOM</code>的引用</li><li>闭包</li></ol><h2 id="_18-为什么会造成跨域-请简述同源策略" tabindex="-1">18. 为什么会造成跨域/请简述同源策略 <a class="header-anchor" href="#_18-为什么会造成跨域-请简述同源策略" aria-label="Permalink to &quot;18. 为什么会造成跨域/请简述同源策略&quot;">​</a></h2><h3 id="_1-为什么会造成跨域" tabindex="-1">1. 为什么会造成跨域? <a class="header-anchor" href="#_1-为什么会造成跨域" aria-label="Permalink to &quot;1. 为什么会造成跨域?&quot;">​</a></h3><p>在前后端分离的模式下，前后端的域名是不一致的，此时就会发生跨域访问问题。在请求的过程中我们要想回去数据 般都是<code>post/get</code>请求所以..跨域问题出现跨域问题来源于<code>JavaScript</code>的同源策略，即只有 <code>协议+主机名+端口号(如存在)</code>相同，则允许相互访问。也就是说 <code>JavaScript</code>只能访问和操作自己域下的资源，不能访问和操作其他域下的资源。</p><h3 id="_2-同源策略" tabindex="-1">2. 同源策略 <a class="header-anchor" href="#_2-同源策略" aria-label="Permalink to &quot;2. 同源策略&quot;">​</a></h3><p>是由 NetScape 提出的一个著名的安全策略。所谓的同源，指的是<code>协议，域名，端口</code>相同。浏览器处于安全方面的考虑，只允许本域名下的接口交互，不同源的客户端脚本，在没有明确授权的情况下，不能读写对方的资源。</p><h2 id="_19-请输出三种减少页面加载时间的方式" tabindex="-1">19. 请输出三种减少页面加载时间的方式 <a class="header-anchor" href="#_19-请输出三种减少页面加载时间的方式" aria-label="Permalink to &quot;19. 请输出三种减少页面加载时间的方式&quot;">​</a></h2><ol><li><p>优化图片</p></li><li><p>图像格式的选择(GIF: 提供的颜色较少，可用在-一些对颜色要求不高的地方)</p></li><li><p>优化 CSS (压缩合并 css，如 margin-top, margin-left...)</p></li><li><p>网址后加斜杠(如www.campr.com/目录，会判断这个目录是什么文件类型，或者是目录。)一cdn 托管</p></li><li><p>标明高度和宽度(如果浏览器没有找到这两个参数，它需要一边下载图片一边计算大小，如果图片很多，浏览器需要不断地调整页面。这不但影响速度，也影影响浏览体验 当浏览器知道了高度和宽度参数后，即使图片暂时无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容。从而加载时间快了，浏览体验也更好了)</p></li><li><p>减少 http 请求 (合并文件，合并图片)</p></li></ol><h2 id="_29-什么是-csrf-攻击" tabindex="-1">29.什么是 csrf 攻击 <a class="header-anchor" href="#_29-什么是-csrf-攻击" aria-label="Permalink to &quot;29.什么是 csrf 攻击&quot;">​</a></h2><p>Csrf (跨站点请求伪造) 攻击者在用户已经登录目标网站之后，诱使用户访问一个攻击页面，利用目标网站对用户的信任，以用户身份再攻击页面对目标网站发起伪造用户操作的请求，达到攻击目的</p><h2 id="_30-1-2-3-map-parseint-答案是多少" tabindex="-1">30. [1, 2, 3].map(parseInt) 答案是多少 <a class="header-anchor" href="#_30-1-2-3-map-parseint-答案是多少" aria-label="Permalink to &quot;30. [1, 2, 3].map(parseInt) 答案是多少&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 这是因为你在使用 map() 方法时传递的回调函数是 parseInt。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * map() 方法会对数组中的每个元素都调用一次指定的回调函数，并返回一个新数组，其中包</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 含回调函数的返回值。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 在 parseInt 函数中，它接收两个参数：要解析的字符串和解析的基数（可选，默认为十进* 制）。在 map() 中，当前元素会作为第一个参数传递给 parseInt，而当前元素的索引则会* 作为第二个参数（即基数）传递给 parseInt。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 让我们来逐个解析 [1, 2, 3].map(parseInt) 的步骤：</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 第一个元素是 1，将其作为字符串 &quot;1&quot; 传递给 parseInt，解析的基数为 0（索引）。在基* 数为 0 的情况下，parseInt(&quot;1&quot;, 0) 会将字符串解析为十进制数，结果为 1。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 第二个元素是 2，将其作为字符串 &quot;2&quot; 传递给 parseInt，解析的基数为 1（索引）。在基* 数为 1 的情况下，parseInt(&quot;2&quot;, 1) 会尝试将字符串解析为一进制数，但是一进制中只能 * 用 0 表示数字，因此解析失败，返回 NaN。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 第三个元素是 3，将其作为字符串 &quot;3&quot; 传递给 parseInt，解析的基数为 2（索引）。在基* 数为 2 的情况下，parseInt(&quot;3&quot;, 2) 会尝试将字符串解析为二进制数，但是二进制数中只* 能使用 0 和 1 表示数字，因此解析失败，返回 NaN。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 所以最终得到的结果是 [1, NaN, NaN]。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  如果你想得到期望的结果 [1, 2, 3]，你可以使用箭头函数或指定回调函数的参数来忽略基* 数的影响，例如 [1, 2, 3].map(num =&gt; parseInt(num)) 或 [1, 2, 3].map((num, *       index) =&gt; parseInt(num))。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(parseInt)) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [1, NaN, NaN]</span></span></code></pre></div><h2 id="_34-插件和框架的区别" tabindex="-1">34. 插件和框架的区别 <a class="header-anchor" href="#_34-插件和框架的区别" aria-label="Permalink to &quot;34. 插件和框架的区别&quot;">​</a></h2><blockquote><p>插件和框架在软件开发中扮演着不同的角色，它们有着明显的区别：</p></blockquote><ol><li>插件（Plugin）：</li></ol><ul><li>插件是一种可插拔的软件组件，它可以被动态地添加到一个应用程序中，以扩展该应用程序的功能。</li><li>插件通常是独立于应用程序的，它们可以被单独开发、测试和部署。</li><li>插件通常依赖于应用程序提供的接口或框架，并通过这些接口来与应用程序进行交互。</li><li>插件的作用是为应用程序增加额外的特定功能，而且它们的集成方式通常比较灵活。</li></ul><ol start="2"><li>框架（Framework）：</li></ol><ul><li>框架是一种完整的软件平台或架构，它提供了一整套的工具、库和规范，用于帮助开发者构建应用程序。</li><li>框架通常是一种相对完整的解决方案，开发者在框架的基础上进行开发，使用框架提供的组件和规范。</li><li>框架的作用是定义了应用程序的整体架构和流程，开发者需要按照框架的规范进行开发，并且通常无法轻易替换框架的核心部分。</li></ul><blockquote><p>简而言之，插件是为了增强现有应用程序的功能而设计的可插拔组件，而框架则是为了提供应用程序开发的整体架构和基础设施而设计的完整平台。在实际的软件开发中，开发者可以根据具体需求选择使用插件或框架来提升开发效率和扩展性。</p></blockquote><h2 id="ts和js的区别、优缺点" tabindex="-1">ts和js的区别、优缺点 <a class="header-anchor" href="#ts和js的区别、优缺点" aria-label="Permalink to &quot;ts和js的区别、优缺点&quot;">​</a></h2><p>TypeScript（简称TS）和JavaScript（简称JS）是两种不同的编程语言，虽然它们都是运行在浏览器端或者服务器端的脚本语言，但是它们有一些不同之处。下面是TS和JS的区别、优缺点：</p><ol><li><p>类型系统：TS是一种带有类型系统的编程语言，可以使得开发者在编码时可以更加规范和安全。而JS没有类型系统，只能在执行时进行类型判断，这就容易导致一些难以发现的错误。</p></li><li><p>静态检查：TS在编码时会进行静态检查，可以预先发现潜在的问题，提高代码的健壮性和可维护性。JS则需要在运行时才能发现问题，容易出现一些逻辑错误。</p></li><li><p>编译过程：TS需要经过编译过程，将TS代码编译成JS代码才能在浏览器或者服务器上运行。而JS不需要编译，可以直接在浏览器或者服务器上运行。</p></li><li><p>代码重构：TS支持重构，可以通过IDE等工具进行代码重构，提高代码的重复利用率。JS则比较难进行重构。</p></li><li><p>学习曲线：对于已经熟悉JS的开发者来说，学习TS需要花费一定的时间和精力。但是对于新手来说，TS相对来说更加容易上手，因为它的类型系统会让代码更加规范。</p></li></ol><h3 id="优点" tabindex="-1">优点： <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点：&quot;">​</a></h3><ol><li><p>TS的类型系统可以提供更好的代码规范性和可维护性，减少一些运行时错误。</p></li><li><p>静态检查可以在编码时发现问题，增强代码的健壮性。</p></li><li><p>TS支持重构，可以提高代码的重复利用率。</p></li><li><p>TS可以编译成JS代码，支持向下兼容，可以让开发者逐步采用TS。</p></li></ol><h3 id="缺点" tabindex="-1">缺点： <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点：&quot;">​</a></h3><ol><li><p>学习曲线相对JS更陡峭，需要学习新的语言、类型系统、工具等。</p></li><li><p>开发效率：在一些小型项目中，使用 TypeScript 可能会增加开发的复杂性和工作量，因为需要额外的类型注解和接口定义。有时候在处理一些简单的逻辑时，这些额外的工作可能会显得有些繁琐。</p></li><li><p>工具和库支持：尽管 TypeScript 的生态系统日益完善，但仍然有一些第三方库或工具可能不够完全支持 TypeScript，这可能导致在使用这些库或工具时出现一些麻烦。</p></li><li><p>构建环境：需要配置额外的构建工具（如Webpack、Rollup等）来将 TypeScript 编译成可在浏览器中运行的 JavaScript 代码，这可能对一些开发者来说是一个负担。</p></li><li><p>迁移成本：对于已有的大型 JavaScript 项目来说，要将现有的代码迁移到 TypeScript 可能需要一定的成本和时间，特别是在处理类型兼容性和重构代码的过程中。</p></li></ol><blockquote><p>使用 TS 一定要有 OOP 的思想，不然 TS 就是个摆设。只能提高代码质量，不能提高开发效率。</p></blockquote>`,43),p=[t];function n(o,r,h,c,k,d){return i(),s("div",null,p)}const b=a(e,[["render",n]]);export{q as __pageData,b as default};