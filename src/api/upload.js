import request from '@/utils/request'

const api = {
  uploadAvatar: '/upload/uploadAvatar',
  uploadPostImg: '/upload/uploadPostImg',
  uploadSiteMeta: '/upload/uploadSiteMeta'
}

export default api

export function uploadAvatar (parameter) {
  return request({
    url: api.uploadAvatar,
    method: 'post',
    data: parameter
  })
}

export function uploadPostImg (parameter) {
  console.log(parameter)
  return request({
    url: api.uploadPostImg,
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
