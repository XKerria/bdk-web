<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
    <a-form-item v-bind="validateInfos.name" label="姓名">
      <a-input v-model:value="modelRef.name" placeholder="姓名" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.phone" label="手机号">
      <a-input v-model:value="modelRef.phone" placeholder="手机号" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.firm_id" label="所属公司">
      <a-select v-model:value="modelRef.firm_id" placeholder="所属公司" allow-clear>
        <a-select-option v-for="item of firms" :value="item.id" :key="item.id">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { defineExpose, onMounted, reactive, ref, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
import firmApi from '@/api/firm'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const firms = ref([])
const state = reactive({ firms })

const modelRef = reactive({ ...props.model })

const ruleRef = reactive({
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 64, message: '长度为 1 ~ 64 位' }
  ],
  phone: [
    { required: true, message: '必填' },
    { pattern: /^1[3-9][0-9]{9}$/, message: '手机号格式错误' }
  ],
  firm_id: [{ required: true, message: '必选' }]
})

const { validate, validateInfos } = useForm(modelRef, ruleRef)

onMounted(() => {
  firmApi.index().then((data) => {
    state.firms = data
  })
})

defineExpose({
  validate: () => {
    return new Promise((resolve, reject) => {
      validate()
        .then(() => {
          resolve(toRaw(modelRef))
        })
        .catch((e) => reject(e))
    })
  }
})
</script>

<style lang="less" scoped></style>
