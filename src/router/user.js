export default {
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
}
