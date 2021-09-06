<template>
  <div class="black-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（姓名、电话、描述）"
        @search="onSearch"
      />
      <span></span>
    </div>

    <div class="table">
      <antd-table ref="table" :search="search" :columns="columns" :request="request" />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AntdTable from '@/components/antd/Table.vue'
import blackApi from '@/api/black'
import { message } from 'ant-design-vue'

const store = useStore()
const router = useRouter()
const table = ref(null)

const black = computed(() => store?.state?.auth?.black)

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: true,
    encoding: 'gbk',
    width: 100
  },
  { title: '手机号', dataIndex: 'phone', width: 150, sorter: true },
  { title: '描述', dataIndex: 'description' },
  {
    dataIndex: 'id',
    width: 120,
    align: 'right',
    customRender: ({ record }) => {
      return (
        <a-space size='middle'>
          <a-popconfirm title='该操作将无法恢复，确认要删除？' onConfirm={() => onDeleteConfirm(record)}>
            <a-tooltip title='删除'>
              <a-button type='primary' danger shape='circle' size='small'>
                <ui-icon name='md-delete-fr' />
              </a-button>
            </a-tooltip>
          </a-popconfirm>
        </a-space>
      )
    }
  }
]

const search = ref('')

const request = (params) => {
  return blackApi.index({
    like: `name:${search.value}|phone:${search.value}|description:${search.value}`,
    ...params
  })
}

const state = reactive({ columns, search, request })

const onDeleteConfirm = (item) => {
  blackApi.destroy(item.id).then(({ data }) => {
    if (data === 1) {
      table.value.refresh()
      message.success('删除成功')
    } else {
      message.success('删除失败')
    }
  })
}

const onSearch = () => {
  table.value.refresh()
}
</script>

<style lang="less" scoped>
.black-list {
  height: 100%;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;

  .tbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .table {
    flex: 1;
    overflow: hidden;
  }
}
</style>
