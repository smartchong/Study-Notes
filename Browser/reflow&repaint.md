## 浏览器的渲染过程
 ### 总体渲染过程
  ![浏览器渲染过程图](https://user-gold-cdn.xitu.io/2018/12/10/16798b8db54caa31?w=624&h=289&f=png&s=41057)  
 * parse HTML => DOM Tree,parse CSS => CSSOM Tree
 * DOM Tree & CSSOM Tree结合 => Render Tree
 * Layout(重排):get nodes' 几何信息(位置or大小) according to render tree
 * Painting(重绘):get nodes' 绝对像素 according to render tree & layout
 * Display:GPU处理像素并展示在页面上

 ### Render Tree构建过程 
  ![渲染树构建过程图](https://user-gold-cdn.xitu.io/2018/12/10/16798b8d839a7d6d?w=1150&h=537&f=png&s=34944) 
 * 从DOM Tree根节点开始遍历每个可见节点(由不可见节点反推)  
   不可见节点：  
   * 无渲染输出节点：meta link script
   * css隐藏节点：display:none
 * 对每个可见节点在CSSOM Tree中找到对应规则并应用
 * 根据每个可见节点及其对应样式组合生成render tree 

## 重排(reflow)  
 ### 概念
 根据渲染树计算可视节点在设备视口(viewport)的具体位置和大小

## 重绘(repaint)
 ### 概念
 在构建渲染树和重排后得到可见节点的样式和几何信息，将渲染树可见节点转换为屏幕上的实际像素

## 发生重排重绘的情况
 * 初始渲染
 * 元素位置变化
 * 元素尺寸变化(margin border padding width height) 
 * 可见节点的增 删 改 
 * 浏览器窗口尺寸变化

 ### ！重排一定会触发重绘，重绘不一定会重排 

## 浏览器的优化机制
 通过队列化修改操作并批量执行来优化

 ### 强制刷新队列的操作
 * clientTop clientLeft clientWidth clientHeight
 * offsetTop offsetLeft offsetWidth offsetHeight
 * scrollTop scrollLeft scrollWidth scrollHeight
 * getComputedStyle()
 * getBoundingClientRect

## 减少重排和重绘的措施
 ### 最小化重排重绘的次数：合并处理多次DOM和样式的修改  
 方式：    
 1. 使用cssText
 > el.style.cssText += 'width:50px;height:50px;padding:50px;';
 2. 修改css的class 
 > el.className += ' active';
 ### 批量修改DOM：(1)元素脱离文档流(2)多次修改(3)元素重回文档  
 方式：  
 1. 隐藏元素，修改，重新显示 
 > el.style.display = 'none';    
 > multipleMod(el);    
 > el.style.display = 'block';      
 2. 使用document fragment构建DOM外子树，再拷贝回文档
 > const fragment = document.createDocumentFragment();    
 > multipleMod(fragment);    
 > el.appendChild(fragment);    
 3. 将原元素拷贝至脱离文档流节点，修改后替换原元素
 > const clone = el.cloneNode(true);    
 > multipleMod(clone);    
 > el.parentNode.replaceChild(clone,el);      
 ### 避免触发同步布局事件：避免浏览器强制清空队列
 > const width = el.offsetWidth;    // 将引起强制清空队列操作的值缓存起来  
 ### 复杂动画利用绝对定位脱离文档流
 ### CSS3硬件加速(GPU加速)  
 触发硬件加速的css属性：  
 * transform
 * opacity
 * filters
 * will-change  
 css3硬件加速缺点：  
 * 大量元素使用会导致内存占用过大  
 * 渲染字体导致抗锯齿无效，产生字体模糊

 
