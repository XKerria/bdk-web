<template>
  <div class="firm-add">
    <firm-form ref="form" :model="model" />
    <div class="bbar">
      <a-button type="primary" @click="onSubmitClick">提交</a-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import FirmForm from './components/Form.vue'
import firmApi from '@/api/firm'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const form = ref(null)
const model = reactive({ name: '', phone: '', address: '', logo: '', image: '', brands: [] })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return firmApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/firms')
    })
}
</script>

<style lang="less" scoped>
.firm-add {
  padding: 64px 280px;
  background-color: #fff;
  .bbar {
    text-align: center;
  }
}
</style>
