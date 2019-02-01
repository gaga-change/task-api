/**
 * 版本迭代数据库脚本补丁
 */

const mongoose = require('mongoose')
const {
    link: mongoConnectLink
} = require('../config/mongo')
const List = require('../app/models/list_schema')

mongoose.connect(mongoConnectLink, {
    useNewUrlParser: true
})
const db = mongoose.connection

/** 新增tasks2字段,以及将已完成任务迁移到该字段下 */
async function start() {
    
    const res = await List.updateMany({
        tasks2: null
    }, {
        $set: {
            tasks2: []
        }
    })
    console.log('update : ', res)

    let arr = await List.find({})

    arr.forEach(async item => {

        let closedTask = item.tasks.filter(i => i.close)
        if (closedTask.length) {
            closedTask.forEach(async son => {
                await List.updateOne({
                    _id: item._id
                }, {
                    $pull: {
                        tasks: {
                            _id: son._id
                        }
                    }
                })

                const res = await List.updateOne({
                    _id: item._id
                }, {
                    $push: {
                        tasks2: {
                            $each: [son],
                            $position: 0,
                            $sort: {
                                closeAt: -1
                            }
                        }
                    }
                })
                console.log(res)
            })
        }
    })
}

start()