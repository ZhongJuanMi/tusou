const Sequelize = require('sequelize')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = 'jwt demo'
const database = config.database

let sequelize = new Sequelize(
  database.DATABASE,
  database.USERNAME,
  database.PASSWORD, {
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
  },
  height: {
    type: Sequelize.STRING
  },
  idealWeight: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING,
    defaultValue: "female"
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
  let name = ctx.query.name
  let result = await User.findOne({
    where: {
      name
    }
  })
  ctx.body = {
    has: result ? true : false
  }
}
// 生成token
function createToken(name) {
  let userToken = {
    date: new Date(),
    name
  }
  const token = jwt.sign(userToken, secret, {
    expiresIn: '1h'
  }) //token签名 有效期为1小时

  return token;
}
//用户登录
exports.logUser = async (ctx, next) => {
  let {
    name,
    password
  } = ctx.request.body
  let result = await User.findOne({
    where: {
      name,
      password
    }
  })
  // 生成token
  if (result) {
    const token = createToken(name)
    // 加入token
    await User.update({
      token
    }, {
      where: {
        name
      }
    })
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
  let {
    name,
    password
  } = ctx.request.body
  const token = createToken(name)
  await User.create({
    name,
    password,
    token
  })
  ctx.body = {
    token,
    has: true
  }
}

// 获取用户信息
exports.getUser = async (ctx, next) => {
  let token = ctx.header.authorization
  let result = await User.findOne({
    where: {
      token
    }
  })
  if (result) {
    let {
      name,
      height,
      age,
      gender,
      idealWeight
    } = result.dataValues
    ctx.body = {
      has: true,
      userInfo: {
        name,
        height,
        age,
        gender,
        idealWeight
      }

    }
  } else {
    ctx.body = {
      has: false
    }
  }
}

// 设置用户信息
exports.setInfo = async (ctx, next) => {
  let {
    height,
    idealWeight,
    gender
  } = ctx.request.body
  console.log(height, 222)
  await User.update({
    height,
    idealWeight,
    gender
  }, {
    where: {
      token: ctx.header.authorization
    }
  })
  ctx.body = {

  }
}