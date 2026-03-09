<template>
  <div class="page-container">
    <div class="page-card">
      <div class="toolbar">
      <h2>俱乐部管理</h2>
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
      <a-table-column title="俱乐部名称" data-index="clubName" :min-width="140" />
      <a-table-column title="入会价格" data-index="price" :width="120" />
      <a-table-column title="成员数" data-index="members" :width="90" />
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

      <a-modal v-model:visible="applyVisible" title="俱乐部入驻申请" :width="420" @cancel="applyVisible=false" unmount-on-close>
      <a-form :model="applyForm" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
        <a-form-item label="俱乐部名称"><a-input v-model="applyForm.clubName" /></a-form-item>
        <a-form-item label="入会价格"><a-input v-model="applyForm.price" /></a-form-item>
        <a-form-item label="价格数值"><a-input-number v-model="applyForm.priceNum" :min="0" /></a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="applyVisible=false">取消</a-button>
        <a-button type="primary" @click="submitApply">提交</a-button>
      </template>
      </a-modal>

      <a-modal v-model:visible="editVisible" title="编辑俱乐部" :width="420" @cancel="editVisible=false" unmount-on-close>
      <a-form :model="editForm" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
        <a-form-item label="俱乐部名称"><a-input v-model="editForm.clubName" /></a-form-item>
        <a-form-item label="入会价格"><a-input v-model="editForm.price" /></a-form-item>
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
import { getClubs, applyClub, auditClub, setClubStatus, updateClub } from '../api/club'

const list = ref([])
const loading = ref(false)
const filterStatus = ref(undefined)
const applyVisible = ref(false)
const editVisible = ref(false)
const rejectVisible = ref(false)
const rejectReason = ref('')
const rejectRow = ref(null)
const applyForm = reactive({ clubName: '', price: '', priceNum: 0 })
const editForm = reactive({ id: null, clubName: '', price: '', priceNum: 0 })

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
    const { data } = await getClubs({ status: filterStatus.value })
    list.value = data.data || []
  } catch (e) { list.value = [] } finally { loading.value = false }
}

function showApply() {
  applyForm.clubName = ''
  applyForm.price = ''
  applyForm.priceNum = 0
  applyVisible.value = true
}

async function submitApply() {
  try {
    await applyClub(applyForm)
    Message.success('提交成功')
    applyVisible.value = false
    load()
  } catch (e) { Message.error(e.response?.data?.message || '提交失败') }
}

async function audit(row, pass) {
  if (!pass) {
    rejectRow.value = row
    rejectReason.value = ''
    rejectVisible.value = true
    return
  }
  try {
    await auditClub(row.id, true)
    Message.success('已通过')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

async function doReject() {
  if (!rejectRow.value) return
  try {
    await auditClub(rejectRow.value.id, false, rejectReason.value)
    Message.success('已拒绝')
    rejectVisible.value = false
    rejectRow.value = null
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

async function setStatus(row, status) {
  try {
    await setClubStatus(row.id, status)
    Message.success(status === 1 ? '已上架' : '已下架')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

function edit(row) {
  editForm.id = row.id
  editForm.clubName = row.clubName
  editForm.price = row.price || ''
  editForm.priceNum = row.priceNum || 0
  editVisible.value = true
}

async function saveEdit() {
  try {
    await updateClub(editForm.id, editForm)
    Message.success('保存成功')
    editVisible.value = false
    load()
  } catch (e) { Message.error(e.response?.data?.message || '保存失败') }
}

onMounted(load)
</script>

<style scoped>
</style>
