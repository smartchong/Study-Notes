## 概念
   管理全局状态的工具库,发布订阅模式

## 实现思想
   1. 全局state保存状态:createStore combineReducers
   2. dispatch(action):action返回{ type,payload } 
   3. reducer:根据action type返回{ ...state,...action.payload } 
   4. 生成new state

## 处理异步的方式  
   通过中间件(redux-thunk)处理 applyMiddleware 

## connect详解(react-redux)
   1. mapStateToProps: store中的数据作为props绑定到组件
   2. mapDispatchToProps: 将action作为props绑定到组件
   3. mergeProps: 合并props, Object.assign() 
   4. options   

## redux-thunk源码
   > function createThunkMiddleware(extraArgument) {
   >     return ({ dispatch, getState }) => (next) => (action) => {   
   >        if (typeof action === 'function') {
   >           return action(dispatch,getState,extraArgument);      
   >        }
   >        return next(action);
   >     };
   > }  
   > const thunk = createThunkMiddleware();    
   > thunk.withExtraArgument = createThunkMiddleware;

## redux的使用  
   * 利用redux提供的createStore函数生成Store,Store全局只能有一个,用来保存数据
   > import { createStore } from 'redux';  
   > const store = createStore(fn);     
   * createStore接收一个函数Reducer,用以处理action操作
   > const fn = (state = 0,action) => {  
   >    switch(action.type) {  
   >       case 'INCREMENT':   
   >          return state + 1;  
   >       case 'DECREMENT':  
   >          return state - 1;  
   >       default:  
   >          return state;
   >    }  
   > }  
   * 需要使用数据位置可通过getStore获取数据,通过subscribe订阅监听数据变化
   > store.subscribe(() => {
   >    const state = store.getState();
   > }) 
   * 需要变更数据使用dispatch配合action分发,约定action是一个拥有type属性的对象（type表示要操作的类型,payload表示传递参数）  
   > const action = {  
   >    type: 'INCREMENT',  
   >    payload: '参数'  
   > };  
   > store.dispatch(action);
   * 当调用store.dispatch时,redux将action传递给reducer,reducer通过自身逻辑返回新state,redux记录新state并推送消息给订阅了自己的组件,即触发subscribe中传入的函数,函数可通过store.getStore()获取新state以完成页面更新。  

## redux的使用示例  
   > const reducer = (state = 0,action) => {
   >    switch(action.type) {
   >       case 'INCREMENT':  
   >          return state + 1;
   >       default:  
   >          return state;
   >    }
   > };
   > const store = createStore(reducer);
   > store.subscribe(() => {
   >    document.querySelector('#count').innerHTML = store.getState();
   > });
   > document.querySelector('#button').addEventListener('click',function() {
   >    store.dispatch({ type: 'INCREAMENT' });
   > });


## redux的使用场景  
   * 组件间需要共享数据或共享状态（state）  