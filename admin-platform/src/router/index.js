import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue'), meta: { public: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: () => import('../views/ForgotPassword.vue'), meta: { public: true } },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/camps' },
      { path: 'camps', name: 'Camps', component: () => import('../views/Camps.vue') },
      { path: 'spots', name: 'Spots', component: () => import('../views/Spots.vue') },
      { path: 'experiences', name: 'Experiences', component: () => import('../views/Experiences.vue') },
      { path: 'clubs', name: 'Clubs', component: () => import('../views/Clubs.vue') },
      { path: 'orders', name: 'Orders', component: () => import('../views/Orders.vue') },
      { path: 'users', name: 'Users', component: () => import('../views/Users.vue') },
      { path: 'accounts', name: 'Accounts', component: () => import('../views/Accounts.vue') }
    ]
  }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('admin_token')
  if (to.meta.public || token) return next()
  next('/login')
})

export default router
