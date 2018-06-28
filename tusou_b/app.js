const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = 'jwt demo'
const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
const response_formatter = require('./middlewares/response_formatter')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app
  .use(jwtKoa({
    secret
  }).unless({
    path: [/^\/api\/users\/logUser/] //数组中的路径不需要通过jwt验证
  }))
router
  .post('/api/users/logUser', async (ctx, next) => {
    const user = ctx.request.body
    if (user && user.name) {
      let userToken = {
        name: user.name
      }
      const token = jwt.sign(userToken, secret, {
        expiresIn: '1h'
      }) //token签名 有效期为1小时
      ctx.body = {
        message: '获取token成功',
        code: 1,
        token,
        has: true
      }
    } else {
      ctx.body = {
        message: '参数错误',
        code: -1
      }
    }
  })
  .get('/api/userInfo', async (ctx) => {
    const token = ctx.header.authorization // 获取jwt
    let payload
    if (token) {
      payload = await verify(token.split(' ')[1], secret) // // 解密，获取payload
      ctx.body = {
        payload
      }
    } else {
      ctx.body = {
        message: 'token 错误',
        code: -1
      }
    }
  })
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(response_formatter('^/api'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

app.use(router.routes(), router.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app