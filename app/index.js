const Koa = require('koa')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const configMongo = require('../config/mongo')
const app = new Koa()

// MongoDB 连接
mongoose.connect(configMongo.link, {useNewUrlParser: true})
const db = mongoose.connection

// MongoDB 连接异常输出
db.on('error', console.error.bind(console, 'connection error:'))
// 日志信息输出
app.use(logger())
app.use(async (ctx) => {
    ctx.body = '我的清单 - 接口'
})

module.exports = app