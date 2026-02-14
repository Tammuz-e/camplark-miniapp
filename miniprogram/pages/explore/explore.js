Page({
  data: {
    selectedCat: '全部',
    showFilter: false,
    filterExploreType: '',
    filterFavorites: [],
    filterPriceMin: 0,
    filterPriceMax: 2000,
    filterAccom: '',
    filterGuestCount: 2,
    filterAmenities: [],
    filterActivities: [],
    filterOvernight: '',
    filterResultCount: 7,
    viewMode: 'list',
    mapCenter: { latitude: 30, longitude: 110 },
    mapScale: 12,
    camps: [
      { id: 1, campName: '松岭森林营地', location: '黑龙江省伊春市乌伊岭区林海街道翠云路88号', latitude: 48.22, longitude: 129.45, distance: 850, price: '¥780起/天', rating: '4.8', imgs: ['/images/camp-forest.png', '/images/camp-lake.png', '/images/camp-alps.png', '/images/camp-beach.png', '/images/camp-modern.png'], _type: 'camp', terrainType: '森林' },
      { id: 2, campName: '水晶湖豪华露营', location: '四川省阿坝州九寨沟县漳扎镇湖畔路168号', latitude: 33.22, longitude: 103.92, distance: 1200, price: '¥1600起/天', rating: '4.9', imgs: ['/images/camp-lake.png', '/images/camp-forest.png', '/images/camp-beach.png', '/images/camp-alps.png', '/images/camp-modern.png'], _type: 'camp', terrainType: '湖畔' },
      { id: 3, campName: '阿尔卑斯山基地', location: '云南省迪庆州德钦县升平镇梅里雪山观景台东侧', latitude: 28.48, longitude: 98.91, distance: 2500, price: '¥1100起/天', rating: '4.8', imgs: ['/images/camp-alps.png', '/images/camp-forest.png', '/images/camp-lake.png', '/images/camp-beach.png', '/images/camp-modern.png'], _type: 'camp', terrainType: '山地' },
      { id: 4, campName: '日落海滩度假村', location: '海南省三亚市海棠区海棠湾镇椰林路228号', latitude: 18.32, longitude: 109.75, distance: 500, price: '¥880起/天', rating: '4.7', imgs: ['/images/camp-beach.png', '/images/camp-lake.png', '/images/camp-forest.png', '/images/camp-alps.png', '/images/camp-modern.png'], _type: 'camp', terrainType: '海滩' },
      { id: 5, campName: '极简现代小屋', location: '浙江省杭州市余杭区径山镇双溪路66号', latitude: 30.42, longitude: 119.92, distance: 320, price: '¥2000起/天', rating: '4.9', imgs: ['/images/camp-modern.png', '/images/camp-forest.png', '/images/camp-lake.png', '/images/camp-alps.png', '/images/camp-beach.png'], _type: 'camp', terrainType: '森林' },
      { id: 6, campName: '静谧湖畔营地', location: '河北省承德市围场县塞罕坝机械林场月亮湖景区', latitude: 42.31, longitude: 117.74, distance: 1800, price: '¥500起/天', rating: '4.6', imgs: ['/images/camp-lake.png', '/images/camp-beach.png', '/images/camp-forest.png', '/images/camp-alps.png', '/images/camp-modern.png'], _type: 'camp', terrainType: '湖畔' },
      { id: 7, campName: '云端山巅营地', location: '四川省甘孜州泸定县磨西镇海螺沟冰川森林公园内', latitude: 29.58, longitude: 102.06, distance: 5200, price: '¥1200起/天', rating: '4.9', imgs: ['/images/camp-alps.png', '/images/camp-modern.png', '/images/camp-forest.png', '/images/camp-lake.png', '/images/camp-beach.png'], _type: 'camp', terrainType: '山地' }
    ],
    spots: [
      { id: 101, campName: 'A区1号营位 · 松岭森林营地', spotName: 'A区1号营位', location: '黑龙江省伊春市乌伊岭区', latitude: 48.22, longitude: 129.45, distance: 850, price: '¥900/天', rating: '4.8', imgs: ['/images/camp-forest.png', '/images/camp-lake.png'], _type: 'spot', terrainType: '森林' },
      { id: 102, campName: '湖畔观景营位 · 水晶湖豪华露营', spotName: '湖畔观景营位', location: '四川省阿坝州九寨沟县', latitude: 33.22, longitude: 103.92, distance: 1200, price: '¥1800/天', rating: '4.9', imgs: ['/images/camp-lake.png', '/images/camp-forest.png'], _type: 'spot', terrainType: '湖畔' },
      { id: 103, campName: '雪山观景营位 · 阿尔卑斯山基地', spotName: '雪山观景营位', location: '云南省迪庆州德钦县', latitude: 28.48, longitude: 98.91, distance: 2500, price: '¥1200/天', rating: '4.7', imgs: ['/images/camp-alps.png', '/images/camp-forest.png'], _type: 'spot', terrainType: '山地' },
      { id: 104, campName: '沙滩A区营位 · 日落海滩度假村', spotName: '沙滩A区营位', location: '海南省三亚市海棠区', latitude: 18.32, longitude: 109.75, distance: 500, price: '¥950/天', rating: '4.6', imgs: ['/images/camp-beach.png', '/images/camp-lake.png'], _type: 'spot', terrainType: '海滩' },
      { id: 105, campName: '独栋01号营位 · 极简现代小屋', spotName: '独栋01号营位', location: '浙江省杭州市余杭区', latitude: 30.42, longitude: 119.92, distance: 320, price: '¥2200/天', rating: '5', imgs: ['/images/camp-modern.png', '/images/camp-forest.png'], _type: 'spot', terrainType: '森林' },
      { id: 106, campName: '湖景1号营位 · 静谧湖畔营地', spotName: '湖景1号营位', location: '河北省承德市围场县', latitude: 42.31, longitude: 117.74, distance: 1800, price: '¥550/天', rating: '4.6', imgs: ['/images/camp-lake.png', '/images/camp-beach.png'], _type: 'spot', terrainType: '湖畔' },
      { id: 107, campName: '山脊观星营位 · 云端山巅营地', spotName: '山脊观星营位', location: '四川省甘孜州泸定县', latitude: 29.58, longitude: 102.06, distance: 5200, price: '¥1300/天', rating: '4.9', imgs: ['/images/camp-alps.png', '/images/camp-modern.png'], _type: 'spot', terrainType: '山地' }
    ],
    experiences: [
      { id: 201, campName: '森林徒步体验', campSiteName: '松岭森林营地', location: '黑龙江省伊春市乌伊岭区', latitude: 48.22, longitude: 129.45, distance: 850, price: '¥120/人', rating: '4.9', imgs: ['/images/camp-forest.png', '/images/camp-alps.png'], _type: 'service', activityType: '徒步' },
      { id: 202, campName: '湖畔钓鱼体验', campSiteName: '水晶湖豪华露营', location: '四川省阿坝州九寨沟县', latitude: 33.22, longitude: 103.92, distance: 1200, price: '¥80/次', rating: '4.8', imgs: ['/images/camp-lake.png', '/images/camp-beach.png'], _type: 'service', activityType: '钓鱼' },
      { id: 203, campName: '山地骑行体验', campSiteName: '阿尔卑斯山基地', location: '云南省迪庆州德钦县', latitude: 28.48, longitude: 98.91, distance: 2500, price: '¥150/天', rating: '4.7', imgs: ['/images/camp-alps.png', '/images/camp-modern.png'], _type: 'service', activityType: '骑行' },
      { id: 204, campName: '海滩游泳体验', campSiteName: '日落海滩度假村', location: '海南省三亚市海棠区', latitude: 18.32, longitude: 109.75, distance: 500, price: '¥60/人', rating: '4.6', imgs: ['/images/camp-beach.png', '/images/camp-lake.png'], _type: 'service', activityType: '游泳' },
      { id: 205, campName: '星空观星体验', clubName: '星空露营俱乐部', location: '四川省甘孜州泸定县', latitude: 29.58, longitude: 102.06, distance: 5200, price: '¥50/人', rating: '4.9', imgs: ['/images/camp-alps.png', '/images/camp-forest.png'], _type: 'service', activityType: '观星' },
      { id: 206, campName: '湖畔露营烧烤', campSiteName: '静谧湖畔营地', location: '河北省承德市围场县', latitude: 42.31, longitude: 117.74, distance: 1800, price: '¥180/组', rating: '4.8', imgs: ['/images/camp-lake.png', '/images/camp-beach.png'], _type: 'service', activityType: '烧烤' },
      { id: 207, campName: '户外电影放映', clubName: '户外探险俱乐部', location: '浙江省杭州市余杭区', latitude: 30.42, longitude: 119.92, distance: 320, price: '¥20/人', rating: '4.7', imgs: ['/images/camp-modern.png', '/images/camp-forest.png'], _type: 'service', activityType: '电影' }
    ],
    catTabs: ['全部', '热门', '附近', '森林', '湖畔', '山地', '海滩'],
    campsDisplay: [],
    mapMarkers: [],
    selectedCamp: null,
    favCampIds: [],
    showSearch: false,
    searchKeyword: '',
    searchResults: { camps: [], spots: [], experiences: [] },
    favSpotIds: [],
    favServiceIds: []
  },
  _refreshFavIds() {
    const fav = require('../../utils/fav.js')
    const list = fav.getList()
    this.setData({
      favCampIds: (list.camp || []).map(x => x.id),
      favSpotIds: (list.spot || []).map(x => x.id),
      favServiceIds: (list.service || []).map(x => x.id)
    })
  },
  onLoad() {
    this._updateCampsDisplay()
    this._refreshFavIds()
    this._getMyLocation()
  },
  _getMyLocation(cb) {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          mapCenter: { latitude: res.latitude, longitude: res.longitude },
          mapScale: 12,
          myLocation: { latitude: res.latitude, longitude: res.longitude }
        })
        cb && cb(res)
      },
      fail: (err) => {
        const msg = (err && err.errMsg) || ''
        const isAuthDeny = /auth deny|authorize|denied/i.test(msg)
        wx.showModal({
          title: '定位失败',
          content: isAuthDeny
            ? '需要位置权限才能定位，请点击「去设置」开启'
            : `定位失败：${msg || '请检查是否开启定位、网络正常，或在小程序后台申请定位接口'}`,
          confirmText: '去设置',
          cancelText: '取消',
          success: (modalRes) => {
            if (modalRes.confirm) {
              wx.openSetting()
            }
          }
        })
        cb && cb(null)
      }
    })
  },
  _updateCatTabs(cb) {
    const { filterExploreType } = this.data
    let tabs = ['全部', '热门', '附近']
    if (filterExploreType === '体验') {
      tabs = tabs.concat(['徒步', '游泳', '钓鱼', '骑行', '烧烤', '观星', '电影'])
    } else {
      tabs = tabs.concat(['森林', '湖畔', '山地', '海滩'])
    }
    this.setData({ catTabs: tabs, selectedCat: '全部' }, cb)
  },
  _updateCampsDisplay() {
    const { camps, spots, experiences, selectedCat, filterExploreType } = this.data
    let list = []
    if (filterExploreType === '营位') {
      list = (spots || []).slice()
      if (selectedCat && selectedCat !== '全部' && selectedCat !== '附近' && selectedCat !== '热门') {
        list = list.filter(x => (x.terrainType || '') === selectedCat)
      }
    } else if (filterExploreType === '体验') {
      list = (experiences || []).slice()
      if (selectedCat && selectedCat !== '全部' && selectedCat !== '附近' && selectedCat !== '热门') {
        list = list.filter(x => (x.activityType || '') === selectedCat)
      }
    } else if (filterExploreType === '营地') {
      list = (camps || []).slice()
      if (selectedCat && selectedCat !== '全部' && selectedCat !== '附近' && selectedCat !== '热门') {
        list = list.filter(x => (x.terrainType || '') === selectedCat)
      }
    } else {
      list = [].concat(camps || [], spots || [], experiences || [])
      if (selectedCat && selectedCat !== '全部' && selectedCat !== '附近' && selectedCat !== '热门') {
        list = list.filter(x => (x.terrainType || '') === selectedCat)
      }
    }
    if (selectedCat === '热门') {
      list = list.filter(x => parseFloat(x.rating || 0) >= 4.8).sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
    } else if (selectedCat === '附近') {
      list.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    }
    let campsForMap = (camps || []).slice()
    if (selectedCat && selectedCat !== '全部' && selectedCat !== '附近' && selectedCat !== '热门') {
      campsForMap = campsForMap.filter(x => (x.terrainType || '') === selectedCat)
    } else if (selectedCat === '热门') {
      campsForMap = campsForMap.filter(x => parseFloat(x.rating || 0) >= 4.8).sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
    } else if (selectedCat === '附近') {
      campsForMap.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    }
    const mapMarkers = campsForMap.map(c => ({
      id: c.id,
      latitude: c.latitude,
      longitude: c.longitude,
      title: c.campName,
      iconPath: '/images/map/marker.png',
      width: 24,
      height: 24,
      anchor: { x: 0.5, y: 1 }
    }))
    this.setData({ campsDisplay: list, mapMarkers })
  },
  onViewModeTap(e) {
    const mode = e.currentTarget.dataset.mode
    if (mode === 'map') {
      this._getMyLocation((res) => {
        this.setData({ viewMode: 'map' })
      })
    } else {
      this.setData({ viewMode: mode })
    }
  },
  onLocateTap() {
    this._getMyLocation((res) => {
      if (res) {
        this.setData({ mapScale: 12 })
        setTimeout(() => {
          const mapCtx = wx.createMapContext('exploreMap', this)
          mapCtx && mapCtx.moveToLocation()
        }, 150)
      }
    })
  },
  onMarkerTap(e) {
    const id = e.detail.markerId
    if (id == null) return
    const camp = (this.data.camps || []).find(c => c.id == id) || this.data.campsDisplay.find(c => c.id == id)
    if (camp) this.setData({ selectedCamp: camp })
  },
  onCloseCampPanel() {
    this.setData({ selectedCamp: null })
  },
  onCampCardTap() {},
  onCampDetail() {
    const { selectedCamp } = this.data
    if (!selectedCamp) return
    this.setData({ selectedCamp: null })
    const t = selectedCamp._type
    if (t === 'camp') wx.reLaunch({ url: '/pages/camp-detail/camp-detail?id=' + selectedCamp.id })
    else if (t === 'service') wx.reLaunch({ url: '/pages/experience-detail/experience-detail?id=' + selectedCamp.id })
    else wx.reLaunch({ url: '/pages/detail/detail?id=' + selectedCamp.id })
  },
  onCatTap(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ selectedCat: cat }, () => this._updateCampsDisplay())
  },
  onFilterTap() {
    this.setData({ showFilter: true }, () => this._updateFilterResultCount())
  },
  onFilterExploreTypeTap(e) {
    const type = e.currentTarget.dataset.type
    this.setData({ filterExploreType: this.data.filterExploreType === type ? '' : type }, () => this._updateFilterResultCount())
  },
  onFilterOvernightTap(e) {
    const v = (e.currentTarget.dataset && e.currentTarget.dataset.overnight) || ''
    this.setData({ filterOvernight: this.data.filterOvernight === v ? '' : v }, () => this._updateFilterResultCount())
  },
  onCloseFilter() {
    this.setData({ showFilter: false })
  },
  onFilterFavoriteTap(e) {
    const name = e.currentTarget.dataset.name
    const arr = [...(this.data.filterFavorites || [])]
    const i = arr.indexOf(name)
    if (i >= 0) arr.splice(i, 1)
    else arr.push(name)
    this.setData({ filterFavorites: arr }, () => this._updateFilterResultCount())
  },
  onRangeTouchStart(e) {
    if (!e.touches || !e.touches[0]) return
    const that = this
    wx.createSelectorQuery().in(that).select('#rangeTrack').boundingClientRect().exec((res) => {
      if (!res || !res[0]) return
      const rect = res[0]
      const x = e.touches[0].clientX - rect.left
      const pct = Math.max(0, Math.min(1, x / rect.width))
      const minPct = (that.data.filterPriceMin || 0) / 2000
      const maxPct = (that.data.filterPriceMax || 2000) / 2000
      const drag = Math.abs(pct - minPct) < Math.abs(pct - maxPct) ? 'min' : 'max'
      that._rangeTrack = rect
      that._rangeDrag = drag
    })
  },
  onRangeTouchMove(e) {
    if (!this._rangeTrack || !this._rangeDrag || !e.touches || !e.touches[0]) return
    const rect = this._rangeTrack
    const x = e.touches[0].clientX - rect.left
    const pct = Math.max(0, Math.min(1, x / rect.width))
    const val = Math.round(pct * 2000 / 50) * 50
    let min = this.data.filterPriceMin || 0
    let max = this.data.filterPriceMax || 2000
    if (this._rangeDrag === 'min') {
      min = Math.min(val, max)
    } else {
      max = Math.max(val, min)
    }
    this.setData({ filterPriceMin: min, filterPriceMax: max }, () => this._updateFilterResultCount())
  },
  onRangeTouchEnd(e) {
    this._rangeDrag = null
    this._rangeTrack = null
  },
  onFilterAccomTap(e) {
    const type = e.currentTarget.dataset.type
    this.setData({ filterAccom: this.data.filterAccom === type ? '' : type }, () => this._updateFilterResultCount())
  },
  onFilterAmenityTap(e) {
    const name = e.currentTarget.dataset.name
    const arr = [...(this.data.filterAmenities || [])]
    const i = arr.indexOf(name)
    if (i >= 0) arr.splice(i, 1)
    else arr.push(name)
    this.setData({ filterAmenities: arr }, () => this._updateFilterResultCount())
  },
  onFilterReset() {
    this.setData({
      filterExploreType: '',
      filterFavorites: [],
      filterPriceMin: 0,
      filterPriceMax: 2000,
      filterAccom: '',
      filterGuestCount: 2,
      filterAmenities: [],
      filterActivities: [],
      filterOvernight: ''
    }, () => this._updateFilterResultCount())
  },
  onGuestMinus() {
    const n = Math.max(1, (this.data.filterGuestCount || 2) - 1)
    this.setData({ filterGuestCount: n }, () => this._updateFilterResultCount())
  },
  onGuestPlus() {
    const n = Math.min(10, (this.data.filterGuestCount || 2) + 1)
    this.setData({ filterGuestCount: n }, () => this._updateFilterResultCount())
  },
  onFilterActivityTap(e) {
    const name = e.currentTarget.dataset.name
    const arr = [...(this.data.filterActivities || [])]
    const i = arr.indexOf(name)
    if (i >= 0) arr.splice(i, 1)
    else arr.push(name)
    this.setData({ filterActivities: arr }, () => this._updateFilterResultCount())
  },
  _updateFilterResultCount() {
    const { camps, spots, experiences, filterExploreType, filterFavorites, filterPriceMin, filterPriceMax, filterAccom, filterAmenities, filterActivities, filterOvernight } = this.data
    const baseList = filterExploreType === '营位' ? (spots || []) : (filterExploreType === '体验' ? (experiences || []) : (filterExploreType === '营地' ? (camps || []) : [].concat(camps || [], spots || [], experiences || [])))
    let count = baseList.length
    const priceFiltered = (filterPriceMin || 0) > 0 || (filterPriceMax || 2000) < 2000
    const hasFilter = filterExploreType || filterFavorites?.length || filterAccom || filterAmenities?.length || filterActivities?.length || priceFiltered || filterOvernight
    if (hasFilter) {
      count = Math.max(1, Math.floor(baseList.length * 0.7))
    }
    this.setData({ filterResultCount: count })
  },
  onFilterConfirm() {
    this.setData({ showFilter: false })
    this._updateCatTabs(() => {
      this._updateCampsDisplay()
      wx.showToast({ title: '已应用筛选', icon: 'none' })
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    const init = wx.getStorageSync('exploreInit')
    if (init && (init.filterExploreType || init.selectedCat)) {
      wx.removeStorageSync('exploreInit')
      const filterExploreType = init.filterExploreType || ''
      const selectedCat = init.selectedCat || '全部'
      this.setData({ filterExploreType, selectedCat }, () => {
        this._updateCatTabs(() => {
          this.setData({ selectedCat }, () => this._updateCampsDisplay())
        })
      })
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
  onCardTap(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.campsDisplay.find(x => x.id == id)
    if (!item) return
    const t = item._type
    if (t === 'camp') wx.reLaunch({ url: '/pages/camp-detail/camp-detail?id=' + item.id })
    else if (t === 'service') wx.reLaunch({ url: '/pages/experience-detail/experience-detail?id=' + item.id })
    else wx.reLaunch({ url: '/pages/detail/detail?id=' + item.id })
  },
  onFavTap(e) {
    const { id, type } = e.currentTarget.dataset
    const item = this.data.campsDisplay.find(x => x.id == id)
    if (!item) return
    const fav = require('../../utils/fav.js')
    const favType = (type || item._type) === 'spot' ? 'spot' : ((type || item._type) === 'service' ? 'service' : 'camp')
    const img = (item.imgs && item.imgs[0]) ? item.imgs[0] : '/images/camp-forest.png'
    fav.toggle({ id: item.id, campName: item.campName, location: item.location, price: item.price, img }, favType)
    this._refreshFavIds()
  }
})
