<template>
  <div class="page-container">
    <div class="page-card">
      <div class="toolbar">
      <h2>体验管理</h2>
      <a-radio-group v-model="filterStatus" type="button" @change="load">
        <a-radio :value="undefined">全部</a-radio>
        <a-radio :value="0">待审核</a-radio>
        <a-radio :value="1">已上架</a-radio>
        <a-radio :value="2">已拒绝</a-radio>
        <a-radio :value="3">已下架</a-radio>
      </a-radio-group>
      <a-button type="primary" @click="showAdd">+ 新增体验</a-button>
    </div>
      <a-table :data="list" :loading="loading" :pagination="false" stripe class="data-table" row-key="id">
      <a-table-column title="ID" data-index="id" :width="70" />
      <a-table-column title="体验名称" data-index="campName" :min-width="120" />
      <a-table-column title="所属营地/俱乐部" data-index="campSiteName" :min-width="120" />
      <a-table-column title="类型" data-index="activityType" :width="100" />
      <a-table-column title="价格" data-index="price" :width="100" />
      <a-table-column title="状态" :width="90">
        <template #default="{ record }">
          <a-tag :color="statusColor(record.status)">{{ statusText(record.status) }}</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="操作" :width="220" :fixed="'right'">
        <template #default="{ record }">
          <template v-if="record.status === 0">
            <a-button size="small" type="text" status="success" @click="audit(record, true)">通过</a-button>
            <a-button size="small" type="text" status="danger" @click="audit(record, false)">拒绝</a-button>
          </template>
          <template v-else-if="record.status === 1">
            <a-button size="small" type="text" @click="setStatus(record, 3)">下架</a-button>
          </template>
          <template v-else-if="record.status === 3">
            <a-button size="small" type="primary" @click="setStatus(record, 1)">上架</a-button>
          </template>
          <a-button size="small" type="text" @click="edit(record)">编辑</a-button>
        </template>
      </a-table-column>
      </a-table>
      <p v-if="!loading && list.length === 0" class="empty-tip">暂无数据</p>

      <a-modal v-model:visible="formVisible" :title="formId ? '编辑体验' : '新增体验'" :width="520" @cancel="formVisible=false" unmount-on-close>
      <a-form :model="form" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
        <a-form-item label="体验名称" required><a-input v-model="form.campName" placeholder="如：森林徒步" /></a-form-item>
        <a-form-item label="归属">
          <a-radio-group v-model="formBelongType" @change="onBelongChange">
            <a-radio value="camp">营地</a-radio>
            <a-radio value="club">俱乐部</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="formBelongType==='camp'" label="所属营地">
          <a-select v-model="form.campId" placeholder="选择营地" style="width:100%" allow-search @change="onCampSelect">
            <a-option v-for="c in camps" :key="c.id" :label="c.campName" :value="c.id" />
          </a-select>
        </a-form-item>
        <a-form-item v-if="formBelongType==='club'" label="所属俱乐部">
          <a-select v-model="form.clubId" placeholder="选择俱乐部" style="width:100%" allow-search @change="onClubSelect">
            <a-option v-for="c in clubs" :key="c.id" :label="c.clubName" :value="c.id" />
          </a-select>
        </a-form-item>
        <a-form-item label="显示名称"><a-input v-model="form.campSiteName" placeholder="可选，用于展示" /></a-form-item>
        <a-form-item label="活动类型"><a-input v-model="form.activityType" placeholder="如：徒步、观星" /></a-form-item>
        <a-form-item label="价格"><a-input v-model="form.price" placeholder="如：¥199/人" /></a-form-item>
        <a-form-item label="价格数值"><a-input-number v-model="form.priceNum" :min="0" /></a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="formVisible=false">取消</a-button>
        <a-button type="primary" @click="save">保存</a-button>
      </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Message from '../utils/message'
import { getExperiences, createExperience, auditExperience, setExperienceStatus, updateExperience } from '../api/experience'
import { getCamps } from '../api/camp'
import { getClubs } from '../api/club'

const list = ref([])
const camps = ref([])
const clubs = ref([])
const loading = ref(false)
const filterStatus = ref(undefined)
const formVisible = ref(false)
const formId = ref(null)
const formBelongType = ref('camp')
const form = reactive({ campName: '', campSiteName: '', activityType: '', price: '', priceNum: 0, campId: null, clubId: null })

function onBelongChange() {
  form.campId = null
  form.clubId = null
  form.campSiteName = ''
}
function onCampSelect(id) {
  const c = camps.value.find(x => x.id === id)
  if (c && !form.campSiteName) form.campSiteName = c.campName
}
function onClubSelect(id) {
  const c = clubs.value.find(x => x.id === id)
  if (c && !form.campSiteName) form.campSiteName = c.clubName
}

function statusText(s) {
  const m = { 0: '待审核', 1: '已上架', 2: '已拒绝', 3: '已下架' }
  return m[s] ?? '-'
}
function statusColor(s) {
  const m = { 0: 'orange', 1: 'green', 2: 'red', 3: 'gray' }
  return m[s] ?? ''
}

async function load() {
  loading.value = true
  try {
    const { data } = await getExperiences({ status: filterStatus.value })
    list.value = data.data || []
  } catch (e) { list.value = [] } finally { loading.value = false }
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

function showAdd() {
  formId.value = null
  formBelongType.value = 'camp'
  Object.assign(form, { campName: '', campSiteName: '', activityType: '', price: '', priceNum: 0, campId: null, clubId: null })
  formVisible.value = true
}

function edit(row) {
  formId.value = row.id
  formBelongType.value = row.campId ? 'camp' : 'club'
  Object.assign(form, {
    campName: row.campName,
    campSiteName: row.campSiteName || '',
    activityType: row.activityType || '',
    price: row.price || '',
    priceNum: row.priceNum || 0,
    campId: row.campId || null,
    clubId: row.clubId || null
  })
  formVisible.value = true
}

async function save() {
  const payload = { ...form }
  if (formBelongType.value === 'camp') payload.clubId = null
  else payload.campId = null
  try {
    if (formId.value) {
      await updateExperience(formId.value, payload)
    } else {
      await createExperience(payload)
    }
    Message.success('保存成功')
    formVisible.value = false
    load()
  } catch (e) { Message.error(e.response?.data?.message || '保存失败') }
}

async function audit(row, pass) {
  try {
    await auditExperience(row.id, pass)
    Message.success(pass ? '已通过' : '已拒绝')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

async function setStatus(row, status) {
  try {
    await setExperienceStatus(row.id, status)
    Message.success(status === 1 ? '已上架' : '已下架')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

onMounted(() => { loadCamps(); loadClubs(); load() })
</script>

<style scoped>
</style>
