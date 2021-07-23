<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
    <a-form-item v-bind="validateInfos.logo" label="LOGO">
      <image-field height="100" width="100" v-model:value="modelRef.logo" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.name" label="名称">
      <a-input v-model:value="modelRef.name" placeholder="名称" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.phone" label="联系电话">
      <a-input v-model:value="modelRef.phone" placeholder="联系电话" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.address" label="联系地址">
      <a-input v-model:value="modelRef.address" placeholder="联系地址" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.brands" label="主营品牌">
      <a-select
        v-model:value="modelRef.brands"
        mode="multiple"
        option-label-prop="value"
        allow-clear
        placeholder="主营品牌"
      >
        <a-select-opt-group v-for="(items, key) in brands" :key="key" :label="key">
          <a-select-option v-for="item of items" :value="item.name" :key="item.id" :title="item.name">
            <img :src="item.logo" :alt="item.name" width="32" height="32" />
            <span style="margin-left: 32px">{{ item.name }}</span>
          </a-select-option>
        </a-select-opt-group>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="validateInfos.image" label="门头照">
      <image-field height="180" width="320" v-model:value="modelRef.image" />
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
  logo: [{ required: true, message: '必填' }],
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 64, message: '长度为 1 ~ 64 位' }
  ],
  phone: [{ min: 0, max: 255, message: '长度为 1 ~ 255 位' }],
  address: [{ min: 0, max: 255, message: '长度为 1 ~ 255 位' }],
  brands: [{ type: 'array' }],
  image: []
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
