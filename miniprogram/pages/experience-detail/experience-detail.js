const experienceData = require('../../utils/experienceData.js')
const campData = require('../../utils/campData.js')

Page({
  data: {
    experience: null,
    campId: null,
    showBookModal: false,
    guests: 1
  },
  onLoad(options) {
    const id = options.id
    const experience = experienceData.getById(id)
    if (!experience) {
      wx.showToast({ title: '体验不存在', icon: 'none' })
      setTimeout(() => wx.reLaunch({ url: '/pages/explore/explore' }), 1500)
      return
    }
    const camp = campData.ALL_CAMPS.find(c => c.campName === (experience.campSiteName || experience.campName))
    const campLogo = camp && camp.imgs && camp.imgs[0] ? camp.imgs[0] : (experience.imgs && experience.imgs[0]) || '/images/camp-forest.png'
    const campId = camp ? camp.id : null
    const contentBlocks = (experience.contentBlocks && experience.contentBlocks.length)
      ? experience.contentBlocks
      : [{ type: 'text', content: experience.desc || '' }]
    this.setData({
      experience: { ...experience, imgs: experience.imgs && experience.imgs.length ? experience.imgs : ['/images/camp-forest.png'], contentBlocks, campLogo, campId },
      campId: camp ? camp.id : null
    })
    wx.setNavigationBarTitle({ title: experience.campName + ' - 体验详情' })
  },
  onBack() {
    wx.reLaunch({ url: '/pages/explore/explore' })
  },
  onCampTap() {
    const { campId } = this.data
    if (campId) wx.reLaunch({ url: '/pages/camp-detail/camp-detail?id=' + campId })
  },
  onBook() {
    this.setData({ showBookModal: true, guests: 1 })
  },
  onCloseBookModal() {
    this.setData({ showBookModal: false })
  },
  onGuestsMinus() {
    let { guests } = this.data
    if (guests <= 1) return
    this.setData({ guests: guests - 1 })
  },
  onGuestsPlus() {
    let { guests } = this.data
    if (guests >= 10) return
    this.setData({ guests: guests + 1 })
  },
  onConfirmBook() {
    wx.showToast({ title: '预约成功', icon: 'success' })
    this.setData({ showBookModal: false })
  }
})
