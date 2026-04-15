<script setup>
const stats = [
  {
    label: '今日访问',
    value: '12,846',
    trend: '+12.5%',
  },
  {
    label: '新增用户',
    value: '268',
    trend: '+6.8%',
  },
  {
    label: '订单转化率',
    value: '24.6%',
    trend: '+1.3%',
  },
  {
    label: '待处理工单',
    value: '19',
    trend: '-3',
  },
]

const notices = [
  '欢迎使用 Vue3 管理后台示例项目。',
  '登录态已通过 Pinia + localStorage 做简单持久化。',
  '左侧菜单支持页面切换，图表页面基于 ECharts 实现。',
]
</script>

<template>
  <div class="page-grid">
    <section class="panel hero-panel">
      <div>
        <p class="section-label">系统概览</p>
        <h3>一个简单但完整的 Vue 3 后台项目</h3>
        <p class="muted-text">
          你可以基于这个骨架继续扩展权限管理、接口对接、主题切换和更多业务页面。
        </p>
      </div>

      <div class="hero-badge">Admin Demo</div>
    </section>

    <section class="stats-grid">
      <article v-for="item in stats" :key="item.label" class="panel stat-card">
        <p class="muted-text">{{ item.label }}</p>
        <h3>{{ item.value }}</h3>
        <span class="trend">{{ item.trend }}</span>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h3>公告</h3>
      </div>

      <ul class="notice-list">
        <li v-for="notice in notices" :key="notice">{{ notice }}</li>
      </ul>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h3>快速入口</h3>
      </div>

      <div class="quick-links">
        <RouterLink class="quick-link" to="/users">查看用户列表</RouterLink>
        <RouterLink class="quick-link" to="/charts">查看图表分析</RouterLink>
      </div>
    </section>
  </div>
</template>
