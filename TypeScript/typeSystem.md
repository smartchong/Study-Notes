# TS类型系统  
## 函数定义  
* 函数被称作泛型操作符，其定义的简单方式是使用type关键字  
> type foo<T> = T;    
> // 转换成JS代码  
> function foo(T) { return T }
