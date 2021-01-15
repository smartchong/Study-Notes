## 浏览文境（Browser Context）
浏览器上下文(Browser Context)包住Document数据集合，然后利用程序呈现给用户。

## 会话历史（Session History）
会话栈(Session Stack)，栈顶为将被展示的Document，往下依次为展示中的Document，历史Document等。

## History API
提供操作控制浏览器会话历史(Session History)，维护会话栈(Session Stack)的能力。
1. history.go()：切换页面的同时不改变会话栈（Session Stack）
2. history.back() & history.forward()：相当于浏览器上的back和forward按钮，同样不改变会话栈（Session Stack）
3. history.pushState(state,title,url)：新增一个状态（State）到会话栈（Session Stack），改变会话栈（Session Stack），浏览器地址发生变化，页面跳转控制权交由前端js，凡是pushState产生的会话，调用history.go()或history.back() 或 history.forward()不会刷新页面。
 * state:状态数据（自定义），可以通过history.state获取
 * title:预留字段，多数浏览器不使用
 * url:新状态的URL  
 * 用途：  
   1. 前端SPA
   2. 垃圾网站利用多次pushState，使用户回退不出当前网站         
4. history.replaceState(state,title,url)：替换会话栈（Session Stack）中当前的状态，改变会话栈（Session Stack）
 * state:状态数据（自定义），可以通过history.state获取
 * title:预留字段，多数浏览器不使用
 * url:新状态的URL 
 * 用途：  
   1. 用户在支付页面完成付款后，出于安全考虑，支付页面没有必要再保存于会话栈中，可通过replaceState替换会话栈当前的状态       