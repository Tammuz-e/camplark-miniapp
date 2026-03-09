<template>
  <div class="page-container">
    <div class="page-card">
      <div class="toolbar">
      <h2>订单管理</h2>
      <a-radio-group v-model="filterStatus" type="button" @change="load">
        <a-radio value="">全部</a-radio>
        <a-radio value="待入营">待入营</a-radio>
        <a-radio value="已入营">已入营</a-radio>
        <a-radio value="已退房">已退房</a-radio>
        <a-radio value="已取消">已取消</a-radio>
      </a-radio-group>
    </div>
      <a-table :data="list" :loading="loading" :pagination="false" stripe class="data-table" row-key="id">
      <a-table-column title="订单号" data-index="orderNo" :width="140" />
      <a-table-column title="营地" data-index="campName" :width="120" />
      <a-table-column title="营位" data-index="spotName" :width="100" />
      <a-table-column title="预定人" data-index="bookerName" :width="90" />
      <a-table-column title="联系电话" data-index="contactPhone" :width="120" />
      <a-table-column title="入住" data-index="checkIn" :width="110" />
      <a-table-column title="退房" data-index="checkOut" :width="110" />
      <a-table-column title="金额" data-index="totalPrice" :width="80" />
      <a-table-column title="状态" :width="90">
        <template #default="{ record }">
          <a-tag :color="statusTagColor(record.status)">{{ record.status }}</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="操作" :width="200" :fixed="'right'">
        <template #default="{ record }">
          <a-button v-if="record.status === '待入营'" size="small" type="primary" @click="verify(record)">核销入营</a-button>
          <a-button v-if="record.status === '已入营'" size="small" type="text" @click="checkout(record)">办理退房</a-button>
          <a-button v-if="record.status === '待入营'" size="small" type="outline" status="danger" @click="cancel(record)">取消订单</a-button>
        </template>
      </a-table-column>
      </a-table>
      <p v-if="!loading && list.length === 0" class="empty-tip">暂无订单</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Message from '../utils/message'
import { getOrders, verifyOrder, checkoutOrder, cancelOrder } from '../api/order'

const list = ref([])
const loading = ref(false)
const filterStatus = ref('')

async function load() {
  loading.value = true
  try {
    const params = filterStatus.value ? { status: filterStatus.value } : {}
    const { data } = await getOrders(params)
    list.value = data.data || []
  } catch (e) { list.value = [] } finally { loading.value = false }
}

async function verify(row) {
  try {
    await verifyOrder(row.id)
    Message.success('核销成功')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '核销失败') }
}

async function checkout(row) {
  try {
    await checkoutOrder(row.id)
    Message.success('退房成功')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '操作失败') }
}

async function cancel(row) {
  try {
    await cancelOrder(row.id)
    Message.success('已取消')
    load()
  } catch (e) { Message.error(e.response?.data?.message || '取消失败') }
}

function statusTagColor(s) {
  const m = { 待入营: 'orange', 已入营: 'green', 已退房: 'gray', 已取消: 'red' }
  return m[s] || ''
}

onMounted(load)
</script>
