<template>
  <div class="apply-page">
    <div class="apply-card">
      <template v-if="showSuccess">
        <div class="success-view">
          <div class="success-icon">✓</div>
          <h2>注册成功</h2>
          <p class="success-desc">{{ countdown }} 秒后自动登录</p>
          <div class="countdown-bar" :style="{ width: countdown * 20 + '%' }"></div>
        </div>
      </template>
      <template v-else>
      <div class="apply-header">
        <div class="logo-icon">营</div>
        <h1>入驻申请</h1>
        <p class="desc">填写信息申请营地或俱乐部入驻，审核通过后平台将联系您开通管理后台</p>
      </div>
      <a-tabs v-model:active-key="activeTab" class="apply-tabs">
        <a-tab-pane key="camp" title="营地入驻">
          <a-form :model="campForm" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" class="apply-form">
            <a-form-item label="账号" required><a-input v-model="campForm.username" placeholder="仅支持大小写字母和数字" /></a-form-item>
            <a-form-item label="密码" required><a-input-password v-model="campForm.password" placeholder="支持字母、数字和符号" /></a-form-item>
            <a-form-item label="确认密码" required><a-input-password v-model="campForm.passwordConfirm" placeholder="再次输入密码" /></a-form-item>
            <a-form-item label="营地名称" required><a-input v-model="campForm.campName" placeholder="如：松岭森林营地" /></a-form-item>
            <a-form-item label="营地类型" required>
              <a-radio-group v-model="campForm.campType">
                <a-radio value="独立主理">独立主理</a-radio>
                <a-radio value="连锁营地">连锁营地</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="所在地" required>
              <a-cascader v-model="campForm.region" :options="regionOptions" placeholder="请选择省/市/区" style="width:100%" allow-clear />
            </a-form-item>
            <a-form-item label="详细地址" required><a-textarea v-model="campForm.addressDetail" :auto-size="{ minRows: 2 }" placeholder="街道、门牌号等详细地址" /></a-form-item>
            <a-form-item label="联系人" required><a-input v-model="campForm.contactName" placeholder="联系人姓名" /></a-form-item>
            <a-form-item label="联系电话" required>
              <div class="phone-row">
                <a-input v-model="campForm.contactPhone" placeholder="用于审核联系" :max-length="11" style="flex:1" />
                <a-button :disabled="smsCooldown > 0" @click="onSendSms(campForm.contactPhone)">{{ smsCooldown > 0 ? smsCooldown + '秒后重试' : '获取验证码' }}</a-button>
              </div>
            </a-form-item>
            <a-form-item label="短信验证码" required><a-input v-model="campForm.smsCode" placeholder="请输入验证码" :max-length="6" /></a-form-item>
            <a-form-item label="微信号"><a-input v-model="campForm.wechatId" placeholder="选填" /></a-form-item>
            <div class="submit-wrap">
              <a-button type="primary" :loading="loading" @click="submitCamp">立即注册</a-button>
            </div>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="club" title="俱乐部入驻">
          <a-form :model="clubForm" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" class="apply-form">
            <a-form-item label="账号" required><a-input v-model="clubForm.username" placeholder="仅支持大小写字母和数字" /></a-form-item>
            <a-form-item label="密码" required><a-input-password v-model="clubForm.password" placeholder="支持字母、数字和符号" /></a-form-item>
            <a-form-item label="确认密码" required><a-input-password v-model="clubForm.passwordConfirm" placeholder="再次输入密码" /></a-form-item>
            <a-form-item label="俱乐部名称" required><a-input v-model="clubForm.clubName" placeholder="如：荒野探险俱乐部" /></a-form-item>
            <a-form-item label="联系人" required><a-input v-model="clubForm.contactName" placeholder="联系人姓名" /></a-form-item>
            <a-form-item label="联系电话" required>
              <div class="phone-row">
                <a-input v-model="clubForm.contactPhone" placeholder="用于审核联系" :max-length="11" style="flex:1" />
                <a-button :disabled="smsCooldown > 0" @click="onSendSms(clubForm.contactPhone)">{{ smsCooldown > 0 ? smsCooldown + '秒后重试' : '获取验证码' }}</a-button>
              </div>
            </a-form-item>
            <a-form-item label="短信验证码" required><a-input v-model="clubForm.smsCode" placeholder="请输入验证码" :max-length="6" /></a-form-item>
            <a-form-item label="微信号"><a-input v-model="clubForm.wechatId" placeholder="选填" /></a-form-item>
            <div class="submit-wrap">
              <a-button type="primary" :loading="loading" @click="submitClub">立即注册</a-button>
            </div>
          </a-form>
        </a-tab-pane>
      </a-tabs>
      <div class="footer">
        <a-button type="text" @click="$router.push('/login')">管理员登录</a-button>
      </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Message from '../utils/message'
import { applyCampPublic } from '../api/camp'
import { applyClubPublic } from '../api/club'
import { sendSms } from '../api/public'
import request from '../api/request'
import { pcaTextArr } from 'element-china-area-data'

/** 将 element-china-area-data 的 pcaTextArr 转为 Arco Cascader 需要的 { value, label, children } 格式 */
function toArcoCascaderOptions(arr) {
  if (!arr || !Array.isArray(arr)) return []
  return arr.map(item => {
    const label = item.label ?? item.value ?? ''
    const node = { value: label, label }
    if (item.children && item.children.length) {
      node.children = toArcoCascaderOptions(item.children)
    }
    return node
  })
}

const regionOptions = computed(() => toArcoCascaderOptions(pcaTextArr))

const router = useRouter()
const USERNAME_REG = /^[a-zA-Z0-9]+$/
const PASSWORD_REG = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;:'",.<>?\/\\~`]+$/

const activeTab = ref('camp')
const loading = ref(false)
const showSuccess = ref(false)
const countdown = ref(5)
const smsCooldown = ref(0)
let countdownTimer = null
let smsCooldownTimer = null
let pendingLogin = null

async function onSendSms(phone) {
  const phoneStr = String(phone || '').trim()
  if (!/^1[3-9]\d{9}$/.test(phoneStr)) {
    Message.warning('请输入正确的手机号')
    return
  }
  try {
    await sendSms({ phone: phoneStr })
    Message.success('验证码已发送')
    smsCooldown.value = 60
    smsCooldownTimer = setInterval(() => {
      smsCooldown.value--
      if (smsCooldown.value <= 0 && smsCooldownTimer) {
        clearInterval(smsCooldownTimer)
        smsCooldownTimer = null
      }
    }, 1000)
  } catch (e) {
    let msg = '发送失败'
    if (!e.response) msg = '无法连接服务器，请确认 backend-node 已启动'
    else if (e.response?.data?.message) msg = e.response.data.message
    else if (e.response?.status === 404) msg = '接口不存在，请确认后端已更新并重启'
    Message.error(msg)
  }
}

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
  if (smsCooldownTimer) clearInterval(smsCooldownTimer)
})

function goToSuccess(username, password) {
  showSuccess.value = true
  countdown.value = 5
  pendingLogin = { username, password }
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      countdownTimer = null
      doAutoLogin()
    }
  }, 1000)
}

async function doAutoLogin() {
  if (!pendingLogin) return
  const { username, password } = pendingLogin
  pendingLogin = null
  try {
    const { data } = await request.post('/admin/auth/login', { username, password })
    localStorage.setItem('admin_token', data.token)
    localStorage.setItem('admin_info', JSON.stringify(data))
    Message.success('登录成功')
    router.push('/')
  } catch (e) {
    Message.warning(e.response?.data?.message || '自动登录失败，请前往登录页手动登录')
    router.push('/login')
  }
}

const campForm = reactive({ username: '', password: '', passwordConfirm: '', campName: '', campType: '独立主理', region: [], addressDetail: '', contactName: '', contactPhone: '', smsCode: '', wechatId: '' })
const clubForm = reactive({ username: '', password: '', passwordConfirm: '', clubName: '', contactName: '', contactPhone: '', smsCode: '', wechatId: '' })

async function submitCamp() {
  const region = campForm.region || []
  const location = region.length ? region.filter(v => v && v !== '市辖区').join('') : ''
  if (!campForm.username?.trim() || !campForm.password || !campForm.campName || !campForm.campType || !location || !campForm.addressDetail?.trim() || !campForm.contactName || !campForm.contactPhone || !campForm.smsCode?.trim()) {
    Message.warning('请填写账号、密码、营地名称、营地类型、所在地、详细地址、联系人、联系电话和短信验证码')
    return
  }
  if (!USERNAME_REG.test(campForm.username.trim())) {
    Message.warning('账号仅支持大小写字母和数字')
    return
  }
  if (!PASSWORD_REG.test(campForm.password)) {
    Message.warning('密码仅支持字母、数字和常见符号')
    return
  }
  if (campForm.password !== campForm.passwordConfirm) {
    Message.warning('两次输入的密码不一致')
    return
  }
  loading.value = true
  try {
    const payload = {
      campName: campForm.campName,
      campType: campForm.campType,
      location: location + campForm.addressDetail.trim(),
      contactName: campForm.contactName,
      contactPhone: campForm.contactPhone,
      smsCode: campForm.smsCode.trim(),
      wechatId: campForm.wechatId || undefined,
      username: campForm.username.trim(),
      password: campForm.password
    }
    await applyCampPublic(payload)
    goToSuccess(campForm.username.trim(), campForm.password)
    Object.assign(campForm, { username: '', password: '', passwordConfirm: '', campName: '', campType: '独立主理', region: [], addressDetail: '', contactName: '', contactPhone: '', smsCode: '', wechatId: '' })
  } catch (e) {
    Message.error(e.response?.data?.message || '提交失败')
  } finally {
    loading.value = false
  }
}

async function submitClub() {
  if (!clubForm.username?.trim() || !clubForm.password || !clubForm.clubName || !clubForm.contactName || !clubForm.contactPhone || !clubForm.smsCode?.trim()) {
    Message.warning('请填写账号、密码、俱乐部名称、联系人、联系电话和短信验证码')
    return
  }
  if (!USERNAME_REG.test(clubForm.username.trim())) {
    Message.warning('账号仅支持大小写字母和数字')
    return
  }
  if (!PASSWORD_REG.test(clubForm.password)) {
    Message.warning('密码仅支持字母、数字和常见符号')
    return
  }
  if (clubForm.password !== clubForm.passwordConfirm) {
    Message.warning('两次输入的密码不一致')
    return
  }
  loading.value = true
  try {
    const payload = {
      clubName: clubForm.clubName,
      contactName: clubForm.contactName,
      contactPhone: clubForm.contactPhone,
      smsCode: clubForm.smsCode.trim(),
      wechatId: clubForm.wechatId || undefined,
      username: clubForm.username.trim(),
      password: clubForm.password
    }
    await applyClubPublic(payload)
    goToSuccess(clubForm.username.trim(), clubForm.password)
    Object.assign(clubForm, { username: '', password: '', passwordConfirm: '', clubName: '', contactName: '', contactPhone: '', smsCode: '', wechatId: '' })
  } catch (e) {
    Message.error(e.response?.data?.message || '提交失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.apply-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: #f7f8fa; }
.apply-card { width: 100%; max-width: 520px; padding: 40px; border-radius: 4px; border: 1px solid #e5e6eb; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.04); }
.apply-header { text-align: center; margin-bottom: 28px; }
.logo-icon { width: 56px; height: 56px; margin: 0 auto 16px; background: var(--primary); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #fff; }
.apply-header h1 { margin: 0; font-size: 20px; font-weight: 600; color: #1d2129; }
.desc { color: #86909c; font-size: 14px; margin: 8px 0 0; line-height: 1.6; }
.apply-tabs { margin-top: 12px; }
.apply-tabs :deep(.arco-tabs-header) { margin-bottom: 20px; }
.apply-form { margin-top: 20px; }
.apply-form :deep(.arco-form-item) { margin-bottom: 20px; }
.phone-row { display: flex; gap: 12px; align-items: center; width: 100%; }
.submit-wrap { margin-top: 28px; text-align: center; }
.footer { margin-top: 28px; text-align: center; }
.success-view { text-align: center; padding: 48px 24px; }
.success-icon { width: 72px; height: 72px; margin: 0 auto 24px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 700; color: #fff; }
.success-view h2 { margin: 0 0 12px; font-size: 20px; font-weight: 600; color: #1d2129; }
.success-desc { color: #86909c; font-size: 15px; margin: 0 0 24px; }
.countdown-bar { height: 4px; background: var(--primary); border-radius: 2px; margin: 0 auto; transition: width 1s linear; }
</style>
