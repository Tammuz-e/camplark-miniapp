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
      <a-button v-if="canManage" type="primary" @click="showAdd">+ 新增体验</a-button>
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
      <a-table-column v-if="canManage" title="操作" :width="180" :fixed="'right'">
        <template #default="{ record }">
          <template v-if="record.status === 1"><a-button size="small" @click="setStatus(record, 3)">下架</a-button></template>
          <template v-else-if="record.status === 3"><a-button size="small" type="primary" @click="setStatus(record, 1)">上架</a-button></template>
          <a-button size="small" @click="edit(record)">编辑</a-button>
        </template>
      </a-table-column>
      </a-table>
      <p v-if="!loading && list.length === 0" class="empty-tip">暂无数据</p>

      <a-modal v-model:visible="formVisible" :title="formId ? '编辑体验' : '新增体验'" :width="520" @cancel="formVisible=false" unmount-on-close>
      <a-form :model="form" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
        <a-form-item label="体验名称"><a-input v-model="form.campName" placeholder="如：森林徒步" /></a-form-item>
        <a-form-item label="所属营地/俱乐部"><a-input v-model="form.campSiteName" placeholder="显示名称" /></a-form-item>
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
import { getExperiences, createExperience, updateExperience, setExperienceStatus } from '../api/experience'

const list = ref([])
const loading = ref(false)
const filterStatus = ref(undefined)
const formVisible = ref(false)
const formId = ref(null)
const form = reactive({ campName: '', campSiteName: '', activityType: '', price: '', priceNum: 0, campId: null, clubId: null })

const info = JSON.parse(localStorage.getItem('admin_info') || '{}')
const canManage = !!(info.campId || info.clubId)

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
  } catch { list.value = [] } finally { loading.value = false }
}

function showAdd() {
  formId.value = null
  Object.assign(form, {
    campName: '',
    campSiteName: info.campId ? '' : '',
    activityType: '',
    price: '',
    priceNum: 0,
    campId: info.campId || null,
    clubId: info.clubId || null
  })
  formVisible.value = true
}

function edit(row) {
  formId.value = row.id
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
  if (!form.campName) {
    Message.warning('请填写体验名称')
    return
  }
  try {
    if (formId.value) {
      await updateExperience(formId.value, form)
    } else {
      await createExperience(form)
    }
    Message.success('保存成功')
    formVisible.value = false
    load()
  } catch (e) { Message.error(e.response?.data?.message || '保存失败') }
}

async function setStatus(row, status) {
  try {
    await setExperienceStatus(row.id, status)
    Message.success(status === 1 ? '已上架' : '已下架')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

onMounted(load)
</script>

<style scoped></style>
