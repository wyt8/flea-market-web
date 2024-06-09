import httpInstance from '@/utils/http'
export const getuserinfo = (user_id) => {
  return httpInstance.get(`/users/${user_id}`, {
    user_id
  })
}
export const updateinfo = (
  user_id,
  { name, avatar_url, gender, contact_info, personal_signature }
) => {
  return httpInstance.post(`/users/${user_id}`, {
    name,
    avatar_url,
    gender,
    contact_info,
    personal_signature
  })
}

export const updateavatar = (user_id, img_file) => {
  let fd = new FormData()
  fd.append('img', img_file) // 传文件

  return httpInstance.post(`/users/${user_id}/uploadAvatar`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }, //定义内容格式,很重要
    timeout: 5000
  })
}
