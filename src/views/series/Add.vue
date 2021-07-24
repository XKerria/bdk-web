<template>
  <div class="series-add">
    <series-form ref="form" :model="model" />
    <div class="bbar">
      <a-button type="primary" @click="onSubmitClick">提交</a-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import SeriesForm from './components/Form.vue'
import seriesApi from '@/api/series'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const form = ref(null)
const model = reactive({ brand_id: '', image: '', name: '', price: '' })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return seriesApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/series')
    })
}
</script>

<style lang="less" scoped>
.series-add {
  padding: 64px 280px;
  background-color: #fff;
  .bbar {
    text-align: center;
  }
}
</style>
