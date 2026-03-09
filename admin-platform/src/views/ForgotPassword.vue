<template>
  <div class="forgot-page">
    <div class="forgot-card">
      <div class="forgot-header">
        <div class="logo-icon">营</div>
        <h1>忘记密码</h1>
        <p class="subtitle">通过绑定的手机号重置密码</p>
      </div>
      <template v-if="step === 1">
        <a-form :model="form" class="forgot-form">
          <a-form-item label="用户名">
            <a-input v-model="form.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="绑定的手机号">
            <div class="phone-row">
              <a-input v-model="form.phone" placeholder="请输入手机号" :max-length="11" style="flex:1" />
              <a-button :disabled="smsCooldown > 0" @click="onSendCode">{{ smsCooldown > 0 ? smsCooldown + '秒后重试' : '获取验证码' }}</a-button>
            </div>
          </a-form-item>
          <a-button type="primary" :loading="loading" class="submit-btn" @click="nextStep">下一步</a-button>
        </a-form>
      </template>
      <template v-else-if="step === 2">
        <a-form :model="form" class="forgot-form">
          <a-form-item label="验证码">
            <a-input v-model="form.code" placeholder="请输入短信验证码" :max-length="6" />
          </a-form-item>
          <a-form-item label="新密码">
            <a-input-password v-model="form.newPassword" placeholder="支持字母、数字和符号" />
          </a-form-item>
          <a-form-item label="确认新密码">
            <a-input-password v-model="form.confirmPassword" placeholder="请再次输入新密码" />
          </a-form-item>
          <a-button type="primary" :loading="loading" class="submit-btn" @click="onReset">重置密码</a-button>
        </a-form>
      </template>
      <p class="back-link">
        <a-button type="text" @click="$router.push('/login')">返回登录</a-button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Message from '../utils/message'
import { requestPasswordReset, resetPassword } from '../api/auth'

const router = useRouter()
const step = ref(1)
const loading = ref(false)
const smsCooldown = ref(0)
let smsTimer = null

const form = reactive({
  username: '',
  phone: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})

async function onSendCode() {
  const username = form.username?.trim() || ''
  const phone = form.phone?.trim() || ''
  if (!username) { Message.warning('请输入用户名'); return }
  if (!/^1[3-9]\d{9}$/.test(phone)) { Message.warning('请输入正确的手机号'); return }
  try {
    await requestPasswordReset(username, phone)
    Message.success('验证码已发送')
    smsCooldown.value = 60
    smsTimer = setInterval(() => {
      smsCooldown.value--
      if (smsCooldown.value <= 0 && smsTimer) { clearInterval(smsTimer); smsTimer = null }
    }, 1000)
  } catch (e) {
    let msg = '发送失败'
    if (!e.response) msg = '无法连接服务器，请确认 backend-node 已启动'
    else if (e.response?.data?.message) msg = e.response.data.message
    else if (e.response?.status === 404) msg = '接口不存在，请确认后端已更新并重启'
    Message.error(msg)
  }
}

function nextStep() {
  const username = form.username?.trim() || ''
  const phone = form.phone?.trim() || ''
  if (!username) { Message.warning('请输入用户名'); return }
  if (!/^1[3-9]\d{9}$/.test(phone)) { Message.warning('请输入正确的手机号'); return }
  step.value = 2
  form.code = ''
  form.newPassword = ''
  form.confirmPassword = ''
}

async function onReset() {
  const { phone, code, newPassword, confirmPassword } = form
  const phoneStr = phone?.trim() || ''
  const codeStr = code?.trim() || ''
  if (!phoneStr || !codeStr) { Message.warning('请输入验证码'); return }
  if (!newPassword) { Message.warning('请输入新密码'); return }
  if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;:'",.<>?\/\\~`]+$/.test(newPassword)) {
    Message.warning('密码支持字母、数字和符号')
    return
  }
  if (newPassword !== confirmPassword) { Message.warning('两次输入的密码不一致'); return }
  loading.value = true
  try {
    await resetPassword(phoneStr, codeStr, newPassword)
    Message.success('密码已重置，请使用新密码登录')
    router.push('/login')
  } catch (e) {
    Message.error(e.response?.data?.message || '重置失败')
  } finally {
    loading.value = false
  }
}

onUnmounted(() => { if (smsTimer) clearInterval(smsTimer) })
</script>

<style scoped>
.forgot-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f7f8fa; }
.forgot-card { width: 400px; padding: 48px 40px; border-radius: 4px; border: 1px solid #e5e6eb; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.04); }
.forgot-header { text-align: center; margin-bottom: 32px; }
.logo-icon { width: 56px; height: 56px; margin: 0 auto 16px; background: #165dff; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #fff; }
.forgot-header h1 { margin: 0; font-size: 20px; font-weight: 600; color: #1d2129; }
.subtitle { margin: 8px 0 0; font-size: 14px; color: #86909c; }
.forgot-form :deep(.arco-form-item) { margin-bottom: 20px; }
.phone-row { display: flex; gap: 12px; align-items: center; width: 100%; }
.submit-btn { width: 100%; height: 40px; font-size: 16px; border-radius: 4px; margin-top: 8px; }
.back-link { font-size: 14px; color: #86909c; text-align: center; margin: 24px 0 0; }
</style>
