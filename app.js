// 引入 Koa并 init
const Koa = require('koa');
// 引入 bodyParser 用于解析 Post数据
const bodyParser = require('koa-bodyparser');
// 引入 api路由
const router = require('./api');
const app = new Koa();

// 挂载路由之前先挂载 koa-bodyparser
app.use(bodyParser());
console.log(router);

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