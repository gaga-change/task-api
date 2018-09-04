const {app, db} = require('./app')
const configApp = require('./config/app')

// 启动项目
const server = app.listen(configApp.port)

exports.server = server
exports.db = db