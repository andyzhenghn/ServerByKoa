const Router = require('koa-router');
const router = new Router();

// get method
router.get('/article', (ctx, next) => {
    return ctx.body = {
        code: 200,
        data: [
            {
                id: 1,
                name: 'xiaoming',
                sex: 0,
                age: 22
            }
        ],
        message: 'ok'
    };
});
// post method
router.post('/article', (ctx, next) => {
    let data = ctx.request.body;
    return ctx.body = {
        code: 200,
        data,
        message: 'ok'
    };
});

module.exports = router;