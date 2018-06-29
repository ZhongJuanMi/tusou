const Sequelize = require('sequelize')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = 'jwt demo'
const database = config.database

var sequelize = new Sequelize(
  database.DATABASE,
  database.USERNAME,
  database.PASSWORD,
  {
    host: database.HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
)
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },

  token: {
    type: Sequelize.STRING
  }
})

// force: true 如果表已经存在，将会丢弃表
// User.sync({
//     force: true
// }).then(() => {
//     // 表已创建
//     return User.create({
//         name: 'tuza',
//         password: '5261728911'
//     });
// });

// 校验用户是否已经注册
exports.ifUser = async (ctx, next) => {
  var name = ctx.query.name
  var result = await User.findOne({
    where: {
      name
    }
  })
  ctx.body = {
    has: result ? true : false
  }
}

//用户登录
exports.logUser = async (ctx, next) => {
  var { name, password } = ctx.request.body
  var result = await User.findOne({
    where: {
      name,
      password
    }
  })
  // 生成token
  if (result) {
    let userToken = {
      name: name
    }
    const token = jwt.sign(userToken, secret, {
      expiresIn: '1h'
    }) //token签名 有效期为1小时
    // 加入token
    await User.update(
      { token },
      {
        where: {
          name
        }
      }
    )
    console.log(999, token)
    ctx.body = {
      token,
      has: true
    }
  } else {
    ctx.body = {
      has: false
    }
  }
}

//用户注册
exports.registerUser = async (ctx, next) => {
  var { name, password } = ctx.request.body
  await User.create({
    name,
    password
  })
}
