const {
  sequelize,
  User
} = require('./database')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = 'jwt demo'

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
    name,
    num: Math.random() * 10
  }
  const token = jwt.sign(userToken, secret, {
    expiresIn: '1h'
  }) //token签名 有效期为1小时

  return token
}
//用户登录,返回has、token及用户信息
exports.logUser = async (ctx, next) => {
  let {
    name,
    password
  } = ctx.request.body
  let user = await User.findOne({
    where: {
      name,
      password
    }
  })
  // 生成token
  if (user) {
    const token = createToken(name)
    // 加入token
    await User.update({
      token
    }, {
      where: {
        name
      }
    })
    let {
      name,
      height,
      age,
      gender,
      idealWeight
    } = result.dataValues
    ctx.body = {
      userInfo: {
        name,
        height,
        age,
        gender,
        idealWeight
      },
      token,
      has: true
    }
  } else {
    ctx.body = {
      has: false
    }
  }
}

//用户注册,返回token及用户名
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
    userInfo: {
      name
    }
  }
}

// 获取用户信息
exports.getUser = async (ctx, next) => {
  // let user = this.verifyToken(ctx, next)
  let token = ctx.header.authorization
  let user = await User.findOne({
    where: {
      token
    }
  })
  if (user) {
    let {
      name,
      height,
      age,
      gender,
      idealWeight
    } = user
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
  let token = ctx.header.authorization
  let user = await User.findOne({
    where: {
      token
    }
  })
  if (user) {
    await User.update({
      height,
      idealWeight,
      gender
    }, {
      where: {
        token: ctx.header.authorization
      }
    })
  } else {
    ctx.body = {
      has: false
    }
  }
}

// 验证token
exports.verifyToken = async (ctx, next) => {
  let token = ctx.header.authorization
  let user = await User.findOne({
    where: {
      token
    }
  })
  console.log(9090, user)
  return user
}