import { ref } from 'vue'
import { defineStore } from 'pinia'
// import userAPI from '@/apis/userAPI'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

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
