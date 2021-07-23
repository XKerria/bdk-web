import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/series', { params })
  },
  show(id) {
    return axios.get(`/series/${id}`)
  },
  store(data) {
    return axios.post('/series', data)
  },
  update(id, data) {
    return axios.put(`/series/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/series/${id}`)
  }
}
