const fav = require('../../utils/fav.js')

Page({
  data: {
    groups: { spot: [], camp: [], service: [], club: [] },
    hasAny: false
  },
  onLoad() {
    this._loadFav()
  },
  onShow() {
    this._loadFav()
  },
  _loadFav() {
    const groups = fav.getList()
    const hasAny = (groups.spot?.length || 0) + (groups.camp?.length || 0) + (groups.service?.length || 0) + (groups.club?.length || 0) > 0
    this.setData({ groups, hasAny })
  },
  onCardTap(e) {
    const { id, type } = e.currentTarget.dataset
    if (type === 'camp') {
      wx.reLaunch({ url: '/pages/camp-detail/camp-detail?id=' + id })
    } else if (type === 'service') {
      wx.reLaunch({ url: '/pages/experience-detail/experience-detail?id=' + id })
    } else if (type === 'club') {
      wx.reLaunch({ url: '/pages/club-detail/club-detail?id=' + id })
    } else {
      wx.reLaunch({ url: '/pages/detail/detail?id=' + id })
    }
  },
  onBack() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },
  goExplore() {
    wx.switchTab({ url: '/pages/explore/explore' })
  }
})
