import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/blacks', { params })
  },
  show(id) {
    return axios.get(`/blacks/${id}`)
  },
  store(data) {
    return axios.post('/blacks', data)
  },
  update(id, data) {
    return axios.put(`/blacks/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/blacks/${id}`)
  }
}
