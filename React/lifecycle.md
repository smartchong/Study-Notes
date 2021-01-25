## 生命周期与生命周期函数  
   * 生命周期函数非生命周期，只是在生命周期中按顺序被调用的函数。
   * 挂载 -> 更新 -> 卸载这一React组件完整的流程是生命周期。 

## 生命周期阶段
   * 挂载阶段（mount）：初始化到完成加载的过程 
     1. constructor     
     * 作用：初始化state与绑定函数    
     * 备注：类属性流行后去除了constructor,原因有三：  
     （1）constructor不推荐处理初始化以外的逻辑；  
     （2）constructor本身并不属于React生命周期，只是Class的初始化函数；  
     （3）移除constructor代码更简洁 

     2. getDerivedStateFromProps
     * 作用：使组件在props变化时更新state
     * 触发时机：（1）当props被传入时；（2）state发生变化时；（3）forceUpdate被调用时
     * 误区：并非props发生变化时getDerivedStateFromProps才会被调用，只要父级组件重新渲染getDerivedStateFromProps就会被调用
     * 调用：
     > static getDerivedStateFromProps(props,state) {  
     >     if (props.currentRow !== state.lastRow) {  
     >         return {  
     >             isScrollingRow: props.currentRow > state.lastRow,
     >             lastRow: props.currentRow,         
     >         };   
     >     }    
     >     return null;  
     > }  
     * 反模式的使用方式：(1)直接复制prop到state;(2)在props变化后修改state  

     3. UNSAFE_conponentWillMount 
     * 作用：组件即将加载前做一些操作  
     * 误用：跟服务端同构渲染时在该函数发起网络请求获取数据时，服务端和客户端会分别执行一次。  

     4. render  
     * 作用：返回JSX结构用于描述具体渲染内容
     * 误区：   
       1. render函数并未真正渲染组件，渲染是依靠React操作JSX描述结构来完成
       2. 纯函数，不应在此产生副作用，如调用setState（触发渲染造成死循环）或绑定事件（调用注册）    

     5. componentDidMount   
     * 作用：组件加载完成时做一些操作，如发起网络请求或绑定事件
     * 调用时机：render函数之后，在浏览器端可认为是在真实DOM绘制完成后调用    

   * 更新阶段（update）：外部props传入或state变化
     1. UNSAFE_componentWillReceiveProps
     * 作用：弃用，功能被getDerivedStateFromProps替代，不能同时存在

     2. getDerivedStateFromProps
     * 同挂载阶段

     3. shouldComponentUpdate(nextProps,nextState)  
     * 作用：return true或false，性能优化必争之地，通用优化方案PureComponent默认实现了shouldComponentUpdate，对props和state进行浅比较，用来判断是否触发更新。

     4. UNSAFE_componentWillUpdate
     * 作用：弃用，后续异步渲染设计会出现组件暂停更新渲染的情况

     5. render
     * 同挂载阶段

     6. getSnapshotBeforeUpdate
     * 作用：配合react新异步渲染机制，在DOM更新发生前被调用，返回值作为componentDidUpdate的第三个参数
     > getSnapshotBeforeUpdate(prevProps,prevState) {
     >     if (prevProps.list.length < this.props.list.length>) {         
     >          return list.scrollHeight - list.scrollTop;
     >     }
     >     return null;
     > }  
     > componentDidUpdate(prevProps,prevState,snapshot) {
     >     if (snapshot !== null) { ... }    
     > }

     7. componentDidUpdate
     * 作用：可使用setState会触发重新渲染，避免死循环

   * 卸载阶段（unmount）
     componentWillUnmount
     * 作用：执行清理工作，取消定时器和接触事件绑定

## 生命周期优化组件
   1. 函数组件：任何时候都会重新渲染且无生命周期，优化手段React.memo(非阻断渲染，而是跳过渲染操作并直接复用最近一次渲染结果)
   2. React.Component：shouldComponentUpdate
   3. React.PureComponent: 默认shouldComponentUpdate 
   
## 错误边界(降级后的UI渲染)
   1. getDerivedStateFromError(error)
   > static getDerivedStateFromError(error) {  
   >     return { hasError:true }       
   > }  
   2. componentDidCatch(error,errorInfo)
   > componentDidCatch(error,errorInfo) {  
   >    logErrorToService(error,errorInfo)      
   > }     
   3. dev环境下 react-error-overlay pro环境下 白屏
   4. 解决方案：
   (1) 预防：optional-chaining
   (2) 兜底：HOC 
   > export const errorBoundary = (WrappedComponent) => {
   >     return class Wrap extends Componnet {
   >        state = {
   >            hasError: false,
   >        }  
   >        static getDerivedStateFromError(err) {
   >            return {
   >                hasError: true,
   >                err
   >            }
   >        }
   >        componentDidCatch(err: Error,info: React.ErrorInfo) {
   >            
   >        } 
   >        render (
   >           return (
   >              this.state.hasError ? <ErrorDefaultUI /> : <WrappedComponent {...this.props} />
   >           )  
   >        )      
   >     }
   > }
   > @errorBoundary

## 生命周期职责
   * 状态变更
   * 错误处理 