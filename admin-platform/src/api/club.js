import request from './request'

export function getClubs(params) {
  return request.get('/admin/clubs', { params })
}
export function applyClub(data) {
  return request.post('/admin/clubs/apply', data)
}
export function auditClub(id, pass, reason) {
  return request.post(`/admin/clubs/${id}/audit`, { pass, reason })
}
export function setClubStatus(id, status) {
  return request.post(`/admin/clubs/${id}/status`, { status })
}
export function updateClub(id, data) {
  return request.put(`/admin/clubs/${id}`, data)
}
