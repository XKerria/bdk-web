<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
    <a-form-item v-bind="validateInfos.brand_id" label="品牌">
      <a-select v-model:value="modelRef.brand_id" option-label-prop="label" allow-clear placeholder="品牌">
        <a-select-opt-group v-for="(items, key) in brands" :key="key" :label="key">
          <a-select-option v-for="item of items" :value="item.id" :key="item.id" :label="item.name">
            <img :src="item.logo" :alt="item.name" width="32" height="32" />
            <span style="margin-left: 32px">{{ item.name }}</span>
          </a-select-option>
        </a-select-opt-group>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="validateInfos.image" label="图片">
      <image-field height="180" width="320" v-model:value="modelRef.image" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.name" label="名称">
      <a-input v-model:value="modelRef.name" placeholder="名称" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.price" label="估价">
      <a-input v-model:value="modelRef.price" placeholder="估价" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { defineExpose, onMounted, reactive, ref, toRaw } from 'vue'
import ImageField from '@/components/image/Field.vue'
import { Form } from 'ant-design-vue'
import brandApi from '@/api/brand'
import _ from 'lodash'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const brands = ref([])
const state = reactive({ brands })

const modelRef = reactive({ ...props.model })

const ruleRef = reactive({
  brand_id: [{ required: true, message: '必选' }],
  image: [{ required: true, message: '必填' }],
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 255, message: '长度为 1 ~ 255 位' }
  ],
  price: [{ min: 0, max: 255, message: '长度为 1 ~ 255 位' }]
})

const { validate, validateInfos } = useForm(modelRef, ruleRef)

onMounted(() => {
  brandApi.index().then((data) => {
    state.brands = _.groupBy(data, 'letter')
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

<style lang="less" scoped>
.brand {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
