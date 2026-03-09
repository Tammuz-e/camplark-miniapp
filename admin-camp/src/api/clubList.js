import request from './request'

export function getClubs(params) {
  return request.get('/admin/clubs', { params })
}
