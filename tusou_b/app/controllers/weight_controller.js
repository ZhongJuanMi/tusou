const { sequelize, Weight, User } = require('./database')

// 设置体重值
exports.setWeight = async (ctx, next) => {
  let user = await User.findOne(
    { include: [Weight] },
    {
      where: {
        token: ctx.header.authorization
      }
    }
  )
  var weight = Weight.build({
    userId: user.id,
    weight: JSON.stringify(ctx.request.body)
  })
  user.setWeight(weight)
  ctx.body = {}
}
// 获取体重值
exports.getWeight = async (ctx, next) => {
  let user = await User.findOne(
    { include: [Weight] },
    {
      where: {
        token: ctx.header.authorization
      }
    }
  )
  ctx.body = {
    weight: user.weight
  }
}
