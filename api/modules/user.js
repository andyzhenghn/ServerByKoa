const Router = require('koa-router');
const router = new Router();

router.get('/user/:userId', async (ctx, next) => {
    const id = ctx.params.userId;
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

module.exports = router;