<script setup>
import { computed, ref } from 'vue'

const keyword = ref('')
const selectedStatus = ref('all')

const users = [
  { id: 1, name: '王小明', role: '管理员', email: 'admin@example.com', status: '启用' },
  { id: 2, name: '李晓华', role: '运营', email: 'ops@example.com', status: '启用' },
  { id: 3, name: '陈雨欣', role: '销售', email: 'sales@example.com', status: '停用' },
  { id: 4, name: '赵可欣', role: '产品经理', email: 'pm@example.com', status: '启用' },
  { id: 5, name: '孙浩然', role: '客服', email: 'service@example.com', status: '待审核' },
]

const filteredUsers = computed(() =>
  users.filter((user) => {
    const matchesKeyword =
      !keyword.value ||
      user.name.includes(keyword.value) ||
      user.email.includes(keyword.value) ||
      user.role.includes(keyword.value)

    const matchesStatus =
      selectedStatus.value === 'all' || user.status === selectedStatus.value

    return matchesKeyword && matchesStatus
  }),
)
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div>
        <h3>用户列表</h3>
        <p class="muted-text">一个简单的本地列表筛选示例。</p>
      </div>
    </div>

    <div class="toolbar">
      <input v-model.trim="keyword" type="text" placeholder="搜索姓名、邮箱、角色" />

      <select v-model="selectedStatus">
        <option value="all">全部状态</option>
        <option value="启用">启用</option>
        <option value="停用">停用</option>
        <option value="待审核">待审核</option>
      </select>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>角色</th>
            <th>邮箱</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="status-pill" :class="user.status">{{ user.status }}</span>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="5" class="empty-state">暂无匹配数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
