// 清单

const mongoose = require('mongoose')
const {Schema} = mongoose
// 清单状态
const TYPE = {
    // 激活状态
    ACTIVE: 1,
    // 关闭状态
    CLOSE: 2,
    // 收集箱【系统默认添加】
    DEFAULT: 3,
    // 垃圾箱【系统默认添加】
    TRASH: 4
}

/**
 * List Schema
 */

const ListSchema = new Schema({
    // 创建者
    author: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    // 颜色
    color: {
        default: '',
        type: String
    },
    // 清单名称
    name: {
        default: '',
        type: String
    },
    // 排序
    order: {
        default: Date.now(),
        type: Number
    },
    // 任务列表
    tasks: [
        {
            // 完成时间
            closeAt: {
                default: Date.now(),
                type: Date
            },
            // 内容
            content: {
                default: '',
                type: String
            },
            // 创建时间
            createAt: {
                default: Date.now(),
                type: Date
            },
            // 任务名称
            name: {
                default: '',
                type: String
            },
            // 优先级（数字越高优先级越高）
            priority: {
                default: 0,
                type: Number
            },
            // 类型
            type: {
                default: TYPE.ACTIVE,
                type: Number
            }
        }
    ],
    // 类型
    type: {
        default: TYPE.ACTIVE,
        type: Number
    }
}, {timestamps: true})

/** 实例方法 */
ListSchema.methods = {}

/** 静态方法 */
ListSchema.statics = {}

module.exports = mongoose.model('List', ListSchema)