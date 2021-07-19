<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light"> </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <page-header></page-header>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from './Header.vue'

const collapsed = ref(false)
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100vw;

  &-header {
    padding: 0;
  }

  &-content {
    padding: 16px;
  }
}
</style>
