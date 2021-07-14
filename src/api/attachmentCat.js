import request from '@/utils/request'

const api = {
  attachmentCatList: '/attachment_cat/index',
  attachmentCatCreate: '/attachment_cat/create',
  attachmentCatUpdate: '/attachment_cat/update',
  attachmentCatDelete: '/attachment_cat/delete'
}

export default api

export function getAttachmentCatList (parameter) {
  return request({
    url: api.attachmentCatList,
    method: 'get',
    params: parameter
  })
}

export function createAttachmentCatList (parameter) {
  return request({
    url: api.attachmentCatCreate,
    method: 'post',
    data: parameter
  })
}

export function updateAttachmentCatList (parameter) {
  return request({
    url: api.attachmentCatUpdate + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function deleteAttachmentCatList (parameter) {
  return request({
    url: api.attachmentCatDelete + '/' + parameter.id,
    method: 'delete'
  })
}
