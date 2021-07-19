<template>
  <a-icon :component="icon" />
</template>

<script setup lang="jsx">
import { defineComponent, defineProps, provide } from 'vue'
import AIcon from '@ant-design/icons-vue'
import Sprite from './Sprite.vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const icon = defineComponent(() => {
  return () => <Sprite type={props.type} />
})
</script>

<style lang="less" scoped></style>
