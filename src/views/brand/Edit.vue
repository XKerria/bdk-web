<template>
  <div class="brand-edit" v-if="model.id">
    <brand-form ref="form" :model="state.model" />
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
  brandApi.show(props.id).then((res) => {
    model.value = res
  })
})

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return brandApi.update(props.id, values)
    })
    .then(() => {
      message.success('编辑成功')
      router.replace('/brands')
    })
}
</script>

<style lang="less" scoped>
.brand-edit {
  padding: 64px 280px;
  .bbar {
    text-align: center;
  }
}
</style>
