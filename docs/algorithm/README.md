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
