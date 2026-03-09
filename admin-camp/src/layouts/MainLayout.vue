<template>
  <a-layout class="main-layout">
    <a-layout-sider :width="208" class="aside">
      <div class="logo">
        <span class="logo-icon">营</span>
        <span class="logo-text">嘢营CAMPLARK</span>
      </div>
      <a-menu :selected-keys="[$route.path]" class="sidebar-menu" @menu-item-click="onMenuClick">
        <a-menu-item key="/my-camp">
          <template #icon><icon-apps /></template>
          <span>我的营地/俱乐部</span>
        </a-menu-item>
        <a-menu-item key="/spots">
          <template #icon><icon-location /></template>
          <span>营位管理</span>
        </a-menu-item>
        <a-menu-item key="/experiences">
          <template #icon><icon-sun /></template>
          <span>体验管理</span>
        </a-menu-item>
        <a-menu-item key="/orders">
          <template #icon><icon-file /></template>
          <span>订单管理</span>
        </a-menu-item>
      </a-menu>
      <div class="logout" @click="logout">
        <icon-poweroff />
        <span>退出登录</span>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="top-header">
        <span class="title">{{ currentTitle }}</span>
      </a-layout-header>
      <a-layout-content class="main-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IconApps, IconLocation, IconSun, IconFile, IconPoweroff } from '@arco-design/web-vue/es/icon'

const router = useRouter()
const route = useRoute()

const titles = { '/my-camp': '我的营地/俱乐部', '/spots': '营位管理', '/experiences': '体验管理', '/orders': '订单管理' }
const currentTitle = computed(() => titles[route.path] || '首页')

function onMenuClick(key) {
  router.push(key)
}

function logout() {
  localStorage.clear()
  router.push('/login')
}
</script>

<style scoped>
.main-layout { min-height: 100vh; }
.aside {
  background: var(--sidebar-bg);
  color: #1d2129;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
}
.aside :deep(.arco-layout-sider-children) { display: flex; flex-direction: column; }
.aside :deep(.arco-layout-sider) { height: 100vh; }
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-bottom: 1px solid var(--border-color);
}
.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--primary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: #1d2129;
}
.sidebar-menu {
  flex: 1;
  border: none;
  background: transparent;
  padding: 16px 12px;
}
.sidebar-menu :deep(.arco-menu-item) {
  margin: 2px 0;
  border-radius: 4px;
  color: #4e5969;
  height: 40px;
}
.sidebar-menu :deep(.arco-menu-item:hover) {
  color: #1d2129;
  background: var(--sidebar-hover);
}
.sidebar-menu :deep(.arco-menu-item.arco-menu-selected) {
  color: var(--sidebar-active-text);
  background: var(--sidebar-active);
  font-weight: 500;
}
.sidebar-menu :deep(.arco-menu-item .arco-icon) { margin-right: 12px; }
.logout {
  padding: 16px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #4e5969;
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid var(--border-color);
  margin: 0 12px 12px;
  border-radius: 4px;
}
.logout:hover { color: #1d2129; background: var(--sidebar-hover); }
.top-header {
  height: 56px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid var(--border-color);
}
.title { font-size: 16px; font-weight: 600; color: #1d2129; }
.main-content {
  background: var(--page-bg);
  padding: 0;
  overflow-y: auto;
}
</style>
