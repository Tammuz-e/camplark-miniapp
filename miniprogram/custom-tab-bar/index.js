// custom-tab-bar/index.js - 按 Figma 设计稿实现，图标全部从 Figma 下载
Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页', iconPath: '/images/tab/home.png', selectedIconPath: '/images/tab/home-active.png' },
      { pagePath: '/pages/explore/explore', text: '探索', iconPath: '/images/tab/explore.png', selectedIconPath: '/images/tab/explore-active.png' },
      { pagePath: '/pages/club/club', text: '俱乐部', iconPath: '/images/tab/club.png', selectedIconPath: '/images/tab/club-active.png' },
      { pagePath: '/pages/profile/profile', text: '我的', iconPath: '/images/tab/profile.png', selectedIconPath: '/images/tab/profile-active.png' }
    ]
  },
  attached() {
    const pages = getCurrentPages()
    const cur = pages && pages.length > 0 ? pages[pages.length - 1] : null
    if (!cur || !cur.route) return
    const path = '/' + cur.route
    let idx = this.data.list.findIndex(i => i.pagePath === path)
    if (idx < 0) {
      const profilePages = ['/pages/favorites/favorites', '/pages/my-reviews/my-reviews', '/pages/my-bookings/my-bookings', '/pages/settings/settings']
      if (profilePages.indexOf(path) >= 0) idx = 3
    }
    if (idx >= 0) this.setData({ selected: idx })
  },
  methods: {
    switchTab(e) {
      const idx = parseInt(e.currentTarget.dataset.index, 10)
      if (isNaN(idx) || idx < 0 || idx >= this.data.list.length) return
      const item = this.data.list[idx]
      wx.switchTab({ url: item.pagePath })
      this.setData({ selected: idx })
    }
  }
})
