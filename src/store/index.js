import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './auth'
import glob from './glob'

const store = createStore({
  modules: { auth, glob },
  plugins: [createPersistedState({ paths: ['auth', 'glob'] })]
})

export default store
