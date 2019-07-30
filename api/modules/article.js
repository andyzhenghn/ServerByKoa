const Router = require('koa-router');
const mongoose = require('mongoose');
const { getUserInfo } = require('../../utils/user');

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
router.post('/article', async ctx => {
    let data = ctx.request.body;
    if (!data || !data.title || !data.content) {
        return ctx.body = {
            code: 403,
            message: '参数错误'
        };
    }
    try {
        const { username } = getUserInfo(ctx);
        try {
            data.author = username;
            const articleModal = mongoose.model('Article');
            const newArticle = articleModal(data);

            await newArticle.save();
            return ctx.body = {
                code: 200,
                message: '保存成功'
            };
        } catch (error) {
            return ctx.body = {
                code: 500,
                message: error.message
            };
        }
    } catch (error) {
        return ctx.body = {
            code: 500,
            message: error.message || '获取错误'
        };
    }
});

module.exports = router;