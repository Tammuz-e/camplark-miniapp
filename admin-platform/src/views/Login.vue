<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-icon">营</div>
        <h1>嘢营CAMPLARK</h1>
        <p class="subtitle">平台管理端</p>
      </div>
      <a-form :model="form" class="login-form" @submit.prevent="onSubmit">
        <a-form-item>
          <a-input
            v-model="form.username"
            placeholder="请输入用户名"
            allow-clear
            @keyup.enter="onSubmit"
          >
            <template #prefix><icon-user /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-model="form.password"
            placeholder="请输入密码"
            allow-clear
            @keyup.enter="onSubmit"
          >
            <template #prefix><icon-lock /></template>
          </a-input-password>
        </a-form-item>
        <a-button type="primary" :loading="loading" class="login-btn" html-type="submit">
          登录
        </a-button>
      </a-form>
      <p class="hint">
        默认账号：admin / admin123 · <a-button type="text" @click="$router.push('/forgot-password')">忘记密码</a-button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon'
import Message from '../utils/message'
import { login } from '../api/auth'

const router = useRouter()
const loading = ref(false)
const form = reactive({ username: '', password: '' })

async function onSubmit() {
  const username = form.username?.trim() || ''
  const password = form.password || ''
  if (!username || !password) {
    Message.warning('请填写用户名和密码')
    return
  }
  loading.value = true
  try {
    const { data } = await login(username, password)
    localStorage.setItem('admin_token', data.token)
    localStorage.setItem('admin_info', JSON.stringify(data))
    Message.success('登录成功')
    router.push('/')
  } catch (e) {
    if (!e.response) {
      Message.error('无法连接服务器，请确认后端已启动（backend-node 或 backend）')
    } else {
      Message.error(e.response?.data?.message || '登录失败')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
}
.login-card {
  width: 400px;
  padding: 48px 40px;
  border-radius: 4px;
  border: 1px solid #e5e6eb;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}
.login-header {
  text-align: center;
  margin-bottom: 36px;
}
.logo-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  background: #165dff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
}
.login-header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
}
.subtitle {
  margin: 8px 0 0;
  font-size: 14px;
  color: #86909c;
}
.login-form :deep(.arco-form-item) { margin-bottom: 20px; }
.login-btn {
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 8px;
}
.hint {
  font-size: 14px;
  color: #86909c;
  text-align: center;
  margin: 24px 0 0;
}
</style>
