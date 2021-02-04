## 对象复制器函数  
   > function copy(obj) {
   >    const copy = Object.create(Object.getPrototypeOf(obj));
   >    const propNames = Object.getOwnPropertyNames(obj);
   >    propNames.forEach(function(name) {
   >        const desc = Object.getOwnPropertyDescriptor(obj,name);
   >        Object.defineProperty(copy,name,desc);
   >    });
   >    return copy;
   > }