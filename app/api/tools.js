const code = require('../code')
const User = require('../models/list_schema')


class Tools {

    /**
     * 校验当前登录用户是否为管理员
     * @param {Object} ctx context
     * @param {Object} next next
     * @returns {void}
     */
    static async checkAdmin (ctx, next) {
        const {user} = ctx.session

        ctx.assert(user && User.isAdmin(user), code.Unauthorized, 'GO_LOGIN')
        await next()
    }

    /**
     * 校验是否登录
     * @param {Object} ctx context
     * @param {Object} next next
     * @returns {void}
     */
    static async checkAuth (ctx, next) {
        const {user} = ctx.session

        ctx.assert(user, code.Unauthorized, 'GO_LOGIN')
        await next()
    }
}

module.exports = Tools