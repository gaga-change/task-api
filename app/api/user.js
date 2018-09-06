const User = require('../models/user_schema')
const only = require('only')

const PARAMS_ERROR = 401

module.exports = {

    /**
     * 增加用户
     * @param {Object} ctx context
     * @returns {void} 返回用户对象
     */
    async add (ctx) {
        const {body} = ctx.request
        const user = new User(only(body, 'username password name'))

        ctx.body = await user.save()
    },

    /**
     * 查询用户并绑定到 state
     * @param {Object} ctx context
     * @param {Object} next 后续
     * @returns {void}
     */
    async bind (ctx, next) {
        const {id} = ctx.params
        const user = await User.findById(id)

        ctx.state.user = user
        ctx.assert(ctx.state.user, PARAMS_ERROR, 'User not found')
        await next()
    },

    /**
     * 删除用户
     * @param {Object} ctx context
     * @returns {void} 返回用户对象
     */
    async del (ctx) {
        ctx.body = await ctx.state.user.remove()
    },

    /**
     * 查询用户
     * @param {Object} ctx context
     * @returns {void} 返回用户对象或对象列表
     */
    async get (ctx) {
        if (ctx.state.user) {
            // 单个
            ctx.body = ctx.state.user
        } else {
            // 多个
            ctx.body = await User.find({})
        }
    },

    /**
     * 修改用户
     * @param {Object} ctx context
     * @returns {void} 返回用户对象
     */
    async put (ctx) {
        const {body} = ctx.request
        const user = only(body, 'username password name')

        // 修改参数
        for (const key in user) {
            if (Reflect.apply(Object.prototype.hasOwnProperty, user, [key])) {
                ctx.state.user[key] = user[key]
            }
        }
        ctx.body = await ctx.state.user.save()
    }
}