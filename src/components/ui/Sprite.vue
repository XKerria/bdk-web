<template>
  <svg
    aria-hidden="true"
    class="icon"
    :style="{ width: `${size}em`, height: `${size}em`, verticalAlign: `${offset}em` }"
  >
    <use :xlink:href="`#icon-${type}`" />
  </svg>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  type: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 1.2
  },
  offset: {
    type: [Number, String],
    default: -0.12
  }
})
</script>

<style lang="scss" scoped>
.icon {
  fill: currentColor;
  overflow: hidden;
}
</style>
