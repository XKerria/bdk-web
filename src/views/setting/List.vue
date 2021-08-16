<template>
  <div class="settings">
    <div class="item">
      <div class="label">{{ logo.name }}</div>
      <div class="value">
        <image-field v-model:value="logo.value" @update:value="(val) => onValueChange(logo)" width="100" height="100" />
      </div>
    </div>
    <div class="item">
      <div class="label">{{ platform.name }}</div>
      <div class="value">
        <a-typography-text v-model:content="platform.value" :editable="{ onEnd: () => onValueChange(platform) }" />
      </div>
    </div>
    <div class="item">
      <div class="label">{{ bg.name }}</div>
      <div class="value">
        <image-field v-model:value="bg.value" @update:value="(val) => onValueChange(bg)" width="320" height="180" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import settingApi from '@/api/setting'
import { message } from 'ant-design-vue'
import ImageField from '@/components/image/Field.vue'
import numeral from 'numeral'

const store = useStore()

const logo = computed(() => store.getters['glob/setting']('LOGO', true))
const platform = computed(() => store.getters['glob/setting']('平台名称', true))
const bg = computed(() => store.getters['glob/setting']('登录背景', true))

const onValueChange = (item) => {
  settingApi.update(item.name, item).then(() => {
    message.success('修改成功')
    store.dispatch('glob/loadSettings')
  })
}
</script>

<style lang="less" scoped>
.settings {
  padding: 16px;
  background-color: #fff;

  .item {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid hsv(0, 0, 94%);
    padding: 16px 0;

    .label {
      width: 200px;
    }

    .value {
      flex: 1;
    }
  }
}
</style>
