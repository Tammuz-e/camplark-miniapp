const orderData = require('../../utils/orderData.js')
const orderReviewData = require('../../utils/orderReviewData.js')

Page({
  data: {
    statusTabs: [orderData.STATUS_PENDING, orderData.STATUS_CHECKED_IN, orderData.STATUS_COMPLETED],
    activeStatus: orderData.STATUS_PENDING,
    orderList: []
  },
  onLoad() {
    this._loadOrders()
  },
  onShow() {
    this._loadOrders()
  },
  onBack() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },
  _loadOrders() {
    const { activeStatus } = this.data
    const orders = orderData.getByStatus(activeStatus)
    const orderList = orders.map(o => {
      const review = orderReviewData.getByOrderId(o.id)
      return {
        ...o,
        statusClass: o.status === '待入营' ? 'pending' : o.status === '已入营' ? 'checked' : 'completed',
        review: review || null
      }
    })
    this.setData({ orderList })
  },
  onStatusTabTap(e) {
    const status = e.currentTarget.dataset.status
    if (status == null || status === this.data.activeStatus) return
    this.setData({ activeStatus: status })
    this._loadOrders()
  },
  onReviewTap(e) {
    const id = e.currentTarget.dataset.id
    if (id) wx.navigateTo({ url: '/pages/order-review/order-review?orderId=' + id })
  },
  onOrderTap(e) {
    const id = e.currentTarget.dataset.id
    if (id) wx.navigateTo({ url: '/pages/order-detail/order-detail?id=' + id })
  },
  goExplore() {
    wx.switchTab({ url: '/pages/explore/explore' })
  }
})
