<template>
  <div class="header">
    <div class="left">
      <a-tooltip :title="collapsed ? '展开菜单' : '收缩菜单'">
        <span class="trigger" @click="() => store.dispatch('glob/collapse')">
          <menu-unfold-outlined v-if="collapsed" />
          <menu-fold-outlined v-else />
        </span>
      </a-tooltip>
      <a-breadcrumb style="margin-left: 32px">
        <template v-for="(item, index) of routes" :key="index">
          <a-breadcrumb-item>
            <span v-if="item.path === route.path">{{ item?.meta?.title }}</span>
            <a v-else @click="onLinkClick(item)">{{ item?.meta?.title }}</a>
          </a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiIcon from '@/components/ui/Icon.vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()

const collapsed = computed(() => store.state.glob.navCollapsed)
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
  padding: 0 16px;
  .left {
    display: flex;
    align-items: center;
    .trigger {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
