# ESLint

## 简介

高度可配置的 js 静态代码检查工具，已成为 js 代码检查的事实标准。

## 特性

- 完全可插拔，一切行为都通过配置产生
- 任意 rule 之间相互独立

## 原理

- 核心功能是通过一个叫 verify() 的函数来实现，该函数有两个必传参数：要验证的源码文本和一个配置对象（通过准备好的配置文件加命令行操作会生成配置）
- 该函数首先使用解析器 parser 将 js 代码解析为抽象语法树 AST
- 同时为规则中的所有选择器添加监听事件，在触发时执行
- 然后从上到下遍历 AST  
- 在每个节点触发与该节点类型同名的一个事件（即 “Identifier”“WithStatement” 等）
- 监听函数校验完相关的代码之后把不符合规则的问题推送到 lintingProblems 数组中返回

## VSCode 插件之 ESLint
[VSCode 插件之 ESLint](https://juejin.cn/post/6926456864276873230)  
 