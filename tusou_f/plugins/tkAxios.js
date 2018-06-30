import * as axios from 'axios'
let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || '127.0.0.1'}:${process.env
    .PORT || 3000}`
}
// console.log(888, sessionStorage.getItem('user_token'))
axios.interceptors.request.use(
  config => {
    console.log(777, sessionStorage)
    if (sessionStorage) {
      console.log(666, sessionStorage.getItem('user_token'))
      config.headers.token = sessionStorage.getItem('user_token') //将接口返回的token信息配置到接口请求中
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios.create(options)
