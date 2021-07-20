<template>
  <a-menu class="menu">
    <a-menu-item v-for="(item, index) of items" :key="index" @click="onClick(item)">
      <ui-icon :type="item.icon" />
      <span>{{ item.name }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { inject } from 'vue'
import UiIcon from '@/components/ui/Icon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = [
  {
    path: '/',
    name: '首页',
    icon: 'md-dashboard-fr'
  },
  {
    path: '/users',
    name: '用户管理',
    icon: 'md-users-fr'
  },
  {
    path: '/settings',
    name: '系统设置',
    icon: 'md-setting-fr'
  }
]

const onClick = (item) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  overflow-y: auto;
}
</style>
