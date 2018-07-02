const {
  sequelize,
  Weight,
  User
} = require('./database')

// 设置体重值
exports.setWeight = async (ctx, next) => {
  let user = await User.findOne({
    include: [Weight],
    where: {
      token: ctx.header.authorization
    }
  })
  let {
    datetime,
    weight
  } = ctx.request.body
  let _datetime = datetime.split(" ")
  let date = _datetime[0]
  let time = _datetime[1]
  let AP = parseInt(time.slice(0, 2)) < 12 ? 'AM' : 'PM'
  let weightInfo = Weight.build({
    userId: user.id,
    weight,
    date,
    time,
    AP
  })
  user.setWeight(weightInfo)
  ctx.body = {}
}
// 获取体重及个人信息
exports.getWeight = async (ctx, next) => {
  let user = await User.findAll({
    include: [Weight],
    where: {
      token: ctx.header.authorization
    }
  })
  console.log(usr)
  ctx.body = {
    weight: user.weight
  }
}