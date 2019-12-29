import axios from 'axios'
import store from '@/store'
import router from '@/router/index'
import JSONBIGINT from 'json-bigint'

// 1. 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // data json格式的字符串
  return JSONBIGINT.parse(data)
}]
// 2. 请求头 token
axios.interceptors.request.use(config => {
  // 修改配置  加token
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => res, err => {
  // 自己逻辑
  // 1. 获取状态码
  const status = err.response.status
  // 2. 判断401
  if (status === 401) {
    // 3. 清除无效token
    store.delUser()
    // 4. 跳转登录
    // 4.1 原生方式改路径  router基于hash实现  /login ===> #/login
    // window.location.hash = '#/login'
    // 4.2 使用router进行跳转  $router本质 main.js导入了router/index.js的实例 挂载vue根实例下。
    router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
