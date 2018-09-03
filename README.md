# task
仿滴答清单。node.js + mongodb

## 启动

```
# 安装依赖
npm i 

# 启动项目
node ./index.js
```

## 目录结构

| - app 接口代码
| - | - models 数据存储模型
| - config 配置文件
| - | - app.js 站点信息配置文件
| - | - mongo.js MongoDB连接配置文件
| - doc REST Clinent 接口调试文件

## 环境变量

### MongoDB 配置 （`/config/mongo.js`）

``` js
const config = {
    // MongoDB 连接数据库名
    mongodbCollection: process.env.MONGODB_COLLECTION || 'test',
    // MongoDB 连接域名
    mongodbHost: process.env.MONGODB_HOST || 'localhost',
    // MongoDB 密码
    mongodbPassword: process.env.MONGODB_PASSWORD || '',
    // MongoDB 连接端口
    mongodbPort: process.env.MONGODB_PORT || '27017',
    // MongoDB 用户名
    mongodbUsername: process.env.MONGODB_USERNAME || ''
}
```

### 站点配置 （`/config/app.js`）

``` js
const config = {
    // 端口
    port: process.env.PORT || '3000'
}
```