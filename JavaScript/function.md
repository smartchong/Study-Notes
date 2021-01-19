## 箭头函数与普通函数的区别
   1. 无参数或多参数，要用()括起来
   2. 单行且需返回结果时可省略{}
   3. 单行且需返回对象时要用()包裹
   4. 没有this super arguments new.target绑定
   5. 函数体中this对象是定义函数时对象非调用函数时对象，继承自外层作用域 

## 箭头函数适用场景
   1. 作用域中this需要传递时适用箭头函数

## 箭头函数不适用场景 
   1. 定义函数方法且该方法包含this
   2. 需要动态this时   

## async函数
   1. 与Promise Generator有关联
   2. await关键字仅在async function中有效，await操作符用于等待一Promise对象   
   3. await针对不同表达式的处理方式：
      * Promise对象：await暂停执行，等待Promise对象resolve，然后恢复async函数执行并返回解析值
      * 非Promise对象：直接返回对应的值

## Generator函数与普通函数的区别
   1. 在function后，函数名前有个*
   2. 函数内部有yield表达式

## Generator函数执行机制
   1. 调用不会立即执行，而是返回一指向内部状态对象的指针
   2. 调用迭代器对象Iterator的next方法，从函数头部或上次停下的地方开始执行,返回值{value,done}   
   3. 函数返回的迭代器对象Iterator：
      * next：(1)不传参，yield表达式的返回值为undefined(2)传参，该参数为上一步yield返回值   
      * return：(1)结束遍历(2)提供参数返回该参数，不提供参数返回undefined  
      * for... of遍历：

## 语法糖（Syntactic sugar）：糖衣语法
   增加程序可读性，减少程序代码出错
   * class 对象原型写法的语法糖，原型运行时  
   * async Generator的语法糖  
    
## 模块
   * AMD(requireJS) CMD(seaJS)
   * es6模块化：编译时确定模块的依赖关系 输入输出变量
   * 模块只加载一次(单例),再去加载同目录下同文件，直接读内存
   * 每个模块都有自己上下文，模块内声明的变量都是局部变量，不污染全局作用域