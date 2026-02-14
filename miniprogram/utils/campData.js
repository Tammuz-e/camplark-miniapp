// 营地数据，与 explore 的 camps 保持一致
const { ALL_SPOTS } = require('./spotData.js')

const ALL_CAMPS = [
  { id: 1, campName: '松岭森林营地', location: '黑龙江省伊春市乌伊岭区林海街道翠云路88号', latitude: 48.22, longitude: 129.45, terrainType: '森林', price: '¥780起/天', priceNum: 780, rating: '4.8', imgs: ['/images/camp-forest.png', '/images/camp-lake.png', '/images/camp-alps.png'], desc: '坐落于小兴安岭腹地，原始森林环抱，空气清新。提供多样化营位与森林徒步、烧烤等体验活动。', impressions: [{ type: 'image', src: '/images/camp-forest.png' }, { type: 'image', src: '/images/camp-lake.png' }, { type: 'image', src: '/images/camp-alps.png' }] },
  { id: 2, campName: '水晶湖豪华露营', location: '四川省阿坝州九寨沟县漳扎镇湖畔路168号', latitude: 33.22, longitude: 103.92, terrainType: '湖畔', price: '¥1600起/天', priceNum: 1600, rating: '4.9', imgs: ['/images/camp-lake.png', '/images/camp-forest.png', '/images/camp-beach.png'], desc: '湖畔豪华帐篷营地，配备私人甲板、热水浴缸。可体验皮划艇、钓鱼等活动。', impressions: [{ type: 'image', src: '/images/camp-lake.png' }, { type: 'image', src: '/images/camp-beach.png' }] },
  { id: 3, campName: '阿尔卑斯山基地', location: '云南省迪庆州德钦县升平镇梅里雪山观景台东侧', latitude: 28.48, longitude: 98.91, terrainType: '山地', price: '¥1100起/天', priceNum: 1100, rating: '4.8', imgs: ['/images/camp-alps.png', '/images/camp-forest.png', '/images/camp-lake.png'], desc: '梅里雪山脚下的山地营地，可观日出雪山，提供骑行、徒步等山地体验。' },
  { id: 4, campName: '日落海滩度假村', location: '海南省三亚市海棠区海棠湾镇椰林路228号', latitude: 18.32, longitude: 109.75, terrainType: '海滩', price: '¥880起/天', priceNum: 880, rating: '4.7', imgs: ['/images/camp-beach.png', '/images/camp-lake.png', '/images/camp-forest.png'], desc: '热带海滩营地，沙滩露营、游泳、烧烤，适合家庭度假。' },
  { id: 5, campName: '极简现代小屋', location: '浙江省杭州市余杭区径山镇双溪路66号', latitude: 30.42, longitude: 119.92, terrainType: '森林', price: '¥2000起/天', priceNum: 2000, rating: '4.9', imgs: ['/images/camp-modern.png', '/images/camp-forest.png', '/images/camp-lake.png'], desc: '极简风格独栋小屋，配备空调、WiFi、独立卫浴，可搭配户外电影等体验。' },
  { id: 6, campName: '静谧湖畔营地', location: '河北省承德市围场县塞罕坝机械林场月亮湖景区', latitude: 42.31, longitude: 117.74, terrainType: '湖畔', price: '¥500起/天', priceNum: 500, rating: '4.6', imgs: ['/images/camp-lake.png', '/images/camp-beach.png', '/images/camp-forest.png'], desc: '塞罕坝月亮湖畔，适合钓鱼、烧烤，是亲子露营的优选。' },
  { id: 7, campName: '云端山巅营地', location: '四川省甘孜州泸定县磨西镇海螺沟冰川森林公园内', latitude: 29.58, longitude: 102.06, terrainType: '山地', price: '¥1200起/天', priceNum: 1200, rating: '4.9', imgs: ['/images/camp-alps.png', '/images/camp-modern.png', '/images/camp-forest.png'], desc: '海螺沟山脊营地，观星、观景台，可参与星空观星等体验。' }
]

function getById(id) {
  return ALL_CAMPS.find(c => String(c.id) === String(id)) || null
}

function getSpotsByCampId(campId) {
  const camp = getById(campId)
  if (!camp) return []
  return ALL_SPOTS.filter(s => s.campName === camp.campName)
}

function getExperiencesByCampId(campId) {
  const camp = getById(campId)
  if (!camp) return []
  const expData = require('./experienceData.js')
  return expData.ALL_EXPERIENCES.filter(e => (e.campSiteName || e.campName) === camp.campName)
}

module.exports = { ALL_CAMPS, getById, getSpotsByCampId, getExperiencesByCampId }
