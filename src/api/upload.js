import request from '@/utils/request'

const api = {
  uploadSiteMeta: '/upload/upload_setting',
  uploadImgFile: '/upload/upload_img'
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

export function uploadSiteMeta (parameter) {
  return request({
    url: api.uploadSiteMeta,
    method: 'post',
    data: parameter
  })
}
