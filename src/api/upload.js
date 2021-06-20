import request from '@/utils/request'

const api = {
  uploadAvatar: '/upload/uploadAvatar'
}

export default api

export function uploadAvatar (parameter) {
  return request({
    url: api.uploadAvatar,
    method: 'post',
    data: parameter
  })
}
