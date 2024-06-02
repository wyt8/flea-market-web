import httpInstance from '@/utils/http'

const upload = () => {
  return httpInstance.get('/upload/policy')
}

export default {
  upload
}
