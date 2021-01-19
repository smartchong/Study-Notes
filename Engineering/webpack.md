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
       