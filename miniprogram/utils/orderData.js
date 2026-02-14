// 订单状态：待入营 | 已入营 | 已完成
const STATUS_PENDING = '待入营'
const STATUS_CHECKED_IN = '已入营'
const STATUS_COMPLETED = '已完成'

const ALL_ORDERS = [
  { id: 'O001', orderNo: '202502140001', spotId: 1, campName: '松岭森林营地', spotName: 'A区1号营位', img: '/images/camp-forest.png', checkIn: '2025-02-20', checkOut: '2025-02-22', nights: 2, guests: 3, totalPrice: 1800, status: STATUS_PENDING, createTime: '2025-02-14 10:30' },
  { id: 'O002', orderNo: '202502130002', spotId: 3, campName: '水晶湖豪华露营', spotName: '湖畔观景营位', img: '/images/camp-lake.png', checkIn: '2025-02-15', checkOut: '2025-02-17', nights: 2, guests: 2, totalPrice: 3600, status: STATUS_CHECKED_IN, createTime: '2025-02-13 14:20' },
  { id: 'O003', orderNo: '202502100003', spotId: 6, campName: '极简现代小屋', spotName: '独栋01号营位', img: '/images/camp-modern.png', checkIn: '2025-02-08', checkOut: '2025-02-10', nights: 2, guests: 4, totalPrice: 4400, status: STATUS_COMPLETED, createTime: '2025-02-05 09:15' },
  { id: 'O004', orderNo: '202502120004', spotId: 7, campName: '静谧湖畔营地', spotName: '湖景1号营位', img: '/images/camp-lake.png', checkIn: '2025-02-25', checkOut: '2025-02-27', nights: 2, guests: 2, totalPrice: 1100, status: STATUS_PENDING, createTime: '2025-02-12 16:45' },
  { id: 'O005', orderNo: '202502090005', spotId: 9, campName: '云端山巅营地', spotName: '山脊观星营位', img: '/images/camp-alps.png', checkIn: '2025-02-12', checkOut: '2025-02-14', nights: 2, guests: 2, totalPrice: 2400, status: STATUS_COMPLETED, createTime: '2025-02-07 11:00' }
]

function getAll() {
  return [...ALL_ORDERS]
}

function getByStatus(status) {
  return ALL_ORDERS.filter(o => o.status === status)
}

function getById(id) {
  return ALL_ORDERS.find(o => String(o.id) === String(id)) || null
}

module.exports = {
  STATUS_PENDING,
  STATUS_CHECKED_IN,
  STATUS_COMPLETED,
  ALL_ORDERS,
  getAll,
  getByStatus,
  getById
}
