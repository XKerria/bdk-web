import User from '@/models/User'
import dayjs from 'dayjs'
import authApi from '@/api/auth'

const state = () => ({
  user: null,
  token: null
})

const getters = {
  accessToken(state) {
    return state?.token?.access_token
  }
}

const mutations = {
  set_user(state, payload) {
    state.user = payload
  },
  set_token(state, payload) {
    state.token = payload
  }
}

const actions = {
  login({ commit }, obj) {
    return new Promise((resolve, reject) => {
      authApi
        .login(obj)
        .then(({ data }) => {
          commit('set_token', data)
          resolve(data)
        })
        .catch((e) => reject(e))
    })
  },
  init({ commit }) {
    return new Promise((resolve, reject) => {
      User.current()
        .then(({ entities }) => {
          const user = entities?.users?.[0]
          commit('set_user', user)
          resolve(user)
        })
        .catch((e) => reject(e))
    })
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('set_token', null)
      commit('set_user', null)
      resolve()
    })
  },
  keep({ commit, state }) {
    if (!state?.token?.expired_at) return
    const diff = -dayjs().diff(state.token.expired_at, 'millisecond')
    setTimeout(() => {
      authApi.refreshToken().then(({ data }) => {
        commit('set_token', data)
      })
    }, diff - 5000)
  }
}

export default { namespaced: true, state, getters, mutations, actions }
