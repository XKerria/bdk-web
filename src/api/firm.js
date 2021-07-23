import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/firms', { params })
  },
  show(id) {
    return axios.get(`/firms/${id}`)
  },
  store(data) {
    return axios.post('/firms', data)
  },
  update(id, data) {
    return axios.put(`/firms/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/firms/${id}`)
  }
}
