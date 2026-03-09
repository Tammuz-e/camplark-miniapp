<template>
  <div class="page-container">
    <div class="page-card">
      <div class="toolbar">
      <h2>管理员账号</h2>
      <a-button type="primary" @click="showAdd">+ 新建账号</a-button>
    </div>
      <a-table :data="list" :loading="loading" :pagination="false" stripe class="data-table" row-key="id">
      <a-table-column title="ID" data-index="id" :width="70" />
      <a-table-column title="用户名" data-index="username" :width="120" />
      <a-table-column title="类型" :width="100">
        <template #default="{ record }">{{ record.type === 'platform' ? '平台' : record.type === 'camp' ? '营地' : '俱乐部' }}</template>
      </a-table-column>
      <a-table-column title="关联" :min-width="140">
        <template #default="{ record }">
          <span v-if="record.campId">{{ campName(record.campId) }}</span>
          <span v-else-if="record.clubId">{{ clubName(record.clubId) }}</span>
          <span v-else class="muted">-</span>
        </template>
      </a-table-column>
      </a-table>
      <p v-if="!loading && list.length === 0" class="empty-tip">暂无数据</p>

      <a-modal v-model:visible="formVisible" title="新建营地/俱乐部管理员" :width="420" @cancel="formVisible=false" unmount-on-close>
      <a-form :model="form" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
        <a-form-item label="用户名" required><a-input v-model="form.username" placeholder="登录用户名" /></a-form-item>
        <a-form-item label="密码" required><a-input-password v-model="form.password" placeholder="登录密码" allow-clear /></a-form-item>
        <a-form-item label="类型">
          <a-radio-group v-model="form.type">
            <a-radio value="camp">营地</a-radio>
            <a-radio value="club">俱乐部</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="form.type==='camp'" label="关联营地" required>
          <a-select v-model="form.campId" placeholder="选择营地" style="width:100%" allow-search>
            <a-option v-for="c in camps" :key="c.id" :label="`${c.campName} (ID:${c.id})`" :value="c.id" />
          </a-select>
        </a-form-item>
        <a-form-item v-if="form.type==='club'" label="关联俱乐部" required>
          <a-select v-model="form.clubId" placeholder="选择俱乐部" style="width:100%" allow-search>
            <a-option v-for="c in clubs" :key="c.id" :label="`${c.clubName} (ID:${c.id})`" :value="c.id" />
          </a-select>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="formVisible=false">取消</a-button>
        <a-button type="primary" @click="save">创建</a-button>
      </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Message from '../utils/message'
import { getAccounts, createAccount } from '../api/account'
import { getCamps } from '../api/camp'
import { getClubs } from '../api/club'

const list = ref([])
const camps = ref([])
const clubs = ref([])
const loading = ref(false)
const formVisible = ref(false)
const form = reactive({ username: '', password: '', type: 'camp', campId: null, clubId: null })

function campName(id) {
  return camps.value.find(c => c.id === id)?.campName || `营地#${id}`
}
function clubName(id) {
  return clubs.value.find(c => c.id === id)?.clubName || `俱乐部#${id}`
}

async function loadCamps() {
  try {
    const { data } = await getCamps({ status: 1 })
    camps.value = data.data || []
  } catch { camps.value = [] }
}
async function loadClubs() {
  try {
    const { data } = await getClubs({ status: 1 })
    clubs.value = data.data || []
  } catch { clubs.value = [] }
}

async function load() {
  loading.value = true
  try {
    const { data } = await getAccounts()
    list.value = data.data || []
  } catch { list.value = [] } finally { loading.value = false }
}

function showAdd() {
  form.username = ''
  form.password = ''
  form.type = 'camp'
  form.campId = null
  form.clubId = null
  formVisible.value = true
}

async function save() {
  if (!form.username || !form.password) {
    Message.warning('请填写用户名和密码')
    return
  }
  if (form.type === 'camp' && !form.campId) {
    Message.warning('请填写营地ID')
    return
  }
  if (form.type === 'club' && !form.clubId) {
    Message.warning('请填写俱乐部ID')
    return
  }
  try {
    await createAccount({
      username: form.username,
      password: form.password,
      type: form.type,
      campId: form.type === 'camp' ? form.campId : null,
      clubId: form.type === 'club' ? form.clubId : null
    })
    Message.success('创建成功')
    formVisible.value = false
    load()
  } catch (e) { Message.error(e.response?.data?.message || '创建失败') }
}

onMounted(() => { loadCamps(); loadClubs(); load() })
</script>

<style scoped>
.muted { color: #94a3b8; }
</style>
