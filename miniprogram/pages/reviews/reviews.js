const reviewData = require('../../utils/reviewData.js')
const orderReviewData = require('../../utils/orderReviewData.js')

Page({
  data: {
    spotId: '',
    spotName: '',
    reviews: []
  },
  onLoad(options) {
    const spotId = options.spotId || options.id || ''
    const spotName = options.spotName ? decodeURIComponent(options.spotName) : '营位'
    const spotReviews = reviewData.getReviewsBySpotId(spotId)
    const orderReviews = orderReviewData.getBySpotId(spotId)
    const reviews = [...orderReviews, ...spotReviews].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    this.setData({
      spotId,
      spotName,
      reviews
    })
    wx.setNavigationBarTitle({ title: spotName + ' - 全部评价' })
  },
  onBack() {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack()
    } else {
      wx.switchTab({ url: '/pages/explore/explore' })
    }
  }
})
