## plugin:可在不同时期运行的生命周期挂钩上注册回调函数

## loader与plugin的区别
   1. loader加载处理文件，plugin用来扩展功能
   2. loader正则匹配文件名并处理，逆序执行compose  
      > module:{
      >     rules: [
      >       { test: /\.txt$/,use:'raw-loader' }  
      >     ]
      > }
   3. 打包优化和压缩，一直到重新定义环境中的变量
      > plugins: [ 
      >   new HtmlWebpackPlugin({ template: './src/index.html' }) 
      > ]  
      
## 常用的loader
   1. css: less-loader css-loader style-loader
   2. picture: file-loader url-loader(两者区别：url-loader内置了file-loader，url-loader的limit参数) 
   3. js(x)/ts(x): babel-loader 

## 常用的plugin
   1. HtmlWebpackPlugin：生成服务于bundles的html
   2. MiniCssExtractPlugin：提取css  
   与 extract-text-webpack-plugin相比：  
   * 异步加载
   * 没有重复的编译
   * 特别针对 CSS 开发
