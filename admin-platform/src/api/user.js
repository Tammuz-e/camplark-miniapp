import request from './request'

export function getUsers() {
  return request.get('/admin/users')
}
