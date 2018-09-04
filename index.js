const {app} = require('./app')
const configApp = require('./config/app')

// 启动项目
app.listen(configApp.port)