<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light" class="layout-sider" width="250">
      <div class="brand">
        <brand :collapsed="collapsed" />
      </div>
      <div class="nav">
        <page-nav />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <page-header />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <div class="wrapper">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { computed, onMounted, provide, ref } from 'vue'
import PageHeader from './Header.vue'
import PageNav from './Nav.vue'
import Brand from './Brand.vue'

const collapsed = ref(false)
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100vw;

  &-sider {
    display: flex;
    flex-direction: column;
    .nav {
      flex: 1;
    }
  }

  &-header {
    padding: 0;
  }

  &-content {
    padding: 16px;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    .wrapper {
      background-color: #fff;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
