const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');

// 定义数据库地址的常量
// 更标准的可以新建一个数据配置文件，专门存放数据相关的配置
const DB_ADDRESS = 'mongodb://localhost/ServerByKoa';
let connectConfig = { useNewUrlParser: true };

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const lg = console.log.bind(console);

// 定义连接函数
const connect = () => {
    // 重连次数
    let connectTimes = 0;
    const MAX_CONNECT_TIMES = 3;

    const reconnectDB = (resolve, reject) => {
        if (connectTimes < MAX_CONNECT_TIMES) {
            connectTimes++;
            mongoose.connect(DB_ADDRESS, connectConfig);
        } else {
            lg('[mongodb] database connect fail!');
            reject();
        }
    };

    // 连接数据库
    mongoose.connect(DB_ADDRESS, connectConfig);
    
    return new Promise((resolve, reject) => {
        // 监听断开
        mongoose.connection.on('disconnected', () => {
            reconnectDB(reject);
        });
        // 错误
        mongoose.connection.on('error', error => {
            lg(error);
            reconnectDB(reject);
        });
        // 开启
        mongoose.connection.on('open', () => {
            resolve();
        });
    });
};

exports.connect = connect;

exports.initSchemas = () => {
    glob.sync(path.resolve(__dirname, './schema/', '**/*.js')).forEach(require);
};

