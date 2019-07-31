const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const SALT_ROUNDS = 10;
let ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    UserId: ObjectId,
    userName: {
        unique: true,
        type: String
    },
    password: String,
    likes: {
        type: Array,
        default: []
    },
    collect:{
        type: Array,
        default: []
    }
}, {
    // 加入该配置项，会自动生成创建时间
    // 在文档更新时，也会自动更新时间
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updateAt'
    }
});

// 每次保存时进行密码加密
userSchema.per('save', function(next) {
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

// 定义userSchema的实例方法
// 解密user password
userSchema.methods = {
    comparePassword(userPassword, passwordHash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(userPassword, passwordHash, (err, res) => {
                if (!err) return resolve(res);
                return reject(err);
            });
        });
    }
};

// 使用 mongoose发布模型
mongoose.model('User', userSchema);
