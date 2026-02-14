const KEY = 'favorites'

function _key(id, type) {
  return type + '_' + id
}

function getAll() {
  try {
    return wx.getStorageSync(KEY) || {}
  } catch (e) {
    return {}
  }
}

function getList() {
  const raw = getAll()
  return {
    spot: Array.isArray(raw.spot) ? raw.spot : [],
    camp: Array.isArray(raw.camp) ? raw.camp : [],
    service: Array.isArray(raw.service) ? raw.service : [],
    club: Array.isArray(raw.club) ? raw.club : []
  }
}

function isFavorited(id, type) {
  const list = getList()[type] || []
  return list.some(item => item.id == id)
}

function toggle(item, type) {
  const list = getList()
  const arr = list[type] || []
  const idx = arr.findIndex(x => x.id == item.id)
  if (idx >= 0) {
    arr.splice(idx, 1)
  } else {
    arr.push({ ...item, _type: type })
  }
  list[type] = arr
  const toSave = {}
  if (list.spot.length) toSave.spot = list.spot
  if (list.camp.length) toSave.camp = list.camp
  if (list.service.length) toSave.service = list.service
  if (list.club.length) toSave.club = list.club
  wx.setStorageSync(KEY, toSave)
  return list
}

function getTotalCount() {
  const list = getList()
  return (list.spot?.length || 0) + (list.camp?.length || 0) + (list.service?.length || 0) + (list.club?.length || 0)
}

module.exports = {
  getList,
  isFavorited,
  toggle,
  getTotalCount
}
