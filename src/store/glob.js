import lodash from 'lodash'
import Setting from '@/models/Setting'

const state = () => ({
  settings: [],
  navCollapsed: false
})

const mutations = {
  set_settings(state, payload) {
    state.settings = payload
  },
  set_nav_collapsed(state, payload) {
    state.navCollapsed = payload
  }
}

const actions = {
  init({ commit }) {
    return new Promise((resolve, reject) => {
      Setting.fetch()
        .then(({ entities }) => {
          const { settings } = entities
          commit('set_settings', settings)
          resolve(settings)
        })
        .catch((e) => reject(e))
    })
  },
  collapse({ commit, state }) {
    commit('set_nav_collapsed', !state.navCollapsed)
  }
}

export default { namespaced: true, state, mutations, actions }
