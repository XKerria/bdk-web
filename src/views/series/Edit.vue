<template>
  <div class="series-edit" v-if="model.id">
    <series-form ref="form" :model="state.model" />
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
import { onMounted } from '@vue/runtime-core'
import { message } from 'ant-design-vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const form = ref(null)
const model = ref({ id: '', name: '', letter: '', logo: '' })
const state = reactive({ model })

onMounted(() => {
  seriesApi.show(props.id).then((res) => {
    model.value = res
  })
})

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return seriesApi.update(props.id, values)
    })
    .then(() => {
      message.success('编辑成功')
      router.replace('/series')
    })
}
</script>

<style lang="less" scoped>
.series-edit {
  padding: 64px 280px;
  background-color: #fff;
  .bbar {
    text-align: center;
  }
}
</style>
