const List = require('../models/list_schema')
const mongoose = require('mongoose')
const only = require('only')
const code = require('../code')

module.exports = {

    /**
     * 增加任务
     * @param {Object} ctx context
     * @returns {void} 返回任务对象
     */
    async add (ctx) {
        const {body} = ctx.request
        const {listId} = ctx.params
        const task = only(body, 'name')

        task._id = new mongoose.Types.ObjectId()
        await List.updateOne({_id: listId,
            author: ctx.session.user}, {$push: {tasks: task}})
        ctx.body = task
    },

    /**
     * 删除任务
     * @param {Object} ctx context
     * @returns {void} 返回任务对象
     */
    async del (ctx) {
        const {listId, taskId} = ctx.params

        ctx.body = await List.updateOne({
            _id: listId,
            author: ctx.session.user
        }, {
            $pull: {tasks: {_id: taskId}}
        })
    },

    /**
     * 查询任务
     * @param {Object} ctx context
     * @returns {void} 返回任务列表
     */
    async get (ctx) {
        const {listId} = ctx.params

        if (listId) {
            // 单个清单
            const list = await List.findOne({_id: listId,
                author: ctx.session.user}).select('tasks')

            ctx.assert(list, code.BadRequest, '清单不存在')
            ctx.body = list.tasks
        } else {
            // 多个清单
            const lists = await List.find({
                author: ctx.session.user
            }).select('tasks')

            ctx.body = lists
        }
    },

    /**
     * 查询任务(单个)
     * @param {Object} ctx context
     * @returns {void} 返回任务对象
     */
    async getOne (ctx) {
        const {listId, taskId} = ctx.params
        const list = await List.findOne({
            _id: new mongoose.Types.ObjectId(listId),
            author: ctx.session.user
        }, {
            tasks: {
                '$elemMatch': {
                    _id: new mongoose.Types.ObjectId(taskId)
                }
            }
        })

        ctx.assert(list && list.tasks.length, code.BadRequest, '任务不存在')
        const [task] = list.tasks

        ctx.body = task
    },

    /**
     * 修改任务
     * @param {Object} ctx context
     * @returns {void} 返回任务对象
     */
    async put (ctx) {
        const {body} = ctx.request
        const {listId, taskId} = ctx.params
        const task = only(body, 'name type content')
        const update = {}

        // 修改参数
        for (const key in task) {
            if (Reflect.apply(Object.prototype.hasOwnProperty, task, [key])) {
                update[`tasks.$.${key}`] = task[key]
            }
        }
        // 修改参数
        ctx.body = await List.updateOne({'_id': listId,
            'author': ctx.session.user,
            'tasks._id': taskId}, update)
    }
}