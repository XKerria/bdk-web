import axios from '@/utils/axios'

export default {
  login(data) {
    return axios.post('/auth/login', data)
  },
  user(options) {
    return axios.get('/auth/user', options)
  },
  refreshToken() {
    return axios.get('/auth/refresh')
  }
}
