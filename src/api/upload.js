import request from '@/utils/request'

const api = {
  uploadSiteMeta: '/uploadSiteMeta/create',
  uploadPostFile: '/uploadPostFile/create',
  uploadImgFile: '/uploadImgFile/create'
}

export default api

export function uploadImgFile (parameter) {
  console.log(parameter)
  return request({
    url: api.uploadImgFile,
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
