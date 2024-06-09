import httpInstance from '@/utils/http'

// const upload = () => {
//   return httpInstance.get('/upload/policy')
// }

const uploadImg = (img_file) => {
  let fd = new FormData()
  fd.append('img', img_file) // 传文件

  return httpInstance.post(`/product/uploadPic`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }, //定义内容格式,很重要
    timeout: 5000
  })
}

export default {
  uploadImg
}
