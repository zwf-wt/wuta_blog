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