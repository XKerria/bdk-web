export default {
  path: 'blacks',
  name: 'blacks',
  component: () => import('../views/black/index.vue'),
  meta: {
    title: '黑名单',
    icon: 'md-security-user-fr'
  },
  children: [
    {
      path: '',
      name: 'black-list',
      meta: {
        title: '名单管理',
        icon: 'md-security-search-fr'
      },
      component: () => import('../views/black/List.vue')
    }
  ]
}
