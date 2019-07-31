const Router = require('koa-router');
const router = new Router();
const { createToken } = require('../../utils/account');

router.post('/register', async ctx => {
    let data = ctx.request.body;
    if (!data.userName || !data.password || data.password.length < 6) {
        return ctx.body = {
            code: 403,
            message: 'error'
        };
    }

    // 检查是否存在
    const User = mongoose.model('User');
    const checkByUserName = {
        userName: data.userName
    };
    await User.findOne(checkByUserName)
        .then(async doc => {
            if (!doc) {
                await User(data).save()
                    .then(() => {
                        return ctx.body = {
                            code: 200,
                            message: 'ok'
                        };
                    })
                    .catch(error => {
                        return ctx.body = {
                            code: 500,
                            message: error || 'created user failed'
                        };
                    });
            } else {
                return ctx.body = {
                    code: 400,
                    message: 'already exist'
                };
            }
        })
        .catch(error => {
            ctx.body = {
                code: 500,
                message: error || 'created failed'
            };
        });
});

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
    if (!id) {
        return ctx.body = {
            code: 403,
            message: 'input userId'
        };
    }
    const User = mongoose.model('User');
    await User.findById(id, (error, doc) => {
        if (error) {
            return ctx.body = {
                code: 500,
                message: error || 'query failed'
            };
        }
        return ctx.body = {
            code: 200,
            data: doc,
            message: 'ok'
        };
    });
});

module.exports = router;