<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-icon">营</div>
        <h1>嘢营CAMPLARK</h1>
        <p class="subtitle">营地 / 俱乐部管理端</p>
      </div>
      <a-form :model="form" class="login-form" @submit.prevent="onSubmit">
        <a-form-item>
          <a-input v-model="form.username" placeholder="用户名" allow-clear @keyup.enter="onSubmit" />
        </a-form-item>
        <a-form-item>
          <a-input-password v-model="form.password" placeholder="密码" allow-clear @keyup.enter="onSubmit" />
        </a-form-item>
        <a-button type="primary" :loading="loading" :disabled="!isFormValid" :class="['login-btn', { 'login-btn--enabled': isFormValid }]" html-type="submit">
          登录
        </a-button>
      </a-form>
      <p class="hint">
        <a-button type="text" @click="$router.push('/apply')">申请入驻</a-button>
        <a-button type="text" @click="$router.push('/forgot-password')">忘记密码</a-button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import Message from '../utils/message'
import request from '../api/request'

const USERNAME_REG = /^[a-zA-Z0-9]+$/
const PASSWORD_REG = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;:'",.<>?\/\\~`]+$/

const router = useRouter()
const loading = ref(false)
const form = reactive({ username: '', password: '' })

const isFormValid = computed(() => {
  const u = form.username?.trim() || ''
  const p = form.password || ''
  return u.length > 0 && p.length > 0 && USERNAME_REG.test(u) && PASSWORD_REG.test(p)
})

async function onSubmit() {
  if (!isFormValid.value) return
  if (!USERNAME_REG.test(form.username.trim())) {
    Message.warning('账号仅支持字母和数字')
    return
  }
  if (!PASSWORD_REG.test(form.password)) {
    Message.warning('密码支持字母、数字和符号')
    return
  }
  loading.value = true
  try {
    const { data } = await request.post('/admin/auth/login', form)
    localStorage.setItem('admin_token', data.token)
    localStorage.setItem('admin_info', JSON.stringify(data))
    Message.success('登录成功')
    router.push('/')
  } catch (e) {
    Message.error(e.response?.data?.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f7f8fa; }
.login-card { width: 400px; padding: 48px 40px; border-radius: 4px; border: 1px solid #e5e6eb; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.04); }
.login-header { text-align: center; margin-bottom: 32px; }
.logo-icon { width: 56px; height: 56px; margin: 0 auto 16px; background: var(--primary); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #fff; }
.login-header h1 { margin: 0; font-size: 20px; font-weight: 600; color: #1d2129; }
.subtitle { margin: 8px 0 0; font-size: 14px; color: #86909c; }
.login-form :deep(.arco-form-item) { margin-bottom: 20px; }
.login-btn { width: 100%; height: 40px; font-size: 16px; border-radius: 4px; margin-top: 8px; }
.login-btn--enabled { background: var(--primary) !important; border-color: var(--primary) !important; }
.login-btn--enabled:hover { background: var(--primary-light) !important; border-color: var(--primary-light) !important; }
.hint { font-size: 14px; color: #86909c; text-align: center; margin: 24px 0 0; }
</style>
