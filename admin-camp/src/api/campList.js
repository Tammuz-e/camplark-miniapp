import request from './request'

export function getCamps(params) {
  return request.get('/admin/camps', { params })
}
export function getMyCamp() {
  return request.get('/admin/camps/me')
}