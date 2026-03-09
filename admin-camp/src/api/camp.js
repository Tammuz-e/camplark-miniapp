import request from './request'

export function applyCamp(data) {
  return request.post('/admin/camps/apply', data)
}

export function applyCampPublic(data) {
  return request.post('/public/camps/apply', data)
}
