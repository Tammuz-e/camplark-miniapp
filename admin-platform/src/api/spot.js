import request from './request'

export function getSpots(params) {
  return request.get('/admin/spots', { params })
}
export function createSpot(data) {
  return request.post('/admin/spots', data)
}
export function auditSpot(id, pass) {
  return request.post(`/admin/spots/${id}/audit`, { pass })
}
export function setSpotStatus(id, status) {
  return request.post(`/admin/spots/${id}/status`, { status })
}
export function updateSpot(id, data) {
  return request.put(`/admin/spots/${id}`, data)
}
