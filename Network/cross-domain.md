## 浏览器的同源策略
同源策略是一种重要的安全策略，用于限制不同源之间文档与脚本的交互。当两个URL的协议、端口和域名都相同的情况下，这两个URL可被认为是同源。

## 同源策略的用途
 * 限制dom操作
 * 防止cookie信息窃取或篡改

## 跨域的解决方式
 ### 1. JSONP
 * 原理：利用HTML标签script、img不受同源策略限制的特性
 * 样板代码：
 > const script = document.createElement('script');  
 > script.type = 'text/javascript';  
 > script.src = 'https://x.com?cb=jsCallback';  
 > document.head.appendChild(script);   
 > window.jsCallBack = function(res){} 

 ### 2. CORS
 * 概念：跨域资源共享（Cross-origin resource sharing），CORS需要浏览器和服务器同时支持，实现CORS通信的关键是服务器，浏览器发现请求跨域，自动添加额外的头信息甚至多一次附加请求，整个CORS通信过程浏览器自动完成。
 * CORS请求分类：
   1. 简单请求：  
   * 请求方法为以下3种之一：HEAD GET POST
   * HTTP头不超出以下5种字段：Accept Accept-Language Content-Language Last-Event-ID Content-Type(值限于3个：application/x-www-form-urlencoded multipart/form-data text-plain) 
   * 流程：  
     1. 浏览器发出简单请求并在请求头添加Origin字段
     2. 服务器判断Origin是否在许可范围，  
        若不在则响应头不包含Access-Control-Allow-Origin字段；  
        若在则响应头多出  
        (1)Access-Control-Allow-Origin(必选):*(所有origin)/指定origin   
        (2)Access-Control-Allow-Credentials(可选):true(服务器允许请求中包含Cookie和HTTP认证信息,同时请求中需要设置withCredentials为true,且Access-Control-Allow-Origin指定为与请求页面一致的origin)  
        (3)Access-Control-Expose-Headers(可选)暴露除(Cache-Control Content-Language Content-Type Expires Last-Modified Pragma)6个基本字段之外的响应头  
           
   2. 非简单请求： 
   * 不同时满足简单请求两个条件都属于非简单请求 
   * 流程：  
     1. 预检请求(preflight)  
        正式通信前增加一次HTTP查询请求，请求方法为OPTIONS  
        (1)Origin(必选)  
        (2)Access-Control-Request-Method(必选)  
        (3)Access-Control-Request-Headers(可选)  
     2. 预检请求响应   
        若否定预检请求，无CORS相关头信息字段，触发能够被XMLHttpRequest捕获的错误；  
        若肯定预检请求，则响应头多出  
        (1)Access-Control-Allow-Origin(必选)   
        (2)Access-Control-Allow-Methods(必选)
        (3)Access-Control-Allow-Headers(条件可选):请求头中包含Access-Control-Request-Headers则必选
        (4)Access-Control-Allow-Credentials(可选):同简单请求
        (5)Access-Control-Max-Age(可选):指定预检请求有效期，有效期内无需再发送预检请求  
     3. 正式请求与响应   
        通过预检请求，同简单请求  

 ### 3. NGINX反向代理
 * 方法：先使用NGINX配置代理服务器，域名同浏览器访问的域名，然后利用NGINX反向代理访问目标域名
 * 示例： 
 > server{  
 >   # 监听8080端口 #  
 >   listen 8080;  
 >   # 域名为localhost #  
 >   server_name localhost  
 >   # 凡是localhost:8080/api的请求都转发到目标服务器https://www.demo.com #  
 >   location ^~ /api{    
 >       proxy_pass https://www.demo.com;      
 >   }                  
 > }  

## 对比JSONP与CORS
 * CORS的优势：JSONP只支持GET，CORS支持所有类型HTTP请求
 * JSONP的优势：支持老浏览器且可请求不支持CORS的网站

