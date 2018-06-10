/**
 * 开发环境的配置内容
 */

const config = {
  // 启动端口
  port: 8000,

  // 数据库配置
  database: {
    env:"development",
    DATABASE: 'tusou',
    USERNAME: 'root',
    PASSWORD: '0713',
    PORT: '3306',
    HOST: 'localhost'
  }
}

module.exports = config