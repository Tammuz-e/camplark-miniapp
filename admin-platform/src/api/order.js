import request from './request'

export function getOrders(params) {
  return request.get('/admin/orders', { params })
}
export function verifyOrder(id) {
  return request.post(`/admin/orders/${id}/verify`)
}
export function checkoutOrder(id) {
  return request.post(`/admin/orders/${id}/checkout`)
}
export function cancelOrder(id) {
  return request.post(`/admin/orders/${id}/cancel`)
}