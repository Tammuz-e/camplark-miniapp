const campData = require('../../utils/campData.js')

const AREA_ALL = '全部'

Page({
  data: {
    camp: null,
    spots: [],
    displayedSpots: [],
    spotAreas: [],
    activeArea: AREA_ALL,
    experiences: []
  },
  onLoad(options) {
    const id = options.id
    const camp = campData.getById(id)
    if (!camp) {
      wx.showToast({ title: '营地不存在', icon: 'none' })
      setTimeout(() => wx.reLaunch({ url: '/pages/explore/explore' }), 1500)
      return
    }
    const imgs = camp.imgs && camp.imgs.length ? camp.imgs : ['/images/camp-forest.png']
    const spots = campData.getSpotsByCampId(id)
    const experiences = campData.getExperiencesByCampId(id)
    const areas = [...new Set(spots.map(s => s.area || '未分区').filter(Boolean))]
    const spotAreas = areas.length ? [AREA_ALL, ...areas.sort()] : []
    const displayedSpots = spots
    this.setData({
      camp: { ...camp, imgs },
      spots,
      displayedSpots,
      spotAreas,
      activeArea: AREA_ALL,
      experiences
    })
    wx.setNavigationBarTitle({ title: camp.campName + ' - 营地详情' })
  },
  onAreaTabTap(e) {
    const area = e.currentTarget.dataset.area
    if (area == null || area === this.data.activeArea) return
    const { spots } = this.data
    const displayedSpots = area === AREA_ALL ? spots : spots.filter(s => (s.area || '未分区') === area)
    this.setData({ activeArea: area, displayedSpots })
  },
  onBack() {
    wx.reLaunch({ url: '/pages/explore/explore' })
  },
  onScrollToSpots() {
    const query = wx.createSelectorQuery().in(this)
    query.select('#spotSection').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      const rect = res[0]
      const scrollOffset = res[1]
      if (rect && scrollOffset) {
        wx.pageScrollTo({
          scrollTop: scrollOffset.scrollTop + rect.top - 48,
          duration: 300
        })
      }
    })
  },
  onSpotTap(e) {
    const id = e.currentTarget.dataset.id
    if (id != null) wx.reLaunch({ url: '/pages/detail/detail?id=' + id })
  },
  onExperienceTap(e) {
    const id = e.currentTarget.dataset.id
    if (id != null) wx.reLaunch({ url: '/pages/experience-detail/experience-detail?id=' + id })
  },
  onLocationTap() {
    const { camp } = this.data
    if (!camp || !camp.latitude || !camp.longitude) {
      wx.showToast({ title: '暂无位置信息', icon: 'none' })
      return
    }
    wx.openLocation({
      latitude: camp.latitude,
      longitude: camp.longitude,
      name: camp.campName || '营地',
      address: camp.location || ''
    })
  }
})
