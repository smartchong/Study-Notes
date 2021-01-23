## ReactDOMServer
### 作用：将组件渲染成静态标记（Node服务端）
> // ES modules
> import ReactDOMServer from 'react-dom/server';
> // CommonJS 
> var ReactDOMServer = require('react-dom/server');

### API
* 服务端和浏览器环境
1. renderToString()  
作用：将React元素渲染为初始HTML，返回一个HTML字符串。在服务端生成HTML，在首次请求时将标记下发以加快页面加载速度，并允许搜索引擎爬取页面达到SEO优化的目的。
使用方式：在已有服务端渲染标记的节点上（包含额外的data-reactroot属性）调用ReactDOM.hydrate(),React将保留该节点且只进行事件处理绑定
使用场景：SSR

2. renderToStaticMarkup()
与renderToString区别：不会在React内部创建额外的DOM属性，如data-reactroot。将React当作静态页面生成器来使用，去除额外属性可节省字节
使用场景：SSG

* 服务端（依赖stream package）
1. renderToNodeStream()
2. renderToStaticNodeStream()




