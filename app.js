// 引入 Koa并 init
const Koa = require('koa');
const app = new Koa();

// 启动服务，监听 3000 port
const appService = app.listen(3000, () => {
    console.log('[Koa]Server is starting at port 3000'); 
});

// 导出服务
module.exports = appService;