import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    component: () => import('../views/layout/Layout.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/dashboard/Dashboard.vue')
      },
      {
        path: 'users',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/user/index.vue'),
        children: [
          {
            path: '',
            name: 'user-list',
            component: () => import('../views/user/List.vue')
          },
          {
            path: 'add',
            name: 'user-add',
            meta: {
              title: '添加用户'
            },
            component: () => import('../views/user/Add.vue')
          }
        ]
      },
      {
        path: 'settings',
        name: 'settings',
        meta: {
          title: '系统设置'
        },
        component: () => import('../views/setting/List.vue')
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
