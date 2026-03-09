import request from './request'

export function login(username, password) {
  return request.post('/admin/auth/login', { username, password })
}

/** 请求重置密码（发送验证码） */
export function requestPasswordReset(username, phone) {
  return request.post('/public/password/reset-request', { username, phone })
}

/** 重置密码 */
export function resetPassword(phone, code, newPassword) {
  return request.post('/public/password/reset', { phone, code, newPassword })
}
