// 体验活动数据，与 explore 的 experiences 对应
const ALL_EXPERIENCES = [
  { id: 201, campName: '森林徒步体验', campSiteName: '松岭森林营地', activityType: '徒步', location: '黑龙江省伊春市乌伊岭区', latitude: 48.22, longitude: 129.45, price: '¥120/人', priceNum: 120, rating: '4.9', imgs: ['/images/camp-forest.png', '/images/camp-alps.png'], desc: '专业向导带队，穿越原始森林，识别植被与野生动物，时长约 3 小时。', contentBlocks: [{ type: 'text', content: '专业向导带队，穿越原始森林，识别植被与野生动物，时长约 3 小时。' }, { type: 'image', src: '/images/camp-forest.png' }, { type: 'text', content: '路线涵盖林间栈道与观景台，难度适中，建议穿着运动鞋并携带饮用水。' }] },
  { id: 202, campName: '湖畔钓鱼体验', campSiteName: '水晶湖豪华露营', activityType: '钓鱼', location: '四川省阿坝州九寨沟县', latitude: 33.22, longitude: 103.92, price: '¥80/次', priceNum: 80, rating: '4.8', imgs: ['/images/camp-lake.png', '/images/camp-beach.png'], desc: '提供渔具与基础指导，在清澈湖畔垂钓，钓到的鱼可代加工。', contentBlocks: [{ type: 'text', content: '提供渔具与基础指导，在清澈湖畔垂钓，钓到的鱼可代加工。' }, { type: 'image', src: '/images/camp-lake.png' }, { type: 'text', content: '钓鱼区域设有遮阳棚与座椅，适合新手体验。营地厨房可提供烧烤加工服务。' }] },
  { id: 203, campName: '山地骑行体验', campSiteName: '阿尔卑斯山基地', activityType: '骑行', location: '云南省迪庆州德钦县', latitude: 28.48, longitude: 98.91, price: '¥150/天', priceNum: 150, rating: '4.7', imgs: ['/images/camp-alps.png', '/images/camp-modern.png'], desc: '山地自行车租赁与路线推荐，穿越山道与观景台，适合有一定骑行经验的用户。' },
  { id: 204, campName: '海滩游泳体验', campSiteName: '日落海滩度假村', activityType: '游泳', location: '海南省三亚市海棠区', latitude: 18.32, longitude: 109.75, price: '¥60/人', priceNum: 60, rating: '4.6', imgs: ['/images/camp-beach.png', '/images/camp-lake.png'], desc: '指定海域安全游泳，配备救生员，含更衣与淋浴设施使用。' },
  { id: 205, campName: '星空观星体验', campSiteName: '云端山巅营地', activityType: '观星', location: '四川省甘孜州泸定县', latitude: 29.58, longitude: 102.06, price: '¥50/人', priceNum: 50, rating: '4.9', imgs: ['/images/camp-alps.png', '/images/camp-forest.png'], desc: '夜间观星讲解，使用天文望远镜观赏星空，讲解星座与行星知识。' },
  { id: 206, campName: '湖畔露营烧烤', campSiteName: '静谧湖畔营地', activityType: '烧烤', location: '河北省承德市围场县', latitude: 42.31, longitude: 117.74, price: '¥180/组', priceNum: 180, rating: '4.8', imgs: ['/images/camp-lake.png', '/images/camp-beach.png'], desc: '含烧烤炉具、炭火与基础调料，可自带食材，湖畔指定区域使用。' },
  { id: 207, campName: '户外电影放映', campSiteName: '极简现代小屋', activityType: '电影', location: '浙江省杭州市余杭区', latitude: 30.42, longitude: 119.92, price: '¥20/人', priceNum: 20, rating: '4.7', imgs: ['/images/camp-modern.png', '/images/camp-forest.png'], desc: '露天电影放映，提供座椅与爆米花，周末及节假日开放。' }
]

function getById(id) {
  return ALL_EXPERIENCES.find(e => String(e.id) === String(id)) || null
}

module.exports = { ALL_EXPERIENCES, getById }
