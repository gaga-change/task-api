class Task {
    constructor ({_id, name, content, close, closeAt, createAt}) {
        this._id = _id
        this.name = name
        this.content = content
        this.close = close
        if (closeAt === 'SYS_TIME') {
            this.closeAt = Date.now()
        } else {
            this.closeAt = closeAt
        }
        this.createAt = createAt
    }

    /**
     * 获取 要修改的值
     * @returns {Object} 过滤后的对象
     */
    getPatch () {
        const res = {}

        for (const key in this) {
            if (typeof this[key] !== 'undefined') {
                res[key] = this[key]
            }
        }

        return res
    }
}

module.exports = Task