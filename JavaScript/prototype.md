## 构造函数
   constructor返回创建实例对象时构造函数的引用。函数名首字母大写的函数。与普通函数区别在于，使用new调用生成实例的函数为构造函数 

   ### Symbol是否为构造函数？  
   基本数据类型，不是构造函数，但实例存在constructor属性，来自Symbol.prototype.constructor（Symbol函数）

   ### constructor值是否只读？  
   引用类型的constructor值可修改，基本类型的constructor是只读的。

   ### 模拟实现new  
   > function create() {  
   >     var obj = new Object(),
   >     Con = [].shift.call(arguments);
   >     Object.setPrototypeOf(obj,Con.prototype);
   >     var ret = Con.apply(obj,arguments);
   >     return ret instanceof Object ? ret : obj;   
   > }  

   ### new关键词底层做的事
   * 以构造器的prototype属性为原型创建新对象   
   * 将this和调用参数传给构造器执行 
   * 若构造器返回的是对象则直接返回，否则返回第一步创建的对象