const Koa = require('koa')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const session = require('koa-session')
const {link: mongoConnectLink} = require('../config/mongo')
const api = require('./api')
const app = new Koa()
const http = require('http').createServer(app.callback())
// const io = require('socket.io')(http, {
//     cookie: false,
//     path: '/api/socket',
//     pingInterval: 10000,
//     pingTimeout: 5000,
//     serveClient: false
// })

// MongoDB 连接
mongoose.connect(mongoConnectLink, {useNewUrlParser: true})
const db = mongoose.connection
// Session 配置参数
const CONFIG = {
    httpOnly: true,
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    renew: false,
    rolling: false,
    signed: true
}

// io.on('connection', function(socket){
//     console.log('a user connected')
//     socket.on('disconnect', function(){
//         console.log('user disconnected')
//     })
// })

// Session 配置
app.keys = ['junn secret 4']
// MongoDB 连接异常输出
db.on('error', console.error.bind(console, 'connection error:'))
// Body 解析
app.use(koaBody({jsonLimit: '10kb'}))
// Session 解析
app.use(session(CONFIG, app))
// 日志信息输出
app.use(logger())
// Api 接口
app.use(api)
app.use(async (ctx) => {
    ctx.body = '我的清单 - 接口'
})
// 异常监听
app.on('error', (err) => {
    console.error(err)
})

module.exports.db = db
module.exports.app = http