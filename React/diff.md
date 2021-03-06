## 概念
Virtual DOM变化后，生成DOM Tree更新patch的方式。

## 用途
Virtual DOM Tree变化后，更新真实DOM（通过对比新旧两株Virtual DOM Tree的变更差异，将更新patch作用于真实DOM，以最小成本完成视图更新）

## 具体流程
1. 真实DOM映射为Virtual DOM；
2. Virtual DOM变化后，根据差异计算生成patch，该patch为一个结构化的数据，内容包含增加、更新、移除等；
3. 根据patch更新真实DOM。

## 触发更新时机
1. 调用setState
2. 调用hook

## Virtual DOM Tree遍历算法
 深度优先遍历算法：从根节点出发，沿着左子树方向进行纵向遍历，直到找到叶子节点为止。然后回溯到前一个节点，进行右子树节点的遍历，直到遍历完所有可达节点。

## Virtual DOM Tree遍历算法优化策略
深度优先遍历保证组件生命周期时序不错乱，但存在性能瓶颈，算法时间复杂度：O（n^3），为优化效率而采用分治方式，React将时间复杂度降为O（n），将单一节点比对转化为3种类型节点比对，分别为树、组件和元素，以此提升效率。
 ### 具体策略
 1. 忽略节点跨层级操作场景，提升比对效率。（树对比）
 2. 若组件类型一致，则默认为相似的树结构，否则默认为不同的树结构。（组件对比）
 3. 同一层级的子节点，可通过标记key的方式进行列表对比。（元素比对）
 ### 树比对
 由于网页视图中较少有跨层级节点移动，两株Virtual DOM Tree只对同一层级节点进行比较。
 ### 组件比对
 若组件为同一类型，则进行树比对，若不是，则直接放入补丁中。只要父组件类型不同，就会被重新渲染，通过shouldComponentUpdate、PureComponent及React.memo可以提高性能。    
 ### 组件比对
 主要发生在同层级中，通过标记节点操作生成补丁，节点操作对应真实DOM剪裁操作。

## Fiber架构新特点
为使整个更新过程可随时暂停恢复，节点与树分别采用FiberNode与FiberTree进行重构。FiberNode使用双链表结构，可直接找到兄弟与子节点。整个更新过程由current与workInProgress两株树双缓冲完成。workInProgress更新完成后，再通过修改current相关指针指向新节点。

## 根据diff原理优化代码
1. 根据diff算法设计原则，应尽量避免跨层级节点移动。
2. 设置唯一key进行优化，尽量减少组件层级深度(过深的层级会加深遍历深度，带来性能问题)。
3. 使用shouldComponentUpdate、React.pureComponent、React.memo减少diff次数。

## 对比Vue diff
1. Vue diff算法整体与React相似，但未实现Fiber设计，虽缺乏时间切片能力，但并不意味着Vue性能更差，因为Vue3初期引入过，后期因收益不高被移除。除高帧率动画，其他场景都可通过防抖（debounce）和节流（throttle）提高响应性能。
2. React拥有完整的diff算法策略，且拥有随时中断更新的时间切片能力，在大批量节点更新的极端情况下，拥有更友好的交互体验。
