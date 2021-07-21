<template>
  <div>
    <a-button type="primary" @click="$router.push('/users/add')">添加用户</a-button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({})
</script>
