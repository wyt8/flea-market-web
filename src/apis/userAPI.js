import httpInstance from '@/utils/http'
import md5 from 'js-md5'

const login = ({ bit_id, password }) => {
  password = md5(password)
  return httpInstance.post('/users/login', {
    bit_id,
    password
  })
}

const register = ({ bit_id, password, verification_code }) => {
  password = md5(password)
  return httpInstance.post('/users/register', {
    bit_id,
    password,
    verification_code
  })
}

const sendVerificationCode = (bit_id) => {
  return httpInstance.post('/verify', {
    bit_id
  })
}

const forgetPassword = ({ bit_id, password, verification_code }) => {
  password = md5(password)
  return httpInstance.post('/users/modify_password', {
    bit_id,
    password,
    verification_code
  })
}

export default {
  login,
  register,
  sendVerificationCode,
  forgetPassword
}
