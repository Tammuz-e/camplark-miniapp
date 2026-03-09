import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = 'camplark-jwt-secret'
const PORT = 8080

// 状态: 0=待审核 1=已通过/上架 2=已拒绝 3=已下架
let camps = [
  { id: 1, campName: '松岭森林营地', location: '黑龙江省伊春市乌伊岭区', terrainType: '森林', price: '¥780起/天', priceNum: 780, rating: '4.8', imgs: '["/images/camp-forest.png"]', status: 1, applyTime: '2024-01-01T00:00:00Z', auditTime: null, contactPhone: '13800138001', contactName: '张经理', campType: '独立主理' },
  { id: 2, campName: '云顶草原营地', location: '内蒙古呼伦贝尔市陈巴尔虎旗', terrainType: '草原', price: '¥680起/天', priceNum: 680, rating: '4.9', imgs: '[]', status: 1, applyTime: '2024-02-10T00:00:00Z', auditTime: '2024-02-12T00:00:00Z', contactPhone: '13800138002', contactName: '李主管', campType: '连锁营地' },
  { id: 3, campName: '湖畔星空营地', location: '浙江省杭州市淳安县千岛湖', terrainType: '湖畔', price: '¥880起/天', priceNum: 880, rating: '4.7', imgs: '[]', status: 0, applyTime: '2024-03-01T00:00:00Z', auditTime: null, contactPhone: '13800138003', contactName: '王总', campType: '独立主理' },
  { id: 4, campName: '山野溪谷营地', location: '四川省阿坝州理县', terrainType: '山地', price: '¥720起/天', priceNum: 720, rating: '4.6', imgs: '[]', status: 2, applyTime: '2024-01-15T00:00:00Z', auditTime: '2024-01-18T00:00:00Z', auditReason: '资料不完整', contactPhone: '13800138004', contactName: '赵经理', campType: '独立主理' },
  { id: 5, campName: '海滨落日营地', location: '山东省青岛市黄岛区', terrainType: '海滨', price: '¥950起/天', priceNum: 950, rating: '4.5', imgs: '[]', status: 3, applyTime: '2023-12-01T00:00:00Z', auditTime: '2023-12-05T00:00:00Z', contactPhone: '13800138005', contactName: '孙主管', campType: '连锁营地' }
]
let spots = [
  { id: 1, campId: 1, campName: '松岭森林营地', spotName: 'A区1号营位', price: '¥900/天', priceNum: 900, rating: '4.8', imgs: '[]', status: 1, applyTime: '2024-01-01T00:00:00Z' },
  { id: 2, campId: 1, campName: '松岭森林营地', spotName: 'A区2号营位', price: '¥900/天', priceNum: 900, rating: '4.8', imgs: '[]', status: 1, applyTime: '2024-01-02T00:00:00Z' },
  { id: 3, campId: 1, campName: '松岭森林营地', spotName: 'B区木屋1号', price: '¥1200/天', priceNum: 1200, rating: '4.9', imgs: '[]', status: 1, applyTime: '2024-01-03T00:00:00Z' },
  { id: 4, campId: 1, campName: '松岭森林营地', spotName: 'C区帐篷区', price: '¥680/天', priceNum: 680, rating: '4.6', imgs: '[]', status: 0, applyTime: '2024-02-20T00:00:00Z' },
  { id: 5, campId: 2, campName: '云顶草原营地', spotName: '草原1号位', price: '¥750/天', priceNum: 750, rating: '4.9', imgs: '[]', status: 1, applyTime: '2024-02-15T00:00:00Z' },
  { id: 6, campId: 2, campName: '云顶草原营地', spotName: '草原2号位', price: '¥750/天', priceNum: 750, rating: '4.9', imgs: '[]', status: 1, applyTime: '2024-02-15T00:00:00Z' }
]
let experiences = [
  { id: 1, campId: 1, clubId: null, campName: '松岭森林营地', campSiteName: 'A区', activityType: '森林徒步', price: '¥198/人', priceNum: 198, rating: '4.8', imgs: '[]', status: 1, applyTime: '2024-01-05T00:00:00Z' },
  { id: 2, campId: 1, clubId: null, campName: '松岭森林营地', campSiteName: 'B区', activityType: '篝火晚会', price: '¥88/人', priceNum: 88, rating: '4.7', imgs: '[]', status: 1, applyTime: '2024-01-06T00:00:00Z' },
  { id: 3, campId: 2, clubId: null, campName: '云顶草原营地', campSiteName: '主区', activityType: '骑马体验', price: '¥268/人', priceNum: 268, rating: '4.9', imgs: '[]', status: 1, applyTime: '2024-02-16T00:00:00Z' },
  { id: 4, campId: null, clubId: 1, campName: '', campSiteName: '', activityType: '荒野求生训练营', price: '¥599/人', priceNum: 599, rating: '4.8', imgs: '[]', status: 1, applyTime: '2024-02-01T00:00:00Z' },
  { id: 5, campId: 1, clubId: null, campName: '松岭森林营地', campSiteName: 'C区', activityType: '观星活动', price: '¥128/人', priceNum: 128, rating: '4.6', imgs: '[]', status: 0, applyTime: '2024-03-01T00:00:00Z' }
]
let clubs = [
  { id: 1, clubName: '荒野探险俱乐部', price: '年费¥299', priceNum: 299, members: 128, imgs: '[]', status: 1, applyTime: '2024-01-20T00:00:00Z', auditTime: '2024-01-22T00:00:00Z', contactName: '周会长', contactPhone: '13800138101' },
  { id: 2, clubName: '亲子露营俱乐部', price: '年费¥199', priceNum: 199, members: 256, imgs: '[]', status: 1, applyTime: '2024-02-01T00:00:00Z', auditTime: '2024-02-03T00:00:00Z', contactName: '吴经理', contactPhone: '13800138102' },
  { id: 3, clubName: '摄影爱好者联盟', price: '年费¥399', priceNum: 399, members: 89, imgs: '[]', status: 0, applyTime: '2024-03-05T00:00:00Z', auditTime: null, contactName: '郑主席', contactPhone: '13800138103' }
]
let orders = [
  { id: 1, orderNo: 'O20240301001', spotId: 1, campId: 1, campName: '松岭森林营地', spotName: 'A区1号营位', img: null, checkIn: '2024-03-15', checkOut: '2024-03-17', nights: 2, guests: 4, totalPrice: 1800, bookerName: '张三', contactPhone: '13912345678', openId: 'oDemo001', status: '待入营', createTime: '2024-03-01T10:00:00Z' },
  { id: 2, orderNo: 'O20240302002', spotId: 1, campId: 1, campName: '松岭森林营地', spotName: 'A区1号营位', img: null, checkIn: '2024-03-08', checkOut: '2024-03-10', nights: 2, guests: 2, totalPrice: 1800, bookerName: '李四', contactPhone: '13987654321', openId: 'oDemo002', status: '已入营', verifyTime: '2024-03-08T14:00:00Z', verifyBy: 'camp1', createTime: '2024-02-28T09:00:00Z' },
  { id: 3, orderNo: 'O20240225003', spotId: 2, campId: 1, campName: '松岭森林营地', spotName: 'A区2号营位', img: null, checkIn: '2024-02-28', checkOut: '2024-03-01', nights: 1, guests: 3, totalPrice: 900, bookerName: '王五', contactPhone: '13811112222', openId: 'oDemo003', status: '已退房', verifyTime: '2024-02-28T15:00:00Z', checkoutTime: '2024-03-01T11:00:00Z', createTime: '2024-02-25T16:00:00Z' },
  { id: 4, orderNo: 'O20240303004', spotId: 5, campId: 2, campName: '云顶草原营地', spotName: '草原1号位', img: null, checkIn: '2024-03-20', checkOut: '2024-03-22', nights: 2, guests: 6, totalPrice: 1500, bookerName: '赵六', contactPhone: '13722223333', openId: 'oDemo004', status: '待入营', createTime: '2024-03-03T11:00:00Z' },
  { id: 5, orderNo: 'O20240220005', spotId: 1, campId: 1, campName: '松岭森林营地', spotName: 'A区1号营位', img: null, checkIn: '2024-02-25', checkOut: '2024-02-27', nights: 2, guests: 2, totalPrice: 1800, bookerName: '张三', contactPhone: '13912345678', openId: 'oDemo001', status: '已取消', createTime: '2024-02-20T08:00:00Z' }
]
let admins = [
  { id: 1, username: 'admin', passwordHash: bcrypt.hashSync('admin123', 10), type: 'platform', campId: null, clubId: null, contactPhone: '13800138000' },
  { id: 2, username: 'camp1', passwordHash: bcrypt.hashSync('camp123', 10), type: 'camp', campId: 1, clubId: null },
  { id: 3, username: 'camp2', passwordHash: bcrypt.hashSync('camp123', 10), type: 'camp', campId: 2, clubId: null },
  { id: 4, username: 'club1', passwordHash: bcrypt.hashSync('club123', 10), type: 'club', campId: null, clubId: 1 }
]
let users = [] // 从订单中收集 openId+bookerName+contactPhone

let idSeq = { camp: 6, spot: 7, exp: 6, club: 4, order: 6, admin: 5 }

// 短信验证码存储（内存，生产环境可用 Redis）
const smsStore = new Map()
const SMS_TTL = 5 * 60 * 1000      // 5分钟
const SMS_COOLDOWN = 60 * 1000     // 60秒内不可重复发送

function authGuard(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: '未登录' })
  try {
    req.auth = jwt.verify(auth.slice(7), JWT_SECRET)
    next()
  } catch { res.status(401).json({ message: '登录已过期' }) }
}

// ========== 短信验证码 ==========
app.post('/api/public/sms/send', (req, res) => {
  const { phone } = req.body || {}
  const phoneStr = String(phone || '').trim()
  if (!/^1[3-9]\d{9}$/.test(phoneStr)) {
    return res.status(400).json({ message: '请输入正确的手机号' })
  }
  const last = smsStore.get(phoneStr)
  if (last && Date.now() - last.sentAt < SMS_COOLDOWN) {
    const sec = Math.ceil((SMS_COOLDOWN - (Date.now() - last.sentAt)) / 1000)
    return res.status(429).json({ message: `请${sec}秒后再试` })
  }
  const code = String(Math.floor(100000 + Math.random() * 900000))
  smsStore.set(phoneStr, { code, expiresAt: Date.now() + SMS_TTL, sentAt: Date.now() })
  // 开发环境：不真正发短信，控制台输出；生产环境需对接短信服务商
  console.log(`[SMS] ${phoneStr} 验证码: ${code} (有效期5分钟)`)
  res.json({ message: '验证码已发送' })
})

function verifySmsCode(phone, code) {
  if (!phone || !code) return false
  const v = smsStore.get(String(phone).trim())
  if (!v) return false
  if (Date.now() > v.expiresAt) return false
  return v.code === String(code).trim()
}

function getAdminBoundPhone(admin) {
  if (admin.contactPhone) return admin.contactPhone
  if (admin.campId) {
    const camp = camps.find(c => c.id === admin.campId)
    return camp?.contactPhone || ''
  }
  if (admin.clubId) {
    const club = clubs.find(c => c.id === admin.clubId)
    return club?.contactPhone || ''
  }
  return ''
}

// 重置密码验证码存储
const resetStore = new Map()
const RESET_TTL = 10 * 60 * 1000  // 10分钟
const RESET_COOLDOWN = 60 * 1000  // 60秒

// ========== 忘记密码 / 重置密码 ==========
app.post('/api/public/password/reset-request', (req, res) => {
  const { username, phone } = req.body || {}
  const usernameStr = String(username || '').trim()
  const phoneStr = String(phone || '').trim()
  if (!usernameStr) return res.status(400).json({ message: '请输入用户名' })
  if (!/^1[3-9]\d{9}$/.test(phoneStr)) return res.status(400).json({ message: '请输入正确的手机号' })

  const admin = admins.find(a => a.username === usernameStr)
  if (!admin) return res.status(400).json({ message: '账号不存在' })

  const boundPhone = getAdminBoundPhone(admin)
  if (!boundPhone || boundPhone !== phoneStr) return res.status(400).json({ message: '账号与手机号不匹配' })

  const last = resetStore.get(phoneStr)
  if (last && Date.now() - last.sentAt < RESET_COOLDOWN) {
    const sec = Math.ceil((RESET_COOLDOWN - (Date.now() - last.sentAt)) / 1000)
    return res.status(429).json({ message: `请${sec}秒后再试` })
  }

  const code = String(Math.floor(100000 + Math.random() * 900000))
  resetStore.set(phoneStr, { adminId: admin.id, code, expiresAt: Date.now() + RESET_TTL, sentAt: Date.now() })
  console.log(`[重置密码] ${phoneStr} 验证码: ${code} (有效期10分钟)`)
  res.json({ message: '验证码已发送' })
})

const PASSWORD_REG = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;:'",.<>?\/\\~`]+$/

app.post('/api/public/password/reset', (req, res) => {
  const { phone, code, newPassword } = req.body || {}
  const phoneStr = String(phone || '').trim()
  const codeStr = String(code || '').trim()
  if (!phoneStr || !codeStr) return res.status(400).json({ message: '请输入手机号和验证码' })
  if (!newPassword || !PASSWORD_REG.test(newPassword)) return res.status(400).json({ message: '密码支持字母、数字和符号' })

  const v = resetStore.get(phoneStr)
  if (!v) return res.status(400).json({ message: '验证码错误或已过期' })
  if (Date.now() > v.expiresAt) return res.status(400).json({ message: '验证码已过期，请重新获取' })
  if (v.code !== codeStr) return res.status(400).json({ message: '验证码错误' })

  const admin = admins.find(a => a.id === v.adminId)
  if (!admin) return res.status(400).json({ message: '账号不存在' })

  admin.passwordHash = bcrypt.hashSync(newPassword, 10)
  resetStore.delete(phoneStr)
  res.json({ message: '密码已重置，请使用新密码登录' })
})

// ========== 公开入驻申请（无需登录）==========
app.post('/api/public/camps/apply', (req, res) => {
  const body = req.body || {}
  const contactPhone = String(body.contactPhone || '').trim()
  const smsCode = body.smsCode
  if (!verifySmsCode(contactPhone, smsCode)) {
    return res.status(400).json({ message: '短信验证码错误或已过期，请重新获取' })
  }
  if (admins.some(a => a.username === (body.username || '').trim())) {
    return res.status(400).json({ message: '该账号已被注册' })
  }
  const campId = idSeq.camp
  const camp = {
    id: campId,
    campName: body.campName || '未命名',
    location: body.location || '',
    campType: body.campType || '独立主理',
    wechatId: body.wechatId || '',
    terrainType: '',
    price: '',
    priceNum: 0,
    rating: '0',
    imgs: body.imgs ? JSON.stringify(body.imgs) : '[]',
    status: 0,
    applyTime: new Date().toISOString(),
    auditTime: null,
    auditReason: null,
    contactName: body.contactName || '',
    contactPhone
  }
  camps.push(camp)
  idSeq.camp++

  const username = (body.username || '').trim()
  const password = body.password
  const adminId = idSeq.admin
  admins.push({
    id: adminId,
    username,
    passwordHash: bcrypt.hashSync(password, 10),
    type: 'camp',
    campId,
    clubId: null,
    contactPhone
  })
  idSeq.admin++

  smsStore.delete(contactPhone)
  res.json({ code: 0, data: camp, message: '申请已提交，请等待平台审核' })
})

app.post('/api/public/clubs/apply', (req, res) => {
  const body = req.body || {}
  const contactPhone = String(body.contactPhone || '').trim()
  const smsCode = body.smsCode
  if (!verifySmsCode(contactPhone, smsCode)) {
    return res.status(400).json({ message: '短信验证码错误或已过期，请重新获取' })
  }
  if (admins.some(a => a.username === (body.username || '').trim())) {
    return res.status(400).json({ message: '该账号已被注册' })
  }
  const clubId = idSeq.club
  const club = {
    id: clubId,
    clubName: body.clubName || '未命名',
    price: '',
    priceNum: 0,
    wechatId: body.wechatId || '',
    members: 0,
    imgs: body.imgs ? JSON.stringify(body.imgs) : '[]',
    status: 0,
    applyTime: new Date().toISOString(),
    auditTime: null,
    auditReason: null,
    contactName: body.contactName || '',
    contactPhone
  }
  clubs.push(club)
  idSeq.club++

  const username = (body.username || '').trim()
  const password = body.password
  const adminId = idSeq.admin
  admins.push({
    id: adminId,
    username,
    passwordHash: bcrypt.hashSync(password, 10),
    type: 'club',
    campId: null,
    clubId,
    contactPhone
  })
  idSeq.admin++

  smsStore.delete(contactPhone)
  res.json({ code: 0, data: club, message: '申请已提交，请等待平台审核' })
})

// 登录
app.post('/api/admin/auth/login', (req, res) => {
  const { username, password } = req.body || {}
  const admin = admins.find(a => a.username === username)
  if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
    return res.status(401).json({ message: '用户名或密码错误' })
  }
  const token = jwt.sign(
    { id: admin.id, username: admin.username, type: admin.type, campId: admin.campId, clubId: admin.clubId },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
  res.json({ token, adminId: admin.id, username: admin.username, type: admin.type, campId: admin.campId, clubId: admin.clubId })
})

// ========== 营地 ==========
// 入驻申请（营地方提交）
app.post('/api/admin/camps/apply', authGuard, (req, res) => {
  const body = req.body || {}
  const camp = {
    id: idSeq.camp++,
    campName: body.campName || '未命名',
    location: body.location || '',
    terrainType: body.terrainType || '',
    price: body.price || '',
    priceNum: Number(body.priceNum) || 0,
    rating: '0',
    imgs: body.imgs ? JSON.stringify(body.imgs) : '[]',
    status: 0,
    applyTime: new Date().toISOString(),
    auditTime: null,
    auditReason: null,
    applicant: req.auth.username
  }
  camps.push(camp)
  res.json({ code: 0, data: camp })
})

// 营地/俱乐部：获取当前登录者关联的营地或俱乐部
app.get('/api/admin/camps/me', authGuard, (req, res) => {
  if (req.auth.type !== 'camp' || !req.auth.campId) return res.status(403).json({ message: '非营地方账号' })
  const camp = camps.find(c => c.id == req.auth.campId)
  if (!camp) return res.status(404).json({ message: '营地不存在' })
  res.json({ code: 0, data: camp })
})
app.get('/api/admin/clubs/me', authGuard, (req, res) => {
  if (req.auth.type !== 'club' || !req.auth.clubId) return res.status(403).json({ message: '非俱乐部账号' })
  const club = clubs.find(c => c.id == req.auth.clubId)
  if (!club) return res.status(404).json({ message: '俱乐部不存在' })
  res.json({ code: 0, data: club })
})

// 平台：营地列表（含待审核）
app.get('/api/admin/camps', authGuard, (req, res) => {
  let list = [...camps]
  if (req.query.status !== undefined) list = list.filter(c => c.status === Number(req.query.status))
  list.sort((a, b) => new Date(b.applyTime || 0) - new Date(a.applyTime || 0))
  res.json({ code: 0, data: list })
})

// 平台：审核营地 通过/拒绝
app.post('/api/admin/camps/:id/audit', authGuard, (req, res) => {
  const camp = camps.find(c => c.id == req.params.id)
  if (!camp) return res.status(404).json({ message: '营地不存在' })
  if (camp.status !== 0) return res.status(400).json({ message: '该申请已处理' })
  const { pass, reason } = req.body || {}
  camp.status = pass ? 1 : 2
  camp.auditTime = new Date().toISOString()
  camp.auditReason = reason || null
  res.json({ code: 0, data: camp })
})

// 平台：上架/下架营地
app.post('/api/admin/camps/:id/status', authGuard, (req, res) => {
  const camp = camps.find(c => c.id == req.params.id)
  if (!camp) return res.status(404).json({ message: '营地不存在' })
  if (camp.status === 0 || camp.status === 2) return res.status(400).json({ message: '请先审核通过' })
  const { status } = req.body || {}
  camp.status = status === 1 ? 1 : 3
  res.json({ code: 0, data: camp })
})

// 平台：更新营地
app.put('/api/admin/camps/:id', authGuard, (req, res) => {
  const idx = camps.findIndex(c => c.id == req.params.id)
  if (idx < 0) return res.status(404).json({ message: '营地不存在' })
  const body = req.body || {}
  const fields = ['campName', 'location', 'terrainType', 'price', 'priceNum', 'imgs']
  fields.forEach(f => { if (body[f] !== undefined) camps[idx][f] = Array.isArray(body[f]) ? JSON.stringify(body[f]) : body[f] })
  res.json({ code: 0, data: camps[idx] })
})

// ========== 俱乐部 ==========
app.post('/api/admin/clubs/apply', authGuard, (req, res) => {
  const body = req.body || {}
  const club = {
    id: idSeq.club++,
    clubName: body.clubName || '未命名',
    price: body.price || '',
    priceNum: Number(body.priceNum) || 0,
    members: 0,
    imgs: body.imgs ? JSON.stringify(body.imgs) : '[]',
    status: 0,
    applyTime: new Date().toISOString(),
    auditTime: null,
    auditReason: null
  }
  clubs.push(club)
  res.json({ code: 0, data: club })
})

app.get('/api/admin/clubs', authGuard, (req, res) => {
  let list = [...clubs]
  if (req.query.status !== undefined) list = list.filter(c => c.status === Number(req.query.status))
  list.sort((a, b) => new Date(b.applyTime || 0) - new Date(a.applyTime || 0))
  res.json({ code: 0, data: list })
})

app.post('/api/admin/clubs/:id/audit', authGuard, (req, res) => {
  const club = clubs.find(c => c.id == req.params.id)
  if (!club) return res.status(404).json({ message: '俱乐部不存在' })
  if (club.status !== 0) return res.status(400).json({ message: '该申请已处理' })
  const { pass, reason } = req.body || {}
  club.status = pass ? 1 : 2
  club.auditTime = new Date().toISOString()
  club.auditReason = reason || null
  res.json({ code: 0, data: club })
})

app.post('/api/admin/clubs/:id/status', authGuard, (req, res) => {
  const club = clubs.find(c => c.id == req.params.id)
  if (!club) return res.status(404).json({ message: '俱乐部不存在' })
  if (club.status === 0 || club.status === 2) return res.status(400).json({ message: '请先审核通过' })
  club.status = req.body?.status === 1 ? 1 : 3
  res.json({ code: 0, data: club })
})

app.put('/api/admin/clubs/:id', authGuard, (req, res) => {
  const idx = clubs.findIndex(c => c.id == req.params.id)
  if (idx < 0) return res.status(404).json({ message: '俱乐部不存在' })
  const body = req.body || {}
  ;['clubName', 'price', 'priceNum', 'imgs'].forEach(f => { if (body[f] !== undefined) clubs[idx][f] = Array.isArray(body[f]) ? JSON.stringify(body[f]) : body[f] })
  res.json({ code: 0, data: clubs[idx] })
})

// ========== 营位 ==========
// 营地方：提交营位（待审核）
app.post('/api/admin/spots', authGuard, (req, res) => {
  const body = req.body || {}
  const camp = camps.find(c => c.id == body.campId)
  if (!camp) return res.status(400).json({ message: '营地不存在' })
  const spot = {
    id: idSeq.spot++,
    campId: body.campId,
    campName: camp.campName,
    spotName: body.spotName || '未命名',
    price: body.price || '',
    priceNum: Number(body.priceNum) || 0,
    rating: '0',
    imgs: body.imgs ? JSON.stringify(body.imgs) : '[]',
    status: 0,
    applyTime: new Date().toISOString()
  }
  spots.push(spot)
  res.json({ code: 0, data: spot })
})

app.get('/api/admin/spots', authGuard, (req, res) => {
  let list = spots.map(s => ({ ...s, camp: camps.find(c => c.id === s.campId) ? { campName: camps.find(c => c.id === s.campId).campName } : null }))
  if (req.auth.campId) list = list.filter(s => s.campId == req.auth.campId)
  if (req.auth.clubId) list = []
  if (req.query.status !== undefined) list = list.filter(s => s.status === Number(req.query.status))
  if (req.query.campId) list = list.filter(s => s.campId == req.query.campId)
  res.json({ code: 0, data: list })
})

app.post('/api/admin/spots/:id/audit', authGuard, (req, res) => {
  const spot = spots.find(s => s.id == req.params.id)
  if (!spot) return res.status(404).json({ message: '营位不存在' })
  if (spot.status !== 0) return res.status(400).json({ message: '已处理' })
  const { pass } = req.body || {}
  spot.status = pass ? 1 : 2
  res.json({ code: 0, data: spot })
})

app.post('/api/admin/spots/:id/status', authGuard, (req, res) => {
  const spot = spots.find(s => s.id == req.params.id)
  if (!spot) return res.status(404).json({ message: '营位不存在' })
  if (spot.status === 0) return res.status(400).json({ message: '请先审核通过' })
  spot.status = req.body?.status === 1 ? 1 : 3
  res.json({ code: 0, data: spot })
})

app.put('/api/admin/spots/:id', authGuard, (req, res) => {
  const idx = spots.findIndex(s => s.id == req.params.id)
  if (idx < 0) return res.status(404).json({ message: '营位不存在' })
  const body = req.body || {}
  ;['spotName', 'price', 'priceNum', 'imgs'].forEach(f => { if (body[f] !== undefined) spots[idx][f] = Array.isArray(body[f]) ? JSON.stringify(body[f]) : body[f] })
  if (body.campId !== undefined) {
    const camp = camps.find(c => c.id == body.campId)
    spots[idx].campId = body.campId
    if (camp) spots[idx].campName = camp.campName
  }
  res.json({ code: 0, data: spots[idx] })
})

// ========== 体验 ==========
app.post('/api/admin/experiences', authGuard, (req, res) => {
  const body = req.body || {}
  const exp = {
    id: idSeq.exp++,
    campId: body.campId || null,
    clubId: body.clubId || null,
    campName: body.campName || '',
    campSiteName: body.campSiteName || '',
    activityType: body.activityType || '',
    price: body.price || '',
    priceNum: Number(body.priceNum) || 0,
    rating: '0',
    imgs: body.imgs ? JSON.stringify(body.imgs) : '[]',
    status: 0,
    applyTime: new Date().toISOString()
  }
  experiences.push(exp)
  res.json({ code: 0, data: exp })
})

app.get('/api/admin/experiences', authGuard, (req, res) => {
  let list = [...experiences]
  if (req.auth.campId) list = list.filter(e => e.campId == req.auth.campId)
  if (req.auth.clubId) list = list.filter(e => e.clubId == req.auth.clubId)
  if (req.query.status !== undefined) list = list.filter(e => e.status === Number(req.query.status))
  res.json({ code: 0, data: list })
})

app.post('/api/admin/experiences/:id/audit', authGuard, (req, res) => {
  const exp = experiences.find(e => e.id == req.params.id)
  if (!exp) return res.status(404).json({ message: '体验不存在' })
  if (exp.status !== 0) return res.status(400).json({ message: '已处理' })
  exp.status = req.body?.pass ? 1 : 2
  res.json({ code: 0, data: exp })
})

app.post('/api/admin/experiences/:id/status', authGuard, (req, res) => {
  const exp = experiences.find(e => e.id == req.params.id)
  if (!exp) return res.status(404).json({ message: '体验不存在' })
  if (exp.status === 0) return res.status(400).json({ message: '请先审核通过' })
  exp.status = req.body?.status === 1 ? 1 : 3
  res.json({ code: 0, data: exp })
})

app.put('/api/admin/experiences/:id', authGuard, (req, res) => {
  const idx = experiences.findIndex(e => e.id == req.params.id)
  if (idx < 0) return res.status(404).json({ message: '体验不存在' })
  const body = req.body || {}
  ;['campName', 'campSiteName', 'activityType', 'price', 'priceNum', 'campId', 'clubId', 'imgs'].forEach(f => { if (body[f] !== undefined) experiences[idx][f] = Array.isArray(body[f]) ? JSON.stringify(body[f]) : body[f] })
  res.json({ code: 0, data: experiences[idx] })
})

// ========== 订单 ==========
app.get('/api/admin/orders', authGuard, (req, res) => {
  let list = [...orders]
  if (req.auth.campId) list = list.filter(o => o.campId == req.auth.campId)
  if (req.auth.clubId) list = list.filter(o => o.clubId == req.auth.clubId)
  if (req.query.status) list = list.filter(o => o.status === req.query.status)
  list.sort((a, b) => new Date(b.createTime || 0) - new Date(a.createTime || 0))
  res.json({ code: 0, data: list })
})

// 核销（待入营 -> 已入营）
app.post('/api/admin/orders/:id/verify', authGuard, (req, res) => {
  const order = orders.find(o => o.id == req.params.id)
  if (!order) return res.status(404).json({ message: '订单不存在' })
  if (order.status !== '待入营') return res.status(400).json({ message: '该订单状态不可核销' })
  order.status = '已入营'
  order.verifyTime = new Date().toISOString()
  order.verifyBy = req.auth.username
  res.json({ code: 0, data: order })
})

// 退房（已入营 -> 已退房/已完成）
app.post('/api/admin/orders/:id/checkout', authGuard, (req, res) => {
  const order = orders.find(o => o.id == req.params.id)
  if (!order) return res.status(404).json({ message: '订单不存在' })
  if (order.status !== '已入营') return res.status(400).json({ message: '请先核销入营' })
  order.status = '已退房'
  order.checkoutTime = new Date().toISOString()
  res.json({ code: 0, data: order })
})

// 取消订单（待入营 -> 已取消）
app.post('/api/admin/orders/:id/cancel', authGuard, (req, res) => {
  const order = orders.find(o => o.id == req.params.id)
  if (!order) return res.status(404).json({ message: '订单不存在' })
  if (order.status !== '待入营') return res.status(400).json({ message: '仅待入营订单可取消' })
  order.status = '已取消'
  res.json({ code: 0, data: order })
})

// ========== 用户管理 ==========
function syncUsers() {
  const map = new Map()
  orders.forEach(o => {
    const key = o.openId || o.contactPhone || o.bookerName
    if (!key) return
    if (!map.has(key)) map.set(key, { openId: o.openId, bookerName: o.bookerName, contactPhone: o.contactPhone, orderCount: 0 })
    map.get(key).orderCount++
  })
  users = Array.from(map.values())
}

app.get('/api/admin/users', authGuard, (req, res) => {
  syncUsers()
  res.json({ code: 0, data: users })
})

// ========== 管理员 ==========
app.get('/api/admin/accounts', authGuard, (req, res) => {
  if (req.auth.type !== 'platform') return res.status(403).json({ message: '无权限' })
  const list = admins.map(a => ({ id: a.id, username: a.username, type: a.type, campId: a.campId, clubId: a.clubId }))
  res.json({ code: 0, data: list })
})

app.post('/api/admin/accounts', authGuard, (req, res) => {
  if (req.auth.type !== 'platform') return res.status(403).json({ message: '无权限' })
  const { username, password, type, campId, clubId } = req.body || {}
  if (!username || !password) return res.status(400).json({ message: '用户名和密码必填' })
  if (admins.some(a => a.username === username)) return res.status(400).json({ message: '用户名已存在' })
  const admin = {
    id: idSeq.admin++,
    username,
    passwordHash: bcrypt.hashSync(password, 10),
    type: type || 'camp',
    campId: campId || null,
    clubId: clubId || null
  }
  admins.push(admin)
  res.json({ code: 0, data: { id: admin.id, username: admin.username, type: admin.type, campId: admin.campId, clubId: admin.clubId } })
})

// ========== 小程序端 API ==========
app.get('/api/mp/camps', (_, res) => res.json({ code: 0, data: camps.filter(c => c.status === 1) }))
app.get('/api/mp/camps/:id', (req, res) => {
  const c = camps.find(x => x.id == req.params.id)
  res.json(c ? { code: 0, data: c } : { code: 404, message: '营地不存在' })
})

app.get('/api/mp/spots', (req, res) => {
  let list = spots.filter(s => s.status === 1)
  if (req.query.campId) list = list.filter(s => s.campId == req.query.campId)
  list = list.map(s => ({ ...s, camp: camps.find(c => c.id === s.campId) ? { campName: camps.find(c => c.id === s.campId).campName } : null }))
  res.json({ code: 0, data: list })
})
app.get('/api/mp/spots/:id', (req, res) => {
  const s = spots.find(x => x.id == req.params.id)
  if (s) s.camp = camps.find(c => c.id === s.campId) || null
  res.json(s ? { code: 0, data: s } : { code: 404, message: '营位不存在' })
})

app.get('/api/mp/experiences', (req, res) => {
  let list = experiences.filter(e => e.status === 1)
  if (req.query.campId) list = list.filter(e => e.campId == req.query.campId)
  if (req.query.clubId) list = list.filter(e => e.clubId == req.query.clubId)
  res.json({ code: 0, data: list })
})
app.get('/api/mp/experiences/:id', (req, res) => {
  const e = experiences.find(x => x.id == req.params.id)
  res.json(e ? { code: 0, data: e } : { code: 404, message: '体验不存在' })
})

app.get('/api/mp/clubs', (_, res) => res.json({ code: 0, data: clubs.filter(c => c.status === 1) }))
app.get('/api/mp/clubs/:id', (req, res) => {
  const c = clubs.find(x => x.id == req.params.id)
  res.json(c ? { code: 0, data: c } : { code: 404, message: '俱乐部不存在' })
})

app.get('/api/mp/search', (req, res) => {
  const k = (req.query.keyword || '').trim().toLowerCase()
  if (!k) return res.json({ code: 0, camps: [], spots: [], experiences: [] })
  const campList = camps.filter(c => (c.campName + ' ' + (c.location || '')).toLowerCase().includes(k))
  const spotList = spots.filter(s => (s.spotName + ' ' + (s.campName || '') + ' ' + (s.location || '')).toLowerCase().includes(k))
  const expList = experiences.filter(e => (e.campName + ' ' + (e.activityType || '')).toLowerCase().includes(k))
  res.json({ code: 0, camps: campList, spots: spotList, experiences: expList })
})

app.get('/api/mp/orders', (_, res) => res.json({ code: 0, data: orders.slice(0, 100) }))
app.post('/api/mp/orders', (req, res) => {
  const { spotId, bookerName, contactPhone, checkIn, checkOut, nights = 1 } = req.body || {}
  if (!spotId || !bookerName || !contactPhone) {
    return res.status(400).json({ code: 400, message: '缺少必填参数' })
  }
  const spot = spots.find(s => s.id == spotId)
  if (!spot) return res.status(404).json({ code: 404, message: '营地不存在' })
  const totalPrice = (spot.priceNum || 0) * (nights || 1)
  const order = {
    id: idSeq.order++,
    orderNo: 'O' + Date.now(),
    spotId,
    campId: spot.campId,
    campName: spot.campName,
    spotName: spot.spotName,
    img: spot.imgs ? JSON.parse(spot.imgs || '[]')[0] : null,
    checkIn: checkIn || '',
    checkOut: checkOut || '',
    nights: nights || 1,
    guests: req.body.guests || 1,
    totalPrice,
    bookerName,
    contactPhone,
    openId: req.body.openId || null,
    status: '待入营',
    createTime: new Date().toISOString()
  }
  orders.unshift(order)
  res.json({ code: 0, data: order })
})

app.get('/api', (_, res) => res.json({ name: '嘢营CAMPLARK API', version: '1.0', docs: '/api/health' }))
app.get('/api/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`嘢营CAMPLARK 后端已启动: http://localhost:${PORT}/api`)
  console.log('平台管理员: admin / admin123')
  console.log('营地管理员: camp1 / camp123 (营地ID=1)')
})
