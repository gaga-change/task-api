
class Page {
    constructor ({page, pageSize}) {
        const DEFAULT_PAGESIZE = 15
        const DEFAULT_PAGE = 1

        this.page = parseInt(page, 10) || DEFAULT_PAGE
        this.pageSize = parseInt(pageSize, 10) || DEFAULT_PAGESIZE
        this.skip = (this.page - DEFAULT_PAGE) * this.pageSize
        this.limit = this.pageSize
    }
}

module.exports = Page