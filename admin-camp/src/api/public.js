import request from './request'

/** 发送短信验证码 */
export function sendSms(data) {
  return request.post('/public/sms/send', data)
}

/** 请求重置密码（发送验证码） */
export function requestPasswordReset(username, phone) {
  return request.post('/public/password/reset-request', { username, phone })
}

/** 重置密码 */
export function resetPassword(phone, code, newPassword) {
  return request.post('/public/password/reset', { phone, code, newPassword })
}
