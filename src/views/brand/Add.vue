<template>
  <div class="brand-add">
    <brand-form ref="form" :model="model" />
    <div class="bbar">
      <a-button type="primary" @click="onSubmitClick">提交</a-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import BrandForm from './components/Form.vue'
import brandApi from '@/api/brand'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref(null)
const model = reactive({ name: '', letter: '', logo: '' })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return brandApi.store(values)
    })
    .then((res) => {
      router.replace('/brands')
    })
}
</script>

<style lang="less" scoped>
.brand-add {
  padding: 64px 280px;
  .bbar {
    text-align: center;
  }
}
</style>
