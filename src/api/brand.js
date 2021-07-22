import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/brands', { params })
  },
  show(id) {
    return axios.get(`/brands/${id}`)
  },
  store(data) {
    return axios.post('/brands', data)
  },
  update(id, data) {
    return axios.put(`/brands/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/brands/${id}`)
  }
}
