const joinedClubs = require('../../utils/joinedClubs.js')
const { ALL_CLUBS } = require('../../utils/clubData.js')

Page({
  data: {
    myClubs: [],
    recommendedClubs: []
  },
  onLoad() {
    this._updateClubSections()
  },
  onShow() {
    this._updateClubSections()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },
  _updateClubSections() {
    const joinedIds = joinedClubs.getIds()
    const myClubs = ALL_CLUBS.filter(c => joinedIds.includes(c.id))
    const recommendedClubs = ALL_CLUBS.filter(c => !joinedIds.includes(c.id))
    this.setData({ myClubs, recommendedClubs })
  },
  onClubTap(e) {
    const id = e.currentTarget.dataset.id
    if (id == null || id === '') return
    const url = '/pages/club-detail/club-detail?id=' + id
    wx.reLaunch({ url })
  },
  onJoinClub(e) {
    const id = e.currentTarget.dataset.id
    joinedClubs.join(id)
    this._updateClubSections()
    wx.showToast({ title: '已加入', icon: 'success' })
  },
  onCreateClub() {
    wx.showToast({ title: '请联系客服', icon: 'none' })
  }
})
