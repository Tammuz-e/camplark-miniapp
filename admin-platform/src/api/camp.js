import request from './request'

export function getCamps(params) {
  return request.get('/admin/camps', { params })
}
export function applyCamp(data) {
  return request.post('/admin/camps/apply', data)
}
export function auditCamp(id, pass, reason) {
  return request.post(`/admin/camps/${id}/audit`, { pass, reason })
}
export function setCampStatus(id, status) {
  return request.post(`/admin/camps/${id}/status`, { status })
}
export function updateCamp(id, data) {
  return request.put(`/admin/camps/${id}`, data)
}
