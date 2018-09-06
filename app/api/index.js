const router = require('koa-router')()
const user = require('./user')

// 添加用户【admin】
router.post('/api/user', user.add)
// 删除用户【admin】
router.delete('/api/user/:id', user.bind, user.del)
// 修改用户【admin】【auth】
router.put('/api/user/:id', user.bind, user.put)
// 查询用户【admin】
router.get('/api/user/:id', user.bind, user.get)
router.get('/api/user', user.get)

module.exports = router.routes()