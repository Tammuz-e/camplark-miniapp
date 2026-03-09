import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('../views/Login.vue'), meta: { public: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: () => import('../views/ForgotPassword.vue'), meta: { public: true } },
  { path: '/apply', name: 'Apply', component: () => import('../views/Apply.vue'), meta: { public: true } },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/my-camp' },
      { path: 'my-camp', name: 'MyCamp', component: () => import('../views/MyCamp.vue') },
      { path: 'spots', name: 'Spots', component: () => import('../views/Spots.vue') },
      { path: 'experiences', name: 'Experiences', component: () => import('../views/Experiences.vue') },
      { path: 'orders', name: 'Orders', component: () => import('../views/Orders.vue') }
    ]
  }
]

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })
router.beforeEach((to, from, next) => {
  if (to.meta.public || localStorage.getItem('admin_token')) return next()
  next('/login')
})
export default router
