const ALL_CLUBS = [
  { id: 30, clubName: '户外探险俱乐部', tags: ['金牌俱乐部', '人气推荐'], price: '入会免费', members: 128, desc: '汇聚热爱大自然的探索者，定期组织野外生存、植物识别和观星活动', img: '/images/camp-alps.png' },
  { id: 31, clubName: '森林徒步俱乐部', tags: ['精选俱乐部'], price: '¥199/年', members: 86, desc: '探索森林步道，结识徒步同好', img: '/images/camp-modern.png' },
  { id: 32, clubName: '星空露营俱乐部', tags: ['金牌俱乐部', '新晋'], price: '¥299/年', members: 52, desc: '观星、露营、分享星空故事', img: '/images/camp-forest.png' },
  { id: 33, clubName: '亲子露营俱乐部', tags: ['人气推荐'], price: '¥159/年', members: 203, desc: '家庭亲子露营，培养孩子的自然兴趣', img: '/images/camp-beach.png' },
  { id: 34, clubName: '摄影爱好者俱乐部', tags: ['精选俱乐部'], price: '¥99/年', members: 95, desc: '户外风光摄影，追逐日出日落', img: '/images/camp-lake.png' },
  { id: 35, clubName: '越野车俱乐部', tags: ['金牌俱乐部'], price: '¥399/年', members: 67, desc: '越野穿越，探索未知道路', img: '/images/camp-alps.png' },
  { id: 36, clubName: '钓鱼俱乐部', tags: ['新晋'], price: '¥129/年', members: 41, desc: '湖畔垂钓，静享时光', img: '/images/camp-lake.png' },
  { id: 37, clubName: '观鸟俱乐部', tags: ['精选俱乐部'], price: '¥89/年', members: 78, desc: '观察鸟类，记录自然之美', img: '/images/camp-forest.png' },
  { id: 38, clubName: '骑行俱乐部', tags: ['金牌俱乐部'], price: '¥249/年', members: 112, desc: '山地骑行，挑战自我', img: '/images/camp-modern.png' }
]

const CLUB_EXPERIENCES = [
  { id: 207, clubId: 30, campName: '户外电影放映', location: '浙江省杭州市余杭区', price: '¥20/人', rating: '4.7', imgs: ['/images/camp-modern.png', '/images/camp-forest.png'], activityType: '电影' },
  { id: 208, clubId: 30, campName: '野外生存训练', location: '浙江省安吉县', price: '¥180/人', rating: '4.8', imgs: ['/images/camp-forest.png', '/images/camp-alps.png'], activityType: '野外生存' },
  { id: 209, clubId: 30, campName: '植物识别体验', location: '江苏省南京市紫金山', price: '¥60/人', rating: '4.6', imgs: ['/images/camp-forest.png'], activityType: '植物识别' },
  { id: 210, clubId: 31, campName: '森林步道徒步', location: '黑龙江省伊春市', price: '¥120/人', rating: '4.9', imgs: ['/images/camp-forest.png', '/images/camp-alps.png'], activityType: '徒步' },
  { id: 211, clubId: 31, campName: '林间野餐体验', location: '浙江省莫干山', price: '¥88/人', rating: '4.7', imgs: ['/images/camp-forest.png', '/images/camp-beach.png'], activityType: '野餐' },
  { id: 205, clubId: 32, campName: '星空观星体验', location: '四川省甘孜州泸定县', price: '¥50/人', rating: '4.9', imgs: ['/images/camp-alps.png', '/images/camp-forest.png'], activityType: '观星' },
  { id: 212, clubId: 32, campName: '露营故事分享会', location: '多地巡回', price: '免费', rating: '4.8', imgs: ['/images/camp-modern.png'], activityType: '分享会' },
  { id: 213, clubId: 33, campName: '亲子自然课堂', location: '上海市崇明岛', price: '¥199/组', rating: '4.9', imgs: ['/images/camp-beach.png', '/images/camp-forest.png'], activityType: '亲子' },
  { id: 214, clubId: 33, campName: '儿童户外探险', location: '江苏省苏州穹窿山', price: '¥150/组', rating: '4.7', imgs: ['/images/camp-forest.png'], activityType: '探险' },
  { id: 215, clubId: 34, campName: '日出日落摄影', location: '浙江省东极岛', price: '¥99/人', rating: '4.9', imgs: ['/images/camp-beach.png', '/images/camp-lake.png'], activityType: '摄影' },
  { id: 216, clubId: 34, campName: '风光摄影工作坊', location: '云南省元阳梯田', price: '¥299/人', rating: '4.8', imgs: ['/images/camp-alps.png'], activityType: '摄影' },
  { id: 217, clubId: 35, campName: '越野穿越体验', location: '内蒙古库布齐沙漠', price: '¥580/车', rating: '4.8', imgs: ['/images/camp-alps.png', '/images/camp-modern.png'], activityType: '越野' },
  { id: 218, clubId: 36, campName: '湖畔垂钓体验', location: '河北省承德围场', price: '¥129/人', rating: '4.7', imgs: ['/images/camp-lake.png', '/images/camp-beach.png'], activityType: '钓鱼' },
  { id: 219, clubId: 37, campName: '观鸟导赏活动', location: '江苏省盐城湿地', price: '¥80/人', rating: '4.9', imgs: ['/images/camp-forest.png', '/images/camp-lake.png'], activityType: '观鸟' },
  { id: 220, clubId: 38, campName: '山地骑行挑战', location: '浙江省千岛湖', price: '¥150/人', rating: '4.8', imgs: ['/images/camp-modern.png', '/images/camp-alps.png'], activityType: '骑行' }
]

function getById(id) {
  return ALL_CLUBS.find(c => String(c.id) === String(id)) || null
}

function getExperiencesByClubId(clubId) {
  return CLUB_EXPERIENCES.filter(e => String(e.clubId) === String(clubId))
}

module.exports = { ALL_CLUBS, getById, getExperiencesByClubId }
