import httpInstance from '@/utils/http'
import md5 from 'js-md5'

const login = ({bitid, password}) => {
    password = md5(password)
    return httpInstance.post('/users/login', {
        bitid,
        password
    })
}

const register = ({bitid, password}) => {
    password = md5(password)
    return httpInstance.post('/users/register', {
        bitid,
        password
    })
}

export default {
    login,
    register
}