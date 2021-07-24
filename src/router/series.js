export default {
  path: 'series',
  name: 'series',
  component: () => import('../views/series/index.vue'),
  meta: {
    title: '车辆系列',
    icon: 'si-rolls-royce'
  },
  children: [
    {
      path: '',
      name: 'series-list',
      meta: {
        title: '车辆系列',
        icon: 'si-maserati'
      },
      component: () => import('../views/series/List.vue')
    },
    {
      path: 'add',
      name: 'series-add',
      meta: {
        title: '添加系列',
        icon: 'si-volvo'
      },
      component: () => import('../views/series/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'series-edit',
      props: true,
      meta: {
        hidden: true,
        title: '系列编辑'
      },
      component: () => import('../views/series/Edit.vue')
    }
  ]
}
