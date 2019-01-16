const List = require('../models/list_schema')
const mongoose = require('mongoose')
const code = require('../code')

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
    }
}