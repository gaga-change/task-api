const List = require('../models/list_schema')
const mongoose = require('mongoose')
const code = require('../code')
const Task = require('./bean/task')

module.exports = {

    /**
     * 查询任务(单个) 有校验auth
     * @param {Object} ctx context
     * @returns {Object} 返回任务对象
     */
    async getTaskOne (ctx) {
        const {listId, taskId} = ctx.params
        const list = await List.findOne({
            _id: new mongoose.Types.ObjectId(listId),
            author: ctx.session.user
        }, {
            tasks: {
                '$elemMatch': {
                    _id: new mongoose.Types.ObjectId(taskId)
                }
            },
            tasks2: {
                '$elemMatch': {
                    _id: new mongoose.Types.ObjectId(taskId)
                }
            }
        })

        ctx.assert(
            list && (list.tasks.length || list.tasks2.length), code.BadRequest,
            '抱歉，任务不存在，它已被删除或被移出清单'
        )
        let tasks = null

        if (list.tasks.length) {
            ({tasks} = list)
        } else {
            tasks = list.tasks2
        }
        const [task] = tasks

        return {list,
            task}
    },
    async patchTask (ctx) {
        const {body} = ctx.request
        const {listId, taskId} = ctx.params
        const task = new Task(body)
        const update = {}
        const patch = task.getPatch()

        for (const key in patch) {
            if (Reflect.apply(Object.prototype.hasOwnProperty, patch, [key])) {
                update[`tasks.$.${key}`] = patch[key]
            }
        }
        // 修改参数
        await List.updateOne({'_id': listId,
            'author': ctx.session.user,
            'tasks._id': taskId}, update)

    },
    async patchTask2 (ctx) {
        const {body} = ctx.request
        const {listId, taskId} = ctx.params
        const task = new Task(body)
        const update2 = {}
        const patch = task.getPatch()

        for (const key in patch) {
            if (Reflect.apply(Object.prototype.hasOwnProperty, patch, [key])) {
                update2[`tasks2.$.${key}`] = patch[key]
            }
        }
        await List.updateOne({'_id': listId,
            'author': ctx.session.user,
            'tasks2._id': taskId}, update2)

    }
}