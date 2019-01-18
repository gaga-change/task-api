const List = require('../models/list_schema')
const mongoose = require('mongoose')
const only = require('only')
const Task = require('./bean/task')
const taskService = require('./taskService')
const Page = require('./page')

module.exports = {

    /**
     * 增加任务
     * @param {Object} ctx context
     * @returns {void} 返回任务对象
     */
    async add (ctx) {
        const {body} = ctx.request
        const {listId} = ctx.params
        const task = new Task(body)

        // Task._id = new mongoose.Types.ObjectId()
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
            $pull: {tasks: {_id: taskId},
                tasks2: {_id: taskId}}
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
            const list = await List.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(listId),
                        author: new mongoose.
                            Types.ObjectId(ctx.session.user._id)
                    }
                }
            ]).unwind('tasks').
                sort('tasks.close -tasks.closeAt -tasks.createAt').
                project({
                    _id: '$tasks._id',
                    close: '$tasks.close',
                    closeAt: '$tasks.closeAt',
                    createAt: '$tasks.createAt',
                    name: '$tasks.name'
                })

            ctx.body = list
        } else {
            // 多个清单
            const lists = await List.find({
                author: ctx.session.user
            }).select('tasks')

            ctx.body = lists
        }
    },

    /**
     * 查询任务（清单下所有未完成任务，以及15条已完成任务）
     * @param {Object} ctx context
     * @returns {void} 返回任务列表
     */
    async get2 (ctx) {
        const {listId} = ctx.params
        const page = new Page(ctx.query)

        const list = await List.findOne({
            _id: listId,
            author: ctx.session.user
        }).slice('tasks2', [
            page.skip,
            page.pageSize
        ])

        ctx.body = list
    },

    /**
     * 查询任务(单个)
     * @param {Object} ctx context
     * @returns {void} 返回任务对象
     */
    async getOne (ctx) {
        const {task} = await taskService.getTaskOne(ctx)

        ctx.body = task
    },

    /**
     * 修改任务 只改变传递的值
     * @param {Object} ctx context
     * @returns {void} 返回任务对象
     */
    async patch (ctx) {
        const {task} = await taskService.getTaskOne(ctx)

        if (task.close) {
            await taskService.patchTask2(ctx)
        } else {
            await taskService.patchTask(ctx)
        }

        ctx.body = task
    },

    /**
     * 修改任务 需传递完整的实例
     * @param {Object} ctx context
     * @returns {void} 返回任务对象
     */
    async put (ctx) {
        const {body} = ctx.request
        const {listId, taskId} = ctx.params
        const task = only(body, 'name type content close')
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
    },
    async switching (ctx) {
        const {body} = ctx.request
        const {list, task} = await taskService.getTaskOne(ctx)

        if (task.close === body.close) {
            ctx.body = '状态已被切换'
        } else {
            task.close = !task.close
            // 未完成 -> 已完成
            if (task.close) {
                await List.updateOne({
                    _id: list._id
                }, {
                    $pull: {tasks: {_id: task._id}}
                })
                ctx.body = await List.updateOne(
                    {_id: list._id},
                    {$push: {tasks2: task}}
                )
            } else {
            // 已完成 -> 未完成
                await List.updateOne({
                    _id: list._id
                }, {
                    $pull: {tasks2: {_id: task._id}}
                })
                ctx.body = await List.updateOne(
                    {_id: list._id},
                    {$push: {tasks: task}}
                )
            }
        }
    }
}