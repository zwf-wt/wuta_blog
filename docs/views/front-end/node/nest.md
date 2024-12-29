# NestJS
## 全局安装CLI
```bash
npm i -g @nextjs/cli

nest new project-name

nest --version
nest --help

nest g class user -d
nest g class user -d --no-spec

pnpm start:dev

nest g module user # 生成user模块：组织controller、service、dto、entity等
nest g controller user --no-spec -d # 生成user控制器: 作用于处理路由
nest g service user -d # 生成user服务：处理业务逻辑

# webpack 配置 热重载
npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
```
## RESTFUL API
- 接口的一种风格
RESTful API需要设计序言、全局(错误码、请求Base、Proxy等)参数、修改记录以及按照功能划分的接口描述
- 接口描述
- 请求URL
- 请求方式：POST/GET/PUT/DELETE
- 参数：Body或者Params或者Headers参数(JWT Token)及参数说明
- 返回示例
- 返回参数说明

### 示例：
#### 简要描述
- 用户注册接口
#### 请求URL
- /api/user/register
#### 请求方式
- POST
#### 参数
|参数名|必选|类型|说明|
|-|-|-|-|
|username|是|string|用户名|
|password|是|string|密码|
|nickname|是|string|昵称|
#### 返回示例
```json
{
  "code": 200,
  "msg": "注册成功",
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "管理员",
    "avatar": "http://www.xxx.com/avatar.png"
  }
}
```
#### 返回参数说明
|参数名|类型|说明|
|-|-|-|
|code|integer|状态码|
|msg|string|返回信息|
|data|object|返回数据|
|data.id|integer|用户ID|
|data.username|string|用户名|
|data.nickname|string|昵称|
|data.avatar|string|头像地址|
#### 备注
## 最佳实践
### 工程目录
约定大于配置

- src
  - core 核心代码
  - common 公共
    - middleward 中间件
    - interceptors 拦截器
    - guards 守卫
  - user
      - interceptors (scoped interceptors)
    - user.controller.ts
    - user.module.ts
  - store
    - store.controller.ts
    - store.model.ts
### 代码规范

#### 总则
- 坚持每个文件只定义一样东西(例如服务或组件)
- 考虑把文件大小限制在 400 行代码以内
- 坚持定义简单函数
- 考虑限制在75行之内

#### 命名规范
坚持所有箱号使用一致的命名规则
坚持遵循同一个模式来描述符号的特性和类型

#### 使用点和横杠来分隔文件名
坚持在描述性名字中，用横杠来分隔单词
坚持使用点来分隔描述性名字和类型
坚持遵循先描述组件特性，再描述它的类型的模式，例如：user.model.ts、feature.type.ts
坚持使用惯用的后缀来描述类型，包括 *.service、*.component、*.pipe、.module、.directive. 必要时可以创建更多类型名，但必须注意，不要创建太多

angular代码风格

## 编程思想
### OOP面向对象编程

### FP函数式编程

### FRP响应式编程

### 依赖注入DI
依赖注入(Dependency Injection)是一种用于实现IoC的设计模式，它允许在类外创建依赖对象，并通过不同的方式将这些对象提供给类。从而实现代码的解耦和重用。
### 控制反转IOC
控制反转(Inversion of Control)是一种面向对象编程中的一种设计原则，用来减低计算机代码之间的耦合度。其基本思想是：借助于"第三方"实现具有依赖关系的对象之间的解耦。
## Nestjs 核心概念
### 控制器（Controller）负责处理请求、返回响应

### 服务层 （Service）负责提供方法和操作，史包含业务逻辑

###  Data Access 层负责访问数据库中的数据

### 生命周期
> 客户端  --> 中间件 --> 守卫 --> 拦截器 --> 管道 --> 控制器 --> 服务 --> 拦截器 --> 过滤器 --> 响应 --> 客户端
钩子方法：定义为一个空的函数，用户可以自定义该方法来改变原有的逻辑

### 模块化
- 使用Moudule 来组织应用程序
- @Module 装饰器来描述模块
- 模块中有4大属性：imports, providers, controllers, exports

#### 如何分类模块
- 功能模块
- 共享模块
- 全局模块
- 动态模块

### MVC
一种软件架构模式(Model-View-Controller)，将应用程序分为三个核心组件：模型、视图和控制器。

- Nestjs可以通过模板库实现View层，常见：pub、hus、ejs等
- NestJs默认集成express 作为web服务器，可以换成Koa/fastify
- Controller 响应前端的请求，Model是对应的具体的数据库逻辑
### DTO、DAO
请求 ---> DTO ---> 逻辑 ----> DAO ---> 数据库

- DTO (Data Transfer Object) 数据传输对象
接收部分数据，对数据进行筛选，不对应实体，属性是小于等于实体
- DAO (Data Access Object) 数据访问对象: 访问的是数据库
对接数据库接口，不暴露数据库的内部信息，对应实现

DAO是一层逻辑：包含实体类，数据库操作(CURD)、数据校验、错误处理等，Nestjs做了一层更高级的封装，通过ORM库与数据库对接，面这些ORM库就是DAO层。

## 需求分析
- 我们的项目用户最痛点的问题是什么？
- 用户的功能的最小闭环是什么
- 辅助最小闭环的实现到项目上线，需要什么技术&方案？

## 多环境配置
插件：config、cross-env、dotenv、js-yaml、@nestjs/config
### env 配置
### yaml 配置
```yaml
# 第一步
# config/config.yml
db:
  mysql1:
    host: 127.0.0.1
    name: mysql-env1
    port: 3306

  mysql2:
    host: 127.0.0.1
    name: mysql-env2
    port: 3306
```
```ts
// 第二步
// src/configuration.ts
import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
const YAML_CONFIG_FILENAME = 'config.yml'
const filePath = join(__dirname, '../', YAML_CONFIG_FILENAME)

export default () => {
  return yaml.load(readFileSync(filePath, 'utf8'))
}
```
### 第三方插件进行配置
```

pnpm i config
```
```json
// config

// config.default.json
{
  "database": {
    "host": "127.0.0.1",
    "port": 3306,
  }
}

// development.json
{
  "database": {
    "host": "127.0.0.1",
    "port": 3306,
    "name": "development"
  }
}

// production.json
{
  "database": {
    "host": "127.0.0.1",
    "port": 3306,
    "name": "production"
  }
}

```

```ts
// app.mmudle.ts
import * as config from 'config'
console.log('config database', config.get('database'))

```
## 配置验证 JOI
```
npm i --save joi
```
```ts
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

console.log(envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_USER: Joi.string().required(),
      })
      load: [() => dotenv.config({ path: '.env' })],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

```