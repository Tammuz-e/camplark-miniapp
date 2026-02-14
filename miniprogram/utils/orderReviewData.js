const STORAGE_KEY = 'order_reviews'

function _load() {
  try {
    const raw = wx.getStorageSync(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

function _save(data) {
  try {
    wx.setStorageSync(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {}
}

function save(orderId, spotId, content, imgs = [], rating = 5) {
  const data = _load()
  const userInfo = wx.getStorageSync('userInfo') || {}
  data[orderId] = {
    orderId,
    spotId,
    content: (content || '').trim(),
    imgs: imgs || [],
    rating: rating || 5,
    userName: userInfo.nickName || '我',
    date: new Date().toISOString().slice(0, 10),
    createTime: new Date().toISOString()
  }
  _save(data)
}

function getByOrderId(orderId) {
  const data = _load()
  return data[orderId] || null
}

function getBySpotId(spotId) {
  const data = _load()
  return Object.values(data)
    .filter(r => String(r.spotId) === String(spotId))
    .sort((a, b) => (b.createTime || '').localeCompare(a.createTime || ''))
    .map(r => ({
      id: 'order-' + r.orderId,
      userName: r.userName,
      rating: r.rating,
      date: r.date,
      content: r.content,
      imgs: r.imgs || []
    }))
}

function getMyReviewsPastYear() {
  const data = _load()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  const cutoff = oneYearAgo.toISOString()
  return Object.values(data)
    .filter(r => (r.createTime || '') >= cutoff)
    .sort((a, b) => (b.createTime || '').localeCompare(a.createTime || ''))
    .map(r => ({
      id: 'order-' + r.orderId,
      orderId: r.orderId,
      spotId: r.spotId,
      userName: r.userName,
      rating: r.rating,
      date: r.date,
      content: r.content,
      imgs: r.imgs || []
    }))
}

module.exports = { save, getByOrderId, getBySpotId, getMyReviewsPastYear }
