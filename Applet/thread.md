## 小程序的线程架构
   1. 1个描述整体程序的app实例  
   2. 多个描述页面的page

## app的文件构成
   1. app.json公共配置文件   
   2. app.wxss公共样式文件  
   3. app.js主题逻辑文件（包含小程序在生命周期各个阶段相应的事件）  

## page页面的文件构成
   1. page.json页面配置
   2. page.wxml页面结构  
   3. page.wxss页面样式
   4. page.js页面主题逻辑（包含小程序在生命周期各个阶段相应的事件）     

## 生命周期
   1. 1个page的生命周期开始于onLoad事件  
   2. 在整个生命周期内onLoad、onReady、onUnload这3个事件各执行一次  
   3. onHide和onShow事件在每次页面隐藏和显示时都会触发  
   4. 当用户手动触发小程序的退出时，小程序仅触发app.Hide，下次进入小程序时会触发app.onShow以及当前页的page.onShow  
   5. 当小程序在后台运行超过一定时间未被唤起或用户手动在小程序的控制栏里点击退出程序或小程序内存占用过大被系统关闭时，小程序将被销毁并触发app.onUnload事件   

## 线程
   1. view线程(.wxml+.wxss)
   * ios:safari
   * android:x5浏览器
   * 开发工具:chrome
   * 职责:解析渲染页面（wxml和wxss）

   2. appServer线程
   * ios:JavaScriptCore
   * android:x5内核
   * 开发工具:nwjs
   * 职责:运行js。appServer线程运行在jsCore(android运行在x5,开发者工具运行在nwjs)。由于js不跑在webview不能直接操纵DOM和BOM,这是小程序没有window全局变量的原因


