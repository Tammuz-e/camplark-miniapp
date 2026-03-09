import axios from 'axios'
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080/api',
  timeout: 15000
})
request.interceptors.request.use(c => {
  const token = localStorage.getItem('admin_token')
  if (token) c.headers.Authorization = `Bearer ${token}`
  return c
})
request.interceptors.response.use(r => r, e => {
  const isPublicApi = e.config?.url?.includes('/public/')
  if (e.response?.status === 401 && !isPublicApi) { localStorage.clear(); location.href = '/login' }
  return Promise.reject(e)
})
export default request
