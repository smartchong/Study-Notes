> 博学之，审问之，慎思之，明辨之，笃行之
# 从在浏览器地址栏中输入URL到页面显示到底发生了什么？

## 1.浏览器首先使用HTTP或HTTPS协议向服务端请求页面  
   > 当在浏览器地址栏输入内容并按下回车时，UI线程会判断输入内容是搜索关键字还是URL，若为搜索关键字则跳转至默认搜索引擎对应的搜索URL；若为URL则开始请求URL

## 2.DNS解析将输入的URL通过DNS解析成IP地址
   > 1.系统缓存中查找是否存在该域名对应的IP：浏览器调用库函数，检测本地hosts文件（电脑本地的地址映射文件），查看该文件中是否有该域名对应的IP地址  
   > 2.路由器缓存和ISP缓存：系统缓存未命中则请求DNS服务器，而网络服务一般都会先经过路由器和网络服务商（电信），因此先查询路由器缓存再查询ISP(Internet Service Provider)的DNS缓存  
   > 3.DNS递归查询：路由器缓存和ISP的DNS缓存都未命中则进行DNS递归查询，先查根域名服务器再到顶级域名服务器最后到主域名服务器  

## 3.TCP连接
   > 通过DNS查询到IP地址后，通过TCP三次握手客户端和服务端建立连接后客户端主动向服务端发起请求

## 4.服务端响应的HTML经解析构建DOM树
   > 浏览器进程将数据交给渲染进程，渲染进程负责将该tab下HTML/CSS/JS代码转化为用户可交互的web页面。渲染进程接收到导航的确认信息后开始接受浏览器进程的数据，此时主线程会解析数据并转化为DOM(Document Object Model)对象

## 5.计算DOM树上CSS属性
   > 主线程解析页面style标签或link标签的CSS资源生成CSSOM，从DOM树根节点出发遍历可见节点并在CSSOM树中找到对应规则并应用，根据每个可见节点及其样式（computed style）组合生成渲染树

## 6.根据渲染树对元素逐个渲染，得到内存中的位图
   > 布局和生成绘图记录：根据渲染树布局（Layout）,找到所有元素的几何关系，绘制阶段主线程遍历布局树（layout tree），生成一系列绘图记录（paint records），绘图记录是记录各元素绘制先后顺序的笔记。    
   > 光栅化：得到文档结构 元素样式 元素几何关系 绘画顺序后，将这些信息转化为显示器中的像素。  
   > GPU接收合成帧显示：合成线程通过IPC向浏览器进程提交一个渲染帧，此时可能有另外一个合成帧被浏览器进程的UI线程提交以改变UI。合成帧都会发送给GPU而显示在屏幕上。若合成线程收到页面滚动事件则会构建另一合成帧发送给GPU来更新界面。

## 7.合成后绘制到界面上

## 补充
### HTTPS
 * 使用TLS加密通道来传输HTTP内容，TLS构建于TCP协议之上  
 * 作用：(1)确定请求的目标服务器身份(2)保证传输数据不会被网络中间节点窃听或篡改   

### HTTP2.0
 * 服务端推送：在客户端发送第一个请求到服务端时，提前把一部分内容推送给客户端并放入缓存中，避免客户端请求顺序带来的并行度不高
 * TCP连接复用：同一TCP连接传输多个HTTP请求，避免TCP连接建立时的三次握手开销和初建TCP连接时传输窗口小的问题 


    
