const clubData = require('../../utils/clubData.js')
const joinedClubs = require('../../utils/joinedClubs.js')

Page({
  data: {
    club: null,
    joined: false,
    experiences: []
  },
  onLoad(options) {
    const id = options.id
    const club = clubData.getById(id)
    const joined = club ? joinedClubs.isJoined(club.id) : false
    const experiences = club ? clubData.getExperiencesByClubId(club.id) : []
    this.setData({ club, joined, experiences })
    if (club) {
      wx.setNavigationBarTitle({ title: club.clubName })
    }
  },
  onShow() {
    if (this.data.club) {
      const joined = joinedClubs.isJoined(this.data.club.id)
      this.setData({ joined })
    }
  },
  onBack() {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack()
    } else {
      wx.switchTab({ url: '/pages/club/club' })
    }
  },
  onJoin() {
    if (!this.data.club) return
    joinedClubs.join(this.data.club.id)
    this.setData({ joined: true })
    wx.showToast({ title: '已加入', icon: 'success' })
  },
  onLeaveClub() {
    if (!this.data.club) return
    wx.showModal({
      title: '退出俱乐部',
      content: '确定要退出「' + this.data.club.clubName + '」吗？',
      confirmText: '确定退出',
      confirmColor: '#E53935',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          joinedClubs.leave(this.data.club.id)
          this.setData({ joined: false })
          wx.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  }
})
