Page({
  data: {
    spots: [
      { id: 1, campName: '松岭森林营地', spotName: 'A区1号营位', location: '黑龙江省伊春市乌伊岭区', priceNum: '¥900', priceUnit: '/天', rating: '4.8', img: '/images/camp-forest.png' },
      { id: 2, campName: '松岭森林营地', spotName: 'A区2号营位', location: '黑龙江省伊春市乌伊岭区', priceNum: '¥850', priceUnit: '/天', rating: '4.7', img: '/images/camp-forest.png' },
      { id: 3, campName: '水晶湖豪华露营', spotName: '湖畔观景营位', location: '四川省阿坝州九寨沟县', priceNum: '¥1800', priceUnit: '/天', rating: '4.9', img: '/images/camp-lake.png' },
      { id: 4, campName: '阿尔卑斯山基地', spotName: '雪山观景营位', location: '云南省迪庆州德钦县', priceNum: '¥1200', priceUnit: '/天', rating: '4.7', img: '/images/camp-alps.png' },
      { id: 5, campName: '日落海滩度假村', spotName: '沙滩A区营位', location: '海南省三亚市海棠区', priceNum: '¥950', priceUnit: '/天', rating: '4.6', img: '/images/camp-beach.png' },
      { id: 6, campName: '极简现代小屋', spotName: '独栋01号营位', location: '浙江省杭州市余杭区', priceNum: '¥2200', priceUnit: '/天', rating: '5', img: '/images/camp-modern.png' },
      { id: 10, campName: '松岭森林营地', spotName: 'B区3号营位', location: '黑龙江省伊春市乌伊岭区', priceNum: '¥820', priceUnit: '/天', rating: '4.6', img: '/images/camp-forest.png' },
      { id: 11, campName: '水晶湖豪华露营', spotName: '湖畔VIP营位', location: '四川省阿坝州九寨沟县', priceNum: '¥2100', priceUnit: '/天', rating: '4.9', img: '/images/camp-lake.png' },
      { id: 12, campName: '阿尔卑斯山基地', spotName: '云台营位', location: '云南省迪庆州德钦县', priceNum: '¥1100', priceUnit: '/天', rating: '4.8', img: '/images/camp-alps.png' },
      { id: 13, campName: '日落海滩度假村', spotName: '沙滩B区营位', location: '海南省三亚市海棠区', priceNum: '¥880', priceUnit: '/天', rating: '4.5', img: '/images/camp-beach.png' }
    ],
    nearbySpots: [
      { id: 7, campName: '静谧湖畔营地', spotName: '湖景1号营位', location: '河北省承德市围场县', price: '¥550/天', rating: '4.6', img: '/images/camp-lake.png' },
      { id: 8, campName: '静谧湖畔营地', spotName: '湖景2号营位', location: '河北省承德市围场县', price: '¥520/天', rating: '4.5', img: '/images/camp-lake.png' },
      { id: 9, campName: '云端山巅营地', spotName: '山脊观星营位', location: '四川省甘孜州泸定县', price: '¥1200/天', rating: '4.9', img: '/images/camp-alps.png' },
      { id: 14, campName: '松岭森林营地', spotName: 'C区营位', location: '黑龙江省伊春市乌伊岭区', price: '¥780/天', rating: '4.6', img: '/images/camp-forest.png' },
      { id: 15, campName: '水晶湖豪华露营', spotName: '湖滨营位', location: '四川省阿坝州九寨沟县', price: '¥1600/天', rating: '4.8', img: '/images/camp-lake.png' },
      { id: 16, campName: '阿尔卑斯山基地', spotName: '观星营位', location: '云南省迪庆州德钦县', price: '¥1300/天', rating: '4.7', img: '/images/camp-alps.png' },
      { id: 17, campName: '日落海滩度假村', spotName: '海景营位', location: '海南省三亚市海棠区', price: '¥1100/天', rating: '4.7', img: '/images/camp-beach.png' },
      { id: 18, campName: '极简现代小屋', spotName: '独栋02号', location: '浙江省杭州市余杭区', price: '¥2000/天', rating: '4.9', img: '/images/camp-modern.png' },
      { id: 19, campName: '静谧湖畔营地', spotName: '湖景3号营位', location: '河北省承德市围场县', price: '¥500/天', rating: '4.4', img: '/images/camp-lake.png' }
    ],
    serviceSpots: [
      { id: 20, campName: '24小时客服', spotName: '随时解答', campSiteName: '松岭森林营地', price: '免费', rating: '5.0', img: '/images/camp-forest.png' },
      { id: 21, campName: '装备租赁', spotName: '帐篷桌椅', campSiteName: '水晶湖豪华露营', price: '¥50起/次', rating: '4.8', img: '/images/camp-lake.png' },
      { id: 22, campName: '营地烧烤', spotName: '烧烤设备', campSiteName: '日落海滩度假村', price: '¥80起/次', rating: '4.9', img: '/images/camp-beach.png' },
      { id: 23, campName: '免费WiFi', spotName: '畅享网络', campSiteName: '阿尔卑斯山基地', price: '免费', rating: '5.0', img: '/images/camp-alps.png' },
      { id: 24, campName: '安全保障', spotName: '专业巡检', campSiteName: '极简现代小屋', price: '免费', rating: '5.0', img: '/images/camp-modern.png' },
      { id: 25, campName: '接送服务', spotName: '营地往返', campSiteName: '静谧湖畔营地', price: '¥30起/次', rating: '4.8', img: '/images/camp-lake.png' },
      { id: 26, campName: '儿童乐园', spotName: '亲子活动', campSiteName: '日落海滩度假村', price: '¥60起/次', rating: '4.7', img: '/images/camp-beach.png' },
      { id: 27, campName: '户外电影', spotName: '星空放映', campSiteName: '云端山巅营地', price: '¥20起/次', rating: '4.9', img: '/images/camp-alps.png' },
      { id: 28, campName: '早餐服务', spotName: '营养早餐', campSiteName: '松岭森林营地', price: '¥35起/次', rating: '4.8', img: '/images/camp-forest.png' }
    ],
    clubSpots: [
      { id: 30, clubName: '户外探险俱乐部', tags: ['金牌俱乐部', '人气推荐'], price: '入会免费', img: '/images/camp-alps.png' },
      { id: 31, clubName: '森林徒步俱乐部', tags: ['精选俱乐部'], price: '¥199/年', img: '/images/camp-modern.png' },
      { id: 32, clubName: '星空露营俱乐部', tags: ['金牌俱乐部', '新晋'], price: '¥299/年', img: '/images/camp-forest.png' },
      { id: 33, clubName: '亲子露营俱乐部', tags: ['人气推荐'], price: '¥159/年', img: '/images/camp-beach.png' },
      { id: 34, clubName: '摄影爱好者俱乐部', tags: ['精选俱乐部'], price: '¥99/年', img: '/images/camp-lake.png' },
      { id: 35, clubName: '越野车俱乐部', tags: ['金牌俱乐部'], price: '¥399/年', img: '/images/camp-alps.png' },
      { id: 36, clubName: '钓鱼俱乐部', tags: ['新晋'], price: '¥129/年', img: '/images/camp-lake.png' },
      { id: 37, clubName: '观鸟俱乐部', tags: ['精选俱乐部'], price: '¥89/年', img: '/images/camp-forest.png' },
      { id: 38, clubName: '骑行俱乐部', tags: ['金牌俱乐部'], price: '¥249/年', img: '/images/camp-modern.png' }
    ],
    nearbySpotsDisplay: [],
    campsDisplay: [],
    serviceSpotsDisplay: [],
    clubSpotsDisplay: [],
    favSpotIds: [],
    favCampIds: [],
    showSearch: false,
    searchKeyword: '',
    searchResults: { camps: [], spots: [], experiences: [] },
    favServiceIds: [],
    favClubIds: []
  },
  _refreshFavIds() {
    const fav = require('../../utils/fav.js')
    const list = fav.getList()
    this.setData({
      favSpotIds: (list.spot || []).map(x => x.id),
      favCampIds: (list.camp || []).map(x => x.id),
      favServiceIds: (list.service || []).map(x => x.id),
      favClubIds: (list.club || []).map(x => x.id)
    })
  },
  onLoad() {
    const { nearbySpots, clubSpots } = this.data
    const campData = require('../../utils/campData.js')
    const experienceData = require('../../utils/experienceData.js')
    this.setData({
      nearbySpotsDisplay: nearbySpots.slice(0, 5),
      campsDisplay: (campData.ALL_CAMPS || []).slice(0, 5),
      serviceSpotsDisplay: (experienceData.ALL_EXPERIENCES || []).slice(0, 5),
      clubSpotsDisplay: clubSpots.slice(0, 5)
    })
    this._refreshFavIds()
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
    this._refreshFavIds()
  },
  onSearchTap() {
    this.setData({ showSearch: true, searchKeyword: '', searchResults: { camps: [], spots: [], experiences: [] } })
  },
  onSearchClose() {
    this.setData({ showSearch: false })
  },
  onSearchFocus() {},
  onSearchInput(e) {
    const keyword = (e.detail.value || '').trim()
    const searchData = require('../../utils/searchData.js')
    const searchResults = searchData.search(keyword)
    this.setData({ searchKeyword: e.detail.value, searchResults })
  },
  onSearchClear() {
    this.setData({ searchKeyword: '', searchResults: { camps: [], spots: [], experiences: [] } })
  },
  onSearchResultTap(e) {
    const { type, id } = e.currentTarget.dataset
    this.setData({ showSearch: false })
    if (type === 'camp') wx.reLaunch({ url: '/pages/camp-detail/camp-detail?id=' + id })
    else if (type === 'service') wx.reLaunch({ url: '/pages/experience-detail/experience-detail?id=' + id })
    else wx.reLaunch({ url: '/pages/detail/detail?id=' + id })
  },
  onCardTap(e) { wx.reLaunch({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id }) },
  onNearbyCardTap(e) { wx.reLaunch({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id }) },
  onCampCardTap(e) { wx.reLaunch({ url: '/pages/camp-detail/camp-detail?id=' + e.currentTarget.dataset.id }) },
  onServiceCardTap(e) { wx.reLaunch({ url: '/pages/experience-detail/experience-detail?id=' + e.currentTarget.dataset.id }) },
  onClubCardTap(e) {
    const id = e.currentTarget.dataset.id
    if (id != null) wx.navigateTo({ url: '/pages/club-detail/club-detail?id=' + id })
    else wx.switchTab({ url: '/pages/club/club' })
  },
  onClubMoreTap() { wx.switchTab({ url: '/pages/club/club' }) },
  onHotSpotsMoreTap() {
    wx.setStorageSync('exploreInit', { filterExploreType: '营位', selectedCat: '热门' })
    wx.switchTab({ url: '/pages/explore/explore' })
  },
  onNearbyCampsMoreTap() {
    wx.setStorageSync('exploreInit', { filterExploreType: '营地', selectedCat: '附近' })
    wx.switchTab({ url: '/pages/explore/explore' })
  },
  onExperiencesMoreTap() {
    wx.setStorageSync('exploreInit', { filterExploreType: '体验', selectedCat: '全部' })
    wx.switchTab({ url: '/pages/explore/explore' })
  },
  onFavTap(e) {
    const { type, id } = e.currentTarget.dataset
    let item
    if (type === 'spot') {
      item = this.data.spots.find(x => x.id == id) || this.data.nearbySpotsDisplay.find(x => x.id == id)
      if (!item) return
      const normalized = { id: item.id, campName: item.campName, spotName: item.spotName, location: item.location, price: item.price || (item.priceNum + (item.priceUnit || '')), img: item.img }
      require('../../utils/fav.js').toggle(normalized, 'spot')
    } else if (type === 'camp') {
      item = this.data.campsDisplay.find(x => x.id == id)
      if (!item) return
      const img = (item.imgs && item.imgs[0]) || '/images/camp-forest.png'
      require('../../utils/fav.js').toggle({ id: item.id, campName: item.campName, location: item.location, price: item.price, img }, 'camp')
    } else if (type === 'service') {
      item = this.data.serviceSpotsDisplay.find(x => x.id == id)
      if (!item) return
      const img = (item.imgs && item.imgs[0]) || '/images/camp-forest.png'
      require('../../utils/fav.js').toggle({ ...item, img, spotName: item.spotName || item.activityType || '' }, 'service')
    } else if (type === 'club') {
      item = this.data.clubSpotsDisplay.find(x => x.id == id)
      if (!item) return
      require('../../utils/fav.js').toggle(item, 'club')
    }
    this._refreshFavIds()
  }
})
