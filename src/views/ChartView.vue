<script setup>
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const chartRef = ref(null)
let chartInstance

function renderChart() {
  if (!chartRef.value) {
    return
  }

  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['访问量', '成交量'],
      top: 0,
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 20,
      top: 50,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,
        data: [320, 432, 501, 634, 790, 930, 1020],
        areaStyle: {
          opacity: 0.12,
        },
      },
      {
        name: '成交量',
        type: 'line',
        smooth: true,
        data: [120, 182, 191, 234, 290, 330, 410],
      },
    ],
  })
}

function handleResize() {
  chartInstance?.resize()
}

onMounted(() => {
  renderChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<template>
  <div class="chart-layout">
    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>访问趋势</h3>
          <p class="muted-text">使用 ECharts 绘制的周数据趋势图。</p>
        </div>
      </div>

      <div ref="chartRef" class="chart-box"></div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h3>图表说明</h3>
      </div>

      <ul class="notice-list">
        <li>图表初始化写在页面组件中，适合快速搭建 Demo。</li>
        <li>如需复用，可以进一步封装为通用 ECharts 组件。</li>
        <li>当前数据为静态 mock，后续可接入真实接口。</li>
      </ul>
    </section>
  </div>
</template>
