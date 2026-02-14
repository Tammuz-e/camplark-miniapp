// 模糊搜索营地、营位、体验
const campData = require('./campData.js')
const spotData = require('./spotData.js')
const experienceData = require('./experienceData.js')

function match(keyword, ...strs) {
  const k = (keyword || '').trim().toLowerCase()
  if (!k) return false
  return strs.some(s => (s || '').toLowerCase().includes(k))
}

function search(keyword) {
  const k = (keyword || '').trim()
  if (!k) return { camps: [], spots: [], experiences: [] }

  const camps = campData.ALL_CAMPS.filter(c =>
    match(k, c.campName, c.location)
  ).map(c => ({ ...c, _type: 'camp', _display: c.campName }))

  const spots = spotData.ALL_SPOTS.filter(s =>
    match(k, s.campName, s.spotName, s.location)
  ).map(s => ({ ...s, _type: 'spot', _display: (s.spotName || '') + (s.campName ? ' · ' + s.campName : '') }))

  const experiences = experienceData.ALL_EXPERIENCES.filter(e =>
    match(k, e.campName, e.activityType, e.campSiteName, e.location)
  ).map(e => ({ ...e, _type: 'service', _display: e.campName }))

  return { camps, spots, experiences }
}

module.exports = { search }
