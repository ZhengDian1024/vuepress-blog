# 算法

## 一、递归
递归本质就是循环，循环体就是调用自己

找**最近最简**子问题：最近最简的意思类似最大公约数，如果拆的非常小，递归会非常繁琐

- 递归终止放在最前面
- 当前层逻辑
- 下探到新一层去（递归，if else）
- 扫尾工作

形象化来说

![](/images/daomeng.png)

#### 代码模板
```js
// 递归模板
const recursion = (level, params) =>{
   // recursion terminator递归终结条件
   if(level > MAX_LEVEL){
     process_result
     return 
   }
   // process current level 处理当前层
   process(level, params)
   //drill down 下探到下一层
   recursion(level+1, params)
   //clean current level status if needed 清理当前层
}
```

## 二、分治，回溯
### 分治
找**重复性，分解问题**！ 递归一般都需要分治，一个大问题都由多个子问题组成

典型：**归并排序**

![](/images/divide.png)

#### 代码模板
```js
const divide_conquer = (problem, params) => {
    // recursion terminator 终结条件, 子问题都解决完了
    if (problem === null) {
        process_result
        return
    }
    // process current problem 准备数据，拆分子问题，分解多个子问题，下探下一层
    subproblems = split_problem(problem, data)
    subresult1 = divide_conquer(subproblems[0], pl, ...)
    subresult2 = divide_conquer(subproblems[1], pl, ...)
    subresult3 = divide_conquer(subproblems[2], pl, ...)
    
    // merge 合并各个结果
    result = process_result(subresult1, subresult2, subresult3)
    // revert the current level status
}
```

### 回溯
在每一层不停的去试（括号生成问题），回溯模板就是递归模板
```js
backtracking() {
    if (终止条件) {
        存放结果;
    }

    for (选择：选择列表（可以想成树中节点孩子的数量）) {
        递归，处理节点;
        backtracking();
        回溯，撤销处理结果
    }
}
```

## 三、深度优先
搜索：每个节点访问一次，且仅访问一次

#### dfs递归代码模板
```js
// 递归
const visited = new Set()
const dfs = node => {
  if (visited.has(node)) return
  visited.add(node)
  dfs(node.left)
  dfs(node.right)
}


```
#### dfs手动维护栈代码模板
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    const res = []
    const stack = []
    if (root) {
        stack.push(root)
    }
    while(stack.length) {
        let node = stack.pop()
        if (node) {
            node.right && stack.push(node.right)
            node.left && stack.push(node.left)
            stack.push(node)
            stack.push(null)
        } else {
            node = stack.pop()
            res.push(node.val)
        }
    }
    return res
};
```

## 四、广度优先
bfs：用**队列**实现，先入先出

#### bfs代码模板
```js
const bfs = root => {
  const visited = []
  const queue = []
  if (root) { queue.push(root) }
  while (queue.length) {
      const node = queue.shift()
      visited.push(node.val)
      if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
              queue.push(node.children[i])
          }
      }
  }
  return visited
};
```

## 五、动态规划
- 动态规划问题的一般形式就是**求最值**
- 动态规划和递归或者分治没有根本上的区别（关键看有无**最优的子结构**）
- 共性：找到**重复子问题**
- 差异性：**最优子结构**、中途可以淘汰次优解
#### 动态规划适合解决的问题模型符合“一个模型三个特性”

一个模型：多阶段决策最优解模型
- 特性1:最优子结构；每个阶段的状态或值都是通过前面阶段的状态或值推导出来的
- 特性2:无后效性；每个阶段的状态值一旦确定之后，是不受后面阶段状态值所影响的
- 特性3:重复子问题

#### 和递归的区别

递归：**自顶向下**，从根节点开始到叶子节点，要得到fib6则需要算fib4和fib5

动态规划：**自底向上**：递推，循环，从0，1，1，2，3开始

#### 关键点
1. 最优子结构 opt[n] = best_of(opt[n - 1], opt[n - 2], ...)
2. 储存中间状态： opt[i] 缓存机制
3. 递推公式（美其名曰：状态转移方程或DP方程）

如：Fib：opt[i] = opt[i-1]+opt[i - 2];

   二维路径：opt[i, j] = [opt[i+1,j] + opt[i, j+1]且判断a[i,j]是否是空地

## 六、贪心算法
虽然每次都选择最好的，但是最后结局不一定是最好的，在每一步选择中都采取在当前状态下最优的选择，从而希望导致结果是全局最好或最优的算法

贪心算法和动态规划的不同在于它对每个子问题的解决方案都作出选择，**不能回退**，动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退的功能

贪心法适用场景：
问题能够分解成子问题来解决，**子问题的最优解能递推到最终问题的最优解**，这种子问题最优解称为**最优子结构**

## 七、二分查找
二分查找的前提：
- 目标函数单调性（单调递增或者递减，有序）
- 存在上下界：空间不能无穷大
- 能够通过索引访问：有序的单链表就很难通过二分查找

#### 代码模板
```js
let left = 0, right = len(array) - 1
while (left <= right) {
  let mid = (left + right) >> 1
  if (array[mid] === target) { /*find the target*/; return }
  else if (array[mid] < target) left = mid + 1
  else right = mid - 1
}
```

## 八、高级搜索
朴素搜索优化：1.剪枝。2.双向

剪枝：22.括号生成，51.八皇后

双向广度优先遍历：无向图中两个顶点之间的最短路径的长度，可以通过广度优先遍历得到
已知目标顶点的情况下，可以分别从起点和目标顶点（终点）执行广度优先遍历，直到遍历的部分有交集，这是双向广度优先遍历的思想。

启发式搜索，基于BFS，优先队列，选择估价函数

# 数据结构
## 九、链表，树和图
有一个next指针指向下一个节点，查询的时候，时间复杂度是n，增加删除修改的时间复杂度都是1

*跳表就是链表的升纬，常用于redis*

**链表是特殊的树，树是特殊的图**，二叉树有左右2个字节点，但是没有环，如果有环就是图

二叉树遍历：
- 前序遍历：根-左-右
- 中序遍历：左-根-右 (二叉搜索树的中序遍历的结果是递增的)
- 后续遍历：左-右-根
三种遍历都是深度优先遍历

**树的面试题的解法一般都是递归**

二叉搜索树：又叫有序二叉树，左子树所有节点均小于它的根节点的值，右子树所有节点均大于它的根节点的值

查找节点的时间复杂度是logn，插入也是，先查找如果找不到的话，查找的位置就是插入的位置，创建：一个空的树就是二叉搜索树。删除：叶子节点简单，直接删除即可，如果不是，则找到右子树上第一个大于该节点的树，替换上去

#### 时间复杂度：
![](/images/n.png)

#### 二叉树的前序遍历算法题
**递归法**：
如果此时根节点为null，return；push根节点，递归左节点，递归右节点
时间复杂度2^n，空间复杂度n

**迭代法**：手动操作栈，模拟递归
把根节点入栈（入栈之后分析该节点），栈中不为空，开始循环从栈中弹出此时的根节点，如果null则进入下一个循环，push根节点的值，先把右节点push入栈，再把左节点push入栈（前序遍历先左后右输出，但是栈先进后出，所以先入右再入左）

## 十、栈和队列，双端队列
插入删除O(1)，查询O(n)

**如果题目中，有最近相关性，就可以用栈来解决，滑动窗口的问题用双端队列**

优先队列：插入O(1)，取出：O(logn)，底层具体实现的数据结构较为多样和复杂：heap，bst，treap

## 十一、哈希表，映射，集合
哈希表：**拉链式**解决冲突（创建一个链表）

## 十二、字典树和并查集
字典树即Trie树，又称单词查找树或键树，是一种树形结构。典型应用是用于**统计**和**排序**大量的字符串（但不仅限于字符串），所以经常**被搜索引擎系统用于文本词频统计**

优点：最大限度减少无谓的字符串比较，**查询效率比哈希表高**

基本性质：(空间换时间)
- 结点本身不存完整单词
- 从根结点到某一结点，路径上经过的字符链接起来，为该结点对应的字符串
- 每个结点的所有子结点路径代表的字符都不相同

#### 代码模板
```js
var Trie = function() {
  this.root = {}
};
Trie.prototype.insert = function(word) {
  if (!word) return
  let node = this.root
  for (let k of word) {
    if (!node[k]) {
      node[k] = {}
    }
    node = node[k]
  }
  node.isEnd = true
};

Trie.prototype.search = function(word) {
  if (!word) return false
  let node = this.root
  for (let k of word) {
    if (!node[k]) {
      return false
    }
    node = node[k]
  }
  return !!node.isEnd
};

Trie.prototype.startsWith = function(prefix) {
  if (!prefix) return false
  let node = this.root
  for (let k of prefix) {
    if (!node[k]) {
      return false
    }
    node = node[k]
  }
  return true
};
```

并查集：为了解决动态连通性问题
#### 代码模板
```js
class UnionFind {
  constructor(n) {
    this.count = n; // 连通分量
    this.parent = new Array(n);
    this.size = new Array(n);
    this.init(n);
  }
  init(n) {
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }
  find(x) {
    while (x != this.parent[x]) {
        // 压缩路径
      this.parent[x] = this.parent[ this.parent[x] ];
      x = this.parent[x];
    }
    return x;
  }
  union(p, q) {
    let rootP = this.find(p);
    let rootQ = this.find(q);
    if (rootP == rootQ) {
      return ;
    }
    if (this.size[rootP] > this.size[rootQ]) {
      this.parent[rootQ] = rootP;
      this.size[rootP] += this.size[rootQ];
    } else {
      this.parent[rootP] = rootQ;
      this.size[rootQ] += this.size[rootP];
    }
    this.count -= 1;
  }
}
```

## 十三、高级树，AVL树，红黑树
保持二维维度的关键：左右子树节点平衡

![](/images/avl.png)

**AVL树**：
- 平衡因子：左子树的高度减去右子树的高度（有时相反）= {-1, 0 , 1}
- 通过旋转操作来进行平衡（四种）
    1. 左旋
    2. 右旋
    3. 左右旋
    4. 右左旋
- 不足：节点需要存储额外信息，且调整次数频繁

**红黑树**：

近似平衡的二叉搜索树，**确保任何一个节点的左右子树高度差小于2倍**
1. 每个节点要么是红色，要么是黑色
2. **根节点是黑色**
3. 每个叶节点（NIL节点，空节点）是黑色
4. **不能有相邻接的两个红色节点**
5. **从任一节点到到其每个叶子的所有路径都包含相同数目的黑色节点**

**对比**

1. AVL树提供了更快的查询（更严格平衡）
2. 红黑树提供了更快的插入删除操作，因为AVL的旋转操作更多
3. AVL要存的额外信息更多（factors，heights），需要更多的内存，红黑树只需要存0/1
4. 读操作多用AVL，写操作用红黑树，红黑树常用于高级语言库，database用AVL

## 十四、布隆过滤器和LRU算法
哈希表-拉链存储重复元素，哈希表能存元素的其他信息

**布隆过滤器**：一个很长的二进制向量和一系列随机映射函数，**用于检索一个元素是否在一个集合中**

优点：空间效率和查询时间都远超一般的算法

缺点：有一定的误识别率和删除困难

![](/images/blue.png)

**LRU缓存**

最近最少使用的淘汰，**哈希表+双向链表实现**，O(1)查询，O(1)修改

缓存替换算法：先进先出，后进先出，最近最少，最少使用等等

![](/images/lru-1.png)

![](/images/lru-2.jpg)

#### 为什么用双向链表：
因为我们需要删除操作。删除一个节点不光要得到该节点本身的指针，也需要操作其前驱节点的指针，而双向链表才能支持直接查找前驱，保证操作的时间复杂度 O(1)

## 最后、排序

![](/images/sort-1.png)

![](/images/sort-2.png)

**重点：快速排序，堆排序，归并排序**

**js sort小于10是插入，大于10是快排**

初级排序 O(n^2)
1. 选择排序：每次找最小值，放到数组最前面
2. 插入排序：从前到后逐步构建有序序列，保持前半部分子数组有序，子数组从后往前循环，逐步挪动
3. 冒泡排序：嵌套循环，每次查看相邻元素，如果逆序则交换

高级排序 O(nlogn)
1. **快速排序**：数组取标杆pivot，将小元素放pivot左边，大元素放右侧，然后依次对左右子数组继续快排（分治），pivot的位置选择可以任意（尽量不申请新的内存空间）
   
   ![](/images/sort-3.png)
   
2. **归并排序**：把长度为n的序列分成两个长度为n/2的子序列，将子序列分别归并排序，然后merge
   
   ![](/images/sort-4.png)

3. 堆排序：数组元素依次建立小顶堆，依次取堆顶元素（维护堆）

归并和快排具有相似性，但步骤顺序相反
- 归并：先排序左右子数组，然后合并两个有序子数组
- 快排：先调配出左右子数组，然后对于左右子数组进行排序

最适合链表的排序算法是归并排序

特殊排序O(n)

1. 记数排序：元素必须是整数，数值不能太大，同位词问题，用数组
2. 桶排序：计数排序的升级版，利用了函数的映射关系，用Map
3. 基数排序：先排序个位，在排序十位，在排序百位。。。再用计数排序，计数排序范围只需要0-9
