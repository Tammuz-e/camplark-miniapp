const KEY = 'joinedClubs'

function getIds() {
  try {
    const raw = wx.getStorageSync(KEY)
    return Array.isArray(raw) ? raw : []
  } catch (e) {
    return []
  }
}

function isJoined(id) {
  const ids = getIds()
  return ids.some(x => x == id)
}

function join(id) {
  const ids = getIds()
  if (!ids.includes(id)) {
    ids.push(id)
    wx.setStorageSync(KEY, ids)
  }
  return ids
}

function leave(id) {
  const ids = getIds().filter(x => x != id)
  wx.setStorageSync(KEY, ids)
  return ids
}

module.exports = {
  getIds,
  isJoined,
  join,
  leave
}
