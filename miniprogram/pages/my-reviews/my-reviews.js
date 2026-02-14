const orderReviewData = require('../../utils/orderReviewData.js')
const orderData = require('../../utils/orderData.js')

Page({
  data: {
    reviews: []
  },
  onLoad() {
    this._loadReviews()
  },
  onShow() {
    this._loadReviews()
  },
  _loadReviews() {
    const raw = orderReviewData.getMyReviewsPastYear()
    const reviews = raw.map(r => {
      const order = orderData.getById(r.orderId)
      return {
        ...r,
        campName: order ? order.campName : '营位',
        spotName: order ? order.spotName : ''
      }
    })
    this.setData({ reviews })
  },
  onBack() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },
  onItemTap(e) {
    const spotId = e.currentTarget.dataset.spotId
    if (spotId != null) wx.reLaunch({ url: '/pages/detail/detail?id=' + spotId })
  }
})
