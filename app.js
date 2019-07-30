// 引入 Koa并 init
const Koa = require('koa');
// 引入 bodyParser 用于解析 Post数据
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
// 引入 api路由
const router = require('./api');
// 拿到 秘钥字符串
const { JWT_SECRET } = require('./utils/account');

const app = new Koa();

// jwt验证错误的处理
// 放在 jwt中间件挂载之前
app.use(function(ctx, next) {
    return next().catch(err => {
        if (401 === err.status) {
            ctx.status = 401;
            ctx.body -= {
                code: 401,
                message: '暂无权限'
            };
        } else {
            throw err;
        }
    });
});

// 挂载 jwt中间件
app.use(jwt({
    secret: JWT_SECRET
}).unless({
    path: [
        '/',
        '/api',
        '/api/login',
        '/api/register'
    ]
}));

// 挂载路由之前先挂载 koa-bodyparser
app.use(bodyParser());

// 挂载路由
// app.use(async ctx => ctx.body = 'Server Successfully');
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务，监听 3000 port
const appService = app.listen(3000, () => {
    console.log('[Koa]Server is starting at port 3000'); 
});

// 导出服务
module.exports = appService;