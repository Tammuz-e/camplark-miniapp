<template>
  <div class="page-container">
    <div class="page-card">
      <div class="toolbar">
        <h2>营地管理</h2>
        <a-radio-group v-model="filterStatus" type="button" @change="load">
          <a-radio :value="undefined">全部</a-radio>
          <a-radio :value="0">待审核</a-radio>
          <a-radio :value="1">已通过</a-radio>
          <a-radio :value="2">已拒绝</a-radio>
          <a-radio :value="3">已下架</a-radio>
        </a-radio-group>
        <a-button type="primary" @click="showApply">+ 测试申请</a-button>
      </div>
      <a-table :data="list" :loading="loading" :pagination="false" stripe class="data-table" row-key="id">
        <a-table-column title="ID" data-index="id" :width="70" />
        <a-table-column title="营地名称" data-index="campName" :min-width="140" />
        <a-table-column title="地址" data-index="location" :min-width="180" :ellipsis="true" :tooltip="true" />
        <a-table-column title="地形" data-index="terrainType" :width="80" />
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

      <a-modal v-model:visible="applyVisible" title="营地入驻申请" :width="500" @cancel="applyVisible=false" unmount-on-close>
        <a-form :model="applyForm" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
          <a-form-item label="营地名称"><a-input v-model="applyForm.campName" /></a-form-item>
          <a-form-item label="地址"><a-input v-model="applyForm.location" /></a-form-item>
          <a-form-item label="地形"><a-input v-model="applyForm.terrainType" placeholder="如：森林、草原" /></a-form-item>
          <a-form-item label="价格"><a-input v-model="applyForm.price" placeholder="如：¥780起/天" /></a-form-item>
          <a-form-item label="价格数值"><a-input-number v-model="applyForm.priceNum" :min="0" /></a-form-item>
        </a-form>
        <template #footer>
          <a-button @click="applyVisible=false">取消</a-button>
          <a-button type="primary" @click="submitApply">提交</a-button>
        </template>
      </a-modal>

      <a-modal v-model:visible="editVisible" title="编辑营地" :width="500" @cancel="editVisible=false" unmount-on-close>
        <a-form :model="editForm" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
          <a-form-item label="营地名称"><a-input v-model="editForm.campName" /></a-form-item>
          <a-form-item label="地址"><a-input v-model="editForm.location" /></a-form-item>
          <a-form-item label="地形"><a-input v-model="editForm.terrainType" /></a-form-item>
          <a-form-item label="价格"><a-input v-model="editForm.price" /></a-form-item>
          <a-form-item label="价格数值"><a-input-number v-model="editForm.priceNum" :min="0" /></a-form-item>
        </a-form>
        <template #footer>
          <a-button @click="editVisible=false">取消</a-button>
          <a-button type="primary" @click="saveEdit">保存</a-button>
        </template>
      </a-modal>

      <a-modal v-model:visible="rejectVisible" title="拒绝原因" :width="400" @cancel="rejectVisible=false" unmount-on-close>
        <a-textarea v-model="rejectReason" :rows="3" placeholder="选填" />
        <template #footer>
          <a-button @click="rejectVisible=false">取消</a-button>
          <a-button type="primary" status="danger" @click="doReject">确认拒绝</a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Message from '../utils/message'
import { getCamps, applyCamp, auditCamp, setCampStatus, updateCamp } from '../api/camp'

const list = ref([])
const loading = ref(false)
const filterStatus = ref(undefined)
const applyVisible = ref(false)
const editVisible = ref(false)
const rejectVisible = ref(false)
const rejectReason = ref('')
const rejectRow = ref(null)
const applyForm = reactive({ campName: '', location: '', terrainType: '森林', price: '¥780起/天', priceNum: 780 })
const editForm = reactive({ id: null, campName: '', location: '', terrainType: '', price: '', priceNum: 0 })

function statusText(s) {
  const m = { 0: '待审核', 1: '已通过', 2: '已拒绝', 3: '已下架' }
  return m[s] ?? '-'
}
function statusColor(s) {
  const m = { 0: 'orange', 1: 'green', 2: 'red', 3: 'gray' }
  return m[s] ?? ''
}

async function load() {
  loading.value = true
  try {
    const { data } = await getCamps({ status: filterStatus.value })
    list.value = data.data || []
  } catch (e) {
    list.value = []
  } finally { loading.value = false }
}

function showApply() {
  applyForm.campName = ''
  applyForm.location = ''
  applyForm.terrainType = '森林'
  applyForm.price = '¥780起/天'
  applyForm.priceNum = 780
  applyVisible.value = true
}

async function submitApply() {
  try {
    await applyCamp(applyForm)
    Message.success('提交成功，等待审核')
    applyVisible.value = false
    load()
  } catch (e) {
    Message.error(e.response?.data?.message || '提交失败')
  }
}

async function audit(row, pass) {
  if (!pass) {
    rejectRow.value = row
    rejectReason.value = ''
    rejectVisible.value = true
    return
  }
  try {
    await auditCamp(row.id, true)
    Message.success('已通过')
    load()
  } catch (e) {
    Message.error(e.response?.data?.message || '操作失败')
  }
}

async function doReject() {
  if (!rejectRow.value) return
  try {
    await auditCamp(rejectRow.value.id, false, rejectReason.value)
    Message.success('已拒绝')
    rejectVisible.value = false
    rejectRow.value = null
    load()
  } catch (e) {
    Message.error(e.response?.data?.message || '操作失败')
  }
}

async function setStatus(row, status) {
  try {
    await setCampStatus(row.id, status)
    Message.success(status === 1 ? '已上架' : '已下架')
    load()
  } catch (e) {
    Message.error(e.response?.data?.message || '操作失败')
  }
}

function edit(row) {
  editForm.id = row.id
  editForm.campName = row.campName
  editForm.location = row.location
  editForm.terrainType = row.terrainType || ''
  editForm.price = row.price || ''
  editForm.priceNum = row.priceNum || 0
  editVisible.value = true
}

async function saveEdit() {
  try {
    await updateCamp(editForm.id, editForm)
    Message.success('保存成功')
    editVisible.value = false
    load()
  } catch (e) {
    Message.error(e.response?.data?.message || '保存失败')
  }
}

onMounted(load)
</script>
