<template>
  <div class="page-container">
    <div class="page-card">
      <div class="toolbar">
      <h2>营位管理</h2>
      <a-radio-group v-model="filterStatus" type="button" @change="load">
        <a-radio :value="undefined">全部</a-radio>
        <a-radio :value="0">待审核</a-radio>
        <a-radio :value="1">已上架</a-radio>
        <a-radio :value="2">已拒绝</a-radio>
        <a-radio :value="3">已下架</a-radio>
      </a-radio-group>
      <a-select v-model="filterCampId" placeholder="按营地筛选" allow-clear style="width:180px" @change="load">
        <a-option v-for="c in camps" :key="c.id" :label="c.campName" :value="c.id" />
      </a-select>
      <a-button type="primary" @click="showAdd">+ 新增营位</a-button>
    </div>
      <a-table :data="list" :loading="loading" :pagination="false" stripe class="data-table" row-key="id">
      <a-table-column title="ID" data-index="id" :width="70" />
      <a-table-column title="营位名称" data-index="spotName" :min-width="120" />
      <a-table-column title="所属营地" :min-width="120">
        <template #default="{ record }">{{ record.camp?.campName || record.campName || '-' }}</template>
      </a-table-column>
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

      <a-modal v-model:visible="formVisible" :title="formId ? '编辑营位' : '新增营位'" :width="500" @cancel="formVisible=false" unmount-on-close>
      <a-form :model="form" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
        <a-form-item label="所属营地">
          <a-select v-model="form.campId" placeholder="选择营地" style="width:100%">
            <a-option v-for="c in camps" :key="c.id" :label="c.campName" :value="c.id" />
          </a-select>
        </a-form-item>
        <a-form-item label="营位名称"><a-input v-model="form.spotName" /></a-form-item>
        <a-form-item label="价格"><a-input v-model="form.price" /></a-form-item>
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
import { getCamps } from '../api/camp'
import { getSpots, createSpot, auditSpot, setSpotStatus, updateSpot } from '../api/spot'

const list = ref([])
const camps = ref([])
const loading = ref(false)
const filterStatus = ref(undefined)
const filterCampId = ref(null)
const formVisible = ref(false)
const formId = ref(null)
const form = reactive({ campId: null, spotName: '', price: '', priceNum: 0 })

function statusText(s) {
  const m = { 0: '待审核', 1: '已上架', 2: '已拒绝', 3: '已下架' }
  return m[s] ?? '-'
}
function statusColor(s) {
  const m = { 0: 'orange', 1: 'green', 2: 'red', 3: 'gray' }
  return m[s] ?? ''
}

async function loadCamps() {
  const { data } = await getCamps({ status: 1 })
  camps.value = data.data || []
}

async function load() {
  loading.value = true
  try {
    const params = { status: filterStatus.value, campId: filterCampId.value }
    const { data } = await getSpots(params)
    list.value = data.data || []
  } catch (e) { list.value = [] } finally { loading.value = false }
}

function showAdd() {
  formId.value = null
  form.campId = camps.value[0]?.id || null
  form.spotName = ''
  form.price = ''
  form.priceNum = 0
  formVisible.value = true
}

function edit(row) {
  formId.value = row.id
  form.campId = row.campId
  form.spotName = row.spotName
  form.price = row.price || ''
  form.priceNum = row.priceNum || 0
  formVisible.value = true
}

async function save() {
  try {
    if (formId.value) {
      await updateSpot(formId.value, form)
    } else {
      await createSpot(form)
    }
    Message.success('保存成功')
    formVisible.value = false
    load()
  } catch (e) { Message.error(e.response?.data?.message || '保存失败') }
}

async function audit(row, pass) {
  try {
    await auditSpot(row.id, pass)
    Message.success(pass ? '已通过' : '已拒绝')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

async function setStatus(row, status) {
  try {
    await setSpotStatus(row.id, status)
    Message.success(status === 1 ? '已上架' : '已下架')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

onMounted(() => { loadCamps(); load() })
</script>
