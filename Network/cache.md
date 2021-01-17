## 缓存
   存储将要用到的数据，让数据访问更快（通常在浏览器或端上）    
   * 命中：缓存中找到请求数据
   * 穿透/不命中：缓存中无需要的数据
   * 命中率：命中次数/总次数
   * 缓存大小：缓存中一共可存的数据（移动端对大小有严格限制）
   * 清空策略：缓存空间不足时数据如何替换

   ### 清空策略
   1. FIFO  first in first out  
      [实现](https://github.com/smartchong/Study-Notes/blob/main/Network/cache/fifo.js)    
      思考：若为js缓存，用Map还是Array     

   2. LFU   least frequently used 
      思考：实现用数组还是优先级队列O(logN)

   3. LRU   least recently used  
      [实现](https://github.com/smartchong/Study-Notes/blob/main/Network/cache/lru.js)    
      思考：实现用数组还是优先级队列O(logN) 

## Cache-Control
   定义了所有缓存都要遵守的行为  

   ### 分类
   1. 可缓存性
   > public 允许所有方缓存  
   > private 只允许浏览器缓存  
   > no-cache 每次必须先询问服务器是否资源已更新    
   > no-store 不使用缓存   

   2. 缓存期限 
   > max-age 秒 存储周期 
   > s-maxage 秒 共享缓存（如代理）存储周期

   ### 常见用法
   1. jquery vue react公用的库 max-age=315360000
   2. crypto自研加密库 private max-age=315360000
   3. 名称未带hash值的图片 max-age=86400

## 缓存分类
   ### 强制缓存：不去服务器对比，强制使用缓存（若缓存生效不再发送请求）  
   1. Cache-Control: max-age=600
   2. Expires: <最后期限>  
   应用场景：长久不会变更的公用的库  

   ### 协商缓存：每次需要向服务器请求对比，协商使用缓存（若缓存生效不传body）  
   1. 响应Last-Modified:<昨天>  请求If-Modified-Since:<昨天>  304 Not Modified   
   2. 响应ETag:"480dbe-466-5b8c9e13366e4" 请求If-None-Match:"480dbe-466-5b8c9e13366e4"   

## 发布新的静态资源时如何更新缓存  
   每次发布的静态资源文件名都不同（webpack已提供了该能力），静态资源只针对流量付费不针对存储付费