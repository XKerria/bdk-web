<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()

store.dispatch('glob/preload')
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
