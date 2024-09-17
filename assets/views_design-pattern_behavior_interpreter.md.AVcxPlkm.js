import{_ as s,o as i,c as a,R as n}from"./chunks/framework.MMMQMGZx.js";const A=JSON.parse('{"title":"解释器模式","description":"","frontmatter":{},"headers":[],"relativePath":"views/design-pattern/behavior/interpreter.md","filePath":"views/design-pattern/behavior/interpreter.md"}'),l={name:"views/design-pattern/behavior/interpreter.md"},p=n(`<h1 id="解释器模式" tabindex="-1">解释器模式 <a class="header-anchor" href="#解释器模式" aria-label="Permalink to &quot;解释器模式&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>解释器模式（Interpreter Pattern）是一种行为设计模式，它允许为语言定义语法，并且将该语言中的句子表示为一个抽象语法树结构。然后可以使用这个语法树来解释语言中的句子。解释器模式通常用于处理需要解析和执行的简单语言或表达式的情况。</p><p>解释器模式的关键组成部分包括：</p><ul><li>抽象表达式（Abstract Expression）：定义了所有节点的接口，为具体表达式规定出共同的接口。</li><li>终端表达式（Terminal Expression）：实现了解释器中的一些基本操作，是解释器模式中的叶子节点。</li><li>非终端表达式（Non-Terminal Expression）：由其它表达式组合而成，通常是抽象表达式类的具体子类。</li><li>上下文（Context）：包含解释器所需的外部数据。</li><li>客户端（Client）：构建一个具体的语法树，并调用解释方法。</li></ul><h2 id="解释器模式适用于哪些业务场景" tabindex="-1">解释器模式适用于哪些业务场景 <a class="header-anchor" href="#解释器模式适用于哪些业务场景" aria-label="Permalink to &quot;解释器模式适用于哪些业务场景&quot;">​</a></h2><p>解释器模式适用于需要解析和执行某种语言或者表达式的业务场景。这些场景通常涉及对一些规则或语言的解析与执行，尤其是当这些规则或语言可能经常变化时。以下是一些适用解释器模式的典型业务场景：</p><ol><li>查询构造：在数据库应用中，用户可能需要输入SQL查询语句或其他形式的数据查询语言。解释器模式可以帮助解析这些查询语句，并将其转换成相应的内部表示，从而执行查询。</li><li>脚本语言或配置文件解析：某些应用程序允许用户通过脚本语言或配置文件来定制其行为。解释器模式可以用来解析这些脚本或配置，并根据解析结果动态改变程序的行为。</li><li>逻辑表达式处理：在某些系统中，需要处理复杂的条件判断逻辑，比如在业务流程管理软件中，用户可能定义一系列复杂的逻辑规则来控制流程的走向。解释器模式可以帮助解析这些逻辑表达式，并根据不同的条件作出不同的决策。</li><li>自然语言处理：虽然完整的自然语言处理通常非常复杂，但对于一些简单的自然语言命令或查询，解释器模式可以作为一个基础工具来解析和执行这些命令。</li><li>游戏脚本引擎：在游戏开发中，开发者可能希望提供一种简单的脚本语言，让设计师能够编写逻辑来控制游戏中的事件。解释器模式可以用来创建这样一个脚本引擎。</li><li>计算器应用：对于简单的计算器应用，用户输入的数学表达式可以被解释器模式解析并计算。</li></ol><p>在使用解释器模式之前，需要考虑其适用性。如果语言或规则相对固定并且不会频繁改变，那么可能不需要使用解释器模式。另外，由于解释器模式可能导致大量的类定义，因此也需要评估是否真的有必要引入这种模式，特别是在性能要求较高的情况下。</p><h3 id="代码案例" tabindex="-1">代码案例 <a class="header-anchor" href="#代码案例" aria-label="Permalink to &quot;代码案例&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 假设我们正在开发一个权限管理系统，其中需要根据用户的属性（如年龄、性别等）来决定他们是否有权限访问某些资源。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 为此，我们需要能够解析和评估这样的逻辑表达式：“如果用户年龄大于18岁并且性别为男性，则允许访问”。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 1. Expression: 抽象基类，定义一个 interpret 方法。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 2. AndExpression: 表示逻辑“与”运算。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 3. OrExpression: 表示逻辑“或”运算（可选）。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 4. VariableExpression: 表示变量，如用户的属性。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 5. LiteralExpression: 表示常量值。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`java</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> java.util.HashMap;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> java.util.Map;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 抽象基类，定义一个 interpret 方法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> interpret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Context </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 实现逻辑“与”运算</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AndExpression</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Expression left; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 左侧表达式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Expression right; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 右侧表达式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AndExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Expression </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Expression </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.left </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> left;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.right </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> right;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 解释表达式，并根据逻辑“与”操作返回结果</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> interpret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Context </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> left.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">interpret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> right.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">interpret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 表示变量，如用户的属性</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> VariableExpression</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String variableName; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 变量名称</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> VariableExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">variableName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.variableName </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> variableName;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 从上下文中获取变量的值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> interpret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Context </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> context.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(variableName);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 表示常量值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LiteralExpression</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> value; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 常量值</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LiteralExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">boolean</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 返回常量值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> interpret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Context </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 上下文类存储变量名及其对应的布尔值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Map&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; variables </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HashMap&lt;&gt;(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 存储变量的Map</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 设置变量名及对应的布尔值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">variableName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">boolean</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        variables.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(variableName, value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 获取变量名对应的布尔值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">variableName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> variables.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getOrDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(variableName, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 创建上下文</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Context context </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 设置用户属性</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 假设用户年龄大于18岁</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        context.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;age&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 假设用户性别为男性</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        context.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gender&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 构建表达式树</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 创建一个变量表达式，表示用户年龄</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Expression ageExpression </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> VariableExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;age&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 创建一个变量表达式，表示用户性别</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Expression genderExpression </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> VariableExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gender&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 创建一个逻辑“与”表达式，表示年龄和性别都满足条件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Expression andExpression </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AndExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ageExpression, genderExpression);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // 解释表达式并打印结果</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> andExpression.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">interpret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(context);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Access granted? &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Yes&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;No&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * Expression 是抽象基类，定义了一个 interpret 方法。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * AndExpression 实现了逻辑“与”运算，它在 interpret 方法中调用左右两边表达式的 interpret 方法，</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 并根据逻辑“与”操作返回结果。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * VariableExpression 代表一个变量，它从上下文中获取变量的值。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * LiteralExpression 代表一个常量值。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * Context 存储了变量名及其对应的布尔值。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 客户端代码</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 客户端代码负责设置上下文中的变量值，并构建具体的逻辑表达式树。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 在这个例子中，我们构建了一个逻辑表达式 &quot;age &amp;&amp; gender&quot; 并计算了它的结果。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 这个例子展示了如何使用解释器模式来解析和评估逻辑表达式，可以根据需要添加更多的逻辑运算符或变量来扩展功能。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span></code></pre></div>`,11),h=[p];function k(t,e,r,E,d,g){return i(),a("div",null,h)}const c=s(l,[["render",k]]);export{A as __pageData,c as default};
