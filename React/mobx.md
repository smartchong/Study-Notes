## mobx原理  
   mobx是通过监听数据的属性变化,直接在数据上更改以触发UI渲染。

## mobx监听方式  
   * mobx5之前，实现监听的方式采用Object.defineProperty;  
   * mobx5之后，实现监听的方式采用Proxy。