const spotData = require('../../utils/spotData.js')
const reviewData = require('../../utils/reviewData.js')
const orderReviewData = require('../../utils/orderReviewData.js')
const campData = require('../../utils/campData.js')

// Figma 便利设施：有完整卡片图的用 PNG，其余用图标+文字
const FACILITY_CARDS = {
  '无线网': '/images/icons/facility-card-wifi.png',
  '厨房': '/images/icons/facility-card-kitchen.png',
  '热水浴缸': '/images/icons/facility-card-hottub.png',
  '皮划艇租赁': '/images/icons/facility-card-kayak.png'
}
const FACILITY_ICON = '/images/icons/facility-wifi.svg'

function getFacilityDisplay(f) {
  const card = FACILITY_CARDS[f]
  return card ? { type: 'card', src: card } : { type: 'icon', icon: FACILITY_ICON, name: f }
}

function formatDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return y + '-' + m + '-' + day
}

Page({
  data: {
    spot: null,
    footerPrice: 0,
    reviews: [],
    showOrderModal: false,
    checkIn: '',
    checkOut: '',
    minDate: '',
    maxDate: '',
    calendarYear: 0,
    calendarMonth: 0,
    calendarDays: [],
    guests: 2,
    nights: 1,
    totalPrice: 0,
    serviceFee: 0,
    bookerName: '',
    contactPhone: ''
  },
  onLoad(options) {
    const id = options.id
    let spot = spotData.getById(id)
    if (!spot) {
      const fallback = spotData.getById(1)
      spot = { ...fallback, id, campName: '营位', spotName: '#' + id }
    }
    if (!spot.imgs && spot.img) spot.imgs = [spot.img]
    if (!spot.price && spot.priceNum) spot.price = '¥' + spot.priceNum + (spot.priceUnit || '/天')
    const footerPrice = spot.priceNum || parseInt(String(spot.price || '').replace(/\D/g, ''), 10) || 0
    const facilities = (spot.facilities || []).map((f, i) => ({ ...getFacilityDisplay(f), _i: i }))
    const contentBlocks = (spot.contentBlocks && spot.contentBlocks.length)
      ? spot.contentBlocks
      : [{ type: 'text', content: spot.desc || '在湖边体验豪华露营。我们的豪华帐篷配有大号床、私人甲板，可欣赏清澈湖水的壮丽景色。' }]
    const camp = campData.ALL_CAMPS.find(c => c.campName === spot.campName)
    const campLogo = camp && camp.imgs && camp.imgs[0] ? camp.imgs[0] : (spot.imgs && spot.imgs[0]) || spot.img || '/images/camp-forest.png'
    const campId = camp ? camp.id : null
    const spotReviews = reviewData.getReviewsBySpotId(spot.id)
    const orderReviews = orderReviewData.getBySpotId(spot.id)
    const reviews = [...orderReviews, ...spotReviews].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    const today = formatDate(new Date())
    const priceNum = spot.priceNum || 0
    const maxDate = formatDate(new Date(Date.now() + 365 * 86400000))
    this.setData({
      spot: { ...spot, facilities, contentBlocks, campLogo, campId },
      reviews,
      footerPrice: priceNum,
      checkIn: today,
      checkOut: today,
      minDate: today,
      maxDate,
      nights: 1,
      totalPrice: priceNum + Math.round(priceNum * 0.05),
      serviceFee: Math.round(priceNum * 0.05)
    })
    wx.setNavigationBarTitle({ title: (spot.spotName || spot.campName) + ' - 营位详情' })
  },
  onBack() {
    wx.switchTab({ url: '/pages/explore/explore' })
  },
  onBook() {
    const { spot } = this.data
    if (!spot) return
    const now = new Date()
    this.setData({
      showOrderModal: true,
      calendarYear: now.getFullYear(),
      calendarMonth: now.getMonth()
    })
    this._buildCalendar()
  },
  onCloseOrderModal() {
    this.setData({ showOrderModal: false })
  },
  onGuestsMinus() {
    let { guests } = this.data
    if (guests <= 1) return
    guests--
    this._updateOrderTotal(guests, this.data.nights)
  },
  onGuestsPlus() {
    let { guests } = this.data
    if (guests >= 10) return
    guests++
    this._updateOrderTotal(guests, this.data.nights)
  },
  _buildCalendar() {
    const { calendarYear, calendarMonth, checkIn, checkOut, minDate } = this.data
    const first = new Date(calendarYear, calendarMonth, 1)
    const last = new Date(calendarYear, calendarMonth + 1, 0)
    const startPad = first.getDay()
    const daysInMonth = last.getDate()
    const min = minDate ? new Date(minDate) : new Date()
    min.setHours(0, 0, 0, 0)

    const days = []
    for (let i = 0; i < startPad; i++) days.push({ empty: true })
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDate(new Date(calendarYear, calendarMonth, d))
      const date = new Date(calendarYear, calendarMonth, d)
      date.setHours(0, 0, 0, 0)
      const disabled = date < min
      let cls = ''
      if (dateStr === checkIn && dateStr === checkOut) cls = 'start'
      else if (dateStr === checkIn) cls = 'start'
      else if (dateStr === checkOut) cls = 'end'
      else if (checkIn && checkOut && dateStr > checkIn && dateStr < checkOut) cls = 'range'
      else if (dateStr === formatDate(new Date())) cls = 'today'
      days.push({ d, dateStr, disabled, cls })
    }
    this.setData({ calendarDays: days })
  },
  onCalendarPrev() {
    let { calendarYear, calendarMonth, minDate } = this.data
    const min = minDate ? new Date(minDate) : new Date()
    const cur = new Date(calendarYear, calendarMonth, 1)
    if (cur <= new Date(min.getFullYear(), min.getMonth(), 1)) return
    if (calendarMonth === 0) { calendarYear--; calendarMonth = 11 } else calendarMonth--
    this.setData({ calendarYear, calendarMonth })
    this._buildCalendar()
  },
  onCalendarNext() {
    let { calendarYear, calendarMonth, maxDate } = this.data
    const max = maxDate ? new Date(maxDate) : new Date(Date.now() + 365 * 86400000)
    const cur = new Date(calendarYear, calendarMonth + 1, 1)
    if (cur >= max) return
    if (calendarMonth === 11) { calendarYear++; calendarMonth = 0 } else calendarMonth++
    this.setData({ calendarYear, calendarMonth })
    this._buildCalendar()
  },
  onCalendarDayTap(e) {
    const { dateStr, disabled } = e.currentTarget.dataset
    if (!dateStr || disabled) return
    let { checkIn, checkOut } = this.data
    if (!checkIn || (checkIn && checkOut && checkIn !== checkOut)) {
      checkIn = dateStr
      checkOut = dateStr
    } else {
      if (dateStr < checkIn) {
        checkOut = checkIn
        checkIn = dateStr
      } else {
        checkOut = dateStr
      }
    }
    const nights = this._calcNights(checkIn, checkOut)
    this._updateFromDates(checkIn, checkOut, nights)
    this._buildCalendar()
  },
  _calcNights(checkIn, checkOut) {
    const a = new Date(checkIn)
    const b = new Date(checkOut)
    const diff = Math.round((b - a) / 86400000)
    return Math.max(1, diff)
  },
  _updateFromDates(checkIn, checkOut, nights) {
    const { spot, guests } = this.data
    const priceNum = spot.priceNum || 0
    const baseTotal = priceNum * nights
    const serviceFee = Math.round(baseTotal * 0.05)
    this.setData({
      checkIn,
      checkOut,
      nights,
      totalPrice: baseTotal + serviceFee,
      serviceFee
    })
  },
  _updateOrderTotal(guests, nights) {
    const { spot } = this.data
    const priceNum = spot.priceNum || 0
    const baseTotal = priceNum * nights
    const serviceFee = Math.round(baseTotal * 0.05)
    this.setData({
      guests,
      nights,
      totalPrice: baseTotal + serviceFee,
      serviceFee
    })
  },
  onBookerNameInput(e) {
    this.setData({ bookerName: (e.detail.value || '').trim() })
  },
  onContactPhoneInput(e) {
    this.setData({ contactPhone: (e.detail.value || '').trim() })
  },
  onConfirmBook() {
    const { bookerName, contactPhone } = this.data
    if (!bookerName) {
      wx.showToast({ title: '请填写预定人', icon: 'none' })
      return
    }
    if (!contactPhone) {
      wx.showToast({ title: '请填写预定电话', icon: 'none' })
      return
    }
    wx.showToast({ title: '预订成功', icon: 'success' })
    this.setData({ showOrderModal: false })
  },
  onShow() {
    const { spot } = this.data
    if (spot && spot.id) {
      const spotReviews = reviewData.getReviewsBySpotId(spot.id)
      const orderReviews = orderReviewData.getBySpotId(spot.id)
      const reviews = [...orderReviews, ...spotReviews].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      this.setData({ reviews })
    }
  },
  onCampTap() {
    const { spot } = this.data
    if (spot && spot.campId) wx.reLaunch({ url: '/pages/camp-detail/camp-detail?id=' + spot.campId })
  },
  onViewAllReviews() {
    const { spot, reviews } = this.data
    if (!spot || !reviews.length) return
    const spotName = (spot.spotName || spot.campName || '营位').replace(/^#/, '')
    wx.reLaunch({
      url: `/pages/reviews/reviews?spotId=${spot.id}&spotName=${encodeURIComponent(spotName)}`
    })
  }
})
