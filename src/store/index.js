import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

import auth from './auth'
import glob from './glob'

import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'

import User from '@/models/User'
import Setting from '@/models/Setting'

const database = new VuexORM.Database()
database.register(User)
database.register(Setting)

const store = createStore({
  modules: { auth, glob },
  plugins: [VuexORM.install(database), createPersistedState({ paths: ['auth', 'glob'] })]
})

VuexORM.use(VuexORMAxios, {
  axios,
  headers: { Authorization: store?.state?.auth?.token },
  baseURL: import.meta.env.VITE_API_URL
})

export default store
