import{_ as a,o as s,c as i,R as n}from"./chunks/framework.MMMQMGZx.js";const D=JSON.parse('{"title":"带你走进图的世界","description":"","frontmatter":{},"headers":[],"relativePath":"views/algorithm/graph.md","filePath":"views/algorithm/graph.md"}'),l={name:"views/algorithm/graph.md"},e=n(`<h1 id="带你走进图的世界" tabindex="-1">带你走进图的世界 <a class="header-anchor" href="#带你走进图的世界" aria-label="Permalink to &quot;带你走进图的世界&quot;">​</a></h1><h2 id="哈夫曼树" tabindex="-1">哈夫曼树 <a class="header-anchor" href="#哈夫曼树" aria-label="Permalink to &quot;哈夫曼树&quot;">​</a></h2><p>路径：在一棵树中，从一个结点到另一个结点所经过的所有结点，被我们称为两个结点之间的路径。 路径长度：从一个结点到另一个结点所经过的“边”的数量，被我们称为两个结点之间的路径长度。 节点的权值：树的每一个结点，都可以拥有自己的权重(Weight), 其实就是对节点赋予的一个有意义的值，比如：访问的频率，出现的次数，概率等等！ 带权路径长度：结点的带权路径长度，是指树的根结点到该结点的路径长度，和该结点权重的乘积。 树的带权路径长度：在一棵树中，所有叶子节点的带权路径长度之和，被称为树的带权路径长度，也被简称为WPL</p><h3 id="哈夫曼树定义" tabindex="-1">哈夫曼树定义 <a class="header-anchor" href="#哈夫曼树定义" aria-label="Permalink to &quot;哈夫曼树定义&quot;">​</a></h3><p>给定一给具有确定权值的叶子节点，树的带权路径长度(wpl)最小的二叉树。也称最优二叉树。</p><h3 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点&quot;">​</a></h3><ol><li>权值越大的叶子节点越靠近根节点，权值越小的叶子节点越远离根节点。</li><li>只有度为0和度为2的节点，不存在度为1的节点。</li></ol><ul><li>如果给定n个带权值的叶子节点，则哈夫曼树的节点数为：2n - 1 个 因为不存在度为1的节点，即n1 = 0,由二叉树的性质，n0 = n2 + 1, 所以：n2 = n0-1, 所以n0=n,所以n2 = n - 1, 所以二叉树的节点数为：n0 + n1 + n2 = n + 0 + n - 1 = 2n - 1</li></ul><ol start="3"><li>哈夫曼树中不存在度为1的节点，因为如果存在度为1的节点，那么必然存在度为2的节点，那么就存在两个叶子节点，那么就不满足哈夫曼树的定义。</li></ol><h3 id="哈夫曼树的构建" tabindex="-1">哈夫曼树的构建 <a class="header-anchor" href="#哈夫曼树的构建" aria-label="Permalink to &quot;哈夫曼树的构建&quot;">​</a></h3><ol><li>初始化：由给定的n个权值集合{w1, w2, w3, ..., wn}构造 n 棵二叉树(只有根节点)，从而得到了一个二叉树集合F={T1, T2, T3, ..., Tn}。</li><li>选区与合并：从集合T中选取根节点权值最小的两棵二叉树分别作为左子树和右子树构造一棵新的二叉树，并且根节点的权值为其左右子节点的权值之和。</li><li>删除与加入：从集合T中删除刚刚作为左右子节点的二叉树，并将他们新合并的二叉树添加到集合T中</li><li>重复2, 3 直到就一根二叉树</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 权值集合：{2, 4, 5, 3}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 1 初始化： T = {2, 4, 5, 3}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 2 选区与合并：从集合T中选取根节点权值最小的两棵二叉树分别作为左子树和右子树构造一棵新的二叉树，并且根节点的权值为其左右子节点的权值之和。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 3 删除与加入：从集合T中删除刚刚作为左右子节点的二叉树，并将他们新合并的二叉树添加到集合T中</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 4 重复2, 3 直到就一根二叉树</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 5 重复1, 2, 3 直到集合T为空</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span></code></pre></div><h3 id="哈夫曼编码" tabindex="-1">哈夫曼编码 <a class="header-anchor" href="#哈夫曼编码" aria-label="Permalink to &quot;哈夫曼编码&quot;">​</a></h3><p>哈夫曼树主要是为了哈夫曼编码，这种编码方式应用场景很广，最常见的就是用于文件压缩(zip, jpg底层都采用的一种皮编码方式) 定长编码 不定长编码：将每个字符的编码设计成不等长的，使用频率较高的字符分配一个比较短的编码，使用频率比较低的字符分配一个比较长的编码。 不定长编码如何保证解码的唯一性？</p><h3 id="哈夫曼面试题" tabindex="-1">哈夫曼面试题 <a class="header-anchor" href="#哈夫曼面试题" aria-label="Permalink to &quot;哈夫曼面试题&quot;">​</a></h3><p>由权值分别为{3, 8, 6, 2, 5}的叶子结点生成一棵哈夫曼树，该哈夫曼树的带权路径长度为多少？ 6 + 9 + 10 + 12 + 16 = 53</p><h2 id="图-graph" tabindex="-1">图(Graph) <a class="header-anchor" href="#图-graph" aria-label="Permalink to &quot;图(Graph)&quot;">​</a></h2><h3 id="概念" tabindex="-1">概念 <a class="header-anchor" href="#概念" aria-label="Permalink to &quot;概念&quot;">​</a></h3><p>图中的每一个元素我们称之为顶点(Vertex), 并且图中的一个顶点可以与其他任意顶点建立连接关系，我们把这种建立的关系叫做边(Edge),或者弧，图可以表示为：G=(V, E),其中V是顶点的集合，E是边的集合。</p><h4 id="顶点的度-degree" tabindex="-1">顶点的度(degree) <a class="header-anchor" href="#顶点的度-degree" aria-label="Permalink to &quot;顶点的度(degree)&quot;">​</a></h4><p>在图中跟顶点相连接的边的条数叫做顶点的度。</p><h4 id="无向图-undirected-graph" tabindex="-1">无向图(Undirected Graph) <a class="header-anchor" href="#无向图-undirected-graph" aria-label="Permalink to &quot;无向图(Undirected Graph)&quot;">​</a></h4><p>边没有方向，叫做无向图</p><h4 id="有向图-directed-graph" tabindex="-1">有向图(Directed Graph) <a class="header-anchor" href="#有向图-directed-graph" aria-label="Permalink to &quot;有向图(Directed Graph)&quot;">​</a></h4><p>边有方向，叫做有向图</p><h4 id="入度和出度" tabindex="-1">入度和出度 <a class="header-anchor" href="#入度和出度" aria-label="Permalink to &quot;入度和出度&quot;">​</a></h4><p>在无向图中，顶点有度的概念，代表每个顶点边的个数，在有向图中把度分为&quot;入度&quot;和&quot;出度&quot;，顶点的入度，表示有多少条边指向这个顶点；顶点的出度，表示有多少条边是以这个顶点指向其他顶点的</p><h4 id="权重图-weighted-graph" tabindex="-1">权重图(Weighted Graph) <a class="header-anchor" href="#权重图-weighted-graph" aria-label="Permalink to &quot;权重图(Weighted Graph)&quot;">​</a></h4><p>在图中，每条边都有自己的权重(出现频率，访问次数等等有意义的值)，这样的图称为权重图，带权的图我们称之为网。</p><h4 id="路径-路径长度-回路" tabindex="-1">路径，路径长度，回路 <a class="header-anchor" href="#路径-路径长度-回路" aria-label="Permalink to &quot;路径，路径长度，回路&quot;">​</a></h4><p>路径：接续的边构成的顶点序列 路径长度：路径上边的个数/边的权值之和。 回路：第一个顶点和最后一个顶点相同的路径。</p><h4 id="连通图-connected-graph" tabindex="-1">连通图(Connected Graph) <a class="header-anchor" href="#连通图-connected-graph" aria-label="Permalink to &quot;连通图(Connected Graph)&quot;">​</a></h4><p>在无向图中，如果任意两个顶点v, u之间都存在路径从v到u的路径,则称这个图是连通图。</p><h4 id="极大连通子图" tabindex="-1">极大连通子图 <a class="header-anchor" href="#极大连通子图" aria-label="Permalink to &quot;极大连通子图&quot;">​</a></h4><p>一个图中有两个子图(A, B)，其中一个是连通子图(A)，如果将B中任意一个不在A子图中的顶点加入到A中，此时，A子图不再连通。就叫极大连通子衅</p><h4 id="连通分量-connected-component" tabindex="-1">连通分量(Connected Component) <a class="header-anchor" href="#连通分量-connected-component" aria-label="Permalink to &quot;连通分量(Connected Component)&quot;">​</a></h4><p>在无向图A中的极大连通子图称为A的连通分量。</p><h4 id="强连通图-strongly-connected-graph" tabindex="-1">强连通图(Strongly Connected Graph) <a class="header-anchor" href="#强连通图-strongly-connected-graph" aria-label="Permalink to &quot;强连通图(Strongly Connected Graph)&quot;">​</a></h4><p>在有向图中，如果任意两个顶点v, u之间都存在从v到u的路径，则称这个图是强连通图。</p><h4 id="强连通分量" tabindex="-1">强连通分量 <a class="header-anchor" href="#强连通分量" aria-label="Permalink to &quot;强连通分量&quot;">​</a></h4><p>在有向图中，它的极大强连能子图称为它的强连通分量。</p><h4 id="极大强连通子图" tabindex="-1">极大强连通子图 <a class="header-anchor" href="#极大强连通子图" aria-label="Permalink to &quot;极大强连通子图&quot;">​</a></h4><p>一个有向图的强连通子图，如果将图A中任何一个不在该子图中的顶点加入该子图中，该子图不再连通，则说明该子图是A的极大强连通子图。</p><h4 id="极小连通子图" tabindex="-1">极小连通子图 <a class="header-anchor" href="#极小连通子图" aria-label="Permalink to &quot;极小连通子图&quot;">​</a></h4><p>一个图的连通子图，在该子图中删除任何一条边后该子图都不再连通，则称该子图是极小连通子图</p><h4 id="子图" tabindex="-1">子图 <a class="header-anchor" href="#子图" aria-label="Permalink to &quot;子图&quot;">​</a></h4><p>设有两个图 G1 = (V1, E1) 和 G2 = (V2, E2)，若V1 包含 V2 (V1是V2的子集)，E1 包含于 E2 (E1是E2的子集)，则称G1是G2的子图。如果V1 ⊆ V2，且E1 ⊆ E2，则称 G1 是 G2 的子图。</p><h4 id="生成树-spanning-tree" tabindex="-1">生成树(Spanning Tree) <a class="header-anchor" href="#生成树-spanning-tree" aria-label="Permalink to &quot;生成树(Spanning Tree)&quot;">​</a></h4><p>包含无向图所有顶点的极小连通子图叫做该无向图的生成树。</p><h3 id="图的表示和存储" tabindex="-1">图的表示和存储 <a class="header-anchor" href="#图的表示和存储" aria-label="Permalink to &quot;图的表示和存储&quot;">​</a></h3><p>其实图有很多存储形式包括：邻接矩阵，邻接表，十字链表，邻接多重表，边集数组等等</p><h4 id="邻接矩阵表示法" tabindex="-1">邻接矩阵表示法 <a class="header-anchor" href="#邻接矩阵表示法" aria-label="Permalink to &quot;邻接矩阵表示法&quot;">​</a></h4><p>依赖一个二维数组，数组的行和列分别代表图的顶点，数组中存储的值表示两个顶点之间是否存在边。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 无向图</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 1 ------ 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |      / |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |     /  |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |    /   |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |  /     |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 2 ------ 4</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 顶点：1, 2, 3, 4</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [0, 1, 1, 0],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [1, 0, 1, 1],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [1, 1, 0, 1],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [0, 1, 1, 0]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * ]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 有向图</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  1 &lt;------- 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  |      —   ^</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  |      /|  |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  |     /    |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  |    /     |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * \\|_ |/_     |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 2 &lt;-------- 4</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 顶点：1, 2, 3, 4</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [0, 1, 0, 0],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [0, 0, 1, 0],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [1, 1, 0, 0],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [0, 1, 1, 0],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * ]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 带权无向图</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *      3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  1 ------ 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  |      / |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  |   2 /  |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 5|    /   |1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  |  /     |</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  2 ------ 4</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *      6</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 顶点：1, 2, 3, 4</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [0, 5, 3, 0],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [5, 0, 2, 6],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [3, 2, 0, 1],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  [0, 6, 1, 0]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * ]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span></code></pre></div><ol><li>对于无向图来说，如果顶点 i 与顶点j之间有边，我们就将A[i][j]和A[j][i]设为1，否则设为0。</li><li>对于有向图来说，如果顶点 i 指向顶点 j，有一条箭头从顶点i向顶点j的边，我们就将A[i][j]设为1，否则设为0。同理，如果有一条箭头从j指向顶点i的边，我们就将A[j][i]标记为1, 否则设为0。</li><li>对于带权无向图来说，如果顶点 i 与顶点 j 之间存在边，我们就将A[i][j]设为边的权重，否则设为无穷大。</li></ol><p>使用邻接矩阵来存储图的特点是：简单，直观。但是也有一定的缺点就是浪费存储空间。比如以上第一种无向图的存储，A[i][j]等于1那么A[j][i]也等于1，在那个二维数组中我们沿着对角线划分为上下两部分，两部分其实是对称的，其实我们只需要一半的存储空间就够了，另一半算是浪费了。 因此邻接矩阵适用场景：适用于稠密的图，可以快速定位到指定的边，但是如果是稀疏的图，会比较浪费空间。</p><h4 id="邻接表表示法-adjacency-list" tabindex="-1">邻接表表示法(Adjacency List) <a class="header-anchor" href="#邻接表表示法-adjacency-list" aria-label="Permalink to &quot;邻接表表示法(Adjacency List)&quot;">​</a></h4><p>利用一个数组，数组中的每个槽位存储的是一个链表，链表头部存储的是图中的顶点，后续节点存储的是与该顶点相连或者该顶点指向的顶点</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 1 ------&gt;  2 ------&gt; 3</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * ^      /|\\ |       /|\\</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |       /  |      /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |      /   |     /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |     /    |    /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |    /     |   /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |   /      |  /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * |  /       | /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * ||/_      \\|/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 4 &lt;--------5</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  1, ----&gt; 2 ------&gt; /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  2, ----&gt; 3 ------&gt; 5 -------&gt; 4 ------&gt; /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  3, ----&gt; /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  4, ----&gt; 1 ------&gt; 2 -------&gt; /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *  5  ----&gt; 4 ------&gt; 3 -------&gt; /</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * ]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span></code></pre></div><p>乍一看邻接表有点像散列表？ 每个顶点对应一条链表，链表中存储的是与这个顶点相连接的其他顶点。另外图中画的是一个有向图的邻接表存储方式，每个顶点对应的链表里面，存储的是指向的顶点。 对于无向图来说，也是类似的，不过，每个顶点的链表中存储的，是跟这个顶点有边相边的顶点</p><h5 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h5><p>使用邻接矩阵存储图的好处是直观简单方便，但是缺点是浪费存储空间，相反的邻接表存储图的好处就是比较节省存储空间，但是缺点就是时间成本较高。 就像图中的例子，如果我们要确定，是否存在一条从顶点2到顶点4的边，那我们就要遍历顶点 2对应的那条链表，看链表中是否存在顶点 4。 当然这里也可以进行优化，因为如果链表拉的过长，整个查找效率会低下，我们也可以借鉴一些优秀底层的思想，比如:java语言中HashMap，底层基于散列表，散列表每个槽位如果有冲突的话会形成一个链表，为了防止链表过大查找时间过长，会将链表转换成其他查找性能更高的数据结构，如红黑树，平衡二叉树等等。 我们可以将邻接表中的链表改成查找性能更高的数据结构。实际开发中，我们可以选择用红黑树。这样，我们就可以更加快速地查找两个顶点之间是否存在边了。当然，这里的二叉查找树可以换成其他动态数据结构，比如跳表、散列表等。除此之外，我们还可以将链表改成有序动态数组，可以通过二分查找的方法来快速定位两个顶点之间否是存在边。</p><h3 id="图的应用" tabindex="-1">图的应用 <a class="header-anchor" href="#图的应用" aria-label="Permalink to &quot;图的应用&quot;">​</a></h3><h4 id="最小生成树" tabindex="-1">最小生成树 <a class="header-anchor" href="#最小生成树" aria-label="Permalink to &quot;最小生成树&quot;">​</a></h4><p>给定一个无向网络，在该网络的所有生成树中，使得各边权值之和最小的树称为该网的最小生成树，也叫最小代价生成树。 最小生成树的各边权值之和是唯一的。 欲在n个城市之间建立通信道路，但是两两城市之间的道路建设经济成本不太一样，那如何选择道路会使得总费用最少呢? 数学模型: 顶点--------------表示城市，有n个 边---------------表示城市间的道路，最少需要(n-1)条道路 边的权值-------------建设道路的经济代价 连通网-------------表示n个城市之间的道路通信网</p><h4 id="最短路径" tabindex="-1">最短路径 <a class="header-anchor" href="#最短路径" aria-label="Permalink to &quot;最短路径&quot;">​</a></h4><p>在一个有向网中从起点A到终点B的多条路径中，寻找一条各边权值之和最小的路径，即最短路径 注意:最短路径和最小生成树是不一样的，最小生成树是一定要包含n个顶点(n-1条边)且各边权值之和最小。而最短路径中不一定包含n个顶点，也不一定包含n-1条边。</p><h5 id="两点间的最短路径" tabindex="-1">两点间的最短路径 <a class="header-anchor" href="#两点间的最短路径" aria-label="Permalink to &quot;两点间的最短路径&quot;">​</a></h5><h5 id="拓扑排序" tabindex="-1">拓扑排序 <a class="header-anchor" href="#拓扑排序" aria-label="Permalink to &quot;拓扑排序&quot;">​</a></h5><p>拓扑排序(Topological Sorting)是一个有向无环图(DAG,Directed Acyclic Graph)的所有顶点的线性序列。且该序列必须满足下面两个条件: 1、每个顶点出现且只出现一次。 2、若存在一条从顶点A到顶点B的路径，那么在序列中顶点A出现在顶点B的前面，有向无环图(DAG)才有拓扑排序，非DAG图没有拓扑排序一说。 通常，一个有向无环图可以有一个或多个拓扑排序序列。</p><h5 id="某源点到其他各顶点的最短路径" tabindex="-1">某源点到其他各顶点的最短路径 <a class="header-anchor" href="#某源点到其他各顶点的最短路径" aria-label="Permalink to &quot;某源点到其他各顶点的最短路径&quot;">​</a></h5><h3 id="面试题" tabindex="-1">面试题 <a class="header-anchor" href="#面试题" aria-label="Permalink to &quot;面试题&quot;">​</a></h3><p>一个无向图中包含12个顶点，其中5个顶点有5个度，7个顶点有7个度，那么这个图有几条边？ (5 * 5 + 7 * 7) / 2 = 37</p>`,73),h=[e];function p(t,r,k,d,c,o){return s(),i("div",null,h)}const g=a(l,[["render",p]]);export{D as __pageData,g as default};