<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
    <a-form-item v-bind="validateInfos.logo" label="LOGO">
      <image-field height="100" width="100" v-model:value="modelRef.logo" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.name" label="品牌名称">
      <a-input v-model:value="modelRef.name" placeholder="品牌名称" @input="onNameChange" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.letter" label="首字母">
      <a-input v-model:value="modelRef.letter" placeholder="首字母" disabled />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { defineExpose, reactive, toRaw } from 'vue'
import ImageField from '@/components/image/Field.vue'
import cnchar from 'cnchar'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const modelRef = reactive({ ...props.model })

const ruleRef = reactive({
  logo: [{ required: true, message: '必填' }],
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 64, message: '长度为 1 ~ 64 位' }
  ],
  letter: [
    { required: true, message: '必填' },
    { length: 1, message: '长度为 1 位' }
  ]
})

const { validate, validateInfos } = useForm(modelRef, ruleRef)

const onNameChange = () => {
  modelRef.letter = cnchar.spell(modelRef.name.trim())?.[0]?.toUpperCase() ?? ''
}

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
