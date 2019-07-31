const Router = require('koa-router');
const mongoose = require('mongoose');
const { getUserInfo } = require('../../utils/user');

const router = new Router();

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

// get detail
router.get('/article/:id', async ctx => {
    const id = ctx.params.id;
    if (!id) {
        ctx.body = {
            code: 403,
            message: 'fail'
        };
    }
    const articleModal = mongoose.model('Article');
    await articleModal.findById(id).exec()
        .then(doc => {
            return ctx.body = {
                code: 200,
                data: doc,
                message: 'ok'
            };
        })
        .catch(() => {
            return ctx.body = {
                code: 500,
                message: 'not exist'
            };
        });
});

router.post('/like/:id', async ctx => {
    const { id } = ctx.params;
    if (!id) {
        return ctx.body = {
            code: 403,
            message: '参数错误'
        };
    }
    try {
        const { _id } = await getUserInfo(ctx);
        const likeModel = mongoose.model('UserArticleLike');
        const query = {
            cId: _id,
            articleId: id
        };
        const doc = await likeModel.findOne(query);

        if (!doc) {
            await likeModel(query).save();
            return ctx.body = {
                code: 200,
                message: 'like it successfully'
            };
        }
        if (doc.type === 1) {
            doc.type = 0;
            doc.save();
            return ctx.body = {
                code: 200,
                message: 'cancel successfully'
            };
        }
        if (doc.type === 0) {
            doc.type = 1;
            doc.save();
            return ctx.body = {
                code: 200,
                message: 'like it successfully'
            };
        }
    } catch (error) {
        return ctx.body = {
            code: 500,
            message: error.message
        };
    }
});

module.exports = router;