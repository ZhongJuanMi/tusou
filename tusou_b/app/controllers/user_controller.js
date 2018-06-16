const Sequelize = require('sequelize')
const config = require('../../config')
const database = config.database;

var sequelize = new Sequelize(database.DATABASE, database.USERNAME, database.PASSWORD, {
    host: database.HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.STRING
    }
});

// force: true 如果表已经存在，将会丢弃表
// User.sync({
//     force: true
// }).then(() => {
//     // 表已创建
//     return User.create({
//         name: 'tuza',
//         age: '17'
//     });
// });
//获取用户
exports.getUser = async (ctx, next) => {
    var user = await User.findById("1")
    ctx.body = {
        name: user.name,
        age: user.age
    }
}

//用户注册
exports.registerUser = async (ctx, next) => {
    console.log('registerUser', ctx.request.body);
}