## 工具简介

- husky:git hook 工具
- lint-staged:实现每次提交只检查本次提交所修改文件

## 配置方式

- 方式一

1. npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional(tips:使用 npm 安装而非 yarn,在 windows 操作系统下 yarn 安装依赖不会触发 husky pre-commit 钩子命令)
2. 创建.huskyrc
   > {
   > "hooks": {
   > "pre-commit": "lint-staged",
   > "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
   > }
   > }
3. - 创建.lintstagedrc
   > {  
   >   "src/**/*.js": "eslint"  
   > }  
   - 设置fix可自动修复错误  
   > {
   >   "src/**/*.js": ["eslint --fix","git add"]
   > }  
   - 自动格式化代码(慎用)
   > {
   >   "src/**/*.js": ["prettier --write","git add"]
   > }
4. 创建commitlint.config.js  
   > module.exports = {
   >     extends: ['@commitlint/config-conventional'],
   >     rules: {
   >         'type-enum': [2, 'always', [
   >             'feat', // 新功能（feature）
   >             'fix', // 修补bug
   >             'docs', // 文档（documentation）
   >             'style', // 格式（不影响代码运行的变动）
   >             'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
   >             'test', // 增加测试
   >             'revert', // 回滚
   >             'config', // 构建过程或辅助工具的变动
   >             'chore', // 其他改动
   >           ],],
   >         'type-empty': [2, 'never'],    // 提交不符合规范时,也可以提交,但是会有警告   
   >         'subject-empty': [2, 'never'],    // 提交不符合规范时,也可以提交,但是会有警告    
   >         'subject-full-stop': [0, 'never'],
   >         'subject-case': [0, 'never'], 
   >     }
   > };

- 方式二
1.  配置在package.json内  
  > {
  >     "husky": {
  >       "hooks": {
  >         "pre-commit": "lint-staged"
  >       }
  >     },
  >     "lint-staged": {
  >       "src/**/*.js": "prettier --write --ignore-unknown"
  >     }
  > } 