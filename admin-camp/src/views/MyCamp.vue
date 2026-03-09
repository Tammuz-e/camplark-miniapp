<template>
  <div class="page-container">
    <div class="page-card my-camp-page">
    <a-spin :loading="loading" class="content">
      <template v-if="camp">
        <h2>{{ isClub ? '我的俱乐部' : '我的营地' }}</h2>
        <a-descriptions :column="1" bordered>
          <a-descriptions-item label="名称">{{ camp.campName || camp.clubName }}</a-descriptions-item>
          <a-descriptions-item v-if="!isClub" label="地址">{{ camp.location || '-' }}</a-descriptions-item>
          <a-descriptions-item v-if="!isClub" label="地形">{{ camp.terrainType || '-' }}</a-descriptions-item>
          <a-descriptions-item label="价格">{{ camp.price || '-' }}</a-descriptions-item>
          <a-descriptions-item v-if="isClub" label="成员数">{{ camp.members ?? '-' }}</a-descriptions-item>
          <a-descriptions-item label="状态">
            <a-tag :color="statusColor(camp.status)">{{ statusText(camp.status) }}</a-tag>
          </a-descriptions-item>
          <a-descriptions-item v-if="camp.applyTime" label="申请时间">{{ formatTime(camp.applyTime) }}</a-descriptions-item>
          <a-descriptions-item v-if="camp.auditTime" label="审核时间">{{ formatTime(camp.auditTime) }}</a-descriptions-item>
        </a-descriptions>
      </template>
      <p v-else-if="!loading" class="empty">无法获取{{ isClub ? '俱乐部' : '营地' }}信息</p>
    </a-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getMyCamp } from '../api/campList'
import { getMyClub } from '../api/club'

const camp = ref(null)
const loading = ref(false)
const info = JSON.parse(localStorage.getItem('admin_info') || '{}')
const isClub = computed(() => info.type === 'club')

function statusText(s) {
  const m = { 0: '待审核', 1: '已通过/上架', 2: '已拒绝', 3: '已下架' }
  return m[s] ?? '-'
}
function statusColor(s) {
  const m = { 0: 'orange', 1: 'green', 2: 'red', 3: 'gray' }
  return m[s] ?? ''
}
function formatTime(t) {
  if (!t) return '-'
  try {
    const d = new Date(t)
    return d.toLocaleString('zh-CN')
  } catch { return t }
}

async function load() {
  loading.value = true
  try {
    if (isClub.value) {
      const { data } = await getMyClub()
      camp.value = data.data
    } else {
      const { data } = await getMyCamp()
      camp.value = data.data
    }
  } catch { camp.value = null } finally { loading.value = false }
}

onMounted(load)
</script>

<style scoped>
.my-camp-page { max-width: 600px; }
.my-camp-page h2 { margin: 0 0 20px; }
.empty { color: #94a3b8; }
</style>
