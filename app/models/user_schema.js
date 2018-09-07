
const mongoose = require('mongoose')
const crypto = require('crypto')
const {Schema} = mongoose

/**
 * User Schema
 */

const UserSchema = new Schema({
    // 密文
    hashedPassword: {
        default: '',
        type: String
    },
    // 别名
    name: {
        default: '',
        type: String
    },
    salt: {
        default: '',
        type: String
    },
    // 用户名
    username: {
        default: '',
        trim: true,
        type: String
    }
})

/** 虚拟属性 */
UserSchema.virtual('password').set(function set (password) {
    this.textPassword = password
    this.salt = this.makeSalt()
    this.hashedPassword = this.encryptPassword(password)
}).
    get(function get () {
        return this.textPassword
    })

/** 实例方法 */
UserSchema.methods = {

    /**
     * 验证 - 检测密码是否正确
     * @param {String} plainText 普通的文本（明文）
     * @returns {Boolean} 返回是否正确
     */
    authenticate (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword
    },

    /**
     * 加密 password
     * @param {String} password 明文
     * @returns {String} 密文
     */
    encryptPassword (password) {
        if (!password) {
            return ''
        }
        try {
            return crypto.
                createHmac('sha1', this.salt).
                update(password).
                digest('hex')
        } catch (err) {
            return ''
        }
    },

    /**
     * 创建 salt
     * @returns {String} 返回salt
     */
    makeSalt () {
        return String(Math.round(new Date().valueOf() * Math.random()))
    }
}

/** 静态方法 */
UserSchema.statics = { }

module.exports = mongoose.model('User', UserSchema)