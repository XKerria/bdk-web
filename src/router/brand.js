export default {
  path: 'brands',
  name: 'brands',
  component: () => import('../views/brand/index.vue'),
  meta: {
    title: '汽车品牌',
    icon: 'si-ferrari'
  },
  children: [
    {
      path: '',
      name: 'brand-list',
      meta: {
        title: '品牌管理',
        icon: 'si-bugatti'
      },
      component: () => import('../views/brand/List.vue')
    },
    {
      path: 'add',
      name: 'brand-add',
      meta: {
        title: '添加品牌',
        icon: 'si-mercedes'
      },
      component: () => import('../views/brand/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'brand-edit',
      props: true,
      meta: {
        hidden: true,
        title: '品牌编辑'
      },
      component: () => import('../views/brand/Edit.vue')
    }
  ]
}
