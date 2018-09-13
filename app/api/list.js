const List = require('../models/list_schema')
const only = require('only')
const code = require('../code')

module.exports = {

    /**
     * 增加清单
     * @param {Object} ctx context
     * @returns {void} 返回清单对象
     */
    async add (ctx) {
        const {body} = ctx.request
        let list = only(body, 'name')

        list = new List(list)
        ctx.body = await list.save()
    },

    /**
     * 查询清单并绑定到 state
     * @param {Object} ctx context
     * @param {Object} next 后续
     * @returns {void}
     */
    async bind (ctx, next) {
        const {listId: id} = ctx.params
        const list = await List.findById(id).select('-tasks')

        ctx.state.list = list
        ctx.assert(ctx.state.list, code.BadRequest, '清单不存在')
        await next()
    },

    /**
     * 删除清单
     * @param {Object} ctx context
     * @returns {void} 返回清单对象
     */
    async del (ctx) {
        ctx.body = await ctx.state.list.remove()
    },

    /**
     * 查询清单
     * @param {Object} ctx context
     * @returns {void} 返回清单对象或清单列表
     */
    async get (ctx) {
        if (ctx.state.list) {
            // 单个
            ctx.body = ctx.state.list
        } else {
            // 多个
            ctx.body = await List.find({}).select('-tasks')
        }
    },

    /**
     * 修改清单
     * @param {Object} ctx context
     * @returns {void} 返回清单对象
     */
    async put (ctx) {
        const {body} = ctx.request
        const list = only(body, 'color name order type')

        // 修改参数
        for (const key in list) {
            if (Reflect.apply(Object.prototype.hasOwnProperty, list, [key])) {
                ctx.state.list[key] = list[key]
            }
        }
        ctx.body = await ctx.state.list.save()
    }
}