import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

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
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'md-user-list-fr'
        },
        children: [
          {
            path: '',
            name: 'user-list',
            meta: {
              title: '用户管理',
              icon: 'md-users-fr'
            },
            component: () => import('../views/user/List.vue')
          },
          {
            path: 'add',
            name: 'user-add',
            meta: {
              title: '添加用户',
              icon: 'md-user-add-fr'
            },
            component: () => import('../views/user/Add.vue')
          }
        ]
      },
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
