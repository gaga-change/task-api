class Task {
    constructor ({name, type, content, close, closeAt, createAt}) {
        this.name = name
        this.type = type
        this.content = content
        this.close = close
        this.closeAt = closeAt
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