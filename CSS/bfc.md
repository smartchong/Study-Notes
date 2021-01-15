## 概念
BFC(Block Formatting Context):块级格式化上下文，属于普通流定位方案，具有 BFC 特性的元素可以看作是隔离的独立容器，容器内的元素不会在布局上影响到外部元素，并且 BFC 具有普通容器所没有的一些特性。

## 布局规则
 * 内部盒子会在垂直方向持续放置
 * 盒子间垂直方向的距离由margin决定，同一BFC内两个相邻盒子margin会重叠
 * BFC区域不会与浮动元素重叠
 * BFC是页面中完全与外界隔离的容器，内外部不会相互影响
 * 计算BFC高度时，浮动元素也参与计算     

## 触发条件
 * html body 根元素
 * 浮动元素：float 除 none 以外的元素 
 * 绝对定位元素：position (absolute、fixed)
 * 行内块元素：display(inline-block)
 * 弹性元素：display(flex、inline-flex)  
 * 网格元素：display(grid、inline-grid) 
 * 表格单元格与标题：display(table-cell、table-caption) 
 * display为flow-root的元素 
 * contain (layout、content、paint)
 * overflow 除 visible 以外的元素 (hidden、auto、scroll)

## 应用
 * 阻止margin重叠：同一个 BFC 下外边距会发生折叠，要避免外边距的重叠，可将其置于不同的 BFC 容器中
 * 清除内部浮动：计算BFC高度时，浮动元素也参与计算
 * 阻止元素被浮动元素覆盖：BFC区域不会与浮动元素重叠




