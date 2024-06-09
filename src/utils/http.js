import axios from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router/index'
import { MessagePlugin } from 'tdesign-vue-next'

const responseCode = {
  NotLogin: 101,
  TokenTimeout: 102
}

const httpInstance = axios.create({
  baseURL: 'http://119.8.97.65:8080',
  timeout: 5000
})

// 请求拦截器
httpInstance.interceptors.request.use(
  (req) => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
httpInstance.interceptors.response.use(
  (res) => {
    // if (res.data.code === responseCode.NotLogin) {
    //   MessagePlugin.error(res.data.msg)
    //   router.push({ name: 'login' })
    // }
    // if (res.data.code === responseCode.TokenTimeout) {
    //   MessagePlugin.error(res.data.msg)
    //   router.push({ name: 'login' })
    // }
    return res.data
  },
  (err) => {
    // message.error(err.response.data.message)
    Promise.reject(err)
  }
)

export default httpInstance
