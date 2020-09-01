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
| - index.js 项目启动文件
| - Dockerfile 创建容器镜像文件
| - eslintrc.js 规则定义

## 环境变量

`PORT` 端口号，默认3000
`MONGO_LINK` mongodb链接地址