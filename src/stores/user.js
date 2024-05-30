import { ref } from 'vue'
import { defineStore } from 'pinia'
// import userAPI from '@/apis/userAPI'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    // // 登录
    // const login = async ({ bitid, password }) => {
    //   const res = await userAPI.login({ bitid, password })
    //   if (!res.code) {
    //     userInfo.value = res.data
    //     return true
    //   }
    //   return false
    // }

    // // 登录
    // const register = async ({ bitid, password }) => {
    //   const res = await userAPI.register({ bitid, password })
    //   if (!res.code) {
    //     userInfo.value = res.data
    //     return true
    //   }
    //   return false
    // }

    // 退出登录
    const clearUserInfo = () => {
      userInfo.value = {}
    }

    const setUserInfo = (newValue) => {
      userInfo.value = newValue
    }

    return { userInfo, clearUserInfo, setUserInfo }
  },
  {
    // 存储用户信息到浏览器中
    persist: {
      enable: true
    }
  }
)
