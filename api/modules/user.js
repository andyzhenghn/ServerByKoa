const Router = require('koa-router');
const router = new Router();
const { createToken } = require('../../utils/account');

// 用户登录
router.post('/login', async ctx => {
    const data = ctx.request.body;
    if (!data.userName || !data.password) {
        return ctx.body = {
            code: 403,
            data: null,
            message: '参数错误'
        };
    }
    const userModal = mongoose.model('User');
    const userInstance = new userModal();
    const query = {
        userName: data.userName
    };

    await userModal.findOne(query).exec()
        .then(async res => {
            await userInstance.comparePassword(data.password, res.password)
                .then(isMatch => {
                    if (isMatch) {
                        const token = createToken(res);
                        return ctx.body = {
                            code: 200,
                            dataL: token,
                            message: 'ok'
                        };
                    }
                    return ctx.body = {
                        code: 400,
                        message: '账户密码错误'
                    };
                })
                .catch(err => {
                    ctx.body = {
                        code: 500,
                        message: err.message
                    };
                });
        })
        .catch(() => {
            return ctx.body = {
                code: 400,
                data: null,
                message: '当前用户不存在'
            };
        });
});


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