const router = require('koa-router')()
const user = require('./user')
const list = require('./list')
const task = require('./task')
const {checkAdmin, checkAuth} = require('./tools')

// 登入
router.post('/api/user/login', user.login)
// 退出登入
router.get('/api/user/logout', user.logout)
// 查看当前用户
router.get('/api/user/current', user.current)
// 修改当前用户【auth】
router.put('/api/user/current', checkAuth, user.put)

// 添加用户【admin】
router.post('/api/user', checkAdmin, user.add)
// 删除用户【admin】
router.delete('/api/user/:id', checkAdmin, user.bind, user.del)
// 修改用户【admin】
router.put('/api/user/:id', checkAdmin, user.bind, user.put)
// 查询用户【admin】
router.get('/api/user/:id', checkAdmin, user.bind, user.get)
router.get('/api/user', checkAdmin, user.get)

// 添加清单【auth】
router.post('/api/list', checkAuth, list.add)
// 删除清单【auth】
router.delete('/api/list/:listId', checkAuth, list.bind, list.checkMy, list.del)
// 修改清单【auth】
router.put('/api/list/:listId', checkAuth, list.bind, list.checkMy, list.put)
// 查询清单【auth】
router.get('/api/list/:listId', checkAuth, list.bind, list.checkMy, list.get)
router.get('/api/list', list.get)

// 添加任务【auth】
router.post('/api/task/:listId', task.add)
// 删除任务【auth】
router.delete('/api/task/:listId/:taskId', task.del)
// 修改任务【auth】
router.put('/api/task/:listId/:taskId', task.put)
// 查询任务（所有清单）【auth】
router.get('/api/task', task.get)
// 查询任务（清单下所有任务）【auth】
router.get('/api/task/:listId', task.get)
// 查询任务（单条）【auth】
router.get('/api/task/:listId/:taskId', task.getOne)

module.exports = router.routes()