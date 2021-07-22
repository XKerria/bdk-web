import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/brands', { params })
  },
  store(data) {
    return axios.post('/brands', data)
  },
  destroy(id) {
    return axios.delete(`/brands/${id}`)
  }
}
