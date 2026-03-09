import request from './request'

export function applyClub(data) {
  return request.post('/admin/clubs/apply', data)
}
export function applyClubPublic(data) {
  return request.post('/public/clubs/apply', data)
}
export function getMyClub() {
  return request.get('/admin/clubs/me')
}