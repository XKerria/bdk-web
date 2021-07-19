import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/dashboard/Dashboard.vue')
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
