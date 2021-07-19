import lodash from 'lodash'
import User from '@/models/User'
import authApi from '@/api/auth'

const state = () => ({
  user: null,
  token: null,
  show: false
})

const mutations = {
  set_user(state, payload) {
    state.user = payload
  },
  set_token(state, payload) {
    state.token = payload
  },
  set_show(state, payload) {
    state.show = payload
  }
}

const actions = {
  login({ commit }, obj) {
    return new Promise((resolve, reject) => {
      authApi
        .login(obj)
        .then(({ token, user }) => {
          commit('set_token', token)
          return User.create({ data: user })
        })
        .then((entities) => {
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
  show({ commit }, bool) {
    commit('set_show', bool)
  }
}

export default { namespaced: true, state, mutations, actions }
