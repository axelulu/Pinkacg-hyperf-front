import request from '@/utils/request'

const api = {
  uploadSiteMeta: '/uploadSiteMeta/create',
  uploadPostFile: '/uploadPostFile/create',
  uploadFile: '/uploadFile/create'
}

export default api

export function uploadFile (parameter) {
  console.log(parameter)
  return request({
    url: api.uploadFile,
    method: 'post',
    data: parameter
  })
}

export function uploadPostFile (parameter) {
  console.log(parameter)
  return request({
    url: api.uploadPostFile,
    method: 'post',
    data: parameter
  })
}

export function uploadSiteMeta (parameter) {
  return request({
    url: api.uploadSiteMeta,
    method: 'post',
    data: parameter
  })
}
