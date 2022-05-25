# pnpm-monorepo-learn-and-pratice

本仓库关于 monorepo 的学习和实践

涉及的技术:

```
monorepo的概念
pnpm (workspace)
npm script
typescript
rollup
```



## 项目初始化:

环境搭建(NodeJS14+,pnpm 安装)

```
$ npm install -g pnpm


// 安装完成之后，检查是否展示版本号

$ pnpm -v
6.32.9

```

划分文件结构：

```
examples/            // 用于存放实例代码，这一类包不需要作为npm包发布
packages/			// 用于存放仓库下需要开发和发布的包的代码
pnpm-workspace.yaml  // 告知pnpm如何管理编排包的配置文件
package.json		// 前端的管理文件，涉及依赖管理、命令执行等
```

创建代码(以 Git bash 终端为例):

```
 // 创建examples和packages文件夹
 mkdir examples packages

 // 创建pnpm的配置文件
 touch pnpm-workspace.yaml

 // 创建默认的package.json文件
 npm init -y
```

然后进入 packages 里面去进行包的创建（每个文件夹代表一个 npm 包）

```
// 进入到packages
cd packages

// 创建utils以及hooks两个包的文件夹
mkdir utils hooks

// 进入到utils,创建package.json和源码的src文件夹,创建后再返回上一级
cd utils && npm init -y && mkdir src && cd ..

// 同上，进到hooks
cd hooks && npm init -y && mkdir src && cd ..

```





执行之后，我们的项目结构应该是这样的:

```
exmaples/
packages/
	utils/
		src/
		package.json
	hooks/
		src/
		package.json
pnpm-workspace.yaml


```





## Workspace的配置

官方教程： https://pnpm.io/pnpm-workspace_yaml

修改根目录的 pnpm-workspace.yaml

这样的意思是告知pnpm，packages下的文件夹都是位于Workspace的，作为npm包去编排管理。

但排除所有文件夹下的  __ test __ 文件夹：

```
packages:
  - "packages/**"
  - "!**/__test__/**"
```





## 安装包开发所需依赖

先列出包开发需要的依赖有哪一些：

```
// 开发过程
eslint (编码规范)
typescript (ts支持)

// 打包过程
rollup以及插件 (代码打包工具)
```

这些依赖是我们开发过程中每一个包都会用到的，所以我们安装的时候，命令是这样的

```
pnpm add eslint typescript rollup -W -D
```

安装的命令和yarn是类似的，通过指定-W选项，让pnpm知道这些依赖是安装在Workspace下的

-D选项则是指定依赖以devDependencies的形式去安装

如果安装成功，效果应该是这样的：

```
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: D:\.pnpm-store\v3
  Virtual store is at:             node_modules/.pnpm
Downloading registry.npmjs.org/typescript/4.7.2: 11.7 MB/11.7 MB, done

devDependencies:
+ eslint 8.16.0
+ rollup 2.74.1
+ typescript 4.7.2

Progress: resolved 85, reused 77, downloaded 7, added 84, done
```





## TS环境搭建：

我们可以通过安装好的typescript提供的tsc指令去创建一份tsconfig.json，用于告知项目如何使用ts

详细的配置可以通过https://aka.ms/tsconfig 去了解如何使用

```
npx tsc --init
```





## Utils开发

在packages/utils/src下创建一个入口文件index.ts,以及一个logger.ts

logger.ts用于对console.log进行封装

```
// utils/src/logger.ts
export function logger(this: unknown, ...args: unknown[]) {
    console.log.apply(this, args)
}
```

```
// utils/src/index.ts

export { logger } from './logger'
```





## 处理打包

tsup:https://www.npmjs.com/package/tsup

```
pnpm add tsup -W -D
```

