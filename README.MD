# 笔记

# 博客生成步骤
[vitepress从0到1，让每个前后端小伙伴都拥有一个属于自己的博客](https://mp.weixin.qq.com/s/KY0GAEYC6V4Xj1oGVtPgDg)

1. 创建一个文件夹 vitepress-demo-mondaylab
mkdir vitepress-demo-mondaylab && cd vitepress-demo-mondaylab
2. 使用pnpm初始化项目
pnpm init
3. 项目初始化完成以后，使用pnpm将vitepress安装为本地依赖。如下代码所示
```js
// # 安装命令
pnpm add vitepress -D

// # 如果使用pnpm初始化的话，需要在package.json加上以下代码
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search"
    ]
  }
}
```
4. vitepress附带了一个命令行向导，来帮助我们构建一个基本的项目
pnpm exec vitepress init
> 注意： 执行pnpm exec vitepress init命令的时候，需要确保当前目录下没有README.md文件，否则会报错。docs

5. 运行项目
pnpm run docs:dev
6. 部署项目
sh ./vitepress-starter/deploy.sh
