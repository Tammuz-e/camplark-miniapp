// 营位评价 mock 数据，按 spotId 关联
const DEFAULT_REVIEWS = [
  { id: 1, userName: '户外达人', rating: 5.0, date: '2024-01-15', content: '环境太棒了，空气清新，晚上能看到星星。设施齐全，体验很好！' },
  { id: 2, userName: '小家庭', rating: 4.8, date: '2024-01-08', content: '带孩子来的，设施很方便，营地很安全，下次还会来。' },
  { id: 3, userName: '露营新手', rating: 4.5, date: '2023-12-20', content: '第一次露营就选了这里，设施完善，工作人员很热情，推荐！' }
]

const REVIEWS_BY_SPOT = {
  1: DEFAULT_REVIEWS,
  3: [
    { id: 1, userName: '湖景爱好者', rating: 5.0, date: '2024-02-01', content: '湖景绝佳！帐篷很豪华，床垫舒服，早上在甲板上看日出太美了。' },
    { id: 2, userName: '情侣出行', rating: 4.9, date: '2024-01-22', content: '蜜月选的这里，皮划艇很好玩，热水浴缸解乏，强烈推荐！' },
    { id: 3, userName: '摄影爱好者', rating: 4.8, date: '2024-01-10', content: '拍照圣地，湖水清澈，夜景也美。WiFi 信号不错，可以远程办公。' }
  ]
}

// 返回该营位全部评价，按时间从新到旧排序
function getReviewsBySpotId(spotId) {
  const list = REVIEWS_BY_SPOT[spotId] || DEFAULT_REVIEWS
  return [...list].sort((a, b) => {
    const da = a.date || ''
    const db = b.date || ''
    return db.localeCompare(da)
  })
}

module.exports = { getReviewsBySpotId }
