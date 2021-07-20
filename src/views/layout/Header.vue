<template>
  <div class="header">
    <a-breadcrumb>
      <template v-for="(item, index) of routes" :key="index">
        <a-breadcrumb-item>
          <span v-if="item.path === route.path">{{ item?.meta?.title }}</span>
          <a v-else @click="onLinkClick(item)">{{ item?.meta?.title }}</a>
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>
    <div></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const routes = ref([])

const state = reactive({ routes })

const getRoutes = () => {
  let arr = [...route.matched]
  const last = arr[arr.length - 2]
  if (route.path === last?.path) {
    arr.pop()
    return arr
  }
  return arr
}

onMounted(() => {
  state.routes = getRoutes()
})

watch(
  () => route.path,
  () => {
    state.routes = getRoutes()
  }
)

const onLinkClick = (item) => {
  router.replace(item.path)
}
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
}
</style>
