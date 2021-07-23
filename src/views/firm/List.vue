<template>
  <div class="firm-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（名称、电话、地址）"
        @search="onSearch"
      />
      <a-button type="primary" @click="$router.push('/firms/add')">
        <ui-icon name="md-add-r" />
        <span>添加</span>
      </a-button>
    </div>

    <div class="table">
      <antd-table ref="table" :search="search" :columns="columns" :request="request" />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AntdTable from '@/components/antd/Table.vue'
import firmApi from '@/api/firm'
import { message } from 'ant-design-vue'

const router = useRouter()
const table = ref(null)

const columns = [
  {
    title: 'LOGO',
    dataIndex: 'logo',
    width: 72,
    align: 'center',
    customRender: ({ text }) => <AImage height='48px' width='48px' src={text} />
  },
  {
    title: '门头照',
    dataIndex: 'image',
    width: 120,
    align: 'center',
    customRender: ({ text }) => <AImage height='48px' width='85px' src={text} />
  },
  {
    title: '名称',
    dataIndex: 'name',
    sorter: true,
    encoding: 'gbk',
    width: 250,
    ellipsis: true
  },
  {
    title: '详情',
    dataIndex: 'phone',
    ellipsis: true,
    customRender: ({ _, record }) => (
      <ASpace direction='vertical' size='small' style='font-size: 12px'>
        <div>联系电话：{record.phone === '' ? '-' : record.phone}</div>
        <div>联系地址：{record.address === '' ? '-' : record.address}</div>
        <div>
          <span>主营品牌：</span>
          {record.brands.map((i) => (
            <ATag color='processing'>{i}</ATag>
          ))}
        </div>
      </ASpace>
    )
  },
  {
    dataIndex: 'id',
    width: 120,
    align: 'right',
    customRender: ({ record }) => {
      return (
        <a-space size='middle'>
          <a-tooltip title='编辑'>
            <a-button
              type='primary'
              shape='circle'
              size='small'
              onClick={() => router.push(`/firms/${record.id}/edit`)}
            >
              <ui-icon name='md-edit-fr' />
            </a-button>
          </a-tooltip>
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
  return firmApi.index({ like: `name:${search.value}|phone:${search.value}|address:${search.value}`, ...params })
}

const state = reactive({ columns, search, request })

const onDeleteConfirm = (item) => {
  firmApi.destroy(item.id).then(() => {
    table.value.refresh()
    message.success('删除成功')
  })
}

const onSearch = () => {
  table.value.refresh()
}
</script>

<style lang="less" scoped>
.firm-list {
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
