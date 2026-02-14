Page({
  data: { countdown: 5 },
  _timer: null,
  _goHome() {
    if (this._timer) clearInterval(this._timer)
    wx.switchTab({ url: '/pages/index/index' })
  },
  onLoad() {
    let n = 5
    this._timer = setInterval(() => {
      n--
      this.setData({ countdown: n })
      if (n <= 0) {
        this._goHome()
      }
    }, 1000)
  },
  onSkipTap() {
    this._goHome()
  },
  onUnload() {
    if (this._timer) clearInterval(this._timer)
  }
})
