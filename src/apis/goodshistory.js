import httpInstance from '@/utils/http'

// 获取聊天记录的函数
export const getgoodshistory = (user_id) => {
  return httpInstance.get(`/products/users/${user_id}`, {
    params: {
      last_product_id: 0,
      num: 100
    }
  })
}
