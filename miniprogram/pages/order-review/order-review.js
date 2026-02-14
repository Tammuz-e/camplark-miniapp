const orderData = require('../../utils/orderData.js')
const orderReviewData = require('../../utils/orderReviewData.js')

Page({
  data: {
    orderId: '',
    order: null,
    rating: 5,
    content: '',
    imgs: []
  },
  onLoad(options) {
    const orderId = options.orderId
    const order = orderData.getById(orderId)
    if (!order) {
      wx.showToast({ title: '订单不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1500)
      return
    }
    this.setData({ orderId, order })
    wx.setNavigationBarTitle({ title: '写评价' })
  },
  onRatingTap(e) {
    const rating = parseInt(e.currentTarget.dataset.rating, 10)
    if (!isNaN(rating)) this.setData({ rating })
  },
  onContentInput(e) {
    this.setData({ content: e.detail.value || '' })
  },
  onAddImg() {
    const { imgs } = this.data
    const remain = 9 - imgs.length
    if (remain <= 0) return
    wx.chooseMedia({
      count: remain,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImgs = (res.tempFiles || []).map(f => f.tempFilePath)
        this.setData({ imgs: imgs.concat(newImgs) })
      }
    })
  },
  onImgDelete(e) {
    const idx = parseInt(e.currentTarget.dataset.index, 10)
    const imgs = this.data.imgs.filter((_, i) => i !== idx)
    this.setData({ imgs })
  },
  onSubmit() {
    const { orderId, order, content } = this.data
    if (!content.trim()) {
      wx.showToast({ title: '请填写评价内容', icon: 'none' })
      return
    }
    orderReviewData.save(orderId, order.spotId, content, this.data.imgs, this.data.rating)
    wx.showToast({ title: '评价成功', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 1500)
  }
})
