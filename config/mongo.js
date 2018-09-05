/**
 * 连接MongoDB配置文件
 */

const config = {
    // 链接前缀
    getUserPwd () {
        if (this.mongodbUsername) {
            return `${this.mongodbUsername}:${this.mongodbPassword}@`
        }

        return ''
    },
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
    // 用户名 + 密码
}

// 完整的连接地址
config.link = `mongodb://${config.getUserPwd()}${config.mongodbHost}:` +
    `${config.mongodbPort}/${config.mongodbCollection}`

// 显示用
config.show = `${config.mongodbHost}:${config.mongodbPort}/` +
    `${config.mongodbCollection}`

module.exports = config