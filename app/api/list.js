const mongoose = require('mongoose')
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

        list.author = ctx.session.user
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
        const list = await List.findById(id).
            select('-tasks').
            populate('author')

        ctx.state.list = list
        ctx.assert(ctx.state.list, code.BadRequest, '清单不存在')
        await next()
    },

    /**
     * 校验是否为本人操作。需搭配 bind、checkAuth 操作
     * @param {Object} ctx context
     * @param {Object} next next
     * @returns {void}
     */
    async checkMy (ctx, next) {
        ctx.assert(
            ctx.state.list.author &&
            ctx.state.list.author.id === ctx.session.user._id,
            code.Unauthorized, 'GO_LOGIN'
        )
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
            ctx.body = await List.find({
                author: ctx.session.user
            }).select('-tasks')
        }
    },

    /**
     * 查询清单（包含未完成子任务）
     * @param {Object} ctx context
     * @returns {void} 返回清单对象或清单列表
     */
    async getListContainNoCloseTask (ctx) {
        const listKey = {
            'close': '$close',
            'color': '$color',
            'name': '$name',
            'order': '$order'
        }

        ctx.body = await List.aggregate([
            {
                $match: {
                    author:
                        new mongoose.Types.ObjectId(ctx.session.user._id)
                }
            },
            {
                $project: {
                    ...listKey,
                    'tasks': {
                        '$filter': {
                            as: 'task',
                            cond: {
                                $eq: [
                                    '$$task.close',
                                    false
                                ]
                            },
                            input: '$tasks'
                        }
                    }
                }
            },
            {
                $project: {
                    ...listKey,
                    'tasks': {
                        _id: 1,
                        close: 1,
                        closeAt: 1,
                        createAt: 1,
                        name: 1
                    }
                }
            }
        ])
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