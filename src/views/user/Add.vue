<template>
  <div class="user-add">
    <user-form ref="form" :model="model" />
    <div class="bbar">
      <a-button type="primary" @click="onSubmitClick">提交</a-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import UserForm from './components/Form.vue'
import userApi from '@/api/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const form = ref(null)
const model = reactive({ name: '', letter: '', logo: '' })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return userApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/users')
    })
}
</script>

<style lang="less" scoped>
.user-add {
  padding: 64px 280px;
  .bbar {
    text-align: center;
  }
}
</style>
