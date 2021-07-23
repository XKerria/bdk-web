import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import firm from './firm'
import brand from './brand'
import series from './series'
import user from './user'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/layout/Layout.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: 'md-dashboard-fr'
        },
        component: () => import('../views/dashboard/Dashboard.vue')
      },
      firm,
      brand,
      series,
      user,
      {
        path: 'settings',
        name: 'settings',
        meta: {
          title: '系统设置',
          icon: 'md-setting-fr'
        },
        component: () => import('../views/setting/List.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      public: true
    },
    component: () => import('../views/auth/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.getters['auth/accessToken']
  if (!to.meta.public && !token) next({ name: 'login' })
  else next()
})

export default router
