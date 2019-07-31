// 引入 koa-router
const Router = require('koa-router');

const articleRouter = require('./modules/article');
const userRouter = require('./modules/modules/user');

// 实例化 Router中间件
const router = new Router({
    prefix: '/api'
});

// 注册路由
router.use(articleRouter.routes(), articleRouter.allowedMethods());
router.use(userRouter.routes(), userRouter.allowedMethods());

module.exports = router;