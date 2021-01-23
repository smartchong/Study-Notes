## 概念
   管理全局状态的工具库

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
