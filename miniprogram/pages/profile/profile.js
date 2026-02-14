Page({
  data: {
    userInfo: { nickName: '点击登录', avatarUrl: '', tag: '自然爱好者' },
    isLoggedIn: false,
    stats: { favs: 0, reviews: 0 },
    showLoginModal: false,
    loginAvatar: '',
    loginNickname: ''
  },

  onLoad() {
    this._loadUserState()
    this._updateFavCount()
    this._updateReviewCount()
  },
  onShow() {
    this._loadUserState()
    this._updateFavCount()
    this._updateReviewCount()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },
  _loadUserState() {
    const u = wx.getStorageSync('userInfo')
    if (u && u.nickName && u.nickName !== '点击登录') {
      this.setData({
        userInfo: { nickName: u.nickName, avatarUrl: u.avatarUrl || '', tag: u.tag || '自然爱好者' },
        isLoggedIn: true
      })
    } else {
      this.setData({
        userInfo: { nickName: '点击登录', avatarUrl: '', tag: '' },
        isLoggedIn: false
      })
    }
  },
  _updateFavCount() {
    try {
      const fav = require('../../utils/fav.js')
      const n = fav.getTotalCount()
      this.setData({ 'stats.favs': n })
    } catch (e) {}
  },
  _updateReviewCount() {
    try {
      const orderReviewData = require('../../utils/orderReviewData.js')
      const n = orderReviewData.getMyReviewsPastYear().length
      this.setData({ 'stats.reviews': n })
    } catch (e) {}
  },
  onFavsTap() {
    wx.reLaunch({ url: '/pages/favorites/favorites' })
  },
  onReviewsTap() {
    wx.reLaunch({ url: '/pages/my-reviews/my-reviews' })
  },
  onMyBookings() {
    wx.reLaunch({ url: '/pages/my-bookings/my-bookings' })
  },
  onSettings() {
    wx.reLaunch({ url: '/pages/settings/settings' })
  },

  onUserSectionTap() {
    if (!this.data.isLoggedIn) {
      this.setData({
        showLoginModal: true,
        loginAvatar: '',
        loginNickname: ''
      })
    }
  },
  onCloseLoginModal() {
    this.setData({ showLoginModal: false })
  },
  onChooseAvatar(e) {
    const avatarUrl = e.detail.avatarUrl
    this.setData({ loginAvatar: avatarUrl })
  },
  onLoginNicknameInput(e) {
    this.setData({ loginNickname: (e.detail.value || '').trim() })
  },
  onLoginSubmit() {
    const { loginAvatar, loginNickname } = this.data
    if (!loginNickname) {
      wx.showToast({ title: '请填写昵称', icon: 'none' })
      return
    }
    const userInfo = {
      nickName: loginNickname,
      avatarUrl: loginAvatar || '',
      tag: '自然爱好者'
    }
    wx.setStorageSync('userInfo', userInfo)
    this.setData({
      userInfo,
      isLoggedIn: true,
      showLoginModal: false
    })
    wx.showToast({ title: '登录成功', icon: 'success' })
  },
  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo')
          this.setData({
            userInfo: { nickName: '点击登录', avatarUrl: '', tag: '' },
            isLoggedIn: false
          })
          wx.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  }
})
