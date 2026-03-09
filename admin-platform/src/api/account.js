import request from './request'

export function getAccounts() {
  return request.get('/admin/accounts')
}
export function createAccount(data) {
  return request.post('/admin/accounts', data)
}
