<template>
  <div class="page-container">
    <div class="page-card">
      <div class="toolbar">
        <h2>用户管理</h2>
        <p class="hint">从订单中收集的小程序用户信息（按预订人+电话去重）</p>
      </div>
      <a-table :data="list" :loading="loading" :pagination="false" stripe class="data-table">
      <a-table-column title="预订人" data-index="bookerName" :width="120" />
      <a-table-column title="联系电话" data-index="contactPhone" :width="130" />
      <a-table-column title="OpenID" data-index="openId" :min-width="140" :ellipsis="true" :tooltip="true" />
      <a-table-column title="订单数" data-index="orderCount" :width="90" />
      </a-table>
      <p v-if="!loading && list.length === 0" class="empty-tip">暂无用户数据（有订单后会自动收集）</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUsers } from '../api/user'

const list = ref([])
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    const { data } = await getUsers()
    list.value = data.data || []
  } catch { list.value = [] } finally { loading.value = false }
}

onMounted(load)
</script>

<style scoped>
.hint { font-size: 13px; color: #64748b; margin: 0; }
</style>
