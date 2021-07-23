export default {
  path: 'firms',
  name: 'firms',
  component: () => import('../views/firm/index.vue'),
  meta: {
    title: '加盟公司',
    icon: 'md-store-fr'
  },
  children: [
    {
      path: '',
      name: 'firm-list',
      meta: {
        title: '公司管理',
        icon: 'md-store-fr'
      },
      component: () => import('../views/firm/List.vue')
    },
    {
      path: 'add',
      name: 'firm-add',
      meta: {
        title: '添加公司',
        icon: 'md-store-add-fr'
      },
      component: () => import('../views/firm/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'firm-edit',
      props: true,
      meta: {
        hidden: true,
        title: '公司编辑'
      },
      component: () => import('../views/firm/Edit.vue')
    }
  ]
}
