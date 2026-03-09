import request from './request'

export function getExperiences(params) {
  return request.get('/admin/experiences', { params })
}

export function createExperience(data) {
  return request.post('/admin/experiences', data)
}

export function updateExperience(id, data) {
  return request.put(`/admin/experiences/${id}`, data)
}

export function setExperienceStatus(id, status) {
  return request.post(`/admin/experiences/${id}/status`, { status })
}
