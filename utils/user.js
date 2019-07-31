const mongoose = require('mongoose');
const { decodeToken, parseAuth } = require('./account');

// 从 authorization解析出用户 _id和 username
const getUserInfo = ctx => {
    return new Promise((resolve, reject) => {
        const authorization = parseAuth(ctx);
        const tokenDecoded = decodeToken(authorization);
        const { _id } = tokenDecoded;
        const userModal = mongoose.model('User');
        userModal.findById(_id).exec()
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};

exports.getUserInfo = getUserInfo;
