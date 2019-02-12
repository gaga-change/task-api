// 清单

const mongoose = require('mongoose')
const {Schema} = mongoose

/**
 * List Schema
 */

const ListSchema = new Schema({
    // 创建者
    author: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    // 是否关闭
    close: {
        default: false,
        type: Boolean
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
        type: Number
    },
    // 任务列表
    tasks: [
        {
            _id: {
                type: Schema.Types.ObjectId
            },
            // 是否关闭
            close: {
                default: false,
                type: Boolean
            },
            // 完成时间
            closeAt: {
                default: null,
                type: Date
            },
            // 内容
            content: {
                default: '',
                type: String
            },
            // 创建时间
            createAt: {
                type: Date
            },
            // 是否删除
            delete: {
                default: false,
                type: Boolean
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
            }
        }
    ],
    // 任务列表
    tasks2: [
        {
            _id: {
                type: Schema.Types.ObjectId
            },
            // 是否关闭
            close: {
                default: false,
                type: Boolean
            },
            // 完成时间
            closeAt: {
                default: null,
                type: Date
            },
            // 内容
            content: {
                default: '',
                type: String
            },
            // 创建时间
            createAt: {
                type: Date
            },
            // 是否删除
            delete: {
                default: false,
                type: Boolean
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
            }
        }
    ]
}, {timestamps: true})

/** 实例方法 */
ListSchema.methods = {}

/** 静态方法 */
ListSchema.statics = {}

module.exports = mongoose.model('List', ListSchema)