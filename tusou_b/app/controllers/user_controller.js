const Sequelize = require('sequelize')
const Op = Sequelize.Op
const config = require('../../config')

var sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
    host: config.HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
    }
});
const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true 如果表已经存在，将会丢弃表
User.sync({
    force: true
}).then(() => {
    // 表已创建
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});
//获取用户
exports.getUser = async (ctx, next) => {
    User.findAll().then(users => {
        ctx.body = {
            username: users.firstName,
            age: 17
        }
    })
    
}

//用户注册
exports.registerUser = async (ctx, next) => {
    console.log('registerUser', ctx.request.body);
}