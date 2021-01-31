## ES6模块与CommonJS和AMD模块的区别  
   * ES6模块的设计思想是尽量静态化并在编译时确定模块的依赖关系以及输入与输出变量，CommonJS和AMD模块只能在运行时确定上述关系  
   * CommonJS模块是对象且整体加载，ES6模块不是对象(export命令显式指定的输出代码)且按需加载，ES6模块无法引用模块自身  
   * CommonJS运行时加载，ES6模块编译时加载（静态加载），ES6模块加载效率高

## ES6模块优势  
   * 静态加载使得可静态分析，拓宽JS语法（如引入宏macro和类型检验type system）
   * 无需UMD模块格式，服务端和浏览器都支持ES6模块格式
   * 无需做成全局变量或navigator对象属性，浏览器新API模块格式提供
   * 无需对象作为命名空间（Math对象）

## 严格模式的限制（ES6模块自动采用严格模式）
   * 变量须声明后再使用
   * 函数的参数不能有同名属性（报错）  
   * 禁止this指向全局对象（顶层this指向undefined）  
   * 不能使用with语句
   * 不能对只读属性赋值（报错）
   * 不能使用前缀0表示八进制数（报错）
   * 不能删除不可删除的属性（报错）
   * 不能删除变量delete prop（报错），只能删除属性delete global[prop]
   * eval不会在其外层作用域引入变量
   * eval和arguments不能被重新赋值
   * arguments不会自动反映函数参数的变化
   * 不能使用arguments.callee
   * 不能使用arguments.caller
   * 不能使用fn.caller和fn.arguments获取函数调用的堆栈
   * 增加了保留字（protected、static和interface）

## export命令(规定模块对外接口)
   * export命令输出的接口与其对应的值是动态绑定关系（可获取到模块内部实时的值），而CommonJS模块输出的是值的缓存  
   * export命令可出现在模块任何位置（模块顶层），不可处于块级作用域内      
   > export var a = 1;   
   > export { a };  
   > export function fn() {};  
   > export { fn as fun };    

## import命令(输入其他模块功能)
   * import命令输入的变量只读，本质是输入接口（不能重新赋值，但可改写对象属性）
   * import后面from指定模块文件的位置可为相对路径，也可为绝对路径，若不带路径为模块名则需有配置文件告知JS引擎模块位置
   * import命令有提升效果，会提升到模块顶部首先执行，本质是import命令在编译阶段执行即代码运行之前
   * import为静态执行，无法使用表达式、变量和if结构    
   * import语句会执行所加载的模块且多次重复执行同一句import只会执行一次
   * import语句是Singleton模式
   > import { fn as fun } from ''; 

## 模块的整体加载
   * 整体加载即用星号(*)指定一个对象（输出值都加载在该对象上）
   * 模块整体加载所在对象可静态分析，不允许运行时改变  
   > import * as obj from '';
   
## export default命令
   * export default命令可用在匿名函数前，也可用在非匿名函数前，其他模块加载该模块时用import命令为该其指定任意名字    
   > export default function() {}
   > export default function fn() {}
   * 使用export default时对应import语句无需使用大括号，不使用export default时对应import语句需使用大括号  
   > export default function fn() {};  
   > import fun from '';  

   > export function fn() {};   
   > import { fn } from '';   
   * export default本质上是输出一个叫做default的变量或方法，系统允许为其取任意名字，其后不能跟变量声明语句
   > function fn() {}
   > export { fn as default };
   > export default fn;  

   > import { default as fun } from '';  
   > import fun from '';  

## import与export复合写法
   * export和import语句结合写成一行，实际并未被导入当前模块仅相当于对外转发该接口，当前模块不能直接使用该接口  
   > export { fn } from ''; 

   > import { fn } from '';  
   > export { fn };  

   * 接口改名  
   > export { fn as fun } from '';  

   * 整体输出  
   > export * from '';  

   * 默认接口  
   > export { default } from '';  

   * 具名接口改默认接口
   > export { es6 as default } from '';

   > import { es6 } from '';
   > export default es6;

   * 默认接口改具名接口
   > export { default as es6 } from '';

   * ES2020新增  
   > export * as ns from '';
    
   > import * as ns from '';
   > export { ns };

## 模块的继承  
   > export * from 'father';    
   > export var son = 'SON';  
   > export default function() {}  

## 动态加载模块import()
   * ES2020提案  
   * 返回一个Promise对象（模块加载成功后会作为一个对象作为then方法的参数）
   * 运行时执行加载指定模块  
   * 与所加载模块无静态连接关系 
   > import('').then(module => {}).catch(err => {}); 

## import()与Node的require方法区别  
   * import()异步加载  
   * require同步加载  

## import()适用场合  
   * 按需加载  
   > btn.addEventListener('click',event => {  
   >    import('')    
   >    .then(dialog => { dialog.open(); })  
   >    .catch(error => {}) 
   > });  

   * 条件加载  
   > if (condition) { 
   >     import('moduleA').then(...);  
   > } else {
   >     import('moduleB').then(...);        
   > }  

   * 动态模块路径
   > import(f()).then(...);

## import()使用方法
   * 对象解构赋值获取输出接口  
   > import('').then(({ export1,export2 }) => { // ... });  

   * default输出接口参数直接获得  
   > import('').then(module => { // ... });  

   * 具名输入形式  
   > import('').then(({ default: alias }) => { console.log(alias) });  

   * 同时加载多个模块  
   > Promise.all([
   >   import('./module1.js'),
   >   import('./module2.js'),  
   >   import('./module3.js'),        
   > ]).then(([module1,module2,module3]) => { // ... }); 

   * 配合async函数使用  
   > async function main() {
   >    const myModule = await import('./myModule.js');
   >    const { export1,export2 } = await import('./myModule.js'); 
   >    const [module1,module2,module3] = 
   >      await Promise.all([
   >          import('./module1.js'),
   >          import('./module2.js'),
   >          import('./module3.js'),
   >      ]); 
   > } 

## Module的加载实现
### 浏览器加载
* 传统方法      
> <script src="" defer></script>
> <script src="" async></script>
* defer与async区别  
1. defer要等到整个页面在内存中正常渲染结束才执行（DOM结构完全生成以及其他脚本执行完成），async一旦下载完渲染引擎就会中断渲染执行该脚本后再继续渲染，defer是渲染完执行，async是下载完就执行    
2. 多个defer脚本按照其在页面出现的顺序加载，多个async脚本无法保证加载顺序  
* 加载规则
> <script src="" type="module"></script> 
1. 代码在模块作用域中运行而非全局作用域运行，模块内顶层变量外部不可见  
2. 模块脚本自动采用严格模式  
3. 模块顶层this关键字返回undefined而非window（检测当前代码是否在ES6模块中）
> const isNotModuleScript = this !== undefined;
4. 同一模块多次加载将只执行一次  
5. 模块中可用import命令加载其他模块也可用export命令输出对外接口

### ES6模块与CommonJS模块差异
* ES6模块输出的是值的引用，CommonJS模块输出的是值的拷贝  
* ES6模块是编译时输出接口，CommonJS模块是运行时加载  
* ES6模块的import命令异步加载且有独立的模块依赖解析阶段，CommonJS模块的require()同步加载模块  

### Node.js模块加载方法
* Node.js使用ES6模块方式（v13.2版本开始）  
1. package.json文件中type字段指定为commonjs或无type字段,若要使用ES6模块则后缀名改为.mjs（默认启用严格模式）
2. package.json文件中type字段指定为module,若要使用CommonJS模块则后缀名改为.cjs     

### package.json的main和exports字段
* main和exports都可以指定模块的入口文件  
* exports字段优先级高于main字段
* exports字段用途:
  1. 子目录别名  
  > {
  >    "exports": {
  >        "./submodule": "./src/submodule.js"
  >    }
  > }
  2. main别名  
  > {
  >    "export": {
  >        ".": "./main.js"
  >    }
  > }  
  3. 条件加载 
  > {
  >     "type": "module",
  >     "exports": {
  >         ".": {
  >             "require": "./main.cjs",
  >             "default": "./main.js"
  >         }
  >     }
  > }

### CommonJS模块加载ES6模块
  * require()不支持ES6模块的原因：其同步加载
  > (async () => {
  >    await import('');
  > })();

### ES6 模块加载CommonJS模块  
  * 整体加载 
  > import packageMain from 'commonjs-package';
  > const { method } = packageMain;
  * Node.js内置的module.createRequire()
  > import { createRequire } from 'module';
  > const require = createRequire(import.meta.url);
  > const cjs = require('./cjs.cjs');

### 同时支持两种格式的模块  
  * 原始模块ES6格式需要给出一个整体输出接口(如export default obj),CommonJS可以用import()加载   
  * 原始模块CommonJS格式加一包装层  
  > import cjsModule from './index.js';
  > export const foo = cjsModule.foo;
  * package.json文件的exports字段指明两种格式模块各自的加载入口  
  > "exports": {
  >    "require": "./index.js",   
  >    "import": "./esm/wrapper.js"
  > }

### Node.js的内置模块  
  * Node.js的内置模块可整体加载也可加载指定输出项  
  > import EventEmitter from 'events';
  > import { readFile } from 'fs';

### ES6模块加载路径  
  * import命令和package.json文件的main字段不能省略脚本后缀名  
  * 支持URL路径，同一脚本参数不同将多次加载（对:、%、#、?转义）  
  * import命令只支持加载本地模块(file:协议)和data:协议且不支持加载远程模块，脚本路径只支持相对路径不支持绝对路径  

### 内部变量
  * ES6 模块顶层this指向undefined，CommonJS模块顶层this指向当前模块  
  * ES6模块不存在的顶层变量（原因：同时支持浏览器和服务器环境）    
  1. arguments  
  2. require  
  3. module   
  4. exports  
  5. __filename  
  6. __dirname

## CommonJS模块加载原理
  1. require命令第一次加载该脚本就执行整个脚本并在内存生成一个对象  
  > {
  >    id: '...',
  >    exports: { ... },
  >    loaded: true,  
  > }
  2. id属性是模块名，exports属性是模块输出的各个接口，loaded属性是一个布尔值，表示该模块是否执行完毕  
  3. 以后需用到该模块时就会到exports属性上取值，即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，再加载就返回第一次运行的结果，除非手动清除系统缓存。

## 循环加载
   * CommonJS模块加载时执行，CommonJS模块出现某模块被"循环加载"则只输出已执行部分，未执行部分不输出  
   * ES6模块动态引用，若使用import从一个模块加载变量（即import foo from 'foo'）则该变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值时能够取到值  
