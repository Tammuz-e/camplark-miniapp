const spotData = require('../../utils/spotData.js')

Page({
  data: {
    spot: null,
    bookerName: '',
    contactPhone: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    nights: 1,
    totalPrice: 0
  },
  onLoad(options) {
    const id = options.id
    const spot = spotData.getById(id)
    if (!spot) {
      wx.showToast({ title: '营位不存在', icon: 'none' })
      return
    }
    const today = this._formatDate(new Date())
    const tomorrow = this._formatDate(new Date(Date.now() + 86400000))
    const priceNum = spot.priceNum || parseInt((spot.price || '0').replace(/[^\d]/g, ''), 10) || 0
    this.setData({
      spot,
      checkIn: today,
      checkOut: tomorrow,
      totalPrice: priceNum
    })
    wx.setNavigationBarTitle({ title: '确认订单' })
  },
  _formatDate(d) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return y + '-' + m + '-' + day
  },
  onCheckInTap() {
    wx.showToast({ title: '选择入住日期', icon: 'none' })
  },
  onCheckOutTap() {
    wx.showToast({ title: '选择退房日期', icon: 'none' })
  },
  onGuestsChange(e) {
    const idx = parseInt(e.detail.value, 10)
    const guests = (idx >= 0 ? idx + 1 : 2)
    const { spot } = this.data
    const priceNum = spot.priceNum || parseInt((spot.price || '0').replace(/[^\d]/g, ''), 10) || 0
    const totalPrice = priceNum * this.data.nights
    this.setData({ guests, totalPrice })
  },
  onNightsChange(e) {
    const idx = parseInt(e.detail.value, 10)
    const nights = (idx >= 0 ? idx + 1 : 1)
    const { spot } = this.data
    const priceNum = spot.priceNum || parseInt((spot.price || '0').replace(/[^\d]/g, ''), 10) || 0
    const totalPrice = priceNum * nights
    this.setData({ nights, totalPrice })
  },
  onBookerNameInput(e) {
    this.setData({ bookerName: (e.detail.value || '').trim() })
  },
  onContactPhoneInput(e) {
    this.setData({ contactPhone: (e.detail.value || '').trim() })
  },
  onSubmit() {
    const { bookerName, contactPhone } = this.data
    if (!bookerName) {
      wx.showToast({ title: '请填写预定人', icon: 'none' })
      return
    }
    if (!contactPhone) {
      wx.showToast({ title: '请填写联系电话', icon: 'none' })
      return
    }
    const phoneReg = /^1[3-9]\d{9}$/
    if (!phoneReg.test(contactPhone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    wx.showToast({ title: '订单提交成功', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 1500)
  }
})
