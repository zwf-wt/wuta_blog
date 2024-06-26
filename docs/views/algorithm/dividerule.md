# 分治回溯和递归

## 分治算法
分治算法在维基百科上的定义为:在计算机科学中，分治法是建基于多项分支递归的一种很重要的算法范式。字面上的解释是“分而治之”，就是把一个复杂的问题分成两个或更多的相同或相似的子问题，直到最后子问题可以简单的直接求解，原问题的解即子问题的解的合并。

通过维基百科的定义我们可以发现分治算法的核心就是分而治之，当然这个定义和递归有点类似，这里我们要说一下分治和递归的区别:分治算法是一种处理问题的思想，递归是一种编程技巧，当然了在实际情况中，分治算法大都采用递归来实现。

并且用递归实现分治算法的基本步骤为:
1:分解:将原问题分解为若干个规模较小，相互独立，与原问题形式相同的子问题
2:解决:若子问题规模较小而容易被解决则直接解，否则递归地解各个子问题
3:合并:将各个子问题的解合并为原问题的解。

什么样的问题适合用分治算法去解决呢?
原问题与分解成的小问题具有相同的模式;
原问题分解成的子问题可以独立求解，子问题之间没有相关性，这一点是分治算法跟动态规划的明显区别，至于动态规划下一小节会详细讲解并对比这两种算法;具有分解终止条件，也就是说，当问题足够小时，可以直接求解;可以将子问题合并成原问题，并且合并操作的复杂度不能太高，否则就起不到减小算法总体复杂度的效果了，这也是能否使用分治法的关键特征

分治算法应用场景举例:
排序:后期要讲的很多排序算法有很多就利用了分治的思想，比如归并排序，快速排序。
海量数据处理:分治算法思想还经常用在海量数据处理的场景中。比如:给10GB的订单文件按照金额排序这样一个需求，看似是一个简单的排序问题，但是因为数据量大，有 10GB，而我们的机器的内存可能只有 2、3GB，总之就是小于订单文件的大小因而无法一次性加载到内存，所以基础的排序算法在这样的场景下无法使用。

要解决这种数据量大到内存装不下的问题，我们就可以利用分治的思想。我们可以将海量的数据集合根据某种方法，划分为几个小的数据集合，每个小的数据集合单独加载到内存来解决，然后再将小数据集合合并成大数据集合。实际上，利用这种分治的处理思路，不仅仅能克服内存的限制，还能利用多线程或者多机处理，加快处理的速度。
假设现在要给 10GB 的订单排序，我们就可以先扫描一遍订单，根据订单的金额，将10GB的文件划分为几个金额区间。比如订单金额为1到100 元的放到一个小文件，101到200 之间的放到另一个文件，以此类推。这样每个小文件都可以单独加载到内存排序，最后将这些有序的小文件合并，就是最终有序的10GB订J单数据了。
如果订单数据存储在类似 GFS 这样的分布式系统上，当 10GB 的订单被划分成多个小文件的时候，每个文件可以并行加载到多台机器上处理，最后再将结果合并在一起，这样并行处理的速度也加快了很多。

### 分治代码模板
```java
private static int divide_conquer(Problem problem,){//问题终止条件
  if(problem == NULL){//处理最小子问题的解
    int res =process_last_result()
    return res;
  }
  //将问题拆分成一个一个的重复子问题。
  subProblems=split problem(problem)
  //下探到下一层求解子问题
  reso = divide_conquer(subProblems[e])
  res1 = divide_conquer(subProblems[1])
  .....

  //将子问题的解合并变成最终问题的解
  result =process result(resO,res1);

  //清理当前层状态等其他信息
  .....

  return result;
}
```

## 回溯
04年上映的《蝴蝶效应》，影片中讲述的是主人公为了实现自己的目标一直通过回退的方法回到童年在一些重要的人生岔路口重新做出选择，最终实现整个美好人生的故事，当然了这只是电影，现实中人生是无法倒退的，但是这其中蕴含的就是思想就是我们要讲的回溯思想。

回溯算法实际上是一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯“返回，尝试别的路径。

回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的思想为回溯。

回溯法采用试错的思想，尝试分步的去解决一个问题。在分步解决问题的过程中，当它通过尝试发现现有的分步答案不能得到有效的正确答案时，它将取消上一步甚至上几步的计算(回退)，再通过其他的可能的分步解答再次尝试寻找问题的解。

回溯法通常用最简单的递归方法来实现，在反复重复上面所讲的步骤后可能会出现以下两种情况:
1:找到了一个可能存在的正确答案
2:在尝试了所有可能的分步方法后宣告没有答案

在最坏情况下，回溯法会导致一次复杂度为指数时间的计算。

回溯算法是一种遍历算法，以 深度优先遍历 的方式尝试所有的可能性。有些教程上也叫「暴力搜索」。
回溯算法是 有方向地 搜索，区别于多层循环实现的暴力法。

## 面试实战

### 111
### 236
### 50
### 46
### 47
### 78
### 90
### 77
### 17
### 51
### 169