import axios from '@/utils/axios'

export default {
  login(data) {
    return axios.post('/api/site/auth/login', data)
  },
  user(options) {
    return axios.get('/api/site/auth/user', options)
  }
}
