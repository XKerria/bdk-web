<template>
  <div class="user-list">
    <div class="tbar">
      <a-button type="primary" @click="$router.push('/users/add')">添加用户</a-button>
    </div>

    <a-table :data-source="users" :columns="columns" rowKey="id" :pagination="pagination" @change="onTableChange" />
  </div>
</template>

<script setup lang="jsx">
import { onMounted, reactive, ref } from 'vue'
import userApi from '@/api/user'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    align: 'center',
    sorter: true
  },
  { title: '手机号', dataIndex: 'phone', width: 150, sorter: true },
  { title: '公司', dataIndex: 'firm.name' }
]

const pagination = {
  showTotal: (total, range) => <span>{`当前 ${range[0]} ~ ${range[1]} 总计 ${total}`}</span>
}
const users = ref([])
const state = reactive({ users, pagination, columns })

const load = (params) => {
  userApi.index({ with: 'firm', ...params }).then((users) => {
    state.users = users
  })
}

onMounted(() => {
  load()
})

const onTableChange = (_, __, sorter) => {
  const gbk = ['name']
  console.log(sorter)
  load({ sort: `${sorter.field}:${sorter?.order ?? 'asc'}${gbk.includes(sorter.field) ? ',gbk' : ''}` })
}
</script>

<style lang="less" scoped>
.user-list {
  padding: 16px;

  .tbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
}
</style>
