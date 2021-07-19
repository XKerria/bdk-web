<template>
  <a-menu class="menu">
    <a-menu-item v-for="(item, index) of items" :key="index">
      <ui-icon :type="item.icon" />
      <span>{{ item.name }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { inject } from 'vue'
import UiIcon from '@/components/ui/Icon.vue'

const items = [
  {
    path: '/users',
    name: '用户管理',
    icon: 'md-users-fr'
  }
]
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  overflow-y: auto;
}
</style>
