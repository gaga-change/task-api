const router = require('koa-router')()
const user = require('./user')
const list = require('./list')

// 登入
router.post('/api/user/login', user.login)
// 退出登入
router.get('/api/user/logout', user.logout)
// 查看当前用户
router.get('/api/user/current', user.current)
// 添加用户【admin】
router.post('/api/user', user.add)
// 删除用户【admin】
router.delete('/api/user/:id', user.bind, user.del)
// 修改用户【admin】【auth】
router.put('/api/user/:id', user.bind, user.put)
// 查询用户【admin】
router.get('/api/user/:id', user.bind, user.get)
router.get('/api/user', user.get)

// 添加清单【auth】
router.post('/api/list', list.add)
// 删除清单【auth】
router.delete('/api/list/:id', list.bind, list.del)
// 修改清单【auth】
router.put('/api/list/:id', list.bind, list.put)
// 查询清单【auth】
router.get('/api/list/:id', list.bind, list.get)
router.get('/api/list', list.get)

module.exports = router.routes()