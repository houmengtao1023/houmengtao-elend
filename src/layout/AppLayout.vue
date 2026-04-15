<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const menuItems = [
  {
    title: '工作台',
    path: '/dashboard',
    icon: '🏠',
  },
  {
    title: '用户列表',
    path: '/users',
    icon: '📋',
  },
  {
    title: '图表分析',
    path: '/charts',
    icon: '📈',
  },
]

const pageTitle = computed(() => route.meta.title || '管理后台')

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-logo">V</div>
        <div>
          <h1>Vue3 Admin</h1>
          <p>简单后台示例</p>
        </div>
      </div>

      <nav class="menu">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="menu-item"
          :class="{ active: route.path === item.path }"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.title }}</span>
        </RouterLink>
      </nav>
    </aside>

    <div class="app-main">
      <header class="topbar">
        <div>
          <p class="topbar-label">当前页面</p>
          <h2>{{ pageTitle }}</h2>
        </div>

        <div class="topbar-actions">
          <div class="user-badge">
            <span class="user-avatar">{{ authStore.username?.slice(0, 1)?.toUpperCase() }}</span>
            <span>{{ authStore.username || 'Admin' }}</span>
          </div>
          <button class="ghost-button" @click="handleLogout">退出登录</button>
        </div>
      </header>

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>
