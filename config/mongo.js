
// MongoDB 用户名
const mongodbUsername = process.env.MONGODB_USERNAME || ''
// MongoDB 密码
const mongodbPassword = process.env.MONGODB_PASSWORD || ''
// MongoDB 连接域名
const mongodbHost = process.env.MONGODB_HOST || 'localhost'
// MongoDB 连接端口
const mongodbPort = process.env.MONGODB_PORT || '27017'
// MongoDB 连接数据库名
const mongodbCollection = process.env.MONGODB_COLLECTION || 'test'

let mongodbConnectLink = ''
let userpwd = ''

if (mongodbUsername) {
    userpwd = `${mongodbUsername}:${mongodbPassword}@`
}

mongodbConnectLink = `mongodb://${userpwd}${mongodbHost}:${mongodbPort}/${mongodbCollection}`

exports.link = mongodbConnectLink
exports.show = `${mongodbHost}:${mongodbPort}/${mongodbCollection}`