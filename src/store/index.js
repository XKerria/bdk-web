import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

import auth from './auth'

import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'

import User from '@/models/User'

const database = new VuexORM.Database()
database.register(User)

const store = createStore({
  modules: { auth },
  plugins: [VuexORM.install(database), createPersistedState({ paths: ['auth'] })]
})

VuexORM.use(VuexORMAxios, {
  axios,
  headers: { Authorization: store?.state?.auth?.token },
  baseURL: import.meta.env.VITE_BASE_URL
})

export default store
