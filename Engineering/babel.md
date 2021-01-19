## 用途
   1. 代码转换器，将es6转es5，jsx转js 

## 核心
   1. babel插件（plugin） 

## plugin与preset区别
   preset是plugin的集合(babel-preset-es2015)   

## plugin与preset执行顺序
   1. 先执行所有plugin,再执行preset
   2. 多个plugin按声明次序顺序执行
   3. 多个preset按声明次序逆序执行

## 配置
   > .babelrc
   > {
   >   "plugins": [
   >        "transform-react-jsx",    
   >        "transform-async-to-generator"
   >    ],
   >    "presets": [
   >        "es2015"
   >    ]  
   > }        
