# 两度搜索
深度优先搜索算法(DFS)和广度优先搜索算法(BFS)是一种用于遍历或搜索树或图的算法，在搜索遍历的过程中保证每个节点(顶点)访问一次且仅访问一次，按照节点(顶点)访问顺序的不同分为深度优先(Depth-First-Search，DFS)和广度优先(Breadth-First-Search，BFS)。
## BFS(广度优先搜索)
广度优先搜索算法(Breadth-First-Search，BFS)直观地讲，它其实就是一种“地毯式”层层推进的搜索策略即先查找离起始顶点最近的，然后是次近的，依次往外搜索。
简单的说，BES是从根节点开始，沿着树(图)的宽度遍历树(图)的节点。如果所有节点均被访问，则算法中止-般用队列数据结构来辅助实现BFS算法。

```java
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public List<List<Integer>> levelOrder(TreeNode root) {
  List<List<Integer>> allResults = new ArrayList<>();
  if(root == null){
    return allResults;
  }

  Queue<TreeNode> nodes = new LinkedList<>();
  // 将根节点插入队列
  nodes.add(root);
  while(!nodes.isEmpty()){
    // 每次循环开始时：队列中的元素个数其实就是当前这一层节点的个数
    int size = nodes.size();
    List<Integer> results = new ArrayList<>();
    for(int i=0;i<size;i++){
      // 从队列中取出每一个节点，取出这一层的每个节点
      TreeNode node = nodes.poll();
      results.add(node.val);
      // 将该节点的左右子节点入队列
      if(node.left!=null){
        nodes.add(node.left);
      }
      if(node.right!=null){
        nodes.add(node.right);
      }
    }
    allResults.add(results);
  }
  return allResults;

}
```

## DFS(深度优先搜索)
深度优先搜索算法(Depth-First-Search，DFS)沿着树的深度遍历树的节点，尽可能深的搜索树的分支。当节点v的所在边都己被探寻过，搜索将回溯到发现节点v的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。如果还存在未被发现的节点，则选择其中一个作为源节点并重复以上过程，整个进程反复进行直到所有节点都被访问为止。属于盲目搜索。

1:实际上，回溯算法思想就是借助于深度优先搜索来实现的。
DFS负责搜索所有的路径，回溯辅以选择和撤销选择这种思想寻找可能的解，当然代码写起来基于递归(所以代码写起来就是用递归实现的)。

2:DFS跟回溯有什么关系呢?
回溯是一种通用的算法，把问题分步解决，在每一步都试验所有的可能，当发现已经找到一种方式或者目前这种方式不可能是结果的时候，退回上一步继续尝试其他可能(有一个选择和撤销选择的过程，可理解为标记访问和删除访问标记)。很多时候每一步的处理都是一致的，这时候用递归来实现就很自然。
当回溯(递归)用于树(图)的时候，就是深度优先搜索。当然了，几乎所有可以用回溯解决的问题都可以表示为树。(像之前的排列，组合等问题，虽不是直接在树上操作，但是他们操作的中间状态其实是一棵树)那么这俩在这里就几乎同义了。如果一个问题解决的时候显式地使用了树或图，那么我们就叫它dfs。很多时候没有用树我们也管它叫dfs严格地说是不对的，但是dfs比回溯打字的时候好输入。
```java
// 深度优先搜索

private void dfs(TreeNode root,int level,List<List<Integer>> results){
  //termina1 已下探到最底部节点
  if(results.size()==level){ // or root == null or node alread visited
    results.add(new ArrayList<>());
    return;
  }

  // process current level node here.
  results.get(level).add(root.val);//记录当前节点已被访问
  
  //drill downif node not visited
  if(root.left!=null){
    dfs(root.left,level+1,results);
  }
  if(root.right!=null){
    dfs(root.right,level+1,results);
  }
}
```

```java
// N插树 代码模板
public void dfs(Node node,List<Integer>res){
  //terminal
  if(node == null){
    return;
  }
  //process current level logic
  res.add(node.val);
  //drill down
  List<Node>children = node.children;
  for(Node n:children){
    // if node not visited then dfs node
    if(not visited){ // 在基于图的dfs中一般需要判断顶点是否已访问过
      dfs(n,res);
    }
  }
}
```

## 应用特点
1. BFS适合在树或图中求解最近，最短等相关问题
2. DFS适合在树或图中求解最远，最深等相关问题
3. 实际应用中基于图的应用居多

## 面试实战
### 102
### 104
### 515
### 200