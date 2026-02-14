const orderData = require('../../utils/orderData.js')
const orderReviewData = require('../../utils/orderReviewData.js')

Page({
  data: {
    order: null,
    review: null
  },
  onLoad(options) {
    const id = options.id
    const order = orderData.getById(id)
    if (!order) {
      wx.showToast({ title: '订单不存在', icon: 'none' })
      return
    }
    const review = orderReviewData.getByOrderId(id)
    this.setData({
      order,
      review,
      statusClass: order.status === '待入营' ? 'pending' : order.status === '已入营' ? 'checked' : 'completed'
    })
    wx.setNavigationBarTitle({ title: '订单详情' })
  },
  onBack() {
    wx.navigateBack()
  },
  onSpotTap() {
    const { order } = this.data
    if (order && order.spotId) {
      wx.navigateTo({ url: '/pages/detail/detail?id=' + order.spotId })
    }
  },
  onReviewTap() {
    const { order } = this.data
    if (order) {
      wx.navigateTo({ url: '/pages/order-review/order-review?orderId=' + order.id })
    }
  }
})
