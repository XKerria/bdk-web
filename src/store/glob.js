import lodash from 'lodash'
import Setting from '@/models/Setting'

const state = () => ({
  settings: []
})

const mutations = {
  set_settings(state, payload) {
    state.settings = payload
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
  }
}

export default { namespaced: true, state, mutations, actions }
