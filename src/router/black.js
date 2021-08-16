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
    },
    {
      path: 'add',
      name: 'black-add',
      meta: {
        title: '添加客户',
        icon: 'md-security-add-fr'
      },
      component: () => import('../views/black/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'black-edit',
      props: true,
      meta: {
        hidden: true,
        title: '客户编辑'
      },
      component: () => import('../views/black/Edit.vue')
    }
  ]
}
