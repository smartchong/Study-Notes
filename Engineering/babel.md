## 用途
   1. 代码转换器，将es6转es5（高版本js代码转为低版本js代码），jsx转js 

## 核心
   1. babel插件（plugin）       

## plugin与preset区别  
   1. preset是plugin的集合(babel-preset-es2015)   
   2. preset是全家桶，plugin包含未到提案proposal stage-4的ECMA新特性

## 常用的plugin与preset
   1. presets: ["next/babel"] ["@babel/preset-env"] ["@babel/preset-react"] ["@babel/preset-typescript"]
   2. plugins: [
      [
         "import", {
            "libraryName": "antd",
            "style": true
         }
      ],
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-coalescing",
      ["@babel/plugin-proposal-decorators",{ "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["@babel/plugin-proposal-object-rest-spread"],
      ["@babel/plugin-proposal-syntax-dynamic-import"](识别import()动态导入语法)
   ] 

## babel-preset-env实现原理
   1. 检查浏览器对JS特性的支持程度（compat-table）
   2. 将JS特性跟特定的babel插件建立映射
   3. stage-x的插件排除在外
   4. 根据开发者配置项确定至少包含哪些插件

## plugin与preset执行顺序
   1. 先执行所有plugin,再执行preset
   2. 多个plugin按声明次序顺序执行
   3. 多个preset按声明次序逆序执行

## 配置
   > .babelrc(JSON文件)
   > {
   >   "plugins": [
   >        "transform-react-jsx",    
   >        "transform-async-to-generator"
   >    ],
   >    "presets": [
   >        "es2015"
   >    ]  
   > }        


